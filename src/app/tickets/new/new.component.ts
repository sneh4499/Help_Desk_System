import { Dropdown1class } from './../filters/dropdown1class';
import { Dropdown2Service } from './../filters/dropdown2.service';
import { Dropdown1Service } from './../filters/dropdown1.service';
import { environment } from 'src/environments/environment.prod';
import { Notificationclass } from './../notificationclass';
import { NotificationService } from './../notification.service';
import { TypesService } from './../../settings/types/types.service';
import { browser } from 'protractor';
import { Companyclass } from './companyclass';
import { Contactclass } from './contactclass';
import { Ticketclass } from './ticketclass';
import { NewticketservicesService } from './newticketservices.service';
import { CompanyservicesService } from './companyservices.service';
import { NewcontactservicesService } from './newcontactservices.service';
import { EmailservicesService } from './emailservices.service';
import { GroupService } from './../../settings/groups/group.service';
import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/settings/agents/agents.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import * as ClassicEditor from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TagService } from 'src/app/settings/tags/tag.service';
import { CookieService } from 'ngx-cookie-service';
import { SlapolicyService } from 'src/app/settings/policies/slapolicy.service';
import { LoginService } from 'src/app/login/login.service';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dropdown2class } from '../filters/dropdown2class';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  closeDropdownSelection: any;
  public isCollapsed = false;
  public isCollapsed1 = false;
  public Editor = ClassicEditor;
  guid: string;
  ticketdata: any = {};
  contactdata: any = {};
  companydata: any = {};
  updateticketdata: any = {};
  tagdrop: any = {};
  typedrop: any = {};
  contact: any = {};

  dropdownchoices: any = {};
  dropdowndata1: any = {};
  dropdowndata2: any = {};
  dropdowndata2filt: any = {};
  public errormsg = false;
  public showlvl2 = false;
  lvl2text: string;

  ticketsdatatable: any = {};

  public loading: boolean;
  public loadingbtn: boolean;
  public showhelpdrd: boolean;
  public custticketerror: boolean;

  public chk = false;

  timezone: string;

  img: string;
  name: string;
  number: string;
  email: string;
  agentguid: any;
  groupguid: any;

  pipe = new DatePipe('en-US');

  ContactDiv = true;
  ContactDiv1 = false;

  baseurl = environment.baseUrl;
  // tslint:disable-next-line: max-line-length
  constructor(private agentservice: AgentService, private gs: GroupService, private tagservice: TagService,
    private eservice: EmailservicesService, private contaservice: NewcontactservicesService, private slaservice: SlapolicyService,
    private compservice: CompanyservicesService,private ticketservice: NewticketservicesService,
    private toastr: ToastrService, private contactservice: NewcontactservicesService, private router: Router,
    private typeservice: TypesService, private cookie: CookieService, private notificationservice: NotificationService,
    private loginservice: LoginService, private modalService: NgbModal, private dropdown1service: Dropdown1Service, private dropdown2service: Dropdown2Service) {

   }



  ngOnInit() {
    this.custticketerror = false;
    this.showhelpdrd = false;
    this.loadingbtn = false;

    this.dropdown1service.get().subscribe(data => {
      this.dropdowndata1 = data;
    });

    this.dropdown2service.get().subscribe(data => {
      this.dropdowndata2 = data;
    });



    let agents = [];
      this.contactservice.get().subscribe(
        // tslint:disable-next-line: no-shadowed-variable
       data => {
        // tslint:disable-next-line: forin
        for (var d in data) {
          agents.push({item_id: data[d].conGuid, item_text: data[d].fullname});
        }
        this.dropdownList = agents;
      }
    );

    this.tagservice.get().subscribe(data => {
      this.tagdrop = data;
   });


    let groups = [];
      this.gs.get().subscribe(
        // tslint:disable-next-line: no-shadowed-variable
       data => {
        // tslint:disable-next-line: forin
        for (var d in data) {
          groups.push({item_id: data[d].gguid, item_text: data[d].groupname});
        }
        this.groupname = groups;
      }
    );

    this.groupdropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSelection
  };
  this.agentdropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: this.closeDropdownSelection
};

  this.typeservice.get().subscribe(data => {
    this.typedrop = data;
 });

 this.loginservice.getbyid(this.cookie.get('Guid')).subscribe(loginid => {
  this.timezone = loginid['agGu'].timezone;
});


