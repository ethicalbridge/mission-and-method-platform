// POST /mip-newsletter  Newsletter sign-ups (double opt-in) and the 3 free templates, through Brevo (secret BREVO_API_KEY).
//   free-templates { email, marketing, consentText, consentVersion, lang, page }
//       Emails the 3 free templates (attached). If marketing is true, the email also has a "Yes, keep me posted" button.
//   subscribe      { email, consentText, consentVersion, lang, page, source }
//       Sends a short email with the "Yes, keep me posted" button.
//   confirm        { token }  (called by methodintoimpact.com/newsletter.html when the person presses Confirm)
//       Adds the person to the Brevo list "Method into Impact newsletter". Nobody is added before this click.
// Every request is recorded in mip_email_consents (proof of consent: text shown, version, time, page, status).
import { createClient } from 'jsr:@supabase/supabase-js@2';

const ORIGINS = new Set(['https://methodintoimpact.com','https://www.methodintoimpact.com','https://ethicalbridge.github.io','http://localhost:8765','http://127.0.0.1:8765']);
const SITE = 'https://methodintoimpact.com';
const SENDER = { name: 'Julieta · Method into Impact', email: 'hello@methodintoimpact.com' };
const LIST_NAME = 'Method into Impact newsletter';
// [slug, English title, Spanish title]. Spanish requests get the Spanish files (assets/legal-templates/es/).
const FREE = [
  ['legal-review-checklist', 'Legal Review Checklist', 'Lista de verificación para revisión legal'],
  ['conflict-of-interest-policy', 'Conflict of Interest Policy', 'Política de conflictos de interés'],
  ['mutual-confidentiality-agreement', 'Mutual Confidentiality Agreement', 'Acuerdo de confidencialidad mutua'],
];
const fileUrl = (s: string, es: boolean) => `${SITE}/assets/legal-templates/${es ? 'es/' : ''}${s}.docx`;
const cors = (o: string | null): HeadersInit => ({
  'Access-Control-Allow-Origin': o && ORIGINS.has(o) ? o : SITE,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Max-Age': '86400', 'Vary': 'Origin',
});
const json = (b: unknown, s: number, o: string | null) => new Response(JSON.stringify(b), { status: s, headers: { 'Content-Type': 'application/json', ...cors(o) } });
const sha256 = async (t: string) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)))).map(b => b.toString(16).padStart(2, '0')).join('');
const token = () => Array.from(crypto.getRandomValues(new Uint8Array(24))).map(b => b.toString(16).padStart(2, '0')).join('');

