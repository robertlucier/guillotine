export class Shelf {
    width: number;
    height: number;
    leftPos: number = 0;

    constructor(width: number, height: number) {
	this.width = width;
	this.height = height;
    }

    get w_remaining() {
	return this.width - this.leftPos;
    }
}
