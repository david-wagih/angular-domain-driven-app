import { InjectionToken } from '@angular/core';
import { Trip } from '../entities/trip.entity';
import { TripId } from '../value-objects/trip-id.value-object';
import { Location } from '../value-objects/location.value-object';
import { Price } from '../value-objects/price.value-object';

export interface TripRepository {
  findById(id: TripId): Promise<Trip | null>;
  findAll(): Promise<Trip[]>;
  findByLocation(location: Location): Promise<Trip[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Trip[]>;
  save(trip: Trip): Promise<void>;
  delete(id: TripId): Promise<void>;
  exists(id: TripId): Promise<boolean>;
  search(location?: Location, startDate?: Date, endDate?: Date, maxPrice?: Price): Promise<Trip[]>;
}

export const TRIP_REPOSITORY = new InjectionToken<TripRepository>('TripRepository'); 