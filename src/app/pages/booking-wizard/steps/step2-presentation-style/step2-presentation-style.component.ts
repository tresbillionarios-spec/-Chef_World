import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../../services/booking.service';
import { PresentationStyle } from '../../../../models/booking.model';

@Component({
  selector: 'step2-presentation-style',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2 class="text-2xl font-bold mb-2 text-gray-800">Select Presentation Style</h2>
      <p class="text-gray-600 mb-6">How would you like your food to be served?</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div *ngFor="let style of presentationStyles" 
             (click)="selectStyle(style)"
             [class.card-selected]="selectedStyle === style"
             class="card cursor-pointer hover:scale-105 transition-transform">
          <div class="text-4xl mb-3 text-center">{{ getStyleIcon(style) }}</div>
          <h3 class="text-xl font-semibold text-center mb-2">{{ style }}</h3>
          <p class="text-sm text-gray-600 text-center">{{ getStyleDescription(style) }}</p>
        </div>
      </div>

      <div class="mt-8 flex justify-between">
        <button (click)="onBack()" class="btn-secondary">
          Back
        </button>
        <button [disabled]="!selectedStyle" 
                (click)="onNext()"
                class="btn-primary">
          Next
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class Step2PresentationStyleComponent {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  
  presentationStyles: PresentationStyle[] = ['Buffet', 'Live Counter', 'Plated Service', 'Traditional Thali'];
  selectedStyle: PresentationStyle | null = null;

  constructor(private bookingService: BookingService) {
    const currentData = this.bookingService.getCurrentBookingData();
    if (currentData.presentationStyle) {
      this.selectedStyle = currentData.presentationStyle as PresentationStyle;
    }
  }

  selectStyle(style: PresentationStyle) {
    this.selectedStyle = style;
    this.bookingService.updateBookingData({ presentationStyle: style });
  }

  getStyleIcon(style: PresentationStyle): string {
    const icons: Record<PresentationStyle, string> = {
      'Buffet': '🍽️',
      'Live Counter': '👨‍🍳',
      'Plated Service': '🍛',
      'Traditional Thali': '🥘'
    };
    return icons[style];
  }

  getStyleDescription(style: PresentationStyle): string {
    const descriptions: Record<PresentationStyle, string> = {
      'Buffet': 'Self-service food stations',
      'Live Counter': 'Fresh preparation at counters',
      'Plated Service': 'Individual plated meals',
      'Traditional Thali': 'Traditional Indian thali service'
    };
    return descriptions[style];
  }

  onNext() {
    if (this.selectedStyle) {
      this.next.emit();
    }
  }

  onBack() {
    this.back.emit();
  }
}

