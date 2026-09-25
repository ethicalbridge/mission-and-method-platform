import test from 'node:test';
import assert from 'node:assert/strict';
import {availableToolGroups,softwareCatalogue} from '../scripts/pricing-sections.mjs';
import {availableToolSlugs} from '../products.js';

test('every completed tool appears once under a topic, sorted by title',()=>{
 const slugs=availableToolGroups.flatMap(([,items])=>items);
 assert.equal(new Set(slugs).size,slugs.length);
 assert.deepEqual([...slugs].sort(),[...availableToolSlugs].sort());
 const html=softwareCatalogue();
 assert.equal((html.match(/class="suite-tool-topic"/g)||[]).length,availableToolGroups.length);
 assert.equal((html.match(/class="suite-tool-card"/g)||[]).length,availableToolSlugs.length);
 assert.match(html,/Funding & Business Development/);
 assert.ok(html.indexOf('Strategy, KPIs & Annual Planning</h4>')<html.indexOf('Theory of Change Builder</h4>'));
 assert.ok(html.indexOf('Gantt & Project Planner</h4>')<html.indexOf('Issue & Risk Management</h4>'));
});
