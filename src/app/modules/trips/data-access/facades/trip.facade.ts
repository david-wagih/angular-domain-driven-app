import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TripService } from '../../domain/services/trip.service';
import { Trip } from '../../domain/entities/trip.entity';
import { TripFilters, TripStats } from '../../shared/types/trip.types';
import { TripDto } from '../dtos/trip.dto';
import { TripId } from '../../../../domain/value-objects/trip-id.value-object';

@Injectable()
export class TripFacade {
  private readonly tripsSubject = new BehaviorSubject<Trip[]>([]);
  private readonly selectedTripSubject = new BehaviorSubject<Trip | null>(null);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);
  private readonly filtersSubject = new BehaviorSubject<TripFilters>({});
  private readonly statsSubject = new BehaviorSubject<TripStats | null>(null);

  readonly trips$ = this.tripsSubject.asObservable();
  readonly selectedTrip$ = this.selectedTripSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();
  readonly filters$ = this.filtersSubject.asObservable();
  readonly stats$ = this.statsSubject.asObservable();

  constructor(private tripService: TripService) {}

  async loadTrips(filters?: TripFilters): Promise<void> {
    try {
      this.loadingSubject.next(true);
      this.errorSubject.next(null);
      
      const trips = await this.tripService.searchTrips(
        filters?.location,
        filters?.startDate,
        filters?.endDate,
        filters?.maxPrice
      );
      
      this.tripsSubject.next(trips);
    } catch (error) {
      this.errorSubject.next(error instanceof Error ? error.message : 'Failed to load trips');
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async loadTripDetails(id: TripId): Promise<void> {
    try {
      this.loadingSubject.next(true);
      this.errorSubject.next(null);
      
      const trip = await this.tripService.getTrip(id.toString());
      this.selectedTripSubject.next(trip);
    } catch (error) {
      this.errorSubject.next(error instanceof Error ? error.message : 'Failed to load trip details');
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async bookTrip(tripId: TripId): Promise<void> {
    try {
      this.loadingSubject.next(true);
      this.errorSubject.next(null);
      
      await this.tripService.bookTrip(tripId);
      await this.loadTripDetails(tripId);
      await this.loadTrips(this.filtersSubject.value);
    } catch (error) {
      this.errorSubject.next(error instanceof Error ? error.message : 'Failed to book trip');
    } finally {
      this.loadingSubject.next(false);
    }
  }

  updateFilters(filters: Partial<TripFilters>): void {
    this.filtersSubject.next({
      ...this.filtersSubject.value,
      ...filters
    });
    this.loadTrips(this.filtersSubject.value);
  }

  clearFilters(): void {
    this.filtersSubject.next({});
    this.loadTrips();
  }

  clearSelectedTrip(): void {
    this.selectedTripSubject.next(null);
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
} 