import { TripCategory } from '../../shared/types/trip.types';

export interface TripDto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: {
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  dateRange: {
    startDate: string;
    endDate: string;
  };
  price: {
    amount: number;
    currency: string;
  };
  maxParticipants: number;
  currentParticipants: number;
  rating: number;
  tags: TripCategory[];
  createdAt: string;
  updatedAt: string;
}

export interface LocationDto {
  city: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface DateRangeDto {
  startDate: string;
  endDate: string;
}

export interface PriceDto {
  amount: number;
  currency: string;
}

export interface SearchTripsDto {
  location?: LocationDto;
  startDate?: string;
  endDate?: string;
  maxPrice?: PriceDto;
}

export interface BookTripDto {
  tripId: string;
  userId: string;
}

export type CreateTripDto = Omit<TripDto, 'id' | 'currentParticipants' | 'rating'>;

export type UpdateTripDto = Partial<CreateTripDto>; 