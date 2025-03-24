import { Injectable } from '@angular/core';
import { TripService } from '../../domain/services/trip.service';
import { Trip } from '../../domain/entities/trip.entity';
import { TripDto, SearchTripsDto, BookTripDto, CreateTripDto, UpdateTripDto } from '../dtos/trip.dto';
import { TripId } from '../../domain/value-objects/trip-id.value-object';
import { Location } from '../../domain/value-objects/location.value-object';
import { DateRange } from '../../domain/value-objects/date-range.value-object';
import { Price } from '../../domain/value-objects/price.value-object';

@Injectable()
export class TripApplicationService {
  constructor(private readonly tripService: TripService) {}

  private mapToDto(trip: Trip): TripDto {
    return {
      id: trip.getId().toString(),
      title: trip.getTitle(),
      description: trip.getDescription(),
      imageUrl: trip.getImageUrl(),
      location: {
        city: trip.getLocation().getCity(),
        country: trip.getLocation().getCountry(),
        coordinates: trip.getLocation().getCoordinates()
      },
      dateRange: {
        startDate: trip.getDateRange().getStartDate().toISOString(),
        endDate: trip.getDateRange().getEndDate().toISOString()
      },
      price: {
        amount: trip.getPrice().getAmount(),
        currency: trip.getPrice().getCurrency()
      },
      maxParticipants: trip.getMaxParticipants(),
      currentParticipants: trip.getCurrentParticipants(),
      rating: trip.getRating(),
      tags: trip.getTags()
    };
  }

  private mapToDomain(dto: CreateTripDto): Trip {
    return Trip.create(
      dto.title,
      dto.description,
      dto.imageUrl,
      Location.create(
        dto.location.city,
        dto.location.country,
        dto.location.coordinates
      ),
      DateRange.create(
        new Date(dto.dateRange.startDate),
        new Date(dto.dateRange.endDate)
      ),
      Price.create(dto.price.amount, dto.price.currency),
      dto.maxParticipants,
      dto.tags
    );
  }

  async getTripById(id: string): Promise<TripDto | null> {
    const trip = await this.tripService.getTrip(id);
    return trip ? this.mapToDto(trip) : null;
  }

  async getAllTrips(): Promise<TripDto[]> {
    const trips = await this.tripService.getAllTrips();
    return trips.map(trip => this.mapToDto(trip));
  }

  async searchTrips(searchDto: SearchTripsDto): Promise<TripDto[]> {
    const locationString = searchDto.location 
      ? `${searchDto.location.city}, ${searchDto.location.country}`
      : undefined;

    const startDate = searchDto.startDate ? new Date(searchDto.startDate) : undefined;
    const endDate = searchDto.endDate ? new Date(searchDto.endDate) : undefined;
    const maxPrice = searchDto.maxPrice?.amount;

    const trips = await this.tripService.searchTrips(locationString, startDate, endDate, maxPrice);
    return trips.map(trip => this.mapToDto(trip));
  }

  async createTrip(createDto: CreateTripDto): Promise<TripDto> {
    const trip = this.mapToDomain(createDto);
    await this.tripService.createTrip(
      trip.getTitle(),
      trip.getDescription(),
      trip.getImageUrl(),
      trip.getLocation(),
      trip.getDateRange(),
      trip.getPrice(),
      trip.getMaxParticipants(),
      trip.getTags()
    );
    return this.mapToDto(trip);
  }

  async updateTrip(id: string, updateDto: UpdateTripDto): Promise<TripDto> {
    const existingTrip = await this.tripService.getTrip(id);
    if (!existingTrip) {
      throw new Error('Trip not found');
    }

    const updatedTrip = Trip.create(
      updateDto.title ?? existingTrip.getTitle(),
      updateDto.description ?? existingTrip.getDescription(),
      updateDto.imageUrl ?? existingTrip.getImageUrl(),
      updateDto.location
        ? Location.create(
            updateDto.location.city,
            updateDto.location.country,
            updateDto.location.coordinates
          )
        : existingTrip.getLocation(),
      updateDto.dateRange
        ? DateRange.create(
            new Date(updateDto.dateRange.startDate),
            new Date(updateDto.dateRange.endDate)
          )
        : existingTrip.getDateRange(),
      updateDto.price
        ? Price.create(updateDto.price.amount, updateDto.price.currency)
        : existingTrip.getPrice(),
      updateDto.maxParticipants ?? existingTrip.getMaxParticipants(),
      updateDto.tags ?? existingTrip.getTags()
    );

    await this.tripService.updateTrip(updatedTrip);
    return this.mapToDto(updatedTrip);
  }

  async deleteTrip(id: string): Promise<void> {
    await this.tripService.deleteTrip(id);
  }

  async bookTrip(bookingDto: BookTripDto): Promise<void> {
    await this.tripService.bookTrip(TripId.fromString(bookingDto.tripId));
  }
} 