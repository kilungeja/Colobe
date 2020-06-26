import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  getUsername() {
    return this.authService.username;
  }

  onLogout() {
    this.authService.logout();
  }
}
