import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { setTokenOnLoadingHeaderComponent } from 'src/app/Modules/Auth/auth/store/actions/login.actions';
import { LoginState } from 'src/app/Modules/Auth/auth/store/state/login.state';
import { AddToCart } from 'src/app/Modules/Products/products/components/products/store/actions/products.actions';
import { ProductsState } from 'src/app/Modules/Products/products/components/products/store/state/products.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hasToken!:string
  counter!:number
  private store = inject(Store)
  @Select(LoginState.loginToken) loginToken$!:Observable<string>
  @Select(ProductsState.CartNumber) CartNumber$!:Observable<number>
  ngOnInit(): void {

    this.checkIfThereIsCartItem()
    this.store.dispatch(new setTokenOnLoadingHeaderComponent())

    this.CartNumber$.subscribe((res)=>{      
      if (res) {        
        this.counter = res
      }
    })
  }
  checkIfThereIsCartItem(){
    
    let cart =  localStorage.getItem('ecommerceCart')
    if(cart){
      this.counter = Number(localStorage.getItem('ecommerceCart'))
    }else{
      this.counter = 0

    }
  }
}
