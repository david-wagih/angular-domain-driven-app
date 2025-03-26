export const TRIP_CONSTANTS = {
  MAX_PARTICIPANTS: 50,
  MIN_PRICE: 0,
  MAX_RATING: 5,
  DEFAULT_CURRENCY: 'USD',
  SEARCH_DEBOUNCE_TIME: 300,
  MIN_SEARCH_LENGTH: 3,
} as const;

export const TRIP_SORT_OPTIONS = {
  PRICE_LOW: 'price_asc',
  PRICE_HIGH: 'price_desc',
  DATE_NEAR: 'date_asc',
  DATE_FAR: 'date_desc',
  RATING: 'rating_desc',
  AVAILABILITY: 'spots_desc'
} as const;

export const TRIP_CATEGORIES = [
  'Adventure',
  'Beach',
  'City',
  'Cultural',
  'Mountain',
  'Nature',
  'Relaxation',
  'Winter Sports'
] as const; 