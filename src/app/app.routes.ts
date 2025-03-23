import { Routes } from '@angular/router';
import { LoginComponent } from './infrastructure/ui/pages/login/login.component';
import { RegisterComponent } from './infrastructure/ui/pages/register/register.component';
import { HomeComponent } from './infrastructure/ui/pages/home/home.component';
import { ProfileComponent } from './infrastructure/ui/pages/profile/profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]; 