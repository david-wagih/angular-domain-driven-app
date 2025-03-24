import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <a routerLink="/" class="home-link">Go to Home</a>
    </div>
  `,
  styles: [`
    .not-found {
      text-align: center;
      padding: 4rem 1rem;
      max-width: 600px;
      margin: 0 auto;
    }

    h1 {
      font-size: 6rem;
      margin: 0;
      color: #dc3545;
    }

    h2 {
      font-size: 2rem;
      margin: 0 0 1rem;
      color: #343a40;
    }

    p {
      color: #6c757d;
      margin-bottom: 2rem;
    }

    .home-link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .home-link:hover {
      background-color: #0056b3;
    }
  `]
})
export class NotFoundComponent {} 