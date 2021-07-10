import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-pwa';
  users: any;

  constructor(private http: HttpClient  ){

  }

  ngOnInit(){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe( (res:any) => {
      this.users = res
      console.log(res)
    } , err =>{
      console.error(err)
    })
  }
} 

