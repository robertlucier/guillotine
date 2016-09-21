import { Component, ViewEncapsulation } from '@angular/core';
import { Box } from './shared/box.ts';
import { BoxService } from './shared/box.service.ts';

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
