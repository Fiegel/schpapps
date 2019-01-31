import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../home/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private navbarOpen = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }
}
