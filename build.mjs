import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/server', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
for (const file of ['index.html','about.html','courses.html','planning-system.html','theory-of-change.html','fundraising-partnerships.html','organisation-systems.html','strategy-to-action.html','subscribe.html','contact.html','styles.css','app.js']) {
  await cp(file, `dist/${file}`);
}
await cp('.openai/hosting.json', 'dist/.openai/hosting.json');
await writeFile('dist/server/index.js', `import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8'};
createServer(async (req,res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (path === '/') path = '/index.html';
  const file = normalize(join(root, path));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  try { const body = await readFile(file); res.writeHead(200, {'content-type':types[extname(file)] || 'application/octet-stream'}); res.end(body); }
  catch { res.writeHead(404, {'content-type':'text/plain'}); res.end('Not found'); }
}).listen(process.env.PORT || 3000);
`);
