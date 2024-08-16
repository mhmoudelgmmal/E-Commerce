import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  standalone:true
})
export class SearchInputComponent {
  @Input() type!:string
  @Input() text!:string
  @Input() placeholder!:string
  @Input() name!:string
  @Output() dataChanged = new EventEmitter<string>();
  @Output() dataChangedOnBlur = new EventEmitter<string>();
  data: string = "";
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement
    this.data = inputElement.value;
    this.dataChanged.emit(this.data);
  }
  
}
