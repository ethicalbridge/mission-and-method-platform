import {cp,mkdir,readdir,rm,writeFile,access} from 'node:fs/promises';
import path from 'node:path';
const target=path.resolve('dist');
if(path.dirname(target)!==process.cwd()||path.basename(target)!=='dist')throw new Error('Unsafe build output path');
await rm(target,{recursive:true,force:true});
await mkdir('dist/client',{recursive:true});
await mkdir('dist/server',{recursive:true});
for(const entry of await readdir('.'))if(/\.(html|css|js)$/.test(entry))await cp(entry,`dist/client/${entry}`);
await cp('assets','dist/client/assets',{recursive:true});
try{await access('.openai/hosting.json');await mkdir('dist/.openai',{recursive:true});await cp('.openai/hosting.json','dist/.openai/hosting.json');}catch{}
await writeFile('dist/server/index.js',`export default {async fetch(request,env){const url=new URL(request.url);if(url.pathname==='/')url.pathname='/index.html';return env.ASSETS.fetch(new Request(url,request));}};\n`);
console.log('Built static preview in dist/client. Paid launch requires the access service documented in docs/production-access.md.');
