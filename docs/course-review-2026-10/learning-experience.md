# Whole programme · Learning experience (UX + instructional design) — panel review

Scope: the whole Method into Impact Planning System from end to end. That covers the architecture, the lesson template, navigation, progress, terminology, onboarding, cross-course overlaps, mobile and accessibility. It does not review lesson content in depth. Evidence comes from walking the local preview at 1366px and 390px, from `learning.js`, `course/*.js` and `metrics.md`, and from a simulated learner who completed Module 0 and lessons 1.1–1.2. Screenshots are in `../screens/`: `d-*` is desktop, `m-*` is mobile and `*-progress-*` is the state after progress.

## Verdict

The programme's spine is strong. Five courses ask five questions in a sensible order. Every module ends in a named output, and every lesson saves into one workspace (Your Organisation) that grows into a real organisational pack. The best single strength is this "every exercise builds the pack" design: the review lessons, the "Use your earlier course work" panel and the 0.3 → 13.9 health-check loop make it feel like one system, not 14 separate courses.

The biggest problem is the lesson page. The teaching is buried under chrome, placeholders and add-ons. In 1.5 Mission the first paragraph of the lesson starts 1,239px down on desktop and 1,621px down on mobile, below a five-tile asset strip and an empty "video coming soon" player. The Read section then has 427 words of "Explore further" callouts against 198 words of lesson. The Save button sits at 4,623px (desktop) and 6,658px (mobile). A second problem runs through the whole site: inconsistent names and numbers. The programme, its parts and its outputs each have two or three names, and Module 0.1 tells learners the five phases have different names from the five courses they bought.

None of this needs new content. It needs a leaner template, one vocabulary and about 15–20 fewer lessons, achieved by merging the overlaps listed below.

**Scores (1–5)**
- **Architecture: 4.** The five-question sequence is clear and outputs are well named. Module 11 (23 lessons, 7.5 h) is out of proportion, and roughly 10% of lessons duplicate one another.
- **Lesson template: 2.** The order is right in principle, but the read-example-exercise core is pushed below the fold and diluted by six other blocks.
- **Navigation & progress: 3.** The sidebar, prev/next and Your Organisation work well. Course and module pages ignore progress, there is no module-complete moment, and breadcrumbs skip the course level.
- **Terminology & consistency: 2.** "Course" means both one course and the whole programme. "Organisation Pack" is both Course 2's output and the whole pack. "Resources" means three different things, and the tools have three names.
- **Onboarding: 3.** Module 0 is well conceived (profile, baseline, priorities). It contradicts the course structure, though, opens with a sales box and promises personalisation that does not exist.
- **Mobile & accessibility: 3.** It is responsive with no overflow except one decorative shape, has visible focus and labelled fields. But about 51% of exercise fields ask for pipe-delimited tables typed into textareas, there are 52 tab stops before the lesson text, and key sections have no headings.

## Keep (what works — do not lose this)

- **Five questions, in order** (courses.html: "Why do we exist? / Who does what? / How do we show change? / What keeps us safe? / How do we keep going?"). This is the clearest framing on the site, so use it everywhere.
- **One named output per module and one Pack per course.** "You will create: Strategic Foundation" on the first lesson of each module gives every module a purpose.
- **Your Organisation** (`organisation.html`). It shows progress per course, has per-module accordions, a "Continue learning" button, Markdown and PDF export, and backup and restore. This is the motivational centre of the programme.
- **"Use your earlier course work" panel** (`context()` in learning.js). Showing your own earlier answers inside a later lesson is excellent instructional design.
- **Too vague / More useful + "Why this works".** This is the most effective teaching device in the template. Keep it high on the page.
- **One quality check per lesson** (for example 1.5: "Can a new team member explain your work after reading this once?"). It is a good self-assessment habit.
- **Baseline health check in 0.3, repeated in 13.9.** It is a real before and after. Keep it and make it more visible.
- **Explicit cross-references** ("Module 10 teaches a full risk method; here, note the risks…" in 2.8; "This lesson creates the calendar. Module 13 teaches…" in 5.4). The authors already manage overlap by hand, and the fixes below formalise that.
- **Sidebar with per-lesson ✓/○ and per-module counts.** Prev/next names the next lesson ("Next: Values in practice →").
- **Honest status messages:** "Drafts save on this browser…", "being prepared" on workbooks, "Fictional examples for learning".
- **Accessibility basics:** a skip link, `lang="en"`, labelled textareas with `aria-describedby` hints, a 3px visible focus ring, `role="status"` save messages, reduced-motion rules, and body text contrast of 5.4:1.

