import { InjectionToken } from '@angular/core';
import { User } from '../entities/user.entity';
import { UserId } from '../value-objects/user-id.value-object';
import { Email } from '../value-objects/email.value-object';
import { RegisterUserDto, LoginUserDto } from '../../modules/auth/data-access/dtos/user.dto';
export interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
  exists(id: UserId): Promise<boolean>;
  authenticate(credentials: LoginUserDto): Promise<{ user: User; token: string } | null>;
  validateToken(token: string): Promise<User | null>;
  register(credentials: RegisterUserDto): Promise<User | null>;
}

export const USER_REPOSITORY = new InjectionToken<UserRepository>('UserRepository'); 