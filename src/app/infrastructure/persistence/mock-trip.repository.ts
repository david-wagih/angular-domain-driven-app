import { Injectable } from '@angular/core';
import { Trip } from '../../domain/entities/trip.entity';
import { TripRepository } from '../../domain/repositories/trip.repository';
import { TripId } from '../../domain/value-objects/trip-id.value-object';
import { Location } from '../../domain/value-objects/location.value-object';
import { Price } from '../../domain/value-objects/price.value-object';
import { DateRange } from '../../domain/value-objects/date-range.value-object';

@Injectable()
export class MockTripRepository implements TripRepository {
  private trips: Trip[] = [
    Trip.create(
      'Paris Adventure',
      'Experience the magic of Paris with guided tours of the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.',
      'assets/images/paris.jpg',
      Location.create('Paris', 'France', { latitude: 48.8566, longitude: 2.3522 }),
      DateRange.create(new Date('2024-06-15'), new Date('2024-06-22')),
      Price.create(2999),
      20,
      ['city-break', 'culture', 'romance']
    ),
    Trip.create(
      'Bali Beach Retreat',
      'Relax on pristine beaches, explore ancient temples, and immerse yourself in Balinese culture.',
      'assets/images/bali.jpg',
      Location.create('Bali', 'Indonesia', { latitude: -8.3405, longitude: 115.0920 }),
      DateRange.create(new Date('2024-07-01'), new Date('2024-07-10')),
      Price.create(3499),
      15,
      ['beach', 'relaxation', 'culture']
    ),
    Trip.create(
      'New York City Explorer',
      'Discover the city that never sleeps with visits to Times Square, Central Park, and Broadway shows.',
      'assets/images/nyc.jpg',
      Location.create('New York City', 'USA', { latitude: 40.7128, longitude: -74.0060 }),
      DateRange.create(new Date('2024-08-15'), new Date('2024-08-22')),
      Price.create(2499),
      25,
      ['city-break', 'shopping', 'entertainment']
    ),
    Trip.create(
      'Tokyo Cultural Journey',
      'Experience the perfect blend of traditional and modern Japan in the heart of Tokyo.',
      'assets/images/tokyo.jpg',
      Location.create('Tokyo', 'Japan', { latitude: 35.6762, longitude: 139.6503 }),
      DateRange.create(new Date('2024-09-01'), new Date('2024-09-10')),
      Price.create(3999),
      18,
      ['culture', 'food', 'technology']
    ),
    Trip.create(
      'Safari Adventure',
      'Witness the great migration and experience the African wilderness up close.',
      'assets/images/safari.jpg',
      Location.create('Serengeti', 'Tanzania', { latitude: -2.1540, longitude: 34.6857 }),
      DateRange.create(new Date('2024-10-15'), new Date('2024-10-25')),
      Price.create(5999),
      12,
      ['adventure', 'wildlife', 'nature']
    )
  ];

  async findById(id: TripId): Promise<Trip | null> {
    return this.trips.find(trip => trip.getId().equals(id)) || null;
  }

  async findAll(): Promise<Trip[]> {
    return [...this.trips];
  }

  async findByLocation(location: Location): Promise<Trip[]> {
    return this.trips.filter(trip => 
      trip.getLocation().getCity().toLowerCase() === location.getCity().toLowerCase() &&
      trip.getLocation().getCountry().toLowerCase() === location.getCountry().toLowerCase()
    );
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Trip[]> {
    return this.trips.filter(trip => {
      const tripRange = trip.getDateRange();
      return tripRange.getStartDate() >= startDate && tripRange.getEndDate() <= endDate;
    });
  }

  async save(trip: Trip): Promise<void> {
    const index = this.trips.findIndex(t => t.getId().equals(trip.getId()));
    if (index >= 0) {
      this.trips[index] = trip;
    } else {
      this.trips.push(trip);
    }
  }

  async delete(id: TripId): Promise<void> {
    this.trips = this.trips.filter(trip => !trip.getId().equals(id));
  }

  async exists(id: TripId): Promise<boolean> {
    return this.trips.some(trip => trip.getId().equals(id));
  }

  async search(location?: Location, startDate?: Date, endDate?: Date, maxPrice?: Price): Promise<Trip[]> {
    return this.trips.filter(trip => {
      if (location && !trip.getLocation().equals(location)) return false;
      if (startDate && trip.getDateRange().getStartDate() < startDate) return false;
      if (endDate && trip.getDateRange().getEndDate() > endDate) return false;
      if (maxPrice && trip.getPrice().getAmount() > maxPrice.getAmount()) return false;
      return true;
    });
  }
} 