import { Injectable, Inject } from '@angular/core';
import { Trip } from '../entities/trip.entity';
import { TripRepository, TRIP_REPOSITORY } from '../repositories/trip.repository';
import { TripId } from '../value-objects/trip-id.value-object';
import { Location } from '../value-objects/location.value-object';
import { DateRange } from '../value-objects/date-range.value-object';
import { Price } from '../value-objects/price.value-object';

@Injectable()
export class TripService {
  constructor(
    @Inject(TRIP_REPOSITORY)
    private readonly tripRepository: TripRepository
  ) {}

  async getTripById(id: TripId): Promise<Trip | null> {
    return this.tripRepository.findById(id);
  }

  async getAllTrips(): Promise<Trip[]> {
    return this.tripRepository.findAll();
  }

  async searchTrips(
    location?: Location,
    startDate?: Date,
    endDate?: Date,
    maxPrice?: Price
  ): Promise<Trip[]> {
    let trips = await this.tripRepository.findAll();

    if (location) {
      trips = trips.filter(trip => 
        trip.getLocation().getCity().toLowerCase() === location.getCity().toLowerCase() &&
        trip.getLocation().getCountry().toLowerCase() === location.getCountry().toLowerCase()
      );
    }

    if (startDate && endDate) {
      trips = trips.filter(trip => {
        const tripRange = trip.getDateRange();
        return tripRange.getStartDate() >= startDate && tripRange.getEndDate() <= endDate;
      });
    }

    if (maxPrice) {
      trips = trips.filter(trip => 
        trip.getPrice().getAmount() <= maxPrice.getAmount()
      );
    }

    return trips;
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
      const locationKey = `${trip.getLocation().getCity()}-${trip.getLocation().getCountry()}`;
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