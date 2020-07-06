import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Loan } from '../../loan-appication/loan';

@Component({
  selector: 'app-applicant-details',
  templateUrl: 'applicant-details.component.html'
})
export class ApplicantDetailsComponent implements OnInit {
  loading = true;
  loanDetail: Loan;
  constructor(
    private route: ActivatedRoute,
    private dashService: DashboardService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      const loanId = data.get('id');
      this.loading = true;
      this.dashService.getLoan(loanId).subscribe(
        data => {
          this.loading = false;
          this.loanDetail = data;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          console.log(err.error);
        }
      );
    });
  }
}
