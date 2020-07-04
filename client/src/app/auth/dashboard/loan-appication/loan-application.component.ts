import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-loan-applicaion',
  templateUrl: 'loan-application.component.html'
})
export class LoanApplicationComponent implements OnInit {
  constructor(private dashService: DashboardService) {}
  err = [];
  success: String;
  loading = false;
  ngOnInit() {}
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
    this.dashService.postLoan(loan.value).subscribe(
      data => {
        this.loading = false;
        this.success = data.msg;
        setTimeout(() => (this.success = null), 3000);
      },
      (err: HttpErrorResponse) => {
        console.log();
        this.err.push({ msg: err.error.msg, id: 1 });
        setTimeout(() => (this.err = this.err.filter(er => er.id !== 1)), 3000);
        this.loading = false;
      }
    );
  }
}
