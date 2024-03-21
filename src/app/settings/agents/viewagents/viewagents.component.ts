import { environment } from 'src/environments/environment.prod';
import { LoginService } from './../../../login/login.service';
import { AgentClass } from './../agentclass';
import { AgentService } from './../agents.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { GroupService } from '../../groups/group.service';
import { RoleService } from '../../roles/role.service';
import { CookieService } from 'ngx-cookie-service';
import { Loginclass } from 'src/app/login/loginclass';
import { TimeAgoPipe } from 'time-ago-pipe';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import * as XLSX from 'xlsx';
// type AOA = any[];

@Component({
  selector: 'app-viewagents',
  templateUrl: './viewagents.component.html',
  styleUrls: ['./viewagents.component.css']
})
export class ViewagentsComponent implements OnInit {

  public Editor = ClassicEditor;

  agentdata: any = {};
  agent: any = {};
  id: any;
  public loading = true;
  public exportloading: boolean;
  public loadingdata = false;
  ColumnMode = ColumnMode;
  rows: any = {};
  reorderable = true;
  groupdrop: any = {};
  roles: any = {};
  lguid: any = {};

  exportdata: any = {};

  // public exportname = false;
  // public exportrole = false;
  // public exportemail = false;
  // public exportgroups = false;
  // public exportphone = false;
  // public exportlanguage = false;
  // public exportagenttype = false;
  // public exportlastseen = false;

  url = environment.baseUrl;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();
  imgpath: string;
  public message: string;
  public progress: number;


  temp = [];

  constructor(
    private gs: GroupService, private agentservice: AgentService, private cookie: CookieService,
    private roleservice: RoleService, private loginservice: LoginService,
    private http: HttpClient, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    this.agentservice.get().subscribe(
      data => {
        this.loading = false;
       this.rows = data;
         const someObj = {
          *[Symbol.iterator] () {
            yield data;
          }
        };
        this.temp = [...someObj];
      }
    );

    this.gs.get().subscribe(data => {
      this.groupdrop = data;
   });

   this.roleservice.get().subscribe(data => {
    this.roles = data;
 });
  }

  deletemodal(deletecontect, data) {
    this.modalService.open(deletecontect, { centered: true });
    this.id = data;
  }

