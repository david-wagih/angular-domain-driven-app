# Architecture Overview

This document provides an overview of the application's architecture, which follows Domain-Driven Design (DDD) principles and Clean Architecture patterns.

## Architectural Layers

### 1. Domain Layer (`src/app/domain/`)
The core of the application, containing:
- **Entities**: Core business objects (e.g., `Trip`, `User`)
- **Value Objects**: Immutable objects representing concepts (e.g., `TripId`, `Email`, `Location`)
- **Domain Services**: Core business logic (e.g., `TripService`)
- **Repositories**: Interfaces for data access (e.g., `TripRepository`, `UserRepository`)
- **Domain Events**: Business events that can trigger actions

### 2. Application Layer (`src/app/application/`)
Orchestrates the domain objects to perform use cases:
- **Application Services**: Coordinates domain objects (e.g., `TripApplicationService`, `AuthService`)
- **DTOs**: Data transfer objects for external communication
- **Interfaces**: Ports for infrastructure adapters
- **Use Cases**: Application-specific business rules

### 3. Infrastructure Layer (`src/app/infrastructure/`)
Implements technical capabilities:
- **Repositories**: Concrete implementations (e.g., `MockTripRepository`, `MockUserRepository`)
- **External Services**: Third-party integrations
- **Persistence**: Data storage implementations
- **Authentication**: Security implementations

### 4. Presentation Layer (`src/app/modules/`)
User interface components:
- **Components**: UI components (e.g., `TripListComponent`, `ProfileComponent`)
- **Pages**: Route components
- **Facades**: UI state management (e.g., `TripFacade`)
- **Guards**: Route protection

## Key Design Patterns

### 1. Facade Pattern
Used to provide a simplified interface to complex subsystems:
```typescript
export class TripFacade {
  private tripsSubject = new BehaviorSubject<TripDto[]>([]);
  public trips$ = this.tripsSubject.asObservable();
  
  constructor(private tripApplicationService: TripApplicationService) {}
  
  async searchTrips(criteria: SearchTripsDto): Promise<void> {
    const trips = await this.tripApplicationService.searchTrips(criteria);
    this.tripsSubject.next(trips);
  }
}
```

### 2. Repository Pattern
Abstracts data persistence:
```typescript
export interface TripRepository {
  findById(id: TripId): Promise<Trip | null>;
  findAll(): Promise<Trip[]>;
  save(trip: Trip): Promise<void>;
  delete(id: TripId): Promise<void>;
}
```

### 3. Value Objects
Encapsulate domain concepts:
```typescript
export class Location {
  private constructor(
    private readonly city: string,
    private readonly country: string,
    private readonly coordinates?: { lat: number; lng: number }
  ) {}

  static create(city: string, country: string, coordinates?: { lat: number; lng: number }): Location {
    return new Location(city, country, coordinates);
  }
}
```

## Authentication Flow

1. **Login/Register**:
   - Uses `AuthService` in application layer
   - Validates credentials via `UserRepository`
   - Manages tokens and user state

2. **Route Protection**:
   - `AuthGuard` for protected routes
   - `NoAuthGuard` for auth routes
   - Token-based authentication

## State Management

1. **Application State**:
   - Services use repositories for persistence
   - DTOs for data transfer
   - Domain events for cross-cutting concerns

2. **UI State**:
   - Facades manage component state
   - RxJS observables for reactive updates
   - Local component state when appropriate

## Error Handling

1. **Domain Errors**:
   - Custom error classes for domain rules
   - Value object validation

2. **Application Errors**:
   - Service-level error handling
   - Error translation to user-friendly messages

3. **UI Error Handling**:
   - Facade error management
   - Error state in components
   - User feedback mechanisms

## Future Improvements

1. **Real Backend Integration**:
   - Replace mock repositories
   - Implement real API services

2. **Enhanced Security**:
   - JWT refresh tokens
   - Role-based access control

3. **Performance Optimization**:
   - Lazy loading optimization
   - State management improvements

## Module Structure

```
src/app/
├── domain/
│   ├── models/
│   ├── repositories/
│   └── services/
├── application/
│   ├── commands/
│   ├── queries/
│   └── services/
├── infrastructure/
│   ├── api/
│   └── repositories/
└── presentation/
    ├── components/
    ├── pages/
    └── shared/
``` 