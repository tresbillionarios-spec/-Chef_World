import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { GalleryService } from '../../services/gallery.service';
import { GalleryItem } from '../../models/gallery.model';

@Component({
  selector: 'app-video-showcase',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section 
      #videoSection
      class="py-20 bg-slate-900 text-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-serif font-bold mb-4">See Us In Action</h2>
          <p class="text-lg text-slate-300 max-w-2xl mx-auto">
            Watch our chefs create culinary masterpieces and see why thousands trust us for their special events
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <!-- Main Featured Videos -->
          <div *ngFor="let video of featuredVideos; let i = index" 
               (click)="navigateToVideoDetail(video.id, $event)"
               class="card bg-slate-800 border-slate-700 p-0 overflow-hidden group cursor-pointer hover:border-trust-400 transition-all">
            <div class="relative">
              <video
                #featuredVideo
                [attr.data-index]="i"
                class="w-full h-auto"
                [muted]="true"
                [loop]="true"
                [playsInline]="true"
                [controls]="true"
                [poster]="video.videoPoster || video.url"
                [autoplay]="false"
                preload="auto"
                (click)="$event.stopPropagation()"
                (loadedmetadata)="onVideoLoaded($event, i)"
                (error)="onVideoError($event, video)">
                <source [src]="video.videoSrc || video.url" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                <div class="text-white">
                  <h3 class="font-bold text-lg mb-1">{{ video.title }}</h3>
                  <p class="text-sm text-white/90">{{ video.description }}</p>
                </div>
              </div>
              <div class="absolute top-4 right-4 bg-trust-600 text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Click to View Details →
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2 text-white">{{ video.title }}</h3>
              <p class="text-slate-300">{{ video.fullDescription }}</p>
            </div>
          </div>
        </div>

        <!-- Video Grid - Short Videos -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div *ngFor="let video of shortVideos; let i = index" 
               (click)="navigateToVideoDetail(video.id, $event)"
               class="card bg-slate-800 border-slate-700 p-0 overflow-hidden group cursor-pointer hover:border-trust-400 transition-all">
            <div class="relative">
              <video
                #shortVideo
                [attr.data-index]="i + 2"
                class="w-full h-48 object-cover"
                [muted]="true"
                [loop]="true"
                [playsInline]="true"
                [poster]="video.videoPoster || video.url"
                [controls]="true"
                preload="auto"
                (click)="$event.stopPropagation()"
                (loadedmetadata)="onVideoLoaded($event, i + 2)"
                (mouseenter)="playVideo($event)"
                (mouseleave)="pauseVideo($event)">
                <source [src]="video.videoSrc || video.url" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                </svg>
              </div>
              <div class="absolute top-2 right-2 bg-trust-600 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                View Details →
              </div>
            </div>
            <div class="p-4">
              <h4 class="font-semibold text-white mb-1">{{ video.title }}</h4>
              <p class="text-sm text-slate-400">{{ video.description }}</p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <a routerLink="/gallery" class="btn-primary text-lg px-10 py-4 inline-block">
            View All 5 Videos in Gallery →
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    video {
      transition: transform 0.3s ease;
    }
    .group:hover video {
      transform: scale(1.05);
    }
  `]
})
export class VideoShowcaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoSection') videoSection!: ElementRef<HTMLElement>;
  @ViewChildren('featuredVideo') featuredVideosElements!: QueryList<ElementRef<HTMLVideoElement>>;
  
  featuredVideos: GalleryItem[] = [];
  shortVideos: GalleryItem[] = [];
  
  private intersectionObserver?: IntersectionObserver;
  private hasPlayed = false;

  constructor(
    private galleryService: GalleryService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get all video items from gallery
    const allVideos = this.galleryService.getGalleryItems().filter(item => item.isVideo);
    
    // First 2 videos as featured (main videos)
    this.featuredVideos = allVideos.slice(0, 2);
    
    // Next 3 videos as short videos (grid)
    this.shortVideos = allVideos.slice(2, 5);
  }

  ngAfterViewInit() {
    // Wait for DOM to be fully rendered before setting up observer
    setTimeout(() => {
      this.setupIntersectionObserver();
    }, 100);
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
      threshold: 0.2 // Play when 20% of the section is visible
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Section is in view - play featured videos
          this.playFeaturedVideos();
        }
      });
    }, options);

    if (this.videoSection?.nativeElement) {
      this.intersectionObserver.observe(this.videoSection.nativeElement);
    }
  }

  private async playFeaturedVideos() {
    if (this.hasPlayed) return;
    
    // Get ALL video elements from the section (all 5 videos)
    const videoElements = this.videoSection?.nativeElement?.querySelectorAll('video');
    
    if (videoElements && videoElements.length > 0) {
      // Play ALL videos (all 5 videos together)
      const allVideos = Array.from(videoElements) as HTMLVideoElement[];
      
      allVideos.forEach((video: HTMLVideoElement, index: number) => {
        if (video) {
          // Ensure video is muted for autoplay
          video.muted = true;
          
          // Stagger the start slightly for better performance (50ms delay between each)
          const delay = index * 50;
          
          setTimeout(() => {
            // Try to play immediately if ready
            if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
              this.attemptPlay(video);
            } else {
              // Wait for video metadata to load
              const playWhenReady = () => {
                if (video.readyState >= 2) {
                  this.attemptPlay(video);
                } else {
                  setTimeout(playWhenReady, 100);
                }
              };
              playWhenReady();
              
              // Also listen for loadeddata event
              video.addEventListener('loadeddata', () => {
                this.attemptPlay(video);
              }, { once: true });
            }
          }, delay);
        }
      });
      
      this.hasPlayed = true;
    }
  }

  private attemptPlay(video: HTMLVideoElement) {
    if (!video) return;
    
    // Ensure muted for autoplay
    video.muted = true;
    
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video playing successfully
          console.log('Video playing:', video.src);
        })
        .catch((error) => {
          console.log('Video autoplay prevented, will retry:', error);
          // Retry after a short delay
          setTimeout(() => {
            video.play().catch(() => {
              // Still blocked - user will need to interact
            });
          }, 1000);
        });
    }
  }

  onVideoLoaded(event: Event, index: number) {
    const video = event.target as HTMLVideoElement;
    // Video metadata loaded - can attempt to play if section is visible
    if (this.videoSection?.nativeElement) {
      const rect = this.videoSection.nativeElement.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && index < 5 && !this.hasPlayed) {
        // This is one of the 5 videos and section is visible
        // Stagger the play slightly based on index
        const delay = index * 100;
        setTimeout(() => {
          this.attemptPlay(video);
        }, delay);
      }
    }
  }

  onVideoError(event: Event, video: GalleryItem) {
    console.error('Video failed to load:', video.videoSrc || video.url);
    const videoElement = event.target as HTMLVideoElement;
    if (videoElement) {
      videoElement.style.display = 'none';
    }
  }

  private pauseFeaturedVideos() {
    this.featuredVideosElements.forEach((videoRef) => {
      const video = videoRef.nativeElement;
      if (video) {
        video.pause();
      }
    });
  }

  playVideo(event: Event) {
    const video = event.target as HTMLVideoElement;
    video.play().catch(() => {
      // Autoplay blocked, user can click to play
    });
  }

  pauseVideo(event: Event) {
    const video = event.target as HTMLVideoElement;
    video.pause();
    video.currentTime = 0;
  }

  navigateToVideoDetail(videoId: string, event: Event) {
    // Prevent navigation if clicking directly on video element (to allow controls)
    const target = event.target as HTMLElement;
    if (target.tagName === 'VIDEO') {
      return; // Let video controls work
    }
    
    // Navigate to gallery detail page
    this.router.navigate(['/gallery', videoId]);
  }
}

