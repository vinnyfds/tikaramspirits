# Component Development Lessons & Fixes

**Document Purpose:** This document serves as a reference for common issues encountered during component development, their root causes, and proven solutions. Use this as a guide when building similar components in the future.

**Last Updated:** December 2024

---

## Table of Contents

1. [Data Consistency & Single Source of Truth](#1-data-consistency--single-source-of-truth)
2. [Image Format Optimization](#2-image-format-optimization)
3. [Button Spacing & Layout](#3-button-spacing--layout)
4. [ScrollTrigger Interaction Issues](#4-scrolltrigger-interaction-issues)
5. [Link Destination Updates](#5-link-destination-updates)

---

## 1. Data Consistency & Single Source of Truth

### Issue
Product data was duplicated across multiple files:
- `src/lib/data.ts` (source of truth)
- `src/components/features/home/product-scroll-showcase.tsx` (hardcoded duplicate)

**Problem:** Updates to product data in `data.ts` didn't reflect on the homepage because the component had its own hardcoded data.

### Root Cause
- Component was created with hardcoded product data for quick development
- No connection to the centralized data source
- Changes required manual updates in multiple locations

### Solution Applied
**Refactored `product-scroll-showcase.tsx` to use `data.ts`:**

```typescript
// Before: Hardcoded data
const PRODUCT_SLIDES: ProductSlide[] = [
  {
    id: 'paan-liqueur',
    name: 'Tikaram Paan Liqueur',
    tagline: 'Exotic Blend • 15% ABV', // Hardcoded, outdated
    // ...
  }
]

// After: Dynamic from data.ts
import { getAllProducts, type Product } from '@/lib/data'

const PRODUCT_SLIDES = useMemo(() => {
  const products = getAllProducts()
  return products
    .map(productToSlide)
    .filter((slide): slide is ProductSlide => slide !== null)
}, [])
```

### Lessons Learned
1. **Always use a single source of truth** - Never hardcode data that exists elsewhere
2. **Create mapping functions** - Use transformation functions (`productToSlide`) to convert data structures
3. **Separate concerns** - Keep presentation-specific data (background images, colors) separate from product data
4. **Use `useMemo`** - Memoize derived data to prevent unnecessary recalculations

### Best Practices
- ✅ Import from centralized data sources
- ✅ Create transformation/mapping functions for different component needs
- ✅ Keep UI-specific data (colors, images) in component-level constants
- ✅ Use TypeScript types to ensure data consistency

---

## 2. Image Format Optimization

### Issue
Product images were loading JPG format instead of higher-quality PNG format on the spirits collection page.

### Root Cause
Component was using `product.image` (JPG) instead of checking for `product.imagePng` first.

### Solution Applied
**Updated `src/app/spirits/page.tsx` ProductCard component:**

```typescript
// Before
<Image
  src={product.image}
  alt={product.headline}
/>

// After
<Image
  src={product.imagePng || product.image}
  alt={product.headline}
/>
```

### Lessons Learned
1. **Always prioritize higher quality formats** - Check for PNG/WebP before falling back to JPG
2. **Use fallback pattern** - `imagePng || image` ensures graceful degradation
3. **Consider performance** - PNG for product images, optimized formats for backgrounds

### Best Practices
- ✅ Check for preferred format first (`imagePng || image`)
- ✅ Use Next.js `Image` component for optimization
- ✅ Provide fallbacks for all image sources
- ✅ Document image format preferences in data schema

---

## 3. Button Spacing & Layout

### Issue
CTA buttons ("BUY NOW", "FIND IN STORE", "ADD TO CART") lacked proper horizontal spacing, making them appear cramped.

### Root Cause
Buttons were in separate containers without consistent spacing utilities.

### Solution Applied
**Updated `src/components/features/spirits/product-story-scroll.tsx`:**

```typescript
// Before: Separate containers, inconsistent spacing
<div className="mt-16">
  <Link href="/find-us">
    <Button>BUY NOW</Button>
  </Link>
</div>
{card.ctas && (
  <div className="flex flex-col sm:flex-row gap-3">
    <button>FIND IN STORE</button>
    <Button>Add to Cart</Button>
  </div>
)}

// After: Unified container with consistent spacing
<div className="mt-16 flex flex-col gap-4">
  <Link href="/find-us">
    <Button>BUY NOW</Button>
  </Link>
  {card.ctas && (
    <div className="flex flex-col sm:flex-row gap-4">
      <button>FIND IN STORE</button>
      <Button>Add to Cart</Button>
    </div>
  )}
</div>
```

### Lessons Learned
1. **Group related CTAs** - Keep all action buttons in a single container
2. **Use consistent gap values** - `gap-4` (16px) for button groups
3. **Responsive spacing** - Use `flex-col` on mobile, `flex-row` on desktop
4. **Visual hierarchy** - Primary action first, secondary actions below

### Best Practices
- ✅ Use Tailwind's gap utilities (`gap-4`, `gap-6`) for consistent spacing
- ✅ Group related buttons in a single flex container
- ✅ Maintain consistent spacing between all interactive elements
- ✅ Follow design system spacing guidelines

---

## 4. ScrollTrigger Interaction Issues

### Issue (CRITICAL)
Buttons were completely non-interactive on page load until user scrolled. Users couldn't click "BUY NOW", "FIND IN STORE", or "ADD TO CART" buttons immediately.

### Root Cause Analysis
Multiple factors contributed:

1. **Timing Issue:** GSAP's `useLayoutEffect` runs AFTER React render, creating a window where buttons are disabled
2. **GSAP Initialization Order:** All cards were set to `pointerEvents: 'none'` first, then first card was enabled
3. **ScrollTrigger Pin-Spacer:** GSAP's pinning creates `.pin-spacer` wrapper divs that can block pointer events
4. **CSS Class Conflicts:** Removed `pointer-events-none` from CSS but GSAP was overriding it

### Solution Applied (Multi-Layer Fix)

#### Layer 1: CSS Classes for Initial State
```typescript
// Set initial state in React render (runs first)
className={`... ${
  index === 0
    ? 'opacity-100 pointer-events-auto'  // First card: interactive
    : 'opacity-0 pointer-events-none'    // Others: hidden
}`}
```

#### Layer 2: Immediate useEffect Hook
```typescript
useEffect(() => {
  const enableInteractivity = () => {
    const firstCard = document.querySelector('[data-card="overview"]')
    if (firstCard) {
      firstCard.style.pointerEvents = 'auto'
      firstCard.style.zIndex = '10'
      
      // Enable all buttons
      const buttons = firstCard.querySelectorAll('button, a, [role="button"]')
      buttons.forEach((btn) => {
        btn.style.pointerEvents = 'auto'
        btn.style.zIndex = '20'
      })
      
      // Disable pin-spacer blocking
      document.querySelectorAll('.pin-spacer').forEach((spacer) => {
        spacer.style.pointerEvents = 'none'
      })
    }
  }
  
  requestAnimationFrame(enableInteractivity)
  setTimeout(enableInteractivity, 100)
  setTimeout(enableInteractivity, 500)
}, [])
```

#### Layer 3: GSAP Initialization Order
```typescript
// Set first card FIRST, before others
if (cards[0]) {
  gsap.set(cards[0], { 
    autoAlpha: 1, 
    pointerEvents: 'auto', 
    immediateRender: true 
  })
  cards[0].style.pointerEvents = 'auto'
}

// Then set other cards
if (cards.length > 1) {
  gsap.set(cards.slice(1), { 
    autoAlpha: 0, 
    pointerEvents: 'none' 
  })
}
```

#### Layer 4: ScrollTrigger Configuration
```typescript
scrollTrigger: {
  pin: true,
  pinType: 'fixed',
  onEnter: () => {
    // Re-enable buttons when ScrollTrigger activates
    const firstCard = cards[0]
    if (firstCard) {
      firstCard.style.pointerEvents = 'auto'
    }
  }
}
```

#### Layer 5: Explicit Inline Styles on Buttons
```typescript
<Button 
  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
>
  BUY NOW
</Button>
```

### Lessons Learned

1. **Multiple Layers of Protection**
   - CSS classes for initial state
   - useEffect for immediate DOM manipulation
   - GSAP for animation state
   - ScrollTrigger callbacks for pinning events
   - Inline styles as final fallback

2. **Timing is Critical**
   - React render → CSS classes apply first
   - useEffect runs after render but before paint
   - GSAP useLayoutEffect runs after paint
   - Need to account for all timing windows

3. **ScrollTrigger Pin-Spacer Issue**
   - `.pin-spacer` divs are created by GSAP when pinning
   - They can block pointer events even if child elements are enabled
   - Solution: Set `pointer-events: none` on pin-spacers

4. **Z-Index Stacking**
   - Buttons need higher z-index than pin-spacers
   - Use `position: relative` on buttons to create stacking context

5. **ImmediateRender Flag**
   - Use `immediateRender: true` in GSAP to apply styles immediately
   - Prevents delay between GSAP initialization and style application

### Best Practices

- ✅ **Always set initial CSS state** - Don't rely solely on JavaScript
- ✅ **Use multiple timing strategies** - requestAnimationFrame, setTimeout(0), setTimeout(100)
- ✅ **Check for pin-spacer blocking** - Always disable pointer events on `.pin-spacer` divs
- ✅ **Set explicit z-index** - Ensure interactive elements are above wrappers
- ✅ **Use inline styles as fallback** - Final layer of protection
- ✅ **Test immediately on load** - Don't wait for scroll or interaction

### Debugging Checklist

When buttons aren't interactive:
1. ✅ Check computed styles for `pointer-events` value
2. ✅ Inspect for `.pin-spacer` divs blocking interaction
3. ✅ Verify z-index stacking order
4. ✅ Check GSAP timeline state
5. ✅ Look for CSS conflicts
6. ✅ Test timing of useEffect vs useLayoutEffect

---

## 5. Link Destination Updates

### Issue
"BUY NOW" button was linking to `/store-locator` instead of the correct `/find-us` route.

### Root Cause
Route was renamed but component wasn't updated.

### Solution Applied
```typescript
// Before
<Link href="/store-locator">

// After
<Link href="/find-us">
```

### Lessons Learned
1. **Route changes require global search** - Use IDE search to find all references
2. **Update sitemap documentation** - Keep route documentation in sync
3. **Use constants for routes** - Consider creating a routes constant file

### Best Practices
- ✅ Search codebase for route references when renaming
- ✅ Update all components using the route
- ✅ Update sitemap and documentation
- ✅ Consider using route constants: `const ROUTES = { FIND_US: '/find-us' }`

---

## General Development Principles

### 1. Single Source of Truth
- Never duplicate data
- Always import from centralized sources
- Create transformation functions for different formats

### 2. Defensive Programming
- Multiple layers of protection for critical interactions
- Fallbacks for all user-facing features
- Explicit styles override implicit ones

### 3. Timing Awareness
- Understand React render cycle
- Account for GSAP/ScrollTrigger initialization
- Use appropriate hooks (useEffect vs useLayoutEffect)

### 4. Testing Strategy
- Test immediately on page load
- Test after scroll/interaction
- Test on different screen sizes
- Use browser DevTools to verify styles

### 5. Documentation
- Document why fixes were needed
- Explain root causes, not just solutions
- Include code examples
- Create debugging checklists

---

## Quick Reference: Common Fixes

### Buttons Not Clickable?
1. Check `pointer-events` in computed styles
2. Look for `.pin-spacer` blocking
3. Verify z-index stacking
4. Add explicit inline styles
5. Check GSAP timeline state

### Data Not Updating?
1. Check for hardcoded duplicates
2. Verify import from source
3. Check memoization dependencies
4. Look for stale closures

### Spacing Issues?
1. Use Tailwind gap utilities
2. Group related elements
3. Follow design system guidelines
4. Check responsive breakpoints

### Images Not Loading?
1. Check format priority (PNG > JPG)
2. Verify fallback pattern
3. Check Next.js Image optimization
4. Verify file paths

---

**End of Document**

