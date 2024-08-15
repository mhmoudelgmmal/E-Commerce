import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorInterceptor } from './Modules/Header/header/interceptor/error-interceptor.interceptor';
import { LogoComponent } from './Shared/components/logo/logo.component';
import { InputComponent } from './Shared/components/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers:[
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
