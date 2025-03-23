import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddressDto } from '../../../../application/dtos/profile.dto';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label for="street" class="block text-sm font-medium text-gray-700">Street</label>
        <input
          type="text"
          id="street"
          name="street"
          [(ngModel)]="formData.street"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label for="city" class="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          id="city"
          name="city"
          [(ngModel)]="formData.city"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label for="state" class="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          id="state"
          name="state"
          [(ngModel)]="formData.state"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          [(ngModel)]="formData.country"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label for="postalCode" class="block text-sm font-medium text-gray-700">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          [(ngModel)]="formData.postalCode"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Address
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
export class AddressFormComponent {
  @Input() address?: AddressDto;
  @Output() addressUpdated = new EventEmitter<AddressDto>();

  formData: AddressDto = {
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  };

  ngOnInit(): void {
    if (this.address) {
      this.formData = { ...this.address };
    }
  }

  onSubmit(): void {
    this.addressUpdated.emit(this.formData);
  }
} 