// Commercial copy, prices and package contents have one source of truth.
// Amounts are integer minor units (US cents). Provider IDs stay null until connected.
// The Planning System is sold as five courses (one per phase) or as the full pathway.
// Course ids match `phases` in course-data.js. High-income band prices; country bands apply at checkout.
const courseIncludes=[
 'All lessons, videos and practical exercises in the course',
 'The Excel workbook for each module in the course',
 'Frameworks, checklists and worked examples',
 'Lifetime access and future updates to the purchased course',
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
      'Lifetime access and future updates',
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
    includes: ['All five courses with lifetime access', 'An Excel workbook for every module', '12 months of the Software Suite'],
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
  if(single) return {id, name: single.name, amount: single.price, billing:'One payment · lifetime access to this course', includes:single.includes};
  if(id === 'course') return {id, name: pricing.course.name, amount: pricing.course.launch, billing:'One payment · lifetime access to all five courses', includes:pricing.course.includes};
  if(id === 'software' && ['monthly','annual'].includes(interval)) return {id, interval, name:pricing.suite.name, amount:pricing.suite[interval], billing:interval==='annual'?'Per year · optional software subscription':'Per month · optional software subscription', includes:pricing.suite.includes};
  if(id === 'bundle') return {id, name:pricing.bundle.name, amount:pricing.bundle.launch, billing:'Bundle · all five courses + 12 months of software', includes:pricing.bundle.includes};
  return null;
}
