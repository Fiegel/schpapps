import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './home/auth/auth.interceptor';
import { SigninComponent } from './home/auth/signin/signin.component';
import { UserService } from './home/auth/users/user.service';
import { ErrorModalSigninComponent } from './home/error-modal-signin/error-modal-signin.component';
import {
  ErrorModalUnexpectedComponent
} from './home/error-modal-unexpected/error-modal-unexpected.component';
import { HomeComponent } from './home/home.component';
import { PunService } from './home/puns/pun.service';
import { PunsComponent } from './home/puns/puns.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PunsComponent,
    SigninComponent,
    ErrorModalSigninComponent,
    ErrorModalUnexpectedComponent
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
  ],
  providers: [
    PunService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule {

}