## Programme-level adjustments (prioritised)

| Priority | Issue | Evidence | Recommended fix |
|---|---|---|---|
| High | Lesson teaching is buried | 1.5 Mission: first Read paragraph at y=1,239 (desktop) / 1,621 (mobile); Save at 4,623 / 6,658; 192 links on the page | Use the new lesson order (see Lesson template). Read starts within the first screen, the video slot is hidden until a video exists, and the asset strip is removed. |
| High | Resource callouts outweigh the lesson | 1.5: 198 lesson words vs 427 callout words in #read; 11.3: 137 vs 386 | Move "Explore further" cards out of the reading into one collapsed "Go deeper (3)" box after the example. Keep only the "Keep this open while you work" link inside the exercise. |
| High | The programme contradicts its own structure | 0.1 P2: "five phases: Clarify…, Organise…, Prove and Show…, Sustain and Protect (finance, legal and risk, resources and partnerships) and Run". The real courses are Clarify / Organise / Prove & Show / Protect / Sustain & Run. | Rewrite 0.1 P2 to match courses.html word for word: "The thirteen modules after this one sit in five courses, each answering one question: Clarify (why do we exist?), Organise (who does what?), Prove & Show (how do we show change?), Protect (what keeps us safe?), Sustain & Run (how do we keep going?)." |
| High | Fields ask learners to type tables into textareas | 146 of ~287 exercise fields use "a \| b \| c" hints (for example 0.3 "area \| rating \| evidence" for 14 areas; 3.7 RACI; 10.12 risk register; 13.2 KPIs) | Phase 1: show a pre-filled example row in each textarea (as a placeholder) and accept line breaks or tabs as well as "\|". Phase 2: a simple repeating-row input for the 20 most-used table fields (risk register, RACI, KPIs, indicators, pipeline, budget lines). |
| High | One vocabulary is missing | "Course 0%" in the lesson header means the whole programme; Course 2's output is "Organisation Pack" while the whole pack is also "organisation pack"; tools are "Impact Tools", "Ethical Bridge Software Suite" and "Impact Software Suite" | Adopt the glossary in Terminology and make it a single source in course-data.js. |
| High | Module 11 is too big and partly irrelevant to most learners | 23 lessons, 450 min; 11B has 10 income-stream lessons; module completion needs every field filled | Make 11B elective: complete 11.1–11.4, choose at least 2 streams from 11.5–11.14, and let the module review count only those chosen. Merge 11.1 + 11.2 and 11.21 into 11.16/11.22 (see Overlaps). |
| Medium | ~15 overlapping lessons across courses | Risk in 2.8, 5.10, 10.11–13, 12.9, 13.7; KPIs in 6.3, 8.13, 11.21, 12.10, 13.2; budgets in 6.6, 9.2, 9.3, 11.18; funder reporting in 6.11, 9.8, 11.20; rhythms in 3.9, 5.4, 13.8 | Give each topic one home and turn the other lessons into "apply it here" lessons using the home's columns (table below). Net effect: about 145 lessons and about 46 h. |
| Medium | No moment of completion for a module | Completing 0.4 sends the learner straight into 1.1 (simulated run) | Add a module-complete interstitial: "You built X · it feeds Modules Y, Z · download / share · next module". |
| Medium | Course and module pages ignore progress | After 6 lessons done, course-clarify.html still shows "Get Clarify · US$29 / Preview the first lesson"; strategic-foundation.html shows "Begin this module →" at 2/10 | Show "Continue 1.3 →" and a ✓ per lesson when there is saved progress, as Your Organisation already does. |
| Medium | Stage arc is shown on every lesson but jumps around | 13 backward jumps (for example M10 "UDIDDDIDIMUIR", M11 "…IIDUIMIIMMRR"); 0.3 is labelled "Review" in an onboarding module; 6.8 Evaluation is "Review" and is followed by 6.9 "Implement" | Either fix the stage labels so each module runs forward (for multi-part modules like M10 and M11, restart the arc per part and say so) or replace the 5-pill arc with a single small tag. |
| Medium | First lesson ends in a sales box | 0.1 has a full Impact Tools promo (`m0.promo.lesson='journey'`); 14 of 14 modules carry a promo | Remove the promo from Module 0. Put module promos on the review lesson only, after the learner has produced the output. |
| Medium | Onboarding promises personalisation that doesn't exist | M0 intro: "choose the examples that fit your legal form and stage"; there is no mechanism | Remove the claim, or (better) tag lessons as Essential / If relevant to your form or stage, and let a lesson be completed as "Not relevant to us yet — reason". |
| Low | Uniform time estimates | Every taught lesson is "About 20 minutes", from 2.5 Outputs (77 words, 1 field) to 0.3 health check (14 areas + evidence) and 9.2 organisational budget | Use 10 / 20 / 40 bands based on field count and task type. Show "≈ 3 h a week = about 4 months" for the full pathway. |

