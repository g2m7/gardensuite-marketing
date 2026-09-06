# Owner micro magnet

Priority: P1 | Owner: Kaushik; implementation by project maintainer | Estimate: half a day for content, one to two days for a small implementation after owner validation

## Goal

Create voluntary contact with estate owners by helping them identify what they can verify behind daily hazira. The first outcome is a useful report/checklist; the sales step is a separate choice.

## Offer

The Tea Garden Owner's 60-Second Hazira Check.

Five process questions, an immediate useful result, and an optional emailed owner report format. [Content and result rules](CONTENT.md) contains the complete first version.

The check is a self-assessment of reporting visibility. It is not a fraud audit, savings calculator, industry benchmark or proof of leakage. Test whether owners find the wording useful before building.

## Setup and flow

1. Show the owner-specific headline and a short explanation. Identify GardenSuite and Sarbani Associates and explain that they sell attendance/reporting software.
2. Ask five Yes / No / Not sure questions. Require no login, mobile number, payroll upload or worker details.
3. Show the relevant checks immediately. Show all material results; do not withhold a fabricated high-risk finding behind an email gate.
4. Offer the one-page owner report format by email. Ask email, role and estate/company name. Personal-domain email addresses are accepted. Name and district can be optional until qualification.
5. Leave the sales-follow-up checkbox unchecked. State exactly what additional messages are being requested.
6. On submission, confirm the delivery request, show a download/print option, and provide an optional Book Free Demo action.
7. Let an interested owner initiate WhatsApp or request a call. Do not infer permission to call from the email request.

Proposed public route: /tools/hazira-check. This is a proposed implementation route, not a claim that it exists. Link to the existing attendance and MIS pages with descriptive anchors. Use a new capture flow appropriate to this offer; do not reactivate the legacy brochure funnel or Brevo sequence by copying old code/configuration.

## Technical setup specification

Use the current SvelteKit stack. Keep the question/result logic simple and deterministic. Compute results locally where practical; submit contact details only on explicit form submission.

The submission endpoint must validate fields, apply basic rate limiting and bot controls, and use an idempotency key to prevent duplicate delivery on retry. Record source, asset version, answers, request timestamp and consent-text version in a restricted store. Credentials belong in environment/configuration, not client code.

Separate requested resource delivery from optional product follow-up. Use a provider suitable for the requested opt-in traffic; existing transactional delivery may be reused after inspecting its current behaviour. Snov cold-campaign enrolment must not be an automatic side effect of a download.

Capture role as declared, then verify estate association manually or through current public business evidence. All-Yes respondents may still be relevant buyers, but do not manufacture gaps to pitch them.

## Measurement

Anonymous events: check_view, check_start, check_complete, resource_requested, demo_requested. No email, phone, estate name, answer text or record IDs that expose identity in URLs, analytics event payloads or ad pixels. Link lead-level activity in the private tracker.

Measure page-to-completion, completion-to-resource request, verified-owner share, requested sales conversations, completed demos and paid sales. Keep organic, paid, referral and internal-validation traffic separate. One estate with three respondents is one account.

## Validation and launch

First show the questions and report to three existing owner customers. Proceed when at least two identify a useful check and can describe the next step without coaching. Rewrite confusing items before coding.

Public test: seek ten distinct verified owner/director accounts and three requested demo conversations within thirty days of launch. These are directional test goals, not benchmarks. Review reach and audience quality before blaming conversion. Change one hook or capture step at a time.

## Do

Give useful results first, allow private participation, show sample data labels, and offer the report even when the person declines marketing. Say calls happen only when requested and implement that promise.

## Do not

Ask owners to identify themselves in group comments, require their mobile number, preselect marketing consent, invent a leakage score, shame managers, upload payroll/worker biometrics, or sell/redistribute captured contact information. Do not show unverified social-proof counters.

## Acceptance criteria

- [ ] Three owner validations completed and confusing wording fixed.
- [ ] Every Yes/No/Not sure path and the all-Yes/all-No paths produce appropriate results.
- [ ] Result makes no unsupported loss, fraud or savings claim.
- [ ] The report has immediate practical use without an ERP purchase.
- [ ] Resource-only and resource-plus-follow-up submissions are stored distinctly.
- [ ] No marketing checkbox is preselected; requesting a resource never triggers a cold sequence.
- [ ] Delivery succeeds once per submission; retry/error states do not duplicate records.
- [ ] Form data is restricted and absent from analytics, logs and public URLs.
- [ ] Keyboard, screen-reader labels, errors and layouts pass checks at 375px and 768px.
- [ ] All mandatory AGENTS.md SEO, performance, copy and new-page requirements pass before publication, including Sarbani Associates, Book Free Demo, Email Us, sitemap and breadcrumbs.
- [ ] Existing locked typography and styling are followed; no new design system or decorative effect.
- [ ] Source attribution, demo request and stop handling are tested end to end.
