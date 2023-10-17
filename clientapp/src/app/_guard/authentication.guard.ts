import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private accountservice:AccountService,private toastr:ToastrService){}
  canActivate(): Observable<boolean> {
    return this.accountservice.currenUser$.pipe(
      map(user=>{
        if(user) return true;
        else{
          this.toastr.error('Login First');
          return false
        }

      })
    );
  }
  
}
