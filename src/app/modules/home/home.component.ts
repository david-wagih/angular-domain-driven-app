import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../core/components/button/button.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent],
  styleUrls: ['./home.component.css'],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Discover Your Next Adventure</h1>
          <p class="hero-subtitle">
            Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
          </p>
          <div class="hero-actions">
            <a routerLink="/trips">
              <app-button variant="primary" size="lg">Browse Trips</app-button>
            </a>
            <a routerLink="/register">
              <app-button variant="outline" size="lg">Join Now</app-button>
            </a>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <h2 class="section-title">Why Choose Us</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
            </div>
            <h3 class="feature-title">Global Destinations</h3>
            <p class="feature-description">
              Explore handpicked destinations across the globe, from hidden gems to popular landmarks.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="feature-title">24/7 Support</h3>
            <p class="feature-description">
              Our dedicated team is available round the clock to assist you with any queries or concerns.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="feature-title">Secure Booking</h3>
            <p class="feature-description">
              Book with confidence using our secure and encrypted booking system.
            </p>
          </div>
        </div>
      </section>

      <!-- Popular Destinations -->
      <section class="destinations-section">
        <h2 class="section-title">Popular Destinations</h2>
        <div class="destinations-grid">
          <div class="destination-card">
            <img src="assets/images/paris.jpg" alt="Paris" class="destination-image" />
            <div class="destination-content">
              <h3 class="destination-title">Paris, France</h3>
              <p class="destination-description">Experience the city of love and lights.</p>
            </div>
          </div>

          <div class="destination-card">
            <img src="assets/images/tokyo.jpg" alt="Tokyo" class="destination-image" />
            <div class="destination-content">
              <h3 class="destination-title">Tokyo, Japan</h3>
              <p class="destination-description">Discover the perfect blend of tradition and modernity.</p>
            </div>
          </div>

          <div class="destination-card">
            <img src="assets/images/nyc.jpg" alt="New York" class="destination-image" />
            <div class="destination-content">
              <h3 class="destination-title">New York City, USA</h3>
              <p class="destination-description">Explore the city that never sleeps.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Start Your Journey?</h2>
          <p class="cta-description">
            Join thousands of travelers who choose us for their adventures.
          </p>
          <div class="cta-actions">
            <a routerLink="/register">
              <app-button variant="primary" size="lg">Get Started</app-button>
            </a>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {} 