import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../application/services/user.service';
import { LoginUserDto } from '../../../../application/dtos/user.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            [(ngModel)]="loginData.email" 
            name="email" 
            required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            [(ngModel)]="loginData.password" 
            name="password" 
            required>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a (click)="showRegister.emit()">Register</a></p>
    </div>
  `,
  styles: [`
    .login-container {
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
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class LoginComponent {
  @Output() showRegister = new EventEmitter<void>();
  loginData: LoginUserDto = {
    email: '',
    password: ''
  };

  constructor(private userService: UserService) {}

  async onSubmit() {
    try {
      await this.userService.login(this.loginData);
    } catch (error) {
      console.error('Login failed:', error);
      // TODO: Add proper error handling
    }
  }
} 