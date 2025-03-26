import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../../domain/services/trip.service';
import { Trip } from '../../../domain/entities/trip.entity';
import { TripId } from '../../../../../domain/value-objects/trip-id.value-object';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (trip) {
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img 
            [src]="trip.getImageUrl()" 
            [alt]="trip.getTitle()"
            class="w-full h-96 object-cover"
          >
          
          <div class="p-6">
            <div class="flex justify-between items-start mb-6">
              <div>
                <h1 class="text-3xl font-bold mb-2">{{ trip.getTitle() }}</h1>
                <p class="text-gray-600 text-lg">{{ trip.getLocation().format() }}</p>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-primary mb-1">
                  {{ trip.getPrice().format() }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ trip.getAvailableSpots() }} spots remaining
                </p>
              </div>
            </div>

            <div class="mb-6">
              <h2 class="text-xl font-semibold mb-2">Trip Details</h2>
              <p class="text-gray-700">{{ trip.getDescription() }}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 class="text-lg font-semibold mb-2">Dates</h3>
                <p class="text-gray-700">{{ trip.getDateRange().format() }}</p>
                <p class="text-gray-600 mt-1">
                  Duration: {{ trip.getDuration() }} days
                </p>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold mb-2">Rating</h3>
                <div class="flex items-center">
                  <span class="text-yellow-400 text-2xl mr-2">★</span>
                  <span class="text-gray-700">
                    {{ trip.getRating() }}/5
                  </span>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Tags</h3>
              <div class="flex flex-wrap gap-2">
                @for(tag of trip.getTags(); track tag) {
                  <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {{ tag }}
                  </span>
                }
              </div>
            </div>

            <div class="flex justify-between items-center">
              <button
                class="btn btn-secondary"
                (click)="goBack()"
              >
                Back to Trips
              </button>
              
              <button
                class="btn btn-primary"
                [disabled]="!trip.hasAvailableSpots()"
                (click)="bookTrip()"
              >
                {{ trip.hasAvailableSpots() ? 'Book Now' : 'Sold Out' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="container mx-auto px-4 py-8 text-center">
        <p class="text-gray-500">Loading trip details...</p>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }
    .btn {
      @apply px-6 py-2 rounded-lg font-medium;
    }
    .btn-primary {
      @apply bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300;
    }
    .btn-secondary {
      @apply bg-gray-100 text-gray-700 hover:bg-gray-200;
    }
  `]
})
export class TripDetailsComponent implements OnInit {
  trip: Trip | null = null;

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (!tripId) {
      this.router.navigate(['/trips']);
      return;
    }

    try {
      this.trip = await this.tripService.getTrip(tripId);
      if (!this.trip) {
        this.router.navigate(['/trips']);
      }
    } catch (error) {
      console.error('Error loading trip details:', error);
      // Here you would typically show a user-friendly error message
      this.router.navigate(['/trips']);
    }
  }

  async bookTrip(): Promise<void> {
    if (!this.trip || !this.trip.hasAvailableSpots()) {
      return;
    }

    try {
      await this.tripService.bookTrip(TripId.fromString(this.trip.id));
      // Here you would typically show a success message and handle the booking flow
      // For now, we'll just reload the trip details
      this.trip = await this.tripService.getTrip(this.trip.id);
    } catch (error) {
      console.error('Error booking trip:', error);
      // Here you would typically show a user-friendly error message
    }
  }

  goBack(): void {
    this.router.navigate(['/trips']);
  }
} 