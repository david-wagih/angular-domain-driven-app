import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhoneNumberDto } from '../../../../application/dtos/profile.dto';

@Component({
  selector: 'app-phone-number-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          [(ngModel)]="formData.value"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="+1 (555) 555-5555"
          required
        />
        <p class="mt-1 text-sm text-gray-500">
          Format: +1 (XXX) XXX-XXXX or international format
        </p>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Phone Number
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
export class PhoneNumberFormComponent {
  @Input() phoneNumber?: PhoneNumberDto;
  @Output() phoneNumberUpdated = new EventEmitter<PhoneNumberDto>();

  formData: PhoneNumberDto = {
    value: ''
  };

  ngOnInit(): void {
    if (this.phoneNumber) {
      this.formData = { ...this.phoneNumber };
    }
  }

  onSubmit(): void {
    this.phoneNumberUpdated.emit(this.formData);
  }
} 