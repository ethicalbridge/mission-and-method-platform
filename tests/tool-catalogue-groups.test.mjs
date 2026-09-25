import test from 'node:test';
import assert from 'node:assert/strict';
import {readdirSync} from 'node:fs';
import {availableToolGroups,softwareCatalogue} from '../scripts/pricing-sections.mjs';
import {availableToolSlugs,softwareProducts} from '../products.js';

test('every completed tool appears once under a topic, with Organisation Structure first in its group',()=>{
 const slugs=availableToolGroups.flatMap(([,items])=>items);
 assert.equal(new Set(slugs).size,slugs.length);
 assert.deepEqual([...slugs].sort(),[...availableToolSlugs].sort());
 const html=softwareCatalogue();
 assert.equal((html.match(/class="suite-tool-topic"/g)||[]).length,availableToolGroups.length);
 assert.equal((html.match(/class="suite-tool-card"/g)||[]).length,availableToolSlugs.length);
 assert.match(html,/Funding & Business Development/);
 assert.ok(html.indexOf('Strategy, KPIs & Annual Planning</h4>')<html.indexOf('Theory of Change Builder</h4>'));
 assert.ok(html.indexOf('Gantt & Project Planner</h4>')<html.indexOf('Issue & Risk Management</h4>'));
 assert.ok(html.indexOf('Issue & Risk Management</h4>')<html.indexOf('Meetings, Actions & Decisions</h4>'));
 assert.ok(html.indexOf('Donor Mapping</h4>')<html.indexOf('Individual Giving & Donor Management</h4>'));
 const people=html.slice(html.indexOf('People & organisation</h3>'));
 assert.ok(people.indexOf('Organisation Structure</h4>')<people.indexOf('Onboarding & Staff Compliance</h4>'));
 assert.ok(people.indexOf('Organisation Structure</h4>')<people.indexOf('People Check-Ins & Development</h4>'));
});

test('every standalone tool page is linked from the Impact Tools catalogue',()=>{
 const pages=readdirSync(new URL('../assets/tools/',import.meta.url)).filter(name=>name.endsWith('.html')).sort();
 const linked=softwareProducts.filter(tool=>availableToolSlugs.includes(tool.slug)&&tool.launchUrl?.startsWith('assets/tools/')).map(tool=>tool.launchUrl.split('/').at(-1)).sort();
 assert.deepEqual(linked,pages);
 assert.equal(softwareProducts.filter(tool=>availableToolSlugs.includes(tool.slug)&&tool.launchUrl?.startsWith('https://')).length,1);
});
