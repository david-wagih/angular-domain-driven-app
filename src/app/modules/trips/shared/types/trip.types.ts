import { TRIP_SORT_OPTIONS, TRIP_CATEGORIES } from '../constants/trip.constants';

export type TripSortOption = typeof TRIP_SORT_OPTIONS[keyof typeof TRIP_SORT_OPTIONS];
export type TripCategory = typeof TRIP_CATEGORIES[number];

export interface TripFilters {
  location?: string;
  startDate?: Date;
  endDate?: Date;
  maxPrice?: number;
  minPrice?: number;
  categories?: TripCategory[];
  sortBy?: TripSortOption;
  page?: number;
  limit?: number;
}

export interface TripSearchParams extends Omit<TripFilters, 'startDate' | 'endDate'> {
  startDate?: string;
  endDate?: string;
}

export interface TripStats {
  totalTrips: number;
  availableTrips: number;
  averageRating: number;
  popularDestinations: string[];
  topCategories: Array<{
    category: TripCategory;
    count: number;
  }>;
} 