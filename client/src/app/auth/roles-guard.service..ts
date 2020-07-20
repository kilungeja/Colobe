import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private authService: AuthService
  ) {}

  canActivate() {
    const token = this.jwtHelper.tokenGetter();
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (decodedToken.data.isAdmin) {
      return true;
    }

    return false;
  }
}
