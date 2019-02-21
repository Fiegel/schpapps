import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

import { FirestoreService } from '../../../../shared/firestore.service';
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

  constructor(private firestoreService: FirestoreService) { }

  getUserByUid(uid: string, isAnonymous: boolean) {
    if (isAnonymous) {
      this.user = guest;
      this.userChanged.next(this.user);
    } else {
      this.firestoreService.getDocument('users', uid, { onlyData: true })
        .subscribe(user => {
          this.user = { ...user, isAnonymous: false };
          this.userChanged.next(this.user);
        });
    }
  }

  getCurrentUser(): User {
    return this.user;
  }

  resetUser() {
    this.user = null;
    this.userChanged.next(this.user);
  }
}
