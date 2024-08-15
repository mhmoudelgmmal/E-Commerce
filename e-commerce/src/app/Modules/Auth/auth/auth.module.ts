import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LogoComponent } from "../../../Shared/components/logo/logo.component";
import { InputComponent } from 'src/app/Shared/components/input/input.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LogoComponent,
    InputComponent
]
})
export class AuthModule { }
