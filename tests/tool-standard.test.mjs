import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

// Tools rebuilt on the shared Impact Suite kit. Add each tool here as it is migrated.
const standardTools=['Strategic-Objectives','Strategy-KPIs-and-Annual-Planning'];

test('standard tools load the shared kit in the right order',()=>{
 for(const tool of standardTools){
  const html=readFileSync(`assets/tools/${tool}.html`,'utf8');
  assert.match(html,/href="suite\.css/,`${tool} uses suite.css`);
  const excel=html.indexOf('MEAL-Excel.js'),kit=html.indexOf('suite.js'),own=html.indexOf(`${tool}.js`);
  assert.ok(excel>0&&kit>excel&&own>kit,`${tool} loads MEAL-Excel.js, then suite.js, then its own script`);
  assert.doesNotMatch(html,new RegExp(`${tool}\\.css`),`${tool} has no separate stylesheet`);
 }
});

test('standard tools share the same sections, Excel round-trip and backup',()=>{
 for(const tool of standardTools){
  const js=readFileSync(`assets/tools/${tool}.js`,'utf8');
  for(const needle of ["'Start'","'Review'","'Export'",'S.shell(','S.store(','S.schemaSheet(','S.parseXlsx(','S.stamp(','download-template','export-json'])
   assert.ok(js.includes(needle),`${tool} uses ${needle}`);
 }
});
