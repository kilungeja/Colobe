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

  // debtor confirm lending
  confirmLending(loanId) {
    return this.httpClient.get<Loan>(`${this.BASE_URL}/confirm/${loanId}`);
  }

  fetchCreditors() {
    return this.httpClient.get<Loan[]>(`${this.BASE_URL}/creditors/`);
  }

  fetchCreditorDetails(creditorId: any, loanId) {
    return this.httpClient.get<Loan>(
      `${this.BASE_URL}/creditors/${creditorId}/${loanId}`
    );
  }

  // Admin requests
  getVerified() {
    return this.httpClient.get<Loan[]>(`${this.BASE_URL}/verified`);
  }

  // on   verify
  postVerified(loanId) {
    return this.httpClient.get(`${this.BASE_URL}/verified/${loanId}`);
  }

  // on paid confirmaton
  postPaidVerified(loanId) {
    return this.httpClient.get(`${this.BASE_URL}/post-verified/${loanId}`);
  }

  // fetch all loans have been verified by admin/staff
  fetchCVerifiedLoans() {
    return this.httpClient.get<Loan[]>(`${this.BASE_URL}/post-verified`);
  }
}
