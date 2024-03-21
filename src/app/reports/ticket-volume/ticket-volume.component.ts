import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import * as d3 from 'd3';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import { NewticketservicesService } from 'src/app/tickets/new/newticketservices.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

export const multi = [];
export const multifilt = [];
export const monthgraph = [];
export const yeargraph = [];
@Component({
  selector: 'app-ticket-volume',
  templateUrl: './ticket-volume.component.html',
  styleUrls: ['./ticket-volume.component.css']
})

export class TicketVolumeComponent implements OnInit {

  model: NgbDateStruct;
  model1: NgbDateStruct;
  public s: boolean;
  public filteredgraph: boolean;
  public daybtn = true;
  public monbtn: boolean;
  public yearbtn: boolean;

  public loading: boolean;

  public showdatefilter = false;

  tdata: any = {};
  monthdrop: any = {};

  multi: any[];
  multifilt: any[];
  monthgraph: any[];
  yeargraph: any[];

  filtdate: string;

  dateData: any[];
  dateDataWithRange: any[];
  range = false;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = 'No. of Tickets';
  showGridLines = true;
  innerPadding = 0;
  autoScale = true;
  timeline = false;
  barPadding = 8;
  groupPadding = 0;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  view = '';
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.25;
  rangeFillOpacity = 0.15;

  colorScheme = {
    domain: ['#4798e8', 'rgb(160, 215, 106)', 'rgb(255, 208, 18)', '#ef6e6e', '#01c0c8', '#e6f2fa']
  };
  schemeType = 'ordinal';

  constructor(private ticketservice: NewticketservicesService,) {
    Object.assign(this, {
      multi,
      multifilt,
      monthgraph,
      yeargraph,
    });
  }

