-- Update image paths to S3 URLs for events and recipes tables
-- Column names:
--   - recipes table: 'image'
--   - events table: 'image_url'

-- 1. Recipes Table Update (Uses 'image')
UPDATE recipes
SET image = REPLACE(image, '/assets/cocktails/', 'https://tikaram-spirits-assets-prod.s3.us-east-1.amazonaws.com/assets/cocktails/')
WHERE image LIKE '/assets/cocktails/%';

-- 2. Events Table Update (Uses 'image_url')
UPDATE events
SET image_url = REPLACE(image_url, '/assets/events/', 'https://tikaram-spirits-assets-prod.s3.us-east-1.amazonaws.com/assets/events/')
WHERE image_url LIKE '/assets/events/%';

