import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Img, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Luz Astrology'
const BOOK_COVER_URL =
  'https://jpjqndyqidyhitwjutaq.supabase.co/storage/v1/object/public/email-assets/spiritual-astrology-book-cover.jpg'

interface GuideDeliveryProps {
  name?: string
  guideUrl?: string
  bookUrl?: string
}

const GuideDeliveryEmail = ({
  name,
  guideUrl = 'https://canva.link/ivpe0g9jp7km58w',
  bookUrl = 'https://luz-astrology.com/#services',
}: GuideDeliveryProps) => {
  const firstName = name ? name.split(' ')[0] : null
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <style>{`
          @media (hover: hover) and (pointer: fine) {
            .btn-primary:hover {
              background-color: #b8985a !important;
              transform: translateY(-1px);
              box-shadow: 0 6px 18px rgba(201,169,97,0.35) !important;
            }
            .btn-secondary:hover {
              color: #c9a961 !important;
              border-color: #1a1f3a !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .book-cover { width: 280px !important; height: auto !important; }
            .btn-primary, .btn-secondary { width: 100% !important; box-sizing: border-box; }
          }
        `}</style>
      </Head>
      <Preview>Your free Spiritual Guide from {SITE_NAME}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={{ textAlign: 'center' }}>
            <Text style={eyebrow}>FREE SPIRITUAL GUIDE</Text>
            <Img
              src={BOOK_COVER_URL}
              alt="Spiritual Astrology & God's Voice and Purposes in the Stars"
              width="320"
              className="book-cover"
              style={bookCover}
            />
          </Section>

          <Heading style={h1}>
            {firstName ? `Welcome, ${firstName}` : 'Welcome'}
          </Heading>

          <Text style={text}>
            Thank you for stepping onto this path with {SITE_NAME}.
          </Text>
          <Text style={text}>
            Your free spiritual guide is ready — a thoughtful introduction to
            spiritual astrology, biblical reflection, and discovering meaning
            written in the heavens.
          </Text>

          <Section style={primaryButtonSection}>
            <Button href={guideUrl} style={primaryButton} className="btn-primary">
              Open Your Guide
            </Button>
          </Section>

          <Hr style={divider} />

          <Section style={secondaryButtonSection}>
            <Text style={secondaryLabel}>
              Ready for clarity tailored to your unique chart?
            </Text>
            <Button href={bookUrl} style={secondaryButton} className="btn-secondary">
              Book a Reading
            </Button>
          </Section>

          <Text style={footer}>
            With light,<br />
            The {SITE_NAME} Team ✨
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: GuideDeliveryEmail,
  subject: 'Your Spiritual Guide from Luz Astrology ✨',
  displayName: 'Guide delivery',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Georgia, "Times New Roman", serif',
}
const container = {
  padding: '40px 32px',
  maxWidth: '560px',
  margin: '0 auto',
  textAlign: 'center' as const,
}
const eyebrow = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '11px',
  letterSpacing: '0.25em',
  color: '#c9a961',
  textTransform: 'uppercase' as const,
  margin: '0 0 20px',
  fontWeight: 'bold' as const,
}
const bookCover = {
  display: 'block',
  margin: '0 auto 32px',
  borderRadius: '8px',
  boxShadow: '0 12px 32px rgba(26,31,58,0.18)',
  maxWidth: '100%',
  height: 'auto',
}
const h1 = {
  fontSize: '28px',
  fontWeight: 'normal' as const,
  color: '#1a1f3a',
  margin: '8px 0 20px',
  letterSpacing: '0.02em',
  textAlign: 'center' as const,
}
const text = {
  fontSize: '15px',
  color: '#4a4a5e',
  lineHeight: '1.7',
  margin: '0 0 16px',
  textAlign: 'center' as const,
}
const primaryButtonSection = { margin: '32px 0 8px', textAlign: 'center' as const }
const primaryButton = {
  backgroundColor: '#c9a961',
  color: '#1a1f3a',
  padding: '18px 44px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: '15px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  fontWeight: 'bold' as const,
  display: 'inline-block',
  boxShadow: '0 4px 14px rgba(201,169,97,0.25)',
  transition: 'all 0.2s ease',
}
const divider = {
  border: 'none',
  borderTop: '1px solid #e8e2d0',
  margin: '40px auto 28px',
  width: '60%',
}
const secondaryButtonSection = { margin: '0 0 8px', textAlign: 'center' as const }
const secondaryLabel = {
  fontSize: '13px',
  color: '#8a8aa0',
  margin: '0 0 14px',
  fontStyle: 'italic' as const,
  textAlign: 'center' as const,
}
const secondaryButton = {
  backgroundColor: 'transparent',
  color: '#1a1f3a',
  padding: '12px 28px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: '12px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  border: '1px solid #c9a961',
  display: 'inline-block',
  transition: 'all 0.2s ease',
}
const footer = {
  fontSize: '13px',
  color: '#8a8aa0',
  margin: '40px 0 0',
  fontStyle: 'italic' as const,
  textAlign: 'center' as const,
  lineHeight: '1.7',
}