## Architecture & size

**Shape.** 5 courses → 14 modules → 160 lessons (146 taught + 14 reviews) → 3,115 minutes (about 52 h). Per course: Clarify 24 lessons / 7.7 h · Organise 31 / 10.1 h · Prove & Show 35 / 11.3 h · Protect 25 / 8.2 h · Sustain & Run 45 / 14.7 h. The site now consistently says 5 / 14 / 160 / ~52 (counters animate up from 0, so screenshots taken mid-animation show lower figures).

**Is it the right size?** For a paid self-paced programme aimed at founders with small teams, 52 hours is at the top of what people finish. The issue is uneven shape rather than total length. Module 11 alone (7.5 h) is longer than all of Course 1's core modules together. Module 7 (9 lessons) versus Module 8 (14) splits brand and comms unevenly. The aim should be **about 140–145 lessons and about 45 h**, achieved by merging overlaps and making 11B elective rather than by cutting core content. That also brings Course 5 to about 11 h, in line with the others.

**Sequencing.** The order works, with two exceptions:
- **9.2 depends on Module 13.** 9.2 P2 says "Build it from your annual plan", but the annual plan is 13.1, two courses later. Rewrite as: "Build it from your strategic objectives (1.9) and a first list of this year's activities. Module 13 (13.7) reconciles the budget with your final annual plan."
- **Protection arrives late.** Safeguarding, consent and data protection are needed before storytelling (8.4) and data collection (6.5). Lesson 5.7 "Compliance essentials from day one" is the right safety net, so keep it and strengthen it. Make 5.7 a required "safety minimum" checkpoint and link 6.5 and 8.4 back to it explicitly. Do not reorder the courses: they are sold separately and the numbering is embedded everywhere.

**Course → module → lesson naming.** Courses are numbered 1–5, modules 00–13 and lessons 1.5. A learner in "Course 2" meets "Module 03", and "Course 1, Module 2" is easily misread. Recommendations:
- Drop the zero-padding ("Module 3", not "Module 03"). Lesson numbers already use "3.7".
- Fix "Module 01 of 13" on module pages and lesson headers. There are 14 modules, and "Module 00 of 13" reads as a bug. Use "Module 3 · Course 2 Organise" or "Module 3 of 13 (after Start Here)".
- Module 11 parts ("11A · Foundations") add a fourth level. If 11B becomes elective, keep the part labels, and only there.

## Lesson template

**What a learner sees now, top to bottom** (1.5 Mission, desktop): a 3-level breadcrumb, then the meta line "Module 01 of 13 · Lesson 5 of 10 · Course 0%", "Module progress: 0/10", a progress bar, an eyebrow, the H1, the 5-pill stage arc, the save notice, "Export course backup", the 5-tile asset strip, a 16:9 "Video coming soon" player, the "Use your earlier course work" panel, Read (with three large Explore further cards inside it), the example, Reflect, the exercise, the Excel panel, the tools promo (in 14 lessons), the tool panel and prev/next. On the first lesson of a module, a module-opening block with a second "coming soon" video is added (0.1 shows two stacked video placeholders).

