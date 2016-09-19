import { Component, ViewEncapsulation } from '@angular/core';
import { Box } from './box.ts';
import { BoxService } from './box.service.ts';

@Component({
    selector: 'drag',
    templateUrl: './drag.component.html',
})

export class DragBoxComponent {
    componentName: 'DragBoxComponent';
    boxes: Box[];
    constructor(boxService: BoxService) {
	this.boxes = boxService.getBoxes();
    }
}
