import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/Modules/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() username?:string;
  @Input()  messages:Message[]=[];
  messageContent='';
  @ViewChild('messageForm') messageForm!:NgForm

  constructor(private messageservice:MessageService) { }

  ngOnInit(): void {
  
  }
  sendMessage(){
    if(this.username){
      this.messageservice.sendMessage(this.username,this.messageContent).subscribe({
        next:message=>{
        this.messages.push(message);
        this.messageForm.reset();
        }
      })
    }
    
  }

}
