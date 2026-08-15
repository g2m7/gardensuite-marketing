import re

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GS Face - Smart Attendance &amp; Harvest Management for Tea Gardens</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <style>
    @page { size: A4 portrait; margin: 0; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --black: #000000;
      --near-black: #0a0a0a;
      --charcoal: #1d1d1f;
      --gray-700: #424245;
      --gray-500: #6e6e73;
      --gray-400: #86868b;
      --gray-200: #d2d2d7;
      --gray-100: #f5f5f7;
      --white: #fbfbfd;
      --pure-white: #ffffff;

      --green-deep: #1a3a15;
      --green-primary: #234b1d;
      --green-accent: #2d6a4f;
      --green-bright: #40916c;
      --green-light: #74c69d;
      --green-wash: #f0f7f0;

      --font: "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      --font-display: "Plus Jakarta Sans", "Inter", system-ui, sans-serif;
    }

    html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

    body {
      font-family: var(--font);
      background: #e8e8ed;
      color: var(--charcoal);
      font-size: 9pt;
      line-height: 1.5;
      padding-top: 42px;
    }

    /* ── Toolbar (screen only) ────────────────────────── */
    .toolbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: center; gap: 12px;
      padding: 10px 16px; background: rgba(0,0,0,0.92);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      color: var(--gray-400); font-size: 12px; font-weight: 500;
    }
    .toolbar button, .toolbar a.btn-link {
      background: var(--white); color: var(--charcoal);
      border: none; padding: 6px 14px; border-radius: 14px;
      font-size: 10pt; font-weight: 500; font-family: inherit;
      cursor: pointer; text-decoration: none;
    }
    .toolbar a.btn-link.btn-primary { background: var(--green-primary); color: var(--pure-white); }
    .toolbar button:hover, .toolbar a.btn-link:hover { transform: scale(1.02); }

    /* ── Page Shell ────────────────────────────────────── */
    .page {
      width: 210mm; height: 297mm; margin: 6mm auto;
      background: var(--pure-white); overflow: hidden; position: relative;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 8px 40px rgba(0,0,0,0.16);
      border-radius: 2px; page-break-after: always; page-break-inside: avoid;
    }
    .page--dark { background: var(--near-black); color: var(--pure-white); }
    .bg-green-deep { background: var(--green-deep) !important; }

    /* ── Reusable Layout ──────────────────────────────── */
    .content { height: 100%; display: flex; flex-direction: column; }
    .hdr { display: flex; align-items: center; justify-content: space-between; padding: 7mm 10mm 5mm; }
    .brand {
      display: flex; align-items: center; gap: 2.5mm;
      font-family: var(--font-display); font-weight: 800; font-size: 10pt;
      letter-spacing: -0.03em; color: var(--charcoal);
    }
    .brand--light { color: var(--pure-white); }
    .brand img { height: 5.5mm; width: auto; }
    .tag { font-size: 6.8pt; font-weight: 500; color: var(--gray-400); letter-spacing: 0.02em; }
    .tag--light { color: rgba(255,255,255,0.35); }
    .ftr {
      margin-top: auto; padding: 4mm 10mm 6mm; display: flex; justify-content: space-between;
      font-size: 6.4pt; color: var(--gray-400);
    }
    .ftr--light { color: rgba(255,255,255,0.28); }

    /* ── Shared typography ─────────────────────────────── */
    .eyebrow { font-size: 6.8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--green-accent); }
    .eyebrow--light { color: var(--green-light); }
    .headline {
      font-family: var(--font-display); font-size: 30pt; font-weight: 800;
      line-height: 0.98; letter-spacing: -0.04em; color: var(--charcoal); text-wrap: balance;
    }
    .headline--light { color: var(--pure-white); }
    .headline--xl { font-size: 38pt; }
    .lead { font-size: 10.5pt; font-weight: 400; line-height: 1.55; letter-spacing: -0.01em; color: var(--gray-500); }
    .lead--light { color: rgba(255,255,255,0.6); }

    .benefit-label { font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--green-accent); margin-bottom: 1mm; }
    .benefit-label--light { color: var(--green-light); }
    .benefit-text { font-size: 10pt; font-weight: 600; line-height: 1.35; letter-spacing: -0.02em; }
    .benefit-text--light { color: var(--pure-white); }

    .stat-big { font-family: var(--font-display); font-size: 28pt; font-weight: 900; letter-spacing: -0.04em; line-height: 1; }
    .stat-label { font-size: 6.5pt; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--gray-400); margin-top: 1mm; }

    /* ── Page 1 Cover ──────────────────────────────────── */
    .cover { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; position: relative; }
    .cover-copy { position: relative; z-index: 2; padding: 0 11mm 14mm; }
    .cover-stats { display: flex; gap: 9mm; margin-top: 9mm; padding-top: 5mm; border-top: 0.3mm solid rgba(255,255,255,0.12); }

    /* ── Products & Hero ───────────────────────────────── */
    .product-page { flex: 1; padding: 0 10mm; display: flex; flex-direction: column; gap: 4mm; justify-content: space-evenly; }
    .product-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; align-items: center; }
    .product-hero-copy { display: flex; flex-direction: column; gap: 3.5mm; }
    .product-hero--reverse { grid-template-columns: 1fr 1fr; }

    .product-img-frame {
      border-radius: 4mm; overflow: hidden;
      background: linear-gradient(145deg, #0d1f0a, #1a3a15);
      padding: 4mm;
    }
    .product-img-frame img { display: block; width: 100%; height: auto; border-radius: 2mm; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }

    .feature-bullets { list-style: none; display: flex; flex-direction: column; gap: 2.5mm; margin-top: 2mm; }
    .feature-bullets li { display: flex; align-items: flex-start; gap: 2.5mm; font-size: 8.5pt; color: var(--charcoal); line-height: 1.4; }
    .feature-bullets li strong { font-weight: 700; color: var(--charcoal); }
    .feature-bullets li i { font-size: 14pt; color: var(--green-primary); flex-shrink: 0; margin-top: 0.5mm; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
    .page--dark .feature-bullets li { color: rgba(255,255,255,0.8); }
    .page--dark .feature-bullets li strong { color: var(--pure-white); }
    .page--dark .feature-bullets li i { color: var(--green-light); filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); }

    /* ── Highlight Page ────────────────────────────────── */
    .highlight-page { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 0 14mm; }
    .highlight-stats { display: flex; gap: 12mm; justify-content: center; margin-top: 10mm; }

    /* ── Contact / Back Page ───────────────────────────── */
    .cta { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 14mm; gap: 5mm; }
    .contact-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; width: 100%; max-width: 160mm; margin-top: 8mm; }
    .contact-item { background: rgba(255,255,255,0.04); border: 0.3mm solid rgba(255,255,255,0.08); border-radius: 3mm; padding: 4.5mm 5mm; text-align: left; }
    .contact-item label { display: block; font-size: 6pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.28); margin-bottom: 1.5mm; }
    .contact-item span { font-size: 8.5pt; font-weight: 500; color: var(--pure-white); letter-spacing: -0.01em; }

    @media print {
      body { background: #fff; padding-top: 0; }
      .toolbar { display: none !important; }
      .page { margin: 0; box-shadow: none; border-radius: 0; }
    }
  </style>
</head>
<body>

  <!-- Toolbar -->
  <div class="toolbar no-print">
    <span>GS Face - Product Brochure</span>
    <span style="font-size: 10px; color: var(--gray-400);">Export: <code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Cmd+P > Save as PDF</code></span>
    <button onclick="window.print()" class="btn-link btn-primary">Download PDF</button>
  </div>

  <!-- PAGE 1: COVER -->
  <section class="page">
    <div class="content">
      <div class="hdr">
        <div class="brand"><img src="favicon.png" alt="GardenSuite" />GardenSuite</div>
        <div class="tag">v2.0 - Product Brochure</div>
      </div>

      <div class="cover" style="align-items: center; justify-content: center; text-align: center; padding: 18mm 15mm 0; flex: none;">
        <span class="eyebrow" style="margin-bottom: 6mm; display: block;">Tea Garden Solution</span>
        <h1 class="headline headline--xl" style="max-width: 170mm; margin: 0 auto 6mm; color: var(--charcoal);">GS Face</h1>
        <p class="lead" style="max-width: 140mm; margin: 0 auto; color: var(--gray-500);">Smart Attendance &amp; Harvest Management System designed exclusively for Tea Garden operations.</p>
        
        <div class="cover-stats" style="border-top: none; justify-content: center; margin-top: 10mm; padding-top: 0; gap: 12mm;">
          <div style="display: flex; align-items: center; gap: 2.5mm; font-size: 9pt; font-weight: 600; color: var(--charcoal);">
            <i class="ph-duotone ph-scan" style="font-size: 18pt; color: var(--green-primary); filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));"></i>
            Face Recognition
          </div>
          <div style="display: flex; align-items: center; gap: 2.5mm; font-size: 9pt; font-weight: 600; color: var(--charcoal);">
            <i class="ph-duotone ph-clock-counter-clockwise" style="font-size: 18pt; color: var(--green-primary); filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));"></i>
            Real-Time Tracking
          </div>
          <div style="display: flex; align-items: center; gap: 2.5mm; font-size: 9pt; font-weight: 600; color: var(--charcoal);">
            <i class="ph-duotone ph-wifi-slash" style="font-size: 18pt; color: var(--green-primary); filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));"></i>
            Offline Sync
          </div>
        </div>
      </div>

      <div style="flex: 1; margin: 12mm 15mm 8mm; border-radius: 6mm; overflow: hidden; background: var(--gray-100); position: relative; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
        <img src="https://z-cdn-media.chatglm.cn/files/1b83cc22-79f5-43dc-b403-ec01c848f1cf.jpeg?auth_key=1878245426-92e1f5ef7149449b942829ccb9781f09-0-e0e12f8ce9cf4f127537c42a0032a413" alt="Dashboard View" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>

      <div class="ftr">
        <span>GS Face System</span>
        <span>&copy; 2026 Sarbani Associates</span>
      </div>
    </div>
  </section>

  <!-- PAGE 2: GETTING STARTED -->
  <section class="page">
    <div class="content">
      <div class="hdr">
        <div class="brand"><img src="favicon.png" alt="GardenSuite" />GardenSuite</div>
        <div class="tag">02 / 08 - Getting Started</div>
      </div>

      <div class="product-page">
        <div class="product-hero">
          <div class="product-img-frame">
            <img src="https://z-cdn-media.chatglm.cn/files/b929795a-ab0a-44ee-811e-355fd68d6139.jpeg?auth_key=1878245426-22fc38019f0c4935855d93c8d9572022-0-12719f04b819477f4e6556d220acd3fa" alt="Login Screen" />
          </div>
          <div class="product-hero-copy">
            <div class="benefit-label">01. Authentication</div>
            <h3 class="headline" style="font-size: 24pt;">Secure Supervisor Login</h3>
            <p class="lead" style="font-size: 9.5pt;">A streamlined login portal ensuring only authorized supervisors access the system, protecting sensitive workforce data.</p>
            <ul class="feature-bullets">
              <li>
                <i class="ph-duotone ph-fingerprint"></i>
                <span><strong>Employee ID / Email</strong> - flexible login options for supervisors</span>
              </li>
              <li>
                <i class="ph-duotone ph-lock-key"></i>
                <span><strong>Password-protected</strong> with toggle visibility for ease of use</span>
              </li>
              <li>
                <i class="ph-duotone ph-shield-check"></i>
                <span><strong>Role-based access</strong> - dedicated Supervisor Portal</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="product-hero product-hero--reverse">
          <div class="product-hero-copy">
            <div class="benefit-label">02. Session Setup</div>
            <h3 class="headline" style="font-size: 24pt;">Smart Session Management</h3>
            <p class="lead" style="font-size: 9.5pt;">Quickly configure and launch work sessions tailored to your estate's sections and activities.</p>
            <ul class="feature-bullets">
              <li>
                <i class="ph-duotone ph-map-trifold"></i>
                <span><strong>Section selection</strong> - choose from synced estate sections</span>
              </li>
              <li>
                <i class="ph-duotone ph-list-checks"></i>
                <span><strong>Activity selection</strong> - 26+ activities like plucking, draining, fencing</span>
              </li>
              <li>
                <i class="ph-duotone ph-play-circle"></i>
                <span><strong>One-tap start</strong> - begin sessions instantly after configuration</span>
              </li>
            </ul>
          </div>
          <div class="product-img-frame">
            <img src="https://z-cdn-media.chatglm.cn/files/12c73043-9cb6-44f0-b261-738591aa2192.jpeg?auth_key=1878245426-fefbe9c7b42e4ab0b135bd0aa4ba4c4d-0-4333d03e3e6b91b65184626d765e4a48" alt="New Session" />
          </div>
        </div>
      </div>

      <div class="ftr">
        <span>GS Face - Product Brochure</span>
        <span>02</span>
      </div>
    </div>
  </section>

  <!-- PAGE 3: OPERATIONS (DARK) -->
  <section class="page page--dark">
    <div class="content">
      <div class="hdr">
        <div class="brand brand--light"><img src="icon-white.svg" alt="GardenSuite" />GardenSuite</div>
        <div class="tag tag--light">03 / 08 - Operations</div>
      </div>

      <div class="product-page">
        <div class="product-hero">
          <div class="product-img-frame">
            <img src="https://z-cdn-media.chatglm.cn/files/1b83cc22-79f5-43dc-b403-ec01c848f1cf.jpeg?auth_key=1878245426-92e1f5ef7149449b942829ccb9781f09-0-e0e12f8ce9cf4f127537c42a0032a413" alt="Dashboard" />
          </div>
          <div class="product-hero-copy">
            <div class="benefit-label benefit-label--light">03. Dashboard</div>
            <h3 class="headline headline--light" style="font-size: 24pt;">Real-Time Performance Overview</h3>
            <p class="lead lead--light" style="font-size: 9.5pt;">A comprehensive at-a-glance dashboard showing daily attendance, harvest weights, and quick navigation.</p>
            <ul class="feature-bullets">
              <li>
                <i class="ph-duotone ph-chart-line-up"></i>
                <span><strong>Today's Performance</strong> - live attendance count &amp; harvest kg</span>
              </li>
              <li>
                <i class="ph-duotone ph-lightning"></i>
                <span><strong>Quick Actions</strong> - instant access to History, Workers, and more</span>
              </li>
              <li>
                <i class="ph-duotone ph-clock"></i>
                <span><strong>Recent Activity</strong> - track the latest session events at a glance</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="product-hero product-hero--reverse">
          <div class="product-hero-copy">
            <div class="benefit-label benefit-label--light">04. Attendance</div>
            <h3 class="headline headline--light" style="font-size: 24pt;">Active Session &amp; Attendance</h3>
            <p class="lead lead--light" style="font-size: 9.5pt;">Mark worker attendance in real-time during active field sessions with activity tracking.</p>
            <ul class="feature-bullets">
              <li>
                <i class="ph-duotone ph-timer"></i>
                <span><strong>Live session timer</strong> - track elapsed time for each session</span>
              </li>
              <li>
                <i class="ph-duotone ph-arrows-left-right"></i>
                <span><strong>Switch Activity</strong> - seamlessly change tasks mid-session</span>
              </li>
              <li>
                <i class="ph-duotone ph-check-circle"></i>
                <span><strong>One-tap attendance</strong> - Mark Attendance button for fast check-in</span>
              </li>
            </ul>
          </div>
          <div class="product-img-frame">
            <img src="https://z-cdn-media.chatglm.cn/files/59229636-a1b5-408d-b9cb-b337996534df.jpeg?auth_key=1878245426-4a67c481edfa42b2a716a0552f3126ca-0-6b62b952ebb11d81610e6b4d37fe03af" alt="Active Session" />
          </div>
        </div>
      </div>

      <div class="ftr ftr--light">
        <span>GS Face - Product Brochure</span>
        <span>03</span>
      </div>
    </div>
  </section>

  <!-- PAGE 4: HIGHLIGHT (GREEN) -->
  <section class="page page--dark bg-green-deep">
    <div class="content">
      <div class="hdr">
        <div class="brand brand--light"><img src="icon-white.svg" alt="GardenSuite" />GardenSuite</div>
        <div class="tag tag--light">04 / 08 - Highlight</div>
      </div>

      <div class="highlight-page">
        <div style="margin: 0 auto 6mm; color: var(--green-light);">
          <i class="ph-duotone ph-scan" style="font-size: 32pt; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));"></i>
        </div>
        <h2 class="headline headline--light headline--xl" style="margin-bottom: 5mm; color: var(--pure-white);">AI-Powered Face Recognition</h2>
        <p class="lead lead--light" style="max-width: 140mm; margin: 0 auto;">Instantly identify and verify workers with cutting-edge facial recognition technology - no ID cards, no buddy punching, no fraud.</p>
        
        <div class="highlight-stats">
          <div style="text-align: center;">
            <div class="stat-big" style="color: var(--green-light);">&lt;2s</div>
            <div class="stat-label" style="color: rgba(255,255,255,0.5);">Recognition Speed</div>
          </div>
          <div style="text-align: center;">
            <div class="stat-big" style="color: var(--green-light);">99.5%</div>
            <div class="stat-label" style="color: rgba(255,255,255,0.5);">Accuracy Rate</div>
          </div>
          <div style="text-align: center;">
            <div class="stat-big" style="color: var(--green-light);">0</div>
            <div class="stat-label" style="color: rgba(255,255,255,0.5);">ID Cards Needed</div>
          </div>
        </div>
      </div>

      <div class="ftr ftr--light">
        <span>GS Face - Product Brochure</span>
        <span>04</span>
      </div>
    </div>
  </section>

  <!-- PAGE 5: HARVEST MANAGEMENT -->
  <section class="page">
    <div class="content">
      <div class="hdr">
        <div class="brand"><img src="favicon.png" alt="GardenSuite" />GardenSuite</div>
        <div class="tag">05 / 08 - Harvest Management</div>
      </div>

      <div class="product-page">
        <div class="product-hero">
          <div class="product-img-frame">
            <img src="https://z-cdn-media.chatglm.cn/files/30c7be7c-d6fa-403c-8321-e07eb28febdf.jpeg?auth_key=1878245426-d3c5bad5de80457a8ed5479edf0e1089-0-ba3c0770612d6f908a24b0e7a2a22cfe" alt="Harvest Mode" />
          </div>
          <div class="product-hero-copy">
            <div class="benefit-label">05. Harvest Mode</div>
            <h3 class="headline" style="font-size: 24pt;">Integrated Harvest Tracking</h3>
            <p class="lead" style="font-size: 9.5pt;">Capture weights and verify workers during harvest sessions with BLE scale integration or manual entry.</p>
            <ul class="feature-bullets">
              <li>
                <i class="ph-duotone ph-scales"></i>
                <span><strong>BLE scale connection</strong> - auto-capture weights via Bluetooth</span>
              </li>
              <li>
                <i class="ph-duotone ph-percent"></i>
                <span><strong>Section &amp; deduction tracking</strong> - monitor area and % deductions</span>
              </li>
              <li>
                <i class="ph-duotone ph-notebook"></i>
                <span><strong>Session records</strong> - all harvests logged per active session</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="product-hero product-hero--reverse">
          <div class="product-hero-copy">
            <div class="benefit-label">06. Weight &amp; Verify</div>
            <h3 class="headline" style="font-size: 24pt;">Capture Weight &amp; Scan Face</h3>
            <p class="lead" style="font-size: 9.5pt;">Seamless workflow from weight capture to face verification, linking every harvest to an authenticated worker.</p>
            <ul class="feature-bullets">
              <li>
                <i class="ph-duotone ph-keyboard"></i>
                <span><strong>Manual weight entry</strong> - fallback when scale is unavailable</span>
              </li>
              <li>
                <i class="ph-duotone ph-bluetooth-connected"></i>
                <span><strong>Scale reconnect</strong> - one-tap Bluetooth reconnection</span>
              </li>
              <li>
                <i class="ph-duotone ph-scan"></i>
                <span><strong>Next: Scan Face</strong> - identity verification after each capture</span>
              </li>
            </ul>
          </div>
          <div class="product-img-frame">
            <img src="https://z-cdn-media.chatglm.cn/files/f86c6370-77e6-4197-8961-254f3cc03cdf.jpeg?auth_key=1878245426-4cd8c30aee15400384ab0d89392fda97-0-585f6646ab11a3af93ec43918eb7c70a" alt="Weight Capture" />
          </div>
        </div>
      </div>

      <div class="ftr">
        <span>GS Face - Product Brochure</span>
        <span>05</span>
      </div>
    </div>
  </section>

  <!-- PAGE 6: IDENTITY & WORKFORCE (DARK) -->
  <section class="page page--dark">
    <div class="content">
      <div class="hdr">
        <div class="brand brand--light"><img src="icon-white.svg" alt="GardenSuite" />GardenSuite</div>
        <div class="tag tag--light">06 / 08 - Identity &amp; Workforce</div>
      </div>

      <div class="product-page">
        <div class="product-hero">
          <div class="product-img-frame">
            <img src="https://z-cdn-media.chatglm.cn/files/7232d5a9-fd2e-431f-a463-048d5ff5bf33.jpeg?auth_key=1878245426-563f8055927149ce80259e0cada1fef2-0-43710ec49b274d7985c2c54b0bb36f3e" alt="Face Recognition" />
          </div>
          <div class="product-hero-copy">
            <div class="benefit-label benefit-label--light">07. Recognition</div>
            <h3 class="headline headline--light" style="font-size: 24pt;">Live Face Detection &amp; Match</h3>
            <p class="lead lead--light" style="font-size: 9.5pt;">Real-time face detection with on-screen guidance ensures accurate recognition even in field conditions.</p>
            <ul class="feature-bullets">
              <li>
                <i class="ph-duotone ph-chat-centered-text"></i>
                <span><strong>Real-time feedback</strong> - &quot;Move closer&quot; guidance prompts</span>
              </li>
              <li>
                <i class="ph-duotone ph-target"></i>
                <span><strong>Confidence scoring</strong> - match quality indicator on-screen</span>
              </li>
              <li>
                <i class="ph-duotone ph-shield-warning"></i>
                <span><strong>Anti-spoofing</strong> - prevents proxy attendance fraud</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="product-hero product-hero--reverse">
          <div class="product-hero-copy">
            <div class="benefit-label benefit-label--light">08. Directory</div>
            <h3 class="headline headline--light" style="font-size: 24pt;">Workers Directory</h3>
            <p class="lead lead--light" style="font-size: 9.5pt;">Complete workforce directory with enrollment status tracking and actionable alerts for unenrolled workers.</p>
            <ul class="feature-bullets">
              <li>
                <i class="ph-duotone ph-funnel"></i>
                <span><strong>Enrollment filters</strong> - All / Enrolled / Unenrolled views</span>
              </li>
              <li>
                <i class="ph-duotone ph-warning-circle"></i>
                <span><strong>Action alerts</strong> - red flags for unenrolled workers needing setup</span>
              </li>
              <li>
                <i class="ph-duotone ph-magnifying-glass"></i>
                <span><strong>Search &amp; browse</strong> - find any worker by name or ID instantly</span>
              </li>
            </ul>
          </div>
          <div class="product-img-frame">
            <img src="https://z-cdn-media.chatglm.cn/files/d74f740b-6d77-41b8-b78f-53cbf687906a.jpeg?auth_key=1878245426-89fc435e80d845d3bea9fd6f8ec7a578-0-23f2194663c9bf50c3cb45509f954f6c" alt="Workers Directory" />
          </div>
        </div>
      </div>

      <div class="ftr ftr--light">
        <span>GS Face - Product Brochure</span>
        <span>06</span>
      </div>
    </div>
  </section>

  <!-- PAGE 7: SYSTEM & SYNC -->
  <section class="page">
    <div class="content">
      <div class="hdr">
        <div class="brand"><img src="favicon.png" alt="GardenSuite" />GardenSuite</div>
        <div class="tag">07 / 08 - System &amp; Sync</div>
      </div>

      <div class="product-page">
        <div class="product-hero">
          <div class="product-img-frame">
            <img src="https://z-cdn-media.chatglm.cn/files/02a1f113-f4c6-4ba0-a7ad-17d18003ccc7.jpeg?auth_key=1878245426-3a9ebbf6d1a247609f1c777289b125ec-0-86226480707a9aa5135447ba06b79820" alt="Data Sync" />
          </div>
          <div class="product-hero-copy">
            <div class="benefit-label">09. Data Sync</div>
            <h3 class="headline" style="font-size: 24pt;">Offline-First Cloud Sync</h3>
            <p class="lead" style="font-size: 9.5pt;">Work uninterrupted in remote tea gardens - data syncs automatically when connectivity returns.</p>
            <ul class="feature-bullets">
              <li>
                <i class="ph-duotone ph-arrows-clockwise"></i>
                <span><strong>Auto-sync</strong> - configurable intervals (every 5 minutes)</span>
              </li>
              <li>
                <i class="ph-duotone ph-database"></i>
                <span><strong>Record-level tracking</strong> - sessions, harvests, punches queued</span>
              </li>
              <li>
                <i class="ph-duotone ph-cloud-arrow-up"></i>
                <span><strong>One-tap Sync Now</strong> - manual push when connected</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="product-hero product-hero--reverse">
          <div class="product-hero-copy">
            <div class="benefit-label">10. Configuration</div>
            <h3 class="headline" style="font-size: 24pt;">System Configuration</h3>
            <p class="lead" style="font-size: 9.5pt;">Centralized device management, licensing, and feature configuration for complete administrative control.</p>
            <ul class="feature-bullets">
              <li>
                <i class="ph-duotone ph-identification-card"></i>
                <span><strong>Device ID &amp; Estate mapping</strong> - identify and assign devices</span>
              </li>
              <li>
                <i class="ph-duotone ph-key"></i>
                <span><strong>Active license</strong> - API key management &amp; validation</span>
              </li>
              <li>
                <i class="ph-duotone ph-sliders"></i>
                <span><strong>Bluetooth, Cloud &amp; Data</strong> - all settings in one place</span>
              </li>
            </ul>
          </div>
          <div class="product-img-frame">
            <img src="https://z-cdn-media.chatglm.cn/files/308accf0-3f1e-4511-821f-fa23a5d4ebc6.jpeg?auth_key=1878245426-1b748d2ae0a1450498fb15a0fa102d81-0-97a3c27a956ca7fd7f1fc468a6c89ed0" alt="System Config" />
          </div>
        </div>
      </div>

      <div class="ftr">
        <span>GS Face - Product Brochure</span>
        <span>07</span>
      </div>
    </div>
  </section>

  <!-- PAGE 8: BACK COVER (DARK) -->
  <section class="page page--dark bg-near-black">
    <div class="content">
      <div class="hdr">
        <div class="brand brand--light"><img src="icon-white.svg" alt="GardenSuite" />GardenSuite</div>
        <div class="tag tag--light">08 / 08 - Contact</div>
      </div>

      <div class="cta" style="background: var(--near-black);">
        <div style="background: rgba(255,255,255,0.04); border: 0.3mm solid rgba(255,255,255,0.08); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <img class="cta-logo" src="icon-white.svg" alt="" width="48" height="48" style="opacity: 1; margin: 0;" />
        </div>
        <h2 class="headline headline--light headline--xl" style="margin-bottom: 4mm;">GS Face</h2>
        <p class="lead lead--light" style="margin-bottom: 12mm; max-width: 140mm;">Transforming tea garden workforce management with AI-powered face recognition, real-time harvest tracking, and seamless offline sync.</p>

        <div style="background: rgba(255,255,255,0.04); border: 0.3mm solid rgba(255,255,255,0.08); border-radius: 4mm; padding: 10mm; display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 140mm;">
          <div style="display: flex; gap: 8mm; justify-content: center; width: 100%; margin-bottom: 10mm;">
             <div style="flex: 1; text-align: center;">
               <i class="ph-duotone ph-phone" style="font-size: 24pt; color: var(--green-light); margin-bottom: 3mm; display: block;"></i>
               <div style="font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); margin-bottom: 2mm;">Call / WhatsApp</div>
               <div style="font-size: 13pt; font-weight: 700; color: var(--pure-white); letter-spacing: -0.02em;">+91 97341 01330</div>
             </div>

             <div style="width: 1px; background: rgba(255,255,255,0.08);"></div>

             <div style="flex: 1; text-align: center;">
               <i class="ph-duotone ph-envelope-simple" style="font-size: 24pt; color: var(--green-light); margin-bottom: 3mm; display: block;"></i>
               <div style="font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); margin-bottom: 2mm;">Email</div>
               <div style="font-size: 11pt; font-weight: 600; color: var(--pure-white); letter-spacing: -0.01em;">sarbaniassociates@gmail.com</div>
             </div>
          </div>

          <a href="https://gardensuite.in" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; background: var(--green-primary); color: var(--pure-white); padding: 4mm 14mm; border-radius: 6mm; text-decoration: none; font-size: 10.5pt; font-weight: 600; letter-spacing: -0.01em; transition: transform 0.2s; box-shadow: 0 4px 12px rgba(35, 75, 29, 0.3);">
            Visit gardensuite.in
            <i class="ph-bold ph-arrow-right" style="margin-left: 2mm;"></i>
          </a>
        </div>

        <div class="cta-company" style="margin-top: 15mm; font-size: 7pt; font-weight: 500; color: rgba(255,255,255,0.2); letter-spacing: 0.05em;">
          Built and maintained by Sarbani Associates, Bagdogra, Siliguri
        </div>
      </div>

      <div class="ftr ftr--light">
        <span>GS Face System</span>
        <span>&copy; 2026 Sarbani Associates</span>
      </div>
    </div>
  </section>

</body>
</html>
"""

with open("attendance-brochure.html", "w") as f:
    f.write(html_content)
