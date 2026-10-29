import {module,lesson,review} from './kit.js?v=deeplink1';
// Reviewed October 2026: plain explanation, optional table (anatomy), and a gallery showing how the five example
// organisations (course/examples.js; story in docs/example-organisations.md) complete each exercise.
export default module({
 ...{"uses":[0,1,2],"video":null,"id":3,"slug":"structure-governance","phase":"Organise","title":"Structure, Governance & Accountability","short":"Organigrams, governance, roles, decision rights, delegation, RACI and coordination","intro":"Move from mission and strategy to who actually does what. Design the work before the job titles, separate governance from management, decide who can decide what, and make accountability and coordination visible. A team of two needs this clarity as much as a team of two hundred.","output":"Structure & Accountability Pack","workbook":{"file":"Module-03-Structure-Governance-Accountability.xlsx","title":"Structure, Governance & Accountability workbook"},"promo":{"lesson":"raci","tools":["organisation-structure","meetings-actions-decisions"],"headline":"Know who owns what, across every plan","pitch":"Organisation Structure keeps your roles and reporting lines current and scans every other tool for owner names, so you can spot overload and gaps early. Meetings, Actions & Decisions turns your coordination rhythm into a record of what was decided and who follows up."}},
 lessons:[
 lesson({
  "minutes": 20,
  "tools": [
   "organisation-structure"
  ],
  "video": null,
  "stage": "Understand",
  "id": "capabilities",
  "title": "From work to structure",
  "sheet": "Functions",
  "learn": [
   "Structure should follow the work. Start from your objectives and Theory of Change and list the capabilities you need to deliver them: delivery or production, partnerships, fundraising or sales, finance, people, communications, MEAL, compliance and leadership.",
   "Group related capabilities into functions. A function is a body of work, not a person. Early on, one person may hold several functions; later, one function may need a whole team.",
   "For each function, decide whether you do it in-house, share it with a partner or contract it out, for example bookkeeping, legal advice or IT support. Outsourcing a task does not outsource accountability: someone inside still checks the work.",
   "Then look at who holds what. When one person holds many functions, the organisation stops when they are ill, away or overloaded. Spotting this now is cheaper than discovering it in a crisis."
  ],
  "weak": "We need a director, a programme manager and a fundraiser.",
  "strong": "Imara Girls in Science: club delivery (core, in-house: programme manager and three coordinators); mentoring (shared with two universities); finance (finance officer, audit contracted); fundraising (director, about 40% of her time); MEAL (programme manager, with coordinators).",
  "why": "It starts from the work and shows how each function is resourced, which reveals overload before new job titles are created.",
  "reflect": "Which essential function currently has no one clearly responsible for it?",
  "exercise": "List the functions your strategy requires and how each will be resourced.",
  "fields": [
   {
    "key": "functions",
    "label": "Functions we need",
    "hint": "Function | why the strategy needs it | in-house, shared or contracted | who holds it now."
   },
   {
    "key": "concentration",
    "label": "Where work is concentrated",
    "hint": "Which person holds too many functions, and what is the risk?"
   }
  ],
  "check": "Does every objective have the functions it needs to be delivered?",
  "gallery": {
   "title": "Five example function maps",
   "intro": "How each organisation listed the functions its strategy needs, how each is resourced, and where work piles up.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "functions": "Youth restoration (planting days, site care) | ESO1 | in-house | Sari, with 4 volunteers\nSchool sessions | ESO2 | shared with the junior secondary school | Wayan\nVillage relations and site agreements | ESO1, land permission | in-house | Wayan\nSafeguarding | ISO2, work with children | in-house; training contracted | Sari\nSurvival monitoring (MEAL) | ESO1, honest results | in-house | Sari\nFundraising (dive operators, village fund) | ISO3 | in-house | Wayan\nCash book and receipts | ISO3, trust | in-house | Ibu Made\nRegistration | ISO1 | notary contracted | Wayan",
      "concentration": "Sari holds planting, monitoring and safeguarding. If she is ill or away during the rainy season, planting days and child safety checks both stop. Wayan holds every outside relationship. We will train one volunteer as a deputy safeguarding contact and introduce Sari to the village heads and sponsors."
     },
     "notice": "Notice that even a group with no staff has eight functions. Writing them down shows the co-founders where their unpaid time is going."
    },
    {
     "org": "ngo",
     "profile": {
      "functions": "Club delivery and holiday camp | ESO1 | in-house | programme manager Brian and 3 club coordinators\nMentoring | ESO1, role models | shared with two universities | coordinators recruit; Brian oversees\nTeacher workshops and school partnerships | ESO2 | in-house | Brian\nSafeguarding | ISO2 | in-house; vetting checks contracted | Achieng (lead), all staff trained\nFundraising and funder reports | ISO1 | in-house | Achieng\nFinance and payroll | all objectives | in-house; audit contracted | Grace\nMEAL and data | ISO3 | in-house | Brian, with coordinators\nCommunications | ISO1, parents | in-house | no clear owner",
      "concentration": "Achieng holds fundraising, funder relations, safeguarding lead and, by default, communications. With Foundation A ending next year, fundraising needs more of her time than she has. We will move communications to Brian’s team and name a coordinator as deputy safeguarding lead."
     },
     "notice": "Copy the honest “no clear owner” line. A function nobody holds is easier to fix once it appears on the list."
    },
    {
     "org": "social",
     "profile": {
      "functions": "Production and quality | the bread that pays for training | in-house | Lucía (master baker)\nCafé service | largest income (café sales) | in-house | café supervisor\nWholesale sales | three office clients | in-house | salesperson, with Diego\nApprenticeship and mentoring | ESO1, ESO2 | in-house | Diego\nEmployer partnerships and job matching | ESO1 | in-house | Diego\nBookkeeping and tax | ISO1 | contracted | accountant; Lucía checks\nFollow-up at 3 and 12 months (MEAL) | ESO2 | in-house | Diego\nGrants and municipality relations | ISO2 | in-house | Diego",
      "concentration": "Lucía runs production and checks the books; if she is off, there is no master baker and the café runs short. Diego holds trainees, employers, wholesale and the municipality. We need a second baker who can run a shift, and the salesperson to own wholesale fully."
     },
     "notice": "See how the business functions and the training functions sit in one list: in a social enterprise, both must be resourced or neither works."
    },
    {
     "org": "coop",
     "profile": {
      "functions": "Yarn purchasing | ESO1, lower costs | in-house | Meera, within the committee’s plan\nQuality checks | ESO1, our name | in-house | quality officer\nDesign collections | ESO1, ISO1 | in-house; design school students placed | designer\nOnline sales and photography | ISO1 | in-house; marketplace shared | Meera\nShop partnerships | ESO1 | in-house | Meera\nAccounts and weaver payments | ESO1, on-time pay | in-house | accounts clerk\nAudit | legal duty | state cooperative department | treasurer prepares\nApprentice scheme | ESO2 | in-house | senior weavers, no staff owner\nMember communication | Members decide | in-house | secretary",
      "concentration": "Meera holds yarn buying, online sales and shop relationships. Before the festival season, when cash is tight, everything waits on her. The apprentice scheme has no owner. We will ask the designer to take over online listings and the committee to name an apprentice lead."
     },
     "notice": "Notice the elected secretary holds a function too. In a cooperative, some work belongs to members and their committee, not only to staff."
    },
    {
     "org": "hybrid",
     "profile": {
      "functions": "Repair cafés | ESO1 | in-house, with volunteers | Priya (workshop lead)\nElectrical safety (PAT testing) | ISO3 | in-house; training contracted | Priya\nVolunteer recruitment and support | ESO1, ISO3 | in-house | volunteer coordinator\nSchool workshops | ESO2 | shared with 12 schools | schools officer\nTool library | ESO1 | in-house | volunteer coordinator\nShop and refurbishment | ISO1 | trading company | shop manager\nFundraising and council contract | charity income | in-house | Tom\nFinance (two sets of books) | ISO2 | bookkeeper contracted; treasurer oversees | Tom\nCommunications | all | in-house | shared, so no owner",
      "concentration": "Tom holds fundraising, finance, the council contract and a seat on the trading company board. Priya alone signs off electrical safety for both the cafés and the shop. We will train a second PAT tester and give communications to one owner."
     },
     "notice": "Copy the split between entities: the shop function sits in the trading company, so its costs and risks can be seen separately from the charity’s."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "organisation-structure"
  ],
  "video": null,
  "stage": "Design",
  "id": "structure",
  "title": "Organisational structures and organigrams",
  "sheet": "Roles",
  "learn": [
   "An organigram (organisation chart) shows roles and reporting lines. Common shapes are functional (grouped by expertise), programme or product based, geographic, matrix (people report to two lines) and network or hub (a small core coordinating partners or volunteers). Most small organisations are functional with one coordinator.",
   "Structure changes with stage. A founder-led start-up is usually flat, with everyone reporting to the founder. As the team grows, lead roles become necessary so that one person is not the bottleneck for every decision. Change structure on purpose, not by accident.",
   "A chart shows who reports to whom. It does not show who approves spending or how decisions are made; the later lessons in this module cover that. Show governance (the board, committee, shareholders or members) separately from day-to-day management.",
   "Use role names rather than personal details. Show contracted specialists and key volunteers with dotted lines. Do not invent a large hierarchy just to look established."
  ],
  "weak": "Director → everyone else.",
  "strong": "Riverside Repair Hub: trustees oversee the director; the workshop lead, volunteer coordinator, schools officer and shop manager report to him; repair volunteers report to the workshop lead; the shop sits in the trading company, whose board of three answers to the charity as owner.",
  "why": "It separates oversight from management, shows where volunteers sit and makes the second entity visible.",
  "reflect": "Where would a concern go if it involved the person’s usual manager?",
  "exercise": "Map roles and reporting lines. Use role names rather than private personal details.",
  "fields": [
   {
    "key": "structure",
    "label": "Reporting lines",
    "hint": "One per line: role | reports to | main responsibility."
   },
   {
    "key": "gaps",
    "label": "Capacity gaps",
    "hint": "Which work is uncovered or concentrated in one role?"
   }
  ],
  "check": "Does the structure fit the work you actually plan to deliver?",
  "gallery": {
   "title": "Five example reporting maps",
   "intro": "How each organisation mapped its roles and reporting lines, and what the map revealed.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "structure": "General meeting of members (after registration) | — | elects the board, approves the yearly report\nBoard of three: Wayan (chair), Sari (secretary), Ibu Made (treasurer) | general meeting | oversight, budget, site agreements\nCo-founder, programmes and safeguarding (Sari) | both co-founders together; later the board | planting days, monitoring, safeguarding\nCo-founder, schools and partners (Wayan) | both co-founders together; later the board | school sessions, village heads, sponsors\nCash book keeper (Ibu Made) | both co-founders | records all money in and out\nAdult volunteers (4) | Sari for planting; Wayan for schools | supervise young people, two adults always present\nYouth team leaders, 16–17 (from year two) | Sari | lead planting teams\nNotary (contracted, dotted line) | Wayan | registration papers",
      "gaps": "Sari and Wayan will sit on the board and do all the work, so only Ibu Made, who keeps the cash book, stands apart from the planting and school work. A safeguarding concern about a co-founder has nowhere to go: we will name Ibu Made as the alternative contact. Fundraising has no back-up."
     },
     "notice": "Notice that the map shows the planned board alongside today’s reality. At idea stage, drawing both helps you see what registration will change."
    },
    {
     "org": "ngo",
     "profile": {
      "structure": "Board of 7 (chair Dr Otieno) | — | direction, oversight, budget\nFinance and safeguarding committee | board | reviews accounts, risk and safeguarding cases\nDirector (Achieng) | board | leadership, fundraising, partners\nProgramme manager (Brian) | director | clubs, camp, mentors, MEAL\nClub coordinators (3) | programme manager | weekly clubs in 14 schools\nFinance officer (Grace) | director | accounts, payroll, funder budgets\nVolunteer mentors (25) | club coordinators (dotted line) | mentoring at clubs and camp\nGirls’ advisory group | programme manager (advises only) | girls’ views on clubs and camp\nAuditor (contracted) | board | annual audit",
      "gaps": "Brian manages three coordinators, 25 mentors through them, MEAL and teacher workshops: a heavy load. Communications sit with no one. If a concern involves Achieng, staff can go to the board chair, but this is not written down yet."
     },
     "notice": "Copy how the auditor reports to the board, not to the finance officer whose work is being checked."
    },
    {
     "org": "social",
     "profile": {
      "structure": "Shareholders: Lucía 60%, Diego 40% | — | own the company; key decisions under the shareholders’ agreement\nDirectors: Lucía and Diego | shareholders | run the company jointly\nMaster baker and general manager (Lucía) | directors’ joint meeting | production, café, finances\nTraining and partnerships lead (Diego) | directors’ joint meeting | trainees, employers, wholesale, municipality\nCafé supervisor | Lucía | café service and cash\nWholesale salesperson | Diego for now; Lucía from next quarter, to free Diego’s time | office clients and orders\nTrainees (6) | Lucía for daily production; Diego for mentoring | learn on the job\nAdvisory group of three (dotted line) | advises both directors | prices, finance, youth employment\nAccountant (contracted) | Lucía | monthly books, taxes",
      "gaps": "Trainees answer to two people, Lucía on shift and Diego for mentoring, so a struggling trainee can get mixed messages. We will agree that Lucía sets daily tasks and Diego handles contracts and conduct. Nobody covers Lucía’s baking."
     },
     "notice": "See how the same two people appear three times: as shareholders, as directors and as managers. Naming each hat makes clear which decision they are taking."
    },
    {
     "org": "coop",
     "profile": {
      "structure": "General body (140 members) | — | elects the committee, approves accounts, bonus and by-laws\nElected committee of nine (president Sreeja) | general body | piece rates, budget, oversight\nManager (Meera) | committee | daily operations, sales, yarn\nQuality officer | manager | checks every piece\nDesigner | manager | two collections a year\nAccounts clerk | manager; treasurer checks monthly | records, weaver payments\nMember weavers (140) | paid per piece; quality questions to the quality officer | weaving at home\nDesign school students (dotted line) | designer | placements\nState cooperative department (outside) | — | annual audit",
      "gaps": "Members are both owners and suppliers paid per piece, so a weaver unhappy with a rejection may go straight to a committee member. We need one route: quality officer first, then the committee. The apprentice scheme has no owner."
     },
     "notice": "Notice that members appear twice, at the top as owners and lower down as weavers. Your map should show both relationships if your members also work with you."
    },
    {
     "org": "hybrid",
     "profile": {
      "structure": "Trustees (6, chair Helen) | the charity’s purposes and the regulator | strategy, oversight\nRiverside Reuse Ltd board (two trustees and Tom) | the charity, as sole shareholder | shop plan, product safety, profit transfer\nDirector (Tom) | trustees; company board for the shop | leadership, funding, finance\nWorkshop lead (Priya) | director | repair cafés, electrical safety\nVolunteer coordinator | director | volunteers, tool library\nSchools officer | director | work with 12 schools\nShop manager (employed by the company) | director, acting for the company | shop, refurbishment, sales\nVolunteers (40) | volunteer coordinator; Priya on repair technique | repairs, shop, tool library\nBookkeeper (contracted, dotted line) | director | two sets of books",
      "gaps": "Tom reports to the trustees and also sits on the company board they oversee, so he cannot check his own work. The trustees not on the company board will review the shared-cost agreement. Communications have no owner."
     },
     "notice": "Copy the note on who employs the shop manager. In a hybrid, showing which entity each role belongs to keeps costs and risks in the right place."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "governance",
  "title": "Governance structures by legal form",
  "sheet": "Governance",
  "learn": [
   "Governance is how an organisation is directed and held to account; management is how it is run day to day. Every organisation has some governance, even if it is only the founders agreeing how decisions are made.",
   "The governing body depends on your form. Nonprofits and charities usually have a board of trustees or directors who are legally responsible. Foundations have trustees who steward the assets. Companies have directors appointed by shareholders, who keep certain decisions such as changing the articles. Cooperatives answer to their members, who usually elect a committee. Your founding document sets out the rules.",
   "Advisory boards, committees and community panels add expertise and voice, but they do not carry legal responsibility unless your documents give them that role. Be clear which body decides and which advises.",
   "Good governance needs a mix of skills, some independence from management, clear terms of office, managed conflicts of interest and a record of decisions. Small organisations can start with a few people and a simple calendar, then grow. Rules differ by country; confirm locally."
  ],
  "weak": "We have a board of friends who help when they can.",
  "strong": "Imara Girls in Science: board of 7 (education, finance, law, engineering, a parent and a former club member); no staff on it; three-year terms; meets quarterly; a finance and safeguarding committee; a girls’ advisory group that advises but does not decide.",
  "why": "It shows skills, independence, terms, rhythm and the difference between deciding and advising.",
  "reflect": "Who, outside the management team, can hold you to account today?",
  "exercise": "Describe the governance structure your form requires and the one you want to build.",
  "fields": [
   {
    "key": "body",
    "label": "Governing body",
    "hint": "Name, legal role, size, skills needed, independence and terms of office."
   },
   {
    "key": "other",
    "label": "Advisory bodies and member voice",
    "hint": "Committees, advisory groups or member structures, and whether they decide or advise."
   },
   {
    "key": "documents",
    "label": "Founding document checks",
    "hint": "What your constitution, articles or statutes require, and what to confirm with advice."
   }
  ],
  "check": "Is it clear which body decides and which only advises?",
  "anatomy": {
   "title": "Governance and management",
   "intro": "Two different jobs. In small organisations the same people may do both, so be clear which hat you are wearing.",
   "cols": [
    "Aspect",
    "Governance",
    "Management"
   ],
   "rows": [
    [
     "Main question",
     "Are we doing the right things, well and lawfully?",
     "Are we doing things right, day to day?"
    ],
    [
     "Who",
     "Board, trustees, elected committee, shareholders or members",
     "Director or manager, staff and volunteers"
    ],
    [
     "Typical decisions",
     "Strategy, budget, appointing the lead, key policies",
     "Plans, schedules, hiring within budget, delivery"
    ],
    [
     "Rhythm",
     "Monthly or quarterly meetings; a yearly general meeting",
     "Daily and weekly"
    ],
    [
     "Answers to",
     "Members, regulators, funders and the purpose",
     "The governing body"
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example governance structures",
   "intro": "How each organisation described its governing body, its advisory voices and what its founding documents require.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "body": "Now: the two co-founders decide together; spending over US$100 needs both. Planned: an association (perkumpulan) with a founding board of three: Wayan (chair), Sari (secretary) and Ibu Made (treasurer), a retired village midwife and respected elder. Skills: teaching, marine science, community trust. Only Ibu Made stands apart from the planting and school work. Terms as the statutes set (to confirm).",
      "other": "General meeting of members (volunteers, and young people over 16 with parent consent) once a year: elects the board and approves the yearly report. Youth team leaders attend board meetings to speak, without a vote. Village heads advise on sites, but their permission is needed for land use.",
      "documents": "To ask the notary: Can members under 18 vote, and how is parent consent recorded? How many founders and board members are required? Do the statutes need a separate supervisory body? How are board members replaced? Can the association sign site agreements with village heads?"
     },
     "notice": "Notice the governance that exists today, two co-founders and a US$100 rule, is written down before any registration. Start with what is real."
    },
    {
     "org": "ngo",
     "profile": {
      "body": "Board of 7, legally responsible: chair Dr Otieno (university lecturer), treasurer (accountant), a head teacher, a parent representative, a woman engineer, a lawyer and a former club member now at university. No staff on the board; the director attends without a vote. Three-year terms, two terms at most. Meets quarterly.",
      "other": "Finance and safeguarding committee (treasurer, lawyer, head teacher): meets before each board meeting and recommends; the board decides. Girls’ advisory group (12 club members, meets termly): advises on club activities and the camp; it does not decide.",
      "documents": "Our constitution sets board size, terms and quorum. Nonprofit registration rules in Kenya changed recently: confirm with an outside lawyer (not only our lawyer trustee) what we must file, whether the constitution needs updating and how board changes are notified."
     },
     "notice": "Copy the term limit. Two terms at most keeps the board fresh and makes it normal, not personal, when a long-serving member steps down."
    },
    {
     "org": "social",
     "profile": {
      "body": "Two directors, Lucía and Diego, appointed by the shareholders, who are themselves (Lucía 60%, Diego 40%). Shareholders keep decisions such as changing the bylaws, issuing new shares and paying dividends; directors run the company. No independent member: we accept this for now and rely on the advisory group for outside challenge.",
      "other": "Advisory group of three (a bakery owner, an accountant, a youth employment specialist) meets every two months. It advises on prices, finances and trainee outcomes; it does not decide and has no legal role. Trainee voice: a feedback session at the end of each cohort.",
      "documents": "Our bylaws contain the social purpose. The shareholders’ agreement says which decisions need both of us despite the 60/40 split, and how we resolve a deadlock. To confirm with a lawyer: what BIC status would add (an annual impact report) and whether the bylaws must change to adopt it."
     },
     "notice": "See how a company with only two owners names its missing independence honestly, and uses an advisory group to fill some of the gap."
    },
    {
     "org": "coop",
     "profile": {
      "body": "General body of 140 members, one member one vote, meets once a year. It elects a committee of nine (president Sreeja, secretary, treasurer and six members), responsible for the society between general meetings; it meets monthly. Manager Meera attends without a vote. Terms and elections follow our by-laws and state rules.",
      "other": "Village representatives: in each village WhatsApp group, one member collects questions for the committee; they advise only. A purchase subcommittee (treasurer and two committee members) reviews large yarn orders between meetings and reports to the committee.",
      "documents": "Our by-laws set membership, elections, committee powers and how the surplus is shared; the state cooperative department audits us yearly. Before accepting a dye-unit grant, check: does it give officials a seat or a veto? Does it need a special general body meeting?"
     },
     "notice": "Notice that the members, not the committee, are the top of the structure. Member-owned organisations should show where members’ voice enters between yearly meetings."
    },
    {
     "org": "hybrid",
     "profile": {
      "body": "Charity (CIO): 6 trustees, legally responsible: chair Helen, treasurer (chartered accountant), a schools governor, an electrician, a community worker and a young trustee aged 24. All independent of staff. A council waste officer was not appointed because the council funds us. Three-year terms; meets quarterly. Trading company: board of three (treasurer, electrician trustee and Tom).",
      "other": "Riverside Reuse Ltd’s board decides shop matters within the yearly plan the charity approves as sole shareholder. A volunteer forum meets twice a year and advises on repair cafés and the tool library; it does not decide.",
      "documents": "The CIO constitution sets trustee numbers, terms and conflict rules; the company’s articles let the charity appoint and remove directors. To check with our accountant and a solicitor: the written agreement on shared costs, staff and premises, and the yearly transfer of profits."
     },
     "notice": "Copy the reason given for leaving someone off the board. Managing conflicts of interest starts with who you appoint."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "board",
  "title": "Board and management responsibilities",
  "sheet": "Reserved matters",
  "learn": [
   "The board (or equivalent) sets direction, appoints and supports the executive lead, approves key policies and budgets, oversees performance, finance and risk, and makes sure the organisation meets its legal duties. Management proposes plans, runs operations and reports. Problems start when boards manage daily work, or when staff take decisions that belong to the board.",
   "Write down the reserved matters: decisions only the governing body (or the shareholders or members) can take. Typical examples are approving strategy and the annual budget, appointing the executive lead, major contracts or borrowing, changing the founding document and adopting key policies such as safeguarding and conflicts of interest.",
   "Plan a governance calendar: when strategy, budget, accounts, risks, key policies and the executive lead’s performance are reviewed during the year. A calendar makes oversight routine rather than a reaction to problems.",
   "In founder-led organisations, the founder may also sit on the board. Manage this openly: record whether the founder is acting as a staff member or a board member, and make sure someone else can raise concerns about the founder’s work."
  ],
  "weak": "The board approves everything important.",
  "strong": "Riverside Repair Hub: reserved to the trustees: strategy, annual budgets for both entities, appointing and appraising the director, contracts or leases over £10,000, any borrowing, key policies. Delegated to the director: everything else within budget and policy.",
  "why": "It defines “important” precisely and makes everything else clearly delegated.",
  "reflect": "Which decision is currently made by the wrong body?",
  "exercise": "List your reserved matters and build a simple governance calendar.",
  "fields": [
   {
    "key": "reserved",
    "label": "Reserved matters",
    "hint": "Decisions only the governing body (or shareholders) can take."
   },
   {
    "key": "calendar",
    "label": "Governance calendar",
    "hint": "Month or quarter | what is reviewed or approved | papers needed | who prepares them."
   }
  ],
  "check": "Could the board and management each say which decisions belong to them?",
  "gallery": {
   "title": "Five example reserved matters and calendars",
   "intro": "How each organisation listed the decisions its governing body keeps and planned a year of oversight.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "reserved": "Now (both co-founders together): any spending over US$100; agreeing restoration sites with village heads; accepting sponsorship; choosing the legal form. After registration, the board: yearly plan and budget; site agreements; safeguarding policy; sponsorship agreements; admitting members. The general meeting: electing the board, approving the yearly report, changing the statutes.",
      "calendar": "January | safeguarding check before school term | incident log, consent forms | Sari\nApril | yearly report and accounts to members | cash book summary, survival results | Ibu Made, Sari\nJuly | survival results at 6 and 12 months; next year’s sites | monitoring sheets, village heads’ views | Sari, Wayan\nOctober | budget and planting plan before the rainy season | draft budget, sponsor list | Wayan, Ibu Made"
     },
     "notice": "Notice the calendar follows the rainy season: oversight dates are set by when the work actually happens, not by a template."
    },
    {
     "org": "ngo",
     "profile": {
      "reserved": "Strategy and the annual budget; appointing, appraising and setting the pay of the director; grants or contracts over US$10,000; any borrowing; using the reserve; opening a new sub-county; key policies (safeguarding, child data protection, finance, conflicts of interest); changing the constitution.",
      "calendar": "Q1 | annual budget and work plan | draft budget, funder pipeline | Achieng, Grace\nQ2 | audited accounts; risk register | audit report, risks (Foundation A dependence) | Grace, finance and safeguarding committee\nQ3 | safeguarding report; policy reviews | incidents summary, training records | Achieng, committee\nQ4 | results and director’s appraisal | confidence survey, attendance, subject choices | Brian; chair Dr Otieno leads the appraisal"
     },
     "notice": "Copy the named risk in the Q2 papers: dependence on one funder is a board matter, not just the director’s worry."
    },
    {
     "org": "social",
     "profile": {
      "reserved": "Shareholders (both, under the shareholders’ agreement): changing the bylaws or the social purpose; adopting BIC status; new shareholders or investment; paying dividends; selling the business. Directors jointly: annual budget; loans; office contracts over US$5,000; hiring or dismissing staff; trainee intake numbers; wholesale price changes over 10%.",
      "calendar": "January | annual budget and cash reserve target | last year’s accounts, flour price forecast | Lucía, accountant\nApril and October | cohort results; next cohort size | completion, certificates, jobs at 3 months | Diego\nJuly | half-year accounts; BIC decision | accounts, advisory group’s view | Lucía, Diego\nEvery two months | advisory group meeting | sales, cash, trainee updates | Diego"
     },
     "notice": "See how a company splits reserved matters in two: what only the shareholders can decide, and what the two directors must agree together."
    },
    {
     "org": "coop",
     "profile": {
      "reserved": "General body: electing the committee; approving audited accounts; the annual bonus to members; changing the by-laws; admitting a grant that affects control. Committee: piece rates; the annual budget; yarn contracts over the purchase limit; appointing and appraising the manager; quality standards; new shop partnerships.",
      "calendar": "April | committee approves the budget and piece rates | draft budget, yarn prices | Meera, treasurer\nJune | audit by the state cooperative department | full accounts, piece register | accounts clerk, treasurer\nSeptember | general body meeting: accounts, bonus, elections when due | audited accounts, bonus proposal, manager’s report | secretary, Meera\nSeptember | festival-season stock and working capital | orders, cash forecast | Meera\nEvery month | committee meeting: sales, payments, rejections | monthly summary | Meera"
     },
     "notice": "Notice that the annual bonus sits with the members, not the committee. In a cooperative, decisions about members’ money go to the members."
    },
    {
     "org": "hybrid",
     "profile": {
      "reserved": "Trustees: strategy; budgets for the charity and approval of the company’s plan; appointing and appraising the director; contracts or leases over £10,000 (including the lease ending in 2028); borrowing; key policies (safeguarding, electrical safety, conflicts of interest, data); appointing company directors. Company board: shop prices, stock buying and contracts within the approved plan.",
      "calendar": "Q1 | budgets for both entities; shared-cost agreement | draft budgets, staff time split | Tom, treasurer\nQ2 | annual report and accounts; profit transfer | draft accounts for both | bookkeeper, treasurer\nQ3 | risk register, premises plan for 2028 | risks, lease options | Tom, chair Helen\nQ4 | results, safety review, director’s appraisal | repair log, PAT records, survey | Priya, Tom; Helen leads the appraisal"
     },
     "notice": "Copy how the trustees keep control of the trading company: they approve its plan and appoint its directors, then let it run."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "organisation-structure"
  ],
  "video": null,
  "stage": "Design",
  "id": "roles",
  "title": "Roles and role descriptions",
  "sheet": "Roles",
  "learn": [
   "A role describes a contribution, expected results and authority. A task list alone does not tell someone what success looks like or what they can decide. A useful role card covers purpose, key responsibilities, expected results, decisions the role can take, who it works with and the support it needs.",
   "Apply one owner per area: every function, process and objective has one accountable role, even when many people contribute. Shared ownership usually means no ownership.",
   "Write down the boundaries: spending limits, decisions that need approval and where to escalate. Agree them with the people doing the work, and review role cards when the strategy or structure changes. Volunteers and board officers need role cards too. Role cards become the basis of job adverts and contracts in Module 4."
  ],
  "weak": "Everyone owns partnerships.",
  "strong": "Vanita Weavers: the manager prepares shop partnership proposals and agrees terms within the committee’s pricing rules; the committee approves any new retail chain; the general body is told at its annual meeting.",
  "why": "People can see who prepares, who decides and who is told.",
  "reflect": "Which recurring decision currently gets delayed or duplicated?",
  "exercise": "Create role cards for your essential roles.",
  "fields": [
   {
    "key": "roles",
    "label": "Role framework",
    "hint": "Role | purpose | expected results | decisions allowed | approval needed | support required."
   }
  ],
  "check": "Could someone use the role card to decide when to act and when to ask?",
  "gallery": {
   "title": "Five example role frameworks",
   "intro": "How each organisation wrote role cards for its essential roles, including what each role can decide on its own.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "roles": "Co-founder, programmes and safeguarding (Sari) | young people restore mangroves safely | 10 planting days, survival checked twice a year | planting dates, teams, stopping an activity | spending over US$100 (with Wayan) | a deputy safeguarding contact\nCo-founder, schools and partners (Wayan) | villages, school and sponsors back the work | 2 school sessions a month, one site agreement per village | session content, first talks with sponsors | any agreement or sponsorship (with Sari) | time off teaching on planting days\nTreasurer (Ibu Made) | money is recorded and trusted | cash book updated weekly, receipts kept | refusing a payment without a receipt | none | a cash book template\nAdult volunteer | young people are safe | attends planting days, two adults always present | stopping an activity if unsafe | anything else | safeguarding briefing"
     },
     "notice": "Notice the decision every volunteer can take alone: stop an activity for safety. Give people authority where risk demands it."
    },
    {
     "org": "ngo",
     "profile": {
      "roles": "Director (Achieng) | leads Imara to its strategy | budget met, no funder over 40%, board informed | hiring within budget, spending up to US$10,000, partner MoUs | reserved matters (board) | chair’s support\nProgramme manager (Brian) | clubs build confidence and skills | 14 clubs running, 25 mentors active, surveys done | club schedules, mentor placement, up to US$1,000 | new schools, camp changes | a deputy for MEAL\nClub coordinator (3) | weekly clubs run safely and well | attendance above 80%, issues reported within 24 hours | session plans, mentor rotas, up to US$100 | changes to a school agreement | transport, training\nFinance officer (Grace) | accurate, timely finance | accounts by the 10th, clean audit | payments within budget | payments over US$1,000 (second signatory) | audit support"
     },
     "notice": "Copy the measurable results in each card, such as “issues reported within 24 hours”. They tell people what good looks like."
    },
    {
     "org": "social",
     "profile": {
      "roles": "Master baker and general manager (Lucía) | bread good enough to pay for training | daily production met, waste under 5% | recipes, shifts, supplier orders up to US$2,000 | loans, contracts (with Diego) | a second baker to cover her\nTraining and partnerships lead (Diego) | trainees move into formal jobs | completion, certificates, jobs at 3 months | trainee selection, mentoring plans | ending a trainee contract (with Lucía) | time freed from wholesale\nCafé supervisor | café runs well and makes money | sales target met, daily cash count matches | breaks, purchases up to US$100 | refunds over US$30 | point-of-sale training\nWholesale salesperson | office clients kept and grown | orders on time, one new client a quarter | delivery times | prices, new contracts | sales records"
     },
     "notice": "See how the card names the condition that matters most to the mission: Diego needs time freed from wholesale to do the training well."
    },
    {
     "org": "coop",
     "profile": {
      "roles": "Manager (Meera) | the society runs well between committee meetings | weavers paid within 15 days, festival stock ready | yarn orders up to US$2,000, shop orders at agreed prices | piece rates, new retail chains, grants | a deputy for online sales\nQuality officer | every piece meets our standard | each piece checked, rejection rate tracked | accepting or rejecting a piece, with a reason | changing standards | a written standard\nDesigner | collections that sell | 2 collections a year | designs, colours, student placements | final collection (with Meera) | sample yarn budget\nCommittee president (Sreeja) | the committee leads fairly and members are heard | monthly meetings, minutes shared, elections on time | agenda; urgent decisions with treasurer and secretary | anything for the general body | secretary support"
     },
     "notice": "Notice the president has a role card too. Elected positions work better when their duties and limits are written down."
    },
    {
     "org": "hybrid",
     "profile": {
      "roles": "Director (Tom) | the charity and its company meet their aims | budgets met, shop profit to the charity | hiring within budget, spending up to £10,000 | reserved matters (trustees) | a deputy for finance\nWorkshop lead (Priya) | safe, successful repairs | 48 repair cafés, all repairers PAT trained | items accepted, refusing an unsafe repair, tools up to £500 | new repair services | a second PAT tester\nShop manager (Riverside Reuse Ltd) | the shop makes a profit for the charity | profit target, every electrical item tested | prices, stock up to £500 | contracts, new suppliers | volunteer shop team\nVolunteer coordinator | volunteers are recruited, safe and valued | 40 active volunteers, expenses paid within a month | placements, tool library rules | ending a volunteer’s role | volunteer database"
     },
     "notice": "Copy the right to refuse an unsafe repair. Authority to say no is as important as authority to spend."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "delegation",
  "title": "Decision rights and delegation of authority",
  "sheet": "Delegation of authority",
  "learn": [
   "A delegation of authority (also called a scheme of delegation or authority matrix) states who may approve what, up to which limit. It covers spending and contracts, hiring, policies, partnerships, public statements, access to personal data and exceptions to normal rules.",
   "Set limits that match the risk. Routine purchases within budget can be approved by a budget holder; larger commitments need the director or manager; the largest need the governing body. Add a second check, such as a second signatory, where risk rises.",
   "Plan for absence and conflicts. Say who approves when the usual approver is away, and that no one approves a payment to themselves or a decision in which they have a personal interest.",
   "Delegation is not abdication. The person delegating stays accountable for checking that authority is used well. Review the matrix as you grow, and use the same thresholds in your finance procedures (Module 9)."
  ],
  "weak": "The director approves spending.",
  "strong": "Imara Girls in Science: coordinators approve up to US$100 within their club budget; the programme manager up to US$1,000; the director up to US$10,000; the board above that or any unbudgeted item over US$2,000. Three quotes above US$500; a second signatory above US$1,000.",
  "why": "Clear thresholds tell everyone who can say yes, and add a second check where risk rises.",
  "reflect": "Which decision currently waits for one person, even though it carries little risk?",
  "exercise": "Draft your delegation of authority matrix.",
  "fields": [
   {
    "key": "matrix",
    "label": "Delegation matrix",
    "hint": "Decision type | limit or condition | who prepares | who approves | who must be informed."
   },
   {
    "key": "absence",
    "label": "Absence and conflicts",
    "hint": "Who approves when the usual approver is away or has a conflict of interest?"
   }
  ],
  "check": "Does every approval limit match the level of risk involved?",
  "anatomy": {
   "title": "Levels of decision rights",
   "intro": "A simple ladder. Your limits will differ; what matters is that the level rises with the risk.",
   "cols": [
    "Level",
    "Typical decisions",
    "Checks"
   ],
   "rows": [
    [
     "Team member or budget holder",
     "Small purchases within their budget line; daily delivery choices",
     "Receipts kept; within the approved budget"
    ],
    [
     "Director or manager",
     "Larger purchases, hiring within budget, routine partner agreements",
     "Quotes above a set amount; second signatory on larger payments"
    ],
    [
     "Committee of the board",
     "Items prepared for the board, urgent decisions between meetings",
     "Reports to the next full meeting"
    ],
    [
     "Governing body",
     "Reserved matters: budget, strategy, major contracts, borrowing, key policies",
     "Recorded in minutes; conflicts declared"
    ],
    [
     "Members or shareholders",
     "Founding document, electing the board, sharing surplus or dividends",
     "General meeting or shareholders’ agreement"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example delegation matrices",
   "intro": "How each organisation set approval limits, with rules for absence and conflicts.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "matrix": "Spending up to US$100 within the plan | — | either co-founder | the same co-founder | Ibu Made (cash book)\nSpending over US$100 | — | either co-founder | both co-founders | Ibu Made\nSite agreements | per site | Wayan | both co-founders, then village head signs | volunteers, parents\nSponsorship from dive operators | any amount | Wayan | both co-founders | volunteers\nPhotos of young people on Instagram | with parent consent only | youth team | Sari | the young people shown\nAccess to young people’s contact details | named people only | Sari | Sari | both co-founders",
      "absence": "If one co-founder is away, spending over US$100 waits or is approved by the other co-founder with Ibu Made. Neither co-founder approves a payment to themselves or a relative; Ibu Made checks those. Safeguarding concerns about a co-founder go to Ibu Made."
     },
     "notice": "Notice the matrix covers photos and personal data, not only money. For a group working with children, those are its biggest risks."
    },
    {
     "org": "ngo",
     "profile": {
      "matrix": "Purchases within club budget | up to US$100 | coordinator | coordinator | programme manager\nPurchases | US$100–1,000; three quotes over US$500 | coordinator or Grace | Brian | Grace\nPurchases and contracts | US$1,000–10,000 | Brian or Grace | Achieng; second signatory over US$1,000 | treasurer, monthly\nAbove US$10,000 or unbudgeted over US$2,000 | — | Achieng | board | funders if their grant is used\nHiring staff | within budget | Brian | Achieng | board chair\nNew school partnership | — | Brian | Achieng | board, quarterly\nPublic statements and media | — | Achieng | Achieng | chair\nAccess to girls’ data | named staff only | Brian | Achieng | finance and safeguarding committee",
      "absence": "When Achieng is away, Brian approves up to US$5,000 and the chair approves above that. Achieng’s own expenses are approved by the treasurer. Anyone with a family link to a supplier declares it and does not approve."
     },
     "notice": "Copy the reduced limit for the deputy. Cover for an absent director does not have to come with the director’s full authority."
    },
    {
     "org": "social",
     "profile": {
      "matrix": "Small café purchases and refunds | up to US$100; refunds up to US$30 | café supervisor | café supervisor | Lucía\nIngredient and supplier orders | up to US$2,000 | Lucía | Lucía | accountant\nOffice client contracts | over US$5,000 a year | salesperson | Lucía and Diego jointly | advisory group\nHiring or ending a contract | any | Lucía or Diego | both directors | team\nTrainee selection | each cohort | Diego with the municipality | Diego | Lucía\nLoans and new equipment | over US$5,000 | Lucía | both directors; shareholders if new investors | accountant\nSharing a trainee’s story | written consent | Diego | the trainee, then Diego | Lucía",
      "absence": "If one director is away, the other can approve up to US$2,000; larger items wait unless urgent and are confirmed in writing. Neither director approves their own expenses alone. A payment to a director’s relative needs the other director’s approval."
     },
     "notice": "See how the trainee decides on their own story. Some approvals belong to the person affected, not to management."
    },
    {
     "org": "coop",
     "profile": {
      "matrix": "Yarn and dye orders | up to US$2,000 an order, within budget | Meera | Meera | accounts clerk\nYarn and dye orders | US$2,000–5,000 | Meera | purchase subcommittee (treasurer and two members) | committee, next meeting\nAbove US$5,000 or unbudgeted | — | Meera | committee | general body, in the annual report\nPayments to weavers and suppliers | all | accounts clerk | Meera and the treasurer sign | committee, monthly\nPiece rates | yearly | Meera | committee | all members\nRejecting a piece | each piece | quality officer | quality officer; appeals to the committee | the weaver\nGrants with conditions | any | Meera | committee, then general body if control is affected | state cooperative department",
      "absence": "When Meera is away, the treasurer and president approve orders up to US$2,000. A committee member whose own piece is in dispute, or who sells yarn, leaves the room for that decision."
     },
     "notice": "Notice the appeal route for rejected pieces. Where members are also suppliers, the matrix must say how they challenge a decision fairly."
    },
    {
     "org": "hybrid",
     "profile": {
      "matrix": "Tools and parts | up to £500 | Priya | Priya | Tom\nShop stock and small purchases (company) | up to £500 | shop manager | shop manager | Tom\nSpending within budget | £500–10,000 | budget holder | Tom; second approver over £500 | treasurer, monthly\nAbove £10,000 or unbudgeted over £2,000 | — | Tom | trustees | funders if relevant\nShop contracts within the approved plan | — | shop manager | company board | trustees, quarterly\nRefusing an unsafe repair or sale | any | any repairer | Priya | volunteer coordinator\nAccess to residents’ data | named roles | volunteer coordinator | Tom | trustees, yearly",
      "absence": "When Tom is away, chair Helen approves items over £1,000, with the treasurer as second signatory. Tom does not approve the shared-cost recharge between charity and company: the trustees who are not company directors review it each year."
     },
     "notice": "Copy how the cross-entity recharge is approved by people with no conflict. In a hybrid, deals between the two entities need the most care."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "organisation-structure"
  ],
  "video": null,
  "stage": "Implement",
  "id": "raci",
  "title": "RACI and process ownership",
  "sheet": "RACI",
  "learn": [
   "RACI is a simple way to show who does what in a process or decision. Each letter stands for one kind of involvement, as the table below shows.",
   "Use it for recurring processes and decisions that cross roles: the annual plan, recruitment, a grant application, publishing a story, approving a partnership, responding to a complaint. Keep exactly one Accountable per row, and be sparing with Consulted, which slows things down.",
   "A simpler variant is an ownership table: for each process, one owner and named helpers. Whichever you use, share it, refer to it in meetings and update it when roles change. Many coordination problems disappear once ownership is written down."
  ],
  "weak": "The team decides together.",
  "strong": "Pan del Barrio, trainee selection: Responsible: Diego. Accountable: Diego. Consulted: Lucía, the municipal youth programme. Informed: café supervisor, advisory group.",
  "why": "It shows who does the work, who owns the result, who gives input and who needs to know.",
  "reflect": "Where do two people both believe they are accountable for the same result?",
  "exercise": "Build a RACI for your five most important recurring processes or decisions.",
  "fields": [
   {
    "key": "raci",
    "label": "RACI table",
    "hint": "Process or decision | Responsible | Accountable (one) | Consulted | Informed."
   },
   {
    "key": "conflicts",
    "label": "Ownership conflicts found",
    "hint": "Where did you find gaps or two owners, and how will you resolve them?"
   }
  ],
  "check": "Does every row have exactly one Accountable role?",
  "anatomy": {
   "title": "The four RACI letters",
   "intro": "One row of a RACI table uses each letter for a different kind of involvement.",
   "cols": [
    "Letter",
    "Meaning",
    "How many per row"
   ],
   "rows": [
    [
     "R · Responsible",
     "Does the work or prepares the decision",
     "One or more"
    ],
    [
     "A · Accountable",
     "Owns the result and signs it off; can say no",
     "Exactly one"
    ],
    [
     "C · Consulted",
     "Gives input before the work is finished; two-way",
     "As few as possible"
    ],
    [
     "I · Informed",
     "Told about the outcome; one-way",
     "Anyone who needs to know"
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example RACI tables",
   "intro": "How each organisation assigned the four roles for its most important recurring processes, and what conflicts it found.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "raci": "Planting day | Sari, volunteers, youth team leaders | Sari | village head (site), nursery (seedlings) | parents, Wayan\nSurvival monitoring | youth teams, Sari | Sari | nursery | village heads, sponsors\nSchool session | Wayan, volunteers | Wayan | school principal | Sari\nParent consent forms | Sari | Sari | — | volunteers on the day\nSponsorship request | Wayan | Wayan | Sari, Ibu Made | volunteers\nCash book | Ibu Made | Ibu Made | — | both co-founders, monthly",
      "conflicts": "Both co-founders thought they owned relations with village heads. We agreed Wayan owns them, and Sari is consulted on any site. Spending over US$100 needs both co-founders’ approval, but the cash book has one owner: Ibu Made."
     },
     "notice": "Notice that even two co-founders found a double owner. Small teams need RACI too, because people assume rather than ask."
    },
    {
     "org": "ngo",
     "profile": {
      "raci": "Annual budget | Grace | Achieng | Brian, coordinators, treasurer | board (approves as reserved matter), staff\nFoundation grant report | Brian (results), Grace (finance) | Achieng | coordinators | board\nMentor recruitment | coordinators | Brian | universities | Achieng\nSafeguarding concern | person who sees it | Achieng (safeguarding lead) | finance and safeguarding committee chair | board, in summary\nConfidence survey | coordinators | Brian | girls’ advisory group | schools, funders\nAdding a new school | Brian | Achieng | head teacher, county education office | board",
      "conflicts": "Brian and Grace both believed they owned funder reports, so two versions went to Foundation A last year. Now Achieng is Accountable, each prepares their part. Consulted on the budget was “everyone”; we cut it to three roles."
     },
     "notice": "Copy how a split task, results and finance, still ends with one Accountable person for what goes to the funder."
    },
    {
     "org": "social",
     "profile": {
      "raci": "Trainee selection | Diego | Diego | Lucía, municipal youth programme | café supervisor, advisory group\nDaily production plan | Lucía | Lucía | café supervisor, salesperson | trainees\nOffice client contract | salesperson | Lucía (jointly with Diego over US$5,000 a year) | accountant | team\nJob matching at graduation | Diego | Diego | employer partners | Lucía\nMonthly accounts | accountant | Lucía | Diego | advisory group\nPrice changes | Lucía | Lucía (with Diego’s agreement over 10%) | salesperson, advisory group | customers",
      "conflicts": "Lucía and Diego each told trainees different rules on lateness. Now Diego owns the trainee code of conduct and Lucía is consulted. Wholesale sat between Diego and the salesperson with no clear owner. Lucía is now Accountable and the salesperson Responsible, freeing Diego for trainees."
     },
     "notice": "See how a disagreement about trainees became a RACI fix: one owner for the rules, so trainees hear one message."
    },
    {
     "org": "coop",
     "profile": {
      "raci": "Monthly yarn purchase | Meera | Meera (purchase subcommittee above US$2,000) | quality officer, designer | committee\nPiece quality check | quality officer | quality officer | designer | weaver, accounts clerk\nWeaver payment | accounts clerk | treasurer | Meera | weaver, committee\nNew design collection | designer | Meera | committee, selected weavers | members\nAnnual general meeting | secretary | president Sreeja | committee | all members, state cooperative department\nApprentice intake | senior weavers | committee member named as apprentice lead | families | members",
      "conflicts": "Payments had two owners: Meera and the treasurer both thought they signed off. Now the treasurer is Accountable and Meera is consulted. The apprentice scheme had no owner; the committee named one member to lead it."
     },
     "notice": "Notice that an elected volunteer can be Accountable. In a cooperative, some processes belong to the committee rather than to staff."
    },
    {
     "org": "hybrid",
     "profile": {
      "raci": "Repair café | Priya, volunteers | Priya | volunteer coordinator | Tom, residents via newsletter\nPAT testing of shop items | trained volunteers | Priya | shop manager | company board\nAnnual profit transfer | bookkeeper | treasurer | Tom, accountant | trustees, company board\nSchool workshop booking | schools officer | schools officer | Priya (safety), teachers | Tom\nVolunteer recruitment | volunteer coordinator | volunteer coordinator | Priya, shop manager | Tom\nTrustee papers | Tom | chair Helen | treasurer | trustees",
      "conflicts": "Electrical safety of shop items had two owners, Priya and the shop manager. Priya is now Accountable for safety in both entities; the shop manager is consulted. Communications had no owner and will be given to one."
     },
     "notice": "Copy how one person owns safety across both entities. Splitting a safety duty between charity and company would leave gaps."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Manage",
  "id": "accountability",
  "title": "Accountability and reporting lines",
  "sheet": "Accountability map",
  "learn": [
   "Accountability means being answerable for what you do and what results from it. In purpose-led organisations it runs in several directions: upward to the board, funders, investors and regulators; sideways to partners and peers; and downward to the people and communities you serve.",
   "For each direction, decide what you report, how often and in what format. Upward reports usually cover results, finance and risk. Downward accountability means sharing information in ways people can use, inviting feedback and explaining decisions; Module 6 develops it further.",
   "Inside the organisation, accountability depends on clear expectations, regular review and fair consequences. Pair it with support: people should be able to raise problems early without fear. When things go wrong, separate learning from blame."
  ],
  "weak": "We report to our donors once a year.",
  "strong": "Vanita Weavers: monthly summary to the committee; audited accounts and the bonus to the general body each year; the annual audit by the state cooperative department; payment dates shared in each village WhatsApp group; shops told of delays within a week.",
  "why": "It covers accountability in several directions, each with a rhythm and a format.",
  "reflect": "To whom do you currently feel least accountable, and why?",
  "exercise": "Map your accountability lines and reporting rhythm.",
  "fields": [
   {
    "key": "lines",
    "label": "Accountability map",
    "hint": "To whom | what we report | format | frequency | owner."
   },
   {
    "key": "internal",
    "label": "Internal accountability",
    "hint": "How expectations are set, reviewed and supported inside the team."
   }
  ],
  "check": "Does your map include the people you serve, not only those who fund or govern you?",
  "gallery": {
   "title": "Five example accountability maps",
   "intro": "How each organisation mapped who it answers to, what it reports and how it holds its own team to account.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "lines": "Young people | what we planted, what survived, what changes next | talk at the end of each planting day; Instagram run by young people | monthly | Sari\nParents | dates, safety arrangements, any incident | WhatsApp message; consent forms | before each activity | Sari\nVillage heads | sites, survival, any dispute with pond owners | short meeting | every three months | Wayan\nDive operators and small donors | money spent, survival results with photos | one-page update | twice a year | Wayan, Ibu Made\nMembers (after registration) | yearly report and cash book summary | general meeting | yearly | board",
      "internal": "Co-founders agree each month’s plan in the WhatsApp group and check it the next month. Volunteers get a short briefing before planting days. Ibu Made checks the cash book against receipts each month. If something goes wrong, we talk about what to change, not who to blame."
     },
     "notice": "Notice that young people and parents come first on the map. A group working with children answers to them before it answers to sponsors."
    },
    {
     "org": "ngo",
     "profile": {
      "lines": "Board | results, finance, risks, safeguarding | quarterly dashboard and accounts | quarterly | Achieng\nFoundation A and B | results and spending against the grant | report in their format | as agreed (six-monthly) | Achieng, with Brian and Grace\nCounty education office | clubs running, girls reached | short meeting | termly | Brian\nHead teachers | attendance and any issues in their school | one-page school report | termly | coordinators\nParents | what girls did, camp dates, any concern | WhatsApp and parent sessions | termly | coordinators\nGirls | what we heard from them and what changed | girls’ advisory group, “you said, we did” poster in each club | termly | Brian\nRegulator | annual return and accounts | required forms | yearly | Grace",
      "internal": "Each staff member has a work plan agreed with their manager, a monthly one-to-one and a yearly appraisal. Mentors sign a mentor agreement and get feedback each term. Problems in a club are reported within 24 hours, with no blame for reporting."
     },
     "notice": "Copy the “you said, we did” poster. Downward accountability works best when girls can see what changed because they spoke."
    },
    {
     "org": "social",
     "profile": {
      "lines": "Shareholders (Lucía and Diego) | monthly accounts, cash, trainee results | directors’ meeting | monthly | Lucía\nAdvisory group | sales, cash, trainee outcomes, decisions taken | short pack | every two months | Diego\nTrainees | their progress, what they need to pass | weekly check-in; end-of-cohort feedback | weekly; each cohort | Diego\nEmployer partners | graduates’ skills and readiness | call and visit | each cohort | Diego\nMunicipal youth programme | referrals, completion and jobs at 3 months | short report | each cohort | Diego\nOffice clients | delivery issues | message | when they occur | salesperson\nTax authority and health licence | returns, inspections | required forms | as required | accountant, Lucía",
      "internal": "Weekly staff meeting reviews production and any trainee issues. Trainees get clear expectations on day one and a written warning before any contract ends. Lucía and Diego review each other’s areas at the monthly directors’ meeting."
     },
     "notice": "See how a company with two owners creates outside accountability on purpose: an advisory group and reports to the municipality."
    },
    {
     "org": "coop",
     "profile": {
      "lines": "General body (all members) | audited accounts, bonus, committee report | annual general meeting | yearly | president Sreeja, Meera\nCommittee | sales, payments, rejections, cash | monthly summary | monthly | Meera\nMember weavers | payment dates, piece rates, rejection reasons | village WhatsApp groups; open books on request | monthly | accounts clerk, secretary\nState cooperative department | accounts, records, elections | audit | yearly | treasurer\nRetail shops | orders, delays, quality | message and visit | per order | Meera\nOnline buyers | weaver’s name and authentic handloom | product listing | per sale | designer",
      "internal": "Staff have yearly targets set by the committee; Meera has a monthly review with the president. The quality officer gives a written reason for each rejection, so weavers can improve and appeal. Mistakes in payments are corrected within a week and reported to the committee."
     },
     "notice": "Notice “open books on request”: a stated value becomes a reporting line any member can use."
    },
    {
     "org": "hybrid",
     "profile": {
      "lines": "Trustees | results, finance for both entities, risks, safety | quarterly dashboard | quarterly | Tom\nCharity regulator | annual report and accounts | required return | yearly | treasurer, Tom\nCompanies House and tax authority (company) | company accounts and tax return | required forms | yearly | bookkeeper\nGrant funders and the council | results and spending | reports in their format | as agreed | Tom\nResidents | what was repaired, what we heard | newsletter and “you said, we did” board at repair cafés | quarterly | volunteer coordinator\nVolunteers | plans and changes | volunteer forum | twice a year | volunteer coordinator\nSchools | pupils’ confidence and feedback | short report | each term | schools officer",
      "internal": "Staff have work plans, monthly one-to-ones and a yearly appraisal; Helen leads Tom’s. Volunteers have role descriptions and a check-in after three months. Every safety near-miss is logged and discussed at the next team meeting to learn, not blame."
     },
     "notice": "Copy how each entity has its own regulator line. A hybrid answers to more bodies, and the map shows who owns each one."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "meetings-actions-decisions"
  ],
  "video": null,
  "stage": "Manage",
  "id": "coordination",
  "title": "Coordination and internal communication",
  "sheet": "Meetings",
  "learn": [
   "Coordination makes hand-offs reliable. A hand-off needs a named recipient, an agreed output and a date. Sharing a document is not the same as agreeing who will act on it.",
   "Design an operating rhythm: a short weekly meeting for priorities and blockers, regular one-to-ones, a monthly look at numbers and learning, and a quarterly review. Use meetings for decisions and problem-solving; routine updates can be shared beforehand.",
   "Agree your internal channels: what goes in chat, what goes by email, where documents live and where decisions are recorded. Keep one decision log so absent colleagues can see what changed and why. Add a route for flagging overload and conflicting priorities."
  ],
  "weak": "Hold a weekly meeting.",
  "strong": "Riverside Repair Hub: every Monday, Tom, Priya, the volunteer coordinator, schools officer and shop manager spend 30 minutes on blocked work and the week’s priorities; the volunteer coordinator records decisions and next owners in the decision log.",
  "why": "The routine has a purpose, named people and a visible record.",
  "reflect": "Which hand-off is most likely to fail?",
  "exercise": "Define your operating rhythm, communication channels and one critical hand-off.",
  "fields": [
   {
    "key": "rhythm",
    "label": "Coordination rhythm",
    "hint": "Meeting or update | purpose | people | frequency | record."
   },
   {
    "key": "channels",
    "label": "Internal communication rules",
    "hint": "What goes where: chat, email, shared folders, decision log."
   },
   {
    "key": "handoff",
    "label": "Critical hand-off",
    "hint": "From role → to role | deliverable | acceptance check | date."
   }
  ],
  "check": "Does each routine help someone make a decision or complete work?",
  "gallery": {
   "title": "Five example coordination plans",
   "intro": "How each organisation set its operating rhythm, its channel rules and one hand-off that must not fail.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "rhythm": "Co-founders’ check-in | plan the week, agree spending over US$100 | Wayan, Sari | weekly (Sunday evening) | note in the WhatsApp group\nVolunteer briefing | safety, roles, two adults per group | Sari, 4 volunteers | before each planting day | attendance sheet\nMonthly money check | cash book against receipts | Ibu Made, a co-founder | monthly | cash book signed\nSeason review | survival results, next sites | co-founders, volunteers, youth team leaders | twice a year | short notes on the Drive",
      "channels": "WhatsApp group: dates and quick questions only, no photos of young people. Shared Google Drive: consent forms (restricted folder), monitoring sheet photos, plans. Decisions: one “decisions” document on the Drive, updated by Sari. Young people’s contact details stay in the restricted folder.",
      "handoff": "Sari → Ibu Made | photographed monitoring sheets and the planting day’s receipts | sheets complete for every plot; receipts match cash spent | within three days of each planting day"
     },
     "notice": "Notice the channel rule about photos of young people. Coordination rules are also where you protect personal data."
    },
    {
     "org": "ngo",
     "profile": {
      "rhythm": "Team meeting | priorities, blockers, safeguarding issues | all 6 staff | monthly (first Monday) | decision log\nCoordinators’ huddle | club issues, mentor gaps, kits | Brian, 3 coordinators | weekly, 30 minutes | action list\nOne-to-ones | workload, support, development | each manager and staff member | monthly | short note\nData review | attendance and survey numbers | Brian, Grace, coordinators | monthly | dashboard\nQuarterly review | results, budget, board papers | Achieng, Brian, Grace | quarterly | board pack",
      "channels": "WhatsApp: urgent club issues and parent groups only. Email: funders, schools and anything that needs a record. Shared drive: plans, reports, the attendance export. Girls’ data stays in the tablet tool, never in chat. Decision log in the shared drive, kept by Brian. Overload: raise in one-to-ones or tell Brian directly.",
      "handoff": "Club coordinators → Brian | monthly attendance and confidence survey data | every club listed, missing data explained | by the 5th of each month, so Grace can prepare funder reports"
     },
     "notice": "Copy the reason given for the deadline: the hand-off date is set by the next person’s deadline, not by habit."
    },
    {
     "org": "social",
     "profile": {
      "rhythm": "Morning line-up | today’s orders, who bakes what, trainee tasks | Lucía, café supervisor, trainees on shift | daily, 10 minutes | whiteboard\nStaff meeting | problems, customer feedback, trainee progress | all 9 | weekly | notes in the shared spreadsheet\nTrainee check-in | progress and needs | Diego, each trainee | weekly | trainee records\nDirectors’ meeting | accounts, cash, decisions | Lucía, Diego | monthly | decision log\nAdvisory group | outside challenge | directors and 3 advisers | every two months | short notes",
      "channels": "WhatsApp: customer orders (business number) and shift changes. Whiteboard: production plan. Spreadsheet: trainee records, restricted to Diego and Lucía. Email: office clients, the accountant, the municipality. Decision log: a tab in the shared spreadsheet, kept by Diego.",
      "handoff": "Salesperson → Lucía | next day’s wholesale orders | quantities confirmed with each office client | by 3 pm the day before"
     },
     "notice": "See how the rhythm matches a bakery: a ten-minute daily line-up does more here than a long weekly meeting would."
    },
    {
     "org": "coop",
     "profile": {
      "rhythm": "Staff meeting | orders, yarn stock, quality issues | Meera, quality officer, designer, accounts clerk | weekly | action list\nCommittee meeting | sales, payments, rejections, decisions | committee of nine, Meera | monthly | minutes in Malayalam\nVillage updates | payment dates, new designs, questions | secretary and village representatives | monthly | WhatsApp message\nFestival planning | stock, working capital, orders | Meera, treasurer, designer | August | stock plan\nGeneral body meeting | accounts, bonus, elections | all members | yearly | minutes",
      "channels": "Village WhatsApp groups: announcements and questions, in Malayalam. Email: online buyers and shops, in English. Cooperative software: accounts and payments. Piece register: on paper at the office, entered weekly. Decisions: committee minutes, read out at the next meeting.",
      "handoff": "Quality officer → accounts clerk | list of accepted pieces with weaver names | every piece in the register; rejections with a reason | every Friday, so weavers are paid within 15 days"
     },
     "notice": "Notice the hand-off protects a value, fair and on-time payment. The most important hand-offs are the ones your promises depend on."
    },
    {
     "org": "hybrid",
     "profile": {
      "rhythm": "Team meeting | blocked work, week’s priorities | Tom, 4 leads | weekly (Monday, 30 minutes) | decision log\nRepair café debrief | items fixed, safety issues, volunteer needs | Priya, volunteers on the day | after each café | repair log\nOne-to-ones | workload, support | Tom with each lead | monthly | short note\nShop and charity numbers | sales, profit, shared costs | Tom, shop manager, bookkeeper | monthly | two separate reports\nQuarterly review | results for trustees and the company board | Tom, leads | quarterly | dashboard",
      "channels": "Team chat: daily coordination, no residents’ personal details. Email: funders, schools, the council. Shared drive: separate folders for charity and company. Repair log and volunteer database: named users only. Decision log: shared document, kept by the volunteer coordinator.",
      "handoff": "Priya → shop manager | refurbished electrical items for sale | each item PAT tested and labelled with test date | weekly, by Thursday for the weekend"
     },
     "notice": "Copy the acceptance check: the shop does not take an item without a test label, so safety is built into the hand-off."
    }
   ]
  }
 }),
 review("team-pack","Your Structure & Accountability Pack")
 ]
});
