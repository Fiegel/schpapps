import * as firebaseCredentials from 'firebase-key.json';
import * as firebase from 'firebase/app';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    firebase.initializeApp(firebaseCredentials.firebase);
  }
}
