import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ContactService }  from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  items: Observable<any[]>;

  constructor(private service: ContactService) { }

  ngOnInit() {
    this.items = this.service.getContacts();
  }

}
