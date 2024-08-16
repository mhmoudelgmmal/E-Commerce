import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { setTokenOnLoadingHeaderComponent } from 'src/app/Modules/Auth/auth/store/actions/login.actions';
import { LoginState } from 'src/app/Modules/Auth/auth/store/state/login.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hasToken!:string
  counter:number = 0
  private store = inject(Store)
  @Select(LoginState.loginToken) loginToken$!:Observable<string>
  ngOnInit(): void {
    this.store.dispatch(new setTokenOnLoadingHeaderComponent())
    
  }
}
