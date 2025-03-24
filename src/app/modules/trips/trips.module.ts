import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TripApplicationService } from '../../application/services/trip.application.service';
import { TripService } from '../../domain/services/trip.service';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { TRIPS_ROUTES } from './trips.routes';
import { TRIP_REPOSITORY } from '../../domain/repositories/trip.repository';
import { MockTripRepository } from '../../infrastructure/persistence/mock-trip.repository';

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