// Commercial copy, prices and package contents have one source of truth.
// Amounts are integer minor units (US cents). Provider IDs stay null until connected.
// The Planning System is sold as five courses (one per phase) or as the full pathway.
// Course ids match `phases` in course-data.js. High-income band prices; country bands apply at checkout.
const courseIncludes=[
 'All lessons, videos and practical exercises in the course',
 'The Excel workbook for each module in the course',
 'Frameworks, checklists and worked examples',
 'Access for at least five years, with updates to the purchased course',
 'Access to available free versions of the course tools'
];
export const pricing = {
  currency: 'USD',
  courses: [
    {id:'clarify',productId:'course_clarify',name:'Course 1 · Clarify',modules:[0,1,2],price:2900},
    {id:'organise',productId:'course_organise',name:'Course 2 · Organise',modules:[3,4,5],price:2900},
    {id:'prove-show',productId:'course_prove_show',name:'Course 3 · Prove & Show',modules:[6,7,8],price:2900},
    {id:'protect',productId:'course_protect',name:'Course 4 · Protect',modules:[9,10],price:2900},
    {id:'sustain-run',productId:'course_sustain_run',name:'Course 5 · Sustain & Run',modules:[11,12,13],price:2900}
  ].map(c=>({...c,billing:'one_time',access:'lifetime',providerPriceId:null,includes:courseIncludes})),
  freeModules: [0],
  // The full pathway: all five courses at one price. Kept under the id "course" for existing links.
  course: {
    id: 'course', productId: 'course_planning_system', name: 'Planning System · Full Pathway',
    pathway: 'Planning System', launch: 10900,
    billing: 'one_time', access: 'lifetime', providerPriceId: null,
    includes: [
      'All five courses: Clarify, Organise, Prove & Show, Protect, Sustain & Run',
      'All 14 modules, lessons, videos and practical exercises',
      'An Excel workbook for every module',
      'Frameworks, checklists and worked examples',
      'Access for at least five years, with updates',
      'Access to available free versions of the course tools'
    ],
    certificate: { enabled: false, note: 'A certificate of completion is under consideration; it is not currently included.' },
    availability: 'Preview lessons are available now. Module 0 (Start Here) is free. The Excel workbooks and lesson videos are being prepared before sales open.'
  },
  suite: {
    id: 'software', productId: 'software_suite', name: 'Ethical Bridge Software Suite',
    monthly: 1500, annual: 9000, pricesAreExamples: true,
    providerPriceIds: { monthly: null, annual: null },
    toolSlugs: ['strategic-objectives','strategy-kpis-annual-planning','theory-of-change','gantt','policy-management','issue-risk-management','meal-strategy','donor-mapping','donor-tracking','partner-tracker','ethical-bridge-crm'],
    includes: ['Access to the software tools listed in the Suite catalogue as they become available', 'Choose monthly or annual billing', 'Separate tools that work independently of each other'],
    availability: 'Software is in development. Local demos are available; cloud saving, collaboration, reporting and automation are planned.'
  },
  bundle: {
    id: 'bundle', name: 'Full Pathway + 1 Year of Impact Tools', launch: 15900, softwareMonths: 12,
    badge: 'Best value', providerPriceId: null,
    includes: ['All five courses', 'An Excel workbook for every module', '12 months of the Software Suite'],
    contents: [{productId:'course_planning_system',access:'lifetime'},{productId:'software_suite',months:12}],
    renewalNote: 'Course access continues after the first year. Software renewal terms will be confirmed before checkout opens.'
  },
  checkout: { enabled: false, provider: null, endpoint: null },
  futureOffers: { coupons: [], teamPlans: [], alumniDiscounts: [], freeTrial: null, regionalPrices: [], studentPrices: [] }
};
export const money = cents => 'US$' + (cents / 100).toLocaleString('en-US', {maximumFractionDigits: 2});
export const coursesTotal = () => pricing.courses.reduce((n,c)=>n+c.price,0);
export const pathwaySaving = () => coursesTotal() - pricing.course.launch;
export const annualSaving = () => Math.round((1 - pricing.suite.annual / (pricing.suite.monthly * 12)) * 100);
export const bundleReference = () => coursesTotal() + pricing.suite.monthly * pricing.bundle.softwareMonths;
export const bundleSaving = () => pricing.course.launch + pricing.suite.annual - pricing.bundle.launch;
export const courseOffer = id => pricing.courses.find(c=>c.id===id) || null;
export function getOffer(id, interval='monthly') {
  const single = courseOffer(id);
  if(single) return {id, name: single.name, amount: single.price, billing:'One payment · this course', includes:single.includes};
  if(id === 'course') return {id, name: pricing.course.name, amount: pricing.course.launch, billing:'One payment · all five courses', includes:pricing.course.includes};
  if(id === 'software' && ['monthly','annual'].includes(interval)) return {id, interval, name:pricing.suite.name, amount:pricing.suite[interval], billing:interval==='annual'?'Per year · optional software subscription':'Per month · optional software subscription', includes:pricing.suite.includes};
  if(id === 'bundle') return {id, name:pricing.bundle.name, amount:pricing.bundle.launch, billing:'Bundle · all five courses + 12 months of software', includes:pricing.bundle.includes};
  return null;
}

