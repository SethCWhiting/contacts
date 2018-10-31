import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormFieldComponent } from './dynamic-form/dynamic-form-field.component';

export const firebaseConfig = {
  apiKey: "AIzaSyC8m3v1Pj-yPOkfc70-KvCtkLf1_K_16d8",
  authDomain: "contacts-ea64f.firebaseapp.com",
  databaseURL: "https://contacts-ea64f.firebaseio.com",
  projectId: "contacts-ea64f",
  storageBucket: "",
  messagingSenderId: "977928207300"
};

const appRoutes: Routes = [
  {
    path: 'contact/:id',
    component: ContactDetailComponent,
    data: {
      title: 'detail'
    }
  },
  {
    path: 'new',
    component: ContactNewComponent,
    data: {
      title: 'new'
    }
  },
  {
    path: '',
    component: ContactListComponent,
    data: {
      title: 'home'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: '404'
    }
   }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailComponent,
    ContactNewComponent,
    ContactListComponent,
    PageNotFoundComponent,
    DynamicFormComponent,
    DynamicFormFieldComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
