import {availableToolSlugs} from './products.js';
import {grantToolAccess,hasToolAccess,needsToolAccess} from './tool-access.js';

const access=hasToolAccess();
const setState=granted=>{
 document.querySelectorAll('[data-tool-access-link]').forEach(link=>{link.textContent=granted?`Open ${link.dataset.toolName} →`:'Unlock with access code →';});
 document.querySelectorAll('[data-tool-access-status]').forEach(status=>{status.textContent=granted?'Access granted on this browser. You can now open both tools.':'Enter an invitation code to access the two available tools.';});
};
document.querySelectorAll('[data-tool-access-form]').forEach(form=>form.addEventListener('submit',event=>{
 event.preventDefault();
 const input=form.querySelector('input[name="access-code"]');
 const status=form.querySelector('[role="status"]');
 if(grantToolAccess(input.value)){status.textContent='Access granted. Opening your tool…';setState(true);const destination=document.body.dataset.product;if(destination&&needsToolAccess(destination))location.reload();else input.value='';}
 else status.textContent='That code does not match. Please try again.';
}));
setState(access);
if(document.body.dataset.product&&needsToolAccess(document.body.dataset.product)&&!access){document.querySelector('#software-demo')?.setAttribute('hidden','');}
