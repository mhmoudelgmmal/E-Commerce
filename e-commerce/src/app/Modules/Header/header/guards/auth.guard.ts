import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  hasToken = ""
  private router = inject(Router)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.hasToken = localStorage.getItem('ecommerceToken')!

      const routerState = state.url
      if (this.hasToken) {
        if (routerState.includes('/login')) {
          this.router.navigate(['/products'])
          return false
        }        
      }else{
        if (routerState.includes('/products')) {
          this.router.navigate(['/login'])
          return false
        }
        
        
      }
      return true
  }
  
}
