# Project Scaffolding & Architecture (Final Approved)

**Strict Instruction:** When generating the project, adhere to this exact directory structure.

## 1. Root Configuration
* `package.json` (Next.js 14, Tailwind, Framer Motion, Lucide-React, Supabase, React Hook Form, Zod)
* `middleware.ts` (Supabase Auth session management)
* `tsconfig.json` (Strict mode)
* `tailwind.config.ts` (MUST import tokens from @03_design_system.md)
* `next.config.js` (Image domain configuration)
* `.env.local` (Supabase & App secrets)
* `amplify.yml` (AWS Build spec)

## 2. Source Architecture (`/src`)

### 2a. App Router (`/src/app`)
**Core System:**
* `layout.tsx` (Global RootLayout)
    * **CRITICAL:** Must load and apply these fonts via `next/font/google`:
        1. `Playfair Display` (variable: `--font-serif`)
        2. `Montserrat` (variable: `--font-sans`)
        3. `Lato` (variable: `--font-accent`)
    * **Metadata:** Default Title, Description, and OpenGraph tags.
    * **Providers:** AgeGateProvider, ToastProvider.
* `page.tsx` (Home - see @07_layout_specs.md)
* `not-found.tsx` (Custom 404)
* `error.tsx` (Global Error Boundary)
* `loading.tsx` (Global Loading State)

**SEO Files (Crucial for Ranking):**
* `sitemap.ts` (Dynamic sitemap generation for Products/Stores)
* `robots.ts` (Crawling rules)

**Routes:**
* `/spirits/page.tsx` (Collection)
* `/spirits/[slug]/page.tsx` (Dynamic Product Detail + Metadata generation)
* `/about/page.tsx`
* `/events/page.tsx`
* `/contact/page.tsx`
* `/store-locator/page.tsx`
* `/cocktail-recipes/page.tsx`
* `/cocktail-recipes/[slug]/page.tsx`
* `/verification-success/page.tsx`

### 2b. API Routes (`/src/app/api`)
* `/leads/route.ts` (POST: Newsletter signup)
* `/stores/route.ts` (GET: Fetch stores with geo-params)

### 2c. Component Library (`/src/components`)
**Organize by Domain:**
* `/ui` (Base primitives: Button, Input, Modal, Drawer, Card, Toast)
* `/layout` (Header, Footer, MobileNav)
* `/features/age-gate` (AgeGateModal.tsx)
* `/features/products` (ProductCard.tsx, TastingWheel.tsx)
* `/features/stores` (StoreLocatorMap.tsx, StoreList.tsx)
* `/features/forms` (NewsletterForm.tsx, ContactForm.tsx)

### 2d. State & Logic
* `/src/lib`
    * `supabase/client.ts` (Browser Client)
    * `supabase/server.ts` (Server Client - Cookie based)
    * `utils.ts` (cn class merger, formatters)
    * `fonts.ts` (Centralized font configuration helper)
* `/src/hooks`
    * `useAgeGate.ts` (Cookie logic)
    * `useMediaQuery.ts` (Responsive checks)
* `/src/types`
    * `database.types.ts` (Supabase Auto-gen)
    * `index.ts` (Global UI types)

## 3. Database & Migrations
* `/supabase/migrations` (SQL files)
* `/supabase/seed.sql` (Initial dummy data for Stores/Products)

## 4. Public Assets (`/public`)
* Follow the structure in `@05_asset_map.md` strictly.