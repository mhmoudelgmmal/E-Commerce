import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone:true
})
export class InputComponent {
  @Input() type!:string
  @Input() text!:string
  @Input() placeholder!:string
}
