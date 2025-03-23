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
        dto.username,
        new Email(dto.email),
        new Password(dto.password),
        dto.firstName,
        dto.lastName
      );
      return this.toDto(user);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(dto: LoginUserDto): Promise<UserDto> {
    try {
      const user = await this.authService.login(
        new Email(dto.email),
        dto.password
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

    user.updateProfile(dto.firstName, dto.lastName);
    return this.toDto(user);
  }

  async changePassword(dto: ChangePasswordDto): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    if (!user.validatePassword(dto.currentPassword)) {
      throw new Error('Current password is incorrect');
    }

    user.changePassword(new Password(dto.newPassword));
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