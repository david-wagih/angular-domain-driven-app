import { InjectionToken } from '@angular/core';
import { Trip } from '../entities/trip.entity';
import { TripId } from '../value-objects/trip-id.value-object';

export interface TripRepository {
  findById(id: TripId): Promise<Trip | null>;
  findAll(): Promise<Trip[]>;
  save(trip: Trip): Promise<void>;
  delete(id: TripId): Promise<void>;
  exists(id: TripId): Promise<boolean>;
}

export const TRIP_REPOSITORY = new InjectionToken<TripRepository>('TRIP_REPOSITORY'); 