import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  errors: any;
  loading = false;
  successMsg = null;
  constructor(private authService: AuthService) {}
  onSubmit(userData: NgForm) {
    if (userData.invalid) {
      return;
    }
    this.loading = true;
    this.authService.postRegister(userData.value).subscribe(
      data => {
        this.loading = false;
        this.successMsg = data.msg;
        setTimeout(() => {
          this.successMsg = null;
        }, 5000);
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.errors = err.error.errors;
      }
    );
  }
}
