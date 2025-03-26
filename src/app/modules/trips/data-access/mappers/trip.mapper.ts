import { Trip } from '../../domain/entities/trip.entity';
import { TripDto } from '../dtos/trip.dto';
import { Location } from '../../domain/value-objects/location.vo';
import { DateRange } from '../../domain/value-objects/date-range.vo';
import { Price } from '../../domain/value-objects/price.vo';
import { TripId } from '../../../../domain/value-objects/trip-id.value-object';
import { TripCategory } from '../../shared/types/trip.types';

export class TripMapper {
  static toDto(trip: Trip): TripDto {
    return {
      id: trip.id.toString(),
      title: trip.getTitle(),
      description: trip.getDescription(),
      imageUrl: trip.getImageUrl(),
      location: {
        city: trip.getLocation().getCity(),
        country: trip.getLocation().getCountry(),
        coordinates: trip.getLocation().getCoordinates()
      },
      dateRange: {
        startDate: trip.getDateRange().startDate.toISOString(),
        endDate: trip.getDateRange().endDate.toISOString()
      },
      price: {
        amount: trip.getPrice().getAmount(),
        currency: trip.getPrice().getCurrency()
      },
      maxParticipants: trip.getMaxParticipants(),
      currentParticipants: trip.getCurrentParticipants(),
      rating: trip.getRating(),
      tags: trip.getTags() as TripCategory[],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  static toDomain(dto: TripDto): Trip {
    const trip = Trip.create({
      title: dto.title,
      description: dto.description,
      imageUrl: dto.imageUrl,
      location: Location.create(
        dto.location.city,
        dto.location.country,
        dto.location.coordinates
      ),
      dateRange: DateRange.create(
        new Date(dto.dateRange.startDate),
        new Date(dto.dateRange.endDate)
      ),
      price: Price.create(dto.price.amount, dto.price.currency),
      maxParticipants: dto.maxParticipants,
      currentParticipants: dto.currentParticipants,
      rating: dto.rating,
      tags: dto.tags
    });
    
    // Set the ID after creation
    Object.defineProperty(trip, 'id', {
      value: TripId.fromString(dto.id),
      writable: false,
      configurable: true
    });
    
    return trip;
  }

  static toDtoList(trips: Trip[]): TripDto[] {
    return trips.map(trip => this.toDto(trip));
  }

  static toDomainList(dtos: TripDto[]): Trip[] {
    return dtos.map(dto => this.toDomain(dto));
  }
} 