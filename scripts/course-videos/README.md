# Course introduction videos

One short (about 1 minute), silent video per course, shown in the "Course introduction" slot of each `course-<id>.html` page.

- `scripts.js` – the words on screen for each course (edit here; written to the Brand Manual voice).
- `template.html` – the animated scenes (brand colours, Nunito Sans, DM Serif Display, logo mark).
- `export-data.mjs` – pulls module titles, outputs, lesson counts and hours from `course-data.js`.
- `render.py` – captures the scenes with Playwright and encodes MP4 + poster JPG into `assets/videos/`.

```sh
node scripts/course-videos/export-data.mjs
python3 scripts/course-videos/render.py                    # all five
python3 scripts/course-videos/render.py clarify            # one course
python3 scripts/course-videos/render.py clarify --stills   # still frames for review
```

Fonts are the Google Fonts originals under the SIL Open Font License (see `fonts/OFL-*.txt`).
To add a voiceover later, record over the existing timing and mux it in with ffmpeg; keep the on-screen text.
