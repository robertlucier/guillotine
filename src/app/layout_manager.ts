import { Box } from './box.ts';

class Shelf {
    width: number;
    height: number;
    leftPos: number = 0;
    boxes: Box[];

    get w_remaining() {
	return this.width - this.leftPos;
    }
}

class Sheet {
    width: number;
    height: number;
    hRemaining: number;
    shelves: Shelf[];
}

export class LayoutManager {
    pageWidth: number;
    pageHeight: number;

    /** set left/top position on boxes */
    layoutSheet(boxes: Box[]) {
	let remaining: Box[] = boxes.slice();
	// sort by height, desc
	remaining.sort((b1, b2) => (b2.height - b1.height));
	let h: number = 0;
	let shelf: Shelf = null;
	while (remaining.length > 0) {
	    let box: Box = remaining.shift();
	    if (shelf && box.width > shelf.w_remaining) {
		h += shelf.height;
		shelf = null;
	    }
	    if (shelf === null) {
		if (box.height > (this.pageHeight - h)) {
		    break;
		}
		shelf = this.new_shelf(box.height);
	    }
	    shelf.boxes.push(box);
	    box.left = shelf.leftPos;
	    box.top = h;
	    shelf.leftPos += box.width;
	}
	return remaining;
    }

    new_shelf(height): Shelf {
	let shelf: Shelf = new Shelf();
	shelf.width = this.pageWidth;
	shelf.height = height;
	shelf.boxes = [];
	return shelf;
    }
}
