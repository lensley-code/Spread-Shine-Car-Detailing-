import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  fullName?: string
  phone?: string
  email?: string
  serviceNeeded?: string
  propertyAddress?: string
  projectDetails?: string
  submittedAt?: string
}

const Row = ({ label, value }: { label: string; value?: string }) => (
  <>
    <Text style={{ margin: '0 0 4px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#B8860B' }}>{label}</Text>
    <Text style={{ margin: '0 0 16px', color: '#1F2937', fontSize: '15px', whiteSpace: 'pre-wrap' }}>{value || '—'}</Text>
  </>
)

const QuoteRequestEmail = ({ fullName, phone, email, serviceNeeded, propertyAddress, projectDetails, submittedAt }: Props) => (
  <Html lang="en">
    <Head />
    <Preview>New quote request from {fullName || 'a visitor'}</Preview>
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', margin: 0, padding: '24px' }}>
      <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '32px', border: '1px solid #E7E7E7', borderRadius: '12px' }}>
        <Heading style={{ color: '#1F2937', fontSize: '22px', margin: '0 0 8px' }}>New Quote Request — SoSpreadShine</Heading>
        <Text style={{ color: '#6B7280', fontSize: '13px', margin: '0 0 20px' }}>A new quote request just came in.</Text>
        <Hr style={{ borderColor: '#E7E7E7', margin: '0 0 24px' }} />
        <Section>
          <Row label="Name" value={fullName} />
          <Row label="Phone" value={phone} />
          <Row label="Email" value={email} />
          <Row label="Service Needed" value={serviceNeeded} />
          <Row label="Property Address" value={propertyAddress} />
          <Row label="Project Details" value={projectDetails} />
          <Row label="Submitted At" value={submittedAt} />
        </Section>
        <Hr style={{ borderColor: '#E7E7E7', margin: '24px 0 16px' }} />
        <Text style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>
          Reply directly to this email{email ? ` to respond to ${fullName || 'the customer'}` : ''} or call {phone || 'the customer'} back.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template: TemplateEntry = {
  component: QuoteRequestEmail,
  to: 'lensley.stfelix@gmail.com',
  subject: 'New Quote Request - SoSpreadShine',
  displayName: 'Quote request notification (owner)',
  previewData: {
    fullName: 'Jane Doe',
    phone: '(954) 555-0123',
    email: 'jane@example.com',
    serviceNeeded: 'Home Exterior Cleaning',
    propertyAddress: '123 Ocean Dr, Miami, FL',
    projectDetails: 'Two-story house, needs full exterior wash.',
    submittedAt: new Date().toISOString(),
  },
}
