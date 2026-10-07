# Course 5 · Sustain & Run — panel review

Panel for this course: learning designer, plain-language editor, NGO/international development practitioner, fundraising specialist, social enterprise and business model specialist, partnerships specialist, programme and project management specialist.

## Verdict

Course 5 is professionally sound and often very good. The best ideas in the whole programme are here: separating the resource model from the fundraising strategy (11.1), keeping weighted pipeline apart from cash planning (11.16), the four stages from application to allowable spending (11.20), equitable partnerships and localisation (12.5), and the integration check that turns separate plans into one operating plan (13.7). Its biggest strength is honesty. It warns that events often lose money once staff time is counted (11.10), that repayable finance cannot cover losses (11.14) and that an integrated plan is "smaller and more credible than the sum of separate wish lists" (13.7). Its biggest problem is Module 11. It has 22 taught lessons and takes about 7.5 hours. Every learner must complete every income stream, because all fields are `required` and the review lesson lists any unfinished lesson as a blocker. So a village savings association has to design a membership model, an investment plan and a major donor programme, which goes against the module's own intro ("study the income streams that fit your model"). The course is also the hardest to read in the programme: average reading ease is 40, and seven lessons score under 30.

**Scores 1–5:** Clarity **3**: the concepts are precise, but terms like logframe, consortia, quasi-equity, mission lock and fiscal sponsor are never defined. · Readability **2**: lowest reading ease of the five courses, with 11.5 at 9 and 12.7 at 12, mostly because lists of 8–13 items are packed into single sentences. · Depth **3**: M11 is broad but shallow per stream, M12 is about right, and the project management lessons in M13 are the thinnest in the programme (73–96 words). · Practicality **3**: the exercises are concrete, but M11 forces irrelevant work, and many fields ask for 6–8-column tables typed into a text box. · Flow **3**: M12 and M13 follow a clear life cycle, but M11 repeats itself and jumps between stage labels, and the budget-to-annual-plan loop runs backwards across courses. · Professional credibility **4**: current good practice and strong sources, with gaps on foreign-funding laws, sanctions and anti-money-laundering checks, and a UK-leaning frame.

## Keep (what works — do not lose this)

- **11.1 "three questions"** (who pays / how we secure it / how we manage it). It prevents the classic founder mistake.
- **11.16 P1–P2 and field 'coverage':** "A conversation is not committed income". Weight opportunities for planning, but base cash on confirmed money, and test the pipeline against the gap.
- **11.20 P1, four stages (application → award → cash → allowable expenditure),** plus the obligations checklist. This is rarely taught to small organisations.
- **Honest limits:** 11.10 P3, 11.14 P2, 11.22 (record negative findings). **11.5 strong example:** joining a consortium as a route in.
- **12.5 reflect:** "who holds the money, who takes the risk and who gets the credit?" is the best prompt in the course. Also keep 12.4 (two-way due diligence), 12.9 P3 and 12.11.
- **13.1 field 'notyear'** (the most useful planning field in the programme), 13.4 P2, 13.7 and 13.9.
- **Resources:** strong and well placed (Pact, Bridgespan, CIVICUS, Humentum, Partnering Toolbook, PM4NGOs DPro, INTRAC).

## Course-level adjustments

