import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


declare var $:any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  errorMessage:string='';
  registerform:FormGroup=new FormGroup ({
    'first_name':new FormControl(null,[Validators.required , Validators.minLength(3),Validators.maxLength(20)]),
    'last_name':new FormControl(null,[Validators.required , Validators.minLength(3),Validators.maxLength(20)]),
    'email':new FormControl(null,[Validators.required , Validators.email]),
    'password':new FormControl(null,[Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)]),
    'age':new FormControl(null,[Validators.required ,Validators.min(8) , Validators.max(80)])
  })

  constructor(private _AuthService:AuthService , private _Router:Router) { }

  ngOnInit(): void {
    $('#signup').particleground();
  }

  register(data:FormGroup){
    if(this.registerform.invalid){
      return;
    }
    this._AuthService.signup(data.value).subscribe({
      next:(data)=>{
        if(data.message =='success'){
          this._Router.navigate(['/signin']);
        }else{
          this.errorMessage="Email is Aready registered";
        }
      }
    })

  }

}
