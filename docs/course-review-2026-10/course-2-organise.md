# Course 2 · Organise — panel review

## Verdict
Organise is a sound, practical course. It covers the right ground (structure, governance, people, systems) in an order that mostly makes sense, and an experienced NGO manager would find little wrong with what it says. Its biggest strength is the exercise design in Module 3: reserved matters, a delegation matrix with absence cover, a RACI with exactly one Accountable, and an accountability map that includes communities. Together these give a founder real governance tools, not just theory. Its biggest problem is Module 5. Its 10 taught lessons mostly repeat Modules 3 and 4 or preview Modules 9, 10 and 13 (5.5, 5.6, 5.4 and 5.10 overlap almost line for line), so the course ends on its weakest and longest module, and much of it sends people to courses they may not own. A second issue runs through all three modules: the hardest exercises (3.6 delegation, 4.3 contracts, 4.6 pay bands) get 110–145 words of dense reading, a uniform "20 minutes" and no starter template.

Scores 1–5: **Clarity 4** (logical, terms mostly defined; "director" is used for two different roles) · **Readability 3** (average reading ease 46; 4.3 scores 26, 5.6 scores 30; list sentences of up to 49 words) · **Depth 3** (enough to understand, too thin for the hardest exercises) · **Practicality 4** (concrete fields, realistic thresholds, good "strong" examples) · **Flow 3** (Module 3 flows well; Module 4 asks for a pay range before pay is designed; Module 5 repeats earlier and later material) · **Professional credibility 4** (current good practice and safeguarding throughout; gaps in legal caution on governance and volunteers; resources lean towards UK sources)

## Keep (what works — do not lose this)
- **"Structure follows the work"** (3.1), including "Outsourcing a task does not outsource accountability for it" (3.1 P3).
- **The founder's dual role** (3.4 P4) and **founder succession** (4.9 P3: "a sign of maturity, not mistrust"). These are rare in courses and essential for founder-led organisations.
- **Decision rules with numbers.** The 3.6 thresholds match 3.4 (contracts over 10,000) and 5.6 (three quotes over 1,000). Keep them currency-neutral and consistent. Also keep the 3.6 "absence and conflicts" field and the rule "exactly one Accountable per row" (3.7).
- **Accountability to communities** (3.8 check, and the "you said, we did" example).
- **Fairness and safeguarding in people practice:** structured scoring (4.2 P3), safer recruitment (4.2 P4), "Volunteers are not free" (4.1 P2), expenses so that volunteering is open to everyone (4.8 P2).
- **Proportionality:** the minimum set plus written triggers (5.2), "Over-systematising is a real risk" (5.2 P4), and "Some protections cannot wait" (5.7).
- **Checkable details:** tested backups and the two-minute findability check (5.8), the yearly export test (5.9), handover notes (4.9 P2).
- **Realistic weak examples:** "a friend of the founder" (4.2), "like a family" (4.7), "receipts in a box" (5.6).
- **The 3.2 field format** (role | reports to | responsibility), which feeds the automatic org chart in the review lesson (`orgChart()` in learning.js). Do not change this hint.

## Course-level adjustments

