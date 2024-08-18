import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoginData, LoginDataResponse } from '../../contexts/DTOS';
import { Select, Store } from '@ngxs/store';
import { loginUser } from '../../store/actions/login.actions';
import { LoginState } from '../../store/state/login.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder,private store:Store) {}
  private Router = inject(Router)
  @Select(LoginState.isLoading) isLoading$!:Observable<boolean>
  loginForm: FormGroup = this.fb.group({
    username: ["",{ validators: [Validators.required], updateOn: "blur" }],
    password: ["",{ validators: [Validators.required], updateOn: "blur" }],
  });
  onChildDataChange(data: string, inputName: string) {
    this.loginForm.get(inputName)?.setValue(data);
  }
  onBlurControl(event:string){        
    this.loginForm.get(event)?.markAsDirty()
    this.loginForm.get(event)?.updateValueAndValidity()    
  }
  ngOnInit(): void {}

  submitForm() {
    if (this.loginForm.valid) {
      this.store.dispatch(new loginUser(this.loginForm.value)).subscribe((res:LoginDataResponse)=>{
      // this.loginService.login(this.loginForm.value)
      
        localStorage.setItem('ecommerceToken',res.auth.token)
        this.Router.navigate(['/products'])
      })
    }
  }
}
