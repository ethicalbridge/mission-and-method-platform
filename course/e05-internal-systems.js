import base from './m05-internal-systems.js?v=c324e2a2c';
import {adapt} from './adapt.js?v=c324e2a2c';
// Entrepreneurs' version of m05: same lessons, fields, workbook and tools; wording for people building something new.
export default adapt(base,{
 title:'Internal Systems & Operations',
 short:'How planning, people, money, compliance, information, tools and issues will fit together from the start',
 intro:'See how the internal systems of a strong organisation fit together, and choose the minimum set you need to start well. This module is a map: it introduces each system and the decisions it needs before you launch, and points to the later modules that go deeper into people, MEAL, finance, legal compliance and risk.',
 output:'Internal Systems Blueprint'
},{
 systems:{
  learn:[
   'An internal system is a repeatable way of doing necessary work. It brings together people, steps, information, decisions and sometimes software. When you are starting, it is tempting to choose apps first. Before you do, be clear about the process each one will support, who will own it, what information it needs and which decision it informs.',
   'Systems connect. Strategy sets objectives; a plan turns them into work; people deliver it; money pays for it; policies and controls keep it safe; data shows what happened; learning shapes the next plan. Even with one or two founders, a weakness in one system shows up in another: no budget becomes a planning problem, an unclear owner becomes a risk.',
   'Draw your operating map: the main systems you will need in your first year, who will own each and how information will move between them. It does not need to look good. It needs to show where work will be handed from one system or person to another, and where those hand-offs are likely to fail.',
   'Keep the map. The rest of this module looks at each system in turn, and later modules go deeper, so the map shows you what to set up first and what can wait.'
  ],
  weak:'Buy a project management app before we launch.',
  strong:'“Wholesale orders from the two cafés and the canteen arrive by message to the youth-work co-founder, who copies them into a shared order sheet by 3pm; the baker co-founder checks the sheet each evening before the early bake. Orders sent after 3pm are the ones most likely to be missed, so the cut-off is printed on every invoice.”',
  why:'It names the process, the owner and the hand-off most likely to fail before reaching for any technology.',
  reflect:'Which task you already repeat depends on you remembering everything?',
  exercise:'List the essential systems you will need in your first year, who will own each and how information will move between them.',
  fields:{
   systems:{label:'Systems inventory (first year)',hint:'System (wholesale orders) | owner (you, a co-founder or a future role) | information needed (customer, items, delivery day) | routine (checked each evening) | review date.'},
   flows:{label:'Key hand-offs between systems',hint:'From system → to system (orders → baking plan) | what is handed over (tomorrow’s quantities) | where it is likely to fail (messages after the cut-off).'}
  },
  check:'Could the process keep working if you, or its usual owner, were away for two weeks?'
 },
 minimum:{
  learn:[
   'Systems should be proportionate. A founder working alone needs a few habits, not a manual. A founding team of three or four needs shared routines. A team of twenty needs documented processes, clear controls and someone responsible for operations. Build for the stage you are at, and know what the next stage will ask of you.',
   'A useful minimum for most new initiatives, before or soon after you launch: a shared folder with a clear structure; a simple budget and a record of income and spending; a list of commitments and deadlines; short essentials for conduct, safeguarding where relevant and data protection; a weekly planning routine; and one place to record decisions.',
   'Add systems when a trigger appears: registering, opening a bank account, taking on the first employee, receiving restricted funding or a first large contract, starting work with children or adults at risk, handling personal data at scale or opening a second site. Write the triggers down now, so each next step is a decision rather than a crisis.',
   'Over-systematising is a real risk, especially for founders who want everything right before they start. Tools nobody maintains, procedures nobody reads and duplicated records waste scarce time. Keep each system as simple as its risk allows.'
  ],
  weak:'We will set up all systems properly before we start.',
  strong:'Now: a group chat for orders, a shared drive, a cash book with receipts, the shared kitchen’s hygiene checklist, signed traineeship agreements and a weekly check-in.\nOnce registered: a business bank account with two signatories.\nYouth fund grant: a separate column for it in the cash book when it arrives.\nShop opens: a till that records sales, and a stock sheet.',
  why:'It keeps the pilot’s systems small and names the events (registering, the grant, the shop) that will justify adding more.',
  reflect:'Which system are you planning to build that no one would use in your first year?',
  exercise:'Define the minimum viable systems you need to start, and the triggers for adding more.',
  fields:{
   now:{label:'Systems we need to start',hint:'System (flour and ingredient stock) | why from the start (never run out before a market day) | simplest version (a sheet on the kitchen wall).'},
   triggers:{label:'Triggers for the next systems',hint:'Trigger event (opening the shop) | system to add (a till and a stock sheet) | owner (now or a future role).'}
  },
  check:'Is each system proportionate to the risk it manages at your stage?',
  anatomy:{
   title:'Minimum viable systems by stage',
   intro:'Each stage keeps what came before and adds only what its new risks require. Our bakery’s pilot sits in the first row, and the year-2 shop moves it to the second; the others show what is coming.',
   cols:['Stage','Minimum viable systems','Triggers to add more'],
   rows:[
    ['Idea and pilot: founders and first trainees','Group chat, shared folder, cash book with receipts, a decisions note, a hygiene checklist, signed agreements and consent forms if you work with people','Registering, opening a bank account, the first grant or wholesale customer, taking on a trainee under 18'],
    ['Early delivery: regular sales, first paid people','Add: bank account in the organisation’s name, two signatories, simple bookkeeping, contracts or agreements, a shift and leave record','First employee, first restricted grant or large contract, personal data held regularly'],
    ['Growing: about 5 to 20 people','Add: accounting software, approval limits, process owners, a planning calendar, restricted personnel files','Several funders’ or customers’ rules, a second site, a second legal entity'],
    ['Established: 20 people or more','Add: an operations lead, written procedures, regular review of controls, connected data systems','New countries, large contracts, audit findings']
   ]
  }
 },
 processes:{
  learn:[
   'A process is a sequence of steps that produces a result, such as enrolling a trainee, taking a wholesale order, paying a supplier or publishing a story. A standard operating procedure (SOP) writes the process down so that it is done consistently, safely and by more than one person, including the people who join you later.',
   'Map a process simply: trigger, steps, roles, records and exceptions. If you have already run a pilot or a first activity, write down what really happened, then improve it. If not, walk through it step by step with a co-founder or a future trainee. Remove steps that add nothing and add checks where mistakes are costly.',
   'Every process needs one owner, as in your RACI from Module 3. While you are small, the owner is often you or a co-founder. The owner keeps the SOP current, shows others how to do it and notices when it stops working. A process register lists your processes, their owners and review dates.',
   'You do not need an SOP for everything. Start with processes that are frequent, risky or that only one founder knows how to do.'
  ],
  weak:'We know how we do things; it is all in our heads.',
  strong:'Process: closing the Saturday stall.\nTrigger: 1pm, or when the bread runs out.\nSteps: count what is left, record sales and leftovers on the waste sheet, offer unsold bread to the youth centre, count the cash with a second person, bag it for the bank.\nException: cream cakes not sold by closing are never kept for the next day.\nOwner: the baker co-founder, reviewed every six months.',
  why:'A trainee could follow it, the food-safety rule and the second cash count cannot be skipped, waste is measured every week, and one named person keeps it current.',
  reflect:'Which task do you and your co-founders already do differently from each other?',
  exercise:'Start a process register and map one priority process for your launch.',
  fields:{
   register:{label:'Process register',hint:'Process (closing the stall) | owner (the baker co-founder) | SOP written yet? | last reviewed | next review.'},
   map:{label:'One mapped priority process',hint:'Trigger (a café sends an order) | steps | roles (who now, who later) | records (the order sheet) | exceptions (an order after the 3pm cut-off).'}
  },
  check:'Could someone who joins later follow the mapped process without asking you for help?',
  anatomy:{
   title:'The parts of a process map',
   intro:'Shown for one process in our bakery: enrolling a new trainee.',
   cols:['Part','Question','Example: enrolling a new trainee'],
   rows:[
    ['Trigger','What starts the process?','The youth centre refers a young person who wants to train'],
    ['Steps','What happens, in order?','A paid trial morning in the kitchen, explain the traineeship and pay, sign the agreement, record contact and emergency details, book the food-hygiene course'],
    ['Roles','Who does each step?','The youth-work co-founder enrols and confirms; the baker co-founder runs the trial morning; the mentor joins from week one'],
    ['Records','What is written down, and where?','A line in the trainee list, the signed agreement, a parent’s or carer’s consent if they are 17, emergency contact in the restricted folder'],
    ['Exceptions','What happens when it goes wrong?','No consent for a 17-year-old: the start waits; all four places full: offered the next intake']
   ]
  }
 },
 cycle:{
  learn:[
   'Every organisation runs on cycles: a yearly strategy review, an annual plan and budget, quarterly reviews, monthly finance figures, founders’ or board meetings, reports to funders, members or investors, legal filings, policy reviews and check-ins with the team. Putting them on one calendar from your first year prevents clashes and last-minute rushes.',
   'Build the cycle backwards from fixed dates: the financial year end you choose when you register, legal deadlines, founders’ or board meetings and any reports you already owe. Then place internal reviews early enough to inform them. The budget, for example, should follow the plan and come before the meeting that approves it. Mark dates you do not know yet as ‘to confirm when registered’.',
   'Add your own seasons too: school terms, festivals, the market’s busy weeks, the quiet summer months when the cafés order less and the months when cash is tight. This lesson creates the calendar; the strategy from Module 1 gives it its objectives, and your weekly and quarterly routines bring it to life as you grow.'
  ],
  weak:'We will plan when a deadline comes up.',
  strong:'March: review the pilot traineeships and sales, then decide on the year-2 shop lease.\nOctober: draft next year’s plan and budget.\nNovember: the co-founders, and later the board, approve both; plan for the busy festive weeks.\nMonthly: sales, costs and food waste figures by day 10.\nQuarterly: advisory group meeting.\nEvery six months: a short report to the youth fund.',
  why:'Each review lands before the decision that depends on it, such as the pilot review before the shop decision, and fixed dates anchor the year.',
  reflect:'Which deadline could surprise you in your first year?',
  exercise:'Draft your first annual planning and reporting calendar.',
  fields:{
   calendar:{label:'Annual cycle (first year)',hint:'Month (March) | activity (pilot review) | owner (both co-founders) | input needed (trainee results, sales figures) | output (decision on the shop). Mark dates still to confirm.'}
  },
  check:'Does each review happen early enough to inform the decision that depends on it?'
 },
 'hr-overview':{
  learn:[
   'People systems cover the whole journey of everyone who works with you, paid or unpaid: planning the team, recruitment, agreements or contracts, onboarding, check-ins and development, pay, leave and absence, wellbeing, conduct and grievances, and leaving. Module 4 explains how to design each part. Even if today it is only you and a co-founder, your founders’ agreement is the first piece of this system.',
   'From a systems point of view, decide now where people records will be kept, who can see them, how leave and absence will be recorded, how pay will be run once you have paid people and which documents each person must read and sign. Personal records need tighter access than ordinary working files, from the very first volunteer.',
   'Small organisations often combine a secure folder per person, a leave record, an external payroll service or accountant, and a checklist for people joining and leaving. If you have only founders and volunteers, the same thinking applies on a smaller scale. Set up the simple version now, and know that contracts and payroll will be required with your first employee; check the rules where you are.'
  ],
  weak:'People’s details are in the founder’s phone and email.',
  strong:'“A restricted folder for each trainee (agreement, emergency contact, hygiene certificate and, if they are 17, a parent’s or carer’s consent), seen only by the two co-founders; background-check records for adults kept separately; a shared calendar for shifts and leave; trainee pay run through the bookkeeper; a joining and leaving checklist that the youth-work co-founder runs every time.”',
  why:'Trainees’ confidential records are separated from everyday files, pay runs through someone qualified, and joining and leaving follow a checklist.',
  reflect:'Who can currently see personal information about your co-founders, volunteers or first team members?',
  exercise:'Describe the people systems you will set up and who will have access to each.',
  fields:{
   people:{label:'People systems',hint:'Stage of the journey (joining) | where it will be recorded (the trainee’s restricted folder) | owner (the youth-work co-founder) | who has access (both co-founders).'}
  },
  check:'Will personal records be stored with access limited to those who need it, from the first person who joins?'
 },
 'finance-overview':{
  learn:[
   'Finance systems record and control money: budgeting, bookkeeping, banking and payments, payroll, expenses, purchasing, invoicing and income, reporting, and audit or independent examination. Module 9 covers each in depth. You will not need all of them at the start, but you should know which ones your legal form and your plans will require.',
   'Internal controls are the checks that prevent mistakes, fraud and misuse: approvals within your delegation of authority from Module 3, separating duties, two people to approve payments, regular bank reconciliations, a receipt for every transaction and a record of assets. If you are a solo founder, ask an advisor or a trusted volunteer to be the second check.',
   'Procurement is how you buy: when you need quotes, how you choose suppliers fairly, how you avoid conflicts of interest and what you keep on file. Funders, especially institutional ones, and some large customers set stricter rules for their money, and you must follow them once you accept it.',
   'From the start, settle the basics: an accounting system or a well-structured spreadsheet, money kept apart from anyone’s personal money, a filing system for receipts and a monthly routine. If you are not yet registered, rules on holding money for an initiative differ by country, so check the rules where you are and take local advice.'
  ],
  weak:'The founder pays for things and keeps the receipts in a box.',
  strong:'“The youth-work co-founder prepares payments to the flour supplier and the shared kitchen, and the baker co-founder approves them; anything over US$1,000 needs both signatures; the cash from each Saturday stall is counted by two people and banked on Monday; the cash book is matched to the bank every month; every receipt is photographed and filed by month.”',
  why:'No one person can both prepare and approve a payment, stall cash is always counted twice, and every check happens on a set rhythm.',
  reflect:'Where could a mistake with money go unnoticed for months while you are busy launching?',
  exercise:'Describe the finance tools and controls you will use from the start, and the gaps you still have.',
  fields:{
   finance:{label:'Finance systems and controls',hint:'Area (stall cash) | tool or method (cash book, counted by two people) | owner | control planned or in place | gap (no written cash-count sheet yet).'}
  },
  check:'Is the initiative’s money kept apart from personal money and checked by someone other than the person spending it?',
  anatomy:{
   title:'Basic controls and what they prevent',
   intro:'Most new initiatives can put these in place from the first day, without new software.',
   cols:['Control','What it prevents','Simplest version'],
   rows:[
    ['Separate money','Personal and initiative money mixing','An account, and a cash box for stall takings, used only for the bakery, never for personal spending'],
    ['Two people approve','One person spending alone, by mistake or on purpose','Two signatures or approvals above an agreed amount; a solo founder asks an advisor to check'],
    ['Receipt for everything','Spending that cannot be explained','Photograph every flour and ingredient receipt; file them by month'],
    ['Monthly reconciliation','Errors that stay hidden for months','Match the cash book to the bank each month; the other co-founder signs'],
    ['Quotes for larger purchases','Overpaying or favouring friends','Two or three quotes for an oven or a mixer, noted on file']
   ]
  }
 },
 'compliance-essentials':{
  learn:[
   'Some protections cannot wait until Module 10, or until you are registered. If you will work with people, collect personal information, tell stories or handle money, you need a few essentials in place before your first activity.',
   'A short code of conduct sets expected behaviour for founders, volunteers and anyone who joins. If you will have contact with children or adults at risk, a safeguarding approach names a focal person, a reporting route and basic rules. A data protection approach says what personal data you collect, why, where it is kept and who can see it. Consent covers photos, stories and taking part. A conflict of interest declaration covers founders, advisors and, later, board members.',
   'Add any essentials your own activities bring, such as food hygiene and allergen labelling for a bakery, and any licence or permission you need before you trade, such as a market-stall permit. Legal requirements differ by country, so check the rules where you are and ask someone with a legal background if unsure. Keep each essential short, practical and known to everyone involved; Module 10 turns them into full policies where you need them.'
  ],
  weak:'We will write policies once we are registered or a funder asks for them.',
  strong:'“Before the first market day: the stall permit and food business registration checked with the local authority; a one-page code of conduct signed by every adult; the youth-work co-founder named as safeguarding focal person, because some trainees are 17; a parent’s or carer’s consent for under-18s; allergen labels on every product; no trainee handles food unsupervised before a hygiene briefing; trainees’ contact details kept in one locked place.”',
  why:'Trainees and customers are protected before the first market day, in proportion to what the bakery will actually do.',
  reflect:'What could go wrong in your very first activity, and what would protect people?',
  exercise:'List the compliance essentials your first activities will require and their status.',
  fields:{
   essentials:{label:'Compliance essentials',hint:'Essential (allergen labelling) | why we need it (customers with allergies) | status | owner | due before (which activity or date, such as the first market day).'}
  },
  check:'Will people be protected before your first activity, not after?'
 },
 information:{
  learn:[
   'Information management decides where documents and data live, how they are named and versioned, who can see them and how long they are kept. Done badly, it wastes time, loses knowledge and creates data protection risks. It is far easier to set up well at the start than to tidy years of scattered files later.',
   'Organise folders around stable categories that match how your initiative thinks, for example one per strategic objective plus areas for setting up, internal objectives and administration, rather than one per person. Agree a naming convention (document type, topic, date or version) and keep one master copy of each important document.',
   'Set access by need: open for most working files, restricted for personnel, finance and personal data. Decide how long each type of record is kept and when it is deleted or archived; legal retention periods differ by country, so check the rules where you are. Back up regularly and check that a backup can actually be restored.',
   'Knowledge management goes further: keeping lessons, templates and know-how so they outlive any one person, including the founders. A short ‘how we do things’ page per area, a template folder and brief notes after each pilot or big activity are a good start.'
  ],
  weak:'Each founder saves files in their own personal drive.',
  strong:'“Top-level folders for each objective (ESO1 Bakery and sales, ESO2 Traineeships, ESO3 Fair price and waste, and ISO1 to ISO4), plus Setting up and Admin; names like ‘Report – Youth fund – 2026-10’; trainee and finance folders restricted to the two co-founders; records kept for the period local rules require, then archived; weekly backup, with a restore tested twice a year.”',
  why:'Files are findable, confidential records are protected and nothing depends on one founder’s personal account.',
  reflect:'How long would it take the first person who joins you to find your latest budget?',
  exercise:'Design your folder structure, naming rules, access levels and retention approach before the files pile up.',
  fields:{
   structure:{label:'Folder structure and naming',hint:'Top-level folders, naming convention and versioning rule, in a shared account rather than a personal one.'},
   access:{label:'Access and retention',hint:'Information type (trainee records, recipes) | who can access (now and as you grow) | retention period | backup.'}
  },
  check:'Could the first person who joins find the current version of a key document within two minutes?',
  anatomy:{
   title:'Access levels',
   intro:'Three levels are enough for most new initiatives, and they still work as you grow.',
   cols:['Level','Typical contents','Who can see it'],
   rows:[
    ['Open','Recipes, the baking plan, the price list, hygiene checklists','Founders and trainees, and volunteers where useful'],
    ['Team only','Budgets, the youth fund bid, wholesale prices for the cafés and the canteen','Founders and core team; the advisory group or the board on request'],
    ['Restricted','Trainee files, pay records, bank details, consent forms for under-18s','Named people only, listed in writing']
   ]
  }
 },
 stack:{
  learn:[
   'Your tech stack is the set of digital tools you use: email and calendar, file storage, messaging, accounting, contact lists, planning, website, forms and data collection. Choose tools after you know the process, not before. For many new initiatives, a phone, a messaging app and a shared drive are a complete stack.',
   'Prefer fewer tools that connect over many that do not. Each extra tool adds cost, training, logins and another place where information can be out of date. For each tool, name an owner, decide who has access and check that you can export your data if you leave. Open accounts in the initiative’s name, with a shared email, not in one founder’s personal account.',
   'Check security and privacy: two-step login, where data is stored, who the provider is and whether it fits your data protection duties. Use a password manager rather than a shared list of passwords. Keep confidential data, such as trainees’ personal details, out of tools not designed for it, including group chats.',
   'Look for nonprofit, social enterprise and start-up discounts and free tiers, but count the time it would take to switch later.'
  ],
  weak:'We use whatever each person prefers.',
  strong:'“A shared email and calendar in the bakery’s name, one messaging app for the cafés’ and canteen’s orders, a shared drive with the order sheet and cash book, and a card reader at the stall. Each has an owner; two-step login is on; trainees’ personal data never goes in the group chat.”',
  why:'The stack is small, each tool has an owner and confidential data stays in the right place from the start.',
  reflect:'Which tool holds information that exists nowhere else, or only in one founder’s account?',
  exercise:'List the tools you use or plan to use, what they are for, their owner and their risks.',
  fields:{
   tools:{label:'Tool inventory',hint:'Tool, in use or planned (messaging app, card reader) | purpose (wholesale orders) | owner | users | data held (customer names, quantities) | export possible? | security settings.'},
   changes:{label:'Changes to make before launch',hint:'Tools to remove, combine, secure, move to a shared account or add.'}
  },
  check:'Does every tool have an owner, a clear purpose and a way to export your data?'
 },
 issues:{
  learn:[
   'An issue is something that has already happened and needs a response: a complaint, a missed delivery, a broken mixer, a burn in the kitchen, a supplier who lets you down. A risk is something that might happen; Module 10 covers risks. Keep issues in one place from the start, linked to your risk list, so patterns become visible.',
   'For each issue, record what happened, who is affected, how serious it is, who owns the response, the actions agreed and when it was resolved. If an issue shows that a risk has happened, note it against that risk. It takes minutes, and it gives you an honest record to learn from as you grow.',
   'Actions and decisions from founders’ meetings need the same discipline, even when there are only two of you. Every action has an owner and a due date; every decision is recorded with its reason. Review open issues and actions in your weekly or monthly routine and close them on purpose, rather than letting them fade.',
   'Safeguarding concerns and other confidential matters follow their own reporting route; the shared log records only that a concern exists, if anything.'
  ],
  weak:'We talk problems through in the group chat and hope one of us deals with them.',
  strong:'“One issue and action sheet, reviewed at the Monday check-in; each line has severity, owner, next action and date (‘Mixer broke Friday – high – baker co-founder – repair booked – Tuesday’); a café paying late twice in a row, or the flour delivery missing two market days, goes to the risk list.”',
  why:'Every problem has an owner and a date, and repeated issues are spotted as risks.',
  reflect:'Which problem keeps coming back because no one owns it, or because each founder thinks the other does?',
  exercise:'Set up your issue and action tracking routine now, before the problems multiply.',
  fields:{
   log:{label:'Issue and action routine',hint:'Where issues and actions will be recorded, fields kept, review frequency and owner.'},
   examples:{label:'Current open issues',hint:'Issue (late flour delivery) | severity (high, medium or low) | owner | next action | due. Include issues from your planning or pilot.'}
  },
  check:'Does every open issue and action have an owner and a date?'
 },
 blueprint:{title:'Your Internal Systems Blueprint'}
});
