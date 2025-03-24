import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TripApplicationService } from '../../application/services/trip.application.service';
import { TripService } from '../../domain/services/trip.service';
import { TripCardComponent } from '../../infrastructure/ui/components/trip-card/trip-card.component';
import { TripsComponent } from '../../infrastructure/ui/pages/trips/trips.component';
import { tripsRoutes } from './trips.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(tripsRoutes),
    TripCardComponent,
    TripsComponent
  ],
  providers: [
    TripApplicationService,
    TripService
  ]
})
export class TripsModule { } 