import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  canActivate() {
    const token = this.jwtHelper.tokenGetter();
    const tokenExp = this.jwtHelper.isTokenExpired(token);
    if (token && !tokenExp) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
