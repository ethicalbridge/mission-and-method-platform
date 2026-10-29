# Legal template library

Sources for the 51 Word templates published on legal-templates*.html.

- `src/<slug>.md`: one template each, in the markup described in `WRITING-GUIDE.md`
  (`[[placeholder]]` = yellow field, `::: adapt` = orange guidance box, `::: note` / `::: glance` = boxes kept in the document).
- `build.cjs`: renders the branded .docx files (cover, guide page, document control, highlights, embedded brand fonts)
  into `assets/legal-templates/`. Needs the `docx` npm package (`npm install --no-save docx@9` if missing).
- `catalog.py <folder of PDF renders>`: rebuilds `assets/legal-templates/catalog.json` (titles, descriptions, groups, page counts).
- `../generate-legal-templates.mjs`: rebuilds the six website pages from the catalog.

Typical update:

    node scripts/legal-templates/build.cjs code-of-conduct     # one template (no argument = all)
    node scripts/generate-legal-templates.mjs                    # refresh the website pages
