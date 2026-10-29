// Original teaching content. Examples are fictional and illustrative.
// Public development preview only; see docs/production-access.md before a paid launch.
// Lesson content lives in course/mNN-*.js, one file per module. Each lesson ("section") has information,
// an Excel sheet (lesson.sheet, in the module workbook) and a video slot (lesson.video).
export {readingsFor,sources,resources,resourcePlan,resourceAnchor,primaryFor,ROLES} from './resource-library.js?v=ev6';
import {readingsFor as allReadings} from './resource-library.js?v=ev6';
import m0 from './course/m00-start-here.js?v=links3';
import m1 from './course/m01-strategic-foundations.js?v=links3';
import m2 from './course/m02-theory-of-change.js?v=links3';
import m3 from './course/m03-structure-governance.js?v=links3';
import m4 from './course/m04-people-culture.js?v=links3';
import m5 from './course/m05-internal-systems.js?v=links3';
import m6 from './course/m06-meal.js?v=links3';
import m7 from './course/m07-brand-identity.js?v=links3';
import m8 from './course/m08-marketing-communications.js?v=links3';
import m9 from './course/m09-financial-management.js?v=links3';
import m10 from './course/m10-legal-compliance-risk.js?v=links3';
import m11 from './course/m11-fundraising-revenue.js?v=links3';
import m12 from './course/m12-partnerships.js?v=links3';
import m13 from './course/m13-strategy-to-action.js?v=links3';
// Entrepreneurs track: courses 1–4 (modules 00–10) copied from the organisation courses and reworded for people
// building something new. Each course/eNN-*.js adapts course/mNN-*.js (see course/adapt.js); ids are 100 + NN.
import e0 from './course/e00-start-here.js?v=links3';
import e1 from './course/e01-strategic-foundations.js?v=links3';
import e2 from './course/e02-theory-of-change.js?v=links3';
import e3 from './course/e03-structure-governance.js?v=links3';
import e4 from './course/e04-people-culture.js?v=links3';
import e5 from './course/e05-internal-systems.js?v=links3';
import e6 from './course/e06-meal.js?v=links3';
import e7 from './course/e07-brand-identity.js?v=links3';
import e8 from './course/e08-marketing-communications.js?v=links3';
import e9 from './course/e09-financial-management.js?v=links3';
import e10 from './course/e10-legal-compliance-risk.js?v=links3';
export {FOUNDER_OFFSET} from './course/adapt.js?v=links3';
export {recaps} from './course/founder-recaps.js?v=links3';
export {STAGES} from './course/kit.js?v=links3';
export {exampleOrgs,exampleOrg} from './course/examples.js?v=links3';
export {lessonVideos,moduleVideos} from './course/videos.js?v=links3';

// The Planning System is sold as five courses, one per phase. Each module's `phase` names its course.
// Prices and product IDs live in pricing-config.js (courses[].id matches courses here).
// Two audiences, one method: entrepreneurs (an idea, nothing built yet) and organisations (already running).
export const tracks={
 entrepreneurs:{id:'entrepreneurs',label:'For entrepreneurs',who:'You have an idea and want to start',page:'work-with-julieta.html#path-idea'},
 organisations:{id:'organisations',label:'For organisations',who:'You already run an organisation',page:'work-with-julieta.html#path-org'}
};
export const phases=[
 {id:'clarify',number:1,name:'Clarify',title:'Clarify: Purpose, Strategy & Theory of Change',summary:'Why we exist and what change we pursue'},
 {id:'organise',number:2,name:'Organise',title:'Organise: Structure, People & Systems',summary:'Who does what and how we run'},
 {id:'prove-show',number:3,name:'Prove & Show',title:'Prove & Show: MEAL, Brand & Communications',summary:'Evidence, identity and voice'},
 {id:'protect',number:4,name:'Protect',title:'Protect: Finance, Legal, Compliance & Risk',summary:'Money, duties, policies and risk'},
 {id:'sustain-run',number:5,name:'Sustain & Run',title:'Sustain & Run: Funding, Partnerships & Operating Plan',summary:'Resources, partners and a plan you run'}
];
for(const p of phases)p.track='organisations';
export const courses=phases;
// The entrepreneurs' courses: the first four courses, same modules and lessons, written for people starting out.
export const founderPhases=[
 {id:'entrepreneurs-clarify',number:1,name:'Clarify',title:'Clarify: Purpose, Strategy & Theory of Change',summary:'Why your idea needs to exist and the change you want to make'},
 {id:'entrepreneurs-organise',number:2,name:'Organise',title:'Organise: Structure, People & Systems',summary:'Who decides, who does the work and how it will run'},
 {id:'entrepreneurs-prove-show',number:3,name:'Prove & Show',title:'Prove & Show: MEAL, Brand & Communications',summary:'How you will know it works and how people will hear about it'},
 {id:'entrepreneurs-protect',number:4,name:'Protect',title:'Protect: Finance, Legal, Compliance & Risk',summary:'Money, legal duties, policies and risk from the start'}
];
for(const p of founderPhases)p.track='entrepreneurs';
export const founderModules=[e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10];
export const isFounder=m=>m?.track==='entrepreneurs';
export const phasesFor=x=>(x==='entrepreneurs'||x?.track==='entrepreneurs')?founderPhases:phases;
export const courseFor=m=>phasesFor(m).find(p=>p.name===m.phase);
export const allCourses=[...phases,...founderPhases];
// Modules anyone can open without buying a course.
export const freeModules=[0,100];
// `modules` is the organisations track (the five foundation courses). `allModules` adds the entrepreneurs' courses.
export const modules=[m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13];
export const allModules=[...modules,...founderModules];
export const trackModules=m=>isFounder(m)?founderModules:modules;
export const courseModules=p=>(p.track==='entrepreneurs'?founderModules:modules).filter(m=>m.phase===p.name);
export const moduleCount=modules.length;
export const lessonCount=modules.reduce((n,m)=>n+m.lessons.length,0);
export const moduleNumber=m=>String(isFounder(m)?m.no:m.id).padStart(2,'0');
export const moduleFor=id=>allModules.find(m=>m.id===Number(id));
export const nextModule=m=>{const list=trackModules(m);return list[list.indexOf(m)+1]||null;};
export const lessonSheets=l=>[].concat(l.sheet||[]);

