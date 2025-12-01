import { recipes } from '../src/lib/recipes'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Parse ingredient string into JSON object
 * Examples:
 * - '2oz Ponce Rum' -> {amount: 2, unit: 'oz', item: 'Ponce Rum'}
 * - '0.75oz Lime Juice' -> {amount: 0.75, unit: 'oz', item: 'Lime Juice'}
 * - 'Dash Angostura' -> {amount: null, unit: 'dash', item: 'Angostura'}
 * - 'Fresh Mint' -> {amount: null, unit: null, item: 'Fresh Mint'}
 * - '2 Dashes Angostura Bitters' -> {amount: 2, unit: 'dashes', item: 'Angostura Bitters'}
 */
function parseIngredient(ingredient: string): {
  amount: number | null
  unit: string | null
  item: string
} {
  // Trim whitespace
  const trimmed = ingredient.trim()

  // Pattern 1: Number + unit + item (e.g., "2oz Ponce Rum", "0.75oz Lime Juice")
  // Pattern: (\d+(?:\.\d+)?)\s*([a-z]+)\s+(.+)
  const matchWithUnit = trimmed.match(/^(\d+(?:\.\d+)?)\s+([a-z]+)\s+(.+)$/i)
  if (matchWithUnit) {
    return {
      amount: parseFloat(matchWithUnit[1]),
      unit: matchWithUnit[2].toLowerCase(),
      item: matchWithUnit[3].trim(),
    }
  }

  // Pattern 2: Number + unit concatenated + item (e.g., "2oz Ponce Rum", "0.75oz Lime Juice")
  const matchConcatenated = trimmed.match(/^(\d+(?:\.\d+)?)([a-z]+)\s+(.+)$/i)
  if (matchConcatenated) {
    return {
      amount: parseFloat(matchConcatenated[1]),
      unit: matchConcatenated[2].toLowerCase(),
      item: matchConcatenated[3].trim(),
    }
  }

  // Pattern 3: Unit word + item (e.g., "Dash Angostura", "Splash of Cream")
  // These are actual units, not modifiers
  // Handle "Splash of" specially
  const splashMatch = trimmed.match(/^Splash\s+of\s+(.+)$/i)
  if (splashMatch) {
    return {
      amount: null,
      unit: 'splash',
      item: splashMatch[1].trim(),
    }
  }

  const unitWords = ['Dash', 'Dashes', 'Splash']

  for (const unitWord of unitWords) {
    const regex = new RegExp(`^${unitWord}\\s+(.+)$`, 'i')
    const unitMatch = trimmed.match(regex)
    if (unitMatch) {
      return {
        amount: null,
        unit: unitWord.toLowerCase(),
        item: unitMatch[1].trim(),
      }
    }
  }

  // Pattern 4: Modifier words (these are part of the item name, not units)
  // e.g., "Fresh Mint", "Crushed Ice", "Hot Coffee", "Heavy Cream"
  // These should be treated as items with no unit
  const modifierWords = [
    'Fresh',
    'Crushed',
    'Hot',
    'Heavy',
    'Egg',
    'Salt',
    'Cinnamon',
    'Mint',
    'Rose',
    'Betel',
    'Graham',
    'Coffee',
    'Pineapple',
    'Grapefruit',
    'Jalapeño',
    'Cucumber',
    'Candied',
    'Orange',
    'Lime',
    'Ginger',
    'Sparkling',
    'Tonic',
    'Soda',
    'Prosecco',
    'Club',
  ]

  // Check if it starts with a modifier - if so, treat as item
  for (const modifier of modifierWords) {
    if (trimmed.toLowerCase().startsWith(modifier.toLowerCase())) {
      // It's a modifier + item, treat as single item
      return {
        amount: null,
        unit: null,
        item: trimmed,
      }
    }
  }

  // Fallback: treat entire string as item (e.g., "Orange Juice", "Ginger Beer")
  return {
    amount: null,
    unit: null,
    item: trimmed,
  }
}

/**
 * Map baseSpirit to product slug
 * Handles special cases for Key Lime recipes
 */
function mapProductSlug(
  baseSpirit: 'rum' | 'bourbon' | 'liqueur' | 'tequila',
  recipeSlug: string,
  recipeName: string
): string {
  const isKeyLime =
    recipeSlug.includes('keylime') ||
    recipeSlug.includes('key-lime') ||
    recipeName.toLowerCase().includes('key lime')

  switch (baseSpirit) {
    case 'rum':
      return 'ponce-de-leon-rum'
    case 'bourbon':
      return 'florida-bourbon'
    case 'liqueur':
      return isKeyLime ? 'keylime' : 'paan-liqueur'
    case 'tequila':
      return isKeyLime ? 'keylime' : 'tequila'
    default:
      return 'tequila'
  }
}

/**
 * Generate placeholder flavor notes
 */
function generateFlavorNotes(taste: string, category: string): string {
  const tasteMap: Record<string, string> = {
    Refreshing: 'A refreshing flavor profile with bright citrus notes and a clean finish.',
    Sweet: 'A smooth, sweet flavor profile with hints of vanilla and caramel.',
    Rich: 'A rich, complex flavor profile with deep notes of oak and spice.',
    Bold: 'A bold flavor profile with hints of oak and spice, perfect for sipping.',
    Bitter: 'A sophisticated bitter profile with herbal notes and a dry finish.',
    Spicy: 'A spicy flavor profile with warming notes of ginger and pepper.',
  }

  return (
    tasteMap[taste] ||
    `A ${taste.toLowerCase()} flavor profile with notes of ${category.toLowerCase()}, perfect for any occasion.`
  )
}

