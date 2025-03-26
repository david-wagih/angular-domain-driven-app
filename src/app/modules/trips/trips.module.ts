import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TripService } from './domain/services/trip.service';
import { TRIPS_ROUTES } from './trips.routes';
import { TRIP_REPOSITORY } from '../../domain/repositories/trip.repository';
import { MockTripRepository } from '../../infrastructure/persistence/mock-trip.repository';
import { TripCardComponent } from './ui/components/trip-card/trip-card.component';
import { TripApplicationService } from './data-access/services/trip.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(TRIPS_ROUTES),
    TripCardComponent,
  ],
  providers: [
    TripApplicationService,
    TripService,
    {
      provide: TRIP_REPOSITORY,
      useClass: MockTripRepository
    }
  ]
})
export class TripsModule { } 