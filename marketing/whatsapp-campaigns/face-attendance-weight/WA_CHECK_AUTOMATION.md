# WhatsApp Number Check Workflow

This workflow checks whether tracker numbers appear usable on WhatsApp without changing the workbook directly during the browser run.

## Safety Rules

- Default batch size is 25.
- Hard cap is 50 numbers per run.
- Minimum delay is 8 seconds between checks.
- Browser check writes a CSV only.
- Workbook is updated only when you run the apply script.
- `No WhatsApp` results are moved to `Hold`, `Priority = Hold`, `Final Outcome = Disqualified`, and `Next Action = Do not send`.

## First Run

Run a dry run first:

```powershell
powershell -ExecutionPolicy Bypass -File .\check-wa-batch.ps1 -DryRun -Limit 5
```

Then run the browser check:

```powershell
powershell -ExecutionPolicy Bypass -File .\check-wa-batch.ps1 -Limit 25
```

A Chromium browser opens using this profile:

```text
marketing/whatsapp-campaigns/face-attendance-weight/.wa-check-browser-profile
```

If WhatsApp asks for login, scan the QR code and rerun the same command.

## Apply Results

Review the generated CSV in:

```text
marketing/whatsapp-campaigns/face-attendance-weight/wa-check-results/
```

Then apply:

```powershell
powershell -ExecutionPolicy Bypass -File .\apply-wa-check-results.ps1 -ResultsCsv .\wa-check-results\wa_check_results_YYYYMMDD_HHMMSS.csv
```

The apply step creates its own backup before editing the workbook.
