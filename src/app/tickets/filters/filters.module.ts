import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersRoutingModule } from './filters-routing.module';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { TempredirectComponent } from './tempredirect/tempredirect.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AllTicketsComponent,
    TempredirectComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    FiltersRoutingModule,
    NgxDatatableModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class FiltersModule { }
