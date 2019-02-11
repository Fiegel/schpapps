import 'firebase/auth';

import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { PunService } from '../puns/pun.service';
import { User } from './users/user.model';
import { UserService } from './users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  authFunction = () => {
    firebase.auth().currentUser.getIdToken()
      .then((t: string) => {
        this.token = t;
        this.userService.getUserByUid(firebase.auth().currentUser.uid,
          firebase.auth().currentUser.isAnonymous);
        this.punService.getPunsFromBase();
      });
  }

  constructor(private router: Router,
    private punService: PunService,
    private userService: UserService) { }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.authFunction)
      .catch(error => console.log(error));
  }

  signinAsGuest() {
    firebase.auth().signInAnonymously()
      .then(this.authFunction)
      .catch(error => console.log(error));
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
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
}
