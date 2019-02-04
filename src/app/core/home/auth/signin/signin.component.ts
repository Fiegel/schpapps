import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(private authService: AuthService) { }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signinUser(email, password);
  }

  isEmailInvalid(form: NgForm): boolean {
    return form.controls.email
      && form.controls.email.invalid
      && form.controls.email.touched;
  }

  isPasswordInvalid(form: NgForm): boolean {
    return form.controls.password
      && form.controls.password.invalid
      && form.controls.password.touched;
  }
}
