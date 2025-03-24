import { Routes } from '@angular/router';
import { AppLayoutComponent } from './modules/core/layout/app-layout.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/home/home.component')
          .then(m => m.HomeComponent),
        title: 'Welcome to TravelApp'
      },
      {
        path: 'trips',
        loadChildren: () => import('./modules/trips/trips.module')
          .then(m => m.TripsModule),
        title: 'Explore Trips'
      },
      {
        path: 'profile',
        loadComponent: () => import('./modules/user/profile/profile.component')
          .then(m => m.ProfileComponent),
        canActivate: [AuthGuard],
        title: 'My Profile'
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module')
      .then(m => m.AuthModule),
    title: 'Authentication'
  },
  {
    path: '**',
    loadComponent: () => import('./modules/core/components/not-found/not-found.component')
      .then(m => m.NotFoundComponent),
    title: 'Page Not Found'
  }
]; 