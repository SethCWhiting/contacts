import { Injectable } from '@angular/core';

import { DropdownField } from '../dynamic-form/field-dropdown';
import { FieldBase } from '../dynamic-form/field-base';
import { TextboxField } from '../dynamic-form/field-textbox';
import { Contact } from '../contact';

@Injectable()
export class FieldService {

  getFields() {

    let fields: FieldBase<any>[] = [

      new DropdownField({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),

      new TextboxField({
        key: 'firstName',
        label: 'First name',
        required: true,
        order: 1
      }),

      new TextboxField({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return fields.sort((a, b) => a.order - b.order);
  }
}
