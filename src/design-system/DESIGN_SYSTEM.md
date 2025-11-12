# Design System Documentation

## Color Tokens

### Primary Colors
- **Neon Cyan**: `#00f0ff` - Primary accent color
- **Neon Blue**: `#0047AB` - Secondary accent color
- **Glow**: `rgba(0, 240, 255, 0.5)` - Glow effect color

### Dark Backgrounds
- **Background**: `#0a0a0a` - Main background
- **Surface**: `#1a1a1a` - Card and surface backgrounds
- **Card**: `#262626` - Elevated card backgrounds

### Glow Levels
- **Low**: Subtle glow for borders and accents
- **Medium**: Standard glow for hover states
- **High**: Intense glow for active states and highlights

## Spacing Scale

Based on 4px base unit:
- `4px` (1)
- `8px` (2)
- `12px` (3)
- `16px` (4)
- `24px` (6)
- `32px` (8)
- `48px` (12)
- `64px` (16)
- `96px` (24)
- `128px` (32)

## Typography

### Font Families
- **Display**: Space Grotesk - Used for headings
- **Body**: Inter - Used for body text and UI elements

### Font Sizes
- `text-xs`: 12px
- `text-sm`: 14px
- `text-base`: 16px
- `text-lg`: 18px
- `text-xl`: 20px
- `text-2xl`: 24px
- `text-3xl`: 30px
- `text-4xl`: 36px
- `text-5xl`: 48px
- `text-6xl`: 60px

### Font Weights
- `font-normal`: 400
- `font-medium`: 500
- `font-semibold`: 600
- `font-bold`: 700

## Shadows & Elevations

### Elevation System
- **elevation-1**: Subtle elevation with minimal glow
- **elevation-2**: Moderate elevation with medium glow
- **elevation-3**: High elevation with strong glow
- **elevation-4**: Maximum elevation with intense glow

### Neon Glow Shadows
- **neon-sm**: Small glow effect
- **neon-md**: Medium glow effect
- **neon-lg**: Large glow effect

## Motion Tokens

### Easing Curves
- **ease-out**: Standard easing for exits
- **ease-in-out**: Smooth transitions
- **ease-in**: Entrances and builds

### Durations
- **Fast**: 200ms - Quick interactions
- **Normal**: 300ms - Standard transitions
- **Slow**: 500ms - Complex animations

### Animations
- **neon-pulse**: Pulsing glow effect (2s infinite)
- **glow-fade**: Fading glow (3s infinite)
- **gradient-border**: Animated gradient border (3s infinite)
- **tilt-3d**: 3D tilt effect (0.5s)

## Component Usage Guidelines

### Buttons
- Primary: Neon cyan background with glow
- Secondary: Transparent with neon border
- Ghost: Minimal styling, glow on hover

### Cards
- Use elevation system for depth
- Apply glassmorphism for overlays
- 3D tilt on hover for interactive cards

### Inputs
- Dark background with neon border
- Glow on focus state
- Smooth transitions

### Badges
- Small neon border
- Minimal padding
- Used for tech stack tags

## Accessibility

### Reduced Motion
All animations respect `prefers-reduced-motion` media query.

### Color Contrast
All text meets WCAG AA standards for contrast.

### Focus States
All interactive elements have visible focus indicators with neon glow.

## Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px










