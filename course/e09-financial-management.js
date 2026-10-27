import base from './m09-financial-management.js';
import {adapt} from './adapt.js';
// Entrepreneurs' version of m09: same lessons, fields, workbook and tools; wording for people building something new.
export default adapt(base,{
 short:'Budgets, cost allocation, restricted funds, cash flow, controls, reporting, audit and financial health, set up from the start',
 intro:'Set up money management well from the start, so you can make good decisions, protect resources and earn the trust of funders, customers, members and partners. This module is practical, not an accounting qualification: it covers what founders need to budget, forecast, control, report and oversee finances in a new initiative, what will be required as you grow, and when to bring in a qualified accountant.',
 output:'Financial Management Pack',
 promo:{
  headline:'Connect money to your plans and commitments from the start',
  pitch:'Strategy, KPIs & Annual Planning keeps a budget beside every initiative in your first-year plan, so spending and priorities are reviewed together. Donor Tracking keeps each funder’s amount, conditions and reporting calendar in one place, so restricted money and deadlines are never lost as your first funders and backers arrive.'
 }
},{
 roles:{
  learn:[
   'Financial management has three layers. Bookkeeping records every transaction accurately, from the very first payment you make. Accounting turns those records into reports that follow rules, such as annual accounts and tax returns, once you are registered. Management finance uses the numbers to plan and decide: budgets, forecasts, pricing and cost control.',
   'Decide who does what before money starts to move. When you are starting, a founder often manages day-to-day finance, an external bookkeeper or accountant (or a volunteer with the right skills) keeps records and later prepares statutory accounts, and a co-founder, an adviser, a treasurer or the board you will need oversees. Separating doing, recording and overseeing is itself a control, even in a team of two.',
   'Finance runs in a cycle: plan (budget), record (bookkeeping), control (approvals and bank reconciliations), report (management accounts) and review (compare with the budget and decide). Once you are registered, the year end brings annual accounts and any audit or examination. Put these dates in the calendar you built in Module 5 now, so the habit is there from the start.',
   'Talk to a qualified accountant early, ideally before you register. Ask how your choice of legal form affects tax, what registration and payroll will involve, what statutory accounts you will need and what funders, lenders or investors are likely to ask for. Rules differ by country, so confirm what applies to you.'
  ],
  weak:'One founder will do all the finances, and nobody checks.',
  strong:'“My co-founder keeps the books and prepares payments; I approve them; an adviser with an accounting background reviews a monthly summary; once we register, the board will approve the budget and an external accountant will prepare the annual accounts.”',
  why:'Even with two founders, doing, recording and overseeing sit with different people, and each task has a named owner now and as the initiative grows.',
  reflect:'If the person who handles your money was away for two months, who could pay the bills and see what had been spent?',
  exercise:'Define your finance roles, now and as you grow, and your monthly and annual finance cycle.',
  fields:{
   roles:{label:'Finance roles',hint:'Task (budgeting, bookkeeping, payments, reporting, statutory accounts, oversight) | who, now or once you register | internal or external.'},
   cycle:{label:'Finance cycle',hint:'Monthly and annual finance activities you will start with, with timing and owner.'}
  },
  check:'Are doing, recording and overseeing finance held by different people, even within your founding team?'
 },
 'core-budget':{
  learn:[
   'An organisational (core) budget estimates all your income and spending for the year ahead, including your first year: programmes, products or services, people (including any founder pay), premises, equipment, IT, insurance, registration and professional fees, governance, fundraising or sales costs and a contribution to reserves. It is a plan for the whole initiative, not the sum of what a funder or first customer will pay for.',
   'Build it from your plan for the first year. Base costs on real quotes and prices, not guesses, and write down each assumption, because you have no past spending to rely on. Mark each income source as confirmed, likely or possible. Do not plan spending against possible income unless you have decided what you will cut if it does not arrive. Add a contingency line: first-year costs are almost always higher than expected.',
   'Set the budget out by month, so you can compare it with what actually happens, and by objective or programme, so you can see what each part of your strategy costs. Your founders agree it now; once you have a board or committee, it approves the budget before the year starts.'
  ],
  weak:'We will spend what we receive.',
  strong:'“Year-one costs of US$38,000 by line and month, each with its basis (supplier quotes, rent from the lease offer, part-time pay for one coordinator) and a 10% contingency; income of US$34,000, each source marked confirmed, likely or possible; the US$4,000 gap shown, with cuts listed in order.”',
  why:'It covers the whole initiative, shows its assumptions and is honest about the gap and what will happen if income falls short.',
  reflect:'Which cost of running your initiative have you not yet put a number on?',
  exercise:'Draft your first-year organisational budget headings and assumptions.',
  fields:{
   costs:{label:'Expenditure',hint:'Cost heading | annual amount | basis or assumption (quote, price or estimate) | objective or programme.'},
   income:{label:'Income',hint:'Source (sales, members, grants, supporters, loans, founders’ own money) | amount | confirmed, likely or possible | timing | restrictions.'},
   scenario:{label:'If income falls short',hint:'What you would reduce, delay or not start, and in what order.'}
  },
  check:'Does your budget include the full costs of running the initiative, not only the costs of its activities?'
 },
 'programme-budget':{
  learn:[
   'A project or programme budget shows the cost of one piece of work, such as a pilot, a first product line or a first group of participants. It includes direct costs (people’s time on the project, materials, travel, support for participants) and a fair share of the shared costs that make the work possible (management, finance, rent, IT, governance).',
   'Cost allocation divides shared costs between projects on a reasonable basis, such as time, floor space or share of spending. Choose a method now, apply it the same way every time and keep the calculation. Full cost recovery means each funded or paid project covers its fair share, so the initiative is not left to cover the gap.',
   'Low overheads do not mean efficiency. Many new initiatives budget and price their first projects without support costs and never catch up: no finance capacity, no training, no reserves. Work out your real shared-cost rate from the start and use it when you set prices or ask funders for support, while respecting any limits they set.',
   'Use the same cost headings in every project budget, so that together they add up to the organisational budget without counting anything twice.'
  ],
  weak:'The pilot budget is the venue, the transport and the materials.',
  strong:'“Pilot workshops: direct costs of US$6,400 (venue, transport, materials, and the coordinator’s and founders’ time priced at what we would pay someone else) plus US$1,600 of shared costs at our documented rate of 25%; full cost US$8,000, about US$200 per participant.”',
  why:'It counts people’s time, including the founders’, and a fair share of running costs, using a method that will be applied to every project.',
  reflect:'Which cost disappears from your budgets because you, or someone else, contribute it unpaid?',
  exercise:'Build a budget for your first project or pilot, including a fair share of support costs.',
  fields:{
   direct:{label:'Direct costs',hint:'Item | quantity | unit cost | total | basis (quote, price or estimate).'},
   shared:{label:'Shared costs and allocation method',hint:'Shared cost pools, the allocation basis you have chosen and the resulting share for this project.'},
   unpaid:{label:'Hidden or donated costs',hint:'Costs currently covered by founders’ unpaid time, volunteers or in-kind contributions.'}
  },
  check:'Does the project pay its fair share of the costs that make it possible, including time nobody is paid for yet?',
  anatomy:{
   title:'Direct and shared costs',
   intro:'Every project needs both, even in your first year. Funders and customers often see only the first column.',
   cols:['Question','Direct costs','Shared (indirect) costs'],
   rows:[
    ['What they are','Costs that exist only because this project runs','Costs that keep the whole initiative running'],
    ['Examples','Time spent on the project (including founders’), materials, venue, participant travel','Founders’ management time, bookkeeping, rent or a share of a workspace, phone and internet, insurance, registration and accounts fees'],
    ['How they enter the budget','Itemised: quantity × unit cost','A share, using a written basis such as time or floor space'],
    ['If you leave them out','The project cannot be delivered','Other income, or the founders’ unpaid time, quietly subsidises the project']
   ]
  }
 },
 restricted:{
  learn:[
   'Restricted funds can be used only for the purpose the donor or funder set. Unrestricted funds can be used for anything within your mission. Designated funds are unrestricted money your board (or your founders, until you have a board) has set aside for a purpose; you can change that decision yourselves, but a funder’s restriction can only be changed with the funder’s agreement.',
   'Track restricted funds separately from the first grant or gift that comes with conditions. Give each one a code, record income and spending against it and report on it as agreed. Using restricted money for something else, even for a few weeks, can break the agreement and, in some countries, the law. Read the conditions before you accept the money, not after.',
   'Companies, cooperatives and social businesses have similar ideas. Money received for work not yet delivered, such as fees, pre-orders or memberships paid in advance, is deferred income; loans and investment come with conditions. Whatever form you choose, know which money is committed to what, and keep enough flexible money to cover core costs and risks.'
  ],
  weak:'All our money will go into one pot.',
  strong:'“Each grant and each advance payment has a code; a simple funds register shows amount, purpose, spent, balance and report dates; at the end of each month we can see that of US$9,000 in the bank, US$6,500 is restricted and US$1,000 is customers’ pre-payments, so only US$1,500 is free to use.”',
  why:'The restrictions are visible from the start, so the founders know how much money is actually free to use.',
  reflect:'If a funder or customer asked tomorrow how their money was spent, how quickly could you show them?',
  exercise:'Set up your funds register, even if it has only one or two lines today.',
  fields:{
   register:{label:'Funds register',hint:'Fund, grant or advance payment | type (restricted, unrestricted, designated, deferred) | amount | purpose and conditions | spent to date | balance | reporting dates.'}
  },
  check:'Will you be able to show at any time how each restricted fund has been used?',
  anatomy:{
   title:'Four kinds of money',
   intro:'The type decides who can change how the money is used. Know which kind you are accepting before it arrives.',
   cols:['Type','Who decides how it is used','Example'],
   rows:[
    ['Restricted','The funder or donor; changes need their written agreement','A start-up grant only for a pilot programme'],
    ['Unrestricted','Your initiative, within its mission','General donations, sales profit, founders’ own contributions'],
    ['Designated','Your board, or your founders until you have one; they can change their own decision','Money set aside for a first piece of equipment'],
    ['Deferred (received in advance)','Earned only when you deliver the work or goods','Customers’ pre-orders, or course fees paid before the course starts']
   ]
  }
 },
 cashflow:{
  learn:[
   'A surplus on paper does not pay bills; cash does. A cash flow forecast shows, month by month, the cash you expect to receive and pay out, and the balance at the end of each month. For a new initiative it is often the most important financial tool, because start-up costs come first and income comes later. It shows gaps before they happen, for example when a grant or a customer pays late or a large one-off cost falls due.',
   'Runway is how many months you could keep operating with the cash you have if no new income arrived. A simple estimate: cash in the bank divided by your average monthly payments. Know your runway from the first month, and set a minimum level that triggers action.',
   'Update the forecast every month with actual figures, and test simple scenarios: what if your first sales come three months later than planned, a major payment is late or a funding bid fails? Decide in advance what you would do: delay spending, launch in stages, use reserves or founders’ own money, bring income forward or arrange short-term borrowing.'
  ],
  weak:'We will check the bank balance when we need to pay something.',
  strong:'“A twelve-month forecast from launch shows cash falling below zero in months four to six, while equipment is paid for and before the first contracts pay; we move one purchase later and agree a small bridging loan, and the lowest balance becomes US$1,200 in month five.”',
  why:'The forecast found the gap months ahead and the founders acted before it happened.',
  reflect:'In which month of your first year are you most likely to run short of cash?',
  exercise:'Draft a twelve-month cash flow forecast from your start date and set your runway trigger.',
  fields:{
   forecast:{label:'Cash flow assumptions',hint:'Month | expected receipts | expected payments | closing balance | key assumptions (start-up costs, first sales, grant dates).'},
   runway:{label:'Runway and triggers',hint:'Runway at the start, minimum acceptable level and what you will do if you fall below it.'}
  },
  check:'Would you see a cash shortfall at least three months before it happens, including in your first year?',
  anatomy:{
   title:'A simple cash flow layout',
   intro:'One column per month. An example new initiative’s first January shows how the lines connect.',
   cols:['Line','What goes in it','Example, January (US$)'],
   rows:[
    ['Opening balance','Cash in the bank at the start of the month','4,000'],
    ['+ Receipts','Money actually arriving, not money invoiced','6,500: sales 2,500; first client 1,500 (December invoice); start-up grant 2,500'],
    ['− Payments','Money actually leaving: pay, rent, suppliers, loans','5,300'],
    ['= Closing balance','Becomes next month’s opening balance','5,200'],
    ['Runway','Closing balance ÷ average monthly payments','5,200 ÷ 4,800 = 1.1 months']
   ]
  }
 },
 controls:{
  learn:[
   'Financial controls prevent errors and misuse and make your records trustworthy. Four principles: approvals within your delegation of authority (Module 3), evidence for every transaction, separation of duties and independent review. They are far easier to set up before the first payment than to add later.',
   'Where you can, give requesting, approving, paying and checking to different people. A founder working alone or with one co-founder cannot always do this, so name a compensating control instead, such as an adviser or a future board member reviewing the bank statements, rather than pretending the separation exists. Open a separate bank account for the initiative from the start, reconcile it every month, and have someone other than the person who made the payments review it.',
   'Procurement rules make buying fair and good value: when you need quotes, how you choose suppliers, how conflicts of interest are declared (for example buying from a co-founder’s relative) and what records you keep. Where a funder’s rules are stricter, follow theirs for that money.',
   'Keep the rules in proportion to your size, and check them with a competent adviser for the legal form you choose and your country. Guidance from another country’s regulator is a useful reference, not a statement of your duties.'
  ],
  weak:'The founder will handle all payments without review.',
  strong:'“A separate bank account from day one; anything over US$200 needs both co-founders; no payment without an invoice or receipt; an adviser with an accounting background reviews the monthly bank reconciliation, which the person who pays does not prepare.”',
  why:'Each step has a different person and leaves evidence, so no single person can make and hide a mistake, even in a team of two.',
  reflect:'Where could an error pass unnoticed in the way you plan to handle money?',
  exercise:'Map one money flow and its checks, and write your first procurement thresholds.',
  fields:{
   controls:{label:'Control map',hint:'Money flow | requester | approver | evidence | reconciliation | independent review (now, or who will do it as you grow).'},
   limits:{label:'Procurement thresholds and controls to confirm',hint:'Quotes required at each threshold, conflict declarations and the local advice you still need before you register.'}
  },
  check:'Is there a meaningful check beyond the person initiating the transaction, even if you are only one or two people?'
 },
 'management-accounts':{
  learn:[
   'Management accounts are short internal reports, usually monthly or quarterly, that compare actual income and spending with the budget. They are for making decisions, so they should be on time and simple rather than perfect. In your first year, when the budget is mostly assumptions, they show quickly which assumptions were wrong.',
   'For each budget line, show the budget to date, the actual to date and the difference (the variance). Explain each significant variance in one sentence: timing (spent or received later or earlier than planned), price (costs or prices higher or lower than expected) or volume (more or fewer activities, sales or members). Then decide: accept it, correct it or change the forecast.',
   'Add a forecast to the year end. The key question is not only “where are we now?” but “where will we end up, and is that acceptable?” Start the routine in your first month, even if the report is one page shared between co-founders.'
  ],
  weak:'We will look at the numbers once a year, when the accounts are due.',
  strong:'“A one-page report by the 10th of each month showing income and costs against budget, every line more than 10% out explained, cash and runway, and a year-end forecast. In month three it showed materials 15% over budget, so we changed supplier and raised the price for the next order.”',
  why:'The report arrived in time, explained the variance and led to a decision.',
  reflect:'What would you do differently if you saw your financial position every month from the start?',
  exercise:'Design your first management accounts report and the review routine you will start with.',
  fields:{
   report:{label:'Report contents',hint:'Sections, variance threshold for explanation and format (one page is enough to start).'},
   routine:{label:'Review routine',hint:'Who prepares, by when, who reviews (co-founders, an adviser, later the board) and what decisions follow.'}
  },
  check:'Does every significant variance have an explanation and a decision?'
 },
 reporting:{
  learn:[
   'Different audiences need different financial reports. Your founders, and later your board, need regular management accounts, cash and risks. Funders need reports in their own format showing how their money was used. Regulators and tax authorities need statutory accounts and returns by fixed deadlines once you are registered. Members, shareholders, lenders or investors may need their own.',
   'Build a financial reporting calendar as soon as you accept your first grant, loan or investment, or register, with every deadline, its owner and where the figures come from. Make sure each report matches your accounts, so the same numbers appear everywhere. Keep the evidence (receipts, timesheets, contracts) filed by fund and by period from the first day.',
   'What your annual accounts must contain, and when they are due, depends on the legal form you choose, its size and your country, so confirm the rules before you register. Your accountant prepares them, but the founders, and later the board, must understand and approve them. Where you can, publish a simple summary as part of being open about your money from the start.'
  ],
  weak:'We will prepare reports when someone asks for them.',
  strong:'“A calendar listing our monthly finance summary, the start-up grant’s reports at six and twelve months, the first tax return and annual accounts after registration, and a yearly summary for members, each with an owner, all drawn from the same accounts.”',
  why:'Every deadline is known in advance and every report uses the same figures.',
  reflect:'Which report deadline would cause the most damage if you missed it in your first year?',
  exercise:'Build your first financial reporting calendar, including the deadlines that registration will bring.',
  fields:{
   calendar:{label:'Financial reporting calendar',hint:'Report | audience (founders, board, funders, members, investors, authorities) | frequency or deadline | owner | data source.'}
  },
  check:'Will the figures in every report reconcile to the same accounts?'
 },
 audit:{
  learn:[
   'Depending on the legal form you choose, its size and your country, your annual accounts may need an independent examination or a full audit, either from the start or once you pass a threshold, and some funders ask for audits of their projects. Thresholds differ by country and change over time, so confirm the ones that will apply to you and plan for the cost and timing.',
   'Financial governance is how your governing body oversees money: approving the budget, reviewing management accounts, approving the annual accounts, appointing auditors or examiners, setting a reserves policy and approving major financial commitments. Until you have a board, agree among the founders who does each of these, and ask someone independent to review the numbers.',
   'A reserves policy states how much unrestricted money you aim to hold, why (for example three to six months of core costs, to manage risk and change), and what you will do if you are above or below the target. Most new initiatives start with no reserves, so set a target and a first step towards it. A treasurer or finance committee can help later, but the whole board stays responsible.'
  ],
  weak:'The accountant will take care of all that.',
  strong:'“Our accountant has confirmed which external check will apply once we register, and at what size an audit becomes necessary; the founders review the accounts every quarter with an independent adviser until a board is in place; reserves target three months of core costs, starting with one month by the end of year two.”',
  why:'The founders know the obligations ahead, check them every year and set out who oversees what, and when.',
  reflect:'Could each founder, and later each board member, explain your financial position in two sentences?',
  exercise:'Write your external scrutiny requirements, your oversight arrangements and your first reserves policy.',
  fields:{
   scrutiny:{label:'External scrutiny',hint:'Audit or examination requirements, now and as you grow, and who confirms them.'},
   oversight:{label:'Board oversight',hint:'What the founders, and later the board, review and approve, and when.'},
   reserves:{label:'Reserves policy',hint:'Target level, reasoning, first step towards it and actions if above or below.'}
  },
  check:'Will your board actively oversee finances, not only receive reports, and who does that until it exists?',
  anatomy:{
   title:'Who checks your accounts',
   intro:'Some of these may not apply in your first year, but know which will. It depends on your form, size, country and funders, so confirm the thresholds that apply to you.',
   cols:['Check','What it involves','Who asks for it'],
   rows:[
    ['Founder and board review','The founders now, and trustees or directors once you have them, read, question and approve the accounts','Every organisation, as good practice, from the first year'],
    ['Independent examination','A qualified independent person reviews the books and accounts; lighter than an audit','Often smaller registered charities, depending on the country'],
    ['Statutory audit','An auditor tests the records and gives a formal opinion','Larger organisations, some legal forms, some regulators; usually later, as you grow'],
    ['Funder or project audit','A check of how one grant was spent','Funders, in the grant agreement, sometimes even for a first grant']
   ]
  }
 },
 sustainability:{
  learn:[
   'Financial sustainability means being able to fund your mission over time, cope with shocks and invest in the future. You judge it by financial health, not by how fast your income grows or how big your first grant or contract is.',
   'Track a few simple measures from the start: months of unrestricted reserves, runway, the share of income from your largest single source, the share of unrestricted or flexible income, whether projects recover their full costs and, where it helps, the cost per output or outcome. Your first values will often be weak; what matters is setting targets and watching how they change over the years.',
   'This lesson measures health; it does not choose your income sources. Decide early which mix of income suits the form you are building (sales, membership fees, grants, loans, investment or supporters), and use these measures together in your annual review: they show whether the way you fund your work is actually working.'
  ],
  weak:'We will be sustainable once we win a big grant.',
  strong:'“Runway 2 months (target 6); largest source 70% of income (target below 40% by year three); flexible income 30%; the pilot does not yet recover its full costs; full cost per participant about US$200, which our prices or funding will need to cover.”',
  why:'Several measures together show how resilient and how dependent the initiative is, not just how big.',
  reflect:'Which single funder, customer or source of money could you not afford to lose?',
  exercise:'Choose your financial health measures, your starting values and your targets.',
  fields:{
   measures:{label:'Financial health measures',hint:'Measure | starting value | target | trend.'}
  },
  check:'Do your measures show resilience and dependency, not only income size?'
 },
 'finance-pack':{title:'Your Financial Management Pack'}
});
