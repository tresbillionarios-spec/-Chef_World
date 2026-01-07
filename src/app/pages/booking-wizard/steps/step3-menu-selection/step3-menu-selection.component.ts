import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../../../services/booking.service';
import { MenuService } from '../../../../services/menu.service';
import { MenuItem } from '../../../../models/booking.model';

@Component({
  selector: 'step3-menu-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div>
      <h2 class="text-2xl font-bold mb-2 text-gray-800">Menu Selection & Budget</h2>
      <p class="text-gray-600 mb-6">Choose your menu items and set your budget</p>

      <!-- Guest Count -->
      <div class="mb-6">
        <label class="block text-sm font-semibold mb-2 text-gray-700">Number of Guests *</label>
        <input type="number" 
               [(ngModel)]="guestCount"
               (ngModelChange)="onGuestCountChange()"
               min="1"
               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
               placeholder="Enter number of guests"
               required>
      </div>

      <!-- Estimation Mode Selection -->
      <div class="mb-6">
        <label class="block text-sm font-semibold mb-3 text-gray-700">Estimation Mode</label>
        <div class="grid grid-cols-2 gap-4">
          <button (click)="setEstimationMode('menu')"
                  [class.bg-primary-600]="estimationMode === 'menu'"
                  [class.text-white]="estimationMode === 'menu'"
                  [class.bg-gray-200]="estimationMode !== 'menu'"
                  [class.text-gray-800]="estimationMode !== 'menu'"
                  class="py-3 px-4 rounded-lg font-semibold transition-colors">
            Menu-Based
          </button>
          <button (click)="setEstimationMode('budget')"
                  [class.bg-primary-600]="estimationMode === 'budget'"
                  [class.text-white]="estimationMode === 'budget'"
                  [class.bg-gray-200]="estimationMode !== 'budget'"
                  [class.text-gray-800]="estimationMode !== 'budget'"
                  class="py-3 px-4 rounded-lg font-semibold transition-colors">
            Budget-Based
          </button>
        </div>
      </div>

      <!-- Budget Per Plate (Budget Mode) -->
      <div *ngIf="estimationMode === 'budget'" class="mb-6">
        <label class="block text-sm font-semibold mb-2 text-gray-700">Budget Per Plate (₹) *</label>
        <input type="number" 
               [(ngModel)]="budgetPerPlate"
               (ngModelChange)="onBudgetChange()"
               min="0"
               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
               placeholder="Enter budget per plate">
        <div *ngIf="budgetPerPlate" class="mt-2 text-sm">
          <span class="text-gray-600">Used: ₹{{ usedBudget }} / ₹{{ budgetPerPlate }}</span>
          <span class="ml-4" [class.text-green-600]="remainingBudget >= 0" [class.text-red-600]="remainingBudget < 0">
            Remaining: ₹{{ remainingBudget }}
          </span>
        </div>
      </div>

      <!-- Menu Categories -->
      <div *ngIf="guestCount && guestCount > 0" class="space-y-6">
        <div *ngFor="let category of categories" class="border-b border-gray-200 pb-6 last:border-0">
          <h3 class="text-xl font-semibold mb-4 text-gray-800">
            {{ category }}
            <span *ngIf="categoryLimits[category]" class="text-sm text-gray-500 font-normal">
              (Select up to {{ categoryLimits[category] }})
            </span>
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let item of getItemsByCategory(category)"
                 (click)="toggleMenuItem(item)"
                 [class.card-selected]="isSelected(item.id)"
                 [class.opacity-50]="!canSelectItem(item)"
                 [class.cursor-not-allowed]="!canSelectItem(item)"
                 class="card cursor-pointer hover:scale-105 transition-transform">
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-gray-800">{{ item.name }}</h4>
                <span class="text-primary-600 font-bold">₹{{ item.price }}</span>
              </div>
              <p class="text-sm text-gray-600 mb-2">{{ item.description }}</p>
              <div *ngIf="!canSelectItem(item) && estimationMode === 'budget'" 
                   class="text-xs text-red-600">
                Over budget
              </div>
              <div *ngIf="!canSelectItem(item) && estimationMode === 'menu'" 
                   class="text-xs text-red-600">
                Limit reached
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Optional Fields -->
      <div class="mt-8 space-y-4">
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">Dietary Preference</label>
          <select [(ngModel)]="dietaryPreference"
                  (ngModelChange)="onDietaryPreferenceChange()"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="">Select preference</option>
            <option value="Veg">Vegetarian</option>
            <option value="Jain">Jain</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">Special Instructions</label>
          <textarea [(ngModel)]="specialInstructions"
                    (ngModelChange)="onSpecialInstructionsChange()"
                    rows="3"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Any special requirements or instructions..."></textarea>
        </div>
      </div>

      <!-- Cost Summary -->
      <div *ngIf="guestCount && guestCount > 0 && selectedMenuItems.length > 0" 
           class="mt-6 p-4 bg-primary-50 rounded-lg">
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold text-gray-800">Cost Per Plate:</span>
          <span class="text-xl font-bold text-primary-600">₹{{ perPlateCost }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-800">Total Estimated Cost:</span>
          <span class="text-xl font-bold text-primary-600">₹{{ totalCost }}</span>
        </div>
      </div>

      <div class="mt-8 flex justify-between">
        <button (click)="onBack()" class="btn-secondary">
          Back
        </button>
        <button [disabled]="!canProceed()" 
                (click)="onNext()"
                class="btn-primary">
          Next
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class Step3MenuSelectionComponent implements OnInit {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  guestCount: number | null = null;
  estimationMode: 'menu' | 'budget' = 'menu';
  budgetPerPlate: number | null = null;
  selectedMenuItems: string[] = [];
  dietaryPreference: 'Veg' | 'Jain' | '' = '';
  specialInstructions: string = '';

  categories: string[] = [];
  categoryLimits: Record<string, number> = {};
  menuItems: MenuItem[] = [];

  constructor(
    private bookingService: BookingService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    const currentData = this.bookingService.getCurrentBookingData();
    this.guestCount = currentData.guestCount || null;
    this.estimationMode = currentData.estimationMode || 'menu';
    this.budgetPerPlate = currentData.budgetPerPlate || null;
    this.selectedMenuItems = [...(currentData.selectedMenuItems || [])];
    this.dietaryPreference = currentData.dietaryPreference || '';
    this.specialInstructions = currentData.specialInstructions || '';

    this.menuItems = this.menuService.getMenuItems();
    this.categoryLimits = this.menuService.getCategoryLimits();
    this.categories = [...new Set(this.menuItems.map(item => item.category))];
  }

  getItemsByCategory(category: string): MenuItem[] {
    return this.menuItems.filter(item => item.category === category);
  }

  isSelected(itemId: string): boolean {
    return this.selectedMenuItems.includes(itemId);
  }

  canSelectItem(item: MenuItem): boolean {
    if (this.estimationMode === 'budget' && this.budgetPerPlate) {
      const currentCost = this.calculateCurrentCost();
      return (currentCost + item.price) <= this.budgetPerPlate;
    } else if (this.estimationMode === 'menu') {
      const category = item.category;
      const limit = this.categoryLimits[category];
      if (limit) {
        const selectedInCategory = this.selectedMenuItems.filter(id => {
          const selectedItem = this.menuService.getMenuItemById(id);
          return selectedItem?.category === category;
        }).length;
        return selectedInCategory < limit;
      }
    }
    return true;
  }

  toggleMenuItem(item: MenuItem) {
    if (!this.canSelectItem(item) && !this.isSelected(item.id)) {
      return;
    }

    const index = this.selectedMenuItems.indexOf(item.id);
    if (index > -1) {
      this.selectedMenuItems.splice(index, 1);
    } else {
      this.selectedMenuItems.push(item.id);
    }
    this.updateBookingData();
  }

  calculateCurrentCost(): number {
    return this.selectedMenuItems.reduce((total, id) => {
      const item = this.menuService.getMenuItemById(id);
      return total + (item?.price || 0);
    }, 0);
  }

  get perPlateCost(): number {
    return this.calculateCurrentCost();
  }

  get totalCost(): number {
    if (!this.guestCount) return 0;
    return this.perPlateCost * this.guestCount;
  }

  get usedBudget(): number {
    return this.calculateCurrentCost();
  }

  get remainingBudget(): number {
    if (!this.budgetPerPlate) return 0;
    return this.budgetPerPlate - this.usedBudget;
  }

  setEstimationMode(mode: 'menu' | 'budget') {
    this.estimationMode = mode;
    if (mode === 'menu') {
      this.budgetPerPlate = null;
    }
    this.updateBookingData();
  }

  onGuestCountChange() {
    this.updateBookingData();
  }

  onBudgetChange() {
    // Remove items that exceed budget
    if (this.budgetPerPlate) {
      this.selectedMenuItems = this.selectedMenuItems.filter(id => {
        const item = this.menuService.getMenuItemById(id);
        return item && item.price <= this.budgetPerPlate!;
      });
    }
    this.updateBookingData();
  }

  onDietaryPreferenceChange() {
    this.updateBookingData();
  }

  onSpecialInstructionsChange() {
    this.updateBookingData();
  }

  updateBookingData() {
    this.bookingService.updateBookingData({
      guestCount: this.guestCount || undefined,
      estimationMode: this.estimationMode,
      budgetPerPlate: this.budgetPerPlate || undefined,
      selectedMenuItems: this.selectedMenuItems,
      dietaryPreference: this.dietaryPreference || undefined,
      specialInstructions: this.specialInstructions || undefined
    });
  }

  canProceed(): boolean {
    return !!(this.guestCount && this.guestCount > 0 && this.selectedMenuItems.length > 0);
  }

  onNext() {
    if (this.canProceed()) {
      this.next.emit();
    }
  }

  onBack() {
    this.back.emit();
  }
}

