import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="py-20 positive-gradient">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-serif font-bold mb-4 text-slate-800">Loved by Thousands</h2>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            Join over 5,000+ satisfied customers who chose us for their special moments
          </p>
          <div class="flex items-center justify-center gap-2 mt-4">
            <div class="flex text-gold-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <span class="text-2xl font-bold text-slate-800">4.9/5</span>
            <span class="text-slate-600">(2,847 reviews)</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div *ngFor="let testimonial of testimonials" class="card group">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-full bg-trust-100 flex items-center justify-center text-trust-700 font-bold text-lg mr-4">
                {{ testimonial.initials }}
              </div>
              <div>
                <h4 class="font-semibold text-slate-800">{{ testimonial.name }}</h4>
                <p class="text-sm text-slate-600">{{ testimonial.event }}</p>
              </div>
            </div>
            <div class="flex text-gold-500 mb-3">
              <svg *ngFor="let i of [1,2,3,4,5]" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <p class="text-slate-700 italic mb-4">"{{ testimonial.quote }}"</p>
            <p class="text-sm text-slate-600">{{ testimonial.date }}</p>
          </div>
        </div>

        <div class="text-center">
          <a routerLink="/booking" class="btn-primary text-lg px-10 py-4 inline-block">
            Join Our Happy Customers →
          </a>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class TestimonialsComponent {
  testimonials = [
    {
      name: 'Priya & Raj',
      initials: 'PR',
      event: 'Wedding - 250 Guests',
      quote: 'Absolutely flawless! Every dish was a masterpiece. Our guests are still talking about the food months later. Worth every rupee!',
      date: '2 weeks ago'
    },
    {
      name: 'Sarah Johnson',
      initials: 'SJ',
      event: 'Corporate Event - 180 People',
      quote: 'Professional, punctual, and the food was exceptional. We\'ve booked them for our next 3 events. Highly recommend!',
      date: '1 month ago'
    },
    {
      name: 'Amit & Family',
      initials: 'AF',
      event: 'Family Reunion - 60 Guests',
      quote: 'The traditional thali service was incredible. Authentic flavors, beautiful presentation. Our family was amazed!',
      date: '3 weeks ago'
    }
  ];
}

