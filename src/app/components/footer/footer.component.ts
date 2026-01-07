import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-gray-800 text-white mt-auto">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">Catering Pro</h3>
            <p class="text-gray-300">Premium catering services for your special occasions.</p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a routerLink="/" class="hover:text-white">Home</a></li>
              <li><a routerLink="/booking" class="hover:text-white">Book Now</a></li>
              <li><a routerLink="/about" class="hover:text-white">About</a></li>
              <li><a routerLink="/gallery" class="hover:text-white">Gallery</a></li>
              <li><a routerLink="/contact" class="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Contact</h4>
            <p class="text-gray-300">Email: info@cateringpro.com</p>
            <p class="text-gray-300">Phone: +91 98765 43210</p>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-4 text-center text-gray-300">
          <p>&copy; 2024 Catering Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
}

