import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { authRoutes } from './auth.routes';

// Data Access
import { AuthRepository } from './data-access/auth.repository';
import { AuthService } from './data-access/auth.service';
import { AuthStore } from './data-access/auth.store';

// Feature Modules
import { LoginPageComponent } from './feature-login/components/login-page/login-page.component';
import { RegisterPageComponent } from './feature-register/components/register-page/register-page.component';

/**
 * Auth Module - Contains all authentication-related functionality
 * Follows DDD architecture with feature-based organization
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    LoginPageComponent,
    RegisterPageComponent
  ],
  providers: [
    AuthRepository,
    AuthService,
    AuthStore,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthModule { } 