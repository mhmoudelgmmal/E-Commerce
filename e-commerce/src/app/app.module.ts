import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorInterceptor } from './interceptor/error-interceptor.interceptor';
import { LogoComponent } from './Shared/components/logo/logo.component';
import { InputComponent } from './Shared/components/input/input.component';
import { NgxsModule } from '@ngxs/store';
import { LoginState } from './Modules/Auth/auth/store/state/login.state';
import { SearchInputComponent } from './Shared/components/search-input/search-input.component';
import { PathsComponent } from './Shared/components/paths/paths.component';
import { PaginationComponent } from './Shared/components/pagination/pagination.component';
import { LoadingComponent } from './Shared/components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([LoginState])
  ],
  providers:[
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
