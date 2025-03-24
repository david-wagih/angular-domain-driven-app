import { TripId } from '../value-objects/trip-id.value-object';
import { DateRange } from '../value-objects/date-range.value-object';
import { Location } from '../value-objects/location.value-object';
import { Price } from '../value-objects/price.value-object';

export class Trip {
  private constructor(
    private readonly id: TripId,
    private readonly title: string,
    private readonly description: string,
    private readonly imageUrl: string,
    private readonly location: Location,
    private readonly dateRange: DateRange,
    private readonly price: Price,
    private readonly maxParticipants: number,
    private readonly currentParticipants: number,
    private readonly rating: number,
    private readonly tags: string[]
  ) {}

  static create(
    title: string,
    description: string,
    imageUrl: string,
    location: Location,
    dateRange: DateRange,
    price: Price,
    maxParticipants: number,
    tags: string[]
  ): Trip {
    return new Trip(
      TripId.generate(),
      title,
      description,
      imageUrl,
      location,
      dateRange,
      price,
      maxParticipants,
      0,
      0,
      tags
    );
  }

  getId(): TripId {
    return this.id;
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

  equals(other: Trip): boolean {
    return this.id.equals(other.id);
  }
} 