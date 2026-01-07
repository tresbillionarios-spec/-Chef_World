import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../../../services/booking.service';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'step5-contact-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h2 class="text-2xl font-bold mb-2 text-gray-800">Contact Details</h2>
      <p class="text-gray-600 mb-6">Please provide your contact information to complete the booking</p>

      <form class="space-y-6">
        <!-- Name -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">Full Name *</label>
          <input type="text" 
                 [(ngModel)]="name"
                 name="name"
                 required
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                 placeholder="Enter your full name">
        </div>

        <!-- Mobile -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">Mobile Number *</label>
          <input type="tel" 
                 [(ngModel)]="mobile"
                 name="mobile"
                 required
                 pattern="[0-9]{10}"
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                 placeholder="Enter 10-digit mobile number">
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">Email Address *</label>
          <input type="email" 
                 [(ngModel)]="email"
                 name="email"
                 required
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                 placeholder="Enter your email address">
        </div>

        <!-- Event Date -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">Event Date *</label>
          <input type="date" 
                 [(ngModel)]="eventDate"
                 name="eventDate"
                 required
                 [min]="minDate"
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
        </div>

        <!-- Venue -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">Venue *</label>
          <input type="text" 
                 [(ngModel)]="venue"
                 name="venue"
                 required
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                 placeholder="Enter event venue address">
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">Additional Notes</label>
          <textarea [(ngModel)]="notes"
                    name="notes"
                    rows="4"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Any additional information or special requests..."></textarea>
        </div>
      </form>

      <div class="mt-8 flex justify-between">
        <button (click)="onBack()" class="btn-secondary">
          Back
        </button>
        <button [disabled]="!canSubmit()" 
                (click)="onSubmit()"
                class="btn-primary">
          Submit Booking
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class Step5ContactDetailsComponent implements OnInit {
  @Output() back = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<void>();

  name = '';
  mobile = '';
  email = '';
  eventDate = '';
  venue = '';
  notes = '';

  minDate = '';

  constructor(
    private bookingService: BookingService,
    private menuService: MenuService
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    const currentData = this.bookingService.getCurrentBookingData();
    this.name = currentData.name || '';
    this.mobile = currentData.mobile || '';
    this.email = currentData.email || '';
    this.eventDate = currentData.eventDate || '';
    this.venue = currentData.venue || '';
    this.notes = currentData.notes || '';
  }

  canSubmit(): boolean {
    return !!(this.name && this.mobile && this.email && this.eventDate && this.venue);
  }

  onSubmit() {
    if (!this.canSubmit()) return;

    // Update booking data
    this.bookingService.updateBookingData({
      name: this.name,
      mobile: this.mobile,
      email: this.email,
      eventDate: this.eventDate,
      venue: this.venue,
      notes: this.notes
    });

    // Generate email content
    const emailContent = this.generateEmailContent();
    const adminEmail = 'admin@cateringpro.com'; // Replace with actual admin email
    
    // Create mailto link
    const mailtoLink = `mailto:${adminEmail}?subject=New Catering Booking Request&body=${encodeURIComponent(emailContent)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Emit submitted event after a short delay
    setTimeout(() => {
      this.submitted.emit();
    }, 500);
  }

  generateEmailContent(): string {
    const data = this.bookingService.getCurrentBookingData();
    const perPlateCost = this.bookingService.calculatePerPlateCost(
      data.selectedMenuItems || [],
      this.menuService
    );
    const totalCost = this.bookingService.calculateTotalCost(
      perPlateCost,
      data.guestCount || 0
    );

    let content = 'NEW CATERING BOOKING REQUEST\n\n';
    content += '='.repeat(50) + '\n\n';
    
    content += 'EVENT DETAILS:\n';
    content += `Event Type: ${data.eventType || 'N/A'}\n`;
    content += `Presentation Style: ${data.presentationStyle || 'N/A'}\n`;
    content += `Event Date: ${data.eventDate || 'N/A'}\n`;
    content += `Venue: ${data.venue || 'N/A'}\n`;
    content += `Number of Guests: ${data.guestCount || 'N/A'}\n\n`;
    
    content += 'MENU SELECTIONS:\n';
    content += `Estimation Mode: ${data.estimationMode === 'budget' ? 'Budget-Based' : 'Menu-Based'}\n`;
    if (data.budgetPerPlate) {
      content += `Budget Per Plate: ₹${data.budgetPerPlate}\n`;
    }
    content += `Dietary Preference: ${data.dietaryPreference || 'Not specified'}\n\n`;
    
    content += 'Selected Items:\n';
    (data.selectedMenuItems || []).forEach(itemId => {
      const item = this.menuService.getMenuItemById(itemId);
      if (item) {
        content += `- ${item.name} (${item.category}): ₹${item.price}\n`;
      }
    });
    content += '\n';
    
    content += 'COST SUMMARY:\n';
    content += `Cost Per Plate: ₹${perPlateCost}\n`;
    content += `Total Estimated Cost: ₹${totalCost}\n\n`;
    
    content += 'CUSTOMER CONTACT DETAILS:\n';
    content += `Name: ${data.name || 'N/A'}\n`;
    content += `Mobile: ${data.mobile || 'N/A'}\n`;
    content += `Email: ${data.email || 'N/A'}\n\n`;
    
    if (data.specialInstructions) {
      content += `Special Instructions: ${data.specialInstructions}\n\n`;
    }
    
    if (data.notes) {
      content += `Additional Notes: ${data.notes}\n\n`;
    }
    
    content += '='.repeat(50) + '\n';
    content += 'This booking was submitted through the online booking system.\n';
    
    return content;
  }

  onBack() {
    this.back.emit();
  }
}

