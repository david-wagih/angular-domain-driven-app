import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Infrastructure
import { authRoutes } from './auth.routes';

/**
 * Auth Module - Contains all authentication-related functionality
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(authRoutes)
  ],
  providers: []
})
export class AuthModule { } 