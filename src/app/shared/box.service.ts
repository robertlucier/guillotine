import { Injectable } from '@angular/core';

import { Box } from './box.ts';
import { BOXES } from './mock-boxes.ts';

@Injectable()
export class BoxService {
    nextId: number;
    _boxes: Box[];

    constructor() {
	this.nextId=100;
    }
    
    get boxes(): Box[] {
	let box: Box;
	if ( !this._boxes ) {
	    this._boxes = [];
	    for (let boxSrc of BOXES) {
		box = Object.assign({}, boxSrc);
		box.id = `${this.nextId}`;
		box.css_color = this.calculateBoxColor();
		console.log('boxes: css_color: ' + box.css_color);
		this.nextId += 1;
		this._boxes.push(box);
	    }
	}
	return this._boxes;
    }
    
    newBox(width: number, height: number, text=''): Box {
	if (!text) {
	    text = `Box #${this.nextId}`;
	}
	let box: Box = new Box(width, height, text);
	box.id = `${this.nextId}`;
	box.css_color = this.calculateBoxColor();
	console.log('newBox: css_color: ' + box.css_color);
	this.nextId += 1;
	return box;
    }
    
    addBox(newBox: Box) {
	this._boxes.push(newBox);

    }
    
    removeById(id: string) {
	let ix: any;
	let box: Box;
	for (ix in this._boxes) {
	    box = this._boxes[ix];
	    if (box.id == id) {
		this._boxes.splice(ix, 1);
	    }
	}
    }

    /** set random box color */
    protected calculateBoxColor() {
	let red = 100 + (this.nextId % 3) * 50;
	let green = 100;
	let blue = 100 + (Math.floor(this.nextId / 3) % 3) * 50;
	let colorstring = `rgb(${red},${green},${blue})`;
	return colorstring;
    }


}
