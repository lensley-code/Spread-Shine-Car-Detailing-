import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  topic?: string
  message?: string
  submittedAt?: string
}

const ContactNotificationEmail = ({ name, email, topic, message, submittedAt }: Props) => (
  <Html lang="en">
    <Head />
    <Preview>New contact form submission from {name || 'visitor'}</Preview>
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Georgia, serif', margin: 0, padding: '24px' }}>
      <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '32px', border: '1px solid #e8e3d8', borderRadius: '8px' }}>
        <Heading style={{ color: '#1a1f3a', fontSize: '22px', margin: '0 0 8px' }}>New Contact Form Submission</Heading>
        <Text style={{ color: '#888', fontSize: '13px', margin: '0 0 24px' }}>{submittedAt}</Text>
        <Hr style={{ borderColor: '#c9a961', margin: '0 0 24px' }} />
        <Section>
          <Text style={{ margin: '0 0 4px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#c9a961' }}>From</Text>
          <Text style={{ margin: '0 0 16px', color: '#1a1f3a', fontSize: '15px' }}>{name} &lt;{email}&gt;</Text>

          <Text style={{ margin: '0 0 4px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#c9a961' }}>Topic</Text>
          <Text style={{ margin: '0 0 16px', color: '#1a1f3a', fontSize: '15px' }}>{topic}</Text>

          <Text style={{ margin: '0 0 4px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#c9a961' }}>Message</Text>
          <Text style={{ margin: 0, color: '#333', fontSize: '15px', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{message}</Text>
        </Section>
        <Hr style={{ borderColor: '#e8e3d8', margin: '24px 0 16px' }} />
        <Text style={{ color: '#888', fontSize: '12px', margin: 0 }}>Reply directly to this email to respond to {name}.</Text>
      </Container>
    </Body>
  </Html>
)

export const template: TemplateEntry = {
  component: ContactNotificationEmail,
  to: 'contact@luz-astrology.com',
  subject: (data) => `New contact: ${data.topic || 'message'} — ${data.name || 'visitor'}`,
  displayName: 'Contact form notification (admin)',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    topic: 'Question before booking',
    message: 'Hello! I had a question…',
    submittedAt: new Date().toISOString(),
  },
}