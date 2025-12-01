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

interface VerifyEmailProps {
  verificationUrl: string
}

export const VerifyEmail = ({ verificationUrl }: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email to unlock your Tikaram Coupon</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Verify your email to unlock your Tikaram Coupon</Heading>
          
          <Text style={bodyText}>
            Click the button below to verify your email address and receive your exclusive first-bottle discount.
          </Text>
          
          <Section style={buttonSection}>
            <Button style={button} href={verificationUrl}>
              Verify Email
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

export default VerifyEmail

