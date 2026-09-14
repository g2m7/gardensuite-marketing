# SEO and PR Domination Plan

Date: September 2026
Owner: Kaushik (Sarbani Associates) with opencode
Authority: This plan. Supporting research lives in [docs/seo](../../seo/).

## Goal

Own page one, not one slot. For six target SERPs, reach #1 and occupy the slots below with properties we control.

Target SERPs and current state:

| # | Query | Current position | Target |
|---|---|---|---|
| 1 | tea garden attendance system | ~3 | #1 + 5 occupied slots |
| 2 | face attendance for tea gardens | top 3 | #1 + 5 occupied slots |
| 3 | tea garden payroll software | 1 | hold #1 + 5 occupied slots |
| 4 | tea garden software | 3.5 | #1 + 5 occupied slots |
| 5 | erp for tea industry | 40.5 | top 3 |
| 6 | tea garden biometric attendance | top 3 | #1 + 5 occupied slots |

Success criteria, 90 days:

- #1 on all six queries
- At least 4 of 10 first-page results on each SERP are properties we own or control (site pages, GBP, marketplace listings, video, social, Q&A)
- GSC clicks move from 69 per 6 months to 100+ per month
- Demo requests attributable to search: at least 5 per month

## Market state

Low-volume, high-intent B2B niche. Full detail in [docs/seo/KEYWORD_INTELLIGENCE_AND_SERP_BASELINE.md](../../seo/KEYWORD_INTELLIGENCE_AND_SERP_BASELINE.md). Summary:

- Search volume is small (1.44K impressions in 6 months across the whole site) but every searcher is a potential estate buyer.
- SERPs are polluted by noise that we cannot and should not chase: government portals (attendance.gov.in, PIB), IndiaMART directories, IEEE papers, patents.
- Broad terms ("biometric attendance system India") are unwinnable against ZKTeco, Nialabs, HROne. We do not chase them.

### Competitors

| Competitor | Offering | Threat | Notes |
|---|---|---|---|
| Softweb Technologies (Kolkata) | PACE plantation ERP, Blueeye face attendance, 200+ plantations globally | Highest | Active blog, Kolkata base, same offer shape, cloud-first |
| StarLink India | Biometric hardware plus Tea Garden Solution | High | Publishes monthly tea-garden blog posts, weaker product fit |
| Contemsys (Kolkata) | Tea ERP with face attendance and digital scales | Medium | Nearly identical offering, thin web presence |
| Likemind Tech (Nilgiris) | TeaMS estate ERP | Low | South India, dated site |
| ChaiTrack | Small grower leaf collection tracking | Low | Different segment (smallholders) |

None of them has a strong link profile. We do not need domain-level strength to beat them. We need to be the strongest in tea, which is a much lower bar.

## Our state

Baseline (Search Console, last 6 months, Sep 2026):

- 69 clicks, 1.44K impressions, 4.8% CTR, average position 10.5
- Homepage takes 96% of clicks (57 of 69). Product pages rank well (attendance 3.7, MIS 4.5, payroll top for its query) but get almost no clicks
- Desktop ranks much worse than mobile (14.5 vs 4.7). Mobile-first content stays
- AI Overviews already surface the homepage (~270 impressions, rising)

Strengths to build on:

- Top 3 on most niche queries already. We are defending and expanding, not starting from zero
- Regional pages for Assam, Darjeeling, Dooars-Terai are live (deployed 15 Sep 2026). No competitor has region-dedicated pages
- Tea-specific vocabulary (hazira, tikka, gang-wise plucking) that generic competitors ignore
- 25 years of history, 20+ estates, on-site rollout. Real differentiators, safe to claim

Fixes already shipped (Sep 2026):

- Six missing pages deployed (3 regional, glossary, 2 guides). They were 404 in production
- www to non-www 301 redirect on both http and https, TLS cert expanded to cover www
- X-Robots-Tag noindex on 9 internal and client subdomains (bagrodia, chapar, choibari, harishpur, hap, sachitra, census, invoice, homestay). A client ERP was publicly indexed; that is being cleaned up
- sitemap.xml now serves all 17 pages
- Only intentional noindex in the repo: the error page. All real pages are indexable

Known gaps:

- Content depth. Product pages are landing pages, not resources. Softweb and StarLink outrank us on depth
- Backlinks near zero. Authority is our weakest signal
- "erp for tea industry" phrasing has no dedicated page
- No GBP, no IndiaMART, no YouTube, no LinkedIn company page content. Every off-site slot is empty

## Strategy

One domain rarely gets 2-3 organic slots per query. Six occupied slots means putting different properties into different SERP pools. Google fills page one from distinct sources; we enter each one.

