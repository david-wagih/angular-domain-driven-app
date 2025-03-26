import { Injectable, signal, computed, effect } from '@angular/core';
import { TripDto } from '../../application/dtos/trip.dto';
import { TripApplicationService } from '../../application/services/trip.application.service';

export interface TripFilters {
  location?: string;
  startDate?: Date;
  endDate?: Date;
  maxPrice?: number;
  sortBy?: 'price' | 'date' | 'popularity';
}

export interface TripState {
  trips: TripDto[];
  selectedTrip: TripDto | null;
  filters: TripFilters;
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TripFacade {
  // Private state
  private state = signal<TripState>({
    trips: [],
    selectedTrip: null,
    filters: {},
    loading: false,
    error: null
  });

  // Public computed signals
  readonly trips = computed(() => this.state().trips);
  readonly selectedTrip = computed(() => this.state().selectedTrip);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly filters = computed(() => this.state().filters);

  // Filtered and sorted trips
  readonly filteredTrips = computed(() => {
    const { trips, filters } = this.state();
    let filtered = [...trips];

    if (filters.location) {
      filtered = filtered.filter(trip => {
        const searchLower = filters.location!.toLowerCase();
        return trip.location.city.toLowerCase().includes(searchLower) ||
               trip.location.country.toLowerCase().includes(searchLower);
      });
    }

    if (filters.startDate) {
      filtered = filtered.filter(trip => 
        new Date(trip.dateRange.startDate) >= filters.startDate!
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(trip => 
        new Date(trip.dateRange.endDate) <= filters.endDate!
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(trip => 
        trip.price.amount <= filters.maxPrice!
      );
    }

    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price':
            return a.price.amount - b.price.amount;
          case 'date':
            return new Date(a.dateRange.startDate).getTime() - new Date(b.dateRange.startDate).getTime();
          case 'popularity':
            return (b.maxParticipants - b.currentParticipants) - 
                   (a.maxParticipants - a.currentParticipants);
          default:
            return 0;
        }
      });
    }

    return filtered;
  });

  constructor(private tripApplicationService: TripApplicationService) {
    // Set up automatic filtering when filters change
    effect(() => {
      const filters = this.filters();
      this.loadTrips();
    });
  }

  // Public methods
  async loadTrips(): Promise<void> {
    try {
      this.setLoading(true);
      const trips = await this.tripApplicationService.getAllTrips();
      this.updateState({ trips, error: null });
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Failed to load trips');
    } finally {
      this.setLoading(false);
    }
  }

  selectTrip(trip: TripDto): void {
    this.updateState({ selectedTrip: trip });
  }

  updateFilters(filters: Partial<TripFilters>): void {
    this.updateState({
      filters: { ...this.state().filters, ...filters }
    });
  }

  async createTrip(tripData: Omit<TripDto, 'id' | 'currentParticipants' | 'rating'>): Promise<void> {
    try {
      this.setLoading(true);
      const newTrip = await this.tripApplicationService.createTrip(tripData);
      this.updateState({ 
        trips: [...this.state().trips, newTrip],
        error: null
      });
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Failed to create trip');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async updateTrip(id: string, updates: Partial<TripDto>): Promise<void> {
    try {
      this.setLoading(true);
      const updatedTrip = await this.tripApplicationService.updateTrip(id, updates);
      const updatedTrips = this.state().trips.map(trip => 
        trip.id === id ? updatedTrip : trip
      );
      this.updateState({ trips: updatedTrips, error: null });
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Failed to update trip');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async deleteTrip(id: string): Promise<void> {
    try {
      this.setLoading(true);
      await this.tripApplicationService.deleteTrip(id);
      const filteredTrips = this.state().trips.filter(trip => trip.id !== id);
      this.updateState({ 
        trips: filteredTrips,
        selectedTrip: this.state().selectedTrip?.id === id ? null : this.state().selectedTrip,
        error: null
      });
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Failed to delete trip');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  // Private helper methods
  private updateState(partialState: Partial<TripState>): void {
    this.state.update(currentState => ({
      ...currentState,
      ...partialState
    }));
  }

  private setLoading(loading: boolean): void {
    this.updateState({ loading });
  }

  private setError(error: string | null): void {
    this.updateState({ error });
  }
} 