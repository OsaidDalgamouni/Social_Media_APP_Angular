import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { auth } from '../Modules/auth';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: string = " https://localhost:7116/api/account/";


  private CurrentUserSource = new BehaviorSubject<auth | null>(null);
  currenUser$ = this.CurrentUserSource.asObservable();
  constructor(private httpclient: HttpClient) { }

  Login(person: any) {
    return this.httpclient.post<auth>(this.url + 'login', person).pipe(map((response:auth) => {
      const user = response
      if (user) {
        //debugger
        localStorage.setItem('user', JSON.stringify(user));
        this.CurrentUserSource.next(user);
      }
    }))

  }
  Register(model:any){
    return this.httpclient.post<auth>(this.url+'register',model).pipe(map((authetication:auth) =>{

      if(authetication){
        localStorage.setItem('user', JSON.stringify(authetication));
        this.CurrentUserSource.next(authetication);
       


      }
      return authetication;
    }))
  }
  setCurrentUser(authuser: auth) {1
    this.CurrentUserSource.next(authuser);
  }
  Logout() {
    localStorage.removeItem('user');
    this.CurrentUserSource.next(null);
  }

  checkUser() {
    if (this.currenUser$) {

    } else {
      const userString = localStorage.getItem('user');
      if (!userString) return;
      const user1: auth = JSON.parse(userString);
      this.CurrentUserSource.next(user1);
    }
  }
}