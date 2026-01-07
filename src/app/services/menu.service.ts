import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuConfig, MenuItem } from '../models/booking.model';
import menuData from '../../assets/menu.json';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuConfig: MenuConfig = menuData as MenuConfig;

  getMenuConfig(): MenuConfig {
    return this.menuConfig;
  }

  getMenuItems(): MenuItem[] {
    return this.menuConfig.items;
  }

  getItemsByCategory(category: string): MenuItem[] {
    return this.menuConfig.items.filter(item => item.category === category);
  }

  getCategoryLimits(): Record<string, number> {
    return this.menuConfig.categoryLimits;
  }

  getMenuItemById(id: string): MenuItem | undefined {
    return this.menuConfig.items.find(item => item.id === id);
  }

  getItemsByCategories(categories: string[]): MenuItem[] {
    return this.menuConfig.items.filter(item => categories.includes(item.category));
  }
}

