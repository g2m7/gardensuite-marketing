#!/usr/bin/env python3
"""
GardenSuite GS Face SOP & Training Manual PDF Generator
Copies screenshots from various repository subfolders, resolves local paths, and uses WeasyPrint to build a premium PDF document.
"""

import os
import sys
import shutil
from pathlib import Path

# Try to import weasyprint
try:
    from weasyprint import HTML
except ImportError:
    print("ERROR: weasyprint package is not installed in this Python environment.")
    print("Please install it by running: pip install weasyprint")
    sys.exit(1)

# Base Paths
SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_DIR = SCRIPT_DIR.parent.resolve()
TEMPLATES_DIR = SCRIPT_DIR / "pricing_templates"
ASSETS_DIR = TEMPLATES_DIR / "assets"

# Repositories (relative to the parent of gardensuite.in)
CROSS_DIR = PROJECT_DIR.parent / "cross" / "gs_face"
WEB_DIR = PROJECT_DIR.parent / "web" / "gs_web"

# Screenshot Mappings (Source -> Destination name in assets/)
SCREENSHOT_MAP = {
    # Dashboard master config (Module 1)
    WEB_DIR / "docs" / "webapp-testing-audit-assets" / "desktop-settings-config.png": "desktop-settings-config.png",
    
    # Sync settings (Module 2, Module 7)
    CROSS_DIR / "screenshots" / "v2" / "settings" / "32_settings_sync_status.png": "32_settings_sync_status.png",
    
    # Enrollment screens (Module 3)
    CROSS_DIR / "screenshots" / "v2" / "enrollment" / "22_enrollment_worker_ready.png": "22_enrollment_worker_ready.png",
    CROSS_DIR / "screenshots" / "v2" / "enrollment" / "23_enrollment_capture.png": "23_enrollment_capture.png",
    
    # Main settings / database export (Module 4)
    CROSS_DIR / "screenshots" / "v2" / "settings" / "28_settings_main.png": "28_settings_main.png",
    
    # Attendance captures (Module 5)
    CROSS_DIR / "screenshots" / "v2" / "attendance" / "14_attendance_capture.png": "14_attendance_capture.png",
    CROSS_DIR / "screenshots" / "v2" / "punch" / "16_punch_capture.png": "16_punch_capture.png",
    
    # Session / Offline empty state (Module 6)
    CROSS_DIR / "screenshots" / "v2" / "session" / "10_active_session_empty.png": "10_active_session_empty.png",
    
    # Dashboard attendance verification (Module 8)
    WEB_DIR / "docs" / "webapp-testing-audit-assets" / "desktop-attendance.png": "desktop-attendance.png",
    
    # Dashboard reports (Module 9)
    WEB_DIR / "docs" / "webapp-testing-audit-assets" / "desktop-reports.png": "desktop-reports.png",
}

def setup_assets():
    """Create assets directory and copy screenshots from their source locations."""
    print("Setting up assets directory...")
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    
    success_count = 0
    for src_path, dest_name in SCREENSHOT_MAP.items():
        dest_path = ASSETS_DIR / dest_name
        if src_path.exists():
            print(f"Copying: {src_path.name} -> {dest_name}")
            shutil.copy2(src_path, dest_path)
            success_count += 1
        else:
            print(f"WARNING: Source screenshot not found: {src_path}")
            # Try to find a fallback image in the project
            fallback_in_project = PROJECT_DIR / "assets" / "source" / "product-screenshots" / src_path.name
            if fallback_in_project.exists():
                print(f"Using project fallback for: {src_path.name}")
                shutil.copy2(fallback_in_project, dest_path)
                success_count += 1
            else:
                print(f"ERROR: No fallback found for: {src_path.name}")
                
    print(f"Assets setup complete. Successfully copied {success_count}/{len(SCREENSHOT_MAP)} screenshots.")

def generate_pdf():
    """Compile the HTML template using WeasyPrint into a premium PDF."""
    html_template_path = TEMPLATES_DIR / "sop_template.html"
    output_dir = PROJECT_DIR / "deliverables" / "generated" / "offers"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_pdf_path = output_dir / "GardenSuite_GS_Face_SOP_Training_Manual.pdf"
    
    if not html_template_path.exists():
        print(f"ERROR: HTML template not found at {html_template_path}")
        sys.exit(1)
        
    print(f"Compiling template: {html_template_path}")
    print("Writing PDF to: ", output_pdf_path)
    
    try:
        # WeasyPrint compiles the HTML and resolves all relative image paths with respect to the HTML file location
        html = HTML(filename=str(html_template_path))
        html.write_pdf(str(output_pdf_path))
        print("SUCCESS: PDF compiled successfully.")
        return True
    except Exception as e:
        print(f"ERROR during PDF compilation: {e}")
        return False

if __name__ == "__main__":
    print("=== GardenSuite GS Face & Dashboard SOP PDF Generator ===")
    setup_assets()
    success = generate_pdf()
    if success:
        print("Manual generated successfully!")
        sys.exit(0)
    else:
        print("Failed to generate manual.")
        sys.exit(1)
