import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from "../../../Shared/components/logo/logo.component";
import { SearchInputComponent } from "../../../Shared/components/search-input/search-input.component";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    LogoComponent,
    SearchInputComponent
]
})
export class HeaderModule { }
