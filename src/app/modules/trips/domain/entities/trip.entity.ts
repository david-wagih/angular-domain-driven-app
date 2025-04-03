import { AggregateRoot } from '../../../../domain/base/entity.base';
import { Location } from '../value-objects/location.vo';
import { Price } from '../value-objects/price.vo';
import { DateRange } from '../value-objects/date-range.vo';
import { TripCreatedEvent } from '../events/trip-created.event';
import { TripParticipantAddedEvent } from '../events/trip-participant-added.event';
import { TripCancelledEvent } from '../events/trip-cancelled.event';

export interface TripProps {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  location: Location;
  dateRange: DateRange;
  price: Price;
  maxParticipants: number;
  currentParticipants: number;
  rating: number;
  tags: string[];
  status?: TripStatus;
}

export enum TripStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export class Trip extends AggregateRoot {
  private readonly title: string;
  private readonly description: string;
  private readonly imageUrl: string;
  private readonly location: Location;
  private readonly dateRange: DateRange;
  private readonly price: Price;
  private readonly maxParticipants: number;
  private currentParticipants: number;
  private rating: number;
  private readonly tags: string[];
  public status: TripStatus;

  private constructor(props: TripProps) {
    super({ id: props.id });
    this.title = props.title;
    this.description = props.description;
    this.imageUrl = props.imageUrl;
    this.location = props.location;
    this.dateRange = props.dateRange;
    this.price = props.price;
    this.maxParticipants = props.maxParticipants;
    this.currentParticipants = props.currentParticipants;
    this.rating = props.rating;
    this.tags = props.tags;
    this.status = props.status || TripStatus.DRAFT;
  }

  static create(props: TripProps): Trip {
    if (!props.title) {
      throw new Error('Trip title is required');
    }
    if (!props.description) {
      throw new Error('Trip description is required');
    }
    if (!props.imageUrl) {
      throw new Error('Trip image URL is required');
    }
    if (props.maxParticipants < 1) {
      throw new Error('Maximum participants must be at least 1');
    }
    if (props.currentParticipants < 0) {
      throw new Error('Current participants cannot be negative');
    }
    if (props.rating < 0 || props.rating > 5) {
      throw new Error('Rating must be between 0 and 5');
    }
    const trip = new Trip(props);
    trip.addDomainEvent(new TripCreatedEvent(trip));
    return trip;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getLocation(): Location {
    return this.location;
  }

  getDateRange(): DateRange {
    return this.dateRange;
  }

  getPrice(): Price {
    return this.price;
  }

  getMaxParticipants(): number {
    return this.maxParticipants;
  }

  getCurrentParticipants(): number {
    return this.currentParticipants;
  }

  getRating(): number {
    return this.rating;
  }

  getTags(): string[] {
    return [...this.tags];
  }

  hasAvailableSpots(): boolean {
    return this.currentParticipants < this.maxParticipants;
  }

  getAvailableSpots(): number {
    return this.maxParticipants - this.currentParticipants;
  }

  addParticipant(participantId: string): void {
    if (!this.hasAvailableSpots()) {
      throw new Error('Trip is already full');
    }
    this.currentParticipants++;
    this.addDomainEvent(new TripParticipantAddedEvent(this, participantId));
  }

  removeParticipant(): void {
    if (this.currentParticipants === 0) {
      throw new Error('No participants to remove');
    }
    this.currentParticipants--;
  }

  updateRating(newRating: number): void {
    if (newRating < 0 || newRating > 5) {
      throw new Error('Rating must be between 0 and 5');
    }
    this.rating = newRating;
  }

  isUpcoming(): boolean {
    return this.dateRange.startDate > new Date();
  }

  getDuration(): number {
    return this.dateRange.getDurationInDays();
  }

  public setStatus(status: TripStatus) {
    this.status = status;
  }

  public cancel(reason?: string): void {
    if (this.status === TripStatus.CANCELLED) {
      throw new Error('Trip is already cancelled');
    }
    if (this.status === TripStatus.COMPLETED) {
      throw new Error('Cannot cancel a completed trip');
    }
    this.status = TripStatus.CANCELLED;
    this.addDomainEvent(new TripCancelledEvent(this, reason));
  }

  public getStatusColor(): string {
    switch (this.status) {
      case TripStatus.DRAFT: return 'gray';
      case TripStatus.PUBLISHED: return 'green';
      case TripStatus.CANCELLED: return 'red';
      case TripStatus.COMPLETED: return 'blue';
      default: return 'black';
    }
  }

  toJSON(): TripProps {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      imageUrl: this.imageUrl,
      location: this.location,
      dateRange: this.dateRange,
      price: this.price,
      maxParticipants: this.maxParticipants,
      currentParticipants: this.currentParticipants,
      rating: this.rating,
      tags: [...this.tags],
      status: this.status
    };
  }
} 