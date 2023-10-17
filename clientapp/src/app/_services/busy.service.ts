import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyrequestCount=0;

  constructor(private spinnerservice:NgxSpinnerService) { }
  busy(){
    this.busyrequestCount++;
    this.spinnerservice.show(undefined,{
      bdColor:'rgba(255,255,255,0)',
      color:'#333333'
    })
  }
  idle(){
    this.busyrequestCount--
    if(this.busyrequestCount<=0){
      this.busyrequestCount=0;
      this.spinnerservice.hide();
    }
  }
}
