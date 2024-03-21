import { HolidaysService } from './../Holidays.service';
import { BussinesshoursClass } from './../bussinesshoursclass';
import { BussinesshoursService } from './../bussinesshours.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HolidayClass } from '../holidaysclass';

@Component({
  selector: 'app-newbussiness-hours',
  templateUrl: './newbussiness-hours.component.html',
  styleUrls: ['./newbussiness-hours.component.css']
})
export class NewbussinessHoursComponent implements OnInit {


  public loading: boolean;
  public loadingholibtn: boolean;
  bhours: any = {};
  holi: any = {};
  guid: any;
  public updatebtn: boolean;

  allholidays: any = {};
  holidaydata = [];

  constructor(private bs: BussinesshoursService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router,
    private holidays: HolidaysService) { }

  ngOnInit() {

    this.loadingholibtn = false;

    this.route.queryParams.subscribe(params => {
      this.guid = params['id'];
    });

    if(this.guid === undefined) {
      this.updatebtn = false;
    } else {
      this.updatebtn = true;

      this.holidays.get().subscribe(data => {
        this.allholidays = data;

        let holidaybyid = this.allholidays.filter(m => {
          if (this.guid === m.bussinessGuid) {
            return m;
          }
        });

        for (let i = 0; i < holidaybyid.length; i++) {
          this.holidaydata.push({'month': holidaybyid[i].month, 'day': holidaybyid[i].day, 'holidayname': holidaybyid[i].holidayname, 'holidayguid': holidaybyid[i].holidayGuid});
        }
      });


      this.bs.getbyid(this.guid).subscribe(data => {
         this.bhours.name = data['bussinessname'];
         this.bhours.description = data['bussinessdescription'];
         this.bhours.timezone = data['timezone'];
         this.bhours.hours = data['hours'];

         if(data['monday'] !== '') {
          this.bhours.monday = true;

          var m = data['monday'];
          if(m.indexOf('-') === 3) {
            this.bhours.monstarttime = m.substring(0, 1);
            this.bhours.monstarttimeam = m.substring(1, 3);
          } else if(m.indexOf('-') === 4) {
            this.bhours.monstarttime = m.substring(0, 2);
            this.bhours.monstarttimeam = m.substring(2, 4);
          } else if(m.indexOf('-') === 6) {
            this.bhours.monstarttime = m.substring(0, 4);
            this.bhours.monstarttimeam = m.substring(4, 6);
          } else if(m.indexOf('-') === 7) {
            this.bhours.monstarttime = m.substring(0, 5);
            this.bhours.monstarttimeam = m.substring(5, 7);
          }


          var a = m.split('-')[1].length;
          var cutstring = m.split('-')[1];

          if(a === 3) {
            this.bhours.monendtime = cutstring.substring(0, 1);
            this.bhours.monendtimeam = cutstring.substring(1, 3);
          } else if(a === 4) {
            this.bhours.monendtime = cutstring.substring(0, 2);
            this.bhours.monendtimeam = cutstring.substring(2, 4);
          } else if(a === 6) {
            this.bhours.monendtime = cutstring.substring(0, 4);
            this.bhours.monendtimeam = cutstring.substring(4, 6);
          } else if(a === 7) {
            this.bhours.monendtime = cutstring.substring(0, 5);
            this.bhours.monendtimeam = cutstring.substring(5, 7);
          }
         }

         if(data['tuesday'] !== '') {
          this.bhours.tuesday = true;

          var m = data['tuesday'];
          if(m.indexOf('-') === 3) {
            this.bhours.tuestarttime = m.substring(0, 1);
            this.bhours.tuestarttimeam = m.substring(1, 3);
          } else if(m.indexOf('-') === 4) {
            this.bhours.tuestarttime = m.substring(0, 2);
            this.bhours.tuestarttimeam = m.substring(2, 4);
          } else if(m.indexOf('-') === 6) {
            this.bhours.tuestarttime = m.substring(0, 4);
            this.bhours.tuestarttimeam = m.substring(4, 6);
          } else if(m.indexOf('-') === 7) {
            this.bhours.tuestarttime = m.substring(0, 5);
            this.bhours.tuestarttimeam = m.substring(5, 7);
          }


          var a = m.split('-')[1].length;
          var cutstring = m.split('-')[1];

          if(a === 3) {
            this.bhours.tueendtime = cutstring.substring(0, 1);
            this.bhours.tueendtimeam = cutstring.substring(1, 3);
          } else if(a === 4) {
            this.bhours.tueendtime = cutstring.substring(0, 2);
            this.bhours.tueendtimeam = cutstring.substring(2, 4);
          } else if(a === 6) {
            this.bhours.tueendtime = cutstring.substring(0, 4);
            this.bhours.tueendtimeam = cutstring.substring(4, 6);
          } else if(a === 7) {
            this.bhours.tueendtime = cutstring.substring(0, 5);
            this.bhours.tueendtimeam = cutstring.substring(5, 7);
          }
         }

         if(data['wednesday'] !== '') {
          this.bhours.wednesday = true;

          var m = data['wednesday'];
          if(m.indexOf('-') === 3) {
            this.bhours.wedstarttime = m.substring(0, 1);
            this.bhours.wedstarttimeam = m.substring(1, 3);
          } else if(m.indexOf('-') === 4) {
            this.bhours.wedstarttime = m.substring(0, 2);
            this.bhours.wedstarttimeam = m.substring(2, 4);
          } else if(m.indexOf('-') === 6) {
            this.bhours.wedstarttime = m.substring(0, 4);
            this.bhours.wedstarttimeam = m.substring(4, 6);
          } else if(m.indexOf('-') === 7) {
            this.bhours.wedstarttime = m.substring(0, 5);
            this.bhours.wedstarttimeam = m.substring(5, 7);
          }

          var a = m.split('-')[1].length;
          var cutstring = m.split('-')[1];

          if(a === 3) {
            this.bhours.wedendtime = cutstring.substring(0, 1);
            this.bhours.wedendtimeam = cutstring.substring(1, 3);
          } else if(a === 4) {
            this.bhours.wedendtime = cutstring.substring(0, 2);
            this.bhours.wedendtimeam = cutstring.substring(2, 4);
          } else if(a === 6) {
            this.bhours.wedendtime = cutstring.substring(0, 4);
            this.bhours.wedendtimeam = cutstring.substring(4, 6);
          } else if(a === 7) {
            this.bhours.wedendtime = cutstring.substring(0, 5);
            this.bhours.wedendtimeam = cutstring.substring(5, 7);
          }
         }

         if(data['thrusday'] !== '') {
          this.bhours.thursday = true;

          var m = data['thrusday'];
          if(m.indexOf('-') === 3) {
            this.bhours.thustarttime = m.substring(0, 1);
            this.bhours.thustarttimeam = m.substring(1, 3);
          } else if(m.indexOf('-') === 4) {
            this.bhours.thustarttime = m.substring(0, 2);
            this.bhours.thustarttimeam = m.substring(2, 4);
          } else if(m.indexOf('-') === 6) {
            this.bhours.thustarttime = m.substring(0, 4);
            this.bhours.thustarttimeam = m.substring(4, 6);
          } else if(m.indexOf('-') === 7) {
            this.bhours.thustarttime = m.substring(0, 5);
            this.bhours.thustarttimeam = m.substring(5, 7);
          }


          var a = m.split('-')[1].length;
          var cutstring = m.split('-')[1];

          if(a === 3) {
            this.bhours.thuendtime = cutstring.substring(0, 1);
            this.bhours.thuendtimeam = cutstring.substring(1, 3);
          } else if(a === 4) {
            this.bhours.thuendtime = cutstring.substring(0, 2);
            this.bhours.thuendtimeam = cutstring.substring(2, 4);
          } else if(a === 6) {
            this.bhours.thuendtime = cutstring.substring(0, 4);
            this.bhours.thuendtimeam = cutstring.substring(4, 6);
          } else if(a === 7) {
            this.bhours.thuendtime = cutstring.substring(0, 5);
            this.bhours.thuendtimeam = cutstring.substring(5, 7);
          }

         }

         if(data['friday'] !== '') {
          this.bhours.friday = true;

          var m = data['friday'];
          if(m.indexOf('-') === 3) {
            this.bhours.fristarttime = m.substring(0, 1);
            this.bhours.fristarttimeam = m.substring(1, 3);
          } else if(m.indexOf('-') === 4) {
            this.bhours.fristarttime = m.substring(0, 2);
            this.bhours.fristarttimeam = m.substring(2, 4);
          } else if(m.indexOf('-') === 6) {
            this.bhours.fristarttime = m.substring(0, 4);
            this.bhours.fristarttimeam = m.substring(4, 6);
          } else if(m.indexOf('-') === 7) {
            this.bhours.fristarttime = m.substring(0, 5);
            this.bhours.fristarttimeam = m.substring(5, 7);
          }

          var a = m.split('-')[1].length;
          var cutstring = m.split('-')[1];

          if(a === 3) {
            this.bhours.friendtime = cutstring.substring(0, 1);
            this.bhours.friendtimeam = cutstring.substring(1, 3);
          } else if(a === 4) {
            this.bhours.friendtime = cutstring.substring(0, 2);
            this.bhours.friendtimeam = cutstring.substring(2, 4);
          } else if(a === 6) {
            this.bhours.friendtime = cutstring.substring(0, 4);
            this.bhours.friendtimeam = cutstring.substring(4, 6);
          } else if(a === 7) {
            this.bhours.friendtime = cutstring.substring(0, 5);
            this.bhours.friendtimeam = cutstring.substring(5, 7);
          }

         }

         if(data['saturday'] !== '') {
          this.bhours.saturday = true;

          var m = data['saturday'];
          if(m.indexOf('-') === 3) {
            this.bhours.satstarttime = m.substring(0, 1);
            this.bhours.satstarttimeam = m.substring(1, 3);
          } else if(m.indexOf('-') === 4) {
            this.bhours.satstarttime = m.substring(0, 2);
            this.bhours.satstarttimeam = m.substring(2, 4);
          } else if(m.indexOf('-') === 6) {
            this.bhours.satstarttime = m.substring(0, 4);
            this.bhours.satstarttimeam = m.substring(4, 6);
          } else if(m.indexOf('-') === 7) {
            this.bhours.satstarttime = m.substring(0, 5);
            this.bhours.satstarttimeam = m.substring(5, 7);
          }


          var a = m.split('-')[1].length;
          var cutstring = m.split('-')[1];

          if(a === 3) {
            this.bhours.satendtime = cutstring.substring(0, 1);
            this.bhours.satendtimeam = cutstring.substring(1, 3);
          } else if(a === 4) {
            this.bhours.satendtime = cutstring.substring(0, 2);
            this.bhours.satendtimeam = cutstring.substring(2, 4);
          } else if(a === 6) {
            this.bhours.satendtime = cutstring.substring(0, 4);
            this.bhours.satendtimeam = cutstring.substring(4, 6);
          } else if(a === 7) {
            this.bhours.satendtime = cutstring.substring(0, 5);
            this.bhours.satendtimeam = cutstring.substring(5, 7);
          }

         }

         if(data['sunday'] !== '') {
          this.bhours.sunday = true;

          var m = data['sunday'];
          if(m.indexOf('-') === 3) {
            this.bhours.sunstarttime = m.substring(0, 1);
            this.bhours.sunstarttimeam = m.substring(1, 3);
          } else if(m.indexOf('-') === 4) {
            this.bhours.sunstarttime = m.substring(0, 2);
            this.bhours.sunstarttimeam = m.substring(2, 4);
          } else if(m.indexOf('-') === 6) {
            this.bhours.sunstarttime = m.substring(0, 4);
            this.bhours.sunstarttimeam = m.substring(4, 6);
          } else if(m.indexOf('-') === 7) {
            this.bhours.sunstarttime = m.substring(0, 5);
            this.bhours.sunstarttimeam = m.substring(5, 7);
          }


          var a = m.split('-')[1].length;
          var cutstring = m.split('-')[1];

          if(a === 3) {
            this.bhours.sunendtime = cutstring.substring(0, 1);
            this.bhours.sunendtimeam = cutstring.substring(1, 3);
          } else if(a === 4) {
            this.bhours.sunendtime = cutstring.substring(0, 2);
            this.bhours.sunendtimeam = cutstring.substring(2, 4);
          } else if(a === 6) {
            this.bhours.sunendtime = cutstring.substring(0, 4);
            this.bhours.sunendtimeam = cutstring.substring(4, 6);
          } else if(a === 7) {
            this.bhours.sunendtime = cutstring.substring(0, 5);
            this.bhours.sunendtimeam = cutstring.substring(5, 7);
          }
         }

        });

    }

  }

