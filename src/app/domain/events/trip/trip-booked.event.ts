import { DomainEvent } from '../../events/event';
import { TripId } from '../../value-objects/trip-id.value-object';
import { UserId } from '../../value-objects/user-id.value-object';

export class TripBookedEvent extends DomainEvent {
  constructor(
    public readonly tripId: TripId,
    public readonly userId: UserId,
    public readonly bookedAt: Date
  ) {
    super();
  }
} 