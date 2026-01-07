import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-process-video',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section 
      #processSection
      class="py-20 positive-gradient">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-serif font-bold mb-6 text-slate-800">Our Process</h2>
            <p class="text-lg text-slate-600 mb-4 leading-relaxed">
              From consultation to execution, we ensure every detail is perfect. Watch how we bring your vision to life.
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start">
                <span class="text-trust-600 mr-3 text-xl">✓</span>
                <div>
                  <h4 class="font-semibold text-slate-800 mb-1">Initial Consultation</h4>
                  <p class="text-slate-600 text-sm">We understand your vision and requirements</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-trust-600 mr-3 text-xl">✓</span>
                <div>
                  <h4 class="font-semibold text-slate-800 mb-1">Menu Customization</h4>
                  <p class="text-slate-600 text-sm">Tailored menu selection based on your preferences</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-trust-600 mr-3 text-xl">✓</span>
                <div>
                  <h4 class="font-semibold text-slate-800 mb-1">Tasting Session</h4>
                  <p class="text-slate-600 text-sm">Sample our dishes before finalizing</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-trust-600 mr-3 text-xl">✓</span>
                <div>
                  <h4 class="font-semibold text-slate-800 mb-1">Event Execution</h4>
                  <p class="text-slate-600 text-sm">Flawless delivery on your special day</p>
                </div>
              </li>
            </ul>
            <a routerLink="/booking" class="btn-primary text-lg px-8 py-4 inline-block">
              Start Your Journey
            </a>
          </div>
          <div class="relative">
            <div class="card p-0 overflow-hidden shadow-2xl">
              <video
                #processVideo
                class="w-full h-auto rounded-lg"
                [muted]="true"
                [loop]="true"
                [playsInline]="true"
                [controls]="true"
                preload="auto">
                <source src="/assets/Premium Catering Kitchen.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-trust-500 rounded-full opacity-10"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ProcessVideoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('processVideo') processVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('processSection') processSection!: ElementRef<HTMLElement>;
  
  private intersectionObserver?: IntersectionObserver;
  private hasPlayed = false;

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 // Play when 30% of the section is visible
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Section is in view - play video
          this.playVideo();
        } else {
          // Section is out of view - pause video (optional)
          // Uncomment the line below if you want to pause when scrolled away
          // this.pauseVideo();
        }
      });
    }, options);

    if (this.processSection?.nativeElement) {
      this.intersectionObserver.observe(this.processSection.nativeElement);
    }
  }

  private async playVideo() {
    const video = this.processVideo?.nativeElement;
    if (video && !this.hasPlayed) {
      try {
        await video.play();
        this.hasPlayed = true;
      } catch (error) {
        // Autoplay was prevented - user interaction required
        console.log('Video autoplay prevented, user interaction required');
      }
    }
  }

  private pauseVideo() {
    const video = this.processVideo?.nativeElement;
    if (video) {
      video.pause();
    }
  }
}

