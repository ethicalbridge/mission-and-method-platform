# Navigation audit

## Findings

- The Evidence Library was valuable but discoverable only through the footer and contextual course links.
- Contact was available only through the footer, which made partnership, donor and support enquiries difficult to find.
- The footer mixed learning, purchasing, account and support destinations under broad headings.
- Pricing was previously embedded in the course page and has since been separated into its own destination.
- Course resources are module-specific. A global Resources item created a second, less clear route to the same learning material.
- The Impact Tools catalogue already provides the scalable entry point needed for current and future software products. Listing every product in the main navigation would not scale.
- Privacy, terms, cookies, accessibility, security, educational guidance and copyright are secondary trust destinations and belong together in the footer rather than competing with primary visitor tasks.

## Implemented hierarchy

The shared header now follows the main visitor journeys:

1. Home
2. About
3. Courses, with the Planning System sections, learning workspace and future courses grouped in one dropdown
4. Evidence Library
5. Impact Tools
6. Pricing & packages
7. Contact
8. Account

Evidence Library is a primary destination before Impact Tools. Contact is visually distinct. Account remains available but visually secondary.

The shared footer is organised into:

- Platform: courses, evidence, tools and pricing
- Organisation: Mission & Method, the founder, Ethical Bridge and contact
- Help & access: orientation, FAQs, saved work and account
- Legal & trust: the existing legal and trust sections

## Content retained contextually

- Course workbooks and resources remain linked from their relevant modules.
- The Evidence Library remains linked from individual lessons as well as globally.
- Every software product remains accessible from the Impact Tools catalogue.
- All legal sections remain reachable from every page through the footer.

## Responsive and accessibility approach

- Native `details` and `summary` elements provide keyboard-operable course navigation.
- Escape closes the course dropdown and restores focus.
- The header changes to a structured expandable mobile menu at tablet width.
- Active page states, focus outlines and a skip link remain available.
- The Contact link becomes a full-width action in the mobile menu.
