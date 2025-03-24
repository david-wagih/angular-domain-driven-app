import { Injectable, Inject } from '@angular/core';
import { AuthService } from '../../domain/services/auth.service';
import { Address } from '../../domain/value-objects/address.value-object';
import { PhoneNumber } from '../../domain/value-objects/phone-number.value-object';
import { UserPreferences } from '../../domain/value-objects/user-preferences.value-object';
import { AddressDto, PhoneNumberDto, UserPreferencesDto, ProfileDto } from '../dtos/profile.dto';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}

  async getProfile(): Promise<ProfileDto | null> {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      return null;
    }

    return {
      address: user.getAddress() ? {
        street: user.getAddress()!.getStreet(),
        city: user.getAddress()!.getCity(),
        state: user.getAddress()!.getState(),
        country: user.getAddress()!.getCountry(),
        postalCode: user.getAddress()!.getPostalCode()
      } : undefined,
      phoneNumber: user.getPhoneNumber() ? {
        value: user.getPhoneNumber()!.getValue()
      } : undefined,
      preferences: user.getPreferences() ? {
        notifications: user.getPreferences()!.getNotifications(),
        theme: user.getPreferences()!.getTheme(),
        language: user.getPreferences()!.getLanguage(),
        timezone: user.getPreferences()!.getTimezone()
      } : undefined
    };
  }

  async updateAddress(addressDto: AddressDto): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const address = Address.create(
      addressDto.street,
      addressDto.city,
      addressDto.state,
      addressDto.country,
      addressDto.postalCode
    );

    const updatedUser = user.updateAddress(address);
    await this.userRepository.save(updatedUser);
  }

  async updatePhoneNumber(phoneNumberDto: PhoneNumberDto): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const phoneNumber = PhoneNumber.create(phoneNumberDto.value);
    const updatedUser = user.updatePhoneNumber(phoneNumber);
    await this.userRepository.save(updatedUser);
  }

  async updatePreferences(preferencesDto: UserPreferencesDto): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const preferences = UserPreferences.create(
      preferencesDto.notifications,
      preferencesDto.theme,
      preferencesDto.language,
      preferencesDto.timezone
    );

    const updatedUser = user.updatePreferences(preferences);
    await this.userRepository.save(updatedUser);
  }
} 