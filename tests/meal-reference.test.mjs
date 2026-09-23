import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {softwareProducts} from '../products.js';

const context={window:{}};
runInNewContext(readFileSync(new URL('../assets/tools/MEAL-Reference-Data.js',import.meta.url),'utf8'),context);
const reference=context.window.MEAL_REFERENCE;

test('MEAL reference follows the attached three-sheet strategy',()=>{
 assert.deepEqual(Array.from(reference.objectives,x=>x.sourceSheet),['ESO 1','ESO 2','ESO 3']);
 assert.deepEqual(Array.from(reference.objectives,o=>reference.indicators.filter(i=>i.objectiveId===o.id).length),[8,7,7]);
 const first=reference.indicators[0];
 assert.equal(first.indicator,'# of verified ethical organisations onboarded');
 assert.equal(first.source,'Platform database, partner forms');
 assert.equal(first.manager,'MEAL and Compliance Officer; Communications and Marketing Manager');
 assert.equal(first.timing,'Trimestral');
 assert.equal(first.sourceActualTiming,'');
 assert.equal(first.planned[7],50);
 assert.equal(first.actual[7],30);
 assert.equal(first.planned[10],150);
 assert.equal(first.actual[10],200);
 assert.equal(reference.indicators.find(i=>i.indicator==='% of donors retained').aggregation,'Average');
 assert.equal(softwareProducts.find(p=>p.slug==='meal-strategy').launchUrl,'assets/tools/MEAL-Strategy.html');
});
