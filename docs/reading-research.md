# Reading research and selection method

The full lesson-by-lesson mapping is in `docs/source-audit.md` (also `docs/source-audit.csv` for spreadsheets). Regenerate both with `node scripts/generate-source-audit.mjs` after changing `resource-library.js`, and the Evidence Library with `node scripts/generate-evidence-library.mjs`.

## How sources sit in the course

- **Inside the lesson, at the point of need.** Each source carries `after`: the Read-step paragraph whose concept it supports. The lesson renders an "Explore further" callout straight after that paragraph. The flow is concept → evidence → our method → example → exercise or tool.
- **Every callout explains itself.** *Why we chose it* (what it adds), *What to look for* (the section that matters) and *Use it in this lesson* (how it feeds the exercise or Impact Tool).
- **Roles, used sparingly.** Core resource (at most one per lesson), Practical guide (kept open beside the exercise), Go deeper (optional).
- **One primary home.** Each source lives in one lesson. A small number of deliberate cross-references (`crossRef: true`) point back to that home rather than repeating the source.
- **Always connected.** The Resource tile beside Apply jumps to the lesson's first callout; practical guides reappear in the Apply step; the Impact Tool panel names the evidence behind the step; every callout links to its Evidence Library card, and every library card links back to the exact place in the lesson.

## Selection criteria

Authority, credibility, relevance to the specific lesson, practical usefulness, date, open access, live link, geographic fit and audience fit (NGOs, social enterprises and purpose-led start-ups). Original publishers of a framework are preferred over secondary explainers. Weak blogs, SEO articles and definition-only pages were excluded. Regulatory guidance states its jurisdiction and is never presented as law elsewhere.

## Quality control (October 2026)

1. **Evidence behind major concepts.** 125 of 146 taught lessons carry at least one source (250 placements, 240 distinct sources). Lessons without one are either orientation or overview lessons whose sources live in the dedicated module, or gaps listed below.
2. **Authority.** Sources come from UN agencies, OECD, ILO, IFRC, regulators, Bond, CHS Alliance, BetterEvaluation, NCVO, Bridgespan, Humentum, CIVICUS, Pact, universities and the original framework owners. 17 are research papers.
3–4. **Placement and purpose.** Every source sits after a specific paragraph and states how it serves the exercise. The test suite fails if a source lacks a role, rationale, focus, use or valid paragraph.
5. **Overload.** No lesson has more than three sources; most have one or two. At most one Core resource per lesson.
6–7. **Repetition.** No duplicated primary URLs (enforced by test). Eight sources that genuinely serve two lessons appear as cross-references to their main home.
8. **Links.** All URLs were fetched during the audit (four confirmed by search where the publisher blocks automated requests). Domains found hijacked or dead (kstoolkit.org, mango.org.uk, the old Microsoft Gantt template, Bloomerang's donor journey page, Acumen's Lean Impact course) were removed. Recheck before each major release.
9. **Navigation.** Lessons stay readable: callouts are compact, colour-coded by role, and the Read step remains in the course's voice.
10. **Why each resource.** Every callout states why it was chosen and what to look for.
11. **Into the tools.** Practical guides are repeated in the Apply step, and Impact Tool panels name the evidence behind the step.
12. **Balance.** 102 core, 82 practical, 56 go-deeper. Practitioner guidance dominates; academic research is used where it adds evidence (theory of change, evaluation, hybrids, funding).
13–14. **Geography.** 56 sources are tagged Global South or locally led (WACSI, CIVICUS, Peace Direct, Shift the Power, NEAR, Africa No Filter and others). 57 are UK-specific (mostly Charity Commission, NCVO, ICO) and labelled with their jurisdiction; this remains the largest imbalance, strongest in Modules 3, 9 and 10.
15. **Coherence.** Sources now read as part of the lesson rather than a list at the end.

### Open gaps for the next research pass

Lessons with no source because a strong, free, verifiable one was not found in this pass: 3.2 Organisational structures, 3.5 Roles and role descriptions, 7.8 Brand consistency, 10.10 Policy management and review, 11.7 Corporate partnerships, 11.9 Major donors, 13.2 Organisational KPIs, 13.4 Ownership and capacity, 13.5 Milestones and dependencies, 13.6 Work plan and Gantt. Also wanted: more Global South sources for governance, finance and legal lessons, and a non-UK crisis-communication guide.

Intentionally without a source (overview lessons whose evidence lives in the dedicated module, or orientation): 0.1, 2.7 Inputs, 5.1, 5.2, 5.4, 5.6, 5.7, 5.10, 7.1, 11.16 Pipeline, 13.9.
