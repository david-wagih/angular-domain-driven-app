export interface UserDto {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UpdateProfileDto {
  firstName: string;
  lastName: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
} 