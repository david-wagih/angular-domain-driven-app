import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './domain/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <a routerLink="/home" class="text-xl font-bold text-indigo-600">DDD App</a>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  routerLink="/home"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Home
                </a>
                <a
                  *ngIf="authService.isAuthenticated()"
                  routerLink="/profile"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Profile
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <ng-container *ngIf="!authService.isAuthenticated()">
                <a
                  routerLink="/login"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Login
                </a>
                <a
                  routerLink="/register"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="ml-4 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Register
                </a>
              </ng-container>
              <button
                *ngIf="authService.isAuthenticated()"
                (click)="authService.logout()"
                class="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
