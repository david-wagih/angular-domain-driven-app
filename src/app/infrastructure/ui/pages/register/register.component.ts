import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../application/services/user.service';
import { RegisterUserDto } from '../../../../application/dtos/user.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <h2>Register</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            [(ngModel)]="registerData.username" 
            name="username" 
            required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            [(ngModel)]="registerData.email" 
            name="email" 
            required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            [(ngModel)]="registerData.password" 
            name="password" 
            required>
        </div>
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            [(ngModel)]="registerData.firstName" 
            name="firstName" 
            required>
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            [(ngModel)]="registerData.lastName" 
            name="lastName" 
            required>
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a (click)="showLogin.emit()">Login</a></p>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #218838;
    }
  `]
})
export class RegisterComponent {
  @Output() showLogin = new EventEmitter<void>();
  registerData: RegisterUserDto = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  constructor(private userService: UserService) {}

  async onSubmit() {
    try {
      await this.userService.register(this.registerData);
    } catch (error) {
      console.error('Registration failed:', error);
      // TODO: Add proper error handling
    }
  }
} 