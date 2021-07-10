import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})

export class ServiceComponent implements OnInit {
  displayColumns = ["ID", "First name", "Last name", "Address", "Telephone Number"]
  dataList : Contact[] = [];
  id = "0";
  firstName = "";
  lastName = "";
  address = "";
  telephoneNumber = "";
  a: Contact[] = [];

  page = 1;
  pageSize = 10;
  collectionSize: number = 0;
  currentRate = 8;

  constructor(private http: HttpClient) { 
    this.http.get<any>("http://localhost:20047/AddressBook").subscribe(data => {
      for (let value of Object.values(data)) {
        this.dataList.push(value as Contact);
      }
      this.collectionSize = data.length;
    });
  }

  ngOnInit(): void {
  }

  onUpdateId(event: Event) {
    this.id = (<HTMLInputElement>event?.target).value;
  }

  onUpdateFirstName(event: Event) {
    this.firstName = (<HTMLInputElement>event?.target).value;
  }

  onUpdateLastName(event: Event) {
    this.lastName = (<HTMLInputElement>event?.target).value;
  }

  onUpdateAddress(event: Event) {
    this.address = (<HTMLInputElement>event?.target).value;
  }

  onUpdateTelephoneNumber(event: Event) {
    this.telephoneNumber = (<HTMLInputElement>event?.target).value;
  }

  filterList() {
    if (this.id == "") {
      this.id = "0";
    }
    this.http.get<any>(`http://localhost:20047/AddressBook?id=${this.id}&firstName=${this.firstName}&lastName=${this.lastName}&address=${this.address}&telephoneNumber=${this.telephoneNumber}`).subscribe(data => {
      this.dataList = [];
      for (let value of Object.values(data)) {
        this.dataList.push(value as Contact);
      }
      this.collectionSize = data.length;
    });
  }

  deleteRecord(item:any) {
    this.http.delete<any>(`http://localhost:20047/AddressBook/${item.id}`).subscribe(data => {
      console.log(`Record ${item.id} deleted!`);
    })
    var i = -1;
    for (let value of this.dataList) {
      i++;
      if (value.id == item.id) {
        this.dataList.splice(i, 1);
      }
    }
  }

}


export interface Contact {
  id: number,
  firstName: string,
  lastName: string,
  address: string,
  telephoneNumber: string
}