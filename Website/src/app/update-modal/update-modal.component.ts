import {Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../service/service.component';

@Component({
  selector: 'ngbd-modal-confirm-autofocus-update',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
  <b style="color:#806703" *ngIf="firstNameCheck">*</b>
  <b>{{ displayColumns[1] }}</b>
  <input
      type="text"
      class="form-control"
      (input)="onUpdateFirstName($event)"
      (keyup.enter)="confirmUpdate()"
      value={{firstName}}>

  <b style="color:#806703" *ngIf="lastNameCheck">*</b>
  <b>{{ displayColumns[2] }}</b>
  <input
      type="text"
      class="form-control"
      (input)="onUpdateLastName($event)"
      (keyup.enter)="confirmUpdate()"
      value={{lastName}}>

  <b style="color:#806703" *ngIf="addressCheck">*</b>
  <b>{{ displayColumns[3] }}</b>
  <input
      type="text"
      class="form-control"
      value={{address}}
      (keyup.enter)="confirmUpdate()"
      (input)="onUpdateAddress($event)">

  <b style="color:#806703" *ngIf="telephoneNumberCheck">*</b>
  <b>{{ displayColumns[4] }}</b>
  <input
      type="text"
      class="form-control"
      (input)="onUpdateTelephoneNumber($event)"
      (keyup.enter)="confirmUpdate()"
      value={{telephoneNumber}}>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="confirmUpdate()">Ok</button>
  </div>
  `
})
export class NgbdModalConfirmAutofocusUpdate {
  
  @Input() item: Contact = {id: 0, firstName: "", lastName: "", address: "", telephoneNumber:""};
  @Input() dataList : Contact[] = [];

  displayColumns = ["ID", "First name", "Last name", "Address", "Telephone Number"]
  id = 0;
  firstName = "";
  lastName = "";
  address = "";
  telephoneNumber = "";
  firstNameCheck = false;
  lastNameCheck = false;
  addressCheck = false;
  telephoneNumberCheck = false;

  errorStatusCode = 0;
  errorTitle = "";
  errorValues: string[] = [];

  constructor(public modal: NgbActiveModal, private http: HttpClient, private _modalService: NgbModal) {
  }

  onUpdateFirstName(event: Event) {
    this.firstName = (<HTMLInputElement>event?.target).value;
    if ((<HTMLInputElement>event?.target).value.trim() == "") {
      this.firstNameCheck = true;
    }
    else {
      this.firstNameCheck = false;
    }
  }

  onUpdateLastName(event: Event) {
    this.lastName = (<HTMLInputElement>event?.target).value;
    if ((<HTMLInputElement>event?.target).value.trim() == "") {
      this.lastNameCheck = true;
    }
    else {
      this.lastNameCheck = false;
    }
  }

  onUpdateAddress(event: Event) {
    this.address = (<HTMLInputElement>event?.target).value;
    if ((<HTMLInputElement>event?.target).value.trim() == "") {
      this.addressCheck = true;
    }
    else {
      this.addressCheck = false;
    }
  }

  onUpdateTelephoneNumber(event: Event) {
    this.telephoneNumber = (<HTMLInputElement>event?.target).value;
    if ((<HTMLInputElement>event?.target).value.trim() == "") {
      this.telephoneNumberCheck = true;
    }
    else {
      this.telephoneNumberCheck = false;
    }
  }

  confirmUpdate() {
    const body = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      telephoneNumber: this.telephoneNumber
    }
    
    this.http.put<any>(`http://localhost:20047/AddressBook/${this.id}`, body).subscribe({
      next: data => {
        var i = -1;
        for (let value of this.dataList) {
          i++;
          if (value.id == this.id) {
            this.dataList.splice(i, 1);
            this.dataList.splice(i, 0, body as Contact);
          }
        }
        this.closeModal();
      },
      error: error => {
        this.errorStatusCode = error.error.status;
        this.errorTitle = error.error.title;
        this.errorValues = []
        for (let value of Object.values(error.error.errors)) {
          this.errorValues.push(value as string);
        }
        this.openErrorModal();
      }
    })
  }

  closeModal() {
    this.modal.close();
  }

  openErrorModal() {
    this.modal.close();
    const modalRef = this._modalService.open(NgbdModalFocusUpdateError, {size: "lg", backdrop: true});
    (<NgbdModalFocusUpdateError>modalRef.componentInstance).errorValues = this.errorValues;
    (<NgbdModalFocusUpdateError>modalRef.componentInstance).errorStatusCode = this.errorStatusCode;
    (<NgbdModalFocusUpdateError>modalRef.componentInstance).errorTitle = this.errorTitle;
    (<NgbdModalFocusUpdateError>modalRef.componentInstance).id = this.id;
    (<NgbdModalFocusUpdateError>modalRef.componentInstance).firstName = this.firstName;
    (<NgbdModalFocusUpdateError>modalRef.componentInstance).lastName = this.lastName;
    (<NgbdModalFocusUpdateError>modalRef.componentInstance).address = this.address;
    (<NgbdModalFocusUpdateError>modalRef.componentInstance).telephoneNumber = this.telephoneNumber;
    (<NgbdModalFocusUpdateError>modalRef.componentInstance).dataList = this.dataList;
    (<NgbdModalFocusUpdateError>modalRef.componentInstance).firstNameCheck = this.firstNameCheck;
    (<NgbdModalFocusUpdateError>modalRef.componentInstance).lastNameCheck = this.lastNameCheck;
    (<NgbdModalFocusUpdateError>modalRef.componentInstance).addressCheck = this.addressCheck;
    (<NgbdModalFocusUpdateError>modalRef.componentInstance).telephoneNumberCheck = this.telephoneNumberCheck;
  }
}

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
})
export class NgbdModalFocusUpdate{
  constructor(private _modalService: NgbModal) { }

