import { Typesclass } from './typesclass';
import { TypesService } from './types.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {


  typedata: any = {};
  public loading: boolean;
  public loading1: boolean;

  public loadingtbl: boolean;

  typetable: any = {};
  id: any;

  constructor(private typesservice: TypesService, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadingtbl = true;
    this.typesservice.get().subscribe(data => {
      this.loadingtbl = false;
      this.typetable = data;
   });
  }

  onTemplateFormSubmit(){
    this.loading = true;

    var opost = new Typesclass();
    opost.Name = this.typedata.typename;

    this.typesservice.Add(opost).subscribe(data => {
      this.toastr.success('New Type Added Successfully !', 'Success!');
      this.typedata.typename = '';
      this.ngOnInit();
      this.loading = false;
   });
  }


  deletemodal(deletecontect, data) {
    this.modalService.open(deletecontect, { centered: true, size: 'sm' });
    this.id = data;
  }

  Delete(guid) {
    this.typesservice.delete(guid).subscribe(data=>{
     this.toastr.error('Type Deleted Successfully !', 'Deleted !');
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }

  editmodal(editcontect, data1) {
    this.modalService.open(editcontect, { centered: true, size: 'sm' });
    this.id = data1;
    this.typesservice.getbyid(data1).subscribe(d => {
      this.typedata.name = d['name'];
      this.typedata.typeGuid = d['typeGuid'];
   });
  }

  update() {
    this.loading1 = true;
    var t = new Typesclass();

      t.TypeGuid = this.id;
      t.Name = this.typedata.name;

    this.typesservice.update(t).subscribe(data=>{
     this.toastr.success('Type Updated Successfully !', 'Updated !');
      this.ngOnInit();
      this.loading1 = false;
      this.modalService.dismissAll();
    });
    this.typedata = '';
  }

}
