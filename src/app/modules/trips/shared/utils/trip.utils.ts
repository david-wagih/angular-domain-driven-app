import { TripFilters, TripSearchParams } from '../types/trip.types';

export function formatDateToString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function parseSearchParams(params: TripSearchParams): TripFilters {
  return {
    ...params,
    startDate: params.startDate ? new Date(params.startDate) : undefined,
    endDate: params.endDate ? new Date(params.endDate) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    page: params.page ? Number(params.page) : 1,
    limit: params.limit ? Number(params.limit) : 10
  };
}

export function calculateTripDuration(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
}

export function calculateAverageRating(ratings: number[]): number {
  if (!ratings.length) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
} 