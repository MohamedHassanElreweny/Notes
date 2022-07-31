import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { NoteServiceService } from '../note-service.service';



declare var $:any;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  noteform:FormGroup = new FormGroup({
    'title':new FormControl(null , [Validators.required]),
    'desc':new FormControl(null , [Validators.required])
  })

  noteupdate:FormGroup = new FormGroup({
    'title':new FormControl(null , [Validators.required]),
    'desc':new FormControl(null , [Validators.required])
  })

  globalId:any;
  userdata:any;
  token:any;
  notfound:boolean=false;

  constructor(private _AuthService:AuthService , private _NoteService:NoteServiceService , private _Router:Router) {
    try{
      this.token=localStorage.getItem('userinfo');
    }
    catch(error){
      localStorage.clear();
      this._Router.navigate(['/signin']);
    }
  }

  ngOnInit(): void {
    this.userdata =this._AuthService.currentUser.getValue();
    this.getNotes();
  }


  addnote(data:any){
    let addobj = {
      'title': data.value.title,
      'desc' : data.value.desc,
      'citizenID': this.userdata._id,
      'token':this.token
    }
    this._NoteService.add(addobj).subscribe({
      next:(result)=>{
        this.getNotes();
        if(result.message == "success"){
          $("#add").modal('hide');
        }
      }
    })

  }

  notesArr:any[]=[];

  getNotes(){
    let notesobj={
      token:this.token,
      'userID': this.userdata._id
    }
    this._NoteService.getAllNotes(notesobj).subscribe({
      next:(result)=>{
        this.notesArr = result.Notes;
        if(this.notesArr==null){
          this.notfound=true;
        }
        else{
          this.notfound=false;
        }
      }
    })
  }

  getid(id:any){
    this.globalId = id;
  }

  deleteNote(){
    let delobj={
      token:this.token,
      NoteID:this.globalId
    }
    this._NoteService.delete(delobj).subscribe({
      next:(result)=>{
        if(result.message == 'deleted'){
        this.getNotes();
        $("#deletebtn").modal('hide');
        }
      }
    })
  }

  updateNote(data:any){
    let updatedObj={
      'title': data.value.title,
      'desc' : data.value.desc,
      'NoteID': this.globalId,
      'token':this.token
    }
    this._NoteService.edit(updatedObj).subscribe({
      next:(result)=>{
        if(result.message == 'updated')
        {
          this.getNotes();
          $("#editbtn").modal('hide');
        }
      }
    });
  }

}
