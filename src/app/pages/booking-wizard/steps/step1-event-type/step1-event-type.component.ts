import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../../services/booking.service';
import { EventType } from '../../../../models/booking.model';

@Component({
  selector: 'step1-event-type',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2 class="text-2xl font-bold mb-2 text-gray-800">Select Event Type</h2>
      <p class="text-gray-600 mb-6">Choose the type of event you're planning</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div *ngFor="let eventType of eventTypes" 
             (click)="selectEventType(eventType)"
             [class.card-selected]="selectedEventType === eventType"
             class="card cursor-pointer hover:scale-105 transition-transform">
          <div class="text-4xl mb-3 text-center">{{ getEventIcon(eventType) }}</div>
          <h3 class="text-xl font-semibold text-center mb-2">{{ eventType }}</h3>
        </div>
      </div>

      <div class="mt-8 flex justify-end">
        <button [disabled]="!selectedEventType" 
                (click)="onNext()"
                class="btn-primary">
          Next
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class Step1EventTypeComponent {
  @Output() next = new EventEmitter<void>();
  
  eventTypes: EventType[] = ['Wedding', 'Birthday', 'Corporate', 'Engagement'];
  selectedEventType: EventType | null = null;

  constructor(private bookingService: BookingService) {
    const currentData = this.bookingService.getCurrentBookingData();
    if (currentData.eventType) {
      this.selectedEventType = currentData.eventType as EventType;
    }
  }

  selectEventType(eventType: EventType) {
    this.selectedEventType = eventType;
    this.bookingService.updateBookingData({ eventType });
  }

  getEventIcon(eventType: EventType): string {
    const icons: Record<EventType, string> = {
      'Wedding': '💒',
      'Birthday': '🎂',
      'Corporate': '💼',
      'Engagement': '💍'
    };
    return icons[eventType];
  }

  onNext() {
    if (this.selectedEventType) {
      this.next.emit();
    }
  }
}

