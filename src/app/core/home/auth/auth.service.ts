import 'firebase/auth';

import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { PunService } from '../puns/pun.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router,
    private punService: PunService) { }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.getIdToken()
          .then((t: string) => {
            this.token = t;
            this.punService.getPunsFromBase();
          });
      })
      .catch(error => console.log(error));
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['./']);
  }

  getToken(): string {
    firebase.auth().currentUser.getIdToken()
      .then((t: string) => this.token = t);

    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }
}
