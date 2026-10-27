// Adds or updates EN/ES strings in translations.js from a JSON file: {"key": ["English", "Español"], ...}.
// Usage: node scripts/set-translations.mjs path/to/strings.json
import {readFileSync,writeFileSync} from 'node:fs';
const file='translations.js',src=readFileSync(file,'utf8');
const strings=JSON.parse(readFileSync(process.argv[2],'utf8'));
const esAt=src.indexOf('\n  es: {');if(esAt<0)throw new Error('es block not found');
let en=src.slice(0,esAt),es=src.slice(esAt);
const q=s=>JSON.stringify(s);
const set=(block,key,val)=>{const re=new RegExp(`(\\n\\s*${q(key).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}:\\s*)"(?:[^"\\\\]|\\\\.)*"`);if(re.test(block))return block.replace(re,(_,a)=>a+q(val));const end=block.lastIndexOf('\n  }');return block.slice(0,end).replace(/,?\s*$/,'')+`,\n    ${q(key)}: ${q(val)}`+block.slice(end);};
let n=0;for(const [k,[e,s]] of Object.entries(strings)){en=set(en,k,e);es=set(es,k,s);n++;}
writeFileSync(file,en+es);console.log(`set ${n} keys`);
