# Adding New Features to the DDD Angular Application

This guide outlines the steps to follow when adding new features to our Domain-Driven Design (DDD) Angular application.

## Updated Project Structure

```
src/
├── app/
│   ├── modules/               # Feature Modules (organized by domain)
│   │   ├── user/             # User Domain
│   │   │   ├── user.module.ts
│   │   │   └── user.routes.ts
│   │   └── auth/             # Auth Domain
│   │       ├── auth.module.ts
│   │       └── auth.routes.ts
│   ├── core/                 # Core Module (singleton services)
│   │   └── core.module.ts
│   ├── application/           # Application Layer
│   │   ├── dtos/             # Data Transfer Objects
│   │   └── services/         # Application Services
│   ├── domain/               # Domain Layer
│   │   ├── entities/         # Domain Entities
│   │   ├── repositories/     # Repository Interfaces
│   │   ├── services/         # Domain Services
│   │   ├── exceptions/       # Domain Exceptions
│   │   ├── events/           # Domain Events
│   │   └── value-objects/    # Value Objects
│   └── infrastructure/       # Infrastructure Layer
│       ├── persistence/      # Repository Implementations
│       └── ui/               # UI Components
│           ├── components/   # Reusable UI Components
│           └── pages/        # Page Components
```

## Steps to Add a New Feature

### 1. Define Domain Concepts

First, identify the domain concepts for your feature:

1. **Entities**: Objects with unique identities (e.g., User, Order)
2. **Value Objects**: Immutable objects without identity (e.g., Email, Address)
3. **Aggregates**: Clusters of related objects (e.g., Order with OrderItems)
4. **Domain Services**: Operations that don't naturally fit on entities
5. **Domain Events**: Events that occur within your domain

Example Domain Event:
```typescript
export class UserProfileUpdatedEvent extends DomainEvent {
  constructor(
    public readonly userId: UserId,
    public readonly oldUser: User,
    public readonly newUser: User
  ) {
    super();
  }
}
```

### 2. Create Domain Exceptions

Define specific exceptions for your domain:

```typescript
export class UserNotFoundException extends DomainException {
  constructor(userId: UserId | string) {
    super(`User with ID ${userId.toString()} not found`);
    Object.setPrototypeOf(this, UserNotFoundException.prototype);
  }
}
```

### 3. Create Repository Interface

Define the repository interface in the domain layer:

```typescript
// domain/repositories/user.repository.ts
export interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  save(user: User): Promise<void>;
  // ... other methods
}
```

### 4. Implement Repository

Create the repository implementation in the infrastructure layer:

```typescript
// infrastructure/persistence/local-storage-user.repository.ts
@Injectable()
export class LocalStorageUserRepository implements UserRepository {
  // Implementation
}
```

### 5. Register Repository in Core Module

Update the core module to provide the repository:

```typescript
@NgModule({
  providers: [
    // ...other providers
    {
      provide: USER_REPOSITORY,
      useClass: LocalStorageUserRepository
    }
  ]
})
export class CoreModule { }
```

### 6. Create Application DTOs

Define DTOs for data transfer between layers:

```typescript
// application/dtos/user.dto.ts
export interface UserDto {
  id: string;
  email: string;
  // ... other properties
}
```

### 7. Create Application Service

Implement the application service to coordinate between UI and domain:

```typescript
// application/services/user.service.ts
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventDispatcher: EventDispatcher
  ) {}

  async updateProfile(dto: UpdateProfileDto): Promise<void> {
    // Implementation that uses domain events
  }
}
```

### 8. Create Feature Module and Routes

Create a feature module for your domain:

```typescript
// modules/feature/feature.module.ts
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(featureRoutes)
  ],
  providers: [
    FeatureService
  ]
})
export class FeatureModule { }

// modules/feature/feature.routes.ts
export const featureRoutes: Routes = [
  { path: '', component: FeatureComponent }
];
```

### 9. Create UI Components

Create the UI components in the infrastructure layer:

```typescript
// infrastructure/ui/components/feature/feature.component.ts
@Component({
  selector: 'app-feature',
  standalone: true,
  // ... component configuration
})
export class FeatureComponent {
  // Implementation
}
```

### 10. Update Main Routes

Update the main application routes to include your feature module:

```typescript
// app.routes.ts
export const routes: Routes = [
  // Existing routes
  { 
    path: 'feature', 
    loadChildren: () => import('./modules/feature/feature.module').then(m => m.FeatureModule) 
  }
];
```

## Module Organization

