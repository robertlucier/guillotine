import { Component, Input } from '@angular/core';
import { LayoutManager } from './shared/layout-calculator.service';
import { Box } from './shared/box.ts';
import { BoxService } from './shared/box.service.ts';
import { BOX_DATA_TYPE } from './resize/box-resize.component';

@Component( {
    selector: 'layout-box',
    templateUrl: './layout-box.component.html',
    styleUrls: [
	'./layout-box.component.css',
    ]
})

export class LayoutBox {
    @Input() boxes: Box[];
    @Input() width: number;
    @Input() height: number;
    lm: LayoutManager;
    newBox: Box;
    boxService: BoxService;

    constructor(boxService: BoxService) {
	this.boxService = boxService;
	this.newBox = boxService.newBox(100, 100);
    }

    ngOnChanges() {
	this.lm = new LayoutManager();
	this.lm.pageWidth = this.width;
	this.lm.pageHeight = this.height;
	this.lm.layoutSheet(this.boxes);
    }

    /** allow left-box to be a drag-target */
    onDragOverHandler(event: DragEvent) {
	return false;
    }

    /** handle drop from new-box on the left */
    dropAddHandler(event: DragEvent) {
	let data = event.dataTransfer.getData(BOX_DATA_TYPE);
	let obj = JSON.parse(data);
	console.log('drop handler: data=', data);
	console.log('drop handler: obj=', data);
	if (obj.id == this.newBox.id) {
	    this.boxes.push(this.newBox);
	    this.newBox = this.boxService.newBox(100, 100);
	    this.lm.layoutSheet(this.boxes);
	}
	//event.stopPropagation();
    }

    /** called on drop when dragging to left. remove item */
    dropRemoveHandler(event: DragEvent) {
	let ix: any;
	let box: Box;
	let data = event.dataTransfer.getData(BOX_DATA_TYPE);
	let obj = JSON.parse(data);
	for (ix in this.boxes) {
	    box = this.boxes[ix];
	    if (obj.id == box.id) {
		this.newBox = box;
		this.boxes.splice(ix, 1);
	    }
	    this.lm.layoutSheet(this.boxes);
	}
    }

    recalcLayout(changed: boolean) {
	this.lm.layoutSheet(this.boxes);
    }

}
