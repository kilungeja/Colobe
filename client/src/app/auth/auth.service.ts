import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private route: Router,
    private jwtHelper: JwtHelperService
  ) {}
  BASE_URL = 'http://localhost:5000/api/auth';
  postRegister(userData) {
    return this.httpClient
      .post<{ msg: string }>(`${this.BASE_URL}/register`, {
        ...userData
      })
      .pipe(
        tap(data => {
          this.route.navigate(['/login']);
        })
      );
  }
  postLogin(userData) {
    return this.httpClient
      .post<{ msg: string; token: string }>(`${this.BASE_URL}/login`, {
        ...userData
      })
      .pipe(
        tap(data => {
          localStorage.setItem('access_token', data.token);
          this.route.navigate(['/dashboard/user-home']);
          this.autoLogout(3600000);
        })
      );
  }

  get username() {
    const decodedToken = this.jwtHelper.decodeToken(
      this.jwtHelper.tokenGetter()
    );
    if (!decodedToken) {
      return false;
    }
    return decodedToken.data.username;
  }

  autoLogout(time) {
    setTimeout(() => this.logout(), time);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.route.navigate(['/login']);
  }
}
