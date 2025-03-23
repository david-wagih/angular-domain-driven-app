import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './domain/services/auth.service';
import { LoginComponent } from './infrastructure/ui/pages/login/login.component';
import { RegisterComponent } from './infrastructure/ui/pages/register/register.component';
import { HomeComponent } from './infrastructure/ui/pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentPage: 'login' | 'register' | 'home' = 'login';

  constructor(public authService: AuthService) {
    if (this.authService.isAuthenticated()) {
      this.currentPage = 'home';
    }
  }

  showLogin() {
    this.currentPage = 'login';
  }

  showRegister() {
    this.currentPage = 'register';
  }

  showHome() {
    this.currentPage = 'home';
  }
}
