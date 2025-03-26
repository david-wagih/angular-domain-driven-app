import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entities/user.entity';
import { USER_REPOSITORY, UserRepository } from '../repositories/user.repository';
import { UserPreferences } from '../value-objects/user-preferences.value-object';
import { RegisterUserDto, LoginUserDto } from '../../application/dtos/user.dto';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private currentUser: User | null = null;

  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.currentUser = await this.userRepository.validateToken(token);
    }
  }

  async login(credentials: LoginUserDto): Promise<boolean> {
    try {
      const result = await this.userRepository.authenticate(credentials);
      if (result) {
        this.currentUser = result.user;
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
    this.currentUser = null;
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.currentUser) {
      const token = localStorage.getItem(this.TOKEN_KEY);
      if (token) {
        this.currentUser = await this.userRepository.validateToken(token);
      }
    }
    return this.currentUser;
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
    if (!this.currentUser) {
      throw new Error('No authenticated user');
    }
    const updatedUser = this.currentUser.updateProfile(firstName, lastName);
    await this.userRepository.save(updatedUser);
    this.currentUser = updatedUser;
    return updatedUser;
  }

  async updateUserPreferences(preferences: UserPreferences): Promise<User> {
    if (!this.currentUser) {
      throw new Error('No authenticated user');
    }
    const updatedUser = this.currentUser.updatePreferences(preferences);
    await this.userRepository.save(updatedUser);
    this.currentUser = updatedUser;
    return updatedUser;
  }
} 