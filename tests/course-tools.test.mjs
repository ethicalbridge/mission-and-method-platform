import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {modules,lessonTools,moduleToolSlugs} from '../course-data.js';
import {availableToolSlugs,softwareProducts,retiredTools} from '../products.js';

test('every mapped lesson exists and every mapped tool is a live tool',()=>{
 for(const [moduleId,map] of Object.entries(lessonTools)){
  const m=modules.find(x=>x.id===Number(moduleId));assert.ok(m,`module ${moduleId}`);
  for(const [lessonId,slugs] of Object.entries(map)){
   assert.ok(m.lessons.some(l=>l.id===lessonId),`${moduleId}.${lessonId} exists`);
   for(const slug of slugs)assert.ok(availableToolSlugs.includes(slug),`${slug} is live`);
  }
 }
});

test('every live tool is taught somewhere in the course',()=>{
 const taught=new Set(modules.flatMap(m=>moduleToolSlugs(m.id)));
 for(const slug of availableToolSlugs)assert.ok(taught.has(slug),`${slug} is linked to a lesson`);
});

test('retired tools point to a live tool and are gone from the catalogue',()=>{
 for(const [slug,to] of Object.entries(retiredTools)){
  assert.ok(availableToolSlugs.includes(to),`${slug} → ${to}`);
  assert.equal(softwareProducts.find(p=>p.slug===slug),undefined);
  assert.match(readFileSync(`software-${slug}.html`,'utf8'),new RegExp(`url=software-${to}\\.html`));
 }
});

test('module and tool pages carry the generated cross-links',()=>{
 assert.match(readFileSync('strategy-to-action.html','utf8'),/Tools for this module[\s\S]*software-gantt\.html/);
 assert.match(readFileSync('software-strategy-kpis-annual-planning.html','utf8'),/Learn it in the course[\s\S]*module=6&lesson=deliverables/);
});
