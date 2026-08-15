const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Base Paths
const projectDir = path.resolve(__dirname, '..');
const templatesDir = path.resolve(projectDir, 'scripts', 'pricing_templates');
const assetsDir = path.resolve(templatesDir, 'assets');

// Cross Repository Paths
const crossDir = path.resolve(projectDir, '..', 'cross', 'gs_face');
const webDir = path.resolve(projectDir, '..', 'web', 'gs_web');

// Screen mapping: Source path -> Target filename in assets/
const screenshotMap = {
    // Module 1: Dashboard settings
    [path.join(webDir, 'docs', 'webapp-testing-audit-assets', 'desktop-settings-config.png')]: 'desktop-settings-config.png',
    
    // Module 2: Sync Settings
    [path.join(crossDir, 'screenshots', 'v2', 'settings', '32_settings_sync_status.png')]: '32_settings_sync_status.png',
    
    // Module 3: Face Enrollment
    [path.join(crossDir, 'screenshots', 'v2', 'enrollment', '22_enrollment_worker_ready.png')]: '22_enrollment_worker_ready.png',
    [path.join(crossDir, 'screenshots', 'v2', 'enrollment', '23_enrollment_capture.png')]: '23_enrollment_capture.png',
    
    // Module 4: Database Settings / Main Settings
    [path.join(crossDir, 'screenshots', 'v2', 'settings', '28_settings_main.png')]: '28_settings_main.png',
    
    // Module 5: Attendance Captures (Harvest & Punch)
    [path.join(crossDir, 'screenshots', 'v2', 'attendance', '14_attendance_capture.png')]: '14_attendance_capture.png',
    [path.join(crossDir, 'screenshots', 'v2', 'punch', '16_punch_capture.png')]: '16_punch_capture.png',
    
    // Module 6: Session Empty State
    [path.join(crossDir, 'screenshots', 'v2', 'session', '10_active_session_empty.png')]: '10_active_session_empty.png',
    
    // Module 8: Dashboard Attendance
    [path.join(webDir, 'docs', 'webapp-testing-audit-assets', 'desktop-attendance.png')]: 'desktop-attendance.png',
    
    // Module 9: Dashboard Reports
    [path.join(webDir, 'docs', 'webapp-testing-audit-assets', 'desktop-reports.png')]: 'desktop-reports.png'
};

function setupAssets() {
    console.log('--- Setting up Assets ---');
    if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
        console.log(`Created assets directory: ${assetsDir}`);
    }

    let successCount = 0;
    for (const [src, destName] of Object.entries(screenshotMap)) {
        const dest = path.join(assetsDir, destName);
        if (fs.existsSync(src)) {
            console.log(`Copying: ${path.basename(src)} -> ${destName}`);
            fs.copyFileSync(src, dest);
            successCount++;
        } else {
            console.warn(`WARNING: Screenshot not found at source: ${src}`);
        }
    }
    console.log(`Assets setup complete: Copied ${successCount}/${Object.keys(screenshotMap).length} screenshots.\n`);
}

async function compilePDF() {
    console.log('--- Compiling SOP PDF via Playwright ---');
    const htmlPath = path.join(templatesDir, 'sop_template.html');
    const outputDir = path.join(projectDir, 'deliverables', 'generated', 'offers');
    const outputPath = path.join(outputDir, 'GardenSuite_GS_Face_SOP_Training_Manual.pdf');

    if (!fs.existsSync(htmlPath)) {
        console.error(`ERROR: HTML template not found at ${htmlPath}`);
        process.exit(1);
    }

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`Created output directory: ${outputDir}`);
    }

    console.log('Launching headless Chromium browser...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Convert file path to file:// URL
    const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
    console.log(`Loading HTML template: ${fileUrl}`);
    
    await page.goto(fileUrl);
    // Wait for images to load completely
    await page.waitForLoadState('networkidle');
    console.log('HTML content loaded successfully.');

    console.log(`Generating PDF at: ${outputPath}`);
    await page.pdf({
        path: outputPath,
        preferCSSPageSize: true, // Respect the @page rule defined in the CSS
        printBackground: true,   // Print background colors/images
    });

    console.log('PDF compilation complete.');
    await browser.close();
    console.log('--- Success! PDF is ready. ---');
}

async function main() {
    try {
        setupAssets();
        await compilePDF();
        process.exit(0);
    } catch (error) {
        console.error('Fatal error during PDF generation:', error);
        process.exit(1);
    }
}

main();
