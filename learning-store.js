import {modules} from './course-data.js';
export const STORAGE_KEY='mm.course.planning-system.v1';
export const emptyState=()=>({version:1,answers:{},completed:{},tasks:[],lastLesson:'1.purpose',updatedAt:null});
export const lessonKey=(m,l)=>`${m.id}.${l.id}`;
export function validateState(value){
 if(!value||value.version!==1||typeof value.answers!=='object'||!value.answers||typeof value.completed!=='object'||!value.completed||!Array.isArray(value.tasks))throw new Error('This is not a compatible Planning System backup.');
 const clean=emptyState();
 for(const m of modules)for(const l of m.lessons){const key=lessonKey(m,l);if(value.answers[key]){clean.answers[key]={};for(const f of l.fields||[]){const v=value.answers[key][f.key];if(v!==undefined){if(typeof v!=='string'||v.length>20000)throw new Error('An answer is too large or invalid.');clean.answers[key][f.key]=v;}}}if(value.completed[key]===true)clean.completed[key]=true;}
 if(value.tasks.length>200)throw new Error('A maximum of 200 course tasks is supported.');
 clean.tasks=value.tasks.map((t,i)=>{if(!t||typeof t!=='object')throw new Error('Invalid task.');const out={id:`task-${i}`};for(const key of ['title','owner','start','end']){if(typeof t[key]!=='string'||t[key].length>500)throw new Error('Invalid task field.');out[key]=t[key];}if(out.start&&!validDate(out.start)||out.end&&!validDate(out.end))throw new Error('Invalid task date.');return out;});
 const keys=modules.flatMap(m=>m.lessons.map(l=>lessonKey(m,l)));if(keys.includes(value.lastLesson))clean.lastLesson=value.lastLesson;
 clean.updatedAt=typeof value.updatedAt==='string'?value.updatedAt:null;
 for(const m of modules){for(const l of m.lessons.filter(l=>!l.review))if(!isFilled(clean,m,l))delete clean.completed[lessonKey(m,l)];if(!m.lessons.filter(l=>!l.review).every(l=>clean.completed[lessonKey(m,l)]))delete clean.completed[lessonKey(m,m.lessons.at(-1))];}
 return clean;
}
export function validDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const d=new Date(`${value}T00:00:00Z`);return Number.isFinite(+d)&&d.toISOString().slice(0,10)===value;}
export function isFilled(state,m,l){return (l.fields||[]).every(f=>typeof state.answers[lessonKey(m,l)]?.[f.key]==='string'&&state.answers[lessonKey(m,l)][f.key].trim())&&(l.id!=='timeline'||state.tasks.length>0&&state.tasks.every(t=>t.title.trim()&&t.owner.trim()&&validDate(t.start)&&validDate(t.end)&&t.end>=t.start));}
export function readState(){const raw=localStorage.getItem(STORAGE_KEY);return raw?validateState(JSON.parse(raw)):emptyState();}
export function mutateState(change){const next=readState();change(next);next.updatedAt=new Date().toISOString();localStorage.setItem(STORAGE_KEY,JSON.stringify(next));return next;}
export function invalidate(state,m,l){delete state.completed[lessonKey(m,l)];delete state.completed[lessonKey(m,m.lessons.at(-1))];for(const dependent of modules.filter(x=>x.uses.includes(m.id)))delete state.completed[lessonKey(dependent,dependent.lessons.at(-1))];}
export function stats(state,m){const lessons=m?m.lessons.map(l=>lessonKey(m,l)):modules.flatMap(x=>x.lessons.map(l=>lessonKey(x,l)));const done=lessons.filter(k=>state.completed[k]).length;return{done,total:lessons.length,percent:Math.round(done/lessons.length*100)};}
export {escapeHTML,download} from './ui-utils.js';
