import requests
import json
import os
import time
from pathlib import Path

# Configuration - UPDATE THESE
BREVO_API_KEY = os.getenv("BREVO_API_KEY", "YOUR_API_KEY_HERE")
LIST_ID = os.getenv("BREVO_LIST_ID", "YOUR_LIST_ID_HERE")

# Contact sources
CONTACT_FILES = [
    "/Users/g2m7/projects/scripts/extract_garden/data/tea_estate_contacts_v2.xlsx",
    "/Users/g2m7/projects/scripts/extract_garden/data/tea_estate_contacts.xlsx",
    "/Users/g2m7/projects/scripts/extract_garden/data/Tea Estates.xlsx",
    "/Users/g2m7/projects/scripts/extract_garden/data/Tea Estates number required.xlsx",
    "/Users/g2m7/projects/scripts/extract_garden/data/email assam.dooars teaestate.xlsx",
    "/Users/g2m7/projects/scripts/extract_garden/data/Grower_Details_Report_TINSUKIA_pdf823(1).xlsx",
    "/Users/g2m7/projects/scripts/extract_garden/data/test_gardens.csv",
]

def create_or_update_contact(email, name="", phone="", garden="", location="", source=""):
    """Add a single contact to Brevo"""
    
    url = "https://api.brevo.com/v3/contacts"
    
    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json"
    }
    
    attributes = {}
    if name:
        attributes["FIRSTNAME"] = name
    if phone:
        attributes["PHONE"] = phone
    if garden:
        attributes["GARDEN"] = garden
    if location:
        attributes["LOCATION"] = location
    if source:
        attributes["SOURCE"] = source
    
    payload = {
        "email": email,
        "attributes": attributes,
        "updateEnabled": True,
        "tags": ["gardensuite", "import-2026", "tea-estate"],
    }
    
    if LIST_ID and LIST_ID != "YOUR_LIST_ID_HERE":
        payload["listIds"] = [int(LIST_ID)]
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        
        if response.status_code == 204:
            return {"success": True, "message": "Created"}
        elif response.status_code == 400:
            data = response.json()
            if data.get("code") == "duplicate_parameter":
                return {"success": True, "message": "Already exists"}
            return {"success": False, "message": f"Error: {data}"}
        else:
            return {"success": False, "message": f"HTTP {response.status_code}"}
            
    except Exception as e:
        return {"success": False, "message": str(e)}


def upload_from_excel(filepath):
    """Read Excel and upload contacts to Brevo"""
    
    # You need to install openpyxl: pip install openpyxl pandas
    try:
        import pandas as pd
    except ImportError:
        print("Please install pandas and openpyxl:")
        print("pip install pandas openpyxl")
        return
    
    print(f"\nProcessing: {filepath}")
    
    try:
        df = pd.read_excel(filepath)
        print(f"Found {len(df)} rows")
        print(f"Columns: {list(df.columns)}")
        
        success_count = 0
        error_count = 0
        
        rows = df.to_dict('records')
        
        for idx, row in enumerate(rows):
            # Try to find email column
            email = None
            for col in df.columns:
                if 'email' in col.lower() or 'e-mail' in col.lower():
                    val = str(row[col]).strip()
                    if val and val != 'nan' and '@' in val:
                        email = val
                        break
            
            if not email:
                continue
            
            # Try to find name
            name = ""
            for col in df.columns:
                if 'name' in col.lower() and 'garden' not in col.lower():
                    val = str(row[col]).strip()
                    if val and val != 'nan':
                        name = val
                        break
            
            # Try to find phone
            phone = ""
            for col in df.columns:
                if 'phone' in col.lower() or 'mobile' in col.lower() or 'contact' in col.lower():
                    val = str(row[col]).strip()
                    if val and val != 'nan':
                        phone = val
                        break
            
            # Try to find garden name
            garden = ""
            for col in df.columns:
                if 'estate' in col.lower() or 'garden' in col.lower():
                    val = str(row[col]).strip()
                    if val and val != 'nan':
                        garden = val
                        break
            
            result = create_or_update_contact(
                email=email,
                name=name,
                phone=phone,
                garden=garden,
                source=Path(filepath).name
            )
            
            if result["success"]:
                success_count += 1
            else:
                error_count += 1
            
            # Rate limiting - be nice to Brevo API
            time.sleep(0.5)
            
            # Progress
            row_num = int(idx) + 1
            if row_num % 10 == 0:
                print(f"  Processed {row_num}/{len(df)} | Success: {success_count} | Errors: {error_count}")
        
        print(f"Done! Success: {success_count} | Errors: {error_count}")
        
    except Exception as e:
        print(f"Error processing file: {e}")


def main():
    print("="*60)
    print("GardenSuite Brevo Contact Upload")
    print("="*60)
    print(f"API Key: {'Set' if BREVO_API_KEY != 'YOUR_API_KEY_HERE' else 'NOT SET'}")
    print(f"List ID: {'Set' if LIST_ID != 'YOUR_LIST_ID_HERE' else 'NOT SET'}")
    print()
    
    if BREVO_API_KEY == "YOUR_API_KEY_HERE":
        print("ERROR: Please set BREVO_API_KEY environment variable")
        return
    
    # Process each file
    for filepath in CONTACT_FILES:
        if os.path.exists(filepath):
            upload_from_excel(filepath)
        else:
            print(f"File not found: {filepath}")
    
    print("\n" + "="*60)
    print("Upload complete!")
    print("="*60)


if __name__ == "__main__":
    main()
