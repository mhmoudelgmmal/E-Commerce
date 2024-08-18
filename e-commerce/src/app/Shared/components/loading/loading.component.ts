import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  standalone:true,
  imports:[LogoComponent]
})
export class LoadingComponent {

}
