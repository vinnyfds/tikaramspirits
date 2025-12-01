-- Seed data for Tikaram Spirits
-- This file contains initial dummy data for Stores and Products

-- Insert sample stores
INSERT INTO stores (id, name, address_line1, city, state, zip_code, lat, lng, phone)
VALUES
  (
    gen_random_uuid(),
    'Total Wine & Spirits',
    '123 Main Street',
    'Miami',
    'FL',
    '33101',
    25.7617,
    -80.1918,
    '(305) 555-0100'
  ),
  (
    gen_random_uuid(),
    'ABC Fine Wine & Spirits',
    '456 Ocean Drive',
    'Fort Lauderdale',
    'FL',
    '33301',
    26.1224,
    -80.1373,
    '(954) 555-0200'
  ),
  (
    gen_random_uuid(),
    'Liquor Store',
    '789 Beach Boulevard',
    'Tampa',
    'FL',
    '33601',
    27.9506,
    -82.4572,
    '(813) 555-0300'
  )
ON CONFLICT DO NOTHING;

-- Insert sample products
INSERT INTO products (slug, name, category, abv, tasting_notes)
VALUES
  (
    'ponce-de-leon-rum',
    'Ponce de León Rum',
    'Rum',
    '40%',
    '{"sweet": 3, "oak": 4, "spice": 2, "fruit": 5}'::jsonb
  ),
  (
    'florida-bourbon',
    'Florida Bourbon',
    'Bourbon',
    '45%',
    '{"sweet": 2, "oak": 5, "spice": 4, "fruit": 1}'::jsonb
  ),
  (
    'paan-liqueur',
    'Paan Liqueur',
    'Liqueur',
    '30%',
    '{"sweet": 5, "oak": 1, "spice": 3, "fruit": 4}'::jsonb
  ),
  (
    'tequila',
    'Tikaram Tequila',
    'Tequila',
    '40%',
    '{"sweet": 2, "oak": 3, "spice": 5, "fruit": 3}'::jsonb
  ),
  (
    'keylime',
    'Key Lime Liqueur',
    'Liqueur',
    '25%',
    '{"sweet": 4, "oak": 1, "spice": 1, "fruit": 5}'::jsonb
  )
ON CONFLICT DO NOTHING;

-- Insert store-product relationships
-- Links stores to products they carry using subqueries to get store IDs by name
INSERT INTO store_products (store_id, product_slug, inventory_count)
SELECT 
  s.id,
  'ponce-de-leon-rum',
  10
FROM stores s
WHERE s.name = 'Total Wine & Spirits'
ON CONFLICT DO NOTHING;

INSERT INTO store_products (store_id, product_slug, inventory_count)
SELECT 
  s.id,
  'ponce-de-leon-rum',
  5
FROM stores s
WHERE s.name = 'ABC Fine Wine & Spirits'
ON CONFLICT DO NOTHING;

INSERT INTO store_products (store_id, product_slug, inventory_count)
SELECT 
  s.id,
  'ponce-de-leon-rum',
  8
FROM stores s
WHERE s.name = 'Liquor Store'
ON CONFLICT DO NOTHING;

-- Add additional product relationships for testing
INSERT INTO store_products (store_id, product_slug, inventory_count)
SELECT 
  s.id,
  'florida-bourbon',
  12
FROM stores s
WHERE s.name = 'Total Wine & Spirits'
ON CONFLICT DO NOTHING;

INSERT INTO store_products (store_id, product_slug, inventory_count)
SELECT 
  s.id,
  'florida-bourbon',
  6
FROM stores s
WHERE s.name = 'ABC Fine Wine & Spirits'
ON CONFLICT DO NOTHING;

INSERT INTO store_products (store_id, product_slug, inventory_count)
SELECT 
  s.id,
  'paan-liqueur',
  15
FROM stores s
WHERE s.name = 'Total Wine & Spirits'
ON CONFLICT DO NOTHING;

INSERT INTO store_products (store_id, product_slug, inventory_count)
SELECT 
  s.id,
  'paan-liqueur',
  9
FROM stores s
WHERE s.name = 'Liquor Store'
ON CONFLICT DO NOTHING;

