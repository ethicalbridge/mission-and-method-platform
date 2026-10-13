/* Method into Impact — account page sign-in / signed-in state.
   Loads once on account.html. Reads the current Supabase auth session, swaps
   the loading box for either the magic-link form (signed out) or the welcome
   panel (signed in). Handles form submit, magic-link verification on return,
   and sign-out.
*/

import { mip, currentUser, activeWorkspace } from './supabase-client.js';

const $ = (id) => document.getElementById(id);

const views = {
 loading: $('auth-loading'),
 signedOut: $('auth-signed-out'),
 signedIn: $('auth-signed-in'),
};

/** Show exactly one of the three state boxes; hide the others. */
function show(which) {
 for (const [k, el] of Object.entries(views)) {
  if (!el) continue;
  el.hidden = (k !== which);
 }
}

/** Pull a friendly name from a user record (email prefix as fallback). */
function nameFor(user, profile) {
 if (profile?.full_name) return profile.full_name;
 const m = user?.raw_user_meta_data?.full_name || user?.user_metadata?.full_name;
 if (m) return m;
 if (user?.email) return user.email.split('@')[0];
 return 'there';
}

/** Hydrate the signed-in panel with the user's name, email and workspace. */
async function renderSignedIn(user) {
 const { data: profile } = await mip.from('mip_profiles').select('*').eq('id', user.id).maybeSingle();
 const workspace = await activeWorkspace();
 $('auth-user-name').textContent = nameFor(user, profile);
 $('auth-user-email').textContent = user.email || '—';
 $('auth-workspace-name').textContent = workspace?.name || 'your workspace';
 show('signedIn');
}

/** Wire the magic-link submit button. */
function wireSignInForm() {
 const form = $('signin-form');
 const note = $('signin-note');
 const submit = $('signin-submit');
 if (!form) return;
 form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = $('signin-email').value.trim();
  if (!email) return;
  submit.disabled = true;
  submit.textContent = 'Sending…';
  note.hidden = true;
  try {
   const { error } = await mip.auth.signInWithOtp({
    email,
    options: {
     // Supabase sends the user back here with the auth tokens in the URL;
     // the client (detectSessionInUrl: true) establishes the session on load.
     emailRedirectTo: window.location.origin + '/account.html',
    },
   });
   if (error) throw error;
   note.hidden = false;
   note.className = 'ac-signin-note tiny ac-signin-ok';
   note.innerHTML = '✓ Check your inbox for <b>' + email.replace(/[<>&]/g, '') + '</b>. The sign-in link is good for one hour.';
   submit.textContent = 'Link sent — check email';
  } catch (err) {
   note.hidden = false;
   note.className = 'ac-signin-note tiny ac-signin-err';
   note.textContent = 'Could not send the sign-in link: ' + (err?.message || 'unknown error') + '. Please try again.';
   submit.disabled = false;
   submit.textContent = 'Send sign-in link';
  }
 });
}

/** Wire the sign-out button. */
function wireSignOut() {
 const btn = $('signout-btn');
 if (!btn) return;
 btn.addEventListener('click', async () => {
  btn.disabled = true;
  btn.textContent = 'Signing out…';
  await mip.auth.signOut();
  // Clear the URL hash fragment the magic-link verify leaves behind,
  // then re-render in signed-out state.
  if (window.location.hash) history.replaceState(null, '', window.location.pathname);
  show('signedOut');
  btn.disabled = false;
  btn.textContent = 'Sign out';
 });
}

/** Main — called on load and whenever auth state changes. */
async function render() {
 const user = await currentUser();
 if (user) {
  await renderSignedIn(user);
 } else {
  show('signedOut');
 }
}

// Boot
wireSignInForm();
wireSignOut();
render();

// React to magic-link verification (fired automatically by the client when the
// URL fragment is parsed) and to sign-in / sign-out from any tab.
mip.auth.onAuthStateChange((event, _session) => {
 if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
  render();
 }
});
