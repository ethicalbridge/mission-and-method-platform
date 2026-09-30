// Per-tool access gate: click a tool → prompt for code → open on success.
// Grant persists in localStorage so subsequent clicks skip the prompt.
import {grantToolAccess, hasToolAccess} from './tool-access.js';

const STORAGE_HINT = 'Access code (same for every tool)';

function openTool(link){
  const url = link.dataset.toolDestination;
  if (!url) return;
  window.open(url, '_blank', 'noopener');
}

function refreshLinks(){
  const granted = hasToolAccess();
  document.querySelectorAll('[data-tool-access-link]').forEach(link => {
    if (!link.dataset.preserveLabel) {
      link.textContent = granted
        ? `Open ${link.dataset.toolName} →`
        : 'Unlock with access code →';
    }
    // Neutralize href so we always handle it in JS
    link.setAttribute('href', 'javascript:void(0)');
    link.removeAttribute('target');
  });
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-tool-access-link]');
  if (!link) return;
  event.preventDefault();

  if (hasToolAccess()) {
    openTool(link);
    return;
  }

  const code = window.prompt(`Enter your access code to open ${link.dataset.toolName}:`, '');
  if (code === null) return; // cancelled

  if (grantToolAccess(code)) {
    refreshLinks();
    openTool(link);
  } else {
    window.alert('That code does not match. Please try again.');
  }
});

// Initial link labels
refreshLinks();
