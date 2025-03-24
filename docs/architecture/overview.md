# Architecture Overview

## Domain-Driven Design Architecture

This application follows Domain-Driven Design (DDD) principles to organize and structure the codebase. The architecture is divided into several layers:

### 1. Domain Layer
- Contains business logic and rules
- Implements domain models and entities
- Defines interfaces for repositories
- Location: `src/app/domain`

### 2. Application Layer
- Orchestrates use cases
- Implements application services
- Handles business workflows
- Location: `src/app/application`

### 3. Infrastructure Layer
- Implements repositories
- Handles external services integration
- Manages data persistence
- Location: `src/app/infrastructure`

### 4. Presentation Layer
- Contains UI components
- Implements user interfaces
- Handles user interactions
- Location: `src/app/presentation`

## Key Design Patterns

1. **Repository Pattern**
   - Abstracts data persistence
   - Provides domain-oriented data access

2. **CQRS (Command Query Responsibility Segregation)**
   - Separates read and write operations
   - Improves scalability and maintainability

3. **Dependency Injection**
   - Manages dependencies
   - Enhances testability
   - Utilizes Angular's DI system

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