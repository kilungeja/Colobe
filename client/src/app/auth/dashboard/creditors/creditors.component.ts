import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Loan } from '../loan-appication/loan';

@Component({
  selector: 'app-creditos',
  templateUrl: 'creditors.component.html'
})
export class CreditorsComponent implements OnInit {
  constructor(private dashService: DashboardService) {}
  loading = true;
  creditors: Loan[];
  ngOnInit() {
    this.fetchCreditors();
  }

  fetchCreditors() {
    this.dashService.fetchCreditors().subscribe(
      data => {
        this.loading = false;
        this.creditors = data;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }
}
