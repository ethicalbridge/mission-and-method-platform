import {modules,allModules,legacyLessonKeys} from './course-data.js?v=ev44';
export const STORAGE_KEY='mm.course.planning-system.v1';
export const STATE_VERSION=2;
export const FIRST_LESSON='0.journey';
export const emptyState=()=>({version:STATE_VERSION,answers:{},completed:{},tasks:[],lastLesson:FIRST_LESSON,updatedAt:null});
export const lessonKey=(m,l)=>`${m.id}.${l.id}`;
// Answers kept with a lesson besides its exercise fields. All are optional and none is needed to complete the lesson:
// the answer to its Reflect question, the "Not relevant yet" trigger, and on module reviews the synthesis prompts
// (defined once in course/kit.js as review lesson `synthesis`).
export const REFLECT='_reflect',NOT_YET='_notYet';
export const reflectField=l=>l.reflect&&!l.review?{key:REFLECT,label:l.reflect,hint:'Optional. A few lines in your own words before the exercise; your answer saves with this lesson.',optional:true}:null;
export const extraFields=l=>l.review?(l.synthesis||[]):[reflectField(l),l.fields?.length?{key:NOT_YET,optional:true}:null].filter(Boolean);
// "Not relevant yet": null when the exercise is not marked, otherwise the trigger the learner wrote (may still be empty).
export const notYetOf=(state,m,l)=>{const v=state.answers[lessonKey(m,l)]?.[NOT_YET];return !l.review&&l.fields?.length&&typeof v==='string'?v:null;};
export const isDeferred=(state,m,l)=>!!notYetOf(state,m,l)?.trim();
// Version 1 backups come from the earlier 8-module course: move each lesson's work to its new home.
function migrate(value){
 if(value.version!==1)return value;
 const move=obj=>Object.fromEntries(Object.entries(obj).filter(([k])=>legacyLessonKeys[k]).map(([k,v])=>[legacyLessonKeys[k],v]));
 return {...value,version:STATE_VERSION,answers:move(value.answers),completed:move(value.completed),lastLesson:legacyLessonKeys[value.lastLesson]||FIRST_LESSON};
}
export function validateState(value){
 if(!value||![1,STATE_VERSION].includes(value.version)||typeof value.answers!=='object'||!value.answers||typeof value.completed!=='object'||!value.completed||!Array.isArray(value.tasks))throw new Error('This is not a compatible Planning System backup.');
 value=migrate(value);
 const clean=emptyState();
 for(const m of allModules)for(const l of m.lessons){const key=lessonKey(m,l);if(value.answers[key]){clean.answers[key]={};for(const f of [...(l.fields||[]),...extraFields(l)]){const v=value.answers[key][f.key];if(v!==undefined){if(typeof v!=='string'||v.length>20000)throw new Error('An answer is too large or invalid.');clean.answers[key][f.key]=v;}}}if(value.completed[key]===true)clean.completed[key]=true;}
 if(value.tasks.length>200)throw new Error('A maximum of 200 course tasks is supported.');
 clean.tasks=value.tasks.map((t,i)=>{if(!t||typeof t!=='object')throw new Error('Invalid task.');const out={id:`task-${i}`};for(const key of ['title','owner','start','end']){if(typeof t[key]!=='string'||t[key].length>500)throw new Error('Invalid task field.');out[key]=t[key];}if(out.start&&!validDate(out.start)||out.end&&!validDate(out.end))throw new Error('Invalid task date.');return out;});
 const keys=allModules.flatMap(m=>m.lessons.map(l=>lessonKey(m,l)));if(keys.includes(value.lastLesson))clean.lastLesson=value.lastLesson;
 clean.updatedAt=typeof value.updatedAt==='string'?value.updatedAt:null;
 for(const m of allModules){for(const l of m.lessons.filter(l=>!l.review))if(!isFilled(clean,m,l))delete clean.completed[lessonKey(m,l)];if(m.lessons.at(-1).review&&!m.lessons.filter(l=>!l.review).every(l=>clean.completed[lessonKey(m,l)]))delete clean.completed[lessonKey(m,m.lessons.at(-1))];}
 return clean;
}
export function validDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const d=new Date(`${value}T00:00:00Z`);return Number.isFinite(+d)&&d.toISOString().slice(0,10)===value;}
// A field with `store` is saved once, under another lesson of the same module (a table built over several lessons).
export const storeKey=(m,l,f)=>f.store?`${m.id}.${f.store}`:lessonKey(m,l);
export const valueOf=(state,m,l,f)=>state.answers[storeKey(m,l,f)]?.[f.key]||'';
// A staged table (`edit` = the columns this lesson fills) is done when it has rows and each row has those columns.
function fieldDone(state,m,l,f){const v=valueOf(state,m,l,f);if(typeof v!=='string'||!v.trim())return false;if(!f.edit)return true;const rows=v.split('\n').filter(x=>x.trim()).map(x=>x.split('|').map(t=>t.trim())).filter(r=>r[0]);return rows.length>0&&rows.every(r=>f.edit.every(j=>r[j]));}
// A lesson marked "Not relevant yet" with its trigger written counts as complete.
export function isFilled(state,m,l){if(isDeferred(state,m,l))return true;return (l.fields||[]).every(f=>fieldDone(state,m,l,f))&&(l.id!=='timeline'||state.tasks.length>0&&state.tasks.every(t=>t.title.trim()&&t.owner.trim()&&validDate(t.start)&&validDate(t.end)&&t.end>=t.start));}
export function readState(){const raw=localStorage.getItem(STORAGE_KEY);return raw?validateState(JSON.parse(raw)):emptyState();}
export function mutateState(change){const next=readState();change(next);next.updatedAt=new Date().toISOString();localStorage.setItem(STORAGE_KEY,JSON.stringify(next));if(typeof dispatchEvent==='function'&&typeof CustomEvent==='function')dispatchEvent(new CustomEvent('mm:state-saved'));return next;}
// Editing an answer re-opens that lesson and the review that assembles it (the module's own review, or for the entrepreneurs' course the final Launch Plan).
export function invalidate(state,m,l){delete state.completed[lessonKey(m,l)];const reviewOf=x=>x.lessons.at(-1).review?x:x.track==='entrepreneurs'?allModules.filter(y=>y.track==='entrepreneurs').at(-1):null;const r=reviewOf(m);if(r)delete state.completed[lessonKey(r,r.lessons.at(-1))];for(const dependent of allModules.filter(x=>x.uses.includes(m.id)&&x.lessons.at(-1).review))delete state.completed[lessonKey(dependent,dependent.lessons.at(-1))];}
export function stats(state,m,list){const lessons=m?m.lessons.map(l=>lessonKey(m,l)):(list||modules).flatMap(x=>x.lessons.map(l=>lessonKey(x,l)));const done=lessons.filter(k=>state.completed[k]).length;return{done,total:lessons.length,percent:Math.round(done/lessons.length*100)};}
export {escapeHTML,download} from './ui-utils.js';
