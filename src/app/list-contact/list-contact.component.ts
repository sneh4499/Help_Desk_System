import { environment } from 'src/environments/environment.prod';
import { TagService } from './../settings/tags/tag.service';
import { Title } from '@angular/platform-browser';
import { Contactclass } from './../tickets/new/contactclass';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit , Output} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { NewcontactservicesService } from '../tickets/new/newcontactservices.service';
import { CompanyservicesService } from '../tickets/new/companyservices.service';
import { RoleService } from '../settings/roles/role.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { url } from 'inspector';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css'],

})
export class ListContactComponent implements OnInit {
  [x: string]: any;

  public loading = true;
  public viewfiltertab = false;

  public exportloading: boolean;

  ColumnMode = ColumnMode;
  rows: {};
  reorderable = true;
  id: any;
  contact: any = {};
  companydrop: any = {};
  tagdrop: any = {};

  contactschecked: any = {};

  filterselection: any = {};
  contactalldatafilter: any = {};
  exportdata: any = {};

  roleguid: any;
  temp = [];
  selected = [];
  public checkboxes = false;

  tab: boolean = false;

  baseurl = environment.baseUrl;

  public editbtn = false;
  public dltdtn = false;
  public pageaccess = false;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();
  imgpath: string;
  public progress: number;
  public message: string;

  constructor(private listservice: NewcontactservicesService, private companyservice: CompanyservicesService,
      private http: HttpClient, private modalService: NgbModal, private toastr: ToastrService, private roleservice: RoleService,
      private tagservice: TagService, private cookie: CookieService, private router: Router){

  }