| Priority | Issue | Evidence | Recommended fix |
|---|---|---|---|
| High | Learners must complete income streams that do not apply to them | `lessonBody` renders every field as `required`, and `reviewBody` lists every unfinished lesson as a blocker. 11.12 exercise: "Design a membership… *if relevant to you*", yet the field cannot be left empty | Restructure M11 into core lessons plus "choose 2–3 streams" electives (see M11). Technically: add `optional:true` to lessons, exclude unselected optional lessons from the review's pending list, and add a "Not relevant to us" button that saves a one-line reason |
| High | Hardest reading in the programme | FRE 11.5 = 9, 12.7 = 12, 12.1 = 19, 12.5 = 23, 11.14 = 25, 12.6 = 28, 13.5 = 29. Cause: long comma lists, e.g. 12.7 P2 lists 13 contract sections in one sentence | Let `learn` items be arrays so they render as `<ul>` (today `readWithResources` only outputs `<p>`). Turn every list of five or more items into bullets. Keep sentences under 25 words |
| High | Module outputs are a dump of every field, not a usable document | `output()` prints every field. "Sustainable Resource Strategy" = 40 fields across 22 lessons. "Organisation Operating Plan" = 13 fields | Add a short synthesis form to each review lesson: **Resource strategy on a page** (model, 2–3 priority streams with targets, gap coverage, top 3 actions, KPIs), **Partnership portfolio on a page**, **Plan on a page** (priorities, KPIs, top deliverables, review rhythm). Keep the full dump as an appendix |
| Medium | Tables typed into text boxes | Hints with 6–8 columns: 11.6 'list' (8), 11.16 'pipeline' (8), 12.3 'map' (7), 12.6 'design' (8), 13.2 'kpis' (7) | For tabular fields, tell learners to build the table in the named Excel sheet. In the form, ask only for the top three rows or the decision ("Your three priority prospects and why") |
| Medium | Time estimates are not honest | Flat 20 minutes, yet 11.5 asks for a readiness audit plus two researched funder profiles, and 11.18 asks for a full proposal budget | Show two times: "Learn: 15 min · Do: 1–2 h (in the workbook)". This fits the brand value "Honest about limits" |
| Medium | Examples lean towards one organisation and the UK | Most strong examples are the youth employment / "young people leaving care" organisation (11.1, 11.2, 11.13, 11.16, 12.1, 12.2, 13.1, 13.2). "Cost per pound raised" (11.21). Regulator resources are UK, US, EU and Australian (CC20, CC35, Fundraising Regulator, ACNC, GrantNav) | Rotate in 4–5 other settings: a women's savings cooperative in Kenya, a solar-lamp social enterprise in India, a refugee-led association in Lebanon, a community radio station in Colombia. Use "cost per US$1 raised" (the site prices in US$). Label UK regulator guides "an example of a national code — find your own regulator's equivalent" |
| Medium | Stage labels jump back and forth | M11: Understand, Understand, Design, Design, Implement×6, Design, Understand, Implement, Manage, Implement, Implement, Manage, Manage, Review, Review. M12: 12.5–12.6 return to Design after Implement | Re-label after the restructure so each module runs forward through the stages |
| Medium | Annual plan and budget refer to each other the wrong way round across courses | 9.2 P2 "Build it from your annual plan", but the annual plan is built in Module 13 (Course 5) | In 9.2, add: "If you have not yet built your annual plan (Module 13), use your objectives and priorities from 1.9 and revisit this budget after Module 13." In 13.7, add the step "Update your 9.2 budget to match" |
| Low | "Use your earlier course work" panel is incomplete | M13 `uses:[1,2,3,6,9,10,11,12]` omits 0, 4, 5 and 8, yet 13.9 needs the Module 0 baseline and 13.7 cites Modules 4 and 8. M11 omits 10, though 11.17 cites it | Add 0, 4, 5 and 8 to M13 and 10 to M11 |

## Module 11 · Fundraising, Revenue & Sustainable Business Models

### Verdict
The module is accurate, current and covers every stream a purpose-led organisation might use. But it is a catalogue, not a path. Twenty-two lessons, several of them near-duplicates, all compulsory, ending in a 40-field output, is too much for a founder. Cut it to about 12 lessons, of which each learner completes 9–10. That keeps the expertise and roughly halves the time.

### Is it too long? Yes. Evidence of duplication
- **11.6 and 11.15** have near-identical weak examples ("Contact the richest foundations." / "…organisations.") and reflection prompts ("What would rule out an otherwise attractive foundation / prospect?"). Both produce a scored shortlist on the 'Donors' sheet.
- **11.1, 11.2 and 11.13** use the same hybrid example (employers pay for training, which funds free places) and the same 'Resource model' sheet.
- **11.8, 11.9 and 11.19** overlap on stewardship (11.9 and 11.19 share the 'Stewardship' sheet). 11.8 also repeats 8.7: its reflection prompt is almost word for word the same as 8.7's.
- **Repeats of earlier modules:** 11.10 repeats 8.9, 11.18 repeats 9.3, 11.20 overlaps 9.8, and 11.21 overlaps 9.10.

