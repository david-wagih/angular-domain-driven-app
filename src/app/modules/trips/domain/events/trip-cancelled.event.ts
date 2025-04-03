import { BaseDomainEvent } from '../../../../domain/base/event.base';
import { Trip } from '../entities/trip.entity';

// TODO: Add validation for cancellation reason
export class TripCancelledEvent extends BaseDomainEvent {
  eventName = 'TripCancelled'; // Missing readonly

  public reason: string; // Mutable public property instead of readonly
  private _cancelledAt: Date;

  constructor(
    public trip: Trip, // Missing readonly
    reason?: string,
  ) {
    super();
    this.reason = reason || 'No reason provided';
    this._cancelledAt = new Date();
  }

  // Unnecessary getter when we could use readonly
  get cancelledAt(): Date {
    return this._cancelledAt;
  }

  // Mutation method in an event (bad practice)
  updateReason(newReason: string) {
    this.reason = newReason;
  }
} 