# September 2026 Pilot Automation

This folder is the canonical working area for the 20-estate Dibrugarh and Tinsukia pilot.

## Files

- `prospects.csv` - research, qualification, verification, suppression, and approval source
- `snov-import.csv` - generated allowlist for Snov.io; do not edit by hand
- `daily-status.md` - generated or updated by the daily readiness loop

## Commands

Check every row and print blockers:

```sh
node scripts/outreach/pilot_pipeline.mjs check
```

Export only fully eligible rows:

```sh
node scripts/outreach/pilot_pipeline.mjs export
```

The export refuses more than 20 eligible rows. A row is not exported until account fit, contact role, Snov `Valid` status, suppression, and owner approval all pass.

Snov.io automated warm-up and campaign activity remain external system actions. The local pipeline prepares and validates the allowlist but never sends an email.
