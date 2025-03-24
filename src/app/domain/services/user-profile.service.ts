import { Injectable, Inject } from '@angular/core';
import { UserRepository, USER_REPOSITORY } from '../repositories/user.repository';
import { UserId } from '../value-objects/user-id.value-object';
import { Address } from '../value-objects/address.value-object';
import { PhoneNumber } from '../value-objects/phone-number.value-object';
import { UserPreferences } from '../value-objects/user-preferences.value-object';
import { UserNotFoundException } from '../exceptions/user/user-not-found.exception';
import { EventDispatcher } from '../events/event-dispatcher';
import { UserProfileUpdatedEvent } from '../events/user/user-profile-updated.event';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly eventDispatcher: EventDispatcher
  ) {}

  async updateAddress(userId: UserId, address: Address): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    const oldUser = user;
    const updatedUser = user.updateAddress(address);
    
    await this.userRepository.save(updatedUser);
    
    const event = new UserProfileUpdatedEvent(userId, oldUser, updatedUser);
    this.eventDispatcher.dispatch(event);
  }

  async updatePhoneNumber(userId: UserId, phoneNumber: PhoneNumber): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    const oldUser = user;
    const updatedUser = user.updatePhoneNumber(phoneNumber);
    
    await this.userRepository.save(updatedUser);
    
    const event = new UserProfileUpdatedEvent(userId, oldUser, updatedUser);
    this.eventDispatcher.dispatch(event);
  }

  async updatePreferences(userId: UserId, preferences: UserPreferences): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    const oldUser = user;
    const updatedUser = user.updatePreferences(preferences);
    
    await this.userRepository.save(updatedUser);
    
    const event = new UserProfileUpdatedEvent(userId, oldUser, updatedUser);
    this.eventDispatcher.dispatch(event);
  }

  async getProfile(userId: UserId): Promise<{
    address?: Address;
    phoneNumber?: PhoneNumber;
    preferences?: UserPreferences;
  }> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    return {
      address: user.getAddress(),
      phoneNumber: user.getPhoneNumber(),
      preferences: user.getPreferences()
    };
  }
} 