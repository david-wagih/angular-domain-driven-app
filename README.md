# Angular Domain-Driven Design Application

This project demonstrates an Angular application built using Domain-Driven Design (DDD) principles. It includes user authentication, profile management, and a modular architecture that separates domain logic from infrastructure concerns.

## Architecture Overview

The application follows a layered architecture based on DDD:

```
src/
├── app/
│   ├── modules/               # Feature Modules (organized by domain)
│   │   ├── user/              # User Domain
│   │   └── auth/              # Auth Domain
│   ├── core/                  # Core Module (singleton services)
│   ├── application/           # Application Layer
│   │   ├── dtos/              # Data Transfer Objects
│   │   └── services/          # Application Services
│   ├── domain/                # Domain Layer
│   │   ├── entities/          # Domain Entities
│   │   ├── repositories/      # Repository Interfaces
│   │   ├── services/          # Domain Services
│   │   ├── exceptions/        # Domain Exceptions
│   │   ├── events/            # Domain Events
│   │   └── value-objects/     # Value Objects
│   └── infrastructure/        # Infrastructure Layer
│       ├── persistence/       # Repository Implementations
│       └── ui/                # UI Components
└── docs/                      # Documentation
```

## Key DDD Concepts Implemented

1. **Rich Domain Model**: Entities with behavior, not just data
2. **Value Objects**: Immutable objects representing concepts like Email, UserId, etc.
3. **Domain Events**: For cross-aggregate communication
4. **Repositories**: Interfaces in domain layer, implementations in infrastructure
5. **Domain Services**: Complex operations that don't naturally fit on entities
6. **Application Services**: Orchestration between UI and domain layer

## Features

- **User Management**:
  - Registration with validation
  - Authentication and session management
  - Profile management (address, phone, preferences)

- **Modular Structure**:
  - Core module for singletons
  - Feature modules for each domain
  - Lazy loading for better performance

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm (v8+)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/angular-domain-driven-app.git

# Navigate to project directory
cd angular-domain-driven-app

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:4200/` to see the application.

## Development Guidelines

See the [ADDING_FEATURES.md](./docs/ADDING_FEATURES.md) document for guidelines on how to add new features while adhering to the DDD principles.

## Key Technical Decisions

1. **Local Storage Persistence**: For simplicity, the application uses localStorage for persistence, but the architecture allows for easy replacement with real backend services.

2. **Module Organization**: Feature modules by domain with lazy loading.

3. **Core Module**: Singleton services like repositories are provided through the Core module.

4. **Event-Driven Communication**: Domain events for communication between bounded contexts.

5. **Standalone Components**: Leveraging Angular's standalone components where appropriate for better tree-shaking.

## Future Improvements

- Server-side rendering (SSR) support
- Integration with a real backend
- More sophisticated authentication
- Enhanced error handling
- Unit and integration tests
- CI/CD pipeline
