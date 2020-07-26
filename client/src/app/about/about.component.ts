import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent {
  constructor(private contactService: ContactService) {}
  loading = false;
  message: any;

  onSubmit(contact: NgForm) {
    if (contact.invalid) {
      return;
    }
    this.loading = true;
    this.contactService.postContact(contact.value).subscribe(
      data => {
        this.loading = false;
        this.message = { type: 'success', msg: data.msg };
        setTimeout(() => (this.message = null), 5000);
      },
      (err: HttpErrorResponse) => {
        this.message = { type: 'danger', msg: err.error.msg };
        this.loading = false;
        setTimeout(() => (this.message = null), 5000);
      }
    );

    contact.resetForm();
  }
}
