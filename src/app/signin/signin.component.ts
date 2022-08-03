import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var $:any;


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  errorMessage:string='';
  loginform:FormGroup=new FormGroup({
    'email':new FormControl(null , [Validators.required , Validators.email]),
    'password':new FormControl(null, [Validators.required])
  });

  constructor(private _AuthService:AuthService,private _Router:Router) {
    if(localStorage.getItem('userinfo')){
      this._Router.navigate(['/notes'])
    }
   }

  ngOnInit(): void {
    $('#signin').particleground();
  }

  login(data:FormGroup){
    if(this.loginform.invalid){
      return;
    }
    this._AuthService.signin(data.value).subscribe({
      next:(data)=>{
        if(data.message == 'success'){
          localStorage.setItem('userinfo',data.token);
          this._Router.navigate(['/notes']);
          this._AuthService.decodeUserData();
        }
        else{
          this.errorMessage='Email or password is incorrect';
        }
      }
    })
  }


  fieldTextType: boolean=false;
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
