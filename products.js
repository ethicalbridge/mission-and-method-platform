import {pricing} from './pricing-config.js';
export const courseProduct={id:pricing.course.productId,name:pricing.course.name,kind:'course',billing:'one_time',price:pricing.course.launch,currency:pricing.currency,status:'preview',checkout:null,resourceIds:['strategic-foundation','theory-of-change','organisation-chart','internal-systems','policies','work-plan-gantt','business-model','funding-strategy']};
// No price, trial, subscription, or bundle is inferred from a course purchase.
export const availableToolSlugs=['theory-of-change','ethical-bridge-crm','issue-risk-management','people-check-ins-development','strategy-kpis-annual-planning','gantt','meal-strategy'];
export const invitationToolSlugs=['theory-of-change','ethical-bridge-crm'];
export const previewToolSlugs=['issue-risk-management','people-check-ins-development','strategy-kpis-annual-planning','gantt','meal-strategy'];
const launchUrls={
 'theory-of-change':'assets/tools/Theory-of-Change-Builder.html',
 'ethical-bridge-crm':'https://ethical-bridge-crm.open-pike-3973.chatgpt.site/',
 'issue-risk-management':'assets/tools/Issue-and-Risk-Management.html',
 'people-check-ins-development':'assets/tools/People-Check-Ins-and-Development.html',
 'strategy-kpis-annual-planning':'assets/tools/Strategy-KPIs-and-Annual-Planning.html',
 'gantt':'assets/tools/Gantt-Project-Planner.html',
 'meal-strategy':'assets/tools/MEAL-Strategy.html'
};
export const softwareProducts=[
 ['strategic-planning','Strategic Planning','Strategy','Founders keeping strategic priorities clear','Track objectives, measures and responsibility in one focused tool.',['Objective','Indicator','Owner','Deadline','Status']],
 ['theory-of-change','Theory of Change Builder','Strategy','Teams testing their impact logic','Map the changes you expect and record the assumptions behind them.',['Pathway step','Type','Expected change','Assumption','Evidence']],
 ['work-plan','Work Plan','Project management','Small teams coordinating delivery','Keep activities, owners and next actions visible.',['Activity','Owner','Due date','Status','Next action']],
 ['gantt','Gantt & Project Planner','Project management','Project leads planning a timeline','Group strategic objectives and activities, assign owners and status, and track dated work on an exportable timeline.',['Task','Owner','Start','Finish','Dependency']],
 ['policy-management','Policy Management','Organisation','Teams maintaining organisational policies','Track policy owners, review dates and approval status.',['Policy','Owner','Review date','Status','Next action']],
 ['risk-register','Risk Register','Organisation','Teams reviewing delivery and organisational risks','Record risks, controls and the person responsible for the response.',['Risk','Likelihood','Impact','Control','Owner']],
 ['kpi-tracker','KPI Tracker','Monitoring','Teams checking progress against priorities','Keep performance measures and review decisions together.',['Measure','Target','Current value','Owner','Review date']],
 ['indicator-tracker','Indicator Tracker','Monitoring','Programme teams defining evidence','Record indicator definitions, data sources and collection responsibilities.',['Indicator','Definition','Data source','Frequency','Owner']],
 ['donor-mapping','Donor Mapping','Funding & relationships','Fundraisers researching relevant prospects','Compare prospects by fit and keep research evidence visible.',['Organisation','Fit','Eligibility','Research source','Next action']],
 ['funding-pipeline','Funding Pipeline','Funding & relationships','Teams following funding opportunities','Track relationship stages and distinguish opportunities from commitments.',['Opportunity','Stage','Potential amount','Confirmed amount','Next action']],
 ['partner-tracker','Partner Tracker','Funding & relationships','Teams maintaining purposeful partnerships','Keep commitments and next conversations visible without a complex CRM.',['Partner','Shared purpose','Commitment','Owner','Next action']],
 ['ethical-bridge-crm','Ethical Bridge CRM','Relationships','Teams building trusted relationships across supporters, partners and communities','Keep contacts, relationship context, agreed actions and next conversations in one focused relationship workspace.',['Person or organisation','Relationship type','Shared context','Owner','Next action']],
 ['issue-risk-management','Issue & Risk Management','Project & operations','Teams tracking incidents, risk exposure and corrective action','Connect issues, risks, owners and actions in one management workspace.',['Issue','Risk','Owner','Action','Review date']],
 ['people-check-ins-development','People Check-Ins & Development','People & organisation','Managers and team members holding useful recurring conversations','Prepare check-ins, agree mutual commitments and revisit objectives and development goals.',['Person','Check-in','Commitment','Objective','Development goal']],
 ['strategy-kpis-annual-planning','Strategy, KPIs & Annual Planning','Strategy','Leadership teams turning mission into measurable priorities and decisions','Connect priorities, objectives, measures, actual results, initiatives and review decisions in one exportable workspace.',['Priority','Objective','KPI','Target','Initiative']],
 ['meal-strategy','MEAL Strategy','Monitoring & evaluation','Programme teams designing and reviewing a monitoring, evaluation, accountability and learning approach','Define what to collect, who manages it and when; compare monthly planned and actual results, then record review decisions.',['Objective','Data source','Indicator','Planned','Actual']]
].map(([slug,name,category,audience,description,fields])=>({id:`software_${slug.replaceAll('-','_')}`,slug,name,category,audience,description,fields,launchUrl:launchUrls[slug]||null,previewOnly:previewToolSlugs.includes(slug),kind:'software',suiteIncluded:pricing.suite.toolSlugs.includes(slug),billing:['monthly','annual'],prices:{monthly:null,annual:null},currency:pricing.currency,status:previewToolSlugs.includes(slug)?'preview':availableToolSlugs.includes(slug)?'available':'coming_soon',trial:null,checkout:{monthly:null,annual:null},dataNamespace:`mm.software.${slug}.v1`,entitlements:[]}));
export const resourceManifest=courseProduct.resourceIds.map((id,index)=>({id,courseId:courseProduct.id,module:index+1,name:['Strategic Foundation','Theory of Change','Organisation Chart and Role Framework','Internal Systems Blueprint','Policy Register and Procedures','Work Plan and Gantt','Business Model','Funding and Partnerships'][index]+' Excel workbook',version:null,objectKey:null,status:'awaiting_owner_file',requiresEntitlement:courseProduct.id}));
