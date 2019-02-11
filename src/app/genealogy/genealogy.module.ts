import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GenealogyRoutingModule } from './genealogy-routing.module';
import { GenealogyComponent } from './genealogy.component';
import { GenealogyService } from './genealogy.service';

@NgModule({
  declarations: [
    GenealogyComponent
  ],
  imports: [
    GenealogyRoutingModule,
    SharedModule
  ],
  providers: [
    GenealogyService
  ]
})
export class GenealogyModule { }
