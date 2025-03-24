import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../domain/entities/user.entity';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';
import { UserPreferences } from '../../domain/value-objects/user-preferences.value-object';
import { RegisterUserDto, LoginUserDto } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      const user = await this.userRepository.validateToken(token);
      this.currentUserSubject.next(user);
    }
  }

  async login(credentials: LoginUserDto): Promise<boolean> {
    try {
      const result = await this.userRepository.authenticate(credentials);
      if (result) {
        this.currentUserSubject.next(result.user);
        localStorage.setItem(this.TOKEN_KEY, result.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.currentUserSubject.value) {
      const token = localStorage.getItem(this.TOKEN_KEY);
      if (token) {
        const user = await this.userRepository.validateToken(token);
        this.currentUserSubject.next(user);
      }
    }
    return this.currentUserSubject.value;
  }

  async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user ? user.isAdmin() : false;
  }

  async register(credentials: RegisterUserDto): Promise<User> {
    const response = await this.userRepository.register(credentials);
    if (!response) {
      throw new Error('Registration failed');
    }
    return response;
  }

  async updateUserProfile(firstName: string, lastName: string): Promise<User> {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) {
      throw new Error('No authenticated user');
    }
    const updatedUser = currentUser.updateProfile(firstName, lastName);
    await this.userRepository.save(updatedUser);
    this.currentUserSubject.next(updatedUser);
    return updatedUser;
  }

  async updateUserPreferences(preferences: UserPreferences): Promise<User> {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) {
      throw new Error('No authenticated user');
    }
    const updatedUser = currentUser.updatePreferences(preferences);
    await this.userRepository.save(updatedUser);
    this.currentUserSubject.next(updatedUser);
    return updatedUser;
  }
} 