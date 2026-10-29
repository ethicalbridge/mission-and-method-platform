import test from 'node:test';
import assert from 'node:assert/strict';
import {TOOL_ACCESS_STORAGE_KEY,grantToolAccess,hasToolAccess,invitationCodeIsValid,needsToolAccess,sha256hex,TOOL_CODE_SHA} from '../tool-access.js';
import {createHash} from 'node:crypto';
import {availableToolSlugs,invitationToolSlugs,softwareProducts} from '../products.js';

test('the guest code grants browser access only to the completed tools',()=>{
 const store=new Map(),storage={getItem:key=>store.get(key)||null,setItem:(key,value)=>store.set(key,value)};
 const sha=createHash('sha256').update('test-code').digest('hex');assert.equal(sha256hex('test-code'),sha);assert.match(TOOL_CODE_SHA,/^[0-9a-f]{64}$/);assert.equal(invitationCodeIsValid('test-code',sha),true);assert.equal(invitationCodeIsValid('other',sha),false);
 assert.equal(hasToolAccess(storage),false);assert.equal(grantToolAccess('wrong',storage),false);assert.equal(grantToolAccess('test-code',storage,sha),true);assert.equal(hasToolAccess(storage),true);assert.equal(store.get(TOOL_ACCESS_STORAGE_KEY),'granted');
 assert.equal(needsToolAccess('theory-of-change'),true);assert.equal(needsToolAccess('ethical-bridge-crm'),true);assert.equal(needsToolAccess('risk-register'),false);
 assert.deepEqual(invitationToolSlugs,['theory-of-change','ethical-bridge-crm']);
 assert.deepEqual(availableToolSlugs,['theory-of-change','ethical-bridge-crm','donor-mapping','donor-tracking','donor-reference-guide','individual-giving','issue-risk-management','meetings-actions-decisions','people-check-ins-development','onboarding-compliance','organisation-structure','strategy-kpis-annual-planning','strategic-objectives','gantt','meal-strategy','customer-persona','policy-management','marketing-social-planner']);
 assert.equal(needsToolAccess('gantt'),false);
 assert.equal(needsToolAccess('donor-mapping'),false);
 assert.equal(softwareProducts.find(p=>p.slug==='theory-of-change').launchUrl,'assets/tools/Theory-of-Change-Builder.html');
 assert.equal(softwareProducts.find(p=>p.slug==='ethical-bridge-crm').launchUrl,'assets/tools/Ethical-Bridge-CRM.html');
 assert.equal(softwareProducts.find(p=>p.slug==='donor-mapping').launchUrl,'assets/tools/Donor-Mapping.html');
 assert.equal(softwareProducts.find(p=>p.slug==='donor-tracking').launchUrl,'assets/tools/Donor-Tracking.html');
 assert.equal(softwareProducts.find(p=>p.slug==='donor-reference-guide').launchUrl,'assets/tools/Donor-Reference-Guide.html');
 assert.equal(softwareProducts.find(p=>p.slug==='individual-giving').launchUrl,'assets/tools/Individual-Giving-and-Donor-Management.html');
 assert.equal(softwareProducts.find(p=>p.slug==='meetings-actions-decisions').launchUrl,'assets/tools/Meetings-Actions-and-Decisions.html');
 assert.equal(softwareProducts.find(p=>p.slug==='organisation-structure').launchUrl,'assets/tools/Organisation-Structure.html');
});
