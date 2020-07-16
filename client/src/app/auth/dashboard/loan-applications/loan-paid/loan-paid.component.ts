import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Loan } from '../../loan-appication/loan';

@Component({
  selector: 'app-loan-paid',
  templateUrl: 'loan-paid.component.html'
})
export class LoanPaidComponent implements OnInit {
  constructor(private dashSevice: DashboardService) {}
  loading = true;
  loans:Loan[];
  ngOnInit() {
    this.fetchPaidLoans();
  }

  fetchPaidLoans() {
    this.dashSevice.fetchPaidLoans().subscribe(
      data => {
        this.loading = false;
        this.loans = data;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        console.log(err.error);
      }
    );
  }
}
