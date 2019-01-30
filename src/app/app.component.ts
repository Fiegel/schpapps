import * as firebase from 'firebase/app';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCY99g47nwlrywKT9v7WAAExbiEOmQ9MtM',
      authDomain: 'schpapps.firebaseapp.com'
    });
  }
}
