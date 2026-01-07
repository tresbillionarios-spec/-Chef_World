import { Injectable } from '@angular/core';
import { GalleryItem } from '../models/gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private galleryItems: GalleryItem[] = [
    {
      id: 'wedding-buffet',
      url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200',
      title: 'Wedding Buffet',
      description: 'Elegant buffet setup for a grand wedding',
      fullDescription: 'Our wedding buffet service creates an unforgettable dining experience for your special day. We offer an extensive selection of traditional and contemporary dishes, beautifully presented in an elegant buffet style. Our team ensures seamless service, allowing you and your guests to enjoy a variety of flavors while celebrating your union. From appetizers to desserts, every dish is crafted with love and attention to detail.',
      userStory: {
        name: 'Priya & Raj',
        quote: 'The buffet setup was absolutely stunning! Our guests couldn\'t stop raving about the food quality and presentation. The team was professional, and everything was perfectly timed. It made our wedding day even more special.',
        event: 'Wedding Reception - 250 Guests'
      },
      eventType: 'Wedding'
    },
    {
      id: 'corporate-event',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
      title: 'Corporate Event',
      description: 'Professional catering for corporate gatherings',
      fullDescription: 'Elevate your corporate events with our professional catering services. We understand the importance of making a great impression in business settings. Our corporate catering includes a variety of options suitable for conferences, seminars, product launches, and team building events. We ensure punctual delivery, professional presentation, and high-quality food that keeps your team energized throughout the day.',
      userStory: {
        name: 'Sarah Johnson, CEO',
        quote: 'We\'ve used their services for three consecutive corporate events, and they never disappoint. The food is always fresh, the service is impeccable, and they handle everything so professionally. Our clients and employees are always impressed.',
        event: 'Annual Company Conference - 180 Attendees'
      },
      eventType: 'Corporate'
    },
    {
      id: 'traditional-thali',
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
      title: 'Traditional Thali',
      description: 'Authentic Indian thali presentation',
      fullDescription: 'Experience the authentic flavors of India with our traditional thali service. Each thali is a complete meal featuring a perfect balance of flavors, textures, and nutrition. We serve a variety of regional thalis, each representing the rich culinary heritage of different parts of India. From North Indian to South Indian, Gujarati to Rajasthani, our thalis are a journey through India\'s diverse cuisine.',
      userStory: {
        name: 'Amit & Family',
        quote: 'The traditional thali service brought back so many memories of home. The variety was incredible, and each dish was authentic and delicious. Our family gathering felt complete with this amazing spread.',
        event: 'Family Reunion - 60 Guests'
      },
      eventType: 'Traditional'
    },
    {
      id: 'live-counter',
      url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
      title: 'Live Counter',
      description: 'Fresh preparation at live cooking stations',
      fullDescription: 'Watch the magic happen with our live counter service! Our expert chefs prepare dishes right in front of your guests, creating an interactive and engaging dining experience. From live pasta stations to dosa counters, chaat corners to dessert stations, we bring the kitchen to your event. This not only ensures the freshest food but also adds entertainment value to your celebration.',
      userStory: {
        name: 'Meera & Friends',
        quote: 'The live counter was the highlight of our event! Guests loved watching the chefs prepare fresh dosas and chaat. It was interactive, fun, and the food was absolutely delicious. Everyone kept going back for more!',
        event: 'Birthday Party - 80 Guests'
      },
      eventType: 'Live Cooking'
    },
    {
      id: 'plated-service',
      url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200',
      title: 'Plated Service',
      description: 'Elegant individual plated meals',
      fullDescription: 'For a sophisticated and elegant dining experience, our plated service is perfect. Each guest receives a beautifully plated, individually portioned meal served with style and precision. This service is ideal for formal events, intimate gatherings, or when you want to ensure every guest receives equal attention. Our presentation is restaurant-quality, and our service staff ensures timely and professional delivery.',
      userStory: {
        name: 'David & Emily',
        quote: 'The plated service was exquisite! Every plate looked like a work of art, and the flavors were outstanding. The service was smooth and professional. Our engagement party felt like a fine dining experience.',
        event: 'Engagement Party - 100 Guests'
      },
      eventType: 'Plated'
    },
    {
      id: 'birthday-celebration',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
      title: 'Birthday Celebration',
      description: 'Special catering for birthday parties',
      fullDescription: 'Make birthdays extra special with our customized birthday catering! Whether it\'s a child\'s party with fun finger foods or an adult celebration with sophisticated options, we create menus that match the vibe. We can include themed decorations, special birthday desserts, and kid-friendly options. Our team ensures the birthday person and all guests have a memorable culinary experience.',
      userStory: {
        name: 'Rohit\'s Parents',
        quote: 'Our son\'s 10th birthday party was a huge success thanks to the amazing food! The kids loved the fun snacks, and the adults enjoyed the variety. The birthday cake they provided was the perfect finishing touch. Highly recommended!',
        event: '10th Birthday Party - 50 Guests'
      },
      eventType: 'Birthday'
    },
    {
      id: 'chef-preparation-video',
      url: '/assets/gallery-video-poster-1.jpg',
      title: 'Chef in Action',
      description: 'Watch our chefs prepare dishes with precision',
      fullDescription: 'Experience the artistry and skill of our professional chefs as they create culinary masterpieces. This video showcases the dedication, precision, and passion that goes into every dish we serve.',
      userStory: {
        name: 'Event Organizer',
        quote: 'Seeing the chefs work was mesmerizing. The attention to detail and the passion they showed was incredible.',
        event: 'Corporate Event'
      },
      eventType: 'Corporate',
      isVideo: true,
      videoSrc: '/assets/Chef in Action.mp4',
      videoPoster: '/assets/gallery-video-poster-1.jpg'
    },
    {
      id: 'event-setup-video',
      url: '/assets/gallery-video-poster-2.jpg',
      title: 'Event Setup Process',
      description: 'Behind the scenes of our event setup',
      fullDescription: 'Get an inside look at how we transform venues into stunning dining experiences. From table arrangements to food stations, see the meticulous planning and execution that makes every event special.',
      userStory: {
        name: 'Wedding Planner',
        quote: 'The setup process was flawless. Everything was organized and executed perfectly.',
        event: 'Wedding'
      },
      eventType: 'Wedding',
      isVideo: true,
      videoSrc: '/assets/Event Setup Process.mp4',
      videoPoster: '/assets/gallery-video-poster-2.jpg'
    },
    {
      id: 'kitchen-story-video',
      url: '/assets/video-poster-1.jpg',
      title: 'Our Kitchen Story',
      description: 'Behind the scenes kitchen story',
      fullDescription: 'Experience the passion and precision that goes into every dish we create. This cinematic video takes you behind the scenes of our kitchen, showing the dedication and artistry of our culinary team.',
      userStory: {
        name: 'Food Enthusiast',
        quote: 'Watching the kitchen story made me appreciate the craftsmanship even more. The attention to detail is remarkable.',
        event: 'Kitchen Tour'
      },
      eventType: 'Behind The Scenes',
      isVideo: true,
      videoSrc: '/assets/Cinematic Catering Kitchen.mp4',
      videoPoster: '/assets/video-poster-1.jpg'
    },
    {
      id: 'event-highlights-video',
      url: '/assets/video-poster-2.jpg',
      title: 'Event Highlights',
      description: 'Real events, real moments',
      fullDescription: 'Watch real events we\'ve catered and see the magic we create. This compilation showcases the joy, elegance, and memorable moments from various events we\'ve been part of.',
      userStory: {
        name: 'Event Coordinator',
        quote: 'The event highlights video perfectly captures the essence of what makes their service special.',
        event: 'Multiple Events'
      },
      eventType: 'Event Showcase',
      isVideo: true,
      videoSrc: '/assets/Event Highlights.mp4',
      videoPoster: '/assets/video-poster-2.jpg'
    },
    {
      id: 'chef-prep-video',
      url: '/assets/video-chef-prep-poster.jpg',
      title: 'Chef Preparation',
      description: 'Watch our chefs prepare dishes with precision',
      fullDescription: 'See our expert chefs in action as they prepare dishes with precision and passion. Every cut, every seasoning, every detail matters in creating the perfect culinary experience.',
      userStory: {
        name: 'Culinary Student',
        quote: 'The chef preparation video is inspiring. The skill and technique on display is incredible.',
        event: 'Kitchen Demonstration'
      },
      eventType: 'Chef Skills',
      isVideo: true,
      videoSrc: '/assets/Chef Preparation.mp4',
      videoPoster: '/assets/video-chef-prep-poster.jpg'
    },
    {
      id: 'plating-art-video',
      url: '/assets/video-plating-poster.jpg',
      title: 'Plating Art',
      description: 'Artistic plating techniques',
      fullDescription: 'Food is not just about taste—it\'s an art form. Watch as our chefs transform dishes into visual masterpieces through artistic plating techniques that delight both the eyes and the palate.',
      userStory: {
        name: 'Food Photographer',
        quote: 'The plating art is absolutely stunning. Every dish is a work of art.',
        event: 'Culinary Art Showcase'
      },
      eventType: 'Culinary Art',
      isVideo: true,
      videoSrc: '/assets/Plating Art.mp4',
      videoPoster: '/assets/video-plating-poster.jpg'
    }
  ];

  getGalleryItems(): GalleryItem[] {
    return this.galleryItems;
  }

  getGalleryItemById(id: string): GalleryItem | undefined {
    return this.galleryItems.find(item => item.id === id);
  }

  getGalleryItemsByEventType(eventType: string): GalleryItem[] {
    return this.galleryItems.filter(item => item.eventType === eventType);
  }
}

