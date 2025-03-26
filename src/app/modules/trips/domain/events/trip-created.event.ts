import { BaseDomainEvent } from '../../../../domain/base/event.base';
import { Trip } from '../entities/trip.entity';

export class TripCreatedEvent extends BaseDomainEvent {
  public readonly eventName = 'TripCreated';

  constructor(public readonly trip: Trip) {
    super();
  }
} 