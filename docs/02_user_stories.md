# User Stories & Functional Requirements

## 1. Global / Entry
* **Story:** As a visitor, I must verify I am 21+ before viewing content.
* **Acceptance Criteria:**
    * Show full-screen modal on first visit.
    * Input: Date of Birth.
    * Logic: If < 21, redirect to Google. If 21+, save cookie (30 days) and unlock site.

## 2. Product Exploration (Commerce/Showcase)
* **Story:** As a user, I want to learn about the specific tasting notes of "Ponce de Leon Rum."
* **Acceptance Criteria:**
    * Each product (Rum, Bourbon, Liqueur, Tequila) has a dedicated URL (from sitemap).
    * Page includes: Tasting Notes, Serving Suggestions, Awards, and "Find in Store" button.

## 3. Store Locator (Utility)
* **Story:** As a user, I want to find the nearest liquor store selling Tikaram.
* **Acceptance Criteria:**
    * Input: Zip Code or "Use my Location."
    * Output: List of stores sorted by distance + Map View.

## 4. The "First Bottle Discount" (Lead Gen)
* **Story:** As a new customer, I want a discount on my first purchase.
* **Flow:**
    1.  User sees "Get $X Off" CTA.
    2.  User enters Name + Email.
    3.  System sends verification email (Double Opt-in).
    4.  User clicks link -> Redirects to `/verification-success`.
    5.  Screen displays a unique Barcode/Coupon image to show at retail checkout.

## 5. Cocktail Recipes
* **Story:** As a host, I want to know how to mix Tikaram Paan Liqueur.
* **Acceptance Criteria:**
    * Filterable list of recipes.
    * Detail view: Ingredients, Steps, "Buy the Spirit" CTA.