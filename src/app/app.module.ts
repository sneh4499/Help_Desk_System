import { DetailTicketComponent } from './tickets/detail-ticket/detail-ticket.component';
import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NewComponent } from './tickets/new/new.component';
import { AdminComponent } from './settings/admin/admin.component';
import { ViewagentsComponent } from './settings/agents/viewagents/viewagents.component';
import { NewagentComponent } from './settings/agents/newagent/newagent.component';
import { ViewgroupsComponent } from './settings/groups/viewgroups/viewgroups.component';
import { NewgroupComponent } from './settings/groups/newgroup/newgroup.component';
import { ViewrolesComponent } from './settings/roles/viewroles/viewroles.component';
import { NewroleComponent } from './settings/roles/newrole/newrole.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CookieService } from 'ngx-cookie-service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ComposeEmailComponent } from './tickets/compose-email/compose-email.component';
import { FiltersModule } from './tickets/filters/filters.module';
import { FiltersRoutingModule } from './tickets/filters/filters-routing.module';
import { HelpdeskComponent } from './settings/helpdesk/helpdesk.component';
import { TagsComponent } from './settings/tags/tags.component';
import { ListContactComponent } from './list-contact/list-contact.component';
import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { DetailCompanyComponent } from './detail-company/detail-company.component';
import { DetailContactComponent } from './detail-contact/detail-contact.component';
import { TypesComponent } from './settings/types/types.component';

import {TimeAgoPipe} from 'time-ago-pipe';
import { NewpolicyComponent } from './settings/policies/newpolicy/newpolicy.component';
import { ViewpoliciesComponent } from './settings/policies/viewpolicies/viewpolicies.component';
import { NewbussinessHoursComponent } from './settings/bussiness_hours/newbussiness-hours/newbussiness-hours.component';
import { ViewbussinessHoursComponent } from './settings/bussiness_hours/viewbussiness-hours/viewbussiness-hours.component';
import { UnresolvedTicketsComponent } from './unresolved-tickets/unresolved-tickets.component';
import { TicketVolumeComponent } from './reports/ticket-volume/ticket-volume.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AllreportsComponent } from './reports/allreports/allreports.component';
import { AgentperformanceComponent } from './reports/agentperformance/agentperformance.component';
import { GroupperformanceComponent } from './reports/groupperformance/groupperformance.component';
import { TicketfieldsComponent } from './settings/ticketfields/ticketfields.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    NewComponent,
    AdminComponent,
    ViewagentsComponent,
    NewagentComponent,
    ViewgroupsComponent,
    NewgroupComponent,
    ViewrolesComponent,
    NewroleComponent,
    ComposeEmailComponent,
    HelpdeskComponent,
    TagsComponent,
    ListContactComponent,
    ListCompaniesComponent,
    DetailCompanyComponent,
    DetailContactComponent,
    DetailTicketComponent,
    TypesComponent,
    TimeAgoPipe,
    NewpolicyComponent,
    ViewpoliciesComponent,
    NewbussinessHoursComponent,
    ViewbussinessHoursComponent,
    UnresolvedTicketsComponent,
    TicketVolumeComponent,
    AllreportsComponent,
    AgentperformanceComponent,
    GroupperformanceComponent,
    TicketfieldsComponent,
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    NgxDatatableModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    QuillModule.forRoot(),
    NgbModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    RouterModule.forRoot(Approutes, { useHash: false }),
    PerfectScrollbarModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBUb3jDWJQ28vDJhuQZxkC0NXr_zycm8D0' }),
    CKEditorModule,
    FiltersModule,
    FiltersRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
