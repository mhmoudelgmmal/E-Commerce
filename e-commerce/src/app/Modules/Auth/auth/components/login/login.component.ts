import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoginData } from '../../contexts/DTOS';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  private http = inject(HttpClient);
  private Router = inject(Router)
  private loginService = inject(LoginService)
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
      this.loginService.login(this.loginForm.value).subscribe((res:LoginData)=>{
        localStorage.setItem('ecommerceToken',res.token)
        this.Router.navigate(['/products'])
      })
    }
  }
}
