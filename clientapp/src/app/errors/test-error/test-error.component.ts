import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
  url: string = " https://localhost:7116/api/";
  validationError:string[]=[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  get404error(){
    this.http.get(this.url+'bug/not-found').subscribe({

      next:response=> console.log(response),
      error:error=>console.log(error)
    })
  }
  get400error(){
    this.http.get(this.url+'bug/bad-request').subscribe({

      next:response=> console.log(response),
      error:error=>console.log(error)
    })
  }
  get500error(){
    this.http.get(this.url+'bug/server-error').subscribe({

      next:response=> console.log(response),
      error:error=>console.log(error)
    })
  }
  get401error(){
    this.http.get(this.url+'bug/auth').subscribe({

      next:response=> console.log(response),
      error:error=>console.log(error)
    })
  }
  get400validationerror(){
    this.http.post(this.url+'account/register',{}).subscribe({
  next:response=> console.log(response),
    error:error=>{
        console.log(error)
        this.validationError=error;
  }})
  }

}
