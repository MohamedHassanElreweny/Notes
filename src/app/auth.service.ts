import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode'
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient, private _Router:Router) {
    if(localStorage.getItem('userinfo')){
      this.decodeUserData();
    }
  }

  
  baseurl:string="https://sticky-note-fe.vercel.app/";
  // baseurl:string='https://routeegypt.herokuapp.com/';

  signin(data:object):Observable<any>{
    return this._HttpClient.post(this.baseurl+'signin',data);
  }
  signup(data:object):Observable<any>{
    return this._HttpClient.post(this.baseurl+'signup',data);
  }

  decodeUserData(){
    let data:any = localStorage.getItem('userinfo');
    let decoded:any = jwtDecode(data);
    this.currentUser.next(decoded);
  }

  Logout(){
    localStorage.removeItem('userinfo');
    this.currentUser.next(null);
    this._Router.navigate(['/signin']);
  }

}
