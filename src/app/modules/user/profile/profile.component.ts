import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressFormComponent } from '../../core/components/address-form/address-form.component';
import { PhoneNumberFormComponent } from '../../core/components/phone-number-form/phone-number-form.component';
import { PreferencesFormComponent } from '../../core/components/preferences-form/preferences-form.component';
import { AddressDto, PhoneNumberDto, UserPreferencesDto } from '../../../application/dtos/profile.dto';
import { ProfileService } from '../../../application/services/profile.service';
import { ProfileDto } from '../../../application/dtos/profile.dto';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddressFormComponent,
    PhoneNumberFormComponent,
    PreferencesFormComponent
  ],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">Profile Management</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Address Section -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Address</h2>
          <app-address-form
            [address]="profile?.address"
            (addressUpdated)="onAddressUpdated($event)"
          ></app-address-form>
        </div>

        <!-- Phone Number Section -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Phone Number</h2>
          <app-phone-number-form
            [phoneNumber]="profile?.phoneNumber"
            (phoneNumberUpdated)="onPhoneNumberUpdated($event)"
          ></app-phone-number-form>
        </div>

        <!-- Preferences Section -->
        <div class="bg-white p-6 rounded-lg shadow md:col-span-2">
          <h2 class="text-xl font-semibold mb-4">Preferences</h2>
          <app-preferences-form
            [preferences]="profile?.preferences"
            (preferencesUpdated)="onPreferencesUpdated($event)"
          ></app-preferences-form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProfileComponent implements OnInit {
  profile: ProfileDto | null = null;

  constructor(private readonly profileService: ProfileService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.profile = await this.profileService.getProfile();
    } catch (error) {
      console.error('Error loading profile:', error);
      // Handle error (e.g., show error message, redirect to login)
    }
  }

  async onAddressUpdated(address: AddressDto): Promise<void> {
    try {
      await this.profileService.updateAddress(address);
      this.profile = { ...this.profile, address };
    } catch (error) {
      console.error('Error updating address:', error);
      // Handle error (e.g., show error message)
    }
  }

  async onPhoneNumberUpdated(phoneNumber: PhoneNumberDto): Promise<void> {
    try {
      await this.profileService.updatePhoneNumber(phoneNumber);
      this.profile = { ...this.profile, phoneNumber };
    } catch (error) {
      console.error('Error updating phone number:', error);
      // Handle error (e.g., show error message)
    }
  }

  async onPreferencesUpdated(preferences: UserPreferencesDto): Promise<void> {
    try {
      await this.profileService.updatePreferences(preferences);
      this.profile = { ...this.profile, preferences };
    } catch (error) {
      console.error('Error updating preferences:', error);
      // Handle error (e.g., show error message)
    }

  }
} 

