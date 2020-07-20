import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './dashboard/loan-appication/loan';

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
          if (this.getDecodedToken().data.isAdmin) {
            this.route.navigate(['/dashboard/admin-home']);
          } else {
            this.route.navigate(['/dashboard/user-home']);
          }
          this.autoLogout(3600000);
        })
      );
  }

  getDecodedToken() {
    return this.jwtHelper.decodeToken(this.jwtHelper.tokenGetter());
  }

  get username() {
    const decodedToken = this.getDecodedToken();
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

  fetchLoggedInUser() {
    return this.httpClient.get<User>(`${this.BASE_URL}/fetch-user`);
  }
  updateUser(userData) {
    return this.httpClient.patch<{ msg: string }>(`${this.BASE_URL}/update`, {
      ...userData
    });
  }

  // geting all users minus admin
  fetchUsers() {
    return this.httpClient.get<User[]>(`${this.BASE_URL}/users`);
  }
}
