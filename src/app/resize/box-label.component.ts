import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component( {
    selector: 'box-label',
    templateUrl: './box-label.component.html',
    styleUrls: [

    ],


})
export class BoxLabel {
    @Input() text: string;
    @Output() onTextChange = new EventEmitter<string>();
    isEditing: boolean;

    startEdit(event) {
	this.isEditing = !this.isEditing;
    }

    textChangeHandler(event) {
	this.text = event.target.value;
	this.isEditing = false;
	this.onTextChange.emit(this.text);
    }
}
