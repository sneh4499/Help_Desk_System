import { LoginService } from './../../login/login.service';
import { environment } from 'src/environments/environment.prod';
import { TicketforwardClass } from './ticketforwardclass';
import { TicketreplyService } from './ticketreply.service';
import { TicketreplyClass } from './ticketreplyclass';
import { AgentService } from 'src/app/settings/agents/agents.service';
import { Ticketclass } from './../new/ticketclass';
import { NewticketservicesService } from './../new/newticketservices.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NewcontactservicesService } from '../new/newcontactservices.service';
import { GroupService } from 'src/app/settings/groups/group.service';
import { TagService } from 'src/app/settings/tags/tag.service';
import { TypesService } from 'src/app/settings/types/types.service';
import { CookieService } from 'ngx-cookie-service';
import { RoleService } from 'src/app/settings/roles/role.service';
import { SlapolicyService } from 'src/app/settings/policies/slapolicy.service';
import { HelpdeskService } from 'src/app/settings/helpdesk/helpdesk.service';
import { time } from 'console';
import { Dropdown1Service } from '../filters/dropdown1.service';
import { Dropdown2Service } from '../filters/dropdown2.service';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.css']
})
export class DetailTicketComponent implements OnInit {

  public replyblock = false;
  public forwardblock = false;

  public loadingdata: boolean;
  public dateloader: boolean;
  public showhelpdrd: boolean;


  guid: any;
  groupguid: any;
  agentguid: any;
  conguid: any;
  public isCollapsed1 = false;
  public showduedate = false;
  closeDropdownSelection: any;
  public loading: boolean;
  ticketdata: any = {};
  public Editor = ClassicEditor;
  tagdrop: any = {};
  typedrop: any = {};

  replies: any = {};
  ticketdatabyid: any = {};

  dropdowndata1: any = {};
  dropdowndata2: any = {};
  dropdowndata2filt: any = {};

  date: Date;
  firstresdate: Date;
  datewithtimezone: Date;
  resolutionduedate: any;
  ticketreplyagid: any;

  public canreply = false;
  public canforward = false;
  public canclose = false;
  public canedit = false;
  public candlt = false;
  public canupdate = false;
  public cangroupchange = false;
  public canagentchange = false;

  priochange: string;
  timezone: string;

  policyresponse: any;
  dateformat: any;

  subject: string;
  discription: string;
  priority: String;
  gguid: any;
  agguid: any;

