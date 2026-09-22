# Mission & Method audit and implementation

Target: https://ethicalbridge.github.io/mission-and-method-platform/

Baseline: `84f5cd25ae4c4ea3dd48d2bd7d996dba2f50697d`.
The Impact Accelerator repository was inspected only while clarifying the URL; it was not changed.

## Findings and changes

| Area | Baseline issue | Implemented change |
| --- | --- | --- |
| Product model | Generic AUD 29/month membership and expired founding discount | Separate one-time courses and individually subscribed software; no invented prices or purchase state |
| Global navigation | No software/resources/account areas; mixed Builder System branding | Shared Home, Courses, Software, Resources, About, Account navigation and Mission & Method branding |
| Planning System | Resource collection; start buttons route to unconnected signup | Numbered curriculum, direct preview entry, resume link and consistent learning workspace |
| Modules 1 and 7 | No working course workspace | Full Strategic Foundation and Business Model sequences |
| Theory of Change | Labelled Module 3, mixed with organisation structure | Module 2 with nine ordered lessons and a final pathway view |
| All modules | Brief summaries, no exercise persistence | 45 lessons/reviews across eight modules, with explanations, weak/strong examples, reflection, guided exercise and quality check |
| Progress | Advertised, but not implemented | Explicit completion, course/module counts, resume, incomplete states and review invalidation after relevant edits |
| Saved work | No course-saving system | Browser persistence, validated backup import/export, failure messages and multi-tab conflict warning |
| Outputs | Completion assets promised but not generated | Assembled module outputs, reporting map, Theory of Change pathway, course work plan/Gantt and an expandable organisation pack |
| Mobile | Disconnected module pages and inconsistent layouts | Collapsible course navigation, stacked exercises, responsive output diagrams and task forms |
| Software | No distinct software product architecture | Directory, 11 product pages, independently stored record demos, filters, edit/undo and CSV export |
| Account | No separate course/software status | Explicit My Courses and My Software sections, with truthful preview/no-subscription status |
| Resources | Advertised downloadable/video materials absent from repo | Versioned course-resource manifest; unavailable files clearly identified; no fake download links or video claims |
| Contact/newsletter | Claimed success despite no delivery | Contact downloads an unsent draft; nonfunctional newsletter signup removed |
| Evidence | Short readings and unverified publication-date claims | Course-linked reading guide and publisher references without invented review dates |
| Links | Footer anchors pointed to absent home sections | Repaired destinations; all local page and fragment targets checked |
| Build | Copied development/repository internals into static output | Static asset allowlist and bounded build-output deletion |

## Scope and limitations

The educational preview and local draft workflows are implemented. This is not a production subscription service. GitHub Pages cannot enforce paid access, so browser progress is never treated as a purchase. The server policy kernel is prepared and tested, but authentication, billing webhooks, private downloads and cloud storage require a real backend. See `production-access.md`.

The original briefs state that the founder will supply Excel tools. None were present. Their placement and metadata are prepared without creating substitutes and misrepresenting them as supplied resources. No paid download link is published. Software demos demonstrate local record editing; they do not claim that cloud, automation or collaboration features exist.

## Content approach

Module 1 covers purpose, vision, mission, behavioural values and objectives in depth, then assembles the foundation. Module 2 separates problem, impact, outcomes, outputs, activities, inputs and assumptions. Modules 3–8 each contain four applied lessons and an output review. Examples are explicitly fictional and include education, community projects, environmental initiatives, a repair social enterprise, an NGO/rights context and purpose-led business decisions.

Sources are linked within the relevant module and in the reading guide. Jurisdiction-specific charity guidance is labelled as England/Wales or UK context. No policies are represented as universally compliant.

## Verification

- Dependency-free Node tests cover saved state, invalid/corrupt backups, completion requirements, changes invalidating reviews, date validity, course/software isolation, wrong-user grants and subscription expiry.
- Static link checks traverse every HTML file and its local asset/page/fragment links.
- Browser testing covers all 78 screen states (45 lessons, 11 software product pages and 22 other pages) at 390px and 1280px widths: no horizontal overflow, missing headings or console errors were observed.
- Module 1 completion and output assembly passed. Saved task dates persisted after reload. Software record editing/filtering and independent data stores passed. A downloaded course backup was restored through the real file chooser, retaining six lesson drafts, six completed lessons and one task; an invalid backup was rejected. Temporary test records were then removed from the local preview.
- Remaining commercial integrations and owner-supplied materials are release blockers, not completed features.
