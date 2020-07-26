import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { UserHomeComponent } from './auth/dashboard/user-home/user-home.component';
import { CreditorsComponent } from './auth/dashboard/creditors/creditors.component';
import { UserAssetsComponent } from './auth/dashboard/user-assets/user-assets.component';
import { AccountSettingsComponent } from './auth/dashboard/acccountsettings/accountsettings.component';
import { ApplicantsComponent } from './auth/dashboard/applicants/applicants.component';
import { ApplicantDetailsComponent } from './auth/dashboard/applicants/applicant-details/applicant-details.component';
import { CreditorDetailsComponent } from './auth/dashboard/creditors/creditor-details/creditor-details.component';
import { LoanApplicationComponent } from './auth/dashboard/loan-appication/loan-application.component';
import { AuthGuard } from './auth/auth-guard.service';
import { LoanApplicationsComponent } from './auth/dashboard/loan-applications/loan-applications.component';
import { LoanPaidComponent } from './auth/dashboard/loan-applications/loan-paid/loan-paid.component';
import { RoleGuard } from './auth/roles-guard.service.';
import { AdminHomeComponent } from './auth/dashboard/admin-home/admin-home.component';
import { UsersComponent } from './auth/dashboard/users/users.component';
import { ContactsComponent } from './auth/dashboard/contacts/contacts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      { path: 'user-home', component: UserHomeComponent },
      {
        path: 'admin-home',
        component: AdminHomeComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'contacts',
        component: ContactsComponent,
        canActivate: [RoleGuard]
      },
      { path: 'users', component: UsersComponent, canActivate: [RoleGuard] },
      { path: 'creditors', component: CreditorsComponent },
      { path: 'creditors/:id/:loanId', component: CreditorDetailsComponent },
      { path: 'assets', component: UserAssetsComponent },
      { path: 'settings', component: AccountSettingsComponent },
      { path: 'loan', component: LoanApplicationComponent },
      {
        path: 'loan-applications',
        component: LoanApplicationsComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'loan-paid',
        component: LoanPaidComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'applicants',
        component: ApplicantsComponent,
        children: [{ path: ':id', component: ApplicantDetailsComponent }]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
