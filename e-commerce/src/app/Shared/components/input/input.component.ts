import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone:true,
  imports:[ReactiveFormsModule]
})
export class InputComponent {
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
  onBlur() {
    
      return this.dataChangedOnBlur.emit(this.name)
    
  }
}
