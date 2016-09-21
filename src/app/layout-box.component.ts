import { Component, Input } from '@angular/core';
import { LayoutCalculator } from './shared/layout-calculator.service';
import { Box } from './shared/box.ts';
import { Sheet } from './shared/sheet.ts';
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
    @Input() width: number;
    @Input() height: number;
    lm: LayoutCalculator;
    newBox: Box;
    boxService: BoxService;
    currentSheet: Sheet;

    constructor(boxService: BoxService) {
	this.boxService = boxService;
	this.newBox = boxService.newBox(100, 100);
    }

    ngOnChanges() {
	this.lm = new LayoutCalculator(this.width, this.height);
	this.recalcLayout()
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
	    this.boxService.addBox(this.newBox);
	    this.newBox = this.boxService.newBox(100, 100);
	    this.recalcLayout();
	}
	//event.stopPropagation();
    }

    /** called on drop when dragging to left. remove item */
    dropRemoveHandler(event: DragEvent) {
	let ix: any;
	let box: Box;
	let data = event.dataTransfer.getData(BOX_DATA_TYPE);
	let obj = JSON.parse(data);
	this.boxService.removeById(obj.id);
	this.recalcLayout();
    }

    recalcLayout() {
	let boxes: Box[];
	console.log('recalcLayout');
	boxes = this.boxService.boxes;
	this.currentSheet = this.lm.layoutSheet(boxes);
    }
}
