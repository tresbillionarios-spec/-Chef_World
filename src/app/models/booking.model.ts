export interface BookingData {
  eventType?: string;
  presentationStyle?: string;
  guestCount?: number;
  estimationMode?: 'menu' | 'budget';
  budgetPerPlate?: number;
  selectedMenuItems: string[];
  dietaryPreference?: 'Veg' | 'Jain';
  specialInstructions?: string;
  name?: string;
  mobile?: string;
  email?: string;
  eventDate?: string;
  venue?: string;
  notes?: string;
  confirmed?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

export interface MenuConfig {
  categoryLimits: Record<string, number>;
  items: MenuItem[];
}

export type EventType = 'Wedding' | 'Birthday' | 'Corporate' | 'Engagement';

export type PresentationStyle = 'Buffet' | 'Live Counter' | 'Plated Service' | 'Traditional Thali';

