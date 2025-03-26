export interface AddressDto {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface PhoneNumberDto {
  value: string;
}

export interface NotificationPreferencesDto {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface ThemePreferencesDto {
  mode: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
}

export interface UserPreferencesDto {
  notifications: NotificationPreferencesDto;
  theme: ThemePreferencesDto;
  language: string;
  timezone: string;
}

export interface ProfileDto {
  address?: AddressDto;
  phoneNumber?: PhoneNumberDto;
  preferences?: UserPreferencesDto;
} 