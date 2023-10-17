import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   validationError:string[]=[];
   rigesterForm:FormGroup=new FormGroup({});
   maxDate:Date=new Date();
   validationErrors:string[]|undefined
   
 
   @Output() cancelRegister=new EventEmitter()
  constructor(private accountservice:AccountService,private toastr:ToastrService
     ,private fb:FormBuilder,private router:Router) {
      this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
      }

  ngOnInit(): void {
    this.validationError.flat();
    this.initializeForm();
  }
  initializeForm(){
    this.rigesterForm=this.fb.group({
      username:['',Validators.required],
      gender:['male',Validators.required],
      knownas:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      dateofbirth:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword :['',[Validators.required,this.MatchValue("password")]],

    })
  }
  MatchValue(matchTo:string):ValidatorFn {
    return (control:AbstractControl)=>{
      return control.value===control.parent?.get(matchTo)?.value?null :{notMathing:true}
    }

  }
  register(){
     this.accountservice.Register(this.rigesterForm.value).subscribe({
      next:()=>{
        this.router.navigateByUrl('/members')
      },
       error:error=>{
            this.validationErrors=error
          } })
          }
 

 
 Cancel(){
  this.cancelRegister.emit(false);
 }
}
