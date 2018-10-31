import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FieldService } from '../dynamic-form/field.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  providers: [ FieldService ]
})
export class ContactDetailComponent implements OnInit {
  item: Observable<Contact>;
  fields: any[];

  constructor(
    private fs: FieldService
  ) { }

  ngOnInit() {
    this.fields = this.fs.getFields();
  }

}
