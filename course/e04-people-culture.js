import base from './m04-people-culture.js?v=c831b856d';
import {adapt} from './adapt.js?v=c831b856d';
// Entrepreneurs' version of m04: same lessons, fields, workbook and tools; wording for people building something new.
export default adapt(base,{
 title:'People, Culture & Volunteers',
 short:'Planning the people you will need, recruiting, contracts, onboarding, development, pay, culture, volunteers and leaving well, set up from the start',
 intro:'Structure says who does what; this module helps you find, support and keep the people who will do it. Plan the mix of co-founders, first hires, contractors and volunteers, recruit fairly from your very first role, start people well, help them grow, look after wellbeing from day one and make sure that what people know does not leave with them.',
 output:'People Plan',
 promo:{
  headline:'Build good people practice in from the start',
  pitch:'Onboarding & Staff Compliance builds a role-based induction plan for each person who joins you and tracks policy acknowledgements and training. People Check-Ins & Development keeps a running record of one-to-ones, commitments and development goals linked to your objectives, even when your team is just you and a co-founder.'
 }
},{
 workforce:{
  learn:[
   'Workforce planning matches the people you will need to the work your strategy requires, over time. Start from the functions and roles you set out in Module 3 and ask, for each one: how much time does it need, what skills, and from when? At the start, many roles will sit with you or your co-founders. Write that down too, so you can see what you are carrying.',
   'Purpose-led initiatives combine different contributors: co-founders, employees, part-time staff, contractors, paid trainees or interns, volunteers, secondees and, later, board members. Each brings different costs, commitment, management needs and legal implications. Volunteers are not free: they need recruiting, training, supervision and expenses.',
   'Take care with the line between employees and contractors, and between volunteers and unpaid workers. The rules differ by country, so check the rules where you are before your first person starts. Do not build your model on unpaid people doing core, ongoing work without weighing fairness and legal risk.',
   'Plan for growth and for gaps. Which roles must be filled first, and what income or milestone will pay for them? Which could be shared with partners? Who would cover if you or a co-founder were suddenly unable to work?'
  ],
  weak:'We will hire when sales pick up.',
  strong:'Year 1: the baker co-founder leads baking and the stall; the youth-work co-founder leads the training programme and wholesale customers.\nTrainees: four paid trainees on six-month traineeships, each with a mentor.\nContractor: a bookkeeper, four hours a month.\nYear 2: when the shop opens, a part-time shop assistant (0.5), paid for by shop sales, rather than leaving trainees to run the counter.\nCover: each co-founder writes down how the other could cover for a month; the youth centre could support the trainees if the youth-work co-founder were away.',
  why:'It states the type, time and timing of each role, links the next hire to the shop’s income and deals with a single point of failure from the start.',
  reflect:'Which role, if no one could do it for three months, would stop your work before it has properly started?',
  exercise:'Draft a workforce plan for your first one to two years.',
  fields:{
   plan:{label:'Workforce plan',hint:'Role (trainee baker, bookkeeper) | type (co-founder, employee, paid trainee, contractor, volunteer) | time (four days a week) | when needed (from month 4) | cost or support needed (trainee pay, a mentor).'},
   continuity:{label:'Continuity risks',hint:'Single points of failure (often you or a co-founder) and how you would cover them.'}
  },
  check:'Does your plan include the support costs of volunteers and contractors, and the time you and your co-founders give, not only future salaries?',
  anatomy:{
   title:'Who will do the work',
   intro:'Each type of contributor brings something different and needs something different from you. Decide early which ones you need, and when.',
   cols:['Contributor','What they bring','What they need from you'],
   rows:[
    ['Employee','Steady time and commitment to core, ongoing work','A contract, pay, management and development'],
    ['Contractor or freelancer','Specialist skills for a defined task, often the first paid help','A services agreement with deliverables and fees'],
    ['Paid trainee or intern (like the bakery’s trainees)','Energy and fresh skills while they learn a trade','A learning plan, pay, a mentor, supervision and clear terms'],
    ['Volunteer','Time, local knowledge and trust','A role description, training, supervision and expenses'],
    ['Board member (as you form one)','Oversight, judgement and networks','An induction, good papers and a clear role']
   ]
  }
 },
 recruitment:{
  learn:[
   'Recruitment starts with the role description from Module 3. Turn it into an advert that explains the purpose, main tasks, essential and desirable criteria, pay and conditions, and how to apply. Use plain language and drop requirements that exclude people without good reason, such as degrees the work does not need. Your first role sets the standard for every one after it.',
   'Advertise where the people you want actually look, including community networks and channels that reach under-represented groups. It is tempting to ask friends and contacts first; widen the search so you do not build a team that only looks like you. Be open about pay, and offer reasonable adjustments to applicants who need them.',
   'Assess fairly, even when you are a team of one or two. Agree the criteria and a simple scoring guide before you read applications, ask every candidate the same questions, involve at least two people (a co-founder, an adviser or a trusted peer) and note the reasons for each decision. A short practical task often shows more than an interview alone.',
   'If the role will involve children or vulnerable adults, add safer recruitment steps from the very first person: identity checks, references, background checks where they are available and lawful, and safeguarding questions at interview. Make offers in writing and keep records in line with the data protection rules you set up.'
  ],
  weak:'We will take on the young people we get on with best.',
  strong:'“Four trainee places: a plain-language advert (no qualifications needed, pay stated) shared through the youth centre and posted at the stall; each applicant spends a paid trial morning in the kitchen, scored against four criteria by both co-founders and the youth-centre manager; reasons noted for every decision. Any adult who will supervise trainees gives two references and has a background check before the first shift, because some trainees are 17.”',
  why:'It is consistent and documented: every young person is judged on the same task by more than one person, and the adults around them are checked in proportion to the risk.',
  reflect:'Who might be well suited to your first roles but would never see your adverts?',
  exercise:'Design the recruitment process for your first (or next) role.',
  fields:{
   role:{label:'Role and criteria',hint:'Role title, essential criteria, desirable criteria, pay range or expenses offered, e.g. trainee baker: reliable, keen to learn, able to start at 6am; hourly pay stated.'},
   process:{label:'Selection process',hint:'Where you will advertise, stages, who sits on the panel (co-founder, adviser), scoring, practical task and checks, e.g. a paid trial morning in the kitchen.'},
   safer:{label:'Safer recruitment steps',hint:'Which checks will apply to this role, and who will complete them?'}
  },
  check:'Would every candidate be assessed against the same criteria by more than one person, even though your team is small?'
 },
 contracts:{
  learn:[
   'Every working relationship needs written terms that suit its type, including the one between co-founders. Employees need an employment contract or written statement. Contractors need a services agreement. Interns and volunteers need an agreement that sets out the role, support and expectations without accidentally creating an employment relationship. Co-founders benefit from a short written agreement on roles, time, decisions and what happens if one leaves.',
   'Typical contents are the parties, role, start date, place and hours, pay or expenses, leave, probation, confidentiality, data protection, ownership of work, conduct and policies, notice and ending. Ownership of work matters early: make sure what you and others create belongs to the organisation once it exists. Volunteer agreements are simpler and avoid the language of obligation and pay.',
   'Employment law is national and sometimes regional, so check the rules where you are before anyone starts. Use templates only as a starting point and ask someone with a legal background to check them. Keep signed copies securely, track probation and renewal dates, and update terms when a role changes. Module 10 covers your wider legal framework.'
  ],
  weak:'We will agree everything verbally.',
  strong:'Founders: before the pilot, a one-page agreement on roles, hours, decisions, who owns the recipes and what happens if one steps back.\nTrainees: a six-month paid traineeship agreement covering hours, pay, the food-hygiene certificate and the mentor’s role, checked by someone with a legal background.\nBookkeeper: a services agreement with tasks and fees.\nDates: every traineeship end and review date sits in one shared calendar, owned by the youth-work co-founder.',
  why:'Each relationship has written terms that suit its type, including who owns the recipes, checked locally before it starts, and the key dates are tracked by a named person.',
  reflect:'Which working relationship you already have, perhaps with a co-founder, has the least clear terms?',
  exercise:'List each type of working relationship you have or will have soon, and the terms it needs.',
  fields:{
   types:{label:'Relationships and terms',hint:'Type (co-founder, paid trainee, contractor) | agreement to use (traineeship agreement) | key clauses (hours, pay, hygiene training, end date) | checked by an adviser?'},
   dates:{label:'Dates to track',hint:'Probation, renewals, contract end dates and who will track them.'}
  },
  check:'Will every working relationship, including between co-founders, have written terms suited to its type before it starts?',
  anatomy:{
   title:'Matching terms to the relationship',
   intro:'Different relationships need different documents. Getting the type wrong from the start is a common risk.',
   cols:['Relationship','Usual document','Watch for'],
   rows:[
    ['Co-founder','Founders’ agreement','Roles, time, decisions, ownership of work (such as recipes), what happens if one leaves'],
    ['Employee','Employment contract or written statement','Local minimum terms, probation, notice; check with a local adviser'],
    ['Contractor or freelancer','Services agreement','Real independence; deliverables, fees, ownership of work'],
    ['Paid trainee or intern','Traineeship or learning agreement','Learning plan, pay, hours and rules for under-18s; check locally'],
    ['Volunteer','Volunteer agreement or role description','No obligation or pay language; expenses only'],
    ['Adviser (on an advisory group)','A short letter of appointment','Role, time, confidentiality, conflicts of interest; no pay, or expenses only']
   ]
  }
 },
 onboarding:{
  learn:[
   'Onboarding helps a new person understand the mission, their role, the safeguards and the practical ways of working. Giving someone access to a folder is only one small part of it. Your first people will shape what “joining” means for everyone who follows.',
   'Plan the first day, the first week and the first month. Include a buddy (at the start, often you or a co-founder), essential training, policy sign-offs, access checks and an early, useful task. Check understanding rather than only recording that a document was sent.',
   'Build one standard template now, before your first person joins (welcome, equipment, accounts, core policies, safeguarding, data protection, values), and add steps for each role as roles appear. Track completion, and ask each newcomer what was missing so the template improves as you grow.',
   'Culture is set from the first day by everyday behaviour: how concerns are heard, how mistakes are discussed and how workloads are agreed. Link these habits to your values while the team is small enough for everyone to see them.'
  ],
  weak:'Read all our documents.',
  strong:'“In week one, a new trainee works every shift alongside the baker co-founder, learns the kitchen’s hygiene and allergen rules and practises what to do after a burn or a spill, before working at the ovens or the stall without someone beside them. The youth-work co-founder checks in with the trainee at the end of each day.”',
  why:'It tests what matters most in a kitchen, safety and hygiene, with support, before the trainee works alone.',
  reflect:'What would the first person who joins you be afraid to ask?',
  exercise:'Create a proportionate 30-day onboarding plan for the first person who will join you.',
  fields:{
   onboarding:{label:'Onboarding plan',hint:'When (day 1, week 1, month 1) | action (hygiene and allergen briefing) | supporting role (often a co-founder) | evidence of readiness (runs the morning bake without prompts).'},
   culture:{label:'Working agreements',hint:'How people will raise concerns, get support and discuss mistakes, from the first day.'}
  },
  check:'Will a new person know where to get help before working alone, even if the team is only two or three people?'
 },
 checkins:{
  learn:[
   'Short, regular check-ins do more for performance than an annual appraisal on its own. Start them now, between co-founders, and keep them as the first people join. Cover wins, blockers, priorities, feedback in both directions and next steps, and note what each of you agreed to do.',
   'Link each person’s objectives to your objectives and first annual plan, so they can see how their work contributes. Keep personal objectives few and clear, and separate from organisational KPIs and programme indicators.',
   'Development is part of performance, including your own as a founder. Agree one or two development goals per person: a skill, an experience or a course. In a new and small initiative, stretch tasks, peer learning, mentoring and a day in a partner’s kitchen or shop are often more realistic than formal training.',
   'Keep wellbeing conversations apart from performance judgements and pay decisions. If performance is a concern, raise it early, privately and fairly, with clear expectations, support and a timescale, following a written procedure you agree before you need it.'
  ],
  weak:'An annual review, once we have staff.',
  strong:'Founders: a 30-minute check-in every fortnight after the Saturday market, with notes in a shared document.\nObjectives: reviewed each quarter against the first-year plan (for the baker co-founder, 300 loaves a week at the stall and food waste measured weekly), plus one development goal each.\nReview: the accountant on the advisory group holds a review with each founder twice a year.\nTrainees: a weekly check-in with their mentor and reviews at three and six months, the rhythm our first hire will also follow.',
  why:'It is regular, linked to the plan’s real numbers, includes development and makes clear who reviews the founders.',
  reflect:'When did you, or each person working with you, last receive useful feedback?',
  exercise:'Design your check-in rhythm and draft objectives and a development goal for one role (it can be your own).',
  fields:{
   rhythm:{label:'Check-in and review rhythm',hint:'Frequency, format, what is covered and how it is recorded, starting with the founding team.'},
   objectives:{label:'Example objectives and development goal',hint:'For one role (yours, a co-founder’s or a first hire’s): two or three objectives linked to your objectives, and one development goal, e.g. a trainee bakes the morning loaves unaided by month three (ESO2) and passes the food-hygiene certificate.'},
   concerns:{label:'Handling performance concerns',hint:'Steps, support and who will decide, including between co-founders.'}
  },
  check:'Are individual objectives linked to your priorities and kept separate from wellbeing conversations?',
  anatomy:{
   title:'Three conversations, kept apart from the start',
   intro:'Mixing these conversations makes people less open in all of them. Set the habit while the team is small.',
   cols:['Conversation','Purpose','How often'],
   rows:[
    ['Check-in','Priorities, blockers, feedback both ways, next steps','Weekly to monthly, short; between co-founders from day one'],
    ['Objectives and development review','Progress on objectives; one or two development goals','Quarterly or twice a year; a mentor or adviser can review founders'],
    ['Wellbeing conversation','Workload, stress, support; no judgement on performance','Whenever needed; offered regularly']
   ]
  }
 },
 pay:{
  learn:[
   'Pay is one of the clearest signs of your values, and it is far easier to set principles before the first salary than to fix unfair gaps later. Decide your principles: how you will set salaries (market comparisons, a living-wage commitment, fairness inside the team), the gap you will allow between highest and lowest pay, how increases will be decided and how founders are paid. Write them down and apply them to everyone.',
   'A simple pay framework groups roles into bands, each with a range, and explains how people move within and between bands. Even with one or two roles, sketch the bands now. This stops one-off negotiations from creating unfair gaps, including gender pay gaps, as you grow.',
   'In a small, new initiative, career progress rarely means a promotion every year. Describe other routes: more responsibility, specialising, leading a project, representing the organisation, or a planned move to a partner.',
   'Recognition costs little and matters a lot, especially when you cannot yet pay much: specific thanks, celebrating milestones, sharing credit in public and acting on suggestions. Benefits such as flexible hours, learning time and wellbeing support can be valued as much as salary. Be honest about what you can offer now and what you aim to offer later.'
  ],
  weak:'We will pay whatever we can afford for each person.',
  strong:'Trainees: paid by the hour from the first day, at least the local minimum for their age, compared with local bakeries each year.\nBands: two for now (trainee, baker) and a third for the year-2 shop assistant.\nFounders: no pay during the pilot, then an equal salary for both once sales cover core costs.\nIncreases: decided each January against the budget, the same percentage for everyone; the highest pay no more than three times the lowest.',
  why:'It is open, values-based and applied the same way to trainees, future staff and the founders, before the first wage is paid.',
  reflect:'Could you explain to every future team member, and to yourself, why they are paid what they are paid?',
  exercise:'Write your pay principles and a simple band structure, before you set the first salary.',
  fields:{
   principles:{label:'Pay principles',hint:'How you will set and review pay, how founders are paid, and the commitments you make.'},
   bands:{label:'Bands and progression',hint:'Band (1, 2, 3) | roles, now and planned (trainee now; shop assistant planned) | range (per hour) | how people progress (trainee to junior baker after six months).'},
   recognition:{label:'Recognition and benefits',hint:'Non-salary ways you will value people, including while pay is low, e.g. bread to take home, a reference for every trainee who finishes, shifts that fit around college.'}
  },
  check:'Would two people doing similar work be paid within the same range for the same reasons, once you start paying people?'
 },
 culture:{
  learn:[
   'Culture is what people actually do when no one is checking: how decisions are made, how mistakes are handled, how people disagree and whose voice counts. It forms in the first months, mostly from what founders do. It will either support the values you set in Module 1 or quietly contradict them.',
   'Purpose-led work brings particular risks to wellbeing, and founders are often the first to burn out: emotional strain, long hours justified by the mission, contact with distressing situations and uncertain income. Set reasonable limits on workload, model them yourself, offer supervision or debriefing where work is distressing and know where to refer people for support.',
   'Inclusion means people can take part fully and safely. Look at accessibility, language, meeting times, caring duties and who gets heard and given responsibility. People also need to feel they can speak up without being punished; that is the basis for learning and for safeguarding, and it is easiest to build before habits set.',
   'Ask people regularly how things are, through check-ins and, as you grow, a short anonymous survey, and act on what you hear.'
  ],
  weak:'We will be like a family.',
  strong:'“Shifts planned a week ahead, with no messages expected after 7pm because the bakery starts early; swaps allowed for caring duties or college; at every team meeting the newest trainee speaks first; any mistake in the kitchen is talked through the same day without blame, and what we changed is written on the kitchen board.”',
  why:'It turns care into specific practices that anyone in the kitchen can see and check.',
  reflect:'What behaviour are you, as a founder, already rewarding that could contradict your stated values?',
  exercise:'Describe three culture practices you will start now and how you will check whether they work.',
  fields:{
   practices:{label:'Culture practices',hint:'Practice (the newest trainee speaks first) | value it reflects (respect) | how we will check it works (trainees say in their review that they feel heard).'},
   wellbeing:{label:'Wellbeing and inclusion measures',hint:'Workload limits (including for founders), support, accessibility and inclusion actions.'}
  },
  check:'Could the first person who joins you observe your culture practices within their first month?'
 },
 volunteers:{
  learn:[
   'Volunteers bring time, skills, local knowledge and trust, and many new initiatives start with them. Treat volunteering as a two-way relationship: be clear about what you offer volunteers (experience, training, belonging, a reference) as well as what you ask of them.',
   'Design each volunteer role with a description, time commitment, support and boundaries before you invite anyone. Recruit, check people in proportion to the risk, induct and supervise them. Repay reasonable expenses so that volunteering is not limited to people who can afford it.',
   'Volunteers are different from community members who contribute through taking part, advisory groups or feedback, and from members of a cooperative. All deserve recognition and a say, and none should quietly fill roles that should be paid as you grow.',
   'Keep records of who volunteers, in which role, with which checks and training, in line with the data protection rules you set up. Ask volunteers for feedback and thank them in ways they value.'
  ],
  weak:'Anyone who wants to help can turn up.',
  strong:'“Market-day helper: one Saturday morning a month, setting up the stall and serving alongside a co-founder; never alone with a trainee under 18; ID and two references; a short hygiene and safeguarding briefing before the first shift; never covering work a paid trainee should do; breakfast and a loaf to take home.”',
  why:'It makes the role clear, safe and fair to the volunteer, and stops it from quietly replacing a paid traineeship.',
  reflect:'Why would someone volunteer with something new like yours rather than with an established organisation?',
  exercise:'Design one volunteer role you will need in your first year, and its support.',
  fields:{
   role:{label:'Volunteer role',hint:'Purpose, tasks, time commitment and boundaries, e.g. a market-day helper at the Saturday stall.'},
   journey:{label:'Volunteer journey',hint:'Recruitment, screening, induction, supervision, expenses, recognition and leaving.'}
  },
  check:'Will the role offer volunteers clear support and value, not only tasks?',
  anatomy:{
   title:'Who contributes, and how',
   intro:'Not everyone who gives time is a volunteer. Each needs a different kind of support, so decide early which ones you are inviting.',
   cols:['Contributor','Example','What they need'],
   rows:[
    ['Volunteer','A market-day helper at the Saturday stall','A role, checks, induction, supervision, expenses'],
    ['Community adviser','Young people from the youth centre who help shape the traineeship before it starts','A real say, feedback on what changed, thanks'],
    ['Customer giving feedback','Market shoppers answering three questions about taste and price','A short ask, consent, results shared back'],
    ['Member or shareholder','A co-founder holding shares in the company you are forming','Rights set by the articles, not a volunteer role']
   ]
  }
 },
 offboarding:{
  learn:[
   'People will leave: co-founders, early staff, volunteers, advisers and, one day, you. A planned exit protects both the organisation and the person. It covers handing over work and knowledge, returning equipment, removing system access, final pay or expenses and an exit conversation. Decide how this will work before anyone leaves.',
   'Knowledge often leaves with people, and in a new initiative most of it sits in the founders’ heads. Ask each key role, starting with your own, to keep a short, current handover note: priorities, key contacts, where documents are, recurring deadlines, and how passwords are held in a secure password manager. The same note helps during holidays and sickness.',
   'Plan succession for critical roles, including yours as founder. Who could step in, for a while or for good? What would they need? Planning succession early is a sign of maturity, not mistrust, and future funders, partners and board members will look for it.',
   'Use exit conversations to learn. Ask what worked, what did not and what would have made the person stay, and look for patterns over time.'
  ],
  weak:'If someone leaves, we will figure it out.',
  strong:'Checklist: kitchen keys and the shared-kitchen access card returned, bank and order-app access removed on the last day.\nHandover: each co-founder updates a one-page note every quarter (recipes, suppliers, the cafés’ and canteen’s standing orders, the kitchen booking).\nSuccession: the youth-centre manager on our advisory group could look after the trainees for up to three months.\nExit: conversations with trainees held by someone other than their mentor.',
  why:'It protects access, the recipes and customer knowledge, keeps the trainees supported if a founder steps away, and turns each exit into learning.',
  reflect:'If you or your co-founder could not work next month, what would be lost?',
  exercise:'Draft an offboarding checklist and a succession note for one critical role (it can be your own).',
  fields:{
   checklist:{label:'Offboarding checklist',hint:'Step (kitchen keys returned) | owner (the baker co-founder) | timing (last day).'},
   succession:{label:'Succession for a critical role',hint:'Role (often a founder’s, such as the baker co-founder) | who could cover (a baker from the shared kitchen) | what they would need (recipes, supplier list) | where knowledge is kept (handover note in the shared drive).'}
  },
  check:'Would access be removed and knowledge retained if someone, including a founder, left?'
 },
 'people-plan':{title:'Your People Plan'}
});
