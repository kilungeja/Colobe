import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Loan } from '../../loan-appication/loan';

@Component({
  selector: 'app-creditor-deails',
  templateUrl: 'creditor-details.component.html'
})
export class CreditorDetailsComponent implements OnInit {
  loading = true;
  loanDetail: Loan;
  constructor(
    private route: ActivatedRoute,
    private dashService: DashboardService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      const creditorId = data.id;
      const loanId = data.loanId;
      this.fetchCreditorDetails(creditorId, loanId);
    });
  }

  fetchCreditorDetails(creditorId, loanId) {
    this.dashService.fetchCreditorDetails(creditorId, loanId).subscribe(
      data => {
        this.loading = false;
        this.loanDetail = data;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }
}
