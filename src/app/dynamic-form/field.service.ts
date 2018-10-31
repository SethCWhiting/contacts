import { Injectable } from '@angular/core';

import { DropdownField } from '../dynamic-form/field-dropdown';
import { FieldBase } from '../dynamic-form/field-base';
import { TextboxField } from '../dynamic-form/field-textbox';

@Injectable()
export class FieldService {

  getFields() {

    let fields: FieldBase<any>[] = [

      new DropdownField({
        key: 'gender',
        label: 'Gender',
        placeholder: 'Select One',
        options: [
          {key: 'male',  value: 'Male'},
          {key: 'female',  value: 'Female'}
        ],
        required: false,
        order: 5
      }),

      new TextboxField({
        key: 'firstName',
        label: 'First name*',
        required: true,
        order: 1
      }),

      new TextboxField({
        key: 'lastName',
        label: 'Last name',
        required: false,
        order: 2
      }),

      new TextboxField({
        key: 'phoneNumber',
        label: 'Phone number',
        type: 'tel',
        required: false,
        order: 4
      }),

      new TextboxField({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        required: false,
        order: 3
      })
    ];

    return fields.sort((a, b) => a.order - b.order);
  }
}
