import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-hero-video',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section 
      #heroSection
      class="relative h-screen w-full overflow-hidden"
      id="hero-section">
      
      <!-- Live Food Preparation Video Background -->
      <video
        #videoElement
        class="absolute inset-0 h-full w-full object-cover z-0"
        [autoplay]="true"
        [loop]="true"
        [muted]="true"
        [playsInline]="true"
        preload="auto"
        poster="/assets/hero-poster.jpg"
        (loadedmetadata)="onVideoLoaded()"
        (error)="onVideoError()"
        aria-label="Live food preparation video showcasing our culinary expertise">
        <source src="/assets/hero.mp4" type="video/mp4">
        <source src="/assets/hero.webm" type="video/webm">
        Your browser does not support the video tag.
      </video>
      
      <!-- Fallback Image Background (shown if video fails) -->
      <div 
        #fallbackImage
        class="absolute inset-0 h-full w-full bg-cover bg-center z-0 hidden"
        [style.background-image]="'url(/assets/hero-fallback.jpg)'">
      </div>
      
      <!-- Warm Trust-Building Overlay Gradient -->
      <div 
        class="absolute inset-0 z-[1] bg-gradient-to-b from-amber-900/50 via-royal-900/40 to-neutral-900/30">
      </div>
      
      <!-- Additional Warm Glow -->
      <div 
        class="absolute inset-0 z-[1] bg-gradient-to-r from-amber-800/20 via-transparent to-royal-800/20">
      </div>
      
      <!-- Content Container -->
      <div 
        #contentContainer
        class="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        
        <!-- Trust Badge -->
        <div class="mb-6 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <svg class="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="text-amber-100 font-semibold text-sm md:text-base">Trusted by 5,000+ Happy Customers</span>
        </div>
        
        <!-- Headline with Warm Accent -->
        <h1 
          #headline
          class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-4 md:mb-6 max-w-5xl leading-tight">
          <span class="block text-white drop-shadow-2xl">Where Catering</span>
          <span class="block bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent drop-shadow-2xl animate-gradient">
            Becomes an Experience
          </span>
        </h1>
        
        <!-- Subtext with Trust Elements -->
        <div class="mb-6 md:mb-8">
          <p 
            #subtext
            class="text-lg sm:text-xl md:text-2xl lg:text-3xl text-amber-50/95 mb-3 max-w-3xl font-light drop-shadow-xl px-4 leading-relaxed">
            Crafting immersive culinary journeys, plated with passion.
          </p>
          <p class="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light drop-shadow-lg">
            Experience the difference of premium ingredients, expert chefs, and personalized service
          </p>
        </div>
        
        <!-- Trust Indicators Row -->
        <div class="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-6 text-white/90">
          <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            <svg class="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-sm font-medium">4.9/5 Rating</span>
          </div>
          <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            <svg class="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm font-medium">10+ Years</span>
          </div>
          <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            <svg class="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm font-medium">15,000+ Events</span>
          </div>
        </div>
        
        <!-- Live Preparation Indicator -->
        <div class="flex items-center gap-2 mb-6 text-amber-100 text-sm md:text-base bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-300/30">
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-amber-400"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
          </span>
          <span class="font-semibold drop-shadow-md">🔴 Live Food Preparation</span>
        </div>
        
        <!-- Enhanced CTA Button -->
        <a 
          #ctaButton
          routerLink="/booking"
          class="group relative bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:via-amber-500 hover:to-amber-600 text-white font-bold text-base sm:text-lg md:text-xl px-10 md:px-12 py-4 md:py-5 rounded-xl shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-110 border-2 border-amber-300/50 overflow-hidden">
          <span class="relative z-10 flex items-center gap-2">
            <span>Begin Your Experience</span>
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </a>
        
        <!-- Additional Trust Message -->
        <p class="mt-6 text-sm md:text-base text-white/70 font-light">
          <span class="inline-flex items-center gap-1">
            <svg class="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Free Tasting Session Available
          </span>
          <span class="mx-2">•</span>
          <span class="inline-flex items-center gap-1">
            <svg class="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            100% Satisfaction Guarantee
          </span>
        </p>
      </div>
      
      <!-- Scroll Down Indicator -->
      <div 
        #scrollIndicator
        class="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer opacity-0"
        (click)="scrollToFeatures()"
        (keydown.enter)="scrollToFeatures()"
        tabindex="0"
        aria-label="Scroll to features section">
        <svg 
          class="w-6 h-6 md:w-8 md:h-8 text-white/80 arrow-bounce"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true">
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M19 14l-7 7m0 0l-7-7m7 7V3">
          </path>
        </svg>
      </div>
    </section>
  `,
  styles: [`
    .hero-video-section {
      position: relative;
      min-height: 100vh;
      height: 100vh;
    }
    
    /* Fallback image styling */
    .fallback-image {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    
    /* Ensure video covers full area */
    video {
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      object-fit: cover;
    }
    
    /* Live indicator animation */
    @keyframes pulse-gold {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
    
    /* Mobile optimizations */
    @media (max-width: 640px) {
      .hero-video-section {
        height: 100vh;
        height: 100dvh; /* Dynamic viewport height for mobile */
      }
    }
  `]
})
export class HeroVideoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('fallbackImage') fallbackImage!: ElementRef<HTMLDivElement>;
  @ViewChild('contentContainer') contentContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('headline') headline!: ElementRef<HTMLHeadingElement>;
  @ViewChild('subtext') subtext!: ElementRef<HTMLParagraphElement>;
  @ViewChild('ctaButton') ctaButton!: ElementRef<HTMLAnchorElement>;
  @ViewChild('scrollIndicator') scrollIndicator!: ElementRef<HTMLDivElement>;

  private videoLoaded = false;
  private videoError = false;
  private scrollTriggerInstance: ScrollTrigger | null = null;
  private animationTimeline: gsap.core.Timeline | null = null;
  private ctaPulseAnimation: gsap.core.Tween | null = null;
  private intersectionObserver: IntersectionObserver | null = null;

  ngOnInit() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit() {
    // Setup intersection observer for performance
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    // Cleanup GSAP animations
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
    }
    if (this.animationTimeline) {
      this.animationTimeline.kill();
    }
    if (this.ctaPulseAnimation) {
      this.ctaPulseAnimation.kill();
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === this.heroSection?.nativeElement) {
        trigger.kill();
      }
    });
  }

  /**
   * Setup IntersectionObserver to trigger animations only when hero is in viewport
   */
  private setupIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback for browsers without IntersectionObserver
      setTimeout(() => this.initializeAnimations(), 100);
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.initializeAnimations();
            this.setupParallaxEffect();
            this.setupCTAButtonPulse();
            if (this.intersectionObserver) {
              this.intersectionObserver.disconnect();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (this.heroSection?.nativeElement) {
      this.intersectionObserver.observe(this.heroSection.nativeElement);
    }
  }

  /**
   * Handle video metadata loaded
   */
  onVideoLoaded(): void {
    this.videoLoaded = true;
    this.checkVideoPlayback();
  }

  /**
   * Handle video load error
   */
  onVideoError(): void {
    this.videoError = true;
    this.showFallbackImage();
  }

  /**
   * Check if video can autoplay (mobile detection)
   */
  private checkVideoPlayback(): void {
    const video = this.videoElement?.nativeElement;
    if (!video) return;
    
    // Try to play video
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video playing successfully
          this.videoLoaded = true;
        })
        .catch(() => {
          // Autoplay blocked - show fallback
          this.showFallbackImage();
        });
    }
  }

  /**
   * Show fallback image if video fails
   */
  private showFallbackImage(): void {
    const fallback = this.fallbackImage?.nativeElement;
    const video = this.videoElement?.nativeElement;
    
    if (fallback && video) {
      fallback.classList.remove('hidden');
      video.classList.add('hidden');
    }
  }

  /**
   * Initialize GSAP animations on page load
   */
  private initializeAnimations(): void {
    if (!this.headline?.nativeElement || !this.subtext?.nativeElement || !this.ctaButton?.nativeElement) {
      return;
    }

    // Set initial states
    gsap.set([this.headline.nativeElement, this.subtext.nativeElement, this.ctaButton.nativeElement], {
      opacity: 0,
      y: 50
    });

    // Create animation timeline
    this.animationTimeline = gsap.timeline({
      delay: 0.3,
      ease: 'power3.out'
    });

    // Animate headline (fade + slide up)
    this.animationTimeline.to(this.headline.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Animate subtext (fade + slide up)
    this.animationTimeline.to(this.subtext.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8');

    // Animate CTA button (fade + slide up)
    this.animationTimeline.to(this.ctaButton.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');

    // Animate scroll indicator
    if (this.scrollIndicator?.nativeElement) {
      this.animationTimeline.to(this.scrollIndicator.nativeElement, {
        opacity: 1,
        duration: 0.5
      }, '-=0.4');
    }
  }

  /**
   * Setup parallax effect for video on scroll
   */
  private setupParallaxEffect(): void {
    const video = this.videoElement?.nativeElement;
    const hero = this.heroSection?.nativeElement;
    
    if (!video || !hero || this.videoError) {
      return;
    }

    // Only apply parallax if video is playing
    this.scrollTriggerInstance = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        // Parallax effect: video moves slower than scroll
        gsap.set(video, {
          y: progress * 100, // Adjust multiplier for parallax intensity
          scale: 1 + progress * 0.1 // Slight zoom out effect
        });
      }
    });
  }

  /**
   * Setup subtle pulse animation for CTA button
   */
  private setupCTAButtonPulse(): void {
    if (!this.ctaButton?.nativeElement) {
      return;
    }

    this.ctaPulseAnimation = gsap.to(this.ctaButton.nativeElement, {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }

  /**
   * Scroll to features section smoothly
   */
  scrollToFeatures(): void {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback: scroll down by viewport height
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Handle keyboard navigation
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' && event.target === this.scrollIndicator?.nativeElement) {
      event.preventDefault();
      this.scrollToFeatures();
    }
  }
}

