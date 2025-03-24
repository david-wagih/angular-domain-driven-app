import { Routes } from '@angular/router';
import { LoginComponent } from '../../infrastructure/ui/pages/login/login.component';
import { RegisterComponent } from '../../infrastructure/ui/pages/register/register.component';

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
]; 