import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Loan } from './loan';

@Component({
  selector: 'app-loan-applicaion',
  templateUrl: 'loan-application.component.html'
})
export class LoanApplicationComponent implements OnInit {
  constructor(private dashService: DashboardService) {}
  err = [];
  userLoan: Loan;
  fetchLoan = true;
  success: String;
  loading = false;
  action: any;
  formStatus = 'apply';
  ngOnInit() {
    this.getUserPendingRequest();
  }

  get loanDate() {
    return `${new Date(this.userLoan.date).getFullYear()}-0${new Date(
      this.userLoan.date
    ).getMonth()}-${new Date(this.userLoan.date).getDate()}`;
  }

  getUserPendingRequest() {
    this.fetchLoan = true;
    this.dashService.getUserPendingLoan().subscribe(
      data => {
        this.fetchLoan = false;
        this.userLoan = data;
      },
      (err: HttpErrorResponse) => {
        this.fetchLoan = false;
        console.log(err.error);
      }
    );
  }

  onSubmit(loan: NgForm) {
    if (loan.invalid) {
      return;
    }
    if (new Date(loan.value.date).valueOf() < Date.now().valueOf()) {
      this.err.push({ msg: 'Date is incorrect', id: 1 });
      setTimeout(() => (this.err = this.err.filter(er => er.id !== 1)), 3000);
    }

    if (loan.value.amount < 5000) {
      this.err.push({ msg: 'Amount can not be less than 5000 tzsh', id: 2 });
      setTimeout(() => (this.err = this.err.filter(er => er.id !== 2)), 3000);
    }

    if (this.err.length > 0) {
      return;
    }
    this.loading = true;
    if (this.formStatus === 'update') {
      this.action = this.dashService.updateLoan({
        ...loan.value,
        loanId: this.userLoan._id
      });
      this.formStatus = 'apply';
    } else {
      this.action = this.dashService.postLoan(loan.value);
    }
    this.action.subscribe(
      data => {
        this.loading = false;
        this.success = data.msg;
        setTimeout(() => (this.success = null), 3000);
        this.getUserPendingRequest();
      },
      (err: HttpErrorResponse) => {
        this.err.push({ msg: err.error.msg, id: 1 });
        setTimeout(() => (this.err = this.err.filter(er => er.id !== 1)), 3000);
        this.loading = false;
      }
    );
  }

  onUpdate() {
    this.formStatus = 'update';
  }

  onDelete() {
    this.dashService.deleteLoan(this.userLoan._id).subscribe(
      data => {
        this.getUserPendingRequest();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }
}
