import { AgentService } from 'src/app/settings/agents/agents.service';
import { GroupService } from './../settings/groups/group.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unresolved-tickets',
  templateUrl: './unresolved-tickets.component.html',
  styleUrls: ['./unresolved-tickets.component.css']
})
export class UnresolvedTicketsComponent implements OnInit {

  public loading: boolean;
  gorups: any = {};
  agents: any = {};

  constructor(private groupservice: GroupService, private agentservice: AgentService) { }

  ngOnInit() {
    this.loading = true;
    this.groupservice.get().subscribe(data => {
      this.gorups = data;
      this.loading = false;
    });

    this.agentservice.get().subscribe(data => {
      this.agents = data;
      this.loading = false;
    });
  }


  getopentickets(id) {
    let a = [];
    let groupsfilter = this.gorups.filter(m => {
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

  getpendingtickets(id) {
    let a = [];
    let groupsfilter = this.gorups.filter(m => {
      if(id === m.gguid) {
        if (m.ticket.length !== 0) {
          for (var i = 0; i < m.ticket.length; i++) {
            if (m.ticket[i].status === 'Pending') {
              a.push(m.ticket[i].status);
            }
          }
          // return m;
        }
      }
    });
    return a.length;
  }

  getwaitingoncusttickets(id) {
    let a = [];
    let groupsfilter = this.gorups.filter(m => {
      if(id === m.gguid) {
        if (m.ticket.length !== 0) {
          for (var i = 0; i < m.ticket.length; i++) {
            if (m.ticket[i].status === 'Waiting on Customer') {
              a.push(m.ticket[i].status);
            }
          }
          // return m;
        }
      }
    });
    return a.length;
  }

  getwaitingonthirdtickets(id) {
    let a = [];
    let groupsfilter = this.gorups.filter(m => {
      if(id === m.gguid) {
        if (m.ticket.length !== 0) {
          for (var i = 0; i < m.ticket.length; i++) {
            if (m.ticket[i].status === 'Waiting on Third Party') {
              a.push(m.ticket[i].status);
            }
          }
          // return m;
        }
      }
    });
    return a.length;
  }


  getopenticketsagent(id) {
    let a = [];
    let groupsfilter = this.agents.filter(m => {
      if(id === m.agGuid) {
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

  getpendingticketsagent(id) {
    let a = [];
    let groupsfilter = this.agents.filter(m => {
      if(id === m.agGuid) {
        if (m.ticket.length !== 0) {
          for (var i = 0; i < m.ticket.length; i++) {
            if (m.ticket[i].status === 'Pending') {
              a.push(m.ticket[i].status);
            }
          }
          // return m;
        }
      }
    });
    return a.length;
  }

  getwaitingoncustticketsagent(id) {
    let a = [];
    let groupsfilter = this.agents.filter(m => {
      if(id === m.agGuid) {
        if (m.ticket.length !== 0) {
          for (var i = 0; i < m.ticket.length; i++) {
            if (m.ticket[i].status === 'Waiting on Customer') {
              a.push(m.ticket[i].status);
            }
          }
          // return m;
        }
      }
    });
    return a.length;
  }

  getwaitingonthirdticketsagent(id) {
    let a = [];
    let groupsfilter = this.agents.filter(m => {
      if(id === m.agGuid) {
        if (m.ticket.length !== 0) {
          for (var i = 0; i < m.ticket.length; i++) {
            if (m.ticket[i].status === 'Waiting on Third Party') {
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
