import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../../../services/booking.service';
import { MenuService } from '../../../../services/menu.service';
import { BookingData, MenuItem } from '../../../../models/booking.model';

@Component({
  selector: 'step4-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h2 class="text-2xl font-bold mb-2 text-gray-800">Review & Verification</h2>
      <p class="text-gray-600 mb-6">Please review your booking details before proceeding</p>

      <div class="space-y-6">
        <!-- Event Type -->
        <div class="border-b border-gray-200 pb-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">Event Type</h3>
              <p class="text-gray-600">{{ bookingData.eventType }}</p>
            </div>
            <button (click)="editSection(1)" class="text-primary-600 hover:text-primary-700 text-sm font-semibold">
              Edit
            </button>
          </div>
        </div>

        <!-- Presentation Style -->
        <div class="border-b border-gray-200 pb-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">Presentation Style</h3>
              <p class="text-gray-600">{{ bookingData.presentationStyle }}</p>
            </div>
            <button (click)="editSection(2)" class="text-primary-600 hover:text-primary-700 text-sm font-semibold">
              Edit
            </button>
          </div>
        </div>

        <!-- Menu Selections -->
        <div class="border-b border-gray-200 pb-4">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">Menu Selections</h3>
              <p class="text-sm text-gray-500 mb-2">Estimation Mode: {{ bookingData.estimationMode === 'budget' ? 'Budget-Based' : 'Menu-Based' }}</p>
            </div>
            <button (click)="editSection(3)" class="text-primary-600 hover:text-primary-700 text-sm font-semibold">
              Edit
            </button>
          </div>
          <div class="space-y-2">
            <div *ngFor="let itemId of bookingData.selectedMenuItems" class="flex justify-between text-sm">
              <span class="text-gray-700">{{ getMenuItemName(itemId) }}</span>
              <span class="text-gray-600">₹{{ getMenuItemPrice(itemId) }}</span>
            </div>
          </div>
          <div *ngIf="bookingData.dietaryPreference" class="mt-2 text-sm text-gray-600">
            Dietary Preference: {{ bookingData.dietaryPreference }}
          </div>
          <div *ngIf="bookingData.specialInstructions" class="mt-2 text-sm text-gray-600">
            Special Instructions: {{ bookingData.specialInstructions }}
          </div>
        </div>

        <!-- Guest Count & Cost -->
        <div class="border-b border-gray-200 pb-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">Guest Count</h3>
              <p class="text-gray-600">{{ bookingData.guestCount }} guests</p>
            </div>
            <button (click)="editSection(3)" class="text-primary-600 hover:text-primary-700 text-sm font-semibold">
              Edit
            </button>
          </div>
        </div>

        <!-- Cost Summary -->
        <div class="bg-primary-50 p-4 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <span class="font-semibold text-gray-800">Cost Per Plate:</span>
            <span class="text-xl font-bold text-primary-600">₹{{ perPlateCost }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-semibold text-gray-800">Total Estimated Cost:</span>
            <span class="text-2xl font-bold text-primary-600">₹{{ totalCost }}</span>
          </div>
        </div>

        <!-- Confirmation Checkbox -->
        <div class="flex items-start">
          <input type="checkbox" 
                 id="confirm"
                 [(ngModel)]="confirmed"
                 (ngModelChange)="onConfirmChange()"
                 class="mt-1 mr-3 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500">
          <label for="confirm" class="text-gray-700">
            I confirm that all the above details are correct and I agree to proceed with the booking.
          </label>
        </div>
      </div>

      <div class="mt-8 flex justify-between">
        <button (click)="onBack()" class="btn-secondary">
          Back
        </button>
        <button [disabled]="!confirmed" 
                (click)="onNext()"
                class="btn-primary">
          Confirm & Continue
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class Step4ReviewComponent implements OnInit {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() edit = new EventEmitter<number>();

  bookingData: BookingData = { selectedMenuItems: [] };
  confirmed = false;
  perPlateCost = 0;
  totalCost = 0;

  constructor(
    private bookingService: BookingService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.bookingData = { ...this.bookingService.getCurrentBookingData() };
    this.confirmed = this.bookingData.confirmed || false;
    this.calculateCosts();
  }

  calculateCosts() {
    this.perPlateCost = this.bookingService.calculatePerPlateCost(
      this.bookingData.selectedMenuItems || [],
      this.menuService
    );
    this.totalCost = this.bookingService.calculateTotalCost(
      this.perPlateCost,
      this.bookingData.guestCount || 0
    );
  }

  getMenuItemName(itemId: string): string {
    const item = this.menuService.getMenuItemById(itemId);
    return item?.name || itemId;
  }

  getMenuItemPrice(itemId: string): number {
    const item = this.menuService.getMenuItemById(itemId);
    return item?.price || 0;
  }

  editSection(step: number) {
    this.edit.emit(step);
  }

  onConfirmChange() {
    this.bookingService.updateBookingData({ confirmed: this.confirmed });
  }

  onNext() {
    if (this.confirmed) {
      this.next.emit();
    }
  }

  onBack() {
    this.back.emit();
  }
}