### Recommended structure (22 → 12 taught lessons + review; about 4 hours per learner)
**Part A · Your model (core, everyone)**
1. **Your resource model.** Merge 11.1, 11.2 and the model types from 11.13: who pays, legal form, the money flows, and where the impact happens.
2. **Choosing your income mix.** Expand 11.3 with a one-screen **stream menu table**: stream | suits which forms | typical size | time to first money | restricted? | effort | readiness needed. The learner picks 2–3 priority streams. This table is what makes the electives possible.
3. **Ethical fundraising and gift acceptance.** Keep 11.4 and add the checks below.

**Part B · Your priority streams (electives: complete the 2–3 you chose)**
4. Grants: institutional and foundation (merge 11.5 and 11.6).
5. Individual giving, major donors and appeals (merge 11.8, 11.9 and the crowdfunding/events budget from 11.10; send campaign design to 8.9).
6. Corporate support (11.7, pointing to Module 12 for long-term partnerships).
7. Earned income, pricing and membership (merge 11.11, 11.12 and the safeguards from 11.13).
8. Investment and repayable finance (11.14, with the entry rule "only if an asset or activity will generate cash to repay").

**Part C · Winning and keeping support (core)**
9. Prospects and pipeline (merge 11.15 and 11.16).
10. Case for support and proposals (11.17 plus the funder-specific parts of 11.18: eligible costs, indirect cap, match funding. Build the costs in 9.3).
11. Stewardship, reporting and compliance (merge 11.19 and 11.20, keeping the four stages and the obligations checklist).
12. Test, measure, decide (merge 11.22 and 11.21. Move the hypothesis test *before* scaling and judge each stream by cost over its lifetime).

**Review:** Resource strategy on a page.

If a restructure is too large for now, the **minimum fix** is: mark 11.5–11.14 as "choose the streams in your mix", allow "Not relevant to us" on them, and merge 11.6 with 11.15.

