# Architecture Overview

This document provides an overview of the application's architecture, which follows Domain-Driven Design (DDD) principles and Clean Architecture patterns in Angular v19.

## Project Structure

The application is organized into two main areas:
1. Cross-cutting concerns at the application level
2. Feature-specific modules

### Application-Level Structure (`src/app/`)

```
src/app/
├── domain/                 # Shared domain concepts
│   ├── base/              # Base entities and interfaces
│   └── value-objects/     # Shared value objects
├── application/           # Cross-cutting application concerns
│   └── dtos/             # Shared DTOs and interfaces
└── infrastructure/        # Technical capabilities
    ├── api/              # Base API configuration
    ├── auth/             # Core auth infrastructure
    ├── guards/           # Shared guards
    ├── interceptors/     # Global interceptors
    ├── logging/          # Application-wide logging
    ├── persistence/      # Global persistence
    └── storage/          # Shared storage utilities
```

### Feature Module Structure (`src/app/modules/`)

Each feature module follows this structure:
```
modules/feature-name/
├── data-access/          # State management and API communication
│   ├── dtos/            # Feature-specific DTOs
│   ├── repository/      # Data access implementation
│   ├── store/           # State management
│   └── service/         # Data services
├── domain/              # Feature-specific domain logic
│   ├── entities/        # Domain entities
│   ├── value-objects/   # Domain value objects
│   ├── services/        # Domain services
│   └── facades/         # Domain facades
├── feature-*/           # Specific features within the module
│   └── components/      # Feature components
├── ui/                  # Presentational components
│   └── components/      # Shared UI components
└── shared/              # Shared utilities and types
```

## Base Classes and Interfaces

### Domain Layer Base Classes

```typescript
// Base Entity
export interface IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class Entity implements IEntity {
  id!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(partial: Partial<Entity>) {
    Object.assign(this, partial);
  }

  equals(entity: Entity): boolean {
    if (!(entity instanceof Entity)) return false;
    return this.id === entity.id;
  }
}

// Aggregate Root
export interface IAggregateRoot extends IEntity {
  version: number;
}

export abstract class AggregateRoot extends Entity implements IAggregateRoot {
  version: number = 1;
}
```

### Application Layer DTOs

```typescript
// Base DTOs
export interface BaseDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ErrorResponse {
  message: string;
  code: string;
  errors?: Record<string, string[]>;
}
```

## Key Design Patterns

### 1. Repository Pattern
Each feature module implements its own repository that extends the base repository:

```typescript
export abstract class BaseRepository<T extends Entity> {
  abstract findById(id: string): Observable<T>;
  abstract findAll(): Observable<T[]>;
  abstract save(entity: T): Observable<T>;
  abstract delete(id: string): Observable<void>;
}
```

### 2. Facade Pattern
Feature modules use facades to coordinate between UI and domain:

```typescript
@Injectable()
export class FeatureFacade {
  private state$ = new BehaviorSubject<FeatureState>(initialState);
  
  constructor(
    private repository: FeatureRepository,
    private service: FeatureService
  ) {}

  // State selectors
  select = {
    data: () => this.state$.pipe(map(state => state.data)),
    loading: () => this.state$.pipe(map(state => state.loading))
  };

  // Commands
  async loadData(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const data = await this.service.getData();
      this.updateState({ data, loading: false });
    } catch (error) {
      this.updateState({ error, loading: false });
    }
  }

  private updateState(partial: Partial<FeatureState>): void {
    this.state$.next({ ...this.state$.value, ...partial });
  }
}
```

### 3. Store Pattern
Feature-specific state management using RxJS:

```typescript
@Injectable()
export class FeatureStore {
  private state$ = new BehaviorSubject<FeatureState>(initialState);

  // Selectors
  select = {
    state: () => this.state$.asObservable(),
    data: () => this.state$.pipe(map(state => state.data))
  };

  // Actions
  setData(data: any): void {
    this.state$.next({ ...this.state$.value, data });
  }
}
```

## Module Communication

1. **Event-based Communication**:
   - Domain events for cross-module communication
   - RxJS subjects for state updates

2. **Shared Services**:
   - Infrastructure services for cross-cutting concerns
   - Shared utilities and helpers

## Testing Strategy

1. **Unit Tests**:
   - Domain entities and value objects
   - Services and facades
   - UI components

2. **Integration Tests**:
   - Feature module integration
   - API communication
   - State management

3. **E2E Tests**:
   - User flows
   - Critical paths

## Future Improvements

1. **Micro-frontends**:
   - Module federation
   - Independent deployments

2. **Performance**:
   - State management optimization
   - Lazy loading strategies

3. **Developer Experience**:
   - Generator schematics
   - Documentation improvements

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