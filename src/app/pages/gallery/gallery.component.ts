import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../services/gallery.service';
import { GalleryItem } from '../../models/gallery.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-serif font-bold text-center mb-4 text-slate-800">Our Gallery</h1>
        <p class="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Explore our collection of images and videos showcasing our culinary excellence
        </p>
        
        <!-- Video Count Badge -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 bg-trust-50 border border-trust-200 px-4 py-2 rounded-full">
            <svg class="w-5 h-5 text-trust-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
            </svg>
            <span class="text-sm font-semibold text-trust-700">{{ getVideoCount() }} Videos</span>
            <span class="text-slate-400">•</span>
            <span class="text-sm text-slate-600">{{ getImageCount() }} Images</span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let item of galleryItems" 
               (click)="viewDetails(item.id)"
               class="card overflow-hidden p-0 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="aspect-w-16 aspect-h-12 bg-slate-200 overflow-hidden relative">
              <!-- Video Item -->
              <div *ngIf="item.isVideo" class="relative">
                <video
                  class="w-full h-64 object-cover"
                  [muted]="true"
                  [loop]="true"
                  [playsInline]="true"
                  [poster]="item.videoPoster || item.url"
                  (mouseenter)="playVideo($event)"
                  (mouseleave)="pauseVideo($event)">
                  <source [src]="item.videoSrc || item.url" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
                <div class="absolute top-2 right-2 bg-trust-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 shadow-lg">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                  Video
                </div>
              </div>
              <!-- Image Item -->
              <img *ngIf="!item.isVideo"
                   [src]="item.url" 
                   [alt]="item.title"
                   class="w-full h-64 object-cover hover:scale-110 transition-transform duration-300">
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-slate-800 mb-1">{{ item.title }}</h3>
              <p class="text-sm text-slate-600">{{ item.description }}</p>
              <span class="text-xs text-trust-600 mt-2 inline-block">Click to view details →</span>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <p class="text-slate-600 mb-6">Ready to create your own memorable event?</p>
          <a routerLink="/booking" class="btn-primary text-lg px-8 py-4 inline-block">
            Book Now
          </a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class GalleryComponent implements OnInit {
  galleryItems: GalleryItem[] = [];

  constructor(
    private galleryService: GalleryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.galleryItems = this.galleryService.getGalleryItems();
  }

  viewDetails(id: string) {
    this.router.navigate(['/gallery', id]);
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

  getVideoCount(): number {
    return this.galleryItems.filter(item => item.isVideo).length;
  }

  getImageCount(): number {
    return this.galleryItems.filter(item => !item.isVideo).length;
  }
}

