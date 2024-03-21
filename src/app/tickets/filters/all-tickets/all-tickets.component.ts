import { TicketreplyService } from './../../detail-ticket/ticketreply.service';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from './../../../login/login.service';
import { Ticketclass } from './../../new/ticketclass';
import { NewticketservicesService } from './../../new/newticketservices.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AgentService } from 'src/app/settings/agents/agents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoleService } from 'src/app/settings/roles/role.service';
import { GroupService } from 'src/app/settings/groups/group.service';
import * as XLSX from 'xlsx';
import { TypesService } from 'src/app/settings/types/types.service';
import { TagService } from 'src/app/settings/tags/tag.service';
import { NewcontactservicesService } from '../../new/newcontactservices.service';
import { CompanyservicesService } from '../../new/companyservices.service';
import { stat } from 'fs';
import { tsv } from 'd3';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.css'],
})
export class AllTicketsComponent implements OnInit {

  @ViewChild('p', { static: true }) public popover;
  url = environment.baseUrl;

  guid: string;
  [x: string]: any;
  public loading = true;
  public closeloading = false;

  public disableagentdrop: boolean;
  public exportloading: boolean;

  public loader = false;

  public stupdate: boolean;
  typedrop: any = {};
  tagdrop: any = {};
  companydrop: any= {};
  contactdrop: any= {};

  public checkboxes = false;
  public cardview = true;
  public viewfiltertab = false;

  public cangroupchange = false;

  tab: boolean = false;
  temp = [];
  closeDropdownSelection: any;
  ticketdata: any = {};
  agentdrop: any = {};

  replies: any = {};
  replybyid: any;
  repliername: any;

  tdata: any = {};
  check: boolean = false;

  exportdata: any = {};

  selected = [];

  ColumnMode = ColumnMode;
  rows: any = {};
  ticketsdatatable: any = {};
  reorderable = true;

  groupguid: any;
  agentguid: any;

  timezone: string;

  agentfilter: any;
  groupfilter: any;
  tagfilter: any;
  statusfilter: any;
  unassignedfilter: any;
  public showfilter = false;

  roleguid: any;
  ticketschecked: any = {};

  x = [];

  constructor(private AllticketService: NewticketservicesService, private modalService: NgbModal, private toastr: ToastrService,
    private agentservice: AgentService, private router: Router, private cookie: CookieService, private roleservice: RoleService,
    private loginservice: LoginService, private route: ActivatedRoute, private gs: GroupService,
    private replyticket: TicketreplyService, private typeservice: TypesService, private tagservice: TagService,
    private contactservice: NewcontactservicesService,
    private companyservice: CompanyservicesService) { }

