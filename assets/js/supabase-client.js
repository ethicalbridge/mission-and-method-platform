/* Method into Impact — shared Supabase browser client.
   One module per page; every tool, course page and account page import
   `mip` from here instead of newly initialising @supabase/supabase-js.

   The publishable key here is safe to ship in client bundles — it only
   grants the privileges that RLS policies allow for the `anon` and
   `authenticated` roles. It is NOT the service_role key.
*/

// The library loads from a CDN. If that fails (an ad-blocker, a firewall, no connection), pages still work:
// `mip` becomes an offline stand-in whose calls answer "signed out" or an error, so free lessons and
// templates render and only account features say they could not connect. MIP_OFFLINE tells pages which case it is.
let createClient = null;
try { ({ createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm')); }
catch (e) { console.warn('Account service library could not load; continuing without sign-in.', e); }
export const MIP_OFFLINE = !createClient;

export const SUPABASE_URL = 'https://itzrnaxfllcztpzrgnoa.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ignrdHXThk5I88py3FaxbA_QegLgiAI';

const OFFLINE_ERROR = { message: 'Could not reach the account service. Check your connection or ad-blocker and try again.', code: 'offline' };
const offlineResult = () => Promise.resolve({ data: null, error: OFFLINE_ERROR, count: null });
// A query chain that accepts any method (.select().eq()…) and resolves to the offline error.
const chain = () => new Proxy(function () {}, { get: (_, k) => k === 'then' ? (ok, no) => offlineResult().then(ok, no) : chain(), apply: () => chain() });
const authBase = {
 getSession: async () => ({ data: { session: null }, error: null }),
 getUser: async () => ({ data: { user: null }, error: null }),
 onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
 signOut: async () => ({ error: null }),
};
const offlineClient = () => ({
 auth: new Proxy(authBase, { get: (t, k) => k in t ? t[k] : async () => ({ data: {}, error: OFFLINE_ERROR }) }),
 from: () => chain(), rpc: () => chain(), channel: () => chain(), removeChannel() {},
 storage: { from: () => chain() },
 functions: { invoke: async () => ({ data: null, error: OFFLINE_ERROR }) },
});

export const mip = !createClient ? offlineClient() : createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
 auth: {
  // Persist the session in localStorage so a signed-in user stays signed in
  // across tabs and reloads. Supabase JS handles token refresh automatically.
  persistSession: true,
  autoRefreshToken: true,
  detectSessionInUrl: true,
  storageKey: 'mip-auth',
 },
 db: { schema: 'public' },
 global: {
  headers: { 'x-mip-client': 'web/1.0' },
 },
});

// --- Convenience helpers (thin wrappers that match the shape every tool uses)

/** Current signed-in user, or null. */
export async function currentUser() {
 const { data: { user }, error } = await mip.auth.getUser();
 if (error) { console.warn('mip auth error', error); return null; }
 return user;
}

/** The workspace the current user is actively using. For now: first owned. */
export async function activeWorkspace() {
 const user = await currentUser(); if (!user) return null;
 const { data, error } = await mip
  .from('mip_workspaces').select('*')
  .eq('owner_id', user.id).order('created_at', { ascending: true }).limit(1).maybeSingle();
 if (error) { console.warn('mip workspace error', error); return null; }
 return data;
}

/** Load a tool's saved JSON blob for a workspace. */
export async function loadToolData(workspaceId, toolSlug) {
 const { data, error } = await mip
  .from('mip_tool_data').select('data, schema_version, updated_at')
  .eq('workspace_id', workspaceId).eq('tool_slug', toolSlug).maybeSingle();
 if (error) { console.warn('mip loadToolData error', error); return null; }
 return data;
}

/** Save (upsert) a tool's JSON blob for a workspace. */
export async function saveToolData(workspaceId, toolSlug, data, schemaVersion = 1) {
 const user = await currentUser();
 const payload = {
  workspace_id: workspaceId, tool_slug: toolSlug,
  data, schema_version: schemaVersion,
  updated_by: user?.id || null, updated_at: new Date().toISOString(),
 };
 const { error } = await mip
  .from('mip_tool_data').upsert(payload, { onConflict: 'workspace_id,tool_slug' });
 if (error) { console.warn('mip saveToolData error', error); return false; }
 return true;
}

// Expose on window for the current script-tag tools (which can't `import` yet).
if (typeof window !== 'undefined') { window.MIP_SUPABASE = { mip, currentUser, activeWorkspace, loadToolData, saveToolData }; }
