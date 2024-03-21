import { NewbussinessHoursComponent } from './../../settings/bussiness_hours/newbussiness-hours/newbussiness-hours.component';
import { ViewbussinessHoursComponent } from './../../settings/bussiness_hours/viewbussiness-hours/viewbussiness-hours.component';
import { TempredirectComponent } from './tempredirect/tempredirect.component';
import { HelpdeskComponent } from './../../settings/helpdesk/helpdesk.component';
import { TypesComponent } from './../../settings/types/types.component';
import { DetailTicketComponent } from './../detail-ticket/detail-ticket.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewroleComponent } from './../../settings/roles/newrole/newrole.component';
import { ViewrolesComponent } from './../../settings/roles/viewroles/viewroles.component';
import { NewgroupComponent } from './../../settings/groups/newgroup/newgroup.component';
import { ViewgroupsComponent } from './../../settings/groups/viewgroups/viewgroups.component';
import { ViewagentsComponent } from './../../settings/agents/viewagents/viewagents.component';
import { AdminComponent } from './../../settings/admin/admin.component';
import { NewComponent } from './../../tickets/new/new.component';
import { LoginModule } from './../../login/login.module';

import { FullComponent } from './../../layouts/full/full.component';
import { BlankComponent } from './../../layouts/blank/blank.component';
import { LoginComponent } from './../../login/login.component';
import { NewagentComponent } from './../../settings/agents/newagent/newagent.component';
import {ComposeEmailComponent} from './../../tickets/compose-email/compose-email.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { TagsComponent } from './../../settings/tags/tags.component';
import { ListContactComponent } from 'src/app/list-contact/list-contact.component';
import { ListCompaniesComponent } from 'src/app/list-companies/list-companies.component';
import { DetailCompanyComponent } from 'src/app/detail-company/detail-company.component';
import { DetailContactComponent } from 'src/app/detail-contact/detail-contact.component';
import { NewpolicyComponent } from 'src/app/settings/policies/newpolicy/newpolicy.component';
import { ViewpoliciesComponent } from 'src/app/settings/policies/viewpolicies/viewpolicies.component';
import { UnresolvedTicketsComponent } from 'src/app/unresolved-tickets/unresolved-tickets.component';
import { TicketVolumeComponent } from 'src/app/reports/ticket-volume/ticket-volume.component';
import { AllreportsComponent } from 'src/app/reports/allreports/allreports.component';
import { AgentperformanceComponent } from 'src/app/reports/agentperformance/agentperformance.component';
import { GroupperformanceComponent } from 'src/app/reports/groupperformance/groupperformance.component';
import { TicketfieldsComponent } from 'src/app/settings/ticketfields/ticketfields.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/starter', pathMatch: 'full' },
      {
        path: 'starter',
        loadChildren: () => import('./../../starter/starter.module').then(m => m.StarterModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./../../component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'tickets/new',
        component: NewComponent,
        data: {
          title: 'New Ticket',
        },
      },
      {
        path: 'tickets/compose-email',
        component: ComposeEmailComponent,
        data: {
          title: 'Send an Email',
        },
      },
      {
        path: 'tickets/filters/all-tickets',
        component: AllTicketsComponent,
        data: {
          title: 'All Ticket ',
        },
      },
      {
        path: 'settings/admin',
        component: AdminComponent,
        data: {
          title: 'Admin Page',
        },
      },
      {
        path: 'settings/agents/viewagents',
        component: ViewagentsComponent,
        data: {
          title: 'Admin > Agents',
        },
      },
      {
        path: 'settings/agents/newagent',
        component: NewagentComponent,
        data: {
          title: 'Admin > Agents',
        },
      },
      {
        path: 'settings/groups/viewgroups',
        component: ViewgroupsComponent,
        data: {
          title: 'Admin > Group',
        },
      },
      {
        path: 'settings/groups/newgroup',
        component: NewgroupComponent,
        data: {
          title: 'Admin > Group',
        },
      },
      {
        path: 'settings/roles/viewroles',
        component: ViewrolesComponent,
        data: {
          title: 'Admin > Roles',
        },
      },
      {
        path: 'settings/roles/newrole',
        component: NewroleComponent,
        data: {
          title: 'Admin > Group',
        },
      },
      {
        path: 'settings/admin/tags',
        component: TagsComponent,
        data: {
          title: 'Admin > Tags',
        },
      },
      {
        path: 'settings/admin/types',
        component: TypesComponent,
        data: {
          title: 'Admin > Tags',
        },
      },
      {
        path: 'listcontact/list',
        component: ListContactComponent,
        data: {
          title: 'List Contacts',
        },
      },
      {
        path: 'listcompanies/list',
        component: ListCompaniesComponent ,
        data: {
          title: 'List Companies',
        },
      },
      {
        path: 'detail-company',
        component: DetailCompanyComponent ,
        data: {
          title: 'Company Details',
        },
      },
      {
        path: 'detail-contact',
        component: DetailContactComponent ,
        data: {
          title: 'Contact Details',
        },
      },
      {
        path: 'detail-ticket',
        component: DetailTicketComponent ,
        data: {
          title: 'Ticket Details',
        },
      },
      {
        path: 'settings/helpdesk',
        component: HelpdeskComponent,
        data: {
          title: 'Admin Helpdesk',
        },
      },
      {
        path: 'settings/policies/newpolicy',
        component: NewpolicyComponent ,
        data: {
          title: 'Edit Policy',
        },
      },
      {
        path: 'settings/policies/viewpolicies',
        component: ViewpoliciesComponent ,
        data: {
          title: 'View Policies',
        },
      },
      {
        path: 'tickets/filters/tempredirect',
        component: TempredirectComponent ,
        data: {
          title: 'Temporary Page',
        },
      },
      {
        path: 'settings/bussiness_hours/viewbussiness-hours',
        component: ViewbussinessHoursComponent ,
        data: {
          title: 'View Bussiness Hours',
        },
      },
      {
        path: 'settings/bussiness_hours/newbussiness-hours',
        component: NewbussinessHoursComponent ,
        data: {
          title: 'View Bussiness Hours',
        },
      },
      {
        path: 'unresolved-tickets',
        component: UnresolvedTicketsComponent ,
        data: {
          title: 'Unresolved tickets',
        },
      },
      {
        path: 'reports/ticket-volume',
        component: TicketVolumeComponent ,
        data: {
          title: 'Reports',
        },
      },
      {
        path: 'reports/allreports',
        component: AllreportsComponent ,
        data: {
          title: 'Reports',
        },
      },
      {
        path: 'reports/agentperformance',
        component: AgentperformanceComponent ,
        data: {
          title: 'Reports',
        },
      },
      {
        path: 'reports/groupperformance',
        component: GroupperformanceComponent ,
        data: {
          title: 'Reports',
        },
      },
      {
        path: 'settings/ticketfields',
        component: TicketfieldsComponent ,
        data: {
          title: 'Ticket Fields',
        },
      },
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./../../login/login.module').then(m => m.LoginModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FiltersRoutingModule { }
