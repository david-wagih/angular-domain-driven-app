import { Routes } from '@angular/router';
import { AppLayoutComponent } from './infrastructure/ui/layout/app-layout.component';
import { TripsComponent } from './infrastructure/ui/pages/trips/trips.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'trips',
        pathMatch: 'full'
      },
      {
        path: 'trips',
        component: TripsComponent
      },
      // Add more routes here as we create more pages
      {
        path: '**',
        redirectTo: 'trips'
      }
    ]
  }
]; 