import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingData } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly STORAGE_KEY = 'catering_booking_data';
  private bookingData$ = new BehaviorSubject<BookingData>(this.loadFromStorage());

  constructor() {
    this.bookingData$.subscribe(data => {
      this.saveToStorage(data);
    });
  }

  getBookingData(): Observable<BookingData> {
    return this.bookingData$.asObservable();
  }

  getCurrentBookingData(): BookingData {
    return this.bookingData$.value;
  }

  updateBookingData(updates: Partial<BookingData>): void {
    const current = this.bookingData$.value;
    this.bookingData$.next({ ...current, ...updates });
  }

  resetBookingData(): void {
    const emptyData: BookingData = {
      selectedMenuItems: []
    };
    this.bookingData$.next(emptyData);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private loadFromStorage(): BookingData {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading booking data from storage:', error);
    }
    return { selectedMenuItems: [] };
  }

  private saveToStorage(data: BookingData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving booking data to storage:', error);
    }
  }

  calculatePerPlateCost(selectedItemIds: string[], menuService: any): number {
    let total = 0;
    selectedItemIds.forEach(id => {
      const item = menuService.getMenuItemById(id);
      if (item) {
        total += item.price;
      }
    });
    return total;
  }

  calculateTotalCost(perPlateCost: number, guestCount: number): number {
    return perPlateCost * guestCount;
  }
}