  name: string;
  img: string;
  email: string;
  workphone: string;
  mobile: string;
  tstatus: string;
  baseurl = environment.baseUrl;

  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute,
    private contaservice: NewcontactservicesService, private agentservice: AgentService, private gs: GroupService,
    private toastr: ToastrService, private ticketservice: NewticketservicesService, private tagservice: TagService,
    private typeservice: TypesService, private replyticket: TicketreplyService, private cookie: CookieService,
    private roleservice: RoleService, private slaservice: SlapolicyService, private helpdeskservice: HelpdeskService,
    private loginservice: LoginService, private dropdown1service: Dropdown1Service, private dropdown2service: Dropdown2Service) { }

  ngOnInit() {

    this.loadingdata = true;
    this.dateloader = true;


    this.dropdown1service.get().subscribe(data => {
      this.dropdowndata1 = data;
    });

    this.dropdown2service.get().subscribe(data => {
      this.dropdowndata2 = data;
    });

    this.route.queryParams.subscribe(params => {
      this.guid = params['id'];
    });

    if (this.cookie.get('Guid') === '') {
      this.router.navigate(['login']);
    }

    if (this.cookie.get('RoleGuid') === '') {
      this.router.navigate(['login']);
    }

    this.roleservice.getbyid(this.cookie.get('RoleGuid')).subscribe(roledata => {
      this.loadingdata = false;
      if (roledata['replytoticket'] === 'true') {
        this.canreply = true;
      } else {
        this.canreply = false;
      }

      if (roledata['forwardticket'] === 'true') {
        this.canforward = true;
      } else {
        this.canforward = false;
      }

      if (roledata['editticket'] === 'true') {
        this.canedit = true;
        this.cangroupchange = true;
        this.canagentchange = true;
      } else {
        this.canedit = false;
        this.canagentchange = false;
      }

      if (roledata['deleteticket'] === 'true') {
        this.candlt = true;
      } else {
        this.candlt = false;
      }

    });


    this.tagservice.get().subscribe(data => {
      this.tagdrop = data;
   });

   this.replyticket.getbyid(this.guid).subscribe(data => {
    this.replies = data;

    this.helpdeskservice.getbyid('7b09c997-5afa-405e-9b78-3d8e403b4169').subscribe(data => {
      this.dateformat = data['datesformat'] + ', hh:mm a';

      if(this.replies.length > 0) {
        if (data['sortconversation'] === 'Show oldest on top') {
          this.sortDatadesc();
        } else {
          this.sortDataasc();
        }
      }
     });
  });



   this.typeservice.get().subscribe(data => {
    this.typedrop = data;
  });

    this.ticketservice.getbyid(this.guid).subscribe(
      data => {

        this.ticketdatabyid = data;

      this.name = data['conGu'].fullname;
      this.img = data['conGu'].uploadphoto;
      this.workphone = data['conGu'].workphone;
      this.mobile = data['conGu'].mobilephone;
      this.email = data['conGu'].email;
      this.date = data['datetime'];
      this.resolutionduedate = data['resolutionduedate'];
      this.ticketdata.needhelp = data['dropdown1'];
      this.ticketdata.contactno = data['contactno'];
      this.ticketdata.propertyadd = data['propertyadd'];
      this.ticketdata.invoiceno = data['invoiceno'];

      if(this.ticketdata.needhelp !== ""){
        this.dropdowndata2filt = this.dropdowndata2.filter(m => {
          if (m.drd1Gu['drdtext'] === this.ticketdata.needhelp) {
            return m;
          }
        });
      this.ticketdata.helpyou = data['dropdown2'];
      }

      if (data['agGuid'] == null) {

      } else {
        this.agguid = data['agGu'].agGuid;
        let agentd = [];
        agentd.push({item_id: data['agGu'].agGuid, item_text: data['agGu'].fullname});
        this.ticketdata.agents = agentd;
        // this.ticketreplyagid = data['agGu'].agGuid;
      }

      if (data['ggu'] == null) {

      } else {
      this.gguid = data['ggu'].gguid;
      let groupd = [];
      groupd.push({item_id: data['ggu'].gguid, item_text: data['ggu'].groupname});
      this.ticketdata.groups = groupd;
      }

      if (data['tagGu'] == null) {

      } else {
        let taggu = data['tagGu'];
        this.ticketdata.tags = taggu['tagGuid'];
      }

      if (data['typeGu'] == null) {

      } else {
        this.ticketdata.type = data['typeGu'].typeGuid;
      }

      this.tstatus = data['status'];
      this.ticketdata.status = data['status'];
      this.ticketdata.priority = data['priority'];
      this.subject = data['subject'];
      this.discription = data['description'];
      this.priority = data['priority'];
      this.conguid = data['conGu'].conGuid;


      this.loginservice.getbyid(this.cookie.get('Guid')).subscribe(loginid => {
        this.timezone = loginid['agGu'].timezone;
        this.ticketreplyagid = loginid['agGu'].agGuid;
        this.datewithtimezone = this.timezonedate(this.date);

        this.slaservice.getbyid('e03d4754-fa06-41cf-b0cb-d59a2ff18751').subscribe(data => {
          if (this.priority === 'Urgent') {
            this.policyresponse = data['urgentresponsetime'];
          } else if (this.priority === 'High') {
            this.policyresponse = data['highresponsetime'];
          } else if (this.priority === 'Medium') {
            this.policyresponse = data['mediumresponsetime'];
          } else if (this.priority === 'Low') {
            this.policyresponse = data['lowresponsetime'];
          }

          this.firstresdate = this.addDays();
        });

        let opendate = this.timezonedate(data['datetime']);

        let end_Date = new Date();
        // tslint:disable-next-line: radix
        end_Date.setDate(end_Date.getDate() - 25);

        if (opendate <= end_Date) {
          this.cangroupchange = false;
        }

      });

      // tslint:disable-next-line: max-line-length
      this.ticketdata.forward = 'Please take a look at ticket raised by ' + this.name + ' (' + this.email + ').<br>Subject - <b>' + this.subject + '<span>' + this.discription + '</span>';

     });



    this.agentdropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSelection
  };
  let contacts = [];
      this.contaservice.get().subscribe(
        // tslint:disable-next-line: no-shadowed-variable
       data => {
        // tslint:disable-next-line: forin
        for (var d in data) {
          contacts.push({item_id: data[d].conGuid, item_text: data[d].fullname});
        }
        this.dropdownList = contacts;
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
  this.agentsdropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: this.closeDropdownSelection
  };

  let agents = [];
      this.agentservice.get().subscribe(
        // tslint:disable-next-line: no-shadowed-variable
       data => {
        // tslint:disable-next-line: forin
        for (var d in data) {
          agents.push({item_id: data[d].agGuid, item_text: data[d].fullname});
        }
        this.agentname = agents;
      }
    );

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

  }

  deletemodal(deletecontect) {
    this.modalService.open(deletecontect, { centered: true, size: 'sm' });
  }

  Delete() {
    this.loading = true;
     this.ticketservice.delete(this.guid).subscribe(data=>{
      this.toastr.error('Ticket Deleted Successfully !', 'Deleted !');
       this.ngOnInit();
       this.modalService.dismissAll();
       this.router.navigate(['/tickets/filters/all-tickets']);
     });
   }

   editmodal(editcontent){
    this.modalService.open(editcontent, { centered: true, size: 'lg' });

    let contact = [];
    this.ticketservice.getbyid(this.guid).subscribe(
      data => {
      this.ticketdata.subject = data['subject'];
      this.ticketdata.Description = data['description'];
      contact.push({item_id: data['conGu'].conGuid, item_text: data['conGu'].fullname});
      this.ticketdata.agentdrop = contact;
      this.conguid = data['conGu'].conGuid;
     });

   }

   onItemSelect(item: any) {
    this.conguid = item.item_id;
   }

   update(){
    this.loading = true;

    var c = new Ticketclass();

      c.TGuid = this.guid;
      c.ConGuid = this.conguid;
      c.Subject = this.ticketdata.subject;
      c.Description = this.ticketdata.Description;
      c.Status = this.tstatus;
      c.Priority = this.priority;
      c.ConGuid = this.conguid;
      if (this.agentguid == null) {
        c.AgGuid = this.agguid;
      } else {
        c.AgGuid = this.agentguid;
      }

      if (this.groupguid == null) {
        c.Gguid = this.gguid;
      } else {
        c.Gguid = this.groupguid;
      }
      c.TagGuid = this.ticketdata.tags;
      c.Dropdown1 = this.ticketdata.needhelp;
      c.Dropdown2 = this.ticketdata.helpyou;
      c.Contactno = this.ticketdata.contactno;
      c.Propertyadd = this.ticketdata.propertyadd;
      c.Invoiceno = this.ticketdata.invoiceno;


    this.ticketservice.update(c).subscribe(
      data => {
        this.toastr.success('Ticket Updated Successfully !', 'Updated !');
        this.ngOnInit();
        this.modalService.dismissAll();
        this.loading = false;
      });

   }


   Groupselect(item: any){
    this.groupguid = item.item_id;
   }

   Agentselect(item: any){
    this.agentguid = item.item_id;
  }

  changesstatus(){
    this.loading = true;
    var st = new Ticketclass();

      st.TGuid = this.guid;
      if (this.agentguid == null) {
        st.AgGuid = this.agguid;
      } else {
        st.AgGuid = this.agentguid;
      }

      if (this.groupguid == null) {
        st.Gguid = this.gguid;
      } else {
        st.Gguid = this.groupguid;
      }

      st.Status = this.ticketdata.status;
      st.Priority = this.ticketdata.priority;
      st.Subject = this.subject;
      st.Description = this.discription;
      st.ConGuid = this.conguid;
      st.TagGuid = this.ticketdata.tags;
      st.TypeGuid = this.ticketdata.type;
      st.Dropdown1 = this.ticketdata.needhelp;
      st.Dropdown2 = this.ticketdata.helpyou;
      st.Contactno = this.ticketdata.contactno;
      st.Propertyadd = this.ticketdata.propertyadd;
      st.Invoiceno = this.ticketdata.invoiceno;

      if (this.priochange === undefined) {
        st.Resolutionduedate = this.resolutionduedate;
      } else {
        st.Resolutionduedate = this.priochange;
      }

      if(this.ticketdata.status === 'Resolved') {
        st.Resolveddate = new Date();
       }

      this.ticketservice.update(st).subscribe(
        data => {
          this.toastr.success('Ticket Updated Successfully !', 'Updated !');
          this.ngOnInit();
          this.loading = false;
          this.showduedate = false;
       });
  }


  updateresolutionduedate() {

    this.loading = true;
    var st = new Ticketclass();

      st.TGuid = this.guid;
      if (this.agentguid == null) {
        st.AgGuid = this.agguid;
      } else {
        st.AgGuid = this.agentguid;
      }

      if (this.groupguid == null) {
        st.Gguid = this.gguid;
      } else {
        st.Gguid = this.groupguid;
      }

      st.Status = this.ticketdata.status;
      st.Priority = this.ticketdata.priority;
      st.Subject = this.subject;
      st.Description = this.discription;
      st.ConGuid = this.conguid;
      st.TagGuid = this.ticketdata.tags;
      st.TypeGuid = this.ticketdata.type;
      st.Resolutionduedate = this.ticketdata.resolutionduedate;
      st.Dropdown1 = this.ticketdata.needhelp;
      st.Dropdown2 = this.ticketdata.helpyou;
      st.Contactno = this.ticketdata.contactno;
      st.Propertyadd = this.ticketdata.propertyadd;
      st.Invoiceno = this.ticketdata.invoiceno;

      this.ticketservice.update(st).subscribe(
        data => {
          this.toastr.success('Resolution Due Date Updated Successfully !', 'Updated !');
          this.ngOnInit();
          this.loading = false;
          this.showduedate = false;
       });
  }


   // tslint:disable-next-line: member-ordering
 dropdownList = [];
 // tslint:disable-next-line: member-ordering
 agentdropdownSettings = {};
 // tslint:disable-next-line: member-ordering
 agentsdropdownSettings = {};
 // tslint:disable-next-line: member-ordering
 groupname = [];
 // tslint:disable-next-line: member-ordering
 agentname = [];
 // tslint:disable-next-line: member-ordering
 groupdropdownSettings = {};



 closeticket(){
  var st = new Ticketclass();

      st.TGuid = this.guid;

      if (this.agentguid == null) {
        st.AgGuid = this.agguid;
      } else {
        st.AgGuid = this.agentguid;
      }

      if (this.groupguid == null) {
        st.Gguid = this.gguid;
      } else {
        st.Gguid = this.groupguid;
      }

      st.Status = 'Close';
      st.Priority = this.ticketdata.priority;
      st.Subject = this.subject;
      st.Description = this.discription;
      st.ConGuid = this.conguid;
      st.TagGuid = this.ticketdata.tags;
      st.TypeGuid = this.ticketdata.type;
      st.Resolutionduedate = this.ticketdata.resolutionduedate;

      st.Dropdown1 = this.ticketdata.needhelp;
      st.Dropdown2 = this.ticketdata.helpyou;
      st.Contactno = this.ticketdata.contactno;
      st.Propertyadd = this.ticketdata.propertyadd;
      st.Invoiceno = this.ticketdata.invoiceno;

this.ticketservice.update(st).subscribe(
  data => {
    this.toastr.success('Ticket Closed Successfully !', 'Closed !');
    this.ngOnInit();
    this.loading = false;
  });
 }

 reply(){
   this.replyblock = true;
 }
 closereply(){
   this.replyblock = false;
   this.forwardblock = false;
 }

 forward(){
  this.forwardblock = true;
}

  forwardreply(){
    this.loading = true;

    var tickfor = new TicketforwardClass();
    tickfor.Email = this.ticketdata.forwardemail;
    tickfor.Description = this.ticketdata.forward;

    this.replyticket.getforward(tickfor).subscribe(data => {
      this.toastr.success('Forward Successfully !', 'Success!');
      this.ngOnInit();
      this.forwardblock = false;
      this.loading = false;
  });
  }

 ticketreply(){
  this.loading = true;

  var opost = new TicketreplyClass();
  opost.Description = this.ticketdata.reply;
  opost.Tguid = this.guid;
  opost.AgGuid = this.ticketreplyagid;


    this.replyticket.Add(opost).subscribe(data => {
      this.toastr.success('Reply Sent Successfully !', 'Success!');
      this.ngOnInit();
      this.replyblock = false;
      this.loading = false;
      this.ticketdata.Description = '';
  });
 }

 duedate(status){
   if(status === true) {
    this.showduedate = true;
   } else {
     this.showduedate = false;
   }
 }
 addDays(): Date {

  let date = this.date;
  let data = this.policyresponse;


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

    date = new Date(date);
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + mins);

    date = this.timezonedate(date);

    this.dateloader = false;
  return date;
}