this.ticketservice.get().subscribe(tdata =>{
  this.ticketsdatatable = tdata;
});

// this.dropdown2service.get().subscribe(data => {
//   this.dropdowndata2 = data;
// });

}


 onItemSelect(item: any) {
  this.custticketerror = false;
  this.agentguid = item;

  this.contactservice.getbyid(item.item_id).subscribe(
    // tslint:disable-next-line: no-shadowed-variable
   data => {
     if (data['uploadphoto'] === null) {
      this.img = this.baseurl + 'Resources/Images/userimage.svg';
     } else {
      this.img = this.baseurl + data['uploadphoto'];
     }
      this.name = data['fullname'];
      this.email = data['email'];
      this.number = data['workphone'];
   });
   this.ContactDiv = false;
   this.ContactDiv1 = true;


   let data = this.ticketsdatatable.filter(m => {
    if (m.conGuid === item.item_id) {
      this.custticketerror = true;
      this.ticketdata.agentdrop = null;
      return m;
    }
   });
 }

 onDeselect(item: any) {
  this.ContactDiv = true;
  this.ContactDiv1 = false;
 }

 Groupselect(item: any) {
  this.groupguid = item.item_id;
 }


// tslint:disable-next-line: member-ordering
dropdownList = [];
// tslint:disable-next-line: member-ordering
groupname = [];
// tslint:disable-next-line: member-ordering
agentdrop = [];
// tslint:disable-next-line: member-ordering
referencelist = [];
// tslint:disable-next-line: member-ordering
groups = [];
// tslint:disable-next-line: member-ordering
pickup = [];
// tslint:disable-next-line: member-ordering
selectedItems = [];
// tslint:disable-next-line: member-ordering
singleselectedItems = [];
// tslint:disable-next-line: member-ordering
agentdropdownSettings = {};
// tslint:disable-next-line: member-ordering
groupdropdownSettings = {};
// tslint:disable-next-line: member-ordering
// closeDropdownSelection = false;

 onTemplateFormSubmit(){

  this.loading = true;

     var opost = new Ticketclass();

    if (this.agentguid === undefined) {
      var c = new Contactclass();

    c.Uploadphoto = 'Resources/Images/userimage.svg';
    c.Fullname = this.contact.fullname;
    c.Email = this.contact.email;
    c.Mobilephone = this.contact.mobilephone;

    this.contactservice.Add(c).subscribe(data => {
      opost.ConGuid = data;

      opost.Subject = this.ticketdata.subject;
     opost.Status = this.ticketdata.status;
     opost.Priority = this.ticketdata.priority;
      opost.Gguid = this.groupguid;
      opost.Description = this.ticketdata.Description;
      opost.TagGuid = this.ticketdata.tags;
     // opost.CustGuid = this.ticketdata.custguid;
     // opost.AgGuid = this.ticketdata.agentsingle;
     opost.TypeGuid = this.ticketdata.type;
     opost.Resolutionduedate = this.ticketdata.resolutionduedate;
     opost.Dropdown1 = this.ticketdata.needhelp;
     opost.Dropdown2 = this.ticketdata.helpyou;
     opost.Contactno = this.ticketdata.contactno;
     opost.Propertyadd = this.ticketdata.propertyadd;
     opost.Invoiceno = this.ticketdata.invoiceno;

     this.ticketservice.Add(opost).subscribe(data2 => {

      var noti = new Notificationclass();
      noti.ConGuid = data;
      noti.Header = 'New Ticket Created';
      noti.Message = this.ticketdata.subject;
      noti.Status = '1';
      noti.Tguid = data2;
      this.notificationservice.Add(noti).subscribe(data1 => {
      });

        this.toastr.success('Ticket Created Successfully !', 'Success!');
        this.ngOnInit();
        this.loading = false;
        // this.ticketdata = '';
        if (this.chk === undefined || this.chk === false) {
          this.router.navigate(['tickets/filters/all-tickets']);
        } else {
          this.router.navigate(['tickets/new']);
        }
    });
    });
    } else {
       opost.ConGuid = this.agentguid.item_id;

       opost.Subject = this.ticketdata.subject;
     opost.Status = this.ticketdata.status;
     opost.Priority = this.ticketdata.priority;
      opost.Gguid = this.groupguid;
      opost.Description = this.ticketdata.Description;
      opost.TagGuid = this.ticketdata.tags;
     // opost.CustGuid = this.ticketdata.custguid;
     // opost.AgGuid = this.ticketdata.agentsingle;
     opost.TypeGuid = this.ticketdata.type;
     opost.Resolutionduedate = this.ticketdata.resolutionduedate;
     opost.Dropdown1 = this.ticketdata.needhelp;
     opost.Dropdown2 = this.ticketdata.helpyou;
     opost.Contactno = this.ticketdata.contactno;
     opost.Propertyadd = this.ticketdata.propertyadd;
     opost.Invoiceno = this.ticketdata.invoiceno;

     this.ticketservice.Add(opost).subscribe(data => {

      var noti = new Notificationclass();
      noti.ConGuid = this.agentguid.item_id;
      noti.Header = 'New Ticket Created';
      noti.Message = this.ticketdata.subject;
      noti.Status = '1';
      noti.Tguid = data;
      this.notificationservice.Add(noti).subscribe(data1 => {
      });

        this.toastr.success('Ticket Created Successfully !', 'Success!');
        this.ngOnInit();
        this.loading = false;
        // this.ticketdata = '';
        if (this.chk === undefined || this.chk === false) {
          this.router.navigate(['tickets/filters/all-tickets']);
        } else {
          this.router.navigate(['tickets/new']);
        }
    });
    }
  }