  Delete(guid) {
     this.agentservice.delete(guid).subscribe(data1 => {

      this.agentservice.getbyid(guid).subscribe(data => {
        this.loginservice.delete(data['login'][0].lguid).subscribe(data1 => {
        });
      });

      this.toastr.error('Agent Deleted Successfully !', 'Deleted !');
       this.ngOnInit();
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




   editmodal(editcontent, data1){
     this.loadingdata = true;
    this.modalService.open(editcontent, { centered: true, size: 'lg' });
    this.id = data1;

    this.agentservice.getbyid(data1).subscribe(
      data => {
        this.loadingdata = false;

      this.agent.agenttype = data['occasional'];
      // this.group = data;
      this.agent.agGuid = data['agGuid'];
      this.agent.fullname = data['fullname'];
      this.agent.email = data['email'];
      this.agent.phone = data['phone'];
      this.agent.email = data['email'];
      this.imgpath = data['uploadphoto'];
      this.agent.language = data['language'];
      this.agent.jobtitle = data['jobtitle'];
      this.agent.timezone = data['timezone'];

      this.agent.signature = data['signature'];

      let role = data['roleGu'];
      let group = data['ggu'];
      this.agent.groupid = group['gguid'];
      this.agent.role = role['roleGuid'];
      });
   }
   update(){
    this.loading = true;

    var opost = new AgentClass();
    opost.AgGuid = this.agent.agGuid;
    opost.Fullname = this.agent.fullname;
    opost.Email = this.agent.email;
    opost.Language = this.agent.language;
    opost.Phone = this.agent.phone;
    opost.Signature = this.agent.signature;

      if (this.imgpath == null) {
      opost.Uploadphoto = 'Resources/Images/userimage.svg';
      } else {
        opost.Uploadphoto = this.imgpath;
      }

    opost.Timezone = this.agent.timezone;
    opost.Occasional = this.agent.agenttype;
    opost.Jobtitle = this.agent.jobtitle;
    opost.Gguid = this.agent.groupid;
    opost.RoleGuid = this.agent.role;
    opost.Isactive = 'Active';

    this.agentservice.getbyid(this.agent.agGuid).subscribe(
      data => {
        // tslint:disable-next-line: forin
        for (let d in data['login']) {
          this.lguid = data['login'][d];

          var logindata = new Loginclass();

          logindata.Lguid = this.lguid.lguid;
          logindata.Username = this.agent.fullname;
          logindata.Email = this.agent.email;
          logindata.Phone = this.agent.phone;
          logindata.Password = this.lguid.password;
          logindata.AgGuid = this.agent.agGuid;
          logindata.RoleGuid = this.agent.role;
          logindata.Lastlogin = this.lguid.lastlogin;

          if (this.imgpath == null) {
            logindata.Photo = 'Resources/Images/userimage.svg';
            } else {
              logindata.Photo = this.imgpath;
            }

          logindata.Isactive = 'Active';
          this.loginservice.update(logindata).subscribe(
            data1 => {
            });
        }
      });

    this.agentservice.update(opost).subscribe(
      data => {
        this.toastr.success('Agent Updated Successfully !', 'Updated !');
        this.ngOnInit();
        this.modalService.dismissAll();
        this.loading = false;
      });

   }


   updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp[0].filter(function (d) {
       return d.fullname.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    // this.table.offset = 0;
  }


  exportmodal(exportcontent) {
    this.modalService.open(exportcontent, { centered: true, size: 'lg' });
  }


  selectallchk() {
    if (this.exportdata.selectall === true) {
      this.exportdata.name = true;
      this.exportdata.roles = true;
      this.exportdata.email = true;
      this.exportdata.groups = true;
      this.exportdata.phone = true;
      this.exportdata.language = true;
      this.exportdata.mobile = true;
      this.exportdata.agenttype = true;
      this.exportdata.lastseen = true;

      // this.exportname = true;
      // this.exportrole = true;
      //   this.exportemail = true;
      //   this.exportgroups = true;
      //   this.exportphone = true;
      //   this.exportlanguage = true;
      //   this.exportagenttype = true;
      //   this.exportlastseen = true;
    } else {
      this.exportdata.name = false;
      this.exportdata.roles = false;
      this.exportdata.email = false;
      this.exportdata.groups = false;
      this.exportdata.phone = false;
      this.exportdata.language = false;
      this.exportdata.mobile = false;
      this.exportdata.agenttype = false;
      this.exportdata.lastseen = false;
    }
  }

  change(data) {
    if(data === false) {
      this.exportdata.selectall = false;
    }
  }

   // tslint:disable-next-line: member-ordering
   wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
   // tslint:disable-next-line: member-ordering
   fileName: string = 'AgentSheet(' + new Date() + ').xlsx';

   export(): void {
     this.exportloading = true;
    // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rows);

    // tslint:disable-next-line: prefer-const
    let element = document.getElementById('myTable');
    // tslint:disable-next-line: prefer-const
    let row = element['rows'];

    if (this.exportdata.selectall === true) {

    } else {

      if (this.exportdata.name === false || this.exportdata.name === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Name') !== -1) {
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
        if (str.search('Email') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.roles === false || this.exportdata.roles === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Role') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.groups === false || this.exportdata.groups === undefined) {
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

      if (this.exportdata.phone === false || this.exportdata.phone === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Phone') !== -1) {
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
        if (str.search('Language') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.agenttype === false || this.exportdata.agenttype === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Agent Type') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
          }
        }
      }

      if (this.exportdata.lastseen === false || this.exportdata.lastseen === undefined) {
        // tslint:disable-next-line: no-var-keyword
        for (var i = 0; i < row[0].cells.length; i++) {
        // tslint:disable-next-line: prefer-const
        var str = row[0].cells[i].innerHTML;
        if (str.search('Last Seen') !== -1) {
            // tslint:disable-next-line: no-var-keyword
            for (var j = 0; j < row.length; j++) {
              row[j].deleteCell(i);
            }
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

    this.toastr.success('Agent List Exported Successfully !', 'Exported !');

    this.modalService.dismissAll();
    this.exportloading = false;
    this.ngOnInit();

   }


   number(data) {
    if(isNaN(data)) {
      return false;
    } else {
      return true;
    }
  }
}