**Problems**
1. **What comes first is chrome, not teaching.** Three progress indicators (sidebar "0 of 160", "Course 0%", module bar), a backup link and the asset strip come before any content. On mobile the first screen holds no lesson content at all (`m-l-mission.png`).
2. **The asset strip is a table of contents for a page that is already linear.** Its tiles promise "Watch · Short video" (none exist) and an Excel workbook ("being prepared", disabled). On mobile it stacks to five full-width cards, about 420px (`m-mission-scroll2.png`). It also says each lesson has five parts, while 0.1 P3 says "three parts" and the home page says "same four moves: Watch, Read, Apply, Save".
3. **Video placeholders over-promise.** Every module page and lesson says "Every lesson has a short video", and 160 out of 160 are "coming soon". The brand value "Honest about limits" is undercut.
4. **Resource cards interrupt the argument.** Each card (title, source, "Why we chose it", "What to look for", "Use it in this lesson", two links) is longer than the paragraph before it.
5. **Reflect is a lone question between example and exercise.** It has no heading and nowhere to answer, so most learners skip it.
6. **Promo, tool panel and Excel panel repeat the same message** ("you can also do this in Excel / in a tool") in three blocks after the exercise.
7. **Review lessons are a read-only dump plus one checkbox** ("I have reviewed this output, checked the assumptions…"). Nothing asks the learner to synthesise, check consistency or decide what to share.

**Recommended lesson order** (no new content required):
1. Breadcrumb (Course › Module › Lesson), then H1, then one meta line: "About 20 min · Design · You'll produce: Our mission (4 short answers)".
2. **Read**: the lesson paragraphs only. Show a real video above Read only when `l.video` exists; otherwise show nothing, or a one-line "Video for this lesson: coming soon".
3. **See an example**: too vague / more useful / why this works.
4. **Your exercise**: Reflect becomes the exercise's opening line ("Before you write: which attractive opportunity would fall outside your mission?"). Then "Your earlier answers that feed this" (a filtered context panel showing the relevant lessons, not whole modules). Then "Keep this open while you work" (1–2 links), the fields, the quality check and Save & continue.
5. **Go deeper (collapsed)**: the Explore further cards, closed by default and showing the count.
6. **Work elsewhere (one compact row)**: "Excel sheet: Mission (workbook being prepared)" plus, where relevant, "Tool: Strategic Objectives →". The promo goes on review lessons only.
7. Prev / next.

Move "Export course backup" to the sidebar and Your Organisation, and add an automatic reminder after every completed module.

**Review lesson template:** keep the assembled output, then add three short fields that count towards completion:
- "Where do your answers disagree with each other?" (with a module-specific prompt, for example "Does every objective in 1.9 trace back to your mission in 1.5?")
- "What is still an assumption, and how will you test it?"
- "Who will you share this with, and by when?"

End with "Download this output" and the module-complete panel.

## Navigation & progress

- **Breadcrumbs differ on every page type.** Lesson: "Courses › Planning System › Module 01" (no course level). Module page: "Planning System › Module 01 of 13" (no Courses). Course page: "Courses › Course 1 · Clarify". Your Organisation: "Planning System › Your Organisation". Fix to one pattern: **Courses › Course 1 Clarify › Module 1 Strategic Foundations › 1.5 Mission.** Drop "Planning System" as a breadcrumb level, because `planning-system.html` is essentially a second copy of the home page.
- **Sidebar.** It works, but the course labels are 11px orange at 3.13:1 contrast (`.phase-label a`), it opens with "Planning System · course contents", and it shows all five courses even to a buyer of one. Rename it "Course contents", show the learner's own course first, and show locked courses as collapsed single lines.
- **Resume.** Home, courses.html and Your Organisation correctly show "Continue your course →" after progress. Course pages and module pages do not (see table). Module pages also list every lesson with "Video · Reading · Exercise" on every line (23 times on Module 11), which is noise. Replace it with ✓/○ status and minutes.
- **Prev/next.** Good. At the end of a module the next link reads "Next module: …" but completing the review jumps straight in with no transition. Add the module-complete panel.
- **Your Organisation.** It is the best page, but the header nav highlights "Home" while you are on it, and it is only reachable from the footer, the sidebar and lesson CTAs. Add "My Organisation" (or "My learning") to the main header for signed-in or in-progress learners. The eyebrow "Your course strategy pack" and the button "Download strategy pack" introduce a fourth name for the pack.
- **Evidence Library.** It is strong (240 resources, filters by course, module, type, role and perspective), but the page has two identical H1s, the filter UI is dense on mobile, and the asset strip calls the same material "Resources". Rename the tile and links "Evidence for this lesson".
- **Impact Tools page.** The title is "Ethical Bridge Software Suite", the hero says "Course outputs open as working plans" and "1 data model · Plan once, use everywhere", but every lesson says "Nothing is copied automatically — import this module's workbook or re-enter your work". Align the software page with the lesson copy. This is a credibility issue.
- **Start-here entry points disagree.** The footer's "Start here" (Help & access) leads to `read-me.html`, which says "Open the Planning System and start with Module 1, Purpose" and whose button "Start with Purpose →" actually opens 0.1. Courses.html says "Start Module 0 free". Fix read-me.html to "Start with Module 0 (free, about 1 hour)" or redirect it to start-here.html.

