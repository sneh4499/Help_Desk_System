import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HelpdeskService } from './helpdesk.service';
import { HelpdeskClass } from './helpdeskclass';
import { format } from 'url';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css']
})
export class HelpdeskComponent implements OnInit {

  public progress: number;
  public message: string;
  imgpath: string;

  public logodis = false;
  public uploadlogo = false;
  getlogo: string;

  public icondis = false;
  public iconupload = false;
  geticon: string;

  public loading = false;
  helpdeskdata: any = {};

  public progressicon: number;
  public messageicon: string;
  imgpathicon: string;
  url = environment.baseUrl;

  dateformat1: any;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, private helpdeskservice: HelpdeskService, private toastr: ToastrService) { }

  ngOnInit() {

    this.dateformat1 = new Date();

    this.helpdeskservice.getbyid('7b09c997-5afa-405e-9b78-3d8e403b4169').subscribe(data => {
      this.helpdeskdata = data;
      this.getlogo = data['logo'];
      this.geticon = data['favicon'];

      if (this.getlogo === null){
        this.logodis = false;
        this.uploadlogo = true;
      } else {
        this.logodis = true;
        this.uploadlogo = false;
      }

      if (this.geticon === null){
        this.icondis = false;
        this.iconupload = true;
      } else {
        this.icondis = true;
        this.iconupload = false;
      }
   });
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.message = '';
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post(this.url + 'api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        // tslint:disable-next-line: curly
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.imgpath = event.body['dbPath'];
          this.logodis = false;
          this.uploadlogo = true;
          // console.log(event.body['dbPath']);
        }
        if (this.progress = 100){
          this.message = 'Upload success.';
        }
      });
  }


  public uploadFileicon = (files) => {
    if (files.length === 0) {
      return;
    }
    this.messageicon = '';
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post(this.url + 'api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        // tslint:disable-next-line: curly
        if (event.type === HttpEventType.UploadProgress)
          this.progressicon = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.messageicon = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.imgpathicon = event.body['dbPath'];
          // console.log(event.body['dbPath']);
          this.icondis = false;
          this.iconupload = true;
        }
        if (this.progressicon = 100){
          this.messageicon = 'Upload success.';
        }
      });
  }

  update(){
    this.loading = true;

    var opost = new HelpdeskClass();

    opost.Sguid = '7b09c997-5afa-405e-9b78-3d8e403b4169';
    opost.Systemname = this.helpdeskdata.systemname;
    opost.Email = this.helpdeskdata.email;
    opost.Phoneno = this.helpdeskdata.phoneno;
    opost.Timezone = this.helpdeskdata.timezone;
    opost.Datesformat = this.helpdeskdata.datesformat;
    opost.Sortconversation = this.helpdeskdata.sortconversation;

    if (this.imgpath === undefined) {
      opost.Logo = this.getlogo;
    } else {
      opost.Logo = this.imgpath;
    }

    if (this.imgpathicon === undefined) {
      opost.Favicon = this.geticon;
    } else {
      opost.Favicon = this.imgpathicon;
    }

    console.log(opost);
    this.helpdeskservice.update(opost).subscribe(
      data => {
        this.toastr.success('Settings Updated Successfully !', 'Updated !');
        this.ngOnInit();
        this.loading = false;
      });
  }


}
