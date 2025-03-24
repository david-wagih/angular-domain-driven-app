# Angular Domain-Driven Travel App

A modern Angular application built using Domain-Driven Design principles, showcasing best practices in architecture and development. This application demonstrates a travel booking system with features like trip searching, booking, and user profile management.

## Features

- **Domain-Driven Design Architecture**
  - Clean separation of concerns
  - Rich domain model
  - Value objects for domain concepts
  - Repository pattern for data access

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control
  - Protected routes
  - User profile management

- **Trip Management**
  - Trip search with filters
  - Trip booking system
  - Rating and reviews
  - Location-based search

- **Modern Angular Features**
  - Standalone components
  - Lazy loading
  - Dependency injection
  - Reactive forms
  - Route guards

- **Clean Architecture**
  - Domain layer isolation
  - Application services
  - Infrastructure abstractions
  - DTO pattern
  - Facade pattern for UI

## Project Structure

```
angular-domain-driven-app/
├── src/
│   ├── app/
│   │   ├── domain/              # Domain layer
│   │   │   ├── entities/        # Domain entities
│   │   │   ├── value-objects/   # Value objects
│   │   │   ├── repositories/    # Repository interfaces
│   │   │   └── services/        # Domain services
│   │   │
│   │   ├── application/         # Application layer
│   │   │   ├── services/        # Application services
│   │   │   └── dtos/           # Data transfer objects
│   │   │
│   │   ├── infrastructure/      # Infrastructure layer
│   │   │   ├── persistence/     # Repository implementations
│   │   │   └── services/        # External service implementations
│   │   │
│   │   └── modules/            # Feature modules
│   │       ├── auth/           # Authentication
│   │       ├── trips/          # Trip management
│   │       ├── user/           # User profile
│   │       └── shared/         # Shared components
│   │
│   ├── assets/                 # Static assets
│   └── environments/           # Environment configurations
│
├── docs/                       # Documentation
│   ├── architecture/           # Architecture docs
│   └── development/           # Development guides
│
└── README.md                  # Project overview
```

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/angular-domain-driven-app.git
   cd angular-domain-driven-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200`

## Key Concepts

### Domain Layer
- **Entities**: `Trip`, `User`
- **Value Objects**: `Location`, `DateRange`, `Price`
- **Repositories**: `TripRepository`, `UserRepository`
- **Domain Services**: `TripService`

### Application Layer
- **Application Services**: `TripApplicationService`, `AuthService`
- **DTOs**: `TripDto`, `UserDto`, `SearchTripsDto`

### Infrastructure Layer
- **Mock Repositories**: `MockTripRepository`, `MockUserRepository`
- **Services**: `AuthInterceptor`

### Presentation Layer
- **Components**: Standalone Angular components
- **Facades**: UI state management
- **Guards**: Route protection

## Documentation

For detailed documentation, see:
- [Architecture Overview](docs/architecture/overview.md)
- [Domain Model](docs/architecture/domain-model.md)
- [Development Guide](docs/development/getting-started.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 