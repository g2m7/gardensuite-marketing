import json, os

with open("marketing/outreach/north-bengal-intelligence/data/North_Bengal_Tea_Master_Registry.json") as f:
    master_rows = json.load(f)

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>North Bengal Tea Master Registry (396 Units) | GardenSuite</title>
<style>
  :root {
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --bg: #F8FAFC;
    --card-bg: #FFFFFF;
    --border: #E2E8F0;
    --text-primary: #0F172A;
    --text-secondary: #475569;
    --text-muted: #64748B;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: var(--font-sans);
    background-color: var(--bg);
    color: var(--text-primary);
    line-height: 1.5;
    padding: 24px;
  }
  .container { max-width: 1600px; margin: 0 auto; }
  
  /* Header */
  .header {
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px 32px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }
  .header h1 { font-size: 24px; font-weight: 700; color: #0F172A; margin-bottom: 6px; }
  .header p { font-size: 14px; color: var(--text-secondary); }

  /* KPI Cards */
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
  .kpi-card {
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }
  .kpi-val { font-size: 26px; font-weight: 700; color: #0F172A; line-height: 1.2; }
  .kpi-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-top: 4px; }
  .kpi-sub { font-size: 11px; color: var(--text-muted); margin-top: 2px; }

  /* Legend Box */
  .legend-box {
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px 24px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }
  .legend-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0F172A; margin-bottom: 12px; }
  .legend-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 16px;
  }
  .legend-item { display: flex; align-items: flex-start; gap: 10px; font-size: 12px; }
  .badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
    border: 1px solid transparent;
  }
  
  /* Type Badges */
  .badge-estate { background: #DCFCE7; color: #166534; border-color: #BBF7D0; }
  .badge-blf { background: #DBEAFE; color: #1E40AF; border-color: #BFDBFE; }
  
  /* City Badges */
  .badge-siliguri { background: #D1FAE5; color: #065F46; border-color: #A7F3D0; font-weight: 700; }
  .badge-jalpaiguri { background: #CCFBF1; color: #0F766E; border-color: #99F6E4; }
  .badge-kolkata { background: #F1F5F9; color: #334155; border-color: #CBD5E1; }
  .badge-other-city { background: #FEF9C3; color: #854D0E; border-color: #FDE047; }

  /* Region Badges */
  .badge-dooars { background: #ECFDF5; color: #047857; }
  .badge-terai { background: #E0F2FE; color: #0369A1; }
  .badge-darjeeling { background: #F3E8FF; color: #6B21A8; }
  .badge-dinajpur { background: #FEF3C7; color: #92400E; }
  .badge-coochbehar { background: #FFEDD5; color: #9A3412; }

  /* Controls */
  .controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
  }
  .search-box {
    flex: 1;
    min-width: 280px;
    max-width: 480px;
    position: relative;
  }
  .search-input {
    width: 100%;
    padding: 10px 14px;
    font-size: 13px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: #FFFFFF;
    outline: none;
  }
  .search-input:focus { border-color: #2563EB; box-shadow: 0 0 0 2px rgba(37,99,235,0.1); }

  .filter-btns { display: flex; flex-wrap: wrap; gap: 8px; }
  .btn-filter {
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.15s;
  }
  .btn-filter:hover { background: #F1F5F9; color: #0F172A; }
  .btn-filter.active { background: #0F172A; color: #FFFFFF; border-color: #0F172A; }

  /* Table */
  .table-wrap {
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow-x: auto;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    text-align: left;
  }
  thead {
    background: #0F172A;
    color: #FFFFFF;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  th {
    padding: 12px 14px;
    font-weight: 600;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #334155;
    white-space: nowrap;
  }
  td {
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }
  tbody tr:hover { background-color: #F8FAFC; }
  tbody tr:nth-child(even) { background-color: #FAFAFA; }
  tbody tr:nth-child(even):hover { background-color: #F1F5F9; }

  .col-name { font-weight: 600; color: #0F172A; max-width: 240px; }
  .col-company { color: var(--text-secondary); max-width: 220px; }
  .col-addr { font-size: 11px; color: var(--text-muted); max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .col-phone a, .col-email a { color: #2563EB; text-decoration: none; font-variant-numeric: tabular-nums; }
  .col-phone a:hover, .col-email a:hover { text-decoration: underline; }
  .scale-num { font-variant-numeric: tabular-nums; text-align: right; font-weight: 500; }
  .muted { color: var(--text-muted); }
  .count-info { font-size: 12px; color: var(--text-muted); margin-top: 8px; }
</style>
</head>
<body>

<div class="container">
  <!-- Header -->
  <div class="header">
    <h1>North Bengal Tea Master Registry</h1>
    <p>Complete census of 396 operating tea estates and standalone bought leaf factories across Dooars, Terai, Darjeeling Hills, Uttar Dinajpur, and Cooch Behar, joined with verified headquarters and contacts.</p>
  </div>

  <!-- KPI Summary -->
  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-val">396</div>
      <div class="kpi-label">Total Units</div>
      <div class="kpi-sub">324 Estates + 72 BLFs</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-val">324</div>
      <div class="kpi-label">Organized Estates</div>
      <div class="kpi-sub">Field labor + captive factory</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-val">72</div>
      <div class="kpi-label">Bought Leaf (BLF)</div>
      <div class="kpi-sub">Factories buying STG leaf</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-val" style="color: #065F46;">57+</div>
      <div class="kpi-label">Siliguri HQs</div>
      <div class="kpi-sub">Immediate local demo range</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-val">110,000+</div>
      <div class="kpi-label">Planted Area</div>
      <div class="kpi-sub">Hectares under cultivation</div>
    </div>
  </div>

  <!-- Legend Box -->
  <div class="legend-box">
    <div class="legend-title">Color Code Legend & Outreach Strategy</div>
    <div class="legend-grid">
      <div class="legend-item">
        <span class="badge badge-estate">Organized Estate (324)</span>
        <span>Captive plantation with resident labor force. Target: Face Attendance + Smart Weighing Scale + Full ERP.</span>
      </div>
      <div class="legend-item">
        <span class="badge badge-blf">Bought Leaf Factory (72)</span>
        <span>Standalone factory purchasing green leaf from small tea growers. Target: Leaf Weighment Scale + Factory ERP + MIS.</span>
      </div>
      <div class="legend-item">
        <span class="badge badge-siliguri">Siliguri HQ (57+)</span>
        <span>Direct decision-maker office in Sevoke Rd / Hill Cart Rd. Priority for in-person live software demos.</span>
      </div>
      <div class="legend-item">
        <span class="badge badge-jalpaiguri">Jalpaiguri HQ (16+)</span>
        <span>Regional operational hubs in Dooars gateway. Target for weekly scheduled road visits.</span>
      </div>
      <div class="legend-item">
        <span class="badge badge-kolkata">Kolkata HQ (146+)</span>
        <span>Corporate headquarters & managing directors. Target for executive email cadence and board meetings.</span>
      </div>
      <div class="legend-item">
        <span class="badge badge-darjeeling">Darjeeling Hills (64)</span>
        <span>Orthodox & organic estates across Darjeeling, Kurseong, and Kalimpong.</span>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <div class="controls">
    <div class="search-box">
      <input type="text" id="searchInput" class="search-input" placeholder="Search by garden name, company, city, or district..." oninput="filterTable()">
    </div>
    <div class="filter-btns">
      <button class="btn-filter active" onclick="setFilter('all', this)">All (396)</button>
      <button class="btn-filter" onclick="setFilter('estate', this)">Estates (324)</button>
      <button class="btn-filter" onclick="setFilter('blf', this)">BLFs (72)</button>
      <button class="btn-filter" onclick="setFilter('siliguri', this)">Siliguri HQs (57+)</button>
      <button class="btn-filter" onclick="setFilter('kolkata', this)">Kolkata HQs</button>
      <button class="btn-filter" onclick="setFilter('dooars', this)">Dooars</button>
      <button class="btn-filter" onclick="setFilter('terai', this)">Terai</button>
      <button class="btn-filter" onclick="setFilter('darjeeling', this)">Darjeeling Hills</button>
    </div>
  </div>

  <!-- Table Wrap -->
  <div class="table-wrap">
    <table id="masterTable">
      <thead>
        <tr>
          <th style="width: 40px; text-align: center;">Sl.</th>
          <th>Unit Name</th>
          <th style="text-align: center;">Type</th>
          <th style="text-align: center;">Region</th>
          <th>District</th>
          <th>Operating Company / Group</th>
          <th>Decision Maker</th>
          <th style="text-align: center;">HQ City</th>
          <th>HQ Address</th>
          <th>Phone</th>
          <th>Email</th>
          <th style="text-align: right;">Scale</th>
        </tr>
      </thead>
      <tbody>
"""

for r in master_rows:
    # Type badge
    if r["type"] == "Organized Estate":
        t_badge = '<span class="badge badge-estate">Estate</span>'
    else:
        t_badge = '<span class="badge badge-blf">BLF</span>'

    # Region badge
    reg = r["region"]
    if reg == "Dooars": reg_badge = '<span class="badge badge-dooars">Dooars</span>'
    elif reg == "Terai": reg_badge = '<span class="badge badge-terai">Terai</span>'
    elif "Darjeeling" in reg: reg_badge = '<span class="badge badge-darjeeling">Darjeeling</span>'
    elif "Dinajpur" in reg: reg_badge = '<span class="badge badge-dinajpur">Dinajpur</span>'
    else: reg_badge = f'<span class="badge badge-coochbehar">{reg}</span>'

    # City badge
    city = r["hq_city"]
    if city == "Siliguri": city_badge = '<span class="badge badge-siliguri">Siliguri</span>'
    elif city == "Jalpaiguri": city_badge = '<span class="badge badge-jalpaiguri">Jalpaiguri</span>'
    elif city == "Kolkata": city_badge = '<span class="badge badge-kolkata">Kolkata</span>'
    else: city_badge = f'<span class="badge badge-other-city">{city}</span>'

    phone_html = f'<a href="tel:{r["phone"]}">{r["phone"]}</a>' if r["phone"] != "-" else '<span class="muted">-</span>'
    email_html = f'<a href="mailto:{r["email"]}">{r["email"]}</a>' if r["email"] != "-" else '<span class="muted">-</span>'

    html_content += f"""
        <tr data-type="{r['type']}" data-region="{r['region']}" data-city="{r['hq_city']}">
          <td style="text-align: center; color: var(--text-muted);">{r['sl']}</td>
          <td class="col-name">{r['name']}</td>
          <td style="text-align: center;">{t_badge}</td>
          <td style="text-align: center;">{reg_badge}</td>
          <td>{r['district']}</td>
          <td class="col-company">{r['company']}</td>
          <td>{r['decision_maker']}</td>
          <td style="text-align: center;">{city_badge}</td>
          <td class="col-addr" title="{r['hq_address']}">{r['hq_address']}</td>
          <td class="col-phone">{phone_html}</td>
          <td class="col-email">{email_html}</td>
          <td class="scale-num">{r['scale']}</td>
        </tr>"""

html_content += """
      </tbody>
    </table>
  </div>
  <div class="count-info" id="countInfo">Showing 396 of 396 units</div>
</div>

<script>
  let currentFilter = 'all';

  function setFilter(filter, btn) {
    currentFilter = filter;
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterTable();
  }

  function filterTable() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#masterTable tbody tr');
    let visibleCount = 0;

    rows.forEach(row => {
      const type = row.getAttribute('data-type');
      const region = row.getAttribute('data-region');
      const city = row.getAttribute('data-city');
      const text = row.innerText.toLowerCase();

      let matchesFilter = true;
      if (currentFilter === 'estate' && type !== 'Organized Estate') matchesFilter = false;
      if (currentFilter === 'blf' && type !== 'Bought Leaf Factory (BLF)') matchesFilter = false;
      if (currentFilter === 'siliguri' && city !== 'Siliguri') matchesFilter = false;
      if (currentFilter === 'kolkata' && city !== 'Kolkata') matchesFilter = false;
      if (currentFilter === 'dooars' && region !== 'Dooars') matchesFilter = false;
      if (currentFilter === 'terai' && region !== 'Terai') matchesFilter = false;
      if (currentFilter === 'darjeeling' && !region.includes('Darjeeling')) matchesFilter = false;

      const matchesSearch = !q || text.includes(q);

      if (matchesFilter && matchesSearch) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    document.getElementById('countInfo').innerText = `Showing ${visibleCount} of ${rows.length} units`;
  }
</script>

</body>
</html>
"""

html_path = "marketing/outreach/north-bengal-intelligence/data/North_Bengal_Tea_Master_Registry.html"
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Interactive HTML Master Registry successfully created at: {html_path}")
