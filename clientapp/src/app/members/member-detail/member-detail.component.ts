import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/Modules/member';
import { Message } from 'src/app/Modules/message';
import { MemberService } from 'src/app/_services/member.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs',{static:true}) memberTabs?:TabsetComponent; //we use static insted of waitting view to load
  member: Member ={} as Member;
  //route resolver get a date befor the route is activated
  activeTab?:TabDirective;
  messages:Message[]=[]
  constructor(private memberservic: MemberService, private route: ActivatedRoute , private messageservice:MessageService ) { }

  ngOnInit(): void {
    this.route.data.subscribe({

      next:data=>{
        this.member=data['member']
      }
    })
   
    this.route.queryParams.subscribe({
      next:param=>{
        param['tab'] && this.selectTab(param['tab'])
      }
    })
  }
 
  selectTab(heading:string){
    if(this.memberTabs){
      this.memberTabs.tabs.find(x=>x.heading===heading)!.active=true
    }
  }
  loadmessages(){
    if(this.member){
      this.messageservice.getMessageThread(this.member.username).subscribe({
        next: response=> this.messages=response
      })
    }
  }
  onTabActivated(date:TabDirective){
    this.activeTab=date
    if(this.activeTab.heading==='Messages'){
      this.loadmessages();
    }
  }
}
