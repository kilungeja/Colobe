import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  BASE_URL = 'http://localhost:5000/api/auth';
  postRegister(userData) {
    return this.httpClient.post<{ msg: string }>(`${this.BASE_URL}/register`, {
      ...userData
    });
  }
}
