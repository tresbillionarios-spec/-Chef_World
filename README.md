# Catering Booking Website

A modern, user-friendly catering booking website built with Angular 16+ (Standalone Components), TypeScript, and Tailwind CSS.

## Features

- **5-Step Booking Wizard**: Guided flow from event type selection to contact details
- **Menu Selection**: Two estimation modes (Menu-Based and Budget-Based)
- **Real-time Cost Calculation**: Live estimate updates as selections are made
- **Responsive Design**: Mobile-first, works on all devices
- **State Management**: Uses Angular services with localStorage persistence
- **Static Deployment Ready**: No backend required, uses mailto for submissions

## Pages

1. **Home**: Hero section with CTA
2. **Booking Wizard**: 5-step booking process
3. **About**: Company information
4. **Gallery**: Event photos
5. **Contact**: Contact form and information

## Booking Wizard Steps

1. **Event Type**: Select from Wedding, Birthday, Corporate, or Engagement
2. **Presentation Style**: Choose Buffet, Live Counter, Plated Service, or Traditional Thali
3. **Menu Selection**: 
   - Menu-Based: Select items with category limits
   - Budget-Based: Set per-plate budget and select within budget
4. **Review**: Verify all details before proceeding
5. **Contact Details**: Enter contact information and submit

## Technology Stack

- Angular 16+ (Standalone Components)
- TypeScript
- Tailwind CSS
- Angular Reactive Forms
- localStorage for state persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Configuration

### Menu Configuration

Edit `src/assets/menu.json` to customize:
- Menu items and prices
- Category limits
- Item descriptions

### Admin Email

Update the admin email in `src/app/pages/booking-wizard/steps/step5-contact-details/step5-contact-details.component.ts`:
```typescript
const adminEmail = 'your-admin@email.com';
```

## Deployment

This is a static site and can be deployed to:
- AWS S3 + CloudFront
- Netlify
- GitHub Pages
- Vercel
- Any static hosting service

Build the project and deploy the `dist/catering-static-site` folder.

## Project Structure

```
src/
├── app/
│   ├── components/        # Reusable components (Header, Footer)
│   ├── models/            # TypeScript interfaces
│   ├── pages/             # Page components
│   │   ├── home/
│   │   ├── booking-wizard/
│   │   │   ├── steps/     # Wizard step components
│   │   │   └── components/ # Wizard-specific components
│   │   ├── about/
│   │   ├── gallery/
│   │   └── contact/
│   ├── services/          # Angular services
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── assets/
│   └── menu.json          # Menu configuration
└── styles.css             # Global styles with Tailwind
```

## License

MIT

