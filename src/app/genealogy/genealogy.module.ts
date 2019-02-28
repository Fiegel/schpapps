import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { GedcomReaderService } from './gedcom-reader.service';
import { GenealogyEditComponent } from './genealogy-edit/genealogy-edit.component';
import { GenealogyRoutingModule } from './genealogy-routing.module';
import { GenealogyComponent } from './genealogy.component';
import { GenealogyService } from './genealogy.service';

@NgModule({
  declarations: [
    GenealogyComponent,
    GenealogyEditComponent
  ],
  imports: [
    FormsModule,
    GenealogyRoutingModule,
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SharedModule
  ],
  providers: [
    GenealogyService,
    GedcomReaderService
  ]
})
export class GenealogyModule { }
