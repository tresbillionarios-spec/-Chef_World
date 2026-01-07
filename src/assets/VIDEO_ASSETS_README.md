# Video Assets Required - Complete List

## 🎥 Video Files Needed

### Hero Section Videos
1. **hero.mp4** (Primary)
   - Location: `/src/assets/hero.mp4`
   - Content: Live food preparation
   - Duration: 15-45 seconds
   - Format: MP4 (H.264)
   - Resolution: 1920x1080 or 4K
   - Size: < 8MB

2. **hero.webm** (Fallback)
   - Location: `/src/assets/hero.webm`
   - Content: Same as hero.mp4
   - Format: WebM (VP9)
   - Better compression

3. **hero-fallback.jpg** (Image Fallback)
   - Location: `/src/assets/hero-fallback.jpg`
   - First frame of video or best frame

4. **hero-poster.jpg** (Video Poster)
   - Location: `/src/assets/hero-poster.jpg`
   - Thumbnail while video loads

### Video Showcase Section
5. **featured-video.mp4**
   - Location: `/src/assets/featured-video.mp4`
   - Content: Behind the scenes kitchen story
   - Duration: 2-5 minutes
   - Shows: Kitchen operations, chef stories, team

6. **event-showcase.mp4**
   - Location: `/src/assets/event-showcase.mp4`
   - Content: Real event highlights
   - Duration: 2-5 minutes
   - Shows: Actual events, guest reactions, food presentation

7. **video-poster-1.jpg** & **video-poster-2.jpg**
   - Location: `/src/assets/video-poster-1.jpg`, `/src/assets/video-poster-2.jpg`
   - Thumbnails for featured videos

### Short Video Clips (Hover Preview)
8. **video-chef-prep.mp4**
   - Location: `/src/assets/video-chef-prep.mp4`
   - Content: Chef preparing dishes
   - Duration: 15-30 seconds
   - Auto-plays on hover

9. **video-plating.mp4**
   - Location: `/src/assets/video-plating.mp4`
   - Content: Artistic plating techniques
   - Duration: 15-30 seconds
   - Auto-plays on hover

10. **video-setup.mp4**
    - Location: `/src/assets/video-setup.mp4`
    - Content: Event setup process
    - Duration: 15-30 seconds
    - Auto-plays on hover

### Process Video
11. **process-video.mp4**
    - Location: `/src/assets/process-video.mp4`
    - Content: Our complete process from consultation to execution
    - Duration: 3-5 minutes
    - Shows: Consultation, menu planning, preparation, execution

12. **process-poster.jpg**
    - Location: `/src/assets/process-poster.jpg`
    - Thumbnail for process video

### Video Testimonials
13. **testimonial-wedding.mp4**
    - Location: `/src/assets/testimonial-wedding.mp4`
    - Content: Customer video testimonial (Wedding)
    - Duration: 1-2 minutes
    - Shows: Customer speaking about their experience

14. **testimonial-corporate.mp4**
    - Location: `/src/assets/testimonial-corporate.mp4`
    - Content: Customer video testimonial (Corporate)
    - Duration: 1-2 minutes

15. **testimonial-family.mp4**
    - Location: `/src/assets/testimonial-family.mp4`
    - Content: Customer video testimonial (Family Event)
    - Duration: 1-2 minutes

16. **testimonial-poster-1.jpg**, **testimonial-poster-2.jpg**, **testimonial-poster-3.jpg**
    - Location: `/src/assets/testimonial-poster-1.jpg` (and 2, 3)
    - Thumbnails for testimonial videos

### About Page Video
17. **about-video.mp4**
    - Location: `/src/assets/about-video.mp4`
    - Content: Company story, team, values
    - Duration: 3-5 minutes
    - Shows: Company history, team members, kitchen tours

18. **about-video-poster.jpg**
    - Location: `/src/assets/about-video-poster.jpg`
    - Thumbnail for about video

