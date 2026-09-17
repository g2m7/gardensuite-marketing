# GardenSuite: From Tea ERP to Tea Operations Control System

> **Global benchmark, Indian estate pain points, product strategy, sales model and roadmap**  
> *Prepared for Sarbani Associates / GardenSuite - September 2026*

## Table of Contents

- [Executive Summary](#executive-summary)
- [1. What the Global Tea Industry Is Teaching Us](#1-what-the-global-tea-industry-is-teaching-us)
  - [1.1 China: The End-to-End Digital Architecture Benchmark](#11-china-the-end-to-end-digital-architecture-benchmark)
  - [1.2 Japan: The Labour-Saving and Precision Benchmark](#12-japan-the-labour-saving-and-precision-benchmark)
  - [1.3 Kenya: The Leaf-Accounting and Small-Grower Benchmark](#13-kenya-the-leaf-accounting-and-small-grower-benchmark)
  - [1.4 Sri Lanka: The Traceability Benchmark](#14-sri-lanka-the-traceability-benchmark)
  - [1.5 India: The Market Reality](#15-india-the-market-reality)
- [2. Why Tea Manufacturers Do Not Want to Pay for Software](#2-why-tea-manufacturers-do-not-want-to-pay-for-software)
  - [2.1 Software Is Usually Too Broad](#21-software-is-usually-too-broad)
  - [2.2 The Buyer and the User Often Have Opposite Incentives](#22-the-buyer-and-the-user-often-have-opposite-incentives)
  - [2.3 ROI Arrives Too Late](#23-roi-arrives-too-late)
- [3. The GardenSuite Product Thesis](#3-the-gardensuite-product-thesis)
  - [3.1 The Three Promises](#31-the-three-promises)
  - [3.2 Build Around Money Events, Not ERP Modules](#32-build-around-money-events-not-erp-modules)
- [4. GardenSuite Control: Leakage as the Entry Product](#4-gardensuite-control-leakage-as-the-entry-product)
  - [4.1 Labour Leakage](#41-labour-leakage)
  - [4.2 Leaf Leakage and Reconciliation](#42-leaf-leakage-and-reconciliation)
  - [4.3 Material Leakage](#43-material-leakage)
- [5. GardenSuite Workforce: Turn Labour Shortage into a Planning Problem](#5-gardensuite-workforce-turn-labour-shortage-into-a-planning-problem)
  - [5.1 Daily Labour Allocation Engine](#51-daily-labour-allocation-engine)
  - [5.2 Productivity Intelligence](#52-productivity-intelligence)
- [6. GardenSuite Command: Reduce Staff and Administrative Inefficiency](#6-gardensuite-command-reduce-staff-and-administrative-inefficiency)
  - [6.1 Example: One Attendance + Weighing Event](#61-example-one-attendance--weighing-event)
  - [6.2 Staff Accountability Without "Spyware"](#62-staff-accountability-without-spyware)
- [7. The Digital Leaf / Batch Passport](#7-the-digital-leaf--batch-passport)
- [8. The Owner Interface: Management by Exception](#8-the-owner-interface-management-by-exception)
- [9. How GardenSuite Should Be Sold](#9-how-gardensuite-should-be-sold)
  - [9.1 Do Not Lead with "ERP"](#91-do-not-lead-with-erp)
  - [9.2 The Tea Loss Audit](#92-the-tea-loss-audit)
  - [9.3 The 30-Day Shadow Deployment](#93-the-30-day-shadow-deployment)
- [10. Commercial Packaging and Pricing Logic](#10-commercial-packaging-and-pricing-logic)
- [11. Expansion Beyond Estates: Bought-Leaf Factory + Grower Network](#11-expansion-beyond-estates-bought-leaf-factory--grower-network)
- [12. Recommended Product Roadmap](#12-recommended-product-roadmap)
- [13. What Not to Build Yet](#13-what-not-to-build-yet)
- [14. The Metrics That Should Prove GardenSuite](#14-the-metrics-that-should-prove-gardensuite)
- [15. Positioning and Sales Language](#15-positioning-and-sales-language)
- [16. Strategic Conclusion](#16-strategic-conclusion)
- [Sources](#sources)

> [!NOTE]
> Core thesis: GardenSuite should not be sold as “software”. It should be sold as a system for controlling leakage, operating with fewer workers, and reducing management and clerical inefficiency.

## Executive Summary

*Tea estates often do not reject technology because it has no value. They reject technology whose value is abstract, delayed, difficult to prove, or disconnected from the owner’s daily economic problems.*

For the North Indian estate context, the most commercially relevant problems are:

1. Leakage - wage leakage, proxy attendance, unverified work, leaf-weight discrepancies, material leakage and weak reconciliation.
2. Labour shortage - too few workers available at the right place and time, making allocation and productivity more important than simple attendance capture.
3. Staff inefficiency - repeated manual reporting, fragmented communication, low accountability, and too many people required to move information from field to head office.

The global benchmark suggests that GardenSuite should evolve beyond a conventional estate ERP. China is useful for end-to-end digital architecture and smart factories; Japan for labour-saving automation, sensing and decision support; Kenya for green-leaf procurement and electronic weighing; Sri Lanka for traceability through factory, broker and exporter. India provides the commercial constraint: low willingness to pay unless software can demonstrate immediate operational or financial impact.

> [!NOTE]
> Recommended positioning: “GardenSuite measures the economics and accountability of every kg of tea - from worker and field to factory and sale.”

| **Strategic pillar** | **Customer problem** | **GardenSuite promise** |
| --- | --- | --- |
| GardenSuite Control | Leakage | Find, prevent and reconcile labour, leaf and material leakage. |
| GardenSuite Workforce | Labour shortage | Allocate scarce workers better and raise output per worker-day. |
| GardenSuite Command | Staff inefficiency | Remove duplicate reporting and manage by exceptions rather than paperwork. |
| GardenSuite Intelligence | Decision delay | Tell management what requires attention today, not merely what happened yesterday. |

## 1. What the Global Tea Industry Is Teaching Us

### 1.1 China: the end-to-end digital architecture benchmark

China is the strongest reference for what a fully digitised tea-industry stack can look like. In 2025, China implemented NY/T 4508-2025, the “Guidelines for Digital Construction of the Tea Industry”. The standard covers data collection and digital construction across tea gardens, processing, storage, circulation, marketing and public-service layers, and explicitly discusses databases, data sharing and decision support. [1][2]

The most useful lesson is architectural: digital identity and data should persist across the entire chain rather than living in disconnected attendance, factory and sales modules.

- Tea garden: field identity, agronomy, environment, labour and yield data.
- Factory: batch identity, machine/process data, quality parameters and production history.
- Warehouse/logistics: grade, lot, stock movement and dispatch.
- Commercial/traceability: transaction, customer and product lineage.
- Decision layer: exceptions, forecasting and cross-stage analysis.

China is also moving from digitisation to process intelligence. A 2025 Yixing government report on a new intelligent central tea factory describes digital and automated control across withering, leaf manipulation, fixing, rolling and baking, while collecting tea-master parameters such as force, time and repetition together with fresh-leaf quality, fermentation, aroma and moisture. [3] Another government report from Huangshan describes a production line automating feeding, blending, screening, colour sorting and packaging to reduce labour intensity and improve consistency. [4]

> [!NOTE]
> GardenSuite takeaway from China: copy the data architecture and “digital batch passport” concept - not the capital-intensive hardware.

### 1.2 Japan: the labour-saving and precision benchmark

Japan is particularly relevant where the problem is labour scarcity. NARO’s smart-agriculture tea projects combine drones, field sensing, farm-management systems, AI growth-stage analysis, autonomous or assisted harvesting machinery, LPWA/LoRa communications and cloud systems. [5][6]

The results matter because they are measured. In a Shizuoka tea demonstration, two participating businesses reduced work time per 10 ares by 24 - 38% versus conventional practice. A Kagoshima project reported 31% lower harvesting time, 68% lower mid-pruning time and 47% lower trimming time using robotic tea-garden machinery; a later local-5G demonstration reported a 56% reduction in combined harvesting and pruning work time. [7][8][9]

> [!NOTE]
> GardenSuite takeaway from Japan: labour shortage is not solved by “attendance software”. It is solved by planning, allocation, sensing, mechanisation and better timing.

### 1.3 Kenya: the leaf-accounting and small-grower benchmark

Kenya offers a more operationally comparable lesson for leaf procurement. KTDA states that green leaf is weighed using electronic scales, PDAs, portable printers and server software; the PDA captures the weight and transmits it directly to the factory server without manual intervention. [10] KTDA also notes that electronic weighing reduced complaints associated with easily manipulated manual scales. [11]

This is important for GardenSuite because the system sits directly in a money event: grower delivers leaf → weight is captured → receipt is created → factory receives data → payment/accounting follows.

> [!NOTE]
> GardenSuite takeaway from Kenya: software gets paid for more easily when it becomes transaction infrastructure rather than an administrative database.

### 1.4 Sri Lanka: the traceability benchmark

Sri Lanka provides a useful model for tea-lot traceability. Tea Board documentation describes traceability from factory invoices through brokers and online auctions, and then into exporter blend sheets submitted for export authorization. The same system preserves the identity of tea lots as they move through intermediaries. [12]

> [!NOTE]
> GardenSuite takeaway from Sri Lanka: build a continuous lineage from green leaf and factory batch through grade, made-tea lot and commercial outcome.

### 1.5 India: the market reality

Tea Board India’s 2024-25 annual report lists 1,567 organised-sector tea estates and 937 manufacturing units. It also reports 249,318 enumerated small tea growers as of 31 March 2025, with small growers contributing 54.55% of national production versus 45.45% from the organised sector. [13]

This means GardenSuite should not be designed only for traditional estates. Bought-leaf factories and grower networks are a major future market.

## 2. Why Tea Manufacturers Do Not Want to Pay for Software

The problem is usually not a lack of possible use cases. It is a mismatch between how software is sold and how estate owners experience risk and value.

| **What software vendors sell** | **What the owner hears** | **What the owner actually buys** |
| --- | --- | --- |
| ERP implementation | Large upfront cost and disruption | A measurable reduction in loss or workload |
| Dashboard | More screens to look at | Fewer surprises and faster decisions |
| Attendance app | Another HR tool | Lower wage leakage and verified work |
| Factory module | More data entry | Higher recovery, consistency or throughput |
| Traceability | Compliance overhead | Faster dispute resolution / stronger buyer confidence |
| AI | Unproven technology | A specific decision that improves ₹/kg |

### 2.1 Software is usually too broad

“Digitise your estate” is not a strong buying reason. “We will compare attendance, output and wages and show you exceptions that deserve investigation” is much stronger because it is narrow, understandable and testable.

### 2.2 The buyer and the user often have opposite incentives

A system that benefits the owner can create more accountability for supervisors, clerks or field staff. Adoption therefore cannot depend on every employee being enthusiastic. The system must reduce data entry for operational users while making exceptions visible to management.

### 2.3 ROI arrives too late

Large ERP projects ask the estate to trust future benefits after migration, training and process change. GardenSuite should invert this: prove value before asking for a large commitment.

## 3. The GardenSuite Product Thesis

*GardenSuite should become a Tea Operations Control System, not a generic ERP.*

### 3.1 The three promises

| **Product** | **Promise** | **Primary outcome** |
| --- | --- | --- |
| GardenSuite Control | Stop leakage | Less unverified labour, leaf, material and payment exposure |
| GardenSuite Workforce | Do more with fewer workers | Higher output per worker-day and better deployment |
| GardenSuite Command | Run with fewer administrative steps | Less duplicate reporting, faster exception resolution |
| GardenSuite Intelligence | Know what needs attention today | Management by exception and eventually predictive decisions |

### 3.2 Build around money events, not ERP modules

The most important data chains are:

- Worker → attendance → location → task → output → wage.
- Section/field → green leaf → collection point → vehicle → factory receipt.
- Green leaf batch → process stages → made tea → grade → lot.
- Made-tea lot → sample/broker/buyer → sale realization.
- Material → store issue → task/machine/section → consumption → replenishment.

Every future feature should attach to one of these chains. If it cannot improve, protect or explain an economic outcome, it should be lower priority.

## 4. GardenSuite Control: Leakage as the Entry Product

Leakage is the best initial wedge because the owner already believes it exists. GardenSuite does not need to prove that “software is useful”; it needs to prove that a specific exception or reconciliation problem exists in the estate’s own data.

### 4.1 Labour leakage

- Face-based attendance to reduce proxy attendance.
- Geofencing/geotagging to connect presence to the correct operational area.
- Attendance without corresponding task/output exception.
- Manual override and repeated correction monitoring.
- Overtime anomaly detection.
- Duplicate worker / identity inconsistency checks.
- Contract-labour attendance vs contractor billing reconciliation.
- Wage calculation traceability back to attendance and task events.

### 4.2 Leaf leakage and reconciliation

- Bluetooth/electronic weighing at collection.
- Plucker-wise and section-wise leaf identity.
- Field weight → vehicle load → factory receipt reconciliation.
- Time between plucking, collection and factory receipt.
- Manual weight edits and abnormal corrections.
- Collection-point and vehicle variance patterns.
- Bought-leaf grower delivery and settlement trail.

### 4.3 Material leakage

- Fertiliser, chemical, fuel, spare and tool issues linked to division/task/machine.
- Consumption vs historical or operational norm.
- Emergency purchase frequency.
- Stockout and slow-moving inventory visibility.
- Purchase request → approval → receipt → issue traceability.

## 5. GardenSuite Workforce: Turn Labour Shortage into a Planning Problem

Attendance answers “who came?” A workforce operating system must answer “where should the available people go, and what output should we expect?”

### 5.1 Daily labour allocation engine

The system can eventually combine section, days since last plucking, recent yield, expected growth, available workforce, historical kg/plucker, weather, pruning status and current crop condition to recommend the day’s allocation.

| **Input** | **Why it matters** |
| --- | --- |
| Available pluckers | Hard capacity constraint |
| Days since previous round | Urgency / quality risk |
| Historical kg per plucker | Expected labour requirement |
| Section yield trend | Expected crop |
| Weather / growth conditions | Short-term crop availability |
| Mechanised vs hand plucking | Different labour and quality assumptions |
| Distance / transport | Lost time and collection logistics |

The output should be operational, for example: “Section F2 can be deferred by one day; move 18 workers to D4.” This is more valuable than another reporting dashboard.

### 5.2 Productivity intelligence

- kg per worker-day by section, division, supervisor and plucking method.
- Labour cost per kg.
- Task completion per worker-hour for non-plucking work.
- Absenteeism by day, season, worker group and geography.
- Mechanisation productivity vs manual work.
- Forecasted labour gap for upcoming rounds or tasks.

Japan’s smart-tea pilots provide evidence that labour-saving technology can materially reduce work time when it is integrated with planning, sensing and machinery rather than treated as a standalone app. [7][8][9]

## 6. GardenSuite Command: Reduce Staff and Administrative Inefficiency

A major hidden cost is information movement. Data is repeatedly written in registers, re-entered in Excel, sent on WhatsApp, summarized by clerks and then re-summarized for head office. GardenSuite should make operational events create reports automatically.

> [!NOTE]
> Design rule: record an event once, as close to the event as possible; derive every downstream report from that event.

### 6.1 Example: one attendance + weighing event

If a worker authenticates, is assigned to a section and records 28.6 kg through the weighing workflow, the system should automatically derive attendance, plucker productivity, section crop, labour cost/kg, supervisor/division productivity, wage inputs and management reporting. No clerk should re-enter the same fact five times.

### 6.2 Staff accountability without “spyware”

GardenSuite should measure operational responsibility, not keyboard activity. Each role should own exceptions and outcomes.

| **Role** | **Useful system-generated accountability** |
| --- | --- |
| Field assistant | Labour deployed, crop vs target, unresolved attendance/weight exceptions, task completion |
| Manager | Division performance, exception backlog, labour gap, crop and cost variance |
| HR / welfare | Worker issues raised/resolved, absence follow-up, wage disputes, pending documents |
| Storekeeper | Issues, abnormal consumption, stockouts, pending requisitions, slow-moving stock |
| Factory staff | Batch throughput, downtime, process deviations, recovery, QC pending |
| Head office | Cross-estate comparative KPIs and unresolved high-value exceptions |

## 7. The Digital Leaf / Batch Passport

The long-term architecture should preserve lineage across the entire tea chain. This is the most important concept to borrow from the Chinese and Sri Lankan models. [1][2][12]

> [!NOTE]
> Example lineage: Division 4 → Section B → 17 Sep → 183 pluckers → 4,820 kg green leaf → Vehicle 07 → Factory Batch 1709-04 → Wither Trough 3 → CTC Line 2 → Fermentation → Dryer 2 → PF1 612 kg → Made-tea Lot 24/09 → buyer / auction realization.

Once this lineage exists, GardenSuite can answer questions conventional ERP cannot answer cleanly:

- Which sections consistently produce the highest-value made tea?
- Which collection routes create the highest field-to-factory weight discrepancy?
- Which process conditions correlate with lower recovery or quality?
- Which supervisors produce more crop per labour rupee?
- Which made-tea lots can be traced back to workers, fields and factory conditions?
- Why did one batch realize ₹X/kg less than a comparable batch?

## 8. The Owner Interface: Management by Exception

Owners do not need another screen full of charts. They need an exception inbox and a small number of economic operating metrics.

| **Core metric** | **Reason** |
| --- | --- |
| Labour cost / kg | Direct link between workforce and crop economics |
| kg / worker-day | Simple productivity signal |
| kg / hectare / round | Field productivity and crop timing |
| Green leaf dispatched vs received | Leaf reconciliation |
| Made-tea recovery % | Factory conversion efficiency |
| Energy / kg | Factory controllable cost |
| Downtime | Lost capacity and maintenance signal |
| Realization / kg by lot/grade | Connect operations to commercial outcome |
| Unresolved exception value | Turns operational anomalies into management priority |

A daily briefing should look more like this than a traditional ERP dashboard:

- Division 4 productivity is 19% below its 14-day norm.
- 23 workers are present but have no output or completed task recorded.
- Vehicle 07 arrived 186 kg below field dispatch weight; reconciliation pending.
- Section 9 is forecast to need approximately 17 additional pluckers tomorrow.
- Fertiliser issue in Division 2 is materially above plan; review requested.
- Three purchase requests have been awaiting approval for more than five days.

## 9. How GardenSuite Should Be Sold

### 9.1 Do not lead with “ERP”

The product should enter through one expensive problem, prove itself, and then expand. The initial commercial conversation should be about leakage, worker productivity or administrative load - not modules, cloud architecture or digital transformation.

### 9.2 The Tea Loss Audit

A high-conversion acquisition product could be a short operational audit using the estate’s own records. The audit should compare attendance, wages, leaf weights, field output, factory receipt, overtime, material consumption and selected factory figures where available.

| **Audit output** | **Example question** |
| --- | --- |
| Labour exceptions | Where are attendance and output inconsistent? |
| Leaf reconciliation | Where do field and factory weights diverge? |
| Productivity variance | Which divisions/supervisors are structurally below peers? |
| Administrative burden | How many times is the same information manually re-entered? |
| Stores variance | Which materials show abnormal issue patterns? |
| Factory variance | Where are recovery, downtime or energy outliers? |

All findings should be translated to rupees only where the underlying assumptions are defensible. Savings claims should be presented as measured or estimated exposure, not guaranteed savings.

### 9.3 The 30-day shadow deployment

Do not force migration. Let the estate run its existing process while GardenSuite operates alongside one division, one weighing chain or one operational problem. At the end, present differences and exceptions from the estate’s own operation.

- No replacement of payroll on day one.
- No big ERP migration commitment.
- No dependence on management believing a generic case study.
- Evidence comes from their own workers, leaf and processes.

## 10. Commercial Packaging and Pricing Logic

The following is a pricing structure hypothesis to validate, not a recommended final price list.

| **Offer** | **Commercial logic** |
| --- | --- |
| Tea Loss Audit | Free or low-cost diagnostic when strategically useful; paid where data preparation is substantial |
| GardenSuite Control | Low-friction onboarding + monthly/annual software fee |
| Leaf / weighing | Per collection point, weighing device, factory or transaction volume |
| Workforce | Per estate / active workforce band |
| Factory | Per factory / line / production scale |
| Grower Network | Factory platform fee + active grower or transaction-based component |
| Enterprise / multi-estate | Annual contract with head-office analytics and integration |

The strategic objective is a land-and-expand ladder: a customer can start with one measurable problem and grow into a materially larger annual account without being asked for a large commitment at the start.

## 11. Expansion Beyond Estates: Bought-Leaf Factory + Grower Network

Because small growers account for 54.55% of Indian tea production in Tea Board’s 2024-25 report, GardenSuite should eventually have a product designed around bought-leaf factories and their grower networks. [13]

- Grower registration and garden identity.
- Collection centre / route management.
- Electronic weighing and instant receipt.
- Quality deductions / leaf classification.
- Vehicle and factory receipt reconciliation.
- Grower ledger and settlement.
- Payment status and statement.
- Supply forecasting by grower cluster.
- Quality / rejection history.
- Traceability from grower to made-tea batch.

Kenya demonstrates why this can be a strong commercial product: the software is embedded in the leaf-purchase transaction itself rather than added later as office administration. [10][11]

## 12. Recommended Product Roadmap

| **Phase** | **Focus** | **Build / strengthen** |
| --- | --- | --- |
| Phase 1 | Control | Face attendance, geofencing, task assignment, Bluetooth weighing, wage linkage, exception engine, field→factory reconciliation |
| Phase 2 | Workforce | Daily workforce planning, productivity baselines, task planning, shortage forecasting, supervisor/division comparison |
| Phase 3 | Command | Role-based exception queues, automated reports, approvals, stores/work-order integration, head-office view |
| Phase 4 | Factory + passport | Green leaf intake, batch genealogy, process events, recovery, downtime, QC, grade/lot lineage |
| Phase 5 | Intelligence | Anomaly detection, yield/labour forecasting, process-quality correlations, decision recommendations |
| Parallel | Grower network | Bought-leaf procurement, e-weighing, settlements, farmer/grower portal and traceability |

## 13. What Not to Build Yet

GardenSuite should resist becoming a feature-complete generic ERP before it owns the operational control layer.

- Large accounting suite unless required for integration or a contracted customer.
- Generic CRM.
- Complex document management that does not remove a current manual workflow.
- AI chat features without a measurable estate decision behind them.
- Expensive sensor integration before the same decision can be validated using manual/low-cost data.
- Dashboards that do not lead to an action or accountable owner.

## 14. The Metrics That Should Prove GardenSuite

Product success should be measured in operational economics, not logins or number of modules deployed.

| **Metric** | **Interpretation** |
| --- | --- |
| ₹ leakage identified / 1,000 worker-days | Control value |
| kg / worker-day | Labour productivity |
| Labour cost / kg | Economic workforce efficiency |
| Admin hours / 1,000 worker-days | Staff-efficiency effect |
| Field dispatch vs factory receipt variance | Leaf accountability |
| Exception resolution time | Management responsiveness |
| Made-tea recovery % | Factory conversion |
| Energy / kg | Factory operating efficiency |
| Realization / kg linked to batch lineage | Ability to connect operations to commercial value |

> [!NOTE]
> Internal product rule: every major feature should be able to answer “Which ₹/kg, worker-hour, kg of leaf, or management hour does this feature improve, protect or explain?”

## 15. Positioning and Sales Language

Avoid: “We build digital solutions for tea estates.”

Prefer language such as:

- “Give us one division for 30 days. We will show you where labour, leaf and staff time are being lost.”
- “We connect attendance, task, output and wage so management can see exceptions instead of reconciling registers.”
- “When labour is short, GardenSuite helps decide where today’s available workers should go.”
- “Every kg of leaf has a chain of accountability from worker and field to factory.”
- “Management sees six issues that need action, not six hundred rows of reports.”

## 16. Strategic Conclusion

*GardenSuite’s opportunity is not to become another tea ERP. It is to become the control layer between labour, leaf, staff, factory and management.*

China shows the end-state architecture. Japan shows how technology can attack labour scarcity. Kenya shows how digital weighing becomes transaction infrastructure. Sri Lanka shows how traceability can persist through commercial movement. India tells us that adoption will be won by narrow, provable economics rather than large transformation pitches.

The most defensible entry point is leakage control. The strongest expansion is workforce productivity and administrative compression. The long-term moat is the dataset created when worker, field, leaf, process, quality and sale outcome are connected in one lineage.

> [!NOTE]
> The product vision in one line: GardenSuite should find, explain and reduce every controllable loss between the bush and the buyer.

## Sources

Accessed September 2026. Product recommendations, pricing structures and example exception thresholds in this document are strategic hypotheses; they are not claims made by the cited sources.

- **[1]** National Public Service Platform for Standards (China), “NY/T 4508-2025 - Guidelines for Digital Construction of the Tea Industry.” [https://std.samr.gov.cn/hb/search/stdHBDetailed?id=350FE9C4D00A90D2E06397BE0A0A963B](https://std.samr.gov.cn/hb/search/stdHBDetailed?id=350FE9C4D00A90D2E06397BE0A0A963B)
- **[2]** China Agricultural and Rural Information Network / Ministry of Agriculture and Rural Affairs information-standardization committee, “Tea Industry Digital Construction Guidelines industry standard released and implemented,” 25 June 2025. [https://www.agri.cn/xxh/xxhbz/202506/t20250625_8743893.htm](https://www.agri.cn/xxh/xxhbz/202506/t20250625_8743893.htm)
- **[3]** Yixing Municipal Government / Agriculture and Rural Bureau, “Over 100 million yuan investment: Yangxian Tea intelligent central factory begins construction,” 12 Aug 2025. [https://www.yixing.gov.cn/doc/2025/08/12/1347790.shtml](https://www.yixing.gov.cn/doc/2025/08/12/1347790.shtml)
- **[4]** Huangshan Municipal Government, “Huizhou District: intelligent manufacturing promotes tea production equipment renewal,” 25 Mar 2025. [https://www.huangshan.gov.cn/zxzx/qxdt/8411195.html](https://www.huangshan.gov.cn/zxzx/qxdt/8411195.html)
- **[5]** NARO (Japan), Smart Agriculture Demonstration Project - Tea technology overview. [https://www.naro.go.jp/smart-nogyo/seika_portal/einou-taikei/cha.html](https://www.naro.go.jp/smart-nogyo/seika_portal/einou-taikei/cha.html)
- **[6]** NARO (Japan), Smart Agriculture Demonstration Project - Tea demonstration sites. [https://www.naro.go.jp/smart-nogyo/seika_portal/jissho-chiku/cha.html](https://www.naro.go.jp/smart-nogyo/seika_portal/jissho-chiku/cha.html)
- **[7]** NARO, Shizuoka Tea C01 demonstration results: LoRa tea-garden network, AI growth-stage analysis and factory quality control. [https://www.naro.go.jp/smart-nogyo/r1/results/kaju-cha/154314.html](https://www.naro.go.jp/smart-nogyo/r1/results/kaju-cha/154314.html)
- **[8]** NARO, Kagoshima H02 demonstration results: IoT/robotics large-scale smart tea system. [https://www.naro.go.jp/smart-nogyo/r1/results/kaju-cha/154315.html](https://www.naro.go.jp/smart-nogyo/r1/results/kaju-cha/154315.html)
- **[9]** NARO, Kagoshima 5GH03 local-5G smart tea demonstration results. [https://www.naro.go.jp/smart-nogyo/r2/results/local-5g/155367.html](https://www.naro.go.jp/smart-nogyo/r2/results/local-5g/155367.html)
- **[10]** Kenya Tea Development Agency (KTDA), FAQs - technology and green-leaf electronic weighing. [https://ktdateas.com/faqs/](https://ktdateas.com/faqs/)
- **[11]** KTDA, Kaptumo Tea Factory - electronic weighing solution and factory challenges. [https://ktdateas.com/kaptumo-tea-factory/](https://ktdateas.com/kaptumo-tea-factory/)
- **[12]** Sri Lanka Tea Board, “Specification - Ceylon Tea” traceability sections for brokers/exporters. [https://srilankateaboard.lk/wp-content/uploads/2024/11/Specification-Ceylon-tea.pdf](https://srilankateaboard.lk/wp-content/uploads/2024/11/Specification-Ceylon-tea.pdf)
- **[13]** Tea Board India, 71st Annual Report 2024-25. [https://www.teaboard.gov.in/pdf/Tea_Board_Annual_Report_2024_25_pdf287.pdf](https://www.teaboard.gov.in/pdf/Tea_Board_Annual_Report_2024_25_pdf287.pdf)