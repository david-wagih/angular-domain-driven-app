import { Injectable, Inject } from '@angular/core';
import { User } from '../entities/user.entity';
import { UserRepository, USER_REPOSITORY } from '../repositories/user.repository';
import { Email } from '../value-objects/email.value-object';
import { Password } from '../value-objects/password.value-object';
import { UserId } from '../value-objects/user-id.value-object';

@Injectable()
export class AuthService {
  private currentUser: User | null = null;

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async login(email: Email, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isUserActive()) {
      throw new Error('User account is deactivated');
    }

    if (password !== user.getPassword().toString()) {
      throw new Error('Invalid password');
    }

    this.currentUser = user;
    return user;
  }

  async register(
    username: string,
    email: Email,
    password: Password,
    firstName: string,
    lastName: string
  ): Promise<User> {
    if (await this.userRepository.existsByEmail(email)) {
      throw new Error('Email already exists');
    }

    if (await this.userRepository.existsByUsername(username)) {
      throw new Error('Username already exists');
    }

    const user = User.create(
      email,
      password,
      username,
      firstName,
      lastName
    );

    await this.userRepository.save(user);
    this.currentUser = user;
    return user;
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  async deactivateAccount(userId: UserId): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.deactivate();
    await this.userRepository.save(user);

    if (this.currentUser?.getId().equals(userId)) {
      this.logout();
    }
  }

  async activateAccount(userId: UserId): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.activate();
    await this.userRepository.save(user);
  }
} 