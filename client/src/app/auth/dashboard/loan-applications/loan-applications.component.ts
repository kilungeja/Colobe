import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Loan } from '../loan-appication/loan';

@Component({
  selector: 'app-loan-applications',
  templateUrl: './loan-applications.component.html'
})
export class LoanApplicationsComponent implements OnInit {
  constructor(private dashService: DashboardService) {}
  loansVerified: Loan[];
  loans: Loan[];
  loading = true;
  loandingVerified = false;
  ngOnInit(): void {
    this.fetchCVerifyLoans();
    this.fetchCVerifiedLoans();
  }

  fetchCVerifyLoans() {
    this.loading = true;
    this.dashService.getVerified().subscribe(
      data => {
        this.fetchCVerifiedLoans();
        this.loans = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        this.loading = false;
      }
    );
  }
  fetchCVerifiedLoans() {
    this.loandingVerified = true;
    this.dashService.fetchCVerifiedLoans().subscribe(
      data => {
        this.loansVerified = data;
        this.loandingVerified = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        this.loandingVerified = false;
      }
    );
  }
  onVerify(loanId) {
    this.dashService.postVerified(loanId).subscribe(
      data => {
        console.log(data);
        this.fetchCVerifyLoans();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }
  onPaid(loanId) {
    this.dashService.postPaidVerified(loanId).subscribe(
      data => {
        console.log(data);
        this.fetchCVerifyLoans();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }
}
