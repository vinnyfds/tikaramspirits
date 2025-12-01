import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
  couponCode?: string
}

export const WelcomeEmail = ({ couponCode = 'TIKARAM-FIRST-2025' }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Tikaram Spirits - Your exclusive discount awaits</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Welcome to Tikaram Spirits</Heading>
          
          <Text style={bodyText}>
            Here is your exclusive first-bottle discount.
          </Text>
          
          <Section style={couponSection}>
            <Text style={couponCode}>{couponCode}</Text>
          </Section>
          
          <Section style={buttonSection}>
            <Button style={button} href="https://tikaramspirits.com/store-locator">
              Find a Store
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#F8F8F8',
  fontFamily: 'Montserrat, sans-serif',
}

const container = {
  backgroundColor: '#FFFFFF',
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
}

const heading = {
  color: '#004225',
  fontSize: '32px',
  fontWeight: '700',
  fontFamily: 'Playfair Display, serif',
  marginBottom: '24px',
  textAlign: 'center' as const,
}

const bodyText = {
  color: '#36454F',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '32px',
  textAlign: 'center' as const,
}

const couponSection = {
  backgroundColor: '#004225',
  borderRadius: '4px',
  padding: '24px',
  marginBottom: '32px',
  textAlign: 'center' as const,
}

const couponCode = {
  color: '#D4AF37',
  fontSize: '32px',
  fontWeight: '700',
  fontFamily: 'Montserrat, sans-serif',
  letterSpacing: '0.1em',
  margin: '0',
}

const buttonSection = {
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#D4AF37',
  color: '#004225',
  fontSize: '14px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.15em',
  padding: '14px 32px',
  borderRadius: '4px',
  textDecoration: 'none',
  display: 'inline-block',
}

export default WelcomeEmail

