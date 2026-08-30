# Working Shortlist From Existing Master List

Date checked: 17 August 2026

Status: Research shortlist only. This is not an approved sending list.

The source workbook is `deliverables/legacy-outreach-data/GS_Leads_Consolidated_20260802.xlsx`. Its rows were used only to discover candidates. Public sources were then checked to repair estate-contact mismatches and assess account fit.

## Email discovery update - 17 August 2026

The repository does not contain a working Hunter, Snov, Apollo or Truelist integration. The prospecting skill documents name those services, but the referenced `.agents/tools` implementation directory is absent. The old repository utilities only inspect and consolidate local lead data.

Public business-source research found email candidates for 11 accounts and also exposed several account-fit problems. The complete source and status record is in `EMAIL_DISCOVERY_RESULTS_20260817.csv`.

Strongest current email candidates for pilot-fit accounts:

| Estate | Email candidate | Evidence state | Required next check |
|---|---|---|---|
| Dalowjan Tea Estate | `dalowjanteacompany@gmail.com` | Current company profile, corroborated by another MCA-derived directory | Run Snov verification and confirm it reaches the company office. |
| Radhabari Tea Estate | `pramodmodi0020@gmail.com` | Current company-filed contact associated with director Pramod Kumar Modi | Confirm business use, then run Snov verification. |
| Sonarie Tea Estate | `sonarie.tea@gmail.com` | Current company profile | Run Snov verification. |
| Sotai Tea Estate | `sotaiteaco@rediffmail.com` | Current company profile and historical directory agree | Run Snov verification and confirm the mailbox is monitored. |
| Bhergaon Tea Estate | `bhergaonte@gmail.com` | Historical estate and owner-office association | Confirm current routing, then run Snov verification. |
| Green View Tea Estate | `lakhtokia@gmail.com` | Historical owner-office record with matching estate phone | Confirm current routing, then run Snov verification. |

Useful addresses found for held or reserve accounts:

| Estate | Email candidate | Why it is not first-choice now |
|---|---|---|
| Maijonga Tea Estate | `info@threeleavesgroup.com` | Official group inbox. Group-size and decision-maker checks remain. |
| Tirual Tea Estate | `tirual.bjb@gmail.com` | Company has a wider connected tea-company network. |
| Korangani Tea Estate | `sales@koranganitea.com` | Official inbox, but the account is a prominent packaged tea brand. |
| Diksam Tea Estate | `corporate@sahariagroup.com` | Public ownership and operator evidence conflicts. |
| Ethelwold Tea Estate | `etkoloffice@gmail.com` | Two-garden operation with several connected estate companies. |
| Dinjoye Tea Estate | `admin@jalanindustries.com` | Part of a much larger connected tea and investment network. |

Domain MX records are present for every listed address domain. This only confirms the domain can receive mail. It does not prove that a specific mailbox exists or will not bounce.

## Validation limits

- Public research can confirm estate identity, approximate planted area, ownership and whether an email has been publicly associated with the estate or company.
- Public research cannot reliably prove that an estate has no ERP or attendance system. That must be asked during qualification.
- No mailbox below is send-ready until Snov.io Email Verifier returns `Valid` and the suppression and prior-contact checks pass.
- A historical public email is a candidate for verification, not proof that the mailbox is still monitored.

## Priority 1 - Verify in Snov.io

### Bhergaon Tea Estate, Udalguri, Assam

- Why it fits: Government baseline data reports about 162 hectares under tea. The Commerce Ministry ownership list names individual Barooah family owners. Assam Tea Xchange currently associates the mark with Bhergaon Tea Industries Pvt. Ltd.
- Master-list issue: The workbook contains `bhergaonteaestate@gmail.com` without an estate name. I could not independently confirm that exact address.
- Better public candidate: `bhergaonte@gmail.com`, historically listed against Bhergaon Tea Estate and its owner contact.
- Snov action: Verify `bhergaonte@gmail.com`. Keep the workbook address only as an unverified alternate.
- ERP evidence: No public evidence found. This does not prove that no system is installed.

### Green View Tea Estate, Jorhat, Assam

