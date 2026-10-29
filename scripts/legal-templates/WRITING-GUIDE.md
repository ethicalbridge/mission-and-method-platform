# Method into Impact template library: writer's brief

You are writing templates for the **Method into Impact** library (methodintoimpact.com). Method into Impact gives founders and small purpose-led organisations a method, tools and support: NGOs, community-based organisations, social enterprises and co-operatives, usually 2–10 people, working in many countries (strong Global South focus: Africa, Asia, Latin America). The founder has a legal background and 13+ years in compliance and international development. Buyers download these templates as branded Word files, adapt them, and adopt them as their own documents.

The templates replace weak outlines that had only headings. The new standard is set by a set of real, well-written policies from a sister platform. They are your **models for depth, tone and structure**, but they are written for one specific online platform. You must generalise them for any small organisation.

## Files

- Builder: `node /tmp/claude-0/-home-claude/6c4781f9-e6b3-5467-8012-26cf9f1f1d79/scratchpad/tpl/build.js <slug>` turns `src/<slug>.md` into `out/<slug>.docx`. Run it after writing each file and fix any `FAILED` line.
- **Exemplar, read it first and match it:** `tpl/src/code-of-conduct.md`. It is the finished Code of Conduct, adapted from the model.
- Models (plain text): `/tmp/claude-0/-home-claude/6c4781f9-e6b3-5467-8012-26cf9f1f1d79/scratchpad/models/*.txt`: Code_of_Conduct, Safeguarding_Policy_and_Procedure, Anti-Harassment_Intimidation_and_Bullying_Policy_and_Procedure, Fraud_Bribery_and_Corruption_Policy_and_Procedure, Whistleblowing_Policy_and_Procedure, Data_Protection_Policy, Independent_Contact_Role_Note.
- Write only your assigned files in `tpl/src/`. Do not edit build.js, SPEC.md or other writers' files. Do not run LibreOffice/soffice.

## Hard rules

1. **No trace of the model's platform.** Never mention Handova, Ethical Bridge, Didit, "impact CV", "contributions", "needs", "professionals" in the platform sense, Wyoming, or any real person (including Julieta Castiñeira de Dios). Before you finish, run: `grep -inE "handova|ethical bridge|julieta|castiñeira|wyoming|didit|impact cv" tpl/src/<your files>` and it must return nothing.
2. **Generic and adaptable:** the subject is always `[[Organisation name]]`. Everything organisation-specific is a yellow placeholder `[[...]]`: names, roles, emails, amounts, currencies, time limits, countries, laws, thresholds. Options: `[[24 hours / 48 hours]]`.
3. **Write real, usable model wording.** The document must work once the placeholders are filled. Do not write "describe your approach here". Write the approach a sensible small organisation would take, then let users adapt it.
4. **Adapt boxes** (`::: adapt Short title` … `:::`) go right after the text they concern. Use 4–10 per document. Each one says what decision to make, gives realistic options or examples, and, where relevant, gives **country notes** (laws by name and year, regulators, typical rules). Be accurate. If you are not sure of a law's exact name, year or rule, say "check your local law on X" rather than inventing a citation. Never fabricate statistics or legal citations.
5. **Proportionate to size:** open policies and procedures with `::: note Proportionate to our size` (who holds the key roles in a small team, and when the document is reviewed), followed by an adapt box on choosing those people, then `::: glance` (6–9 bullet summary). Agreements and forms do not need these.
6. **Plain language, British English**, short sentences (aim < 25 words), active voice. Policies use "we" for the organisation and "you" for the reader. Define technical terms the first time. Concrete timeframes and steps, not vague duties.
7. Use recognised standards where relevant: IASC six core principles (PSEA), Core Humanitarian Standard (CHS), Keeping Children Safe standards, Misconduct Disclosure Scheme, FATF Recommendation 8 (non-profits and terrorist financing), UN Security Council consolidated sanctions list plus the lists funders use (e.g. US OFAC, EU, UK), GDPR principles as a widely used benchmark (while noting local laws: e.g. Kenya Data Protection Act 2019, Nigeria Data Protection Act 2023, South Africa POPIA, Brazil LGPD, India DPDP Act 2023, Indonesia Law 27 of 2022 on Personal Data Protection, Argentina Law 25.326, Peru Law 29733), UK Bribery Act 2010 and US FCPA as examples of laws with reach beyond their borders.
8. **Cross-reference** other library documents by their exact titles (list below). Do not invent other document titles.

## Markup (exactly what the builder understands)

Front matter (one `key: value` per line; values may contain `[[placeholders]]`; no quotes needed):

```
---
slug: same-as-file-name
title: Safeguarding Policy and Procedure
category: Policies            # exactly one of: Policies | Procedures | Contracts & agreements | Consent forms | Governance & compliance
eyebrow: Policy template · Safeguarding      # short, shown on the cover
summary: One or two sentences shown on the cover; what the document does for the organisation.
type: Policy and procedure    # shown in document control (Policy, Procedure, Code, Agreement, Form, Register, Checklist, Role note, Terms of reference)
applies_to: Who it covers
contact: [[safeguarding@yourorganisation.org]]
purpose: 2-3 sentences for the "How to use this template" page: what the document is for and why it matters (funders, law, people).
who_asks: Who usually asks for it (funders, regulators, partners, banks...)
time: Realistic time to adapt
course: e.g. Course 4 · Protect, Module 10 (Legal, compliance, policies and risk)
related: Title one; Title two; Title three        # semicolon-separated exact titles
control: full | none        # optional. Use none for agreements and stand-alone forms (no "About this document" page)
contents: no                # optional, hides contents list
history: no                 # optional, hides the "Document history" table (use for agreements and forms)
---
```

Body:

