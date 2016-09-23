import { Component, Input, Inject, Output, EventEmitter, HostListener } from '@angular/core';
import { Box } from '../shared/box';

export const boxDataType = 'application/x-box-data';
const edgeSize = 15;

/** add missing setDragImage to DataTransfer interface */
interface FullDataTransfer extends DataTransfer {
    setDragImage(img: HTMLImageElement, xOffset: number, yOffset: number): void;
}

@Component({
    selector: 'box-resize',
    templateUrl: './box-resize.component.html',
    styleUrls: [
	'./box-resize.component.css',
    ]
})

export class BoxResize {
    @Input() box: Box;
    @Input() showDimensions = false;
    @Input() minWidth = 40;
    @Input() minHeight = 40;
    @Input() maxWidth = 1000;
    @Input() maxHeight = 1000;
    @Input() moveType = 'move';  /* move or drag */
    @Output() onResize = new EventEmitter<boolean>();

    lastX: number;
    lastY: number;
    resizeType: string;
    showResize: boolean = false;
    showMove: boolean = false;

    ngOnChanges() {
    }

    dragstartHandler(event: DragEvent) {
	let target: HTMLElement = <HTMLElement> event.target;
	/* determine if user wants drag or move */
	let objH = this.box.height;
	let objW = this.box.width;
	let offX = event.offsetX;
	let offY = event.offsetY;
	console.log('target:', event.target);
	console.log('offsetX='+offX);
	console.log('objW='+objW);
	console.log('(objW - offX):'+(objW - offX));
	this.resizeType = '';
	if ( (objW - offX) < edgeSize ) {
	    this.resizeType += 'R';
	}
	if ( (objH - offY) < edgeSize ) {
	    this.resizeType += 'B';
	}
	if ( offX < edgeSize ) {
	    this.resizeType += 'L';
	}
	if ( offY < edgeSize ) {
	    this.resizeType += 'T';
	}
	console.log('resizeType='+this.resizeType);
	if (this.resizeType || this.moveType == 'move') {
	    /* for resize and move dont show drag image, replace with single-pixel gif */
	    var img = document.createElement('img');
	    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
	    document.body.appendChild(img);
	    let dataTransfer: FullDataTransfer = <FullDataTransfer> event.dataTransfer;
	    dataTransfer.setDragImage(img, 0, 0);
	}
	
	this.lastX = event.x;
	this.lastY = event.y;
	let data = JSON.stringify(this.box);
	event.dataTransfer.setData(boxDataType, data);
	console.log('dragstart: data=' + data);
    }

    dragHandler(event: DragEvent) {
	if (this.lastX !== null) {
	    let diffX = event.x - this.lastX;
	    let diffY = event.y - this.lastY;
	    this.lastX = event.x;
	    this.lastY = event.y;
	    if (diffX || diffY) {
		if (this.resizeType) {
		    if (this.resizeType.includes('T')) {
			this.box.height -= diffY;
			this.box.top += diffY;
		    }
		    if (this.resizeType.includes('L')) {
			this.box.width -= diffX;
			this.box.left += diffX;
		    }
		    if (this.resizeType.includes('B')) {
			this.box.height += diffY;
		    }
		    if (this.resizeType.includes('R')) {
			this.box.width += diffX;
		    }
		    this.box.width = Math.max(this.minWidth, this.box.width);
		    this.box.height = Math.max(this.minHeight, this.box.height);
		    this.box.width = Math.min(this.maxWidth, this.box.width);
		    this.box.height = Math.min(this.maxHeight, this.box.height);
		}
		else if (this.moveType == 'move') {
		    /* move */
		    this.box.left += diffX;
		    this.box.top += diffY;
		}
	    }
	}
    }

    dragEndHandler(event: DragEvent) {
	this.onResize.emit(true);
	this.lastX = null;
	this.lastY = null;
	this.resizeType = '';
    }

    /** return label for the box */
    get dimensionsLabel() {
	if (this.showDimensions) {
	    return `(${this.box.width} x ${this.box.height})`;
	}
	return '';
    }

    mouseEnterHandler(objtype: string) {
	console.log('MOUSEENTER');
	if (objtype == 'resize') {
	    this.showResize = true;
	    this.showMove = false;
	}
	else if (objtype == 'move') {
	    this.showMove = true;
	    this.showResize = false;
	}
    }

    mouseLeaveHandler(objtype: string) {
	console.log('MOUSELEAVE');
	if (objtype == 'move') {
	    this.showMove = false;
	    this.showResize = true;
	}
	else if (objtype == 'resize') {
	    this.showMove = false;
	    this.showResize = false;
	}
    }
}
