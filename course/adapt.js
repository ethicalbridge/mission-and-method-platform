// Builds an entrepreneurs' module from an organisation module (course/mNN-*.js).
// The structure is copied exactly — lessons, order, stages, minutes, exercise fields (same keys), Excel workbook
// and sheets, videos — and only the words change, rewritten for people building something new.
// Entrepreneurs' lessons have no example galleries and no Impact Tools (no promo box, no tool links) for now.
//   export default adapt(base, {title, short, intro, output, promo:{headline,pitch}}, {lessonId:{...}, ...})
// Lesson overrides: title, part, learn, weak, strong, why, reflect, exercise, check,
//   fields:{key:{label,hint}}, anatomy:{title,intro,cols,rows} (or null to drop the table).
const TEXT=['title','part','learn','weak','strong','why','reflect','exercise','check'];
export const FOUNDER_OFFSET=100;
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
 return m;
}
