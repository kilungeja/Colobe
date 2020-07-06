export interface Loan {
  loanStatus: string;
  _id: string;
  date: string;
  amount: number;
  applicant: Applicant;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Applicant {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  reg_no: string;
  password: string;
  created_at: string;
  __v: number;
}