### Gallery Videos
19. **gallery-chef-action.mp4**
    - Location: `/src/assets/gallery-chef-action.mp4`
    - Content: Chef preparation video for gallery
    - Duration: 30-60 seconds
    - Shows: Chefs in action

20. **gallery-event-setup.mp4**
    - Location: `/src/assets/gallery-event-setup.mp4`
    - Content: Event setup video for gallery
    - Duration: 30-60 seconds
    - Shows: Setup process

21. **gallery-video-poster-1.jpg** & **gallery-video-poster-2.jpg**
    - Location: `/src/assets/gallery-video-poster-1.jpg` (and 2)
    - Thumbnails for gallery videos

## 📋 Video Specifications Summary

### All Videos Should:
- ✅ Be optimized for web (compressed)
- ✅ Have consistent aspect ratio (16:9 recommended)
- ✅ Include poster images for faster loading
- ✅ Be muted-friendly (no important audio)
- ✅ Loop seamlessly (for short clips)
- ✅ Be mobile-friendly (responsive)

### Video Formats:
- **Primary**: MP4 (H.264 codec)
- **Fallback**: WebM (VP9 codec) - Optional but recommended
- **Poster Images**: JPG or WebP (< 200KB each)

### File Size Guidelines:
- Hero video: < 8MB
- Featured videos: < 15MB
- Short clips: < 3MB each
- Testimonials: < 5MB each
- Process/About videos: < 20MB

## 🎬 Video Content Ideas

### Hero Video (Food Preparation):
- Chef chopping vegetables
- Ingredients being mixed
- Food being cooked (sautéing, grilling)
- Plating and garnishing
- Steam rising from dishes
- Close-up shots of food

### Featured Videos:
- Kitchen tour
- Chef interviews
- Event day preparation
- Team working together
- Food being prepared
- Event execution

### Short Clips:
- Quick plating techniques
- Ingredient preparation
- Cooking processes
- Setup moments
- Food presentation

### Testimonials:
- Customer speaking to camera
- Event footage in background
- Happy guests
- Food being served
- Customer reactions

## 📁 File Structure

```
src/assets/
├── hero.mp4 (Main hero video)
├── hero.webm (Optional)
├── hero-fallback.jpg
├── hero-poster.jpg
├── featured-video.mp4
├── event-showcase.mp4
├── video-poster-1.jpg
├── video-poster-2.jpg
├── video-chef-prep.mp4
├── video-plating.mp4
├── video-setup.mp4
├── process-video.mp4
├── process-poster.jpg
├── testimonial-wedding.mp4
├── testimonial-corporate.mp4
├── testimonial-family.mp4
├── testimonial-poster-1.jpg
├── testimonial-poster-2.jpg
├── testimonial-poster-3.jpg
├── about-video.mp4
├── about-video-poster.jpg
├── gallery-chef-action.mp4
├── gallery-event-setup.mp4
├── gallery-video-poster-1.jpg
└── gallery-video-poster-2.jpg
```

## 🛠️ Video Optimization Tips

1. **Compression Tools**:
   - HandBrake (free, open-source)
   - FFmpeg (command-line)
   - Adobe Media Encoder
   - Online: CloudConvert, FreeConvert

2. **Settings for Web**:
   - H.264 codec
   - 24-30 fps
   - Bitrate: 2-5 Mbps (adjust based on quality needs)
   - Resolution: 1920x1080 (Full HD) or 1280x720 (HD)

3. **Creating WebM**:
   - Use FFmpeg: `ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm`

4. **Poster Images**:
   - Extract first frame: `ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 poster.jpg`
   - Or use best frame from video
   - Optimize with TinyPNG or ImageOptim

## ✅ Implementation Status

All video components are implemented and ready. Just add the video files to `/src/assets/` and they will automatically work!

The site now supports:
- ✅ Hero video (full-screen)
- ✅ Video showcase section
- ✅ Process video
- ✅ Video testimonials
- ✅ Gallery videos (mixed with images)
- ✅ About page video

