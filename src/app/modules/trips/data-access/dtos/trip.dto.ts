export interface TripDto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: LocationDto;
  dateRange: DateRangeDto;
  price: PriceDto;
  maxParticipants: number;
  currentParticipants: number;
  rating: number;
  tags: string[];
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