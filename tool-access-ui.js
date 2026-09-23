import {availableToolSlugs} from './products.js';
import {grantToolAccess,hasToolAccess,needsToolAccess} from './tool-access.js';

const access=hasToolAccess();
const setState=granted=>{
 document.querySelectorAll('[data-tool-access-link]').forEach(link=>{link.textContent=granted?`Open ${link.dataset.toolName} →`:'Unlock with access code →';if(granted){link.href=link.dataset.toolDestination;link.target='_blank';link.rel='noopener';}else{link.href='#tool-access';link.removeAttribute('target');}});
 document.querySelectorAll('[data-tool-access-status]').forEach(status=>{status.textContent=granted?'Access granted on this browser. You can now open both tools.':'Enter an invitation code to access the two available tools.';});
};
document.querySelectorAll('[data-tool-access-form]').forEach(form=>form.addEventListener('submit',event=>{
 event.preventDefault();
 const input=form.querySelector('input[name="access-code"]');
 const status=form.querySelector('[role="status"]');
 if(grantToolAccess(input.value)){setState(true);const destination=form.dataset.redirectUrl;if(destination){status.textContent='Access granted. Opening your tool…';location.assign(destination);}else{status.textContent='Access granted. You can now open both tools.';input.value='';}}
 else status.textContent='That code does not match. Please try again.';
}));
setState(access);
if(document.body.dataset.product&&needsToolAccess(document.body.dataset.product)&&!access){document.querySelector('#software-demo')?.setAttribute('hidden','');}