## Terminology

| Concept | Names in use now | Use this |
|---|---|---|
| Whole product | Method into Impact, Planning System, "the course" (0.1), Full Pathway (bundle) | **Method into Impact** (brand) and **the programme** in running text; "Full Pathway" only for the bundle price. Retire "Planning System" from learner-facing UI. |
| One of five | Course, phase (0.1 P2, code), Course N · Name | **Course** (never "phase") |
| Middle level | Module 01, 01., Module 1 | **Module 1** |
| Smallest unit | lesson, section (code comments), "lessons and reviews" | **Lesson**; a **module review** is a kind of lesson |
| Lesson steps | 3 parts (0.1), 4 moves Watch/Read/Apply/Save (home), 5 tiles Watch/Read/Apply/Resources/Excel (lesson) | **Read · Example · Exercise** (+ optional Video, Go deeper, Excel) |
| What a lesson produces | exercise, Apply, "Your exercise", answers | **Exercise** → **answers** |
| What a module produces | output, "You will create", Pack (3.10, 9.11, 10.14) | **Module output** (drop "Pack" from module output names: "Structure & Accountability", "Financial Management Plan", "Compliance & Risk Register and Policies") |
| What a course produces | Pack (Clarity Pack, Organisation Pack, Evidence & Voice Pack, Protection Pack, Delivery Pack) — only on home and courses.html | **Course pack**, and show the same five names on Your Organisation and the course pages. Rename Course 2's pack (it collides with the whole pack) to "Operations Pack" or "Team & Systems Pack". |
| Everything together | organisation pack, strategy pack, Your Organisation | **Your Organisation** (the workspace) and **your organisation pack** (the download) |
| Spreadsheet | workbook, Excel, sheet, "Course resources" (resources.html) | **Module workbook**, with one **sheet** per lesson |
| Readings | Resources, Explore further, Evidence Library, evidence | **Evidence Library**; in lessons, **Go deeper** |
| Software | Impact Tools, Ethical Bridge Software Suite, Impact Software Suite, Relationship CRM / Ethical Bridge CRM | **Impact Tools** everywhere inside Method into Impact |
| Stages | Understand/Design/Implement/Manage/Review vs Build/Strengthen/Run pillars | Keep both, but never put them side by side; the pillars are marketing only |

Also fix the home page claim "A written explanation with a worked example from a real purpose-led organisation". Every lesson says "Fictional examples… not claims about real organisations", so the home page should say "a worked example".

## Onboarding (Module 0 and start pages)

**What works:** Module 0 is free and short (70 min). It asks for the right things: form, stage, activities and open questions (0.2), and an honest baseline across 14 capability areas that maps to the 13 modules (0.3), revisited in 13.9. The weak/strong pair in 0.1 ("Skip to the module I need… copy a template") addresses the most likely behaviour of an urgent founder.

