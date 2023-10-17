import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/Modules/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member:Member |undefined;

  constructor(private memberService:MemberService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
addLike(member:Member){
this.memberService.addLike(member.username).subscribe({
  next:()=> this.toastr.success('you have liked'+this.member?.knownas)
})
}
}