  onTemplateFormSubmit() {
    this.loading = true;

    var businessdata = new BussinesshoursClass();

    businessdata.Bussinessname = this.bhours.name;
    businessdata.Bussinessdescription = this.bhours.description;
    businessdata.Timezone = this.bhours.timezone;
    businessdata.Hours = this.bhours.hours;

    if(this.bhours.monday === true) {
      businessdata.Monday = this.bhours.monstarttime + this.bhours.monstarttimeam + '-' + this.bhours.monendtime + this.bhours.monendtimeam;
    } else {
      businessdata.Monday = '';
    }

    if(this.bhours.tuesday === true) {
      businessdata.Tuesday = this.bhours.tuestarttime + this.bhours.tuestarttimeam + '-' + this.bhours.tueendtime + this.bhours.tueendtimeam;
    } else {
      businessdata.Tuesday = '';
    }

    if(this.bhours.wednesday === true) {
      businessdata.Wednesday = this.bhours.wedstarttime + this.bhours.wedstarttimeam + '-' + this.bhours.wedendtime + this.bhours.wedendtimeam;
    } else {
      businessdata.Wednesday = '';
    }

    if(this.bhours.thursday === true) {
      businessdata.Thrusday = this.bhours.thustarttime + this.bhours.thustarttimeam + '-' + this.bhours.thuendtime + this.bhours.thuendtimeam;
    } else {
      businessdata.Thrusday = '';
    }

    if(this.bhours.friday === true) {
      businessdata.Friday = this.bhours.fristarttime + this.bhours.fristarttimeam + '-' + this.bhours.friendtime + this.bhours.friendtimeam;
    } else {
      businessdata.Friday = '';
    }

    if(this.bhours.saturday === true) {
      businessdata.Saturday = this.bhours.satstarttime + this.bhours.satstarttimeam + '-' + this.bhours.satendtime + this.bhours.satendtimeam;
    } else {
      businessdata.Saturday = '';
    }

    if(this.bhours.sunday === true) {
      businessdata.Sunday = this.bhours.sunstarttime + this.bhours.sunstarttimeam + '-' + this.bhours.sunendtime + this.bhours.sunendtimeam;
    } else {
      businessdata.Sunday = '';
    }

    this.bs.Add(businessdata).subscribe(data1 => {
      for (let i = 0; i < this.holidaydata.length; i++) {
        var holid = new HolidayClass();

        holid.Day = this.holidaydata[i].day;
        holid.Month = this.holidaydata[i].month;
        holid.Holidayname = this.holidaydata[i].holidayname;
        holid.BussinessGuid = data1;

        this.holidays.Add(holid).subscribe(data2 => {
          this.loading = false;
        });
      }
        this.loading = false;
        this.toastr.success('New Bussiness hours Added Successfully !', 'Success !');
        this.router.navigate(['settings/bussiness_hours/viewbussiness-hours']);
    });
  }

