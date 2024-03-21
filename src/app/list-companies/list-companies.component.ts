import { environment } from 'src/environments/environment.prod';
import { Companyclass } from 'src/app/tickets/new/companyclass';
import { CompanyservicesService } from './../tickets/new/companyservices.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RoleService } from '../settings/roles/role.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit {
  public loading = true;
  ColumnMode = ColumnMode;
  rows: {};
  reorderable = true;
   test = [];
   id: any;
   company: any = {};

   url = environment.baseUrl;

   // tslint:disable-next-line: no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();
  imgpath: string;
  public progress: number;
  public message: string;

  public checkboxes = false;
  selected = [];
  tab: boolean = false;
  companychecked: any = {};
  exportdata: any = {};
  public exportloading: boolean;

  roleguid: any;
  temp = [];

  public editbtn = false;
  public dltdtn = false;
  public pageaccess = false;

   constructor(private comservice: CompanyservicesService,
    private http: HttpClient, private modalService: NgbModal, private toastr: ToastrService, private cookie: CookieService,
    private router: Router, private roleservice: RoleService) { }

  ngOnInit() {
    this.comservice.get().subscribe(
      data => {
       this.rows = data;
       this.checkboxes = true;
       const someObj = {
        *[Symbol.iterator] () {
          yield data;
        }
      };
       this.temp = [...someObj];
       this.loading = false;
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
        this.editbtn = false;
      } else {
        this.editbtn = true;
      }

      if (data['deletecompany'] === 'false') {
        this.dltdtn = false;
      } else {
        this.dltdtn = true;
      }
      if (data['viewcompany'] === 'false') {
        this.pageaccess = false;
      } else {
        this.pageaccess = true;
      }

    });

  }

  deletemodal(deletecontect, data) {
    this.modalService.open(deletecontect);
    this.id = data;
  }

  Delete(guid) {
     this.comservice.delete(guid).subscribe(data=>{
      this.toastr.error('Company Deleted Successfully !', 'Deleted !');
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

   updateFilter(event) {
    const val = event.target.value.toLowerCase();
        const temp = this.temp[0].filter(function (d) {
          return d.companyname.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
  }

  onSelect(item: any){
    // this.check = true;
    let a = item['selected'];

    this.companychecked = a;
    if (a['length'] === 0) {
      this.tab = false;
    } else {
      this.tab = true;
    }
  }

  Deletecompanies(deletecompanies){
    this.modalService.open(deletecompanies, { centered: true, size: 'sm' });
  }

  Deletemultiple(){
    let checkeditems = this.companychecked;
    // tslint:disable-next-line: forin
    for(let t in checkeditems) {
      this.comservice.delete(checkeditems[t].conGuid).subscribe(udata => {
        let m = checkeditems.length - 1;
          if(Number(t) === Number(m)) {
            this.ngOnInit();
          }
      });
    }
    this.toastr.error('Companies Deleted Successfully !', 'Deleted !');
    this.modalService.dismissAll();
  }


  exportmodal(exportcontent) {
    this.modalService.open(exportcontent, { centered: true, size: 'lg' });
  }

  selectallchk() {
    if (this.exportdata.selectall === true) {
      this.exportdata.name = true;
      this.exportdata.description = true;
      this.exportdata.notes = true;
      this.exportdata.domain = true;
    } else {
      this.exportdata.name = false;
      this.exportdata.description = false;
      this.exportdata.notes = false;
      this.exportdata.domain = false;
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
  fileName: string = 'CompanySheet(' + new Date() + ').xlsx';

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
       if (str.search('Company name') !== -1) {
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
      if (str.search('description') !== -1) {
          // tslint:disable-next-line: no-var-keyword
          for (var j = 0; j < row.length; j++) {
            row[j].deleteCell(i);
          }
        }
      }
    }

     if (this.exportdata.notes === false || this.exportdata.notes === undefined) {
       // tslint:disable-next-line: no-var-keyword
       for (var i = 0; i < row[0].cells.length; i++) {
       // tslint:disable-next-line: prefer-const
       var str = row[0].cells[i].innerHTML;
       if (str.search('notes') !== -1) {
           // tslint:disable-next-line: no-var-keyword
           for (var j = 0; j < row.length; j++) {
             row[j].deleteCell(i);
           }
         }
       }
     }

     if (this.exportdata.domain === false || this.exportdata.domain === undefined) {
       // tslint:disable-next-line: no-var-keyword
       for (var i = 0; i < row[0].cells.length; i++) {
       // tslint:disable-next-line: prefer-const
       var str = row[0].cells[i].innerHTML;
       if (str.search('domain') !== -1) {
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

   this.toastr.success('Company List Exported Successfully !', 'Exported !');

   this.modalService.dismissAll();
   this.exportloading = false;
   this.ngOnInit();

  }

}
