import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDto } from '../../../../application/dtos/trip.dto';
import { ButtonComponent } from '../../../core/components/button/button.component';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: TripDto;
  @Output() bookTrip = new EventEmitter<TripDto>();

  onBookTrip(): void {
    this.bookTrip.emit(this.trip);
  }

  hasAvailableSpots(): boolean {
    return this.trip.currentParticipants < this.trip.maxParticipants;
  }
} 