  update() {
    this.loading = true;

    var businessdata = new BussinesshoursClass();

    businessdata.BussinessGuid = this.guid;
    businessdata.Bussinessname = this.bhours.name;
    businessdata.Bussinessdescription = this.bhours.description;
    businessdata.Timezone = this.bhours.timezone;
    businessdata.Hours = this.bhours.hours;

    if(this.bhours.monday === true) {
      businessdata.Monday = this.bhours.monstarttime + this.bhours.monstarttimeam + '-' + this.bhours.monendtime + this.bhours.monendtimeam;
    } else {
      businessdata.Monday = '';
    }

    if(this.bhours.tuesday === true) {
      businessdata.Tuesday = this.bhours.tuestarttime + this.bhours.tuestarttimeam + '-' + this.bhours.tueendtime + this.bhours.tueendtimeam;
    } else {
      businessdata.Tuesday = '';
    }

    if(this.bhours.wednesday === true) {
      businessdata.Wednesday = this.bhours.wedstarttime + this.bhours.wedstarttimeam + '-' + this.bhours.wedendtime + this.bhours.wedendtimeam;
    } else {
      businessdata.Wednesday = '';
    }

    if(this.bhours.thursday === true) {
      businessdata.Thrusday = this.bhours.thustarttime + this.bhours.thustarttimeam + '-' + this.bhours.thuendtime + this.bhours.thuendtimeam;
    } else {
      businessdata.Thrusday = '';
    }

    if(this.bhours.friday === true) {
      businessdata.Friday = this.bhours.fristarttime + this.bhours.fristarttimeam + '-' + this.bhours.friendtime + this.bhours.friendtimeam;
    } else {
      businessdata.Friday = '';
    }

    if(this.bhours.saturday === true) {
      businessdata.Saturday = this.bhours.satstarttime + this.bhours.satstarttimeam + '-' + this.bhours.satendtime + this.bhours.satendtimeam;
    } else {
      businessdata.Saturday = '';
    }

    if(this.bhours.sunday === true) {
      businessdata.Sunday = this.bhours.sunstarttime + this.bhours.sunstarttimeam + '-' + this.bhours.sunendtime + this.bhours.sunendtimeam;
    } else {
      businessdata.Sunday = '';
    }

     this.bs.update(businessdata).subscribe(data1 => {
      this.loading = false;
      this.toastr.success('Bussiness hour Updated Successfully !', 'Success !');
      this.router.navigate(['settings/bussiness_hours/viewbussiness-hours']);
     });

  }


