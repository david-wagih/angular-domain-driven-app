import { Routes } from '@angular/router';
import { LoginPageComponent } from './feature-login/components/login-page/login-page.component';
import { RegisterPageComponent } from './feature-register/components/register-page/register-page.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Login'
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    title: 'Register'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
]; 