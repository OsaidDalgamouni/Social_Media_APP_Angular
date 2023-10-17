import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../Modules/member';
import { PaginatedResult } from '../Modules/pagination';
import { map, of, take } from 'rxjs';
import { UserParams } from '../Modules/userParams';
import { AccountService } from './account.service';
import { auth } from '../Modules/auth';
import { GetPaginationHeader, GetPaginationResult } from './PaginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl=environment.apiurl;
  paginatedResult:PaginatedResult<Member[]>=new PaginatedResult<Member[]>;
   memberCache=new Map();
   userParams:UserParams |undefined;
   user:auth|undefined;

  constructor(private http:HttpClient,private accountService:AccountService) {
    this.accountService.currenUser$.pipe(take(1)).subscribe({

      next:user=>{
        if(user){
          this.userParams=new UserParams(user);
          this.user=user; 
        }

      }
    })
   }

   getUserParams(){
    return this.userParams;
   }
   setUserParams(params:UserParams){
    this.userParams=params;
   }

  getMembers(userParams:UserParams){
    const response =this.memberCache.get(Object.values(userParams).join('-'));
    if(response) return of (response);
    let params = GetPaginationHeader(userParams.pageNumber, userParams.pageSize);
    params=params.append('minAge',userParams.minAge);
    params=params.append('maxAge',userParams.maxAge);
    params=params.append('gender',userParams.gender);
    params=params.append('orderBy',userParams.orderBy);


     return GetPaginationResult<Member[]>(this.baseUrl+'users',params,this.http).pipe(map(response=>{
      this.memberCache.set(Object.values(userParams).join('-'),response);
      return response;
     }))
    
    }

  getMember(username:string){
    const member =
    [...this.memberCache.values()].reduce
    ((arr,ele)=>arr.concat(ele.result),[]).find((member:Member)=>member.username==username)
    if(member) return of(member)

    return this.http.get<Member>(this.baseUrl+'users/username?name='+username)
  }
  resetFilter(){
    if(this.user){
      this.userParams=new UserParams(this.user);
      return this.userParams;
    }
    return;
  }
  UpdateMember(member: Member)
  {
    return this.http.put(this.baseUrl+'users',member);

  }

  setMainPhoto(photoid:number){
    return this.http.put(this.baseUrl +'users/set-main-photo'+ photoid,{})

  }
  deletePhoto(photoid:number){
    return this.http.delete(this.baseUrl+'Users/dalete-photo'+photoid,{});
  }
  addLike(username:string){
    return this.http.post(this.baseUrl+'Likes/'+username,{})
  }
  getLikes(prdicate:string,pageNumber:number,pageSize:number){
    let params=GetPaginationHeader(pageNumber,pageSize);
    return GetPaginationResult<Member[]>(this.baseUrl+'Likes?prdicate='+prdicate,params,this.http)
  }
  

 
}
