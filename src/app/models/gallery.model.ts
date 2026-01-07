export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  description: string;
  fullDescription: string;
  userStory: {
    name: string;
    quote: string;
    event: string;
  };
  eventType: string;
  isVideo?: boolean;
  videoSrc?: string;
  videoPoster?: string;
}

