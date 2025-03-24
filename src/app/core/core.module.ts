import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// Repositories
import { USER_REPOSITORY } from '../domain/repositories/user.repository';
import { LocalStorageUserRepository } from '../infrastructure/persistence/local-storage-user.repository';
import { TRIP_REPOSITORY } from '../domain/repositories/trip.repository';
import { MockTripRepository } from '../infrastructure/persistence/mock-trip.repository';

// Domain Events
import { EventDispatcher } from '../domain/events/event-dispatcher';

// Domain Services
import { AuthService } from '../domain/services/auth.service';
import { TripService } from '../domain/services/trip.service';

/**
 * CoreModule
 * 
 * This module contains all singleton services that should be instantiated only once 
 * in the application lifetime. It includes repositories and domain services.
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    // Repositories
    {
      provide: USER_REPOSITORY,
      useClass: LocalStorageUserRepository
    },
    {
      provide: TRIP_REPOSITORY,
      useClass: MockTripRepository
    },
    // Event System
    EventDispatcher,
    // Domain Services
    AuthService,
    TripService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
} 