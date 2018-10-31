import { switchMap } from 'rxjs/operators';
import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { FieldBase } from './field-base';
import { FieldControlService } from './field-control.service';
import { ContactService }  from '../contact.service';


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
  isNew:boolean = true;

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
    // Check if creating new contact or editing existing
    this.route.data.subscribe(
      (snap) => { this.isNew = snap.title == 'new'; }
    );

    // Output fields
    this.form = this.fcs.toFormGroup(this.fields);

    // Edit-specific logic
    if (!this.isNew) {
      // Get current contact info
      this.item = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.cs.getContact(params.get('id')))
      );

      // Insert current contact info into fields if they exist
      const cform = this.form;
      this.item.subscribe(
        (snap) => {
          Object.keys(snap).forEach(function eachKey(key) {
            cform.get(key).setValue(snap[key]);
          })
        }
      );
    }

  } // ngOnInit

  onSubmit() {
    const formData = this.form.value;
    const contactRecords = this.itemsRef;
    if (this.isNew) {
      contactRecords.push(formData);
    } else {
      this.route.params.subscribe(
        (snap) => {
          contactRecords.update(snap.id, formData);
        }
      );
    }
    this.router.navigate(['/']);
  }

  delete() {
    this.route.params.subscribe((params) => {
      this.cs.removeContact(params['id']);
    });
    this.router.navigate(['/']);
  }

}
