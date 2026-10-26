"""Render the five course introduction videos.

    node scripts/course-videos/export-data.mjs
    python3 scripts/course-videos/render.py [course-id ...] [--stills]

Writes assets/videos/course-<id>-intro.mp4 and a matching poster .jpg.
Needs Python Playwright (Chromium) and ffmpeg. Silent by design: every word is on screen.
"""
import subprocess, sys, pathlib
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent.parent / 'assets' / 'videos'
FPS = 30
COURSES = ['clarify', 'organise', 'prove-show', 'protect', 'sustain-run']
POSTER_AT = 4.2  # seconds: title fully on screen


def render(page, cid, stills=False):
    page.goto((HERE / 'template.html').as_uri() + f'?course={cid}')
    page.evaluate('document.fonts.ready')
    dur = page.evaluate('window.DURATION')
    OUT.mkdir(parents=True, exist_ok=True)
    shot = lambda t: (page.evaluate(f'window.frame({t})'), page.screenshot(type='jpeg', quality=95))[1]
    (OUT / f'course-{cid}-intro.jpg').write_bytes(shot(POSTER_AT))
    if stills:
        d = HERE / 'stills'; d.mkdir(exist_ok=True)
        for t in range(1, int(dur), 3):
            (d / f'{cid}-{t:02d}.jpg').write_bytes(shot(t))
        return dur
    mp4 = OUT / f'course-{cid}-intro.mp4'
    ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', str(FPS), '-i', '-',
                           '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
                           str(mp4)], stdin=subprocess.PIPE)
    for i in range(int(dur * FPS) + 1):
        ff.stdin.write(shot(i / FPS))
    ff.stdin.close(); ff.wait()
    return dur


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page(viewport={'width': 1280, 'height': 720})
        for cid in args or COURSES:
            print(cid, round(render(page, cid, '--stills' in sys.argv), 1), 's', flush=True)
        b.close()