**Fix:**
- **0.1 P2 course names.** This is the High item above.
- **0.1 exercise says "Look at the course map"**, but there is no map on the page and the Course map sheet is "being prepared". Embed a compact five-course and 14-module map (the courses.html "Five questions, in order" strip plus module titles) in 0.1, above the exercise.
- **0.1 field "The module I most need"** is free text. Make it a choice list of modules plus "why". This allows a "Your priorities" list on Your Organisation and lets 13.9 compare against it.
- **0.3** puts 14 areas × rating × evidence into one textarea using pipes. This is the single hardest form in the programme, and it is the learner's third screen. Make it a 14-row table with a rating select and a short evidence box, or at minimum pre-fill the 14 area names as lines. Raise the estimate to 30–40 minutes.
- **Remove the Impact Tools promo from 0.1,** and remove "Every output you build can become a live, shared plan" from start-here.html. Selling before the learner has produced anything harms trust.
- **0.4 "Your starting point"** should end with a one-screen summary: "Your priorities: X, Y, Z → start Course N / Module M", plus a realistic pace ("At 3 hours a week, Course 1 takes about 3 weeks").
- **Personalisation promise.** See the table above. The cheapest honest version is static "If relevant" tags on the lessons that depend on form or stage (for example 11.12 Membership, 11.14 Investment, 4.8 Volunteers, 7.4 Brand architecture) plus a "Not relevant to us yet" completion option.

## Cross-course overlaps — proposed single home

| Topic | Where it appears | Single home | What the others become |
|---|---|---|---|
| **Risk** | 2.8 Assumptions, risks; 5.10 Issues; 10.11–10.13 (3 lessons); 12.9 Partnership risk; 13.7 Integration; 8.12 Crisis | **Module 10.** Merge 10.11 + 10.12 into "Identify, assess and register risks"; keep 10.13 Monitor | 2.8 → "Assumptions and evidence" (risks are a one-line hand-off to the register). 5.10 keeps issues and actions only. 12.9 adds partnership rows using the 10.12 columns (no method re-taught). 13.7 only checks that the top risks have actions. 8.12 links its crisis scenarios to register rows. |
| **KPIs / indicators** | 6.3–6.4 Indicators, baselines; 8.13 Comms metrics; 11.21 Fundraising KPIs; 12.10 Partnership KPIs; 13.2 Organisational KPIs; 9.10 Financial health | **6.3 teaches what a good indicator is** (programme results). **13.2 is the single organisational KPI set** | 8.13, 11.21, 12.10 and 9.10 each produce 2–3 candidate KPIs in the 13.2 format (KPI \| baseline \| target \| owner). 13.2 opens by pulling those candidates in through the context panel. Merge 11.21 into 11.16 Pipeline. |
| **Budgets** | 6.6 MEAL budget; 9.2 Organisational budget; 9.3 Project budget; 11.18 Proposal budget; 11.10 Campaign budget; 13.7 | **Module 9** (9.2 and 9.3) | 6.6 and 11.10 produce budget lines "to add to 9.3". 11.18 becomes "Adapt your 9.3 budget to a funder's rules" (shorter, same sheet columns). Fix the 9.2 → 13.1 circular reference. |
| **Reporting to funders** | 6.11 Reporting evidence; 9.8 Financial reporting; 11.20 Reporting & compliance to funders | **11.20** (obligations and the funder calendar) | 9.8 keeps board and statutory reporting. 6.11 keeps evidence quality. All three feed one reporting calendar in **5.4**. |
| **Operating rhythm / meetings** | 3.9 Coordination; 5.4 Annual calendar; 5.10 Actions & decisions; 6.10 Learning reviews; 13.8 Review rhythm | **13.8** (the review rhythm and dashboard); **5.4** stays the calendar | 3.9 keeps channels and hand-offs only (remove the weekly/monthly/quarterly rhythm, which 13.8 repeats). 6.10 defines the learning-review agenda that slots into 13.8. |
| **Legal form** | 0.2 Profile; 1.7 Form; 3.3 Governance by form; 11.2 Resource models by form | **1.7** (the choice) | 3.3 = governance for the chosen form. Merge 11.1 + 11.2 into one "Your resource model" lesson. |
| **Contracts & HR policy** | 4.3 Contracts & terms; 10.3 Contracts & agreements; 10.8 HR policies; 12.7 MoUs | **10.3** (register and pre-signature checklist) | 4.3 = what employment and volunteer terms contain. 12.7 = partnership-specific clauses. Fold 10.8 into 10.2 (policy needs list), since 10.8 itself says "Many HR policies are already designed in Module 4". |
| **Complaints / feedback** | 6.9 Feedback & complaints; 10.7 Whistleblowing, complaints, incidents | **10.7** (procedure and escalation) | 6.9 = the participant feedback loop and "closing the loop"; it hands sensitive cases to 10.7 (already says so). |
| **System overviews** | 5.5 People systems; 5.6 Finance & controls; 5.7 Compliance essentials | Module 4 / 9 / 10 respectively | Merge 5.5 + 5.6 into 5.2 "Minimum viable systems" as a checklist. **Keep 5.7** as the early safety minimum. |
| **Mapping people and organisations** | 1.3 Stakeholders; 8.2 Audiences; 11.15 Prospects; 12.3 Ecosystem | **1.3** (master stakeholder map) | 8.2, 11.15 and 12.3 start from the 1.3 map (context panel) and add only their own columns. |
| **Health checks** | 0.3 / 13.9 organisational; 9.10 financial; 12.10 partnership | Keep all three (different objects) | Name them distinctly: "Organisation health check", "Financial health measures", "Partnership health check". |

