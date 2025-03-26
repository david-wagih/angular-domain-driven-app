import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../../domain/entities/trip.entity';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card shadow-sm hover:shadow-md transition-shadow duration-200">
      <img [src]="trip.getImageUrl()" [alt]="trip.getTitle()" class="card-img-top h-48 object-cover">
      <div class="card-body p-4">
        <h5 class="card-title text-xl font-bold mb-2">{{ trip.getTitle() }}</h5>
        <p class="text-gray-600 mb-2">
          {{ trip.getLocation().format() }}
        </p>
        <p class="text-sm text-gray-500 mb-3">
          {{ trip.getDateRange().format() }}
        </p>
        <div class="flex justify-between items-center mb-3">
          <span class="text-lg font-semibold text-primary">
            {{ trip.getPrice().format() }}
          </span>
          <span class="text-sm text-gray-600">
            {{ trip.getAvailableSpots() }} spots left
          </span>
        </div>
        <div class="flex flex-wrap gap-2 mb-3">
          @for(tag of trip.getTags(); track tag) {
            <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {{ tag }}
            </span>
          }
        </div>
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <span class="text-yellow-400 mr-1">★</span>
            <span class="text-sm text-gray-600">{{ trip.getRating() }}/5</span>
          </div>
          <button 
            class="btn btn-primary"
            [disabled]="!trip.hasAvailableSpots()"
            (click)="viewDetails.emit(trip)">
            View Details
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .card {
      border-radius: 0.5rem;
      overflow: hidden;
      background: white;
    }
    .btn-primary {
      @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300;
    }
  `]
})
export class TripCardComponent {
  @Input({ required: true }) trip!: Trip;
  @Output() viewDetails = new EventEmitter<Trip>();
} 