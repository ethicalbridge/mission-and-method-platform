import base from './m03-structure-governance.js';
import {adapt} from './adapt.js';
// Entrepreneurs' version of m03: same lessons, fields, workbook and tools; wording for people building something new.
export default adapt(base,{
 title:'Structure, Governance & Accountability',
 short:'Functions, organigrams, governance, roles, decision rights, delegation, RACI and coordination for a new organisation',
 intro:'Move from your mission and strategy to who will actually do what. Design the work before the job titles, decide early how governance and management will be kept apart, agree who can decide what, and make accountability and coordination visible from day one. A founder working alone, or two co-founders, need this clarity as much as a team of two hundred, and it is far easier to set up now than to untangle later.',
 output:'Structure & Accountability Pack',
 promo:{
  headline:'Know who will own what, from the start',
  pitch:'Organisation Structure holds your planned roles and reporting lines and scans every other tool for owner names, so you can see early when too much sits with one founder or when work has no owner. Meetings, Actions & Decisions turns your founding team’s rhythm into a record of what was decided and who follows up.'
 }
},{
 capabilities:{
  learn:[
   'Structure should follow the work. Start from your objectives and Theory of Change and list the capabilities you will need to deliver them: delivery or production, partnerships, fundraising or sales, finance, people, communications, MEAL, compliance and leadership. Include work you have not started yet, such as registration or bookkeeping.',
   'Group related capabilities into functions. A function is a body of work, not a person. At the start, one founder may hold several functions, or all of them; as you grow, one function may need a whole team. Naming the functions now tells you what your first hires, volunteers or partners should take on.',
   'For each function, decide whether you will do it yourselves, share it with a partner or contract it out, for example bookkeeping, legal advice or IT support. Contracting a task out does not hand over accountability: someone in the founding team still checks the work.',
   'Then look at who will hold what. When one founder holds most functions, everything stops when they are ill, away or overloaded. Spotting this now, before you launch, is cheaper than discovering it in a crisis.'
  ],
  weak:'We will need a director, a programme manager and a fundraiser.',
  strong:'“Workshop delivery: core, in-house, held by one co-founder. Mentoring: shared with a local college. Bookkeeping: contracted, checked monthly by the other co-founder. Fundraising and sales: second co-founder, about a third of her time. MEAL: first co-founder, with volunteers.”',
  why:'It starts from the work and shows how each function will be resourced, which reveals overload before any job titles are created.',
  reflect:'Which essential function does no one in your founding team clearly own yet?',
  exercise:'List the functions your strategy requires and how each will be resourced at the start.',
  check:'Does every objective have the functions it needs to be delivered, even if one person holds several?',
  fields:{
   functions:{label:'Functions we will need',hint:'Function | why the strategy needs it | in-house, shared or contracted | who will hold it at the start.'},
   concentration:{label:'Where work is concentrated',hint:'Which founder or person will hold too many functions, and what is the risk?'}
  }
 },
 structure:{
  learn:[
   'An organigram (organisation chart) shows roles and reporting lines. Common shapes are functional (grouped by expertise), programme or product based, geographic, matrix (people report to two lines) and network or hub (a small core coordinating partners or volunteers). Most new organisations start functional, or as a small hub, with the founders coordinating.',
   'Structure changes with stage. At the start you are usually flat, with everyone working alongside, or reporting to, the founders. As the team grows, lead roles become necessary so that one founder is not the bottleneck for every decision. Draw the structure you will start with and the one you expect in two or three years, and change it on purpose, not by accident.',
   'A chart shows who reports to whom. It does not show who approves spending or how decisions are made; the later lessons in this module cover that. Show governance (the board, committee, shareholders or members you will have) separately from day-to-day management, even when the same founders sit in both.',
   'Use role names rather than personal details. Show contracted specialists, partners and key volunteers with dotted lines. Do not invent a large hierarchy just to look established: a clear chart of two founders and three volunteers is more convincing than ten empty boxes.'
  ],
  weak:'Founder → everyone else.',
  strong:'“The board we will form oversees the two co-founders. One co-founder leads delivery, with volunteer facilitators reporting to her; the other leads partnerships and money, with the contracted bookkeeper on a dotted line. Concerns about either co-founder go to the board chair.”',
  why:'It separates oversight from management, shows where volunteers and contractors sit and gives a route for concerns about the founders.',
  reflect:'Where would a concern go if it involved one of the founders?',
  exercise:'Map the roles and reporting lines you will start with, and the ones you expect as you grow. Use role names rather than private personal details.',
  check:'Does the structure fit the work you actually plan to deliver in your first year?',
  fields:{
   structure:{label:'Reporting lines',hint:'One per line: role | reports to | main responsibility. Mark roles that do not exist yet as “planned”.'},
   gaps:{label:'Capacity gaps',hint:'Which work is uncovered, or concentrated in one founder?'}
  }
 },
 governance:{
  learn:[
   'Governance is how an organisation is directed and held to account; management is how it is run day to day. Every organisation has some governance from its first day, even if it is only the founders agreeing how decisions are made and writing it down.',
   'The governing body depends on the form you choose. Nonprofits and charities usually have a board of trustees or directors who are legally responsible. Foundations have trustees who steward the assets. Companies have directors appointed by shareholders, who keep certain decisions such as changing the articles. Cooperatives answer to their members, who usually elect a committee. The founding document you adopt sets out the rules, so decide what you want before you sign it.',
   'Advisory boards, committees and community panels add expertise and voice, but they do not carry legal responsibility unless your documents give them that role. An advisory group is often a good first step before you have a full board. Be clear which body decides and which advises.',
   'Good governance needs a mix of skills, some independence from the founders, clear terms of office, managed conflicts of interest and a record of decisions. You can start with a few people and a simple calendar, then grow. Rules differ by country; check the rules where you are and ask someone with a legal background before you register.'
  ],
  weak:'We will ask some friends to be on the board.',
  strong:'“Once we register, a board of five with skills in finance, law, education and community work, including one person from the community we serve. The founders do not hold the majority. Three-year terms; meets quarterly. Until then, an advisory group of three that advises but does not decide.”',
  why:'It shows skills, independence, terms, rhythm and the difference between deciding and advising, and it plans the step from today to registration.',
  reflect:'Who, outside the founding team, could hold you to account today?',
  exercise:'Describe the governance structure your chosen form will require and the one you want to build.',
  check:'Is it clear which body will decide and which will only advise?',
  fields:{
   body:{label:'Governing body',hint:'What exists now and what you plan: name, legal role, size, skills needed, independence from the founders and terms of office.'},
   other:{label:'Advisory bodies and member voice',hint:'Advisory groups, committees or member structures you will set up, and whether they decide or advise.'},
   documents:{label:'Founding document checks',hint:'What the constitution, articles or statutes for your form require, and what to confirm with advice before you register.'}
  },
  anatomy:{
   title:'Governance and management',
   intro:'Two different jobs. In a new organisation the same founders usually do both, so be clear which hat you are wearing each time you decide.',
   cols:['Aspect','Governance','Management'],
   rows:[
    ['Main question','Are we doing the right things, well and lawfully?','Are we doing things right, day to day?'],
    ['Who','The founders for now; later a board, trustees, elected committee, shareholders or members','The founders as managers, then the first staff and volunteers'],
    ['Typical decisions','Strategy, budget, choice of legal form, appointing the lead, key policies','Plans, schedules, first hires within budget, delivery'],
    ['Rhythm','A set founders’ meeting monthly or quarterly; a yearly general meeting once registered','Daily and weekly'],
    ['Answers to','Members, regulators, funders, customers and the purpose','The governing body (or the founders, acting together)']
   ]
  }
 },
 board:{
  learn:[
   'The board (or equivalent) sets direction, appoints and supports the executive lead, approves key policies and budgets, oversees performance, finance and risk, and makes sure the organisation meets its legal duties. Management proposes plans, runs operations and reports. Before you have a board, the founders do both jobs. Once one exists, problems start when it manages daily work, or when founders take decisions that now belong to it.',
   'Write down the reserved matters: decisions only the governing body (or the shareholders or members) can take. Start with the founders’ version: which decisions all co-founders must agree together. Typical examples are approving strategy and the annual budget, appointing the executive lead, major contracts or borrowing, changing the founding document and adopting key policies such as safeguarding and conflicts of interest.',
   'Plan a governance calendar: when strategy, budget, accounts, risks, key policies and the executive lead’s performance will be reviewed during the year. Even two founders benefit from fixing a few dates. A calendar makes oversight routine from the start, rather than a reaction to problems.',
   'In a new organisation, the founder very often also sits on the board. Manage this openly from the start: record whether the founder is acting as a manager or a board member, and make sure someone else can raise concerns about the founder’s work. Agree now how the founder’s role, and any pay, will be decided by others.'
  ],
  weak:'The founders will decide everything important together.',
  strong:'“Reserved to the board once we register, and to both co-founders until then: strategy, the annual budget, appointing the lead, contracts or leases over a set amount, any borrowing, key policies. Delegated to the lead: everything else within budget and policy.”',
  why:'It defines “important” precisely and makes everything else clearly delegated, now and after registration.',
  reflect:'Which decision would currently be made by the wrong person or body?',
  exercise:'List your reserved matters, now and after registration, and build a simple governance calendar for your first year.',
  check:'Could the founders, and the board you will have, each say which decisions belong to them?',
  fields:{
   reserved:{label:'Reserved matters',hint:'Decisions only the governing body (or shareholders or members) can take, and which ones all founders must agree until it exists.'},
   calendar:{label:'Governance calendar',hint:'Month or quarter | what is reviewed or approved | papers needed | who prepares them.'}
  }
 },
 roles:{
  learn:[
   'A role describes a contribution, expected results and authority. A task list alone does not tell someone what success looks like or what they can decide. A useful role card covers purpose, key responsibilities, expected results, decisions the role can take, who it works with and the support it needs. Write one for each founder too: co-founder roles are the first to blur.',
   'Apply one owner per area: every function, process and objective has one accountable role, even when many people contribute. Shared ownership usually means no ownership, and between co-founders it is a common source of friction.',
   'Write down the boundaries: spending limits, decisions that need approval and where to escalate. Agree them with the people who will do the work, and review role cards when the strategy or structure changes. Volunteers and board officers need role cards too. Role cards become the basis of your first job adverts and contracts in Module 4.'
  ],
  weak:'We will all own partnerships.',
  strong:'“One co-founder prepares partnership proposals and agrees terms within the pricing rules we set together; any partnership that commits us for more than a year needs both co-founders; the advisory group is told at its next meeting.”',
  why:'People can see who prepares, who decides and who is told.',
  reflect:'Which recurring decision is most likely to be delayed or duplicated between founders?',
  exercise:'Create role cards for the founders and for your first essential roles.',
  check:'Could someone use the role card to decide when to act and when to ask?',
  fields:{
   roles:{label:'Role framework',hint:'Role (founders first) | purpose | expected results | decisions allowed | approval needed | support required.'}
  }
 },
 delegation:{
  learn:[
   'A delegation of authority (also called a scheme of delegation or authority matrix) states who may approve what, up to which limit. It covers spending and contracts, hiring, policies, partnerships, public statements, access to personal data and exceptions to normal rules. Writing a simple one before you open a bank account or sign your first contract saves arguments later.',
   'Set limits that match the risk. Routine purchases within budget can be approved by one founder or a budget holder; larger commitments need all co-founders, or the lead once one is appointed; the largest need the governing body. Add a second check, such as a second signatory, where risk rises, even if you are only two.',
   'Plan for absence and conflicts. Say who approves when the usual approver is away, and that no one approves a payment to themselves or a decision in which they have a personal interest. For a solo founder, this may mean asking an adviser or board member to check certain payments.',
   'Delegation is not abdication. The person delegating stays accountable for checking that authority is used well. Review the matrix as you grow and new people join, and use the same thresholds in your finance procedures (Module 9).'
  ],
  weak:'The founder approves spending.',
  strong:'“Either co-founder approves small items up to a set amount within the budget; both co-founders above that; the board, once formed, above a larger amount or for any unbudgeted item. Two quotes above a set amount; a second signature on every larger payment.”',
  why:'Clear thresholds tell everyone who can say yes, and add a second check where risk rises.',
  reflect:'Which decision is likely to wait for one founder, even though it carries little risk?',
  exercise:'Draft your first delegation of authority matrix.',
  check:'Does every approval limit match the level of risk involved?',
  fields:{
   matrix:{label:'Delegation matrix',hint:'Decision type | limit or condition | who prepares | who approves | who must be informed.'},
   absence:{label:'Absence and conflicts',hint:'Who approves when a founder is away or has a conflict of interest? Who checks payments to the founders themselves?'}
  },
  anatomy:{
   title:'Levels of decision rights',
   intro:'A simple ladder. A new organisation may use only two or three levels at first, and your limits will differ. What matters is that the level rises with the risk.',
   cols:['Level','Typical decisions','Checks'],
   rows:[
    ['Founder, team member or budget holder','Small purchases within the budget; daily delivery choices','Receipts kept; within the agreed budget'],
    ['All co-founders together, or the lead once appointed','Larger purchases, first hires or contracts, routine partner agreements','Quotes above a set amount; second signatory on larger payments'],
    ['Committee of the board (as you grow)','Items prepared for the board, urgent decisions between meetings','Reports to the next full meeting'],
    ['Governing body','Reserved matters: budget, strategy, major contracts, borrowing, key policies','Recorded in minutes; conflicts declared'],
    ['Members or shareholders','Founding document, electing the board, sharing surplus or dividends','General meeting or shareholders’ agreement']
   ]
  }
 },
 raci:{
  learn:[
   'RACI is a simple way to show who does what in a process or decision. Each letter stands for one kind of involvement, as the table below shows. It is useful even for two co-founders, because small teams tend to assume rather than ask.',
   'Use it for recurring processes and decisions that cross roles: the annual plan, choosing a partner, a funding application or sales pitch, publishing a story, recruiting a volunteer, responding to a complaint. Keep exactly one Accountable per row, and be sparing with Consulted, which slows things down.',
   'A simpler variant is an ownership table: for each process, one owner and named helpers. Whichever you use, share it with everyone who joins, refer to it in meetings and update it when roles change. Many coordination problems never appear once ownership is written down from the start.'
  ],
  weak:'The founders decide together.',
  strong:'“Selecting participants: Responsible: first co-founder. Accountable: first co-founder. Consulted: second co-founder, the referral partner. Informed: volunteers, advisory group.”',
  why:'It shows who does the work, who owns the result, who gives input and who needs to know.',
  reflect:'Where might two founders both believe they are accountable for the same result?',
  exercise:'Build a RACI for the five most important recurring processes or decisions in your first year.',
  check:'Does every row have exactly one Accountable role?',
  fields:{
   raci:{label:'RACI table',hint:'Process or decision | Responsible | Accountable (one) | Consulted | Informed. Use roles, including planned ones.'},
   conflicts:{label:'Ownership conflicts found',hint:'Where did you find gaps or two founders as owners, and how will you resolve them?'}
  },
  anatomy:{
   title:'The four RACI letters',
   intro:'One row of a RACI table uses each letter for a different kind of involvement. In a founding team of two, one person often holds both R and A; that is fine as long as there is only one A.',
   cols:['Letter','Meaning','How many per row'],
   rows:[
    ['R · Responsible','Does the work or prepares the decision','One or more'],
    ['A · Accountable','Owns the result and signs it off; can say no','Exactly one'],
    ['C · Consulted','Gives input before the work is finished; two-way','As few as possible'],
    ['I · Informed','Told about the outcome; one-way','Anyone who needs to know']
   ]
  }
 },
 accountability:{
  learn:[
   'Accountability means being answerable for what you do and what results from it. In purpose-led organisations it runs in several directions: upward to the board, funders, investors and regulators; sideways to partners and peers; and downward to the people and communities you serve. Before you have a board or funders, accountability starts with the people you serve and your first supporters.',
   'For each direction, decide what you will report, how often and in what format. Upward reports usually cover results, finance and risk. Downward accountability means sharing information in ways people can use, inviting feedback and explaining decisions; Module 6 develops it further. Building these habits now is easier than adding them once you are busy.',
   'Inside the founding team, accountability depends on clear expectations, regular review and fair consequences, including between co-founders. Pair it with support: people should be able to raise problems early without fear. When things go wrong, separate learning from blame.'
  ],
  weak:'We will report to our funders once a year.',
  strong:'“A monthly check between the co-founders on plans and money; a short update to the advisory group each quarter; results and spending shared with participants and supporters twice a year; customers and partners told of any delay within a week; a yearly report to members once we register.”',
  why:'It covers accountability in several directions, each with a rhythm and a format.',
  reflect:'As you start, to whom might you feel least accountable, and why?',
  exercise:'Map your accountability lines and reporting rhythm for your first year.',
  check:'Does your map include the people you serve, not only those who fund, invest in or govern you?',
  fields:{
   lines:{label:'Accountability map',hint:'To whom | what we will report | format | frequency | owner.'},
   internal:{label:'Internal accountability',hint:'How expectations will be set, reviewed and supported among the founders and the first people who join.'}
  }
 },
 coordination:{
  learn:[
   'Coordination makes hand-offs reliable. A hand-off needs a named recipient, an agreed output and a date. Sharing a document is not the same as agreeing who will act on it, even between two co-founders who talk every day.',
   'Design an operating rhythm: a short weekly check-in for priorities and blockers, regular one-to-ones as people join, a monthly look at numbers and learning, and a quarterly review. Use meetings for decisions and problem-solving; routine updates can be shared beforehand. Start small and add routines as the team grows.',
   'Agree your internal channels now: what goes in chat, what goes by email, where documents live and where decisions are recorded. Keep one decision log from the start, so people who join later can see what was decided and why. Add a route for flagging overload and conflicting priorities, which founders often ignore in themselves.'
  ],
  weak:'We will meet when we need to.',
  strong:'“Every Monday, the co-founders and the volunteer lead spend 30 minutes on blocked work and the week’s priorities; one co-founder records decisions and next owners in a shared decision log.”',
  why:'The routine has a purpose, named roles and a visible record.',
  reflect:'Which hand-off is most likely to fail?',
  exercise:'Define your first operating rhythm, communication channels and one critical hand-off.',
  check:'Does each routine help someone make a decision or complete work?',
  fields:{
   rhythm:{label:'Coordination rhythm',hint:'Meeting or update | purpose | people | frequency | record.'},
   channels:{label:'Internal communication rules',hint:'What goes where: chat, email, shared folders, decision log. Set this up before more people join.'},
   handoff:{label:'Critical hand-off',hint:'From role → to role | deliverable | acceptance check | date.'}
  }
 },
 'team-pack':{title:'Your Structure & Accountability Pack'}
});
