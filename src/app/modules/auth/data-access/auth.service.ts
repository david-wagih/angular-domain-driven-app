import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { AuthRepository } from './auth.repository';
import { AuthStore } from './auth.store';
import { LoginUserDto, RegisterUserDto } from '../../../application/dtos/user.dto';
import { AuthResponse } from '../domain/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private authStore: AuthStore
  ) {}

  login(credentials: LoginUserDto): Observable<AuthResponse> {
    this.authStore.setLoading(true);
    return this.authRepository.login(credentials).pipe(
      tap(response => {
        this.authStore.setAuthenticated(
          response.user,
          response.accessToken,
          response.refreshToken
        );
      }),
      catchError(error => {
        this.authStore.setError(error.message);
        return throwError(() => error);
      }),
      tap(() => this.authStore.setLoading(false))
    );
  }

  register(userData: RegisterUserDto): Observable<AuthResponse> {
    this.authStore.setLoading(true);
    return this.authRepository.register(userData).pipe(
      tap(response => {
        this.authStore.setAuthenticated(
          response.user,
          response.accessToken,
          response.refreshToken
        );
      }),
      catchError(error => {
        this.authStore.setError(error.message);
        return throwError(() => error);
      }),
      tap(() => this.authStore.setLoading(false))
    );
  }

  logout(): void {
    this.authStore.setUnauthenticated();
  }

  refreshToken(): Observable<AuthResponse> {
    return this.authRepository.refreshToken().pipe(
      tap(response => {
        this.authStore.setAuthenticated(
          response.user,
          response.accessToken,
          response.refreshToken
        );
      }),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }
} 