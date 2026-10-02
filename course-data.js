// Original teaching content. Examples are fictional and illustrative.
// Public development preview only; see docs/production-access.md before a paid launch.
// Lesson content lives in course/mNN-*.js, one file per module. Each lesson ("section") has information,
// an Excel sheet (lesson.sheet, in the module workbook) and a video slot (lesson.video).
export {readingsFor,sources,resources,resourcePlan} from './resource-library.js';
import m0 from './course/m00-start-here.js';
import m1 from './course/m01-strategic-foundations.js';
import m2 from './course/m02-theory-of-change.js';
import m3 from './course/m03-structure-governance.js';
import m4 from './course/m04-people-culture.js';
import m5 from './course/m05-internal-systems.js';
import m6 from './course/m06-meal.js';
import m7 from './course/m07-brand-identity.js';
import m8 from './course/m08-marketing-communications.js';
import m9 from './course/m09-financial-management.js';
import m10 from './course/m10-legal-compliance-risk.js';
import m11 from './course/m11-fundraising-revenue.js';
import m12 from './course/m12-partnerships.js';
import m13 from './course/m13-strategy-to-action.js';
export {STAGES} from './course/kit.js';

// The Planning System is sold as five courses, one per phase. Each module's `phase` names its course.
// Prices and product IDs live in pricing-config.js (courses[].id matches courses here).
export const phases=[
 {id:'clarify',number:1,name:'Clarify',title:'Clarify: Purpose, Strategy & Theory of Change',summary:'Why we exist and what change we pursue'},
 {id:'organise',number:2,name:'Organise',title:'Organise: Structure, People & Systems',summary:'Who does what and how we run'},
 {id:'prove-show',number:3,name:'Prove & Show',title:'Prove & Show: MEAL, Brand & Communications',summary:'Evidence, identity and voice'},
 {id:'protect',number:4,name:'Protect',title:'Protect: Finance, Legal, Compliance & Risk',summary:'Money, duties, policies and risk'},
 {id:'sustain-run',number:5,name:'Sustain & Run',title:'Sustain & Run: Funding, Partnerships & Operating Plan',summary:'Resources, partners and a plan you run'}
];
export const courses=phases;
export const courseFor=m=>phases.find(p=>p.name===m.phase);
// Modules anyone can open without buying a course.
export const freeModules=[0];
export const modules=[m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13];
export const moduleCount=modules.length;
export const lessonCount=modules.reduce((n,m)=>n+m.lessons.length,0);
export const moduleNumber=m=>String(m.id).padStart(2,'0');
export const moduleFor=id=>modules.find(m=>m.id===Number(id));
export const nextModule=m=>modules[modules.indexOf(m)+1]||null;
export const lessonSheets=l=>[].concat(l.sheet||[]);

// Course ↔ Impact Tools map, derived from each lesson's tools. Each slug is the live tool version of that lesson's work.
// Tools stay standalone: nothing is copied automatically; the learner imports the module workbook into the tool.
export const lessonTools=Object.fromEntries(modules.map(m=>[m.id,Object.fromEntries(m.lessons.filter(l=>l.tools.length).map(l=>[l.id,l.tools]))]));
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
