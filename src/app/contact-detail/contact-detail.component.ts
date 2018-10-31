import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { ContactService }  from '../contact.service';
import { FieldService } from '../contact-new/field.service';
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
    private route: ActivatedRoute,
    private router: Router,
    private cs: ContactService,
    private fs: FieldService
  ) { }

  ngOnInit() {
    this.fields = this.fs.getFields();
  }

}
