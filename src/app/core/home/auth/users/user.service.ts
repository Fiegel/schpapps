import * as firebaseCredentials from 'firebase-key.json';
import { Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './user.model';

const guest: User = {
  email: '',
  isAnonymous: true,
  surname: 'Invité',
  fullname: 'Invité'
};

@Injectable()
export class UserService {
  private user: User;
  userChanged = new Subject<User>();

  constructor(private httpClient: HttpClient) { }

  getUserByUid(uid: string, isAnonymous: boolean) {
    if (isAnonymous) {
      this.user = guest;
      this.userChanged.next(this.user);
    }

    this.httpClient.get<User[]>(firebaseCredentials.firebase.database + 'users.json?orderBy="$key"&endAt="' + uid + '"')
      .subscribe(users => {
        this.user = users[uid] ? { ...users[uid], isAnonymous: false } : guest;
        this.userChanged.next(this.user);
      });
  }

  getCurrentUser(): User {
    return this.user;
  }

  resetUser() {
    this.user = null;
    this.userChanged.next(this.user);
  }
}
