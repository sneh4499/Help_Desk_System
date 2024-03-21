import { Emailclass } from './../new/emailclass';
import { EmailservicesService } from './../new/emailservices.service';
import { Component, OnInit } from '@angular/core';
import { GroupService } from './../../settings/groups/group.service';
import { AgentService } from 'src/app/settings/agents/agents.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { TagService } from 'src/app/settings/tags/tag.service';
import { HelpdeskService } from 'src/app/settings/helpdesk/helpdesk.service';
import { NewcontactservicesService } from '../new/newcontactservices.service';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.css']
})
export class ComposeEmailComponent implements OnInit {
  emaildata:any = {};
  angForm: FormGroup;


  url = environment.baseUrl;

  public loading: boolean;

  tagdrop: any = {};
  groupdrop: any = {};
  contactdrop: any = {};
  contactfilter: any = {};
  selectedcontact: any = {};
  groupguid: any;

  ContactDiv = true;

  closeDropdownSelection: any;
  public isCollapsed1 = false;
  public Editor = ClassicEditor;
  guid: string;
  constructor(
    private agentservice: AgentService,
    private gs: GroupService,
    private fb: FormBuilder,
    private es: EmailservicesService,
    private tagservice: TagService,
    private helpdeskservice: HelpdeskService,
    private contactservice: NewcontactservicesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {

    this.tagservice.get().subscribe(data => {
      this.tagdrop = data;
    });

   let groups = [];
      this.gs.get().subscribe(data => {
        this.groupdrop = data;
        // tslint:disable-next-line: forin
        for (var d in data) {
          groups.push({item_id: data[d].gguid, item_text: data[d].groupname});
        }
        this.groupname = groups;
      });

      this.helpdeskservice.getbyid('7b09c997-5afa-405e-9b78-3d8e403b4169').subscribe(data => {
        this.emaildata.from = data['email'];
     });

      this.contactservice.get().subscribe(data => {
        this.contactdrop = data;
        const someObj = {
          *[Symbol.iterator] () {
            yield data;
          }
        };
      this.contactfilter = [...someObj];
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
  }


  contactselect(event){
    const val = event.target.value.toLowerCase();
    var n = val.search("<");

    if(n === -1) {

    } else {
      var res = val.slice(n + 1, val.length - 1);

      const temp = this.contactfilter[0].filter(function (d) {
        return d.email.toLowerCase().indexOf(res) !== -1 || !res;
     });
     this.selectedcontact = temp[0];
     this.ContactDiv = false;
    }
  }

  // tslint:disable-next-line: member-ordering
groupname = [];
// tslint:disable-next-line: member-ordering
groupdropdownSettings = {};

  Groupselect(item: any) {
    this.groupguid = item.item_id;
  }

  onTemplateFormSubmit(){

    this.loading = true;

    var opost = new Emailclass();
    opost.From = this.emaildata.from;
    opost.To = this.emaildata.to;
    opost.Subject = this.emaildata.subject;
    opost.Description = this.emaildata.description;
    opost.Group = this.emaildata.groups;
    opost.Priority = this.emaildata.priority;
    opost.Status = this.emaildata.status;
    opost.Tags = this.emaildata.tags;
    // opost.Type = this.emaildata.types;
    // opost.CustGuid = this.emaildata.custguid;
    // opost.AgGuid = this.emaildata.aguid;

    this.es.Add(opost).subscribe(data => {
         this.toastr.success('Email sent Successfully !', 'Success!');
        this.ngOnInit();
        this.loading = false;
       this.emaildata = '';
   });
 }
}
