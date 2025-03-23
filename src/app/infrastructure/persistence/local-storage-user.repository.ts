import { Injectable } from '@angular/core';
import { User } from '../../domain/entities/user.entity';
import { UserRepository, USER_REPOSITORY } from '../../domain/repositories/user.repository';
import { UserId } from '../../domain/value-objects/user-id.value-object';
import { Email } from '../../domain/value-objects/email.value-object';

@Injectable()
export class LocalStorageUserRepository implements UserRepository {
  private readonly STORAGE_KEY = 'users';

  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  async findById(id: UserId): Promise<User | null> {
    const users = this.getUsers();
    const userData = users.find(u => u.getId().getValue() === id.getValue());
    return userData || null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const users = this.getUsers();
    const userData = users.find(u => u.getEmail() === email);
    return userData || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const users = this.getUsers();
    const userData = users.find(u => u.getUsername() === username);
    return userData || null;
  }

  async save(user: User): Promise<void> {
    const users = this.getUsers();
    const index = users.findIndex(u => u.getId().getValue() === user.getId().getValue());
    
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    
    this.saveUsers(users);
  }

  async delete(id: UserId): Promise<void> {
    const users = this.getUsers();
    const filteredUsers = users.filter(u => u.getId().getValue() !== id.getValue());
    this.saveUsers(filteredUsers);
  }

  async exists(id: UserId): Promise<boolean> {
    const users = this.getUsers();
    return users.some(u => u.getId().getValue() === id.getValue());
  }

  async existsByEmail(email: Email): Promise<boolean> {
    const users = this.getUsers();
    return users.some(u => u.getEmail().value === email.value);
  }

  async existsByUsername(username: string): Promise<boolean> {
    const users = this.getUsers();
    return users.some(u => u.getUsername() === username);
  }
} 