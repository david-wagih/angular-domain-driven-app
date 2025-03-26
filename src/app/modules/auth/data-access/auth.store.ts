import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthState, AuthUser } from '../domain/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null
  };

  private state$ = new BehaviorSubject<AuthState>(this.initialState);

  // Selectors
  selectAuthState(): Observable<AuthState> {
    return this.state$.asObservable();
  }

  selectIsAuthenticated(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.state$.subscribe(state => observer.next(state.isAuthenticated));
    });
  }

  selectUser(): Observable<AuthUser | null> {
    return new Observable<AuthUser | null>(observer => {
      this.state$.subscribe(state => observer.next(state.user));
    });
  }

  // Actions
  setAuthenticated(user: AuthUser, accessToken: string, refreshToken: string): void {
    this.state$.next({
      ...this.state$.value,
      isAuthenticated: true,
      user,
      accessToken,
      refreshToken,
      error: null
    });
  }

  setUnauthenticated(): void {
    this.state$.next(this.initialState);
  }

  setLoading(loading: boolean): void {
    this.state$.next({
      ...this.state$.value,
      loading
    });
  }

  setError(error: string): void {
    this.state$.next({
      ...this.state$.value,
      error
    });
  }
} 