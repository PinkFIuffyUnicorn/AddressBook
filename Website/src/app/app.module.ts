import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceComponent } from './service/service.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  NgbdModalConfirmAutofocusDelete,
  NgbdModalFocus
} from './delete-modal/delete-modal.component';
import {
  NgbdModalConfirmAutofocusUpdate,
  NgbdModalFocusUpdate,
  NgbdModalFocusUpdateError
} from './update-modal/update-modal.component';
import {
  NgbdModalConfirmAutofocusAdd,
  NgbdModalFocusAdd,
  NgbdModalFocusAddError
} from './add-modal/add-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent,
    NgbdModalConfirmAutofocusDelete,
    NgbdModalFocus,
    NgbdModalConfirmAutofocusUpdate,
    NgbdModalFocusUpdate,
    NgbdModalFocusUpdateError,
    NgbdModalConfirmAutofocusAdd,
    NgbdModalFocusAdd,
    NgbdModalFocusAddError
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgbModule,
    CommonModule
  ],
  exports: [NgbdModalFocus],
  providers: [],
  bootstrap: [AppComponent,NgbdModalFocus]
})
export class AppModule { }
