# GardenSuite Pricing Documentation

## What We Sell (Tiered Flat Pricing)

1. **Weight Scale** - Rs. 7,000 each (one-time, 1 year warranty)
2. **Software Tier** - Annual flat fee based on number of mobile devices
   - Nano (1-2 devices): Rs. 10,000/year
   - Small (3-5 devices): Rs. 18,000/year
   - Medium (6-10 devices): Rs. 30,000/year
   - Large (11-20 devices): Rs. 50,000/year
   - Enterprise (21+ devices): Rs. 75,000/year
   - *Includes: App, dashboard, support, updates*
3. **Training** - Rs. 1,000/day + travel from Dibrugarh

## Quick Start

1. **Read the pricing:** [PRICING_STRUCTURE.md](PRICING_STRUCTURE.md)
2. **See Client A example:** [CLIENT_A_EXAMPLE.md](CLIENT_A_EXAMPLE.md)
3. **Build custom quotes:** [CUSTOM_PLAN_FRAMEWORK.md](CUSTOM_PLAN_FRAMEWORK.md)
4. **Know the competitor:** [COMPETITOR_APPLIED_DATA_LOGIX.md](COMPETITOR_APPLIED_DATA_LOGIX.md)
5. **Quick reference:** [SALES_BATTLECARD.md](SALES_BATTLECARD.md)
6. **Generate PDF offers:** Use the script below

## Generate a Pricing Offer PDF

### Option 1: Interactive Mode (Recommended)

```bash
cd /Users/g2m7/projects/biz/gardensuite.in
python3 scripts/generate_pricing_offer.py --interactive
```

### Option 2: From Config File

```bash
python3 scripts/generate_pricing_offer.py --config scripts/pricing_templates/client_a_example.json
```

### Option 3: Generate Client A Demo

```bash
python3 scripts/generate_pricing_offer.py --example
```

## Prerequisites

```bash
pip3 install weasyprint jinja2
```

## Output Location

All PDFs saved to `generated_offers/` as:
`GardenSuite_Offer_{ClientName}_{YYYYMMDD}.pdf`

## Files

| File | Purpose |
|------|---------|
| PRICING_STRUCTURE.md | Real pricing. 4 items only. Competitive comparison included. |
| CLIENT_A_EXAMPLE.md | 15 scales + 12 devices. Rs. 1,91,880 Year 1. Competitor comparison. |
| CUSTOM_PLAN_FRAMEWORK.md | Quick worksheet to price any deal. Competitive talking points. |
| COMPETITOR_APPLIED_DATA_LOGIX.md | Full intel on Applied Data Logix Easyweigh. Estimated pricing. |
| SALES_BATTLECARD.md | One-page quick reference for sales conversations. |
| ../scripts/generate_pricing_offer.py | PDF generator script |
| ../scripts/pricing_templates/proposal_template.html | PDF template |
| ../scripts/pricing_templates/client_a_example.json | Sample config |

## Need Help?

Contact: Sarbani Associates, Bagdogra, Siliguri
