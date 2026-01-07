# Quick Setup Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:4200`

3. **Build for Production**
   ```bash
   npm run build
   ```
   Output will be in `dist/catering-static-site/`

## Configuration

### Update Admin Email

Edit `src/app/pages/booking-wizard/steps/step5-contact-details/step5-contact-details.component.ts`:
```typescript
const adminEmail = 'your-admin@email.com'; // Line ~45
```

### Customize Menu

Edit `src/assets/menu.json` to:
- Add/remove menu items
- Update prices
- Modify category limits
- Change descriptions

### Customize Colors

Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: { ... }, // Main brand color
  warm: { ... }     // Warm accent colors
}
```

## Project Structure

```
src/
├── app/
│   ├── components/          # Header, Footer
│   ├── models/              # TypeScript interfaces
│   ├── pages/               # All page components
│   │   ├── home/
│   │   ├── booking-wizard/  # 5-step wizard
│   │   ├── about/
│   │   ├── gallery/
│   │   └── contact/
│   └── services/            # BookingService, MenuService
├── assets/
│   └── menu.json            # Menu configuration
└── styles.css               # Global styles
```

## Features Implemented

✅ Angular 16+ Standalone Components
✅ 5-Step Booking Wizard
✅ Menu-Based & Budget-Based Estimation
✅ Real-time Cost Calculation
✅ localStorage State Persistence
✅ Responsive Mobile-First Design
✅ Progress Indicator
✅ Sticky Estimate Summary
✅ Email Submission via mailto
✅ All Required Pages

## Next Steps

1. Replace placeholder images with actual photos
2. Update contact information
3. Customize menu items and prices
4. Test the booking flow
5. Deploy to static hosting

## Deployment

This is a static site. Build and deploy the `dist/catering-static-site` folder to:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

