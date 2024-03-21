import { GroupService } from './../settings/groups/group.service';
import { RoleService } from './../settings/roles/role.service';
import { NewticketservicesService } from './../tickets/new/newticketservices.service';
import { StatuscounterService } from './statuscounter.service';
import { Component, AfterViewInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import * as c3 from 'c3';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

declare var require: any;

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}
@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {
  subtitle: string;
  openc: any = {};
  pendingc: any = {};
  resolvedc: any = {};
  closec: any = {};
  unassigned: any = {};
  tdata: any = [];
  test: any = {};

  todaysopentickets: string;
  todaysunassignedtickets: string;
  todaysclosedtickets: string;
  todaysresolvedtickets: string;
  todayswaintingoncusttickets: string;
  todayswaintingonthirdtickets: string;

  groups: any = {};

  opnetickets: any = {};
  open = ['Open'];
  close = ['Closed'];
  resolved = ['Resolved'];
  pendings = ['Pending'];

  public loading: boolean;
  public opend1: any = [];
  constructor(private statusservice: StatuscounterService, private ticketservice: NewticketservicesService,
    private cookie: CookieService, private router: Router, private roleservice: RoleService, private gs: GroupService) {
  }


  ngAfterViewInit() {

    if (this.cookie.get('Guid') === '') {
      this.router.navigate(['login']);
    }

    if (this.cookie.get('RoleGuid') === '') {
      this.router.navigate(['login']);
    }

    this.loading = true;

    this.gs.get().subscribe(data => {
      this.groups = data;
      localStorage.setItem('Group', data[0]['groupname']);
      localStorage.removeItem('dataSource');
    });

    this.statusservice.getbyid('Open').subscribe(data => {
      this.openc = data;
      this.loading = false;
    });

   this.statusservice.getbyid('Resolved').subscribe(data => {
    this.resolvedc = data;
    });

  this.statusservice.getbyid('Pending').subscribe(data => {
    this.pendingc = data;
  });

  this.statusservice.getbyid('Close').subscribe(data => {
    this.closec = data;
  });

  this.ticketservice.get().subscribe(data => {
    this.tdata = data;

    let counter = 0;
    for (let i = 0; i < this.tdata.length; i++) {
      if (this.tdata[i].agGuid === null) { counter++; }
    }
    this.unassigned = counter;

    let todaysopen = this.tdata.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.datetime);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate && m.status === 'Open') {
        return m;
      }
    });
    this.todaysopentickets = todaysopen.length;

    let todaysunassigned = this.tdata.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.datetime);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate && m.agGuid === '') {
        return m;
      }
    });
    this.todaysunassignedtickets = todaysunassigned.length;

    let todaysclosed = this.tdata.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.datetime);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate && m.status === 'Close') {
        return m;
      }
    });
    this.todaysclosedtickets = todaysclosed.length;

    let todaysresolved = this.tdata.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.resolveddate);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate && m.status === 'Resolved') {
        return m;
      }
    });
    this.todaysresolvedtickets = todaysresolved.length;

    let todayswaitingoncust = this.tdata.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.datetime);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate && m.status === 'Waiting on Customer') {
        return m;
      }
    });
    this.todayswaintingoncusttickets = todayswaitingoncust.length;

    let todayswaitingonthird = this.tdata.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.datetime);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate && m.status === 'Waiting on Third Party') {
        return m;
      }
    });
    this.todayswaintingonthirdtickets = todayswaitingonthird.length;

  });


  /// OPEN tickets
  this.statusservice.getbyid('Open').subscribe(dataopen => {

    this.opnetickets = dataopen;

    // tslint:disable-next-line: prefer-const
    let dateopen0 = this.opnetickets.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = (date.getDate() - 6) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.datetime);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate) {
        return m;
      }
    });
    this.open.push(dateopen0.length);

    // tslint:disable-next-line: prefer-const
    let dateopen1 = this.opnetickets.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = (date.getDate() - 5) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.datetime);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate) {
        return m;
      }
    });
    this.open.push(dateopen1.length);

      // tslint:disable-next-line: prefer-const
      let dateopen2 = this.opnetickets.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 4) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.open.push(dateopen2.length);



      // tslint:disable-next-line: prefer-const
      let dateopen3 = this.opnetickets.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 3) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.open.push(dateopen3.length);

      // tslint:disable-next-line: prefer-const
      let dateopen4 = this.opnetickets.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 2) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.open.push(dateopen4.length);



      // tslint:disable-next-line: prefer-const
      let dateopen5 = this.opnetickets.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 1) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.open.push(dateopen5.length);

      // tslint:disable-next-line: prefer-const
      let dateopen6 = this.opnetickets.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.open.push(dateopen6.length);

      this.map(this.open, this.close, this.resolved, this.pendings);
  });


  /// CLOSED tickets
  this.statusservice.getbyid('Close').subscribe(dataclose => {

    this.closec = dataclose;

    // tslint:disable-next-line: prefer-const
    let dateclose0 = this.closec.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = (date.getDate() - 6) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.datetime);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate) {
        return m;
      }
    });
    this.close.push(dateclose0.length);

    // tslint:disable-next-line: prefer-const
    let dateclose1 = this.closec.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = (date.getDate() - 5) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.datetime);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate) {
        return m;
      }
    });
    this.close.push(dateclose1.length);

      // tslint:disable-next-line: prefer-const
      let dateclose2 = this.closec.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 4) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.close.push(dateclose2.length);



      // tslint:disable-next-line: prefer-const
      let dateclose3 = this.closec.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 3) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.close.push(dateclose3.length);

      // tslint:disable-next-line: prefer-const
      let dateclose4 = this.closec.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 2) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.close.push(dateclose4.length);



      // tslint:disable-next-line: prefer-const
      let dateclose5 = this.closec.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 1) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.close.push(dateclose5.length);

      // tslint:disable-next-line: prefer-const
      let dateclose6 = this.closec.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.close.push(dateclose6.length);

    this.map(this.open, this.close, this.resolved, this.pendings);
  });


  /// RESOLVED tickets
  this.statusservice.getbyid('Resolved').subscribe(dataresolved => {

    this.resolvedc = dataresolved;

    // tslint:disable-next-line: prefer-const
    let dateresolved0 = this.resolvedc.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = (date.getDate() - 6) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.resolveddate);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate) {
        return m;
      }
    });
    this.resolved.push(dateresolved0.length);

    // tslint:disable-next-line: prefer-const
    let dateresolved1 = this.resolvedc.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = (date.getDate() - 5) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.resolveddate);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate) {
        return m;
      }
    });
    this.resolved.push(dateresolved1.length);

      // tslint:disable-next-line: prefer-const
      let dateresolved2 = this.resolvedc.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 4) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.resolveddate);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.resolved.push(dateresolved2.length);



      // tslint:disable-next-line: prefer-const
      let dateresolved3 = this.resolvedc.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 3) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.resolveddate);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.resolved.push(dateresolved3.length);

      // tslint:disable-next-line: prefer-const
      let dateresolved4 = this.resolvedc.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 2) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.resolveddate);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.resolved.push(dateresolved4.length);



      // tslint:disable-next-line: prefer-const
      let dateresolved5 = this.resolvedc.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 1) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.resolveddate);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.resolved.push(dateresolved5.length);

      // tslint:disable-next-line: prefer-const
      let dateresolved6 = this.resolvedc.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.resolveddate);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        console.log(fetchdate);
        console.log(a);
        if (a === fetchdate) {
          return m;
        }
      });
      this.resolved.push(dateresolved6.length);

    this.map(this.open, this.close, this.resolved, this.pendings);
  });


  /// PENDINGS tickets
  this.statusservice.getbyid('Pending').subscribe(datapending => {

    this.pendingc = datapending;

    // tslint:disable-next-line: prefer-const
    let datepending0 = this.pendingc.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = (date.getDate() - 6) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.datetime);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate) {
        return m;
      }
    });
    this.pendings.push(datepending0.length);

    // tslint:disable-next-line: prefer-const
    let datepending1 = this.pendingc.filter(m => {
      // tslint:disable-next-line: prefer-const
      let date = new Date();
      // tslint:disable-next-line: prefer-const
      var a = (date.getDate() - 5) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      // tslint:disable-next-line: prefer-const
      let d = new Date(m.datetime);
      // tslint:disable-next-line: prefer-const
      var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

      if (a === fetchdate) {
        return m;
      }
    });
    this.pendings.push(datepending1.length);

      // tslint:disable-next-line: prefer-const
      let datepending2 = this.pendingc.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 4) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.pendings.push(datepending2.length);



      // tslint:disable-next-line: prefer-const
      let datepending3 = this.pendingc.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 3) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.pendings.push(datepending3.length);

      // tslint:disable-next-line: prefer-const
      let datepending4 = this.pendingc.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 2) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.pendings.push(datepending4.length);



      // tslint:disable-next-line: prefer-const
      let datepending5 = this.pendingc.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 1) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.pendings.push(datepending5.length);

      // tslint:disable-next-line: prefer-const
      let datepending6 = this.pendingc.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });
      this.pendings.push(datepending6.length);

    this.map(this.open, this.close, this.resolved, this.pendings);
  });

}


  map(open, close, resolved, pendings) {
    const chart2 = c3.generate({
      bindto: '#product-sales',
      data: {
        columns: [
          open,
          close,
          resolved,
          pendings
        ],
        type: 'spline',
      },
      axis: {
        y: {
          show: true,
          // tick: {
          //   count: 0,
          //   outer: false
          // }
        },
        x: {
          show: true
        }
      },
      padding: {
        top: 40,
        right: 10,
        bottom: 40,
        left: 20
      },
      // point: {
      //   r: 0
      // },
      legend: {
        hide: false
      },
      color: {
        pattern: ['#4798e8', '#FF0000', '#008000', '#FFCC00']
      }
    });
  }


  getopentickets(id) {
    let a = [];
    let groupsfilter = this.groups.filter(m => {
      if(id === m.gguid) {
        if (m.ticket.length !== 0) {

          for (var i = 0; i < m.ticket.length; i++) {
            if (m.ticket[i].status === 'Open') {
              a.push(m.ticket[i].status);
            }
          }
          // return m;
        }
      }
    });
    return a.length;
  }

  getresolvedtickets(id) {
    let a = [];
    let groupsfilter = this.groups.filter(m => {
      if(id === m.gguid) {
        if (m.ticket.length !== 0) {

          for (var i = 0; i < m.ticket.length; i++) {
            if (m.ticket[i].status === 'Resolved') {
              a.push(m.ticket[i].status);
            }
          }
          // return m;
        }
      }
    });
    return a.length;
  }
}
