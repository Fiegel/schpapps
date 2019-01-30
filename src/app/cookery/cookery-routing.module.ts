import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CookeryComponent } from './cookery.component';

const cookeryRoutes: Routes = [{
  path: '', component: CookeryComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(cookeryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CookeryRoutingModule { }
