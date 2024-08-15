import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor() {}
  hasToken:boolean = JSON.parse(localStorage.getItem('ecommerceToken')!)
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let modifiedURL = request
    
    if (this.hasToken) {
      
      modifiedURL = request.clone({
        headers:request.headers.set('Token','true')
      })
    }

    return next.handle(modifiedURL).pipe(
      catchError((err:HttpErrorResponse)=>{
        alert(err?.error?.message)
        return throwError(() => err);
      })
    );
  }
}
