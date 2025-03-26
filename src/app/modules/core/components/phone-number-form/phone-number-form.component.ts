import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhoneNumberDto } from '../../../user/data-access/dtos/profile.dto';

@Component({
  selector: 'app-phone-number-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="phoneForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          formControlName="value"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="+1 (555) 555-5555"
        />
      </div>

      <button
        type="submit"
        [disabled]="!phoneForm.valid"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Update Phone Number
      </button>
    </form>
  `
})
export class PhoneNumberFormComponent {
  @Input() set phoneNumber(value: PhoneNumberDto | undefined | null) {
    if (value) {
      this.phoneForm.patchValue({ value: value.value });
    }
  }
  @Output() phoneNumberUpdated = new EventEmitter<PhoneNumberDto>();

  phoneForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.phoneForm = this.fb.group({
      value: ['', [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,14}$')]]
    });
  }

  onSubmit(): void {
    if (this.phoneForm.valid) {
      this.phoneNumberUpdated.emit(this.phoneForm.value);
    }
  }
} 