| SERP slot | Asset | Status |
|---|---|---|
| 1-2 | Main page plus one sister page per keyword variant, interlinked | Partial - depth work pending |
| 3-4 | Regional pages and guides in the same cluster | Partial - live, thin |
| Local pack | Google Business Profile for Sarbani Associates, Bagdogra | Not started |
| Marketplace | IndiaMART, Justdial, TradeIndia listings | Not started |
| Video | 60-90s YouTube demo: face scan, weight, payroll | Not started |
| Social | LinkedIn and Facebook company pages, keyword in tagline | Not started |
| Q&A | Quora and Reddit answers on proxy attendance, hazira | Not started |
| News | PR in tea trade portals and regional press | Not started |
| Directory | Tea Board / association listings | Not started |

Rules:

- Every off-site asset links to gardensuite.in with descriptive anchors. Owned assets cross-link
- One keyword variant per page. No cannibalization: the sister pages target distinct queries
- No PBNs, no bought links, no fake reviews, no doorway pages. One manual action would erase the #1 positions we already hold. 15-25 quality links is enough in this niche

## Workstream 1: On-site (I build)

1. New pillar page: "ERP for tea industry". Covers tea-specific ERP objections, links to all product modules. Keyword: erp for tea industry, tea erp software, accounting software for tea manufacturing
2. Deepen the attendance page to 1,500+ words: hazira logic, liveness checks, offline sync, scale integration, rollout, FAQ expansion matching People Also Ask
3. Monthly guide cadence, in priority order:
   - How hazira is calculated (nobody targets this; highest buyer intent)
   - Muster roll vs digital attendance for tea gardens
   - Cost of proxy attendance (calculator page, lead magnet)
4. Freshness signal: touch one page per week, meaningful edits only
5. OG image: dedicated 1200x630 per [seo.md](../../gs_landing/docs/landing-page/seo.md) pending item
6. FAQ schema expanded as new FAQs land

## Workstream 2: Off-site assets (user creates, I write)

Each item: I prepare the full copy pack (keywords, descriptions, category choices). User does the account work.

1. Google Business Profile - Sarbani Associates, Bagdogra/Siliguri. Category: Software Company. Keyword in description. Collect reviews from current estate clients
2. IndiaMART, Justdial, TradeIndia listings - these three outrank most vendors on product queries, so joining them reclaims the slots they occupy
3. YouTube - channel "GardenSuite by Sarbani Associates". One demo video to start. I write the script, title, description
4. LinkedIn and Facebook company pages
5. Quora - answer "how to stop proxy attendance in tea gardens" and related questions. Human tone, useful first, link second
6. Bing Places - free, same data as GBP

## Workstream 3: Authority and PR (user outreach, I draft)

Target 15-25 quality links over 6 months. Priority list:

1. Tea Board India listings, if eligible
2. Tea Association of India, ITA, Darjeeling Tea Association, Assam Tea Planters Association member directories
3. Regional press: Siliguri, Dooars, Darjeeling portals. Story angle: local company brings face attendance to tea gardens, 25 years of garden software
4. Tea trade portals: guest posts or vendor directory entries
5. Client estates with public websites: technology partner mention. Only estates that agree publicly; confidentiality rule applies ([trust-pivot-plan.md](../../gs_landing/docs/landing-page/trust-pivot-plan.md))
6. IndiaMART company profile links

Every bounce, rejection, or wrong-name report gets logged as evidence so weak sources are visible. Same discipline as the outreach evidence trail.

## PR calendar

One PR moment per quarter, minimum:

- Q4 2026: face attendance rollout story + the 2026 version 3 launch
- Q1 2027: MIS dashboard adoption story (region-level data, no client names without consent)
- Q2 2027: case study with a consenting estate

Each PR gets: press page on site, IndiaMART/newsroom blurb, LinkedIn and Facebook posts, and a pitch to 5 regional outlets.

## Measurement

- Monthly SERP snapshot, first of the month: run the six queries in incognito, record top 10 in a tracking sheet, note competitor moves (StarLink and Softweb blogs in particular)
- GSC performance export monthly: clicks, impressions, position per query
- The six queries as the only tracked set. No paid rank tracker until the tracking sheet becomes tedious
- Success review every 90 days against the goal table above

## Order of attack, first 4 weeks

1. Week 1: "ERP for tea industry" pillar page drafted and live; keyword tracking sheet created
2. Week 1: user claims GBP and IndiaMART with my copy pack
3. Week 2: YouTube demo video recorded and published
4. Week 2-3: attendance page deepened; first guide (hazira) drafted
5. Week 3: Quora answer live; PR pitch drafted and sent to 5 regional outlets
6. Week 4: first monthly SERP snapshot; adjust based on what moved

## Constraint references

- Copy safety and no-ai-slop rules apply to every page: [all-pages-copy-guidelines.md](../../gs_landing/docs/landing-page/all-pages-copy-guidelines.md), [seo.md](../../gs_landing/docs/landing-page/seo.md)
- Product facts from [product.md](../../product.md)
- Outreach authority remains [CURRENT_STRATEGY.md](../../marketing/outreach/CURRENT_STRATEGY.md). This plan never sends outreach; it only prepares content and listing material
