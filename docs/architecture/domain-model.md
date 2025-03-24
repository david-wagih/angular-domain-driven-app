# Domain Model

This document describes the core domain model of our travel booking application.

## Core Concepts

### 1. Trip
The central entity representing a travel package.

```typescript
export class Trip {
  private constructor(
    private id: TripId,
    private title: string,
    private description: string,
    private imageUrl: string,
    private location: Location,
    private dateRange: DateRange,
    private price: Price,
    private maxParticipants: number,
    private currentParticipants: number,
    private rating: number,
    private tags: string[]
  ) {}

  // Factory method
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

  // Business logic methods
  hasAvailableSpots(): boolean {
    return this.currentParticipants < this.maxParticipants;
  }
}
```

### 2. User
Represents a system user with authentication and profile information.

```typescript
export class User {
  private constructor(
    private id: UserId,
    private email: Email,
    private password: Password,
    private username: string,
    private firstName: string,
    private lastName: string,
    private role: string,
    private preferences: UserPreferences
  ) {}

  // Factory method
  static create(
    email: Email,
    password: Password,
    username: string,
    firstName: string,
    lastName: string,
    role: string
  ): User {
    return new User(
      UserId.generate(),
      email,
      password,
      username,
      firstName,
      lastName,
      role,
      UserPreferences.createDefault()
    );
  }

  // Business logic methods
  isAdmin(): boolean {
    return this.role === 'admin';
  }
}
```

## Value Objects

### 1. Location
Represents a travel destination.

```typescript
export class Location {
  private constructor(
    private readonly city: string,
    private readonly country: string,
    private readonly coordinates?: { lat: number; lng: number }
  ) {}

  static create(
    city: string,
    country: string,
    coordinates?: { lat: number; lng: number }
  ): Location {
    if (!city || !country) {
      throw new Error('City and country are required');
    }
    return new Location(city, country, coordinates);
  }

  format(): string {
    return `${this.city}, ${this.country}`;
  }
}
```

### 2. DateRange
Represents a time period for a trip.

```typescript
export class DateRange {
  private constructor(
    private readonly startDate: Date,
    private readonly endDate: Date
  ) {}

  static create(startDate: Date, endDate: Date): DateRange {
    if (startDate >= endDate) {
      throw new Error('Start date must be before end date');
    }
    return new DateRange(startDate, endDate);
  }

  getDurationInDays(): number {
    return Math.ceil(
      (this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
}
```

### 3. Price
Represents monetary value.

```typescript
export class Price {
  private constructor(
    private readonly amount: number,
    private readonly currency: string
  ) {}

  static create(amount: number, currency: string): Price {
    if (amount < 0) {
      throw new Error('Price amount cannot be negative');
    }
    return new Price(amount, currency);
  }

  format(): string {
    return `${this.amount} ${this.currency}`;
  }
}
```

## Repositories

### 1. TripRepository
Manages trip persistence.

```typescript
export interface TripRepository {
  findById(id: TripId): Promise<Trip | null>;
  findAll(): Promise<Trip[]>;
  save(trip: Trip): Promise<void>;
  delete(id: TripId): Promise<void>;
  exists(id: TripId): Promise<boolean>;
}
```

### 2. UserRepository
Manages user persistence and authentication.

```typescript
export interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
  exists(id: UserId): Promise<boolean>;
  authenticate(credentials: LoginUserDto): Promise<{ user: User; token: string } | null>;
  validateToken(token: string): Promise<User | null>;
}
```

## Domain Services

### 1. TripService
Implements trip-related business logic.

```typescript
export class TripService {
  constructor(private tripRepository: TripRepository) {}

  async searchTrips(
    location?: string,
    startDate?: Date,
    endDate?: Date,
    maxPrice?: number
  ): Promise<Trip[]> {
    const trips = await this.tripRepository.findAll();
    return trips.filter(/* filtering logic */);
  }

  async bookTrip(tripId: TripId): Promise<void> {
    const trip = await this.tripRepository.findById(tripId);
    if (!trip) {
      throw new Error('Trip not found');
    }
    if (!trip.hasAvailableSpots()) {
      throw new Error('No available spots');
    }
    // Booking logic
  }
}
```

## Application Services

### 1. TripApplicationService
Orchestrates trip-related use cases.

```typescript
export class TripApplicationService {
  constructor(private tripService: TripService) {}

  async searchTrips(searchDto: SearchTripsDto): Promise<TripDto[]> {
    const trips = await this.tripService.searchTrips(
      searchDto.location?.toString(),
      searchDto.startDate,
      searchDto.endDate,
      searchDto.maxPrice?.amount
    );
    return trips.map(trip => this.mapToDto(trip));
  }
}
```

## DTOs

### 1. TripDto
Data transfer object for trips.

```typescript
export interface TripDto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: LocationDto;
  dateRange: DateRangeDto;
  price: PriceDto;
  maxParticipants: number;
  currentParticipants: number;
  rating: number;
  tags: string[];
}
```

### 2. UserDto
Data transfer object for users.

```typescript
export interface UserDto {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  preferences: UserPreferencesDto;
} 