  addholiday(){
    this.loadingholibtn = true;
    if(this.guid === undefined) {
      this.holidaydata.push({'month': this.holi.month, 'day': this.holi.day, 'holidayname': this.holi.holidayname});
    } else {
      this.holidaydata.push({'month': this.holi.month, 'day': this.holi.day, 'holidayname': this.holi.holidayname});

      var holid = new HolidayClass();

        holid.Day = this.holi.day;
        holid.Month = this.holi.month;
        holid.Holidayname = this.holi.holidayname;
        holid.BussinessGuid = this.guid;

        this.holidays.Add(holid).subscribe(data2 => {
          this.loading = false;
        });
    }

    this.toastr.success('New Holiday added Successfully !', 'Success !');
    this.loadingholibtn = false;
  }

  delete(a){
    if(this.guid === undefined) {
      const index = this.holidaydata.indexOf(a);
      if (index > -1) {
        this.holidaydata.splice(index, 1);
      }
      this.toastr.error('Holiday Removed Successfully !', 'Removed !');
    } else {
      const index = this.holidaydata.indexOf(a);
      if (index > -1) {
        this.holidaydata.splice(index, 1);
      }
      let hguid = a['holidayguid'];
      this.holidays.delete(hguid).subscribe(data1 => {
        this.toastr.error('Holiday Removed Successfully !', 'Removed !');
      });
    }
  }
}
