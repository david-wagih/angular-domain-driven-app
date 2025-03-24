import { Injectable } from '@angular/core';
import { AuthService } from '../../domain/services/auth.service';
import { Email } from '../../domain/value-objects/email.value-object';
import { Password } from '../../domain/value-objects/password.value-object';
import { UserDto, RegisterUserDto, LoginUserDto, UpdateProfileDto, ChangePasswordDto } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private authService: AuthService) {}

  async register(dto: RegisterUserDto): Promise<UserDto> {
    try {
      const user = await this.authService.register(
        dto
      );
      return this.toDto(user);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(dto: LoginUserDto): Promise<UserDto> {
    try {
      const user = await this.authService.login(
        dto
      );
      return this.toDto(user);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  logout(): void {
    this.authService.logout();
  }

  getCurrentUser(): UserDto | null {
    const user = this.authService.getCurrentUser();
    return user ? this.toDto(user) : null;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  async updateProfile(dto: UpdateProfileDto): Promise<UserDto> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    const updatedUser = await this.authService.updateUserProfile(dto.firstName, dto.lastName);
    return this.toDto(updatedUser);
  }

  private toDto(user: any): UserDto {
    return {
      id: user.id.value,
      username: user.username,
      email: user.email.value,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  private handleError(error: any): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error('An unexpected error occurred');
  }
} 