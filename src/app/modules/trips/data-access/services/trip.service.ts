import { Injectable, Inject } from '@angular/core';
import { TripRepository } from '../../domain/repositories/trip.repository';
import { Location } from '../../domain/value-objects/location.vo';
import { DateRange } from '../../domain/value-objects/date-range.vo';
import { Price } from '../../domain/value-objects/price.vo';
import { TRIP_REPOSITORY } from '../../../../domain/repositories/trip.repository';
import { TripId } from '../../../../domain/value-objects/trip-id.value-object';
import { Trip } from '../../domain/entities/trip.entity';

@Injectable({
  providedIn: 'root'
})
export class TripApplicationService {
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
    const trip = Trip.create({
      title,
      description,
      imageUrl,
      location,
      dateRange,
      price,
      maxParticipants,
      tags,
      currentParticipants: 0,
      rating: 0
    });
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

      if (startDate && trip.getDateRange().startDate < startDate) {
        return false;
      }

      if (endDate && trip.getDateRange().endDate > endDate) {
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

  async findAvailableTrips(location: Location, dateRange: DateRange): Promise<Trip[]> {
    const trips = await this.tripRepository.findByLocation(
      location.getCity(),
      location.getCountry()
    );
    
    return trips.filter(trip => 
      trip.hasAvailableSpots() && 
      trip.isUpcoming() &&
      dateRange.overlaps(trip.getDateRange())
    );
  }

  async calculateTripOccupancyRate(tripId: string): Promise<number> {
    const trip = await this.tripRepository.findById(TripId.fromString(tripId));
    if (!trip) {
      throw new Error('Trip not found');
    }

    const availableSpots = trip.getAvailableSpots();
    const maxParticipants = trip.getMaxParticipants();
    return ((maxParticipants - availableSpots) / maxParticipants) * 100;
  }

  async findSimilarTrips(tripId: string): Promise<Trip[]> {
    const trip = await this.tripRepository.findById(TripId.fromString(tripId));
    if (!trip) {
      throw new Error('Trip not found');
    }

    const allTrips = await this.tripRepository.findAll();
    return allTrips
      .filter(otherTrip => 
        otherTrip.id !== trip.id &&
        otherTrip.isUpcoming() &&
        otherTrip.hasAvailableSpots() &&
        this.hasSimilarTags(otherTrip, trip)
      )
      .slice(0, 5); // Return top 5 similar trips
  }

  private hasSimilarTags(trip1: Trip, trip2: Trip): boolean {
    const tags1 = new Set(trip1.getTags());
    const tags2 = new Set(trip2.getTags());
    const commonTags = [...tags1].filter(tag => tags2.has(tag));
    return commonTags.length >= 2; // Consider trips similar if they share at least 2 tags
  }
} 