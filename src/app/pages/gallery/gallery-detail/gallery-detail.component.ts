import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GalleryService } from '../../../services/gallery.service';
import { GalleryItem } from '../../../models/gallery.model';

@Component({
  selector: 'app-gallery-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="py-16 bg-white min-h-screen">
      <div class="container mx-auto px-4">
        <!-- Back Button -->
        <button (click)="goBack()" 
                class="mb-6 text-primary-600 hover:text-primary-700 font-semibold flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Gallery
        </button>

        <div *ngIf="galleryItem" class="max-w-5xl mx-auto">
          <!-- Media Section (Image or Video) -->
          <div class="mb-8">
            <!-- Video -->
            <video *ngIf="galleryItem.isVideo"
                   [src]="galleryItem.videoSrc || galleryItem.url"
                   [poster]="galleryItem.videoPoster || galleryItem.url"
                   [controls]="true"
                   class="w-full h-auto rounded-xl shadow-lg object-cover"
                   style="max-height: 600px;">
              <source [src]="galleryItem.videoSrc || galleryItem.url" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <!-- Image -->
            <img *ngIf="!galleryItem.isVideo"
                 [src]="galleryItem.url" 
                 [alt]="galleryItem.title"
                 class="w-full h-auto rounded-xl shadow-lg object-cover"
                 style="max-height: 600px;">
          </div>

          <!-- Content Section -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-2">
              <h1 class="text-4xl font-bold mb-4 text-gray-800">{{ galleryItem.title }}</h1>
              <p class="text-lg text-gray-600 mb-6">{{ galleryItem.description }}</p>
              
              <div class="card mb-8">
                <h2 class="text-2xl font-semibold mb-4 text-gray-800">About This Event</h2>
                <p class="text-gray-700 leading-relaxed">{{ galleryItem.fullDescription }}</p>
              </div>

              <!-- User Story Section -->
              <div class="card bg-primary-50 border-2 border-primary-200">
                <div class="flex items-start mb-4">
                  <div class="text-4xl mr-4">💬</div>
                  <div class="flex-1">
                    <h3 class="text-xl font-semibold mb-2 text-gray-800">Customer Story</h3>
                    <p class="text-primary-700 font-medium mb-2">{{ galleryItem.userStory.name }}</p>
                    <p class="text-sm text-gray-600 mb-4">{{ galleryItem.userStory.event }}</p>
                  </div>
                </div>
                <blockquote class="text-gray-700 italic text-lg leading-relaxed pl-4 border-l-4 border-primary-500">
                  "{{ galleryItem.userStory.quote }}"
                </blockquote>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-1">
              <div class="card sticky top-24">
                <h3 class="text-xl font-semibold mb-4 text-gray-800">Event Details</h3>
                <div class="space-y-4">
                  <div>
                    <span class="text-sm font-semibold text-gray-600 block mb-1">Event Type</span>
                    <span class="text-gray-800">{{ galleryItem.eventType }}</span>
                  </div>
                  <div class="pt-4 border-t border-gray-200">
                    <p class="text-sm text-gray-600 mb-4">Interested in similar services?</p>
                    <a routerLink="/booking" class="btn-primary w-full text-center block">
                      Book Your Event
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading or Not Found -->
        <div *ngIf="!galleryItem && !loading" class="text-center py-16">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Gallery Item Not Found</h2>
          <p class="text-gray-600 mb-6">The gallery item you're looking for doesn't exist.</p>
          <a routerLink="/gallery" class="btn-primary inline-block">
            Back to Gallery
          </a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class GalleryDetailComponent implements OnInit {
  galleryItem: GalleryItem | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private galleryService: GalleryService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.galleryItem = this.galleryService.getGalleryItemById(id);
    }
    this.loading = false;
  }

  goBack() {
    this.router.navigate(['/gallery']);
  }
}

