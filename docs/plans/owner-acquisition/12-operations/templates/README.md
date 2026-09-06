# Private tracker templates

These CSV files contain headers only. Copy them into a restricted workbook or selected CRM before adding contact data. Do not use the documentation directory as a live prospect database.

## Setup

1. Select a restricted destination and record it in the operating notes accessible to the team.
2. Import each CSV as a separate tab and set the *_id fields as stable text values.
3. Reuse current pilot account IDs. Link contacts and activity; never create a new estate row for each channel.
4. Restrict editing to the responsible owner and maintain backups/version history.
5. Test one fictional account through resource request, optional sales permission, reply, stop and attempted re-import. Remove the test from business metrics.

## Files

- [accounts.csv](accounts.csv): estate identity, fit, source and pipeline.
- [contacts.csv](contacts.csv): contact identity, current relationship and verification.
- [activity.csv](activity.csv): chronological channel history and next action.
- [permissions.csv](permissions.csv): purpose/channel-specific requests and withdrawal.
- [suppression.csv](suppression.csv): persistent contact/account stops.
- [weekly-metrics.csv](weekly-metrics.csv): source-specific counts and costs.

## Rules and acceptance

Use ISO dates/timestamps and consistent channel/role values. Preserve first_source; record later touches in Activity. Unknown is not No. Store the exact consent-text version with an affirmative request. Never import a download as cold-campaign permission.

- [ ] All sheets join by account_id/contact_id where appropriate.
- [ ] Restricted access and backup are confirmed.
- [ ] Stop requests survive deduplication and re-import.
- [ ] No real contact information is saved under docs/plans.
