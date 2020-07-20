export interface Loan {
  loanStatus: string;
  _id: string;
  date: string;
  amount: number;
  interest?: number;
  applicant: User;
  debitor?: User;
  verifiedBy?: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface User {
  _id: string;
  assets?: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  reg_no: string;
  created_at: string;
  __v: number;
}
