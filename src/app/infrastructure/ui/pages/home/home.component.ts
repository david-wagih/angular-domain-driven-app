import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../domain/services/auth.service';
import { UserDto } from '../../../../application/dtos/user.dto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <h2>Welcome to Angular DDD App</h2>
      <div *ngIf="currentUser" class="user-info">
        <h3>Your Profile</h3>
        <div class="info-group">
          <label>Username:</label>
          <span>{{ currentUser.username }}</span>
        </div>
        <div class="info-group">
          <label>Email:</label>
          <span>{{ currentUser.email }}</span>
        </div>
        <div class="info-group">
          <label>Name:</label>
          <span>{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
        </div>
      </div>
      <div *ngIf="!currentUser" class="auth-info">
        <p>Please login or register to access your profile.</p>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
    }
    .user-info {
      margin-top: 2rem;
      padding: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .info-group {
      margin-bottom: 1rem;
    }
    label {
      font-weight: bold;
      margin-right: 0.5rem;
    }
    .auth-info {
      margin-top: 2rem;
      padding: 1.5rem;
      text-align: center;
      color: #666;
    }
  `]
})
export class HomeComponent implements OnInit {
  currentUser: UserDto | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUser = {
        id: user.getId().toString(),
        username: user.getUsername(),
        email: user.getEmail().toString(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        isActive: user.isUserActive(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt()
      };
    }
  }
} 