import { Injectable } from '@angular/core';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserId } from '../../domain/value-objects/user-id.value-object';
import { Email } from '../../domain/value-objects/email.value-object';
import { Password } from '../../domain/value-objects/password.value-object';
import { RegisterUserDto, LoginUserDto } from '../../modules/auth/data-access/dtos/user.dto';
@Injectable({
  providedIn: 'root'
})
export class MockUserRepository implements UserRepository {
  private users: User[] = [
    User.create(
      new Email('john.doe@example.com'),
      new Password('Password123'),
      'johndoe',
      'John',
      'Doe',
      'user'
    ),
    User.create(
      new Email('admin@example.com'),
      new Password('Admin123'),
      'admin',
      'Admin',
      'User',
      'admin'
    )
  ];

  private readonly mockToken = 'mock-jwt-token';

  async findById(id: UserId): Promise<User | null> {
    return this.users.find(user => user.getId().equals(id)) || null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    return this.users.find(user => user.getEmail().equals(email)) || null;
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async save(user: User): Promise<void> {
    const index = this.users.findIndex(u => u.getId().equals(user.getId()));
    if (index >= 0) {
      this.users[index] = user;
    } else {
      this.users.push(user);
    }
  }

  async delete(id: UserId): Promise<void> {
    const index = this.users.findIndex(user => user.getId().equals(id));
    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  async exists(id: UserId): Promise<boolean> {
    return this.users.some(user => user.getId().equals(id));
  }

  async authenticate(credentials: LoginUserDto): Promise<{ user: User; token: string } | null> {
    const user = await this.findByEmail(new Email(credentials.email));
    
      if (user && user.validatePassword(new Password(credentials.password))) {
      return {
        user,
        token: this.mockToken
      };
    }

    return null;
  }

  async validateToken(token: string): Promise<User | null> {
    if (token === this.mockToken) {
      return this.users[0];
    }
    return null;
  }

  async register(credentials: RegisterUserDto): Promise<User | null> {
    const existingUser = await this.findByEmail(new Email(credentials.email));
    if (existingUser) {
      return null;
    }

    const newUser = User.create(
      new Email(credentials.email),
      new Password(credentials.password),
      credentials.email.split('@')[0],
      '',
      '',
      'user'
    );

    await this.save(newUser);
    return newUser;
  }
} 