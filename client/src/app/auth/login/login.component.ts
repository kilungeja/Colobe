import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  error: { msg: string };
  loading = false;
  onSubmit(loginData: NgForm) {
    if (loginData.invalid) {
      return;
    }

    this.loading = true;
    this.authService.postLogin(loginData.value).subscribe(
      data => {
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.error = err.error;
        setTimeout(() => (this.error = null), 5000);
      }
    );
  }
}
