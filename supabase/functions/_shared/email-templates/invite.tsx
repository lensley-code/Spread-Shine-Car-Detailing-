/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteName,
  siteUrl,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You've been invited to join {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>You've been invited</Heading>
        <Text style={text}>
          You've been invited to join{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>
          . Click the button below to accept the invitation and create your
          account.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Accept Invitation
        </Button>
        <Text style={footer}>
          If you weren't expecting this invitation, you can safely ignore this
          email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '40px 32px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '28px', fontWeight: 'normal' as const, color: '#1a1f3a', margin: '0 0 24px', letterSpacing: '0.02em' }
const text = { fontSize: '15px', color: '#4a4a5e', lineHeight: '1.7', margin: '0 0 24px' }
const link = { color: '#c9a961', textDecoration: 'underline' }
const button = { backgroundColor: '#c9a961', color: '#1a1f3a', fontSize: '14px', borderRadius: '4px', padding: '14px 32px', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: 'bold' as const, display: 'inline-block' }
const footer = { fontSize: '13px', color: '#8a8aa0', margin: '36px 0 0', fontStyle: 'italic' as const }