### Adjust
- **High · 11.3 and 11.5: foreign-funding rules are missing.** Many countries restrict or require approval for foreign funding (for example India's FCRA), and some limit advocacy funded from abroad. Add one sentence to 11.3 P2 and a 'Readiness check' row in 11.5: "Are we legally allowed to receive this funder's money, in this currency, into this account?"
- **High · 11.4: due diligence lacks financial-crime checks.** Add to P2: "For large, unusual or cash gifts, and for gifts from abroad, check sanctions lists and the source of funds. Banks may freeze transfers that look unusual." This is credible and protective, especially where banks are cautious about transfers to NGOs.
- **Medium · Global South income sources are invisible.** Add to the stream menu: community philanthropy and local resource mobilisation (the GNDR guide is already placed in 11.8), diaspora giving, faith-based giving (zakat, tithes), mobile-money giving, local government contracts, and in-kind community contributions as match funding.
- **Medium · Define terms on first use:** logframe (11.5), consortium/lead partner (11.5), fiscal sponsor (11.6 strong example), stewardship (first used in 11.9, defined in 11.19), churn (11.12, defined only in brackets), quasi-equity and recoverable grant (11.14), transfer pricing and mission lock (11.13, where "mission lock" is a UK-flavoured term; say "a clause in your founding documents that protects the mission and assets").
- **Medium · 11.1 field 'gap':** Module 9 never calculates a "funding gap". Change the hint to: "Annual budget (9.2) minus confirmed income = your gap."
- **Low · 11.21 strong example contradicts P2.** The paragraph says monthly giving "costs a lot in year one", but the example shows 0.35 per unit raised in year one with 62% retention. Retention is optimistic: sector data such as the placed FEP resource shows overall retention nearer 40–45%, and much lower for new donors. Use "year one cost 1.10 per US$1 raised; expected to fall below 0.30 by year three", with retention at 45%.

### Lesson notes
- **11.3 field 'fundingMix'**: "target to validate" is unclear. Use: "Source | target amount | when it arrives | restricted? | effort | priority."
- **11.5 P2 (FRE 9)**: rewrite as: "Expect heavy requirements. You will usually need to: • register on the funder's online system; • use their logframe (a table linking activities, results and indicators — see Module 6); • follow strict budget rules; • meet audit, safeguarding and anti-fraud standards; • report in detail. Many of these funders work through consortia (groups led by one larger organisation), so small organisations often start as a partner, not the lead."
- **11.11 P3**: replace the forward reference (lesson "Test your model before you scale" below) with a direct instruction once validation moves earlier.
- **11.13 P1**: bullet the five model types, each with a one-line example from a different country.
- **11.14**: change stage to Design and open with: "If the activity will not generate cash, stop here."
- **11.18**: cut P2 to a pointer ("Build costs in 9.3; here you adapt them to the funder's rules"). Keep the strong example, which is the best budget example in the course.
- **11.22 field hint**: rename 'participant protections' to "Risks to participants and how you will avoid harm".

## Module 12 · Partnerships & Ecosystem Building

### Verdict
This module has a clear partnership life cycle (why → strategy → map → select → design → formalise → manage → review → renew or exit), and its equity and localisation content will satisfy experienced practitioners. It suffers from the course's worst readability and from overlap in its middle lessons. It also assumes the learner is the larger partner passing funds down, when most small organisations are the smaller partner receiving them.

### Keep
12.5; 12.4 strong example with conditions; 12.9 P3; 12.10 (relationship health measured from both sides); 12.11 exit contents; 12.1 P3 ("Deeper is not always better").

### Adjust
- **High · Add the smaller partner's perspective (12.2, 12.5, 12.7).** 12.5 strong example ("overheads shared at the same rate we receive") and 12.7 P3 ("flow down the funder's conditions") are written for the intermediary. Add to 12.5 P3: "If you are the smaller partner, you can ask for a fair share of overheads, a voice in design, your name on outputs and acceptance of due diligence you have already passed elsewhere (see the Charter for Change passporting tool)." Add a 12.5 field: "What we will ask for as a partner."
- **High · Readability in 12.1 P2 (FRE 19), 12.6 P1 (28) and 12.7 P2 (12).** Convert to bullets. 12.1 P2: "Common types: • Implementing partners deliver activities with you, often with money passing between you. • Strategic partners share long-term goals. • Community partners are local groups and leaders. • Technical partners provide expertise or tools. • Institutional partners are public bodies and universities. • Corporate and commercial partners include companies, suppliers and distributors. • Networks and coalitions bring many organisations together on a shared agenda." (This also adds commercial partners, which social enterprises need.)
- **Medium · Swap 12.4 and 12.5.** Hold the cheaper alignment and power conversation before the costly due diligence. This also fixes the stage order (Design before Implement).
- **Medium · 12.7 overlaps 10.3.** Both explain binding versus non-binding MoUs. Open 12.7 with "Module 10 covers contract basics; here are the clauses specific to partnerships" and keep only flow-down, governance, data sharing, IP and branding, and exit.
- **Low · 12.10 P3 "leverage":** define it as "extra money, people or reach the partnership brings in".

### Add / cut / merge / move
- **Merge 12.6 and 12.7 → "Design and formalise the partnership".** The 12.6 field 'design' (objectives | roles | resources | decision-making | communication | reporting | data sharing | branding) repeats the 12.7 contents list, and the design is the agreement outline.
- **Merge 12.8 and 12.10 → "Run and review the relationship"** (owners, rhythm, shared record, twice-yearly health check).
- Result: 11 → 9 taught lessons, with no content lost.

### Lesson notes
- **12.3 P2**: say *how* to score: "Rate strategic value and fit 1–3; prioritise 3+3 and 3+2."
- **12.9 field 'risks'**: point to the Module 10 register rather than starting a new table.

## Module 13 · Strategy to Action: Plan, Deliver & Review

### Verdict
This is the right capstone, and its two best lessons (13.7 integration, 13.9 annual refresh) give the whole programme coherence. The project management core (13.3–13.6) is too thin and split into four one-field lessons that share sheets. Combine them into two richer lessons, add a one-page project brief, and finish with a real "plan on a page".

### Keep
13.1 cascade, 'notyear' field and P3 (projects / programmes / operations); 13.2 P1 (organisational KPIs versus M6 indicators and M4 objectives) and its strong example; 13.4 P2; 13.6 weak example ("Move dates until the bars fit"); 13.7 in full; 13.8 decision log; 13.9.

### Adjust
- **High · Project management is under-taught (13.3 = 73 words, 13.5 = 87, 13.6 = 84).** A founder learns deliverables and Gantt bars but not how to run one project. Add a **one-page project brief** to the merged lesson below: purpose and link to priority | scope in / out | deliverables and "done" criteria | owner and team | budget line (9.3) | key risks | milestones | how changes are approved. This is the core of PM4NGOs DPro, which is already placed in 13.1.
- **Medium · 13.8 ignores 5.4.** 5.4 P3 promises "Module 13 teaches how to run the planning and review meetings". 13.8 should open with "Put these reviews into your annual cycle from 5.4". Point to 6.10 instead of redefining adaptive management in P3.
- **Medium · 13.6 exercise is too weak:** "Add at least one task". Change to: "Add the next quarter's tasks for your top three priorities, with owner, dates and dependencies." Rewrite P3's last sentence as a tip: "Note: this planner does not move later tasks for you. When a date slips, check the tasks that depend on it."
- **Medium · 13.9 needs the Module 0 baseline**, but M13 `uses` omits module 0 (see course table).
- **Low · 13.2 P3** uses "deliverable" before 13.3 defines it. Move the sentence into the merged deliverables lesson.
- **Low · 13.7 stage "Manage"** should be "Review". It is a check, not ongoing management.

### Add / cut / merge / move
- **Merge 13.3 and 13.4 → "Deliverables, owners and capacity"** (one table: deliverable | KPI | done criteria | owner | effort | available time). They share the 'Annual plan' sheet.
- **Merge 13.5 and 13.6 → "Milestones, dependencies and your Gantt"** (both use the 'Tasks' sheet and 'gantt' tool).
- **Move 13.7 before the Gantt** (integrate, then schedule). Otherwise learners schedule work they later cut for lack of budget.
- **Review lesson → "Your plan on a page"** as the programme's final output.
- Result: 9 → 7 taught lessons.

### Lesson notes
- **13.5 P2**: replace the course-internal "Cross-module dependencies matter too" with: "Dependencies between plans matter too: a grant-funded activity cannot start before the agreement is signed, and recruitment cannot start before the budget is approved."
- **13.1 P1**: "Cascade" is jargon for second-language readers. Use "Break down your strategic objectives (Module 1) into this year's priorities, then into projects, then into deliverables and tasks."
- **13.8 P1**: four rhythms in one sentence. Make it a four-row table (weekly / monthly / quarterly / board).

## Quick wins

1. Allow **"Not relevant to us"** on 11.5–11.14 and drop those lessons from the review's blocker list.
2. **Merge 11.6 into 11.15.**
3. **Bullet the seven worst paragraphs** (11.5 P2, 11.13 P1, 11.14 P1, 12.1 P2, 12.6 P1, 12.7 P2, 13.8 P1). This needs list support in `readWithResources`.
4. **Add the foreign-funding and sanctions/source-of-funds sentences** to 11.3, 11.4 and 11.5.
5. **Add one-line definitions** for logframe, consortium, fiscal sponsor, stewardship, churn, quasi-equity and mission lock.
6. **Fix the 11.1 'gap' hint and the 11.21 figures**, and replace "pound" with "US$1".
7. **Add the smaller partner's "what we will ask for" field** to 12.5.
8. **Rewrite the 13.6 exercise** and add a project brief field to 13.3.
9. **Complete M13/M11 `uses`**, and point 13.8 to the 5.4 calendar.
10. **Show "Learn / Do" time estimates** on the heavy exercises (11.5, 11.16, 11.18, 13.2, 13.7).
