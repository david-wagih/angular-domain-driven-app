import { Injectable } from '@angular/core';
import { UserProfileService } from '../../domain/services/user-profile.service';
import { AuthService } from '../../domain/services/auth.service';
import { Address } from '../../domain/value-objects/address.value-object';
import { PhoneNumber } from '../../domain/value-objects/phone-number.value-object';
import { UserPreferences } from '../../domain/value-objects/user-preferences.value-object';
import { AddressDto, PhoneNumberDto, UserPreferencesDto, ProfileDto } from '../dtos/profile.dto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly authService: AuthService
  ) {}

  async getProfile(): Promise<ProfileDto> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const profile = await this.userProfileService.getProfile(currentUser.getId());
    return this.toDto(profile);
  }

  async updateAddress(addressDto: AddressDto): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const address = Address.create(
      addressDto.street,
      addressDto.city,
      addressDto.state,
      addressDto.country,
      addressDto.postalCode
    );

    await this.userProfileService.updateAddress(currentUser.getId(), address);
  }

  async updatePhoneNumber(phoneNumberDto: PhoneNumberDto): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const phoneNumber = PhoneNumber.create(phoneNumberDto.value);
    await this.userProfileService.updatePhoneNumber(currentUser.getId(), phoneNumber);
  }

  async updatePreferences(preferencesDto: UserPreferencesDto): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const preferences = UserPreferences.create(
      preferencesDto.notifications,
      preferencesDto.theme,
      preferencesDto.language,
      preferencesDto.timezone
    );

    await this.userProfileService.updatePreferences(currentUser.getId(), preferences);
  }

  private toDto(profile: { address?: Address; phoneNumber?: PhoneNumber; preferences?: UserPreferences }): ProfileDto {
    return {
      address: profile.address ? {
        street: profile.address.getStreet(),
        city: profile.address.getCity(),
        state: profile.address.getState(),
        country: profile.address.getCountry(),
        postalCode: profile.address.getPostalCode()
      } : undefined,
      phoneNumber: profile.phoneNumber ? {
        value: profile.phoneNumber.getValue()
      } : undefined,
      preferences: profile.preferences ? {
        notifications: profile.preferences.getNotifications(),
        theme: profile.preferences.getTheme(),
        language: profile.preferences.getLanguage(),
        timezone: profile.preferences.getTimezone()
      } : undefined
    };
  }
} 