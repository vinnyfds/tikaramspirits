-- Fix filename mismatches for events
-- Update image_url columns to use correct filenames matching S3 uploads

-- 1. Fix Rum & Bourbon Masterclass event
UPDATE events
SET image_url = REPLACE(
    image_url, 
    'tasting-masterclass-thumb.jpg', 
    'rum-bourbon-masterclass-thumb.jpg'
)
WHERE slug = 'rum-bourbon-masterclass';

-- 2. Fix Summer Solstice Mixer event
UPDATE events
SET image_url = REPLACE(
    image_url, 
    'music-fest-thumb.jpg', -- Old/incorrect filename
    'summer-solstice-mixer-thumb.jpg' -- Correct S3 filename
)
WHERE slug = 'summer-solstice-mixer';