- Why it fits: Public records report about 123.12 hectares under tea and identify private ownership. The public phone `9678053082` matches the master-list row.
- Master-list issue: The row has phone numbers but no email.
- Public candidate: `lakhtokia@gmail.com`, from a historical tea-estate directory record that also carries the matching phone number.
- Snov action: Verify the public candidate, then confirm that it still routes to Green View before outreach.
- ERP evidence: No public evidence found. This does not prove that no system is installed.

## Additional account-fit candidates from the master list

These accounts were marked `Not sent` in the master list, fall within or close to the preferred size band, and do not appear in the confirmed GardenSuite client list. Their listed phone is useful for entity confirmation, but email discovery and verification are still required.

| Estate | Tea area in government baseline | Public ownership evidence | Master-list phone | Qualification state |
|---|---:|---|---|---|
| Boloma Tea Estate | 154.23 ha | Nil Kamal Bezboruah and another | `9864259703` | Replacement candidate. Public Teapac evidence creates a system-age, module, support and migration qualification path. |
| Dalowjan Tea Estate | 104.84 ha | Deboshyam Barua | `9435515703` | Account fit. Company email candidate found and pending Snov verification. |
| Devendra Tea Estate | 60 ha | Sumit Kumar Agarwal and Samir Agarwal | `9435035579` | Account fit. Confirm which owner handles operations. |
| Kamarband Tea Estate | 215.40 ha | Mayank Kasera | `9954473013` | Account fit. Near the upper end of the preferred range. |
| Radhabari Tea Estate | 150 ha | Rahul Modi | `9435052701` | Account fit. Company-filed director email candidate found and pending confirmation. |
| Sonarie Tea Estate | 169.10 ha | S. P. Baruva | `9707015809` | Account fit. Company email candidate found and pending Snov verification. |
| Sotai Tea Estate | 194.89 ha | Sotai Tea Co. Pvt. Ltd. | `9864049079` | Account fit. Company email candidate found and pending Snov verification. |

ERP status has not been verified for these accounts. Lack of a public mention must not be treated as proof that an estate has no similar system. Technology use remains a qualification question.

For Boloma, public evidence shows Teapac use but does not show whether the installation is current, complete, well supported or satisfactory. Do not describe the system as outdated in outreach. Ask how attendance, leaf weight, payroll, reports, upgrades and support work today.

## Priority 2 - Research or reserve

### Diksam Tea Estate, Dibrugarh, Assam

- Why it may fit: Government data reports about 126.81 hectares under tea.
- Master-list issue: The estate row has no phone or email.
- Email found: `corporate@sahariagroup.com` is publicly listed for Diksam Tea Co. Pvt. Ltd.
- Caution: Public sources conflict on the estate owner and current operator, and the company is linked to a wider group.
- Status: Hold. Do not contact until the entity and small-group fit are resolved.

### Ethelwold Tea Estate, Dibrugarh, Assam

- Why it may fit: Government data reports about 158.91 hectares under tea. Current company information and an SGS client record publicly associate `etkoloffice@gmail.com` and `ethelwoldte@gmail.com` with the company or estate.
- Caution: The company network includes other tea-estate interests, so it may already have more developed systems than an independent single estate.
- Snov action: Verify the two public addresses, identify the role behind each mailbox, and keep only a decision-maker or relevant operational contact.
- Status: Conditional reserve.

### Maijonga Tea Estate, Goalpara, Assam

- Why it may fit: Government data reports about 141.49 hectares under tea. The master list contains phone `9864310254` and marks it `Not sent`.
- Caution: Ownership is listed as Supreme Tea Plantations Pvt. Ltd. Confirm the full estate portfolio before qualification.
- Status: Account fit, group-size check required.

### Sotai Tea Estate, Assam

- Why it may fit: Government data reports about 194.89 hectares under tea. The current Assam government estate list includes Sotai, and the master list contains phone `9864049079` marked `Not sent`.
- Current company evidence: Sotai Tea Co. Pvt. Ltd. is active and publicly lists `sotaiteaco@rediffmail.com`.
- Status: Account fit. Verify the address and confirm the mailbox is monitored.

### Korangani Tea Estate, Assam

