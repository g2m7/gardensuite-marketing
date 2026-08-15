# DEPRECATED - Retired Landing Page Integration

> [!CAUTION]
> Status: DEPRECATED. The attendance hub intentionally removed `LeadCapture.svelte` from its current composition. Do not describe that removal as a blocker or restore this funnel without current strategy approval. Read `marketing/outreach/CURRENT_STRATEGY.md`.

## Lead Capture Flow

### User Journey

```
User visits /products/attendance
    |
    v
Scrolls through product info
    |
    v
Sees "Get the attendance + scale brochure" section
    |
    v
Fills form: name, email, phone (optional), garden (optional)
    |
    v
Clicks "Download free brochure"
    |
    v
POST /api/subscribe
    |
    v
Success: "Thank you!" + brochure link opens
    |
    v
Brevo automation starts
```

## Components

### LeadCapture.svelte

**Location**: `gs_landing/src/lib/components/LeadCapture.svelte`

**Props**:

- `title` - Form heading (default: "Get the GardenSuite brochure")
- `subtitle` - Description text
- `buttonText` - CTA button label
- `tag` - Brevo tag for segmentation
- `source` - UTM source tracking
- `compact` - Show only name + email fields

**Usage**:

```svelte
<LeadCapture
	title="Get the attendance + scale brochure"
	subtitle="See exact pricing and features..."
	buttonText="Download free brochure"
	tag="attendance-brochure"
	source="attendance-page"
/>
```

### API Endpoint

**Location**: `gs_landing/src/routes/api/subscribe/+server.ts`

**Method**: POST

**Request Body**:

```json
{
	"email": "manager@teagarden.com",
	"name": "Mr. Sharma",
	"phone": "+91-9876543210",
	"garden": "Rheabari T.E.",
	"tag": "attendance-brochure",
	"source": "attendance-page"
}
```

**Response**:

```json
{
	"message": "Thank you! We will send you updates soon."
}
```

**Error Response**:

```json
{
	"message": "Please enter a valid email address."
}
```

### Brevo Integration

The API:

1. Validates email format
2. Calls Brevo `/v3/contacts` API
3. Creates/updates contact with attributes
4. Records consent, source, campaign, and GardenSuite labels as contact attributes
5. Adds the contact to list `17` only when explicit email consent is recorded

### Environment Variables

Required in `.env`:

```
BREVO_API_KEY=your-api-key
BREVO_LIST_ID=17
BREVO_SENDER_EMAIL=sarbani@sarbaa.com
BREVO_SENDER_NAME="Sarbani Associates"
```

## Current Placement

The LeadCapture component is placed on:

### 1. /products/attendance

**Position**: Between the rollout section and final CTA section  
**Title**: "Get the attendance + scale brochure"  
**Tag**: `attendance-brochure`  
**Source**: `attendance-page`

### 2. Homepage (planned)

**Position**: After hero section or in footer  
**Tag**: `homepage-lead`  
**Source**: `homepage`

### 3. Legacy WhatsApp Share URL

`/w/face-weight-499` is kept only as a compatibility redirect. It no longer advertises Rs. 499. New WhatsApp messages should use the attendance product page only after the contact shows interest.

## Form Fields

### Standard Fields (non-compact)

- **Name** (required) - First name or full name
- **Email** (required) - Must be valid format
- **Phone** (optional) - For direct follow-up
- **Garden** (optional) - Tea estate name

### Compact Fields

- **Name** (required)
- **Email** (required)

## Styling

- Background: `#f0f7f0` (light green)
- Border: `#d2e8d2`
- Button: `#234b1d` (dark green)
- Border radius: 16px
- Font: System sans-serif (Inter on landing page)
- Responsive: Full width on mobile, max-width 520px on desktop

## Success State

After submission:

1. Form disappears
2. Success message appears with checkmark icon
3. "Open brochure now" button links to PDF
4. Brochure opens in new tab

## Error Handling

- Invalid email: Red border + error message
- API failure: Friendly error + WhatsApp fallback
- Duplicate email: "Already subscribed" message

## Tracking

All form submissions are tagged for segmentation:

- Tag: `brochure-download`, `attendance-brochure`, etc.
- Source: `attendance-page`, `homepage`, etc.
- UTM params on all email links

## Brochure Links

Current brochures available:

- `/sales_flyer/attendance-brochure.html` - Attendance + Scale
- `/sales_flyer/full-brochure.html` - Complete GardenSuite

**TODO**: Convert HTML brochures to PDF for download

## Future Enhancements

- [ ] Add PDF generation for brochure download
- [ ] Add popup lead capture on homepage
- [ ] A/B test form placement
- [ ] Add lead scoring in Brevo
- [ ] Create separate landing page for WhatsApp traffic
- [ ] Add phone call CTA for phone-captured leads
