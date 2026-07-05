/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your verification code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirm reauthentication</Heading>
        <Text style={text}>Use the code below to confirm your identity:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Text style={footer}>
          This code will expire shortly. If you didn't request this, you can
          safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '40px 32px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '28px', fontWeight: 'normal' as const, color: '#1a1f3a', margin: '0 0 24px', letterSpacing: '0.02em' }
const text = { fontSize: '15px', color: '#4a4a5e', lineHeight: '1.7', margin: '0 0 24px' }
const codeStyle = { fontFamily: 'Courier, monospace', fontSize: '28px', fontWeight: 'bold' as const, color: '#1a1f3a', letterSpacing: '0.2em', margin: '0 0 30px' }
const footer = { fontSize: '13px', color: '#8a8aa0', margin: '36px 0 0', fontStyle: 'italic' as const }