// Course ↔ Impact Tools map, derived from each lesson's tools. Each slug is the live tool version of that lesson's work.
// Tools stay standalone: nothing is copied automatically; the learner imports the module workbook into the tool.
export const lessonTools=Object.fromEntries(allModules.map(m=>[m.id,Object.fromEntries(m.lessons.filter(l=>l.tools.length).map(l=>[l.id,l.tools]))]));
export const toolsFor=(moduleId,lessonId)=>lessonTools[moduleId]?.[lessonId]||[];
export const moduleToolSlugs=moduleId=>{const m=moduleFor(moduleId);return [...new Set([...Object.values(lessonTools[moduleId]||{}).flat(),...(m?.promo?.tools||[])])];};
// Display names used inside the course (keeps the course free of other brands).
export const courseToolLabels={'ethical-bridge-crm':'Relationship CRM'};

// Saved work from the previous 8-module course: old lesson key → new lesson key. Answers carry over where field keys match.
export const legacyLessonKeys={
 '1.purpose':'1.purpose','1.vision':'1.vision','1.mission':'1.mission','1.values':'1.values','1.objectives':'1.objectives','1.foundation':'1.foundation',
 '2.understanding':'2.understanding','2.problem':'2.problem','2.impact':'2.impact','2.outcomes':'2.outcomes','2.outputs':'2.outputs','2.activities':'2.activities','2.inputs':'2.inputs','2.assumptions':'2.assumptions','2.pathway':'2.pathway',
 '3.structure':'3.structure','3.roles':'3.roles','3.coordination':'3.coordination','3.onboarding':'4.onboarding','3.team-pack':'3.team-pack',
 '4.systems':'5.systems','4.brand':'7.strategy','4.blueprint':'5.blueprint',
 '5.priorities':'10.policy-needs','5.procedures':'10.procedures','5.controls':'9.controls','5.risk':'10.data-protection','5.policy-pack':'10.compliance-pack',
 '6.deliverables':'13.deliverables','6.ownership':'13.ownership','6.dependencies':'13.dependencies','6.timeline':'13.timeline','6.work-plan':'13.work-plan',
 '7.validation':'11.validation',
 '8.funding-mix':'11.income-mix','8.prospects':'11.prospects','8.case':'11.case','8.pipeline':'11.pipeline'
};

// Readable lesson addresses: /<course>/<lesson-title>, e.g. /clarify/organisation-profile.
// The static page for each one is written by scripts/generate-lesson-pages.mjs; rerun it after renaming or adding lessons.
export const lessonSlug=l=>l.title.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').replace(/^your-/,'');
export const lessonPath=(m,l)=>`${courseFor(m).id}/${lessonSlug(l)}`;

// Courses whose lessons show no 'Explore further' readings (they stay in the Evidence Library).
// Course 1 teaches from its own explanations and worked examples instead (October 2026 review).
export const readingsHiddenIn=new Set(['Clarify','Organise','Prove & Show','Protect','Sustain & Run']);
export const lessonReadings=(m,l)=>readingsHiddenIn.has(m.phase)?[]:allReadings(m.mirror??m.id,l.id);