/**
 * Generate placeholder occasion note
 */
function generateOccasionNote(category: string): string {
  const occasionMap: Record<string, string> = {
    Classic: 'Perfect for any classic cocktail occasion, from happy hour to formal gatherings.',
    Tropical: 'Ideal for beachside gatherings and tropical-themed parties.',
    Sophisticated: 'Perfect for upscale events and sophisticated cocktail hours.',
    Refreshing: 'Great for outdoor gatherings and warm-weather celebrations.',
    Spicy: 'Perfect for adding a kick to your cocktail party or dinner gathering.',
  }

  return (
    occasionMap[category] ||
    `A versatile cocktail perfect for ${category.toLowerCase()} occasions and gatherings.`
  )
}

/**
 * Escape SQL string
 */
function escapeSqlString(str: string): string {
  return str.replace(/'/g, "''")
}

/**
 * Convert array to PostgreSQL array format
 */
function arrayToPgArray(arr: string[]): string {
  const escaped = arr.map((item) => `"${escapeSqlString(item)}"`).join(', ')
  return `ARRAY[${escaped}]`
}

/**
 * Convert JSON object to PostgreSQL JSONB format
 */
function jsonToPgJsonb(obj: any): string {
  const jsonString = JSON.stringify(obj)
  return `'${escapeSqlString(jsonString)}'::jsonb`
}

/**
 * Main migration function
 */
function migrateRecipes() {
  console.log('Starting recipes migration...\n')

  const sqlStatements: string[] = []
  sqlStatements.push('-- Recipes migration from src/lib/recipes.ts')
  sqlStatements.push('-- Generated automatically by scripts/migrate-recipes.ts\n')
  sqlStatements.push('INSERT INTO recipes (')
  sqlStatements.push(
    '  slug, name, description, product_slug, image, ingredients,'
  )
  sqlStatements.push(
    '  instructions, difficulty, prep_time, taste, category,'
  )
  sqlStatements.push('  flavor_notes, occasion_note')
  sqlStatements.push(') VALUES\n')

  const values: string[] = []

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i]

    // Parse ingredients
    const parsedIngredients = recipe.ingredients.map(parseIngredient)

    // Map product slug
    const productSlug = mapProductSlug(
      recipe.baseSpirit,
      recipe.slug,
      recipe.name
    )

    // Generate placeholder text
    const flavorNotes = generateFlavorNotes(recipe.taste, recipe.category)
    const occasionNote = generateOccasionNote(recipe.category)

    // Build value row
    const valueParts = [
      `'${escapeSqlString(recipe.slug)}'`,
      `'${escapeSqlString(recipe.name)}'`,
      `'${escapeSqlString(recipe.description)}'`,
      `'${escapeSqlString(productSlug)}'`,
      `'${escapeSqlString(recipe.image)}'`,
      jsonToPgJsonb(parsedIngredients),
      jsonToPgJsonb(recipe.instructions),
      `'${escapeSqlString(recipe.difficulty)}'`,
      `'${escapeSqlString(recipe.prepTime)}'`,
      `'${escapeSqlString(recipe.taste)}'`,
      `'${escapeSqlString(recipe.category)}'`,
      `'${escapeSqlString(flavorNotes)}'`,
      `'${escapeSqlString(occasionNote)}'`,
    ]

    values.push(`  (${valueParts.join(', ')})`)
  }

  sqlStatements.push(values.join(',\n'))
  sqlStatements.push('ON CONFLICT (slug) DO UPDATE SET')
  sqlStatements.push('  name = EXCLUDED.name,')
  sqlStatements.push('  description = EXCLUDED.description,')
  sqlStatements.push('  product_slug = EXCLUDED.product_slug,')
  sqlStatements.push('  image = EXCLUDED.image,')
  sqlStatements.push('  ingredients = EXCLUDED.ingredients,')
  sqlStatements.push('  instructions = EXCLUDED.instructions,')
  sqlStatements.push('  difficulty = EXCLUDED.difficulty,')
  sqlStatements.push('  prep_time = EXCLUDED.prep_time,')
  sqlStatements.push('  taste = EXCLUDED.taste,')
  sqlStatements.push('  category = EXCLUDED.category,')
  sqlStatements.push('  flavor_notes = EXCLUDED.flavor_notes,')
  sqlStatements.push('  occasion_note = EXCLUDED.occasion_note;')

  const sqlOutput = sqlStatements.join('\n')

  // Write to file
  const outputPath = path.join(__dirname, '../supabase/migrations/seed-recipes.sql')
  fs.writeFileSync(outputPath, sqlOutput, 'utf-8')

  console.log(`✅ Successfully migrated ${recipes.length} recipes`)
  console.log(`📄 SQL file written to: ${outputPath}\n`)
  
  // Preview first recipe
  if (recipes.length > 0) {
    const firstRecipe = recipes[0]
    const firstParsed = firstRecipe.ingredients.map(parseIngredient)
    console.log('Preview of first recipe:')
    console.log('---')
    console.log(`Slug: ${firstRecipe.slug}`)
    console.log(`Product: ${mapProductSlug(firstRecipe.baseSpirit, firstRecipe.slug, firstRecipe.name)}`)
    console.log(`Ingredients (first 2):`)
    console.log(JSON.stringify(firstParsed.slice(0, 2), null, 2))
  }
}

// Run migration
migrateRecipes()

