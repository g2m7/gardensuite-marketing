# Task: write the live demo talk track

Read `collateral/demo-kit/copy/BRIEF.md` and `collateral/demo-kit/copy/TASK_slides.md` first (the second file lists every slide id, its topic and the app screens it shows). Follow every rule in BRIEF.md. Skim `product.md` (repo root) sections "Buyer concerns and responses" and "Brand voice", and `marketing/outreach/CURRENT_STRATEGY.md` section "4. Positioning".

Write ONE file: `collateral/demo-kit/DEMO_SCRIPT.md`. Do not create or edit any other file.

## Contents

1. Title and one line on how to use the script (presenter shares the deck in the browser, presses the right arrow to move one step).
2. "Call plan" table: part, slides, minutes. Total 20 minutes plus 10 minutes of questions. Opening 2 min, field 9 min, office 3 min, owner 2 min, start 2 min, close 2 min.
3. "Before you share the screen" - 3 discovery questions to ask in the first 2 minutes (for example: how is hazira taken today, how leaf weight reaches the office, who checks the muster roll before payroll). Tell the presenter to write down the answers and refer back to them later in the call.
4. One section per slide, s01 to s19, with heading `### s06 - Start the day's session` style. Under each: "Say:" (2-4 short sentences in spoken plain English, written as the presenter would speak), "Point at:" (what on screen to point to, one line), and for flow slides a line per step. Add "Ask:" (one check-in question) on s03, s08, s13, s16 and s18.
5. "If they ask" - 8 common questions with short answers, taken only from the facts in BRIEF.md and the product.md concerns table (internet, face not matching, scale breaks, staff training, existing software, can you name clients, price, how long setup takes). For price and setup time say it depends on garden size and modules and is confirmed after the visit. For client names use: "Many estates keep software details private. We can arrange a reference with permission."
6. "Close the call" - how to ask for the next step (field visit or Tea Loss Audit), and what to send within 1 hour after the call (the PDF of the deck and the two walkthrough videos on WhatsApp).

Keep it tight. The whole file should be under 450 lines. Use regular hyphens only. When done, run `grep -n "—\|–" collateral/demo-kit/DEMO_SCRIPT.md` and fix anything it finds.
