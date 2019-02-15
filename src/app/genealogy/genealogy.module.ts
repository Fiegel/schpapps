import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
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
    SharedModule
  ],
  providers: [
    GenealogyService
  ]
})
export class GenealogyModule { }
