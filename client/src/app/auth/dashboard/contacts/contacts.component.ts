import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contact.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.component.html'
})
export class ContactsComponent implements OnInit {
  loading = true;
  contacts: Contact[];
  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe(
      data => {
        this.contacts = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }
}

export interface Contact {
  _id: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
