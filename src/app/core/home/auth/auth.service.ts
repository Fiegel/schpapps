import 'firebase/auth';

import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) { }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['./']);
        firebase.auth().currentUser.getIdToken()
          .then((t: string) => this.token = t);
      })
      .catch(error => console.log(error));
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
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