The net effect is about 8–10 fewer lessons, plus Module 11 made elective (about 8 fewer lessons for a typical learner), with no loss of content.

## Mobile & accessibility

- **Horizontal overflow** on courses.html at 390px (scrollWidth 449): decorative `.hm-shape-1` and `.hm-shape-f2` spans. Clip them with `overflow:hidden` on the hero.
- **Mobile lesson length:** 7,900–8,600px per lesson. The template changes above cut this by about 35%.
- **Pipe-table fields** are hardest on a phone keyboard and for second-language users (see High item).
- **Keyboard:** 52 Tab presses from the top to the first link in Read, because the open sidebar (desktop) holds every module and lesson link and the skip link goes to `#main`, which contains the sidebar. Point the skip link at `#lesson` (or add "Skip to lesson").
- **Headings:** "See an example" and "Reflect" use eyebrows only, so screen-reader users navigating by heading miss them. The context panel injects H3s ("0.1 How this course works") before the lesson's first H2. Make Example, Reflect and Go deeper H2s, and step context-panel headings down.
- **Contrast:** body and hint text pass (5.2–5.8:1). The sidebar course labels fail (3.13:1 at 11px), and eyebrows and stage pills are 11–12px uppercase. Raise them to at least 13px and darken the orange.
- **Line length:** the Read column is 790px at 16px, about 95–100 characters per line. Cap it at about 70ch for readability, which matters given the FRE 40–50 average.
- **Video placeholders** use `role="img"` with an accessible name, which is correct, but they announce "video coming soon" on every lesson. Hiding them also fixes this.
- **Positive:** labelled fields with linked hints, a visible 3px focus ring, `role="status"` save feedback, reduced-motion support, and no unlabelled inputs or images found on the 16 pages checked.

## Quick wins (≤10, biggest effect for least effort)

1. **Rewrite 0.1 P2** so the five course names match the real courses (copy text given above).
2. **Hide the video slot and the asset strip** when there is no video. This moves Read about 600px higher on every lesson, and it is a two-line change in `renderLesson`.
3. **Collapse the "Explore further" cards** into one closed "Go deeper (n)" box after the example.
4. **Remove the Impact Tools promo from Module 0** and move module promos to the review lesson.
5. **Fix labels:** "Course 0%" → "All courses 0%"; "Module 01 of 13" → "Module 1 of 13"; read-me.html "start with Module 1, Purpose" → "start with Module 0"; the home page's "real purpose-led organisation" → "a worked example".
6. **One breadcrumb pattern** (Courses › Course › Module › Lesson) on lesson, module, course and Your Organisation pages.
7. **Show progress on course and module pages:** "Continue 1.3 →" and ✓ per lesson, reusing `overview.js` with the `stats()` already imported.
8. **Pre-fill every pipe-format field** with an example row as placeholder text, and accept line breaks.
9. **Skip link to `#lesson`**, add headings to Example and Reflect, and fix the sidebar label contrast and the courses.html overflow.
10. **Add a module-complete panel** after each review: what you built, which later modules use it, download, next module.
