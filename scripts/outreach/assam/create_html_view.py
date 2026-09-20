#!/usr/bin/env python3
"""
Generate an interactive styled HTML viewer for the Assam Tea Master Registry.
Outputs: marketing/outreach/assam-intelligence/data/Assam_Tea_Master_Registry.html
"""

import json
import os

JSON_FILE = "marketing/outreach/assam-intelligence/data/Assam_Tea_Master_Registry.json"
HTML_FILE = "marketing/outreach/assam-intelligence/data/Assam_Tea_Master_Registry.html"

def main():
    if not os.path.exists(JSON_FILE):
        print(f"Error: {JSON_FILE} not found.")
        return

    with open(JSON_FILE, "r", encoding="utf-8") as f:
        master_rows = json.load(f)

    # Calculate KPIs
    total_records = len(master_rows)
    estates_count = sum(1 for r in master_rows if r["type"] == "Organized Estate")
    blf_count = sum(1 for r in master_rows if r["type"] == "Bought Leaf Factory (BLF)")
    upper_assam = sum(1 for r in master_rows if r["region"] == "Upper Assam")
    central_assam = sum(1 for r in master_rows if r["region"] == "Central Assam")
    barak_valley = sum(1 for r in master_rows if r["region"] == "Barak Valley")
    lower_assam = sum(1 for r in master_rows if r["region"] == "Lower Assam")
    with_email = sum(1 for r in master_rows if r["email"] != "-")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Assam Tea Master Registry ({total_records} Units) | GardenSuite</title>
