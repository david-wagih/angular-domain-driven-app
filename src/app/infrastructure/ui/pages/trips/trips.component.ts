import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Trip } from '../../../../domain/entities/trip.entity';
import { TripService } from '../../../../domain/services/trip.service';
import { TripCardComponent } from '../../components/trip-card/trip-card.component';
import { Location } from '../../../../domain/value-objects/location.value-object';
import { Price } from '../../../../domain/value-objects/price.value-object';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, FormsModule, TripCardComponent],
  styleUrls: ['./trips.component.css'],
  template: `
    <div class="page-container">
      <!-- Hero Section -->
      <div class="hero">
        <div class="hero-bg">
          <img 
            src="assets/images/hero-bg.jpg" 
            alt="Travel background"
          />
        </div>
        <div class="hero-content">
          <h1 class="hero-title">Find Your Perfect Trip</h1>
          <p class="hero-subtitle">
            Discover amazing destinations and book your next adventure with us.
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Search Card -->
        <div class="search-card">
          <h2 class="search-title">Search Trips</h2>
          <div class="search-grid">
            <div class="form-group">
              <label class="form-label">Destination</label>
              <input
                type="text"
                [(ngModel)]="searchLocation"
                placeholder="City, Country"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Start Date</label>
              <input
                type="date"
                [(ngModel)]="startDate"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label class="form-label">End Date</label>
              <input
                type="date"
                [(ngModel)]="endDate"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Max Price</label>
              <input
                type="number"
                [(ngModel)]="maxPrice"
                placeholder="Enter max price"
                class="form-input"
              />
            </div>
          </div>
          <div class="search-button">
            <button
              (click)="searchTrips()"
              class="search-btn"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              Search
            </button>
          </div>
        </div>

        <!-- Results Section -->
        <div class="results-section">
          <div class="results-header">
            <h2 class="results-title">
              Available Trips
              <span class="results-count">
                ({{ trips.length }} {{ trips.length === 1 ? 'trip' : 'trips' }} found)
              </span>
            </h2>
            <div class="sort-container">
              <label class="sort-label">Sort by:</label>
              <select
                [(ngModel)]="sortBy"
                (change)="sortTrips()"
                class="sort-select"
              >
                <option value="price">Price</option>
                <option value="date">Date</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>

          <!-- Trips Grid -->
          <div class="trips-grid">
            <app-trip-card
              *ngFor="let trip of trips"
              [trip]="trip"
              (bookClick)="onBookTrip(trip)"
            ></app-trip-card>
          </div>

          <!-- Empty State -->
          <div *ngIf="trips.length === 0" class="empty-state">
            <div class="empty-icon-container">
              <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 class="empty-title">No trips found</h3>
            <p class="empty-description">
              Try adjusting your search criteria or check back later for new trips.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TripsComponent implements OnInit {
  trips: Trip[] = [];
  searchLocation = '';
  startDate = '';
  endDate = '';
  maxPrice: number | null = null;
  sortBy = 'price';

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  private async loadTrips(): Promise<void> {
    this.trips = await this.tripService.getAllTrips();
    this.sortTrips();
  }

  async searchTrips(): Promise<void> {
    let location: Location | undefined;
    if (this.searchLocation) {
      const [city, country] = this.searchLocation.split(',').map(s => s.trim());
      if (city && country) {
        location = Location.create(city, country);
      }
    }

    const start = this.startDate ? new Date(this.startDate) : undefined;
    const end = this.endDate ? new Date(this.endDate) : undefined;
    const maxPrice = this.maxPrice ? Price.create(this.maxPrice, 'USD') : undefined;

    this.trips = await this.tripService.searchTrips(location, start, end, maxPrice);
    this.sortTrips();
  }

  sortTrips(): void {
    switch (this.sortBy) {
      case 'price':
        this.trips.sort((a, b) => a.getPrice().getAmount() - b.getPrice().getAmount());
        break;
      case 'date':
        this.trips.sort((a, b) => a.getDateRange().getStartDate().getTime() - b.getDateRange().getStartDate().getTime());
        break;
      case 'popularity':
        this.trips.sort((a, b) => b.getCurrentParticipants() - a.getCurrentParticipants());
        break;
    }
  }

  async onBookTrip(trip: Trip): Promise<void> {
    try {
      await this.tripService.bookTrip(trip.getId());
      alert('Trip booked successfully!');
      this.loadTrips(); // Refresh the list to update availability
    } catch (error) {
      alert('Failed to book trip. Please try again.');
    }
  }
} 