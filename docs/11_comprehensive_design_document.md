# Tikaram Spirits - Comprehensive Design Document

**Version:** 1.0  
**Last Updated:** 2024  
**Project:** tikaramspirits.com  
**Framework:** Next.js 14+ (App Router)

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing & Layout](#spacing--layout)
5. [Shadows & Elevation](#shadows--elevation)
6. [Borders & Radius](#borders--radius)
7. [Design Tokens](#design-tokens)
8. [Layout Structure](#layout-structure)
9. [Navigation System](#navigation-system)
10. [Sitemap & Routes](#sitemap--routes)
11. [Component Patterns](#component-patterns)
12. [Asset System](#asset-system)
13. [Backgrounds & Textures](#backgrounds--textures)
14. [Interactive States](#interactive-states)
15. [Responsive Breakpoints](#responsive-breakpoints)

---

## Design Philosophy

### Brand Identity
- **Vibe:** Luxurious, Sun-soaked, Craft-forward, Florida heritage
- **Aesthetic:** Bold Heritage (High contrast, split storytelling, grid mosaics)
- **Primary Goal:** Drive retail foot traffic through Store Locator
- **Target Audience:** Connoisseurs of fine spirits, mixology enthusiasts, luxury lifestyle consumers

### Design Principles
1. **Mobile-First:** All base values apply to mobile, then scale up for tablet (`md`) and desktop (`lg`)
2. **Semantic Spacing:** Relationship-based spacing system (Connected → Grouped → Distinct → Severed)
3. **Optical Corrections:** Playfair Display requires negative top margins for visual alignment
4. **Luxury Feel:** Cinematic transitions, glassmorphism effects, subtle textures
5. **Accessibility:** High contrast ratios, readable typography, semantic HTML

---

## Color System

### Primary Backgrounds

| Token | Hex Code | Usage | Tailwind Class |
|-------|----------|-------|----------------|
| **Deep Forest** | `#004225` | Primary brand background, headers, footer | `bg-tikaram-deep-forest` |
| **Off-White (Paper)** | `#F8F8F8` | Light section backgrounds, cards | `bg-tikaram-off-white` |
| **Rich Black** | `#050505` | Dark section backgrounds, overlays | `bg-tikaram-rich-black` |

### Text Colors

| Token | Hex Code | Usage | Tailwind Class |
|-------|----------|-------|----------------|
| **Charcoal** | `#36454F` | Standard body text on light backgrounds | `text-tikaram-charcoal` |
| **Cream** | `#FFFDD0` | Body text on dark backgrounds | `text-tikaram-cream` |
| **Pure White** | `#FFFFFF` | Headings on dark backgrounds | `text-tikaram-pure-white` |

### Accent Colors

| Token | Hex Code | Usage | Tailwind Class |
|-------|----------|-------|----------------|
| **Tikaram Gold** | `#D4AF37` | Primary CTA buttons, active states, highlights | `text-tikaram-gold` / `bg-tikaram-gold` |
| **Rust** | `#B7410E` | Error states, sale tags, warnings | `text-tikaram-rust` / `bg-tikaram-rust` |

### Color Usage Rules
- **Body text on dark backgrounds:** Use `opacity-90` (never pure white) for readability
- **Gold accents:** Use for primary CTAs, hover states, active navigation items
- **Rust:** Reserved for error messages, sale badges, destructive actions

---

## Typography System

### Font Families

| Family | Variable | Usage | Google Font |
|--------|----------|-------|-------------|
| **Primary / Headings** | `--font-serif` | All headings (h1-h4) | Playfair Display |
| **Secondary / Body** | `--font-sans` | Body text, buttons, navigation | Montserrat |
| **Accent** | `--font-accent` | Captions, small text | Lato |

### Responsive Type Scale (Fluid)

| Token | Element | Mobile (Base) | Desktop (lg) | CSS Implementation |
|-------|---------|---------------|--------------|-------------------|
| **Display Hero** | `h1` | `2.5rem` (40px) | `4.5rem` (72px) | `clamp(2.5rem, 5vw, 4.5rem)` |
| **Section Title** | `h2` | `2.0rem` (32px) | `3.0rem` (48px) | `clamp(2rem, 3vw, 3rem)` |
| **Card Title** | `h3` | `1.5rem` (24px) | `2.0rem` (32px) | `text-2xl lg:text-3xl` |
| **Subtitle** | `h4` | `1.125rem` (18px) | `1.5rem` (24px) | `text-lg lg:text-2xl` |
| **Body Large** | `p.intro` | `1.0rem` (16px) | `1.125rem` (18px) | `text-base lg:text-lg` |
| **Body Base** | `p` | `0.875rem` (14px) | `1.0rem` (16px) | `text-sm lg:text-base` |
| **Button / Nav** | `button`, `nav a` | `0.875rem` (14px) | `0.875rem` (14px) | `text-sm uppercase tracking-[0.15em] font-semibold` |
| **Caption** | `.caption` | `0.75rem` (12px) | `0.875rem` (14px) | `text-xs lg:text-sm` |

### Typography Rules

1. **Uppercase Elements:**
   - All buttons
   - Navigation links
   - Section kickers (small text above H2)
   - Letter spacing: `tracking-widest` (0.15em)

2. **Line Heights:**
   - Headings: `1.1` - `1.3` (tight)
   - Body text: `1.6` (comfortable reading)

3. **Letter Spacing:**
   - Headings: `-0.02em` to `-0.01em` (tight)
   - Body: `0` (normal)
   - Buttons/Nav: `0.15em` (wide, uppercase)
   - Captions: `0.02em` (slight)

4. **Font Weights:**
   - Headings: `600` - `700` (semibold to bold)
   - Body: `400` (regular)
   - Buttons/Nav: `600` (semibold)

---

## Spacing & Layout

### Base Unit
- **4px** (0.25rem) - All spacing is a multiple of this base unit

### Semantic Spacing System

#### Relationship-Based Gaps

| Relationship | Gap Size | Usage | Tailwind Class |
|--------------|----------|-------|----------------|
| **Connected** (Strong) | `8px` - `12px` | Label & Input, H2 & H3, Icon & Text | `gap-2` or `gap-3` |
| **Grouped** (Medium) | `16px` - `24px` | Card Image & Body, H3 & Paragraph, List Items | `gap-4` or `gap-6` |
| **Distinct** (Weak) | `48px` - `64px` | Sidebar & Content, Feature Sections | `gap-12` or `gap-16` |
| **Severed** (None) | `128px` - `160px` | Homepage "chapters" (Hero → Products) | `gap-32` or `gap-40` |

#### Custom Gap Tokens

| Token | Size | Tailwind Class |
|-------|------|----------------|
| `gap-xs` | `4px` | Between related icons and text |
| `gap-s` | `16px` | Between cards in dense grid |
| `gap-m` | `32px` | Standard separation between columns |
| `gap-l` | `64px` | Separation between major content blocks |
| `gap-xl` | `128px` | Between homepage "chapters" |

### Section Spacing

| Element | Mobile | Desktop | Tailwind Class |
|---------|--------|---------|----------------|
| **Standard Section** | `py-16` (64px) | `py-32` (128px) | `py-16 lg:py-32` |
| **Container Width (Wide)** | Full width | `max-w-[1440px]` | `max-w-[1440px]` |
| **Container Width (Reading)** | Full width | `max-w-[800px]` | `max-w-[800px]` |
| **Edge Padding** | `px-4` (16px) | `px-8` (32px) → `px-12` (48px) | `px-4 md:px-8 lg:px-12` |

### Optical Corrections (Playfair Display)

- **High Ascender Issue:** Playfair has high ascenders creating extra whitespace at top
- **Solution:** Apply negative top margin (`-mt-1` or `-mt-2`) when aligning with icons/images
- **Card Padding:** For visual symmetry, use `pt-5 pb-6` instead of `p-6` when using Playfair headings

---

## Shadows & Elevation

### Shadow Levels

| Level | Shadow Value | Usage | Tailwind Class |
|-------|--------------|-------|----------------|
| **Level 1 (Subtle)** | `0 2px 4px rgba(0,0,0,0.05)` | Product cards at rest | `shadow-level-1` |
| **Level 2 (Hover)** | `0 12px 24px -4px rgba(0,0,0,0.12)` | Cards on hover | `shadow-level-2` |
| **Level 3 (Floating)** | `0 24px 48px -12px rgba(0,0,0,0.25)` | Sticky headers, modals | `shadow-level-3` |
| **Glow (Special)** | `0 0 15px rgba(212, 175, 55, 0.3)` | Gold active states | `shadow-glow` |

### Usage Guidelines
- **Cards:** Start with Level 1, elevate to Level 2 on hover
- **Sticky Navigation:** Use Level 3 for floating effect
- **Gold Accents:** Apply glow shadow for active/selected states

---

## Borders & Radius

### Corner Radius (Border Radius)

| Style | Value | Usage | Tailwind Class |
|-------|-------|-------|----------------|
| **Sharp** | `0px` | Images, banners (Heritage/Brutalist feel) | `rounded-sharp` or `rounded-none` |
| **Soft** | `4px` | Buttons, input fields, cards (tactile but not bubbly) | `rounded-soft` or `rounded` |
| **Pill** | `999px` | Status badges (e.g., "New Arrival") | `rounded-pill` or `rounded-full` |

### Strokes (Borders)

| Weight | Value | Color | Usage |
|--------|-------|-------|-------|
| **Thin** | `1px` | `border-neutral-200` (light) / `border-white/10` (dark) | Standard card borders, input fields |
| **Thick** | `2px` | `border-tikaram-gold` (#D4AF37) | Primary buttons, active states |

### Dividers
- **Style:** `1px` horizontal line
- **Width:** `w-24` (short line, centered)
- **Usage:** Separate headings from body text
- **Color:** Match context (light/dark)

---

## Design Tokens

### Complete Token Reference

```typescript
// Colors
colors: {
  'tikaram-deep-forest': '#004225',
  'tikaram-off-white': '#F8F8F8',
  'tikaram-rich-black': '#050505',
  'tikaram-charcoal': '#36454F',
  'tikaram-cream': '#FFFDD0',
  'tikaram-pure-white': '#FFFFFF',
  'tikaram-gold': '#D4AF37',
  'tikaram-rust': '#B7410E',
}

// Fonts
fontFamily: {
  serif: ['var(--font-serif)', 'serif'],
  sans: ['var(--font-sans)', 'sans-serif'],
  accent: ['var(--font-accent)', 'sans-serif'],
}

// Spacing
spacing: {
  'gap-xs': '0.25rem',  // 4px
  'gap-s': '1rem',      // 16px
  'gap-m': '2rem',      // 32px
  'gap-l': '4rem',      // 64px
  'gap-xl': '8rem',     // 128px
}

// Border Radius
borderRadius: {
  'sharp': '0px',
  'soft': '4px',
  'pill': '999px',
}

// Shadows
boxShadow: {
  'level-1': '0 2px 4px rgba(0,0,0,0.05)',
  'level-2': '0 12px 24px -4px rgba(0,0,0,0.12)',
  'level-3': '0 24px 48px -12px rgba(0,0,0,0.25)',
  'glow': '0 0 15px rgba(212, 175, 55, 0.3)',
}

// Letter Spacing
letterSpacing: {
  'widest': '0.15em',
}
```

---

## Layout Structure

### Global Layout Components

#### Root Layout (`src/app/layout.tsx`)
- **Font Loading:** Playfair Display, Montserrat, Lato via `next/font/google`
- **Providers:** AgeGateProvider, ToastProvider (if needed)
- **Structure:**
  ```
  <html>
    <body>
      <AgeGateProvider />
      <Header />
      {children}
      <Footer />
      <CookieConsent />
    </body>
  </html>
  ```

#### Header (`src/components/layout/Header.tsx`)
- **Position:** Fixed, top of viewport (`fixed top-0`)
- **Z-Index:** `z-50` (above content)
- **Behavior:**
  - Transparent at top of page
  - Transforms to Deep Forest (`#004225`) with backdrop blur on scroll
  - Text changes from black to gold on scroll
- **Navigation Links:** Spirits, Story, Recipes, Events, Visit
- **Utility Icons:** Globe (language), MapPin (store locator)
- **Mobile:** Hamburger menu opens MobileNav drawer

#### Footer (`src/components/layout/Footer.tsx`)
- **Background:** Deep Forest (`#004225`)
- **Text Color:** Cream (`#FFFDD0`)
- **Structure:** 4-column grid (Brand, Explore, Legal, Newsletter)
- **Newsletter:** Multi-step form (Email → Details → Submit)
- **Compliance Strip:** Copyright, age restriction notice

### Page Layout Patterns

#### Homepage (`/`)
1. **Hero Section:** Full-screen video/image with overlay text
2. **Product Lineup:** Horizontal scrollable bottle showcase
3. **Mixology Cards:** 3 vertical cards with cocktail images
4. **Heritage Split:** 50/50 grid (Heritage vs. Lifestyle)
5. **Footer CTA:** Newsletter signup with lifestyle background

#### Collection Page (`/spirits`)
1. **Collection Hero:** Top-down bottle shot on textured background
2. **Sticky Filter Bar:** Horizontal category filters
3. **Featured Product:** Large centered "King" card
4. **Brand Interjection:** Split banner with story link

#### Product Detail (`/spirits/[slug]`)
1. **Product Header:** Bottle image + typography
2. **Sensory Profile:** Circular flavor wheel diagram
3. **Heritage Strip:** Full-width barrel/bottle image
4. **Tasting Details:** Two-column layout (specs + process image)
5. **Recipe Cross-Sell:** 3 cocktail cards
6. **Related Products:** 3 bottle thumbnails

#### About Page (`/about`)
1. **Hero:** Dark barrel room interior
2. **Untold Story:** Asymmetrical layout with timeline
3. **Discovery Cards:** Two large clickable image cards

#### Events Page (`/events`)
1. **Filter Header:** Category icons (Tastings, Parties, Music)
2. **Masonry Grid:** Pinterest-style mixed height grid
3. **Shop The Look:** Horizontal product strip

#### Contact Page (`/contact`)
1. **Hero:** Aerial drone shot of distillery
2. **Experience Highlight:** Centered text + tasting room image
3. **Info Grid:** 3 columns (Tours, Amenities, Contact)
4. **Visual Grid:** 2 rows × 3 columns (tour stops)
5. **FAQ Accordion:** Common questions

---

## Navigation System

### Primary Navigation

| Label | Route | Description |
|-------|-------|-------------|
| **Spirits** | `/spirits` | Product collection page |
| **Story** | `/about` | Brand heritage and history |
| **Recipes** | `/cocktail-recipes` | Mixology recipes |
| **Events** | `/events` | Tasting events and gallery |
| **Visit** | `/contact` | Distillery visit information |

### Utility Navigation

| Icon | Route | Description |
|------|-------|-------------|
| **Globe** | N/A | Language selector (English/Spanish) |
| **MapPin** | `/store-locator` | Quick link to store locator |

### Navigation States

#### Desktop
- **Default:** Black text (`text-black`)
- **Scrolled:** Gold text (`text-[#D4AF37]`)
- **Hover:** Full opacity gold
- **Active:** Gold with underline (if implemented)

#### Mobile
- **Menu Button:** Hamburger icon (top right)
- **Drawer:** Full-screen overlay with navigation links
- **Close:** X icon or backdrop click

### Navigation Typography
- **Font:** Montserrat (`font-sans`)
- **Size:** `text-sm` (14px)
- **Style:** `uppercase tracking-widest` (0.15em)
- **Weight:** `font-semibold` (600)

---

## Sitemap & Routes

### Static Routes

| Route | Priority | Change Frequency | Description |
|-------|----------|------------------|-------------|
| `/` | 1.0 | yearly | Homepage |
| `/spirits` | 0.8 | monthly | Product collection |
| `/about` | 0.7 | monthly | Brand story |
| `/events` | 0.6 | weekly | Events calendar |
| `/contact` | 0.6 | monthly | Contact/visit page |
| `/store-locator` | 0.9 | weekly | Store finder (high priority) |
| `/cocktail-recipes` | 0.7 | monthly | Recipe collection |

### Dynamic Routes

| Pattern | Description | Example |
|---------|-------------|---------|
| `/spirits/[slug]` | Individual product pages | `/spirits/ponce-de-leon-rum` |
| `/cocktail-recipes/[slug]` | Individual recipe pages | `/cocktail-recipes/bourbon-old-fashioned` |

### Special Routes

| Route | Description |
|-------|-------------|
| `/verification-success` | Email verification success page |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

---

## Component Patterns

### Buttons

#### Primary Button
```tsx
<Button className="bg-tikaram-gold text-tikaram-rich-black 
                  border-2 border-tikaram-gold 
                  rounded-soft px-6 py-3
                  uppercase tracking-widest font-semibold
                  hover:shadow-level-2 hover:-translate-y-0.5
                  transition-all duration-300">
  Button Text
</Button>
```

#### Secondary Button
```tsx
<Button className="bg-transparent text-tikaram-gold
                  border-2 border-tikaram-gold
                  rounded-soft px-6 py-3
                  uppercase tracking-widest font-semibold
                  hover:bg-tikaram-gold hover:text-tikaram-rich-black
                  transition-all duration-300">
  Button Text
</Button>
```

### Cards

#### Product Card
- **Background:** White or Off-White
- **Border:** `1px` thin border (neutral-200)
- **Radius:** `rounded-soft` (4px)
- **Shadow:** `shadow-level-1` (rest), `shadow-level-2` (hover)
- **Padding:** `p-6` (24px)
- **Hover:** Scale `105%`, brightness `110%`, shadow elevation

#### Feature Card
- **Layout:** Image top, content bottom
- **Gap:** `gap-4` (16px) between image and content
- **Typography:** H3 title, body text below

### Forms

#### Input Fields
- **Background:** White or transparent with border
- **Border:** `1px` thin (`border-neutral-200` or `border-white/10`)
- **Radius:** `rounded-soft` (4px)
- **Padding:** `px-4 py-3` (16px horizontal, 12px vertical)
- **Focus:** Gold border (`border-tikaram-gold`), glow shadow

#### Form Layout
- **Gap:** `gap-4` (16px) between fields
- **Label:** Above input, `text-sm font-semibold`
- **Error:** Rust color (`text-tikaram-rust`), `text-sm`

### Modals & Overlays

#### Age Gate Modal
- **Background:** Glassmorphism (`bg-black/60 backdrop-blur-md`)
- **Border:** `border-white/10`
- **Position:** Fixed, full-screen overlay
- **Z-Index:** `z-50` or higher
- **Content:** Centered, max-width container

#### Cookie Consent
- **Position:** Fixed bottom
- **Background:** Deep Forest with glassmorphism
- **Padding:** `px-4 py-4` (mobile), `px-8 py-6` (desktop)

---

## Asset System

### Directory Structure

```
/public/assets/
├── global/          # Brand assets
├── home/            # Homepage-specific
├── products/        # Product bottle images
├── cocktails/       # Cocktail recipe images
├── about/           # About page assets
└── ui/              # UI elements and textures
```

### Global Assets

| File | Usage |
|------|-------|
| `logo-gold.svg` | Main navbar logo (scrolled state) |
| `logo-black.svg` | Footer logo (dark background) |
| `favicon.ico` | Browser favicon |
| `social-instagram.svg` | Social media icon |
| `social-facebook.svg` | Social media icon |
| `social-tiktok.svg` | Social media icon |
| `social-youtube.svg` | Social media icon |

### Homepage Assets

| File | Usage |
|------|-------|
| `hero-main.mp4` | Hero section video |
| `home-hero-rum.mp4` | Product-specific hero videos |
| `home-hero-bourbon.mp4` | Product-specific hero videos |
| `home-hero-tequila.mp4` | Product-specific hero videos |
| `home-hero-paan-liqueur.mp4` | Product-specific hero videos |
| `banner-heritage.jpg` | Heritage section background |
| `lifestyle-toast.jpg` | Lifestyle split section |
| `footer-cta-bg.png` | Newsletter signup background |
| `home-product-bg.jpg` | Product lineup background |
| `texture-sand.png` | Sand texture overlay |

### Product Assets

| File | Usage |
|------|-------|
| `bottle-ponce-rum.png` | Ponce de Leon Rum bottle |
| `bottle-florida-bourbon.png` | Florida Bourbon bottle |
| `bottle-paan-liqueur.png` | Paan Liqueur bottle |
| `bottle-tequila.png` | Tikaram Tequila bottle |
| `bottle-keylime.png` | Keylime Tequila bottle |
| `collection-hero-paan.jpg` | Collection page hero |

### Cocktail Assets

| File Pattern | Usage |
|-------------|-------|
| `rum-*.webp` | Rum cocktail images |
| `bourbon-*.webp` | Bourbon cocktail images |
| `tequila-*.webp` | Tequila cocktail images |
| `keylime-*.webp` | Keylime cocktail images |
| `paan-*.webp` | Paan cocktail images |
| `recipe-hero-banner.webp` | Recipe page hero |
| `recipe-lifestyle-party.jpg` | Recipe lifestyle image |

### About Page Assets

| File | Usage |
|------|-------|
| `founders.jpg` | Founder portraits |
| `distillery-aerial.jpg` | Aerial drone shot |
| `distillery-bar.jpg` | Tasting room |
| `barrels-row.jpg` | Barrel close-up |
| `cane-field.jpg` | Raw ingredients |

### UI Elements

| File | Usage |
|------|-------|
| `age-gate-bg.jpg` | Age gate modal background |
| `coupon-barcode-mockup.png` | Coupon success page |
| `texture-noise.png` | Noise/grain overlay |
| `map-pin.svg` | Custom map marker |

### Image Optimization

- **Format:** WebP for photos, PNG for transparent images, SVG for icons
- **Loading:** Next.js `Image` component with lazy loading
- **Sizes:** Responsive `sizes` prop for optimal loading
- **Placeholders:** Deep Forest (`#004225`) colored divs if asset missing

---

## Backgrounds & Textures

### Solid Backgrounds

| Background | Color | Usage |
|------------|-------|-------|
| **Deep Forest** | `#004225` | Headers, footers, dark sections |
| **Off-White** | `#F8F8F8` | Light sections, cards |
| **Rich Black** | `#050505` | Dark overlays, modals |

### Glassmorphism Effects

#### Dark Glassmorphism
```css
background: rgba(0, 0, 0, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
```
- **Usage:** Sticky navigation, dark modals
- **Tailwind:** `bg-black/60 backdrop-blur-md border-white/10`

#### Light Glassmorphism
```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(12px);
border: 1px solid rgba(0, 0, 0, 0.05);
```
- **Usage:** Light overlays, floating cards
- **Tailwind:** `bg-white/80 backdrop-blur-md border-black/5`

### Texture Overlays

- **Noise Pattern:** 3% opacity CSS noise over solid backgrounds
- **Sand Texture:** Applied to product lineup section (`texture-sand.png`)
- **Purpose:** Add "paper" texture to Deep Forest and Rust backgrounds

### Background Images

- **Hero Sections:** Full-screen videos or high-res images
- **Section Backgrounds:** Wide images with overlay text
- **Pattern:** Dark overlay (`bg-black/40` or `bg-black/60`) for text readability

---

## Interactive States

### Button Hover States

```css
/* Transform */
transform: translateY(-2px);  /* Lift up */

/* Shadow */
box-shadow: 0 12px 24px -4px rgba(0,0,0,0.12);  /* Level 2 */

/* Transition */
transition: all 0.3s ease-out;
```

**Tailwind Classes:**
- `hover:-translate-y-0.5`
- `hover:shadow-level-2`
- `transition-all duration-300 ease-out`

### Image Hover States

```css
/* Scale */
transform: scale(1.05);  /* Slow zoom */

/* Brightness */
filter: brightness(1.1);

/* Transition */
transition: transform 0.7s ease-in-out, filter 0.7s ease-in-out;
```

**Tailwind Classes:**
- `hover:scale-105`
- `hover:brightness-110`
- `transition-transform duration-700 ease-in-out`

### Link Hover States

- **Color:** Gold (`text-tikaram-gold`)
- **Transition:** `transition-colors duration-300`
- **Underline:** Optional (if implemented)

### Form Input States

#### Focus
- **Border:** Gold (`border-tikaram-gold`)
- **Shadow:** Glow (`shadow-glow`)
- **Outline:** None (custom border instead)

#### Error
- **Border:** Rust (`border-tikaram-rust`)
- **Text:** Rust (`text-tikaram-rust`)
- **Message:** Below input, `text-sm`

#### Disabled
- **Opacity:** `opacity-60`
- **Cursor:** `cursor-not-allowed`
- **Background:** `bg-white/5` (on dark backgrounds)

---

## Responsive Breakpoints

### Tailwind Default Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| **sm** | `640px` | Small tablets |
| **md** | `768px` | Tablets (primary tablet breakpoint) |
| **lg** | `1024px` | Desktop (primary desktop breakpoint) |
| **xl** | `1280px` | Large desktop |
| **2xl** | `1536px` | Extra large desktop |

### Mobile-First Strategy

1. **Base Styles:** Apply to mobile (default, no prefix)
2. **Tablet:** Use `md:` prefix for tablet adjustments
3. **Desktop:** Use `lg:` prefix for desktop enhancements

### Common Responsive Patterns

#### Container Padding
```tsx
className="px-4 md:px-8 lg:px-12"
```
- Mobile: `16px`
- Tablet: `32px`
- Desktop: `48px`

#### Section Spacing
```tsx
className="py-16 lg:py-32"
```
- Mobile: `64px`
- Desktop: `128px`

#### Typography
```tsx
className="text-2xl lg:text-3xl"
```
- Mobile: `24px`
- Desktop: `32px`

#### Grid Layouts
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
```
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns

---

## Additional Design Specifications

### Age Gate Modal

- **Requirement:** Blocking 21+ modal overlay
- **Persistence:** Cookie-based (persists across sessions)
- **Background:** Glassmorphism dark overlay
- **Content:** Date of birth input, verification button
- **Z-Index:** Highest priority (`z-[100]`)

### Store Locator

- **Map Library:** Leaflet (react-leaflet) or Google Maps Embed
- **Marker Style:** Custom gold pin (`map-pin.svg`)
- **Search:** Location-based search with zip code
- **List View:** Store cards with address, hours, distance

### Newsletter Signup

- **Multi-Step Flow:**
  1. Email input
  2. Name + Zip code
  3. Submit → Email verification
  4. Success → Coupon delivery
- **Background:** Lifestyle image with overlay
- **Form Style:** White inputs on dark background

### Animation Guidelines

- **Framework:** Framer Motion (essential for luxury feel)
- **Page Transitions:** Smooth fade/slide
- **Component Animations:** Stagger children, fade in on scroll
- **Micro-interactions:** Button hover, image zoom, card lift

---

## Implementation Checklist

### Design System Setup
- [x] Tailwind config with custom colors
- [x] Font loading (Playfair, Montserrat, Lato)
- [x] Global CSS with typography scale
- [x] Custom spacing tokens
- [x] Shadow tokens
- [x] Border radius tokens

### Layout Components
- [x] Header with scroll behavior
- [x] Footer with newsletter form
- [x] Mobile navigation drawer
- [x] Age gate modal
- [x] Cookie consent banner

### Page Templates
- [x] Homepage layout
- [x] Collection page layout
- [x] Product detail layout
- [x] About page layout
- [x] Events page layout
- [x] Contact page layout

### UI Components
- [x] Button variants
- [x] Input fields
- [x] Cards (product, feature)
- [x] Modals/overlays
- [x] Forms (newsletter, contact)

---

## Design Document Maintenance

### Version History
- **v1.0** (2024): Initial comprehensive design document

### Update Process
1. Document changes in this file
2. Update version number
3. Update "Last Updated" date
4. Notify team of significant changes

### Related Documents
- `docs/03_design_system.md` - Original design system spec
- `docs/07_layout_specs.md` - Page layout specifications
- `docs/09_project_scaffold.md` - File structure blueprint
- `docs/05_asset_map.md` - Asset organization guide

---

**End of Design Document**

