import base from './m09-financial-management.js?v=c8bd65a76';
import {adapt} from './adapt.js?v=c8bd65a76';
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
  strong:'“My co-founder records the stall takings and the cafés’ invoices and prepares supplier payments; I approve them; the accountant who will join our advisory group reviews a monthly summary; once we register as a company, the directors will approve the budget and an external accountant will prepare the annual accounts.”',
  why:'Even with two founders, doing, recording and overseeing sit with different people, and each task has a named owner now and as the bakery grows.',
  reflect:'If the person who handles your money was away for two months, who could pay the bills and see what had been spent?',
  exercise:'Define your finance roles, now and as you grow, and your monthly and annual finance cycle.',
  fields:{
   roles:{label:'Finance roles',hint:'Task (budgeting, bookkeeping, payments, reporting, statutory accounts, oversight) | who, now or once you register (e.g. a co-founder now, an external accountant later) | internal or external.'},
   cycle:{label:'Finance cycle',hint:'Monthly and annual finance activities you will start with, with timing and owner, e.g. stall takings banked every Monday (co-founder), bank reconciliation by the 5th (the other co-founder), budget agreed each December (both).'}
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
  strong:'“Year-one costs of US$48,000 by line and month, each with its basis (the shared kitchen’s rate card, flour quotes from two suppliers, pay for four six-month traineeships) and a 10% contingency. Income of US$48,000: sales US$38,000 (likely), the youth fund’s US$6,000 (confirmed), our own savings US$4,000 (confirmed). If sales come in 10% lower, the US$3,800 gap is shown, with cuts listed in order.”',
  why:'It covers the whole bakery, not only the traineeships, shows its assumptions and is honest about the gap and what will happen if sales fall short.',
  reflect:'Which cost of running your initiative have you not yet put a number on?',
  exercise:'Draft your first-year organisational budget headings and assumptions.',
  fields:{
   costs:{label:'Expenditure',hint:'Cost heading (e.g. shared-kitchen rent) | annual amount (e.g. US$9,600) | basis or assumption (quote, price or estimate) | objective or programme (for example ISO2, or the traineeships).'},
   income:{label:'Income',hint:'Source (sales, members, grants, supporters, loans, founders’ own money) | amount (e.g. US$6,000) | confirmed, likely or possible | timing (e.g. two instalments, months 1 and 7) | restrictions (for example traineeships only).'},
   scenario:{label:'If income falls short',hint:'What you would reduce, delay or not start, and in what order, e.g. first delay the new mixer, then cut one kitchen shift a week, then delay the second group of trainees.'}
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
  weak:'The traineeship budget is the trainees’ pay and their aprons.',
  strong:'“Pilot traineeships (four trainees, six months): direct costs of US$16,000 (trainee pay, hygiene certificates, aprons and safety shoes, ingredients for practice bakes, and our mentoring time priced at what we would pay a mentor) plus US$4,000 of shared costs at our documented rate of 25%; full cost US$20,000, about US$5,000 per trainee.”',
  why:'It counts people’s time, including the founders’, and a fair share of running costs, using a method that will be applied to every project.',
  reflect:'Which cost disappears from your budgets because you, or someone else, contribute it unpaid?',
  exercise:'Build a budget for your first project or pilot, including a fair share of support costs.',
  fields:{
   direct:{label:'Direct costs',hint:'Item (e.g. trainee pay) | quantity (e.g. 4 trainees × 6 months) | unit cost (e.g. US$500 a month) | total | basis (quote, price or estimate).'},
   shared:{label:'Shared costs and allocation method',hint:'Shared cost pools, the allocation basis you have chosen and the resulting share for this project, e.g. kitchen rent, bookkeeping and insurance, shared by kitchen hours.'},
   unpaid:{label:'Hidden or donated costs',hint:'Costs currently covered by founders’ unpaid time, volunteers or in-kind contributions, e.g. our mentoring hours, a neighbour’s van for wholesale deliveries.'}
  },
  check:'Does the project pay its fair share of the costs that make it possible, including time nobody is paid for yet?',
  anatomy:{
   title:'Direct and shared costs',
   intro:'Every project needs both, even in your first year. Funders and customers often see only the first column. The examples are from the bakery’s traineeship pilot.',
   cols:['Question','Direct costs','Shared (indirect) costs'],
   rows:[
    ['What they are','Costs that exist only because this project runs','Costs that keep the whole initiative running'],
    ['Examples','Trainee pay, mentoring time (including founders’), hygiene certificates, aprons and safety shoes, ingredients for practice bakes','Founders’ management time, bookkeeping, a share of the shared-kitchen rent, phone and internet, insurance, registration and accounts fees'],
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
  strong:'“The youth fund’s grant and every cake deposit have a code; a simple funds register shows amount, purpose, spent, balance and report dates; at the end of each month we can see that of US$7,500 in the bank, US$2,000 is unspent youth-fund money (traineeships only) and US$600 is deposits on celebration-cake orders, so only US$4,900 is free to use.”',
  why:'The restrictions are visible from the start, so the founders know how much money is actually free to use.',
  reflect:'If a funder or customer asked tomorrow how their money was spent, how quickly could you show them?',
  exercise:'Set up your funds register, even if it has only one or two lines today.',
  fields:{
   register:{label:'Funds register',hint:'Fund, grant or advance payment (e.g. youth fund grant) | type (restricted, unrestricted, designated, deferred) | amount (e.g. US$6,000) | purpose and conditions (e.g. trainee pay and training only) | spent to date | balance | reporting dates (for example months 6 and 12).'}
  },
  check:'Will you be able to show at any time how each restricted fund has been used?',
  anatomy:{
   title:'Four kinds of money',
   intro:'The type decides who can change how the money is used. Know which kind you are accepting before it arrives.',
   cols:['Type','Who decides how it is used','Example'],
   rows:[
    ['Restricted','The funder or donor; changes need their written agreement','The youth fund’s US$6,000, only for trainee pay and training'],
    ['Unrestricted','Your initiative, within its mission','Stall and wholesale sales, the founders’ own savings'],
    ['Designated','Your board, or your founders until you have one; they can change their own decision','Money the founders set aside towards an oven for the shop'],
    ['Deferred (received in advance)','Earned only when you deliver the work or goods','Deposits on celebration-cake orders, or a café paying for next month’s bread in advance']
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
  strong:'“A twelve-month forecast from the first market day shows cash falling below zero in months two to four, while the mixer and stall equipment are paid for and before the cafés and the canteen pay their 30-day invoices; we lease the mixer instead of buying it and ask the youth fund to pay its first instalment in month one, and the lowest balance becomes US$900 in month three.”',
  why:'The forecast found the gap months ahead and the founders acted before it happened.',
  reflect:'In which month of your first year are you most likely to run short of cash?',
  exercise:'Draft a twelve-month cash flow forecast from your start date and set your runway trigger.',
  fields:{
   forecast:{label:'Cash flow assumptions',hint:'Month | expected receipts (e.g. stall sales, café invoices) | expected payments (e.g. rent, flour, trainee pay) | closing balance | key assumptions (for example cafés pay 30 days after invoice).'},
   runway:{label:'Runway and triggers',hint:'Runway at the start, minimum acceptable level and what you will do if you fall below it.'}
  },
  check:'Would you see a cash shortfall at least three months before it happens, including in your first year?',
  anatomy:{
   title:'A simple cash flow layout',
   intro:'One column per month. The bakery’s first January shows how the lines connect.',
   cols:['Line','What goes in it','Example, January (US$)'],
   rows:[
    ['Opening balance','Cash in the bank at the start of the month','4,000 (the founders’ savings)'],
    ['+ Receipts','Money actually arriving, not money invoiced','6,200: stall sales 2,400; cafés and canteen 800 (December invoices); youth fund first instalment 3,000'],
    ['− Payments','Money actually leaving: pay, rent, suppliers, loans','4,600: kitchen rent, flour and butter, trainee pay, stall fee'],
    ['= Closing balance','Becomes next month’s opening balance','5,600'],
    ['Runway','Closing balance ÷ average monthly payments','5,600 ÷ 4,000 = 1.4 months']
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
  strong:'“A separate bank account from day one; any order over US$200, such as a month’s flour, needs both co-founders; no payment without an invoice or receipt; Saturday takings counted by two people and banked on Monday; the accountant who will join our advisory group reviews the monthly bank reconciliation, which the person who pays does not prepare.”',
  why:'Each step has a different person and leaves evidence, so no single person can make and hide a mistake, even in a team of two.',
  reflect:'Where could an error pass unnoticed in the way you plan to handle money?',
  exercise:'Map one money flow and its checks, and write your first procurement thresholds.',
  fields:{
   controls:{label:'Control map',hint:'Money flow (e.g. buying flour) | requester (e.g. the baker co-founder) | approver (e.g. the other co-founder) | evidence (e.g. supplier invoice) | reconciliation (e.g. monthly bank check) | independent review (now, or who will do it as you grow).'},
   limits:{label:'Procurement thresholds and controls to confirm',hint:'Quotes required at each threshold, conflict declarations and the local advice you still need before you register, e.g. two quotes above US$500, three for an oven.'}
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
  strong:'“A one-page report by the 10th of each month: sales, ingredients, trainee pay and rent against budget, every line more than 10% out explained, cash and runway, and a year-end forecast. In month three it showed ingredients 15% over budget because butter prices rose, so we changed supplier and raised the price of croissants.”',
  why:'The report arrived in time, explained the variance and led to a decision.',
  reflect:'What would you do differently if you saw your financial position every month from the start?',
  exercise:'Design your first management accounts report and the review routine you will start with.',
  fields:{
   report:{label:'Report contents',hint:'Sections, variance threshold for explanation and format (one page is enough to start), e.g. sales by stall and wholesale, ingredients, trainee pay, rent, cash; explain anything 10% out.'},
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
  strong:'“A calendar listing our monthly finance summary for both founders, the youth fund’s reports at six and twelve months, the first tax return and annual accounts after we register as a company, and a yearly summary for the advisory group, each with an owner, all drawn from the same accounts.”',
  why:'Every deadline is known in advance and every report uses the same figures.',
  reflect:'Which report deadline would cause the most damage if you missed it in your first year?',
  exercise:'Build your first financial reporting calendar, including the deadlines that registration will bring.',
  fields:{
   calendar:{label:'Financial reporting calendar',hint:'Report (e.g. youth fund six-month report) | audience (founders, board, funders, members, investors, authorities) | frequency or deadline (e.g. end of month 6) | owner | data source (for example bookkeeping records, trainee timesheets).'}
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
  strong:'“Our accountant has confirmed which external check will apply once we register as a company, and at what size an audit becomes necessary; until the advisory group is in place, we review the accounts every quarter with an independent accountant; reserves target three months of core costs (about US$12,000), starting with one month (US$4,000) by the end of year two.”',
  why:'The founders know the obligations ahead, check them every year and set out who oversees what, and when.',
  reflect:'Could each founder, and later each board member, explain your financial position in two sentences?',
  exercise:'Write your external scrutiny requirements, your oversight arrangements and your first reserves policy.',
  fields:{
   scrutiny:{label:'External scrutiny',hint:'Audit or examination requirements, now and as you grow, and who confirms them.'},
   oversight:{label:'Board oversight',hint:'What the founders, and later the board, review and approve, and when.'},
   reserves:{label:'Reserves policy',hint:'Target level, reasoning, first step towards it and actions if above or below, e.g. three months of core costs, starting with one month by the end of year two.'}
  },
  check:'Will your board actively oversee finances, not only receive reports, and who does that until it exists?',
  anatomy:{
   title:'Who checks your accounts',
   intro:'Some of these may not apply in your first year, but know which will. It depends on your form, size, country and funders, so confirm the thresholds that apply to you.',
   cols:['Check','What it involves','Who asks for it'],
   rows:[
    ['Founder and board review','The founders now, and trustees or directors once you have them, read, question and approve the accounts','Every organisation, as good practice, from the first year'],
    ['Independent examination','A qualified independent person reviews the books and accounts; lighter than an audit','Often smaller charities and nonprofits; a small company like the bakery may choose one voluntarily, depending on the country'],
    ['Statutory audit','An auditor tests the records and gives a formal opinion','Larger organisations, some legal forms, some regulators; usually later, as you grow'],
    ['Funder or project audit','A check of how one grant was spent','Funders, in the grant agreement, sometimes even for a first grant such as a local youth fund’s']
   ]
  }
 },
 sustainability:{
  learn:[
   'Financial sustainability means being able to fund your mission over time, cope with shocks and invest in the future. You judge it by financial health, not by how fast your income grows or how big your first grant or contract is.',
   'Track a few simple measures from the start: months of unrestricted reserves, runway, the share of income from your largest single source, the share of unrestricted or flexible income, whether projects recover their full costs and, where it helps, the cost per output or outcome. Your first values will often be weak; what matters is setting targets and watching how they change over the years.',
   'This lesson measures health; it does not choose your income sources. Decide early which mix of income suits the form you are building (sales, membership fees, grants, loans, investment or supporters), and use these measures together in your annual review: they show whether the way you fund your work is actually working.'
  ],
  weak:'We will be sustainable once the shop opens.',
  strong:'“Runway 1.4 months (target 3); sales cover 79% of costs (target 100% within 18 months); flexible income 88% (only the youth-fund grant is restricted); our largest wholesale customer, the office canteen, buys 15% of what we sell; the traineeships do not yet recover their full costs of about US$5,000 per trainee.”',
  why:'Several measures together show how resilient and how dependent the bakery is, not just how much it sells.',
  reflect:'Which single funder, customer or source of money could you not afford to lose?',
  exercise:'Choose your financial health measures, your starting values and your targets.',
  fields:{
   measures:{label:'Financial health measures',hint:'Measure (e.g. share of costs covered by sales) | starting value (e.g. 79%) | target (e.g. 100% within 18 months) | trend.'}
  },
  check:'Do your measures show resilience and dependency, not only income size?'
 },
 'finance-pack':{title:'Your Financial Management Pack'}
});
