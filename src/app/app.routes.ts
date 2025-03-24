import { Routes } from '@angular/router';
import { AppLayoutComponent } from './infrastructure/ui/layout/app-layout.component';
import { TripsComponent } from './infrastructure/ui/pages/trips/trips.component';
import { LoginComponent } from './infrastructure/ui/pages/login/login.component';
import { RegisterComponent } from './infrastructure/ui/pages/register/register.component';
import { HomeComponent } from './infrastructure/ui/pages/home/home.component';
import { ProfileComponent } from './infrastructure/ui/pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'trips',
        component: TripsComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
]; 