import {Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../service/service.component';

@Component({
  selector: 'ngbd-modal-confirm-autofocus-add',
  styleUrls: ['./add-modal.component.css'],
  template: `
  <div class="modal-body">
  <b style="color:#806703" *ngIf="firstNameCheck">*</b>
  <b>{{ displayColumns[1] }}</b>
  <input
      type="text"
      class="form-control"
      (input)="onUpdateFirstName($event)"
      value={{firstName}}>

  <b style="color:#806703" *ngIf="lastNameCheck">*</b>
  <b>{{ displayColumns[2] }}</b>
  <input
      type="text"
      class="form-control"
      (input)="onUpdateLastName($event)"
      value={{lastName}}>

  <b style="color:#806703" *ngIf="addressCheck">*</b>
  <b>{{ displayColumns[3] }}</b>
  <input
      type="text"
      class="form-control"
      (input)="onUpdateAddress($event)"
      value={{address}}>

  <b style="color:#806703" *ngIf="telephoneNumberCheck">*</b>
  <b>{{ displayColumns[4] }}</b>
  <input
      type="text"
      class="form-control"
      (input)="onUpdateTelephoneNumber($event)"
      value={{telephoneNumber}}>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="confirmAdd()">Ok</button>
  </div>
  `
})
export class NgbdModalConfirmAutofocusAdd {

  temp2 = true;

  @Input() dataList : Contact[] = [];

  displayColumns = ["ID", "First name", "Last name", "Address", "Telephone Number"]
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

  constructor(public modal: NgbActiveModal, private http: HttpClient, private _modalService: NgbModal) { }

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

  confirmAdd() {
    const body = {
      id: 0,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      telephoneNumber: this.telephoneNumber
    }

    this.http.post<any>(`http://localhost:20047/AddressBook`, body).subscribe({
      next: data => {
        console.log(`Record ${data.id} added!`);
        body.id = data.id;
        this.dataList.push(body);
        this.closeModal();
      },
      error: error => {
        this.errorStatusCode = error.error.status;
        this.errorTitle = error.error.title;
        this.errorValues = []
        if (error.error.errors != undefined) {
          for (let value of Object.values(error.error.errors)) {
            this.errorValues.push(value as string);
          }
        } else if (this.errorStatusCode == 409) {
          this.errorTitle = `The Telephone Number '${this.telephoneNumber}' already exists!`;
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
    const modalRef = this._modalService.open(NgbdModalFocusAddError, {size: "lg", backdrop: true});
    (<NgbdModalFocusAddError>modalRef.componentInstance).errorValues = this.errorValues;
    (<NgbdModalFocusAddError>modalRef.componentInstance).errorStatusCode = this.errorStatusCode;
    (<NgbdModalFocusAddError>modalRef.componentInstance).errorTitle = this.errorTitle;
    (<NgbdModalFocusAddError>modalRef.componentInstance).firstName = this.firstName;
    (<NgbdModalFocusAddError>modalRef.componentInstance).lastName = this.lastName;
    (<NgbdModalFocusAddError>modalRef.componentInstance).address = this.address;
    (<NgbdModalFocusAddError>modalRef.componentInstance).telephoneNumber = this.telephoneNumber;
    (<NgbdModalFocusAddError>modalRef.componentInstance).dataList = this.dataList;
    (<NgbdModalFocusAddError>modalRef.componentInstance).firstNameCheck = this.firstNameCheck;
    (<NgbdModalFocusAddError>modalRef.componentInstance).lastNameCheck = this.lastNameCheck;
    (<NgbdModalFocusAddError>modalRef.componentInstance).addressCheck = this.addressCheck;
    (<NgbdModalFocusAddError>modalRef.componentInstance).telephoneNumberCheck = this.telephoneNumberCheck;
  }
}

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
})
export class NgbdModalFocusAdd{
  
  @Input() dataList : Contact[] = [];
  
  constructor(private _modalService: NgbModal) { }

  open() {
    const modalRef = this._modalService.open(NgbdModalConfirmAutofocusAdd, {size: "lg", backdrop: false});
    (<NgbdModalConfirmAutofocusAdd>modalRef.componentInstance).dataList = this.dataList;
  }
}

@Component({
  selector: 'app-add-modal-error',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Add Error</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
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
export class NgbdModalFocusAddError{

  @Input() dataList : Contact[] = [];

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
    const modalRef = this._modalService.open(NgbdModalConfirmAutofocusAdd, {size: "lg", backdrop: true});
    (<NgbdModalConfirmAutofocusAdd>modalRef.componentInstance).firstName = this.firstName;
    (<NgbdModalConfirmAutofocusAdd>modalRef.componentInstance).lastName = this.lastName;
    (<NgbdModalConfirmAutofocusAdd>modalRef.componentInstance).address = this.address;
    (<NgbdModalConfirmAutofocusAdd>modalRef.componentInstance).telephoneNumber = this.telephoneNumber;
    (<NgbdModalConfirmAutofocusAdd>modalRef.componentInstance).dataList = this.dataList;
    (<NgbdModalConfirmAutofocusAdd>modalRef.componentInstance).firstNameCheck = this.firstNameCheck;
    (<NgbdModalConfirmAutofocusAdd>modalRef.componentInstance).lastNameCheck = this.lastNameCheck;
    (<NgbdModalConfirmAutofocusAdd>modalRef.componentInstance).addressCheck = this.addressCheck;
    (<NgbdModalConfirmAutofocusAdd>modalRef.componentInstance).telephoneNumberCheck = this.telephoneNumberCheck;
    this.modal.close();
  }
}