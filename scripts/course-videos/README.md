# Course introduction videos

One short (about 1 minute), silent video per course, in English and Spanish, shown under the price and buttons on each `course-<id>.html` page.

- `scripts.js` – the words on screen for each course: `COURSE_VIDEOS` (English, Brand Manual voice) and `COURSE_VIDEOS_ES` / `MODULES_ES` (Spanish, "tú"; course names stay in English as on the site).
- `template.html` – the animated scenes (brand colours, Nunito Sans, DM Serif Display, logo mark), the fixed words in both languages, and the subtitle cues taken from the same timeline.
- `export-data.mjs` – pulls module titles, outputs, lesson counts and hours from `course-data.js`.
- `render.py` – captures the scenes with Playwright and writes into `assets/videos/`:
  - `course-<id>-intro.mp4` and `course-<id>-intro-es.mp4`, with a poster `.jpg` for each
  - `course-<id>-intro.en.vtt` and `course-<id>-intro.es.vtt` subtitles (the timing is identical in both languages, so either track fits either video)

```sh
node scripts/course-videos/export-data.mjs
python3 scripts/course-videos/render.py                         # all five, both languages
python3 scripts/course-videos/render.py clarify --lang es       # one course, one language
python3 scripts/course-videos/render.py clarify --stills        # still frames for review
```

On the page, `assets/js/course-video.js` starts the video in the site language (the EN/ES switcher) and the English / Español buttons under the player switch it. Subtitles in either language are in the player's CC menu.

Fonts are the Google Fonts originals under the SIL Open Font License (see `fonts/OFL-*.txt`).
To add a voiceover later, record over the existing timing and mux it in with ffmpeg; keep the on-screen text.
