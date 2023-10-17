import { Component, Input, OnInit } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';


import { take } from 'rxjs';
import { auth } from 'src/app/Modules/auth';
import { Member } from 'src/app/Modules/member';
import { Photo } from 'src/app/Modules/photo';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member | undefined;
  hasBaseDropZoneOver = false
  user: auth | undefined
  baseUrl = environment.apiurl

  uploader: FileUploader = new FileUploader({
    url: this.baseUrl + 'users/add-photo',
    isHTML5: true,
    allowedFileType: ['image'],
    removeAfterUpload: true,
    autoUpload: false,
    maxFileSize: 10 * 1024 * 1024
  });

  constructor(private accountservice: AccountService,private memberService:MemberService) {
    this.accountservice.currenUser$.pipe(take(1)).subscribe({
      next: user => { if (user) this.user = user }
    })
  }

  ngOnInit(): void {
    this.InitializeUploader();
    this.uploader.authToken ='Bearer '+ this.user?.token
  }
  setMainPhoto(photo:Photo){
    this.memberService.setMainPhoto(photo.id).subscribe({
      next:()=>{
        if(this.user && this.member){
          this.user.photoUrl=photo.url;
          this.accountservice.setCurrentUser(this.user);
          this.member.photoUrl=photo.url;
          this.member.photos.forEach(p=>{
            if(p.ismain){
              p.ismain=false
            }
            if(p.id===photo.id)p.ismain=true
          })
        }
      }
    })
  }
  deletePhoto(photoid:number){
    this.memberService.deletePhoto(photoid).subscribe({
      next:()=>{
        if(this.member){
          this.member.photos=this.member.photos.filter(x=>x.id!=photoid);
        
      }
    }
    });
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  InitializeUploader() {

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
        if(photo.ismain && this.user && this.member){
          this.user.photoUrl=photo.url;
          this.member.photoUrl=photo.url
          this.accountservice.setCurrentUser(this.user);
        }
      }
    }
  }
}
