import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router ,private toast:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error){
          switch(error.status){
            case 400:
              if(error.error.errors){
                const modelStatusError=[];
                for(const key in error.error.errors){
                  if(error.error.errors[key]){
                    modelStatusError.push(error.error.errors[key])
                  }
                }
                throw modelStatusError.flat();
                
              }else{
                this.toast.error(error.error,error.status.toString());
            
              }
              break;
              case 401:
                this.toast.error('Unautharized',error.status.toString());
                break;
                case 404:
                  this.router.navigateByUrl('/not-found');
                  break;
                  case 500:
                    const NavigationExtras:NavigationExtras={state:{error: error.error}};
                    this.router.navigateByUrl('/server-error',NavigationExtras);
                    break;
                    default:
                      this.toast.error('something unexpected went wrong');
                      console.log(error);
                      break;


          }

        }
        throw error;
      })
    )
  }
}
