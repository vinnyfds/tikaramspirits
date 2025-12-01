# Page Layout Specifications & Navigation Flow
**Reference Style:** "Bold Heritage" (High contrast, split storytelling, grid mosaics).
**Global Footer CTA:** Every page ends with the "Join Team Tikaram" Newsletter section before the actual footer.

---

## 1. Homepage (`/`)
**Layout Concept:** "The Invitation"
1.  **Hero Section:**
    * **Visual:** Full-screen video or high-res image (Aerial of Florida/Distillery).
    * **Overlay:** "Tikaram Spirits" Large Typography + Subheading.
    * **CTA Button:** "Discover Our Spirits" -> **Links to:** `/spirits`
2.  **Product Lineup ("Let's Get To Know Each Other"):**
    * **Layout:** 4 Bottles standing side-by-side on a textured background (Sand/Off-white).
    * **Interaction:** Hovering over a bottle scales it up slightly.
    * **Click Action:** Clicking a bottle -> **Links to:** `/spirits/[slug]`
3.  **Mixology Cards ("Drink It Your Way"):**
    * **Layout:** 3 Vertical Cards (White background).
    * **Content:** Icon (Highball/Rocks) + Cocktail Photo + Name.
    * **CTA:** "See Recipes" -> **Links to:** `/cocktail-recipes`
4.  **The Split (Heritage vs. Lifestyle):**
    * **Layout:** 50/50 Split Grid.
    * **Left Box:** Image of Distillery/Founder. Text: "Visited our Home?" -> **Links to:** `/about`
    * **Right Box:** Lifestyle Image (Person holding bag/bottle). Text: "Find a Store" -> **Links to:** `/store-locator`
5.  **Global Footer CTA:**
    * **Visual:** Full-width lifestyle image with email input field overlay.

---

## 2. Our Collection (`/spirits`)
**Layout Concept:** "The Showroom"
1.  **Collection Hero:**
    * **Visual:** Top-down shot of a bottle lying on a textured surface (Gold/Yellow background).
    * **Text:** "Experience the Timeless Flavor."
2.  **Sticky Filter Bar:**
    * **UI:** Horizontal list: "All", "Rum", "Bourbon", "Tequila", "Liqueur".
    * **Logic:** Clicking filters the list below using client-side state.
3.  **Featured Product (The "King" Card):**
    * **Layout:** Large centered white card floating over the background.
    * **Visual:** Bottle center, description left.
    * **Buttons:** "Learn More" -> **Links to:** `/spirits/ponce-de-leon-rum`
4.  **Brand Interjection:**
    * **Layout:** Split Banner. Text Left ("A Story as Old as Florida") / Image Right (Pouring liquid).
    * **Button:** "Read History" -> **Links to:** `/about`

---

## 3. Product Detail Page (`/spirits/[slug]`)
**Layout Concept:** "The Deep Dive"
1.  **Product Header:**
    * **Layout:** White background. Bottle Image (Top Left), Typography & Rating (Top Right).
    * **Banner:** Full-width angled image strip below header showing the label close-up.
2.  **Sensory Profile (The Wheel):**
    * **Layout:** Centered circular diagram showing flavor intensity: Sweet, Oak, Spice, Fruit.
    * **Data:** Pulls from `tasting_notes` in JSON.
3.  **Heritage Strip:**
    * **Visual:** Wide photo of bottles on a shelf or barrels.
    * **Overlay Text:** "Seven Generations of Craft."
4.  **Tasting & Process Details:**
    * **Layout:** Two columns.
        * **Left:** Accordion or Text block (ABV, Proof, Tasting Notes).
        * **Right:** Image of the Distillers/Process.
5.  **"Serve It Up" (Recipe Cross-Sell):**
    * **Layout:** 3 Cards showing cocktails made specifically with *this* bottle.
    * **Click Action:** -> **Links to:** `/cocktail-recipes`
6.  **"You Might Also Like":**
    * **Layout:** 3 Bottle thumbnails.
    * **Click Action:** -> **Links to:** Other `/spirits/[slug]` pages.

---

## 4. About Us (`/about`)
**Layout Concept:** "The Timeline"
1.  **Hero:**
    * **Visual:** Dark barrel room interior. Text: "A Story Rooted in Florida."
2.  **Untold Story Section:**
    * **Layout:** Asymmetrical. Large text block on Left. Photo collage (stacked images) on Right.
    * **Visual Element:** A vertical line (timeline) running down the center.
3.  **Discovery Cards (Cross-Links):**
    * **Layout:** Two massive clickable image cards side-by-side.
    * **Card 1:** "Our Spirits" (Bottle Image) -> **Links to:** `/spirits`
    * **Card 2:** "Visit Us" (Distillery Image) -> **Links to:** `/contact`

---

## 5. Events / Gallery (`/events`)
**Layout Concept:** "The Mosaic"
1.  **Filter Header:**
    * **UI:** Icons for "Tastings", "Parties", "Music".
2.  **Masonry Grid:**
    * **Layout:** Pinterest-style mixed height grid.
    * **Content:** Mix of Event Photos, Lifestyle shots, and "RSVP" cards.
    * **Interaction:** Clicking an image opens a Lightbox or Modal with event details.
3.  **Shop The Look:**
    * **Layout:** Horizontal strip at bottom. "Spirits seen in these photos."
    * **Click Action:** -> **Links to:** `/spirits`

---

## 6. Contact / Visit Us (`/contact`)
**Layout Concept:** "The Experience"
1.  **Hero:**
    * **Visual:** Wide aerial drone shot of the distillery/location.
2.  **Experience Highlight:**
    * **Layout:** Centered Text "The Tikaram Experience" + Large square image of the Tasting Room.
3.  **Info Grid:**
    * **Layout:** 3 Columns (Text-only): Tours, Amenities, Contact Info.
4.  **Visual Grid (6-Pack):**
    * **Layout:** 2 rows of 3 square images showing the "Tour Stops" (Barrels, Bar, Entrance, etc).
5.  **FAQ Accordion:**
    * **Content:** "Do I need a reservation?", "Are kids allowed?", etc. -> **Links to:** `/faqs`

---

## 7. Global Navigation Elements
* **Navbar:** Links to: Spirits, Story (`/about`), Recipes, Events, Visit (`/contact`).
* **Utility Icons (Top Right):**
    * **Globe:** Language Selector (English/Spanish).
    * **Pin/Map:** Quick link to -> `/store-locator`.