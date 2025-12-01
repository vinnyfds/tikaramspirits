# Design System Specifications (Visual Physics)

**Strict Instruction:** All UI components must use these specific tokens.
**Responsive Strategy:** Mobile-First. All base values apply to mobile, then scale up for `md` (Tablet) and `lg` (Desktop).

---

## 1. Typography System (Fluid Scale)
**Font Families:**
* **Primary / Headings:** `Playfair Display` (Serif).
* **Secondary / Body:** `Montserrat` (Sans-serif).
* **Accent:** `Lato` (Sans-serif).

### Responsive Type Scale (Using CSS Clamp)
*We use `clamp(min, preferred, max)` to ensure text resizes automatically between viewports.*

| Token | Element | Mobile Size (Base) | Desktop Size (lg) | Logic (Tailwind Class) |
| :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `h1` | `2.5rem` (40px) | `4.5rem` (72px) | `text-[clamp(2.5rem,5vw,4.5rem)]` |
| **Section Title** | `h2` | `2.0rem` (32px) | `3.0rem` (48px) | `text-[clamp(2rem,3vw,3rem)]` |
| **Card Title** | `h3` | `1.5rem` (24px) | `2.0rem` (32px) | `text-2xl lg:text-3xl` |
| **Subtitle** | `h4` | `1.125rem` (18px) | `1.5rem` (24px) | `text-lg lg:text-2xl` |
| **Body Large** | `p.intro`| `1.0rem` (16px) | `1.125rem` (18px)| `text-base lg:text-lg` |
| **Body Base** | `p` | `0.875rem` (14px)| `1.0rem` (16px) | `text-sm lg:text-base` |
| **Button / Nav** | `span`| `0.875rem` (14px)| `0.875rem` (14px)| `text-sm uppercase tracking-[0.15em] font-semibold` |
| **Caption** | `span`| `0.75rem` (12px) | `0.875rem` (14px) | `text-xs lg:text-sm` |

**Typography Rules:**
1.  **Uppercase:** All **Buttons**, **Navigation Links**, and **Section Kickers** (small text above H2) must be `uppercase` with `tracking-widest` (0.15em).
2.  **Opacity:** Body text on dark backgrounds should be `opacity-90` for readability, never pure white.

---

## 2. Spacing & Layout (Semantic & Optical)
**Base Unit:** 4px (0.25rem).

### The Laws of Spacing (Relationship Logic)
*Cursor Rule: Assess the relationship strength between two elements before applying a gap.*

1.  **Connected (Strong Relationship):** `gap-2` (8px) or `gap-3` (12px).
    * *Usage:* Between Label & Input, H2 & H3, Icon & Text.
2.  **Grouped (Medium Relationship):** `gap-4` (16px) or `gap-6` (24px).
    * *Usage:* Between Card Image & Card Body, H3 & Paragraph, List Items.
3.  **Distinct (Weak Relationship):** `gap-12` (48px) or `gap-16` (64px).
    * *Usage:* Between Sidebar & Content, between two distinct Feature Sections.
4.  **Severed (No Relationship):** `gap-32` (128px) to `gap-40` (160px).
    * *Usage:* Between "Chapter" changes on the Homepage (e.g., Hero -> Products).

### Optical Corrections (Playfair Display Specifics)
*The Playfair font has a high ascender, creating extra whitespace at the top of its bounding box.*

* **Rule:** When aligning Playfair Headings vertically with icons or images, apply a negative top margin (`-mt-1` or `-mt-2`) to correct the visual center.
* **Card Padding:** If a card has 24px padding (`p-6`), the top padding should optically feel like 24px. Because of the font's line-height, reduce the top padding slightly (`pt-5 pb-6`) to achieve *visual* symmetry.

### Section Spacing (Fluid)
* **Standard Section:** `py-16` (Mobile) -> `py-32` (Desktop).
* **Container Width:** `max-w-[1440px]` (Wide), `max-w-[800px]` (Reading).
* **Edge Padding:** `px-4` (Mobile) -> `px-8` (Tablet) -> `px-12` (Desktop).


### Container Widths
* **Max Width:** `max-w-[1440px]` (Wide) for grids.
* **Reading Width:** `max-w-[800px]` (Narrow) for long-form text.
* **Edge Padding:** `px-4` (Mobile) -> `px-8` (Tablet) -> `px-12` (Desktop).

### Gap System
* **Gap-XS (4px):** Between related icons and text.
* **Gap-S (16px):** Between cards in a dense grid.
* **Gap-M (32px):** Standard separation between layout columns.
* **Gap-L (64px):** Separation between major content blocks.
* **Gap-XL (128px):** Between homepage "chapters".

---

## 3. Borders, Strokes, & Radius

### Corner Radius (Border Radius)
* **Sharp (0px):** Images, Banners (To convey "Heritage/Brutalist" feel).
* **Soft (4px):** Buttons, Input Fields, Cards (To feel tactile but not "bubbly").
* **Pill (999px):** Status badges (e.g., "New Arrival").

### Strokes (Borders)
* **Thin (1px):** Standard card borders, input fields.
    * *Color:* `border-neutral-200` (Light mode), `border-white/10` (Dark mode).
* **Thick (2px):** Primary Buttons, Active States.
    * *Color:* `border-tikaram-gold` (#D4AF37).
* **Dividers:** Use `1px` lines with `w-24` (short line) centered to separate headings from body text.

---

## 4. Shadows & Elevation (Depth)
* **Level 1 (Subtle):** `0 2px 4px rgba(0,0,0,0.05)` - Product Cards at rest.
* **Level 2 (Hover):** `0 12px 24px -4px rgba(0,0,0,0.12)` - Cards on hover.
* **Level 3 (Floating):** `0 24px 48px -12px rgba(0,0,0,0.25)` - Sticky Headers, Modals.
* **Glow (Special):** `0 0 15px rgba(212, 175, 55, 0.3)` - For "Gold" active states.

---

## 5. Fills & Textures
Since we want "Sun-soaked" and "Earth":

* **Glassmorphism (Dark):** `bg-black/60 backdrop-blur-md border-white/10`. (Use for Sticky Nav).
* **Glassmorphism (Light):** `bg-white/80 backdrop-blur-md border-black/5`.
* **Texture Overlay:** Use a generic CSS noise pattern at 3% opacity over solid background colors (Deep Forest, Rust) to give them "paper" texture.

---

## 6. Color Palette (Strict Hex Codes)

### Primary Backgrounds
* **Deep Forest:** `#004225` (Primary Brand Bg)
* **Off-White (Paper):** `#F8F8F8` (Light Section Bg)
* **Rich Black:** `#050505` (Dark Section Bg)

### Text Colors
* **Charcoal:** `#36454F` (Standard Body Text on Light)
* **Cream:** `#FFFDD0` (Body Text on Dark)
* **Pure White:** `#FFFFFF` (Headings on Dark)

### Accents (Buttons & CTAs)
* **Tikaram Gold:** `#D4AF37`
* **Rust:** `#B7410E` (Error states or "Sale" tags)

---

## 7. Interactive States (Micro-interactions)
* **Button Hover:**
    * *Transform:* `translate-y-[-2px]` (Lift up).
    * *Shadow:* Apply Level 2 Shadow.
    * *Transition:* `all 0.3s ease-out`.
* **Image Hover:**
    * *Scale:* `scale-105` (Slow zoom).
    * *Filter:* `brightness-110`.
    * *Transition:* `duration-700 ease-in-out` (Cinematic slow).