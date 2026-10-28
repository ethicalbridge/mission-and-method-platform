// Gives every import of the course content files (course/*.js) a version taken from their contents, so browsers
// load the newest lessons after each update instead of an older saved copy. Run after editing anything in course/:
//   node scripts/version-course-imports.mjs
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const strip=s=>s.replace(/(\.js)\?v=c[0-9a-f]+(['"])/g,'$1$2');
const courseFiles=readdirSync('course').filter(f=>f.endsWith('.js')).sort();
const hash=createHash('sha1');for(const f of courseFiles)hash.update(f+strip(readFileSync(`course/${f}`,'utf8')));
const v='c'+hash.digest('hex').slice(0,8);
const tag=(s,re)=>strip(s).replace(re,(m,a,q)=>`${a}?v=${v}${q}`);
let changed=0;
const put=(file,re)=>{const s=readFileSync(file,'utf8'),t=tag(s,re);if(t!==s){writeFileSync(file,t);changed++;}};
for(const f of courseFiles)put(`course/${f}`,/(from\s+'\.\/[^'?]+\.js)(['])/g);
for(const f of ['course-data.js','learning.js'])put(f,/(from\s+'\.\/course\/[^'?]+\.js)(['])/g);
console.log(`course imports at ${v} (${changed} files updated)`);
