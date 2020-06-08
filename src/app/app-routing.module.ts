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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'user-home', component: UserHomeComponent },
      { path: 'creditors', component: CreditorsComponent },
      { path: 'assets', component: UserAssetsComponent },
      { path: 'settings', component: AccountSettingsComponent },
      { path: 'applicants', component: ApplicantsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
