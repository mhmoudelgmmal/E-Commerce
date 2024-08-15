import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private http = inject(HttpClient)

  ngOnInit(): void {
    this.http.post('https://dummyjson.com/auth/login',{
          username: 'emilys',
          password: 'emilyspass',       
    }).subscribe((res)=>{
      console.log(res);
      
    })
  }
}
