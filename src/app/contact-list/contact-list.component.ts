import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  msg:string = '';
  editMsg:boolean = false;
  editId:number;

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('contacts');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  send(chatMsg:string) {
    this.itemsRef.push({message: chatMsg});
    this.msg = '';
  }

  delete(key:string) {
    this.itemsRef.remove(key);
  }

  edit(key:string, message:string) {
    this.itemsRef.update(key, {message: message});
    this.editMsg = false;
  }
}
