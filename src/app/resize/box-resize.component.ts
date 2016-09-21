import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Box } from '../shared/box';

export const boxDataType = 'application/x-box-data';

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
    EDGE_SIZE = 10;
    areaColor: string;

    ngOnChanges() {
	this.areaColor = this.calcAreaColor();
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
	if ( (objW - offX) < this.EDGE_SIZE ) {
	    this.resizeType += 'R';
	}
	if ( (objH - offY) < this.EDGE_SIZE ) {
	    this.resizeType += 'B';
	}
	if ( offX < this.EDGE_SIZE ) {
	    this.resizeType += 'L';
	}
	if ( offY < this.EDGE_SIZE ) {
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
	    console.log('maxWidth='this.maxWidth);
	    console.log('maxHeight='this.maxHeight);
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
	this.areaColor = this.calcAreaColor();
	this.onResize.emit(true);
	this.lastX = null;
	this.lastY = null;
	this.resizeType = '';
    }

    /** set color based on area */
    calcAreaColor() {
	let red = 200;
	let green = 255;
	let blue = 60;
	let area = this.box.width * this.box.height;
	let factor = Math.min(1, area / (250*250));
	green = 100 + Math.floor(155 * factor);
	let colorstring = `rgb(${red},${green},${blue})`;
	return colorstring;
    }

    /** return label for the box */
    get dimensionsLabel() {
	if (this.showDimensions) {
	    return `(${this.box.width} x ${this.box.height})`;
	}
	return '';
    }

}
