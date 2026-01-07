import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BookingService } from '../../../../services/booking.service';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-estimate-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white border-t border-gray-200 shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="card">
          <h3 class="text-lg font-bold mb-4 text-gray-800">Cost Estimate</h3>
          
          <div *ngIf="guestCount && guestCount > 0 && selectedMenuItems.length > 0" class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Guests:</span>
              <span class="font-semibold text-gray-800">{{ guestCount }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Items Selected:</span>
              <span class="font-semibold text-gray-800">{{ selectedMenuItems.length }}</span>
            </div>
            
            <div class="border-t border-gray-200 pt-3">
              <div class="flex justify-between mb-2">
                <span class="text-gray-700">Per Plate:</span>
                <span class="font-bold text-primary-600">₹{{ perPlateCost }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-lg font-semibold text-gray-800">Total:</span>
                <span class="text-xl font-bold text-primary-600">₹{{ totalCost }}</span>
              </div>
            </div>
          </div>
          
          <div *ngIf="!guestCount || selectedMenuItems.length === 0" class="text-sm text-gray-500 text-center py-4">
            Complete menu selection to see estimate
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class EstimateSummaryComponent implements OnInit, OnDestroy {
  guestCount: number | null = null;
  selectedMenuItems: string[] = [];
  perPlateCost = 0;
  totalCost = 0;
  private subscription?: Subscription;

  constructor(
    private bookingService: BookingService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.subscription = this.bookingService.getBookingData().subscribe(data => {
      this.guestCount = data.guestCount || null;
      this.selectedMenuItems = data.selectedMenuItems || [];
      this.calculateCosts();
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  calculateCosts() {
    this.perPlateCost = this.bookingService.calculatePerPlateCost(
      this.selectedMenuItems,
      this.menuService
    );
    this.totalCost = this.bookingService.calculateTotalCost(
      this.perPlateCost,
      this.guestCount || 0
    );
  }
}

