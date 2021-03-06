import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { FeaturesComponent } from './body/features/features.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
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
import { SpinnerComponent } from './spinner/spinner.component';
import { LoanApplicationsComponent } from './auth/dashboard/loan-applications/loan-applications.component';
import { LoanPaidComponent } from './auth/dashboard/loan-applications/loan-paid/loan-paid.component';
import { AdminHomeComponent } from './auth/dashboard/admin-home/admin-home.component';
import { UsersComponent } from './auth/dashboard/users/users.component';
import { PieChartComponent } from './auth/dashboard/charts/pie/pie.component';
import { ContactsComponent } from './auth/dashboard/contacts/contacts.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    FeaturesComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    UserHomeComponent,
    AdminHomeComponent,
    CreditorsComponent,
    UserAssetsComponent,
    AccountSettingsComponent,
    ApplicantsComponent,
    ApplicantDetailsComponent,
    CreditorDetailsComponent,
    LoanApplicationComponent,
    SpinnerComponent,
    LoanApplicationsComponent,
    LoanPaidComponent,
    UsersComponent,
    PieChartComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000']
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
