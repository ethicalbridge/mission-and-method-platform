import {module,lesson,review} from './kit.js?v=c324e2a2c';
// Reviewed October 2026: plain explanation, optional table (anatomy), and a gallery showing how the five example
// organisations (course/examples.js; story in docs/example-organisations.md) complete each exercise.
export default module({
 ...{"uses":[1,3],"video":null,"id":4,"slug":"people-culture","phase":"Organise","title":"People, Culture & Volunteers","short":"Workforce planning, recruitment, contracts, onboarding, development, pay, culture, volunteers and leaving well","intro":"Structure says who does what; this module helps you find, support and keep the people who do it. Plan the mix of staff, contractors and volunteers, recruit fairly, start people well, help them grow, look after wellbeing and let people leave without losing what they know.","output":"People Plan","workbook":{"file":"Module-04-People-Culture-Volunteers.xlsx","title":"People, Culture & Volunteers workbook"},"promo":{"lesson":"checkins","tools":["people-check-ins-development","onboarding-compliance"],"headline":"Make good people practice a habit, not a memory","pitch":"Onboarding & Staff Compliance builds a role-based induction plan for each new person and tracks policy acknowledgements and training. People Check-Ins & Development keeps a running record of one-to-ones, commitments and development goals linked to your objectives."}},
 lessons:[
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Understand",
  "id": "workforce",
  "title": "Workforce planning",
  "sheet": "Workforce plan",
  "learn": [
   "Workforce planning matches the people you need to the work your strategy requires, over time. Start from the functions and roles you set out in Module 3 and ask, for each one: how much time does it need, what skills, and from when?",
   "Purpose-led organisations combine different contributors: employees, part-time staff, contractors, interns, volunteers, secondees and board members. Each brings different costs, commitment, management needs and legal implications. Volunteers are not free: they need recruiting, training, supervision and expenses.",
   "Take care with the line between employees and contractors, and between volunteers and unpaid workers. The rules differ by country, so confirm them locally. Do not rely on unpaid people for core, ongoing roles without weighing fairness and legal risk.",
   "Plan for growth and for gaps. Which roles must be filled first? Which could be shared with partners? Who would cover if a key person left suddenly?"
  ],
  "weak": "We will hire when we get funding.",
  "strong": "Riverside Repair Hub: workshop lead Priya (full-time) helps two experienced volunteers qualify as PAT testers by March; in year two, if shop turnover grows, a part-time shop assistant (0.6) employed by the trading company, instead of relying on volunteers for core shop shifts.",
  "why": "It states the type, time and timing of each role, links growth to income and deals with a single point of failure.",
  "reflect": "Which role, if vacant for three months, would stop your work?",
  "exercise": "Draft a workforce plan for the next one to two years.",
  "fields": [
   {
    "key": "plan",
    "label": "Workforce plan",
    "hint": "Role | type (employee, contractor, volunteer, intern) | time | when needed | cost or support needed."
   },
   {
    "key": "continuity",
    "label": "Continuity risks",
    "hint": "Single points of failure and how you would cover them."
   }
  ],
  "check": "Does your plan include the support costs of volunteers and contractors, not only salaries?",
  "anatomy": {
   "title": "Who does the work",
   "intro": "Each type of contributor brings something different and needs something different from you.",
   "cols": [
    "Contributor",
    "What they bring",
    "What they need from you"
   ],
   "rows": [
    [
     "Employee",
     "Steady time and commitment to core, ongoing work",
     "A contract, pay, management and development"
    ],
    [
     "Contractor or freelancer",
     "Specialist skills for a defined task",
     "A services agreement with deliverables and fees"
    ],
    [
     "Intern or placement student",
     "Fresh skills while they learn",
     "A learning plan, supervision and clear terms"
    ],
    [
     "Volunteer",
     "Time, local knowledge and trust",
     "A role description, training, supervision and expenses"
    ],
    [
     "Board member",
     "Oversight, judgement and networks",
     "An induction, good papers and a clear role"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example workforce plans",
   "intro": "Each organisation plans its people for the next one to two years and names its continuity risks.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "plan": "Wayan and Sari | unpaid co-founders | 2 days a week each | now | roles agreed in writing\nAdult volunteers | volunteers | one planting day a month | 4 now; 6 by year two | safeguarding training, boots, transport\nIbu Made | volunteer, future treasurer | 2 hours a month | now | cash book template\nYouth team leaders (16–17) | young volunteers, parental consent | planting days | year two | leader training; two adults always present\nBoat | hired from a local fisher | 10 days a year | planting season | about US$1,200 a year\nPart-time coordinator | employee | 2 days a week | year two, only if funded | pay, a contract",
      "continuity": "Sari is the only safeguarding focal person and the only one who knows the survival monitoring method; Wayan will take the same training and co-run the next two monitoring rounds. If either co-founder is away, a planting day is postponed, never run with fewer than two adults. The boat depends on one fisher; we will ask a second family."
     },
     "notice": "Notice that unpaid founders and the boat supplier are part of the plan. Copy the rule that work pauses rather than running unsafely when people are missing."
    },
    {
     "org": "ngo",
     "profile": {
      "plan": "Director (Achieng), programme manager (Brian), finance officer (Grace) | employees | full-time | now | salaries from grants\n3 club coordinators | employees | full-time, 4–5 schools each | now; one post to fill in January | salaries, travel to schools\n25 volunteer mentors | volunteers | one club visit a fortnight in term | now | transport stipends (US$9,000 a year), training, supervision\nData consultant | contractor | 10 days | first half of next year | MEAL budget (ISO3)\nFundraising and partnerships officer | employee | half-time | next year, if the board agrees to use part of the reserve | about US$6,000 a year (ISO1)",
      "continuity": "Grace is the only person who runs payroll and the accounts; Achieng gets read-only access and the treasurer reviews monthly reports. Achieng holds the Foundation A relationship; Brian now joins every funder call. The coordinator leaving in January hands over school contacts and club registers, and Brian covers her schools until the new coordinator starts."
     },
     "notice": "Notice how a planned vacancy and a funding gap shape the plan. Copy the habit of putting volunteer support costs, like mentors' transport, next to salaries."
    },
    {
     "org": "social",
     "profile": {
      "plan": "Lucía (master baker) and Diego (training and mentoring) | employees and shareholders | full-time | now | salaries\nCafé supervisor | employee | full-time | now | salary; learning to be back-up mentor\nWholesale salesperson | employee | full-time | now | salary\n6 trainees per cohort | employees on 6-month apprenticeship contracts | full-time shifts | March and September cohorts | minimum wage, health insurance, certificate fee\nAccountant | contractor | monthly books and taxes | now | monthly fee\nJunior baker (a graduate) | employee | full-time | year two, if sales grow | salary; shares Lucía's production load",
      "continuity": "Lucía is the only person who can run production and prepare trainees for the certificate; a junior baker in year two would share that. Diego is the only mentor, so the café supervisor is learning to run weekly check-ins. One office client is 40% of wholesale; losing it would put the salesperson's role at risk."
     },
     "notice": "See how trainees are listed as employees with fixed start and end dates. Copy the way each continuity risk names who is being prepared to cover it."
    },
    {
     "org": "coop",
     "profile": {
      "plan": "Manager (Meera), quality officer, designer, accounts clerk | employees | full-time | now | salaries from sales margin\n140 member weavers | members paid per piece, not employees | own looms, own hours | now | yarn, quality feedback, payment within 15 days\nCommittee of nine | elected members, unpaid | monthly meeting | now | travel costs; induction after each election\nMaster weavers training apprentices | members paid a fee per apprentice | 6 months per intake | June and December | small training budget\nOnline sales assistant | employee | half-time | next year (ISO1) | about US$1,200 a year, from online sales growth",
      "continuity": "Meera holds every buyer and marketplace relationship; the designer will join buyer calls and hold a second marketplace login. Only the accounts clerk knows the cooperative software; the treasurer will learn the monthly routine. Staff plan leave outside the six weeks before the festival season."
     },
     "notice": "Notice that members, committee and apprentices are each described in their own terms, not as staff. Copy the clarity about who is and is not an employee."
    },
    {
     "org": "hybrid",
     "profile": {
      "plan": "Director (Tom), volunteer coordinator, schools officer | charity employees | full-time, 0.8, 0.8 | now | salaries; DBS check for schools work\nWorkshop lead (Priya) | charity employee; 20% of her time recharged to the trading company | full-time | now | salary\nShop manager | employee of Riverside Reuse Ltd | full-time | now | salary from shop income\n40 volunteers | volunteers | 3 hours a week to 3 hours a month | now | training, PAT sign-off, expenses, coordinator time\nShop assistant | employee of Riverside Reuse Ltd | 0.6 | year two, if shop turnover grows | salary from shop income\nAccountant | contractor | year-end accounts, both entities | yearly | fee",
      "continuity": "Priya is the only person who can sign off volunteers for electrical repairs; two experienced volunteers will qualify as PAT testers by March. Tom sits on both boards and signs the cost-sharing agreement; the chair, Helen, holds copies, and payments need two signatories. The schools officer leaves in July; the role is advertised in April so the new person can shadow the last two weeks of term."
     },
     "notice": "Notice that each role says which entity employs it. Copy the move to a paid shop assistant rather than quietly stretching volunteers to cover core shifts."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "recruitment",
  "title": "Recruitment and fair selection",
  "sheet": "Recruitment",
  "learn": [
   "Recruitment starts with the role description from Module 3. Turn it into an advert that explains the purpose, main tasks, essential and desirable criteria, pay and conditions, and how to apply. Use plain language and drop requirements that exclude people without good reason, such as degrees the work does not need.",
   "Advertise where the people you want actually look, including community networks and channels that reach under-represented groups. Be open about pay, and offer reasonable adjustments to applicants who need them.",
   "Assess fairly. Agree the criteria and a simple scoring guide before you read applications, ask every candidate the same questions, involve at least two people and note the reasons for each decision. A short practical task often shows more than an interview alone.",
   "If the role involves children or vulnerable adults, add safer recruitment steps: identity checks, references, background checks where they are available and lawful, and safeguarding questions at interview. Make offers in writing and keep records in line with your data protection rules."
  ],
  "weak": "We hired a friend of the founder because we trust them.",
  "strong": "Riverside Repair Hub, schools officer: advert shared with 12 partner schools and two community networks; shortlist scored against five criteria by Tom and a trustee; candidates run a 15-minute repair activity with volunteers playing pupils; references and a DBS check completed before the first school visit.",
  "why": "It is consistent, documented and matched to the safeguarding risk of working in schools.",
  "reflect": "Who might be well suited to your roles but never see your adverts?",
  "exercise": "Design the recruitment process for your next role.",
  "fields": [
   {
    "key": "role",
    "label": "Role and criteria",
    "hint": "Role title, essential criteria, desirable criteria, pay range."
   },
   {
    "key": "process",
    "label": "Selection process",
    "hint": "Where you advertise, stages, panel, scoring, practical task and checks."
   },
   {
    "key": "safer",
    "label": "Safer recruitment steps",
    "hint": "Which checks apply to this role, and who completes them?"
   }
  ],
  "check": "Would every candidate be assessed against the same criteria by more than one person?",
  "gallery": {
   "title": "Five example recruitment processes",
   "intro": "Each organisation designs the process for the next role it needs to fill.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "role": "Volunteer planting day helper (two more adults). Essential: lives in or near the two villages; comfortable in mud and shallow water; patient with 12–17-year-olds; can give one Saturday a month. Desirable: speaks to parents in Balinese; first aid; boat experience. Unpaid; transport and a meal covered on planting days.",
      "process": "Shared at the village notice boards, through the school and by word of mouth via the village heads. Stages: short conversation with Wayan and Sari together, the same four questions for everyone; checks (below); one planting day as an observer beside a co-founder; decision by both co-founders. We note why we said yes or no in the shared Drive.",
      "safer": "Working with children, so: see an ID card; two references, one from outside the family (Ibu Made or a village head can be one); a police certificate if we can confirm locally that one is available and lawful for volunteers; safeguarding questions in the conversation. Sari, as safeguarding focal person, completes and records the checks before anyone helps with young people."
     },
     "notice": "Notice how a tiny group still uses the same questions and two decision-makers. Copy the honest note on background checks: confirm locally what is available rather than assuming."
    },
    {
     "org": "ngo",
     "profile": {
      "role": "Club coordinator, four schools in one sub-county, starting in January. Essential: experience running practical activities with children aged 10–14; speaks Kiswahili and English, Dholuo an advantage; can travel between schools; organised record-keeper. Desirable: science or teaching background; experience with mentoring programmes. Salary range shown in the advert (band 1).",
      "process": "Advertised on the website, through both partner universities, a women in science network and WhatsApp to mentors. Shortlist scored by Brian and Achieng against five criteria agreed in advance. Interview with the same six questions; a practical task: run a 20-minute experiment with the panel and two mentors playing the class (no children until checks are complete). Board safeguarding lead joins the final interview.",
      "safer": "ID check; two references, one from a recent employer, asked directly about conduct with children; a police clearance certificate before start; safeguarding scenario question at interview; signed code of conduct. Grace keeps the records on the restricted drive; Brian confirms all checks are complete before the first club."
     },
     "notice": "Look at the practical task: realistic, but with adults playing the class. Copy the step where someone confirms all checks before the first session, not after."
    },
    {
     "org": "social",
     "profile": {
      "role": "Apprentice baker, March cohort (six places). Essential: aged 18–24; left school early; available for early shifts for six months; wants to learn the trade. Desirable: none, on purpose; no experience or school certificate needed. Paid apprenticeship at the minimum wage, with health insurance, on a fixed six-month contract.",
      "process": "Referrals from the municipal youth employment programme plus posters in the café and Instagram. Stages: information session at the bakery; short conversation with Diego and the café supervisor using the same five questions; a paid half-day trial shift scored on reliability, teamwork and willingness to learn. Lucía and Diego decide together and give everyone feedback, including those not selected.",
      "safer": "Trainees are adults, so standard checks: ID and proof of age; one reference (a teacher, youth worker or past employer); any health requirements for food handlers under our municipal health licence, confirmed with the municipality. Diego completes and files the checks in the trainee spreadsheet."
     },
     "notice": "Notice how the criteria remove barriers on purpose: no experience, no certificate. Copy the paid trial shift, which tests what matters and respects people's time."
    },
    {
     "org": "coop",
     "profile": {
      "role": "Online sales assistant (half-time, new role for ISO1). Essential: written English and Malayalam; comfortable with marketplaces, product listings and customer messages; careful with orders and records. Desirable: from a weaving family; photography basics. Pay range in the advert, set by the committee.",
      "process": "Shared in the village WhatsApp groups, with the design school and at the district employment office. Members' children and relatives may apply and are assessed exactly like everyone else. Shortlist scored by Meera and two committee members; any committee member related to an applicant steps out. Task: write two listings from photos of real saris and reply to a sample buyer complaint.",
      "safer": "No work with children or vulnerable adults, so ID, one reference and confirmation of qualifications. The role handles buyers' personal data, so a confidentiality clause and data training in week one. Meera completes the checks; the accounts clerk files them."
     },
     "notice": "Notice the conflict-of-interest rule for relatives in a member-owned organisation. Copy the way safer recruitment is kept proportionate: lighter checks where the risk is lower."
    },
    {
     "org": "hybrid",
     "profile": {
      "role": "Schools officer (0.8), replacing the current officer who leaves in July. Essential: experience leading practical sessions with children; confident with basic tools and safety; organised with bookings. Desirable: links with Leeds schools; teaching or youth work background. Salary range in the advert, at least the voluntary Real Living Wage.",
      "process": "Advertised in April on the website and local job boards, shared with 12 partner schools, the volunteer newsletter and two community networks. Shortlist scored against five criteria by Tom and the trustee who is a schools governor. Interview with set questions; practical task: run a 15-minute repair activity with two volunteers playing pupils. Feedback offered to every interviewed candidate.",
      "safer": "References asked about conduct with children; the level of DBS check the role is eligible for; ID and right-to-work checks; safeguarding questions at interview. The volunteer coordinator runs the checks; Tom confirms before the first school visit."
     },
     "notice": "Notice that recruiting in April allows a handover before July. Copy how a trustee with relevant experience joins the panel without running the process."
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
  "title": "Contracts and terms",
  "sheet": "Contracts checklist",
  "learn": [
   "Every working relationship needs written terms that suit its type. Employees need an employment contract or written statement. Contractors need a services agreement. Interns and volunteers need an agreement that sets out the role, support and expectations without accidentally creating an employment relationship.",
   "Typical contents are the parties, role, start date, place and hours, pay or expenses, leave, probation, confidentiality, data protection, ownership of work, conduct and policies, notice and ending. Volunteer agreements are simpler and avoid the language of obligation and pay.",
   "Employment law is national and sometimes regional, so rules differ by country; confirm locally. Use templates only as a starting point and have them checked by a qualified local adviser. Keep signed copies securely, track probation and renewal dates, and update terms when a role changes. Module 10 covers your wider legal framework."
  ],
  "weak": "We agreed everything verbally.",
  "strong": "Pan del Barrio: each trainee signs a six-month apprenticeship contract checked by a local employment adviser, with pay, hours, health insurance and the training plan; end dates for each cohort sit in Diego's calendar with a review one month before.",
  "why": "Each relationship has written terms that suit its type, checked locally, and the key dates are tracked by a named person.",
  "reflect": "Which current working relationship has the least clear terms?",
  "exercise": "List each type of working relationship you have and the terms it needs.",
  "fields": [
   {
    "key": "types",
    "label": "Relationships and terms",
    "hint": "Type (employee, contractor, intern, volunteer) | agreement used | key clauses | reviewed by an adviser?"
   },
   {
    "key": "dates",
    "label": "Dates to track",
    "hint": "Probation, renewals, contract end dates and who tracks them."
   }
  ],
  "check": "Does every working relationship have written terms suited to its type?",
  "anatomy": {
   "title": "Matching terms to the relationship",
   "intro": "Different relationships need different documents. Getting the type wrong is a common risk.",
   "cols": [
    "Relationship",
    "Usual document",
    "Watch for"
   ],
   "rows": [
    [
     "Employee",
     "Employment contract or written statement",
     "Local minimum terms, probation, notice; check with a local adviser"
    ],
    [
     "Contractor or freelancer",
     "Services agreement",
     "Real independence; deliverables, fees, ownership of work"
    ],
    [
     "Intern or placement",
     "Placement or learning agreement",
     "Learning focus; whether pay is required locally"
    ],
    [
     "Volunteer",
     "Volunteer agreement or role description",
     "No obligation or pay language; expenses only"
    ],
    [
     "Member paid per piece",
     "Rules or a supply agreement",
     "Piece rates, payment terms, quality standards"
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example contract maps",
   "intro": "Each organisation lists its working relationships, the terms each needs and the dates it must track.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "types": "Co-founders (unpaid) | founders' agreement, one page | roles, time each gives, spending over US$100 needs both, what happens if one leaves | to review with the notary at registration\nAdult volunteers | volunteer agreement | role, support, expenses, safeguarding code, photo consent rules | no; adapted from a template, no obligation or pay language\nYouth team leaders (16–17) | volunteer agreement plus parental consent form | role, supervision, two adults present | will ask local advice before year two\nBoat owner | simple hire agreement | dates, fee, life jackets, who is responsible on the water | no",
      "dates": "Parental consent forms renewed each school year (Sari). Volunteer agreements and safeguarding training reviewed every 12 months (Sari). Boat agreement renewed each October, before the planting season (Wayan). Founders' agreement reviewed at registration."
     },
     "notice": "Notice that even unpaid co-founders write down how they decide and what happens if one leaves. Copy the plan to seek advice before taking on 16–17-year-old leaders."
    },
    {
     "org": "ngo",
     "profile": {
      "types": "Staff (6) | employment contract | role, salary, hours, leave, probation, safeguarding code, data protection, notice | yes, template reviewed by an employment lawyer the board recommended\nVolunteer mentors (25) | mentor agreement | one year, fortnightly club visits, transport stipend, training, conduct and safeguarding code | yes, checked that the stipend is expenses, not pay\nData consultant | services agreement | deliverables, 10 days, fee, data confidentiality, who owns the tool | yes\nUniversity placement students | placement agreement with the university | learning goals, supervisor, no pay | partly; the university's template",
      "dates": "Probation reviews at three months (Brian for coordinators; Achieng for Brian and Grace). Mentor agreements renew each January (Brian). Consultant agreement ends in June (Grace). Grace keeps a contracts tracker on the restricted drive; the finance and safeguarding committee sees it twice a year."
     },
     "notice": "Look at the check that mentors' stipends cover expenses, not pay. Copy the tracker seen by a board committee, so dates do not depend on one person's memory."
    },
    {
     "org": "social",
     "profile": {
      "types": "Permanent staff (Lucía, Diego, café supervisor, salesperson) | employment contract | role, salary, hours and shifts, leave, health insurance, notice | yes, local employment adviser\nTrainees (6 per cohort) | apprenticeship contract, fixed six months | minimum wage, shifts, health insurance, training plan, certificate, mentoring, end date | yes, adviser checks the template each year\nAccountant | services agreement | monthly books, tax returns, fee, confidentiality | yes\nLucía and Diego as shareholders | shareholders' agreement (separate from their employment) | shares, decisions, exit | yes",
      "dates": "Cohort end dates: 30 June and 31 December, reviewed one month before (Diego). Trial periods for new permanent staff (Lucía). Health insurance enrolment within the first week (accountant). Contract template review each January before the March cohort (Diego with the adviser)."
     },
     "notice": "Notice that trainees are employees with fixed-term contracts, not interns. Copy the separation between Lucía and Diego's employment contracts and their shareholders' agreement."
    },
    {
     "org": "coop",
     "profile": {
      "types": "Staff (4) | employment contract | role, salary, hours, leave, confidentiality, notice | yes, a local adviser recommended by the cooperative department\nMember weavers (140) | by-laws plus a member supply agreement | piece rates, quality standards, payment within 15 days, bonus rules; members are not employees | yes, checked against the by-laws\nApprentice weavers | apprentice agreement with the cooperative and master weaver | six months, training fee to master weaver, stipend for materials | partly; to confirm\nPhotographer | services agreement | shoots, fee, who owns photos, weaver consent | no, to do",
      "dates": "Piece rates reviewed each April by the committee (secretary). Apprentice intakes in June and December (quality officer). Staff probation and annual reviews (Meera, with the president for Meera's own review). Photographer agreement before the next collection shoot (designer)."
     },
     "notice": "See how members are covered by by-laws and a supply agreement, not employment contracts. Copy the honest 'to confirm' and 'to do' notes where terms are not yet checked."
    },
    {
     "org": "hybrid",
     "profile": {
      "types": "Charity staff (4) | employment contract with the charity | role, salary, hours, leave, pension, policies, notice | yes, employment adviser\nShop manager | employment contract with Riverside Reuse Ltd | as above, plus trading company policies | yes\nVolunteers (40) | role description and volunteer agreement | support, expenses policy, PAT sign-off for repairers, DBS for schools | yes, wording avoids obligation\nCharity and trading company | cost-sharing agreement | Priya's time, shared premises, recharges | yes, accountant\nExternal accountant | engagement letter | both sets of accounts, fee | yes",
      "dates": "Probation reviews at six months (Tom). Schools officer's notice and July end date (Tom). Cost-sharing agreement reviewed each year before the profit transfer (treasurer). Volunteer DBS checks renewed in line with policy (volunteer coordinator). Lease end in 2028 noted on the same tracker."
     },
     "notice": "Notice that each staff member's employer, charity or company, is written into their contract. Copy the yearly review of the agreement between the two entities."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "onboarding-compliance"
  ],
  "video": null,
  "stage": "Implement",
  "id": "onboarding",
  "title": "Onboarding",
  "sheet": [
   "Hires",
   "Steps"
  ],
  "learn": [
   "Onboarding helps a new person understand the mission, their role, the safeguards and the practical ways of working. Giving someone access to a folder is only one small part of it.",
   "Plan the first day, the first week and the first month. Include a buddy, essential training, policy sign-offs, access checks and an early, useful task. Check understanding rather than only recording that a document was sent.",
   "Build one standard template for every new person (welcome, equipment, accounts, core policies, safeguarding, data protection, values) and add steps for each role. Track completion, and ask each newcomer what was missing so the template improves.",
   "Culture is set from the first day by everyday behaviour: how concerns are heard, how mistakes are discussed and how workloads are agreed. Link these habits to your values."
  ],
  "weak": "Read all our documents.",
  "strong": "Imara Girls in Science: in week one, a new mentor shadows two clubs with a buddy mentor and practises, with Brian, what to do if a girl discloses a concern, before ever leading a group.",
  "why": "It tests the capability that matters most, with support, before the person works alone.",
  "reflect": "What would a newcomer be afraid to ask?",
  "exercise": "Create a proportionate 30-day onboarding plan.",
  "fields": [
   {
    "key": "onboarding",
    "label": "Onboarding plan",
    "hint": "When | action | supporting role | evidence of readiness."
   },
   {
    "key": "culture",
    "label": "Working agreements",
    "hint": "How people raise concerns, get support and discuss mistakes."
   }
  ],
  "check": "Will a new person know where to get help before working alone?",
  "gallery": {
   "title": "Five example onboarding plans",
   "intro": "Each organisation plans the first 30 days for a new person in one role.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "onboarding": "Before first day | agreement signed, checks complete, added to WhatsApp group | Sari | checks recorded in the Drive\nFirst planting day | walk the site, tides and boat safety, the two-adult rule | Wayan as buddy | can explain the rule back\nWeek 2 | safeguarding session: consent, photos, what to do with a concern | Sari | answers three scenarios correctly\nWeek 3 | learn the survival monitoring sheet | Sari | fills one sheet that matches Sari's\nDay 30 | short chat: what was unclear, what to add | both co-founders | notes added to the template",
      "culture": "Anyone, including the youngest, can stop an activity if it feels unsafe, without being questioned in the moment. Concerns about a child go straight to Sari, or to Wayan if Sari is involved. After each planting day we share one thing that went well and one we would change; mistakes are discussed as 'what happened', never 'who did it'."
     },
     "notice": "Notice how each step has proof of readiness, like a monitoring sheet that matches Sari's. Copy the right of anyone, even a young person, to stop an unsafe activity."
    },
    {
     "org": "ngo",
     "profile": {
      "onboarding": "Before first day | mentor agreement, checks, code of conduct signed | Brian | file complete\nWeek 1 | welcome, mission, girls' advisory group, how clubs run | Brian | can describe a club session plan\nWeek 1 | safeguarding training and disclosure role play | Brian with the safeguarding lead | role play passed\nWeeks 1–2 | shadow two clubs with a buddy mentor | experienced mentor | buddy confirms ready\nWeek 3 | co-lead one club activity | club coordinator | coordinator's feedback note\nDay 30 | check-in: support, travel, what was missing | Brian | template updated",
      "culture": "Mentors raise worries about a girl the same day, by phone to the coordinator; nobody is criticised for raising a concern that turns out to be nothing. Monthly mentor circle to share what went wrong in a club and what we learned. Mentors may say no to an extra session without explaining why."
     },
     "notice": "Notice the gap between training and leading alone: shadowing and co-leading come first. Copy the promise that raising a false alarm is never criticised."
    },
    {
     "org": "social",
     "profile": {
      "onboarding": "Day 1 | welcome, tour, uniform, contract and insurance explained, food safety basics | Diego | can explain the hand-washing and allergen rules\nWeek 1 | early shifts beside the café supervisor, who acts as buddy | café supervisor | buddy's checklist signed\nWeek 1 | first weekly check-in with Diego | Diego | personal goals written down\nWeeks 2–3 | one basic bread from start to finish | Lucía | batch passes quality check\nWeek 4 | first café shift serving customers | café supervisor | supervisor's feedback\nDay 30 | review: what was hard, what to change | Diego | notes in trainee spreadsheet",
      "culture": "Second chances with clear expectations: lateness is talked about privately the same day, never in front of others. Burnt batches are discussed at the weekly staff meeting as learning, not blame. Trainees can ask any question at check-ins, including about pay and their contract."
     },
     "notice": "Notice the early useful task: a real loaf that must pass a quality check. Copy how the value 'second chances with clear expectations' becomes a rule about lateness."
    },
    {
     "org": "coop",
     "profile": {
      "onboarding": "Week 1 | welcome by the president, cooperative by-laws and members' rights, payment and bonus rules | Sreeja and Meera | can explain how payment is calculated\nWeek 1 | paired with a master weaver; loom set-up | master weaver | warps a loom correctly\nWeeks 2–3 | quality standards and the piece register | quality officer | first sample passes check\nWeek 3 | joins village WhatsApp group; meets other apprentices | secretary | introduced at village meeting\nDay 30 | review with the quality officer and the master weaver | quality officer | apprentice's feedback recorded",
      "culture": "Rejected pieces are explained with the weaver, face to face, with how to fix them; never announced in groups. Any member can ask to see the accounts. Apprentices can raise concerns with the quality officer or any committee member, not only their master weaver."
     },
     "notice": "Notice that a new apprentice learns their rights as a future member, not only the craft. Copy the second route for concerns, beyond the person who trains them."
    },
    {
     "org": "hybrid",
     "profile": {
      "onboarding": "Before first day | role description, references, DBS if schools work | volunteer coordinator | record complete in database\nFirst session | welcome, tour, fire exits, tool rules, expenses | volunteer coordinator | completes induction checklist\nWeeks 1–2 | fixes non-electrical items beside an experienced repairer | buddy volunteer | buddy's sign-off\nWeeks 2–4 | electrical safety (PAT) training | Priya | passes PAT assessment before any electrical repair\nDay 30 | coffee and feedback | volunteer coordinator | induction template updated",
      "culture": "'Fix first' includes our own mistakes: a monthly volunteer meeting reviews any repair that failed or any near miss, without blame. If a volunteer is unsure about an electrical item, they stop and ask Priya. Shifts are offered, never assigned; saying no is fine."
     },
     "notice": "Notice that electrical repairs wait until the PAT assessment is passed. Copy the near-miss review: it turns safety into a shared habit, not a rule on a wall."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "people-check-ins-development"
  ],
  "video": null,
  "stage": "Manage",
  "id": "checkins",
  "title": "Check-ins, performance and development",
  "sheet": [
   "People",
   "Check-ins",
   "Goals"
  ],
  "learn": [
   "Short, regular check-ins between a person and their manager do more for performance than an annual appraisal on its own. Cover wins, blockers, priorities, feedback in both directions and next steps, and note what each of you agreed to do.",
   "Link each person's objectives to the organisation's objectives and annual plan, so they can see how their work contributes. Keep personal objectives few and clear, and separate from organisational KPIs and programme indicators.",
   "Development is part of performance. Agree one or two development goals per person: a skill, an experience or a course. In small organisations, stretch tasks, peer learning and exchanges with partners are often more realistic than formal training.",
   "Keep wellbeing conversations apart from performance judgements and pay decisions. If performance is a concern, raise it early, privately and fairly, with clear expectations, support and a timescale, following a written procedure."
  ],
  "weak": "Annual review if there is time.",
  "strong": "Vanita Weavers: Meera has a 30-minute check-in with each staff member every fortnight; objectives are reviewed each quarter against the annual plan, including the online sales target; each person has one development goal; the committee president holds Meera's own review.",
  "why": "It is regular, linked to strategy, includes development and makes clear who reviews the manager.",
  "reflect": "When did each person in your team last receive useful feedback?",
  "exercise": "Design your check-in rhythm and draft objectives and a development goal for one role.",
  "fields": [
   {
    "key": "rhythm",
    "label": "Check-in and review rhythm",
    "hint": "Frequency, format, what is covered and how it is recorded."
   },
   {
    "key": "objectives",
    "label": "Example objectives and development goal",
    "hint": "For one role: two or three objectives linked to organisational objectives, and one development goal."
   },
   {
    "key": "concerns",
    "label": "Handling performance concerns",
    "hint": "Steps, support and who decides."
   }
  ],
  "check": "Are individual objectives linked to organisational priorities and kept separate from wellbeing conversations?",
  "anatomy": {
   "title": "Three conversations, kept apart",
   "intro": "Mixing these conversations makes people less open in all of them.",
   "cols": [
    "Conversation",
    "Purpose",
    "How often"
   ],
   "rows": [
    [
     "Check-in",
     "Priorities, blockers, feedback both ways, next steps",
     "Weekly to monthly, short"
    ],
    [
     "Objectives and development review",
     "Progress on objectives; one or two development goals",
     "Quarterly or twice a year"
    ],
    [
     "Wellbeing conversation",
     "Workload, stress, support; no judgement on performance",
     "Whenever needed; offered regularly"
    ]
   ],
   "after": 3
  },
  "gallery": {
   "title": "Five example check-in and review plans",
   "intro": "Each organisation sets its rhythm, writes objectives for one role and decides how it handles concerns.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "rhythm": "Wayan and Sari: a 30-minute call every two weeks on what is working, what is stuck and who does what next; notes in the shared Drive. Volunteers: a 10-minute circle after each planting day and a one-to-one chat with a co-founder every three months.",
      "objectives": "Role: Sari, co-founder. 1. Record survival at 6 and 12 months for every planted area (ESO1). 2. Train all adult volunteers in safeguarding before the rainy season (ISO2). 3. Draft the association's rules with the notary (ISO1). Development goal: complete a safeguarding focal person course, and train Wayan as back-up.",
      "concerns": "Between co-founders: raise it at the next call, not over WhatsApp; if still stuck, ask Ibu Made to help us talk it through. For a volunteer: a private conversation with both co-founders, a clear expectation and a month to adjust. A safeguarding breach is not a performance issue: the volunteer stops at once while Sari follows the safeguarding procedure."
     },
     "notice": "Notice that co-founders hold each other to objectives too. Copy the line that separates a safeguarding breach from ordinary performance concerns."
    },
    {
     "org": "ngo",
     "profile": {
      "rhythm": "Fortnightly 30-minute one-to-ones (Brian with coordinators; Achieng with Brian and Grace), using a shared template: wins, blockers, priorities, feedback both ways. Quarterly objectives review. Annual appraisal in November that summarises the year, with no surprises. Mentors: a termly chat with their coordinator.",
      "objectives": "Role: club coordinator. 1. Keep average attendance in my four clubs at 80% or more (ESO1). 2. Run the pre and post confidence survey in all four clubs on time (ISO3). 3. Hold one parent session per school each term (ESO1). Development goal: lead one teacher workshop with Brian by June.",
      "concerns": "Raise early in a one-to-one; agree what good looks like, the support offered and a review in six weeks; written down and shared. If no improvement, Achieng follows the written capability procedure, with HR advice where needed. Final decisions on dismissal sit with Achieng, with a right to appeal to the board chair."
     },
     "notice": "Look at how each objective names the organisational objective it serves. Copy the appeal route to the chair, which makes the process fairer in a small team."
    },
    {
     "org": "social",
     "profile": {
      "rhythm": "Trainees: weekly 20-minute check-in with Diego (skills progress, attendance, goals, any worries), notes in the trainee spreadsheet; reviews at month two and month four against the certificate checklist. Staff: monthly one-to-one with Lucía. Weekly staff meeting for production and team issues.",
      "objectives": "Role: trainee baker. 1. Make five core breads to the café's quality standard by month four (ESO1). 2. Arrive on time for 95% of shifts (ESO1, reliability). 3. Pass the certificate assessment in month six. Development goal: shadow two days at an employer partner's bakery before graduation.",
      "concerns": "Raised at the weekly check-in first, with a clear expectation and support (such as a shift change for a caring duty). If it continues, a written plan with a two-week review. Lucía and Diego decide together on any formal step, following the contract and taking local employment advice before ending a contract early."
     },
     "notice": "Notice how trainee objectives are the steps to a job, not only bakery tasks. Copy the practical support, like a shift change, before any formal step."
    },
    {
     "org": "coop",
     "profile": {
      "rhythm": "Staff: fortnightly 30-minute check-in with Meera; quarterly objectives review against the annual plan. Meera: monthly check-in with president Sreeja and an annual review by the committee. Members are not staff: quality feedback happens piece by piece, and committee meetings review the cooperative's results.",
      "objectives": "Role: designer. 1. Launch two collections this year with at least 30 members weaving them (ESO1). 2. Photograph and list every new design online within a month of launch (ISO1). 3. Run one design workshop in each village (ESO1). Development goal: a short course in natural dyeing, to prepare for the dye unit (ISO3).",
      "concerns": "For staff: Meera raises it in a check-in, agrees expectations and support, and reviews after a month; formal steps follow the written procedure, with decisions by the committee. Concerns about Meera go to the president. Quality issues with a member's work go through quality feedback and the by-laws, not staff procedures."
     },
     "notice": "Notice that members' quality is handled through the by-laws, not a performance process. Copy the clear route for concerns about the manager."
    },
    {
     "org": "hybrid",
     "profile": {
      "rhythm": "Staff: fortnightly one-to-ones with Tom (Priya also meets the shop manager weekly); quarterly objectives review; annual review in March before the budget. Tom: quarterly review with the chair, Helen. Volunteers: a check-in with the volunteer coordinator after three months, then yearly.",
      "objectives": "Role: volunteer coordinator. 1. Keep at least 30 active volunteers each month (ESO1). 2. Make sure every repairer has a current PAT sign-off (ISO3). 3. Recruit eight volunteers from housing association estates (ESO1, low-income reach). Development goal: complete a volunteer management course this year.",
      "concerns": "Early, private conversation; agreed expectations, support and a review date; recorded. Then the written capability procedure, with HR advice. Tom decides for staff; the chair decides for Tom. For volunteers: a conversation about fit, a change of role or, if needed, ending the role, following the volunteer policy."
     },
     "notice": "Notice the different routes for staff and volunteers. Copy the objective on reaching low-income residents: it ties one person's work to the charity's strategy."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "pay",
  "title": "Pay, careers and recognition",
  "sheet": "Pay and careers",
  "learn": [
   "Pay is one of the clearest signs of your values. Decide your principles: how you set salaries (market comparisons, a living-wage commitment, fairness inside the team), the gap between highest and lowest pay, and how increases are decided. Write them down and apply them to everyone.",
   "A simple pay framework groups roles into bands, each with a range, and explains how people move within and between bands. This stops one-off negotiations from creating unfair gaps, including gender pay gaps.",
   "In small organisations, career progress rarely means a promotion every year. Describe other routes: more responsibility, specialising, leading a project, representing the organisation, or a planned move to a partner.",
   "Recognition costs little and matters a lot: specific thanks, celebrating milestones, sharing credit in public and acting on suggestions. Benefits such as flexible hours, learning time and wellbeing support can be valued as much as salary."
  ],
  "weak": "We pay whatever we can afford for each person.",
  "strong": "Imara Girls in Science: three pay bands compared each year with similar Kenyan nonprofits; nobody is paid below a floor the board agrees; increases decided each January against the budget, the same percentage for everyone; the highest salary is no more than four times the lowest.",
  "why": "It is open, values-based and applied the same way to everyone.",
  "reflect": "Could you explain to every team member why they are paid what they are paid?",
  "exercise": "Write your pay principles and a simple band structure.",
  "fields": [
   {
    "key": "principles",
    "label": "Pay principles",
    "hint": "How you set and review pay, and the commitments you make."
   },
   {
    "key": "bands",
    "label": "Bands and progression",
    "hint": "Band | roles | range | how people progress."
   },
   {
    "key": "recognition",
    "label": "Recognition and benefits",
    "hint": "Non-salary ways you value people."
   }
  ],
  "check": "Would two people doing similar work be paid within the same range for the same reasons?",
  "gallery": {
   "title": "Five example pay frameworks",
   "intro": "Each organisation writes its pay principles, a simple band structure and how it recognises people.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "principles": "No one is paid yet; the co-founders and volunteers give their time. Nobody should be out of pocket: transport and meals on planting days are covered for everyone. When we can pay, the first paid role will be paid at least the local wage for similar work, set openly by the board, not by the co-founders for themselves.",
      "bands": "Volunteer | adult volunteers, youth team leaders | expenses only | can become a team leader trainer or join the board\nCo-founders | Wayan, Sari | unpaid for now | a paid coordinator role from year two would be advertised openly, and a co-founder could apply\nFuture paid role | part-time coordinator | to be set against local rates | reviewed yearly by the board",
      "recognition": "A certificate for young people after a year, signed by the village head, that they can use for school or job applications. Volunteers' names on the planting site sign. A shared meal at the end of the rainy season. Volunteers get a written reference on request."
     },
     "notice": "Notice that an unpaid group still sets principles now, including that co-founders do not set their own future pay. Copy the certificate young people can actually use."
    },
    {
     "org": "ngo",
     "profile": {
      "principles": "Salaries compared each year with similar Kenyan nonprofits, and published to staff. Nobody paid below the floor the board agrees. The highest salary is no more than four times the lowest. Increases each January, the same percentage for everyone, decided by the board against the budget. Women and men in the same band are paid within the same range, checked yearly.",
      "bands": "Band 1 | club coordinators | range set from benchmarks | step increase after each year of good performance; move to band 2 by leading a programme area\nBand 2 | programme manager, finance officer | range set from benchmarks | step increase each year of good performance\nBand 3 | director | set by the board | reviewed yearly by the board",
      "recognition": "Thanks by name at the monthly team meeting and in the annual report (with permission). Mentors receive a certificate and a reference letter after a year, and are invited to the camp closing ceremony. Staff get two learning days a year and flexible hours in school holidays."
     },
     "notice": "Look at how the ratio and the yearly gender check turn fairness into something you can test. Copy the honest note that the director's pay is set by the board, not by the director."
    },
    {
     "org": "social",
     "profile": {
      "principles": "Real jobs, real pay: trainees are paid at least the minimum wage, on contract, with health insurance; no unpaid internships. Staff pay is set by role, not by negotiation. Lucía and Diego as directors are paid no more than double the café supervisor until the bakery has a three-month cash reserve. Pay is reviewed each January against the budget.",
      "bands": "Trainee | 6-month apprentices | minimum wage | graduate into a job with an employer partner, or apply for a junior baker post here\nTeam | café supervisor, salesperson, future junior baker | set range | annual step if objectives are met; extra for supervising trainees\nLeadership | Lucía, Diego | capped as above | reviewed by the advisory group's accountant when reserves allow",
      "recognition": "Graduation day with families, employers and the certificate. A loaf named after each cohort for a month on the café menu (the cohort chooses). A reference letter for every trainee who completes. Staff choose their shifts a week ahead where possible."
     },
     "notice": "Notice the founders cap their own pay until the reserve is built. Copy how progression for trainees is a job, here or with an employer partner."
    },
    {
     "org": "coop",
     "profile": {
      "principles": "Members are paid per piece, not salaries: piece rates are set by the committee each April and approved at the annual general meeting, never below the fair rate we promise buyers. The same rate for the same piece, whoever weaves it. Staff salaries are set against similar cooperatives, published to members (open books), and approved by the committee.",
      "bands": "Members | 140 weavers | piece rates per product type | master weaver status after quality record and training apprentices; annual bonus from surplus\nApprentices | young weavers | materials stipend; piece rates once work passes quality | become a member after the apprenticeship\nStaff | quality officer, designer, accounts clerk | set range | annual step if objectives met\nManager | Meera | set by the committee | reviewed yearly by the committee",
      "recognition": "Each weaver's name on the product label and online listing, with consent. A 'best piece' award at the annual general meeting chosen by members. Master weavers are invited to exhibitions to meet buyers. Payment within 15 days is itself a promise we keep."
     },
     "notice": "Notice that the 'pay framework' here is mostly piece rates decided by members. Copy the same-rate rule and the way recognition is built into the product label."
    },
    {
     "org": "hybrid",
     "profile": {
      "principles": "Everyone, in the charity and the trading company, is paid at least the voluntary Real Living Wage. Salaries compared each year with similar Leeds charities; ranges shared with all staff. The same pay principles apply in both entities. Annual pay review in March with the budget, approved by trustees. Volunteers' expenses are always repaid, so nobody is excluded by cost.",
      "bands": "Band A | shop assistant (planned) | range set from benchmarks | step each year; move to B by leading volunteers or a project\nBand B | volunteer coordinator, schools officer, shop manager | range set from benchmarks | step each year\nBand C | workshop lead | range set from benchmarks | step each year\nDirector | Tom | set by trustees | reviewed by the chair yearly",
      "recognition": "An annual volunteer celebration with the 'fix of the year' chosen by residents. Volunteer milestones (100 hours, 500 hours) thanked in the newsletter. Staff: one learning day a quarter and flexible hours. Volunteers who want work get a reference and help with CVs."
     },
     "notice": "Notice that the same principles cover charity and company staff, so the shop does not become the low-pay side. Copy recognition that matches what people value, like references for volunteers seeking work."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Manage",
  "id": "culture",
  "title": "Culture, wellbeing and inclusion",
  "sheet": "Culture",
  "learn": [
   "Culture is what people actually do when no one is checking: how decisions are made, how mistakes are handled, how people disagree and whose voice counts. It either supports the values you set in Module 1 or quietly contradicts them.",
   "Purpose-led work brings particular risks to wellbeing: emotional strain, long hours justified by the mission, contact with distressing situations and insecure funding. Set reasonable limits on workload, model them as leaders, offer supervision or debriefing where work is distressing and know where to refer people for support.",
   "Inclusion means people can take part fully and safely. Look at accessibility, language, meeting times, caring duties and who gets promoted or heard. People also need to feel they can speak up without being punished; that is the basis for learning and for safeguarding.",
   "Ask people regularly how things are, through check-ins and a short anonymous survey, and act on what you hear."
  ],
  "weak": "We are like a family here.",
  "strong": "Pan del Barrio: shifts planned a week ahead, with swaps allowed for caring duties; trainees speak first at the weekly staff meeting; an exit survey at every graduation, with the changes it led to reported to the next cohort.",
  "why": "It turns care into specific practices that anyone can see and check.",
  "reflect": "What behaviour does your organisation reward that contradicts its stated values?",
  "exercise": "Describe three culture practices and how you will check whether they work.",
  "fields": [
   {
    "key": "practices",
    "label": "Culture practices",
    "hint": "Practice | value it reflects | how we check it works."
   },
   {
    "key": "wellbeing",
    "label": "Wellbeing and inclusion measures",
    "hint": "Workload limits, support, accessibility and inclusion actions."
   }
  ],
  "check": "Could a new person observe your culture practices within their first month?",
  "gallery": {
   "title": "Five example culture plans",
   "intro": "Each organisation names three culture practices, the value behind each, and how it will check they work.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "practices": "Young people choose the planting site order and lead the closing circle | Led by young people | count how many decisions young people made each term\nVillage heads hear about plans before anything is posted online | Respect for village custom (adat) and leaders | no surprises raised by village heads at the six-monthly meeting\nWe share survival rates, good and bad, at the end-of-season meal | Honest about results | the real numbers appear on the notice board",
      "wellbeing": "Planting days end by midday, before the heat; water and shade always ready. No WhatsApp messages to young people after 8 pm, and never one-to-one. Sessions in Indonesian with Balinese when helpful; girls and boys both lead teams. Planting days avoid school exams and temple ceremony days. Co-founders take one month a year with no Tide Line tasks."
     },
     "notice": "Notice how each practice is tied to one of Tide Line's values and has a simple check. Copy the rule on messaging young people, which protects both wellbeing and safeguarding."
    },
    {
     "org": "ngo",
     "profile": {
      "practices": "Girls' advisory group reviews club activities each term and sees what changed | Girls first | changes made because of the group, listed in the board report\nMonthly 'what didn't work' slot at the team meeting | Accountable | at least one lesson recorded each month\nMentor circle every month, with coordinators listening first | Learn by doing | mentor retention over a year",
      "wellbeing": "Coordinators visit no more than five clubs a week. Debrief within 24 hours after any safeguarding concern, with time off afterwards if needed. Access to a counselling service paid by Imara. Meetings in English and Kiswahili, with Dholuo where it helps parents. Mentors' travel stipend paid on the day, so students are not out of pocket. Anonymous survey each June; results and actions shared in July."
     },
     "notice": "Look at the debrief after safeguarding concerns: it treats distressing work seriously. Copy how practices are checked in places people already look, like the board report."
    },
    {
     "org": "social",
     "profile": {
      "practices": "Weekly staff meeting where trainees speak first | Second chances with clear expectations | trainees' suggestions acted on, counted each month\nQuality tasting every morning by whoever baked, not only Lucía | Quality bread, every day | fewer customer complaints about quality\nTrainees' stories shared only with written consent, and they can withdraw it | Real jobs, real pay | consent records complete for every post",
      "wellbeing": "Shifts planned a week ahead and swaps allowed for caring duties or study. No more than one early shift in a row for trainees in their first month. Diego knows the local youth services and where to refer for housing, debt or mental health support. A trainee voice slot at every cohort review. Exit survey at graduation."
     },
     "notice": "Notice that trainees speak first in meetings, so the newest voice is heard before the boss. Copy the consent rule for sharing stories, which protects dignity in your brand."
    },
    {
     "org": "coop",
     "profile": {
      "practices": "Accounts read aloud and explained at the annual general meeting, with time for questions | Open books | number of questions asked; members' understanding in an annual survey\nCommittee seats rotate, with at least two places for members under 35 | Members decide | age and village mix of the committee each election\nRejections explained face to face, with how to fix the piece | Quality we are proud of | rejection rate falls without complaints of unfairness",
      "wellbeing": "Meetings held after the morning loom work and before evening chores, in Malayalam. Meeting places reachable on foot or by one bus. Payment within 15 days, so weavers are not stressed by money owed. Staff work no more than one weekend a month during the festival season, with time back afterwards."
     },
     "notice": "Notice how 'members decide' becomes reserved seats for younger weavers. Copy meeting times set around members' working days, not the staff timetable."
    },
    {
     "org": "hybrid",
     "profile": {
      "practices": "Monthly no-blame review of failed repairs and near misses | Fix first; Welcoming and safe | number of near misses reported (a rise early on is good)\nNew volunteers are welcomed by name at their first café and paired with a buddy | Everyone can learn | three-month volunteer retention\nTrustees and staff work one Saturday café a year | Welcoming and safe | trustees can describe the café in board discussions",
      "wellbeing": "No emails expected after 6 pm or at weekends. Saturday work is time back in the week. Step-free access, a quiet corner and large-print signs. Volunteer expenses paid within a week. Language support for residents through a volunteer interpreter list. Annual anonymous survey of staff and volunteers; results and three actions shared at the volunteer celebration."
     },
     "notice": "Notice the check that treats more near-miss reports as a good sign at first. Copy trustees working a café shift: it puts leaders where the culture actually happens."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "volunteers",
  "title": "Volunteers and community contributors",
  "sheet": "Volunteers",
  "learn": [
   "Volunteers bring time, skills, local knowledge and trust. Treat volunteering as a two-way relationship: be clear about what you offer volunteers (experience, training, belonging, a reference) as well as what you ask of them.",
   "Design each volunteer role with a description, time commitment, support and boundaries. Recruit, check people in proportion to the risk, induct and supervise them. Repay reasonable expenses so that volunteering is not limited to people who can afford it.",
   "Volunteers are different from community members who contribute through taking part, advisory groups or feedback. Both deserve recognition and a say, and neither should quietly fill paid roles.",
   "Keep records of who volunteers, in which role, with which checks and training, in line with your data protection rules. Ask volunteers for feedback and thank them in ways they value."
  ],
  "weak": "Anyone who wants to help can turn up.",
  "strong": "Tide Line Youth Collective: planting day helper role (about one Saturday morning a month, never alone with a young person); ID and two references; Sari's safeguarding session; a co-founder on every planting day; transport and a meal covered.",
  "why": "It makes the role clear, safe and fair to the volunteer.",
  "reflect": "Why would someone volunteer with you rather than elsewhere?",
  "exercise": "Design one volunteer role and its support.",
  "fields": [
   {
    "key": "role",
    "label": "Volunteer role",
    "hint": "Purpose, tasks, time commitment and boundaries."
   },
   {
    "key": "journey",
    "label": "Volunteer journey",
    "hint": "Recruitment, screening, induction, supervision, expenses, recognition and leaving."
   }
  ],
  "check": "Does the role offer volunteers clear support and value, not only tasks?",
  "anatomy": {
   "title": "Who contributes, and how",
   "intro": "Not everyone who gives time is a volunteer. Each needs a different kind of support.",
   "cols": [
    "Contributor",
    "Example",
    "What they need"
   ],
   "rows": [
    [
     "Volunteer",
     "A repair café fixer; a club mentor",
     "A role, checks, induction, supervision, expenses"
    ],
    [
     "Community adviser",
     "Girls' advisory group; trainee voice",
     "A real say, feedback on what changed, thanks"
    ],
    [
     "Participant giving feedback",
     "Residents answering a survey",
     "A short ask, consent, results shared back"
    ],
    [
     "Member",
     "A cooperative weaver",
     "Rights set by the rules, not a volunteer role"
    ]
   ],
   "after": 2
  },
  "gallery": {
   "title": "Five example volunteer roles",
   "intro": "Each organisation designs one volunteer role and the journey that supports it.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "role": "Planting day helper (adult). Purpose: keep young people safe and help them plant and monitor well. Tasks: prepare tools and seedlings, supervise a group of five to eight young people with another adult, help record survival. Time: about one Saturday morning a month. Boundaries: never alone with a young person; no personal messages to, or photos of, young people on your own phone.",
      "journey": "Recruitment: village notice boards, the school, village heads. Screening: conversation, ID, two references, checks as available locally. Induction: one observed planting day and Sari's safeguarding session. Supervision: a co-founder on every planting day; a circle after each day. Expenses: transport and a meal. Recognition: name on the site sign; a reference. Leaving: return boots, removed from the WhatsApp group, a short chat about what to improve."
     },
     "notice": "Notice the boundaries are written in plain terms people can follow on the day. Copy the leaving step: removal from the group chat matters when young people are in it."
    },
    {
     "org": "ngo",
     "profile": {
      "role": "Volunteer mentor (university student or woman working in science). Purpose: show girls that science is for them. Tasks: join one club visit a fortnight in term, support a small group, share your own path in science, help at camp if you can. Time: about 3 hours a fortnight for a school year. Boundaries: coordinator always present; contact with girls only in club; no personal social media links.",
      "journey": "Recruitment: two universities, a women in science network, past mentors. Screening: application, two references, police clearance, interview with a safeguarding question. Induction: training day, shadowing two clubs with a buddy. Supervision: monthly mentor circle; coordinator check-in each term. Expenses: transport stipend paid on the day. Recognition: certificate, reference, camp closing ceremony. Leaving: exit chat with Brian, return of ID badge, removed from mentor groups."
     },
     "notice": "Look at what mentors get back: a reference, a certificate and a community. Copy the clear limit on contact with girls outside club."
    },
    {
     "org": "social",
     "profile": {
      "role": "Volunteer job coach (a professional from an employer partner or the advisory group). Purpose: help trainees prepare for their first formal job. Tasks: two sessions per cohort on CVs and interview practice; one mock interview per trainee. Time: about 6 hours per cohort. Boundaries: does not replace Diego's mentoring; never does bakery shifts or any paid work; no contact with trainees outside sessions without their agreement.",
      "journey": "Recruitment: Diego asks employer partners and the advisory group. Screening: a conversation and one reference; trainees are adults, so checks are proportionate. Induction: one hour with Diego on the programme, trainees' privacy and how to give feedback kindly. Supervision: a call with Diego after each session. Expenses: transport repaid. Recognition: invitation to graduation day; thanks on Instagram with consent. Leaving: a thank-you and a quick feedback form."
     },
     "notice": "Notice the boundary that volunteers never do bakery shifts: it keeps paid work paid. Copy the use of partners' staff as volunteers where their skills fit the mission."
    },
    {
     "org": "coop",
     "profile": {
      "role": "Volunteer photography helper (a design school student on a short placement, or a young person from a weaving family). Purpose: help show each weaver's work well online. Tasks: photograph new pieces, record the weaver's name and consent, help upload listings. Time: two days per collection. Boundaries: photos only with the weaver's consent; no paid commercial shoots; does not replace the paid photographer for main collections.",
      "journey": "Recruitment: the design school and young people in member families. Screening: a conversation with the designer and one reference. Induction: half a day on consent forms, naming weavers correctly and the online shop. Supervision: the designer reviews every set of photos before upload. Expenses: bus fares and lunch. Recognition: photo credit on listings; a reference letter. Leaving: hand over all photo files; removed from the shop account."
     },
     "notice": "Notice this role is separate from members, who govern the cooperative rather than volunteer for it. Copy the consent step built into every photo."
    },
    {
     "org": "hybrid",
     "profile": {
      "role": "Repair café fixer. Purpose: help residents fix their items and learn to do it themselves. Tasks: diagnose faults, repair with the resident beside you, log the result and weight. Time: at least one Saturday café a month, for six months. Boundaries: electrical repairs only after PAT sign-off; no paid repairs for residents; if unsure, stop and ask Priya; never keep or sell residents' items.",
      "journey": "Recruitment: website, local newsletter, retired engineers' networks, housing associations. Screening: application and one reference (DBS only for schools work). Induction: welcome session, tool rules, a buddy for two cafés. Supervision: Priya on site; volunteer meeting monthly. Expenses: paid within a week. Recognition: milestones in the newsletter; annual celebration. Leaving: return keys, removed from database and booking system, exit conversation with the volunteer coordinator."
     },
     "notice": "Notice that residents learn alongside the fixer, which is the point of the role. Copy the stop-and-ask rule: it makes safety easier than guessing."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Review",
  "id": "offboarding",
  "title": "Offboarding, handover and continuity",
  "sheet": "Offboarding",
  "learn": [
   "People will leave: staff, volunteers, board members and founders. A planned exit protects both the organisation and the person. It covers handing over work and knowledge, returning equipment, removing system access, final pay or expenses and an exit conversation.",
   "Knowledge often leaves with people. Ask each key role to keep a short, current handover note: priorities, key contacts, where documents are, recurring deadlines, and how passwords are held in a secure password manager. The same note helps during holidays and sickness.",
   "Plan succession for critical roles, including the founder. Who could step in, for a while or for good? What would they need? Planning succession is a sign of maturity, not mistrust.",
   "Use exit conversations to learn. Ask what worked, what did not and what would have made the person stay, and look for patterns over time."
  ],
  "weak": "When someone leaves, we figure it out.",
  "strong": "Vanita Weavers: an offboarding checklist with marketplace and software access removed on the last day; each staff member updates a one-page handover note every quarter; the designer can cover Meera's buyer contacts for up to three months; exit conversations held by the president, not the line manager.",
  "why": "It protects access, knowledge and continuity, and turns each exit into learning.",
  "reflect": "If your most knowledgeable person left next month, what would be lost?",
  "exercise": "Draft an offboarding checklist and a succession note for one critical role.",
  "fields": [
   {
    "key": "checklist",
    "label": "Offboarding checklist",
    "hint": "Step | owner | timing."
   },
   {
    "key": "succession",
    "label": "Succession for a critical role",
    "hint": "Role | who could cover | what they would need | where knowledge is kept."
   }
  ],
  "check": "Would access be removed and knowledge retained when someone leaves?",
  "gallery": {
   "title": "Five example offboarding and succession plans",
   "intro": "Each organisation drafts an offboarding checklist and a succession note for one critical role.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "checklist": "Tell the co-founders and agree a last planting day | volunteer | at least two weeks before\nReturn boots, tools and any monitoring sheets | volunteer to Wayan | last day\nRemove from the WhatsApp group and Drive | Sari | last day\nDelete any photos of young people from personal phones, and confirm | volunteer, checked by Sari | last day\nRepay any outstanding expenses from the cash book | Ibu Made | within a week\nShort chat: what worked, what to change | both co-founders | last day",
      "succession": "Safeguarding focal person (Sari) | Wayan, after the same training | the training, the concern log, contacts for the village heads and local child protection services | Sari keeps the procedure and concern log in a locked Drive folder that Wayan can also open; paper notes are scanned into it, then destroyed"
     },
     "notice": "Notice the step on deleting photos of young people from personal phones. Copy the succession note for safeguarding, a role a small group cannot leave uncovered for even a week."
    },
    {
     "org": "ngo",
     "profile": {
      "checklist": "Resignation acknowledged in writing; last day agreed | Achieng | within 2 days\nHandover note updated; school contacts introduced to cover | leaver and Brian | final two weeks\nTablet, keys and ID badge returned | leaver to Grace | last day\nEmail, drive and attendance app access removed | Grace | last day\nFinal pay and any leave owed calculated | Grace | next payroll\nExit conversation | board safeguarding lead or Achieng (not the line manager) | final week\nPattern review of exits | Achieng to the board | once a year",
      "succession": "Director (Achieng) | Brian as acting director for up to six months, with the board chair's support | delegated authority approved by the board, introductions to Foundation A and B, bank signatory change | the director's handover note, funder contacts and grant calendar on the restricted drive, updated quarterly"
     },
     "notice": "Look at the acting director plan: named, time-limited and approved in advance. Copy the yearly review of exit reasons, which turns single goodbyes into patterns."
    },
    {
     "org": "social",
     "profile": {
      "checklist": "Graduation: certificate, reference letter, introduction to employer partners | Diego | last week of the apprenticeship\nUniform and locker key returned | trainee to café supervisor | last day\nFinal pay, any leave owed and contract end documents | accountant | next payroll\nRemove from staff WhatsApp group; keep in the graduates' group if they want | Diego | last day\nExit feedback form and conversation | café supervisor (not Diego) | last week\nFollow-up calls at 3 and 12 months | Diego | after leaving",
      "succession": "Master baker (Lucía) | the café supervisor for daily production, with the junior baker in year two | the recipes, quality standards and supplier contacts written down; a two-week holiday trial each year | recipe book and production plan in a shared folder, not only on the whiteboard; supplier contacts in the shared phone"
     },
     "notice": "Notice that offboarding a trainee is also graduation and the start of follow-up. Copy the holiday trial: a planned absence tests the succession plan safely."
    },
    {
     "org": "coop",
     "profile": {
      "checklist": "Notice received and reported to the committee | Meera | next committee meeting\nHandover note and buyer introductions | leaver | final month\nMarketplace, email and cooperative software access removed; passwords changed | Meera with the accounts clerk | last day\nKeys and records returned | leaver | last day\nFinal salary and dues settled | accounts clerk, signed by treasurer | next payroll\nExit conversation | president Sreeja | final week",
      "succession": "Manager (Meera) | the designer for buyer and marketplace contacts; the accounts clerk for payments; the committee appoints an acting manager | committee resolution on who signs, bank mandate update, buyer list | manager's handover note and buyer list in the shared drive; second marketplace login held by the president"
     },
     "notice": "Notice that the manager's work is split between two staff, with the committee deciding on an acting manager. Copy the second login held by an elected officer."
    },
    {
     "org": "hybrid",
     "profile": {
      "checklist": "Resignation acknowledged; handover plan agreed | Tom | within a week\nHandover note updated and school bookings passed on | leaver | final month\nKeys, laptop and tool library access returned | leaver to volunteer coordinator | last day\nAccounts, email, volunteer database and booking system access removed | Tom | last day\nFinal pay and holiday owed | external payroll, approved by Tom | next payroll\nExit conversation | a trustee (not the line manager) | final week\nVolunteers leaving: keys, database, thank-you | volunteer coordinator | last session",
      "succession": "Director (Tom) | Priya as acting director, with Helen as chair | board approval, bank signatory change, a seat on the Riverside Reuse Ltd board for the interim | director's handover note, funder calendar, cost-sharing agreement and lease file (lease ends 2028) in the trustees' shared folder"
     },
     "notice": "Notice the acting director also needs a place on the trading company's board. Copy how the lease date is part of the handover, not only daily tasks."
    }
   ]
  }
 }),
 review("people-plan","Your People Plan")
 ]
});
