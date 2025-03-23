import { Injectable, Inject } from '@angular/core';
import { User } from '../entities/user.entity';
import { UserRepository, USER_REPOSITORY } from '../repositories/user.repository';
import { Address } from '../value-objects/address.value-object';
import { PhoneNumber } from '../value-objects/phone-number.value-object';
import { UserPreferences } from '../value-objects/user-preferences.value-object';
import { UserId } from '../value-objects/user-id.value-object';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async updateAddress(userId: UserId, address: Address): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = user.updateAddress(address);
    await this.userRepository.save(updatedUser);
    return updatedUser;
  }

  async updatePhoneNumber(userId: UserId, phoneNumber: PhoneNumber): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = user.updatePhoneNumber(phoneNumber);
    await this.userRepository.save(updatedUser);
    return updatedUser;
  }

  async updatePreferences(userId: UserId, preferences: UserPreferences): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = user.updatePreferences(preferences);
    await this.userRepository.save(updatedUser);
    return updatedUser;
  }

  async getProfile(userId: UserId): Promise<{
    address?: Address;
    phoneNumber?: PhoneNumber;
    preferences?: UserPreferences;
  }> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      address: user.getAddress(),
      phoneNumber: user.getPhoneNumber(),
      preferences: user.getPreferences()
    };
  }
} 