  ngOnInit() {

    this.showfilter = false;

    this.ticketdata.layout = 'card';

    if (this.cookie.get('Guid') === '') {
      this.router.navigate(['login']);
    }

    if (this.cookie.get('RoleGuid') === '') {
      this.router.navigate(['login']);
    }

    this.route.queryParams.subscribe(params => {
      this.tagfilter = params['tagname'];
    });

    this.route.queryParams.subscribe(params => {
      this.statusfilter = params['status'];
    });

    this.route.queryParams.subscribe(params => {
      this.unassignedfilter = params['agent'];
    });

    this.route.queryParams.subscribe(params => {
      this.groupfilter = params['group'];
    });

    this.route.queryParams.subscribe(params => {
      this.agentfilter = params['ag'];
    });


    this.roleguid = this.cookie.get('RoleGuid');

    this.loginservice.getbyid(this.cookie.get('Guid')).subscribe(logindata => {

      this.roleservice.getbyid(this.roleguid).subscribe(roledata => {
        if (roledata['viewalltickets'] === 'false') {
          this.AllticketService.getbyagentid(logindata['agGu'].agGuid).subscribe(
            data => {
              this.loading = false;
              this.checkboxes = false;
              this.rows = data;
              this.ticketsdatatable = data;
              const someObj = {
                *[Symbol.iterator] () {
                  yield data;
                }
              };
             this.temp = [...someObj];
            });
        } else {
          this.AllticketService.get().subscribe(
            data => {
              this.loading = false;
              this.checkboxes = true;
              this.rows = data;
              this.ticketsdatatable = data;
              const someObj = {
                *[Symbol.iterator] () {
                  yield data;
                }
              };
             this.temp = [...someObj];

             if (this.tagfilter === undefined) {

            } else {
              this.showfilter = true;

              let dateopen1 = this.temp[0].filter(m => {
                if (m.tagGu === null) {
                } else {
                  if (this.tagfilter === m.tagGu.tagname) {
                    return m;
                  }
                }
              });
              this.rows = dateopen1;
              this.ticketsdatatable = data;
              const someObj = {
                *[Symbol.iterator] () {
                  yield dateopen1;
                }
              };
             this.temp = [...someObj];
            }

            if (this.groupfilter === undefined) {

            } else {
              this.showfilter = true;

              let groupf = this.temp[0].filter(m => {
                if (m.ggu === null) {
                } else {
                  if (this.groupfilter === m.ggu.groupname) {
                    return m;
                  }
                }
              });
              this.rows = groupf;
              this.ticketsdatatable = data;
              const someObj = {
                *[Symbol.iterator] () {
                  yield groupf;
                }
              };
             this.temp = [...someObj];
            }



            if (this.agentfilter === undefined) {

            } else {
              this.showfilter = true;

              let agf = this.temp[0].filter(m => {
                if (m.agGu === null) {
                } else {
                  if (this.agentfilter === m.agGu.fullname) {
                    return m;
                  }
                }
              });
              this.rows = agf;
              this.ticketsdatatable = data;
              const someObj = {
                *[Symbol.iterator] () {
                  yield agf;
                }
              };
             this.temp = [...someObj];
            }


            if (this.statusfilter === undefined) {

            } else {
              this.showfilter = true;

              let statusf = this.temp[0].filter(m => {
                if (m.status === null) {
                } else {
                  if (this.statusfilter === m.status) {
                    return m;
                  }
                }
              });
              this.rows = statusf;
              this.ticketsdatatable = data;
              const someObj1 = {
                *[Symbol.iterator] () {
                  yield statusf;
                }
              };
             this.temp = [...someObj1];
            }


            if (this.unassignedfilter === undefined) {

            } else {
              this.showfilter = true;

              let unasignedf = this.temp[0].filter(m => {
                if (m.agGu === null) {
                    return m;
                }
              });
              this.rows = unasignedf;
              this.ticketsdatatable = data;
              const someObj1 = {
                *[Symbol.iterator] () {
                  yield unasignedf;
                }
              };
             this.temp = [...someObj1];
            }

            });
        }

      });
    });


    this.typeservice.get().subscribe(data => {
      this.typedrop = data;
    });

    this.tagservice.get().subscribe(data => {
      this.tagdrop = data;
    });

    this.companyservice.get().subscribe(data => {
      this.companydrop = data;
    });

    this.contactservice.get().subscribe(data => {
      this.contactdrop = data;
    });

    let agentdata = [];
    this.agentservice.get().subscribe(data => {
        // tslint:disable-next-line: forin
        for (var d in data) {
          agentdata.push({item_id: data[d].agGuid, item_text: data[d].fullname});
        }
        this.agents = agentdata;
      });

    this.replyticket.get().subscribe(data => {
      this.replies = data;
    });

    this.loginservice.getbyid(this.cookie.get('Guid')).subscribe(loginid => {
      this.timezone = loginid['agGu'].timezone;
    });


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

  modal(deletecontect) {
    this.modalService.open(deletecontect, { centered: true, size: 'sm' });
  }

  onSelect(item: any){
    this.check = true;
    let a = item['selected'];

    this.ticketschecked = a;
    if (a['length'] === 0) {
      this.tab = false;
    } else {
      this.tab = true;
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
  }

  onSelectall(item: any) {
    if(item.checked === true) {
      this.ticketdata.chk = true;
      this.tab = true;

      for(let t in this.rows) {
        this.x.push(this.rows[t]['tguid']);
      }
      this.ticketschecked = this.x;
    } else {
      this.ticketdata.chk = false;
      this.tab = false;
    }
  }

  onSelectcardcheck(item: any){
    this.ticketdata.all = false;
    if(item.checked === true) {
      this.x.push(item.value);
    } else {
      this.x = this.arrayRemove(this.x, item.value);
    }

    if(this.x.length > 0) {
      this.tab = true;
      this.ticketschecked = this.x;
    }
    if(this.x.length === 0) {
      this.tab = false;
    }
  }


  Closetickets() {
    this.closeloading = true;
    // tslint:disable-next-line: prefer-const
    let checkeditems = this.ticketschecked;

    if(this.ticketdata.layout === 'card') {
      // tslint:disable-next-line: forin
      for(let t in checkeditems) {
        this.AllticketService.getbyid(checkeditems[t]).subscribe(data => {
            this.tdata = data;

            var opost = new Ticketclass();
            opost.TGuid = this.tdata['tguid'];
            opost.ConGuid = this.tdata['conGuid'];
            opost.Subject = this.tdata['subject'];
            opost.Priority = this.tdata['priority'];
            opost.Status = 'Close';
            opost.Gguid = this.tdata['gguid'];
            opost.Description = this.tdata['description'];
            opost.TagGuid = this.tdata['tagGuid'];
            opost.TypeGuid = this.tdata['typeGuid'];
            opost.CustGuid = this.tdata['custGuid'];
            opost.AgGuid = this.tdata['agGuid'];
            opost.Resolutionduedate = this.tdata['resolutionduedate'];

            this.AllticketService.update(opost).subscribe(udata => {
              this.closeloading = false;
              this.tab = false;
              this.ticketdata.chk = false;
              this.ticketdata.all = false;
            });
          });
          let m = checkeditems.length - 1;
          if(Number(t) === Number(m)) {
            this.ngOnInit();
          }
      }
    } else {
      // tslint:disable-next-line: forin
      for(let t in checkeditems) {
        this.AllticketService.getbyid(checkeditems[t].tguid).subscribe(data => {
            this.tdata = data;

            var opost = new Ticketclass();
            opost.TGuid = this.tdata['tguid'];
            opost.ConGuid = this.tdata['conGuid'];
            opost.Subject = this.tdata['subject'];
            opost.Priority = this.tdata['priority'];
            opost.Status = 'Close';
            opost.Gguid = this.tdata['gguid'];
            opost.Description = this.tdata['description'];
            opost.TagGuid = this.tdata['tagGuid'];
            opost.TypeGuid = this.tdata['typeGuid'];
            opost.CustGuid = this.tdata['custGuid'];
            opost.AgGuid = this.tdata['agGuid'];
            opost.Resolutionduedate = this.tdata['resolutionduedate'];

            this.AllticketService.update(opost).subscribe(udata => {
              this.closeloading = false;
              this.tab = false;
              this.ticketdata.chk = false;
              this.ticketdata.all = false;
            });
          });
          let m = checkeditems.length - 1;
          if(Number(t) === Number(m)) {
            this.ngOnInit();
          }
      }
    }
    this.toastr.success('Ticket Closed Successfully !', 'Closed !');
  }

  Assigntickets(assigncontent){
    this.modalService.open(assigncontent, { centered: true, size: 'sm' });
    this.disableagentdrop = false;
  }

  Assignsingleticket(assignsinglecontent, tguid){
    this.cangroupchange = true;
    this.modalService.open(assignsinglecontent, { centered: true, size: 'sm' });
    this.AllticketService.getbyid(tguid).subscribe(data => {
      if(data['ggu'] === null) {
        this.disableagentdrop = false;
        this.ticketdata.groupsingle = null;
        this.ticketdata.agentsingle = null;
        this.ticketdata.tguid = tguid;
      } else if(data['agGuid'] === null) {
        this.disableagentdrop = false;
        this.ticketdata.groupsingle = null;
        this.ticketdata.agentsingle = null;
        this.ticketdata.tguid = tguid;
      } else {
        this.disableagentdrop = true;
        let groupd = [];
        groupd.push({item_id: data['ggu'].gguid, item_text: data['ggu'].groupname});
        let agentd = [];
        agentd.push({item_id: data['agGu'].agGuid, item_text: data['agGu'].fullname});

        this.ticketdata.groupsingle = groupd;
        this.ticketdata.agentsingle = agentd;
        this.groupguid = data['gguid'];
        this.agentguid = data['agGuid'];
        this.ticketdata.tguid = tguid;
      }

      let opendate = this.timezonedatebydatabase(data['datetime']);
        let end_Date = new Date();
        // tslint:disable-next-line: radix
        end_Date.setDate(end_Date.getDate() - 25);

        if (opendate <= end_Date) {
          this.cangroupchange = false;
        }
    });
  }

  Groupselect(item: any){
    this.groupguid = item.item_id;

    let agents = [];
    this.gs.getbyid(this.groupguid).subscribe(data => {
        // tslint:disable-next-line: forin
        for (var d in data['agents']) {
          agents.push({item_id: data['agents'][d].agGuid, item_text: data['agents'][d].fullname});
        }
        this.agentname = agents;
      });
    this.disableagentdrop = true;
  }

  Groupdeselect(item: any){
    this.ticketdata.agents = null;
    this.disableagentdrop = false;
  }

   Agentselect(item: any){
    this.agentguid = item.item_id;
  }

  Assignagent(){
    this.closeloading = true;
    let checkeditems = this.ticketschecked;

    if(this.ticketdata.layout === 'card') {
      // tslint:disable-next-line: forin
      for(let t in checkeditems) {
      this.AllticketService.getbyid(checkeditems[t]).subscribe(
        data => {
          this.tdata = data;

          var opost = new Ticketclass();
          opost.TGuid = this.tdata['tguid'];
          opost.ConGuid = this.tdata['conGuid'];
          opost.Subject = this.tdata['subject'];
          opost.Priority = this.tdata['priority'];
          opost.Status = this.tdata['status'];
          opost.Gguid = this.groupguid;
          opost.Description = this.tdata['description'];
          opost.TagGuid = this.tdata['tagGuid'];
          opost.TypeGuid = this.tdata['typeGuid'];
          opost.CustGuid = this.tdata['custGuid'];
          opost.AgGuid = this.agentguid;
          opost.Resolutionduedate = this.ticketdata['resolutionduedate'];

          this.AllticketService.update(opost).subscribe(udata => {
          });
        });
        let m = checkeditems.length - 1;
        if(Number(t) === Number(m)) {
          this.ngOnInit();
        }
      }
    } else {
      // tslint:disable-next-line: forin
      for(let t in checkeditems) {
        this.AllticketService.getbyid(checkeditems[t].tguid).subscribe(
          data => {
            this.tdata = data;

            var opost = new Ticketclass();
            opost.TGuid = this.tdata['tguid'];
            opost.ConGuid = this.tdata['conGuid'];
            opost.Subject = this.tdata['subject'];
            opost.Priority = this.tdata['priority'];
            opost.Status = this.tdata['status'];
            opost.Gguid = this.groupguid;
            opost.Description = this.tdata['description'];
            opost.TagGuid = this.tdata['tagGuid'];
            opost.TypeGuid = this.tdata['typeGuid'];
            opost.CustGuid = this.tdata['custGuid'];
            opost.AgGuid = this.agentguid;
            opost.Resolutionduedate = this.ticketdata['resolutionduedate'];

            this.AllticketService.update(opost).subscribe(udata => {
            });
          });
          let m = checkeditems.length - 1;
          if(Number(t) === Number(m)) {
            this.ngOnInit();
          }
        }
    }
    this.toastr.success('Ticket Assigned Successfully !', 'Assigned !');
    this.closeloading = false;
    this.modalService.dismissAll();
    this.tab = false;
  }

  Assignsingleagent(){
    this.closeloading = true;

    this.AllticketService.getbyid(this.ticketdata.tguid).subscribe(
      data => {
        this.tdata = data;
        var opost = new Ticketclass();
        opost.TGuid = this.tdata['tguid'];
        opost.ConGuid = this.tdata['conGuid'];
        opost.Subject = this.tdata['subject'];
        opost.Priority = this.tdata['priority'];
        opost.Status = this.tdata['status'];
        opost.Gguid = this.groupguid;
        opost.Description = this.tdata['description'];
        opost.TagGuid = this.tdata['tagGuid'];
        opost.TypeGuid = this.tdata['typeGuid'];
        opost.CustGuid = this.tdata['custGuid'];
        opost.AgGuid = this.agentguid;
        opost.Resolutionduedate = this.ticketdata['resolutionduedate'];

        this.AllticketService.update(opost).subscribe(
          udata => {
            this.toastr.success('Ticket Assigned Successfully !', 'Assigned !');
            this.ngOnInit();
            this.closeloading = false;
            this.modalService.dismissAll();
          });
      });
    }

  Deletetickets(deletecontect){
    this.modalService.open(deletecontect, { centered: true, size: 'sm' });
  }

  Delete(){
    this.loader = true;
    let checkeditems = this.ticketschecked;

    if(this.ticketdata.layout === 'card') {
      // tslint:disable-next-line: forin
      for(let t in checkeditems) {
        this.AllticketService.delete(checkeditems[t]).subscribe(udata => {
        });

        let m = checkeditems.length - 1;
        if(Number(t) === Number(m)) {
          this.ngOnInit();
        }
      }
    } else {
      // tslint:disable-next-line: forin
      for(let t in checkeditems) {
        this.AllticketService.delete(checkeditems[t].tguid).subscribe(udata => {
        });

        let m = checkeditems.length - 1;
        if(Number(t) === Number(m)) {
          this.ngOnInit();
        }
      }
    }
    this.toastr.error('Ticket Deleted Successfully !', 'Deleted !');
    this.modalService.dismissAll();
    this.loader = false;
    this.tab = false;
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

      const temp = this.temp[0].filter(function (d) {
        // tslint:disable-next-line: max-line-length
        return (d.conGu.fullname.toLowerCase().indexOf(val) !== -1 || !val) || (d.status.toLowerCase().indexOf(val) !== -1 || !val)
                || (d.priority.toLowerCase().indexOf(val) !== -1 || !val) || (d.subject.toLowerCase().indexOf(val) !== -1 || !val);
      });
      this.rows = temp;
  }


  redirect() {
    this.router.navigate(['tickets/filters/tempredirect']);
  }

 // tslint:disable-next-line: member-ordering
 agentdropdownSettings = {};
 // tslint:disable-next-line: member-ordering
 agentsdropdownSettings = {};
 // tslint:disable-next-line: member-ordering
 groupname = [];
 // tslint:disable-next-line: member-ordering
 agentname = [];
 // tslint:disable-next-line: member-ordering
 agents = [];
 // tslint:disable-next-line: member-ordering
 groupdropdownSettings = {};


 changelayout() {
   if(this.ticketdata.layout === 'card') {
     this.cardview = true;
   } else {
     this.cardview = false;
   }
 }

 updatepriority(pri, tguid) {
      this.AllticketService.getbyid(tguid).subscribe(
        data => {
          var opost = new Ticketclass();
          opost.TGuid = data['tguid'];
          opost.ConGuid = data['conGuid'];
          opost.Subject = data['subject'];
          opost.Priority = pri;
          opost.Status = data['status'];
          opost.Gguid = data['gguid'];
          opost.Description = data['description'];
          opost.TagGuid = data['tagGuid'];
          opost.TypeGuid = data['typeGuid'];
          opost.CustGuid = data['custGuid'];
          opost.AgGuid = data['agGuid'];
          opost.Resolutionduedate = data['resolutionduedate'];

          this.AllticketService.update(opost).subscribe(
            udata => {
              this.toastr.success('Priority Changed Successfully !', 'Success !');
              this.ngOnInit();
            });
     });
 }

 updatestatus(st, tguid) {
   this.stupdate = true;
     this.AllticketService.getbyid(tguid).subscribe(
       data => {
         var opost = new Ticketclass();
         opost.TGuid = data['tguid'];
         opost.ConGuid = data['conGuid'];
         opost.Subject = data['subject'];
         opost.Priority = data['priority'];
         opost.Status = st;
         opost.Gguid = data['gguid'];
         opost.Description = data['description'];
         opost.TagGuid = data['tagGuid'];
         opost.TypeGuid = data['typeGuid'];
         opost.CustGuid = data['custGuid'];
         opost.AgGuid = data['agGuid'];
         opost.Resolutionduedate = data['resolutionduedate'];
         if(st === 'Resolved') {
          opost.Resolveddate = new Date();
         } else {
          opost.Resolveddate = data['resolveddate'];
         }

         this.AllticketService.update(opost).subscribe(
           udata => {
             this.toastr.success('Status Updated Successfully !', 'Success !');
             this.ngOnInit();
             this.stupdate = false;
           });
    });
  }


  filterreplybyid(tguid) {
     // tslint:disable-next-line: prefer-const
     let data = this.replies.filter(m => {
      if (m.tguid === tguid) {
        return m;
      }
    });

    if(data.length > 0) {
      this.replybyid = data[0].description;
      this.repliername = data[0].agGu.fullname;
    } else {
      // tslint:disable-next-line: prefer-const
      let rowdata = this.rows.filter(m => {
        if (m.tguid === tguid) {
          return m;
        }
      });
      this.replybyid = rowdata[0].description;
      this.repliername = rowdata[0].conGu.fullname;
    }
  }


  calculateDiff(dateSent){
    let currentDate = this.timezonedatebydatabase(new Date());
    dateSent = new Date(dateSent);

    let date1: string;
    const SECOND = 1;
            const MINUTE = 60 * SECOND;
            const HOUR = 60 * MINUTE;
            const DAY = 24 * HOUR;
            const MONTH = 30 * DAY;

    var ts = Math.floor((currentDate.getTime() - dateSent.getTime()) / 1000);

                if (ts < 1 * MINUTE) {
                  date1 = ts == 1 ? "one second ago" : ts + " seconds ago";
                } else if (ts < 2 * MINUTE) {
                    date1 = "a minute ago";
                } else if (ts < 45 * MINUTE) {
                    date1 = Math.floor(ts / 60 ) + " minutes ago";
                } else if (ts < 90 * MINUTE) {
                    date1 = "an hour ago";
                } else if (ts < 24 * HOUR) {
                    date1 = Math.floor(ts / (60 * 60) ) + " hours ago";
                } else if (ts < 30 * DAY) {
                    date1 = Math.floor(ts / (60 * 60 * 24)) + " days ago";
                } else if (ts < 12 * MONTH) {
                  let years = currentDate.getFullYear() - dateSent.getFullYear();
                    let months = (years * 12) + (currentDate.getMonth() - dateSent.getMonth());
                    date1 = months <= 1 ? "one month ago" : months + " months ago";
                } else {
                    let years = Math.floor(ts / 365);
                    date1 = Math.abs(Math.round((ts/(60 * 60 * 24))/365.25)) <= 1 ? "one year ago" : Math.abs(Math.round((ts/(60 * 60 * 24))/365.25)) + " years ago";
                }

              return date1;

    // let a = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
    // if(a > 0 && a < 30){
    //   return a;
    // }  else if (a > 30) {
    //   // tslint:disable-next-line: max-line-length
    //   return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60));
    // } else {
    //   // tslint:disable-next-line: max-line-length
    //   return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getMinutes()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate(), dateSent.getMinutes()) ) /(1000 * 60 * 60 * 24));
    // }

  }

  timezonedate(date) {
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


    date = this.calculateDiff(date);
    return date;
  }

  timezonedatebydatabase(date) {
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

  sortcards(item: any){
    if(item.value === 'Date Created') {
      this.sortDatabydate();
    } else if(item.value === 'Status') {
      this.sortDatabystatus();
    } else if(item.value === 'Priority') {
      this.sortDatabypriority();
    }
  }

  sortDatabydate() {
    return this.rows.sort((a, b) => {
      return <any>new Date(b.datetime) - <any>new Date(a.datetime);
    });
  }

  sortDatabystatus() {
    return this.rows.sort((a, b) => {
      return(a.status < b.status) ? -1 : (a.status > b.status) ? 1 : 0;
    });
  }

  sortDatabypriority() {
    return this.rows.sort((a, b) => {
      return(a.priority < b.priority) ? -1 : (a.priority > b.priority) ? 1 : 0;
    });
  }

  exportmodal(exportcontent) {
    this.modalService.open(exportcontent, { centered: true, size: 'lg' });
  }

  // tslint:disable-next-line: member-ordering
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  // tslint:disable-next-line: member-ordering
  fileName: string = 'TicketsSheet(' + new Date() + ').xlsx';

  export(): void {
    this.exportloading = true;
   // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rows);

   // tslint:disable-next-line: prefer-const
   let element = document.getElementById('myTable');
   // tslint:disable-next-line: prefer-const
   let row = element['rows'];

     if (this.exportdata.ticketid === false || this.exportdata.ticketid === undefined) {
       // tslint:disable-next-line: no-var-keyword
       for (var i = 0; i < row[0].cells.length; i++) {
       // tslint:disable-next-line: prefer-const
       var str = row[0].cells[i].innerHTML;
       if (str.search('tguid') !== -1) {
           // tslint:disable-next-line: no-var-keyword
           for (var j = 0; j < row.length; j++) {
             row[j].deleteCell(i);
           }
         }
       }
     }

     if (this.exportdata.subject === false || this.exportdata.subject === undefined) {
       // tslint:disable-next-line: no-var-keyword
       for (var i = 0; i < row[0].cells.length; i++) {
       // tslint:disable-next-line: prefer-const
       var str = row[0].cells[i].innerHTML;
       if (str.search('Subject') !== -1) {
           // tslint:disable-next-line: no-var-keyword
           for (var j = 0; j < row.length; j++) {
             row[j].deleteCell(i);
           }
         }
       }
     }

     if (this.exportdata.status === false || this.exportdata.status === undefined) {
       // tslint:disable-next-line: no-var-keyword
       for (var i = 0; i < row[0].cells.length; i++) {
       // tslint:disable-next-line: prefer-const
       var str = row[0].cells[i].innerHTML;
       if (str.search('Status') !== -1) {
           // tslint:disable-next-line: no-var-keyword
           for (var j = 0; j < row.length; j++) {
             row[j].deleteCell(i);
           }
         }
       }
     }

     if (this.exportdata.priority === false || this.exportdata.priority === undefined) {
       // tslint:disable-next-line: no-var-keyword
       for (var i = 0; i < row[0].cells.length; i++) {
       // tslint:disable-next-line: prefer-const
       var str = row[0].cells[i].innerHTML;
       if (str.search('Priority') !== -1) {
           // tslint:disable-next-line: no-var-keyword
           for (var j = 0; j < row.length; j++) {
             row[j].deleteCell(i);
           }
         }
       }
     }

     if (this.exportdata.agent === false || this.exportdata.agent === undefined) {
       // tslint:disable-next-line: no-var-keyword
       for (var i = 0; i < row[0].cells.length; i++) {
       // tslint:disable-next-line: prefer-const
       var str = row[0].cells[i].innerHTML;
       if (str.search('Agent') !== -1) {
           // tslint:disable-next-line: no-var-keyword
           for (var j = 0; j < row.length; j++) {
             row[j].deleteCell(i);
           }
         }
       }
     }

     if (this.exportdata.group === false || this.exportdata.group === undefined) {
       // tslint:disable-next-line: no-var-keyword
       for (var i = 0; i < row[0].cells.length; i++) {
       // tslint:disable-next-line: prefer-const
       var str = row[0].cells[i].innerHTML;
       if (str.search('Group') !== -1) {
           // tslint:disable-next-line: no-var-keyword
           for (var j = 0; j < row.length; j++) {
             row[j].deleteCell(i);
           }
         }
       }
     }

     if (this.exportdata.type === false || this.exportdata.type === undefined) {
       // tslint:disable-next-line: no-var-keyword
       for (var i = 0; i < row[0].cells.length; i++) {
       // tslint:disable-next-line: prefer-const
       var str = row[0].cells[i].innerHTML;
       if (str.search('Type') !== -1) {
           // tslint:disable-next-line: no-var-keyword
           for (var j = 0; j < row.length; j++) {
             row[j].deleteCell(i);
           }
         }
       }
     }

     if (this.exportdata.createddate === false || this.exportdata.createddate === undefined) {
       // tslint:disable-next-line: no-var-keyword
       for (var i = 0; i < row[0].cells.length; i++) {
       // tslint:disable-next-line: prefer-const
       var str = row[0].cells[i].innerHTML;
       if (str.search('Createddate') !== -1) {
           // tslint:disable-next-line: no-var-keyword
           for (var j = 0; j < row.length; j++) {
             row[j].deleteCell(i);
           }
         }
       }
     }

      if (this.exportdata.resolveddate === false || this.exportdata.resolveddate === undefined) {
      // tslint:disable-next-line: no-var-keyword
      for (var i = 0; i < row[0].cells.length; i++) {
      // tslint:disable-next-line: prefer-const
      var str = row[0].cells[i].innerHTML;
      if (str.search('Resolveddate') !== -1) {
          // tslint:disable-next-line: no-var-keyword
          for (var j = 0; j < row.length; j++) {
            row[j].deleteCell(i);
          }
        }
      }
      }

      if (this.exportdata.tags === false || this.exportdata.tags === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Tags') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.lastmodifieddate === false || this.exportdata.lastmodifieddate === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Lastmodifieddate') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.fullname === false || this.exportdata.fullname === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Contact name') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.email === false || this.exportdata.email === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Contact email') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.workphone === false || this.exportdata.workphone === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Contact workphone') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.mobilephone === false || this.exportdata.mobilephone === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Contact mobilephone') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.twitter === false || this.exportdata.twitter === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Contact twitter') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.contactid === false || this.exportdata.contactid === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Contact Id') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.timezone === false || this.exportdata.timezone === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Contact timezone') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.language === false || this.exportdata.language === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Contact language') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.title === false || this.exportdata.title === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Contact title') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.contacttags === false || this.exportdata.contacttags === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Contact tags') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.description === false || this.exportdata.description === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Ticketdescription') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }


   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

   /* generate workbook and add the worksheet */
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

   /* save to file */
   XLSX.writeFile(wb, this.fileName);

   this.toastr.success('Tickets Exported Successfully !', 'Exported !');

   this.modalService.dismissAll();
   this.exportloading = false;
   this.ngOnInit();

  }

  filtertab() {
    if(this.viewfiltertab === false) {
      this.viewfiltertab = true;
    } else if(this.viewfiltertab === true) {
      this.viewfiltertab = false;
    }
  }

  applyfilter() {
    let group,agent,status,priority,type,tag,contact;

    let data = this.ticketsdatatable.filter(m => {

      if(this.ticketdata.grou !== undefined) {
        if(this.ticketdata.grou !== null) {
          if(this.ticketdata.grou.length > 0) {
            group = this.ticketdata.grou[0].item_id;
          } else {
            group = m.gguid;
          }
        } else {
          group = m.gguid;
        }
      } else {
        group = m.gguid;
      }

      if(this.ticketdata.agent !== undefined) {
        if(this.ticketdata.agent !== null) {
          if(this.ticketdata.agent.length > 0) {
            agent = this.ticketdata.agent[0].item_id;
          } else {
            agent = m.agGuid;
          }
        } else {
          agent = m.agGuid;
        }
      } else {
        agent = m.agGuid;
      }

      if(this.ticketdata.status !== undefined) {
        if(this.ticketdata.status !== null) {
          status = this.ticketdata.status;
        } else {
          status = m.status;
        }
      } else {
        status = m.status;
      }

      if(this.ticketdata.priority !== undefined) {
        if(this.ticketdata.priority !== null) {
          priority = this.ticketdata.priority;
        } else {
          priority = m.priority;
        }
      } else {
        priority = m.priority;
      }

      if(this.ticketdata.type !== undefined) {
        if(this.ticketdata.type !== null) {
          type = this.ticketdata.type;
        } else {
          type = m.type;
        }
      } else {
        type = m.type;
      }

      if(this.ticketdata.tagsfilter !== undefined) {
        if(this.ticketdata.tagsfilter !== null) {
          tag = this.ticketdata.tagsfilter;
        } else {
          tag = m.tagGuid;
        }
      } else {
        tag = m.tagGuid;
      }

      if(this.ticketdata.contactfilter !== undefined) {
        if(this.ticketdata.contactfilter !== null) {
          contact = this.ticketdata.contactfilter;
        } else {
          contact = m.conGuid;
        }
      } else {
        contact = m.conGuid;
      }

      let dbdate = this.timezonedatebydatabase(m.datetime);

      let start_Date,end_Date, datefilt, datefiltresolved;
      if(this.ticketdata.created !== undefined) {
        if(this.ticketdata.created !== null) {
          if(this.ticketdata.created === "0") {
            start_Date = new Date();
            end_Date = new Date();
          } else {
            start_Date = this.startdatebyadd(this.ticketdata.created);
            end_Date = new Date();
          }
          datefilt = dbdate > start_Date && dbdate < end_Date;
        } else {
          datefilt = (dbdate = dbdate);
        }
      } else {
        datefilt = (dbdate = dbdate);
      }
      // let selectedUsers = this.users.filter(f => new Date(f.date) > start_Date && new Date(f.date) < end_Date);

      let dbresolveddate = this.timezonedatebydatabase(m.resolveddate);

      if(this.ticketdata.resolved !== undefined) {
        if(this.ticketdata.resolved !== null) {
          if(this.ticketdata.resolved === "0") {
            start_Date = new Date();
            end_Date = new Date();
          } else {
            start_Date = this.startdatebyadd(this.ticketdata.resolved);
            end_Date = new Date();
          }
          datefiltresolved = dbresolveddate > start_Date && dbresolveddate < end_Date;
        } else {
          datefiltresolved = (dbresolveddate = dbresolveddate);
        }
      } else {
        datefiltresolved = (dbresolveddate = dbresolveddate);
      }



      if ((datefilt) && (datefiltresolved) && m.agGuid === agent && m.gguid === group && m.status === status && m.priority === priority && m.type === type && m.tagGuid === tag && m.conGuid === contact) {
        return m;
      }
    });

    this.rows = data;
  }

  clearfilters(form: NgForm) {
    // this.ticketdata.grou = '';
    // this.ticketdata.agent = '';
    // this.ticketdata.status = '';
    // this.ticketdata.priority = '';
    // this.ticketdata.type = '';
    // this.ticketdata.tagsfilter = '';
    // this.ticketdata.contactfilte = '';
    this.rows = this.ticketsdatatable;
    form.reset();
  }

  startdatebyadd(add) {
    let date = new Date();
    let str = add.substring(add.length - 1);
    let remlast = add.substring(0, add.length - 1);

    if(str === "m") {
      // tslint:disable-next-line: radix
      date.setMinutes(date.getMinutes() - parseInt(remlast));
    } else if (str === "h") {
      // tslint:disable-next-line: radix
      date.setHours(date.getHours() - parseInt(remlast));
    } else if (str === "d") {
      // tslint:disable-next-line: radix
      date.setDate(date.getDate() - parseInt(remlast));
    }
    return date;
  }

}
