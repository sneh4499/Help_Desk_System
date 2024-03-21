import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BussinesshoursService } from '../bussinesshours.service';
import { HolidaysService } from '../Holidays.service';

@Component({
  selector: 'app-viewbussiness-hours',
  templateUrl: './viewbussiness-hours.component.html',
  styleUrls: ['./viewbussiness-hours.component.css']
})
export class ViewbussinessHoursComponent implements OnInit {

  bdata: any = {};
  allholidays: any = {};
  id: any;
  public loadingtbl: boolean;

  constructor(private bs: BussinesshoursService, private modalService: NgbModal, private toastr: ToastrService, private router: Router,
    private holidays: HolidaysService) { }

  ngOnInit() {
    this.loadingtbl = true;
    this.bs.get().subscribe(
      data => {
        this.loadingtbl = false;
       this.bdata = data;
      }
    );
  }

  deletemodal(deletecontect, data) {
    this.modalService.open(deletecontect, { centered: true, size: 'sm' });
    this.id = data;
  }

  Delete(guid) {

    this.holidays.get().subscribe(data => {
      this.allholidays = data;

      let holidaybyid = this.allholidays.filter(m => {
        if (guid === m.bussinessGuid) {
          return m;
        }
      });

      for (let i = 0; i < holidaybyid.length; i++) {
        this.holidays.delete(holidaybyid[i].holidayGuid).subscribe(data1 => {
        });
      }

      this.bs.delete(guid).subscribe(data=>{
        this.toastr.error('Bussiness Hour Deleted Successfully !', 'Deleted !');
         this.ngOnInit();
         this.modalService.dismissAll();
       });
    });
   }

   edit(id) {
    this.router.navigateByUrl('settings/bussiness_hours/newbussiness-hours?id=' + id);
   }

}