  ngOnInit() {

    this.loading = false;
    this.s = false;
    let date6: any;
    let date5: any;
    let date4: any;
    let date3: any;
    let date2: any;
    let date1: any;
    let date0: any;


    this.ticketservice.get().subscribe(data => {
      this.tdata = data;

      // tslint:disable-next-line: prefer-const
      let dateresolved6 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 6) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status === 'Resolved') {
          return m;
        }
      });

      let dateall6 = this.tdata.filter(m => {
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

      let dateunresolved6 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 6) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status !== 'Resolved') {
          return m;
        }
        date6 = (date.getDate() - 6) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();;
      });

      multi.push({name : date6.toString(),series : [{name : 'Received',value : dateall6.length},{name : 'Resolved',value : dateresolved6.length} ,{name : 'Unresolved',value : dateunresolved6.length}]});


      // tslint:disable-next-line: prefer-const
      let dateresolved5 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 5) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status === 'Resolved') {
          return m;
        }
      });

      let dateall5 = this.tdata.filter(m => {
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

      let dateunresolved5 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 5) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status !== 'Resolved') {
          return m;
        }
        date5 = (date.getDate() - 5) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();;
      });

      multi.push({name : date5.toString(),series : [{name : 'Received',value : dateall5.length},{name : 'Resolved',value : dateresolved5.length} ,{name : 'Unresolved',value : dateunresolved5.length}]});


      // tslint:disable-next-line: prefer-const
      let dateresolved4 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 4) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status === 'Resolved') {
          return m;
        }
      });

      let dateall4 = this.tdata.filter(m => {
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

      let dateunresolved4 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 4) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status !== 'Resolved') {
          return m;
        }
        date4 = (date.getDate() - 4) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();;
      });

      multi.push({name : date4.toString(),series : [{name : 'Received',value : dateall4.length},{name : 'Resolved',value : dateresolved4.length} ,{name : 'Unresolved',value : dateunresolved4.length}]});


      let dateresolved3 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 3) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status === 'Resolved') {
          return m;
        }
      });

      let dateall3 = this.tdata.filter(m => {
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

      let dateunresolved3 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 3) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status !== 'Resolved') {
          return m;
        }
        date3 = (date.getDate() - 3) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();;
      });

      multi.push({name : date3.toString(),series : [{name : 'Received',value : dateall3.length},{name : 'Resolved',value : dateresolved3.length} ,{name : 'Unresolved',value : dateunresolved3.length}]});


      let dateresolved2 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 2) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status === 'Resolved') {
          return m;
        }
      });

      let dateall2 = this.tdata.filter(m => {
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

      let dateunresolved2 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 2) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status !== 'Resolved') {
          return m;
        }
        date2 = (date.getDate() - 2) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();;
      });

      multi.push({name : date2.toString(),series : [{name : 'Received',value : dateall2.length},{name : 'Resolved',value : dateresolved2.length} ,{name : 'Unresolved',value : dateunresolved2.length}]});


      let dateresolved1 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 1) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status === 'Resolved') {
          return m;
        }
      });

      let dateall1 = this.tdata.filter(m => {
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

      let dateunresolved1 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getDate() - 1) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status !== 'Resolved') {
          return m;
        }
        date1 = (date.getDate() - 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();;
      });

      multi.push({name : date1.toString(),series : [{name : 'Received',value : dateall1.length},{name : 'Resolved',value : dateresolved1.length} ,{name : 'Unresolved',value : dateunresolved1.length}]});


      let dateresolved0 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status === 'Resolved') {
          return m;
        }
      });

      let dateall0 = this.tdata.filter(m => {
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

      let dateunresolved0 = this.tdata.filter(m => {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status !== 'Resolved') {
          return m;
        }
        date0 = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();;
      });

      multi.push({name : date0.toString(),series : [{name : 'Received',value : dateall0.length},{name : 'Resolved',value : dateresolved0.length} ,{name : 'Unresolved',value : dateunresolved0.length}]});



      for (let d = 0; d < 2; d++) {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getMonth()  + Number(d) + 1) + '-' + date.getFullYear();

        let dateunresolved0 = this.tdata.filter(m => {
          // tslint:disable-next-line: prefer-const
          let d = new Date(m.datetime);
          // tslint:disable-next-line: prefer-const
          var fetchdate = (d.getMonth() + 1) + '-' + d.getFullYear();

          if (a === fetchdate && m.status !== 'Resolved') {
            return m;
          }
        });


        let dateresolved0 = this.tdata.filter(m => {
          // tslint:disable-next-line: prefer-const
          let d = new Date(m.datetime);
          // tslint:disable-next-line: prefer-const
          var fetchdate = (d.getMonth() + 1) + '-' + d.getFullYear();

          if (a === fetchdate && m.status === 'Resolved') {
            return m;
          }
        });

        let dateall0 = this.tdata.filter(m => {
          // tslint:disable-next-line: prefer-const
          let d = new Date(m.datetime);
          // tslint:disable-next-line: prefer-const
          var fetchdate = (d.getMonth() + 1) + '-' + d.getFullYear();

          if (a === fetchdate) {
            return m;
          }
        });

        if(a.substring(0, 2) === '1-') {
          a = a.replace('1-','Jan-');
        } else if(a.substring(0, 2) === '2-') {
          a = a.replace('2-','Feb-');
        } else if(a.substring(0, 2) === '3-') {
          a = a.replace('3-','Mar-');
        } else if(a.substring(0, 2) === '4-') {
          a = a.replace('4-','Apr-');
        }  else if(a.substring(0, 2) === '5-') {
          a = a.replace('5-','May-');
        } else if(a.substring(0, 2) === '6-') {
          a = a.replace('6-','Jun-');
        } else if(a.substring(0, 2) === '7-') {
          a = a.replace('7-','July-');
        } else if(a.substring(0, 2) === '8-') {
          a = a.replace('8-','Aug-');
        } else if(a.substring(0, 2) === '9-') {
          a = a.replace('9-','Sept-');
        } else if(Number(a.substring(0, 2)) === 10) {
          a = a.replace('10-','Oct-');
        } else if(Number(a.substring(0, 2)) === 11) {
          a = a.replace('11-','Nov-');
        } else if(Number(a.substring(0, 2)) === 12) {
          a = a.replace('12-','Dec-');
        }

        monthgraph.push({name : a.toString(),series : [{name : 'Received',value : dateall0.length},{name : 'Resolved',value : dateresolved0.length} ,{name : 'Unresolved',value : dateunresolved0.length}]});
      }

      for (let d = 2; d > -1; d--) {
        // tslint:disable-next-line: prefer-const
        let date = new Date();
        // tslint:disable-next-line: prefer-const
        var a = (date.getFullYear() - Number(d)).toString();

        let dateunresolved0 = this.tdata.filter(m => {
          // tslint:disable-next-line: prefer-const
          let d = new Date(m.datetime);
          // tslint:disable-next-line: prefer-const
          var fetchdate = d.getFullYear().toString();

          if (a === fetchdate && m.status !== 'Resolved') {
            return m;
          }
        });


        let dateresolved0 = this.tdata.filter(m => {
          // tslint:disable-next-line: prefer-const
          let d = new Date(m.datetime);
          // tslint:disable-next-line: prefer-const
          var fetchdate = d.getFullYear().toString();

          if (a === fetchdate && m.status === 'Resolved') {
            return m;
          }
        });

        let dateall0 = this.tdata.filter(m => {
          // tslint:disable-next-line: prefer-const
          let d = new Date(m.datetime);
          // tslint:disable-next-line: prefer-const
          var fetchdate = d.getFullYear().toString();

          if (a === fetchdate) {
            return m;
          }
        });

        yeargraph.push({name : a.toString(),series : [{name : 'Received',value : dateall0.length},{name : 'Resolved',value : dateresolved0.length} ,{name : 'Unresolved',value : dateunresolved0.length}]});
      }


      this.s = true;
    });
  }

  filterdate(){
    if(this.showdatefilter === false) {
      this.showdatefilter = true;
    } else {
      this.showdatefilter = false;
      this.s = true;
      this.filteredgraph = false;
    }
  }

  filterbydate() {

    this.loading = true;
    this.filteredgraph = false;
    this.s = false;

    let start_Date = new Date(this.model['month'] + '-' + this.model['day'] + '-' + this.model['year']);
    let end_Date = new Date(this.model1['month'] + '-' + this.model1['day'] + '-' + this.model1['year']);

    let selectedUsers = this.tdata.filter(f => new Date(f.datetime) > start_Date && new Date(f.datetime) < end_Date);

    var Difference_In_Time = end_Date.getTime() - start_Date.getTime();
    var days = Difference_In_Time / (1000 * 3600 * 24);

    for (let d = 0; d < Number(days); d++) {
      // tslint:disable-next-line: prefer-const
      let date = start_Date;
      // tslint:disable-next-line: prefer-const
      var a = (date.getDate() + Number(d)) + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

      let dateunresolved0 = selectedUsers.filter(m => {
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status !== 'Resolved') {
          return m;
        }
      });

      let dateresolved0 = selectedUsers.filter(m => {
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status === 'Resolved') {
          return m;
        }
      });

      let dateall0 = selectedUsers.filter(m => {
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });

      multifilt.push({name : a.toString(),series : [{name : 'Received',value : dateall0.length},{name : 'Resolved',value : dateresolved0.length} ,{name : 'Unresolved',value : dateunresolved0.length}]});
    }
    this.loading = false;
    this.filteredgraph = true;
  }

  filterbymonth() {
    this.loading = true;
    this.filteredgraph = false;
    this.s = false;

    let start_Date = new Date(this.monthdrop.startmonth.substring(5, 7) + '-' + 1 + '-' + this.monthdrop.startmonth.substring(0, 4));
    let end_Date = new Date(this.monthdrop.endmonth.substring(5, 7) + '-' + 1 + '-' + this.monthdrop.endmonth.substring(0, 4));

    let selectedUsers = this.tdata.filter(f => new Date(f.datetime) > start_Date && new Date(f.datetime) < end_Date);

    var months = end_Date.getMonth() - start_Date.getMonth() + ((end_Date.getFullYear() - start_Date.getFullYear()) * 12);


    for (let d = 0; d < Number(months); d++) {
      // tslint:disable-next-line: prefer-const
      let date = start_Date;

      var a = (date.getMonth()  + Number(d) + 1) + '-' + date.getFullYear();

      if(Number(a.substring(0, 2)) > 12) {
        if(Number(a.substring(0, 2)) === 13) {
          a = '1-' + (date.getFullYear() + 1);
        } else if(Number(a.substring(0, 2)) === 14) {
          a = '2-' + (date.getFullYear() + 1);
        } else if(Number(a.substring(0, 2)) === 15) {
          a = '3-' + (date.getFullYear() + 1);
        } else if(Number(a.substring(0, 2)) === 16) {
          a = '4-' + (date.getFullYear() + 1);
        } else if(Number(a.substring(0, 2)) === 17) {
          a = '5-' + (date.getFullYear() + 1);
        } else if(Number(a.substring(0, 2)) === 18) {
          a = '6-' + (date.getFullYear() + 1);
        } else if(Number(a.substring(0, 2)) === 19) {
          a = '7-' + (date.getFullYear() + 1);
        } else if(Number(a.substring(0, 2)) === 20) {
          a = '8-' + (date.getFullYear() + 1);
        } else if(Number(a.substring(0, 2)) === 21) {
          a = '9-' + (date.getFullYear() + 1);
        } else if(Number(a.substring(0, 2)) === 22) {
          a = '10-' + (date.getFullYear() + 1);
        } else if(Number(a.substring(0, 2)) === 21) {
          a = '11-' + (date.getFullYear() + 1);
        } else if(Number(a.substring(0, 2)) === 22) {
          a = '12-' + (date.getFullYear() + 1);
        }
      }

      let dateunresolved0 = selectedUsers.filter(m => {
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status !== 'Resolved') {
          return m;
        }
      });


      let dateresolved0 = selectedUsers.filter(m => {
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate && m.status === 'Resolved') {
          return m;
        }
      });

      let dateall0 = selectedUsers.filter(m => {
        // tslint:disable-next-line: prefer-const
        let d = new Date(m.datetime);
        // tslint:disable-next-line: prefer-const
        var fetchdate = (d.getMonth() + 1) + '-' + d.getFullYear();

        if (a === fetchdate) {
          return m;
        }
      });

      if(a.substring(0, 2) === '1-') {
        a = a.replace('1-','Jan-');
      } else if(a.substring(0, 2) === '2-') {
        a = a.replace('2-','Feb-');
      } else if(a.substring(0, 2) === '3-') {
        a = a.replace('3-','Mar-');
      } else if(a.substring(0, 2) === '4-') {
        a = a.replace('4-','Apr-');
      }  else if(a.substring(0, 2) === '5-') {
        a = a.replace('5-','May-');
      } else if(a.substring(0, 2) === '6-') {
        a = a.replace('6-','Jun-');
      } else if(a.substring(0, 2) === '7-') {
        a = a.replace('7-','July-');
      } else if(a.substring(0, 2) === '8-') {
        a = a.replace('8-','Aug-');
      } else if(a.substring(0, 2) === '9-') {
        a = a.replace('9-','Sept-');
      } else if(Number(a.substring(0, 2)) === 10) {
        a = a.replace('10-','Oct-');
      } else if(Number(a.substring(0, 2)) === 11) {
        a = a.replace('11-','Nov-');
      } else if(Number(a.substring(0, 2)) === 12) {
        a = a.replace('12-','Dec-');
      }

      multifilt.push({name : a.toString(),series : [{name : 'Received',value : dateall0.length},{name : 'Resolved',value : dateresolved0.length} ,{name : 'Unresolved',value : dateunresolved0.length}]});
    }
    this.loading = false;
    this.filteredgraph = true;
  }

  changegraph(g){
    if(g === 'days') {
      this.daybtn = true;
      this.monbtn = false;
      this.yearbtn = false;
    } else if(g === 'month') {
      this.daybtn = false;
      this.monbtn = true;
      this.yearbtn = false;
    } else {
      this.daybtn = false;
      this.monbtn = false;
      this.yearbtn = true;
    }
  }

  chage() {
    this.filteredgraph = false;
    this.s = true;
    while(multifilt.length > 0) {
      multifilt.pop();
    }
  }
}