- Email found: The company's official website publishes `sales@koranganitea.com`.
- Caution: Current public evidence shows a prominent packaged tea brand with broad retail distribution. This does not match the owner's preferred pilot profile.
- Status: Hold from the first pilot.

### Tirual Tea Estate, Jorhat, Assam

- Email found: Current company records list `tirual.bjb@gmail.com`.
- Caution: The company and directors connect to several other tea businesses, and public supplier records show multiple garden marks.
- Status: Hold until the wider group is assessed.

### Dinjoye Tea Estate, Dibrugarh, Assam

- Why it may fit: Government data reports about 135.21 hectares under tea and the current Assam government list includes Dinjoye.
- Email found: Current company records list `admin@jalanindustries.com`.
- Caution: Current network evidence connects Dinjoye to a much larger set of tea, investment and related companies.
- Status: Exclude from the first pilot.

## Rejected during validation

### Harishpur Tea Estate

- Exclude permanently from prospecting: Existing GardenSuite customer, confirmed by the user on 16 August 2026.

### Bagrodia Plantations & Industries

- Exclude permanently from prospecting: Existing GardenSuite customer, confirmed by the user on 16 August 2026. Apply the exclusion to Bagrodia Plantation, Bagrodia Tea Estate and other clear spelling variants.

### Suresh Nagar Tea Estate

- Reject: Public records report only about 10.65 hectares under tea, below the current 50-hectare pilot floor. The workbook also associates it with a website and emails that require entity repair.

### Thanai Tea Estate

- Reject: Public sources place Thanai within a large multi-estate portfolio. The workbook email `thirani.jitendra@gmail.com` is publicly associated with a different company, Demdima Tea Pvt. Ltd.

### Achabam Tea Estate

- Reject: Government data reports about 426.92 hectares under tea and 1,694 workers, which is too large for this pilot.

### Good Rich Tea Co.

- Reject for now: Public results mix an Assam tea factory with a different estate in Uttarakhand. The estate identity, area and contact route cannot be validated safely.

## Public sources

- Government of India planted-area list: https://commerce.gov.in/wp-content/uploads/2021/03/LOK-SABHA-17.3.2021-1.pdf
- Government of India estate ownership list: https://www.commerce.gov.in/wp-content/uploads/2022/02/1251_merged.pdf
- Rajya Sabha estate area and workforce tables: https://cms.rajyasabha.nic.in/UploadedFiles/Debates/OfficialDebatesDatewise/Floor/235/F13.05.2015.pdf
- Government of Assam Udalguri estate list: https://udalguri.assam.gov.in/tourist-place-detail/273
- Current Government of Assam tea-garden list: https://ttwd.assam.gov.in/frontimpotentdata/list-of-tea-garden-at-assam
- Assam Tea Xchange marks directory: https://assamteaxchange.com/marks.aspx
- Historical Tea Board directory mirror used only for candidate contact matching: https://foodtestingweb.wordpress.com/about/
- Ethelwold company record: https://www.tofler.in/ethelwold-estate-pvt-ltd/company/U15491WB1947PTC015132
- SGS organic client list: https://www.sgs.com/en-in/-/media/sgscorp/Documents/Corporate/Brochures/SGS-India-Organic-Certified-Client-List.cdn.en-in.pdf

## Recommended next action

Run these candidate addresses through Snov.io Email Verifier first:

1. `dalowjanteacompany@gmail.com`
2. `sonarie.tea@gmail.com`
3. `sotaiteaco@rediffmail.com`
4. `pramodmodi0020@gmail.com`
5. `bhergaonte@gmail.com`
6. `lakhtokia@gmail.com`

Then use Snov.io company or prospect search to find a current business email for:

1. Boloma Tea Estate
2. Devendra Tea Estate
3. Kamarband Tea Estate

Boloma remains in the research pool as a competitive-replacement candidate. Korangani, Tirual, Diksam, Ethelwold and Dinjoye are still held because of brand prominence, connected tea-company networks or entity ambiguity, not because they may use software. The pilot pool still needs additional qualified accounts before a 20-recipient list can be approved.

Import none of them into a campaign until the result is `Valid`, the estate-email relationship has been confirmed, and the suppression check passes.