| Priority | Issue | Evidence | Recommended fix |
|---|---|---|---|
| High | Module 5 repeats material and acts as a trailer for later courses | 5.5 repeats Module 4; 5.6 repeats 9.6 almost line for line (two signatories, reconciliation, procurement quotes, stricter funder rules); 5.4 repeats the 3.4 governance calendar and 13.8 review rhythm; the 5.10 decision log repeats 3.9 P3; 5.1 P4 is a list of other modules | Cut Module 5 from 10 to 8 taught lessons (see Module 5). Make every remaining lesson give a **self-sufficient minimum** for someone who owns only Course 2 |
| High | Forward references point to paid courses without saying so | 4.1 P3 and 4.3 P3 ("Module 10 covers…"); 5.1 P4, 5.3 P4, 5.4 P3, 5.6 P1, 5.7 P3, 5.10 P1 | Name the course each time ("Module 10, in Course 4 · Protect"). Always state the minimum to do now, so the reference is optional extra reading |
| High | "Director" means both board member and executive lead | 3.3 P2 "Companies have directors appointed by shareholders"; 3.4 strong "director's appointment and appraisal"; 3.4 P1/P2 also use "executive lead" and "chief executive"; 3.2 uses "coordinator" | Use **"executive director (the person who runs the organisation day to day)"** throughout. Define it once in 3.2 and add a one-line note in 3.3: "In company law, 'directors' are board members." |
| High | Time estimates are all 20 minutes, which is not realistic | metrics.md: every lesson 20 min, reading 108–175 words; yet 3.7 asks for five RACI rows, 4.6 for principles plus bands plus recognition, 4.1 for a two-year plan; 5.4 has one field | Set times from 10 to 45 minutes based on the exercise. Show "Reading 3 min · Exercise 30–40 min" and say "You can save and come back" |
| Medium | Every field is required, even when it does not apply yet | `textarea required` in `lessonBody`; a solo founder must fill in "Bands and progression" (4.6), "Selection process" (4.2) and "Offboarding checklist" (4.9) | Add a standard hint for every course: "If this does not apply yet, write the trigger that will make it apply (for example: 'When we hire our first employee')." This reuses the 5.2 trigger idea |
| Medium | Long list sentences reduce readability for second-language readers | 49-word sentence in 5.2 P2; 37 words in 5.6 P2; 35 in 5.5 P2; 34 in 3.2 P1; 33 in 4.3 P1 | Allow simple bulleted lists in `learn` (renderer change; would help every course). Until then, split each list into short sentences (rewrites below) |
| Medium | Examples nearly all use the same kind of organisation | Director + delivery lead + operations lead + volunteer mentors in 3.2, 3.4, 3.6, 3.7, 4.1, 4.4, 4.8, 5.3, 5.5 | Name it as a running case (e.g. "a youth mentoring nonprofit") and add one contrasting example per module: a social enterprise with shareholders (3.3/3.4), a cooperative with a members' assembly, and a community-based organisation that relies on volunteer stipends (4.8) |
| Medium | Resources lean towards the UK | All three 3.4 resources are UK (CC27, CC29, NCVO); NCVO appears in 4.3, 4.4, 4.5, 4.6 and 4.8; the 5.hr-overview resource is the UK ICO | Keep them, but add at least one Global South or global governance/HR source to each module (e.g. a regional civil-society support body such as WACSI for West Africa; CHS Alliance and ILO are already present, so use them as the core resource where possible) |
| Medium | Review lessons only display answers | `reviewBody` shows the fields plus a generic tick box: "identified what still needs testing" | Give each module review a 4–5 item check (suggested ones under each module) and a one-line "share this with your board or team" next step |
| Low | No legal caution in the Module 3 and 4 intros | Module 10's intro has one; the Module 3 and 4 intros do not | Add to both: "Rules differ by country and legal form. Use this to prepare questions for a qualified local adviser." |

## Module 03 · Structure, Governance & Accountability

### Verdict
This is the strongest module in the course. It is logical, practical and credible to experienced readers, and it builds clearly from functions to structure, governance, roles, decision rights, ownership, accountability and coordination. Its weaknesses are the director/executive confusion, decision rights being asked for four times (3.4, 3.5, 3.6, 3.7), and governance content that assumes a common-law charity board.

### Keep
The 3.3 "Founding document checks" field (built-in legal caution) · 3.4 reserved matters · the 3.9 hand-off field (from role → to role | deliverable | acceptance check | date) · everything listed under Keep above.

