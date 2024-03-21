import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/settings/groups/group.service';
import { TicketreplyService } from 'src/app/tickets/detail-ticket/ticketreply.service';
import { NewticketservicesService } from 'src/app/tickets/new/newticketservices.service';

export const single = [];
@Component({
  selector: 'app-groupperformance',
  templateUrl: './groupperformance.component.html',
  styleUrls: ['./groupperformance.component.css']
})
export class GroupperformanceComponent implements OnInit {

  public loading: boolean;
  gorups: any = {};
  replies: any = {};
  tdata: any = {};
  public piechart: boolean;

  single: any[];

  gradient = false;
  tooltipDisabled = false;

  colorScheme = {
    domain: ['#4798e8', 'rgb(160, 215, 106)', 'rgb(255, 208, 18)', '#ef6e6e', '#01c0c8', '#e6f2fa']
  };
  schemeType = 'ordinal';

  constructor(private groupservice: GroupService, private replyticket: TicketreplyService, private ticketservice: NewticketservicesService) {
    Object.assign(this, {
      single,
    });
   }

  ngOnInit() {
    this.loading = true;
    this.piechart = false;

    while(single.length > 0) {
      single.pop();
    }

    this.ticketservice.get().subscribe(data => {
      this.tdata = data;

      this.groupservice.get().subscribe(data => {
        this.gorups = data;
        this.loading = false;

        for (let d = 0; d < Number(this.gorups.length); d++) {

          var a = this.gorups[d].gguid;
          var gname = this.gorups[d].groupname;
          let dateresolved0 = this.tdata.filter(m => {
            if (a === m.gguid && m.status === 'Resolved') {
              return m;
            }
          });
          single.push({name : gname.toString(),value : dateresolved0.length});
        }
        this.piechart = true;
      });
    });

    this.replyticket.get().subscribe(data => {
      this.replies = data;
    });
  }

  gettotaltickets(id) {
    let a = [];
    let groupsfilter = this.gorups.filter(m => {
      if(id === m.gguid) {
        if (m.ticket.length !== 0) {
          for (var i = 0; i < m.ticket.length; i++) {
              a.push(m.ticket[i]);
          }
          // return m;
        }
      }
    });
    return a.length;
  }

  getresolvedtickets(id) {
    let a = [];
    let groupsfilter = this.gorups.filter(m => {
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

  getunresolvedtickets(id) {
    let a = [];
    let groupsfilter = this.gorups.filter(m => {
      if(id === m.gguid) {
        if (m.ticket.length !== 0) {
          for (var i = 0; i < m.ticket.length; i++) {
            if (m.ticket[i].status !== 'Resolved') {
              a.push(m.ticket[i].status);
            }
          }
          // return m;
        }
      }
    });
    return a.length;
  }

  getresponses(id) {
    let a = [];
    let replyfilter = this.replies.filter(m => {
      if(m.agGuid !== null) {
        if (m.agGu.gguid === id) {
          a.push(m.agGu.gguid);
        }
      }
    });
    return a.length;
  }

}
