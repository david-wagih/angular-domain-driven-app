import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../application/services/user.service';
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
  `]
})
export class HomeComponent {
  currentUser: UserDto | null = null;

  constructor(private userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();
  }
} 