import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { ContactService }  from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  item: Observable<Contact>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ContactService
  ) { }

  ngOnInit() {
    this.item = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getContact(params.get('id')))
    );
  }

  delete() {
    this.route.params.subscribe((params) => {
      this.service.removeContact(params['id']);
    });
    this.router.navigate(['/']);
  }

}
