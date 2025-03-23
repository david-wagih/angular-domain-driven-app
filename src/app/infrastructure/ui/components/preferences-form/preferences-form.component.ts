import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPreferencesDto } from '../../../../application/dtos/profile.dto';

@Component({
  selector: 'app-preferences-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-6">
      <!-- Notification Preferences -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Notification Preferences</h3>
        <div class="space-y-2">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              [(ngModel)]="formData.notifications.email"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="emailNotifications" class="ml-2 block text-sm text-gray-900">
              Email Notifications
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              id="pushNotifications"
              name="pushNotifications"
              [(ngModel)]="formData.notifications.push"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="pushNotifications" class="ml-2 block text-sm text-gray-900">
              Push Notifications
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              id="smsNotifications"
              name="smsNotifications"
              [(ngModel)]="formData.notifications.sms"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="smsNotifications" class="ml-2 block text-sm text-gray-900">
              SMS Notifications
            </label>
          </div>
        </div>
      </div>

      <!-- Theme Preferences -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Theme Preferences</h3>
        <div class="space-y-4">
          <div>
            <label for="themeMode" class="block text-sm font-medium text-gray-700">Theme Mode</label>
            <select
              id="themeMode"
              name="themeMode"
              [(ngModel)]="formData.theme.mode"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          <div>
            <label for="fontSize" class="block text-sm font-medium text-gray-700">Font Size</label>
            <select
              id="fontSize"
              name="fontSize"
              [(ngModel)]="formData.theme.fontSize"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Language and Timezone -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Regional Settings</h3>
        <div class="space-y-4">
          <div>
            <label for="language" class="block text-sm font-medium text-gray-700">Language</label>
            <input
              type="text"
              id="language"
              name="language"
              [(ngModel)]="formData.language"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="en-US"
              required
            />
          </div>
          <div>
            <label for="timezone" class="block text-sm font-medium text-gray-700">Timezone</label>
            <input
              type="text"
              id="timezone"
              name="timezone"
              [(ngModel)]="formData.timezone"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="America/New_York"
              required
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Preferences
        </button>
      </div>
    </form>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PreferencesFormComponent {
  @Input() preferences?: UserPreferencesDto;
  @Output() preferencesUpdated = new EventEmitter<UserPreferencesDto>();

  formData: UserPreferencesDto = {
    notifications: {
      email: false,
      push: false,
      sms: false
    },
    theme: {
      mode: 'light',
      fontSize: 'medium'
    },
    language: '',
    timezone: ''
  };

  ngOnInit(): void {
    if (this.preferences) {
      this.formData = { ...this.preferences };
    }
  }

  onSubmit(): void {
    this.preferencesUpdated.emit(this.formData);
  }
} 