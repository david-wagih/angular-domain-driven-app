import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Application layer
import { ProfileService } from '../../application/services/profile.service';

// Infrastructure
import { userRoutes } from './user.routes';

/**
 * User Module - Contains all user-related functionality
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ],
  providers: [
    ProfileService
  ]
})
export class UserModule { } 