### Adjust
- **High · 3.4 P4, legal caution.** "Manage the conflict openly" suggests that a founder can always be both paid staff and a trustee. In some jurisdictions (e.g. charities in England and Wales) a trustee cannot be employed by the charity without specific authority. Add: "In some countries a board member cannot also be a paid employee, or only with special permission. Check this before the founder takes a salary."
- **High · 3.3 P2, Global South credibility.** The lesson leaves out the general assembly plus elected bureau model (president, secretary, treasurer) that is common for associations in Francophone, Lusophone and Latin American countries, and it never names the officer roles. Add one paragraph: "In many countries an association's highest body is the general assembly of members, which elects an executive committee or bureau. Most boards also have officers: a chair, a treasurer and a secretary, often with duties set by law or your statutes."
- **Medium · 3.5 example does not match the exercise.** The exercise is "Create role cards", but the strong example is a decision chain for partnerships. Replace it with a role card: *"Delivery lead (three days a week). Purpose: run the mentoring programme safely and well. Results: 60 young people complete the programme each year; 85% of sessions run as planned. Decides: session schedule, mentor matching. Needs approval: spending over 500, new school partners. Works with: volunteer mentors, operations lead."*
- **Medium · Decision rights repeated (3.5 field "decisions allowed | approval needed", 3.6 matrix, 3.7 RACI, 3.4 reserved matters).** Make the link explicit: reserved matters (3.4) are the top row of the delegation matrix (3.6); role cards (3.5) list only the role's *own* decisions and say "see the delegation matrix for limits". Drop "approval needed" from the 3.5 hint to cut the field from 6 columns to 5.
- **Medium · 3.6 too thin for the task (111 words).** Give starter rows in the lesson or the Excel sheet: budgeted spending; unbudgeted spending; signing contracts; hiring and dismissal; bank payments and signatories; new partnerships; public or media statements; policy approval; access to personal data. Add one sentence: "Your bank mandate (who can sign) must match this matrix."
- **Medium · 3.8 terminology.** "Downward to the people and communities you serve" (P1) is now often avoided because it implies hierarchy. Use "accountability to the people and communities you serve", in line with the Core Humanitarian Standard. Readability is 34: split P1 into three short sentences.
- **Medium · 3.3/3.4 board practice.** Add "skills matrix" to the 3.3 field hint ("List the skills you need and tick who has them"). In 3.4 P1 acknowledge working boards: "In very small organisations board members may also do hands-on work. Record which role they are playing at the time, as the founder does."
- **Low · 3.1 uses two terms.** "capabilities" (P1) and "functions" (P2 and the field) mean nearly the same thing. Use "functions" only, and define MEAL on first use: "MEAL (monitoring, evaluation, accountability and learning)".
- **Low · 3.2 reflect** ("Where would a concern go if it involved the person's usual manager?") is excellent but not captured anywhere. Add it to the 3.2 "gaps" hint, or to 3.8's "internal" field.

### Add / cut / merge / move
- Move the 3.4 "Governance calendar" field so that 5.4 builds on it, rather than both lessons asking for the same calendar (see Module 5).
- Review check for 3.10: every function has an owner; one Accountable per process; delegation thresholds match the bank mandate; the board has agreed the reserved matters; founder dual roles are recorded.

### Lesson notes
- 3.2 P1 (34 words) → "Common shapes are: functional (grouped by expertise); programme (grouped by what you deliver); geographic; matrix (people report to two managers); and hub (a small core coordinating partners or volunteers)." Then add a closing sentence: "Most small organisations are functional, with one coordinator."
- 3.4 P1 (reading ease 34) → "The board sets direction and checks progress. It appoints the executive director, approves key policies and the budget, and oversees money, risk and the law. Management proposes plans, runs the work and reports back."
- 3.6 strong: add "(in your currency)" after the first figure.
- 3.7: the core resource is RAPID, a second framework the lesson never mentions. Either add one sentence in P3 ("For one-off, contested decisions, some teams use RAPID instead; see the resource below") or relabel the resource as "Go deeper".
- 3.9: add to P2 that meetings must work for part-time and remote colleagues (time zones, low bandwidth). Note that 13.8 repeats this rhythm: 13.8 should refer back to 3.9.

## Module 04 · People, Culture & Volunteers

### Verdict
It covers the full people lifecycle with good fairness and safeguarding instincts, and the examples are realistic. Three problems hold it back: the sequence asks for a pay range (4.2) three lessons before pay is designed (4.6); conduct, grievance and discipline are missing even though 5.5 says Module 4 covers them; and legal caution on employment status and volunteer payments is thin for a global audience.

### Keep
4.2 P3–P4 in full · 4.3 "Use templates as starting points only…" · 4.4 "Check understanding instead of only recording that a document was sent" · 4.5 wellbeing kept separate from performance and pay · 4.7 psychological safety defined in plain words · 4.9 exit conversation with someone other than the line manager.

