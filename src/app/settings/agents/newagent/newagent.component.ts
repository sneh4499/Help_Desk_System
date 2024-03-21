import { environment } from 'src/environments/environment.prod';
import { Loginclass } from './../../../login/loginclass';
import { LoginService } from './../../../login/login.service';
import { AgentService } from './../agents.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GroupService } from '../../groups/group.service';
import { ToastrService } from 'ngx-toastr';
import { AgentClass } from '../agentclass';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { RoleService } from '../../roles/role.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

@Component({
  selector: 'app-newagent',
  templateUrl: './newagent.component.html',
  styleUrls: ['./newagent.component.css']
})


export class NewagentComponent implements OnInit {

  public progress: number;
  public message: string;
  public Editor = ClassicEditor;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();
  imgpath: string;

  url = environment.baseUrl;

  agent: any = {};
  groupdrop: any = {};
  roles: any = {};

  public loading: boolean;

  constructor(private gs: GroupService,
    private agentservice: AgentService, private loginservice: LoginService,
    private http: HttpClient, private roleservice: RoleService, private toastr: ToastrService, private router: Router) { }


  modules = {
    formula: true,
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link', 'image']
    ],
  };

  ngOnInit() {
    this.gs.get().subscribe(data => {
      this.groupdrop = data;
   });

   this.roleservice.get().subscribe(data => {
    this.roles = data;
 });
  }

  onTemplateFormSubmit(){
    this.loading = true;

    const emails = [];
    this.loginservice.get().subscribe(data => {
      // tslint:disable-next-line: forin
      for (let d in data) {
        emails.push('', data[d].email);
      }
      if (emails.includes(this.agent.email)) {
        this.toastr.error('Email is already Exist !', 'Error !');
        this.loading = false;
        this.agent.email = '';
      } else {

        // tslint:disable-next-line: prefer-const
          var agentdata = new AgentClass();

          agentdata.Fullname = this.agent.firstname + ' ' + this.agent.lastname;
          agentdata.Email = this.agent.email;
          agentdata.Language = this.agent.language;
          agentdata.Phone = this.agent.phone;
          agentdata.Signature = this.agent.signature;
          agentdata.Timezone = this.agent.timezone;
          agentdata.Occasional = this.agent.agenttype;
          agentdata.Gguid = this.agent.groupid;
          agentdata.RoleGuid = this.agent.role;
          agentdata.Isactive = 'Active';
          agentdata.Jobtitle = this.agent.jobtitle;

          if (this.imgpath == null) {
          agentdata.Uploadphoto = 'Resources/Images/userimage.svg';
          } else {
          agentdata.Uploadphoto = this.imgpath;
          }


          this.agentservice.Add(agentdata).subscribe(data => {

            let ag: any = data;
            var logindata = new Loginclass();

            logindata.Username = this.agent.firstname + ' ' + this.agent.lastname;
            logindata.Email = this.agent.email;
            logindata.Password = 'arise123';
            logindata.Phone = this.agent.phone;
            logindata.Lastlogin = '';
            logindata.AgGuid = ag;
            logindata.RoleGuid = this.agent.role;
            logindata.Isactive = 'Active';

            if (this.imgpath == null) {
              logindata.Photo = 'Resources/Images/userimage.svg';
              } else {
                logindata.Photo = this.imgpath;
              }

            this.loginservice.Add(logindata).subscribe(data1 => {
              this.agent = '';
            });

            this.loading = false;
            this.toastr.success('New Agent Added Successfully !', 'Success !');
            this.agent = '';
            this.router.navigate(['settings/agents/viewagents']);
          });
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
        console.log(event);
        // tslint:disable-next-line: curly
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.imgpath = event.body['dbPath'];
          // console.log(event.body['dbPath']);
        }
        if (this.progress = 100){
          this.message = 'Upload success.';
        }
      });
  }

  public uploadFinished = (event) => {
    this.imgpath = event;
  }


  number(data) {
    if(isNaN(data)) {
      return false;
    } else {
      return true;
    }
  }
}