- `# Heading` = main section (also listed in contents). `## 1. Numbered subsection`. `### Small heading`. `#### LABEL` = small caps label.
- Paragraphs: plain lines; a blank line ends a paragraph.
- `- bullet`, `  - sub-bullet` (two spaces). `1. numbered` (a new list restarts at 1), `  1. sub-item` gives (a), (b).
- `**bold**`. `[[placeholder]]` = yellow highlighted field, rendered with square brackets.
- Tables: Markdown pipe tables; first row = header when followed by `|---|---|`. Optional widths line right before the table: `{widths: 30 70}`. Use `<br>` for a line break inside a cell. Keep tables to at most 5 columns.
- Boxes, each closed with `:::` on its own line. Boxes can contain paragraphs, bullets, numbered lists and tables (not other boxes):
  - `::: note Title`: cream box, part of the document (e.g. "Proportionate to our size").
  - `::: glance`: green "At a glance" summary.
  - `::: adapt Title`: orange guidance box for the user, deleted before use. Renders as "ADAPT THIS · Title".
  - `::: statement Title`: an acknowledgement or declaration statement.
  - `::: sign` with one label per line (Name, Role, Signature, Date, or "For [[Organisation name]]: name" ...): a signature block, two fields per row.
- `[ ] Option text` = a tick box line (for consent forms and checklists).
- `---pagebreak---` = page break (use sparingly, e.g. before schedules or annexes).
- Do not use HTML, italics, links syntax or images.

## Shape by document kind

**Policy / policy and procedure** (2,500–4,500 words): note "Proportionate to our size" + adapt + glance → `# Who this policy applies to` (scope, where it applies, law and stricter-rule clause) → `# Our commitments` or `# Policy` with numbered `##` subsections → `# Procedure` or `# How to report / respond` with numbered steps, owners and time limits (a table of timescales is good) → `# Roles and responsibilities` → `# Records, confidentiality and data` → `# If this policy is breached` → `# Monitoring and review` → `# Related documents` → `# Acknowledgement` (statement + sign) where people should confirm. Annexes (e.g. a report form, a register template, a flowchart in words) are welcome.

**Procedure** (1,500–3,000 words): note + adapt + glance → purpose and scope → step-by-step stages with timings → roles → records → templates in annex (log table, letter text).

**Agreement / contract** (2,500–4,500 words; `control: none`, `history: no`): a short `::: adapt Before you use this agreement` box at the very top (when to use, when not to use, key legal risks, local-law warning) → `# Parties` (a 2-column table: party details with placeholders) → `# Background` → `# Agreed terms` with `## 1. Definitions`, `## 2. ...` numbered clauses containing numbered sub-clauses (use `1.` lists) → schedules (`# Schedule 1: ...`) → `# Signatures` with `::: sign` blocks per party. Add adapt boxes at clauses that vary most by country (employment status, termination, IP, governing law, tax, data).

**Consent form** (900–2,000 words; `control: none`, `history: no`): short adapt box at top on lawful basis, children, language and literacy → information section in plain language ("What we are asking", "How we will use it", "Your choices", "How to withdraw", "Who to contact") → tick-box choices `[ ]` → sign block (participant; parent/guardian where relevant; person taking consent; verbal or thumbprint consent record) → annex: short guidance for staff taking consent, and a child-friendly or easy-read version where relevant.

**Governance form / register / checklist / terms of reference / role note** (900–2,500 words): purpose → how to use → the form or table itself with realistic example rows (marked as examples) → sign-off → guidance notes.

## Library titles (use these exact titles when cross-referencing)

Policies: Code of Conduct · Safeguarding Policy and Procedure · Anti-Harassment, Intimidation and Bullying Policy and Procedure · Fraud, Bribery and Corruption Policy and Procedure · Whistleblowing Policy and Procedure · Conflict of Interest Policy · Gift Acceptance Policy · Financial Controls Policy · Reserves Policy · Procurement Policy · Partner Due Diligence and Sanctions Screening Policy · Expenses and Per Diem Policy · Travel Safety and Duty of Care Policy · Data Protection Policy · Privacy Notice · Cookie Policy · IT and Information Security Policy · Social Media and Communications Policy · Equality, Diversity and Inclusion Policy · Environmental Policy

Procedures: Incident Reporting Procedure · Complaints and Feedback Procedure · Data Rights Request Procedure · Data Breach Response Procedure

Contracts & agreements: Employment Contract · Co-founder Agreement · Volunteer Agreement · Independent Contractor Agreement · Services Agreement · Mutual Confidentiality Agreement · Partnership Memorandum of Understanding · Sub-grant Agreement · Data Sharing Agreement · Website Terms of Use

Consent forms: Photo and Story Consent Form · Research Participation Consent Form · Information Sharing Consent Form · Fundraising and Communications Consent Form

Governance & compliance: Governing Body Terms of Reference · Board Interest Declaration · Delegation of Authority Matrix · Risk Register · Records Retention Schedule · Data Protection Impact Assessment · Partner Due Diligence Questionnaire · Independent Contact Role Note · Legal Review Checklist

## Courses (for the `course:` field)

Course 1 · Clarify (Modules 0–2: start here, strategic foundations, theory of change) · Course 2 · Organise (Modules 3–5: structure and governance, people and culture, internal systems) · Course 3 · Prove & Show (Modules 6–8: MEAL, brand identity, marketing and communications) · Course 4 · Protect (Module 9 financial management; Module 10 legal, compliance, policies and risk) · Course 5 · Sustain & Run (Modules 11–13: fundraising and revenue, partnerships, strategy to action).

## Before you finish

- Build each file with no FAILED lines; note the word count it prints.
- Run the grep in rule 1.
- Reply with: each slug, word count, number of adapt boxes, and any legal points you were unsure about and flagged in adapt boxes (so the reviewer can check them).
