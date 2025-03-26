# Domain Model

This document describes the domain model implementation in our Angular v19 application using Domain-Driven Design (DDD) principles.

## Domain Structure

The domain layer is split into two levels:

1. **Shared Domain** (`src/app/domain/`)
   - Base entities and interfaces
   - Shared value objects
   - Cross-cutting domain concepts

2. **Feature-Specific Domains** (`src/app/modules/[feature]/domain/`)
   - Feature-specific entities
   - Feature-specific value objects
   - Feature-specific business logic

## Base Domain Classes

### 1. Entity Base
All domain entities extend this base class:

```typescript
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
```

### 2. Aggregate Root
For entities that are aggregate roots:

```typescript
export interface IAggregateRoot extends IEntity {
  version: number;
}

export abstract class AggregateRoot extends Entity implements IAggregateRoot {
  version: number = 1;

  constructor(partial: Partial<AggregateRoot>) {
    super(partial);
  }
}
```

## Feature Domain Example: Auth Module

### 1. Auth Entity
```typescript
export class User extends AggregateRoot {
  email: string;
  name: string;
  role: UserRole;

  private constructor(props: UserProps) {
    super(props);
    this.email = props.email;
    this.name = props.name;
    this.role = props.role;
  }

  static create(props: UserProps): User {
    return new User(props);
  }

  hasPermission(permission: Permission): boolean {
    return this.role.hasPermission(permission);
  }
}
```

### 2. Auth Value Objects
```typescript
export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Either<ValidationError, Email> {
    if (!email.includes('@')) {
      return left(new ValidationError('Invalid email format'));
    }
    return right(new Email(email));
  }

  getValue(): string {
    return this.value;
  }
}
```

### 3. Auth Domain Service
```typescript
@Injectable()
export class AuthDomainService {
  constructor(private userRepository: UserRepository) {}

  async validateCredentials(email: Email, password: Password): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return false;
    return user.validatePassword(password);
  }

  createAccessToken(user: User): string {
    return jwt.sign(
      { 
        id: user.id,
        email: user.email,
        role: user.role.value
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }
}
```

## Domain Events

### 1. Base Event
```typescript
export interface DomainEvent {
  occurredOn: Date;
  eventName: string;
}

export abstract class BaseDomainEvent implements DomainEvent {
  public readonly occurredOn: Date;
  public abstract readonly eventName: string;

  constructor() {
    this.occurredOn = new Date();
  }
}
```

### 2. Feature-Specific Events
```typescript
export class UserCreatedEvent extends BaseDomainEvent {
  public readonly eventName = 'UserCreated';

  constructor(public readonly user: User) {
    super();
  }
}
```

## Repository Pattern

### 1. Base Repository
```typescript
export abstract class BaseRepository<T extends Entity> {
  abstract findById(id: string): Observable<T>;
  abstract findAll(): Observable<T[]>;
  abstract save(entity: T): Observable<T>;
  abstract delete(id: string): Observable<void>;
}
```

### 2. Feature Repository Implementation
```typescript
@Injectable()
export class AuthRepository extends BaseRepository<User> {
  constructor(private http: HttpClient) {
    super();
  }

  findById(id: string): Observable<User> {
    return this.http.get<UserDto>(`/api/users/${id}`).pipe(
      map(dto => User.create(dto))
    );
  }

  // ... other implementations
}
```

## Domain Facades

Domain facades coordinate between the domain and application layers:

```typescript
@Injectable()
export class AuthFacade {
  constructor(
    private authDomainService: AuthDomainService,
    private authRepository: AuthRepository,
    private eventBus: EventBus
  ) {}

  async login(credentials: LoginCredentials): Promise<Either<AuthError, User>> {
    const emailOrError = Email.create(credentials.email);
    const passwordOrError = Password.create(credentials.password);

    if (emailOrError.isLeft() || passwordOrError.isLeft()) {
      return left(new ValidationError('Invalid credentials format'));
    }

    const isValid = await this.authDomainService.validateCredentials(
      emailOrError.value,
      passwordOrError.value
    );

    if (!isValid) {
      return left(new AuthError('Invalid credentials'));
    }

    const user = await this.authRepository.findByEmail(emailOrError.value);
    const token = this.authDomainService.createAccessToken(user);

    this.eventBus.publish(new UserLoggedInEvent(user));

    return right(user);
  }
}
```

## Testing Domain Logic

### 1. Entity Tests
```typescript
describe('User', () => {
  it('should create a valid user', () => {
    const userProps = {
      email: 'test@example.com',
      name: 'Test User',
      role: UserRole.create('USER')
    };

    const user = User.create(userProps);

    expect(user).toBeDefined();
    expect(user.email).toBe(userProps.email);
  });

  it('should validate permissions correctly', () => {
    const user = User.create({
      role: UserRole.create('ADMIN')
    });

    expect(user.hasPermission('READ_USERS')).toBe(true);
  });
});
```

### 2. Value Object Tests
```typescript
describe('Email', () => {
  it('should create a valid email', () => {
    const emailOrError = Email.create('test@example.com');
    expect(emailOrError.isRight()).toBe(true);
  });

  it('should reject invalid email format', () => {
    const emailOrError = Email.create('invalid-email');
    expect(emailOrError.isLeft()).toBe(true);
  });
}); 