<style>
  :root {{
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --bg: #F8FAFC;
    --card-bg: #FFFFFF;
    --border: #E2E8F0;
    --text-primary: #0F172A;
    --text-secondary: #475569;
    --text-muted: #64748B;
  }}
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    font-family: var(--font-sans);
    background-color: var(--bg);
    color: var(--text-primary);
    line-height: 1.5;
    padding: 24px;
  }}
  .container {{ max-width: 1600px; margin: 0 auto; }}
  
  /* Header */
  .header {{
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px 32px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }}
  .header h1 {{ font-size: 24px; font-weight: 700; color: #0F172A; margin-bottom: 6px; }}
  .header p {{ font-size: 14px; color: var(--text-secondary); }}

  /* KPI Cards */
  .kpi-grid {{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }}
  .kpi-card {{
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }}
  .kpi-val {{ font-size: 26px; font-weight: 700; color: #0F172A; line-height: 1.2; }}
  .kpi-label {{ font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-top: 4px; }}
  .kpi-sub {{ font-size: 11px; color: var(--text-muted); margin-top: 2px; }}

  /* Filter Bar */
  .filter-bar {{
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 20px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }}
  .search-box {{
    flex: 1;
    min-width: 250px;
    position: relative;
  }}
  .search-box input {{
    width: 100%;
    padding: 10px 14px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.15s;
  }}
  .search-box input:focus {{ border-color: #0F172A; }}
  
  .filter-group {{
    display: flex;
    gap: 8px;
    align-items: center;
  }}
  .filter-group label {{ font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; }}
  select {{
    padding: 9px 12px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 13px;
    background: #FFF;
    color: var(--text-primary);
    cursor: pointer;
  }}

  /* Table */
  .table-wrap {{
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }}
  table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    text-align: left;
  }}
  thead {{
    background: #F1F5F9;
    border-bottom: 1px solid var(--border);
  }}
  th {{
    padding: 12px 14px;
    font-weight: 600;
    color: var(--text-secondary);
    white-space: nowrap;
  }}
  td {{
    padding: 12px 14px;
    border-bottom: 1px solid #F1F5F9;
    color: var(--text-primary);
    vertical-align: top;
  }}
  tr:hover td {{ background-color: #F8FAFC; }}

  /* Badges */
  .badge {{
    display: inline-block;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  }}
  .badge-estate {{ background: #DCFCE7; color: #15803D; }}
  .badge-blf {{ background: #FEF3C7; color: #B45309; }}
  
  .badge-upper {{ background: #EFF6FF; color: #1D4ED8; }}
  .badge-central {{ background: #F3E8FF; color: #7E22CE; }}
  .badge-barak {{ background: #ECFCCB; color: #4D7C0F; }}
  .badge-lower {{ background: #FEE2E2; color: #B91C1C; }}

  .meta-sub {{ font-size: 11px; color: var(--text-muted); margin-top: 2px; }}
  .email-link {{ color: #0284C7; text-decoration: none; word-break: break-all; }}
  .email-link:hover {{ text-decoration: underline; }}
  .counter {{ font-size: 13px; color: var(--text-muted); margin-left: auto; }}
</style>
</head>
<body>

<div class="container">
  <div class="header">
    <h1>Assam Tea Master Registry</h1>
    <p>Comprehensive Master Database of {total_records} Tea Production Units across Assam | Built by Sarbani Associates &bull; GardenSuite</p>
  </div>

  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-val">{total_records}</div>
      <div class="kpi-label">Total Entities</div>
      <div class="kpi-sub">Organized + Processors</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-val">{estates_count}</div>
      <div class="kpi-label">Organized Estates</div>
      <div class="kpi-sub">Tea Board Registered</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-val">{blf_count}</div>
      <div class="kpi-label">Bought Leaf Factories</div>
      <div class="kpi-sub">Standalone Processors</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-val">{upper_assam}</div>
      <div class="kpi-label">Upper Assam</div>
      <div class="kpi-sub">Dibrugarh, Tinsukia, Jorhat+</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-val">{central_assam}</div>
      <div class="kpi-label">Central Assam</div>
      <div class="kpi-sub">Sonitpur, Biswanath, Nagaon</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-val">{barak_valley}</div>
      <div class="kpi-label">Barak Valley</div>
      <div class="kpi-sub">Cachar, Hailakandi, Karimganj</div>
    </div>
  </div>

  <div class="filter-bar">
    <div class="search-box">
      <input type="text" id="searchInput" placeholder="Search by estate name, company, mark, decision maker, or city...">
    </div>
    <div class="filter-group">
      <label>Type:</label>
      <select id="typeFilter">
        <option value="">All Types</option>
        <option value="Organized Estate">Organized Estate</option>
        <option value="Bought Leaf Factory">Bought Leaf Factory</option>
      </select>
    </div>
    <div class="filter-group">
      <label>Region:</label>
      <select id="regionFilter">
        <option value="">All Regions</option>
        <option value="Upper Assam">Upper Assam</option>
        <option value="Central Assam">Central Assam</option>
        <option value="Barak Valley">Barak Valley</option>
        <option value="Lower Assam">Lower Assam</option>
      </select>
    </div>
    <div class="counter" id="recordCounter">Showing {total_records} of {total_records} units</div>
  </div>

  <div class="table-wrap">
    <table id="dataTable">
      <thead>
        <tr>
          <th>#</th>
          <th>Garden / Factory Name</th>
          <th>Type</th>
          <th>Region</th>
          <th>District</th>
          <th>Owning Entity</th>
          <th>Decision Maker</th>
          <th>HQ City & Address</th>
          <th>Scale</th>
          <th>Registration / Marks</th>
        </tr>
      </thead>
      <tbody id="tableBody">
      </tbody>
    </table>
  </div>
</div>

<script>
const rawData = {json.dumps(master_rows, ensure_ascii=False)};

function renderTable(data) {{
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
  
  data.forEach((r, idx) => {{
    const tr = document.createElement("tr");
    
    // Type badge
    let typeBadge = `<span class="badge badge-estate">${{r.type}}</span>`;
    if (r.type.includes("Bought Leaf")) {{
      typeBadge = `<span class="badge badge-blf">BLF Unit</span>`;
    }}

    // Region badge
    let regBadge = "badge-upper";
    if (r.region === "Central Assam") regBadge = "badge-central";
    else if (r.region === "Barak Valley") regBadge = "badge-barak";
    else if (r.region === "Lower Assam") regBadge = "badge-lower";

    const emailHtml = (r.email && r.email !== "-") ? `<div class="meta-sub"><a href="mailto:${{r.email}}" class="email-link">${{r.email}}</a></div>` : "";
    const marksHtml = r.marks ? `<div class="meta-sub" style="color: #64748B;">Marks: ${{r.marks}}</div>` : "";

    tr.innerHTML = `
      <td style="color: #94A3B8; font-weight: 500;">${{r.sl}}</td>
      <td>
        <strong style="font-weight: 600;">${{r.name}}</strong>
      </td>
      <td>${{typeBadge}}</td>
      <td><span class="badge ${{regBadge}}">${{r.region}}</span></td>
      <td>${{r.district}}</td>
      <td>
        <div>${{r.company}}</div>
      </td>
      <td>
        <div>${{r.decision_maker !== "-" ? r.decision_maker : "<span style='color:#CBD5E1'>-</span>"}}</div>
        ${{emailHtml}}
      </td>
      <td>
        <div><strong>${{r.hq_city}}</strong></div>
        <div class="meta-sub">${{r.hq_address}}</div>
      </td>
      <td>${{r.scale}}</td>
      <td>
        <div><code>${{r.reg_no}}</code></div>
        ${{marksHtml}}
      </td>
    `;
    tbody.appendChild(tr);
  }});

  document.getElementById("recordCounter").textContent = `Showing ${{data.length}} of ${{rawData.length}} units`;
}}

// Filter logic
function applyFilters() {{
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  const typeFilter = document.getElementById("typeFilter").value;
  const regionFilter = document.getElementById("regionFilter").value;

  const filtered = rawData.filter(r => {{
    const matchesSearch = !q || [r.name, r.company, r.decision_maker, r.hq_city, r.district, r.marks, r.reg_no]
      .some(val => val && val.toLowerCase().includes(q));
    const matchesType = !typeFilter || r.type.includes(typeFilter);
    const matchesRegion = !regionFilter || r.region === regionFilter;
    return matchesSearch && matchesType && matchesRegion;
  }});

  renderTable(filtered);
}}

document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("typeFilter").addEventListener("change", applyFilters);
document.getElementById("regionFilter").addEventListener("change", applyFilters);

// Initial render
renderTable(rawData);
</script>

</body>
</html>
"""

    with open(HTML_FILE, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"Generated interactive HTML viewer: {HTML_FILE}")

if __name__ == "__main__":
    main()
