import { Routes } from '@angular/router';
import { TripListComponent } from './feature-list/components/trip-list/trip-list.component';
import { TripDetailsComponent } from './feature-details/components/trip-details/trip-details.component';

export const TRIPS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TripListComponent
      },
      {
        path: ':id',
        component: TripDetailsComponent
      }
    ]
  }
]; 