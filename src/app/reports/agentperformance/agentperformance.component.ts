import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/settings/agents/agents.service';
import { TicketreplyService } from 'src/app/tickets/detail-ticket/ticketreply.service';
import { NewticketservicesService } from 'src/app/tickets/new/newticketservices.service';

export const multi = [];
@Component({
  selector: 'app-agentperformance',
  templateUrl: './agentperformance.component.html',
  styleUrls: ['./agentperformance.component.css']
})
export class AgentperformanceComponent implements OnInit {

  agents: any = {};
  replies: any = {};
  public loading: boolean;
  tdata: any = {};
  public s: boolean;
  public piechart: boolean;

  single: any[];
  multi: any[];

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

  constructor(private agentservice: AgentService, private replyticket: TicketreplyService, private ticketservice: NewticketservicesService) {
    Object.assign(this, {
      multi,
    });
   }

  ngOnInit() {
    this.loading = true;
    this.s = false;
    this.piechart = false;

    // while(single.length > 0) {
    //   single.pop();
    // }

    this.ticketservice.get().subscribe(data => {
      this.tdata = data;

    this.agentservice.get().subscribe(data => {
      this.agents = data;
      this.loading = false;

      for (let d = 0; d < Number(this.agents.length); d++) {

        var a = this.agents[d].agGuid;
        var agname = this.agents[d].fullname;

        let dateunresolved0 = this.tdata.filter(m => {
          if (a === m.agGuid && m.status !== 'Resolved') {
            return m;
          }
        });


        let dateresolved0 = this.tdata.filter(m => {
          if (a === m.agGuid && m.status === 'Resolved') {
            return m;
          }
        });

        let dateall0 = this.tdata.filter(m => {
          if (a === m.agGuid) {
            return m;
          }
        });
        multi.push({name : agname.toString(),series : [{name : 'Received',value : dateall0.length},{name : 'Resolved',value : dateresolved0.length} ,{name : 'Unresolved',value : dateunresolved0.length}]});

        // single.push({name : agname.toString(),value : dateresolved0.length});
      }
      this.s = true;
      this.piechart = true;
    });
  });


    this.replyticket.get().subscribe(data => {
      this.replies = data;
    });
  }


  gettotaltickets(id) {
    let a = [];
    let agentsfilter = this.agents.filter(m => {
      if(id === m.agGuid) {
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
    let agentsfilter = this.agents.filter(m => {
      if(id === m.agGuid) {
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
    let agentsfilter = this.agents.filter(m => {
      if(id === m.agGuid) {
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
          if (m.agGu.agGuid === id) {
            a.push(m.agGu.agGuid);
          }
      }
    });
    return a.length;
  }

}
