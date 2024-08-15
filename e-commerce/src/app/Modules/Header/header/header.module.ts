import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from "../../../Shared/components/logo/logo.component";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    LogoComponent
]
})
export class HeaderModule { }