  ngOnInit() {
    this.listservice.get().subscribe(
      data => {
        this.loading = false;
       this.rows = data;
       this.contactalldatafilter = data;
       this.checkboxes = true;
        const someObj = {
          *[Symbol.iterator] () {
            yield data;
          }
        };
      this.temp = [...someObj];
      }
    );

    this.companyservice.get().subscribe(data => {
      this.companydrop = data;
   });

   this.tagservice.get().subscribe(data => {
    this.tagdrop = data;
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
      this.editbtn = false;
    } else {
      this.editbtn = true;
    }

    if (data['deletecontact'] === 'false') {
      this.dltdtn = false;
    } else {
      this.dltdtn = true;
    }

    if (data['viewcustomer'] === 'false') {
      this.pageaccess = false;
    } else {
      this.pageaccess = true;
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
    this.http.post(this.baseurl + 'api/upload', formData, {reportProgress: true, observe: 'events'})
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

    this.listservice.getbyid(data1).subscribe(
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

    console.log(c);

    this.listservice.update(c).subscribe(
      data => {
        this.toastr.success('Contact Updated Successfully !', 'Updated !');
        this.ngOnInit();
        this.modalService.dismissAll();
        this.loading = false;
      });

   }

   Deletecontacts(deletecontect){
    this.modalService.open(deletecontect);
  }

  Deletemultiple(){
    let checkeditems = this.contactschecked;
    // tslint:disable-next-line: forin
    for(let t in checkeditems) {
      this.listservice.delete(checkeditems[t].conGuid).subscribe(udata => {
          let m = checkeditems.length - 1;
          if(Number(t) === Number(m)) {
            this.ngOnInit();
          }
      });
    }
    this.toastr.error('Contacts Deleted Successfully !', 'Deleted !');
    this.modalService.dismissAll();
  }

   deletemodal(deletecontect, data) {
    this.modalService.open(deletecontect);
    this.id = data;
  }

  Delete(guid) {
     this.listservice.delete(guid).subscribe(data=>{
      this.toastr.error('Contact Deleted Successfully !', 'Deleted !');
       this.ngOnInit();
       this.modalService.dismissAll();
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

  onSelect(item: any){
    this.check = true;
    let a = item['selected'];

    this.contactschecked = a;
    if (a['length'] === 0) {
      this.tab = false;
    } else {
      this.tab = true;
    }
  }


  filtertab() {
    if(this.viewfiltertab === false) {
      this.viewfiltertab = true;
    } else if(this.viewfiltertab === true) {
      this.viewfiltertab = false;
    }
  }

  applyfilter() {
    let timezone,tags,companies;

    let data = this.contactalldatafilter.filter(m => {

      if(this.filterselection.timezone !== undefined) {
        timezone = this.filterselection.timezone;
      } else {
        timezone = m.timezone;
      }

      if(this.filterselection.tagsfilter !== undefined) {
        tags = this.filterselection.tagsfilter;
      } else {
        tags = m.tagGuid;
      }

      if(this.filterselection.companyfilter !== undefined) {
        companies = this.filterselection.companyfilter;
      } else {
        companies = m.comGuid;
      }

      if (m.timezone === timezone && m.tagGuid === tags && m.comGuid === companies) {
        return m;
      }
    });

    this.rows = data;
  }

  clearfilters() {
    this.filterselection = '';
    this.rows = this.contactalldatafilter;
  }

  exportmodal(exportcontent) {
    this.modalService.open(exportcontent, { centered: true, size: 'lg' });
  }

  selectallchk() {
    if (this.exportdata.selectall === true) {
      this.exportdata.name = true;
      this.exportdata.title = true;
      this.exportdata.email = true;
      this.exportdata.workphone = true;
      this.exportdata.mobilephone = true;
      this.exportdata.twitter = true;
      this.exportdata.company = true;
      this.exportdata.address = true;
      this.exportdata.timezone = true;
      this.exportdata.tags = true;
      this.exportdata.about = true;
    } else {
      this.exportdata.name = false;
      this.exportdata.title = false;
      this.exportdata.email = false;
      this.exportdata.workphone = false;
      this.exportdata.mobilephone = false;
      this.exportdata.twitter = false;
      this.exportdata.company = false;
      this.exportdata.address = false;
      this.exportdata.timezone = false;
      this.exportdata.tags = false;
      this.exportdata.about = false;
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
  fileName: string = 'ContactSheet(' + new Date() + ').xlsx';

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
       if (str.search('name') !== -1) {
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
      if (str.search('title') !== -1) {
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
       if (str.search('email') !== -1) {
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
       if (str.search('work phone') !== -1) {
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
       if (str.search('mobile phone') !== -1) {
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
       if (str.search('twitter') !== -1) {
           // tslint:disable-next-line: no-var-keyword
           for (var j = 0; j < row.length; j++) {
             row[j].deleteCell(i);
           }
         }
       }
     }

     if (this.exportdata.company === false || this.exportdata.company === undefined) {
       // tslint:disable-next-line: no-var-keyword
       for (var i = 0; i < row[0].cells.length; i++) {
       // tslint:disable-next-line: prefer-const
       var str = row[0].cells[i].innerHTML;
       if (str.search('company') !== -1) {
           // tslint:disable-next-line: no-var-keyword
           for (var j = 0; j < row.length; j++) {
             row[j].deleteCell(i);
           }
         }
       }
     }

     if (this.exportdata.address === false || this.exportdata.address === undefined) {
       // tslint:disable-next-line: no-var-keyword
       for (var i = 0; i < row[0].cells.length; i++) {
       // tslint:disable-next-line: prefer-const
       var str = row[0].cells[i].innerHTML;
       if (str.search('address') !== -1) {
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
       if (str.search('timezone') !== -1) {
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
      if (str.search('tags') !== -1) {
          // tslint:disable-next-line: no-var-keyword
          for (var j = 0; j < row.length; j++) {
            row[j].deleteCell(i);
          }
        }
      }
    }

    if (this.exportdata.about === false || this.exportdata.about === undefined) {
      // tslint:disable-next-line: no-var-keyword
      for (var i = 0; i < row[0].cells.length; i++) {
      // tslint:disable-next-line: prefer-const
      var str = row[0].cells[i].innerHTML;
      if (str.search('about') !== -1) {
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
