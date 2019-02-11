import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../home/auth/auth.service';
import { User } from '../home/auth/users/user.model';
import { UserService } from '../home/auth/users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarOpen = false;
  user: User;
  userChangedSubscription: Subscription;

  constructor(private router: Router,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.userChangedSubscription = this.userService.userChanged
      .subscribe(user => this.user = user);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['./']);
  }

  ngOnDestroy() {
    this.userChangedSubscription.unsubscribe();
  }
}
