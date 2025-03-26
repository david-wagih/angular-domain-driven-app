import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../../../../domain/entities/user.entity';
import { UserPreferences, NotificationPreferences, ThemePreferences } from '../../../../domain/value-objects/user-preferences.value-object';
import { LoginUserDto, RegisterUserDto } from '../../data-access/dtos/user.dto';
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  private state = new BehaviorSubject<AuthState>(initialState);
  readonly state$ = this.state.asObservable();

  constructor(private authService: AuthService) {
    this.initializeState();
  }

  private async initializeState(): Promise<void> {
    this.setState({ loading: true });
    try {
      const user = await this.authService.getCurrentUser();
      this.setState({ user, loading: false });
    } catch (error) {
      this.setState({ 
        error: error instanceof Error ? error.message : 'Failed to initialize auth state',
        loading: false 
      });
    }
  }

  private setState(partialState: Partial<AuthState>): void {
    this.state.next({
      ...this.state.value,
      ...partialState
    });
  }

  async login(dto: LoginUserDto): Promise<void> {
    this.setState({ loading: true, error: null });
    try {
      const success = await this.authService.login(dto);
      if (success) {
        const user = await this.authService.getCurrentUser();
        this.setState({ user, loading: false });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      this.setState({ 
        error: error instanceof Error ? error.message : 'Login failed',
        loading: false 
      });
    }
  }

  async register(dto: RegisterUserDto): Promise<void> {
    this.setState({ loading: true, error: null });
    try {
      const user = await this.authService.register(dto);
      this.setState({ user, loading: false });
    } catch (error) {
      this.setState({ 
        error: error instanceof Error ? error.message : 'Registration failed',
        loading: false 
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.setState(initialState);
  }

  async updateProfile(firstName: string, lastName: string): Promise<void> {
    this.setState({ loading: true, error: null });
    try {
      const updatedUser = await this.authService.updateUserProfile(firstName, lastName);
      this.setState({ user: updatedUser, loading: false });
    } catch (error) {
      this.setState({ 
        error: error instanceof Error ? error.message : 'Failed to update profile',
        loading: false 
      });
    }
  }

  async updatePreferences(notifications: NotificationPreferences, theme: ThemePreferences, language: string, timezone: string): Promise<void> {
    this.setState({ loading: true, error: null });
    try { 
      const preferences = UserPreferences.create(notifications, theme, language, timezone);
      const updatedUser = await this.authService.updateUserPreferences(preferences);
      this.setState({ user: updatedUser, loading: false });
    } catch (error) {
      this.setState({ 
        error: error instanceof Error ? error.message : 'Failed to update preferences',
        loading: false 
      });
    }
  }
} 