import base from './m06-meal.js?v=c324e2a2c';
import {adapt} from './adapt.js?v=c324e2a2c';
// Entrepreneurs' version of m06: same lessons, fields, workbook and tools; wording for people building something new.
export default adapt(base,{
 title:'MEAL: Monitoring, Evaluation, Accountability & Learning',
 short:'Theory of Change → results framework → indicators → data → learning → decisions',
 intro:'Build evidence into your idea from the start. Turn your Theory of Change into a results framework, define indicators with honest baselines and targets, plan how you will collect data ethically, listen to the first people you serve, decide what you will evaluate and use what you learn to shape the next step. The same principles apply whether you are building a nonprofit, a social business, a cooperative or a community initiative, and whether you call it MEAL or impact measurement.',
 output:'MEAL Framework',
 promo:{
  headline:'Know from your first pilot whether it is working, without building spreadsheets from scratch',
  pitch:'MEAL Strategy keeps every indicator with its definition, baseline, target, data source and owner, tracks planned against actual each quarter and records the learning and decisions from each review. It can pull indicators from your Theory of Change and KPIs from your annual plan, so your evidence grows with your initiative from the very first activity.'
 }
},{
 system:{
  learn:[
   'MEAL stands for Monitoring, Evaluation, Accountability and Learning. Monitoring tracks what is happening, regularly. Evaluation asks whether, how and why results occur. Accountability means the people you serve can shape the work and raise concerns. Learning means using what you find to change decisions. Together they answer three questions every founder needs answered early: are we doing what we said, is it making a difference, and what should we change?',
   'Different sectors use different words. Nonprofits talk about results frameworks, logframes and funder reports; social businesses and start-ups talk about impact measurement and outcome metrics; cooperatives often report results to their members. The principles are the same: define the change, measure it honestly, listen to the people affected and act on what you learn. Use the words the people around your idea understand.',
   'Start small and keep the system proportionate. Collect only data you will use for a decision or an obligation, and that you can collect and protect responsibly. Three to five good indicators reviewed every quarter teach you more than fifty that nobody looks at. A founder working alone can run MEAL on paper sheets and photos; tablets and a database can come later, as you grow.',
   'This module builds one chain, adding a link in each lesson: Theory of Change → results framework → indicators → data → learning → decisions. Building it now, before your first pilot or launch, means you will have evidence from day one instead of trying to reconstruct it later.'
  ],
  weak:'We will collect as much data as possible once we start.',
  strong:'“After our pilot with four trainees, our MEAL system will show how many finished, which baking skills they gained, whether they found a job and whether the stall is moving towards covering its costs, so that we can decide whether to take on four more trainees, what to change in the training and whether to plan our own shop for year 2.”',
  why:'Each piece of data is tied to a decision one of the two co-founders will take, even before the first trainee starts.',
  reflect:'Which decision about your idea will your first data collection inform?',
  exercise:'Write the purpose of your MEAL system and the decisions it must inform in your first year.',
  fields:{
   purpose:{label:'Purpose of our MEAL system',hint:'What questions it must answer in the first year, and for whom: for example you and your co-founder, the trainees, the youth centre that refers them, customers and a local youth fund.'},
   decisions:{label:'Decisions MEAL should inform',hint:'Decision (e.g. take on four more trainees) | who makes it (you or a co-founder) | when (e.g. end of the pilot) | what evidence you will need (how many finished and found work).'}
  },
  check:'Is every part of your planned system linked to a decision or an obligation?',
  anatomy:{
   title:'The four parts of MEAL',
   intro:'Each part answers a different question; even a founder working alone needs all four, in a light form.',
   cols:['Part','Question it answers','Example (the bakery pilot)'],
   rows:[
    ['Monitoring','Are we doing what we planned, and what is changing?','A weekly sheet: loaves baked, sold and wasted at the stall, and each trainee’s shifts and skills signed off.'],
    ['Evaluation','Did it make a difference, for whom and why?','A short review at the end of the six-month pilot: did trainees finish, gain skills and find work, and why or why not?'],
    ['Accountability','Can the people we serve shape the work and raise concerns?','A feedback chat with each trainee every two weeks; a contact at the youth centre, outside the founding team, for sensitive concerns.'],
    ['Learning','What will we change because of what we found?','A review after the pilot that turns findings into two or three decisions for the next four trainees.']
   ]
  }
 },
 'results-framework':{
  learn:[
   'A results framework turns your Theory of Change into a table. For each external objective it lists the expected impact, outcomes and outputs, each with its evidence (how you will know) and its assumptions (what must hold true). A logframe is a common funder version of the same idea, usually with columns for the narrative, indicators, means of verification and assumptions. You may be asked for one when you first apply for funding, so it helps to have the logic ready.',
   'Start from your pathway in Module 2. Copy the outcomes and outputs you will actually be able to monitor in your first year or pilot, not every box in the diagram. Keep the codes from your strategy, for example ESO1, Outcome 1.1 and Output 1.1.1, so that results, budgets and plans can be linked as your initiative grows.',
   'Then check the logic in two directions. Vertically: if the outputs are delivered and the assumptions hold, do the outcomes follow? Horizontally: can you measure each result with evidence you can actually obtain with the time and people you have? Treat impact as something you will contribute to over years, not something you can measure in your first year.'
  ],
  weak:'Our results framework is our list of what we will bake and sell, with numbers.',
  strong:'ESO2: Young people who left school early gain baking skills and a first paid job.\nOutcome 2.2: Trainees find a paid job within three months of finishing.\nOutput 2.2.1: Each trainee does two trial shifts with local employers, including the two cafés we supply.\nEvidence: a follow-up call at three months; job offers seen.\nAssumption: local employers value a bakery traineeship and a food-hygiene certificate.',
  why:'It follows the pathway from ESO2, keeps codes that will link to the strategy and budget, and carries the assumption about employers across from the Theory of Change.',
  reflect:'Which outcome in your Theory of Change will you not be able to monitor yet, and why?',
  exercise:'Build your results framework for one external objective, sized to your first year or pilot.',
  fields:{
   framework:{label:'Results framework',hint:'Code (e.g. ESO2, 2.2, 2.2.1) | level (impact, outcome, output) | result statement (e.g. trainees find a paid job within three months) | evidence source you can realistically obtain (e.g. follow-up call at three months) | assumption (local employers value the traineeship).'}
  },
  check:'Does every result trace back to a pathway in your Theory of Change?'
 },
 indicators:{
  learn:[
   'An indicator is a specific sign you track to show whether a result is happening. It should be clearly defined, measurable with data you can get, relevant to the result and able to show change. Write a short definition so that you, a co-founder or the first person who joins would all measure it the same way.',
   'Mix numbers and percentages with qualitative signs, such as changes people describe or practice you observe. For every percentage, define the numerator (who counts as a success) and the denominator (out of whom). Decide now how you will break the data down, for example by gender, age, disability or location, so that unequal results become visible from your very first group.',
   'Watch for common traps: counting activities as outcomes, indicators that reward easy numbers, counting the same person twice across activities, and indicators you cannot collect ethically. Record each indicator on a reference sheet with its definition, unit, source, method, frequency, owner and which direction is better. Starting with a few well-defined indicators is better than many vague ones.'
  ],
  weak:'Number of young people helped.',
  strong:'“Percentage of trainees who complete the six-month traineeship (numerator: trainees who work at least 90% of their planned shifts and pass the basic food-hygiene certificate; denominator: every trainee who started), broken down by age (17 or 18–24) and gender.”',
  why:'It is defined exactly, uses the shift rota and certificate records the bakery keeps anyway, and would show early whether the youngest trainees are being left behind.',
  reflect:'Which of your planned indicators could improve while the real situation gets worse?',
  exercise:'Define indicators for the priority results of your first year or pilot.',
  fields:{
   indicators:{label:'Indicator reference sheet',hint:'Code (e.g. 2.1) | result | indicator (e.g. % of trainees who complete) | definition | unit | numerator/denominator | disaggregation (e.g. age, gender) | source (e.g. shift rota) | frequency | owner (you or your co-founder).'}
  },
  check:'Would two people measure each indicator the same way from its definition?',
  anatomy:{
   title:'The anatomy of an indicator',
   intro:'The parts you record for every indicator, shown with one from the bakery pilot. Baselines and targets come in the next lesson.',
   cols:['Part','What it records','Example (the bakery pilot)'],
   rows:[
    ['Indicator','The sign you track, with its definition','% of trainees in a paid job three months after finishing'],
    ['Baseline','The value before you start, or a plan to measure it','To be established: work status asked when the youth centre refers each trainee'],
    ['Target','The value you aim for, and by when','Provisional: 2 of the 4 pilot trainees by the end of year 1'],
    ['Source','Where the data comes from, and how','Follow-up call; job offer seen or employer confirms'],
    ['Frequency','How often you collect it','Three months after each trainee finishes'],
    ['Owner','Who collects it and answers for it','The co-founder who works with the trainees']
   ]
  }
 },
 baselines:{
  learn:[
   'A baseline is the value of an indicator before your work starts, or at a fixed starting point. A target is the value you aim to reach by a given date. Without a baseline you cannot show change; without a target you cannot judge progress. When you are building something new, the starting point is now, so this is the best moment to capture it.',
   'If you do not know the baseline, do not invent it. Plan how and when you will establish it: a short question at sign-up, existing public records, a first measurement in your pilot or published data for your area. Write “to be established by [date]” until you have it.',
   'Set targets that are ambitious but realistic, based on similar work elsewhere, the time and help you have and the time change usually takes. Your first groups will be small, and small numbers swing a lot, so treat a percentage from six people with care. Break annual targets into quarterly milestones where that helps you manage, and revise targets openly, with a reason, never quietly.'
  ],
  weak:'Target: every trainee gets a job.',
  strong:'“Weekly food waste at the stall (bread and cakes neither sold nor given away). Baseline: to be measured over our first four Saturdays. Provisional target: under 5% of what we bake by the end of year 1, confirmed or revised once we have three months of figures.”',
  why:'It refuses to invent a baseline for a stall that has not opened yet and sets a provisional target it will check against real weekly figures.',
  reflect:'Which of your targets is based on hope rather than evidence?',
  exercise:'Set baselines (or plans to establish them before or during your pilot) and targets for your indicators.',
  fields:{
   targets:{label:'Baselines and targets',hint:'Indicator (e.g. weekly food waste) | baseline or plan to establish it (e.g. measured over the first four Saturdays) | target (provisional if new) | date | quarterly milestones | evidence for the target.'}
  },
  check:'Is every baseline either measured or planned, never invented?'
 },
 'data-collection':{
  learn:[
   'Choose methods that fit the indicator and the people involved: registers and attendance lists, surveys, interviews, group discussions, observation, skills tests, sales or membership records, or digital analytics. Use the simplest method that gives credible evidence and that you can keep up while doing everything else a founder does. A paper sheet that is filled in every time beats an app nobody opens.',
   'Collect data ethically from the first day. Explain why you are collecting it, ask for informed consent, collect only what you need, keep it confidential, make taking part voluntary and avoid causing distress. Take particular care with children, vulnerable adults and sensitive topics, and follow the data protection rules where you work; rules differ by country, so check the rules where you are and ask someone with a legal background if you are unsure.',
   'Check quality in five ways: validity (it measures what it claims), reliability (it is collected the same way each time), timeliness, precision and integrity (it has not been changed). Build simple checks into your routine from the start: brief anyone who helps you collect data, spot-check a sample and keep definitions to hand. Test every tool with a few of the people who will use it before your pilot begins.'
  ],
  weak:'Send a long survey to everyone at the end of the first year.',
  strong:'“We fill in a tally sheet at the stall every Saturday (baked, sold, left over); each trainee and their mentor sign a skills checklist every two weeks; we ask for contact details for follow-up only with consent; once a month we check five tally sheets against the till record, and we tested the checklist with two youth-centre staff and one young person before the pilot.”',
  why:'Each method fits its indicator and the bakery’s routine, consent is built in and a small monthly check keeps the data trustworthy from the start.',
  reflect:'What data are you planning to collect that you would never use?',
  exercise:'Draft your data collection plan for your first year or pilot.',
  fields:{
   plan:{label:'Data collection plan',hint:'Indicator (e.g. loaves sold) | method and tool (e.g. Saturday tally sheet) | who collects (you, your co-founder or a trainee’s mentor) | when | consent approach | where stored and who can see it.'},
   quality:{label:'Quality checks',hint:'How you will check validity, reliability and integrity with the time and help you have.'}
  },
  check:'Does each method protect participants and produce data you can trust?'
 },
 'meal-plan':{
  learn:[
   'A MEAL plan brings everything together: your results framework, indicators, data collection, roles, timing, review moments, evaluation, feedback channels and reporting. It is the operating manual for your evidence, short enough that you and the first people who join will actually read and use it.',
   'Assign roles clearly, even if there are only one or two of you. Who collects data, who enters and checks it, who analyses it, who leads reviews and who reports? At the start one founder may do most of this; write down the time it takes so it is not hidden on top of everything else, and so you know what to hand over as the team grows.',
   'Budget for MEAL from the beginning. Printing, tools, your time, transport, translation, participant compensation, evaluation and learning sessions all cost money or time. Many funders accept a MEAL budget line, and customers, members or supporters will trust you more if you can show results; include MEAL in your first proposals and in your budget in Module 9.'
  ],
  weak:'We will do monitoring when we have time.',
  strong:'“The baker co-founder fills in the stall tally every Saturday; the co-founder who works with the trainees keeps their checklists and types both up monthly; together we review a one-page summary each quarter; the MEAL budget is US$300 for year 1 (printing, a kitchen scale for weighing waste, phone calls for follow-up), plus about two days of our own time a quarter.”',
  why:'Each task has a person, a rhythm and a cost, so MEAL does not depend on goodwill or spare time that will never come.',
  reflect:'Who in your founding team will have the time to analyse data, not just collect it?',
  exercise:'Write the roles, calendar and budget for your MEAL system in your first year.',
  fields:{
   roles:{label:'Roles and responsibilities',hint:'Task (e.g. Saturday tally sheet) | who (you, your co-founder or a mentor) | time needed.'},
   calendar:{label:'MEAL calendar',hint:'Activity (e.g. quarterly review) | frequency | dates, starting from your first pilot or launch.'},
   budget:{label:'MEAL budget',hint:'Item (e.g. printing, a kitchen scale for waste) | estimated cost (including your own time) | funding source.'}
  },
  check:'Are MEAL roles and costs visible in your plans and first budget?'
 },
 monitoring:{
  learn:[
   'Monitoring compares what you planned with what is actually happening. For each indicator and period, record the planned value, the actual value and the gap. Once you have more than one period, look at the trend over several, not just one number; in a first pilot, even two or three points tell you a lot.',
   'When there is a gap, ask why before you react. Is the data right? Did an assumption fail? Did the context change? Was the target unrealistic for something new? Write the explanation first, then decide the response.',
   'Keep the presentation simple: a few indicators, a traffic-light status (green on track, amber at risk, red off track) and a line of comment for each. Share it with the people who can act on it, including co-founders, volunteers and early partners and, where it makes sense, the people you serve.'
  ],
  weak:'We will look at the numbers at the end of the first year.',
  strong:'“Each month we look at four indicators with planned and actual values and a traffic light; when trainee attendance turned red in the second month, we found the 5 a.m. Saturday start did not fit the first buses, so trainees now start at 6 a.m. and the baker co-founder does the first bake alone.”',
  why:'Monitoring is regular, visual and leads straight to an explanation and an action.',
  reflect:'If an indicator turned red tomorrow, who would notice and what would they do?',
  exercise:'Design your monitoring dashboard and the routine you will use to review it from your first activity.',
  fields:{
   dashboard:{label:'Monitoring dashboard',hint:'Indicator (e.g. loaves sold a week) | target (e.g. 300) | planned this period | actual | status (green, amber, red) | comment.'},
   routine:{label:'Monitoring routine',hint:'Who prepares, who reviews (you, co-founders, advisers), how often and what happens to red items.'}
  },
  check:'Does every gap between planned and actual lead to an explanation and, if needed, an action?'
 },
 evaluation:{
  learn:[
   'Evaluation asks deeper questions than monitoring: did the work achieve its outcomes, for whom, why, at what cost and with what unintended effects? Common criteria are relevance, coherence, effectiveness, efficiency, impact and sustainability. You do not need all six; pick the ones behind your real questions. For something new, relevance and effectiveness usually matter most: is this needed, and does it work?',
   'Choose the type for your purpose. Formative evaluation improves the work during delivery and suits a pilot; summative judges results at the end; process evaluation looks at how delivery works; impact evaluation estimates the difference made compared with what would otherwise have happened. Rigorous impact evaluation is expensive and usually comes much later, so most new initiatives build a credible contribution story first.',
   'Decide whether to evaluate it yourselves or, later, commission someone external. An end-of-pilot review you run yourselves can be enough at the start; external evaluation brings independence but needs terms of reference, a budget and management time. Before you start, plan how you will share the findings and respond to each recommendation.'
  ],
  weak:'We will do an impact evaluation once we are big enough.',
  strong:'“At the end of our six-month pilot we will ask whether the four trainees finished and gained the skills we promised, who did not and why, what each traineeship cost and how close the stall came to covering its costs; we will write a response to each finding before deciding whether to take on four more trainees and start planning our own shop.”',
  why:'It asks a few questions that matter, is timed for a real decision and commits to responding.',
  reflect:'What is the one question about your idea you most need an honest answer to?',
  exercise:'Draft your evaluation plan for your pilot or first year.',
  fields:{
   questions:{label:'Evaluation questions',hint:'The three to five questions you most need answered about your idea.'},
   approach:{label:'Type, timing and who',hint:'Formative or summative, done yourselves or external, timing (for example end of pilot) and budget.'},
   use:{label:'Using the findings',hint:'How findings will be shared, discussed and acted on, and which decision they feed.'}
  },
  check:'Will your evaluation answer questions that lead to decisions?',
  anatomy:{
   title:'Monitoring and evaluation compared',
   intro:'They use some of the same data but answer different questions. A new initiative needs both, in a light form.',
   cols:['','Monitoring','Evaluation'],
   rows:[
    ['Main question','Are we doing what we planned, and what is changing?','Did it make a difference, for whom, why and at what cost?'],
    ['When','Continuously: every Saturday, monthly, quarterly','At set points: end of the pilot, end of year 1 or later'],
    ['Who','You and your founding team, as part of the work','Yourselves at first; an external evaluator later, for independence'],
    ['Typical evidence','Stall tally sheets, trainee checklists, a simple dashboard','Monitoring data plus interviews with trainees and the youth centre, cost per trainee'],
    ['Leads to','Quick fixes: bake less on rainy days, move a shift','Bigger decisions: take on more trainees, change the training, open a shop or stop']
   ]
  }
 },
 accountability:{
  learn:[
   'Accountability to the people you serve means sharing information they can understand, involving them in decisions that affect them, listening to their feedback and handling complaints fairly. It respects people’s dignity, and it improves the work, because they notice problems first. Building it in from the start is far easier than adding it once habits are set.',
   'Offer several feedback channels suited to different people: conversations, suggestion boxes, phone lines, messaging, short surveys and community meetings. Think about language, literacy, age and who might feel unable to speak. Include at least one route outside the founding team for sensitive concerns, including safeguarding; with no staff or board yet, this can be a trusted adviser or community member.',
   'Record feedback and complaints, respond within agreed times and close the loop: tell people what changed because of their feedback, or why it could not. Look at the feedback log regularly for patterns. Serious concerns, such as abuse or fraud, follow the procedures in Module 10, which you should have in place before your first activity.'
  ],
  weak:'People can always talk to us.',
  strong:'“Trainees can raise anything in a one-to-one chat with their mentor every two weeks, on an anonymous card halfway through and at the end, or with a named contact at the youth centre, outside the founding team, about any concern with us; we reply within ten working days and share a ‘you said, we did’ note with each group of trainees.”',
  why:'The channels suit young trainees, one bypasses the founders entirely (which matters because some trainees are 17), and the loop is visibly closed.',
  reflect:'What would stop a participant from complaining to you, the founder?',
  exercise:'Design the feedback and complaints mechanism you will have in place before your first activity.',
  fields:{
   channels:{label:'Feedback channels',hint:'Channel (e.g. one-to-one with a mentor) | who it suits (e.g. trainees) | who receives it (including someone outside the founding team) | response time.'},
   loop:{label:'Closing the loop',hint:'How you will record, analyse, respond and report back.'}
  },
  check:'Could someone raise a sensitive concern without going through the founders?',
  anatomy:{
   title:'Choosing feedback channels',
   intro:'No single channel suits everyone; combine a few that cover different needs, starting with those you can answer reliably.',
   cols:['Channel','Who it suits','Watch out for'],
   rows:[
    ['Face-to-face conversation','People who prefer talking; low literacy','People may not criticise a founder they like or depend on'],
    ['Anonymous card or box','Shy or worried trainees; customers at the stall','You cannot reply to one person, so report back to all'],
    ['Phone or messaging line','Trainees’ families, cafés and the office canteen','Needs a named person who answers on time, even on a busy Saturday'],
    ['Group meeting or forum','Shared issues; collective decisions','Louder voices dominate; some will not speak in public'],
    ['Named person outside the founding team','Sensitive concerns, including safeguarding','Must be known, trusted and briefed; a youth-centre contact or a planned adviser can do this before you have a board']
   ]
  }
 },
 learning:{
  learn:[
   'Learning is the step that turns evidence into better decisions, and for a new initiative it is how you find out what works before you grow. It needs time set aside: regular reviews where you and your co-founders look at monitoring data, feedback and evaluation findings and ask “so what?” and “now what?”',
   'Use simple formats: an after-action review (what was planned, what happened, why, what we will do differently), a quarterly learning session, a lessons log. Record each decision with an owner and a date, and check at the next review whether it was carried out.',
   'Adaptive management means changing activities, targets or even your Theory of Change in response to evidence, openly and with the agreement of those who need to agree, including co-founders, members and funders where required. Early on, changing course is expected. Treat disappointing findings as useful information, not failures to hide.'
  ],
  weak:'We will think about lessons learned once the first year is over.',
  strong:'“At the review after our second month we saw that a fifth of our bread was left over on rainy Saturdays; the baker co-founder agreed to bake 20% less when rain is forecast, starting the next week, and to offer what is left to the office canteen at half price; we will check weekly waste at the next review.”',
  why:'A finding leads to a recorded decision with an owner and a date, checked at the next review.',
  reflect:'What is the last decision about your idea you changed because of evidence?',
  exercise:'Plan your learning routine and record a first review, even if it is from a test or conversations so far.',
  fields:{
   routine:{label:'Learning routine',hint:'Format, frequency, who takes part (founders, volunteers, participants, advisers) and how decisions are recorded.'},
   review:{label:'First review record',hint:'Finding (e.g. a fifth of bread left over on rainy Saturdays) | feedback | learning | decision (e.g. bake less when rain is forecast) | owner | due.'}
  },
  check:'Does each review end with recorded decisions that someone owns?'
 },
 reporting:{
  learn:[
   'Different audiences need different reports. Co-founders, advisers and, later, your board need a short dashboard and the main risks; funders need agreed formats and deadlines; customers and members need to see what their support or purchases achieve; participants and communities need accessible feedback in their own language; the public needs honest, simple stories backed by evidence.',
   'Report honestly from the very first report. Keep outputs separate from outcomes, contribution separate from attribution, and evidence separate from hopes. Include what did not work and what you changed. A new initiative builds credibility when what it claims matches what its data shows.',
   'Put reporting in your MEAL calendar and reuse the same data rather than recreating it for each audience. Module 8 shows how to turn evidence into communications, and the reporting plan you write here will grow into the reports that funders, members or customers ask for later.'
  ],
  weak:'Our bakery is changing young people’s lives.',
  strong:'“In our six-month pilot, 3 of our 4 trainees finished and gained their basic food-hygiene certificate, and 2 of them found a job within three months. The numbers are very small, so we are following up with all three again at six months and will report again after the next four trainees.”',
  why:'It gives real numbers, says how small the group is and is honest about the limits of early evidence.',
  reflect:'Which claim you currently make about your idea could you not support with evidence?',
  exercise:'Build your reporting plan by audience for your first year.',
  fields:{
   plan:{label:'Reporting plan',hint:'Audience (e.g. the youth fund, the youth centre, trainees, wholesale customers) | what they need | format | frequency | owner.'},
   claims:{label:'Evidence behind our main claims',hint:'Claim (e.g. our trainees find jobs) | evidence you have or will collect | limits.'}
  },
  check:'Could you show the evidence behind every claim you make?'
 },
 'meal-framework':{title:'Your MEAL Framework'}
});
