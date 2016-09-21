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
    
    getBoxes(): Box[] {
	let box: Box;
	if ( !this._boxes ) {
	    this._boxes = [];
	    for (let boxSrc of BOXES) {
		box = Object.assign({}, boxSrc);
		box.id = `${this.nextId}`;
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
	this.nextId += 1;
	return box;
    }
}
