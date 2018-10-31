import { Component } from '@angular/core';

import { FieldService } from './field.service';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.scss'],
  providers: [ FieldService ]
})
export class ContactNewComponent {

  fields: any[];
  new:boolean = true;

  constructor(service: FieldService) {
    this.fields = service.getFields();
  }

}
