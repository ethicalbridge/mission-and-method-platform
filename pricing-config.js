// Commercial copy, prices and package contents have one source of truth.
// Amounts are integer minor units (US cents). Provider IDs stay null until connected.
export const pricing = {
  currency: 'USD',
  course: {
    id: 'course', productId: 'course_planning_system', name: 'Complete Impact Course',
    pathway: 'Planning System', regular: 7800, launch: 3900,
    billing: 'one_time', access: 'lifetime', providerPriceId: null,
    includes: [
      'Access to all eight course modules',
      'All lessons and practical exercises',
      'Downloadable Excel tools and templates',
      'Frameworks, checklists and implementation guides',
      'Practical examples',
      'Future updates to the purchased course',
      'Access to available free versions of the course tools'
    ],
    certificate: { enabled: false, note: 'A certificate of completion is under consideration; it is not currently included.' },
    availability: 'Preview lessons are available now. The Excel files and complete downloadable resource pack are awaiting upload before sales open.'
  },
  suite: {
    id: 'software', productId: 'software_suite', name: 'Ethical Bridge Software Suite',
    monthly: 1500, annual: 9000, pricesAreExamples: true,
    providerPriceIds: { monthly: null, annual: null },
    toolSlugs: ['strategic-planning','theory-of-change','work-plan','gantt','policy-management','risk-register','kpi-tracker','indicator-tracker','donor-mapping','funding-pipeline','partner-tracker','ethical-bridge-crm'],
    includes: ['Access to the software tools listed in the Suite catalogue as they become available', 'Choose monthly or annual billing', 'Separate tools that work independently of each other'],
    availability: 'Software is in development. Local demos are available; cloud saving, collaboration, reporting and automation are planned.'
  },
  bundle: {
    id: 'bundle', name: 'Course + 1 Year Software Access', launch: 9900, softwareMonths: 12,
    badge: 'Best value', providerPriceId: null,
    includes: ['Complete course with lifetime access', 'Course Excel templates and resources', '12 months of the Software Suite'],
    contents: [{productId:'course_planning_system',access:'lifetime'},{productId:'software_suite',months:12}],
    renewalNote: 'Course access continues after the first year. Software renewal terms will be confirmed before checkout opens.'
  },
  checkout: { enabled: false, provider: null, endpoint: null },
  futureOffers: { coupons: [], teamPlans: [], alumniDiscounts: [], freeTrial: null, regionalPrices: [], studentPrices: [] }
};
export const money = cents => 'US$' + (cents / 100).toLocaleString('en-US', {maximumFractionDigits: 2});
export const annualSaving = () => Math.round((1 - pricing.suite.annual / (pricing.suite.monthly * 12)) * 100);
export const bundleReference = () => pricing.course.regular + pricing.suite.monthly * pricing.bundle.softwareMonths;
export const bundleSaving = () => pricing.course.launch + pricing.suite.annual - pricing.bundle.launch;
export function getOffer(id, interval='monthly') {
  if(id === 'course') return {id, name: pricing.course.name, amount: pricing.course.launch, billing:'One payment · lifetime course access', includes:pricing.course.includes};
  if(id === 'software' && ['monthly','annual'].includes(interval)) return {id, interval, name:pricing.suite.name, amount:pricing.suite[interval], billing:interval==='annual'?'Per year · optional software subscription':'Per month · optional software subscription', includes:pricing.suite.includes};
  if(id === 'bundle') return {id, name:pricing.bundle.name, amount:pricing.bundle.launch, billing:'Launch bundle · course + 12 months of software', includes:pricing.bundle.includes};
  return null;
}
