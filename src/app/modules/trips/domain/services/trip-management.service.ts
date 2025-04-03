import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Trip, TripStatus } from '../entities/trip.entity';
import { Rating } from '../value-objects/rating.vo';

@Injectable({
  providedIn: 'root'
})
export class TripManagementService {
  // Bad: Direct dependency on HttpClient in domain service
  constructor(private http: HttpClient) {}

  // Bad: Mixing HTTP calls with domain logic
  createTrip(tripData: any): Observable<Trip> {
    // Bad: Any type and direct HTTP call
    return this.http.post<any>('/api/trips', tripData).pipe(
      map(response => Trip.create(response))
    );
  }

  // Bad: Business logic mixed with infrastructure concerns
  async rateTrip(trip: Trip, rating: number, comment: string): Promise<void> {
    if (trip.status !== TripStatus.COMPLETED) {
      throw new Error('Can only rate completed trips');
    }

    const ratingVO = new Rating(rating, comment);
    
    // Bad: Direct HTTP call in domain service
    await this.http.post(`/api/trips/${trip.id}/ratings`, {
      rating: ratingVO.value,
      comment: ratingVO.comment,
      timestamp: ratingVO.timestamp
    }).toPromise();

    trip.updateRating(rating);
  }

  // Bad: UI concern in domain service
  getStatusBadgeClass(status: TripStatus): string {
    switch (status) {
      case TripStatus.DRAFT: return 'badge-secondary';
      case TripStatus.PUBLISHED: return 'badge-success';
      case TripStatus.CANCELLED: return 'badge-danger';
      case TripStatus.COMPLETED: return 'badge-info';
      default: return 'badge-light';
    }
  }

  // Bad: Infrastructure concern in domain service
  private async sendNotification(tripId: string, message: string): Promise<void> {
    await this.http.post('/api/notifications', {
      tripId,
      message,
      timestamp: new Date()
    }).toPromise();
  }
} 