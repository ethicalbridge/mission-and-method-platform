import {module,lesson,review} from './kit.js';
// Reviewed October 2026: plain explanation, optional table (anatomy), and a gallery showing how the five example
// organisations (course/examples.js; story in docs/example-organisations.md) complete each exercise.
export default module({
 ...{"uses":[1,3,4],"video":null,"id":5,"slug":"internal-systems","phase":"Organise","title":"Internal Systems & Operations","short":"How planning, people, money, compliance, information, tools and issues fit together","intro":"See how the internal systems of a strong organisation fit together, and choose the minimum set your stage needs. This module is a map: it introduces each system and the decisions it needs, and points to the later modules that go deeper into people, MEAL, finance, legal compliance and risk, and planning.","output":"Internal Systems Blueprint","workbook":{"file":"Module-05-Internal-Systems-Operations.xlsx","title":"Internal Systems & Operations workbook"},"promo":{"lesson":"stack","tools":["issue-risk-management","meetings-actions-decisions","organisation-structure","strategy-kpis-annual-planning"],"headline":"One connected toolset instead of ten disconnected apps","pitch":"The Impact Tools share one look, one way of importing and exporting Excel and one set of statuses, so strategy, people, risks, meetings and plans stop living in separate spreadsheets. Each tool works on its own, and you can add them one at a time."}},
 lessons:[
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Understand",
  "id": "systems",
  "title": "What a system is: your organisational operating map",
  "sheet": "Operating map",
  "learn": [
   "An internal system is a repeatable way of doing necessary work. It brings together people, steps, information, decisions and sometimes software. Before you choose an app, be clear about the process it supports, who owns it, what information it needs and which decision it informs.",
   "Systems connect. Strategy sets objectives; the annual plan turns them into work; people deliver it; money pays for it; policies and controls keep it safe; data shows what happened; learning shapes the next plan. A weakness in one system often shows up in another: a missing budget becomes a planning problem, an unclear owner becomes a risk.",
   "Draw your operating map: your main systems, who owns each and how information moves between them. It does not need to look good. It needs to show where work is handed from one system to another, and where those hand-offs fail.",
   "Keep the map. The rest of this module looks at each system in turn, and later modules go deeper, so the map shows you where to start."
  ],
  "weak": "Buy a project management app.",
  "strong": "Pan del Barrio: wholesale orders arrive by WhatsApp to the salesperson, who copies them onto the production whiteboard by 3 pm; Lucía checks the board before the night bake. Missed orders come from messages sent after 3 pm.",
  "why": "It names the process, the owner and the hand-off that fails before reaching for any technology.",
  "reflect": "Which repeated task depends on someone remembering everything?",
  "exercise": "List your essential systems, their owners and how information moves between them.",
  "fields": [
   {
    "key": "systems",
    "label": "Systems inventory",
    "hint": "System | owner | information needed | routine | review date."
   },
   {
    "key": "flows",
    "label": "Key hand-offs between systems",
    "hint": "From system → to system | what is handed over | where it fails today."
   }
  ],
  "check": "Can the process keep working when its usual owner is away?",
  "gallery": {
   "title": "Five example operating maps",
   "intro": "Each organisation lists its main systems and the hand-offs between them, at its own scale.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "systems": "Team communication | Wayan | dates, tides, who is coming | WhatsApp group; Sunday check-in call | Jan 2027\nMoney | Ibu Made | receipts, amounts, who approved | notebook cash book; monthly check with Sari | Jan 2027\nFiles | Sari | plans, photos, scanned agreements | shared Google Drive | Jan 2027\nMonitoring | Sari | survival counts per site | paper sheets, photographed into the Drive | after each check\nYoung people and parents | Sari | names, ages, parental consent, phone numbers | paper forms in a locked box; one restricted list | Jan 2027",
      "flows": "Planting day → money | receipts for seedlings, boat hire, snacks | receipts stay in volunteers' pockets for weeks\nMonitoring → planning | survival counts per site | sheets photographed late, so site choices are guesses\nConsent records → planting day | who has permission to come | the day leader does not always have the list\nWhatsApp → files | decisions made in the chat | decisions get lost in the chat history"
     },
     "notice": "Notice that a group of six people still has five systems, each with an owner. Copy the honest 'fails today' column: it shows Tide Line what to fix first, without any new software."
    },
    {
     "org": "ngo",
     "profile": {
      "systems": "Programme delivery | Brian | club schedules, mentor rota | weekly coordinators' check-in | Mar 2027\nAttendance and results | Brian | attendance, confidence survey, skills checklist | tablet form, synced weekly | Mar 2027\nFinance | Grace | budget, receipts, grant codes | accounting software; monthly accounts by day 10 | Mar 2027\nPeople | Achieng | contracts, appraisals, mentor agreements | restricted folder; annual appraisals | Mar 2027\nFunder reporting | Achieng | results and spending per grant | reporting calendar | Jan 2027\nGovernance | Achieng with the board chair | board papers, decisions | quarterly board meetings | Feb 2027",
      "flows": "Attendance → funder reports | attendance and survey data per school | two schools without signal sync weeks late\nFinance → programme | spending against budget per grant | coordinators see budget figures only quarterly\nProgramme → finance | kit and transport requests | requests arrive by WhatsApp with no approval recorded\nProgramme → board | results and safeguarding summary | papers reach the board two days before meetings"
     },
     "notice": "See how Imara treats funder reporting as a system with its own owner. Copy the habit of naming a practical cause, like schools without signal, rather than blaming people."
    },
    {
     "org": "social",
     "profile": {
      "systems": "Café sales | café supervisor | daily sales, cash count | point-of-sale; daily cash close | Jan 2027\nWholesale orders | salesperson | client orders, delivery times | WhatsApp orders copied to the whiteboard | Jan 2027\nProduction | Lucía | orders, stock, staff on shift | whiteboard schedule, updated daily | Jan 2027\nBookkeeping and tax | external accountant, with Diego as contact | sales reports, invoices, receipts | monthly books | Feb 2027\nTrainees | Diego | contracts, attendance, check-ins, follow-up | spreadsheet; weekly check-ins | Feb 2027",
      "flows": "Wholesale orders → production | quantities and delivery times | orders sent late at night are missed\nPoint-of-sale → accountant | monthly sales report and receipts | receipts handed over in a bag, some missing\nTrainee records → employer partners | graduates ready for job-matching | employer contacts live only in Diego's phone\nProduction → purchasing | flour and stock levels | nobody notices low stock until it runs out"
     },
     "notice": "Notice that the outside accountant is part of a system, with Diego as the internal owner. Copy how each hand-off names exactly what is passed over."
    },
    {
     "org": "coop",
     "profile": {
      "systems": "Accounts | accounts clerk | sales, purchases, bank | cooperative software; monthly report | Apr 2027\nPiece register and payments | accounts clerk | pieces, grade, piece rate | daily register; paid within 15 days | Apr 2027\nQuality | quality officer | standards, rejected pieces | every piece checked on arrival | Apr 2027\nOnline sales | designer | photos, listings, orders | marketplace shop; orders checked daily | Apr 2027\nMember communication | Meera | notices, meeting dates | WhatsApp groups by village | Apr 2027\nGovernance | president Sreeja | committee decisions, audit papers | monthly committee; annual general meeting | Sep 2027",
      "flows": "Quality → piece register | accepted pieces and grade | rejected pieces are not recorded, so weavers dispute payments\nOnline orders → stock | which saris are sold | a sari sold online is also sent to a shop\nPiece register → payments | amount owed to each weaver | payments wait for the treasurer's signature\nAccounts → committee | monthly sales and cash | figures arrive after the yarn order is already decided"
     },
     "notice": "Look at the piece register: it links quality, payments and members' trust. Copy how Vanita traces payment disputes back to a missing record."
    },
    {
     "org": "hybrid",
     "profile": {
      "systems": "Finance | Tom with the treasurer | income, spending, shared costs | separate books for charity and company; monthly | Apr 2027\nVolunteers | volunteer coordinator | roles, training, PAT and DBS dates | volunteer database | Jan 2027\nRepair cafés | Priya | item, fault, result, weight | paper repair log at each café | Jan 2027\nTool library | volunteer coordinator | bookings, returns, condition | booking system | Jan 2027\nShop | shop manager | stock, sales, test labels on electricals | till and stock list | Apr 2027\nGovernance | Tom and chair Helen | papers for both boards | quarterly meetings | Mar 2027",
      "flows": "Shop → charity finance | profit and shared costs | the recharge for staff time is worked out only at year end\nRepair log → funder reports | items fixed, kg diverted | paper logs are typed up weeks later\nVolunteer database → repair cafés | who is trained and PAT-certified | rotas are made from memory\nWorkshop → shop | refurbished electricals and their test record | items wait unlabelled, so no one knows which are tested"
     },
     "notice": "Notice that two legal entities share systems, so the shop-to-charity hand-off is listed. Copy flagging the safety-related hand-off: it shows where a gap could hurt someone."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Understand",
  "id": "minimum",
  "title": "Minimum viable systems by stage",
  "sheet": "Systems by stage",
  "learn": [
   "Systems should be proportionate. A founder working alone needs a few habits, not a manual. A team of five needs shared routines. A team of twenty needs documented processes, clear controls and someone responsible for operations.",
   "A useful minimum for most new organisations: a shared folder with a clear structure; a simple budget and a record of income and spending; a list of commitments and deadlines; short essentials for conduct, safeguarding where relevant and data protection; a weekly planning routine; and one place to record decisions.",
   "Add systems when a trigger appears: hiring the first employee, receiving restricted funding, starting work with children or adults at risk, handling personal data at scale or opening a second site. Write the triggers down now, so the next step is a decision rather than a crisis.",
   "Over-systematising is a real risk. Tools nobody maintains, procedures nobody reads and duplicated records waste scarce time. Keep each system as simple as its risk allows."
  ],
  "weak": "We will set up all systems properly before we start.",
  "strong": "Tide Line: now, a WhatsApp group, a shared Drive, Ibu Made's cash book, paper consent forms and a Sunday check-in. Once registered: a bank account with two signatories. When the first grant arrives: a grant column in the cash book.",
  "why": "It keeps today's systems small and names the events that will justify adding more.",
  "reflect": "Which system are you maintaining that no one actually uses?",
  "exercise": "Define your minimum viable systems and the triggers for adding more.",
  "fields": [
   {
    "key": "now",
    "label": "Systems we need now",
    "hint": "System | why now | simplest version."
   },
   {
    "key": "triggers",
    "label": "Triggers for the next systems",
    "hint": "Trigger event | system to add | owner."
   }
  ],
  "check": "Is each system proportionate to the risk it manages?",
  "anatomy": {
   "title": "Minimum viable systems by stage",
   "intro": "Each stage keeps what came before and adds only what its new risks require.",
   "cols": [
    "Stage",
    "Minimum viable systems",
    "Triggers to add more"
   ],
   "rows": [
    [
     "Idea: founders and volunteers",
     "Group chat, shared folder, cash book with receipts, a decisions note, consent forms if you work with people",
     "Registering, opening a bank account, the first grant, first work with children"
    ],
    [
     "Early delivery: regular activities, first staff",
     "Add: bank account in the organisation's name, two signatories, simple bookkeeping, contracts, a leave record",
     "First employee, first restricted grant, personal data held regularly"
    ],
    [
     "Growing: about 5 to 20 people",
     "Add: accounting software, approval limits, process owners, a planning calendar, restricted personnel files",
     "Several funders' rules, a second site, a second legal entity"
    ],
    [
     "Established: 20 people or more",
     "Add: an operations lead, written procedures, regular review of controls, connected data systems",
     "New countries, large contracts, audit findings"
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example minimum system plans",
   "intro": "Each organisation names what it needs now, in its simplest form, and what will trigger the next step.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "now": "Team communication | planting days need quick coordination | one WhatsApp group; decisions copied to a Drive note each Sunday\nMoney record | donations and spending must be traceable | Ibu Made's notebook cash book; receipts in a monthly envelope\nConsent and contacts | we work with children | paper consent forms in a locked box; one restricted contact list\nSurvival monitoring | survival is how we judge our work | paper sheets, photographed into the Drive\nWeekly planning | both co-founders are part-time | a 20-minute Sunday call",
      "triggers": "Association registered | bank account with two signatories; members' register | Wayan and Ibu Made\nFirst grant won | grant column in the cash book; report dates in the calendar | Ibu Made and Sari\nYouth team leaders start (year two) | role descriptions; safeguarding refresher | Sari\nMore than 40 young people or a third village | attendance spreadsheet instead of paper lists | Sari\nFirst paid role | contract and payroll, with local advice | Wayan"
     },
     "notice": "Notice that every system fits on a phone and in a notebook. Copy the trigger list: Tide Line knows the bank account comes with registration, not before."
    },
    {
     "org": "ngo",
     "profile": {
      "now": "Accounting | two foundation grants must be tracked separately | accounting software with grant codes\nAttendance and survey data | results for funders and the board | tablet form, one tablet per coordinator\nPersonnel and mentor records | contracts and vetting are confidential | restricted folder for the director and finance officer\nProcurement | donor money must be spent fairly | three quotes for purchases over US$500\nPlanning and reporting calendar | 14 schools, a board and two funders | one shared calendar",
      "triggers": "Foundation A grant ends next year | income tracking by funder; diversification plan | Achieng\nA new institutional funder | that funder's procurement and reporting rules added to our procedures | Grace\nMore than 20 schools | a simple database instead of spreadsheets | Brian\nPaid STEM kits, if ever approved | separate sales records; advice on a trading arm | Achieng with the board"
     },
     "notice": "See how a known future event, the end of the Foundation A grant, is written as a trigger. Copy the habit of adding a funder's rules only when that funder arrives."
    },
    {
     "org": "social",
     "profile": {
      "now": "Point-of-sale | daily sales and cash | existing system; daily close by the café supervisor\nMonthly books and tax | legal obligation | external accountant\nProduction schedule | orders and shifts | whiteboard, photographed each evening\nTrainee records | contracts, attendance, follow-up at 3 and 12 months | one spreadsheet, restricted to Diego and Lucía\nFood safety checks | health licence and customers' trust | daily cleaning and temperature checklist",
      "triggers": "Municipal training grant agreed | separate budget line and grant reporting; possibly a partner nonprofit | Diego\nBIC status adopted | annual impact report built from existing trainee data | Diego\nMore than three office clients | one order sheet instead of WhatsApp messages | salesperson\nA second shop | stock system linked to the point-of-sale | Lucía"
     },
     "notice": "Notice that the food safety checklist sits beside the accounts: a bakery's risks decide its minimum. Copy how BIC status would reuse data the bakery already collects."
    },
    {
     "org": "coop",
     "profile": {
      "now": "Cooperative accounts | required by the cooperative department | the prescribed cooperative software\nPiece register and payments | members are paid per piece within 15 days | register plus payment records\nQuality checks | our name depends on quality | checklist for every piece\nOnline shop | about a third of sales | marketplace shop with weaver names (with consent)\nMember communication | 140 members across several villages | WhatsApp groups by village; notices at meetings",
      "triggers": "Grant for the dye unit | asset register; grant reporting; check that the grant keeps members in control | Meera and the treasurer\nOnline sales reach 40% | one stock list shared by shop orders and online orders | designer\nTen or more apprentices | apprentice records and a training plan | quality officer\nOwn website shop | rules for customer payments and data | Meera"
     },
     "notice": "Look at how a required system, the prescribed cooperative software, is simply accepted. Copy the check on members' control written into the dye unit trigger."
    },
    {
     "org": "hybrid",
     "profile": {
      "now": "Separate books | two entities with different rules | accounting software with charity and company books\nVolunteer database | 40 volunteers and safety training | one database with training and check dates\nRepair log | safety and results | paper log, typed up weekly\nTool library bookings | about 300 loans a year | booking system\nElectrical test record | refurbished electricals are sold to the public | a test record for every item before sale",
      "triggers": "Lease talks before the 2028 lease end | premises plan; budget scenarios | Tom\nShop turnover rises sharply | quarterly trading company board with its own management accounts | Tom\nA second site | site lead role; local repair log and safety checks | Tom and Helen\nNew council contract reporting | data on who uses the service, with consent | Tom"
     },
     "notice": "Notice that the electrical test record is a 'now' system because the risk is high. Copy linking a known date, the 2028 lease end, to a planning trigger."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "processes",
  "title": "Processes, SOPs and process ownership",
  "sheet": "Process register",
  "learn": [
   "A process is a sequence of steps that produces a result, such as registering a participant, paying a supplier or publishing a story. A standard operating procedure (SOP) writes the process down so that it is done consistently, safely and by more than one person.",
   "Map a process simply: trigger, steps, roles, records and exceptions. Ask the people who do the work what really happens, then improve it. Remove steps that add nothing and add checks where mistakes are costly.",
   "Every process needs one owner, as in your RACI from Module 3. The owner keeps the SOP current, trains others and notices when it stops working. A process register lists your processes, their owners and review dates.",
   "You do not need an SOP for everything. Start with processes that are frequent, risky or depend on one person."
  ],
  "weak": "Everyone knows how we do things.",
  "strong": "Riverside Repair Hub: 'Selling a refurbished electrical' SOP. Trigger: item repaired. Steps: PAT test, label, record, price, shelve. Exception: a failed test means the item is not sold. Owned by Priya, reviewed every six months.",
  "why": "A new volunteer could follow it, the safety check cannot be skipped, and one named person keeps it current.",
  "reflect": "Which everyday task is done differently by each person?",
  "exercise": "Build a process register and map one priority process.",
  "fields": [
   {
    "key": "register",
    "label": "Process register",
    "hint": "Process | owner | SOP exists? | last reviewed | next review."
   },
   {
    "key": "map",
    "label": "One mapped process",
    "hint": "Trigger | steps | roles | records | exceptions."
   }
  ],
  "check": "Could someone new follow the mapped process without asking for help?",
  "anatomy": {
   "title": "The parts of a process map",
   "intro": "Shown for Vanita Weavers' piece intake, from loom to register.",
   "cols": [
    "Part",
    "Question",
    "Vanita Weavers: piece intake"
   ],
   "rows": [
    [
     "Trigger",
     "What starts the process?",
     "A weaver brings a finished piece to the centre"
    ],
    [
     "Steps",
     "What happens, in order?",
     "Check against standards, measure, grade, tag with the weaver's name, record"
    ],
    [
     "Roles",
     "Who does each step?",
     "Quality officer checks and grades; accounts clerk records; Meera settles disputes"
    ],
    [
     "Records",
     "What is written down, and where?",
     "A line in the piece register, the quality checklist, the tag on the piece"
    ],
    [
     "Exceptions",
     "What happens when it goes wrong?",
     "Rejected piece: reason recorded, shown to the weaver, returned for repair"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example process registers",
   "intro": "Each organisation lists its key processes and maps the one that matters most right now.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "register": "Planting day | Wayan | no, a checklist is being drafted | never | Nov 2026\nParental consent | Sari | yes, a one-page form | Aug 2026 | Jul 2027\nSurvival monitoring | Sari | yes, a sheet with instructions | Apr 2026 | Apr 2027\nRecording spending | Ibu Made | no | never | Dec 2026",
      "map": "Planting date agreed with the village head | check tide and weather; check consent list; brief volunteers; count young people; plant; count again | Wayan leads; Sari holds the consent list; at least two adults, one per eight young people | attendance list, seedlings per site, photos only with consent | high tide or storm: cancel by WhatsApp the night before; no consent, no joining"
     },
     "notice": "Notice that Tide Line maps its highest-risk process: young people near water. Copy how the exceptions say exactly who cannot join and when to cancel."
    },
    {
     "org": "ngo",
     "profile": {
      "register": "Mentor onboarding | Brian | yes | Jan 2026 | Jan 2027\nWeekly club session | club coordinators | yes, a session guide | Jan 2026 | Jan 2027\nAttendance and survey entry | Brian | partly | Mar 2026 | Dec 2026\nPurchases over US$500 | Grace | yes | Jun 2026 | Jun 2027\nSafeguarding concern | Achieng (safeguarding lead; Brian deputy) | yes | Feb 2026 | Feb 2027\nCamp registration | Brian | no | never | Apr 2027",
      "map": "Mentor accepted after interview | references and police clearance; sign the mentor agreement and code of conduct; safeguarding training; shadow two club sessions; first session as a mentor | Brian runs it; Achieng approves; a club coordinator hosts the shadowing | mentor file in the restricted folder; training record | clearance not yet received: the mentor may shadow but is never alone with girls"
     },
     "notice": "See how the exception protects girls while a vetting check is pending. Copy the split of roles: Brian runs onboarding, but Achieng approves."
    },
    {
     "org": "social",
     "profile": {
      "register": "Wholesale order to delivery | salesperson | no | never | Dec 2026\nDaily cash close | café supervisor | yes, a checklist | Jul 2026 | Jan 2027\nTrainee onboarding | Diego | yes | Feb 2026 | Feb 2027\nCleaning and food safety | Lucía | yes, a daily checklist | Aug 2026 | Feb 2027\nPaying suppliers | Diego | no | never | Jan 2027",
      "map": "Office client sends an order | confirm by 3 pm; add to order sheet and whiteboard; bake overnight; pack and label; deliver by 7 am; invoice weekly | salesperson confirms; Lucía schedules; a trainee packs with the café supervisor | order sheet; signed delivery note; weekly invoice | orders after 3 pm go to the next day; a missing item is reported to the client before 7 am"
     },
     "notice": "Notice the clear cut-off time: it removes the most common failure. Copy the move from WhatsApp memory to a written order sheet."
    },
    {
     "org": "coop",
     "profile": {
      "register": "Piece intake and quality check | quality officer | yes | May 2026 | May 2027\nWeaver payment | accounts clerk | yes | Apr 2026 | Apr 2027\nBulk yarn purchase | Meera | partly | Jan 2026 | Jan 2027\nOnline order dispatch | designer | no | never | Dec 2026\nApprentice enrolment | quality officer | no | never | Mar 2027",
      "map": "Piece accepted and recorded | the clerk totals each weaver's pieces every Friday; Meera checks the totals against the register; bank transfer; WhatsApp message to the weaver | clerk prepares; Meera checks; Meera and the treasurer co-sign | piece register, payment sheet, bank record | disputed piece: paid once the quality officer confirms; a shop pays late: the committee decides how to cover the gap"
     },
     "notice": "Look at how three people touch each payment, so no one can pay alone. Copy how disputes and late shop payments have a set route."
    },
    {
     "org": "hybrid",
     "profile": {
      "register": "Repair café intake | Priya | yes | Mar 2026 | Mar 2027\nSelling refurbished electricals | Priya with the shop manager | yes | May 2026 | Nov 2026\nVolunteer onboarding | volunteer coordinator | yes | Jan 2026 | Jan 2027\nTool loan and return | volunteer coordinator | yes | Apr 2026 | Apr 2027\nSchool workshop booking | schools officer | partly | Sep 2025 | Dec 2026\nRecharging shared costs to the company | Tom | no | never | Jan 2027",
      "map": "Resident arrives with an item | register; safety check; match to a repairer; repair with the owner watching; record result and weight | welcome volunteer registers; only PAT-trained volunteers or Priya handle electricals; the repairer records | a line in the repair log; signed disclaimer | unsafe item: not repaired, reason explained, advice on safe disposal"
     },
     "notice": "Notice the 'never' in the register: an unwritten process is listed honestly, with a date to fix it. Copy the safety step built into the middle of the map."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "cycle",
  "title": "The planning and reporting calendar",
  "sheet": "Annual cycle",
  "learn": [
   "Organisations run on cycles: a yearly strategy review, an annual plan and budget, quarterly reviews, monthly finance figures, board meetings, funder reports, legal filings, policy reviews and appraisals. Putting them on one calendar prevents clashes and last-minute rushes.",
   "Build the cycle backwards from fixed dates: your financial year end, legal deadlines, board meetings and major funder reports. Then place internal reviews early enough to inform them. The budget, for example, should follow the plan and come before the board meeting that approves it.",
   "Add your own seasons too: school terms, harvests, festivals, rainy seasons and the months when cash is tight. This lesson creates the calendar; Module 13 shows how to run the planning and review meetings themselves."
  ],
  "weak": "We plan when a deadline comes up.",
  "strong": "Imara Girls in Science: September, programme review; October, plan and budget drafts; November, the board approves both; monthly accounts by day 10; board meetings in February, May, August and November.",
  "why": "Each review lands before the decision that depends on it, and fixed dates anchor the year.",
  "reflect": "Which deadline surprised you last year?",
  "exercise": "Draft your annual planning and reporting calendar.",
  "fields": [
   {
    "key": "calendar",
    "label": "Annual cycle",
    "hint": "Month | activity | owner | input needed | output."
   }
  ],
  "check": "Does each review happen early enough to inform the decision that depends on it?",
  "gallery": {
   "title": "Five example annual calendars",
   "intro": "Each organisation builds its year around its own fixed dates and seasons.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "calendar": "January | year plan and budget | Wayan and Sari | cash book; survival counts | one-page plan\nApril and October | survival checks at all sites | Sari | monitoring sheets | survival per site\nJuly | knowledge quiz, end and start of school year | Wayan | quiz sheets | change in scores\nSeptember | ask dive operators for sponsorship | Wayan | April survival results | agreements\nOctober | plan the planting season | Sari | site agreements | site plan\nNovember to March | most planting days (rainy season) | Wayan | tides; consent list | seedlings planted\nMonthly | cash book check | Ibu Made with Sari | receipts | agreed balance"
     },
     "notice": "Notice how the calendar follows tides, rain and the school year, not only money. Copy placing the sponsorship request after a survival check, so there are results to show."
    },
    {
     "org": "ngo",
     "profile": {
      "calendar": "January | clubs start; confidence pre-survey | Brian | survey form | baseline\nFeb, May, Aug, Nov | board meetings | Achieng | accounts, results, risks | decisions\nMarch | audit; Foundation A report | Grace and Achieng | year-end accounts | audited accounts; report\nApril | staff appraisals | Achieng | role objectives | development plans\nAugust | holiday science camp | Brian | sponsors; consent forms | 120 girls attend\nSeptember | programme review | Brian | attendance, surveys | lessons learned\nOctober | post-survey; plan and budget drafts | Brian and Grace | results; costs | drafts\nNovember | board approves plan and budget | Achieng | drafts | approved plan\nMonthly | accounts by day 10 | Grace | bank, receipts | budget versus actual"
     },
     "notice": "See how the post-survey and programme review come before the budget drafts. Copy the board approving plan and budget together in one meeting."
    },
    {
     "org": "social",
     "profile": {
      "calendar": "January | plan and budget, with the advisory group | Lucía and Diego | last year's accounts | plan and budget\nMarch and September | new trainee cohort | Diego | municipal referrals | six contracts\nFebruary and August | cohort ends; certificate assessment | Diego | training records | results; job-matching\nMarch | annual tax return (dates confirmed by the accountant) | Diego | the year's books | return filed\nOctober | flour prices; health licence check | Lucía | supplier quotes | price plan\nEvery two months | advisory group | Diego | sales, cash, trainee results | advice noted\nMonthly | books closed | the accountant, with Diego | sales reports, receipts | profit and cash\nOngoing | graduate follow-up at 3 and 12 months | Diego | contact list | placement and retention"
     },
     "notice": "Notice two cohort cycles running inside one financial year. Copy linking advisory meetings to a fixed rhythm rather than calling them when there is trouble."
    },
    {
     "org": "coop",
     "profile": {
      "calendar": "April | close accounts for the year to March | accounts clerk | the year's records | final accounts\nMay | yarn storage checked before the monsoon | quality officer | checklist | dry, raised storage\nJune and July | audit by the cooperative department | Meera, treasurer | accounts, registers | audit report\nJuly | Onam collection; festival yarn secured | designer and Meera | working capital plan | collection\nSeptember, after Onam | annual general meeting | president Sreeja | audit report, plan | bonus decision; approved plan\nJanuary | second design collection | designer | sales data | collection\nFebruary and March | next year's plan and budget | Meera, committee | sales by channel | draft plan\nMonthly | committee: sales and cash | Meera | accounts | decisions"
     },
     "notice": "Look at how the festival season shapes when yarn is bought and money is tight. Copy holding the general meeting after the audit, so members vote on checked accounts."
    },
    {
     "org": "hybrid",
     "profile": {
      "calendar": "January and February | plan and budget drafts, both entities | Tom, shop manager | results, forecasts | drafts\nMarch | year end; trustees approve plan and budget | Helen | drafts | approved plan\nApril and May | year-end accounts, both entities | Tom, treasurer | both sets of books | draft accounts\nJune | trustees approve accounts; company agrees its gift | Helen | draft accounts | gift agreed\nSeptember | trustees; policy reviews | Tom | policy register | updated policies\nOctober | funder reports; council contract review | Tom | repair log, survey | reports sent\nDecember | trustees: lease options before 2028 | Tom and Helen | premises options | next steps\nBy legal deadlines | annual filings, both entities | treasurer | approved accounts | filed\nMonthly | management accounts, both entities | Tom | books | budget versus actual"
     },
     "notice": "Notice that two entities share one calendar, so the company's gift to the charity is agreed on time. Copy putting the 2028 lease on the calendar well ahead."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "hr-overview",
  "title": "People and HR systems overview",
  "sheet": "Systems by stage",
  "learn": [
   "People systems cover the whole journey of staff and volunteers: planning the team, recruitment, agreements or contracts, onboarding, check-ins and development, pay, leave and absence, wellbeing, conduct and grievances, and leaving. Module 4 explains how to design each part.",
   "From a systems point of view, decide where people records are kept, who can see them, how leave and absence are recorded, how pay is run and which documents each person must read and sign. Personal records need tighter access than ordinary working files.",
   "Small organisations often combine a secure folder per person, a leave record, an external payroll service or accountant, and a checklist for people joining and leaving. If you have only volunteers, the same thinking applies on a smaller scale. That is enough if it is used every time."
  ],
  "weak": "HR documents are in the founder's email.",
  "strong": "Imara Girls in Science: a restricted personnel folder for Achieng and Grace only; mentor files with vetting records in a separate restricted folder; a shared leave calendar; starter and leaver checklists that Brian runs.",
  "why": "Confidential records are separated from everyday files, and recurring tasks follow a checklist.",
  "reflect": "Who can currently see personal information about your staff or volunteers?",
  "exercise": "Describe your people systems and their access controls.",
  "fields": [
   {
    "key": "people",
    "label": "People systems",
    "hint": "Lifecycle stage | where it is recorded | owner | who has access."
   }
  ],
  "check": "Are personal records stored with access limited to those who need it?",
  "gallery": {
   "title": "Five example people systems",
   "intro": "Each organisation shows where its people records live and who can see them.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "people": "Volunteer joining | volunteer form and signed code of conduct, in a folder at Sari's house | Sari | co-founders\nSafeguarding training | a list of who trained and when, in the Drive | Sari | co-founders\nYouth team leaders (year two) | role note and parental consent | Sari | Sari only\nAvailability | WhatsApp poll before each planting day | Wayan | the volunteer group\nConduct concerns | note to Sari, or to Wayan if it concerns Sari | Sari | co-founders only\nLeaving | return of tools; removed from the WhatsApp group and Drive | Wayan | co-founders"
     },
     "notice": "Notice that with no staff, people systems are about volunteers and young leaders. Copy the alternative route for concerns when the focal person is involved."
    },
    {
     "org": "ngo",
     "profile": {
      "people": "Recruitment | job files in the restricted HR folder | Achieng | Achieng, Grace\nContracts and personal details | one restricted folder per staff member | Achieng | Achieng, Grace\nMentor vetting and agreements | restricted mentor folder | Brian | Brian, Achieng\nOnboarding and training | starter checklist; training record | Brian | Brian, Achieng, the person\nLeave and absence | shared leave calendar; sick notes in the personnel folder | Grace | team sees dates only\nPayroll | accounting software payroll; payslips by email | Grace | Grace, Achieng\nAppraisals | annual appraisal form | Achieng | Achieng, the person, the board chair for the director's appraisal"
     },
     "notice": "See how the leave calendar shows dates to everyone but keeps sick notes private. Copy who appraises the director: the board chair, not a member of staff."
    },
    {
     "org": "social",
     "profile": {
      "people": "Trainee recruitment | referral and interview notes in the trainee spreadsheet | Diego | Diego, Lucía\nContracts, health insurance, ID copies | locked cabinet; scans in a restricted folder | Diego | Diego, Lucía, the accountant\nOnboarding | starter checklist; food safety induction by Lucía | Diego | Diego, Lucía\nWeekly check-ins | short notes in the trainee spreadsheet | Diego | Diego only\nShifts and absence | weekly rota on the whiteboard; absence notes | café supervisor | team sees the rota\nPayroll | external accountant, from the absence record | accountant, with Diego | Diego, Lucía, accountant\nLeaving and follow-up | leaver checklist; 3- and 12-month follow-up contacts | Diego | Diego"
     },
     "notice": "Notice that check-in notes about trainees' lives are seen by Diego only. Copy how the accountant runs payroll from a record the café keeps."
    },
    {
     "org": "coop",
     "profile": {
      "people": "Staff contracts and personal details | locked cabinet in the office | Meera | Meera, the president\nMembers' register | register required by the society's rules | accounts clerk | committee; each member sees their own entry\nApprentices | enrolment form and training record | quality officer | quality officer, Meera\nStaff leave | leave book in the office | Meera | Meera, the treasurer\nStaff salaries | cooperative accounts | accounts clerk | Meera, treasurer, auditor\nWeaver payments | piece register and payment records (members are paid per piece, not employed) | accounts clerk | Meera, treasurer, the weaver for their own payments"
     },
     "notice": "Look at the line between staff and members: members are paid per piece and recorded differently. Copy how each weaver can see their own record, in line with 'open books'."
    },
    {
     "org": "hybrid",
     "profile": {
      "people": "Staff recruitment and contracts | restricted HR folder | Tom | Tom, Helen\nVolunteer roles, training and PAT status | volunteer database | volunteer coordinator | coordinator, Priya, Tom\nDBS checks for schools work | check dates only in the database; certificates are not copied | schools officer | schools officer, Tom\nLeave and absence | shared leave calendar | Tom | staff see dates only\nPayroll | external service; staff time split between charity and company | Tom | Tom, treasurer\nVolunteer expenses | claim form with receipts, approved by the coordinator | volunteer coordinator | coordinator, Tom\nLeaving | leaver checklist: keys, logins, handover | Tom | Tom"
     },
     "notice": "Notice that the database holds dates of DBS checks, not copies of the certificates. Copy recording staff time split between the two entities so payroll matches the agreement."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "finance-overview",
  "title": "Finance, procurement and internal controls overview",
  "sheet": "Systems by stage",
  "learn": [
   "Finance systems record and control money: budgeting, bookkeeping, banking and payments, payroll, expenses, purchasing, invoicing and income, reporting, and audit or independent examination. Module 9 covers each in depth.",
   "Internal controls are the checks that prevent mistakes, fraud and misuse: approvals within your delegation of authority from Module 3, separating duties, two people to approve payments, regular bank reconciliations, a receipt for every transaction and a record of assets.",
   "Procurement is how you buy: when you need quotes, how you choose suppliers fairly, how you avoid conflicts of interest and what you keep on file. Funders, especially institutional ones, often set stricter rules for their money, and you must follow them.",
   "At this stage, settle the basics: an accounting system or a well-structured spreadsheet, money kept apart from anyone's personal money, a filing system for receipts and a monthly routine. If you are not yet registered, rules on holding money differ by country, so take local advice."
  ],
  "weak": "The founder pays for things and keeps the receipts in a box.",
  "strong": "Vanita Weavers: weaver payments prepared by the accounts clerk, checked by Meera and co-signed with the treasurer; yarn orders over an agreed limit approved by the committee; monthly bank reconciliation; annual audit by the cooperative department.",
  "why": "No one person can both prepare and approve a payment, and every check happens on a set rhythm.",
  "reflect": "Where could a mistake with money go unnoticed for months?",
  "exercise": "Describe your finance tools and the controls you already have.",
  "fields": [
   {
    "key": "finance",
    "label": "Finance systems and controls",
    "hint": "Area | tool or method | owner | control in place | gap."
   }
  ],
  "check": "Is organisational money separated and checked by someone other than the person spending it?",
  "anatomy": {
   "title": "Basic controls and what they prevent",
   "intro": "Most small organisations can put these in place without new software.",
   "cols": [
    "Control",
    "What it prevents",
    "Simplest version"
   ],
   "rows": [
    [
     "Separate money",
     "Personal and organisational money mixing",
     "An account or cash box used only for the organisation"
    ],
    [
     "Two people approve",
     "One person spending alone, by mistake or on purpose",
     "Two signatures or approvals above an agreed amount"
    ],
    [
     "Receipt for everything",
     "Spending that cannot be explained",
     "Photograph receipts; file them by month"
    ],
    [
     "Monthly reconciliation",
     "Errors that stay hidden for months",
     "Match records to the bank or cash; a second person signs"
    ],
    [
     "Quotes for larger purchases",
     "Overpaying or favouring friends",
     "Two or three quotes above a set amount, noted on file"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example finance and control setups",
   "intro": "Each organisation lists its finance areas, how it handles them and the gaps it still sees.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "finance": "Holding money | a cash box used only for Tide Line | Ibu Made | counted by two people monthly | no bank account until registration; local advice needed\nSpending | cash for seedlings, boat hire, snacks, transport | Ibu Made | over US$100 needs both co-founders | WhatsApp approvals not recorded\nRecord | notebook cash book | Ibu Made | receipts kept in a monthly envelope | volunteers hand in receipts late\nMonthly check | cash counted against the cash book | Ibu Made with Sari | two people | none\nDonations | dive operators; small donors | Wayan | receipt for every donation | no written sponsorship agreement"
     },
     "notice": "Notice the honest gap: no organisational bank account until registration. Copy the simple controls that still work today: two approvals above US$100 and a monthly count by two people."
    },
    {
     "org": "ngo",
     "profile": {
      "finance": "Bookkeeping | accounting software, with a code for each grant | Grace | monthly accounts by day 10 | none\nBanking and payments | online banking | Grace | Grace prepares; Achieng approves; two signatories over US$1,000 | none\nPurchasing | quotes on file | Grace | three quotes over US$500 | small purchases not compared\nMentor stipends | mobile money transfers | Grace | list approved by Brian before payment | stipends not matched to attendance\nReconciliation | monthly | Grace | reviewed by Achieng; quarterly by the treasurer | none\nAudit | annual external audit | Grace | finance and safeguarding committee receives the report | none"
     },
     "notice": "See how one line still has a gap even in a well-run NGO: stipends not matched to attendance. Copy the three layers of review: Grace, Achieng and the treasurer."
    },
    {
     "org": "social",
     "profile": {
      "finance": "Café sales | point-of-sale; daily cash close | café supervisor | counted by two people | small differences unexplained\nWholesale invoicing | weekly invoices, due in 15 days | salesperson | Diego checks unpaid invoices weekly | largest client pays late\nPurchasing | regular suppliers | Lucía | Lucía approves over US$300 | prices not compared for a year\nSupplier payments | bank transfer | Diego | Lucía approves transfers over US$300 | Diego both records and pays smaller amounts\nBooks and tax | external accountant | accountant, with Diego | monthly figures reviewed by both founders | figures arrive late\nCash reserve | none yet | Lucía and Diego | target of three months of costs (ISO1) | no reserve"
     },
     "notice": "Notice that the big client's late payments are treated as a control issue, not only a sales one. Copy naming where one person does two jobs, so you can decide whether the risk is acceptable."
    },
    {
     "org": "coop",
     "profile": {
      "finance": "Accounts | prescribed cooperative software | accounts clerk | monthly report to the committee | report arrives after decisions\nWeaver payments | bank transfer within 15 days | accounts clerk | Meera checks; Meera and treasurer co-sign | none\nYarn purchasing | bulk monthly orders | Meera | two quotes; committee approves over US$2,000 | none\nShop invoices | invoices to retail chains | accounts clerk | Meera reviews unpaid invoices monthly | shops pay 60 days late\nExhibition cash | cash sales at fairs | designer | counted by two people each evening | no float record\nAudit | cooperative department audit | treasurer | report to the annual general meeting | none"
     },
     "notice": "Look at how exhibition cash, a small and occasional risk, still gets a two-person count. Copy taking late shop payments seriously when working capital is tight."
    },
    {
     "org": "hybrid",
     "profile": {
      "finance": "Bookkeeping | separate books for charity and company | Tom | treasurer reviews monthly | none\nShared costs | written agreement on staff time, premises and costs | Tom | recharged to the company | calculated only at year end\nShop takings | till; daily cash-up | shop manager | two people; banked twice weekly | none\nPayments | online banking | Tom | two approvers over £500 | none\nVolunteer expenses | claim form with receipts | volunteer coordinator | Tom approves | claims sometimes months late\nRestricted grants | grant codes | Tom | reported to trustees quarterly | none\nYear-end | accounts for both entities | treasurer | gift to the charity agreed by both boards | none"
     },
     "notice": "Notice that the shared-cost agreement is a control between two entities. Copy the gap: recharging only at year end hides the true monthly cost of the shop."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "compliance-essentials",
  "title": "Compliance essentials from day one",
  "sheet": "Compliance essentials",
  "learn": [
   "Some protections cannot wait until Module 10. If you work with people, collect personal information, tell stories or handle money, you need a few essentials from the start.",
   "A short code of conduct sets expected behaviour. If you have contact with children or adults at risk, a safeguarding approach names a focal person, a reporting route and basic rules. A data protection approach says what personal data you collect, why, where it is kept and who can see it. Consent covers photos, stories and taking part. A conflict of interest declaration covers founders and board members.",
   "Add any essentials your own activities bring, such as water safety, food safety or electrical safety. Legal requirements differ by country, so confirm locally. Keep each essential short, practical and known to everyone involved; Module 10 turns them into full policies where you need them."
  ],
  "weak": "We will write policies when a funder asks for them.",
  "strong": "Tide Line, before the first planting day: a one-page code of conduct signed by all adults; Sari as safeguarding focal person; parental consent forms; two adults always present; life jackets for the boat; contact details in one locked box.",
  "why": "People are protected before the first activity, in proportion to what Tide Line actually does.",
  "reflect": "What could go wrong in your very first activity, and what would protect people?",
  "exercise": "List the compliance essentials your current activities require and their status.",
  "fields": [
   {
    "key": "essentials",
    "label": "Compliance essentials",
    "hint": "Essential | why we need it | status | owner | due date."
   }
  ],
  "check": "Are people protected before your first activity, not after?",
  "gallery": {
   "title": "Five example compliance essentials lists",
   "intro": "Each organisation lists what its current activities require, and how far it has got.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "essentials": "Code of conduct | adults work with children | drafted | Sari | before the first planting day\nSafeguarding approach | young people aged 12 to 17 | focal person named; reporting route drafted | Sari | November 2026\nParental consent | children take part and are photographed | form in use | Sari | done\nWater safety | shore and boat work | life jackets borrowed; tide rule agreed | Wayan | before the first boat trip\nMinors' data | names, ages, parents' phones | locked box; no lists in WhatsApp | Sari | done\nLand permission | planting on village land | verbal; written agreement requested | Wayan | December 2026"
     },
     "notice": "Notice that water safety and land permission sit beside the usual essentials. Copy the clear rule about minors' data: it stays out of the WhatsApp group."
    },
    {
     "org": "ngo",
     "profile": {
      "essentials": "Safeguarding policy and training | daily contact with girls aged 10 to 14 | in place; refresher due | Brian | February 2027\nMentor vetting | mentors work with girls | in place; two clearances outstanding | Brian | December 2026\nMinors' data | tablets hold girls' names and results | consent in place; tablet passcodes being added | Brian | November 2026\nPhoto and story consent | annual report, Facebook | parents' consent; girls also asked | Achieng | in place\nConflict of interest | board includes a head teacher and a parent | annual declarations | board chair | February 2027\nRegistration rules | rules recently changed | review with a local lawyer | Achieng | March 2027"
     },
     "notice": "See how an established NGO lists essentials that are in place but still have open tasks. Copy asking girls as well as parents before sharing their photos or stories."
    },
    {
     "org": "social",
     "profile": {
      "essentials": "Trainee contracts and health insurance | trainees are employees | in place for all six | Diego | each cohort\nHealth licence and food safety | we sell food | licence current; daily checklist | Lucía | checked each October\nCode of conduct | young trainees and a public café | one page, signed at induction | Diego | done\nConsent for trainees' stories | our brand tells them | written; trainees can withdraw it | Diego | done\nCustomer and trainee data | addresses, trainee records | restricted to Diego and Lucía | Diego | done\nConflict of interest | an advisor's bakery may hire graduates | declared at each meeting | Lucía | ongoing"
     },
     "notice": "Notice that trainees can withdraw consent for their stories, which protects them after they leave. Copy declaring an advisor's conflict at every meeting."
    },
    {
     "org": "coop",
     "profile": {
      "essentials": "By-laws, elections, audit | cooperative society rules | in place | president Sreeja | elections next year\nHandloom claims | only genuine handloom sold as handloom | every piece checked | quality officer | ongoing\nConsent for names and photos | product photos name weavers | 112 of 140 members consented | designer | March 2027\nMember and buyer data | bank details; buyers' addresses | locked cabinet; buyer data stays in the marketplace | accounts clerk | done\nConflict of interest | a committee member's relative supplies yarn | declared; no vote on yarn orders | treasurer | done\nCode of conduct | young apprentices work with adults | drafting | quality officer | January 2027"
     },
     "notice": "Look at the conflict that is declared and handled by stepping out of one vote. Copy counting how many members have consented, so the gap is visible."
    },
    {
     "org": "hybrid",
     "profile": {
      "essentials": "Electrical safety (PAT) | volunteers repair electricals | training required | Priya | refresher in January\nProduct safety for refurbished goods | the shop sells to the public | test record per item; advice requested | shop manager | December 2026\nSafeguarding and DBS checks | schools workshops | in place | schools officer | ongoing\nData protection | volunteer data; residents' postcodes (with consent) | privacy notice in place | Tom | review in September\nConflict of interest | council funding; trustees' local roles | register reviewed at each trustee meeting | Helen | ongoing\nInsurance | public liability and repairs | in place | Tom | renewal in April"
     },
     "notice": "Notice how product safety for refurbished electricals gets its own line, separate from volunteer safety. Copy how the trustees handle a conflict: the council waste officer is not a trustee."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "information",
  "title": "Information, documents and knowledge management",
  "sheet": "Information architecture",
  "learn": [
   "Information management decides where documents and data live, how they are named and versioned, who can see them and how long they are kept. Done badly, it wastes time, loses knowledge and creates data protection risks.",
   "Organise folders around stable categories that match how your organisation thinks, for example one per strategic objective plus areas for internal objectives and administration, rather than one per person. Agree a naming convention (document type, topic, date or version) and keep one master copy of each important document.",
   "Set access by need: open for most working files, restricted for personnel, finance and personal data. Decide how long each type of record is kept and when it is deleted or archived; legal retention periods differ by country, so confirm locally. Back up regularly and check that a backup can actually be restored.",
   "Knowledge management goes further: keeping lessons, templates and know-how so they outlive any one person. A short 'how we do things' page per area, a template folder and brief notes after each big activity are a good start."
  ],
  "weak": "Everyone saves files where they like.",
  "strong": "Riverside Repair Hub: top-level folders for each objective, plus Charity Admin and Riverside Reuse Ltd; names like 'Report – Council – 2026-10'; HR and finance restricted; records kept for the agreed period, then archived; weekly backup, restore tested twice a year.",
  "why": "Files are findable, confidential records are protected and the two entities' records stay apart.",
  "reflect": "How long would it take a new colleague to find your latest budget?",
  "exercise": "Design your folder structure, naming rules, access levels and retention approach.",
  "fields": [
   {
    "key": "structure",
    "label": "Folder structure and naming",
    "hint": "Top-level folders, naming convention and versioning rule."
   },
   {
    "key": "access",
    "label": "Access and retention",
    "hint": "Information type | who can access | retention period | backup."
   }
  ],
  "check": "Could a new colleague find the current version of a key document within two minutes?",
  "anatomy": {
   "title": "Access levels",
   "intro": "Three levels are enough for most small organisations.",
   "cols": [
    "Level",
    "Typical contents",
    "Who can see it"
   ],
   "rows": [
    [
     "Open",
     "Plans, templates, programme materials, published reports",
     "Everyone in the team, and volunteers where useful"
    ],
    [
     "Team only",
     "Budgets, draft funding bids, partner agreements",
     "Staff or core team; board on request"
    ],
    [
     "Restricted",
     "Personnel files, payroll, bank details, participants' and children's personal data",
     "Named people only, listed in writing"
    ]
   ],
   "after": 2
  },
  "gallery": {
   "title": "Five example information setups",
   "intro": "Each organisation shows its folder structure and naming rule, then who sees what and for how long.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "structure": "Google Drive: 1 Restoration (ESO1) | 2 Young voices (ESO2) | 3 Setting up (registration, volunteers, funding) | 4 Money | 5 Photos (consented only)\nNaming: date first, then topic, e.g. '2026-11-14 Planting day Site A'\nVersion: one master copy of the plan; old versions moved to an 'Old' folder",
      "access": "Plans, monitoring photos | co-founders and volunteers | until no longer useful | Drive\nCash book | Ibu Made, co-founders | at least the period local rules require; confirm locally | monthly phone photo of each page saved to the Drive\nParental consent forms and contacts | Sari only | until the young person leaves, then as local advice says | paper in a locked box; no digital copy\nPhotos of young people | co-founders | only while consent lasts | Drive folder for consented photos only"
     },
     "notice": "Notice that the most sensitive records, children's consent forms, are kept off the shared Drive entirely. Copy the monthly photo of the cash book: a simple backup for a paper record."
    },
    {
     "org": "ngo",
     "profile": {
      "structure": "Shared drive: 01 Clubs and camp (ESO1) | 02 Schools and teachers (ESO2) | 03 Funding and income (ISO1) | 04 Safeguarding and mentors (ISO2) | 05 MEAL and data (ISO3) | 06 Finance | 07 Board | 08 HR (restricted)\nNaming: 'Type – Topic – YYYY-MM', e.g. 'Report – Foundation A – 2026-03'\nVersion: 'FINAL' only after approval; drafts carry v0.1, v0.2",
      "access": "Programme materials | all staff and mentors | until replaced | cloud drive\nFunder agreements and reports | staff | as each funder requires, often several years after the grant ends | cloud drive\nGirls' names and survey data | Brian, coordinators for their own schools | until the end of tracking in Form 2, then anonymised | tablet app syncs to the cloud\nPersonnel and mentor vetting | Achieng, Grace; Brian for mentors | as local employment rules require; confirm locally | restricted folder\nBoard papers | board and director | permanently | board folder"
     },
     "notice": "See how folders follow Imara's objectives, ESO1 to ISO3, so files sit next to the work they serve. Copy the rule for anonymising girls' data when tracking ends."
    },
    {
     "org": "social",
     "profile": {
      "structure": "Shared drive: Bakery and café | Wholesale clients | Training programme | Finance and tax | Legal and licences | People (restricted)\nNaming: 'YYYY-MM-DD Topic', e.g. '2026-10-01 Price list offices'\nVersion: the current price list and recipes in a 'Current' folder; old ones archived",
      "access": "Recipes and production sheets | all staff | until replaced | drive; printed copy in the bakery\nInvoices, receipts, tax papers | Lucía, Diego, the accountant | as tax rules require; confirm with the accountant | the accountant holds copies too\nTrainee records | Diego, Lucía | for the follow-up period, then summary only | restricted folder\nContracts and ID copies | Diego, Lucía | as employment rules require | locked cabinet and restricted folder\nCustomer orders | salesperson, Lucía | one year | order sheet"
     },
     "notice": "Notice that recipes are open to everyone and printed in the bakery, where they are used. Copy relying on the accountant to confirm how long tax papers must be kept."
    },
    {
     "org": "coop",
     "profile": {
      "structure": "Office files and shared drive: Members and committee | Production and quality | Sales: shops | Sales: online | Accounts and audit | Designs | Dye unit (ISO3)\nNaming: Malayalam or English, with date and topic, e.g. '2026-10 Committee minutes'\nVersion: committee-approved documents marked 'Approved' with the meeting date",
      "access": "Committee minutes and accounts | open to members on request (open books) | permanently or as the society's rules require | paper file and scans\nMembers' bank details | accounts clerk, Meera | while a member, then as the rules require | locked cabinet\nDesigns and product photos | staff | permanently | drive, plus an external hard drive kept off-site\nOnline buyers' details | designer, through the marketplace | as the marketplace's terms allow | not copied out of the marketplace\nAudit records | treasurer, accounts clerk | as the cooperative department requires | office file"
     },
     "notice": "Look at how 'open books' becomes a written access rule: members can see minutes and accounts. Copy the off-site copy of designs, protected from monsoon damage at the centre."
    },
    {
     "org": "hybrid",
     "profile": {
      "structure": "Shared drive: 1 Repair and reuse (ESO1) | 2 Young people and schools (ESO2) | 3 Charity Admin | 4 Riverside Reuse Ltd | 5 Volunteers | 6 HR (restricted) | 7 Finance (restricted)\nNaming: 'Type – Topic – YYYY-MM', e.g. 'Minutes – Trustees – 2026-09'\nVersion: policies carry a version number and approval date; one master copy",
      "access": "Repair logs and school materials | staff and volunteers | until replaced; summaries kept | drive\nTrustee and company board papers | each board and Tom | permanently | separate folder for each entity\nVolunteer records and DBS check dates | volunteer coordinator, schools officer, Tom | as agreed in the retention schedule | volunteer database\nResidents' postcodes (with consent) | Tom | summarised yearly, then deleted | spreadsheet in the restricted area\nFinancial records for both entities | Tom, treasurer | as charity and company rules require; confirm with the accountant | accounting software backup"
     },
     "notice": "Notice the separate folders for the charity and the company, each with its own board papers. Copy summarising residents' postcodes once a year and then deleting them."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "stack",
  "title": "Digital tools and the tech stack",
  "sheet": "Tech stack",
  "learn": [
   "Your tech stack is the set of digital tools you use: email and calendar, file storage, messaging, accounting, contact lists, planning, website, forms and data collection. Choose tools after you know the process, not before. For many small organisations, a phone, a messaging app and a shared drive are a complete stack.",
   "Prefer fewer tools that connect over many that do not. Each extra tool adds cost, training, logins and another place where information can be out of date. For each tool, name an owner, decide who has access and check that you can export your data if you leave.",
   "Check security and privacy: two-step login, where data is stored, who the provider is and whether it fits your data protection duties. Use a password manager rather than a shared list of passwords. Keep confidential participant data out of tools not designed for it, including group chats.",
   "Look for nonprofit discounts and free tiers, but count the time it would take to switch later."
  ],
  "weak": "We use whatever each person prefers.",
  "strong": "Pan del Barrio: point-of-sale, WhatsApp Business for orders, a shared drive, the accountant's software and one trainee spreadsheet. Each has an owner; two-step login is on; trainee data never goes in WhatsApp.",
  "why": "The stack is small, each tool has an owner and confidential data stays in the right place.",
  "reflect": "Which tool holds information that exists nowhere else?",
  "exercise": "List your tools, what they are for, their owner and their risks.",
  "fields": [
   {
    "key": "tools",
    "label": "Tool inventory",
    "hint": "Tool | purpose | owner | users | data held | export possible? | security settings."
   },
   {
    "key": "changes",
    "label": "Changes to make",
    "hint": "Tools to remove, combine, secure or add."
   }
  ],
  "check": "Does every tool have an owner, a clear purpose and a way to export your data?",
  "gallery": {
   "title": "Five example tool inventories",
   "intro": "Each organisation lists the tools it uses today and the few changes worth making.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "tools": "WhatsApp group | coordination | Wayan | co-founders, volunteers | dates, first names | partly | only admins can add members\nGoogle Drive | plans, monitoring photos, consented photos | Sari | co-founders; volunteers see one folder | plans, photos | yes | two-step login on\nInstagram | sharing the work | a young volunteer, with Sari | two young people | consented photos | yes | Sari also holds the login\nNotebook cash book | money record | Ibu Made | Ibu Made | income and spending | photographed monthly | kept at home",
      "changes": "Keep: WhatsApp, Drive and the cash book. No new software this year.\nSecure: two-step login on Wayan's account; Instagram login moved to a shared Tide Line email.\nRemove: the second, older WhatsApp group that still includes former helpers.\nLater: a spreadsheet cash book once a bank account is open."
     },
     "notice": "Notice that the answer to 'what to add' is 'nothing yet'. Copy securing the Instagram account under a shared email, so it does not belong to one young volunteer."
    },
    {
     "org": "ngo",
     "profile": {
      "tools": "Email, calendar and shared drive | everyday work | Achieng | staff | documents, board papers | yes | two-step login for all staff\nAccounting software | finance and payroll | Grace | Grace, Achieng read-only | finance, payroll | yes | two-step login on\nTablet form app | attendance and surveys | Brian | coordinators | girls' names and results | yes | tablet passcodes; data synced to the cloud\nWhatsApp | messages to parents and mentors | club coordinators | staff | phone numbers | no | broadcast lists, not groups, for parents\nWebsite and Facebook | public information | Achieng | Achieng, Brian | consented photos | yes | shared logins in a password manager",
      "changes": "Secure: passcodes on all tablets by November; remove old staff from the drive.\nCombine: mentor rota moved from WhatsApp into the shared calendar.\nAdd: a password manager with a shared vault (nonprofit discount).\nNot now: a full database; review if Imara grows beyond 20 schools."
     },
     "notice": "See the choice of broadcast lists for parents, so parents cannot see each other's numbers. Copy the honest 'not now' line with a clear point to revisit it."
    },
    {
     "org": "social",
     "profile": {
      "tools": "Point-of-sale | café sales | café supervisor | café staff | sales, card payments | yes | staff PINs\nWhatsApp Business | wholesale and neighbour orders | salesperson | salesperson, Lucía | customer names, addresses | partly | business account, not personal phones\nShared drive | order sheet, recipes, trainee records | Diego | staff; trainee folder restricted | trainee records | yes | two-step login on\nAccountant's software | books and tax | the accountant | accountant; Diego can view | finance | through the accountant | held by the accountant\nInstagram | brand and orders | Lucía | Lucía, café supervisor | consented trainee stories | yes | two-step login on",
      "changes": "Move: wholesale orders from WhatsApp messages into the order sheet.\nSecure: check that the accountant will hand over the data if we change accountant.\nRemove: old trainee lists on Diego's laptop.\nLater: link the point-of-sale to stock only if a second shop opens."
     },
     "notice": "Notice the check on the accountant's software: Pan del Barrio's own data lives in a tool it does not control. Copy the 'only if a second shop opens' condition."
    },
    {
     "org": "coop",
     "profile": {
      "tools": "Cooperative accounting software | statutory accounts | accounts clerk | clerk; Meera | accounts, members' payments | yes | prescribed by the department; password changed yearly\nOnline marketplace shop | online sales | designer | designer, Meera | listings, buyers' orders | partly | two-step login on\nWhatsApp groups by village | member notices | Meera | members, staff | members' phone numbers | no | only staff are admins\nShared drive | designs, photos, committee scans | Meera | staff | designs, minutes | yes | two-step login on; off-site hard drive\nInstagram | brand | designer | designer | product photos with weavers' names (with consent) | yes | two-step login on",
      "changes": "Combine: one stock sheet used for both shop and online orders, to stop double selling.\nSecure: Meera and the clerk both know the accounting login, kept in a sealed envelope with the president.\nNot now: our own website shop; review once online sales reach 40%."
     },
     "notice": "Look at the sealed envelope with the president: a low-tech fix so the accounts never depend on one person. Copy fixing a real problem, double selling, with one shared sheet."
    },
    {
     "org": "hybrid",
     "profile": {
      "tools": "Email, calendar, shared drive | everyday work | Tom | staff, trustees | documents | yes | two-step login for all\nAccounting software | books for charity and company | Tom | Tom, treasurer | finance for both entities | yes | two-step login on\nVolunteer database | roles, training, check dates | volunteer coordinator | coordinator, Priya, schools officer | volunteers' details | yes | role-based access\nTool library bookings | loans | volunteer coordinator | volunteers on shift | borrowers' contacts | yes | limited accounts\nShop till | shop sales | shop manager | shop staff and volunteers | sales | yes | staff PINs\nWebsite, Instagram, newsletter | communication | Tom | Tom, schools officer | subscribers' emails | yes | password manager",
      "changes": "Replace: the paper repair log with a tablet form at each café (Priya).\nConnect: export volunteer training dates to the rota each month.\nRemove: an unused events app paid for since 2024.\nCheck: that tool library borrowers' data is deleted after an agreed period."
     },
     "notice": "Notice that a growing organisation removes an unused paid app as well as adding a new one. Copy giving volunteers limited accounts in shared systems."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "issue-risk-management",
   "meetings-actions-decisions"
  ],
  "video": null,
  "stage": "Manage",
  "id": "issues",
  "title": "Issues, actions and decisions tracking",
  "sheet": [
   "Issues",
   "Actions"
  ],
  "learn": [
   "An issue is something that has already happened and needs a response: a complaint, a missed deadline, a broken tool, an incident. A risk is something that might happen; Module 10 covers risks. Keep issues in one place, linked to your risk list, so patterns become visible.",
   "For each issue, record what happened, who is affected, how serious it is, who owns the response, the actions agreed and when it was resolved. If an issue shows that a risk has happened, note it against that risk.",
   "Actions and decisions from meetings need the same discipline. Every action has an owner and a due date; every decision is recorded with its reason. Review open issues and actions in your weekly or monthly routine and close them on purpose, rather than letting them fade.",
   "Safeguarding concerns and other confidential matters follow their own reporting route; the shared log records only that a concern exists, if anything."
  ],
  "weak": "Problems are discussed and hopefully someone deals with them.",
  "strong": "Vanita Weavers: an issue and action sheet reviewed at each monthly committee meeting; each line has severity, owner, next action and date; a late payment from the same shop twice in a row goes to the risk list.",
  "why": "Every problem has an owner and a date, and repeated issues are spotted as risks.",
  "reflect": "Which problem keeps coming back because no one owns it?",
  "exercise": "Set up your issue and action tracking routine.",
  "fields": [
   {
    "key": "log",
    "label": "Issue and action routine",
    "hint": "Where issues and actions are recorded, fields kept, review frequency and owner."
   },
   {
    "key": "examples",
    "label": "Current open issues",
    "hint": "Issue | severity | owner | next action | due."
   }
  ],
  "check": "Does every open issue and action have an owner and a date?",
  "gallery": {
   "title": "Five example issue and action routines",
   "intro": "Each organisation shows where it tracks issues and actions, and what is open today.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "log": "One page in the shared Drive called 'Open issues and actions'. Fields: date, what happened, owner, next action, due date, closed. Wayan copies anything agreed in WhatsApp into it. Reviewed at the Sunday call; closed items move to the bottom. Safeguarding concerns go only to Sari, not to the page.",
      "examples": "Seedlings at Site B washed away after a storm | high | Sari | ask the nursery about a more sheltered planting zone | 30 Nov\nA shrimp pond owner objected to planting near his pond | medium | Wayan | meet with the village head present | 15 Nov\nTwo volunteers' receipts not handed in | low | Ibu Made | reminder at the next planting day | 10 Nov\nBoat owner unavailable in December | medium | Wayan | agree a second boat owner | 20 Nov"
     },
     "notice": "Notice that the WhatsApp chat is not the log: agreements are copied into one page. Copy keeping safeguarding concerns out of the shared page."
    },
    {
     "org": "ngo",
     "profile": {
      "log": "A shared issues and actions sheet. Fields: date, issue, school or area, severity (low, medium, high), owner, actions, due, status, linked risk. Brian reviews it at the monthly team meeting; Achieng takes high issues to the board. Safeguarding concerns follow the safeguarding procedure and are not logged here.",
      "examples": "A head teacher cut club time for exam preparation | high | Brian | meet the head teacher; ask the county education office for support | 20 Nov\nTablets in two schools not syncing | medium | Brian | weekly sync at the office | 15 Nov\nThree mentors missed two sessions in a row | medium | Brian | check-in calls; review the mentor rota | 30 Nov\nCamp sponsor's payment late | medium | Grace | follow-up call; adjust the cash forecast | 25 Nov"
     },
     "notice": "See the 'linked risk' column: lost club time shows a known risk, head teachers' support, is happening. Copy the rule that high issues reach the board."
    },
    {
     "org": "social",
     "profile": {
      "log": "A list on the shared drive, reviewed at the weekly staff meeting. Fields: date, issue, severity, owner, action, due, closed. The café supervisor adds customer complaints; Diego adds trainee issues without personal details.",
      "examples": "Office client complained about two late deliveries | high | salesperson | confirm orders by 3 pm; call the client | 12 Nov\nOven thermostat faulty | high | Lucía | repair booked; bake in two shifts until fixed | 8 Nov\nFlour supplier raised prices again | medium | Lucía | ask two other suppliers for quotes | 30 Nov\nA trainee often late for the early shift | medium | Diego | weekly check-in; review transport options | 15 Nov"
     },
     "notice": "Notice that the trainee issue is recorded without personal details. Copy the temporary workaround beside the oven repair, so production keeps going."
    },
    {
     "org": "coop",
     "profile": {
      "log": "A paper register at the office, typed into the shared drive monthly. Fields: date, issue, who is affected, severity, owner, action, due, closed. Reviewed at the monthly committee meeting; urgent issues sent to Meera at once.",
      "examples": "A retail chain is 60 days late paying | high | Meera | formal reminder; pause new orders | 15 Nov\nTwo weavers dispute rejected pieces | medium | quality officer | review the pieces with both weavers present | 10 Nov\nA sari was sold online and to a shop at the same time | medium | designer | refund the online buyer; start one shared stock sheet | 5 Nov\nRoof leak over the yarn store | high | Meera | repair before the next rains; move yarn to raised shelves | 20 Nov"
     },
     "notice": "Look at the paper register typed up monthly: it suits a centre where not everyone uses a computer. Copy how disputes are solved with the weavers present."
    },
    {
     "org": "hybrid",
     "profile": {
      "log": "One issues and actions log on the shared drive for both entities, with a column showing charity or company. Fields: date, issue, entity, severity, owner, actions, due, linked risk, closed. Reviewed weekly at the staff meeting; high issues and a summary go to trustees quarterly. Incidents involving injury also go in the accident book.",
      "examples": "A refurbished lamp was returned faulty | high | shop manager with Priya | withdraw similar items; check the test record | 8 Nov\nRota short of PAT-trained volunteers in December | medium | volunteer coordinator | extra training session | 30 Nov\nRecharge to the company not calculated since April | medium | Tom | calculate and agree with the treasurer | 30 Nov\nLandlord has not replied about the 2028 lease | medium | Tom | written request; trustees informed | 15 Dec"
     },
     "notice": "Notice the faulty lamp is linked to product safety and acted on at once. Copy the entity column, which keeps charity and company issues apart in one log."
    }
   ]
  }
 }),
 review("blueprint","Your Internal Systems Blueprint")
 ]
});
