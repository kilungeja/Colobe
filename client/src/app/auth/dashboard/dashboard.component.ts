import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit() {}

  get isAdmin() {
    return this.authService.getDecodedToken().data.isAdmin;
  }
}
