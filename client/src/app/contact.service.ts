import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './auth/dashboard/contacts/contacts.component';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private httpClient: HttpClient) {}

  BASE_URL = '/api/contact';

  postContact(contact) {
    return this.httpClient.post<{ msg: string }>(this.BASE_URL, contact);
  }

  getContacts() {
    return this.httpClient.get<Contact[]>(this.BASE_URL);
  }
}
