import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripCardComponent } from '../../../ui/components/trip-card/trip-card.component';
import { TripSearchComponent } from '../../../ui/components/trip-search/trip-search.component';
import { TripService } from '../../../domain/services/trip.service';
import { Trip } from '../../../domain/entities/trip.entity';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripCardComponent, TripSearchComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Available Trips</h1>
      
      <app-trip-search
        class="mb-8"
        (searchChange)="onSearchChange($event)"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for(trip of trips; track trip.id) {
          <app-trip-card
            [trip]="trip"
            (viewDetails)="onViewDetails($event)"
          />
        }
        @empty {
          <div class="col-span-full text-center py-8">
            <p class="text-gray-500">No trips found matching your criteria.</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];

  constructor(
    private tripService: TripService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadTrips();
  }

  private async loadTrips(searchCriteria?: any): Promise<void> {
    try {
      if (searchCriteria) {
        this.trips = await this.tripService.searchTrips(
          searchCriteria.location,
          searchCriteria.startDate,
          searchCriteria.endDate,
          searchCriteria.maxPrice
        );
      } else {
        this.trips = await this.tripService.getAllTrips();
      }
    } catch (error) {
      console.error('Error loading trips:', error);
      // Here you would typically show a user-friendly error message
    }
  }

  async onSearchChange(criteria: any): Promise<void> {
    await this.loadTrips(criteria);
  }

  onViewDetails(trip: Trip): void {
    this.router.navigate(['/trips', trip.id]);
  }
} 