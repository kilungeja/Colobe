import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Loan } from '../loan-appication/loan';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-applicants',
  templateUrl: 'applicants.component.html'
})
export class ApplicantsComponent implements OnInit {
  constructor(private dashService: DashboardService) {}
  loans: Loan[];
  loading = true;
  ngOnInit() {
    this.dashService.getLoans().subscribe(
      data => {
        this.loans = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        console.log(err.error);
      }
    );
  }
}
