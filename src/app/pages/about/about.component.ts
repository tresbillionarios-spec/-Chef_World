import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-serif font-bold text-center mb-8 text-neutral-800">About Us</h1>
          
          <!-- Video Section -->
          <div class="card p-0 overflow-hidden mb-8 shadow-2xl">
            <video
              class="w-full h-auto"
              [controls]="true"
              [poster]="'/assets/about-video-poster.jpg'"
              preload="metadata">
              <source src="/assets/about-video.mp4" type="video/mp4">
              <source src="/assets/about-video.webm" type="video/webm">
              Your browser does not support the video tag.
            </video>
            <div class="p-6 bg-gradient-to-br from-royal-50 to-neutral-50">
              <h3 class="text-2xl font-serif font-bold mb-2 text-neutral-800">Our Journey</h3>
              <p class="text-neutral-600">Watch our story and discover what makes us special</p>
            </div>
          </div>
          
          <div class="prose prose-lg max-w-none">
            <div class="card mb-8">
              <h2 class="text-2xl font-serif font-semibold mb-4 text-neutral-800">Our Story</h2>
              <p class="text-neutral-600 mb-4">
                With over a decade of experience in the catering industry, we have been creating 
                memorable culinary experiences for weddings, corporate events, birthdays, and special 
                occasions. Our passion for food and commitment to excellence has made us a trusted 
                name in the catering business.
              </p>
              <p class="text-neutral-600">
                We believe that great food brings people together and creates lasting memories. 
                That's why we use only the finest ingredients, traditional recipes, and innovative 
                presentation styles to make your event truly special.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div class="card">
                <h3 class="text-xl font-semibold mb-3 text-gray-800">Our Mission</h3>
                <p class="text-gray-600">
                  To deliver exceptional catering services that exceed expectations and create 
                  unforgettable experiences for our clients and their guests.
                </p>
              </div>
              <div class="card">
                <h3 class="text-xl font-semibold mb-3 text-gray-800">Our Values</h3>
                <p class="text-gray-600">
                  Quality, integrity, and customer satisfaction are at the heart of everything we do. 
                  We treat every event as if it were our own.
                </p>
              </div>
            </div>

            <div class="card">
              <h2 class="text-2xl font-semibold mb-4 text-gray-800">Why Choose Us?</h2>
              <ul class="space-y-3 text-gray-600">
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">✓</span>
                  <span>Premium quality ingredients and traditional recipes</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">✓</span>
                  <span>Experienced and professional culinary team</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">✓</span>
                  <span>Customizable menus to suit your preferences</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">✓</span>
                  <span>Flexible presentation styles</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">✓</span>
                  <span>Competitive pricing with transparent estimates</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">✓</span>
                  <span>Dedicated support throughout the planning process</span>
                </li>
              </ul>
            </div>

            <div class="text-center mt-8">
              <a routerLink="/booking" class="btn-primary text-lg px-8 py-4 inline-block">
                Book Your Event
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AboutComponent {
}