### Adjust
- **High · Sequence.** The 4.2 field "Role and criteria" asks for a pay range, but pay principles come in 4.6. The 4.6 stage label (Design) also follows 4.5 (Manage). Suggested order: 4.1 Workforce → 4.2 Pay and recognition → 4.3 Recruitment → 4.4 Contracts → 4.5 Volunteers → 4.6 Onboarding → 4.7 Check-ins → 4.8 Culture → 4.9 Offboarding. Moving volunteers earlier also reflects how volunteer-heavy many Global South organisations are.
- **High · Missing conduct, grievance and discipline.** 5.5 P1 says "Module 4 explains how to design each part", including "leave and absence… conduct and grievances", but no Module 4 lesson covers them. Add one paragraph to 4.7: "Agree how people raise a grievance, how misconduct is handled and how harassment, sexual exploitation and abuse are reported. Keep these procedures short and fair, and check them against local employment law." Point to the Module 10 lessons on HR policies and whistleblowing. Then correct 5.5 P1.
- **High · 4.1 P3 employment status needs a decision rule, not just a warning.** Add: "In many countries, if you set someone's hours, supervise how they work, provide their equipment and they work mainly for you, the law may treat them as an employee, whatever the contract says." (Consistent with ILO Recommendation 198, which is already a resource here.)
- **High · 4.8 volunteer stipends.** Many community programmes pay volunteers flat allowances. Add: "Paying more than real expenses, or regular flat allowances, can make a volunteer legally an employee or create tax duties in some countries. If you pay stipends, take local advice and treat them consistently."
- **Medium · 4.6 pay.** This lesson is too heavy for a team of three and missing two realities. Add: "In a team under five, write your principles and a simple salary table; bands can come later." Also add one sentence each on **founder pay** (it is often unpaid or below market; plan when this changes) and on **national and international staff pay** (state how you avoid unjustified gaps). Equal pay is a legal duty in many countries, so say so.
- **Medium · 4.5 P4 jargon.** The strong example uses "capability procedure" (UK HR term). Replace with "a written procedure for handling performance problems". In P2, "KPIs and programme indicators" is not yet defined for this course; add "(the measures you use to track progress)".
- **Medium · 4.7 survey.** "An annual anonymous culture survey" is not anonymous in a team of four. Add: "In small teams, use an external person or a facilitated conversation instead."
- **Medium · 4.9 stage and legal points.** Change the stage from Review to Manage. Add to P1: "final pay and leave owed under local law, return or deletion of personal data, and your policy on giving references."
- **Low · 4.1 strong example.** "delivery lead (0.6)" → "delivery lead (0.6, three days a week)". Novices do not know full-time-equivalent shorthand.

### Add / cut / merge / move
- Move 4.6 to second position and 4.8 to fifth (see above). 4.4's "Working agreements" field overlaps with 4.8 Culture practices; in 4.8, refer back to it rather than asking again.
- Review check for 4.10: every working relationship has written terms; pay principles explain every salary; a new person knows where to get help; there is a written route for concerns about conduct; every critical role has cover.

### Lesson notes
- 4.3 P1 (reading ease 26) → "Put every working relationship in writing. Employees need an employment contract. Contractors need a services agreement. Volunteers and interns need a simple agreement. It should describe the role and support, but avoid wording that makes it look like a job."
- 4.3: add a field hint for cross-border work: "If someone works for you from another country, check which country's law applies."
- 4.2 P2: "Be transparent about pay" → "Publish the pay range in the advert."
- 4.8 P4: add "insurance cover for volunteers" to the records sentence.

## Module 05 · Internal Systems & Operations

### Verdict
The good material here is very good: the proportionality and triggers in 5.2, the day-one essentials in 5.7, and the practical security habits in 5.8 and 5.9. But the module calls itself "a map" (intro) and spends four of its 10 taught lessons on overviews of other modules, which makes it the longest and least original module in the course. Cut it to 8 lessons, each with a self-sufficient minimum.

### Keep
5.2 in full · 5.3 "Ask the people who do the work to describe what really happens" · 5.4 "Build an annual cycle backwards from fixed dates" · 5.7 check "before your first activity, not after" · 5.9 the owner/export/two-factor checks · 5.10 the issue-versus-risk distinction.

