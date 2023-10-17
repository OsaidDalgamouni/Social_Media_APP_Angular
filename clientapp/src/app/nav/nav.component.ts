import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { auth } from '../Modules/auth';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user: any={username:"" ,password:''}
  currenuser$:Observable<auth |null>=of(null)
   IsLogged=false;
  
  constructor(public accountservic: AccountService ,private router :Router,private toastr:ToastrService)
   { }

  ngOnInit(): void {

    this.GetCurrentUser()
  
      
  }
GetCurrentUser(){
  this.currenuser$=this.accountservic.currenUser$
  }

  Login(user:any) {
   
    this.accountservic.Login(user).subscribe({
      next: rsponse=>{
        this.router.navigateByUrl('/members')
      }
      
    });
  }
  Logout() {
    this.accountservic.Logout();
    this.router.navigateByUrl('/')
   
   

  }
}
