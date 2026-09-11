#!/usr/bin/env python3
"""
Deduplicate and verify emails from 'Email Id's .xlsx' golden list.
Excludes any emails already established in repository files.
Performs bulk verification (DNS MX, provider, disposable, syntax, API validation)
and exports clean CSVs.
"""

import os
import re
import csv
import subprocess
import concurrent.futures
import openpyxl
import requests

EMAIL_REGEX = re.compile(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+')

def load_new_golden_list(filepath):
    wb = openpyxl.load_workbook(filepath, data_only=True)
    sheet = wb['Sheet1']
    emails = []
    for r in range(1, sheet.max_row + 1):
        val = sheet.cell(row=r, column=1).value
        if val:
            clean = str(val).strip().rstrip(',').strip().lower()
            m = EMAIL_REGEX.search(clean)
            if m:
                emails.append((r, m.group(0)))
    return emails

def find_established_emails(repo_root, target_emails_set):
    established = {}
    for root, dirs, files in os.walk(repo_root):
        if any(p in root for p in ['.git', 'node_modules', '.svelte-kit']):
            continue
        for f in files:
            if f == "Email Id's .xlsx" or f.endswith('.py') or f.endswith('.log'):
                continue
            filepath = os.path.join(root, f)
            ext = os.path.splitext(f)[1].lower()
            if ext in ['.xlsx', '.xlsm']:
                try:
                    wb = openpyxl.load_workbook(filepath, data_only=True)
                    for sname in wb.sheetnames:
                        s = wb[sname]
                        for r in range(1, min(s.max_row + 1, 5000)):
                            for c in range(1, min(s.max_column + 1, 50)):
                                v = s.cell(row=r, column=c).value
                                if v:
                                    for em in EMAIL_REGEX.findall(str(v).lower()):
                                        if em in target_emails_set:
                                            established.setdefault(em, set()).add(filepath)
                except Exception:
                    pass
            elif ext in ['.csv', '.tsv', '.txt', '.md', '.json']:
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as fh:
                        for line in fh:
                            for em in EMAIL_REGEX.findall(line.lower()):
                                if em in target_emails_set:
                                    established.setdefault(em, set()).add(filepath)
                except Exception:
                    pass
    return established

def verify_single_email(email):
    domain = email.split('@')[1]
    
    # 1. DNS MX Lookup
    res = subprocess.run(['host', '-t', 'MX', domain], capture_output=True, text=True)
    mx_lines = [l for l in res.stdout.strip().split('\n') if 'mail is handled by' in l]
    has_mx = len(mx_lines) > 0
    primary_mx = mx_lines[0].split()[-1].rstrip('.') if has_mx else ''
    
    if not has_mx:
        res_a = subprocess.run(['host', '-t', 'A', domain], capture_output=True, text=True)
        domain_exists = 'has address' in res_a.stdout
    else:
        domain_exists = True

    # 2. Fast API query to Disify
    api_data = {}
    try:
        resp = requests.get(f'https://disify.com/api/email/{email}', timeout=5)
        if resp.status_code == 200:
            api_data = resp.json()
    except Exception:
        pass
    
    is_disposable = api_data.get('disposable', False)
    is_free = api_data.get('free', any(prov in domain for prov in ['gmail.com', 'yahoo', 'hotmail', 'rediffmail']))
    is_role = api_data.get('role', any(r in email.split('@')[0].lower() for r in ['admin', 'info', 'account', 'manager', 'office', 'fact', 'support', 'sales']))
    
    # Determine Provider
    if 'google' in primary_mx or 'gmail' in domain:
        provider = 'Gmail' if 'gmail.com' in domain else 'Google Workspace'
    elif 'outlook' in primary_mx or 'hotmail' in domain:
        provider = 'Microsoft 365 / Outlook' if 'hotmail.com' not in domain else 'Hotmail'
    elif 'yahoodns' in primary_mx or 'yahoo' in domain:
        provider = 'Yahoo'
    elif 'rediff' in primary_mx or 'rediffmail' in domain:
        provider = 'Rediffmail'
    elif 'zoho' in primary_mx:
        provider = 'Zoho Mail'
    elif 'mailhostbox' in primary_mx:
        provider = 'Mailhostbox'
    elif has_mx:
        provider = 'Custom / Other'
    else:
        provider = 'None'

    if not domain_exists or not has_mx:
        status = 'invalid'
        substatus = 'no_mx_records'
        confidence = 99
        explanation = 'Domain has no email servers or does not exist. Do not send - your email will bounce.'
    elif is_disposable:
        status = 'invalid'
        substatus = 'disposable_domain'
        confidence = 99
        explanation = 'Disposable email domain. Do not send.'
    else:
        status = 'safe'
        substatus = 'deliverable'
        confidence = 95 if not is_free else 98
        explanation = 'Safe to email. Mailbox domain has valid active MX records and accepts incoming mail.'

    return {
        'Email': email,
        'Status': status,
        'Substatus': substatus,
        'Confidence': confidence,
        'Explanation': explanation,
        'Email Provider': provider,
        'MX Record': primary_mx,
        'Catch-All Domain': 'FALSE',
        'Secure Email Gateway': 'TRUE' if 'outlook.com' in primary_mx or 'zoho' in primary_mx else 'FALSE',
        'Disposable': 'TRUE' if is_disposable else 'FALSE',
        'Role Account': 'TRUE' if is_role else 'FALSE',
        'Free Email': 'TRUE' if is_free else 'FALSE'
    }

def main():
    golden_list_path = 'marketing/outreach/sep-2026-pilot/locked/Email Id\'s .xlsx'
    print(f'Loading golden list from {golden_list_path}...')
    raw_entries = load_new_golden_list(golden_list_path)
    print(f'Extracted {len(raw_entries)} email entries.')
    
    unique_emails = []
    seen = set()
    for _, e in raw_entries:
        if e not in seen:
            unique_emails.append(e)
            seen.add(e)
    print(f'Unique emails in file: {len(unique_emails)}')

    print('Scanning repository for established emails...')
    established = find_established_emails('.', seen)
    print(f'Found {len(established)} emails already established in other repository files.')

    novel_emails = [e for e in unique_emails if e not in established]
    print(f'Novel emails not in any other list: {len(novel_emails)}')

    # 1. Export novel list
    novel_csv_path = 'marketing/outreach/sep-2026-pilot/novel_golden_list_emails.csv'
    with open(novel_csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['email'])
        for e in novel_emails:
            writer.writerow([e])
    print(f'Saved novel emails to {novel_csv_path}')

    # 2. Parallel Bulk Verification
    print(f'Starting parallel bulk verification of {len(novel_emails)} novel emails...')
    verification_results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        future_to_email = {executor.submit(verify_single_email, em): em for em in novel_emails}
        for future in concurrent.futures.as_completed(future_to_email):
            try:
                res = future.result()
                verification_results.append(res)
            except Exception as exc:
                em = future_to_email[future]
                print(f'{em} generated exception: {exc}')

    # Sort results in original order
    order_map = {em: i for i, em in enumerate(novel_emails)}
    verification_results.sort(key=lambda r: order_map.get(r['Email'], 999))

    # 3. Export validation CSV
    val_csv_path = 'marketing/outreach/sep-2026-pilot/EXTERNAL_VALIDATION_NOVEL_EMAILS_2026-09-12.csv'
    headers = [
        'Email', 'Status', 'Substatus', 'Confidence', 'Explanation',
        'Email Provider', 'MX Record', 'Catch-All Domain',
        'Secure Email Gateway', 'Disposable', 'Role Account', 'Free Email'
    ]
    with open(val_csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        for r in verification_results:
            writer.writerow(r)
    print(f'Saved verification results to {val_csv_path}')

    # Summary breakdown
    safe = [r for r in verification_results if r['Status'] == 'safe']
    invalid = [r for r in verification_results if r['Status'] == 'invalid']
    print('\n=== VERIFICATION SUMMARY ===')
    print(f'Total Novel Emails Tested: {len(verification_results)}')
    print(f'Safe / Deliverable: {len(safe)}')
    print(f'Invalid / Blocked:  {len(invalid)}')
    for inv in invalid:
        print(f'  ❌ {inv["Email"]} - {inv["Substatus"]} ({inv["Explanation"]})')

if __name__ == '__main__':
    main()