### Adjust
- **High · 5.10 confidentiality.** "Keep both in one place" and the 5.10 P1 list "a complaint… an incident" could lead teams to log safeguarding cases or data breaches with names in a shared issue log. Add: "Safeguarding concerns, whistleblowing reports and personal data breaches do not go in the general issue log. Record them through the confidential route, with access limited to the named lead."
- **High · 5.5 P1 cross-reference is wrong** (see Module 4). Change it to: "Module 4 covers recruitment to leaving; workplace policies such as leave, grievance and discipline are in Module 10."
- **High · 5.7 is the most important lesson in the course for safety, but it has 127 words and one field.** Make it a checklist, with a minimum version of each item: code of conduct (one page, signed); safeguarding (named lead, reporting route, and a route for concerns about staff behaviour); data (what you collect, where, who sees it); consent (photos, stories, participation); conflicts of interest (board, founders **and anyone who approves spending**); and an incident contact for emergencies. Move it to second place in the module.
- **Medium · 5.1 strong example does not match the lesson.** The lesson is an operating map, but the example is a single request register. Replace it with: *"Annual plan (executive director) → budget (operations lead) → monthly spending report → quarterly board pack. Hand-off that fails today: programme changes are not passed to finance, so budgets go out of date."*
- **Medium · 5.8 P2.** "Organise folders… by strategic objective" contradicts "stable categories", because objectives change with each strategy. Recommend functions as top-level folders (Governance, Finance, People, Programmes, Partnerships, Communications), with programmes and objectives inside them.
- **Medium · 5.8 P3 legal caution on retention.** Add: "Some records, especially financial and employment records, must be kept for a minimum period set by law, often several years. Personal data must not be kept longer than needed. Check both locally."
- **Medium · 5.9 Global South realities.** Add one sentence on low bandwidth, mobile-first and offline-capable tools, and on costs in local currency. Add the most common real failure: "Make sure the organisation, not one person, owns the domain, the admin accounts and the bank logins. Do not run organisational tools from a founder's personal email."
- **Medium · Promo placement.** The four-tool upsell ("One connected toolset instead of ten disconnected apps") sits on 5.9, the lesson that teaches "prefer fewer tools" and "choose tools after you know the process". It reads as self-serving there. Move it to 5.10, where the tools directly fit the exercise, and keep the export test in the pitch ("you can export everything to Excel").
- **Low · 5.2 stage** should be Design, not Understand.

### Add / cut / merge / move
- **Merge 5.1 + 5.2** into "Your operating map and minimum systems". Fields: systems inventory (add a column for "now, or which trigger"), plus hand-offs that fail.
- **Merge 5.5 + 5.6** into "People and money records: the day-one minimum". Keep only what someone who owns only Course 2 must do now: confidential personnel folder; leave record; payroll route; separate bank account; every payment recorded with a receipt; a second person checks the bank statement monthly. Point to 9.6 for the full control map instead of repeating it.
- **5.4** should start from the 3.4 governance calendar. Change the field hint to "Start with your governance calendar from lesson 3.4, then add finance, funder, statutory and people dates." Note that 13.8 then covers how to run the meetings.
- **5.10:** remove the decision-log sentence (P3) and refer back to the 3.9 decision log.
- Resulting order (8 taught lessons): Operating map and minimum systems → Compliance essentials → Processes and SOPs → Planning and reporting calendar → People and money records → Information → Digital tools → Issues and actions.
- Review check for the module review: every system has an owner; the triggers for new systems are written down; the day-one essentials are in place before the first activity; confidential records are restricted; you can export every tool's data.

### Lesson notes
- 5.2 P2 (49 words) → "A useful minimum for most new organisations has six parts. A shared folder with a clear structure. A simple budget and a record of money in and out. A list of commitments and deadlines. Basic policies for conduct, data protection and, where relevant, safeguarding. A weekly planning routine. A place to record decisions."
- 5.6 P2 (reading ease 30) → "Internal controls are simple checks that stop mistakes, fraud and misuse. Approvals follow your delegation of authority (lesson 3.6). Different people request, approve and pay. Two people sign larger payments. Each month, someone who did not make the payments checks the bank statement against your records."
- 5.9: define CRM on first use: "CRM (a database of your contacts and supporters)".
- 5.9 field 'tools' has 7 columns in one text box. Move the full table to the Excel sheet and ask in the form for "your five most important tools and their biggest risk".

## Quick wins
1. Replace "director" with "executive director" in Module 3 and add a one-line definition in 3.2. Note in 3.3 that company "directors" are board members.
2. Correct the false cross-reference in 5.5 P1, and add the conduct/grievance/harassment paragraph to 4.7.
3. Add the confidential-route sentence to 5.10 (safeguarding, whistleblowing and data breaches stay out of the general issue log).
4. Add three legal-caution sentences: a founder as paid trustee (3.4), the employee-versus-contractor decision rule (4.1), and volunteer stipends (4.8).
5. Move Pay (4.6) before Recruitment (4.2).
6. Replace the mismatched strong examples in 3.5 (role card) and 5.1 (operating map).
7. Label every forward reference with its course name ("Module 10, in Course 4 · Protect").
8. Add the "If this does not apply yet, write the trigger" hint convention to optional-for-now fields.
9. Set realistic times per lesson (10–45 min) instead of a flat 20.
10. Split the five longest list sentences (5.2 P2, 5.6 P2, 5.5 P2, 3.2 P1, 4.3 P1) using the rewrites above.
