import {NgModule} from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


const routes:Routes = [
    { path:'home', component: HomeComponent },
    { path:'about', component:AboutComponent },
    { path:'login', component:LoginComponent },
    { path: 'register', component:RegisterComponent }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{} 