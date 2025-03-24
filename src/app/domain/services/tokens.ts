import { InjectionToken } from '@angular/core';
import { ProfileService } from '../../application/services/profile.service';

export const PROFILE_SERVICE = new InjectionToken<ProfileService>('PROFILE_SERVICE'); 