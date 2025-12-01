export type Testimonial = {
  id: string
  productSlug: string
  rating: number
  quote: string
  author: string
  date?: string
}

export const testimonials: Testimonial[] = [
  // Ponce de Leon Rum testimonials
  {
    id: '1',
    productSlug: 'ponce-de-leon-rum',
    rating: 5,
    quote: 'Absolutely exceptional rum. The depth of flavor is unmatched. A true masterpiece.',
    author: 'Michael R.',
    date: '2024-01-15',
  },
  {
    id: '2',
    productSlug: 'ponce-de-leon-rum',
    rating: 5,
    quote: 'Smooth, complex, and perfectly balanced. This has become my go-to premium rum.',
    author: 'Sarah L.',
    date: '2024-02-03',
  },
  {
    id: '3',
    productSlug: 'ponce-de-leon-rum',
    rating: 5,
    quote: 'The aging process really shows. Rich, warm, and incredibly smooth. Worth every penny.',
    author: 'David K.',
    date: '2024-02-20',
  },
  {
    id: '4',
    productSlug: 'ponce-de-leon-rum',
    rating: 5,
    quote: 'Best rum I\'ve ever tasted. The tropical fruit notes are incredible.',
    author: 'Jennifer M.',
    date: '2024-03-10',
  },
  {
    id: '5',
    productSlug: 'ponce-de-leon-rum',
    rating: 4,
    quote: 'Excellent quality rum with a unique Florida character. Highly recommend.',
    author: 'Robert T.',
    date: '2024-03-25',
  },
  // Florida Bourbon testimonials
  {
    id: '6',
    productSlug: 'florida-bourbon',
    rating: 5,
    quote: 'Bold and spicy, exactly what I look for in a bourbon. The Florida heat really comes through.',
    author: 'James W.',
    date: '2024-01-22',
  },
  {
    id: '7',
    productSlug: 'florida-bourbon',
    rating: 5,
    quote: 'Incredible depth and complexity. The caramel finish is perfection.',
    author: 'Patricia H.',
    date: '2024-02-08',
  },
  {
    id: '8',
    productSlug: 'florida-bourbon',
    rating: 5,
    quote: 'A bourbon that stands out from the crowd. The small batch quality is evident.',
    author: 'Thomas C.',
    date: '2024-02-28',
  },
  {
    id: '9',
    productSlug: 'florida-bourbon',
    rating: 4,
    quote: 'Strong and flavorful. Perfect for sipping neat or in cocktails.',
    author: 'Lisa B.',
    date: '2024-03-15',
  },
  {
    id: '10',
    productSlug: 'florida-bourbon',
    rating: 5,
    quote: 'The best bourbon I\'ve had this year. Complex and smooth.',
    author: 'Mark D.',
    date: '2024-04-01',
  },
  // Paan Liqueur testimonials
  {
    id: '11',
    productSlug: 'paan-liqueur',
    rating: 5,
    quote: 'Unique and exotic! The betel leaf flavor is authentic and refreshing.',
    author: 'Priya S.',
    date: '2024-01-18',
  },
  {
    id: '12',
    productSlug: 'paan-liqueur',
    rating: 5,
    quote: 'A beautiful tribute to heritage. Sweet, aromatic, and unlike anything else.',
    author: 'Raj K.',
    date: '2024-02-05',
  },
  {
    id: '13',
    productSlug: 'paan-liqueur',
    rating: 4,
    quote: 'Interesting flavor profile. Great for cocktails or sipping.',
    author: 'Emily F.',
    date: '2024-02-22',
  },
  {
    id: '14',
    productSlug: 'paan-liqueur',
    rating: 5,
    quote: 'The rose and mint notes are perfectly balanced. Absolutely delightful.',
    author: 'Anita R.',
    date: '2024-03-12',
  },
  {
    id: '15',
    productSlug: 'paan-liqueur',
    rating: 5,
    quote: 'Brings back memories. Authentic paan flavor in a premium liqueur.',
    author: 'Vikram N.',
    date: '2024-03-28',
  },
  // Tikaram Tequila testimonials
  {
    id: '16',
    productSlug: 'tikaram-tequila',
    rating: 5,
    quote: 'Crisp and clean, perfect for a Florida sunset. Excellent quality.',
    author: 'Carlos M.',
    date: '2024-01-25',
  },
  {
    id: '17',
    productSlug: 'tikaram-tequila',
    rating: 5,
    quote: 'The agave flavor is pure and authentic. Best tequila I\'ve tried.',
    author: 'Maria G.',
    date: '2024-02-10',
  },
  {
    id: '18',
    productSlug: 'tikaram-tequila',
    rating: 4,
    quote: 'Smooth and clean with great citrus notes. Perfect for margaritas.',
    author: 'John P.',
    date: '2024-03-01',
  },
  {
    id: '19',
    productSlug: 'tikaram-tequila',
    rating: 5,
    quote: 'Artisan quality through and through. The mineral finish is exceptional.',
    author: 'Sofia R.',
    date: '2024-03-18',
  },
  {
    id: '20',
    productSlug: 'tikaram-tequila',
    rating: 5,
    quote: 'Premium tequila that stands out. Great for sipping or mixing.',
    author: 'Diego L.',
    date: '2024-04-05',
  },
  // Tikaram Key Lime Tequila testimonials
  {
    id: '21',
    productSlug: 'tikaram-keylime-tequila',
    rating: 5,
    quote: 'Florida in a bottle! The key lime flavor is perfectly balanced.',
    author: 'Amanda K.',
    date: '2024-01-30',
  },
  {
    id: '22',
    productSlug: 'tikaram-keylime-tequila',
    rating: 5,
    quote: 'Unique and refreshing. The tart lime pairs beautifully with the agave.',
    author: 'Brian S.',
    date: '2024-02-15',
  },
  {
    id: '23',
    productSlug: 'tikaram-keylime-tequila',
    rating: 4,
    quote: 'Fun and flavorful. Great for summer cocktails and parties.',
    author: 'Nicole T.',
    date: '2024-03-05',
  },
  {
    id: '24',
    productSlug: 'tikaram-keylime-tequila',
    rating: 5,
    quote: 'A Florida classic done right. Zesty, tart, and absolutely delicious.',
    author: 'Kevin J.',
    date: '2024-03-22',
  },
  {
    id: '25',
    productSlug: 'tikaram-keylime-tequila',
    rating: 5,
    quote: 'Perfect for margaritas or sipping on the beach. Love it!',
    author: 'Rachel W.',
    date: '2024-04-08',
  },
]

export function getAllTestimonials(): Testimonial[] {
  return testimonials
}

export function getTestimonialsByProductSlug(slug: string): Testimonial[] {
  return testimonials.filter((testimonial) => testimonial.productSlug === slug)
}

