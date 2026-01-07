import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="bg-white/98 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-trust-100">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <a routerLink="/" class="text-2xl font-serif font-bold text-trust-700 hover:text-trust-800 transition-colors">
            🍽️ The Kitchen Story
          </a>
          <div class="hidden md:flex space-x-8">
            <a routerLink="/" routerLinkActive="text-trust-700 font-semibold" 
               class="text-slate-700 hover:text-trust-700 transition-colors relative group">
              Home
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-trust-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a routerLink="/booking" routerLinkActive="text-trust-700 font-semibold"
               class="text-slate-700 hover:text-trust-700 transition-colors relative group">
              Book Now
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-trust-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a routerLink="/about" routerLinkActive="text-trust-700 font-semibold"
               class="text-slate-700 hover:text-trust-700 transition-colors relative group">
              About
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-trust-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a routerLink="/gallery" routerLinkActive="text-trust-700 font-semibold"
               class="text-slate-700 hover:text-trust-700 transition-colors relative group">
              Gallery
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-trust-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a routerLink="/contact" routerLinkActive="text-trust-700 font-semibold"
               class="text-slate-700 hover:text-trust-700 transition-colors relative group">
              Contact
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-trust-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          <button class="md:hidden text-trust-700" (click)="toggleMobileMenu()">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    [attr.d]="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"></path>
            </svg>
          </button>
        </div>
        <div *ngIf="mobileMenuOpen" class="md:hidden mt-4 space-y-2 border-t border-slate-200 pt-4">
          <a routerLink="/" class="block py-2 text-slate-700 hover:text-trust-700 transition-colors" (click)="closeMobileMenu()">Home</a>
          <a routerLink="/booking" class="block py-2 text-slate-700 hover:text-trust-700 transition-colors" (click)="closeMobileMenu()">Book Now</a>
          <a routerLink="/about" class="block py-2 text-slate-700 hover:text-trust-700 transition-colors" (click)="closeMobileMenu()">About</a>
          <a routerLink="/gallery" class="block py-2 text-slate-700 hover:text-trust-700 transition-colors" (click)="closeMobileMenu()">Gallery</a>
          <a routerLink="/contact" class="block py-2 text-slate-700 hover:text-trust-700 transition-colors" (click)="closeMobileMenu()">Contact</a>
        </div>
      </nav>
    </header>
  `,
  styles: []
})
export class HeaderComponent {
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}

