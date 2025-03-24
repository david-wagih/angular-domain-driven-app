import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../../../domain/entities/trip.entity';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() bookTrip = new EventEmitter<Trip>();

  onBookTrip(): void {
    this.bookTrip.emit(this.trip);
  }
} 