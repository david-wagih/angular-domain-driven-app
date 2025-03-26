import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserPreferencesDto } from '../../../user/data-access/dtos/profile.dto';

@Component({
  selector: 'app-preferences-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="preferencesForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Notifications</label>
        <div class="mt-2">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              formControlName="notifications"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="notifications" class="ml-2 block text-sm text-gray-900">
              Enable notifications
            </label>
          </div>
        </div>
      </div>

      <div>
        <label for="theme" class="block text-sm font-medium text-gray-700">Theme</label>
        <select
          id="theme"
          formControlName="theme"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div>
        <label for="language" class="block text-sm font-medium text-gray-700">Language</label>
        <select
          id="language"
          formControlName="language"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <div>
        <label for="timezone" class="block text-sm font-medium text-gray-700">Timezone</label>
        <select
          id="timezone"
          formControlName="timezone"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="UTC">UTC</option>
          <option value="America/New_York">Eastern Time</option>
          <option value="America/Chicago">Central Time</option>
          <option value="America/Denver">Mountain Time</option>
          <option value="America/Los_Angeles">Pacific Time</option>
        </select>
      </div>

      <button
        type="submit"
        [disabled]="!preferencesForm.valid"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Update Preferences
      </button>
    </form>
  `
})
export class PreferencesFormComponent {
  @Input() set preferences(value: UserPreferencesDto | undefined | null) {
    if (value) {
      this.preferencesForm.patchValue(value);
    }
  }
  @Output() preferencesUpdated = new EventEmitter<UserPreferencesDto>();

  preferencesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.preferencesForm = this.fb.group({
      notifications: [false],
      theme: ['light', Validators.required],
      language: ['en', Validators.required],
      timezone: ['UTC', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.preferencesForm.valid) {
      this.preferencesUpdated.emit(this.preferencesForm.value);
    }
  }
} 