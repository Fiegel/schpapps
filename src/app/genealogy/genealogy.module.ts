import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GenealogyRoutingModule } from './genealogy-routing.module';
import { GenealogyComponent } from './genealogy.component';

@NgModule({
  declarations: [
    GenealogyComponent
  ],
  imports: [
    GenealogyRoutingModule,
    SharedModule
  ]
})
export class GenealogyModule { }
