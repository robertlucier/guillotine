import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Box } from '../box';

/** add missing setDragImage to DataTransfer interface */
interface FullDataTransfer extends DataTransfer {
    setDragImage(img: HTMLImageElement, xOffset: number, yOffset: number): void;
}

@Component({
    selector: 'box-new',
    templateUrl: './box-new.component.html',
    styleUrls: [
	'./box-new.component.css',
    ]
})

export class NewBox {
    @Input() box: Box;
    @Input() showDimensions = false;
    @Input() minSize = 40;
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

    }


}