addtoresolutiondate(data) {

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

  data = new Date();
  data.setDate(data.getDate() + days);
  data.setHours(data.getHours() + hours);
  data.setMinutes(data.getMinutes() + mins);

  return data;
  }

  prioritychange() {

      this.slaservice.getbyid('e03d4754-fa06-41cf-b0cb-d59a2ff18751').subscribe(data => {
        if (this.ticketdata.priority === 'Urgent') {
          this.priochange = this.addtoresolutiondate(data['urgentresolutiontime']);
        } else if (this.ticketdata.priority === 'High') {
          this.priochange = this.addtoresolutiondate(data['highresolutiontime']);
        } else if (this.ticketdata.priority === 'Medium') {
          this.priochange = this.addtoresolutiondate(data['mediumresolutiontime']);
        } else if (this.ticketdata.priority === 'Low') {
          this.priochange = this.addtoresolutiondate(data['lowresolutiontime']);
        }
      });
  }

  get sortDataasc() {
    return this.replies.sort((a, b) => {
      return <any>new Date(b.datetime) - <any>new Date(a.datetime);
    });
  }
  get sortDatadesc() {
    return this.replies.sort((b, a) => {
      return <any>new Date(b.datetime) - <any>new Date(a.datetime);
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
    this.ticketdata.helpyou = "";
  }


}
