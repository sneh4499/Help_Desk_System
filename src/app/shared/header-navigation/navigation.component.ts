import { environment } from 'src/environments/environment.prod';
import { RoleService } from './../../settings/roles/role.service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { DetailTicketComponent } from './../../tickets/detail-ticket/detail-ticket.component';
import { NotificationService } from './../../tickets/notification.service';
import { LoginService } from './../../login/login.service';
import { CompanyservicesService } from './../../tickets/new/companyservices.service';
import { Contactclass } from './../../tickets/new/contactclass';
import { Component, AfterViewInit, EventEmitter, Output, Input, ViewChild, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AgentService } from 'src/app/settings/agents/agents.service';
import { CookieService } from 'ngx-cookie-service';

import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NewcontactservicesService } from 'src/app/tickets/new/newcontactservices.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Companyclass } from 'src/app/tickets/new/companyclass';
import { TagService } from 'src/app/settings/tags/tag.service';
import { NewticketservicesService } from 'src/app/tickets/new/newticketservices.service';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  @ViewChild('f', {static:true}) validationForm: FormGroup;
  regularForm: FormGroup;

  company: any = {};
  agentdata: any = {};
  contact: any = {};
  companydrop: any = {};
  tagdrop: any = {};

  searchtickets: any = {};
  ticketssearched : any = {};
  searchcontacts: any = {};
  contactsssearched : any = {};

  timezone: string;

  datenow: any;
  roleguid: any;

  public notificationdot = false;

  public viewcontact = false;
  public viewcompany = false;
  notilength: any;

  url = environment.baseUrl;

  public loading: boolean;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();
  imgpath: string;
  public progress: number;
  public message: string;

  count = [];

  @Input() layout;
  pageInfo;

  angForm: FormGroup;
  constructor(
    private router: Router,
    private loginservice: LoginService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private modalService: NgbModal,
    private agentservice: AgentService,
    private notificationservice: NotificationService,
    private cookie: CookieService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private roleservice: RoleService,
    private http: HttpClient,
    private tagservice: TagService,
    private contactservice: NewcontactservicesService,
    private companyservice: CompanyservicesService,
    private AllticketService: NewticketservicesService,
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(event => {
        this.titleService.setTitle(event['title']);
        this.pageInfo = event;
      });

      this.loginservice.getbyid(this.cookie.get('Guid')).subscribe(
        data => {
         this.agentdata = data;
        }
      );

  }

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  // This is for Notifications
  notifications: Object[] = [
    // {
    //   btn: 'btn-danger',
    //   icon: 'ti-link',
    //   title: 'Luanch Admin',
    //   subject: 'Just see the my new admin!',
    //   time: '9:30 AM'
    // },
    // {
    //   btn: 'btn-success',
    //   icon: 'ti-calendar',
    //   title: 'Event today',
    //   subject: 'Just a reminder that you have event',
    //   time: '9:10 AM'
    // },
    // {
    //   btn: 'btn-info',
    //   icon: 'ti-settings',
    //   title: 'Settings',
    //   subject: 'You can customize this template as you want',
    //   time: '9:08 AM'
    // },
    // {
    //   btn: 'btn-primary',
    //   icon: 'ti-user',
    //   title: 'Pavan kumar',
    //   subject: 'Just see the my admin!',
    //   time: '9:00 AM'
    // }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  ngAfterViewInit() {
    this.companyservice.get().subscribe(data => {
      this.companydrop = data;
   });

   this.tagservice.get().subscribe(data => {
    this.tagdrop = data;
    });

  // this.notificationservice.get().subscribe(data => {
  //   // tslint:disable-next-line: forin
  //   for(let d in data) {
  //     if(data[d].status === '1'){
  //       this.count.push(data);
  //     }
  //   }
  // });

  this.notificationservice.get().subscribe(data => {
    // tslint:disable-next-line: forin
    for(let d in data) {
      this.notifications.push({
        btn: 'btn-primary',
        icon: 'fas fa-ticket-alt',
        title: data[d].header,
        subject: data[d].message,
        time: data[d].date
      });
    }
    this.notilength = this.notifications.length;
  });


  this.a();

  this.loginservice.getbyid(this.cookie.get('Guid')).subscribe(loginid => {
    this.timezone = loginid['agGu'].timezone;
  });


    if (this.cookie.get('Guid') === '') {
      this.router.navigate(['login']);
    }
    if (this.cookie.get('RoleGuid') === '') {
      this.router.navigate(['login']);
    }

    this.roleguid = this.cookie.get('RoleGuid');

    this.roleservice.getbyid(this.roleguid).subscribe(data => {
      if (data['createcontact'] === 'false') {
        this.viewcontact = false;
      } else {
        this.viewcontact = true;
      }
      if (data['createcompany'] === 'false') {
        this.viewcompany = false;
      } else {
        this.viewcompany = true;
      }

    });

    this.AllticketService.get().subscribe(
      data => {
        const someObj = {
          *[Symbol.iterator] () {
            yield data;
          }
        };
      this.searchtickets = [...someObj];
      });

      this.contactservice.get().subscribe(
        data => {
         const someObj = {
          *[Symbol.iterator] () {
            yield data;
            }
          };
          this.searchcontacts = [...someObj];
        });
  }

  contactmodal(contactcontent) {
    this.modalService.open(contactcontent, { centered: true, size: 'lg' });
  }

  companymodal(companycontent) {
    this.modalService.open(companycontent, { centered: true, size: 'lg' });
  }

  Addcontact(){
    this.loading = true;

    const emails = [];
    this.loginservice.get().subscribe(logindata => {
      // tslint:disable-next-line: forin
      for (let d in logindata) {
        emails.push('', logindata[d].email);
      }
      if (emails.includes(this.contact.email)) {
        this.toastr.error('Email is already Exist !', 'Error !');
        this.loading = false;
        this.contact.email = '';
      } else {

        var c = new Contactclass();

        if (this.imgpath == null) {
          c.Uploadphoto = 'Resources/Images/userimage.svg';
          } else {
            c.Uploadphoto = this.imgpath;
          }

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

        // console.log(c);

        this.contactservice.Add(c).subscribe(data => {
          this.loading = false;
          this.toastr.success('New Contact Added Successfully!', 'Success !');
          this.contact = '';
          this.imgpath = null;
          this.message = null;
          this.modalService.dismissAll();
      });
      }
    });
  }

  Addcompany(){
    this.loading = true;

    var com = new Companyclass();

    if (this.imgpath == null) {
      com.Uploadlogo = 'Resources/Images/userimage.svg';
      } else {
        com.Uploadlogo = this.imgpath;
      }

    com.Companyname = this.company.companyname;
    com.Description = this.company.description;
    com.Notes = this.company.notes;
    com.Domainforthiscompany = this.company.domainforthiscompany;

    // console.log(com);

    this.companyservice.Add(com).subscribe(data => {
      this.loading = false;
      this.toastr.success('New Company Added Successfully!', 'Success !');
      this.company = '';
      this.imgpath = null;
      this.message = null;
      this.ngAfterViewInit();
      this.modalService.dismissAll();
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

  a () {
    // tslint:disable-next-line: no-unused-expression
    setInterval(() => {
      this.notificationservice.get().subscribe(data => {
        this.notifications = [];
        // tslint:disable-next-line: forin
        for(let d in data) {
          this.notifications.push({
            btn: 'btn-primary',
            icon: 'fas fa-ticket-alt',
            title: data[d].header,
            subject: data[d].message,
            time: data[d].date
          });
        }
        if (this.notilength < this.notifications.length) {
          this.notificationdot = true;
          this.playAudio();
          console.log('New');
          this.notilength = this.notifications.length;
        } else {
          console.log('Old');
        }
      });

    }, 30000);
  }

  playAudio(){
    // tslint:disable-next-line: prefer-const
    let audio = new Audio();
    audio.src = '/assets/tone.wav';
    audio.load();
    audio.play();
  }

  noti () {
    this.notificationdot = false;
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    if(val.length === 0) {
      this.ticketssearched.length = 0;
      this.contactsssearched.length = 0;
    } else {
      const temp = this.searchtickets[0].filter(function (d) {
        return d.subject.toLowerCase().indexOf(val) !== -1 || !val;
     });

     this.ticketssearched = temp;


     const temp1 = this.searchcontacts[0].filter(function (d) {
       return d.fullname.toLowerCase().indexOf(val) !== -1 || !val;
     });

     this.contactsssearched = temp1;
    }

  }

  number(data) {
    if(isNaN(data)) {
      return false;
    } else {
      return true;
    }
  }

}
