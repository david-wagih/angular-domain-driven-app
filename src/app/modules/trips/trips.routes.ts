import { Routes } from '@angular/router';
import { TripFacade } from '../../domain/facades/trip.facade';
import { TripApplicationService } from '../../application/services/trip.application.service';
import { TripService } from '../../domain/services/trip.service';
import { TRIP_REPOSITORY } from '../../domain/repositories/trip.repository';
import { MockTripRepository } from '../../infrastructure/persistence/mock-trip.repository';

export const TRIPS_ROUTES: Routes = [
  {
    path: '',
    providers: [
      TripFacade,
      TripApplicationService,
      TripService,
      {
        provide: TRIP_REPOSITORY,
        useClass: MockTripRepository
      }
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/trip-list/trip-list.component')
          .then(m => m.TripListComponent)
      }
    ]
  }
]; 