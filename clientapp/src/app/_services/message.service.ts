import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetPaginationHeader, GetPaginationResult } from './PaginationHelper';
import { Message } from '../Modules/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
baseUrl=environment.apiurl;
  constructor(private httpClient:HttpClient) { }
  getMessages(pageNumber:number,pageSize:number,container:string){
    let params=GetPaginationHeader(pageNumber,pageSize);
    params=params.append('Container',container);
    return GetPaginationResult<Message[]>(this.baseUrl+'message',params,this.httpClient);

  }
  getMessageThread(username:string){
    return this.httpClient.get<Message[]>(this.baseUrl +'message/thread/'+username)
  }
  sendMessage(username:string,content:string){
    return this.httpClient.post<Message>(this.baseUrl+'message',{recipientUserName:username,content})

  }
  deleteMesaage(id:number){
    return this.httpClient.delete(this.baseUrl+'message/'+id)
  }
}
