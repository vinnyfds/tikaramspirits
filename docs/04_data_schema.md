# Data Schema & Backend Logic

**Database:** Supabase (PostgreSQL)

## Tables

### 1. `leads` (For the Discount/Newsletter)
*Stores users who sign up for the coupon.*
* `id` (uuid, PK)
* `email` (text, unique)
* `first_name` (text)
* `is_verified` (boolean, default false) - *Switches to true after email click.*
* `coupon_code` (text) - *Generated automatically.*
* `created_at` (timestamp)

### 2. `stores` (For Store Locator)
*Locations where customers can buy Tikaram.*
* `id` (uuid, PK)
* `name` (text) - *e.g., "Total Wine & Spirits"*
* `address_line1` (text)
* `city` (text)
* `state` (text)
* `zip_code` (text)
* `lat` (float) - *Latitude for map pins*
* `lng` (float) - *Longitude for map pins*
* `phone` (text)

### 3. `products` (Optional - for future scalability)
*If we want to manage product details dynamically later.*
* `slug` (text, PK) - *e.g., 'tikaram-paan-liqueur'*
* `name` (text)
* `category` (text)
* `abv` (text) - *e.g. '40%'*
* `tasting_notes` (jsonb)

## Row Level Security (RLS) Policies
1.  **Public Read:** Anyone can read `stores` and `products`.
2.  **Private Write:** Only the Service Role (API) can write to `leads` (to prevent spam bots).