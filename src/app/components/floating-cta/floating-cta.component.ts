import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-floating-cta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="showFloatingCTA" 
         class="fixed bottom-6 right-6 z-50 animate-bounce">
      <a routerLink="/booking"
         class="bg-royal-600 hover:bg-royal-700 text-white font-bold px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 transform hover:scale-110 transition-all duration-300">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span class="hidden sm:inline">Book Now</span>
        <span class="sm:hidden">Book</span>
      </a>
    </div>
  `,
  styles: []
})
export class FloatingCtaComponent {
  showFloatingCTA = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show floating CTA after user scrolls down 300px
    this.showFloatingCTA = window.scrollY > 300;
  }
}

