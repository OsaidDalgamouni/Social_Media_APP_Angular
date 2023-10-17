import { Component, OnInit } from '@angular/core';
import { Member } from '../Modules/member';
import { MemberService } from '../_services/member.service';
import { Pagination } from '../Modules/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
 members:Member[]|undefined;
 prdicate='liked';
 pagination:Pagination|undefined;
 pageNumber=1;
 pageSize=5;
  constructor(private memberService:MemberService) { }

  ngOnInit(): void {
    this.loadLikes()
  }
loadLikes(){
  this.memberService.getLikes(this.prdicate,this.pageNumber,this.pageSize).subscribe({
    next:response=>{this.members=response.result,
      this.pagination=response.pagination
    }
  })
}

pageChanged(event:any){
  if(this.pageNumber!==event.page){
    this.pageNumber=event.page;   
    this.loadLikes();

  }
 
}
}
