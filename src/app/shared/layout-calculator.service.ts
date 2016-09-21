import { Box } from './box';
import { Shelf } from './shelf';
import { Sheet } from './sheet';


export class LayoutCalculator {
    pageWidth: number;
    pageHeight: number;

    constructor(pageWidth: number, pageHeight: number) {
	this.pageWidth = pageWidth;
	this.pageHeight = pageHeight;
    }

    /** set left/top position on boxes */
    layoutSheet(boxes: Box[]) {
	let remaining: Box[] = boxes.slice();
	let sheet: Sheet = new Sheet(this.pageWidth, this.pageHeight);
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
		shelf = new Shelf(this.pageWidth, box.height);
	    }
	    sheet.boxes.push(box);
	    box.left = shelf.leftPos;
	    box.top = h;
	    shelf.leftPos += box.width;
	}
	return sheet;
    }

}
