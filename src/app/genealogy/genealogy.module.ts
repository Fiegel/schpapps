import { AgGridModule } from 'ag-grid-angular';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { GedcomReaderService } from './gedcom-reader.service';
import { GenealogyEditComponent } from './genealogy-edit/genealogy-edit.component';
import { GenealogyGridComponent } from './genealogy-grid/genealogy-grid.component';
import { GenealogyRoutingModule } from './genealogy-routing.module';
import { GenealogyComponent } from './genealogy.component';
import { GenealogyService } from './genealogy.service';

@NgModule({
  declarations: [
    GenealogyComponent,
    GenealogyEditComponent,
    GenealogyGridComponent
  ],
  imports: [
    FormsModule,
    GenealogyRoutingModule,
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    AgGridModule.withComponents([]),
    SharedModule
  ],
  providers: [
    GenealogyService,
    GedcomReaderService
  ]
})
export class GenealogyModule { }