const P = (t: string) => `<p style="margin:0 0 14px 0;">${t}</p>`;
const BTN = (href: string, label: string, color = '#e56f4a') => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 16px 0;"><tr><td bgcolor="${color}" style="border-radius:999px;"><a href="${href}" style="display:inline-block;padding:12px 24px;font-family:'Nunito Sans',Arial,Helvetica,sans-serif;font-size:15px;font-weight:800;color:#ffffff;text-decoration:none;border-radius:999px;">${label}</a></td></tr></table>`;
function layout(eyebrow: string, title: string, body: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#fbf7ef;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fbf7ef;"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
<tr><td style="padding:0 4px 20px 4px;"><a href="${SITE}"><img src="${SITE}/assets/email/logo.png" width="240" alt="Method into Impact" style="display:block;border:0;width:240px;height:auto;"></a></td></tr>
<tr><td style="background:#ffffff;border:1px solid #e6dfcf;border-radius:16px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="height:6px;background:#16746e;font-size:0;line-height:0;border-radius:16px 16px 0 0;">&nbsp;</td></tr>
<tr><td style="padding:30px 32px;font-family:'Nunito Sans',Arial,Helvetica,sans-serif;color:#102e3b;font-size:16px;line-height:1.6;">
<p style="margin:0 0 8px 0;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#16746e;">${eyebrow}</p>
<h1 style="margin:0 0 14px 0;font-family:'DM Serif Display',Georgia,serif;font-weight:400;font-size:28px;line-height:1.2;color:#102e3b;">${title}</h1>${body}</td></tr></table></td></tr>
<tr><td style="padding:22px 8px 0 8px;font-family:'Nunito Sans',Arial,Helvetica,sans-serif;text-align:center;"><p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#16746e;">Better foundations. Stronger organisations.</p><p style="margin:0;font-size:12px;color:#8a8f87;"><a href="${SITE}" style="color:#8a8f87;">methodintoimpact.com</a> &middot; <a href="${SITE}/legal.html#privacy" style="color:#8a8f87;">Privacy</a></p></td></tr>
</table></td></tr></table></body></html>`;
}
function freeEmail(es: boolean, confirmUrl: string | null) {
  const items = FREE.map(([s, en, esT]) => `<li style="margin:0 0 6px 0;"><a href="${fileUrl(s, es)}" style="color:#16746e;font-weight:700;">${es ? esT : en}</a></li>`).join('');
  const list = `<ul style="padding-left:20px;margin:0 0 16px 0;">${items}</ul>`;
  const body = es
    ? P('Hola, aquí tienes tus tres plantillas gratuitas, adjuntas a este correo, en español. También puedes descargarlas aquí:') + list + P('Son editables: completa los campos amarillos, sigue las indicaciones de los recuadros naranjas y pide a un asesor de tu país que revise la versión final.')
      + (confirmUrl ? P('Marcaste la casilla para recibir novedades. Confírmalo aquí y te escribiremos de vez en cuando:') + BTN(confirmUrl, 'Sí, quiero recibir novedades', '#16746e') : P('No recibirás más correos nuestros aparte de este.'))
      + P('¿Preguntas? Responde a este correo.') + P('¿Quieres ver el resto? Hay 59 plantillas en inglés y español, a $9 cada una o en paquetes: ' + `<a href="${SITE}/legal-templates.html?lang=es" style="color:#16746e;">ver la biblioteca</a>.`) + P('Julieta, Method into Impact')
    : P('Hi, here are your three free templates, attached to this email. You can also download them here:') + list + P('They are editable: fill in the yellow fields, work through the orange "Adapt this" boxes, and have a qualified adviser in your country check the final version.')
      + (confirmUrl ? P('You ticked the box for updates. Please confirm here so we can send you occasional emails:') + BTN(confirmUrl, 'Yes, keep me posted', '#16746e') : P('You will not hear from us beyond this email.'))
      + P('Questions? Just reply to this message.') + P('Want the rest? There are 59 templates in English and Spanish, $9 each or in packs: ' + `<a href="${SITE}/legal-templates.html" style="color:#16746e;">see the library</a>.`) + P('Julieta, Method into Impact');
  return { subject: es ? 'Tus 3 plantillas gratuitas de Method into Impact' : 'Your 3 free templates from Method into Impact', html: layout(es ? 'Plantillas gratuitas' : 'Free templates', es ? 'Tus plantillas están listas' : 'Your templates are here', body) };
}
function confirmEmail(es: boolean, confirmUrl: string) {
  const body = es
    ? P('Gracias por tu interés en Method into Impact. Confirma tu suscripción y te enviaremos de vez en cuando un correo breve sobre nuevos cursos y plantillas.') + BTN(confirmUrl, 'Sí, quiero recibir novedades', '#16746e') + P('Si no lo pediste tú, ignora este correo: no te añadiremos a ninguna lista.')
    : P('Thanks for your interest in Method into Impact. Confirm your subscription and we will send you a short email now and then about new courses and templates.') + BTN(confirmUrl, 'Yes, keep me posted', '#16746e') + P('If this was not you, ignore this email: you will not be added to any list.');
  return { subject: es ? 'Confirma tu suscripción a Method into Impact' : 'Please confirm your Method into Impact subscription', html: layout(es ? 'Boletín' : 'Newsletter', es ? 'Un clic para confirmar' : 'One click to confirm', body) };
}

Deno.serve(async (req) => {
  const o = req.headers.get('origin');
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(o) });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, o);
  let p: Record<string, any>;
  try { p = await req.json(); } catch { return json({ error: 'invalid_json' }, 400, o); }
  const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
  const KEY = Deno.env.get('BREVO_API_KEY');
  const brevo = (path: string, init: RequestInit = {}) => fetch('https://api.brevo.com/v3' + path, { ...init, headers: { 'api-key': KEY!, 'accept': 'application/json', 'content-type': 'application/json' } });

  if (p.action === 'confirm') {
    const t = String(p.token || '');
    if (!/^[0-9a-f]{48}$/.test(t)) return json({ error: 'bad_token' }, 400, o);
    const { data: row } = await sb.from('mip_email_consents').select('id,email,status,lang').eq('confirm_token', t).maybeSingle();
    if (!row) return json({ error: 'not_found' }, 404, o);
    if (row.status === 'confirmed') return json({ ok: true, already: true, lang: row.lang }, 200, o);
    if (!KEY) return json({ error: 'not_configured' }, 503, o);
    let listId = (await sb.from('mip_settings').select('value').eq('key', 'brevo_list_id').maybeSingle()).data?.value;
    if (!listId) {
      const lists = await (await brevo('/contacts/lists?limit=50&offset=0')).json().catch(() => ({}));
      listId = (lists.lists || []).find((l: any) => l.name === LIST_NAME)?.id;
      if (!listId) {
        const folders = await (await brevo('/contacts/folders?limit=50&offset=0')).json().catch(() => ({}));
        let folderId = (folders.folders || [])[0]?.id;
        if (!folderId) folderId = (await (await brevo('/contacts/folders', { method: 'POST', body: JSON.stringify({ name: 'Method into Impact' }) })).json()).id;
        listId = (await (await brevo('/contacts/lists', { method: 'POST', body: JSON.stringify({ name: LIST_NAME, folderId }) })).json()).id;
      }
      if (!listId) return json({ error: 'list_failed' }, 502, o);
      await sb.from('mip_settings').upsert({ key: 'brevo_list_id', value: String(listId) });
    }
    const r = await brevo('/contacts', { method: 'POST', body: JSON.stringify({ email: row.email, listIds: [Number(listId)], updateEnabled: true }) });
    if (!r.ok) { await sb.from('mip_email_consents').update({ brevo_status: 'confirm contact ' + r.status }).eq('id', row.id); return json({ error: 'brevo_failed' }, 502, o); }
    await sb.from('mip_email_consents').update({ status: 'confirmed', confirmed_at: new Date().toISOString(), brevo_status: 'confirmed, contact ' + r.status }).eq('id', row.id);
    return json({ ok: true, lang: row.lang }, 200, o);
  }

  const email = String(p.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 200) return json({ error: 'bad_email' }, 400, o);
  if (p.action !== 'free-templates' && p.action !== 'subscribe') return json({ error: 'unknown_action' }, 400, o);
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  const ipHash = ip ? await sha256('mip-salt-2026:' + ip) : null;
  const since = new Date(Date.now() - 3600_000).toISOString();
  if (ipHash) { const { count } = await sb.from('mip_email_consents').select('id', { count: 'exact', head: true }).eq('ip_hash', ipHash).gte('created_at', since); if ((count || 0) >= 8) return json({ error: 'too_many' }, 429, o); }
  { const { count } = await sb.from('mip_email_consents').select('id', { count: 'exact', head: true }).ilike('email', email).gte('created_at', since); if ((count || 0) >= 4) return json({ error: 'too_many' }, 429, o); }

  const marketing = p.action === 'subscribe' ? true : p.marketing === true;
  const es = p.lang === 'es';
  const t = marketing ? token() : null;
  const confirmUrl = t ? `${SITE}/newsletter.html?confirm=${t}${es ? '&lang=es' : ''}` : null;
  const m = p.action === 'free-templates' ? freeEmail(es, confirmUrl) : confirmEmail(es, confirmUrl!);
  let status = 'no_api_key';
  if (KEY) {
    const r = await brevo('/smtp/email', { method: 'POST', body: JSON.stringify({ sender: SENDER, replyTo: { email: 'hello@methodintoimpact.com', name: 'Method into Impact' }, to: [{ email }], subject: m.subject, htmlContent: m.html,
      ...(p.action === 'free-templates' ? { attachment: FREE.map(([s]) => ({ url: fileUrl(s, es), name: `${s}${es ? '-es' : ''}.docx` })) } : {}), tags: [p.action] }) });
    status = 'email ' + r.status + (r.ok ? '' : ' ' + (await r.text()).slice(0, 160));
  }
  await sb.from('mip_email_consents').insert({ email, source: p.action === 'free-templates' ? 'free-templates' : String(p.source || 'footer').slice(0, 40), marketing,
    consent_text: String(p.consentText || '').slice(0, 500) || null, consent_version: String(p.consentVersion || '').slice(0, 40) || null, lang: es ? 'es' : 'en',
    page: String(p.page || '').slice(0, 200) || null, ip_hash: ipHash, user_agent: (req.headers.get('user-agent') || '').slice(0, 200), brevo_status: status,
    status: marketing ? 'pending' : 'none', confirm_token: t });
  return json({ ok: true, emailed: /^email 2/.test(status) }, 200, o);
});
