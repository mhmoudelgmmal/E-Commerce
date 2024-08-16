import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from '../contexts/DTOS';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(data:object):Observable<LoginData>{
    return this.http.post<LoginData>('https://dummyjson.com/auth/login',data)
  }
}
