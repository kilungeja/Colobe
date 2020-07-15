import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Loan } from '../loan-appication/loan';

@Component({
  selector: 'app-user-assets',
  templateUrl: 'user-assets.component.html'
})
export class UserAssetsComponent implements OnInit {
  loading = true;
  userData: {
    total: number;
    assets: Loan[];
    liabilities: Loan[];
  };
  constructor(private dashService: DashboardService) {}
  ngOnInit() {
    this.getUserAssets();
  }

  getUserAssets() {
    this.dashService.getUserAssets().subscribe(
      data => {
        this.loading = false;
        this.userData = data;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }
}
