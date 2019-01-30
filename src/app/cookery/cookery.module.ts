import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CookeryRoutingModule } from './cookery-routing.module';
import { CookeryComponent } from './cookery.component';

@NgModule({
  declarations: [
    CookeryComponent
  ],
  imports: [
    CookeryRoutingModule,
    SharedModule
  ]
})
export class CookeryModule { }
