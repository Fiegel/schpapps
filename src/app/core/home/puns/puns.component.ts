import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Pun } from './pun.model';
import { PunService } from './pun.service';

@Component({
  selector: 'app-puns',
  templateUrl: './puns.component.html',
  styleUrls: ['./puns.component.scss']
})
export class PunsComponent implements OnInit, OnDestroy {
  pun: Pun;
  punsChangedSubscription: Subscription;

  constructor(private punService: PunService) { }

  ngOnInit() {
    this.punsChangedSubscription = this.punService.punsChanged
      .subscribe(() => this.pun = this.punService.getPunRandom());
    this.pun = this.punService.getPunRandom();
  }

  onRefreshPun() {
    this.pun = this.punService.getPunRandom();
  }

  ngOnDestroy() {
    this.punsChangedSubscription.unsubscribe();
  }
}
