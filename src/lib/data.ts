export type Product = {
  slug: string
  category: 'Rum' | 'Bourbon' | 'Tequila' | 'Liqueur'
  headline: string
  subhead: string
  description: string
  tastingNotes: {
    nose: string
    palate?: string
    finish?: string
    sweet?: number
    oak?: number
    spice?: number
    fruit?: number
  }
  price: string
  image: string
  imagePng?: string
  process?: string
  ingredients?: string
}

export const products: Product[] = [
  {
    slug: 'ponce-de-leon-rum',
    category: 'Rum',
    headline: 'Ponce de Leon Rum',
    subhead: 'Florida Caribbean Blend • 40% ABV || 80 Proof',
    description:
      'A bright and vibrant spirit crafted from high-quality Barbados molasses. Unaged and bottled immediately, it preserves the fresh, pure flavors of the cane, delivering a clean, complex, and lively profile.',
    tastingNotes: {
      nose: ' Smooth, mellow, and slightly sweet with undertones of tropical fruit and warm molasses.',
      palate: 'Dried apricot, dark chocolate, warm spice.',
      finish: 'Long, warm, and slightly smoky.',
      sweet: 6,
      oak: 8,
      spice: 7,
      fruit: 5,
    },
    price: '$45.00',
    image: '/assets/products/bottle-ponce-rum.jpg',
    imagePng: '/assets/products/bottle-ponce-rum.png',
    process:
      'Our Ponce de Leon Rum begins with premium sugarcane molasses sourced from high-quality Barbados suppliers. After fermentation, the spirit is distilled in our copper pot stills, then bottled immediately to preserve the fresh, pure flavors of the cane. This unaged approach captures the vibrant, clean character of the molasses, delivering a spirit that is bright, complex, and lively.',
    ingredients:
      'Premium sugarcane molasses from Barbados, Florida spring water, natural yeast cultures. No artificial flavors or colors added.',
  },
  {
    slug: 'florida-bourbon',
    category: 'Bourbon',
    headline: 'Florida Bourbon',
    subhead: 'Small Batch • 55% ABV || 110 Proof',
    description:
      'Bold as the Florida heat. Aged in charred American oak, delivering a rich, spicy profile with a smooth caramel finish.',
    tastingNotes: {
      nose: 'Caramel & Vanilla',
      palate: 'Spicy Rye & Oak',
      finish: 'Long & Warm',
      sweet: 5,
      oak: 8,
      spice: 7,
      fruit: 3,
    },
    price: '$65.00',
    image: '/assets/products/bottle-florida-bourbon.jpg',
    imagePng: '/assets/products/bottle-florida-bourbon.png',
    process:
      'Our Florida Bourbon is crafted in small batches using a traditional mash bill of corn, rye, and malted barley. The spirit is distilled in our copper pot stills, then aged in heavily charred American Oak barrels. The intense Florida heat accelerates the interaction between wood and spirit, creating a bold, complex bourbon with deep caramel and vanilla notes in a fraction of the time required in cooler climates.',
    ingredients:
      'Corn, rye, malted barley, Florida spring water, natural yeast cultures. No artificial flavors or colors added.',
  },
  {
    slug: 'paan-liqueur',
    category: 'Liqueur',
    headline: 'Tikaram Paan Liqueur',
    subhead: 'Exotic Blend • 15% ABV || 30 Proof',
    description:
      'A unique tribute to heritage. Crafted using a proprietary extraction method of fresh fennel seeds and aromatic gulkand, this exotic liqueur offers an unforgettable journey of flavor, bridging cultures and tradition.',
    tastingNotes: {
      nose: 'Fresh Betel Leaf',
      palate: 'Sweet Rose & Mint',
      finish: 'Refreshing & Cool',
      sweet: 8,
      oak: 2,
      spice: 3,
      fruit: 6,
    },
    price: '$35.00',
    image: '/assets/products/bottle-paan-liqueur.jpg',
    imagePng: '/assets/products/bottle-paan-liqueur.png',
    process:
      'Our Paan Liqueur begins with a premium neutral spirit base, which we carefully infuse with fresh betel leaves, aromatic rose petals, and fennel seeds. The infusion process takes place over several weeks, allowing the botanicals to fully release their essential oils and flavors. The result is then sweetened with natural cane sugar and filtered to achieve a smooth, silky texture that honors the traditional paan experience.',
    ingredients:
      'Premium neutral spirit, fresh betel leaves, rose petals, fennel seeds, natural cane sugar, Florida spring water. No artificial flavors or colors added.',
  },
  {
    slug: 'tikaram-tequila',
    category: 'Tequila',
    headline: 'Tikaram Tequila',
    subhead: '100% De Agave • 40% ABV || 80 Proof',
    description:
      'Artisan inspired. Harvested from the highlands and distilled for purity. Crisp, clean, and perfect for a Florida sunset.',
    tastingNotes: {
      nose: 'Cooked Agave',
      palate: 'Citrus & Pepper',
      finish: 'Clean Mineral',
      sweet: 3,
      oak: 2,
      spice: 5,
      fruit: 6,
    },
    price: '$50.00',
    image: '/assets/products/bottle-tequila.jpg',
    imagePng: '/assets/products/bottle-tequila.png',
    process:
      'Our Tikaram Tequila is crafted from 100% Blue Weber agave harvested from the highlands of Jalisco, Mexico. The piñas are slow-roasted in traditional brick ovens to develop complex, earthy flavors. After crushing and fermentation, the juice is double-distilled in copper pot stills to achieve exceptional purity and clarity. The result is a crisp, clean tequila that captures the essence of the agave plant.',
    ingredients:
      '100% Blue Weber agave, spring water. No additives or artificial flavors.',
  },
  {
    slug: 'tikaram-keylime-tequila',
    category: 'Tequila',
    headline: 'Tikaram Key Lime Tequila',
    subhead: 'Key Lime Infused • 35% ABV || 70 Proof',
    description:
      'A Florida classic meets Mexican tradition. Smooth agave tequila infused with the tart, zesty kick of authentic Florida Key Limes.',
    tastingNotes: {
      nose: 'Zesty Lime & Salt',
      palate: 'Citrus Punch & Agave',
      finish: 'Tart & Sweet',
      sweet: 6,
      oak: 1,
      spice: 2,
      fruit: 9,
    },
    price: '$40.00',
    image: '/assets/products/bottle-keylime.jpg',
    imagePng: '/assets/products/bottle-keylime.png',
    process:
      'Our Key Lime Tequila starts with our premium 100% Blue Weber agave tequila base. We then infuse it with fresh Florida Key Limes, hand-zested and juiced to capture their distinctive tart, aromatic character. The infusion process is carefully controlled to balance the bright citrus notes with the smooth agave foundation, creating a uniquely Floridian expression of tequila.',
    ingredients:
      '100% Blue Weber agave tequila, fresh Florida Key Limes, natural lime zest. No artificial flavors or colors added.',
  },
]

export const categories = ['All', 'Rum', 'Bourbon', 'Tequila', 'Liqueur'] as const

export type Category = (typeof categories)[number]

export function getAllProducts(): Product[] {
  return products
}

export function getProductsByCategory(category: Category): Product[] {
  if (category === 'All') {
    return products
  }
  return products.filter((product) => product.category === category)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

