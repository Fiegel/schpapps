import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pun } from './pun.model';

@Injectable()
export class PunService {
  private puns: Pun[] = [];
  punsChanged = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  getPuns(): Pun[] {
    return this.puns.slice();
  }

  getPunRandom(): Pun {
    const t = Math.floor(this.puns.length * Math.random());
    console.log(t);
    return this.puns[t];
  }

  getPunsFromBase() {
    this.httpClient.get<Pun[]>('https://schpapps.firebaseio.com/puns.json?orderBy="id"')
      .pipe(map(puns => {
        for (const pun of puns) {
          if (!pun['source']) {
            pun['source'] = 'Source inconnue';
          }
        }

        return puns;
      }))
      .subscribe(puns => {
        this.puns = puns;
        this.punsChanged.next();
      });
  }
}
