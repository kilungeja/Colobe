import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-home',
  templateUrl: 'admin-home.component.html'
})
export class AdminHomeComponent implements OnInit {
  loading = true;
  counts: {
    assets: number;
    requests: number;
    users: number;
  };
  constructor(private dashService: DashboardService) {}

  ngOnInit() {
    this.fetchAdmnCounts();
  }

  fetchAdmnCounts() {
    this.dashService.fetchAdmnCounts().subscribe(
      data => {
        this.loading = false;
        this.counts = data;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }
}
