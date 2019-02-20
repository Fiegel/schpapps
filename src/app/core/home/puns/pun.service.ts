import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { FirestoreService } from '../../../shared/firestore.service';
import { Pun } from './pun.model';

@Injectable()
export class PunService {
  private currentPun: Pun;
  punChanged = new Subject<void>();

  constructor(private firestoreService: FirestoreService) { }

  getRandomPunFromBase() {
    this.firestoreService.getDocumentRandom('puns', 'id', { onlyData: true, debug: true })
      .pipe(map(pun => {
        if (!pun['source']) {
          pun['source'] = 'Source inconnue';
        }
        return pun;
      }))
      .subscribe(pun => {
        this.currentPun = pun;
        this.punChanged.next();
      });
  }

  getPun(): Pun {
    return this.currentPun;
  }
}