Our application is organized into several main modules:

### 1. AppModule
- Root module that bootstraps the application
- Imports CoreModule and sets up main routes

### 2. CoreModule
- Contains singleton services
- Repository providers
- Application-wide event handling
- Guards to prevent importing it multiple times

### 3. Feature Modules
- Organized by domain (User, Auth, etc.)
- Lazy-loaded for better performance
- Each feature has its own routing
- Declare their own providers that are specific to the feature

### 4. Shared Module
- Reusable components, directives, and pipes
- No services (to avoid singleton issues)
- Imported by feature modules as needed

## Best Practices

### 1. Domain Layer
- Keep domain objects immutable
- Use value objects for primitive types
- Implement rich domain models
- Use domain events for side effects
- Keep domain logic pure
- Create specific domain exceptions

### 2. Application Layer
- Use DTOs for data transfer
- Handle transactions
- Coordinate between domain objects
- Don't contain business logic
- Dispatch domain events

### 3. Infrastructure Layer
- Implement repository interfaces
- Handle external services
- Manage UI state
- Handle routing

### 4. General Guidelines
- Follow SOLID principles
- Use dependency injection
- Keep components small and focused
- Use TypeScript's type system effectively
- Write unit tests for each layer
- Organize by domain first, then by technical layer
- Lazy load feature modules for better performance
- Use standalone components for better tree shaking

## Example: Adding a New Feature

Let's say we want to add a "User Profile" feature:

1. **Domain Layer**:
   ```typescript
   // events/user/user-profile-updated.event.ts
   export class UserProfileUpdatedEvent extends DomainEvent {
     // Implementation
   }

   // entities/user.entity.ts
   export class User {
     // Add event-related methods
     addDomainEvent(event: DomainEvent): void {
       this.domainEvents.push(event);
     }
   }
   ```

2. **Repository**:
   ```typescript
   // repositories/user.repository.ts
   export interface UserRepository {
     updateProfile(user: User): Promise<void>;
   }
   ```

3. **DTOs**:
   ```typescript
   // dtos/profile.dto.ts
   export interface ProfileDto {
     address: AddressDto;
     phoneNumber: PhoneNumberDto;
   }
   ```

4. **Application Service**:
   ```typescript
   // services/profile.service.ts
   @Injectable()
   export class ProfileService {
     async updateAddress(addressDto: AddressDto): Promise<void> {
       // Implementation with events
     }
   }
   ```

5. **Feature Module**:
   ```typescript
   // modules/user/user.module.ts
   @NgModule({
     imports: [
       CommonModule,
       FormsModule,
       RouterModule.forChild(userRoutes)
     ],
     providers: [
       ProfileService
     ]
   })
   export class UserModule { }
   ```

6. **UI Components**:
   ```typescript
   // components/profile-form/profile-form.component.ts
   @Component({
     selector: 'app-profile-form',
     template: `...`
   })
   export class ProfileFormComponent {
     // Implementation
   }
   ```

## Testing

Each layer should have its own tests:

1. **Domain Tests**:
   - Test entity behavior
   - Test value object validation
   - Test domain services
   - Test domain events

2. **Application Tests**:
   - Test application services
   - Test DTO transformations
   - Test use cases
   - Test event handling

3. **Infrastructure Tests**:
   - Test repository implementations
   - Test UI components
   - Test routing

## Common Pitfalls to Avoid

1. **Leaking Domain Logic**:
   - Don't put business rules in UI components
   - Don't skip the application layer

2. **Poor Encapsulation**:
   - Don't expose domain objects directly to UI
   - Use DTOs for data transfer

3. **Incorrect Layer Dependencies**:
   - Domain layer should not depend on other layers
   - Infrastructure layer should implement domain interfaces

4. **Missing Value Objects**:
   - Don't use primitive types for domain concepts
   - Create value objects for validation and behavior

5. **Not Using Domain Events**:
   - Use domain events for cross-aggregate communication
   - Avoid direct references between aggregates

6. **Module Organization Issues**:
   - Don't register repositories in multiple places
   - Use CoreModule for singletons
   - Lazy load feature modules
   - Don't duplicate routes

## Conclusion

Following these steps and best practices will help maintain a clean, maintainable, and scalable application structure. Remember to:

1. Start with domain concepts
2. Use proper layering
3. Follow DDD principles
4. Write tests
5. Keep components focused
6. Use TypeScript effectively
7. Organize by domain first, then by layer
8. Use domain events for communication
9. Properly organize modules
10. Avoid duplicate route definitions 