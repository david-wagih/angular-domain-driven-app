import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TripFacade, TripFilters } from '../../../../domain/facades/trip.facade';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDto } from '../../../../application/dtos/trip.dto';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TripCardComponent],
  template: `
    <div class="page-container">
      <!-- Search Section -->
      <div class="search-section">
        <div class="search-form">
          <div class="form-group">
            <label>Location</label>
            <input
              type="text"
              [ngModel]="facade.filters().location"
              (ngModelChange)="updateFilter('location', $event)"
              placeholder="Search by location"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label>Start Date</label>
            <input
              type="date"   
              [ngModel]="facade.filters().startDate"
              (ngModelChange)="updateFilter('startDate', $event)"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label>End Date</label>
            <input
              type="date"
              [ngModel]="facade.filters().endDate"
              (ngModelChange)="updateFilter('endDate', $event)"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label>Max Price</label>
            <input
              type="number"
              [ngModel]="facade.filters().maxPrice"
              (ngModelChange)="updateFilter('maxPrice', $event)"
              placeholder="Enter maximum price"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label>Sort By</label>
            <select
              [ngModel]="facade.filters().sortBy"
              (ngModelChange)="updateFilter('sortBy', $event)"
              class="form-control"
            >
              <option value="price">Price</option>
              <option value="date">Date</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      @if (facade.loading()) {
        <div class="loading-spinner">Loading trips...</div>
      }

      <!-- Error State -->
      @if (facade.error()) {
        <div class="error-message">{{ facade.error() }}</div>
      }

      <!-- Results -->
      <div class="results-section">
        <h2>Available Trips ({{ facade.filteredTrips().length }})</h2>
        
        @if (facade.filteredTrips().length === 0) {
          <div class="no-trips">No trips found</div>
        } @else {
          <div class="trips-grid">
            @for (trip of facade.filteredTrips(); track trip.id) {
              <app-trip-card 
                [trip]="trip"
                (click)="onTripSelected(trip)"
              />
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 1rem;
    }
    
    .search-section {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }

    .search-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-control {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .trips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .loading-spinner {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .error-message {
      color: #dc3545;
      padding: 1rem;
      margin: 1rem 0;
      border: 1px solid #dc3545;
      border-radius: 4px;
    }

    .no-trips {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    h2 {
      margin-bottom: 1rem;
      color: #333;
    }
  `]
})
export class TripListComponent {
  protected facade = inject(TripFacade);

  updateFilter<K extends keyof TripFilters>(
    key: K, 
    value: TripFilters[K]
  ): void {
    this.facade.updateFilters({ [key]: value });
  }

  onTripSelected(trip: TripDto): void {
    this.facade.selectTrip(trip);
  }
} 