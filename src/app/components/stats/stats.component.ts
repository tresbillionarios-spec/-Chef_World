import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 trust-gradient">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="text-white">
            <div class="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
            <div class="text-white/90 text-sm md:text-base">Happy Customers</div>
          </div>
          <div class="text-white">
            <div class="text-4xl md:text-5xl font-bold mb-2">10+</div>
            <div class="text-white/90 text-sm md:text-base">Years Experience</div>
          </div>
          <div class="text-white">
            <div class="text-4xl md:text-5xl font-bold mb-2">15,000+</div>
            <div class="text-white/90 text-sm md:text-base">Events Catered</div>
          </div>
          <div class="text-white">
            <div class="text-4xl md:text-5xl font-bold mb-2">98%</div>
            <div class="text-white/90 text-sm md:text-base">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class StatsComponent {
}

