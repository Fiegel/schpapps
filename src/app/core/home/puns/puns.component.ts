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
  punChangedSubscription: Subscription;

  constructor(private punService: PunService) { }

  ngOnInit() {
    this.punChangedSubscription = this.punService.punChanged
      .subscribe(() => this.pun = this.punService.getPun());
    this.pun = this.punService.getPun();
  }

  onRefreshPun() {
    this.punService.getRandomPunFromBase();
  }

  ngOnDestroy() {
    this.punChangedSubscription.unsubscribe();
  }
}
