import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { User } from '../loan-appication/loan';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  loading = true;
  users: User[];
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.authService.fetchUsers().subscribe(
      data => {
        this.loading = false;
        this.users = data;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }
}
