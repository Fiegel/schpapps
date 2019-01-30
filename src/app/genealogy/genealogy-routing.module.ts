import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { GenealogyComponent } from './genealogy.component';

const genealogyRoutes: Routes = [{
  path: '', component: GenealogyComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(genealogyRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GenealogyRoutingModule { }
