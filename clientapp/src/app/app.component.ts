import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { auth } from './Modules/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private accountservic: AccountService) { }



  ngOnInit(): void {
    this.setCurrentUser();
  }


  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: auth = JSON.parse(userString);
    this.accountservic.setCurrentUser(user)

  }
}
