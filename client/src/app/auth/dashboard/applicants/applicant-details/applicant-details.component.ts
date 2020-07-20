import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Loan } from '../../loan-appication/loan';
import { AuthService } from 'src/app/auth/auth.service';

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
    private router: Router,
    private authService: AuthService
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
        this.confirming = false;
      }
    );
  }

  get days() {
    return (
      (new Date(this.loanDetail.date).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24)
    );
  }

  get withInterest() {
    let result = this.dashService.calculateInterest(
      this.loanDetail.amount,
      this.days,
      0.02,
      2
    );

    const netInterest = (result - this.loanDetail.amount) * 0.7;
    return netInterest + this.loanDetail.amount;
  }

  get samePerson() {
    return (
      this.authService.getDecodedToken().data._id ===
      this.loanDetail.applicant._id
    );
  }
}
