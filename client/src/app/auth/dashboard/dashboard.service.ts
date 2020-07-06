import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loan } from './loan-appication/loan';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private httpClient: HttpClient) {}
  BASE_URL = 'http://localhost:5000/api/dashboard';
  postLoan(loan) {
    return this.httpClient.post<{ msg: String }>(`${this.BASE_URL}/loan`, loan);
  }

  updateLoan(loan): any {
    return this.httpClient.patch<{ msg: String }>(
      `${this.BASE_URL}/loan`,
      loan
    );
  }

  deleteLoan(loanId) {
    return this.httpClient.delete(`${this.BASE_URL}/loan/${loanId}`);
  }

  getLoans() {
    return this.httpClient.get<[Loan]>(`${this.BASE_URL}/loans`);
  }

  getLoan(id) {
    return this.httpClient.get<Loan>(`${this.BASE_URL}/loan/${id}`);
  }

  getUserPendingLoan() {
    return this.httpClient.get<Loan>(`${this.BASE_URL}/loan`);
  }
}
