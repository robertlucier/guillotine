import { Box } from './box';

export class Sheet {
    width: number;
    height: number;
    boxes: Box[];

    constructor(width: number, height: number) {
	this.width = width;
	this.height = height;
	this.boxes = [];
    }
}