div: boolean = true;
div1: boolean;
div2: boolean;
div3: boolean = true;

  div1Function()
  {
    this.div1 = true;
    this.div = false;
    this.div2 = false;
  }
  div2Function()
  {
    this.div = true;
    this.div1 = false;
    this.div2 = false;
    this.div3 = true;
  }
  div3Function()
  {
    this.div2 = true;
    this.div3 = false;
  }


side:boolean = true;
hiddenbt: boolean =false;
  divside1Function()
  {
    this.side = false;
    this.hiddenbt = true;
  }
  divside2Function()
  {
    this.side = true;
    this.hiddenbt = false;
  }

  // tslint:disable-next-line: member-ordering
  public itemsList: Object[] = [
    {
      title: 'Collapsible Group Item #1',
      // tslint:disable-next-line: max-line-length
      description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
    },
    {
      title: 'Collapsible Group Item #2',
      // tslint:disable-next-line: max-line-length
      description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
    },
    {
      title: 'Collapsible Group Item #3',
      // tslint:disable-next-line: max-line-length
      description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
    }
  ];

  toggleEditable(event) {
    if ( event.target.checked ) {
        this.chk = true;
   } else {
     this.chk = false;
   }
}

  addtoresolutiondate(data): Date {
    let days = data.substring(0, 2);
    let hours = data.substring(3, 5);
    let mins = data.substring(6, 8);

    if (days < 10 && days > 0) {
      // tslint:disable-next-line: radix
      days = parseInt(days.replace(/^0+/, ''));
    } else {
      days = 0;
    }

    if (hours < 10 && hours > 0) {
      // tslint:disable-next-line: radix
      hours = parseInt(hours.replace(/^0+/, ''));
    } else {
      hours = 0;
    }

    if (mins < 10 && mins > 0) {
      // tslint:disable-next-line: radix
      mins = parseInt(mins.replace(/^0+/, ''));
    } else {
      mins = 0;
    }

    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + mins);

    let datet = this.timezonedate(date);

    return datet;
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

  a(dataa) {
    let rdate: any;
    this.slaservice.getbyid('e03d4754-fa06-41cf-b0cb-d59a2ff18751').subscribe(data => {
      if (dataa === 'Urgent') {
        rdate = new Date(this.addtoresolutiondate(data['urgentresolutiontime']));
      } else if (dataa === 'High') {
        rdate = new Date(this.addtoresolutiondate(data['highresolutiontime']));
      } else if (dataa === 'Medium') {
        rdate = new Date(this.addtoresolutiondate(data['mediumresolutiontime']));
      } else if (dataa === 'Low') {
        rdate = new Date(this.addtoresolutiondate(data['lowresolutiontime']));
      }

      rdate = this.pipe.transform(rdate, 'yyyy-MM-ddThh:mm');
      this.ticketdata.resolutionduedate = rdate;
    });
  }


  addcontact() {
    let a: any;
    var c = new Contactclass();

    c.Uploadphoto = 'Resources/Images/userimage.svg';
    c.Fullname = this.contact.fullname;
    c.Email = this.contact.email;
    c.Mobilephone = this.contact.mobilephone;

    this.contactservice.Add(c).subscribe(data => {
      a = data;
    });
  }


  checknumber(data) {
    if(isNaN(data)) {
      return false;
    } else {
      return true;
    }
  }

  helpdropdown() {
    this.showhelpdrd = true;

    this.dropdowndata2filt = this.dropdowndata2.filter(m => {
      if (m.drd1Gu['drdtext'] === this.ticketdata.needhelp) {
        return m;
      }
    });
  }

  addmodal(editcontect){
   this.modalService.open(editcontect, { centered: true, size: 'lg' });

    this.dropdown1service.get().subscribe(data => {
      this.dropdowndata1 = data;
    });
    // this.gs.getbyid(data1).subscribe(data => {
    //    this.loadingdata=false;
    //   this.group = data;
    // });
  }

  addlvl1(){
    this.errormsg = false;
    if(this.dropdownchoices.drd1 === undefined){
      this.errormsg = true;
    } else {
      this.loadingbtn = true;

      var drd1 = new Dropdown1class();

      drd1.Drdtext = this.dropdownchoices.drd1;

      this.dropdown1service.Add(drd1).subscribe(data2 => {
        this.loadingbtn = false;
        this.dropdownchoices.drd1 = "";
        this.dropdown1service.get().subscribe(data => {
          this.dropdowndata1 = data;
        });
      });

    }
  }

  dltdrd1(id){
    this.dropdown1service.delete(id).subscribe(data1 => {
      this.dropdown1service.get().subscribe(data => {
        this.dropdowndata1 = data;
      });
    });
  }

  viewlvl1byid(id, name) {
    this.loading = true;
    this.showlvl2 = true;
    this.lvl2text = name;

    this.dropdownchoices.drd1id = id;

    this.dropdowndata2filt = this.dropdowndata2.filter(m => {
      if (m.drd1Guid === id) {
        return m;
      }
    });
    this.loading = false;
  }

  addlvl2(){
    this.errormsg = false;
    if(this.dropdownchoices.drd2 === undefined){
      this.errormsg = true;
    } else {
      this.loadingbtn = true;

      var drd2 = new Dropdown2class();

      drd2.Drdtext = this.dropdownchoices.drd2;
      drd2.Drd1Guid = this.dropdownchoices.drd1id;

      this.dropdown2service.Add(drd2).subscribe(data2 => {
        this.loadingbtn = false;
        this.dropdownchoices.drd2 = "";
        this.dropdown2service.get().subscribe(data => {
          this.dropdowndata2 = data;

          this.dropdowndata2filt = this.dropdowndata2.filter(m => {
            if (m.drd1Guid === this.dropdownchoices.drd1id) {
              return m;
            }
          });
        });
      });

    }
  }

  dltdrd2(id){
    this.dropdown2service.delete(id).subscribe(data1 => {
      this.dropdown2service.get().subscribe(data => {
        this.dropdowndata2 = data;

        this.dropdowndata2filt = this.dropdowndata2.filter(m => {
          if (m.drd1Guid === this.dropdownchoices.drd1id) {
            return m;
          }
        });
      });
    });
  }

}

