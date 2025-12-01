# Tikaram Spirits - Comprehensive Design Document

**Project:** Tikaram Spirits Brand Showcase
**Domain:** tikaramspirits.com
**Last Updated:** November 30, 2025
**Version:** 1.0

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Technical Architecture](#technical-architecture)
4. [Design System](#design-system)
5. [Component Architecture](#component-architecture)
6. [Page-by-Page Analysis](#page-by-page-analysis)
7. [Data Architecture](#data-architecture)
8. [User Experience Flows](#user-experience-flows)
9. [Performance & Optimization](#performance--optimization)
10. [Future Recommendations](#future-recommendations)

---

## Executive Summary

Tikaram Spirits is a luxury craft spirits brand website built with Next.js 14, featuring a sophisticated design system that embodies the "Sun-Soaked, Craft-Forward" lifestyle of Florida. The website serves as a premium digital showroom designed to drive brand awareness and retail conversion through an immersive, storytelling-driven experience.

### Key Features
- **Age Verification Gateway** - 21+ mandatory entry with cookie-based persistence
- **Immersive Product Showcase** - 5 premium spirits with detailed tasting profiles
- **Interactive Store Locator** - Map-based retail location finder
- **Cocktail Recipe Library** - 90+ curated cocktail recipes
- **Email Marketing Integration** - Newsletter signup with coupon delivery
- **Events Calendar** - Brand event showcase

### Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom Design System
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend + React Email
- **Animations:** Framer Motion
- **Mapping:** React Leaflet
- **Form Handling:** React Hook Form + Zod

---

## Project Overview

### Brand Identity
**Name:** Tikaram Spirits
**Tagline:** "The Spirit of Florida's Sun-Soaked Coast"
**Core Value Proposition:** Hand-crafted luxury spirits that blend heritage with innovation

### Product Portfolio
1. **Ponce de Leon Rum** - 80 proof, 12-year aged, $45
2. **Florida Bourbon** - 110 proof, small batch, $65
3. **Tikaram Paan Liqueur** - 15% ABV, exotic blend, $35
4. **Tikaram Tequila** - 80 proof, 100% de agave, $50
5. **Tikaram Key Lime Tequila** - 70 proof, Key Lime infused, $40

### Target Audience
- Spirit connoisseurs aged 21-55
- Mixology enthusiasts
- Luxury lifestyle consumers
- Heritage-conscious buyers
- Florida tourism market

### Success Metrics
1. Store locator usage percentage
2. Newsletter signup conversion rate
3. Time on page (Our Story & Product Details)
4. Coupon redemption tracking

---

## Technical Architecture

### Stack Overview

```
┌─────────────────────────────────────────────────┐
│            Next.js 14 (App Router)              │
│                 TypeScript 5.3                  │
├─────────────────────────────────────────────────┤
│  Presentation Layer                             │
│  - React 18.3                                   │
│  - Tailwind CSS 3.4                             │
│  - Framer Motion 11                             │
│  - Lucide Icons                                 │
├─────────────────────────────────────────────────┤
│  Data Layer                                     │
│  - Supabase (PostgreSQL)                        │
│  - React Leaflet (Maps)                         │
│  - Local JSON (Products/Recipes)                │
├─────────────────────────────────────────────────┤
│  Services                                       │
│  - Resend (Email)                               │
│  - React Email (Templates)                      │
│  - Cookie-based Auth (Age Gate)                 │
└─────────────────────────────────────────────────┘
```

### File Structure

```
tikaram-spirits/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx            # Root layout with fonts & providers
│   │   ├── page.tsx              # Homepage
│   │   ├── spirits/              # Product pages
│   │   ├── cocktail-recipes/    # Recipe pages
│   │   ├── about/               # Brand story
│   │   ├── store-locator/       # Store finder
│   │   ├── events/              # Events calendar
│   │   ├── contact/             # Contact page
│   │   └── api/                 # API routes
│   │       ├── leads/           # Newsletter signup
│   │       └── stores/          # Store data
│   ├── components/
│   │   ├── ui/                  # Base UI components
│   │   ├── layout/              # Header, Footer, Nav
│   │   └── features/            # Feature-specific components
│   │       ├── home/            # Homepage sections
│   │       ├── products/        # Product components
│   │       ├── forms/           # Form components
│   │       ├── stores/          # Store locator
│   │       └── age-gate/        # Age verification
│   ├── lib/                     # Utilities & data
│   │   ├── data.ts              # Product data
│   │   ├── recipes.ts           # Recipe data
│   │   ├── stores.ts            # Store locations
│   │   ├── events.ts            # Event data
│   │   ├── fonts.ts             # Font configuration
│   │   └── supabase/            # DB client
│   ├── hooks/                   # Custom React hooks
│   └── types/                   # TypeScript types
├── public/
│   └── assets/                  # Static assets
│       ├── home/                # Homepage media
│       ├── products/            # Product images
│       ├── cocktails/           # Recipe images
│       └── global/              # Logos, icons
├── docs/                        # Project documentation
└── supabase/                    # Database schema
```

### Routing Architecture

**Static Routes:**
- `/` - Homepage
- `/spirits` - Product collection
- `/spirits/[slug]` - Individual product pages (5 products)
- `/about` - Brand story
- `/contact` - Contact form
- `/store-locator` - Store finder
- `/events` - Events calendar
- `/cocktail-recipes` - Recipe index
- `/cocktail-recipes/[slug]` - Individual recipes (90+ recipes)

**API Routes:**
- `POST /api/leads` - Newsletter signup
- `POST /api/leads/verify` - Email verification
- `GET /api/stores` - Store locations
- `POST /api/track-location` - User location tracking

---

## Design System

### Color Palette

#### Primary Backgrounds
```css
Deep Forest:    #004225  /* Primary brand background */
Off-White:      #F8F8F8  /* Light section background */
Rich Black:     #050505  /* Dark section background */
```

#### Text Colors
```css
Charcoal:       #36454F  /* Body text on light backgrounds */
Cream:          #FFFDD0  /* Body text on dark backgrounds */
Pure White:     #FFFFFF  /* Headings on dark backgrounds */
```

#### Accent Colors
```css
Tikaram Gold:   #D4AF37  /* Primary CTA, accents */
Rust:           #B7410E  /* Error states, sale tags */
```

### Typography

**Font Families:**
- **Primary (Headings):** Playfair Display (Serif)
- **Secondary (Body):** Montserrat (Sans-serif)
- **Accent:** Lato (Sans-serif)

**Type Scale (Responsive):**

| Element | Mobile | Desktop | CSS Class |
|---------|--------|---------|-----------|
| Display Hero (h1) | 40px | 72px | `text-[clamp(2.5rem,5vw,4.5rem)]` |
| Section Title (h2) | 32px | 48px | `text-[clamp(2rem,3vw,3rem)]` |
| Card Title (h3) | 24px | 32px | `text-2xl lg:text-3xl` |
| Subtitle (h4) | 18px | 24px | `text-lg lg:text-2xl` |
| Body Large | 16px | 18px | `text-base lg:text-lg` |
| Body Base | 14px | 16px | `text-sm lg:text-base` |
| Button/Nav | 14px | 14px | `text-sm uppercase tracking-widest` |
| Caption | 12px | 14px | `text-xs lg:text-sm` |

**Typography Rules:**
1. All buttons, navigation, and section kickers use `uppercase` with `tracking-widest` (0.15em)
2. Body text on dark backgrounds uses `opacity-90` for readability
3. Playfair Display headings require optical correction with negative top margin (`-mt-1` or `-mt-2`)

### Spacing System

**Base Unit:** 4px (0.25rem)

**Semantic Spacing:**
- **Connected (Strong):** `gap-2` (8px) - `gap-3` (12px)
  *Use between label & input, icon & text*
- **Grouped (Medium):** `gap-4` (16px) - `gap-6` (24px)
  *Use between cards, heading & paragraph*
- **Distinct (Weak):** `gap-12` (48px) - `gap-16` (64px)
  *Use between sidebar & content*
- **Severed (None):** `gap-32` (128px) - `gap-40` (160px)
  *Use between homepage sections*

**Section Spacing:**
- Standard: `py-16` (mobile) → `py-32` (desktop)
- Container Width: `max-w-[1440px]` (wide), `max-w-[800px]` (reading)
- Edge Padding: `px-4` → `px-8` → `px-12` (responsive)

### Border Radius

```css
Sharp:  0px     /* Images, banners (heritage feel) */
Soft:   4px     /* Buttons, inputs, cards */
Pill:   999px   /* Status badges */
```

### Shadows & Elevation

```css
Level 1 (Subtle):   0 2px 4px rgba(0,0,0,0.05)
Level 2 (Hover):    0 12px 24px -4px rgba(0,0,0,0.12)
Level 3 (Floating): 0 24px 48px -12px rgba(0,0,0,0.25)
Glow (Gold):        0 0 15px rgba(212, 175, 55, 0.3)
```

### Interactive States

**Button Hover:**
- Transform: `translate-y-[-2px]` (lift)
- Shadow: Level 2
- Transition: `all 0.3s ease-out`

**Image Hover:**
- Scale: `scale-105`
- Filter: `brightness-110`
- Transition: `duration-700 ease-in-out` (cinematic)

**Link States:**
- Default: `opacity-90`
- Hover: `opacity-100` + color shift to Tikaram Gold
- Active: `scale-95`

---

## Component Architecture

### Layout Components

#### Header ([Header.tsx](src/components/layout/Header.tsx))
**Purpose:** Primary navigation with dynamic styling based on scroll position

**Features:**
- Sticky positioning with backdrop blur on scroll
- Color transition: Black (top) → Gold (scrolled) against Deep Forest background
- Responsive mobile menu drawer
- Utility icons (Language selector, Store locator link)

**Navigation Links:**
- Spirits
- Story (About)
- Recipes
- Events
- Visit (Contact)

**Implementation Details:**
```typescript
- Scroll detection via useEffect
- Dynamic class application based on scroll state
- Glassmorphism effect: bg-[#004225] backdrop-blur-md
- Mobile: Hamburger menu → Drawer navigation
```

#### Footer ([Footer.tsx](src/components/layout/Footer.tsx))
**Purpose:** 4-column footer with newsletter signup

**Structure:**
1. **Brand Column** - Logo + tagline
2. **Explore Column** - Site navigation
3. **Legal Column** - Privacy, Terms, Wholesale
4. **Newsletter Column** - Multi-step signup form

**Newsletter Flow:**
1. Email input → Validation
2. Name + ZIP collection (pre-filled from location tracker)
3. API submission → Email verification
4. Success state with auto-reset

#### Mobile Navigation ([MobileNav.tsx](src/components/layout/MobileNav.tsx))
**Purpose:** Full-screen drawer navigation for mobile devices

**Features:**
- Slide-in animation from right
- Full-screen overlay
- Touch-friendly large targets
- Close button with X icon

### UI Components

#### Button ([Button.tsx](src/components/ui/Button.tsx))
**Variants:**
1. **Primary:** Gold background (`#D4AF37`) with Deep Forest text
2. **Secondary:** Deep Forest background with Gold border
3. **Outline:** Transparent with white border

**States:**
- Hover: Lift effect + brightness change
- Active: Scale down (`scale-95`)
- Disabled: 50% opacity + no-pointer

#### Card ([Card.tsx](src/components/ui/Card.tsx))
**Purpose:** Flexible container for content grouping

**Variants:**
- Default with subtle shadow
- Glassmorphic with backdrop blur
- Elevated with level 2 shadow

#### Input ([Input.tsx](src/components/ui/Input.tsx))
**Purpose:** Form input fields with consistent styling

**Features:**
- Focus ring in Tikaram Gold
- Dark mode support
- Error state styling
- Disabled state

#### Modal ([Modal.tsx](src/components/ui/Modal.tsx))
**Purpose:** Overlay dialogs

**Features:**
- Backdrop overlay with blur
- Centered positioning
- Body scroll lock
- ESC key to close

#### Accordion ([Accordion.tsx](src/components/ui/Accordion.tsx))
**Purpose:** Collapsible content sections

**Use Cases:**
- FAQ sections
- Product details
- Tasting notes

### Feature Components

#### Age Gate ([AgeGateModal.tsx](src/components/features/age-gate/AgeGateModal.tsx))
**Purpose:** 21+ age verification requirement

**Implementation:**
- Full-screen modal overlay
- Month/Day/Year dropdowns + input
- Client-side age calculation
- Cookie-based persistence (1 year)
- DOB stored in localStorage for newsletter
- Redirect to Google if under 21

**Logic:**
```typescript
validateAge(month, day, year) {
  const birthDate = new Date(year, month - 1, day)
  const today = new Date()
  const age = Math.floor((today - birthDate) / 31557600000) // milliseconds in year
  return age >= 21
}
```

#### Product Lineup ([product-lineup.tsx](src/components/features/home/product-lineup.tsx))
**Purpose:** Horizontal scrollable product showcase

**Features:**
- Drag-to-scroll interaction (mouse + touch)
- Hover title display above bottles
- Custom proportional slider bar
- Info card appears on hover
- Dynamic product count support

**Technical Details:**
- Ref-based scroll container
- `requestAnimationFrame` for smooth scrolling
- Prevents link navigation during drag
- Desktop: Custom slider with proportional thumb
- Mobile: Native scroll with snap points

#### Hero Section ([hero-section.tsx](src/components/features/home/hero-section.tsx))
**Purpose:** Full-screen video carousel hero

**Features:**
- 4 video slides (Rum, Bourbon, Paan Liqueur, Tequila)
- Auto-rotation every 8 seconds
- Random start index
- Separate desktop/mobile videos
- Fade transitions
- Dark overlay for text readability

**Video Sources:**
```
Desktop: 1920x1080 MP4
Mobile:  1080x1920 MP4 (portrait)
```

#### Mixology Section ([mixology-section.tsx](src/components/features/home/mixology-section.tsx))
**Purpose:** Cocktail recipe showcase

**Features:**
- 3-card horizontal layout
- Recipe filtering by spirit type
- Difficulty indicators
- Hover state with shadow elevation

#### Heritage Split ([heritage-split.tsx](src/components/features/home/heritage-split.tsx))
**Purpose:** 50/50 split call-to-action

**Structure:**
- Left: "Visit Our Home" (About page link)
- Right: "Find a Store" (Store locator link)
- Full-bleed imagery
- Overlay text with CTA buttons

#### Signup Banner ([signup-banner.tsx](src/components/features/home/signup-banner.tsx))
**Purpose:** Newsletter signup CTA

**Features:**
- Full-width lifestyle background image
- Overlay email form
- Integrated with leads API

#### Product Card ([ProductCard.tsx](src/components/features/products/ProductCard.tsx))
**Purpose:** Product display card

**Features:**
- Bottle image
- Title + pricing
- Tasting notes preview
- "Learn More" CTA
- Hover shadow elevation

#### Tasting Wheel ([TastingWheel.tsx](src/components/features/products/TastingWheel.tsx))
**Purpose:** Visual flavor profile display

**Features:**
- Circular diagram
- 4 flavor dimensions (Sweet, Oak, Spice, Fruit)
- Data-driven from product JSON
- SVG-based visualization

#### Store Locator Map ([StoreLocatorMap.tsx](src/components/features/stores/StoreLocatorMap.tsx))
**Purpose:** Interactive map with store pins

**Features:**
- React Leaflet integration
- Custom markers
- Click to view store details
- User location detection
- Distance calculation

#### Newsletter Form ([NewsletterForm.tsx](src/components/features/forms/NewsletterForm.tsx))
**Purpose:** Multi-step newsletter signup

**Flow:**
1. Email validation
2. Name + ZIP collection
3. API submission
4. Email verification required
5. Coupon delivery

**Validation:**
- Email regex pattern
- Required fields
- ZIP code format

#### Contact Form ([ContactForm.tsx](src/components/features/forms/ContactForm.tsx))
**Purpose:** General inquiry form

**Fields:**
- Name
- Email
- Inquiry type (dropdown)
- Message

---

## Page-by-Page Analysis

### Homepage (`/`)

**File:** [src/app/page.tsx](src/app/page.tsx)

**Layout Concept:** "The Invitation"

**Sections:**
1. **Hero Section**
   - Full-screen video carousel
   - 4 rotating product videos
   - Centered headline + CTA
   - "Discover the Collection" button → `/spirits`

2. **Product Lineup**
   - Horizontal scrollable bottle gallery
   - Textured background image
   - Hover interactions with info cards
   - Click → Product detail pages

3. **Mixology Section**
   - 3 featured cocktail cards
   - "See Recipes" CTA → `/cocktail-recipes`
   - Vertical card layout
   - Cocktail icons + photos

4. **Heritage Split**
   - 50/50 split grid
   - Left: "Visited our Home?" → `/about`
   - Right: "Find a Store" → `/store-locator`
   - Lifestyle imagery

5. **Signup Banner**
   - Newsletter email capture
   - Full-width CTA
   - Lead generation focus

**Background Treatment:**
- Unified textured background for Hero + Product Lineup
- Image: `/assets/home/home-product-bg.jpg`

---

### Spirits Collection (`/spirits`)

**File:** [src/app/spirits/page.tsx](src/app/spirits/page.tsx)

**Layout Concept:** "The Showroom"

**Sections:**
1. **Collection Hero**
   - Top-down bottle shot
   - "Experience the Timeless Flavor" headline

2. **Filter Bar** (Sticky)
   - Horizontal list: All, Rum, Bourbon, Tequila, Liqueur
   - Client-side state filtering

3. **Featured Product (King Card)**
   - Large centered card
   - Ponce de Leon Rum spotlight
   - Bottle center, description left
   - "Learn More" CTA

4. **Brand Interjection**
   - Split banner
   - "A Story as Old as Florida"
   - Pouring liquid imagery
   - "Read History" → `/about`

5. **Product Grid**
   - All 5 products displayed
   - Card-based layout
   - Filter functionality

---

### Product Detail (`/spirits/[slug]`)

**File:** [src/app/spirits/[slug]/page.tsx](src/app/spirits/[slug]/page.tsx)

**Layout Concept:** "The Deep Dive"

**Sections:**
1. **Product Header**
   - White background
   - Bottle image (left)
   - Title, subhead, pricing (right)
   - Full-width label closeup banner

2. **Sensory Profile (Tasting Wheel)**
   - Circular flavor diagram
   - 4 dimensions: Sweet, Oak, Spice, Fruit
   - Data from `tastingNotes` JSON

3. **Heritage Strip**
   - Wide photo of bottles/barrels
   - "Seven Generations of Craft" overlay

4. **Tasting & Process Details**
   - Two-column layout
   - Left: Accordion (ABV, Proof, Notes)
   - Right: Distillery process image

5. **"Serve It Up" (Recipe Cross-Sell)**
   - 3 cocktails featuring this spirit
   - Click → `/cocktail-recipes/[slug]`

6. **"You Might Also Like"**
   - 3 related products
   - Cross-sell opportunity

**Dynamic Pages (5 total):**
- `/spirits/ponce-de-leon-rum`
- `/spirits/florida-bourbon`
- `/spirits/paan-liqueur`
- `/spirits/tikaram-tequila`
- `/spirits/tikaram-keylime-tequila`

---

### About Us (`/about`)

**File:** [src/app/about/page.tsx](src/app/about/page.tsx)

**Layout Concept:** "The Timeline"

**Sections:**
1. **Hero**
   - Dark barrel room interior
   - "A Story Rooted in Florida" headline

2. **Untold Story Section**
   - Asymmetrical layout
   - Large text block (left)
   - Photo collage (right)
   - Vertical timeline line

3. **Discovery Cards**
   - Two massive clickable cards
   - "Our Spirits" → `/spirits`
   - "Visit Us" → `/contact`

**Storytelling Focus:**
- Brand heritage
- Craftsmanship narrative
- Florida connection
- Family tradition

---

### Cocktail Recipes (`/cocktail-recipes`)

**File:** [src/app/cocktail-recipes/page.tsx](src/app/cocktail-recipes/page.tsx)

**Layout Concept:** "The Recipe Index"

**Features:**
- Grid layout (3-4 columns)
- 90+ recipes
- Filter by spirit type
- Filter by difficulty
- Search functionality

**Recipe Data:**
- Stored in `src/lib/recipes.ts`
- 90+ recipes across 4 spirit categories
- Includes Rum, Bourbon, Tequila, Liqueur recipes

---

### Recipe Detail (`/cocktail-recipes/[slug]`)

**File:** [src/app/cocktail-recipes/[slug]/page.tsx](src/app/cocktail-recipes/[slug]/page.tsx)

**Layout Concept:** "The Recipe Card"

**Sections:**
1. **Hero Image**
   - Full-width cocktail photo
   - Recipe name overlay

2. **Recipe Meta**
   - Difficulty badge
   - Prep time
   - Taste profile

3. **Ingredients Section** ([IngredientsList.tsx](src/app/cocktail-recipes/[slug]/IngredientsList.tsx))
   - Bulleted list
   - Measurement + ingredient
   - Spirit highlighting

4. **Instructions Section** ([IngredientsSection.tsx](src/app/cocktail-recipes/[slug]/IngredientsSection.tsx))
   - Numbered steps
   - Clear, concise directions

5. **Share Button** ([ShareButton.tsx](src/app/cocktail-recipes/[slug]/ShareButton.tsx))
   - Social sharing
   - Copy link functionality

6. **Related Recipes**
   - 3 similar cocktails
   - Same spirit category

---

### Store Locator (`/store-locator`)

**File:** [src/app/store-locator/page.tsx](src/app/store-locator/page.tsx)

**Layout Concept:** "Find Your Bottle"

**Components:**
1. **Store Map** ([StoreMap.tsx](src/components/features/stores/StoreMap.tsx))
   - Interactive Leaflet map
   - Custom markers for stores
   - Click for details

2. **Store List** ([StoreList.tsx](src/components/features/stores/StoreList.tsx))
   - Sidebar list view
   - Store name, address, phone
   - Distance from user location
   - "Get Directions" CTA

**Functionality:**
- User geolocation request
- Distance calculation
- Filter by distance
- Search by ZIP code

**Data Source:**
- `GET /api/stores`
- Supabase `stores` table
- Lat/Lng coordinates

---

### Events (`/events`)

**File:** [src/app/events/page.tsx](src/app/events/page.tsx)

**Layout Concept:** "The Mosaic"

**Features:**
1. **Filter Header**
   - Icons: Tastings, Parties, Music

2. **Masonry Grid**
   - Pinterest-style mixed heights
   - Event photos + lifestyle shots
   - "RSVP" cards

3. **Shop The Look**
   - Horizontal strip
   - "Spirits seen in these photos"
   - Links to `/spirits`

**Data Source:**
- `src/lib/events.ts`
- Event listing array

---

### Contact (`/contact`)

**File:** [src/app/contact/page.tsx](src/app/contact/page.tsx)

**Layout Concept:** "The Experience"

**Sections:**
1. **Hero**
   - Aerial drone shot of distillery

2. **Experience Highlight**
   - "The Tikaram Experience"
   - Large tasting room image

3. **Info Grid**
   - 3 columns: Tours, Amenities, Contact

4. **Visual Grid**
   - 2x3 square images
   - Tour stops: Barrels, Bar, Entrance

5. **FAQ Accordion**
   - "Do I need a reservation?"
   - "Are kids allowed?"
   - Links to `/faqs`

---

## Data Architecture

### Product Data

**File:** [src/lib/data.ts](src/lib/data.ts)

**Structure:**
```typescript
type Product = {
  slug: string
  category: 'Rum' | 'Bourbon' | 'Tequila' | 'Liqueur'
  headline: string
  subhead: string
  description: string
  tastingNotes: {
    nose: string
    palate?: string
    finish?: string
    sweet?: number      // 1-10 scale
    oak?: number        // 1-10 scale
    spice?: number      // 1-10 scale
    fruit?: number      // 1-10 scale
  }
  price: string
  image: string
  process?: string
  ingredients?: string
}
```

**Data Storage:**
- Local TypeScript array
- 5 products
- Statically typed
- Version controlled

**Benefits:**
- No database dependency for products
- Fast build times
- Type safety
- Git history tracking

---

### Recipe Data

**File:** [src/lib/recipes.ts](src/lib/recipes.ts)

**Structure:**
```typescript
type Recipe = {
  slug: string
  name: string
  description: string
  baseSpirit: 'rum' | 'bourbon' | 'liqueur' | 'tequila'
  image: string
  ingredients: string[]
  instructions: string[]
  difficulty: 'Easy' | 'Medium' | 'Advanced'
  prepTime: string
  taste: string
  category: string
}
```

**Data Scale:**
- 90+ recipes total
- Distribution:
  - Rum: 15 recipes
  - Bourbon: 13 recipes
  - Tequila: 14 recipes
  - Key Lime Tequila: 10 recipes
  - Paan Liqueur: 11 recipes

**Image Naming Convention:**
```
/assets/cocktails/[recipe-slug].webp
```

---

### Store Data

**Database:** Supabase PostgreSQL

**Table:** `stores`

**Schema:**
```sql
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address_line1 TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**API Endpoint:**
- `GET /api/stores`
- Returns all store locations
- Used by map component

**Row Level Security:**
- Public read access
- Admin-only write access

---

### Leads Data

**Database:** Supabase PostgreSQL

**Table:** `leads`

**Schema:**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  zip_code TEXT,
  date_of_birth DATE,
  is_verified BOOLEAN DEFAULT FALSE,
  coupon_code TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  verified_at TIMESTAMP
);
```

**Workflow:**
1. User submits email via Newsletter Form
2. `POST /api/leads` creates record
3. Verification email sent via Resend
4. User clicks link → `POST /api/leads/verify`
5. `is_verified` set to `true`
6. Coupon code generated
7. Welcome email with coupon sent

**Coupon Code Generation:**
```typescript
const couponCode = `TIKARAM${Math.random().toString(36).substr(2, 8).toUpperCase()}`
```

---

### Events Data

**File:** [src/lib/events.ts](src/lib/events.ts)

**Structure:**
```typescript
type Event = {
  id: string
  title: string
  date: string
  location: string
  category: 'Tasting' | 'Party' | 'Music'
  image: string
  description: string
  rsvpLink?: string
}
```

**Storage:**
- Local array (current)
- Future: Migrate to Supabase for admin management

---

## User Experience Flows

### Age Gate Flow

```
User lands on site
  ↓
Is cookie present?
  ├─ Yes → Site access granted
  └─ No → Age Gate Modal shown
           ↓
         User enters DOB
           ↓
         Age >= 21?
           ├─ Yes → Cookie set (1 year)
           │        DOB saved to localStorage
           │        Modal closes
           └─ No → Redirect to Google
```

**Implementation:**
- Cookie name: `tikaram_age_verified`
- DOB localStorage: `tikaram_user_dob`
- Used for newsletter signup

---

### Newsletter Signup Flow

```
User enters email (Footer or Banner)
  ↓
Email validation
  ↓
Request name + ZIP code
  ↓
Pre-fill ZIP from location tracker (if available)
  ↓
Submit to POST /api/leads
  ↓
Verification email sent
  ↓
User clicks email link
  ↓
POST /api/leads/verify
  ↓
is_verified = true
  ↓
Coupon code generated
  ↓
Welcome email with coupon sent
  ↓
Success state displayed
```

**Email Templates:**
- Verification: [VerifyEmail.tsx](src/components/emails/VerifyEmail.tsx)
- Welcome: [WelcomeEmail.tsx](src/components/emails/WelcomeEmail.tsx)

---

### Product Discovery Flow

```
Homepage
  ↓
Product Lineup (horizontal scroll)
  ↓
Hover on bottle → Info card appears
  ↓
Click bottle → /spirits/[slug]
  ↓
View tasting notes, process, pricing
  ↓
"Serve It Up" section → Related recipes
  ↓
/cocktail-recipes/[slug]
  ↓
"Find a Store" CTA → /store-locator
```

---

### Store Finder Flow

```
/store-locator page load
  ↓
Request user location permission
  ├─ Granted → User lat/lng captured
  │            Distance calculated for all stores
  │            Map centered on user
  └─ Denied → Default to Florida center
              Show all stores
  ↓
User clicks store marker on map
  ↓
Popup with details shown
  ↓
"Get Directions" opens Google Maps
```

**Geolocation Hook:**
[useLocationTracker.ts](src/hooks/useLocationTracker.ts)
- Detects user location
- Tracks ZIP code
- Pre-fills newsletter form

---

## Performance & Optimization

### Image Optimization

**Next.js Image Component:**
- Automatic WebP conversion
- Lazy loading
- Responsive srcsets
- Priority loading for above-fold images

**Asset Organization:**
```
/public/assets/
  ├── home/          # Homepage: Videos (MP4), backgrounds (JPG)
  ├── products/      # Bottles: PNG with transparency
  ├── cocktails/     # Recipes: WebP format
  └── global/        # Logos: SVG format
```

**Video Optimization:**
- Desktop: 1920x1080 MP4, H.264, ~5MB max
- Mobile: 1080x1920 MP4, H.264, ~3MB max
- Autoplay, loop, muted for UX

---

### Code Splitting

**Automatic Route-Based Splitting:**
- Next.js App Router automatically code-splits by route
- Each page bundle loaded on-demand

**Dynamic Imports:**
```typescript
// Example: Map component (heavy library)
const StoreMap = dynamic(() => import('@/components/features/stores/StoreMap'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
})
```

---

### SEO Optimization

**Metadata Implementation:**
```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: 'Tikaram Spirits | Luxury Craft Spirits',
  description: 'Experience the timeless flavor of hand-crafted spirits from Florida.',
  openGraph: {
    title: 'Tikaram Spirits',
    description: 'Experience the timeless flavor...',
    type: 'website',
  },
}
```

**Dynamic Metadata:**
- Product pages: Custom title + description per product
- Recipe pages: Recipe name + ingredients
- Structured data (JSON-LD) for products

**Sitemap:**
- [src/app/sitemap.ts](src/app/sitemap.ts)
- Auto-generated from routes + data
- Includes all products, recipes, static pages

**Robots.txt:**
- [src/app/robots.ts](src/app/robots.ts)
- Allows all crawlers
- References sitemap

---

### Accessibility

**ARIA Labels:**
- Navigation landmarks
- Button descriptions
- Form inputs with labels

**Keyboard Navigation:**
- Tab order follows visual flow
- Focus indicators on interactive elements
- ESC key closes modals

**Color Contrast:**
- WCAG AA compliant
- Text contrast ratios verified
- Alternative text for images

---

## Future Recommendations

### Phase 1 (Immediate - 3 months)

1. **Analytics Integration**
   - Google Analytics 4
   - Conversion tracking (Store locator usage, Newsletter signups)
   - Heatmaps (Hotjar)

2. **Performance Monitoring**
   - Vercel Analytics
   - Core Web Vitals tracking
   - Error boundary implementation

3. **Email Marketing Automation**
   - Drip campaign for verified users
   - Birthday discounts (using DOB)
   - Abandoned cart (future e-commerce)

4. **Content Expansion**
   - Blog section for cocktail education
   - Video tutorials for recipes
   - Brand story timeline

---

### Phase 2 (Growth - 6 months)

1. **E-Commerce Integration**
   - Shopify or custom cart
   - Age verification at checkout
   - Inventory management
   - Order fulfillment

2. **User Accounts**
   - Save favorite recipes
   - Purchase history
   - Personalized recommendations

3. **Social Proof**
   - Customer reviews on products
   - Instagram feed integration
   - User-generated content gallery

4. **Advanced Store Locator**
   - Real-time inventory status
   - Call-ahead reservation
   - In-store events calendar

---

### Phase 3 (Scale - 12 months)

1. **Mobile App**
   - React Native for iOS/Android
   - Recipe bookmarking
   - Store locator with directions
   - Push notifications for events

2. **Loyalty Program**
   - Points for purchases
   - Exclusive tastings for members
   - Referral rewards

3. **Internationalization**
   - Spanish language support
   - Multi-currency pricing
   - Regional store locators

4. **Virtual Events**
   - Live tasting sessions
   - Mixology classes
   - Distillery tours (virtual)

---

## Technical Debt & Improvements

### Current Technical Debt

1. **Static Data Migration**
   - Products currently in local JSON
   - **Recommendation:** Migrate to Supabase for CMS editing
   - **Benefit:** Non-technical content updates

2. **Image Assets**
   - Some placeholder images
   - **Recommendation:** Professional product photography
   - **Benefit:** Brand consistency

3. **Error Handling**
   - Limited error boundaries
   - **Recommendation:** Implement React Error Boundaries
   - **Benefit:** Graceful failure states

4. **Testing Coverage**
   - No unit tests currently
   - **Recommendation:** Jest + React Testing Library
   - **Benefit:** Confidence in refactoring

---

### Code Quality Improvements

1. **Type Safety Enhancements**
   ```typescript
   // Current: Manual type definitions
   // Recommended: Generate from Supabase schema
   npx supabase gen types typescript --project-id <id> > src/types/database.types.ts
   ```

2. **Component Documentation**
   - Add JSDoc comments
   - Storybook for component library
   - Usage examples

3. **Performance Budget**
   - Set Lighthouse score targets
   - Automated performance testing
   - Bundle size monitoring

4. **Security Hardening**
   - Rate limiting on API routes
   - CSRF protection
   - Input sanitization

---

## Deployment & DevOps

### Current Hosting
- **Platform:** Vercel (assumed based on Next.js best practices)
- **Domain:** tikaramspirits.com
- **SSL:** Automatic via Vercel

### Environment Variables
```env
# Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email
RESEND_API_KEY=

# Analytics (future)
NEXT_PUBLIC_GA_TRACKING_ID=
```

### CI/CD Pipeline
**Recommended Setup:**
1. Git push to `main` branch
2. Vercel auto-deploy to production
3. Preview deployments for PRs
4. Automated Lighthouse checks
5. Type checking in CI

### Monitoring
**Tools to Integrate:**
- Sentry (Error tracking)
- Vercel Analytics (Performance)
- Supabase Logs (Database monitoring)
- Uptime monitoring (StatusCake)

---

## Conclusion

Tikaram Spirits represents a modern, performant web application built with industry-leading technologies. The design system is comprehensive, the component architecture is modular, and the user experience is carefully crafted to guide visitors from discovery to conversion.

### Key Strengths
1. **Strong Brand Identity** - Consistent visual language
2. **Performant Architecture** - Next.js 14 with optimizations
3. **Comprehensive Content** - 90+ recipes, 5 products, events
4. **User-Centric Flows** - Age gate, newsletter, store locator
5. **Scalable Foundation** - Ready for e-commerce expansion

### Success Metrics to Track
1. **Store Locator Usage:** % of visitors who use the map
2. **Newsletter Conversion:** Email signup → Verification rate
3. **Recipe Engagement:** Time on page, social shares
4. **Age Gate Pass Rate:** % who verify vs. bounce
5. **Product Page Depth:** Views per session

This design document serves as a comprehensive reference for developers, designers, and stakeholders to understand the complete architecture and implementation of the Tikaram Spirits website.
