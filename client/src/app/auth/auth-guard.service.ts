import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private authService: AuthService
  ) {}

  canActivate() {
    const token = this.jwtHelper.tokenGetter();
    const tokenExp = this.jwtHelper.isTokenExpired(token);
    if (token && !tokenExp) {
      return true;
    }
    this.authService.logout();
    return false;
  }
}
