"""Render the five course introduction videos.

    node scripts/course-videos/export-data.mjs
    python3 scripts/course-videos/render.py [course-id ...] [--stills]

Writes assets/videos/course-<id>-intro.mp4 (English) and course-<id>-intro-es.mp4 (Spanish), a poster .jpg for each,
and subtitles course-<id>-intro.en.vtt / .es.vtt (same timeline, so either track fits either video).
Add --lang en or --lang es to render one language only.

Course 1 lesson, review and module videos (lesson-template.html; texts in lesson-videos.js and course1-extra.js):
    python3 scripts/course-videos/render.py --lessons [key ...] [--course organise]   # keys like 1.purpose 3 (module 3); --course renders a whole course; --missing skips existing
writes assets/videos/lessons/<module>-<lesson>{,-es}.mp4/.jpg + .en.vtt/.es.vtt, assets/videos/modules/module-NN…,
and updates course/videos.js so the lesson pages show them.
Needs Python Playwright (Chromium) and ffmpeg. Silent by design: every word is on screen.
"""
import subprocess, sys, pathlib
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent.parent / 'assets' / 'videos'
FPS = 30
COURSES = ['clarify', 'organise', 'prove-show', 'protect', 'sustain-run']
POSTER_AT = 4.2  # seconds: title fully on screen


def render(page, cid, stills=False, lang='en'):
    page.goto((HERE / 'template.html').as_uri() + f'?course={cid}&lang={lang}')
    page.evaluate('document.fonts.ready')
    dur = page.evaluate('window.DURATION')
    OUT.mkdir(parents=True, exist_ok=True)
    sfx = '' if lang == 'en' else '-es'
    (OUT / f'course-{cid}-intro.{lang}.vtt').write_text(page.evaluate('window.VTT'), encoding='utf-8')
    shot = lambda t: (page.evaluate(f'window.frame({t})'), page.screenshot(type='jpeg', quality=95))[1]
    (OUT / f'course-{cid}-intro{sfx}.jpg').write_bytes(shot(POSTER_AT))
    if stills:
        d = HERE / 'stills'; d.mkdir(exist_ok=True)
        for t in range(1, int(dur), 3):
            (d / f'{cid}{sfx}-{t:02d}.jpg').write_bytes(shot(t))
        return dur
    mp4 = OUT / f'course-{cid}-intro{sfx}.mp4'
    ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', str(FPS), '-i', '-',
                           '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
                           str(mp4)], stdin=subprocess.PIPE)
    for i in range(int(dur * FPS) + 1):
        ff.stdin.write(shot(i / FPS))
    ff.stdin.close(); ff.wait()
    return dur


def render_item(page, kind, key, lang, base, stills=False):
    page.goto((HERE / 'lesson-template.html').as_uri() + f'?kind={kind}&key={key}&lang={lang}')
    page.wait_for_function('window.FIT_DONE === true')
    dur = page.evaluate('window.DURATION')
    base.parent.mkdir(parents=True, exist_ok=True)
    sfx = '' if lang == 'en' else '-es'
    pathlib.Path(f'{base}.{lang}.vtt').write_text(page.evaluate('window.VTT'), encoding='utf-8')
    shot = lambda t: (page.evaluate(f'window.frame({t})'), page.screenshot(type='jpeg', quality=95))[1]
    pathlib.Path(f'{base}{sfx}.jpg').write_bytes(shot(3.4))
    if stills:
        d = HERE / 'stills'; d.mkdir(exist_ok=True)
        for t in range(1, int(dur), 3):
            (d / f'{base.name}{sfx}-{t:02d}.jpg').write_bytes(shot(t))
        return dur
    ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', str(FPS), '-i', '-',
                           '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
                           f'{base}{sfx}.mp4'], stdin=subprocess.PIPE)
    n = int(dur * FPS)
    sigs = page.evaluate(f'window.frameSigs({n}, {FPS})')  # which frames differ, computed in one pass
    prev_sig, prev_img = None, None
    for i in range(n + 1):  # only capture frames where something on screen changed
        if sigs[i] != prev_sig or prev_img is None:
            page.evaluate(f'window.frame({i / FPS})')
            prev_img = page.screenshot(type='jpeg', quality=92); prev_sig = sigs[i]
        ff.stdin.write(prev_img)
    ff.stdin.close(); ff.wait()
    return dur


