import { Injectable, Inject } from '@angular/core';
import { TRIP_REPOSITORY, TripRepository } from '../repositories/trip.repository';
import { Trip } from '../entities/trip.entity';
import { TripId } from '../value-objects/trip-id.value-object';
import { Location } from '../value-objects/location.value-object';
import { DateRange } from '../value-objects/date-range.value-object';
import { Price } from '../value-objects/price.value-object';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(
    @Inject(TRIP_REPOSITORY) private readonly tripRepository: TripRepository
  ) {}

  async getTrip(id: string): Promise<Trip | null> {
    return this.tripRepository.findById(TripId.fromString(id));
  }

  async getAllTrips(): Promise<Trip[]> {
    return this.tripRepository.findAll();
  }

  async createTrip(
    title: string,
    description: string,
    imageUrl: string,
    location: Location,
    dateRange: DateRange,
    price: Price,
    maxParticipants: number,
    tags: string[]
  ): Promise<Trip> {
    const trip = Trip.create(
      title,
      description,
      imageUrl,
      location,
      dateRange,
      price,
      maxParticipants,
      tags
    );
    await this.tripRepository.save(trip);
    return trip;
  }

  async updateTrip(trip: Trip): Promise<void> {
    await this.tripRepository.save(trip);
  }

  async deleteTrip(id: string): Promise<void> {
    await this.tripRepository.delete(TripId.fromString(id));
  }

  async tripExists(id: string): Promise<boolean> {
    return this.tripRepository.exists(TripId.fromString(id));
  }

  async searchTrips(
    location?: string,
    startDate?: Date,
    endDate?: Date,
    maxPrice?: number
  ): Promise<Trip[]> {
    const trips = await this.getAllTrips();
    
    return trips.filter(trip => {
      if (location) {
        const tripLocation = trip.getLocation();
        const searchLower = location.toLowerCase();
        if (!tripLocation.getCity().toLowerCase().includes(searchLower) &&
            !tripLocation.getCountry().toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      if (startDate && trip.getDateRange().getStartDate() < startDate) {
        return false;
      }

      if (endDate && trip.getDateRange().getEndDate() > endDate) {
        return false;
      }

      if (maxPrice && trip.getPrice().getAmount() > maxPrice) {
        return false;
      }

      return true;
    });
  }

  async bookTrip(tripId: TripId): Promise<void> {
    const trip = await this.tripRepository.findById(tripId);
    if (!trip) {
      throw new Error('Trip not found');
    }

    if (!trip.hasAvailableSpots()) {
      throw new Error('No available spots for this trip');
    }

    // In a real application, this would create a booking record
    // For now, we'll just simulate a successful booking
    await this.tripRepository.save(trip);
  }

  async getPopularDestinations(): Promise<Location[]> {
    const trips = await this.tripRepository.findAll();
    const locationCount = new Map<string, number>();
    
    trips.forEach(trip => {
      const location = trip.getLocation();
      const locationKey = `${location.getCity()}-${location.getCountry()}`;
      locationCount.set(locationKey, (locationCount.get(locationKey) || 0) + 1);
    });

    return Array.from(locationCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([key]) => {
        const [city, country] = key.split('-');
        return Location.create(city, country);
      });
  }
} 