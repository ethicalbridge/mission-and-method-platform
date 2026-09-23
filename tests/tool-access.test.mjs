import test from 'node:test';
import assert from 'node:assert/strict';
import {TOOL_ACCESS_STORAGE_KEY,grantToolAccess,hasToolAccess,invitationCodeIsValid,needsToolAccess} from '../tool-access.js';
import {availableToolSlugs,softwareProducts} from '../products.js';

test('the guest code grants browser access only to the completed tools',()=>{
 const store=new Map(),storage={getItem:key=>store.get(key)||null,setItem:(key,value)=>store.set(key,value)};
 assert.equal(invitationCodeIsValid('1234'),true);assert.equal(invitationCodeIsValid('1235'),false);
 assert.equal(hasToolAccess(storage),false);assert.equal(grantToolAccess('wrong',storage),false);assert.equal(grantToolAccess('1234',storage),true);assert.equal(hasToolAccess(storage),true);assert.equal(store.get(TOOL_ACCESS_STORAGE_KEY),'granted');
 assert.equal(needsToolAccess('theory-of-change'),true);assert.equal(needsToolAccess('ethical-bridge-crm'),true);assert.equal(needsToolAccess('risk-register'),false);
 assert.deepEqual(availableToolSlugs,['theory-of-change','ethical-bridge-crm']);
 assert.match(softwareProducts.find(p=>p.slug==='theory-of-change').launchUrl,/^http:\/\/localhost:8765\//);
 assert.equal(softwareProducts.find(p=>p.slug==='ethical-bridge-crm').launchUrl,'https://ethical-bridge-crm.open-pike-3973.chatgpt.site/');
});
