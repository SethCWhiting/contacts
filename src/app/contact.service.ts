import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Contact } from './contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  itemsRef: AngularFireList<any>;
  items: Observable<Contact[]>;
  // itemRef: AngularFireObject<Contact>;
  item: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.itemsRef = db.list('contacts');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getContacts(): Observable<Contact[]> {
    return this.items;
  }

  getContact(key:string) {
    this.item = this.db.object(`contacts/${key}`).valueChanges();
    // this.item = this.itemRef.snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );

    return this.item;
    // return this.getContacts().pipe(
    //   map((contacts: Contact[]) => contacts.find(contact => contact.id === id))
    // );
  }
}



/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
