import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LogoComponent } from "../../../Shared/components/logo/logo.component";
import { InputComponent } from 'src/app/Shared/components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { LoginState } from './store/state/login.state';
import { LoadingComponent } from "../../../Shared/components/loading/loading.component";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LogoComponent,
    InputComponent,
    ReactiveFormsModule,
    LoadingComponent
],
})
export class AuthModule { }