// ---------------------------------------------------------------------------
// CURRENT PRICE LIST (Prices page, course buttons, checkout). Single source since 29 Oct 2026.
// Whole US dollars per World Bank income band, in this order: high, upper-middle, lower-middle, low.
// The band comes from the country that issued the buyer's card (see country-bands.js).
// After changing anything here run:  node scripts/sync-prices.mjs   (rewrites prices.html)
// ---------------------------------------------------------------------------
export const BANDS = [
  {id:'high', name:'High income', short:'High', level:1},
  {id:'upper-middle', name:'Upper-middle income', short:'Upper-mid', level:0.6},
  {id:'lower-middle', name:'Lower-middle income', short:'Lower-mid', level:0.3},
  {id:'low', name:'Low income', short:'Low', level:0.15},
];
export const PRICE_FLOOR = 9;             // no paid item costs less than US$9 in any band
export const LAUNCH_PRICE_ENDS = null;    // set a date such as '2027-03-31' when decided

// regular = list price; launch = price until LAUNCH_PRICE_ENDS (omit if none)
export const catalog = {
  'course':          {name:'One course (entrepreneurs or organisations)', regular:[39,23,12,9],   launch:[29,17,9,9]},
  'founder-pathway': {name:'Founder Pathway · all four courses',         regular:[119,71,36,18], launch:[89,53,27,13], courses:4},
  'org-pathway':     {name:'Organisation Pathway · all five courses',    regular:[149,89,45,22], launch:[109,65,33,16], courses:5},
  'library-upgrade': {name:'Full Template Library upgrade (pathway owners)', regular:[79,47,24,12]},
  'single-template': {name:'Any single template',                        regular:[9,9,9,9]},
  'essentials':      {name:'Start-up Legal Essentials (12 templates)',   regular:[49,29,15,9],   launch:[39,23,12,9],
                      templates:['code-of-conduct','safeguarding-policy-and-procedure','data-protection-policy','privacy-notice','conflict-of-interest-policy','financial-controls-policy','fraud-bribery-and-corruption-policy-and-procedure','co-founder-agreement','volunteer-agreement','photo-and-story-consent-form','complaints-and-feedback-procedure','risk-register']},
  'full-library':    {name:'Full Template Library',                      regular:[149,89,45,22], launch:[119,71,36,18]},
  'pack-policies':   {name:'Policies & procedures pack',   category:'Policies & procedures',   regular:[99,59,30,15], launch:[75,45,23,11]},
  'pack-contracts':  {name:'Contracts & agreements pack',  category:'Contracts & agreements',  regular:[59,35,18,9],  launch:[45,27,14,9]},
  'pack-consent':    {name:'Consent forms pack',           category:'Consent forms',           regular:[19,11,9,9],   launch:[15,9,9,9]},
  'pack-governance': {name:'Governance & compliance pack', category:'Governance & compliance', regular:[39,23,12,9],  launch:[29,17,9,9]},
  'launch-ready':    {name:'Launch Ready: Founder Pathway + Full Template Library + review call', regular:[279,169,109,89]},
  'review-call':     {name:'Pack review call (60 minutes)', regular:[149,79,79,79]},
};
export const PACKS = ['pack-policies','pack-contracts','pack-consent','pack-governance'];

const bandIndex = b => typeof b === 'number' ? b : Math.max(0, BANDS.findIndex(x => x.id === b));
/** Price of a catalogue item in a band (index or id). kind: 'regular' | 'launch' (falls back to regular). */
export function priceOf(id, band = 0, kind = 'regular') {
  const item = catalog[id]; if (!item) return null;
  const list = (kind === 'launch' && item.launch) || item.regular;
  return Math.max(PRICE_FLOOR, list[bandIndex(band)]);
}
const per = fn => BANDS.map((_, i) => fn(i));
/** Savings, per band, worked out from the list above (never typed by hand). counts = templates per pack. */
export const savings = {
  'founder-pathway': () => per(i => catalog['founder-pathway'].courses * priceOf('course', i) - priceOf('founder-pathway', i)),
  'org-pathway':     () => per(i => catalog['org-pathway'].courses * priceOf('course', i) - priceOf('org-pathway', i)),
  'packs-total':     () => per(i => PACKS.reduce((n, p) => n + priceOf(p, i), 0)),
  'full-library':    () => per(i => PACKS.reduce((n, p) => n + priceOf(p, i), 0) - priceOf('full-library', i)),
  'launch-ready':    () => per(i => priceOf('founder-pathway', i) + priceOf('full-library', i) + priceOf('review-call', i) - priceOf('launch-ready', i)),
  pack: (id, count) => per(i => count * priceOf('single-template', i) - priceOf(id, i)),
};
