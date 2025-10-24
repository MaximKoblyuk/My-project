# Video Background Setup Instructions

## 📹 Adding Your Video File

To add your `watermarked_preview.mp4` video as the homepage background:

### Step 1: Place the Video File
1. **Copy your video file** `watermarked_preview.mp4` 
2. **Paste it into** the `public/` folder of your project
3. **Final path should be:** `public/watermarked_preview.mp4`

### Step 2: Video Optimization (Recommended)

For best web performance, optimize your video:

**Recommended Video Settings:**
- **Format:** MP4 (H.264 codec)
- **Resolution:** 1920x1080 (Full HD) or 1280x720 (HD)
- **Duration:** 10-30 seconds (loops automatically)
- **File Size:** Under 5MB for best performance
- **Frame Rate:** 24-30 fps

**Using FFmpeg (if you have it installed):**
```bash
# Compress video for web
ffmpeg -i watermarked_preview.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 128k -movflags +faststart optimized_video.mp4

# Create different sizes for responsive design
ffmpeg -i watermarked_preview.mp4 -s 1920x1080 -c:v libx264 -crf 28 video_1080p.mp4
ffmpeg -i watermarked_preview.mp4 -s 1280x720 -c:v libx264 -crf 28 video_720p.mp4
```

### Step 3: Alternative - Use Online Compression Tools

If you don't have FFmpeg:
1. **CloudConvert:** https://cloudconvert.com/mp4-converter
2. **Online Video Compressor:** https://www.videosmaller.com/
3. **Clideo:** https://clideo.com/compress-video

### Step 4: Multiple Video Formats (Optional)

For better browser support, you can provide multiple formats:

1. **Add to `public/` folder:**
   - `watermarked_preview.mp4` (MP4 format)
   - `watermarked_preview.webm` (WebM format - smaller file size)

2. **Update VideoBackground component** to use both:
```tsx
<source src="/watermarked_preview.webm" type="video/webm" />
<source src="/watermarked_preview.mp4" type="video/mp4" />
```

## 🎯 Current Implementation

The video background is already implemented in your homepage with:

✅ **Auto-play** (muted for browser compatibility)
✅ **Loop** (video repeats automatically)  
✅ **Responsive** (covers full screen on all devices)
✅ **Fallback** (gradient background if video fails)
✅ **Mobile optimized** (uses playsInline attribute)
✅ **Overlay** (darkens video so text remains readable)

## 🔧 Customization Options

You can customize the video background in `src/components/VideoBackground.tsx`:

### Adjust Video Brightness
```tsx
style={{ filter: 'brightness(0.7)' }} // Current: 70% brightness
```

### Change Overlay Opacity
```tsx
<div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-purple-800/80" />
<div className="absolute inset-0 bg-black/20" /> // Current: 20% black overlay
```

### Video Loading Poster Image
The component uses `/logo.png` as a poster image while the video loads. You can change this in `src/app/page.tsx`:

```tsx
<VideoBackground 
  src="/watermarked_preview.mp4" 
  poster="/your-poster-image.jpg"  // Change this
  className="min-h-screen flex items-center text-white"
>
```

## 📱 Mobile Considerations

- **Autoplay:** Works on most modern mobile browsers when muted
- **Data Usage:** Consider providing a lower quality version for mobile
- **Battery:** Video backgrounds can drain battery faster
- **Loading:** The poster image shows while video loads

## 🐛 Troubleshooting

### Video Not Playing
1. Check file path: `/watermarked_preview.mp4` in public folder
2. Check file format: Must be MP4 with H.264 codec
3. Check file size: Large files may not load quickly
4. Check browser console for error messages

### Video Too Dark/Bright
Adjust the brightness filter in `VideoBackground.tsx`:
```tsx
style={{ filter: 'brightness(0.9)' }} // Brighter
style={{ filter: 'brightness(0.5)' }} // Darker
```

### Video Not Responsive
The video automatically scales to cover the full container. If you need different behavior, modify the CSS classes in the component.

## 🚀 Performance Tips

1. **Compress your video** to under 5MB
2. **Use shorter loops** (10-20 seconds)
3. **Consider lazy loading** for below-the-fold videos
4. **Provide WebM format** for smaller file sizes
5. **Use poster images** for faster initial load

---

**Your video background is ready to use! Just add your video file to the `public/` folder.** 🎬