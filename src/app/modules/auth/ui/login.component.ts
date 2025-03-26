import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Login</h2>
        
        @if (error) {
          <div class="error-message">
            {{ error }}
          </div>
        }

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="formData.email"
              required
              email
              #email="ngModel"
              [class.is-invalid]="email.invalid && email.touched"
              class="form-control"
            />
            @if (email.invalid && email.touched) {
              <div class="invalid-feedback">
                Please enter a valid email address
              </div>
            }
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="formData.password"
              required
              minlength="8"
              #password="ngModel"
              [class.is-invalid]="password.invalid && password.touched"
              class="form-control"
            />
            @if (password.invalid && password.touched) {
              <div class="invalid-feedback">
                Password must be at least 8 characters long
              </div>
            }
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              [disabled]="loginForm.invalid || loading"
              class="btn-primary"
            >
              @if (loading) {
                <span>Logging in...</span>
              } @else {
                <span>Login</span>
              }
            </button>
          </div>

          <div class="form-links">
            <a routerLink="/auth/forgot-password">Forgot Password?</a>
            <a routerLink="/auth/register">Create Account</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
      padding: 1rem;
    }

    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: #007bff;
      }

      &.is-invalid {
        border-color: #dc3545;
      }
    }

    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .error-message {
      background-color: #f8d7da;
      color: #721c24;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .form-actions {
      margin-top: 2rem;
    }

    .btn-primary {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #0056b3;
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }

    .form-links {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;

      a {
        color: #007bff;
        text-decoration: none;
        font-size: 0.875rem;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  `]
})
export class LoginComponent {
  @Input() loading = false;
  @Input() error: string | null = null;

  @Output() login = new EventEmitter<LoginCredentials>();
  
  formData: LoginCredentials = {
    email: '',
    password: ''
  };

  onSubmit(): void {
    if (this.formData.email && this.formData.password) {
      this.login.emit(this.formData);
    }
  }
} 