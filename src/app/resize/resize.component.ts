import { Component, Input } from '@angular/core';
import { Box } from '../box';

@Component({
    selector: 'resize',
    templateUrl: './resize.component.html',
    styleUrls: [
	'./resize.component.css'
    ],
})

export class Resize {
    boxes: Box[];
    ngOnInit() {
	this.boxes = [new Box(50, 100, 'Tall')];
    }
}
