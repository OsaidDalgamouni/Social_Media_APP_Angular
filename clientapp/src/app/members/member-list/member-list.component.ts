import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { auth } from 'src/app/Modules/auth';
import { Member } from 'src/app/Modules/member';
import { Pagination } from 'src/app/Modules/pagination';
import { UserParams } from 'src/app/Modules/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members:Member[]=[]
  pagination:Pagination |undefined;
  userParams:UserParams|undefined;

  genderList=[{value:'male' ,display:'Male'},{value:'female' ,display:'Female'}]
 

  constructor(private memberservic:MemberService){
    this.userParams=this.memberservic.getUserParams();
  
  }
  ngOnInit(): void {
    this.LoadMembers()
  }
  LoadMembers(){
    if(this.userParams) {
      this.memberservic.setUserParams(this.userParams);
      this.memberservic.getMembers(this.userParams).subscribe({
        next:response=>{
          if(response.result && response.pagination){
            this.members=response.result;
            this.pagination=response.pagination;
          }
        }
      })
    }
    
  }
  resetFilter(){
      this.userParams=this.memberservic.resetFilter();
      this.LoadMembers();
  }
  pageChanged(event:any){
    if(this.userParams&& this.userParams.pageNumber!==event.page){
      this.userParams.pageNumber=event.page;
      this.memberservic.setUserParams(this.userParams);
      this.LoadMembers();

    }
   
  }

}
