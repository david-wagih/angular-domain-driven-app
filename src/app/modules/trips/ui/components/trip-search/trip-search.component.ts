import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface TripSearchCriteria {
  location?: string;
  startDate?: Date;
  endDate?: Date;
  maxPrice?: number;
}

@Component({
  selector: 'app-trip-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="searchForm" class="p-4 bg-white rounded-lg shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="form-group">
          <label for="location" class="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            formControlName="location"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="City or Country"
          >
        </div>

        <div class="form-group">
          <label for="startDate" class="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            formControlName="startDate"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
        </div>

        <div class="form-group">
          <label for="endDate" class="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            formControlName="endDate"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
        </div>

        <div class="form-group">
          <label for="maxPrice" class="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            formControlName="maxPrice"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            min="0"
            step="100"
          >
        </div>
      </div>
    </form>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class TripSearchComponent {
  @Output() searchChange = new EventEmitter<TripSearchCriteria>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      location: [''],
      startDate: [null],
      endDate: [null],
      maxPrice: [null]
    });

    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
      )
      .subscribe(criteria => {
        this.searchChange.emit(this.cleanCriteria(criteria));
      });
  }

  private cleanCriteria(criteria: TripSearchCriteria): TripSearchCriteria {
    const cleaned: TripSearchCriteria = {};
    
    if (criteria.location?.trim()) {
      cleaned.location = criteria.location.trim();
    }
    
    if (criteria.startDate) {
      cleaned.startDate = new Date(criteria.startDate);
    }
    
    if (criteria.endDate) {
      cleaned.endDate = new Date(criteria.endDate);
    }
    
    if (criteria.maxPrice && criteria.maxPrice > 0) {
      cleaned.maxPrice = criteria.maxPrice;
    }
    
    return cleaned;
  }
} 