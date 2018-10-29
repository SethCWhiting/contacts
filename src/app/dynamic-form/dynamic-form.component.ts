import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { FieldBase } from './field-base';
import { FieldControlService } from './field-control.service';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ FieldControlService ]
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldBase<any>[] = [];
  form: FormGroup;
  itemsRef: AngularFireList<any>;

  constructor(private fcs: FieldControlService, db: AngularFireDatabase) {
    this.itemsRef = db.list('contacts');
  }

  ngOnInit() {
    this.form = this.fcs.toFormGroup(this.fields);
  }

  onSubmit() {
    this.itemsRef.push(this.form.value);
  }

}
