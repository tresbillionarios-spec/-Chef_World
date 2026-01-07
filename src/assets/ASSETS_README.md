# Required Assets for Hero Video Section - Live Food Preparation

## Video File - Food Preparation Animation
**Location:** `/src/assets/hero.mp4` (Primary) and `/src/assets/hero.webm` (Fallback)

**Specifications:**
- Format: MP4 (H.264 codec) - Primary format
- Format: WebM (VP9 codec) - Fallback format for better compression
- Resolution: 1920x1080 (Full HD) or higher (4K recommended for premium look)
- Duration: 15-45 seconds (will loop seamlessly)
- File size: < 8MB (optimized for web, can be larger for high quality)
- **Content: LIVE FOOD PREPARATION** - Must show:
  - Chefs preparing dishes in real-time
  - Ingredients being chopped, mixed, cooked
  - Plating and presentation techniques
  - Steam, sizzle, and cooking action
  - Professional kitchen environment
  - Close-up shots of food preparation
- Aspect ratio: 16:9 recommended
- Frame rate: 24fps or 30fps for smooth motion

**Video Content Requirements:**
- ✅ Live cooking action (not static images)
- ✅ Chef hands preparing food
- ✅ Ingredients being prepared
- ✅ Cooking processes (sautéing, grilling, etc.)
- ✅ Plating and garnishing
- ✅ Steam and cooking effects
- ✅ Professional kitchen setting
- ✅ Smooth, cinematic camera movements

**Tips:**
- Use video compression tools (HandBrake, FFmpeg) to optimize file size
- Ensure video is muted-friendly (no important audio needed)
- Test autoplay on mobile devices
- Create seamless loop (end frame should match start frame)
- Use slow-motion for dramatic effect (optional)
- Consider multiple camera angles

## Fallback Image
**Location:** `/src/assets/hero-fallback.jpg`

**Specifications:**
- Format: JPG or WebP
- Resolution: 1920x1080 minimum (4K for retina displays)
- File size: < 500KB (optimized)
- Content: High-quality food preparation image matching video aesthetic
- Should show: Chef preparing food, ingredients, or cooking action
- Aspect ratio: 16:9 recommended

**Tips:**
- Use image optimization tools (TinyPNG, ImageOptim)
- Ensure image matches the video's visual style
- Test on various screen sizes
- Use first frame of video as fallback for consistency

## Video Poster Image (Optional but Recommended)
**Location:** `/src/assets/hero-poster.jpg`

**Specifications:**
- Format: JPG or WebP
- Resolution: 1920x1080 minimum
- File size: < 200KB (optimized)
- Content: First frame or best frame from video
- Used while video is loading
- Aspect ratio: 16:9 recommended

## Adding Assets

1. Place `hero.mp4` (food preparation video) in `/src/assets/` directory
2. Place `hero.webm` (optional, for better browser support) in `/src/assets/` directory
3. Place `hero-fallback.jpg` (food preparation image) in `/src/assets/` directory
4. Place `hero-poster.jpg` (video poster/thumbnail) in `/src/assets/` directory (optional)
5. The component will automatically:
   - Use WebM if MP4 is not supported
   - Use fallback image if video fails to load
   - Show poster image while video is loading

## Testing

- Test video autoplay on desktop browsers
- Test fallback image on mobile devices (if autoplay is blocked)
- Verify video plays inline on mobile (playsInline attribute)
- Check performance: video should not block page load

