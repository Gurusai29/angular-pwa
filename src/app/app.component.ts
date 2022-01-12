import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { SwPush, SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-pwa';
  users: any;
  private readonly publicKey = 'BJsxwCOz8T2gmzGcMjIEG9Ru1EFHZLUnfQAgdxCKwH45B9_Vhhr3JbwHDZQ0pmAxmPHRebUl5hMc6uouzrR_3jw';

  constructor(private http: HttpClient ,
     private update : SwUpdate,
     private swPush : SwPush ){

  }

  ngOnInit(){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe( (res:any) => {
      this.users = res
      console.log(res)
    } , err =>{
      console.error(err)
    })
    this.updateClient();
    this.pushSubscription();

    this.swPush.messages.subscribe((message)=>{
      console.log(message)
    })

    this.swPush.notificationClicks.subscribe(
      ({action , notification})=>{
        window.open(notification.data.url)
      }
    )
  }

  updateClient(){
    if(!this.update.isEnabled){
      console.log('update not enabled');
      return;
    }
    this.update.available.subscribe( event => {
      console.log('current event' , event.current , 'available' , event.available)
      if(confirm('update available ')){
        this.update.activateUpdate().then(()=> {
         location.reload()
        })
      }
    })

    this.update.activated.subscribe((event) => {
      console.log('current' , event.previous , 'available' , event.current)
    })
  }

  pushSubscription(){
    if(this.swPush.isEnabled){
      console.log('enabled');
    }else{
      console.log('not enabled')
    }
    this.swPush.requestSubscription({
      serverPublicKey:this.publicKey
    }).then(sub=> console.log(JSON.stringify(sub)))
    .catch(err => console.log(err))
  }
} 




