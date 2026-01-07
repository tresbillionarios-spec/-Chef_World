import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { MenuService } from '../../services/menu.service';
import { Step1EventTypeComponent } from './steps/step1-event-type/step1-event-type.component';
import { Step2PresentationStyleComponent } from './steps/step2-presentation-style/step2-presentation-style.component';
import { Step3MenuSelectionComponent } from './steps/step3-menu-selection/step3-menu-selection.component';
import { Step4ReviewComponent } from './steps/step4-review/step4-review.component';
import { Step5ContactDetailsComponent } from './steps/step5-contact-details/step5-contact-details.component';
import { EstimateSummaryComponent } from './components/estimate-summary/estimate-summary.component';

@Component({
  selector: 'app-booking-wizard',
  standalone: true,
  imports: [
    CommonModule,
    Step1EventTypeComponent,
    Step2PresentationStyleComponent,
    Step3MenuSelectionComponent,
    Step4ReviewComponent,
    Step5ContactDetailsComponent,
    EstimateSummaryComponent
  ],
  template: `
    <div class="min-h-screen bg-warm-50 py-8 pb-32 lg:pb-8">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Book Your Catering Event
        </h1>

        <!-- Progress Bar -->
        <div class="max-w-4xl mx-auto mb-8">
          <div class="flex items-center justify-between mb-4">
            <div *ngFor="let step of steps; let i = index" class="flex items-center flex-1">
              <div class="flex flex-col items-center flex-1">
                <div class="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all"
                     [class.bg-primary-600]="currentStep >= i + 1"
                     [class.text-white]="currentStep >= i + 1"
                     [class.bg-gray-300]="currentStep < i + 1"
                     [class.text-gray-600]="currentStep < i + 1">
                  {{ i + 1 }}
                </div>
                <span class="text-xs mt-2 text-center hidden md:block">{{ step }}</span>
              </div>
              <div *ngIf="i < steps.length - 1" 
                   class="h-1 flex-1 mx-2"
                   [class.bg-primary-600]="currentStep > i + 1"
                   [class.bg-gray-300]="currentStep <= i + 1">
              </div>
            </div>
          </div>
        </div>

        <!-- Step Content with Sidebar Layout -->
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-2">
              <div class="card mb-8">
                <step1-event-type *ngIf="currentStep === 1" 
                                  (next)="goToStep(2)"></step1-event-type>
                <step2-presentation-style *ngIf="currentStep === 2"
                                          (next)="goToStep(3)"
                                          (back)="goToStep(1)"></step2-presentation-style>
                <step3-menu-selection *ngIf="currentStep === 3"
                                      (next)="goToStep(4)"
                                      (back)="goToStep(2)"></step3-menu-selection>
                <step4-review *ngIf="currentStep === 4"
                              (next)="goToStep(5)"
                              (back)="goToStep(3)"
                              (edit)="goToStep($event)"></step4-review>
                <step5-contact-details *ngIf="currentStep === 5"
                                       (back)="goToStep(4)"
                                       (submitted)="onSubmitted()"></step5-contact-details>
              </div>
            </div>

            <!-- Sidebar with Estimate Summary (Desktop) -->
            <div *ngIf="currentStep >= 3" class="hidden lg:block">
              <div class="sticky top-24">
                <app-estimate-summary></app-estimate-summary>
              </div>
            </div>
          </div>
        </div>

        <!-- Fixed Estimate Summary (Mobile) -->
        <div *ngIf="currentStep >= 3" class="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
          <app-estimate-summary></app-estimate-summary>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BookingWizardComponent implements OnInit {
  currentStep = 1;
  steps = ['Event Type', 'Presentation', 'Menu', 'Review', 'Contact'];

  constructor(
    private bookingService: BookingService,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if there's existing booking data and restore step
    const data = this.bookingService.getCurrentBookingData();
    if (data.eventType && !data.name) {
      // Resume from appropriate step
      if (data.eventType && !data.presentationStyle) {
        this.currentStep = 2;
      } else if (data.presentationStyle && !data.guestCount) {
        this.currentStep = 3;
      } else if (data.guestCount && !data.confirmed) {
        this.currentStep = 4;
      } else if (data.confirmed && !data.name) {
        this.currentStep = 5;
      }
    }
  }

  goToStep(step: number) {
    this.currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmitted() {
    // Reset and redirect to home
    this.bookingService.resetBookingData();
    this.router.navigate(['/']);
  }
}

