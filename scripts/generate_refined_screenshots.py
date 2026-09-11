import os
import base64
from playwright.sync_api import sync_playwright

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ASSETS_DIR = os.path.join(WORKSPACE, "collateral/brochures/2026-executive-brochure/assets")
WORKER_FACE_PATH = os.path.join(WORKSPACE, "scratch/worker_face_square.png")

with open(WORKER_FACE_PATH, "rb") as f:
    worker_face_b64 = "data:image/png;base64," + base64.b64encode(f.read()).decode("utf-8")

def generate_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            headless=True,
            args=["--disable-web-security", "--allow-file-access-from-files"]
        )

        # ── 1. FACE ATTENDANCE (Page 3) ───────────────────────────
        # Viewport: 760 x 1540 (device_scale_factor=2 -> 1520 x 3080)
        page = browser.new_page(viewport={"width": 760, "height": 1540}, device_scale_factor=2)
        html_face = f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    width: 760px;
    height: 1540px;
    background: #000000;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }}

  /* Top Status Bar */
  .status-bar {{
    height: 52px;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 21px;
    font-weight: 800;
    color: #f1f5f9;
    background: rgba(0,0,0,0.9);
    z-index: 20;
  }}
  .status-right {{
    display: flex;
    gap: 16px;
    align-items: center;
    font-size: 18px;
  }}

  /* App Navigation Header */
  .app-header {{
    height: 90px;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #0c1410;
    border-bottom: 1px solid rgba(255,255,255,0.12);
    z-index: 20;
  }}
  .brand-group {{
    display: flex;
    align-items: center;
    gap: 16px;
  }}
  .app-logo {{
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    font-weight: 900;
    color: #fff;
    box-shadow: 0 4px 14px rgba(16,185,129,0.4);
  }}
  .brand-text h1 {{
    font-size: 26px;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: #ffffff;
  }}
  .brand-text p {{
    font-size: 16px;
    color: #10b981;
    font-weight: 800;
    margin-top: 2px;
  }}
  .offline-badge {{
    background: rgba(16,185,129,0.18);
    border: 1.5px solid rgba(16,185,129,0.5);
    color: #34d399;
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 10px;
  }}
  .pulse-dot {{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 12px #10b981;
  }}

  /* Camera Viewfinder */
  .camera-viewport {{
    flex: 1;
    position: relative;
    background: #08100b;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }}

  .garden-bg {{
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 50% 35%, rgba(16,185,129,0.2) 0%, transparent 65%),
      radial-gradient(circle at 80% 80%, rgba(5,150,105,0.15) 0%, transparent 50%),
      #050c07;
  }}

  .worker-camera-feed {{
    position: relative;
    width: 580px;
    height: 640px;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }}

  .worker-img {{
    width: 500px;
    height: 560px;
    object-fit: cover;
    border-radius: 40px;
    box-shadow: 0 24px 70px rgba(0,0,0,0.95);
    filter: contrast(1.04) brightness(1.02);
  }}

  /* Biometric Reticle Corners */
  .reticle-corner {{
    position: absolute;
    width: 68px;
    height: 68px;
    border-color: #10b981;
    border-style: solid;
    filter: drop-shadow(0 0 14px rgba(16,185,129,0.95));
  }}
  .corner-tl {{ top: 18px; left: 18px; border-width: 7px 0 0 7px; border-top-left-radius: 30px; }}
  .corner-tr {{ top: 18px; right: 18px; border-width: 7px 7px 0 0; border-top-right-radius: 30px; }}
  .corner-bl {{ bottom: 18px; left: 18px; border-width: 0 0 7px 7px; border-bottom-left-radius: 30px; }}
  .corner-br {{ bottom: 18px; right: 18px; border-width: 0 7px 7px 0; border-bottom-right-radius: 30px; }}

  .hud-mesh {{
    position: absolute;
    inset: 44px;
    border: 1.5px dashed rgba(16,185,129,0.55);
    border-radius: 28px;
    pointer-events: none;
  }}

  .liveness-badge {{
    position: absolute;
    top: 24px;
    background: rgba(0,0,0,0.85);
    border: 1.5px solid rgba(16,185,129,0.6);
    padding: 11px 26px;
    border-radius: 40px;
    font-size: 17px;
    font-weight: 800;
    color: #34d399;
    letter-spacing: 0.04em;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 10;
  }}

  .match-pill {{
    position: absolute;
    bottom: -18px;
    background: #059669;
    border: 2px solid #34d399;
    color: #ffffff;
    font-size: 21px;
    font-weight: 900;
    padding: 14px 36px;
    border-radius: 40px;
    box-shadow: 0 12px 36px rgba(5,150,105,0.7);
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 10;
  }}

  /* Bottom Worker Detail Sheet */
  .bottom-sheet {{
    background: #0a120e;
    border-top: 1px solid rgba(255,255,255,0.15);
    padding: 34px 36px 42px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    z-index: 20;
    box-shadow: 0 -24px 60px rgba(0,0,0,0.85);
  }}

  .worker-row {{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }}
  .worker-left {{
    display: flex;
    align-items: center;
    gap: 20px;
  }}
  .worker-avatar {{
    width: 76px;
    height: 76px;
    border-radius: 20px;
    border: 3px solid #10b981;
    overflow: hidden;
    background: #18241e;
  }}
  .worker-avatar img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }}
  .worker-title h2 {{
    font-size: 32px;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: -0.01em;
  }}
  .worker-title p {{
    font-size: 20px;
    font-weight: 800;
    color: #10b981;
    margin-top: 3px;
  }}
  .status-tag {{
    background: rgba(16,185,129,0.25);
    border: 2px solid #10b981;
    color: #34d399;
    font-size: 18px;
    font-weight: 900;
    padding: 10px 22px;
    border-radius: 12px;
  }}

  .data-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }}
  .data-box {{
    background: #121c17;
    border: 1.5px solid rgba(255,255,255,0.1);
    padding: 20px 22px;
    border-radius: 18px;
  }}
  .data-box-label {{
    font-size: 15px;
    font-weight: 800;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }}
  .data-box-val {{
    font-size: 23px;
    font-weight: 900;
    color: #f8fafc;
    margin-top: 6px;
  }}

  .confirm-btn {{
    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
    color: #ffffff;
    padding: 24px;
    border-radius: 20px;
    font-size: 24px;
    font-weight: 900;
    text-align: center;
    box-shadow: 0 12px 36px rgba(16,185,129,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }}
</style>
</head>
<body>
  <div class="status-bar">
    <span>07:14 AM</span>
    <div class="status-right">
      <span>📶 OFFLINE MODE</span>
      <span>🔋 96%</span>
    </div>
  </div>

  <div class="app-header">
    <div class="brand-group">
      <div class="app-logo">GS</div>
      <div class="brand-text">
        <h1>Face Attendance</h1>
        <p>Chapar T.E. • Section 12 (North)</p>
      </div>
    </div>
    <div class="offline-badge">
      <div class="pulse-dot"></div>
      <span>Vector Engine v3</span>
    </div>
  </div>

  <div class="camera-viewport">
    <div class="garden-bg"></div>
    <div class="liveness-badge">
      <span>⚡</span> ACTIVE LIVENESS PASS (98.4%)
    </div>

    <div class="worker-camera-feed">
      <div class="reticle-corner corner-tl"></div>
      <div class="reticle-corner corner-tr"></div>
      <div class="reticle-corner corner-bl"></div>
      <div class="reticle-corner corner-br"></div>
      <div class="hud-mesh"></div>
      <img src="{worker_face_b64}" class="worker-img" alt="Bina Munda Live Camera" />
      <div class="match-pill">
        <span>✓</span> MATCH: 96.0% (0.4s)
      </div>
    </div>
  </div>

  <div class="bottom-sheet">
    <div class="worker-row">
      <div class="worker-left">
        <div class="worker-avatar">
          <img src="{worker_face_b64}" alt="Worker Thumbnail" />
        </div>
        <div class="worker-title">
          <h2>Bina Munda</h2>
          <p>Worker ID: GT-1043 • Plucker</p>
        </div>
      </div>
      <div class="status-tag">VERIFIED</div>
    </div>

    <div class="data-grid">
      <div class="data-box">
        <div class="data-box-label">Assigned Work Code</div>
        <div class="data-box-val">HZ-01 Plucking (24kg)</div>
      </div>
      <div class="data-box">
        <div class="data-box-label">Time Stamp</div>
        <div class="data-box-val">Today 07:14:22 AM</div>
      </div>
      <div class="data-box">
        <div class="data-box-label">Estate Division</div>
        <div class="data-box-val">North Div • Sec 12</div>
      </div>
      <div class="data-box">
        <div class="data-box-label">Muster Book</div>
        <div class="data-box-val">Book 04 / S-12</div>
      </div>
    </div>

    <div class="confirm-btn">
      <span>✓</span> RECORDED &amp; ALLOCATED TO SECTION
    </div>
  </div>
</body>
</html>
"""
        page.set_content(html_face)
        page.wait_for_load_state("networkidle")
        out_face = os.path.join(ASSETS_DIR, "clean_face_attendance.png")
        page.screenshot(path=out_face, type="png")
        print(f"Generated: {out_face}")
        page.close()


        # ── 2. WAGES & KAMJARI OVERVIEW (Page 6) ───────────────────
        # Viewport: 1050 x 920 px (Edge-to-edge, ultra-clear table, bold figures)
        page = browser.new_page(viewport={"width": 1050, "height": 920}, device_scale_factor=2)
        html_wages = """
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1050px;
    height: 920px;
    background: #ffffff;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1e293b;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .window-card {
    background: #ffffff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* Desktop App Titlebar */
  .titlebar {
    background: #0f172a;
    color: #f8fafc;
    height: 62px;
    padding: 0 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #1e293b;
  }
  .window-dots {
    display: flex;
    gap: 8px;
  }
  .dot { width: 13px; height: 13px; border-radius: 50%; }
  .dot-red { background: #ef4444; }
  .dot-yellow { background: #f59e0b; }
  .dot-green { background: #10b981; }

  .window-title {
    font-size: 19px;
    font-weight: 800;
    color: #f8fafc;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .estate-badge {
    background: #1e293b;
    color: #38bdf8;
    padding: 5px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 800;
  }

  .title-actions {
    display: flex;
    gap: 10px;
  }
  .btn {
    padding: 7px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .btn-green {
    background: #059669;
    color: #ffffff;
  }

  /* Subheader Period Bar */
  .period-header {
    background: #f8fafc;
    padding: 16px 28px;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .period-header h2 {
    font-size: 21px;
    font-weight: 900;
    color: #0f172a;
    letter-spacing: -0.01em;
  }
  .period-header p {
    font-size: 14px;
    color: #64748b;
    font-weight: 700;
    margin-top: 2px;
  }
  .audit-chip {
    background: #ecfdf5;
    border: 1.5px solid #a7f3d0;
    color: #047857;
    font-size: 14px;
    font-weight: 800;
    padding: 6px 16px;
    border-radius: 20px;
  }

  /* 4 Large KPI Blocks (2x2 Grid) */
  .kpi-deck {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    padding: 16px 28px;
    background: #f1f5f9;
  }
  .kpi-tile {
    background: #ffffff;
    border-radius: 14px;
    padding: 14px 20px;
    border: 1px solid #e2e8f0;
  }
  .kpi-label {
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
  }
  .kpi-value {
    font-size: 34px;
    font-weight: 900;
    color: #0f172a;
    margin: 4px 0 2px;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .kpi-subtext {
    font-size: 13px;
    font-weight: 700;
    color: #059669;
  }

  /* Summary Ledger Table */
  .ledger-section {
    flex: 1;
    padding: 14px 28px 12px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .table-title {
    font-size: 16px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14.5px;
  }
  th {
    text-align: left;
    padding: 9px 12px;
    background: #f8fafc;
    color: #475569;
    font-size: 12.5px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 2px solid #e2e8f0;
  }
  th.r, td.r { text-align: right; }
  td {
    padding: 10px 12px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .sec-bold {
    font-weight: 900;
    color: #0f172a;
    font-size: 14.5px;
  }
  .tag-ok {
    background: #ecfdf5;
    color: #059669;
    font-size: 12px;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 6px;
    display: inline-block;
  }
  tr.summary-row td {
    background: #f8fafc;
    border-top: 2px solid #cbd5e1;
    font-size: 15.5px;
    font-weight: 900;
    color: #0f172a;
    padding: 11px 12px;
  }

  /* Bottom Audit Bar */
  .footer-audit {
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
    padding: 12px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: #475569;
    font-weight: 700;
  }
</style>
</head>
<body>
  <div class="window-card">
    <div class="titlebar">
      <div class="window-dots">
        <div class="dot dot-red"></div>
        <div class="dot dot-yellow"></div>
        <div class="dot dot-green"></div>
      </div>
      <div class="window-title">
        <span>GardenSuite ERP v3.2</span>
        <span class="estate-badge">Chapar Tea Estate</span>
        <span style="color: #94a3b8; font-weight: 500;">— Fortnightly Settlement</span>
      </div>
      <div class="title-actions">
        <div class="btn btn-green">🏦 RTGS Pay Sheet</div>
      </div>
    </div>

    <div class="period-header">
      <div>
        <h2>Fortnight 2 (16–31 Aug 2026) Settlement</h2>
        <p>Basic: ₹250/day @ 24kg task + ₹4.50/kg over-plucking + 12% PF</p>
      </div>
      <div class="audit-chip">✓ STATUTORY RECONCILED</div>
    </div>

    <div class="kpi-deck">
      <div class="kpi-tile">
        <div class="kpi-label">Workers Paid</div>
        <div class="kpi-value">1,014</div>
        <div class="kpi-subtext">872 Pluckers • 142 Field &amp; Factory Staff</div>
      </div>
      <div class="kpi-tile">
        <div class="kpi-label">Green Leaf Plucked</div>
        <div class="kpi-value">870,535 kg</div>
        <div class="kpi-subtext">Avg 26.84 kg/day per plucker</div>
      </div>
      <div class="kpi-tile">
        <div class="kpi-label">Gross Wages Processed</div>
        <div class="kpi-value">₹2,20,60,500</div>
        <div class="kpi-subtext">Basic ₹1.88 Cr + Over-Plucking ₹32.10 L</div>
      </div>
      <div class="kpi-tile">
        <div class="kpi-label">PF ECR &amp; Deductions</div>
        <div class="kpi-value">₹31,57,656</div>
        <div class="kpi-subtext">12% PF return generated for EPFO</div>
      </div>
    </div>

    <div class="ledger-section">
      <div class="table-title">
        <span>Division &amp; Section Settlement Ledger</span>
        <span style="color: #64748b; font-size: 13px; font-weight: 700;">Active muster books</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Section / Team</th>
            <th class="r">Pluckers</th>
            <th class="r">Leaf Plucked</th>
            <th class="r">Plucker Avg</th>
            <th class="r">Net Wages</th>
            <th>Audit Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="sec-bold">Section 12 (North Div)</span></td>
            <td class="r">142</td>
            <td class="r">118,420 kg</td>
            <td class="r">27.8 kg</td>
            <td class="r" style="font-weight: 800;">₹3,82,400</td>
            <td><span class="tag-ok">✓ VERIFIED</span></td>
          </tr>
          <tr>
            <td><span class="sec-bold">Section 08 (Central Div)</span></td>
            <td class="r">168</td>
            <td class="r">141,120 kg</td>
            <td class="r">28.0 kg</td>
            <td class="r" style="font-weight: 800;">₹4,52,200</td>
            <td><span class="tag-ok">✓ VERIFIED</span></td>
          </tr>
          <tr>
            <td><span class="sec-bold">Section 04 (East Div)</span></td>
            <td class="r">135</td>
            <td class="r">109,350 kg</td>
            <td class="r">27.0 kg</td>
            <td class="r" style="font-weight: 800;">₹3,57,175</td>
            <td><span class="tag-ok">✓ VERIFIED</span></td>
          </tr>
          <tr>
            <td><span class="sec-bold">Section 15 (South Div)</span></td>
            <td class="r">120</td>
            <td class="r">98,400 kg</td>
            <td class="r">25.4 kg</td>
            <td class="r" style="font-weight: 800;">₹3,18,600</td>
            <td><span class="tag-ok">✓ VERIFIED</span></td>
          </tr>
          <tr>
            <td><span class="sec-bold">Section 02 (West Div)</span></td>
            <td class="r">114</td>
            <td class="r">92,340 kg</td>
            <td class="r">24.8 kg</td>
            <td class="r" style="font-weight: 800;">₹2,98,200</td>
            <td><span class="tag-ok">✓ VERIFIED</span></td>
          </tr>
          <tr>
            <td><span class="sec-bold">Factory Staff</span></td>
            <td class="r">88</td>
            <td class="r">—</td>
            <td class="r">—</td>
            <td class="r" style="font-weight: 800;">₹2,42,880</td>
            <td><span class="tag-ok">✓ VERIFIED</span></td>
          </tr>
          <tr class="summary-row">
            <td><span>ESTATE TOTAL (10 SEC)</span></td>
            <td class="r">1,014</td>
            <td class="r">870,535 kg</td>
            <td class="r">26.84 kg</td>
            <td class="r" style="color: #059669;">₹1,89,02,844</td>
            <td><span class="tag-ok" style="background: #059669; color: #fff;">✓ RTGS READY</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-audit">
      <div>✓ 32,435 Mandays Audited • Zero clerical errors • Bank RTGS Ready</div>
      <div style="color: #059669;">GardenSuite v3.2 • Sarbani Associates</div>
    </div>
  </div>
</body>
</html>
"""
        page.set_content(html_wages)
        page.wait_for_load_state("networkidle")
        out_wages = os.path.join(ASSETS_DIR, "clean_wages_overview.png")
        page.screenshot(path=out_wages, type="png")
        print(f"Generated: {out_wages}")
        page.close()


        # ── 3. CLOUD MIS DASHBOARD (Page 8) ─────────────────────────
        # Viewport: 1000 x 820 px (Aspect ratio ~1.22, zero empty space, beautifully compact!)
        page = browser.new_page(viewport={"width": 1000, "height": 820}, device_scale_factor=2)
        html_dash = """
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1000px;
    height: 820px;
    background: #ffffff;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #0f172a;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .dash-wrapper {
    background: #ffffff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* Executive Tablet Navigation Bar */
  .dash-topbar {
    height: 62px;
    background: #0f172a;
    color: #ffffff;
    padding: 0 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #1e293b;
  }
  .nav-brand {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .brand-chip {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 900;
    color: #ffffff;
  }
  .brand-name h1 {
    font-size: 19px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.01em;
  }
  .estate-selector {
    background: #1e293b;
    border: 1px solid #334155;
    color: #38bdf8;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 13.5px;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .sync-indicator {
    background: rgba(16,185,129,0.2);
    border: 1px solid rgba(16,185,129,0.5);
    color: #34d399;
    font-size: 13px;
    font-weight: 800;
    padding: 6px 14px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .pulse-ball {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 10px #10b981;
  }

  /* Main Dashboard Body */
  .dash-content {
    flex: 1;
    padding: 16px 28px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    background: #f8fafc;
  }

  /* 4 Executive Metric Cards */
  .metric-deck {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }
  .stat-card {
    background: #ffffff;
    border: 1.5px solid #e2e8f0;
    border-radius: 14px;
    padding: 14px 18px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    position: relative;
    overflow: hidden;
  }
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #059669 0%, #10b981 100%);
  }
  .stat-card.blue::before {
    background: linear-gradient(90deg, #0284c7 0%, #38bdf8 100%);
  }
  .stat-label {
    font-size: 11.5px;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .stat-number {
    font-size: 28px;
    font-weight: 900;
    color: #0f172a;
    margin: 5px 0 2px;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .stat-trend {
    font-size: 12px;
    font-weight: 700;
    color: #059669;
  }

  /* 2-Column Analytical Deck */
  .charts-deck {
    display: grid;
    grid-template-columns: 1.18fr 0.82fr;
    gap: 16px;
    flex: 1;
  }

  .chart-box {
    background: #ffffff;
    border: 1.5px solid #e2e8f0;
    border-radius: 16px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  }
  .chart-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px solid #f1f5f9;
  }
  .chart-head h3 {
    font-size: 15.5px;
    font-weight: 900;
    color: #0f172a;
  }
  .chart-head span {
    font-size: 12px;
    color: #64748b;
    font-weight: 700;
  }

  /* Section Performance Bars */
  .bar-list {
    display: flex;
    flex-direction: column;
    gap: 9px;
  }
  .bar-row {
    display: flex;
    flex-direction: column;
    gap: 3.5px;
  }
  .bar-title-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 800;
    color: #1e293b;
  }
  .bar-rail {
    height: 11px;
    background: #f1f5f9;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
  }
  .bar-prog {
    height: 100%;
    border-radius: 6px;
    background: linear-gradient(90deg, #059669 0%, #10b981 100%);
  }
  .bar-prog.blue {
    background: linear-gradient(90deg, #0284c7 0%, #38bdf8 100%);
  }

  /* Factory Summary Card */
  .fac-deck {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .fac-tile {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 10px 12px;
    border-radius: 12px;
  }
  .fac-tile-label {
    font-size: 11px;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
  }
  .fac-tile-num {
    font-size: 21px;
    font-weight: 900;
    color: #0f172a;
    margin-top: 2px;
  }

  .grade-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .grade-heading {
    font-size: 12px;
    font-weight: 800;
    color: #334155;
    margin-bottom: 2px;
  }
  .grade-entry {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12.5px;
    font-weight: 700;
  }
  .grade-entry .name { color: #0f172a; }
  .grade-entry .val { color: #059669; font-weight: 800; }

  /* Group Rollup Footer */
  .dash-footer {
    background: #0f172a;
    color: #cbd5e1;
    padding: 14px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13.5px;
    font-weight: 700;
  }
  .est-chips {
    display: flex;
    gap: 8px;
  }
  .est-chip {
    background: #1e293b;
    color: #e2e8f0;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 800;
  }
  .est-chip.active {
    background: rgba(16,185,129,0.25);
    border: 1px solid #10b981;
    color: #34d399;
  }
</style>
</head>
<body>
  <div class="dash-wrapper">
    <div class="dash-topbar">
      <div class="nav-brand">
        <div class="brand-chip">GS</div>
        <div class="brand-name">
          <h1>GardenSuite Cloud MIS</h1>
        </div>
        <div class="estate-selector">
          <span>🏛️ Chapar Tea Estate (Group View)</span>
          <span>▾</span>
        </div>
      </div>
      <div class="nav-meta">
        <div class="sync-indicator">
          <div class="pulse-ball"></div>
          <span>Cloud Sync Active</span>
        </div>
      </div>
    </div>

    <div class="dash-content">
      <div class="metric-deck">
        <div class="stat-card">
          <div class="stat-label">Season Harvest</div>
          <div class="stat-number">1,036,294 kg</div>
          <div class="stat-trend">▲ +8.4% vs LY</div>
        </div>
        <div class="stat-card blue">
          <div class="stat-label">Yield / Hectare</div>
          <div class="stat-number">24,851 kg/ha</div>
          <div class="stat-trend">Top quartile</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Plucker Avg</div>
          <div class="stat-number">26.84 kg</div>
          <div class="stat-trend">+2.84 kg task</div>
        </div>
        <div class="stat-card blue">
          <div class="stat-label">Factory CTC</div>
          <div class="stat-number">22.80%</div>
          <div class="stat-trend">Optimal outturn</div>
        </div>
      </div>

      <div class="charts-deck">
        <div class="chart-box">
          <div class="chart-head">
            <div>
              <h3>Section Plucker Productivity</h3>
              <span>Green leaf per plucker / day (Task: 24 kg)</span>
            </div>
            <span style="color: #059669; font-weight: 800; font-size: 12px;">✓ 10 Sections</span>
          </div>
          <div class="bar-list">
            <div class="bar-row">
              <div class="bar-title-row">
                <span>Section 12 (North Div)</span>
                <span style="color: #059669;">27.8 kg (116%)</span>
              </div>
              <div class="bar-rail">
                <div class="bar-prog" style="width: 88%;"></div>
              </div>
            </div>
            <div class="bar-row">
              <div class="bar-title-row">
                <span>Section 08 (Central Div)</span>
                <span style="color: #059669;">28.0 kg (117%)</span>
              </div>
              <div class="bar-rail">
                <div class="bar-prog" style="width: 90%;"></div>
              </div>
            </div>
            <div class="bar-row">
              <div class="bar-title-row">
                <span>Section 04 (East Div)</span>
                <span style="color: #059669;">27.0 kg (112%)</span>
              </div>
              <div class="bar-rail">
                <div class="bar-prog" style="width: 84%;"></div>
              </div>
            </div>
            <div class="bar-row">
              <div class="bar-title-row">
                <span>Section 15 (South Div)</span>
                <span style="color: #0284c7;">25.4 kg (106%)</span>
              </div>
              <div class="bar-rail">
                <div class="bar-prog blue" style="width: 78%;"></div>
              </div>
            </div>
            <div class="bar-row">
              <div class="bar-title-row">
                <span>Section 02 (West Div)</span>
                <span style="color: #0284c7;">24.8 kg (103%)</span>
              </div>
              <div class="bar-rail">
                <div class="bar-prog blue" style="width: 74%;"></div>
              </div>
            </div>
            <div class="bar-row">
              <div class="bar-title-row">
                <span>Section 09 (River Div)</span>
                <span style="color: #059669;">26.2 kg (109%)</span>
              </div>
              <div class="bar-rail">
                <div class="bar-prog" style="width: 81%;"></div>
              </div>
            </div>
            <div class="bar-row">
              <div class="bar-title-row">
                <span>Section 11 (Hill Div)</span>
                <span style="color: #0284c7;">24.1 kg (100%)</span>
              </div>
              <div class="bar-rail">
                <div class="bar-prog blue" style="width: 70%;"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-box">
          <div class="chart-head">
            <div>
              <h3>Factory Intake &amp; CTC Outturn</h3>
              <span>Intake to packaging</span>
            </div>
          </div>
          <div class="fac-deck">
            <div class="fac-tile">
              <div class="fac-tile-label">Daily Leaf Intake</div>
              <div class="fac-tile-num">28,450 kg</div>
            </div>
            <div class="fac-tile">
              <div class="fac-tile-label">Made Tea CTC</div>
              <div class="fac-tile-num">6,486 kg</div>
            </div>
          </div>
          <div class="grade-box">
            <div class="grade-heading">Primary CTC Grade Breakdown</div>
            <div class="grade-entry">
              <span class="name">Broken Orange Pekoe (BOP)</span>
              <span class="val">2,075 kg (32%)</span>
            </div>
            <div class="grade-entry">
              <span class="name">Broken Pekoe (BP)</span>
              <span class="val">2,659 kg (41%)</span>
            </div>
            <div class="grade-entry">
              <span class="name">Orange Fannings (OF)</span>
              <span class="val">1,167 kg (18%)</span>
            </div>
            <div class="grade-entry">
              <span class="name">Pekoe Dust (PD / Dust)</span>
              <span class="val">585 kg (9%)</span>
            </div>
          </div>
          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 10px 14px; font-size: 12px; font-weight: 700; color: #047857;">
            ✓ Despatch: 120 Bags (4,200 kg) invoiced to Auction
          </div>
        </div>
      </div>
    </div>

    <div class="dash-footer">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span>Multi-Estate Group Rollup:</span>
        <div class="est-chips">
          <div class="est-chip active">Chapar (1.04M)</div>
          <div class="est-chip">Choibari (1.18M)</div>
          <div class="est-chip">Doolahat (942K)</div>
        </div>
      </div>
      <div style="color: #38bdf8;">Encrypted Read-Only Cloud Summaries</div>
    </div>
  </div>
</body>
</html>
"""
        page.set_content(html_dash)
        page.wait_for_load_state("networkidle")
        out_dash = os.path.join(ASSETS_DIR, "clean_dashboard_overview.png")
        page.screenshot(path=out_dash, type="png")
        print(f"Generated: {out_dash}")
        page.close()

        browser.close()

if __name__ == "__main__":
    generate_screenshots()
