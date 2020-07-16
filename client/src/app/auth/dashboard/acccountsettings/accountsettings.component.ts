import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../loan-appication/loan';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-accountssettings',
  templateUrl: 'accountsettings.component.html'
})
export class AccountSettingsComponent implements OnInit {
  state = 'edit';
  loading = true;
  user: User;
  updating = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.fetchLoggedInUser();
  }
  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    this.updating = true;
    this.authService.updateUser(formData.value).subscribe(
      data => {
        this.updating = false;
        this.fetchLoggedInUser();
      },
      (err: HttpErrorResponse) => {
        this.updating = false;
      }
    );
  }
  fetchLoggedInUser() {
    this.loading = true;
    this.authService.fetchLoggedInUser().subscribe(
      data => {
        this.loading = false;
        this.user = data;
        this.state = 'edit';
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.state = 'edit';
      }
    );
  }
  onEdit() {
    this.state = 'update';
  }
}
