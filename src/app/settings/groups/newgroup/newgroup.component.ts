import { AgentService } from './../../agents/agents.service';
import { Groupclass } from './../groupclass';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from '../group.service';
import { Router } from '@angular/router';
import { BussinesshoursService } from '../../bussiness_hours/bussinesshours.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AgentClass } from '../../agents/agentclass';

@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.component.html',
  styleUrls: ['./newgroup.component.css']
})
export class NewgroupComponent implements OnInit {

  closeDropdownSelection: any;

  group: any = {};
  agents = [];
  agentdropd: any = {};
  agentguid: any = {};
  bussinesshoursdrop: any = {};
  public loading: boolean;

  constructor(private bs: BussinesshoursService, private gs: GroupService, private agentservice: AgentService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.agentservice.get().subscribe(data => {
      this.agentdropd = data;
   });
   this.bs.get().subscribe(data => {
      this.bussinesshoursdrop = data;
   });


   let agents = [];
      this.agentservice.get().subscribe(
        // tslint:disable-next-line: no-shadowed-variable
       data => {
        // tslint:disable-next-line: forin
        for (var d in data) {
          agents.push({item_id: data[d].agGuid, item_text: data[d].fullname});
        }
        this.dropdownList = agents;
      }
    );

    this.agentdropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 3,
      closeDropDownOnSelection: this.closeDropdownSelection
    };
  }

  onTemplateFormSubmit(){
    this.loading = true;

    var group = new Groupclass();

    group.Groupname = this.group.name;
    group.Describeforthisgroup = this.group.description;
    group.BussinessGuid = this.group.bussinesshours;
    group.Esctime = this.group.esctime;
    group.Escmailto = this.group.escmailto;

    this.gs.Add(group).subscribe(data => {

      let a = this.group.agent;
      for (var d in a) {
        this.agentservice.getbyid(a[d].item_id).subscribe(getagent => {
          var opost = new AgentClass();

          opost.AgGuid = getagent['agGuid'];
          opost.Fullname = getagent['fullname'];
          opost.Email = getagent['email'];
          opost.Language = getagent['language'];
          opost.Phone = getagent['phone'];
          opost.Signature = getagent['signature'];
          opost.Uploadphoto = getagent['uploadphoto'];
          opost.Timezone = getagent['timezone'];
          opost.Occasional = getagent['occasional'];
          opost.Jobtitle = getagent['jobtitle'];
          opost.Gguid = data;
          opost.RoleGuid = getagent['roleGu'].roleGuid;
          opost.Isactive = 'Active';

          this.agentservice.update(opost).subscribe(updata => {
          });
        });
      }

      this.loading = false;
      this.toastr.success('New Group Added Successfully !', 'Success !');
      this.ngOnInit();
      this.group = '';
      this.router.navigate(['settings/groups/viewgroups']);
   });
  }

  // tslint:disable-next-line: member-ordering
  dropdownList = [];
  // tslint:disable-next-line: member-ordering
  agentdropdownSettings = {};

}
