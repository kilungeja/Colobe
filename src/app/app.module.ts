import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    CreditorsComponent,
    UserAssetsComponent,
    AccountSettingsComponent,
    ApplicantsComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
