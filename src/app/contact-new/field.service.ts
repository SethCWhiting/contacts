import { Injectable } from '@angular/core';

import { DropdownField } from '../dynamic-form/field-dropdown';
import { FieldBase } from '../dynamic-form/field-base';
import { TextboxField } from '../dynamic-form/field-textbox';
import { Contact } from '../contact';

@Injectable()
export class FieldService {

  getFields(contact:Contact) {

    let fields: FieldBase<any>[] = [

      new DropdownField({
        key: 'brave',
        label: 'Bravery Rating',
        value: contact ? contact.brave : null,
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
        value: contact ? contact.firstName : null,
        required: true,
        order: 1
      }),

      new TextboxField({
        key: 'emailAddress',
        label: 'Email',
        value: contact ? contact.emailAddress : null,
        type: 'email',
        order: 2
      })
    ];

    return fields.sort((a, b) => a.order - b.order);
  }
}
