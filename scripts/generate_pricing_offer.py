#!/usr/bin/env python3
"""
GardenSuite Pricing Offer PDF Generator

Generates professional PDF pricing proposals for prospects.
Uses tiered flat pricing: Nano/Small/Medium/Large/Enterprise.

Usage:
    python generate_pricing_offer.py --interactive
    python generate_pricing_offer.py --config client_config.json
    python generate_pricing_offer.py --example
"""

import json
import argparse
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path

try:
    from jinja2 import Template
    from weasyprint import HTML, CSS
except ImportError:
    print("ERROR: Required packages not installed.")
    print("Run: pip3 install weasyprint jinja2")
    sys.exit(1)

# CONSTANTS - Tiered GardenSuite Pricing
SCALE_PRICE = 7000
SCALE_COST = 4500
TRAINING_PRICE_DAILY = 1000
TRAINING_COST_DAILY = 400
EXISTING_CLIENT_ADDON_PRICE = 30000  # For clients already on GardenSuite ERP

TIERS = {
    "nano": {"name": "Nano", "devices": "1-2", "price": 10000, "cost": 3000},
    "small": {"name": "Small", "devices": "3-5", "price": 18000, "cost": 7800},
    "medium": {"name": "Medium", "devices": "6-10", "price": 30000, "cost": 13800},
    "large": {"name": "Large", "devices": "11-20", "price": 50000, "cost": 25800},
    "enterprise": {"name": "Enterprise", "devices": "21+", "price": 75000, "cost": 30000},
}


def format_currency(amount):
    """Format amount as Indian Rupees."""
    return f"Rs. {amount:,.0f}"


def get_tier(num_devices):
    """Determine tier based on device count."""
    if num_devices >= 21:
        return "enterprise"
    elif num_devices >= 11:
        return "large"
    elif num_devices >= 6:
        return "medium"
    elif num_devices >= 3:
        return "small"
    else:
        return "nano"


def generate_proposal(config):
    """Generate a complete pricing proposal."""
    
    num_scales = config.get("num_scales", 1)
    num_devices = config.get("num_devices", 1)
    training_days = config.get("training_days", 1)
    travel_cost = config.get("travel_cost", 0)
    is_existing = config.get("existing_client", False)
    erp_fee = config.get("erp_annual_fee", 140000)
    
    # Determine tier
    tier_key = get_tier(num_devices)
    tier = TIERS[tier_key]
    
    # Calculate components
    scale_total = num_scales * SCALE_PRICE
    scale_cost = num_scales * SCALE_COST
    
    if is_existing:
        software_total = EXISTING_CLIENT_ADDON_PRICE
        software_cost = tier["cost"]  # Still same cost to us
    else:
        software_total = tier["price"]
        software_cost = tier["cost"]
    
    training_total = training_days * TRAINING_PRICE_DAILY
    training_cost = training_days * TRAINING_COST_DAILY
    
    # Totals
    one_time = scale_total + training_total + travel_cost
    one_time_cost = scale_cost + training_cost + travel_cost
    
    total = one_time + software_total
    total_cost = one_time_cost + software_cost
    
    gross_profit = total - total_cost
    margin_pct = (gross_profit / total * 100) if total > 0 else 0
    
    # Year 2
    if is_existing:
        year2 = erp_fee + EXISTING_CLIENT_ADDON_PRICE
    else:
        year2 = software_total
    
    # Generate dates
    today = datetime.now()
    valid_until = today + timedelta(days=30)
    
    # Prepare template data
    data = {
        "client_name": config.get("client_name", "Prospect"),
        "client_location": config.get("client_location", ""),
        "client_contact": config.get("client_contact", ""),
        "proposal_date": today.strftime("%d %B %Y"),
        "valid_until": valid_until.strftime("%d %B %Y"),
        "sales_person": config.get("sales_person", "Sarbani Associates"),
        "num_scales": num_scales,
        "num_devices": num_devices,
        "tier_name": tier["name"],
        "tier_devices": tier["devices"],
        "tier_price": tier["price"],
        "training_days": training_days,
        "travel_cost": travel_cost,
        "scale_total": scale_total,
        "software_total": software_total,
        "training_total": training_total,
        "one_time": one_time,
        "total": total,
        "year2": year2,
        "margin_pct": margin_pct,
        "format_currency": format_currency,
        "is_existing": is_existing,
        "erp_fee": erp_fee,
        "existing_addon": EXISTING_CLIENT_ADDON_PRICE,
    }
    
    # Load or create template
    template_path = Path(__file__).parent / "pricing_templates" / "proposal_template.html"
    if not template_path.exists():
        create_default_template(template_path)
    
    with open(template_path, "r", encoding="utf-8") as f:
        template = Template(f.read())
    
    html_content = template.render(**data)
    
    # Generate PDF
    output_dir = Path(__file__).parent.parent / "deliverables" / "generated" / "offers"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    safe_name = "".join(c for c in config.get("client_name", "proposal") if c.isalnum() or c in " _-").strip()
    output_path = output_dir / f"GardenSuite_Offer_{safe_name}_{today.strftime('%Y%m%d')}.pdf"
    
    HTML(string=html_content).write_pdf(str(output_path))
    
    return {
        "output_path": str(output_path),
        "data": data,
    }