  @Input() item: Contact = {id: 0, firstName: "", lastName: "", address: "", telephoneNumber:""};
  @Input() dataList : Contact[] = [];

  @Input("id") id = 0;
  @Input("firstName") firstName = "";
  @Input("lastName") lastName = "";
  @Input("address") address = "";
  @Input("telephoneNumber") telephoneNumber = "";

  open() {
    const modalRef = this._modalService.open(NgbdModalConfirmAutofocusUpdate, {size: "lg", backdrop: false});
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).item = this.item;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).dataList = this.dataList;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).id = this.id;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).firstName = this.firstName;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).lastName = this.lastName;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).address = this.address;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).telephoneNumber = this.telephoneNumber;
  }
}

@Component({
  selector: 'app-update-modal-error',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Update Error</h4>
  </div>
  <div class="modal-body">
    <p><strong>Error status code: {{errorStatusCode}}</strong></p>
    <p><strong>{{errorTitle}}</strong></p>
    <p *ngFor="let x of errorValues">{{x}}</p>
  </div>
  <div class="modal-footer">
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="closeModal()">Ok</button>
  </div>
  `
})

export class NgbdModalFocusUpdateError{

  @Input() dataList : Contact[] = [];

  id = 0;
  firstName = "";
  lastName = "";
  address = "";
  telephoneNumber = "";

  firstNameCheck = true;
  lastNameCheck = true;
  addressCheck = true;
  telephoneNumberCheck = true;

  errorStatusCode = 0;
  errorTitle = "";
  errorValues: string[] = [];

  constructor(public modal: NgbActiveModal, private _modalService: NgbModal) { }

  closeModal() {
    const modalRef = this._modalService.open(NgbdModalConfirmAutofocusUpdate, {size: "lg", backdrop: true});
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).id = this.id;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).firstName = this.firstName;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).lastName = this.lastName;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).address = this.address;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).telephoneNumber = this.telephoneNumber;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).dataList = this.dataList;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).firstNameCheck = this.firstNameCheck;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).lastNameCheck = this.lastNameCheck;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).addressCheck = this.addressCheck;
    (<NgbdModalConfirmAutofocusUpdate>modalRef.componentInstance).telephoneNumberCheck = this.telephoneNumberCheck;
    this.modal.close();
  }
}