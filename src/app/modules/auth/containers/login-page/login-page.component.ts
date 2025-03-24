import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { AuthFacade } from '../../../../domain/facades/auth.facade';
import { LoginUserDto } from '../../../../application/dtos/user.dto';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  template: `
    <app-login
      [loading]="loading"
      [error]="error"
      (login)="onLogin($event)"
    ></app-login>
  `
})
export class LoginPageComponent {
  loading = false;
  error: string | null = null;

  constructor(
    private authFacade: AuthFacade,
    private router: Router
  ) {}

  async onLogin(credentials: LoginUserDto): Promise<void> {
    try {
      await this.authFacade.login(credentials);
      this.router.navigate(['/']);
    } catch (error) {
      if (error instanceof Error) {
        this.error = error.message;
      } else {
        this.error = 'Login failed';
      }
    }
  }
} 