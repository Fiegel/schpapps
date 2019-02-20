import 'firebase/firestore';

import * as firebaseCredentials from 'firebase-key.json';
import * as firebase from 'firebase/app';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  database: firebase.firestore.Firestore;

  firestoreInit() {
    firebase.initializeApp(firebaseCredentials.firebase);
    this.database = firebase.firestore();
  }

  addDoc(collection: string, doc: Object) {
    this.database.collection(collection).add(doc)
      .then(docRef => console.log('Document ' + docRef.id + ' written in collection ' + collection + ' with data = ' + doc.toString()))
      .catch(error => console.error('Error adding document: ', error));
  }

  addAllDoc(collection: string, docs: Object[]) {
    const batch = this.database.batch();

    for (const doc of docs) {
      const docRef = this.database.collection(collection).doc();
      batch.set(docRef, doc);
    }

    batch.commit().then(() => console.log(docs.length + ' documents were added to the collection ' + collection))
      .catch(error => console.error('Error adding documents (batch): ', error));
  }

  mergeDoc(collection: string, doc: string, data: Object) {
    this.database.collection(collection).doc(doc).set(data)
      .then(() => console.log('Document ' + doc + ' written in collection ' + collection + ' with data = ' + data.toString()))
      .catch(error => console.error('Error adding document: ', error));
    // TODO create error modal to warn the user
  }

  mergeAllDoc(collection: string, docs: { id: string, data: Object }[]) {
    const batch = this.database.batch();

    for (const doc of docs) {
      const docRef = this.database.collection(collection).doc(doc.id);
      batch.set(docRef, doc.data);
    }

    batch.commit().then(() => console.log(docs.length + ' documents were added to the collection ' + collection))
      .catch(error => console.error('Error adding documents (batch): ', error));
  }

  getCollection(collection: string, options?: { onlyData?: boolean, debug?: boolean }): Observable<any> {
    return from(this.database.collection(collection).get()
      .then(results => {
        if (options && options.debug) {
          results.forEach(doc => {
            console.log('Got doc ' + doc.id + ' from collection ' + collection);
            console.log(doc.data());
          });
        }

        if (options && options.onlyData) {
          const resultData = [];
          results.forEach(doc => resultData.push(doc.data()));
          return resultData;
        } else {
          return results;
        }
      }));
  }

  getDocument(collection: string, doc: string, options?: { onlyData?: boolean, debug?: boolean }): Observable<any> {
    return from(this.database.collection(collection).doc(doc).get()
      .then(result => {
        if (options && options.debug) {
          console.log('Got doc ' + result.id + ' from collection ' + collection);
          console.log(result.data());
        }

        return options && options.onlyData ? result.data() : result;
      }));
  }

  getDocumentMax(collection: string, field: string, options?: { onlyData?: boolean, debug?: boolean }): Observable<any> {
    return from(this.database.collection(collection).orderBy(field, 'desc').limit(1).get()
      .then(results => {
        if (options && options.debug) {
          console.log('Got doc ' + results.docs[0].id + ' from collection ' + collection
            + ' with max field "' + field + '" = ' + results.docs[0].data()[field]);
          console.log(results.docs[0].data());
        }

        return options && options.onlyData ? results.docs[0].data() : results.docs[0];
      }));
  }

  getDocumentRandom(collection: string, field: string, options?: { onlyData?: boolean, debug?: boolean }): Observable<any> {
    return this.getDocumentMax(collection, field, options).pipe(flatMap(result => {
      const r = Math.floor(result[field] * Math.random());
      return this.database.collection(collection).orderBy(field).where(field, '>=', r).limit(1).get()
        .then(results => {
          if (options && options.debug) {
            console.log('Got random doc ' + results.docs[0].id + ' from collection ' + collection + ' on field ' + field);
            console.log(results.docs[0].data());
          }

          return options && options.onlyData ? results.docs[0].data() : results.docs[0];
        });
    }));
  }
}
