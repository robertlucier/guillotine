import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector:'back-next',
    templateUrl: './back-next.component.html',
})

export class BackNextComponent {
    @Output() increment = new EventEmitter();
    
    change(inc: number) {
	this.increment.emit(inc);
    }
    
}
