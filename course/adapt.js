// Builds an entrepreneurs' module from an organisation module (course/mNN-*.js).
// The structure is copied exactly — lessons, order, stages, minutes, exercise fields (same keys), Excel workbook
// and sheets, videos — and only the words change, rewritten for people building something new.
// Entrepreneurs' lessons have no example galleries and no Impact Tools (no promo box, no tool links) for now.
//   export default adapt(base, {title, short, intro, output, promo:{headline,pitch}}, {lessonId:{...}, ...})
// Lesson overrides: title, part, learn, weak, strong, why, reflect, exercise, check,
//   fields:{key:{label,hint}}, anatomy:{title,intro,cols,rows} (or null to drop the table).
import {splits} from './founder-splits.js?v=links3';
import {lessons as marketing} from './founder-marketing.js?v=links3';
const TEXT=['title','part','learn','weak','strong','why','reflect','exercise','check','exampleBox','tocExample','connects','templates'];
export const FOUNDER_OFFSET=100;
// A hint written as "Column | column (examples) | …" becomes an entry table with those columns, so each answer goes in
// its own box; a sentence after the columns stays as the hint.
// A full stop ends the column list, but not the ones in e.g. / i.e.
function asTable(f){
 if(f.type||!/\s\|\s/.test(f.hint||''))return f;
 let h=f.hint.trim();const pre=h.match(/^([^|]*?):\s+(?=[^|]*\|)/);if(pre&&!/\|/.test(pre[1]))h=h.slice(pre[0].length);
 const parts=h.split(/\s\|\s/);let last=parts.pop();const cut=last.search(/(?<!\be\.g|\bi\.e|\be|\bi)\.(\s|$)/);let note='';
 if(cut>=0){note=last.slice(cut+1).trim();last=last.slice(0,cut);}parts.push(last);
 const columns=parts.map(c=>{c=c.trim().replace(/\.$/,'');const m=c.match(/^(.*?)\s*\((.*)\)\s*(.*)$/);const label=(m?(m[1]+(m[3]?' '+m[3]:'')):c).trim();return {label:label.charAt(0).toUpperCase()+label.slice(1),placeholder:m?m[2]:''};});
 return {...f,type:'table',columns,rows:4,hint:note||'One row per item. Add rows as you need.'};
}

export function adapt(base,mod,lessons){
 const m=structuredClone(base);
 Object.assign(m,{id:FOUNDER_OFFSET+base.id,no:base.id,mirror:base.id,track:'entrepreneurs'});
 for(const k of ['title','short','intro','output'])if(mod[k]!==undefined)m[k]=mod[k];
 delete m.promo;
 if(mod.workbook&&m.workbook)Object.assign(m.workbook,mod.workbook);
 const ids=new Set(m.lessons.map(l=>l.id));
 for(const id of Object.keys(lessons))if(!ids.has(id))throw new Error(`adapt: module ${base.id} has no lesson "${id}"`);
 for(const l of m.lessons){
  delete l.gallery;l.tools=[];
  const o=lessons[l.id];
  if(!o)throw new Error(`adapt: lesson ${base.id}.${l.id} has no entrepreneurs' text`);
  if(!l.review&&!o.learn)throw new Error(`adapt: lesson ${base.id}.${l.id} needs learn`);
  for(const k of TEXT)if(o[k]!==undefined)l[k]=o[k];
  if(l.review)l.title=`Recap: ${m.title.split(':')[0]}`; // every module ends with a recap of its exercises and their PDFs
  if(o.anatomy===null)delete l.anatomy;else if(o.anatomy)l.anatomy={...(l.anatomy||{}),...o.anatomy};
  for(const [key,v] of Object.entries(o.fields||{})){
   const f=(l.fields||[]).find(f=>f.key===key);
   if(!f)throw new Error(`adapt: lesson ${base.id}.${l.id} has no field "${key}"`);
   Object.assign(f,v);
  }
 }
 // Marketing additions: templates to adapt, brand support, references to the other courses.
 for(const l of m.lessons){const x=marketing[`${m.id}.${l.id}`];if(!x)continue;if(x.templates&&!l.templates)l.templates=x.templates;if(x.support)l.support=x.support;if(x.bridges)l.bridges=x.bridges;}
 for(const l of m.lessons)if(l.fields)l.fields=l.fields.map(f=>{const sp=splits[`${m.id}.${l.id}.${f.key}`];if(sp&&!f.type)return {...f,type:'parts',hint:sp.hint||'One answer per box.',parts:sp.parts.map(([label,placeholder])=>({label,placeholder}))};return asTable(f);});
 return m;
}