def course_items(courses):
    import json, re
    data = json.loads(re.sub(r'^window\.COURSE_DATA=|;\s*$', '', (HERE / 'data.js').read_text().strip()))
    items = []
    for m in [m for c in courses for m in data[c]['modules']]:
        items.append(('module', str(m['id']), OUT / 'modules' / f"module-{m['id']:02d}"))
        for l in m['lessons']:
            items.append(('review' if l['review'] else 'lesson', l['key'], OUT / 'lessons' / l['key'].replace('.', '-')))
    return items


def write_manifest():
    lessons, mods = {}, {}
    for f in sorted((OUT / 'lessons').glob('*-es.mp4')):
        stem = f.name[:-len('-es.mp4')]
        if (OUT / 'lessons' / f'{stem}.mp4').exists():
            mid, lid = stem.split('-', 1)
            lessons[f'{mid}.{lid}'] = f'assets/videos/lessons/{stem}'
    for f in sorted((OUT / 'modules').glob('*-es.mp4')):
        stem = f.name[:-len('-es.mp4')]
        if (OUT / 'modules' / f'{stem}.mp4').exists():
            mods[int(stem.split('-')[1])] = f'assets/videos/modules/{stem}'
    js = ('// Which lessons and modules have a video. Written by scripts/course-videos/render.py (lesson and module videos);\n'
          '// each entry is the file base under assets/videos (+ .mp4, -es.mp4, .jpg, -es.jpg, .en.vtt, .es.vtt).\n'
          'export const lessonVideos=' + json_dumps(lessons) + ';\nexport const moduleVideos=' + json_dumps(mods) + ';\n')
    (HERE.parent.parent / 'course' / 'videos.js').write_text(js)
    print('manifest:', len(lessons), 'lesson videos,', len(mods), 'module videos')


def json_dumps(o):
    import json
    return json.dumps(o, indent=1)


if __name__ == '__main__' and '--lessons' in sys.argv:
    skip = {sys.argv[i + 1] for i, a in enumerate(sys.argv[:-1]) if a in ('--course', '--lang')}
    keys = [a for a in sys.argv[1:] if not a.startswith('--') and a not in skip]
    langs = [sys.argv[sys.argv.index('--lang') + 1]] if '--lang' in sys.argv else ['en', 'es']
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page(viewport={'width': 1280, 'height': 720})
        courses = [sys.argv[sys.argv.index('--course') + 1]] if '--course' in sys.argv else COURSES
        for kind, key, base in course_items(courses):
            if (keys and key not in keys) or (not keys and '--course' not in sys.argv and int(key.split('.')[0]) > 2):
                continue
            for lang in langs:
                if '--missing' in sys.argv and pathlib.Path(f"{base}{'' if lang == 'en' else '-es'}.mp4").exists():
                    continue
                print(kind, key, lang, round(render_item(page, kind, key, lang, base, '--stills' in sys.argv), 1), 's', flush=True)
        b.close()
    if '--stills' not in sys.argv:
        write_manifest()
    sys.exit(0)

if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page(viewport={'width': 1280, 'height': 720})
        langs = [sys.argv[sys.argv.index('--lang') + 1]] if '--lang' in sys.argv else ['en', 'es']
        args = [a for a in args if a not in ('en', 'es')]
        for cid in args or COURSES:
            for lang in langs:
                print(cid, lang, round(render(page, cid, '--stills' in sys.argv, lang), 1), 's', flush=True)
        b.close()
