import { environment } from './../../environments/environment.prod';
import { formatDate } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AgentClass } from '../settings/agents/agentclass';
import { AgentService } from '../settings/agents/agents.service';
import { GroupService } from '../settings/groups/group.service';
import { RoleService } from '../settings/roles/role.service';
import { TagService } from '../settings/tags/tag.service';
import { CompanyservicesService } from '../tickets/new/companyservices.service';
import { Contactclass } from '../tickets/new/contactclass';
import { NewcontactservicesService } from '../tickets/new/newcontactservices.service';
import { LoginService } from '../login/login.service';
@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.component.html',
  styleUrls: ['./detail-contact.component.css']
})
export class DetailContactComponent implements OnInit {

  public loading = false;
  companydrop: any = {};
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();
  imgpath: string;
  public progress: number;
  public message: string;

  contact: any = {};
  tagdrop: any = {};
  agent: any = {};

  timezone: string;
  ticketattach: any = {};

  groupdrop: any = {};
  roles: any = {};

  id: any;
  guid: any;
  contactname: any;
  companyname: any;
  logo: any;
  url = environment.baseUrl;
  email: any;
  phone: any;
  workphone: any;
  tweetter: any;
  address: any;
  title: any;

  roleguid: any;
  public editbtn = false;
  public dltdtn = false;

  currentDate: any;

  constructor(private route: ActivatedRoute,
    private conservice: NewcontactservicesService, private tagservice: TagService, private loginservice: LoginService,
    private router: Router, private companyservice: CompanyservicesService, private cookie: CookieService,
    private gs: GroupService, private roleservice: RoleService, private agentservice: AgentService,
    private http: HttpClient, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {

    this.currentDate = formatDate(new Date(), 'dd/mm/yyyy', 'en');

    this.route.queryParams.subscribe(params => {
      this.guid = params['id'];
    });

    this.gs.get().subscribe(data => {
      this.groupdrop = data;
   });

   this.roleservice.get().subscribe(data => {
    this.roles = data;
  });

    this.companyservice.get().subscribe(data => {
      this.companydrop = data;
   });

   this.tagservice.get().subscribe(data => {
    this.tagdrop = data;
  });

    if(this.guid == null){
      this.router.navigate(['/listcontact/list']);
    }

    this.conservice.getbyid(this.guid).subscribe(
      data => {
        this.ticketattach = data['ticket'];
        this.contactname = data['fullname'];
        this.companyname = data['comGu'];
        this.logo = data['uploadphoto'];
        this.email = data['email'];
        this.phone = data['mobilephone'];
        this.address = data['address'];
        this.workphone = data['mobilephone'];
        this.tweetter = data['tweeterid'];
        this.title = data['title'];

        this.loginservice.getbyid(this.cookie.get('Guid')).subscribe(loginid => {
          this.timezone = loginid['agGu'].timezone;
        });
      }
    );


    if (this.cookie.get('Guid') === '') {
      this.router.navigate(['login']);
    }
    if (this.cookie.get('RoleGuid') === '') {
      this.router.navigate(['login']);
    }

    this.roleguid = this.cookie.get('RoleGuid');

    this.roleservice.getbyid(this.roleguid).subscribe(data => {
      if (data['createcontact'] === 'false') {
        this.editbtn = true;
      } else {
        this.editbtn = false;
      }
      if (data['deletecontact'] === 'false') {
        this.dltdtn = true;
      } else {
        this.dltdtn = false;
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
         //  this.message = 'Upload success.';
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



  editmodal(editcontent, data1){
    this.modalService.open(editcontent, { centered: true, size: 'lg' });
    this.id = data1;

    this.conservice.getbyid(data1).subscribe(
      data => {
      this.imgpath = data['uploadphoto'];

      this.contact = data;
      let tag = data['tagGu'];
      this.contact.tags = tag['tagGuid'];
      });
   }
   update(){
    this.loading = true;

    var c = new Contactclass();

    c.ConGuid = this.contact.conGuid;
    c.Uploadphoto = this.imgpath;
    c.Fullname = this.contact.fullname;
    c.Email = this.contact.email;
    c.Workphone = this.contact.workphone;
    c.Mobilephone = this.contact.mobilephone;
    c.Tweeterid = this.contact.tweeterid;
    c.Address = this.contact.address;
    c.Timezone = this.contact.timezone;
    c.Language = this.contact.language;
    c.About = this.contact.about;
    c.ComGuid = this.contact.comGuid;
    c.Title = this.contact.title;
    c.TagGuid = this.contact.tags;

    this.conservice.update(c).subscribe(
      data => {
        this.toastr.success('Contact Updated Successfully !', 'Updated !');
        this.ngOnInit();
        this.modalService.dismissAll();
        this.loading = false;
      });

   }

   deletemodal(deletecontect, data) {
    this.modalService.open(deletecontect, { centered: true, size: 'sm' });
    this.id = data;
  }

  Delete(guid) {
     this.conservice.delete(guid).subscribe(data=>{
      this.toastr.error('Contact Deleted Successfully !', 'Deleted !');
       this.ngOnInit();
       this.modalService.dismissAll();
       this.router.navigate(['/listcontact/list']);
     });
   }

   convertagent(convert) {
    this.modalService.open(convert, { centered: true, size: 'lg' });
    this.agent.fullname = this.contactname;
    this.agent.email = this.email;
    this.agent.phone = this.phone;
  }
  converttoagent(){
    this.loading = true;

    var opost = new AgentClass();
    opost.Fullname = this.agent.fullname;
    opost.Email = this.agent.email;
    opost.Language = this.agent.language;
    opost.Phone = this.agent.phone;
    opost.Signature = '';
    opost.Uploadphoto = this.logo;
    opost.Timezone = '';
    opost.Occasional = '';
    opost.Gguid = this.agent.groupid;
    opost.RoleGuid = this.agent.role;
    opost.Isactive = 'Active';

    this.agentservice.Add(opost).subscribe(
      data => {
        this.toastr.success('Contact Converted Successfully !', 'Success !');
        this.ngOnInit();
        this.modalService.dismissAll();
        this.loading = false;
      });
  }


  calculateDiff(dateSent){
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    // tslint:disable-next-line: max-line-length
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  timezonedate(date): Date {
    var hour,mins;
    if (this.timezone.startsWith('-')) {
      if (this.timezone.length > 2) {
        hour = this.timezone.substring(1, 3);
        mins = this.timezone.substring(6, 4);
        if(hour === '00') {
          hour = 0;
        } else {
          hour = hour;
        }
      } else {
        hour = this.timezone.substring(0, 2);
        mins = 0;
      }

      date = new Date(date);
      // tslint:disable-next-line: radix
      date.setHours(date.getHours() - parseInt(hour));
      // tslint:disable-next-line: radix
      date.setMinutes(date.getMinutes() - parseInt(mins));
    } else {
      if (this.timezone.length > 2) {
        hour = this.timezone.substring(0, 2);
        if(hour === '00') {
          hour = 0;
        } else {
          hour = hour;
        }
        mins = this.timezone.substring(5, 3);
      } else {
        hour = this.timezone.substring(0, 2);
        mins = 0;
      }

      date = new Date(date);
      // tslint:disable-next-line: radix
      date.setHours(date.getHours() + parseInt(hour));
      // tslint:disable-next-line: radix
      date.setMinutes(date.getMinutes() + parseInt(mins));
    }

  return date;

  }

}
