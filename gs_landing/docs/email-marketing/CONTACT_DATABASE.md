# Contact Database

## Overview

We maintain a database of tea estate contacts for email marketing. Contacts come from multiple sources and are uploaded to Brevo for automation.

## Source Files

All source files are located at: `/Users/g2m7/projects/scripts/extract_garden/data/`

### 1. tea_estate_contacts_v2.xlsx (222 rows)

**Best source** - most complete data.

Columns:

- Tea Estate (name)
- GM Phone
- Emails
- GM Address
- GM Website
- Alternative Numbers
- Maps URL
- Location/District

### 2. tea_estate_contacts.xlsx (173 rows)

Good phone coverage.

Columns:

- Tea Estate (name)
- GM Phone
- GM Address
- Alternative Numbers
- Location

### 3. Tea Estates.xlsx (174 rows)

Names and locations only.

Columns:

- Name of DPEs (Tea Estates)
- Garden/Factory Area
- Location
- District

### 4. Tea Estates number required.xlsx (84 rows)

Estate names + phone numbers.

Columns:

- Tea Estate Name
- Phone Number
- Location

### 5. email assam.dooars teaestate.xlsx (149 rows)

Email-only list.

Columns:

- Email addresses

### 6. Grower_Details_Report_TINSUKIA_pdf823(1).xlsx (106 rows)

Government data. Names and locations.

Columns:

- Grower Name
- Garden Name
- State
- District
- Registration Details

### 7. test_gardens.csv (8 rows)

Test data.

Columns:

- Estate Name
- Phone Number
- Manager Name
- Location

### 8. test_leads.csv (0 rows)

Empty file. Reserved for future exports.

## Data Quality Notes

- **Best for email**: `email assam.dooars teaestate.xlsx` and `tea_estate_contacts_v2.xlsx`
- **Best for phone**: `tea_estate_contacts_v2.xlsx` and `tea_estate_contacts.xlsx`
- **Duplicates expected** across files - Brevo handles duplicates automatically
- **Missing data**: Not all contacts have emails. Some are phone-only.
- **Regions covered**: Assam, Dooars, Terai, Darjeeling, Tinsukia, Jalpaiguri

## Upload Process

### Manual Upload (Recommended)

1. Open the best Excel file (`tea_estate_contacts_v2.xlsx`)
2. Export as CSV with columns: email, name, phone, garden, location
3. Go to Brevo Dashboard > Contacts > Import Contacts
4. Upload CSV and map fields:
   - email -> EMAIL
   - name -> FIRSTNAME
   - phone -> PHONE
   - garden -> GARDEN (custom attribute)
   - location -> LOCATION (custom attribute)
5. Tag all imported contacts: `["gardensuite", "import-2026", "tea-estate"]`
6. Add to list: "Tea Garden Leads"

### Via API (Advanced)

Use the `/api/subscribe` endpoint or Brevo API directly. See `../scripts/upload_contacts.py` (create if needed).

## Brevo List Structure

| List Name          | Purpose                  |
| ------------------ | ------------------------ |
| Tea Garden Leads   | All imported contacts    |
| Brochure Downloads | Website form submissions |
| Demo Booked        | People who booked a demo |
| Customers          | Installed gardens        |

## Tags

| Tag                 | Meaning                           |
| ------------------- | --------------------------------- |
| `gardensuite`       | All GardenSuite contacts          |
| `brochure-download` | Downloaded brochure from website  |
| `attendance-page`   | Came from attendance product page |
| `import-2026`       | Bulk imported in 2026             |
| `tea-estate`        | Tea estate contact                |
| `demo-booked`       | Booked a demo                     |
| `customer`          | Active customer                   |

## Data Retention

- Keep source Excel files as backup
- Brevo is the primary database for email marketing
- Update monthly with new leads
- Remove bounced emails quarterly

## Privacy

- All contacts are B2B (tea estate businesses)
- Include unsubscribe link in all emails
- Do NOT share contact data outside Sarbani Associates
- Comply with Indian spam regulations
