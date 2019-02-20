import 'firebase/auth';

import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { PunService } from '../puns/pun.service';
import { UserService } from './users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  errorSignin: string;
  errorUnexpected: string;

  authFunction = () => {
    firebase.auth().currentUser.getIdToken()
      .then((t: string) => {
        this.token = t;
        this.errorSignin = null;
        this.errorUnexpected = null;
        this.userService.getUserByUid(firebase.auth().currentUser.uid,
          firebase.auth().currentUser.isAnonymous);
        this.punService.getRandomPunFromBase();
      });
  }

  constructor(private router: Router,
    private punService: PunService,
    private userService: UserService) { }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.authFunction)
      .catch(error => error.code.indexOf('user-not-found') ? this.errorSignin = error : this.errorUnexpected = error);
  }

  signinAsGuest() {
    firebase.auth().signInAnonymously()
      .then(this.authFunction)
      .catch(error => this.errorUnexpected = error);
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.errorSignin = null;
    this.errorUnexpected = null;
    this.userService.resetUser();
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

  isErrorSignin(): boolean {
    return this.errorSignin != null;
  }

  isErrorUnexpected(): boolean {
    return this.errorUnexpected != null;
  }

  dismissErrorSignin() {
    this.errorSignin = null;
  }

  dismissErrorUnexpected() {
    this.errorUnexpected = null;
  }
}
