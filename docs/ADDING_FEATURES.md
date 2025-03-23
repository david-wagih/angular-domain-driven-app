# Adding New Features to the DDD Angular Application

This guide outlines the steps to follow when adding new features to our Domain-Driven Design (DDD) Angular application.

## Project Structure

```
src/
├── app/
│   ├── application/           # Application Layer
│   │   ├── dtos/             # Data Transfer Objects
│   │   └── services/         # Application Services
│   ├── domain/               # Domain Layer
│   │   ├── entities/         # Domain Entities
│   │   ├── repositories/     # Repository Interfaces
│   │   ├── services/         # Domain Services
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

Example:
```typescript
// Value Object
export class Email {
  private constructor(private readonly value: string) {
    this.validate();
  }

  static create(value: string): Email {
    return new Email(value);
  }

  private validate(): void {
    // Validation logic
  }
}

// Entity
export class User {
  private constructor(
    private readonly id: UserId,
    private readonly email: Email,
    // ... other properties
  ) {}
}
```

### 2. Create Repository Interface

Define the repository interface in the domain layer:

```typescript
// domain/repositories/user.repository.ts
export interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  save(user: User): Promise<void>;
  // ... other methods
}
```

### 3. Implement Repository

Create the repository implementation in the infrastructure layer:

```typescript
// infrastructure/persistence/local-storage-user.repository.ts
@Injectable()
export class LocalStorageUserRepository implements UserRepository {
  // Implementation
}
```

### 4. Create Application DTOs

Define DTOs for data transfer between layers:

```typescript
// application/dtos/user.dto.ts
export interface UserDto {
  id: string;
  email: string;
  // ... other properties
}
```

### 5. Create Application Service

Implement the application service to coordinate between UI and domain:

```typescript
// application/services/user.service.ts
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async updateProfile(dto: UpdateProfileDto): Promise<void> {
    // Implementation
  }
}
```

### 6. Create UI Components

Create the UI components in the infrastructure layer:

```typescript
// infrastructure/ui/components/profile-form/profile-form.component.ts
@Component({
  selector: 'app-profile-form',
  standalone: true,
  // ... component configuration
})
export class ProfileFormComponent {
  // Implementation
}
```

### 7. Add Routing

Update the application routes:

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  // ... other routes
];
```

## Best Practices

### 1. Domain Layer
- Keep domain objects immutable
- Use value objects for primitive types
- Implement rich domain models
- Use domain events for side effects
- Keep domain logic pure

### 2. Application Layer
- Use DTOs for data transfer
- Handle transactions
- Coordinate between domain objects
- Don't contain business logic

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

## Example: Adding a New Feature

Let's say we want to add a "User Profile" feature:

1. **Domain Layer**:
   ```typescript
   // value-objects/address.value-object.ts
   export class Address {
     // Implementation
   }

   // entities/user.entity.ts
   export class User {
     // Add profile-related methods
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
     async updateProfile(dto: ProfileDto): Promise<void> {
       // Implementation
     }
   }
   ```

5. **UI Components**:
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

2. **Application Tests**:
   - Test application services
   - Test DTO transformations
   - Test use cases

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

## Conclusion

Following these steps and best practices will help maintain a clean, maintainable, and scalable application structure. Remember to:

1. Start with domain concepts
2. Use proper layering
3. Follow DDD principles
4. Write tests
5. Keep components focused
6. Use TypeScript effectively 