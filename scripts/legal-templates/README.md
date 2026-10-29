# Legal template library

Sources for the 57 Word templates published on legal-templates*.html, in English and Spanish.

- `src/<slug>.md`: one template each, in the markup described in `WRITING-GUIDE.md`
  (`[[placeholder]]` = yellow field, `::: adapt` = orange guidance box, `::: note` / `::: glance` = boxes kept in the document).
- `src-es/<slug>.md`: the Spanish version of the same template (`SPANISH-GUIDE.md` has the style rules and the title glossary).
- `build.cjs`: renders the branded .docx files (cover, guide page, document control, highlights, embedded brand fonts).
  English into `assets/legal-templates/`, Spanish (`--lang=es`) into `assets/legal-templates/es/`.
  Needs the `docx` npm package (`npm install --no-save docx@9` if missing). The edition printed in every footer is `EDITION` at the top.
- `excel.py`: Excel versions of the register templates (Risk Register, Delegation of Authority Matrix, Records Retention Schedule, Board Skills Matrix).
- `catalog.py <folder of PDF renders>`: rebuilds `assets/legal-templates/catalog.json` (titles, descriptions, groups, page counts).
- `packs.mjs`: builds the pack .zip files locally (for checking); the live zips are built in private storage by the template-files function.
- `../generate-legal-templates.mjs`: rebuilds the website pages and the public change log from the catalog.
- `../sync-prices.mjs`: refreshes template counts and savings on prices.html.

Typical update:

    node scripts/legal-templates/build.cjs code-of-conduct            # one template, English (no argument = all)
    node scripts/legal-templates/build.cjs --lang=es code-of-conduct  # the Spanish version
    node scripts/generate-legal-templates.mjs                           # refresh the website pages
    node scripts/sync-prices.mjs                                        # refresh counts on the Prices page

## Where the paid files live

Paid files are served from the private Supabase Storage bucket `templates` (`en/`, `es/`, `packs/`) through the
`template-files` edge function, which returns a two-minute link after the test code (later: after a purchase).
Only the three free templates stay in `assets/legal-templates/` on the public site.
To publish new versions: commit the rebuilt files to a short-lived branch, run the function's `import` action with that
commit (see docs/production-access.md), then delete the branch.
