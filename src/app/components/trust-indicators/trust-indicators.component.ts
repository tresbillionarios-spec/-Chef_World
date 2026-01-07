import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trust-indicators',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-12 bg-cream-50 border-y border-trust-100">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="flex flex-col items-center">
            <div class="text-3xl mb-2">✅</div>
            <p class="text-sm font-semibold text-slate-700">100% Satisfaction</p>
            <p class="text-xs text-slate-600">Guarantee</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-3xl mb-2">🏆</div>
            <p class="text-sm font-semibold text-slate-700">Award Winning</p>
            <p class="text-xs text-slate-600">Catering Service</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-3xl mb-2">🔒</div>
            <p class="text-sm font-semibold text-slate-700">Secure Booking</p>
            <p class="text-xs text-slate-600">100% Safe</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-3xl mb-2">⭐</div>
            <p class="text-sm font-semibold text-slate-700">4.9/5 Rating</p>
            <p class="text-xs text-slate-600">2,847 Reviews</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class TrustIndicatorsComponent {
}

