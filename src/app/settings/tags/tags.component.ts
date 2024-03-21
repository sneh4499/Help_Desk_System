import { Tagclass } from './tagclass';
import { TagService } from './tag.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tagdata: any = {};
  public loading: boolean;
  public loading1: boolean;
  tagtable: any = {};
  id: any;
  temp = [];

  public loadingtbl: boolean;

  constructor(private tag: TagService, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadingtbl = true;
  this.tag.get().subscribe(data => {
      this.tagtable = data;
      this.loadingtbl = false;
      const someObj = {
        *[Symbol.iterator] () {
          yield data;
        }
      };
      this.temp = [...someObj];
   });

  }

  onTemplateFormSubmit(){

    this.loading = true;

    var opost = new Tagclass();
    opost.Tagname = this.tagdata.tagname;

    this.tag.Add(opost).subscribe(data => {
      this.toastr.success('New Tag Added Successfully !', 'Success!');
      this.tagdata.tagname = '';
      this.ngOnInit();
      this.loading = false;
   });
 }

 deletemodal(deletecontect, data) {
  this.modalService.open(deletecontect, { centered: true, size: 'sm' });
  this.id = data;
}

Delete(guid) {
  this.tag.delete(guid).subscribe(data=>{
   this.toastr.error('Tag Deleted Successfully !', 'Deleted !');
    this.ngOnInit();
    this.modalService.dismissAll();
  });
}

editmodal(editcontect, data1) {
  this.modalService.open(editcontect, { centered: true, size: 'sm' });
  this.id = data1;
  this.tag.getbyid(data1).subscribe(d => {
    this.tagdata = d;
 });
}

update() {

  this.loading1 = true;
  var t = new Tagclass();

    t.TagGuid = this.id;
    t.Tagname = this.tagdata.tagname;

  this.tag.update(t).subscribe(data=>{
   this.toastr.success('Tag Updated Successfully !', 'Updated !');
    this.ngOnInit();
    this.loading1 = false;
    this.modalService.dismissAll();
  });
  this.tagdata.tagname = '';
}

updateFilter(event) {
  const val = event.target.value.toLowerCase();

  const temp = this.temp[0].filter(function (d) {
     return d.tagname.toLowerCase().indexOf(val) !== -1 || !val;
  });
  this.tagtable = temp;
  // this.table.offset = 0;
}

}
