import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FieldBase } from './field-base';

@Injectable()
export class FieldControlService {
  constructor() { }

  toFormGroup(fields: FieldBase<any>[] ) {
    let group: any = {};

    fields.forEach(field => {
      if (field.type == 'email') {
        group[field.key] = new FormControl(field.value || '', Validators.email);
      } else if (field.type == 'tel') {
        group[field.key] = new FormControl(field.value || '', Validators.compose([
          Validators.minLength(7),
          Validators.maxLength(11),
          Validators.pattern("^[0-9]*$")
        ]));
      } else if (field.required) {
        group[field.key] = new FormControl(field.value || '', Validators.required);
      } else {
        group[field.key] = new FormControl(field.value || '');
      }
    });
    return new FormGroup(group);
  }
}
