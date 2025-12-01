import { Playfair_Display, Montserrat, Lato } from 'next/font/google'

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600', '700'],
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600'],
})

export const lato = Lato({
  subsets: ['latin'],
  variable: '--font-accent',
  weight: ['400'],
})

