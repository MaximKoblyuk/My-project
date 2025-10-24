# Logo Assets

This directory contains the logo assets for the CarServiceFinder application.

## Files

- `logo.svg` - Main logo (square format, 100x100px)
- `logo-horizontal.svg` - Horizontal logo with text (200x60px)
- `logo-icon.svg` - Icon-only version (80x80px)
- `favicon.svg` - Favicon for browser tabs (32x32px)

## Usage

### In React Components
```tsx
import Image from 'next/image'

// Main logo
<Image src="/logo.svg" alt="CarServiceFinder" width={40} height={40} />

// Horizontal logo
<Image src="/logo-horizontal.svg" alt="CarServiceFinder" width={200} height={60} />

// Icon only
<Image src="/logo-icon.svg" alt="CarServiceFinder" width={32} height={32} />
```

### In CSS/HTML
```html
<img src="/logo.svg" alt="CarServiceFinder" width="40" height="40" />
```

## Customization

To replace with your own logo:

1. Replace the SVG files in this directory with your logo files
2. Maintain the same filenames for automatic usage
3. Recommended formats: SVG (preferred), PNG with transparent background
4. Ensure proper sizing for different use cases:
   - Main logo: 40x40px to 100x100px
   - Horizontal: 200x60px ratio
   - Icon: 32x32px or 64x64px
   - Favicon: 32x32px or 16x16px

## Design Guidelines

- Primary color: #2563eb (blue-600)
- Secondary color: #1d4ed8 (blue-700)
- Accent color: #fbbf24 (amber-400)
- Background: White or transparent
- Minimum size: 16x16px
- Maximum size: 200x200px for icons

## Brand Colors

```css
:root {
  --brand-primary: #2563eb;
  --brand-secondary: #1d4ed8;
  --brand-accent: #fbbf24;
  --brand-text: #1f2937;
  --brand-text-light: #6b7280;
}
```