def create_default_template(path):
    """Create the default HTML template for proposals."""
    path.parent.mkdir(parents=True, exist_ok=True)
    
    template = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>GardenSuite Pricing Proposal - {{ client_name }}</title>
    <style>
        @page { size: A4; margin: 2cm; }
        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #333; }
        .header { border-bottom: 3px solid #234b1d; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 24pt; font-weight: bold; color: #234b1d; }
        .tagline { font-size: 10pt; color: #666; margin-top: 5px; }
        .proposal-title { font-size: 18pt; font-weight: bold; color: #1a3a15; margin: 30px 0 10px; }
        .meta { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .meta-row { display: flex; justify-content: space-between; margin: 5px 0; }
        .meta-label { font-weight: bold; color: #555; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #234b1d; color: white; padding: 10px; text-align: left; font-size: 10pt; }
        td { padding: 10px; border-bottom: 1px solid #ddd; font-size: 10pt; }
        .text-right { text-align: right; }
        .section-title { font-size: 14pt; font-weight: bold; color: #234b1d; margin: 30px 0 15px; border-left: 4px solid #234b1d; padding-left: 10px; }
        .total-row { font-weight: bold; background: #f0f7f0; }
        .grand-total { font-size: 14pt; font-weight: bold; color: #234b1d; background: #e8f0e8; }
        .highlight { background: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .highlight-title { font-weight: bold; color: #e65100; margin-bottom: 5px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 9pt; color: #666; text-align: center; }
        .terms { font-size: 9pt; color: #555; margin-top: 30px; }
        .terms h3 { font-size: 11pt; color: #234b1d; }
        .signature { margin-top: 50px; display: flex; justify-content: space-between; }
        .signature-box { width: 45%; }
        .signature-line { border-top: 1px solid #333; margin-top: 40px; padding-top: 5px; font-size: 9pt; }
        .simple-list { margin: 10px 0; padding-left: 20px; }
        .simple-list li { margin: 5px 0; }
        .tier-badge { background: #234b1d; color: white; padding: 4px 12px; border-radius: 12px; font-size: 10pt; font-weight: 600; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">GardenSuite</div>
        <div class="tagline">Face Attendance + Smart Weighing by Sarbani Associates, Bagdogra, Siliguri</div>
    </div>

    <div class="proposal-title">Pricing Proposal</div>
    
    <div class="meta">
        <div class="meta-row">
            <span><span class="meta-label">Client:</span> {{ client_name }}</span>
            <span><span class="meta-label">Date:</span> {{ proposal_date }}</span>
        </div>
        <div class="meta-row">
            <span><span class="meta-label">Location:</span> {{ client_location }}</span>
            <span><span class="meta-label">Valid Until:</span> {{ valid_until }}</span>
        </div>
        <div class="meta-row">
            <span><span class="meta-label">Contact:</span> {{ client_contact }}</span>
            <span><span class="meta-label">Prepared By:</span> {{ sales_person }}</span>
        </div>
    </div>

    <div class="highlight">
        <div class="highlight-title">Recommended Tier: {{ tier_name }} <span class="tier-badge">{{ tier_devices }} devices</span></div>
        <ul class="simple-list">
            <li>{{ num_scales }} Wireless Smart Scale{% if num_scales > 1 %}s{% endif %} (Rs. 8,000 each, 1 year warranty)</li>
            <li>{{ num_devices }} Mobile App License{% if num_devices > 1 %}s{% endif %} (Face attendance + weight capture)</li>
            <li>Cloud Dashboard (view reports from any device) - <strong>Included</strong></li>
            <li>Phone and WhatsApp support - <strong>Included</strong></li>
            <li>Offline mode + auto sync - <strong>Included</strong></li>
        </ul>
    </div>

    <div class="section-title">Hardware</div>
    <table>
        <thead>
            <tr><th>Item</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>
        </thead>
        <tbody>
            <tr>
                <td>Wireless Smart Scale (50kg, Bluetooth)</td>
                <td>{{ num_scales }}</td>
                <td class="text-right">{{ format_currency(7000) }}</td>
                <td class="text-right">{{ format_currency(scale_total) }}</td>
            </tr>
            <tr class="total-row">
                <td colspan="3"><strong>Hardware Total</strong></td>
                <td class="text-right"><strong>{{ format_currency(scale_total) }}</strong></td>
            </tr>
        </tbody>
    </table>

    <div class="section-title">Software</div>
    <table>
        <thead>
            <tr><th>Item</th><th>Details</th><th class="text-right">Amount</th></tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>{{ tier_name }} Tier</strong></td>
                <td>Up to {{ tier_devices }} mobile devices. Dashboard included.</td>
                <td class="text-right">{{ format_currency(software_total) }}</td>
            </tr>
            <tr class="total-row">
                <td colspan="2"><strong>Software Total</strong></td>
                <td class="text-right"><strong>{{ format_currency(software_total) }}</strong></td>
            </tr>
        </tbody>
    </table>

    <div class="section-title">Services</div>
    <table>
        <thead>
            <tr><th>Item</th><th>Details</th><th class="text-right">Amount</th></tr>
        </thead>
        <tbody>
            <tr>
                <td>On-site Training</td>
                <td>{{ training_days }} day{% if training_days > 1 %}s{% endif %} at Rs. 1,000/day</td>
                <td class="text-right">{{ format_currency(training_total) }}</td>
            </tr>
            {% if travel_cost > 0 %}
            <tr>
                <td>Travel</td>
                <td>From Dibrugarh (actual cost)</td>
                <td class="text-right">{{ format_currency(travel_cost) }}</td>
            </tr>
            {% endif %}
            <tr class="total-row">
                <td colspan="2"><strong>Services Total</strong></td>
                <td class="text-right"><strong>{{ format_currency(training_total + travel_cost) }}</strong></td>
            </tr>
        </tbody>
    </table>

    <div class="section-title">Investment Summary</div>
    <table>
        <tbody>
            <tr><td>Hardware (one-time)</td><td class="text-right">{{ format_currency(scale_total) }}</td></tr>
            <tr><td>Software (annual)</td><td class="text-right">{{ format_currency(software_total) }}</td></tr>
            <tr><td>Services</td><td class="text-right">{{ format_currency(training_total + travel_cost) }}</td></tr>
            <tr class="grand-total">
                <td><strong>Total First Year Investment</strong></td>
                <td class="text-right"><strong>{{ format_currency(total) }}</strong></td>
            </tr>
        </tbody>
    </table>

    <div class="highlight">
        <div class="highlight-title">Year 2 Onwards (Software Only)</div>
        <p>Software renewal: <strong>{{ format_currency(year2) }} / year</strong></p>
        <p>Hardware already paid. Scale warranty continues if within 1 year.</p>
    </div>

    <div class="highlight">
        <div class="highlight-title">Payment Options</div>
        <p><strong>Option 1 - One-time payment:</strong> {{ format_currency(total) }} (best value)</p>
        <p><strong>Option 2 - Quarterly:</strong> Hardware + training upfront. Software in 4 payments of {{ format_currency(software_total // 4) }}.</p>
    </div>

    <div class="terms">
        <h3>Terms & Conditions</h3>
        <ol>
            <li>This proposal is valid for 30 days from the date above.</li>
            <li>Hardware: 100% advance. Scale ships after payment. 1 year warranty included.</li>
            <li>Software: Annual subscription. Starts on installation day. 1 year minimum.</li>
            <li>Cancel anytime with 30 days notice before renewal. You keep the scale.</li>
            <li>Training: Rs. 1,000/day. Travel extra from Dibrugarh (actual cost).</li>
            <li>Remote onboarding is free for Nano and Small tiers.</li>
            <li>Support: Phone and WhatsApp during business hours.</li>
            <li>You own all your data. Full export provided on request.</li>
            <li>Prices in Indian Rupees. GST extra as applicable.</li>
        </ol>
    </div>

    <div class="signature">
        <div class="signature-box">
            <div class="signature-line">For Sarbani Associates<br>Authorised Signatory</div>
        </div>
        <div class="signature-box">
            <div class="signature-line">For {{ client_name }}<br>Authorised Signatory</div>
        </div>
    </div>

    <div class="footer">
        <p>Sarbani Associates | Bagdogra, Siliguri, West Bengal | 20+ Tea Estates Served</p>
        <p>Phone: [Your Number] | WhatsApp: [Your Number]</p>
    </div>
</body>
</html>'''
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(template)


def interactive_mode():
    """Run in interactive mode."""
    print("=" * 60)
    print("GardenSuite Pricing Offer Generator")
    print("=" * 60)
    print()
    
    config = {}
    config["client_name"] = input("Client name: ").strip()
    config["client_location"] = input("Location (city/district): ").strip()
    config["client_contact"] = input("Contact person & phone: ").strip()
    config["sales_person"] = input("Your name: ").strip() or "Sarbani Associates"
    
    # Check if existing client
    existing = input("Is this an existing GardenSuite ERP client? (y/n): ").strip().lower()
    config["existing_client"] = existing in ("y", "yes")
    
    if config["existing_client"]:
        erp_input = input(f"Current ERP annual fee (default Rs. {EXISTING_CLIENT_ADDON_PRICE}): ").strip()
        config["erp_annual_fee"] = int(erp_input) if erp_input else 140000
        print(f"\n--> Existing client mode: Add-on = {format_currency(EXISTING_CLIENT_ADDON_PRICE)}/year")
    
    print("\n--- Requirements ---")
    config["num_scales"] = int(input("Number of weight scales (kamjari points): ") or "1")
    config["num_devices"] = int(input("Number of supervisor mobile devices: ") or "1")
    
    # Show tier
    tier_key = get_tier(config["num_devices"])
    tier = TIERS[tier_key]
    
    if config["existing_client"]:
        print(f"\n--> Tier: {tier['name']} (for reference). Add-on price: {format_currency(EXISTING_CLIENT_ADDON_PRICE)}/year")
    else:
        print(f"\n--> Auto-selected tier: {tier['name']} (up to {tier['devices']} devices) = {format_currency(tier['price'])}/year")
    
    config["training_days"] = int(input("Training days needed: ") or "1")
    config["travel_cost"] = int(input("Estimated travel cost from Dibrugarh: ") or "0")
    
    print("\n--- Generating Proposal ---")
    result = generate_proposal(config)
    
    print(f"\n✅ Proposal generated!")
    print(f"📄 File: {result['output_path']}")
    print(f"💰 Total: {format_currency(result['data']['total'])}")
    print(f"📊 Margin: {result['data']['margin_pct']:.1f}%")
    print(f"🔄 Year 2: {format_currency(result['data']['year2'])}/year")
    
    # Save config
    config_path = Path(result['output_path']).parent / f"{Path(result['output_path']).stem}.json"
    with open(config_path, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2)
    print(f"💾 Config saved: {config_path}")


def load_and_generate(config_path):
    """Load config from JSON and generate."""
    with open(config_path, "r", encoding="utf-8") as f:
        config = json.load(f)
    
    result = generate_proposal(config)
    print(f"✅ Proposal: {result['output_path']}")
    print(f"💰 Total: {format_currency(result['data']['total'])}")
    return result


def main():
    parser = argparse.ArgumentParser(description="Generate GardenSuite pricing proposals")
    parser.add_argument("--config", "-c", help="Path to JSON config file")
    parser.add_argument("--interactive", "-i", action="store_true", help="Interactive mode")
    parser.add_argument("--example", "-e", action="store_true", help="Generate Client A example")
    parser.add_argument("--existing-client", action="store_true", help="Existing GardenSuite ERP client (add-on pricing)")
    
    args = parser.parse_args()
    
    if args.example:
        config = {
            "client_name": "Client A - Large Tea Estate",
            "client_location": "Assam",
            "client_contact": "Manager - 98765 43210",
            "sales_person": "Sarbani Associates",
            "num_scales": 15,
            "num_devices": 12,
            "training_days": 5,
            "travel_cost": 8000,
            "existing_client": True,
            "erp_annual_fee": 140000,
        }
        result = generate_proposal(config)
        print(f"✅ Client A example (existing client): {result['output_path']}")
        print(f"💰 Total: {format_currency(result['data']['total'])}")
        print(f"📊 Margin: {result['data']['margin_pct']:.1f}%")
        print(f"🔄 Year 2: {format_currency(result['data']['year2'])}/year")
        
    elif args.config:
        load_and_generate(args.config)
    elif args.interactive:
        interactive_mode()
    else:
        print("GardenSuite Pricing Offer Generator")
        print("\nUsage:")
        print("  python generate_pricing_offer.py --example")
        print("  python generate_pricing_offer.py --interactive")
        print("  python generate_pricing_offer.py --config file.json")
        print("  python generate_pricing_offer.py --example --existing-client")


if __name__ == "__main__":
    main()
