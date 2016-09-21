import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector:'back-next',
    templateUrl: './back-next.component.html',
})

export class BackNextComponent {
    @Input() minIndex: number = 0;
    @Input() maxIndex: number;
    @Input() currentIndex: number = 0;
    @Output() index = new EventEmitter();

    ngOnChange() {
    }
    
    change(inc: number) {
	console.log('back/next: cur='+this.currentIndex+' inc='+inc+' max='+this.maxIndex);
	this.currentIndex += inc;
	if (this.currentIndex < this.minIndex) {
	    this.currentIndex = this.minIndex;
	}
	if (this.currentIndex >= this.maxIndex) {
	    this.currentIndex = this.maxIndex;
	}
	this.index.emit(this.currentIndex);
    }
    
}
