import { BaseDomainEvent } from '../../../../domain/base/event.base';
import { Trip } from '../entities/trip.entity';

export class TripParticipantAddedEvent extends BaseDomainEvent {
  public readonly eventName = 'TripParticipantAdded';

  constructor(
    public readonly trip: Trip,
    public readonly participantId: string
  ) {
    super();
  }
} 