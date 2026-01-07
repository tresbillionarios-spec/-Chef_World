import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-video-testimonials',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-serif font-bold mb-4 text-neutral-800">Hear From Our Customers</h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Real stories from real customers who experienced our exceptional service
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div *ngFor="let testimonial of videoTestimonials" class="card p-0 overflow-hidden group">
            <div class="relative">
              <video
                class="w-full h-64 object-cover"
                [controls]="true"
                [poster]="testimonial.poster"
                preload="metadata">
                <source [src]="testimonial.videoSrc" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <div class="absolute top-4 left-4 bg-royal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Video Review
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 rounded-full bg-royal-100 flex items-center justify-center text-royal-700 font-bold mr-3">
                  {{ testimonial.initials }}
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-800">{{ testimonial.name }}</h4>
                  <p class="text-sm text-neutral-600">{{ testimonial.event }}</p>
                </div>
              </div>
              <div class="flex text-yellow-400 mb-2">
                <svg *ngFor="let i of [1,2,3,4,5]" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <p class="text-sm text-neutral-600 italic">"{{ testimonial.quote }}"</p>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <a routerLink="/booking" class="btn-primary text-lg px-10 py-4 inline-block">
            Book Your Event Now →
          </a>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class VideoTestimonialsComponent {
  videoTestimonials = [
    {
      name: 'Priya & Raj',
      initials: 'PR',
      event: 'Wedding - 250 Guests',
      videoSrc: '/assets/testimonial-wedding.mp4',
      poster: '/assets/testimonial-poster-1.jpg',
      quote: 'Absolutely flawless! Every dish was a masterpiece.'
    },
    {
      name: 'Sarah Johnson',
      initials: 'SJ',
      event: 'Corporate Event',
      videoSrc: '/assets/testimonial-corporate.mp4',
      poster: '/assets/testimonial-poster-2.jpg',
      quote: 'Professional, punctual, and the food was exceptional.'
    },
    {
      name: 'Amit & Family',
      initials: 'AF',
      event: 'Family Reunion',
      videoSrc: '/assets/testimonial-family.mp4',
      poster: '/assets/testimonial-poster-3.jpg',
      quote: 'The traditional thali service was incredible!'
    }
  ];
}

