import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './home/auth/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { PunsComponent } from './home/puns/puns.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PunsComponent,
    SigninComponent
  ],
  imports: [
    FormsModule,
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
