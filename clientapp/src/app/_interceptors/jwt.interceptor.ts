import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountservice:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountservice.currenUser$.pipe(take(1)).subscribe({
      next:auth=>{
        if(auth){
          request=request.clone({
            setHeaders:{
              Authorization: `Bearer ${auth.token}`
            }
          })
        }
      }
    })//after take one unsubscribe
    return next.handle(request);
  }
}
