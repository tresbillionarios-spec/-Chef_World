import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  template: `
    <div class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-center mb-12 text-gray-800">Contact Us</h1>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Contact Information -->
            <div class="space-y-6">
              <div class="card">
                <h2 class="text-2xl font-semibold mb-6 text-gray-800">Get in Touch</h2>
                
                <div class="space-y-4">
                  <div class="flex items-start">
                    <span class="text-2xl mr-4">📧</span>
                    <div>
                      <h3 class="font-semibold text-gray-800 mb-1">Email</h3>
                      <a href="mailto:info@cateringpro.com" class="text-primary-600 hover:text-primary-700">
                        info@cateringpro.com
                      </a>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <span class="text-2xl mr-4">📱</span>
                    <div>
                      <h3 class="font-semibold text-gray-800 mb-1">Phone</h3>
                      <a href="tel:+919876543210" class="text-primary-600 hover:text-primary-700">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <span class="text-2xl mr-4">📍</span>
                    <div>
                      <h3 class="font-semibold text-gray-800 mb-1">Address</h3>
                      <p class="text-gray-600">
                        123 Catering Street<br>
                        Food City, FC 123456<br>
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <span class="text-2xl mr-4">🕒</span>
                    <div>
                      <h3 class="font-semibold text-gray-800 mb-1">Business Hours</h3>
                      <p class="text-gray-600">
                        Monday - Sunday: 9:00 AM - 9:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Form -->
            <div class="card">
              <h2 class="text-2xl font-semibold mb-6 text-gray-800">Send us a Message</h2>
              
              <form class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-700">Name *</label>
                  <input type="text" 
                         [(ngModel)]="formData.name"
                         name="name"
                         required
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                         placeholder="Your name">
                </div>
                
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-700">Email *</label>
                  <input type="email" 
                         [(ngModel)]="formData.email"
                         name="email"
                         required
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                         placeholder="your.email@example.com">
                </div>
                
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-700">Phone</label>
                  <input type="tel" 
                         [(ngModel)]="formData.phone"
                         name="phone"
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                         placeholder="Your phone number">
                </div>
                
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-700">Message *</label>
                  <textarea [(ngModel)]="formData.message"
                            name="message"
                            rows="5"
                            required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Your message..."></textarea>
                </div>
                
                <button type="button" 
                        (click)="submitForm()"
                        [disabled]="!canSubmit()"
                        class="btn-primary w-full">
                  Send Message
                </button>
              </form>
              
              <div *ngIf="formSubmitted" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p class="text-green-800">Thank you! Your message has been sent. We'll get back to you soon.</p>
              </div>
            </div>
          </div>

          <div class="text-center mt-12">
            <p class="text-gray-600 mb-6">Ready to book your event?</p>
            <a routerLink="/booking" class="btn-primary text-lg px-8 py-4 inline-block">
              Start Booking
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  
  formSubmitted = false;

  canSubmit(): boolean {
    return !!(this.formData.name && this.formData.email && this.formData.message);
  }

  submitForm() {
    if (!this.canSubmit()) return;

    // In a real app, this would send to a backend
    // For now, we'll use mailto
    const subject = encodeURIComponent('Contact Form Submission');
    const body = encodeURIComponent(
      `Name: ${this.formData.name}\n` +
      `Email: ${this.formData.email}\n` +
      `Phone: ${this.formData.phone || 'Not provided'}\n\n` +
      `Message:\n${this.formData.message}`
    );
    
    window.location.href = `mailto:info@cateringpro.com?subject=${subject}&body=${body}`;
    
    this.formSubmitted = true;
    setTimeout(() => {
      this.formSubmitted = false;
      this.formData = { name: '', email: '', phone: '', message: '' };
    }, 5000);
  }
}

