import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { User } from './auth/users/user.model';
import { UserService } from './auth/users/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  user: User;
  userChangedSubscription: Subscription;

  constructor(private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.userChangedSubscription = this.userService.userChanged
      .subscribe(user => this.user = user);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isErrorSignin(): boolean {
    return this.authService.isErrorSignin();
  }

  isErrorUnexpected(): boolean {
    return this.authService.isErrorUnexpected();
  }

  ngOnDestroy() {
    this.userChangedSubscription.unsubscribe();
  }
}
