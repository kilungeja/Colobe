import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-home',
  templateUrl: 'user-home.component.html'
})
export class UserHomeComponent implements OnInit {
  constructor(private dashService: DashboardService) {}
  homeCounts: { assets: number; applicants: number; creditors: number };
  loading = true;
  ngOnInit() {
    this.getUserHomeCounts();
  }

  getUserHomeCounts() {
    this.dashService.getUserHomeCounts().subscribe(
      data => {
        this.loading = false;
        this.homeCounts = data;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }
}
