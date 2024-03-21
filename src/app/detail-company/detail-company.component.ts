import { environment } from 'src/environments/environment.prod';
import { NewcontactservicesService } from 'src/app/tickets/new/newcontactservices.service';
import { AgentService } from 'src/app/settings/agents/agents.service';
import { NewagentComponent } from './../settings/agents/newagent/newagent.component';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Companyclass } from '../tickets/new/companyclass';
import { CompanyservicesService } from '../tickets/new/companyservices.service';
import { CookieService } from 'ngx-cookie-service';
import { RoleService } from '../settings/roles/role.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-detail-company',
  templateUrl: './detail-company.component.html',
  styleUrls: ['./detail-company.component.css']
})
export class DetailCompanyComponent implements OnInit {

  public loading = false;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();
  imgpath: string;
  public progress: number;
  public message: string;
  company: any = {};

  contactlist: any = {};
  ticketattach: any = {};
  ticketarray = [];

  timezone: string;

  id: any;
  guid: any;
  companyname: any;
  note: any;
  logo: any;
  url = environment.baseUrl;
  contact: any;
  description: any;
  website: any;
  roleguid: any;
  public editbtn = false;
  public dltdtn = false;

  constructor(private route: ActivatedRoute, private loginservice: LoginService,
    private comservice: CompanyservicesService, private contactservice: NewcontactservicesService,
    private router: Router, private agentservice: AgentService, private cookie: CookieService, private roleservice: RoleService,
    private http: HttpClient, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.guid = params['id'];
    });

    if(this.guid == null){
      this.router.navigate(['/listcompanies/list']);
    }

    this.comservice.getbyid(this.guid).subscribe(
      data => {
        this.companyname = data['companyname'];
        this.logo = data['uploadlogo'];
        this.note = data['notes'];
        this.contact = data['contact'];
        this.description = data['description'];
        this.website = data['domainforthiscompany'];

        this.loginservice.getbyid(this.cookie.get('Guid')).subscribe(loginid => {
          this.timezone = loginid['agGu'].timezone;
        });
      }
    );

    this.contactservice.get().subscribe(
      data => {
        this.contactlist = data;
      }
    );

    this.comservice.getbycompanyid(this.guid).subscribe(
      data => {
        // tslint:disable-next-line: forin
        for (var d in data) {
         this.ticketattach = data[d].ticket;
         // tslint:disable-next-line: forin
         for (var t in this.ticketattach) {
          this.ticketarray.push(this.ticketattach[t]);
         }
        }
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
      if (data['createcompany'] === 'false') {
        this.editbtn = true;
      } else {
        this.editbtn = false;
      }
      if (data['deletecompany'] === 'false') {
        this.dltdtn = true;
      } else {
        this.dltdtn = false;
      }

    });

  }



  deletemodal(deletecontect, data) {
    this.modalService.open(deletecontect, { centered: true, size: 'sm' });
    this.id = data;
  }

  Delete(guid) {
     this.comservice.delete(guid).subscribe(data=>{
      this.toastr.error('Company Deleted Successfully !', 'Deleted !');
       this.ngOnInit();
       this.modalService.dismissAll();
       this.router.navigate(['/listcompanies/list']);
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
    this.http.post('https://localhost:44333/api/upload', formData, {reportProgress: true, observe: 'events'})
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

    this.comservice.getbyid(data1).subscribe(
      data => {
      // this.group = data;
      this.company.comguid = data['comGuid'];
      this.company.companyname = data['companyname'];
      this.company.description = data['description'];
      this.company.notes = data['notes'];
      this.company.domainforthiscompany = data['domainforthiscompany'];
      this.company.industry = data['industry'];
      this.imgpath = data['uploadlogo'];

      // console.log(data);
      });
   }
   update(){
    this.loading = true;

    var opost = new Companyclass();
    opost.ComGuid = this.company.comguid;
    opost.Companyname = this.company.companyname;
    opost.Description = this.company.description;
    opost.Notes = this.company.notes;
    opost.Domainforthiscompany = this.company.domainforthiscompany;
    opost.Uploadlogo = this.imgpath;


    this.comservice.update(opost).subscribe(
      data => {
        this.toastr.success('Company Updated Successfully !', 'Updated !');
        this.ngOnInit();
        this.modalService.dismissAll();
        this.loading = false;
      });

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
