import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../home/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }

  onSignin() {
    this.router.navigate(['./']);
  }
}
