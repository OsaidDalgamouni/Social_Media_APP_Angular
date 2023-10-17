import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 RegisterModel=false;
 users:any
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
   
  }
RegisterToggle(){
  this.RegisterModel=!this.RegisterModel;
}

cancelRegister(event:boolean){
  this.RegisterModel=event;
}

}
