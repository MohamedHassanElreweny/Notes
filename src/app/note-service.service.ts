import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  baseurl:string="https://sticky-note-fe.vercel.app/";
  // baseurl:string='https://routeegypt.herokuapp.com/';
  constructor(private _HttpClient:HttpClient) { }

  token=localStorage.getItem('userinfo');

  add(data:object):Observable<any>{
    return this._HttpClient.post(this.baseurl+'addNote',data);
  }

  delete(data:any):Observable<any>{
    let option={
      body:{
        NoteID:data.NoteID,
        token:data.token,
      }
    }
    return this._HttpClient.delete(this.baseurl+'deleteNote',option);
  }

  edit(data:object):Observable<any>{
    return this._HttpClient.put(this.baseurl+'updateNote',data);
  }

  getAllNotes(data:any):Observable<any>{
    return this._HttpClient.post(this.baseurl+'getUserNotes',data);
  }
}
