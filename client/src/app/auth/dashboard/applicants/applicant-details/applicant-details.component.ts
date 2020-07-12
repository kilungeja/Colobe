import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  confirming = false;
  constructor(
    private route: ActivatedRoute,
    private dashService: DashboardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      const loanId = data.get('id');
      this.loading = true;
      this.dashService.getLoan(loanId).subscribe(
        // tslint:disable-next-line: no-shadowed-variable
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

  onConfirm() {
    const loanId = this.loanDetail._id;
    this.confirming = true;
    this.dashService.confirmLending(loanId).subscribe(
      data => {
        this.router.navigate(['/dashboard/creditors']);
        this.confirming = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        this.confirming = false;
      }
    );
  }
}
