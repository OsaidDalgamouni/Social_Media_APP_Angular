import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MemberService } from '../_services/member.service';
import { Member } from '../Modules/member';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailedResolver implements Resolve<Member> {
  constructor(private memberservice:MemberService){}
  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
    return this.memberservice.getMember(route.paramMap.get('username')!)
  }
}
