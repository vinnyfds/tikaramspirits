import type { Metadata } from 'next'
import { playfairDisplay, montserrat, lato } from '@/lib/fonts'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { AgeGateProvider } from '@/components/features/age-gate/AgeGateProvider'
import { ToastProvider } from '@/components/ui/ToastProvider'
import { PageTransitionProvider } from '@/components/layout/PageTransitionProvider'
import { PageTransition } from '@/components/layout/PageTransition'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tikaram Spirits | Luxury Craft Spirits',
  description: 'Experience the timeless flavor of hand-crafted spirits from Florida.',
  openGraph: {
    title: 'Tikaram Spirits',
    description: 'Experience the timeless flavor of hand-crafted spirits from Florida.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${montserrat.variable} ${lato.variable}`}>
      <body className="font-sans antialiased">
        <ToastProvider>
          <PageTransitionProvider>
            <PageTransition />
            <AgeGateProvider />
            <Header />
            {children}
            <Footer />
            <CookieConsent />
          </PageTransitionProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
