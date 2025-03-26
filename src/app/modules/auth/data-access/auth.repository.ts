import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUserDto, RegisterUserDto } from '../../../application/dtos/user.dto';
import { AuthResponse } from '../domain/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthRepository {
  private readonly API_URL = '/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: LoginUserDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials);
  }

  register(userData: RegisterUserDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, userData);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/refresh-token`, {});
  }
} 