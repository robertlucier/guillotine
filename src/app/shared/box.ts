
export class Box {
    id: string;
    left: number;
    top: number;
    width: number;
    height: number;
    text: string;

    constructor(width: number, height: number, text: string, left: number=0, top: number=0) {
	this.width = width;
	this.height = height;
	this.text = text;
	this.left = left;
	this.top = top;
	this.id = '';
    }
}
