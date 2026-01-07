import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroVideoComponent } from './components/hero-video/hero-video.component';
import { GalleryService } from '../../services/gallery.service';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { UrgencyBannerComponent } from '../../components/urgency-banner/urgency-banner.component';
import { TrustIndicatorsComponent } from '../../components/trust-indicators/trust-indicators.component';
import { FloatingCtaComponent } from '../../components/floating-cta/floating-cta.component';
import { VideoShowcaseComponent } from '../../components/video-showcase/video-showcase.component';
import { ProcessVideoComponent } from '../../components/process-video/process-video.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink, 
    CommonModule, 
    HeroVideoComponent,
    TestimonialsComponent,
    StatsComponent,
    UrgencyBannerComponent,
    TrustIndicatorsComponent,
    FloatingCtaComponent,
    VideoShowcaseComponent,
    ProcessVideoComponent
  ],
  template: `
    <div class="relative">
      <!-- Hero Video Section -->
      <app-hero-video></app-hero-video>

      <!-- Urgency Banner (shows after scroll) -->
      <app-urgency-banner></app-urgency-banner>

      <!-- Trust Indicators -->
      <app-trust-indicators></app-trust-indicators>

      <!-- Stats Section -->
      <app-stats></app-stats>

      <!-- Features Section -->
      <section id="features-section" class="py-20 positive-gradient">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl font-serif font-bold text-center mb-4 text-slate-800">Why Choose Us?</h2>
          <p class="text-center text-slate-600 mb-12 max-w-2xl mx-auto">Excellence in every detail, passion in every plate</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="card text-center group hover:border-trust-300">
              <div class="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🎂</div>
              <h3 class="text-xl font-semibold mb-3 text-slate-800">Premium Quality</h3>
              <p class="text-slate-600">Only the finest ingredients and traditional recipes</p>
            </div>
            <div class="card text-center group hover:border-trust-300">
              <div class="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">👨‍🍳</div>
              <h3 class="text-xl font-semibold mb-3 text-slate-800">Expert Chefs</h3>
              <p class="text-slate-600">Experienced culinary team with years of expertise</p>
            </div>
            <div class="card text-center group hover:border-trust-300">
              <div class="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">✨</div>
              <h3 class="text-xl font-semibold mb-3 text-slate-800">Customizable Menus</h3>
              <p class="text-slate-600">Tailored to your preferences and dietary needs</p>
            </div>
          </div>
          <div class="text-center mt-12">
            <a routerLink="/booking" class="btn-primary text-lg px-10 py-4 inline-block">
              Start Your Booking →
            </a>
          </div>
        </div>
      </section>

      <!-- About Preview Section -->
      <section id="about-section" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-4xl font-serif font-bold mb-6 text-slate-800">Our Story</h2>
              <p class="text-lg text-slate-600 mb-4 leading-relaxed">
                With over a decade of experience in the catering industry, we have been creating 
                memorable culinary experiences for weddings, corporate events, birthdays, and special 
                occasions.
              </p>
              <p class="text-lg text-slate-600 mb-6 leading-relaxed">
                Our passion for food and commitment to excellence has made us a trusted 
                name in the catering business. We believe that great food brings people together 
                and creates lasting memories.
              </p>
              <a routerLink="/about" class="btn-primary text-lg px-8 py-4 inline-block">
                Learn More About Us
              </a>
            </div>
            <div class="relative">
              <div class="card p-0 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800" 
                  alt="Our Team"
                  class="w-full h-96 object-cover">
              </div>
              <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-trust-500 rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Video Section -->
      <app-process-video></app-process-video>

      <!-- Video Showcase Section -->
      <app-video-showcase></app-video-showcase>

      <!-- Testimonials Section -->
      <app-testimonials></app-testimonials>

      <!-- Gallery Preview Section -->
      <section id="gallery-section" class="py-20 section-gradient">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-serif font-bold mb-4 text-neutral-800">Our Gallery</h2>
            <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our stunning event showcases and culinary masterpieces
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div *ngFor="let item of galleryPreview" 
                 class="card overflow-hidden p-0 group cursor-pointer hover:border-trust-300 transition-all"
                 (click)="navigateToGalleryItem(item.id)">
              <div class="relative overflow-hidden">
                <!-- Video Item -->
                <div *ngIf="item.isVideo" class="relative">
                  <video
                    class="w-full h-64 object-cover"
                    [muted]="true"
                    [loop]="true"
                    [playsInline]="true"
                    [poster]="item.videoPoster || item.url"
                    (mouseenter)="playPreviewVideo($event)"
                    (mouseleave)="pausePreviewVideo($event)">
                    <source [src]="item.videoSrc || item.url" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>
                  <div class="absolute top-2 right-2 bg-trust-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                    </svg>
                    Video
                  </div>
                </div>
                <!-- Image Item -->
                <img *ngIf="!item.isVideo"
                     [src]="item.url" 
                     [alt]="item.title"
                     class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 class="font-semibold text-lg mb-1">{{ item.title }}</h3>
                  <p class="text-sm text-white/90">{{ item.description }}</p>
                  <span class="text-xs text-white/80 mt-2 inline-block">Click to view details →</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center">
            <a routerLink="/gallery" class="btn-primary text-lg px-8 py-4 inline-block">
              View Full Gallery
            </a>
          </div>
        </div>
      </section>

      <!-- Contact Preview Section -->
      <section id="contact-section" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-serif font-bold mb-4 text-slate-800">Get In Touch</h2>
              <p class="text-lg text-slate-600">
                Ready to create something extraordinary? Let's start a conversation.
              </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div class="card text-center">
                <div class="text-4xl mb-4">📧</div>
                <h3 class="font-semibold mb-2 text-slate-800">Email</h3>
                <a href="mailto:info@cateringpro.com" class="text-trust-600 hover:text-trust-700 transition-colors">
                  info@cateringpro.com
                </a>
              </div>
              <div class="card text-center">
                <div class="text-4xl mb-4">📱</div>
                <h3 class="font-semibold mb-2 text-slate-800">Phone</h3>
                <a href="tel:+919876543210" class="text-trust-600 hover:text-trust-700 transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div class="card text-center">
                <div class="text-4xl mb-4">📍</div>
                <h3 class="font-semibold mb-2 text-slate-800">Location</h3>
                <p class="text-slate-600 text-sm">Food City, India</p>
              </div>
            </div>
            <div class="text-center">
              <a routerLink="/contact" class="btn-primary text-lg px-8 py-4 inline-block">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Special Offer Section -->
      <section class="py-20 trust-gradient relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div class="container mx-auto px-4 text-center relative z-10">
          <div class="inline-block bg-gold-400 text-trust-900 font-bold px-4 py-2 rounded-full mb-6 text-sm shadow-lg">
            🎉 LIMITED TIME OFFER
          </div>
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">Book Now & Save 10%</h2>
          <p class="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Early bird discount available for bookings made this month. Don't miss out on this exclusive offer!
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div class="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-white border border-white/30">
              <div class="text-2xl font-bold">10% OFF</div>
              <div class="text-sm">Early Bird Discount</div>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-white border border-white/30">
              <div class="text-2xl font-bold">Free</div>
              <div class="text-sm">Tasting Session</div>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-white border border-white/30">
              <div class="text-2xl font-bold">24/7</div>
              <div class="text-sm">Support Available</div>
            </div>
          </div>
          <a routerLink="/booking" class="bg-white text-trust-700 hover:bg-cream-50 font-bold text-xl px-12 py-5 rounded-lg inline-block shadow-2xl transform hover:scale-110 transition-all duration-300">
            Claim Your Discount Now →
          </a>
          <p class="text-white/80 text-sm mt-4">*Offer valid for limited time only. Terms & conditions apply.</p>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="py-20 bg-slate-900 text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-4xl font-serif font-bold mb-4">Ready to Create Unforgettable Memories?</h2>
          <p class="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers. Your perfect event is just one click away.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a routerLink="/booking" class="btn-trust text-lg px-10 py-4 inline-block">
              Book Your Event Now
            </a>
            <a routerLink="/contact" class="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-lg px-10 py-4 rounded-lg inline-block border-2 border-slate-600 transition-all duration-300">
              Get a Quote
            </a>
          </div>
        </div>
      </section>

      <!-- Floating CTA -->
      <app-floating-cta></app-floating-cta>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  galleryPreview: any[] = [];

  constructor(
    private galleryService: GalleryService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get first 3 gallery items for preview
    const allItems = this.galleryService.getGalleryItems();
    this.galleryPreview = allItems.slice(0, 3);
  }

  navigateToGalleryItem(itemId: string) {
    // Navigate directly to the specific gallery item detail page
    this.router.navigate(['/gallery', itemId]);
  }

  playPreviewVideo(event: Event) {
    const video = event.target as HTMLVideoElement;
    video.play().catch(() => {
      // Autoplay blocked, user can click to play
    });
  }

  pausePreviewVideo(event: Event) {
    const video = event.target as HTMLVideoElement;
    video.pause();
    video.currentTime = 0;
  }
}

