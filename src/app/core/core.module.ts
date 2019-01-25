import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule {

}
