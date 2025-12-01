# Form Specifications

**Tech Stack:** React Hook Form + Zod.

## 1. Newsletter / Discount Signup
**Location:** Footer & Popup.
**Fields:**
* `email` (Email, Required)
* `zip_code` (String, Optional - for locating demand)

**Submission Logic:**
1.  Save to Database (Supabase 'leads' table).
2.  Trigger API: Send "Welcome" email.
3.  **UI Feedback:** Show "Check your email for your coupon code."

## 2. Contact Us
**Location:** `/contact`
**Fields:**
* `first_name`, `last_name`
* `inquiry_type` (Dropdown: General, Wholesale, Events, Press)
* `message` (Textarea, min 20 chars)

## 3. Store Locator Search
**Location:** `/store-locator`
**Fields:**
* `search_query` (Zip code or City)
**Logic:**
* Filter JSON list of stores based on geodistance.