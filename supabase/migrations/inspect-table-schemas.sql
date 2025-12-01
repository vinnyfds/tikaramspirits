-- Schema Inspection Queries
-- Run these queries in the Supabase SQL editor to find the correct column names

-- Check events table columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'events'
ORDER BY ordinal_position;

-- Check recipes table columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'recipes'
ORDER BY ordinal_position;

-- Alternative: Check for columns containing 'image' in their name
SELECT table_name, column_name, data_type
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND (table_name = 'events' OR table_name = 'recipes')
  AND column_name LIKE '%image%'
ORDER BY table_name, column_name;

