import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-urgency-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="showBanner && !isDismissed" 
         class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out"
         [class.translate-y-0]="showBanner && !isDismissed"
         [class.-translate-y-full]="!showBanner || isDismissed"
         [class.opacity-100]="showBanner && !isDismissed"
         [class.opacity-0]="!showBanner || isDismissed">
      <div class="bg-gradient-to-r from-trust-700 via-trust-600 to-indigo-700 text-white border-b border-trust-400/30 shadow-xl">
        <div class="container mx-auto px-4 py-3">
          <div class="flex flex-col md:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-3 flex-1">
              <div class="flex-shrink-0">
                <div class="relative">
                  <div class="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                  <div class="relative bg-white/10 backdrop-blur-sm rounded-full p-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="flex-1">
                <p class="font-medium text-sm md:text-base leading-tight">
                  <span class="hidden md:inline">Limited Availability This Month - </span>
                  <span class="font-semibold">Book Now & Get 10% Early Bird Discount</span>
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <a routerLink="/booking" 
                 class="bg-white/95 hover:bg-white text-trust-700 font-semibold px-5 py-2 rounded-lg transition-all duration-200 text-sm md:text-base whitespace-nowrap shadow-md hover:shadow-lg transform hover:scale-105">
                Book Now →
              </a>
              <button (click)="dismissBanner()" 
                      class="text-white/80 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                      aria-label="Close banner">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slideDown {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    .banner-enter {
      animation: slideDown 0.5s ease-out;
    }
  `]
})
export class UrgencyBannerComponent implements OnInit, OnDestroy {
  showBanner = false;
  isDismissed = false;
  private scrollThreshold = 400; // Show after scrolling 400px
  private readonly STORAGE_KEY = 'urgency_banner_dismissed';

  ngOnInit() {
    // Check if banner was previously dismissed
    const dismissed = localStorage.getItem(this.STORAGE_KEY);
    if (dismissed === 'true') {
      this.isDismissed = true;
      return;
    }

    // Show banner after a short delay (more natural)
    setTimeout(() => {
      this.checkScrollPosition();
    }, 2000); // Wait 2 seconds before showing
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isDismissed) {
      this.checkScrollPosition();
    }
  }

  private checkScrollPosition() {
    // Show banner only after user scrolls past hero section
    const scrollY = window.scrollY || window.pageYOffset;
    
    if (scrollY > this.scrollThreshold) {
      this.showBanner = true;
    } else {
      // Hide if scrolled back to top
      this.showBanner = false;
    }
  }

  dismissBanner() {
    this.isDismissed = true;
    this.showBanner = false;
    // Remember dismissal for this session (or use localStorage for persistence)
    localStorage.setItem(this.STORAGE_KEY, 'true');
    
    // Optionally: Reset after 24 hours
    // You can add timestamp logic here if needed
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}

