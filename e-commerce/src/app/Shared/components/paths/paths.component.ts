import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Path } from '../../context/DTOS';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class PathsComponent {
  @Input() pathes!:Path[]
}
