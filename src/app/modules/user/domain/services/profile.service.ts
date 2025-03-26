import { Injectable, Inject } from '@angular/core';
import { User } from '../entities/user.entity';
import { USER_REPOSITORY, UserRepository } from '../repositories/user.repository';
import { Address } from '../value-objects/address.value-object';
import { PhoneNumber } from '../value-objects/phone-number.value-object';
import { UserPreferences } from '../value-objects/user-preferences.value-object';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async getProfile(): Promise<User | null> {
    return this.authService.getCurrentUser();
  }

  async updateAddress(address: Address): Promise<User> {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      throw new Error('No authenticated user');
    }
    const updatedUser = user.updateAddress(address);
    await this.userRepository.save(updatedUser);
    return updatedUser;
  }

  async updatePhoneNumber(phoneNumber: PhoneNumber): Promise<User> {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      throw new Error('No authenticated user');
    }
    const updatedUser = user.updatePhoneNumber(phoneNumber);
    await this.userRepository.save(updatedUser);
    return updatedUser;
  }

  async updatePreferences(preferences: UserPreferences): Promise<User> {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      throw new Error('No authenticated user');
    }
    const updatedUser = user.updatePreferences(preferences);
    await this.userRepository.save(updatedUser);
    return updatedUser;
  }
} 