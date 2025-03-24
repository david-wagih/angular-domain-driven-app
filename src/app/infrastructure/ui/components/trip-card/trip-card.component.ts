import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../../../domain/entities/trip.entity';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./trip-card.component.css'],
  template: `
    <div class="trip-card">
      <div class="image-container">
        <img [src]="trip.getImageUrl()" [alt]="trip.getTitle()" />
        <div class="price-badge">
          <span class="price-text">{{ trip.getPrice().format() }}</span>
        </div>
      </div>
      
      <div class="content">
        <h3 class="title">{{ trip.getTitle() }}</h3>
        <p class="description">{{ trip.getDescription() }}</p>
        
        <div class="info-item">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          {{ trip.getLocation().format() }}
        </div>
        
        <div class="info-item">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          {{ trip.getDateRange().format() }}
        </div>
        
        <div class="info-item">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          {{ trip.getCurrentParticipants() }}/{{ trip.getMaxParticipants() }} participants
        </div>
        
        <div class="footer">
          <div class="tags">
            <span *ngFor="let tag of trip.getTags()" class="tag">
              {{ tag }}
            </span>
          </div>
          
          <button 
            class="book-button"
            [disabled]="!trip.hasAvailableSpots()"
            (click)="onBookClick()"
          >
            {{ trip.hasAvailableSpots() ? 'Book Now' : 'Sold Out' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() bookClick = new EventEmitter<Trip>();

  onBookClick(): void {
    this.bookClick.emit(this.trip);
  }
} 