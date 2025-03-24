import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressDto } from '../../../../application/dtos/profile.dto';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="addressForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label for="street" class="block text-sm font-medium text-gray-700">Street</label>
        <input
          type="text"
          id="street"
          formControlName="street"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label for="city" class="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          id="city"
          formControlName="city"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label for="state" class="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          id="state"
          formControlName="state"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
        <input
          type="text"
          id="country"
          formControlName="country"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label for="postalCode" class="block text-sm font-medium text-gray-700">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          formControlName="postalCode"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        [disabled]="!addressForm.valid"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Update Address
      </button>
    </form>
  `
})
export class AddressFormComponent {
  @Input() set address(value: AddressDto | undefined | null) {
    if (value) {
      this.addressForm.patchValue(value);
    }
  }
  @Output() addressUpdated = new EventEmitter<AddressDto>();

  addressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.addressUpdated.emit(this.addressForm.value);
    }
  }
} 