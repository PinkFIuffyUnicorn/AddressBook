import {Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../service/service.component';

@Component({
  selector: 'ngbd-modal-confirm-autofocus-delete',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">{{item.firstName}} {{item.lastName}}</span> from the Address Book?</strong></p>
    <p>All information associated to this record will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="deleteRecord(item)">Ok</button>
  </div>
  `
})
export class NgbdModalConfirmAutofocusDelete {
  
  @Input() item: Contact = {id: 0, firstName: "", lastName: "", address: "", telephoneNumber:""};
  @Input() dataList : Contact[] = [];

  constructor(public modal: NgbActiveModal, private http: HttpClient) {
  }

  deleteRecord(item:any) {
    this.http.delete<any>(`http://localhost:20047/AddressBook/${item.id}`).subscribe(data => {
      console.log(`Record ${item.id} deleted!`);
    });
    var i = -1;
    for (let value of this.dataList) {
      i++;
      if (value.id == item.id) {
        this.dataList.splice(i, 1);
      }
    }
    this.closeModal()
  }

  closeModal() {
    this.modal.close();
  }
}

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
})
export class NgbdModalFocus {
  constructor(private _modalService: NgbModal) { }

  @Input() item: Contact = {id: 0, firstName: "", lastName: "", address: "", telephoneNumber:""};
  @Input() dataList : Contact[] = [];

  open() {
    const modalRef = this._modalService.open(NgbdModalConfirmAutofocusDelete, {size: "lg", backdrop: false});
    (<NgbdModalConfirmAutofocusDelete>modalRef.componentInstance).item = this.item;
    (<NgbdModalConfirmAutofocusDelete>modalRef.componentInstance).dataList = this.dataList;
  }
}