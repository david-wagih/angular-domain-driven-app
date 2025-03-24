import { Email } from "../value-objects/email.value-object";
import { Password } from "../value-objects/password.value-object";
import { UserId } from "../value-objects/user-id.value-object";
import { Address } from '../value-objects/address.value-object';
import { PhoneNumber } from '../value-objects/phone-number.value-object';
import { UserPreferences } from '../value-objects/user-preferences.value-object';
import { DomainEvent } from '../events/domain-event';
import { UserProfileUpdatedEvent } from '../events/user/user-profile-updated.event';

export class User {
  private domainEvents: DomainEvent[] = [];
  private role: 'user' | 'admin' = 'user';

  private constructor(
    private readonly id: UserId,
    private readonly email: Email,
    private readonly password: Password,
    private readonly username: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly isActive: boolean,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
    private address?: Address,
    private phoneNumber?: PhoneNumber,
    private preferences?: UserPreferences
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.username || this.username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }
    if (!this.firstName) {
      throw new Error('First name is required');
    }
    if (!this.lastName) {
      throw new Error('Last name is required');
    }
  }

  static create(
    email: Email,
    password: Password,
    username: string,
    firstName: string,
    lastName: string,
    role: 'user' | 'admin' = 'user'
  ): User {
    const now = new Date();
    const user = new User(
      UserId.generate(),
      email,
      password,
      username.trim(),
      firstName.trim(),
      lastName.trim(),
      true,
      now,
      now
    );
    user.role = role;
    return user;
  }

  getId(): UserId {
    return this.id;
  }

  getEmail(): Email {
    return this.email;
  }

  getPassword(): Password {
    return this.password;
  }

  getUsername(): string {
    return this.username;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  isUserActive(): boolean {
    return this.isActive;
  }

  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  getUpdatedAt(): Date {
    return new Date(this.updatedAt);
  }

  getAddress(): Address | undefined {
    return this.address;
  }

  getPhoneNumber(): PhoneNumber | undefined {
    return this.phoneNumber;
  }

  getPreferences(): UserPreferences | undefined {
    return this.preferences;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  // Domain events
  addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  clearDomainEvents(): void {
    this.domainEvents = [];
  }

  getDomainEvents(): DomainEvent[] {
    return [...this.domainEvents];
  }

  updateProfile(firstName: string, lastName: string): User {
    const oldUser = this;
    const updatedUser = new User(
      this.id,
      this.email,
      this.password,
      this.username,
      firstName.trim(),
      lastName.trim(),
      this.isActive,
      this.createdAt,
      new Date(),
      this.address,
      this.phoneNumber,
      this.preferences
    );
    updatedUser.domainEvents.push(new UserProfileUpdatedEvent(this.id, oldUser, updatedUser));
    return updatedUser;
  }

  updateAddress(address: Address): User {
    const oldUser = this;
    const updatedUser = new User(
      this.id,
      this.email,
      this.password,
      this.username,
      this.firstName,
      this.lastName,
      this.isActive,
      this.createdAt,
      new Date(),
      address,
      this.phoneNumber,
      this.preferences
    );
    updatedUser.domainEvents.push(new UserProfileUpdatedEvent(this.id, oldUser, updatedUser));
    return updatedUser;
  }

  updatePhoneNumber(phoneNumber: PhoneNumber): User {
    const oldUser = this;
    const updatedUser = new User(
      this.id,
      this.email,
      this.password,
      this.username,
      this.firstName,
      this.lastName,
      this.isActive,
      this.createdAt,
      new Date(),
      this.address,
      phoneNumber,
      this.preferences
    );
    updatedUser.domainEvents.push(new UserProfileUpdatedEvent(this.id, oldUser, updatedUser));
    return updatedUser;
  }

  updatePreferences(preferences: UserPreferences): User {
    const oldUser = this;
    const updatedUser = new User(
      this.id,
      this.email,
      this.password,
      this.username,
      this.firstName,
      this.lastName,
      this.isActive,
      this.createdAt,
      new Date(),
      this.address,
      this.phoneNumber,
      preferences
    );
    updatedUser.domainEvents.push(new UserProfileUpdatedEvent(this.id, oldUser, updatedUser));
    return updatedUser;
  }

  validatePassword(password: Password): boolean {
    return this.password.equals(password);
  }

  changePassword(newPassword: Password): User {
    return new User(
      this.id,
      this.email,
      newPassword,
      this.username,
      this.firstName,
      this.lastName,
      this.isActive,
      this.createdAt,
      new Date(),
      this.address,
      this.phoneNumber,
      this.preferences
    );
  }

  deactivate(): User {
    return new User(
      this.id,
      this.email,
      this.password,
      this.username,
      this.firstName,
      this.lastName,
      false,
      this.createdAt,
      new Date(),
      this.address,
      this.phoneNumber,
      this.preferences
    );
  }

  activate(): User {
    return new User(
      this.id,
      this.email,
      this.password,
      this.username,
      this.firstName,
      this.lastName,
      true,
      this.createdAt,
      new Date(),
      this.address,
      this.phoneNumber,
      this.preferences
    );
  }

  equals(other: User): boolean {
    return this.id.equals(other.id);
  }
} 