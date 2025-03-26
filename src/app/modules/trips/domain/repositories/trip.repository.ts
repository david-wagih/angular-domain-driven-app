import { Trip } from '../entities/trip.entity';
import { TripId } from '../../../../domain/value-objects/trip-id.value-object';

export interface TripRepository {
  findAll(): Promise<Trip[]>;
  findById(id: TripId): Promise<Trip | null>;
  findByLocation(city: string, country: string): Promise<Trip[]>;
  findUpcoming(): Promise<Trip[]>;
  save(trip: Trip): Promise<void>;
  update(trip: Trip): Promise<void>;
  delete(id: TripId): Promise<void>;
  exists(id: TripId): Promise<boolean>;
} 