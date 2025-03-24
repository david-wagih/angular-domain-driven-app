import { Injectable } from '@angular/core';
import { TripRepository } from '../../domain/repositories/trip.repository';
import { Trip } from '../../domain/entities/trip.entity';
import { TripId } from '../../domain/value-objects/trip-id.value-object';
import { Location } from '../../domain/value-objects/location.value-object';
import { DateRange } from '../../domain/value-objects/date-range.value-object';
import { Price } from '../../domain/value-objects/price.value-object';

@Injectable()
export class MockTripRepository implements TripRepository {
  private trips: Trip[] = [
    Trip.create(
      'Paris Getaway',
      'Experience the magic of Paris',
      'paris.jpg',
      Location.create('Paris', 'France'),
      DateRange.create(new Date('2024-06-01'), new Date('2024-06-07')),
      Price.create(1200, 'EUR'),
      20,
      ['culture', 'romantic']
    ),
    Trip.create(
      'Tokyo Adventure',
      'Explore the vibrant city of Tokyo',
      'tokyo.jpg',
      Location.create('Tokyo', 'Japan'),
      DateRange.create(new Date('2024-07-15'), new Date('2024-07-22')),
      Price.create(2500, 'USD'),
      15,
      ['culture', 'food']
    )
  ];

  async findById(id: TripId): Promise<Trip | null> {
    const trip = this.trips.find(t => t.getId().equals(id));
    return trip || null;
  }

  async findAll(): Promise<Trip[]> {
    return [...this.trips];
  }

  async save(trip: Trip): Promise<void> {
    const index = this.trips.findIndex(t => t.getId().equals(trip.getId()));
    if (index !== -1) {
      this.trips[index] = trip;
    } else {
      this.trips.push(trip);
    }
  }

  async delete(id: TripId): Promise<void> {
    this.trips = this.trips.filter(t => !t.getId().equals(id));
  }

  async exists(id: TripId): Promise<boolean> {
    return this.trips.some(t => t.getId().equals(id));
  }
} 