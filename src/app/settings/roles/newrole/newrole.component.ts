import { AgentClass } from './../../agents/agentclass';
import { RoleService } from './../role.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleClass } from '../roleclass';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgentService } from '../../agents/agents.service';

@Component({
  selector: 'app-newrole',
  templateUrl: './newrole.component.html',
  styleUrls: ['./newrole.component.css']
})
export class NewroleComponent implements OnInit {

  guid: any;
  agguid: any;
  role: any = {};
  agentslist: any = {};

  closeDropdownSelection: any;

  public updatebtn: boolean;
  public loadingmodal = false;

  public loading: boolean;
  public isDisabled = true;
  public isDisabled1 = true;

  public isDisabled3 = true;
  public isDisabled4 = true;

  public isDisabled5 = true;
  public isDisabled6 = true;
  public isDisabled7 = true;
  public isDisabled8 = true;

  constructor(private roleservice: RoleService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private modalService: NgbModal,
    private agentservice: AgentService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.guid = params['id'];
    });

    let allagents = [];
    this.agentservice.get().subscribe(data => {
      this.agentslist = data;
      for (var d in data) {
        allagents.push({item_id: data[d].agGuid, item_text: data[d].fullname});
      }
      this.agentname = allagents;
    });

    this.agentsdropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 4,
      closeDropDownOnSelection: this.closeDropdownSelection
  };

    if(this.guid === undefined) {
      this.updatebtn = false;
    } else {
      this.updatebtn = true;

      this.roleservice.getbyid(this.guid).subscribe(data => {
        this.role = data;

        let selag = [];
        for (var d in data['agents']) {
          selag.push({item_id: data['agents'][d].agGuid, item_text: data['agents'][d].fullname});
        }
        this.role.agentsingle = selag;

        this.role.viewtickets = data['viewalltickets'];

        if(data['replytoticket'] === 'true') {
          this.role.replytoticket = true;
        } else {
          this.role.replytoticket = false;
        }

        if(data['forwardticket'] === 'true') {
          this.role.forwardticket = true;
        } else {
          this.role.forwardticket = false;
        }

        if(data['editticket'] === 'true') {
          this.role.editticket = true;
        } else {
          this.role.editticket = false;
        }

        if(data['deleteticket'] === 'true') {
          this.role.deleteticket = true;
        } else {
          this.role.deleteticket = false;
        }

        if(data['viewcustomer'] === 'true') {
          this.isDisabled = false;
          this.isDisabled1 = false;
          this.role.viewcustomertab = true;
        } else {
          this.isDisabled = true;
          this.isDisabled1 = true;
          this.role.viewcustomertab = false;
        }

        if(data['createcontact'] === 'true') {
          this.role.createeditcontact = true;
        } else {
          this.role.createeditcontact = false;
        }

        if(data['deletecontact'] === 'true') {
          this.role.deletecontact = true;
        } else {
          this.role.deletecontact = false;
        }


        if(data['createcompany'] === 'true') {
          this.role.createeditcompany = true;
        } else {
          this.role.createeditcompany = false;
        }

        if(data['deletecompany'] === 'true') {
          this.role.deletecompany = true;
        } else {
          this.role.deletecompany = false;
        }

        if(data['viewcompany'] === 'true') {
          this.isDisabled3 = false;
          this.isDisabled4 = false;
          this.role.viewcompanytab = true;
        } else {
          this.isDisabled3 = true;
          this.isDisabled4 = true;
          this.role.viewcompanytab = false;
        }

        this.role.admin = data['adminview'];
        if(data['adminview'] === 'false') {
          this.isDisabled5 = true;
          this.isDisabled6 = true;
          this.isDisabled7 = true;
          this.isDisabled8 = true;
        } else {
          this.isDisabled5 = false;
          this.isDisabled6 = false;
          this.isDisabled7 = false;
          this.isDisabled8 = false;
        }

        if(data['manageagent'] === 'true') {
          this.role.manageagent = true;
        } else {
          this.role.manageagent = false;
        }

        if(data['managetags'] === 'true') {
          this.role.managetags = true;
        } else {
          this.role.managetags = false;
        }

        if(data['managetypes'] === 'true') {
          this.role.managetypes = true;
        } else {
          this.role.managetypes = false;
        }

        if(data['managegroups'] === 'true') {
          this.role.managegroups = true;
        } else {
          this.role.managegroups = false;
        }

      });
    }

  }

  onTemplateFormSubmit(){
    this.loading = true;

    var roledata = new RoleClass();

    roledata.Rolename = this.role.rolename;
    roledata.Description = this.role.description;

    if (this.role.replytoticket === undefined) {
      roledata.Replytoticket = 'false';
    } else {
      roledata.Replytoticket = this.role.replytoticket;
    }

    if (this.role.forwardticket === undefined) {
      roledata.Forwardticket = 'false';
    } else {
      roledata.Forwardticket = this.role.forwardticket;
    }

    if (this.role.editticket === undefined) {
      roledata.Editticket = 'false';
    } else {
      roledata.Editticket = this.role.editticket;
    }

    if (this.role.deleteticket === undefined) {
      roledata.Deleteticket = 'false';
    } else {
      roledata.Deleteticket = this.role.deleteticket;
    }

    if (this.role.viewcustomertab === undefined) {
      roledata.Viewcustomer = 'false';
    } else {
      roledata.Viewcustomer = this.role.viewcustomertab;
    }

    if (this.role.createeditcontact === undefined) {
      roledata.Createcontact = 'false';
    } else {
      roledata.Createcontact = this.role.createeditcontact;
    }

    if (this.role.deletecontact === undefined) {
      roledata.Deletecontact = 'false';
    } else {
      roledata.Deletecontact = this.role.deletecontact;
    }

    if (this.role.viewcompanytab === undefined) {
      roledata.Viewcompany = 'false';
    } else {
      roledata.Viewcompany = this.role.viewcompanytab;
    }

    if (this.role.createeditcompany === undefined) {
      roledata.Createcompany = 'false';
    } else {
      roledata.Createcompany = this.role.createeditcompany;
    }

    if (this.role.deletecompany === undefined) {
      roledata.Deletecompany = 'false';
    } else {
      roledata.Deletecompany = this.role.deletecompany;
    }

    if (this.role.admin === undefined) {
      roledata.Adminview = 'false';
    } else {
      roledata.Adminview = this.role.admin;
    }

    if (this.role.manageagent === undefined) {
      roledata.Manageagent = 'false';
    } else {
      roledata.Manageagent = this.role.manageagent;
    }

    if (this.role.managetags === undefined) {
      roledata.Managetags = 'false';
    } else {
      roledata.Managetags = this.role.managetags;
    }

    if (this.role.managetypes === undefined) {
      roledata.Managetypes = 'false';
    } else {
      roledata.Managetypes = this.role.managetypes;
    }

    if (this.role.managegroups === undefined) {
      roledata.Managegroups = 'false';
    } else {
      roledata.Managegroups = this.role.managegroups;
    }

    if (this.role.viewtickets === undefined) {
      roledata.Viewalltickets = 'false';
    } else {
      roledata.Viewalltickets = this.role.viewtickets;
    }


    this.roleservice.Add(roledata).subscribe(data => {
      for (let i = 0; i < this.role.agentsingle.length; i++) {

        this.agentservice.getbyid(this.role.agentsingle[i].item_id).subscribe(data1 => {
          var opost = new AgentClass();
          opost.AgGuid = data1['agGuid'];
          opost.Fullname = data1['fullname'];
          opost.Email = data1['email'];
          opost.Language = data1['language'];
          opost.Phone = data1['phone'];
          opost.Signature = data1['signature'];
          opost.Uploadphoto = data1['uploadphoto'];
          opost.Timezone = data1['timezone'];
          opost.Occasional = data1['agenttype'];
          opost.Jobtitle = data1['jobtitle'];
          opost.Gguid = data1['ggu'].gguid;
          opost.RoleGuid = data;
          opost.Isactive = 'Active';


          this.agentservice.update(opost).subscribe(data2 => {
          });
        });

      }
      this.loading = false;
      this.toastr.success('New Role Added Successfully !', 'Success !');
      this.router.navigate(['settings/roles/viewroles']);
    });
  }

  customercheckbox() {
    if (this.role.viewcustomertab === true) {
      this.isDisabled = false;
      this.isDisabled1 = false;
    } else {
      this.isDisabled = true;
      this.isDisabled1 = true;
      this.role.createeditcontact = false;
      this.role.deletecontact = false;
    }
  }
  companycheckbox() {
    if (this.role.viewcompanytab === true) {
      this.isDisabled3 = false;
      this.isDisabled4 = false;
    } else {
      this.isDisabled3 = true;
      this.isDisabled4 = true;
      this.role.createeditcompany = false;
      this.role.deletecompany = false;
    }
  }

  adminradio(){
    if (this.role.admin === 'true'){
      this.isDisabled5 = false;
      this.isDisabled6 = false;
      this.isDisabled7 = false;
      this.isDisabled8 = false;
    } else {
      this.isDisabled5 = true;
      this.isDisabled6 = true;
      this.isDisabled7 = true;
      this.isDisabled8 = true;

      this.role.manageagent = false;
      this.role.managetags = false;
      this.role.managetypes = false;
      this.role.managegroups = false;
    }
  }


  update() {
    this.loading = true;

    var roledata = new RoleClass();

    roledata.RoleGuid = this.guid;
    roledata.Rolename = this.role.rolename;
    roledata.Description = this.role.description;

    if (this.role.replytoticket === undefined) {
      roledata.Replytoticket = 'false';
    } else {
      roledata.Replytoticket = this.role.replytoticket;
    }

    if (this.role.forwardticket === undefined) {
      roledata.Forwardticket = 'false';
    } else {
      roledata.Forwardticket = this.role.forwardticket;
    }

    if (this.role.editticket === undefined) {
      roledata.Editticket = 'false';
    } else {
      roledata.Editticket = this.role.editticket;
    }

    if (this.role.deleteticket === undefined) {
      roledata.Deleteticket = 'false';
    } else {
      roledata.Deleteticket = this.role.deleteticket;
    }

    if (this.role.viewcustomertab === undefined) {
      roledata.Viewcustomer = 'false';
    } else {
      roledata.Viewcustomer = this.role.viewcustomertab;
    }

    if (this.role.createeditcontact === undefined) {
      roledata.Createcontact = 'false';
    } else {
      roledata.Createcontact = this.role.createeditcontact;
    }

    if (this.role.deletecontact === undefined) {
      roledata.Deletecontact = 'false';
    } else {
      roledata.Deletecontact = this.role.deletecontact;
    }

    if (this.role.viewcompanytab === undefined) {
      roledata.Viewcompany = 'false';
    } else {
      roledata.Viewcompany = this.role.viewcompanytab;
    }

    if (this.role.createeditcompany === undefined) {
      roledata.Createcompany = 'false';
    } else {
      roledata.Createcompany = this.role.createeditcompany;
    }

    if (this.role.deletecompany === undefined) {
      roledata.Deletecompany = 'false';
    } else {
      roledata.Deletecompany = this.role.deletecompany;
    }

    if (this.role.admin === undefined) {
      roledata.Adminview = 'false';
    } else {
      roledata.Adminview = this.role.admin;
    }

    if (this.role.manageagent === undefined) {
      roledata.Manageagent = 'false';
    } else {
      roledata.Manageagent = this.role.manageagent;
    }

    if (this.role.managetags === undefined) {
      roledata.Managetags = 'false';
    } else {
      roledata.Managetags = this.role.managetags;
    }

    if (this.role.managetypes === undefined) {
      roledata.Managetypes = 'false';
    } else {
      roledata.Managetypes = this.role.managetypes;
    }

    if (this.role.managegroups === undefined) {
      roledata.Managegroups = 'false';
    } else {
      roledata.Managegroups = this.role.managegroups;
    }

    if (this.role.viewtickets === undefined) {
      roledata.Viewalltickets = 'false';
    } else {
      roledata.Viewalltickets = this.role.viewtickets;
    }

    this.roleservice.update(roledata).subscribe(data => {

      for (let i = 0; i < this.role.agentsingle.length; i++) {

        this.agentservice.getbyid(this.role.agentsingle[i].item_id).subscribe(data1 => {
          var opost = new AgentClass();
          opost.AgGuid = data1['agGuid'];
          opost.Fullname = data1['fullname'];
          opost.Email = data1['email'];
          opost.Language = data1['language'];
          opost.Phone = data1['phone'];
          opost.Signature = data1['signature'];
          opost.Uploadphoto = data1['uploadphoto'];
          opost.Timezone = data1['timezone'];
          opost.Occasional = data1['agenttype'];
          opost.Jobtitle = data1['jobtitle'];
          opost.Gguid = data1['ggu'].gguid;
          opost.RoleGuid = this.guid;
          opost.Isactive = 'Active';
          this.agentservice.update(opost).subscribe(data2 => {
          });
        });

      }

      this.loading = false;
      this.toastr.success('Role Updated Successfully !', 'Success !');
      this.role = '';
      this.router.navigate(['settings/roles/viewroles']);
   });
  }


  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  openmodal(agentscontent, data) {
    this.loadingmodal = true;
    this.modalService.open(agentscontent, { centered: true });
    this.roleservice.getbyid(data).subscribe(data1=>{
    //   this.loadingmodal = false;
    //     this.agents = data1['agents'];
    });
  }

  Agentselect(item: any){
   // this.agguid = item.item_id;
  }


  // tslint:disable-next-line: member-ordering
 agentname = [];
 // tslint:disable-next-line: member-ordering
 agentsdropdownSettings = {};

}
