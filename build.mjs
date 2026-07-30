import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/server', { recursive: true });
await mkdir('dist/client', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
for (const file of ['index.html','about.html','courses.html','planning-system.html','theory-of-change.html','fundraising-partnerships.html','organisation-systems.html','strategy-to-action.html','subscribe.html','contact.html','styles.css','app.js']) {
  await cp(file, `dist/client/${file}`);
}
await cp('.openai/hosting.json', 'dist/.openai/hosting.json');
await writeFile('dist/server/index.js', `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') url.pathname = '/index.html';
    return env.ASSETS.fetch(new Request(url, request));
  }
};
`);
