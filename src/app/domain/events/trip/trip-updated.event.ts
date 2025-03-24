import { DomainEvent } from '../event';
import { Trip } from '../../entities/trip.entity';
import { TripId } from '../../value-objects/trip-id.value-object';

export class TripUpdatedEvent extends DomainEvent {
  constructor(
    public readonly tripId: TripId,
    public readonly oldTrip: Trip,
    public readonly newTrip: Trip
  ) {
    super();
  }
} 