import {module,lesson,review} from './kit.js?v=c1687a22e';
// Reviewed October 2026: plain explanation, optional table (anatomy), and a gallery showing how the five example
// organisations (course/examples.js; story in docs/example-organisations.md) complete each exercise.
export default module({
 ...{"uses":[0,1,3,4,5],"video":null,"id":10,"slug":"legal-compliance-risk","phase":"Protect","title":"Legal, Compliance, Policies & Risk","short":"Your legal map, the policies you actually need, procedures, policy lifecycle and risk management","intro":"Bring together your legal and compliance framework. Map your legal duties, work out which policies and controls your organisation actually needs given its form, activities, geography, size, funding and risk profile, write procedures people can follow, keep policies alive, and manage risk with clear owners and escalation. This module supports planning; legal duties depend on your jurisdiction, so obtain qualified local advice.","output":"Compliance & Risk Pack","workbook":{"file":"Module-10-Legal-Compliance-Policies-Risk.xlsx","title":"Legal, Compliance, Policies & Risk workbook"},"promo":{"lesson":"risk-register","tools":["issue-risk-management","policy-management","onboarding-compliance"],"headline":"Keep policies current and risks owned, without chasing spreadsheets","pitch":"Issue & Risk Management keeps every risk with its likelihood, impact, owner, mitigation and review date, and links it to the objective, KPI or task it threatens. Policy Management tracks owners, approvals, review dates and who must acknowledge each policy, and feeds Onboarding & Staff Compliance."}},
 lessons:[
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Understand",
  "id": "legal-map",
  "part": "Legal & compliance",
  "title": "Your legal and regulatory map",
  "sheet": "Legal map",
  "learn": [
   "Your legal duties come from four places: your legal form (association, foundation, charity, company or cooperative), your activities (working with children, employing people, handling personal data, selling food or goods, fundraising), the countries and regions where you work, and your funders, whose grant conditions can be legally binding.",
   "A legal map lists each area with its main obligation, the authority that oversees it, the deadline or frequency and the person responsible. Common areas are registration and governance, tax, employment, data protection, health and safety, safeguarding, fundraising and consumer rules, contracts and insurance.",
   "You do not need to become a lawyer, but you do need to know which questions to ask. Rules differ by country and change over time, so mark which items a qualified local adviser has confirmed and which are still open. If you work in more than one country, map each one."
  ],
  "weak": "We will follow the law.",
  "strong": "Riverside Repair Hub: charity annual report and accounts to the charity regulator; accounts and annual filing for Riverside Reuse Ltd; payroll for both entities; product safety for refurbished electricals; DBS checks for schools work; insurance renewal each April. The accountant confirmed the first three; product safety advice is still open.",
  "why": "It names each duty, who oversees it and who owns it, and is honest about what still needs advice.",
  "reflect": "Which obligation would you be least prepared to show you are meeting?",
  "exercise": "Build your legal and regulatory map.",
  "fields": [
   {
    "key": "map",
    "label": "Legal map",
    "hint": "Area | obligation | authority | deadline or frequency | owner | confirmed by adviser?"
   },
   {
    "key": "open",
    "label": "Open legal questions",
    "hint": "Questions to resolve with qualified advice, and by when."
   }
  ],
  "check": "Does every obligation have an owner and a deadline?",
  "gallery": {
   "title": "Five example legal maps",
   "intro": "How each organisation maps its main legal duties, and the questions it still needs a qualified adviser to answer.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "map": "Registration | choose association or foundation; prepare statutes | notary, then the national registration authority (to confirm) | decide by January 2027 | Wayan | in progress\nLand use | written permission for each planting site | village heads; any other permit to confirm | before each new site | Wayan | no\nChildren | parental consent; two adults always present | local child protection services | each school year | Sari | partly\nWater safety | life jackets, tide rule, boat hire terms | boat owner | each trip | Wayan | no\nMinors' data | consent forms locked away; nothing in WhatsApp | to confirm | ongoing | Sari | no\nMoney | receipts for sponsors and donors | tax office after registration | each payment | Ibu Made | no",
      "open": "Association or foundation: which fits members' voice and holding donations? Notary, by January 2027.\nDoes planting in the coastal zone need a permit beyond the village heads' agreement? Ask the provincial environment office, by December 2026.\nCan we get police certificates for volunteers, and is it lawful to ask? By the end of November 2026.\nWhat insurance can cover young people and volunteers on planting days? Before the first boat trip of 2027."
     },
     "notice": "Notice the open question about coastal permits: the village heads' agreement may not be the only permission needed, so Tide Line asks before planting, not after."
    },
    {
     "org": "ngo",
     "profile": {
      "map": "Registration and governance | annual return; notify board changes | nonprofit regulator | yearly | Achieng | rules changed: lawyer review by March 2027\nAccounts and audit | audited accounts | regulator, funders | March | Grace | yes\nPayroll and tax | staff deductions and filings | tax authority | monthly | Grace | yes, auditor\nEmployment | contracts and staff handbook | labour authorities | on hiring; yearly review | Achieng | yes, employment lawyer\nData protection | girls' data on tablets; consent | data protection authority | ongoing | Brian | partly\nSafeguarding | vetting, police clearance, referral route | county child protection services | yearly | Brian | partly\nGrants | Foundation A and B conditions | funders | six-monthly | Achieng | yes",
      "open": "Nonprofit registration rules changed: what must we file, and must our constitution change? Outside lawyer, by March 2027.\nMust we register with the data protection authority? By December 2026.\nWhat licence and insurance must a hired bus operator hold for the camp? Before the August 2027 camp.\nWhich office receives child protection referrals in each sub-county, and is the contact current? Verify each January."
     },
     "notice": "Notice the last column: Imara records which duties a lawyer or auditor has confirmed, so the changed registration rules stand out as unfinished."
    },
    {
     "org": "social",
     "profile": {
      "map": "Company | annual filings; shareholder records | companies registry | yearly | Diego | yes, accountant\nTax | monthly and annual returns | tax authority | monthly; annual around March | accountant, Diego | yes\nEmployment | contracts, minimum wage, health insurance for staff and trainees | labour authority | each cohort | Diego | yes, employment adviser\nFood safety and licences | municipal operating and health licences; hygiene | municipality, health authority | checked each October | Lucía | yes\nConsumer | prices shown; complaints recorded | consumer authority | ongoing | café supervisor | partly\nInsurance | fire and equipment | insurer | yearly | Diego | no",
      "open": "Which contract type fits a paid six-month training with a certificate? Employment adviser, before the next cohort.\nWhat would BIC status add (an annual impact report, bylaw changes)? Lawyer, before the July decision.\nCan the municipal grant come through a formal agreement, or does it need a separate nonprofit? Municipality and accountant, by March 2027.\nAre trainees insured during shadow days at employers? Before the next shadow days."
     },
     "notice": "Notice how trainees appear twice: as employees under employment law and as an open question about the right contract type. Copy that honesty about grey areas."
    },
    {
     "org": "coop",
     "profile": {
      "map": "Cooperative rules | by-laws, elections, member register | state cooperative department | elections next year | president Sreeja | yes\nAudit and accounts | annual audit; accounts to the general body | the department's auditor | June–July; AGM in September | accounts clerk | yes\nTax on sales | registration and returns | tax authority | as the auditor advises | accounts clerk | yes\nHandloom claims | sell only genuine handloom as handloom; use any handloom mark correctly | to confirm | every piece | quality officer | partly\nOnline sales | marketplace terms; returns and product descriptions | marketplace; consumer rules | ongoing | designer | no\nStaff | contracts for 4 staff | labour authorities | yearly | Meera | partly",
      "open": "Would a government grant for the dye unit change who controls the cooperative, or need the department's approval? By February 2027.\nWhat environmental permissions would a dye unit need for its wastewater? Before any grant application.\nAre apprentices members, trainees or workers in law, and what does that mean for their payments? Before the June 2027 intake.\nWhat can we do when shops pay 60 days late? Auditor and a lawyer, by January 2027."
     },
     "notice": "Notice the dye unit questions: a future activity already appears on the map, so Vanita checks permissions and control before it applies for the grant."
    },
    {
     "org": "hybrid",
     "profile": {
      "map": "Charity | trustees' annual report and accounts; annual return | charity regulator | yearly, after June approval | Tom, treasurer | yes, accountant\nTrading company | accounts, annual filing, company tax | companies registry; tax authority | yearly | bookkeeper, treasurer | yes\nProduct safety | refurbished electricals sold safely, with records | local trading standards (to confirm) | each item | shop manager, Priya | advice requested\nSafeguarding | DBS checks for schools work | DBS service; schools | before first visit | schools officer | yes\nData protection | volunteers' and tool library members' data | data protection regulator | yearly review | Tom | partly\nInsurance and lease | public, product and employer liability; lease ends 2028 | insurer; landlord | April; 2028 | Tom | yes",
      "open": "What product safety duties apply to selling refurbished electricals, and are our test records enough? Specialist advice, by December 2026.\nMust the trading company register for VAT as turnover grows? Accountant, at each year end.\nDoes our insurance cover volunteers repairing visitors' items at cafés? Insurer, before the April renewal.\nWhat are our options when the lease ends in 2028? Trustees with a property adviser, by the December 2026 meeting."
     },
     "notice": "Notice the two entities kept apart: the charity and Riverside Reuse Ltd each have their own filings, and each line says which one owns the duty."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "policy-management"
  ],
  "video": null,
  "stage": "Design",
  "id": "policy-needs",
  "part": "Legal & compliance",
  "title": "Working out which policies you actually need",
  "sheet": "Policy needs",
  "learn": [
   "Not every organisation needs the same policies. A policy states a principle or rule; a procedure explains how people apply it. A thick folder of copied policies does not protect anyone, and policies nobody follows create risks of their own.",
   "Work out your needs from six factors: your legal form and what your regulator expects; your activities, especially work with children or adults at risk, personal data, money, travel and food or products; your geography; your size; what funders and partners require by contract; and the main risks in your risk register.",
   "Sort the result into three groups: required now (a legal duty or a high risk), required soon (triggered by growth or a new activity) and good practice. Give each policy an owner, an approval route and a review date, and note where you need qualified local advice."
  ],
  "weak": "Download every policy you can find.",
  "strong": "Tide Line Youth Collective: safeguarding, a code of conduct for adults, parental consent and photo rules, and water safety are needed now because young people aged 12 to 17 plant mangroves by the water; a finance policy follows registration; an HR policy waits for the first paid role.",
  "why": "The priority follows the activity and the harm it could cause, not the length of a template.",
  "reflect": "Which gap could cause the greatest harm if ignored?",
  "exercise": "Run a policy needs assessment and build a prioritised policy register.",
  "fields": [
   {
    "key": "factors",
    "label": "Needs assessment",
    "hint": "Factor (form, activities, geography, size, funding, risk) | what it requires."
   },
   {
    "key": "policies",
    "label": "Policy register",
    "hint": "Policy | reason needed | priority (now, soon, good practice) | owner | approval | review date | advice needed."
   }
  ],
  "check": "Does your priority order follow legal duty and risk rather than document length?",
  "anatomy": {
   "title": "Policy needs by activity",
   "intro": "Start from what you actually do. Each activity points to the policies it usually needs.",
   "cols": [
    "If you…",
    "You usually need",
    "Example"
   ],
   "rows": [
    [
     "Work with children or adults at risk",
     "Safeguarding, code of conduct, safer recruitment, consent and photos",
     "Imara clubs; Tide Line planting days; Riverside school workshops"
    ],
    [
     "Hold personal data",
     "Data protection, privacy notice, retention, breach procedure",
     "Imara girls' records; Vanita members' bank details"
    ],
    [
     "Handle money or grants",
     "Finance controls, anti-fraud, conflicts of interest",
     "All five organisations"
    ],
    [
     "Employ staff or engage volunteers",
     "Contracts, HR policies, volunteer agreement, health and safety",
     "Pan del Barrio trainees; Riverside volunteers"
    ],
    [
     "Sell food or goods",
     "Food or product safety, complaints, honest claims",
     "Pan del Barrio bread; Riverside electricals; Vanita handloom"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example policy needs assessments",
   "intro": "How each organisation works out which policies it needs and in what order.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "factors": "Form | not registered yet; the statutes will set governance rules\nActivities | young people aged 12 to 17 near water; photos on Instagram; seedlings bought with donated money\nGeography | two North Bali villages; village custom (adat) and village heads' authority\nSize | two co-founders, four volunteers; policies must fit on a few pages\nFunding | dive operators will want to know how children are kept safe and how money is used\nRisk | harm to a child, an accident on the water, conflict with pond owners",
      "policies": "Safeguarding | children take part | now | Sari | both co-founders, then the board | January 2027 | yes, local child protection contacts\nCode of conduct for adults | volunteers supervise young people | now | Sari | both co-founders | January 2027 | no\nConsent and photos | minors' images and data | now | Sari | both co-founders | each school year | no\nWater and boat safety | shore and boat work | now | Wayan | both co-founders | October 2027 | yes, boat rules\nFinance and spending | money from sponsors | soon, at registration | Ibu Made | board | after registration | no\nConflict of interest | village links and family ties | soon | Wayan | board | after registration | no"
     },
     "notice": "Notice how short the list is. Tide Line puts four policies first because of children and water, and leaves the rest until registration."
    },
    {
     "org": "ngo",
     "profile": {
      "factors": "Form | registered nonprofit; the board adopts key policies\nActivities | weekly clubs with girls aged 10 to 14; mentors; camp transport; girls' data on tablets\nGeography | Kisumu County; national child protection and data rules (to confirm)\nSize | 6 staff, 25 mentors; a full policy set is proportionate\nFunding | Foundation A and B require safeguarding, anti-fraud and data policies\nRisk | harm to a girl, data loss, dependence on Foundation A, transport accidents",
      "policies": "Safeguarding | daily contact with girls | now (in place) | Achieng | board | February 2027 | yes, referral contacts\nData protection | minors' data | now | Brian | board | December 2026 | yes, registration duty\nCode of conduct | staff and mentors | now (in place) | Achieng | board | February 2027 | no\nAnti-fraud and conflicts | grants; head teacher and parent on the board | now | Grace | board | February 2027 | no\nTransport safety | camp and club travel | soon, before camp | Brian | Achieng | July 2027 | yes, operator licences\nWhistleblowing | funder requirement | soon | Achieng | board | March 2027 | no"
     },
     "notice": "Notice the funding factor: two policies are needed partly because Imara's grant agreements require them, so the register links them to contract duties."
    },
    {
     "org": "social",
     "profile": {
      "factors": "Form | company (S.A.C.); directors decide\nActivities | food production and a café; trainees aged 18 to 24 on contracts; wholesale deliveries\nGeography | Lima; municipal licences; national employment rules\nSize | about ten people; one short staff handbook\nFunding | a municipal grant would bring reporting and eligibility rules\nRisk | food safety incident, a trainee injured, one wholesale client is 40% of wholesale",
      "policies": "Food safety and hygiene | we sell food | now (in place) | Lucía | both directors | October 2027 | yes, municipal inspection\nHealth and safety | ovens, knives, early shifts | now | Lucía | both directors | March 2027 | no\nTrainee code of conduct | clear expectations | now (in place) | Diego | both directors | January 2027 | no\nAnti-harassment | young staff, public-facing café | now | Diego | both directors | January 2027 | no\nConsent for stories and photos | our brand tells trainees' stories | now (in place) | Diego | both directors | yearly | no\nConflict of interest | advisory group member may hire graduates | soon | Lucía | both directors | March 2027 | no"
     },
     "notice": "Notice that safeguarding is not on the list: trainees are adults. Pan del Barrio covers their protection through harassment, safety and consent policies instead."
    },
    {
     "org": "coop",
     "profile": {
      "factors": "Form | cooperative society; by-laws and the department set many rules\nActivities | yarn purchasing, quality checks, online and shop sales, apprentices\nGeography | Kerala; state cooperative rules; handloom claims\nSize | 140 members, 4 staff; policies read aloud in Malayalam\nFunding | a dye unit grant would bring conditions\nRisk | unfair rejections, a member's interest in a supplier, monsoon damage, late payments",
      "policies": "Fair quality and payment | members' income depends on it | now | quality officer | committee | April 2027 | no\nConflict of interest | committee member's relative supplies yarn | now (in place) | treasurer | committee | April 2027 | no\nPurchasing and anti-fraud | pooled yarn money | now | Meera | committee | April 2027 | no\nConsent for names and photos | weavers' names on tags | now | designer | committee | yearly | no\nApprentice code of conduct | young apprentices work with adults | soon, January 2027 | quality officer | committee | January 2028 | yes, apprentices' ages\nEnvironmental (dye unit) | wastewater | soon, before the grant | Meera | general body | before the grant | yes"
     },
     "notice": "Notice the approval column: the committee approves most policies, but the dye unit policy goes to all members, because it affects the cooperative's future."
    },
    {
     "org": "hybrid",
     "profile": {
      "factors": "Form | charity (CIO) plus a trading company; trustees adopt key policies\nActivities | electrical repairs; selling refurbished goods; school workshops; tool loans\nGeography | Leeds, England; charity and company rules\nSize | 5 staff, 40 volunteers; two entities\nFunding | grant funders and the council contract require policies\nRisk | electrical injury, an unsafe item sold, harm in schools, the lease ending in 2028",
      "policies": "Electrical safety | volunteers repair electricals | now (in place) | Priya | trustees | September 2027 | no\nProduct safety for refurbished goods | the shop sells to the public | now | shop manager | company board | December 2026 | yes\nSafeguarding | school workshops | now (in place) | schools officer | trustees | September 2027 | yes, local contacts\nData protection | volunteers, tool library members | now (in place) | Tom | trustees | September 2027 | no\nComplaints | public-facing shop and cafés | now, not yet published | Tom | trustees | December 2026 | no\nShared costs | charity and company | soon | treasurer | both boards | March 2027 | yes, accountant"
     },
     "notice": "Notice the two approvers: the company board approves product safety for the shop; trustees approve charity policies. Each policy sits with the entity that carries the risk."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "contracts",
  "part": "Legal & compliance",
  "title": "Contracts and agreements",
  "sheet": "Contracts register",
  "learn": [
   "Contracts create legal obligations. Purpose-led organisations commonly sign grant agreements, service and supplier contracts, partnership agreements and memoranda of understanding, employment and volunteer agreements, leases and data-sharing agreements.",
   "Before signing, check who the parties are and who may sign for you; what each side must do and by when; payment and reporting terms; ownership of materials, data and confidentiality; liability, insurance and indemnities; how the contract ends; and which country's law applies. A memorandum of understanding can be binding or not, so say which in the text.",
   "Keep a contracts register with key dates and obligations, and store signed copies where the right people can find them. Templates are starting points only. Ask a qualified adviser to review contracts that are large, long or unusual, or that make you liable for things outside your control."
  ],
  "weak": "We signed what the funder sent us.",
  "strong": "Imara Girls in Science: Grace keeps a contracts register with each party, value, reporting dates, end date, signatory and a link to the signed copy; grants over US$10,000 go to the board, and anything with unusual liability goes to an outside lawyer first.",
  "why": "It tracks every obligation and date, and matches the level of review to the risk.",
  "reflect": "Which obligation in a contract you have signed could you be failing without realising?",
  "exercise": "Set up your contracts register and pre-signature checklist.",
  "fields": [
   {
    "key": "register",
    "label": "Contracts register",
    "hint": "Contract | parties | value | key obligations | key dates | signatory | review needed?"
   },
   {
    "key": "checklist",
    "label": "Pre-signature checklist",
    "hint": "Questions to check before anyone signs."
   }
  ],
  "check": "Would you know every obligation and deadline in the contracts you have signed?",
  "gallery": {
   "title": "Five example contracts registers",
   "intro": "How each organisation tracks what it has signed and what it checks before anyone signs again.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "register": "Boat hire | Tide Line co-founders and the boat owner | about US$1,200 a year | dates, fee, life jackets, who is responsible on the water | renewed each October | both co-founders | no\nSite agreement, village 1 | village head and Tide Line | none | sites, access, who maintains the area | yearly | both co-founders | yes, after registration\nDive operator sponsorship | operator and Tide Line | US$1,500 each | logo use, a thank-you report, no tourist planting | each January | both co-founders | no\nSeedling supply | local nursery | about US$1,500 a year | species, delivery dates, replacement if dead on arrival | per season | Wayan | no",
      "checklist": "Can we sign at all before registration, and in whose name?\nDo both co-founders agree (spending over US$100 needs both)?\nDoes it ask us to do anything with children, photos or data that breaks our rules?\nWhat does the sponsor get in return, in writing?\nWho is responsible if someone is hurt, and is there insurance?\nIs a copy saved in the Drive and the date in the calendar?"
     },
     "notice": "Notice the first checklist question: before registration, contracts may sit with individuals. Tide Line asks whose name goes on the paper before signing."
    },
    {
     "org": "ngo",
     "profile": {
      "register": "Foundation A grant | Foundation A and Imara | US$70,000 a year | clubs in 14 schools, six-monthly reports, audit | report March and September; ends next year | Achieng (board approved) | yes\nFoundation B grant | Foundation B and Imara | US$35,000 | camp and mentors | report each December | Achieng (board approved) | yes\nSchool agreements | each head teacher and Imara | none | club time and room, a named teacher, safeguarding | each January | Brian | yes, template\nCamp venue | science centre | about US$4,000 | supervision, first aid, insurance | August | Achieng | no\nData consultant | consultant and Imara | 10 days | data tool, confidentiality, who owns the tool | ends June | Achieng | yes",
      "checklist": "Who signs, under the delegation limits (board above US$10,000)?\nAre reporting dates and audit duties entered in the calendar?\nDoes it involve girls' data? If so, a data-sharing clause is needed.\nDoes it respect our safeguarding policy and photo consent?\nWho owns materials and photos we create?\nCan we end it with notice, and what happens to unspent funds?\nUnusual liability or indemnity? Outside lawyer first."
     },
     "notice": "Notice the school agreements: no money changes hands, yet they carry safeguarding duties, so they sit in the register like any grant."
    },
    {
     "org": "social",
     "profile": {
      "register": "Office client 1 (largest) | client and Pan del Barrio | about US$30,000 a year | daily delivery by 7 am; invoices due in 15 days | renewal each March | both directors | yes\nEmployer training fees (2) | each employer and Pan del Barrio | US$7,500 each | train trainees; employer offers interviews | each cohort | both directors | no\nFlour supply | supplier | about US$40,000 a year | price, delivery, notice of price changes | monthly orders | Lucía | no\nPremises lease | landlord | US$24,000 a year | rent, repairs, use as bakery | renewal 2028 | both directors | yes\nCertification body | certification body | per trainee | assessment dates; logo use | each cohort | Diego | no",
      "checklist": "Is it in the company's name, signed by an authorised director?\nCan we deliver it with the current team and ovens?\nDoes it make one client a larger share of sales?\nPayment terms: no longer than 30 days.\nWhat happens if we cannot deliver one day?\nDoes it use trainees' names, photos or stories? Written consent first.\nOver US$5,000 a year: both directors and a lawyer check."
     },
     "notice": "Notice how the checklist asks whether a new contract increases dependence on one client. Copy the habit of linking contracts to your biggest risks."
    },
    {
     "org": "coop",
     "profile": {
      "register": "Retail chain 1 | chain and Vanita | about US$35,000 a year | delivery dates, returns, payment in 30 days | renewal each April | Meera and the treasurer | yes\nRetail chain 2 | chain and Vanita | about US$25,000 a year | consignment; payment in 45 days | renewal each April | Meera and the treasurer | yes\nOnline marketplace | marketplace terms | fees on sales | listings, returns, buyer data | ongoing | Meera | no (standard terms)\nYarn supplier | supplier | about US$38,000 a year | prices, quality, delivery before festival season | yearly | committee | no\nDesign school placements | school and Vanita | none | supervision, students' safety, design ownership | each term | president Sreeja | no",
      "checklist": "Does the committee need to approve it (over US$5,000, or unbudgeted)?\nDoes anyone signing have a personal interest (for example, a relative's business)?\nPayment terms: what if the buyer pays late?\nWho owns the designs and photos?\nDoes it tie members to prices below a fair piece rate?\nIs a copy filed in Malayalam and in English?"
     },
     "notice": "Notice the payment terms in the register: shops already pay late, so Vanita now records the agreed terms to have something to point to."
    },
    {
     "org": "hybrid",
     "profile": {
      "register": "Council contract | Leeds City Council and the charity | £30,000 | repair cafés, reporting on items and users | review each October | Tom (trustee approval) | yes\nShared-cost agreement | charity and Riverside Reuse Ltd | staff time, premises | recharge calculated each year | each March | both boards | yes, accountant\nPremises lease | landlord and the charity | £24,000 a year | rent, repairs, use | ends 2028 | trustees | yes\nSchool agreements (12) | each school and the charity | none | teacher present, DBS, photo rules | each September | schools officer | template\nInsurance | insurer | about £3,000 a year | public, product and employer liability | April | Tom | broker",
      "checklist": "Which entity signs: the charity or the company?\nDoes the signatory have authority (over £10,000 goes to trustees)?\nAre reporting duties and data duties clear, for example the council's data on users?\nDoes our insurance cover what we promise?\nIs there an indemnity we could not afford?\nRenewal or end date in the calendar six months ahead?"
     },
     "notice": "Notice the first checklist line: with two entities, signing in the wrong name can put trading risk on the charity. Riverside checks that before anything else."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "policy-management"
  ],
  "video": null,
  "stage": "Design",
  "id": "core-policies",
  "part": "Policies & procedures",
  "title": "Core policies: conduct, conflicts and anti-fraud",
  "sheet": "Policies",
  "learn": [
   "Most organisations need a small core set. A code of conduct sets the behaviour expected of staff, volunteers and board members: respect, professional boundaries, care with resources and reporting concerns. A conflict of interest policy asks people to declare personal interests that could sway a decision, and explains how conflicts are managed and recorded.",
   "An anti-fraud, bribery and corruption policy makes clear that these are never accepted, defines what is prohibited (including improper gifts and payments to speed things up), describes the controls and explains how suspicions are reported. An anti-harassment and bullying policy protects people and gives them a route for complaints.",
   "Write policies in plain language, short enough to be read, and linked to your values. Each one should name an owner, who it applies to, the main rules, how to report a concern, what happens after a breach and a review date. Train people on it and ask them to confirm they have read it."
  ],
  "weak": "Staff must behave professionally at all times.",
  "strong": "Vanita Weavers Cooperative Society: every committee member declares interests each April in a register the treasurer keeps; a member whose relative supplies yarn leaves the room and does not vote on yarn orders; gifts from buyers or suppliers above a small value are declared at the next committee meeting.",
  "why": "It turns a principle into a record, a rule for the meeting and a clear line on gifts.",
  "reflect": "Which conflict of interest exists in your organisation today, declared or not?",
  "exercise": "Outline your core policies and how each will be implemented.",
  "fields": [
   {
    "key": "policies",
    "label": "Core policies",
    "hint": "Policy | applies to | main rules | reporting route | owner | review date."
   },
   {
    "key": "declarations",
    "label": "Declarations and registers",
    "hint": "Which declarations you will collect (conflicts, gifts) and how they are recorded."
   }
  ],
  "check": "Does each policy explain what to do and how to report a concern?",
  "gallery": {
   "title": "Five example core policy outlines",
   "intro": "How each organisation outlines its code of conduct, conflicts and anti-fraud rules, and the declarations it collects.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "policies": "Code of conduct for adults | co-founders and volunteers | two adults always present; no one-to-one messages with young people; no photos without consent; anyone can stop an unsafe activity | Sari, or Ibu Made if the concern is about a co-founder | Sari | January 2027\nConflict of interest | co-founders, volunteers, later the board | declare family ties to pond owners, sponsors or suppliers; no paying a relative without Ibu Made's check | Ibu Made | Wayan | January 2027\nMoney honesty | anyone who handles money | receipts for every payment; two people count the cash box; no cash gifts to officials | Ibu Made or the other co-founder | Ibu Made | January 2027",
      "declarations": "Each co-founder and volunteer fills in a one-page declaration when joining and each January (family ties, business links, sponsors). Ibu Made keeps the forms in a folder and notes any payment to a relative in the cash book. Gifts from sponsors go to Tide Line, not to individuals, and are noted in the WhatsApp group."
     },
     "notice": "Notice the alternative reporting route: a concern about a co-founder goes to Ibu Made. Even a two-person group needs a route around its leaders."
    },
    {
     "org": "ngo",
     "profile": {
      "policies": "Code of conduct | staff, mentors, board | respect; professional boundaries with girls; no lifts alone with a girl; care with tablets and money | line manager, or the safeguarding lead | Achieng | February 2027\nConflict of interest | board, staff, mentors | declare interests; leave the room for the item; no part in hiring relatives | board chair | Dr Otieno | February 2027\nAnti-fraud and bribery | everyone, including suppliers | three quotes over US$500; no gifts above a small value; no payments to speed up permits | Grace, or the treasurer if about Grace | Grace | February 2027\nAnti-harassment | staff and mentors | named examples; informal and formal routes | Achieng, or the chair if about Achieng | Achieng | February 2027",
      "declarations": "Board members and senior staff declare interests each February, recorded in a register Grace keeps and the finance and safeguarding committee reviews. Each board agenda starts with declarations for that meeting. The head teacher and the parent on the board do not vote on decisions about their own school. Gifts over a small value go in a gifts log."
     },
     "notice": "Notice the standing item at the start of each board meeting: a yearly declaration is not enough when a head teacher sits on the board."
    },
    {
     "org": "social",
     "profile": {
      "policies": "Code of conduct | all staff, trainees, advisory group | respect; punctuality; no cash taken from the till; safe kitchen behaviour; no shouting or humiliation | café supervisor or Diego | Diego | January 2027\nAnti-harassment | staff, trainees, customers | named examples; trainees can report to Diego or Lucía; customers who harass staff are asked to leave | Diego or Lucía | Diego | January 2027\nConflict of interest | directors, advisory group | declare business links; the bakery owner who hires graduates declares it at each meeting | Lucía | Lucía | March 2027\nAnti-fraud | anyone handling cash or orders | two people count the daily cash; transfers over US$300 approved by Lucía; no side payments from suppliers | Lucía, or the accountant | Lucía | March 2027",
      "declarations": "Directors and advisory group members declare interests each January; Diego records them in the shared spreadsheet. Advisory meetings start with declarations. Supplier gifts (such as free samples for staff) are declared to Lucía. Trainees sign the code of conduct at induction."
     },
     "notice": "Notice how anti-harassment covers customers too: in a public café, trainees can face harassment from outside the team, and the policy says what staff may do."
    },
    {
     "org": "coop",
     "profile": {
      "policies": "Code of conduct | committee, staff, apprentices | respect at meetings; fair treatment of every weaver; no favours in quality checks; care with members' records | Meera, or president Sreeja | Meera | April 2027\nConflict of interest | committee, staff | declare relatives' businesses and personal orders; leave the room; no vote on the matter | treasurer | treasurer | April 2027\nAnti-fraud | anyone handling yarn, cash or payments | two quotes for yarn; exhibition cash counted by two people; payments co-signed by Meera and the treasurer | treasurer or the president | treasurer | April 2027\nAnti-harassment | members, staff, apprentices | named examples; women members can report to a woman committee member | president Sreeja | Sreeja | April 2027",
      "declarations": "Committee members and staff declare interests each April in a register kept by the treasurer and read out at the general body meeting. Each committee meeting starts with declarations. Gifts from buyers or suppliers above a small value are recorded at the next committee meeting. The register is open to members, in line with 'open books'."
     },
     "notice": "Notice that the register is read out at the general body meeting: Vanita uses its 'open books' value to make declarations visible to all members."
    },
    {
     "org": "hybrid",
     "profile": {
      "policies": "Code of conduct | staff, volunteers, trustees, company directors | welcoming and safe; refuse unsafe repairs; no taking donated items without paying; boundaries in schools | volunteer coordinator or Tom | Tom | September 2027\nConflict of interest | trustees, company directors, staff | declare interests in both entities; trustees on the company board declare when the boards deal with each other | chair Helen | Helen | September 2027\nAnti-fraud and bribery | everyone, including shop staff | two approvers over £500; shop takings counted by two people; no personal use of donated items | treasurer, or Helen if about Tom | treasurer | September 2027\nAnti-harassment | staff, volunteers, visitors | named examples; a route outside the line manager | Tom, or Helen if about Tom | Tom | September 2027",
      "declarations": "Trustees and company directors declare interests each June in one register for both entities, reviewed at each trustee meeting. When the charity and the company agree the shared costs or the yearly gift, trustees who sit on the company board declare it. Volunteers declare if they sell repairs privately. Gifts over a small value go in a gifts log kept by the volunteer coordinator."
     },
     "notice": "Notice the conflict built into the structure: two trustees sit on the company board, so every deal between the entities triggers a declaration."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "safeguarding",
  "part": "Policies & procedures",
  "title": "Safeguarding",
  "sheet": "Safeguarding",
  "learn": [
   "Safeguarding means protecting people, especially children and adults at risk, from harm caused by your staff, volunteers, partners, programmes or operations. It applies wherever your work brings you into contact with people who could be harmed, including online and through the stories and images you share.",
   "A proportionate framework has a policy and code of conduct; a named safeguarding lead and a deputy; safer recruitment; training; safe activity design (supervision, two adults present, safe spaces, online rules); a way to report concerns that does not depend on the line manager; a procedure to respond, record and refer to the right local authority; and support for the person affected.",
   "Safeguarding procedures must fit local law and local services. Get qualified local expertise and check referral contacts every year. Never record confidential case details in this workspace. Review the framework after any concern and at least once a year."
  ],
  "weak": "We all care about children, so safeguarding is fine.",
  "strong": "Imara Girls in Science: a trained safeguarding lead and deputy; every mentor vetted and trained before working with girls; mentors never alone with a girl; the reporting route on a poster in each club; county referral contacts checked each January; the board reviews the framework every year.",
  "why": "It names roles, routes and checks, and ties them to local services that are verified, not assumed.",
  "reflect": "If a child or adult told your newest volunteer about abuse, what would that volunteer do?",
  "exercise": "Outline your safeguarding framework (without case details).",
  "fields": [
   {
    "key": "scope",
    "label": "Who could be at risk and how",
    "hint": "People, activities and channels where harm could occur."
   },
   {
    "key": "framework",
    "label": "Framework elements",
    "hint": "Lead and deputy, policy, recruitment, training, safe design, reporting, response and referral, support."
   },
   {
    "key": "local",
    "label": "Local requirements to confirm",
    "hint": "Laws, authorities and referral pathways to verify with expertise."
   }
  ],
  "check": "Could anyone report a concern safely, and would it reach a trained person quickly?",
  "anatomy": {
   "title": "Safe practice in three moments",
   "intro": "Safeguarding works before, during and after an activity. Each moment needs its own habits.",
   "cols": [
    "Moment",
    "What good practice looks like",
    "Example"
   ],
   "rows": [
    [
     "Before",
     "Vetting, training, consent, a risk check for the activity",
     "Tide Line: parental consent and a site check before each planting day"
    ],
    [
     "During",
     "Two adults present, clear roles, a named focal person on site",
     "Riverside: a teacher stays in the room during every school workshop"
    ],
    [
     "If a concern arises",
     "Listen, do not investigate, tell the focal person the same day, refer as the procedure says",
     "Imara: a mentor tells the safeguarding lead, who follows the agreed referral route"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example safeguarding frameworks",
   "intro": "How each organisation outlines who could be at risk, the elements of its framework and what it must confirm locally, without any case details.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "scope": "Young people aged 12 to 17 at planting days, on the boat and at school sessions. Contact between adults and young people on WhatsApp and Instagram. Photos of young people. Travel to and from sites. Later: youth team leaders aged 16 to 17 supervising younger ones.",
      "framework": "Focal person: Sari; back-up: Wayan (same training); Ibu Made for concerns about a co-founder.\nPolicy and code of conduct: two pages, signed by every adult.\nRecruitment: conversation with both co-founders, ID, two references, police certificate if available and lawful.\nTraining: every adult volunteer before the rainy season.\nSafe design: two adults always present, one adult for every eight young people; written parental consent; no one-to-one messages; no messages after 8 pm.\nReporting: tell Sari the same day; number on the planting day sign-in sheet.\nResponse: record facts only in the locked Drive folder; refer as local advice sets out.",
      "local": "Which local office receives child protection referrals, and how? Ask the village heads and the provincial office.\nIs a police certificate for volunteers available and lawful to request?\nWhat must parental consent cover under local rules?\nIs there a local organisation that could give us safeguarding training and advice?"
     },
     "notice": "Notice that the two-adult rule and the eight-to-one ratio are written as design choices, not hopes. A planting day without them is postponed."
    },
    {
     "org": "ngo",
     "profile": {
      "scope": "Girls aged 10 to 14 at weekly clubs in 14 schools, at the holiday camp and during transport. Mentors (students and women in science) who meet girls. Parents' WhatsApp broadcast lists. Photos in the annual report and on Facebook. Girls' data on tablets.",
      "framework": "Lead: Achieng, director; deputy: a club coordinator (being named); board safeguarding lead: the lawyer trustee.\nPolicy and code of conduct: adopted by the board; signed by staff and mentors.\nRecruitment: references, police clearance before working with girls; without clearance, a mentor may shadow but is never alone with girls.\nTraining: all staff and mentors, with a refresher each year.\nSafe design: two adults at every club; no lifts alone; camp rooms checked; photo consent from parents and girls.\nReporting: poster in each club; route to the board safeguarding lead if a concern involves staff.\nResponse: record, refer by the agreed route, inform the board in summary.",
      "local": "Current contacts for county child protection services in both sub-counties, checked each January.\nWhat our registration rules require on safeguarding (lawyer review by March 2027).\nWhether the camp venue's own policy covers visiting groups.\nWhat the schools' own procedures say, so routes do not clash."
     },
     "notice": "Notice the route for concerns about staff: it goes to a board member, outside the management line, so no one investigates a colleague they manage."
    },
    {
     "org": "social",
     "profile": {
      "scope": "Trainees aged 18 to 24, some facing hard circumstances at home; early shifts and travel in the dark; working alongside customers and delivery drivers; shadow days at employer partners; trainees' stories and photos on Instagram.",
      "framework": "Focal person: Diego; second: Lucía (for concerns about Diego).\nPolicy: a short adult safeguarding and anti-harassment policy within the staff handbook.\nRecruitment: references for staff who supervise trainees.\nTraining: both directors and the café supervisor, yearly.\nSafe design: no trainee alone with a customer after closing; a check that trainees get home safely after early shifts; employer partners agree to our conduct rules before shadow days.\nReporting: tell Diego or Lucía; trainees can also use a sealed note box.\nResponse: record privately; refer to local services with the trainee's agreement unless there is serious risk.",
      "local": "Which local services support young adults (health, housing, violence support), with contacts checked each year.\nWhen we may share information without a trainee's agreement, under local rules.\nWhat employer partners must have in place before shadow days."
     },
     "notice": "Notice that adult safeguarding centres on consent: Pan del Barrio refers with the trainee's agreement, and confirms locally when it may act without it."
    },
    {
     "org": "coop",
     "profile": {
      "scope": "Apprentices from weaving families, some possibly under 18 (ages to confirm), working with adult master weavers. Design school students on placement. Women members at meetings and exhibitions. Weavers' names and photos on product tags.",
      "framework": "Focal person: a woman committee member chosen by the committee; deputy: Meera.\nPolicy: apprentice code of conduct (due January 2027), in Malayalam.\nRecruitment: references for master weavers who train apprentices.\nTraining: committee, staff and master weavers, short session each year.\nSafe design: apprentices work in shared spaces, never alone with one adult behind closed doors; parents' consent for anyone under 18; design students have a named supervisor.\nReporting: to the focal person or the president; contact on the notice board.\nResponse: record facts, refer as local advice sets out, tell the committee in summary.",
      "local": "Rules on the age and hours of apprentices in handloom work.\nWhich local office receives child protection referrals.\nWhat the design school's own safeguarding procedure requires during placements."
     },
     "notice": "Notice how Vanita treats the apprentices' ages as an open question to confirm, not an assumption, before the framework is finished."
    },
    {
     "org": "hybrid",
     "profile": {
      "scope": "Pupils at school workshops in 12 schools. Young volunteers. Adults at risk who visit repair cafés, some of them isolated. Visitors' homes, if a volunteer ever offers a home visit (not allowed). Photos at events.",
      "framework": "Lead: Tom; deputy: schools officer; safeguarding trustee: the schools governor.\nPolicy: adopted by trustees; covers children and adults at risk.\nRecruitment: DBS checks at the level each role is eligible for, references, interview questions.\nTraining: staff yearly; volunteers on induction.\nSafe design: a teacher always in the room at school workshops; no one-to-one time with pupils; no home visits; photos only with school and parent consent.\nReporting: to Tom or the schools officer; to the safeguarding trustee if about staff.\nResponse: follow the school's procedure in schools; record and refer as the policy says.",
      "local": "Current contacts for the local authority's children's and adults' services, checked each September.\nThe correct DBS level for each role (confirm with guidance).\nEach school's safeguarding procedure and lead, recorded in the school agreement."
     },
     "notice": "Notice that Riverside covers adults at risk as well as children: isolated visitors at repair cafés can be at risk too, so the policy names them."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "data-protection",
  "part": "Policies & procedures",
  "title": "Data protection and privacy",
  "sheet": "Data inventory",
  "learn": [
   "Data protection laws differ by country, but many share the same principles: collect personal information for a clear and lawful purpose, keep only what you need, keep it accurate and secure, hold it only as long as necessary, be open about what you do with it, and respect people's rights to see, correct or delete it.",
   "Start with a data inventory: what personal data you hold (participants, supporters, staff, volunteers, customers), why, on what lawful basis, where it is stored, who can see it, who you share it with and how long you keep it. Data about children, health, ethnicity or similar sensitive matters needs extra care.",
   "Then put in place a privacy notice, consent where that is your basis, access controls, secure tools, a retention schedule, a way to handle requests from people about their data, data-sharing agreements with partners and a plan for a data breach. Train everyone who handles personal data, and confirm local duties, such as registering with an authority, with qualified advice."
  ],
  "weak": "We keep all our contacts in a shared spreadsheet forever.",
  "strong": "Vanita Weavers Cooperative Society: members' bank details in a locked cabinet that only the accounts clerk and Meera open; buyers' addresses stay in the marketplace; weavers' names on tags only with yearly consent; former members' bank details removed once the final payment is settled.",
  "why": "It knows what data it holds, limits who sees it and decides when each record goes.",
  "reflect": "What sensitive information could you avoid collecting entirely?",
  "exercise": "Build your data inventory and list your privacy actions.",
  "fields": [
   {
    "key": "inventory",
    "label": "Data inventory",
    "hint": "Data set | whose data | purpose | lawful basis | where stored | access | shared with | retention."
   },
   {
    "key": "privacy",
    "label": "Information and safeguarding actions",
    "hint": "Minimum data needed | access | retention decision | specialist review needed."
   }
  ],
  "check": "Do you collect only the personal data you need, and protect it accordingly?",
  "gallery": {
   "title": "Five example data inventories",
   "intro": "How each organisation lists the personal data it holds and decides what it can collect less of.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "inventory": "Consent forms | young people and parents | permission to take part and be photographed | consent | locked box, Sari | Sari, Wayan | no one | end of the school year after the young person leaves\nContact list | parents | planting day messages | consent | Sari's phone, not the group | Sari | no one | while the child takes part\nAttendance and quiz | young people | MEAL | legitimate interest (to confirm) | Drive, first names only | co-founders | sponsors see totals only | two years\nPhotos | young people | Instagram | consent of parent and young person | Drive, consented folder | Sari | public, if approved | until consent is withdrawn",
      "privacy": "Minimum: first names and age group in attendance; no school names or addresses.\nAccess: minors' data only for Sari and Wayan; nothing in WhatsApp groups.\nRetention: shred consent forms and delete contacts at the end of the following school year.\nSpecialist review: what local law says about children's data and parental consent, before the first school year as a registered body."
     },
     "notice": "Notice the minimum line: Tide Line decided not to record school names or addresses at all, which removes a risk instead of protecting it."
    },
    {
     "org": "ngo",
     "profile": {
      "inventory": "Girls' records | girls 10 to 14 | attendance, confidence and skills surveys | consent of parents (basis to confirm) | tablets, then the shared drive | Brian, coordinators | funders see totals only | anonymised after Form 2 tracking\nParents' contacts | parents | club news, consent | consent | WhatsApp broadcast lists | coordinators | no one | while the girl takes part\nMentor files | mentors | vetting, agreements | contract; legal duty | restricted HR folder | Brian, Achieng | no one | while mentoring, plus a set period\nStaff files | 6 staff | employment, payroll | contract; legal duty | HR folder, accounting software | Grace, Achieng | tax authority | as required by law",
      "privacy": "Minimum: girls' records use a club ID, not surnames; no home addresses.\nAccess: tablet passcodes by November 2026; a password manager next.\nRetention: girls' data anonymised after Form 2 tracking; consent forms renewed yearly.\nSpecialist review: whether we must register with the data protection authority, and the lawful basis for girls' data, by December 2026."
     },
     "notice": "Notice the club ID: Imara can still track each girl's progress for MEAL without holding surnames on tablets that travel between schools."
    },
    {
     "org": "social",
     "profile": {
      "inventory": "Trainee records | trainees | contracts, check-ins, placements, follow-up at 3 and 12 months | contract; consent for follow-up | locked cabinet; spreadsheet | Diego (check-in notes Diego only) | accountant (payroll); employers with consent | a set period after the contract ends (to confirm)\nStaff records | permanent staff | employment | contract; legal duty | locked cabinet | Diego, Lucía | accountant | as required by law\nWholesale clients | office contacts | orders, invoices | contract | order sheet; point of sale | salesperson, Lucía | accountant | while a client, plus tax period\nTrainee stories and photos | trainees | Instagram, reports | written consent, withdrawable | consent folder | Diego | public | until withdrawn",
      "privacy": "Minimum: check-in notes record actions, not personal history.\nAccess: Diego only for check-ins; Lucía as back-up with a sealed login.\nRetention: delete check-in notes when the 12-month follow-up ends; keep contracts for the period the accountant confirms.\nSpecialist review: sharing graduates' details with employers, and what a municipal grant would require."
     },
     "notice": "Notice how check-in notes record actions, not trainees' personal histories. Sensitive details that are never written down cannot leak."
    },
    {
     "org": "coop",
     "profile": {
      "inventory": "Member register | 140 members | membership, elections | legal duty (cooperative rules) | cooperative software | Meera, accounts clerk | the department's auditor | as cooperative rules require\nBank details | members | piece payments | contract | locked cabinet | accounts clerk, Meera | the bank | until the final payment after leaving\nPiece register | members | payments, quality | contract | register and software | quality officer, accounts clerk | auditor | as the auditor advises\nNames and photos on tags | members | sales | consent, renewed yearly | designer's folder | designer | public | until withdrawn\nBuyers | online buyers | orders | contract | marketplace only | designer | marketplace | marketplace rules",
      "privacy": "Minimum: tags can carry a first name only, if the weaver prefers.\nAccess: bank details never in WhatsApp groups or on phones.\nRetention: remove former members' bank details after the final payment; keep the register as cooperative rules require.\nSpecialist review: what data the department may require us to keep, and for how long."
     },
     "notice": "Notice the name-only option for tags: Vanita offers weavers a lighter choice instead of all or nothing, which helps reach full consent."
    },
    {
     "org": "hybrid",
     "profile": {
      "inventory": "Volunteers | 40 volunteers | roles, PAT training, DBS dates | contract-like agreement; legal duty for DBS | volunteer database (DBS dates only, no certificates) | volunteer coordinator | no one | while volunteering, plus one year\nTool library members | residents | loans, reminders | contract | booking system | staff; volunteers limited | no one | two years after last loan\nPostcodes | visitors | reach to low-income areas | consent | summarised yearly, then deleted | Tom | council sees summaries | one year\nShop customers | buyers of electricals | returns and safety recalls | legal duty (to confirm) | shop system | shop manager | no one | to confirm",
      "privacy": "Minimum: the repair log records the item, not the person.\nAccess: separate folders for the charity and the company; volunteers see only bookings.\nRetention: postcodes summarised and deleted yearly; DBS certificates never copied.\nSpecialist review: whether we must keep buyers' contacts for product recalls, and for how long."
     },
     "notice": "Notice the shop customers line: Riverside may need contacts for safety recalls, so it asks for advice rather than either keeping everything or nothing."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "whistleblowing",
  "part": "Policies & procedures",
  "title": "Whistleblowing, complaints and incident reporting",
  "sheet": "Reporting channels",
  "learn": [
   "People need safe ways to raise concerns about wrongdoing: fraud, abuse, harassment, safety risks or breaches of law or policy. A whistleblowing policy protects people who raise concerns honestly from any punishment, and explains how to report, including to someone outside the line of management or to an outside body.",
   "Complaints from participants, customers, supporters or the public need a clear, easy procedure with timescales, a route to someone independent if the first answer is not enough, and learning from patterns. Incidents (accidents, data breaches, safeguarding concerns, security problems) need a simple report form, an owner and a record of what was done.",
   "Make the routes visible and simple. You can combine them, but sensitive matters must reach trained and independent people. Some incidents must be reported to regulators, funders or insurers within set times; list those duties and confirm them with qualified advice."
  ],
  "weak": "People can talk to the director if there is a problem.",
  "strong": "Riverside Repair Hub: concerns about the director go to chair Helen; complaints acknowledged within three working days and answered within twenty; one incident form for accidents, unsafe items, data breaches and safeguarding; serious incidents reported to the regulator, funders and insurer as their rules require.",
  "why": "It offers a route around the most senior person, sets timescales and lists outside reporting duties.",
  "reflect": "What if the concern is about the director?",
  "exercise": "Design your reporting channels and timescales.",
  "fields": [
   {
    "key": "channels",
    "label": "Reporting channels",
    "hint": "Type (whistleblowing, complaint, incident) | how to report | who receives | independent route | timescale."
   },
   {
    "key": "external",
    "label": "External reporting duties",
    "hint": "What must be reported to whom, and how quickly."
   }
  ],
  "check": "Is there a safe route when the concern involves a senior person?",
  "anatomy": {
   "title": "Three kinds of report",
   "intro": "They often share a form, but each has a different purpose and needs a different person to receive it.",
   "cols": [
    "Type",
    "What it covers",
    "Who should receive it"
   ],
   "rows": [
    [
     "Whistleblowing",
     "Suspected wrongdoing inside the organisation: fraud, abuse, cover-ups",
     "Someone independent of the people involved, such as the chair"
    ],
    [
     "Complaint",
     "Someone unhappy with your service, product or behaviour",
     "A named person, with a route to someone more senior"
    ],
    [
     "Incident",
     "Something that happened: accident, data breach, safeguarding concern",
     "The owner for that area, the same day for serious cases"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example reporting systems",
   "intro": "How each organisation sets up routes for concerns, complaints and incidents, and lists who outside must be told.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "channels": "Safeguarding concern | tell Sari in person or by phone the same day | Sari | Wayan, or Ibu Made if about a co-founder | same day\nComplaint from parents or villagers | speak to either co-founder or write a note | Wayan | village head, if not resolved | reply within a week\nIncident (injury, boat problem, lost form) | incident page in the locked Drive folder | Wayan (water), Sari (data) | Ibu Made | same day; review at the Sunday call\nMoney concern | tell Ibu Made | Ibu Made | the village head who supports us | within a week",
      "external": "Child protection concerns: to the local service named in our safeguarding procedure, as local advice sets out (contacts to confirm).\nSerious injury: parents at once; any authority local rules require (to confirm).\nSponsors and grant-givers: any serious incident, if their agreement asks for it.\nAfter registration: whatever the registration authority requires (to confirm with the notary)."
     },
     "notice": "Notice the village head as an outside route for complaints: in a small community, an independent person can be a respected local figure."
    },
    {
     "org": "ngo",
     "profile": {
      "channels": "Whistleblowing | email or phone to the board safeguarding lead or the chair | board member | an external hotline is being explored | acknowledged in 2 days\nComplaint from parents, schools or girls | coordinator, the club poster number or the girls' advisory group | Brian | Achieng, then the chair | acknowledged in 3 days, answered in 20\nSafeguarding concern | tell the safeguarding lead the same day | Achieng | board safeguarding lead if about staff | same day\nIncident (accident, data, transport) | incident form on the tablet | Brian | Achieng | within 24 hours",
      "external": "Child protection concerns: to county child protection services through the agreed route, as soon as the procedure requires.\nSerious incidents: Foundation A and B within the time set in each grant agreement.\nData breaches: to the data protection authority if local law requires, within its deadline (to confirm).\nInsurer: accidents at camp or in transport, within the policy's notice period.\nRegulator: matters our registration rules require (lawyer review by March 2027)."
     },
     "notice": "Notice the girls' advisory group as a complaint route: girls may find it easier to raise something with peers than with an adult."
    },
    {
     "org": "social",
     "profile": {
      "channels": "Whistleblowing | tell Lucía or Diego, or the accountant if about both directors | the director not involved | accountant | acknowledged in 2 days\nCustomer complaint | at the till, by WhatsApp or on Instagram | café supervisor | Lucía | answered in 3 days\nTrainee concern or grievance | tell Diego, Lucía or use the note box | Diego | Lucía | meeting within a week\nIncident (burn, food safety, theft) | incident book in the office | Lucía | Diego | same day",
      "external": "Food safety incidents: to the municipal health authority as local rules require (to confirm with the accountant and the inspector).\nWorkplace injuries: to the labour or health authority if required, and the health insurer (to confirm).\nEmployer partners: any incident during a shadow day, the same day.\nMunicipality: incidents involving trainees, if a grant agreement is signed."
     },
     "notice": "Notice the outside route when both directors could be involved: in a two-shareholder company, the accountant gives staff a way around the owners."
    },
    {
     "org": "coop",
     "profile": {
      "channels": "Whistleblowing | tell the president or any committee member | president Sreeja | the department's auditor | acknowledged in a week\nMember complaint (rejections, payments) | write or tell the village representative | quality officer or Meera | appeal to the committee | answered in 15 days\nBuyer complaint | marketplace messages or email | designer | Meera | answered in 2 days\nIncident (yarn damage, theft, injury) | incident register at the office | Meera | treasurer | same day",
      "external": "Serious financial wrongdoing: the state cooperative department, as cooperative rules require (to confirm).\nInsurance claims for yarn damage: the insurer within the policy's notice period.\nMarketplace: buyer disputes and returns within its rules.\nGrant-givers: any serious incident if a dye unit grant is signed."
     },
     "notice": "Notice the appeal to the committee for rejected pieces: Vanita's most frequent complaint now has a fair second step built in."
    },
    {
     "org": "hybrid",
     "profile": {
      "channels": "Whistleblowing | to chair Helen, or the treasurer | Helen | an external advice line for charities | acknowledged in 2 days\nComplaint (visitor, customer, school) | form on the website and at the shop till | Tom (charity), shop manager (shop) | Helen, then outside review | acknowledged in 3 working days, answered in 20\nSafeguarding concern | Tom or the schools officer, the same day | Tom | safeguarding trustee if about staff | same day\nIncident (shock, injury, faulty item, data) | incident form; injuries also in the accident book | Priya (safety), Tom (data) | treasurer | same day",
      "external": "Serious incidents: to the charity regulator, as its rules require.\nData breaches: to the data protection regulator if the breach meets its test, within its deadline (to confirm).\nUnsafe products sold: as product safety rules require, including any recall (advice requested).\nInsurer: claims and incidents within the notice period.\nCouncil and funders: as each contract or grant requires."
     },
     "notice": "Notice the published complaints form: Riverside's brand audit found complaints had no visible route, so the fix appears on the website and at the till."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "hr-policies",
  "part": "Policies & procedures",
  "title": "HR and workplace policies",
  "sheet": "HR policies",
  "learn": [
   "As soon as you engage people, you need some workplace policies, and employment law in your country will require some of them. Typical ones cover equal opportunities, recruitment, pay, hours and leave, sickness and absence, grievance and disciplinary procedures, health and safety, remote work, expenses, use of equipment and travel.",
   "Volunteers need a lighter but real framework: role descriptions, expenses, supervision, conduct and how concerns are handled. Keep the language of volunteer documents clear that volunteering is not employment, and confirm locally how that line is drawn.",
   "Module 4 already designed much of this: recruitment, onboarding, check-ins, pay, culture and offboarding. Here, make sure each policy is written down, checked by a qualified local employment adviser and listed in your policy register with an owner and a review date. Use templates as starting points only."
  ],
  "weak": "We will copy a big organisation's staff handbook.",
  "strong": "Pan del Barrio S.A.C.: a staff handbook of seven short policies, checked each November by a local employment adviser, covering trainees' contracts, hours and early shifts, sickness, grievance and discipline, health and safety, and anti-harassment.",
  "why": "It is proportionate to a small team, checked against local law and kept up to date.",
  "reflect": "Which workplace situation would you not know how to handle fairly today?",
  "exercise": "List the HR and workplace policies you need and their status.",
  "fields": [
   {
    "key": "policies",
    "label": "HR and workplace policies",
    "hint": "Policy | applies to | legally required? | status | owner | review date."
   }
  ],
  "check": "Have legally required workplace policies been checked for your country?",
  "gallery": {
   "title": "Five example HR policy lists",
   "intro": "How each organisation lists the workplace policies it needs and how far each has got.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "policies": "Volunteer agreement and role description | adult volunteers | no (good practice) | in use | Sari | January 2027\nVolunteer expenses | volunteers | no | transport and a meal covered; rule written | Ibu Made | January 2027\nHealth and safety on planting days | everyone | to confirm | tide rule and life jackets agreed; not written as one page | Wayan | October 2027\nFounders' agreement | Wayan and Sari | no | one page signed | both | at registration, with the notary\nEmployment policies (contract, pay, leave) | first paid coordinator | yes, when hiring | not started | board | before any hiring in year two"
     },
     "notice": "Notice the last line: Tide Line names the trigger for employment policies (the first paid role) rather than writing a handbook it does not need yet."
    },
    {
     "org": "ngo",
     "profile": {
      "policies": "Recruitment and selection | staff and mentors | partly | in place | Achieng | February 2027\nPay and benefits | staff | yes, minimum terms | three bands; board approved | Achieng | November 2027\nLeave and absence | staff | yes | in the handbook | Grace | February 2027\nGrievance and disciplinary | staff | yes | written; not yet checked since the law review | Achieng | March 2027\nHealth and safety and travel | staff and mentors | yes | travel section missing for camp | Brian | July 2027\nMentor agreement and expenses | mentors | no (stipend checked as expenses) | in place | Brian | January 2027\nAnti-harassment | staff and mentors | to confirm | in place | Achieng | February 2027"
     },
     "notice": "Notice the status column: two policies are honest about gaps (no travel section, not checked since the law changed), so the work is easy to plan."
    },
    {
     "org": "social",
     "profile": {
      "policies": "Apprenticeship contract and training plan | trainees | yes | template checked each November | Diego | November 2027\nPay, hours and early shifts | all staff | yes | minimum wage and shift rules written | Diego | January 2027\nHealth insurance | all staff | yes | enrolment in week one | Diego | each cohort\nSickness and absence | all staff | yes | written; accountant uses the absence record for payroll | café supervisor | January 2027\nGrievance and discipline | all staff | yes | written; lateness handled privately first | Diego | January 2027\nHealth and safety | all staff | yes | kitchen rules; burns and knives | Lucía | March 2027\nAnti-harassment | staff, trainees | to confirm | written | Diego | January 2027"
     },
     "notice": "Notice that trainees get the same pay, hours and insurance policies as permanent staff: the value 'real jobs, real pay' shows up in the handbook."
    },
    {
     "org": "coop",
     "profile": {
      "policies": "Staff contracts and leave | 4 staff | yes | contracts exist; leave rules unwritten | Meera | April 2027\nPay | staff | yes, minimum terms | committee sets pay each April | treasurer | April 2027\nGrievance and discipline | staff | yes | not written; concerns about Meera go to the president | president Sreeja | April 2027\nMember supply agreement | member weavers (not employees) | no, but cooperative rules apply | in place | Meera | April 2027\nApprentice terms | apprentices | to confirm | stipend and six-month term agreed; code due | quality officer | January 2027\nHealth and safety in the yarn store and dye area | staff, members on site | yes | not written | Meera | before the dye unit"
     },
     "notice": "Notice the line between staff and members: weavers are paid per piece under a supply agreement, so Vanita keeps their terms apart from staff employment policies."
    },
    {
     "org": "hybrid",
     "profile": {
      "policies": "Staff handbook (charity) | four charity staff | yes | in place; employment adviser check | Tom | March 2027\nStaff handbook (Riverside Reuse Ltd) | shop manager, later shop assistant | yes | same policies, company name | shop manager | March 2027\nPay | both entities | yes, minimum terms | Real Living Wage or above; bands | Tom | March 2027\nHealth and safety and electrical safety | staff and volunteers | yes | in place | Priya | January 2027\nVolunteer handbook | 40 volunteers | no (good practice) | role descriptions, expenses, conduct | volunteer coordinator | September 2027\nGrievance and discipline | staff | yes | in place | Tom; Helen if about Tom | March 2027\nLone working | workshop staff | to confirm | missing | Priya | February 2027"
     },
     "notice": "Notice the two handbooks: staff are employed by different entities, so each employer has its own version of the same policies."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "procedures",
  "part": "Policies & procedures",
  "title": "Writing usable procedures",
  "sheet": "Procedures",
  "learn": [
   "A procedure helps someone carry out a real task the same way every time. Define what starts it, who is responsible, the steps, the records kept and the exceptions. Every important policy needs at least one procedure that shows how to apply it.",
   "Use plain language and test it with someone who did not write it. Ask them where they would pause, guess or need permission. Fix those points before you treat the procedure as ready.",
   "Include what to do in an urgent situation and how to raise a concern. Do not write emergency or safeguarding instructions on your own: base them on qualified local advice and the local services people would actually contact."
  ],
  "weak": "Staff must follow best practice.",
  "strong": "Riverside Repair Hub: a refurbished electrical goes on sale only after a trained volunteer tests it, labels it and records the result; Priya signs off; any item that fails is tagged 'do not sell' and kept apart; the shop manager checks the label before pricing.",
  "why": "Each step has a role and a record, and the exception (a failed test) has a clear path.",
  "reflect": "Which everyday task is currently handled differently by each person?",
  "exercise": "Draft one priority procedure and plan a walkthrough.",
  "fields": [
   {
    "key": "procedure",
    "label": "Priority procedure",
    "hint": "Trigger | scope | roles | numbered steps | records | exceptions | review."
   },
   {
    "key": "test",
    "label": "Procedure test",
    "hint": "Who will walk through it, and what needs checking?"
   }
  ],
  "check": "Could a new colleague follow the sequence and recognise an exception?",
  "gallery": {
   "title": "Five example priority procedures",
   "intro": "How each organisation drafts one procedure that matters most and plans to test it with someone new.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "procedure": "Trigger: a planting day is in the plan.\nRoles: Sari (lead and focal person), Wayan (water), adult volunteers.\nSteps: 1. Two days before, Sari checks consent forms for every young person. 2. The night before, Wayan checks the tide and weather; cancel by WhatsApp if unsafe. 3. On the day, confirm at least two adults and one adult for every eight young people; if not, postpone. 4. Sign-in sheet and life jackets before anyone goes near the water. 5. Count heads at the start, around each boat trip and at the end.\nRecords: sign-in sheet, head counts, incident page if needed.\nExceptions: a young person without consent watches from the shore with an adult or goes home with a parent.\nReview: after the first three planting days of the season.",
      "test": "A new volunteer, with Sari watching, runs the checklist for a real planting day. Check: is the tide rule clear, is the head count written down, and does the volunteer know what to do if a young person arrives without consent?"
     },
     "notice": "Notice the exception for a young person without consent: the procedure says exactly what happens, so no adult is tempted to make an exception on the spot."
    },
    {
     "org": "ngo",
     "profile": {
      "procedure": "Trigger: a new mentor is accepted.\nScope: all volunteer mentors.\nRoles: Brian (onboarding), Achieng (safeguarding lead), coordinators.\nSteps: 1. Collect two references and police clearance. 2. Mentor signs the agreement and code of conduct. 3. Safeguarding training, including what to do if a girl shares a worry. 4. Shadow two clubs with a buddy mentor; never alone with girls. 5. Brian records all checks, then confirms the mentor may co-lead. 6. Coordinator adds the mentor to the rota.\nRecords: mentor file in the restricted folder; training date; checks list.\nExceptions: without clearance, the mentor may only shadow. Any concern during shadowing goes to the safeguarding lead before the mentor continues.\nReview: each January.",
      "test": "A coordinator who did not write it onboards the next new mentor using only the written steps. Check: is it clear who confirms the mentor is ready, and where the checks are recorded?"
     },
     "notice": "Notice step five: one named person confirms the mentor is ready, which closes the gap that left two clearances outstanding."
    },
    {
     "org": "social",
     "profile": {
      "procedure": "Trigger: the café opens each morning.\nScope: food safety opening checks.\nRoles: shift lead (café supervisor or Lucía); trainees on shift.\nSteps: 1. Wash hands; check uniforms and hair covers. 2. Read and record fridge temperatures. 3. Check allergen labels on today's products. 4. Check use-by dates; remove anything out of date. 5. Clean surfaces with the approved product. 6. Shift lead signs the daily checklist.\nRecords: daily food safety checklist, kept for the inspector.\nExceptions: fridge above the safe temperature (set in our food safety plan) means stock is moved and Lucía is told at once; no product without allergen labels goes on sale.\nReview: each October, with the licence check.",
      "test": "A trainee in week two runs the checks while the café supervisor watches without helping. Check: does the trainee know what the safe fridge temperature is and what to do if it is too high?"
     },
     "notice": "Notice how the fridge temperature points to the food safety plan rather than a number in the procedure, so the procedure stays right if the plan changes."
    },
    {
     "org": "coop",
     "profile": {
      "procedure": "Trigger: a weaver brings finished pieces to the office.\nScope: quality checks and rejections.\nRoles: quality officer, weaver, accounts clerk.\nSteps: 1. Check each piece against the written quality standard with the weaver present. 2. Record accepted pieces in the piece register. 3. For a rejected piece, write the reason and how to fix it; show it to the weaver. 4. Every Friday, send the accepted list to the accounts clerk. 5. Payment within 15 days.\nRecords: piece register; rejection slips with reasons.\nExceptions: if the weaver disagrees, the piece is set aside and reviewed with a second checker; the weaver can appeal to the committee.\nReview: each April.",
      "test": "A newer member who has never had a piece rejected reads it in Malayalam and explains it back. Check: is the appeal route clear, and do weavers know they can ask for a second checker?"
     },
     "notice": "Notice that the test is done by a weaver, not staff: the people most affected by a procedure should find it clear too."
    },
    {
     "org": "hybrid",
     "profile": {
      "procedure": "Trigger: a donated or repaired electrical item is ready for the shop.\nScope: all refurbished electricals sold by Riverside Reuse Ltd.\nRoles: PAT-trained volunteer, Priya (sign-off), shop manager.\nSteps: 1. Visual check for damage. 2. PAT test by a trained volunteer. 3. Pass: label with date and tester; record in the test log. 4. Priya or a second trained tester signs off. 5. Shop manager checks the label before pricing.\nRecords: test log with item, date, tester and result.\nExceptions: fail means tag 'do not sell', keep apart, repair or recycle. A returned faulty item: withdraw similar items and check the test record.\nReview: every six months.",
      "test": "The shop manager and a newly trained volunteer walk through it with three real items, one known to fail. Check: is the failed item kept apart, and who decides on withdrawing similar items?"
     },
     "notice": "Notice that the test includes an item known to fail: the exception path is where procedures usually break, so Riverside tests it on purpose."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "policy-management",
   "onboarding-compliance"
  ],
  "video": null,
  "stage": "Manage",
  "id": "lifecycle",
  "part": "Policies & procedures",
  "title": "Policy management and review",
  "sheet": "Policies",
  "learn": [
   "Policies only protect people if they are approved, known, understood, followed and kept up to date. Manage each one through a simple cycle: draft, consult the people affected, approve, share and train, collect acknowledgements, check it is followed, then review and update.",
   "Keep a policy register with the version, status, owner, approver, approval date, next review, who must acknowledge it and where the current copy lives. Archive old versions rather than deleting them, so you can show what applied at any time.",
   "Review on a schedule (often every one to three years), and also after an incident, when the law changes or when your activities change. Record what changed and why, and tell people about significant changes. Link acknowledgements to onboarding, so new people read what applies to them from the start."
  ],
  "weak": "Our policies are in a folder somewhere.",
  "strong": "Imara Girls in Science: a register of twelve policies, each with an owner, version and next review; the board approves key policies; staff and mentors confirm the code of conduct, safeguarding and data protection when they join and after each major update.",
  "why": "It keeps every policy owned, current and known by the people it applies to.",
  "reflect": "When was your oldest policy last reviewed?",
  "exercise": "Set up your policy register and review schedule.",
  "fields": [
   {
    "key": "register",
    "label": "Policy register",
    "hint": "Policy | version | status | owner | approver | next review | who must acknowledge."
   },
   {
    "key": "communication",
    "label": "Communication and training",
    "hint": "How people learn about and acknowledge policies."
   }
  ],
  "check": "Is every policy owned, current and acknowledged by the people it applies to?",
  "gallery": {
   "title": "Five example policy registers",
   "intro": "How each organisation tracks its policies through review and makes sure people know them.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "register": "Safeguarding | v1.0 | draft | Sari | both co-founders, then the board | January 2027 | all adults\nCode of conduct for adults | v1.0 | in use | Sari | both co-founders | January 2027 | all adults\nConsent and photos | v1.1 | in use | Sari | both co-founders | each school year | adults; parents told\nWater and boat safety | v0.1 | draft | Wayan | both co-founders | October 2027 | adults on planting days\nConflict of interest | v0.1 | draft | Wayan | board | after registration | co-founders, volunteers, board",
      "communication": "One-page summary in Bahasa Indonesia, pinned in the volunteers' WhatsApp group. New volunteers go through it with Sari before their first planting day and sign the code of conduct. Parents receive the consent and photo rules with the form. Changes are explained at the volunteer briefing before the next planting day. All policies live in one Drive folder; old versions in an archive folder."
     },
     "notice": "Notice the version numbers even at this size: v0.1 for drafts makes it obvious which rules are agreed and which are still being written."
    },
    {
     "org": "ngo",
     "profile": {
      "register": "Safeguarding | v3.0 | approved | Achieng | board | February 2027 | staff, mentors, board\nCode of conduct | v2.1 | approved | Achieng | board | February 2027 | staff, mentors, board\nData protection | v1.0 | under review | Brian | board | December 2026 | staff, mentors\nAnti-fraud and conflicts | v1.2 | approved | Grace | board | February 2027 | staff, board\nFinance and procurement | v2.0 | approved | Grace | board | November 2027 | staff\nWhistleblowing | v0.2 | draft | Achieng | board | March 2027 | everyone",
      "communication": "Key policies read and signed on joining (staff and mentors). Safeguarding refresher each January with a short quiz. Board receives the register at its Q3 meeting (policy reviews). After a major change, coordinators explain it at the monthly mentor circle and mentors confirm by WhatsApp form. Current versions in the shared drive; archived versions kept."
     },
     "notice": "Notice the Q3 board meeting: policy reviews sit in the board calendar from Module 3, so nothing depends on someone remembering."
    },
    {
     "org": "social",
     "profile": {
      "register": "Food safety and hygiene | v2.0 | approved | Lucía | both directors | October 2027 | all staff and trainees\nStaff handbook (seven policies) | v1.3 | approved | Diego | both directors | November 2027 | all staff and trainees\nTrainee code of conduct | v1.1 | approved | Diego | both directors | January 2027 | trainees\nConsent for stories and photos | v1.0 | approved | Diego | both directors | January 2027 | trainees, salesperson\nConflict of interest | v0.1 | draft | Lucía | both directors | March 2027 | directors, advisory group",
      "communication": "Each cohort's induction covers the handbook, food safety and the code of conduct; trainees sign on day one. Short reminders at the weekly staff meeting. Changes to the handbook after the November employment check are explained to the whole team before the next cohort. Signed copies in the locked cabinet; current versions in the shared folder."
     },
     "notice": "Notice that every new cohort is a natural moment to communicate policies: Pan del Barrio ties its review dates to the cohort calendar."
    },
    {
     "org": "coop",
     "profile": {
      "register": "Quality and rejections | v2.0 | approved | quality officer | committee | April 2027 | members, staff\nConflict of interest | v1.0 | approved | treasurer | committee | April 2027 | committee, staff\nPurchasing | v1.1 | approved | Meera | committee | April 2027 | staff, purchase subcommittee\nConsent for names and photos | v1.0 | approved | designer | committee | each year | members\nApprentice code of conduct | v0.2 | draft | quality officer | committee | January 2027 | apprentices, master weavers",
      "communication": "Policies affecting members are read aloud in Malayalam at the general body meeting and shared as voice notes in the village WhatsApp groups. Village representatives collect questions. Staff and committee sign on joining. Printed copies kept at the office for any member to read. Changes approved in April are explained before the September general body meeting."
     },
     "notice": "Notice the voice notes: many members prefer listening to reading, so Vanita shares policies in a form people will actually take in."
    },
    {
     "org": "hybrid",
     "profile": {
      "register": "Safeguarding | v2.0 | approved | Tom | trustees | September 2027 | staff, schools volunteers, trustees\nElectrical safety | v3.1 | approved | Priya | trustees | January 2027 | repairers, shop staff\nProduct safety (shop) | v1.0 | under review | shop manager | company board | December 2026 | shop staff, testers\nData protection | v1.2 | approved | Tom | trustees | September 2027 | staff, volunteers\nComplaints | v1.0 | approved, not published | Tom | trustees | December 2026 | staff, public\nVolunteer handbook | v2.0 | approved | volunteer coordinator | Tom | September 2027 | all volunteers",
      "communication": "Volunteers read the handbook and sign on induction; repairers also pass the electrical safety assessment. Trustees review the register each September. After a change, the volunteer coordinator posts a short summary in the volunteer newsletter and at the next repair café briefing. Separate folders for charity and company policies; archived versions kept."
     },
     "notice": "Notice 'approved, not published' on the complaints policy: the register shows the difference between a policy that exists and one people can use."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "issue-risk-management"
  ],
  "video": null,
  "stage": "Understand",
  "id": "risk-assess",
  "part": "Risk management",
  "title": "Identifying and assessing risk",
  "sheet": "Risks",
  "learn": [
   "A risk is something uncertain that could affect your objectives or harm people. An issue is something that has already happened (Module 5). Describe each risk as cause → event → consequence, so your response can target the cause or reduce the consequence.",
   "Find risks systematically: from your objectives and Theory of Change assumptions, your activities, people, money, partners, legal map, data, reputation, safety and the outside context. Involve people at different levels; those doing the frontline work often see risks that leaders miss.",
   "Score each risk for likelihood and impact on a simple scale, such as 1 to 5, and multiply them. Score it first before controls (inherent risk), then with your current controls (residual risk). The scores support a conversation; they do not make a judgement right on their own."
  ],
  "weak": "Risk: something goes wrong.",
  "strong": "Imara Girls in Science: a coordinator's tablet with girls' records is lost on the way between schools, exposing girls' data and parents' trust; likelihood 3, impact 4 (inherent 12); with passcodes and club IDs instead of surnames, likelihood 2, impact 3 (residual 6).",
  "why": "It links a cause, a harm and the controls, and shows the difference the controls make.",
  "reflect": "Which risk would you rather not talk about?",
  "exercise": "Identify and assess your main risks without personal case details.",
  "fields": [
   {
    "key": "risks",
    "label": "Risk assessment",
    "hint": "Cause → event → consequence | category | likelihood | impact | inherent score | current controls | residual score."
   }
  ],
  "check": "Is each risk described as cause, event and consequence, with inherent and residual scores?",
  "anatomy": {
   "title": "A simple risk scoring grid",
   "intro": "Score likelihood and impact from 1 to 5, then multiply: 1–4 low, 5–9 medium, 10–14 high, 15–25 very high.",
   "cols": [
    "Score",
    "Likelihood",
    "Impact"
   ],
   "rows": [
    [
     "1",
     "Rare: hard to imagine in the next few years",
     "Minor: small delay or cost, easily fixed"
    ],
    [
     "2",
     "Unlikely: could happen, but not expected",
     "Moderate: some disruption or cost; no lasting harm"
    ],
    [
     "3",
     "Possible: might happen in the next year",
     "Serious: an objective slips, or an injury needing treatment"
    ],
    [
     "4",
     "Likely: will probably happen this year",
     "Major: an activity stops, or trust is badly damaged"
    ],
    [
     "5",
     "Almost certain: expected, or already starting",
     "Severe: serious harm to a person, or the organisation's survival at risk"
    ]
   ],
   "after": 2
  },
  "gallery": {
   "title": "Five example risk assessments",
   "intro": "How each organisation describes and scores its main risks, before and after current controls.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "risks": "High tide or storm during shore or boat work → a young person gets into difficulty in the water → injury | safety | 3 | 5 | 15 | tide rule, life jackets, head counts, one adult per eight | 2 × 5 = 10\nGaps in vetting or supervision → a young person is harmed by an adult → serious harm, loss of parents' trust | safeguarding | 2 | 5 | 10 | checks, two adults always present, code of conduct, focal person | 1 × 5 = 5\nWrong species or site, storms → most seedlings die → ESO1 missed, sponsors doubt us | programme | 4 | 3 | 12 | nursery advice, survival monitoring | 3 × 3 = 9\nPlanting near ponds → a pond owner objects or clears the area → seedlings lost, village conflict | external | 3 | 3 | 9 | site agreements with village heads | 2 × 3 = 6"
     },
     "notice": "Notice that water safety stays at 10 after controls. Tide Line does not pretend its rules remove the risk; it keeps it high on the list."
    },
    {
     "org": "ngo",
     "profile": {
      "risks": "Foundation A grant ends next year and is not replaced in time → a US$70,000 gap → clubs cut | financial | 4 | 5 | 20 | funder pipeline, reserve of US$10,000 | 3 × 5 = 15\nTablet lost between schools → girls' records exposed → harm to girls, trust lost | data | 3 | 4 | 12 | passcodes, club IDs not surnames | 2 × 3 = 6\nMentor not fully vetted or supervision gap → a girl is harmed → serious harm, schools withdraw | safeguarding | 2 | 5 | 10 | clearance before working alone, two adults, training, reporting poster | 1 × 5 = 5\nUnlicensed or unsafe vehicle → road accident on camp transport → injury | safety | 2 | 5 | 10 | licensed operator only, seat belts, staff on board | 1 × 5 = 5"
     },
     "notice": "Notice the Foundation A risk: it stays very high after controls, which tells the board its current actions are not enough."
    },
    {
     "org": "social",
     "profile": {
      "risks": "Largest office client is 40% of wholesale → it leaves or delays payment → cash shortfall | financial | 3 | 4 | 12 | weekly invoicing, 15-day terms | 3 × 3 = 9\nFlour prices keep rising → costs grow faster than prices → losses | financial | 4 | 3 | 12 | quotes from two suppliers, price review each October | 3 × 3 = 9\nGap in hygiene or allergen labels → a customer falls ill → harm, licence at risk | legal and safety | 2 | 5 | 10 | daily checklist, allergen labels, licence | 1 × 5 = 5\nHot ovens and knives, new trainees → a trainee is burned or cut → injury, time off | safety | 3 | 3 | 9 | kitchen rules, a buddy in week one, first aid kit | 2 × 3 = 6"
     },
     "notice": "Notice how the trainee injury risk names the cause (new trainees with hot ovens), which points directly at the buddy system as a control."
    },
    {
     "org": "coop",
     "profile": {
      "risks": "Shops pay up to 60 days late → no cash to pay weavers in 15 days → weavers lose income and trust | financial | 4 | 4 | 16 | reminders, pausing orders | 3 × 4 = 12\nRoof leak and monsoon damp → yarn damaged in store → lost stock before festival season | operational | 4 | 3 | 12 | raised shelves; roof repair booked | 2 × 3 = 6\nA power-loom piece slips through → sold as handloom → breach of consumer rules, reputation lost | legal | 2 | 5 | 10 | every piece checked; weaver's name on the tag | 1 × 5 = 5\nYoung people see weaving as low-paid → apprentices leave → craft and ESO2 decline | programme | 4 | 3 | 12 | apprentice stipend, under-35 committee places | 3 × 3 = 9"
     },
     "notice": "Notice that late shop payments outrank the monsoon after controls: the roof can be fixed, but Vanita cannot control when shops pay."
    },
    {
     "org": "hybrid",
     "profile": {
      "risks": "A test step skipped or a fault missed → an unsafe refurbished electrical is sold → injury, legal claim | safety and legal | 3 | 5 | 15 | PAT test, label, record, sign-off | 2 × 5 = 10\nLease ends in 2028 without a new agreement → loss of the workshop and shop → services stop | premises | 3 | 5 | 15 | talks with the landlord; trustees review options | 3 × 4 = 12\nFew PAT-trained volunteers → repair cafés short of testers → electricals turned away | people | 4 | 3 | 12 | two volunteers qualifying by March | 2 × 3 = 6\nGaps in checks or supervision in schools → a pupil is harmed → serious harm, schools withdraw | safeguarding | 2 | 5 | 10 | DBS checks, teacher present, no one-to-one time | 1 × 5 = 5"
     },
     "notice": "Notice how product safety and the lease share an inherent score of 15, yet controls reduce them very differently. Residual scores show where effort is still needed."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "issue-risk-management"
  ],
  "video": null,
  "stage": "Implement",
  "id": "risk-register",
  "part": "Risk management",
  "title": "Risk registers, ownership, mitigation and escalation",
  "sheet": "Risks",
  "learn": [
   "A risk register keeps your risks, scores, owners, actions, due dates and review dates in one place. Keep it short enough to use: a small organisation might track fifteen to thirty risks, and a very young group fewer.",
   "Every risk needs one owner, the person best placed to manage it. Choose a response: avoid (stop or change the activity), reduce (add controls), transfer (insurance or contracts) or accept (if it is within your risk appetite). Actions need owners and dates like any other task.",
   "Set your risk appetite: how much risk you will accept in each area. Many organisations have a very low appetite for safeguarding, legal and financial integrity risks, and more room for trying new ideas. Then decide what is escalated: which scores go to the director and which to the board, and how fast."
  ],
  "weak": "The director keeps a list of worries.",
  "strong": "Pan del Barrio S.A.C.: a register of fourteen risks, each with one owner, a response and a dated action; residual scores of 12 or more go to the monthly directors' meeting, and any food safety incident or concern about a trainee's safety goes to both directors the same day.",
  "why": "It makes every risk someone's job and sets clear rules for what is escalated and how fast.",
  "reflect": "Which of your risks has no realistic owner?",
  "exercise": "Build your risk register with owners, responses and escalation rules.",
  "fields": [
   {
    "key": "register",
    "label": "Risk register",
    "hint": "Risk | owner | response (avoid, reduce, transfer, accept) | mitigation action | due | review date."
   },
   {
    "key": "appetite",
    "label": "Risk appetite and escalation",
    "hint": "Appetite by area and what is escalated to whom, how fast."
   }
  ],
  "check": "Does every significant risk have an owner, an action and an escalation route?",
  "anatomy": {
   "title": "One example risk register row",
   "intro": "A single row from Riverside Repair Hub's register, read from left to right.",
   "cols": [
    "Column",
    "What it records",
    "Riverside's entry"
   ],
   "rows": [
    [
     "Risk",
     "Cause → event → consequence",
     "Test step skipped → unsafe electrical sold → injury, claim"
    ],
    [
     "Score",
     "Inherent and residual",
     "Inherent 15; residual 10"
    ],
    [
     "Owner and response",
     "One person; avoid, reduce, transfer or accept",
     "Priya; reduce and transfer (product liability insurance)"
    ],
    [
     "Action and due",
     "What will lower the score, by when",
     "Second sign-off tester trained, by March 2027"
    ],
    [
     "Review and escalation",
     "When it is next checked; who hears about it",
     "Monthly by Tom; trustees each quarter; any incident to the chair within 48 hours"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example risk registers",
   "intro": "How each organisation assigns owners and responses to its main risks and decides what is escalated.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "register": "Young person in difficulty in the water | Wayan | reduce | write the water safety page; train every adult on the tide rule | December 2026 | before each season\nHarm to a young person by an adult | Sari | reduce | safeguarding training for all adult volunteers; Wayan trained as back-up | before the rainy season | January 2027\nSeedlings die | Sari | reduce | plant in sheltered zones on nursery advice | November 2026 | after each survival check\nPond owner conflict | Wayan | reduce | meet with the village head present before planting | 15 November 2026 | each new site\nInjury with no cover | Wayan | transfer | ask about insurance for planting days | before the first boat trip of 2027 | yearly",
      "appetite": "Safeguarding and water safety: no appetite. If two adults or life jackets are missing, the activity stops.\nMoney: low. Every payment needs a receipt; spending over US$100 needs both co-founders.\nTrying new planting sites or methods: moderate, if survival is monitored.\nEscalation: any safeguarding concern to Sari the same day (Ibu Made if about a co-founder); any injury to both co-founders and parents at once; after registration, risks scoring 10 or more go to the board each quarter."
     },
     "notice": "Notice 'no appetite' for safeguarding and water: the rule is not a score but a stop, so any volunteer knows what to do without discussion."
    },
    {
     "org": "ngo",
     "profile": {
      "register": "Foundation A gap | Achieng | reduce | three new funder applications; local business plan | March 2027 | monthly\nTablet loss and data exposure | Brian | reduce | passcodes on all tablets; password manager | November 2026 | quarterly\nClub time cut by schools | Brian | reduce | agree club time in each school agreement | January 2027 | each term\nHarm to a girl | Achieng | reduce | name the deputy lead; check county contacts | January 2027 | monthly\nCamp transport accident | Brian | transfer and reduce | licensed operator with insurance; staff on every bus | July 2027 | before camp\nFraud in purchasing | Grace | reduce | three quotes over US$500; second signatory over US$1,000 | in place | quarterly",
      "appetite": "Safeguarding, child data and fraud: very low. We avoid any activity we cannot make safe.\nFinance: low; reserve used only with board approval.\nNew programme ideas: moderate, piloted in two schools first.\nEscalation: residual 15 or more to the board each quarter; any safeguarding concern about staff, or any fraud suspicion, to the chair within 48 hours; data breaches to Achieng the same day."
     },
     "notice": "Notice the camp transport line uses two responses: transfer some risk through an insured operator, and reduce it with staff on every bus."
    },
    {
     "org": "social",
     "profile": {
      "register": "Largest client leaves | Lucía (wholesale) | reduce | two new office clients so none is above 30% of wholesale | June 2027 | monthly\nFlour prices | Lucía | reduce | quotes from two other suppliers; review bread prices | 30 November 2026 | each October\nFood safety incident | Lucía | reduce | daily checklist; oven thermostat repaired | in place | monthly\nTrainee injury | Lucía | reduce | buddy in week one; kitchen safety talk on day one | each cohort | each cohort\nOut-of-date trainee contracts | Diego | reduce | adviser checks the template | each November | yearly\nNo cash reserve | Diego | accept for now, then reduce | build towards three months of costs | December 2027 | monthly",
      "appetite": "Food safety and trainees' safety: very low. Production stops if the checklist fails.\nLegal and tax compliance: very low.\nCommercial risk (new clients, new products): moderate, if cash allows.\nEscalation: residual 12 or more to the monthly directors' meeting; any food safety incident or concern about a trainee's safety to both directors the same day; anything that could affect BIC status or the company's reputation to the advisory group."
     },
     "notice": "Notice 'accept for now' for the missing cash reserve: Pan del Barrio is honest that it cannot fix this yet and sets a date to revisit it."
    },
    {
     "org": "coop",
     "profile": {
      "register": "Late shop payments | Meera | reduce | payment terms in every agreement; pause orders at 45 days late | January 2027 | monthly\nYarn damage | Meera | reduce and transfer | roof repair; check insurance cover for stock | before May 2027 | each May\nNon-handloom sold as handloom | quality officer | avoid | no power-loom pieces bought or sold | in place | quarterly\nBiased yarn decisions | treasurer | reduce | declarations; member does not vote | in place | each meeting\nApprentices leave | apprentice lead (committee member) | reduce | ask leavers why; review the stipend | June 2027 | each intake",
      "appetite": "Members' fair and on-time payment: very low. If cash is short, the committee meets within a week.\nHonest handloom claims: none. We never sell power-loom goods.\nNew markets and designs: moderate.\nEscalation: residual 12 or more to the monthly committee; anything affecting members' payments or the audit to the president at once; serious risks reported to the general body each September."
     },
     "notice": "Notice the 'avoid' response: Vanita removes the handloom risk entirely by refusing to trade power-loom goods, in line with its positioning."
    },
    {
     "org": "hybrid",
     "profile": {
      "register": "Unsafe electrical sold | Priya | reduce and transfer | second sign-off tester trained; product liability insurance confirmed | March 2027 | monthly\nLease ends in 2028 | Tom | reduce | written request to the landlord; two other sites viewed | December 2026 | each trustee meeting\nToo few PAT testers | volunteer coordinator | reduce | two volunteers qualify | March 2027 | monthly\nFall in shop sales | shop manager | reduce | donations drive; monthly sales review | ongoing | monthly\nHarm to a pupil in schools | Tom | reduce | DBS checks; teacher present; school agreements | each September | each term\nRecharge not calculated | treasurer | reduce | quarterly recharge from now on | 30 November 2026 | quarterly",
      "appetite": "Electrical and product safety, safeguarding: very low. Any repairer can refuse an unsafe repair or sale.\nCharity law and the two entities' separation: low.\nNew services and partnerships: moderate.\nEscalation: residual 15 or more to trustees each quarter; any injury, unsafe item sold or safeguarding concern to the chair within 48 hours; company risks to the Riverside Reuse Ltd board."
     },
     "notice": "Notice two boards in the escalation rule: company risks go to the Riverside Reuse Ltd board, charity risks to trustees, so each board sees what it is responsible for."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "issue-risk-management"
  ],
  "video": null,
  "stage": "Review",
  "id": "risk-monitor",
  "part": "Risk management",
  "title": "Monitoring and reviewing risk",
  "sheet": "Risks",
  "learn": [
   "Risks change. Review the register regularly: high risks monthly, others quarterly, and the whole register with the board at least once or twice a year. Check whether actions were done, whether scores have moved and whether new risks have appeared.",
   "Use early warning signs: indicators that a risk is growing, such as cash falling below your threshold, more complaints or staff leaving. Link each risk to the objective, partner or task it threatens, so it is discussed in the meeting where that work is managed.",
   "When a risk happens, it becomes an issue: respond, then ask what the register missed. Over time, the register becomes a record of what your organisation has learned."
  ],
  "weak": "We update the risk register for the annual report.",
  "strong": "Vanita Weavers Cooperative Society: payment and stock risks checked at every monthly committee meeting; the full register each April with the budget; each risk linked to the objective it threatens; any shop more than 45 days late triggers a review of the cash risk.",
  "why": "It keeps risk on the agenda where decisions are made and uses clear signs to act early.",
  "reflect": "What early warning sign would tell you your biggest risk is growing?",
  "exercise": "Set your risk review routine and early warning indicators.",
  "fields": [
   {
    "key": "routine",
    "label": "Risk review routine",
    "hint": "Which risks, how often, by whom, reported to whom."
   },
   {
    "key": "warnings",
    "label": "Early warning indicators",
    "hint": "Risk | warning sign | threshold | who watches it."
   }
  ],
  "check": "Will you notice a growing risk before it becomes a crisis?",
  "gallery": {
   "title": "Five example risk review routines",
   "intro": "How each organisation keeps its register live and spots growing risks early.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "routine": "Safety risks (water, safeguarding): at the volunteer briefing before each planting day, by Sari and Wayan.\nAll risks: at the Sunday call once a month, by both co-founders, noted on the Drive page.\nWhole list: twice a year at the season review (April and October), with Ibu Made.\nAfter registration: the board sees risks scoring 10 or more each quarter, and the members' meeting hears a summary each April.",
      "warnings": "Water safety | high tide or storm forecast | any planting day forecast | Wayan\nSafeguarding | an adult volunteer without completed checks or training | any one | Sari\nSeedling survival | survival at 6 months | below two-thirds | Sari\nPond owner conflict | complaints to the village head | one complaint | Wayan\nVolunteer numbers | adults available for the next planting day | fewer than two | Sari"
     },
     "notice": "Notice the threshold of fewer than two adults: the early warning is the same as the two-adult rule, so it triggers a postponement, not a discussion."
    },
    {
     "org": "ngo",
     "profile": {
      "routine": "High risks (Foundation A, safeguarding, data): monthly at the all-staff meeting, by Achieng and Brian.\nAll risks: quarterly review before each board meeting, by Achieng, Brian and Grace.\nWhole register: the finance and safeguarding committee each quarter; the board in Q2 (with the audited accounts), with a deep dive on the top five.\nAfter any incident: Brian checks whether the register needs a new risk.",
      "warnings": "Foundation A gap | funding secured for next year | below 60% by June | Achieng\nCash | months of costs in the bank | below three months | Grace\nClub time | clubs cancelled in a term | more than two in any school | coordinators\nMentor retention | mentors missing two sessions in a row | three or more | Brian\nData | tablets without passcodes or not synced | any one | Brian"
     },
     "notice": "Notice the June threshold on Foundation A: setting a date and a percentage turns a vague worry into a point where the board must decide."
    },
    {
     "org": "social",
     "profile": {
      "routine": "Food safety and trainee safety: daily, through the opening checklist and the morning line-up.\nAll risks: monthly directors' meeting, with the register as a tab in the shared spreadsheet.\nWhole register: every two months with the advisory group; in July with the half-year accounts and the BIC decision.\nAfter any incident: added to the issue list and the register reviewed at the next weekly staff meeting.",
      "warnings": "Client concentration | largest client's share of wholesale | above 40% | Lucía\nLate payment | invoices unpaid after 15 days | any from the largest client | salesperson\nFlour costs | price per sack | rise of 10% or more since January | Lucía\nTrainee safety | minor kitchen injuries in a month | two or more | Lucía\nCompletion | trainees leaving before month three | two in one cohort | Diego"
     },
     "notice": "Notice the injury threshold of two a month: small incidents are counted, so a pattern shows before anyone is badly hurt."
    },
    {
     "org": "coop",
     "profile": {
      "routine": "Payment and stock risks: at every monthly committee meeting, by Meera and the treasurer.\nAll risks: quarterly by the committee.\nWhole register: each April with the budget and piece rates; a summary to the general body each September.\nAfter any incident: the issue register links to the risk, and the committee asks what the register missed.",
      "warnings": "Late shop payments | days since invoice | above 45 | accounts clerk\nCash for weavers | cash compared with the next two weeks of payments | below that amount | treasurer\nYarn store | damp or leaks before the monsoon | any sign in the May check | Meera\nQuality | rejection rate | above 10% in a month | quality officer\nApprentices | apprentices leaving early | two in one intake | apprentice lead"
     },
     "notice": "Notice how cash is compared with the next two weeks of weaver payments: the warning is tied to what members care about most, being paid on time."
    },
    {
     "org": "hybrid",
     "profile": {
      "routine": "High risks (product safety, lease, safeguarding): monthly by Tom and Priya, reported in the monthly shop and charity reports.\nAll risks: quarterly by the leadership team; company risks to the Riverside Reuse Ltd board.\nWhole register: trustees in Q3 each year, with a deep dive on the top five; a short update at every trustee meeting.\nAfter any incident: a no-blame review within two weeks, and the register updated.",
      "warnings": "Product safety | items returned faulty | any electrical | shop manager\nPAT capacity | trained testers on the rota for the next month | fewer than three | volunteer coordinator\nLease | months left with no agreement | 24 months before the end | Tom\nShop income | monthly sales against budget | 15% below for two months | shop manager\nVolunteers | fixers leaving | more than four in a quarter | volunteer coordinator"
     },
     "notice": "Notice the lease warning at 24 months: Riverside sets the trigger early enough to find and fit out a new site if talks fail."
    }
   ]
  }
 }),
 review("compliance-pack","Your Compliance & Risk Pack")
 ]
});
