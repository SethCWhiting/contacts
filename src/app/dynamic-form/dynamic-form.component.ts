import { switchMap } from 'rxjs/operators';
import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { FieldBase } from './field-base';
import { FieldControlService } from './field-control.service';
import { ContactService }  from '../contact.service';
import { Contact } from '../contact';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ FieldControlService ]
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldBase<any>[] = [];
  form: FormGroup;
  item: Observable<any>;
  itemsRef: AngularFireList<any>;

  constructor(
    private fcs: FieldControlService,
    private cs: ContactService,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.itemsRef = db.list('contacts');
  }

  ngOnInit() {
    // Output fields
    this.form = this.fcs.toFormGroup(this.fields);
    // Get current contact info
    this.item = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.cs.getContact(params.get('id')))
    );
    // Insert current contact info into fields
    const cform = this.form;
    this.item.subscribe(
      (snap) => {
        Object.keys(snap).forEach(function eachKey(key) {
          cform.get(key).setValue(snap[key]);
        })
      }
    );
  }

  onSubmit() {
    this.itemsRef.push(this.form.value);
    this.router.navigate(['/']);
  }

}
