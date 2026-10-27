import base from './m10-legal-compliance-risk.js';
import {adapt} from './adapt.js';
// Entrepreneurs' version of m10: same lessons, fields, workbook and tools; wording for people building something new.
export default adapt(base,{
 title:`Legal, Compliance, Policies & Risk`,
 short:`Your legal map, the policies you will actually need, procedures, policy lifecycle and risk management from the start`,
 intro:`Build your legal and compliance framework before you launch. Map the legal duties that will apply to you, work out which policies and controls you will actually need given the form you choose, your activities, geography, size, funding and risk profile, write procedures people can follow, keep policies alive as you grow, and manage risk with clear owners and escalation from the start. This module supports planning; legal duties depend on your jurisdiction, so check the rules where you are and obtain qualified local advice.`,
 output:`Compliance & Risk Pack`,
 promo:{
  headline:`Keep policies current and risks owned from day one, without chasing spreadsheets`,
  pitch:`Issue & Risk Management keeps every risk with its likelihood, impact, owner, mitigation and review date, and links it to the objective, KPI or task it threatens. Policy Management tracks owners, approvals, review dates and who must acknowledge each policy, and feeds Onboarding & Staff Compliance as your first people join.`
 }
},{
 'legal-map':{
  learn:[
   `Your legal duties will come from four places: the legal form you choose (association, foundation, charity, company or cooperative), the activities you plan (working with children, employing people, handling personal data, selling food or goods, raising money), the countries and regions where you will work, and your first funders, customers or partners, whose grant or contract conditions can be legally binding.`,
   `A legal map lists each area with its main obligation, the authority that oversees it, the deadline or frequency and the person responsible. Common areas are registration and governance, tax, employment, data protection, health and safety, safeguarding, fundraising and consumer rules, contracts and insurance. Some duties start before you register or open; others start the day you first hire, sell or receive money.`,
   `You do not need a legal background yourself, but you do need to know which questions to ask, and to ask them before you launch rather than after. Rules differ by country and change over time, so mark which items someone with a legal background has confirmed and which are still open. If you plan to work in more than one country, map each one.`
  ],
  weak:`We will sort out the legal side once we are up and running.`,
  strong:`“Before launch: choose and register a legal form; register for tax before the first sale; parental consent and checks on adults before any activity with young people; data protection for the sign-up list; public liability insurance before the first event. An accountant has confirmed the tax steps; the right legal form is still an open question.”`,
  why:`It names each duty before it applies, who oversees it and who owns it, and is honest about what still needs advice.`,
  reflect:`Which obligation would you be least prepared to show you are meeting on the day you launch?`,
  exercise:`Build your legal and regulatory map for what you are about to start.`,
  fields:{
   map:{label:`Legal map`,hint:`Area | obligation | authority | when it starts and how often | owner (you or a co-founder) | confirmed by an adviser?`},
   open:{label:`Open legal questions`,hint:`Questions to resolve with qualified advice before you register or launch, and by when.`}
  },
  check:`Does every obligation have an owner and a date, including those that start before you launch?`
 },
 'policy-needs':{
  learn:[
   `Not every organisation needs the same policies, and a new one needs fewer than you might think. A policy states a principle or rule; a procedure explains how people apply it. A thick folder of copied policies does not protect anyone, and policies nobody follows create risks of their own.`,
   `Work out your needs from six factors: the legal form you are choosing and what its regulator expects; your planned activities, especially work with children or adults at risk, personal data, money, travel and food or products; your geography; your size now and in the next year; what funders, customers and partners will require by contract; and the main risks you have identified.`,
   `Sort the result into three groups: required before you start (a legal duty or a high risk), required soon (triggered by registration, the first hire, growth or a new activity) and good practice. Give each policy an owner, an approval route and a review date, and note where you need qualified local advice.`
  ],
  weak:`Download every policy template we can find before we start.`,
  strong:`“Young people aged 12 to 17 will take part from the first day, so safeguarding, a code of conduct for adults, parental consent and photo rules, and activity safety come first. A finance policy follows registration. An HR policy waits for the first paid role.”`,
  why:`The priority follows the activity and the harm it could cause, not the length of a template or the size you hope to reach.`,
  reflect:`Which gap could cause the greatest harm on your first day of activity?`,
  exercise:`Run a policy needs assessment and build a prioritised policy register for your launch and first year.`,
  fields:{
   factors:{label:`Needs assessment`,hint:`Factor (form, planned activities, geography, size, funding and customers, risk) | what it requires.`},
   policies:{label:`Policy register`,hint:`Policy | reason needed | priority (before launch, soon, good practice) | owner | approval | review date | advice needed.`}
  },
  check:`Does your priority order follow legal duty and risk, not document length or what larger organisations have?`,
  anatomy:{
   title:`Policy needs by activity`,
   intro:`Start from what you plan to do. Each activity points to the policies it usually needs, and to when they must be ready.`,
   cols:[`If you will…`,`You usually need`,`Have it ready`],
   rows:[
    [`Work with children or adults at risk`,`Safeguarding, code of conduct, safer recruitment, consent and photos`,`Before the first activity, even a pilot`],
    [`Hold personal data`,`Data protection, privacy notice, retention, breach procedure`,`Before you collect the first sign-up or contact list`],
    [`Handle money or grants`,`Finance controls, anti-fraud, conflicts of interest`,`When you open a bank account or take the first payment`],
    [`Employ staff or engage volunteers`,`Contracts, HR policies, volunteer agreement, health and safety`,`Before the first person starts`],
    [`Sell food or goods`,`Food or product safety, complaints, honest claims`,`Before the first sale`]
   ]
  }
 },
 contracts:{
  learn:[
   `Contracts create legal obligations, and you will sign some before you are fully set up. New initiatives commonly sign grant agreements, service and supplier contracts, partnership agreements and memoranda of understanding, co-founder agreements, employment and volunteer agreements, leases and data-sharing agreements.`,
   `Before signing, check who the parties are and who may sign for you (before you register, an agreement may bind you personally); what each side must do and by when; payment and reporting terms; ownership of materials, data and confidentiality; liability, insurance and indemnities; how the contract ends; and which country’s law applies. A memorandum of understanding can be binding or not, so say which in the text.`,
   `Start a contracts register from the first agreement, with key dates and obligations, and store signed copies where you and your co-founders can find them. Templates are starting points only. Ask someone with a legal background to review contracts that are large, long or unusual, or that make you liable for things outside your control.`
  ],
  weak:`We signed what the first funder sent us.`,
  strong:`“Every agreement goes in one register: parties, whose name it is in, value, reporting dates, end date, who signed and a link to the signed copy. Both co-founders approve anything over US$1,000, and anything with unusual liability is checked by someone with a legal background first.”`,
  why:`It tracks every obligation and date from the first agreement, and matches the level of review to the risk.`,
  reflect:`Which obligation in an agreement you have signed, or are about to sign, could you fail without realising?`,
  exercise:`Set up your contracts register and pre-signature checklist before you sign your next agreement.`,
  fields:{
   register:{label:`Contracts register`,hint:`Agreement | parties (and whose name it is in) | value | key obligations | key dates | signatory | review needed?`},
   checklist:{label:`Pre-signature checklist`,hint:`Questions you and your co-founders check before anyone signs.`}
  },
  check:`Would you know every obligation and deadline in the agreements you have signed so far?`
 },
 'core-policies':{
  learn:[
   `Most organisations need a small core set, and it is easiest to write it before habits form. A code of conduct sets the behaviour expected of founders, volunteers, future staff and board members: respect, professional boundaries, care with resources and reporting concerns. A conflict of interest policy asks people to declare personal interests that could sway a decision, and explains how conflicts are managed and recorded. This matters early, when friends and family often help.`,
   `An anti-fraud, bribery and corruption policy makes clear that these are never accepted, defines what is prohibited (including improper gifts and payments to speed things up, for example during registration or licensing), describes the controls and explains how suspicions are reported. An anti-harassment and bullying policy protects people and gives them a route for complaints.`,
   `Write policies in plain language, short enough to be read, and linked to your values. Each one should name an owner, who it applies to, the main rules, how to report a concern, what happens after a breach and a review date. Share it with everyone who joins, from the first volunteer, and ask them to confirm they have read it.`
  ],
  weak:`Everyone involved must behave professionally at all times.`,
  strong:`“Each founder and volunteer declares family and business links when they join and every year; anyone whose relative supplies us leaves the discussion and does not decide on that order; gifts from suppliers or sponsors above a small value are declared at the next team meeting.”`,
  why:`It turns a principle into a record, a rule for decisions and a clear line on gifts.`,
  reflect:`Which conflict of interest exists in your founding team or close circle today, declared or not?`,
  exercise:`Outline your core policies and how each will be put into practice from the start.`,
  fields:{
   policies:{label:`Core policies`,hint:`Policy | applies to (founders, volunteers, future staff and board) | main rules | reporting route | owner | review date.`},
   declarations:{label:`Declarations and registers`,hint:`Which declarations you will collect from the start (conflicts, gifts) and how you will record them.`}
  },
  check:`Does each policy explain what to do and how to report a concern, even one about a founder?`
 },
 safeguarding:{
  learn:[
   `Safeguarding means protecting people, especially children and adults at risk, from harm caused by your founders, volunteers, future staff, partners, programmes or operations. It applies from your very first activity, including pilots and trial sessions, wherever your work brings you into contact with people who could be harmed, including online and through the stories and images you share.`,
   `A proportionate framework, even for a team of two, has a policy and code of conduct; a named safeguarding lead and a deputy (with someone outside the founders to receive concerns about you); safer recruitment; training; safe activity design (supervision, two adults present, safe spaces, online rules); a way to report concerns; a procedure to respond, record and refer to the right local authority; and support for the person affected.`,
   `Safeguarding procedures must fit local law and local services. Get qualified local expertise before your first activity and check referral contacts every year. Never record confidential case details in this workspace. Review the framework after any concern and at least once a year.`
  ],
  weak:`We all care about children, so we do not need a safeguarding policy yet.`,
  strong:`“Before the first session: a lead and a deputy trained; every volunteer checked and trained before working with young people; no adult ever alone with a young person; the reporting route printed on the sign-in sheet; local referral contacts confirmed, then rechecked each year.”`,
  why:`It names roles, routes and checks before anyone takes part, and ties them to local services that are verified, not assumed.`,
  reflect:`If a child or adult told your first volunteer about abuse, what would that volunteer do?`,
  exercise:`Outline your safeguarding framework before your first activity (without case details).`,
  fields:{
   scope:{label:`Who could be at risk and how`,hint:`People, planned activities and channels where harm could occur.`},
   framework:{label:`Framework elements`,hint:`Lead and deputy, route for concerns about founders, policy, recruitment, training, safe design, reporting, response and referral, support.`},
   local:{label:`Local requirements to confirm`,hint:`Laws, authorities and referral pathways to verify with local expertise before you start.`}
  },
  check:`Could anyone report a concern safely, including one about a founder, and would it reach a trained person quickly?`,
  anatomy:{
   title:`Safe practice in three moments`,
   intro:`Safeguarding works before, during and after an activity. Each moment needs its own habits, from the very first session.`,
   cols:[`Moment`,`What good practice looks like`,`In a new initiative`],
   rows:[
    [`Before`,`Vetting, training, consent, a risk check for the activity`,`Parental consent and a site check before each session, including pilots`],
    [`During`,`Two adults present, clear roles, a named focal person on site`,`Even if only the two founders run it, both stay present and one is named as focal person`],
    [`If a concern arises`,`Listen, do not investigate, tell the focal person the same day, refer as the procedure says`,`A volunteer tells the lead, who follows the referral route confirmed before launch`]
   ]
  }
 },
 'data-protection':{
  learn:[
   `Data protection laws differ by country, but many share the same principles, and they apply from the first sign-up: collect personal information for a clear and lawful purpose, keep only what you need, keep it accurate and secure, hold it only as long as necessary, be open about what you do with it, and respect people’s rights to see, correct or delete it.`,
   `Start with a data inventory, even if you hold very little yet: what personal data you hold or plan to collect (participants, supporters, customers, members, volunteers, future staff), why, on what lawful basis, where it is stored, who can see it, who you share it with and how long you keep it. Data about children, health, ethnicity or similar sensitive matters needs extra care.`,
   `Then put in place a privacy notice, consent where that is your basis, access controls, secure tools, a retention schedule, a way to handle requests from people about their data, data-sharing agreements with partners and a plan for a data breach. This is far easier to build in now than to fix later. Train everyone who handles personal data, and confirm local duties, such as registering with an authority, with qualified advice.`
  ],
  weak:`We will keep all our contacts in a shared spreadsheet and sort it out later.`,
  strong:`“Sign-up forms ask only for a first name, age group and a parent’s phone number; bank details are stored where only the two founders can open them; names appear with photos only with yearly consent; contacts are deleted a year after someone stops taking part.”`,
  why:`It knows what data it will hold, limits who sees it and decides when each record goes, before the first record exists.`,
  reflect:`What sensitive information could you decide never to collect?`,
  exercise:`Build your data inventory for what you hold or plan to collect, and list your privacy actions.`,
  fields:{
   inventory:{label:`Data inventory`,hint:`Data set (now or planned) | whose data | purpose | lawful basis | where stored | access | shared with | retention.`},
   privacy:{label:`Information and safeguarding actions`,hint:`Minimum data needed | access | retention decision | specialist review needed before you start collecting.`}
  },
  check:`Will you collect only the personal data you need, and protect it from the first record?`
 },
 whistleblowing:{
  learn:[
   `People need safe ways to raise concerns about wrongdoing: fraud, abuse, harassment, safety risks or breaches of law or policy. A whistleblowing policy protects people who raise concerns honestly from any punishment, and explains how to report, including to someone outside the founders or to an outside body. In a small founding team, where everyone reports to the same one or two people, this route matters even more.`,
   `Complaints from participants, customers, members, supporters or the public need a clear, easy procedure with timescales, a route to someone independent if the first answer is not enough, and learning from patterns. Incidents (accidents, data breaches, safeguarding concerns, security problems) need a simple report form, an owner and a record of what was done.`,
   `Make the routes visible and simple from your first activity. You can combine them, but sensitive matters must reach trained and independent people. Some incidents must be reported to regulators, funders or insurers within set times; list those duties as they arise and confirm them with qualified advice.`
  ],
  weak:`People can talk to the founders if there is a problem.`,
  strong:`“Concerns about a founder go to an independent adviser we have named; complaints are acknowledged within three working days and answered within twenty; one incident form covers accidents, unsafe products, data breaches and safeguarding; serious incidents are reported to the regulator, funders and insurer as their rules require.”`,
  why:`It offers a route around the founders, sets timescales and lists outside reporting duties.`,
  reflect:`What if the concern is about you or your co-founder?`,
  exercise:`Design your reporting channels and timescales before you launch.`,
  fields:{
   channels:{label:`Reporting channels`,hint:`Type (whistleblowing, complaint, incident) | how to report | who receives | independent route (outside the founders) | timescale.`},
   external:{label:`External reporting duties`,hint:`What must be reported to whom, and how quickly, once you start operating.`}
  },
  check:`Is there a safe route when the concern involves a founder or the most senior person?`,
  anatomy:{
   title:`Three kinds of report`,
   intro:`They often share a form, but each has a different purpose and needs a different person to receive it, even in a very small team.`,
   cols:[`Type`,`What it covers`,`Who should receive it`],
   rows:[
    [`Whistleblowing`,`Suspected wrongdoing inside the organisation: fraud, abuse, cover-ups`,`Someone independent of the people involved: a trusted adviser now, the chair once you have a board`],
    [`Complaint`,`Someone unhappy with your service, product or behaviour`,`A named person, with a route to the other founder or an independent adviser`],
    [`Incident`,`Something that happened: accident, data breach, safeguarding concern`,`The owner for that area, the same day for serious cases`]
   ]
  }
 },
 'hr-policies':{
  learn:[
   `As soon as you engage anyone, even one volunteer or a first paid helper, you need some workplace policies, and employment law in your country will require some of them once you employ people. Typical ones cover equal opportunities, recruitment, pay, hours and leave, sickness and absence, grievance and disciplinary procedures, health and safety, remote work, expenses, use of equipment and travel.`,
   `Volunteers, including friends who help in the early days, need a lighter but real framework: role descriptions, expenses, supervision, conduct and how concerns are handled. Keep volunteer documents clear that volunteering is not employment, and confirm locally how that line is drawn, especially if you pay expenses or small amounts.`,
   `Module 4 already designed much of this: recruitment, onboarding, check-ins, pay, culture and offboarding. Here, decide which policies must be in place before the first person joins and which can wait until your first hire, have each one checked by a qualified local employment adviser and list it in your policy register with an owner and a review date. Use templates as starting points only.`
  ],
  weak:`We will copy a big organisation’s staff handbook when we hire.`,
  strong:`“A two-page volunteer agreement and a health and safety note now; a short staff handbook of five policies (contracts, hours, sickness, grievance and discipline, anti-harassment) drafted before the first hire and checked by a local employment adviser.”`,
  why:`It is proportionate to a team that is just forming, checked against local law and ready before it is needed.`,
  reflect:`Which situation with a volunteer or a first hire would you not know how to handle fairly?`,
  exercise:`List the HR and workplace policies you will need, what triggers each one, and their status.`,
  fields:{
   policies:{label:`HR and workplace policies`,hint:`Policy | applies to (volunteers, first hires) | legally required? | needed by (now or first hire) | status | owner | review date.`}
  },
  check:`Have the workplace policies you will legally need been checked for your country before you take anyone on?`
 },
 procedures:{
  learn:[
   `A procedure helps someone carry out a real task the same way every time. This matters even if only you do the task today, because others will take it over as you grow. Define what starts it, who is responsible, the steps, the records kept and the exceptions. Every important policy needs at least one procedure that shows how to apply it.`,
   `Use plain language and test it with someone who did not write it, such as a co-founder, a volunteer or a friend. Ask them where they would pause, guess or need permission. Fix those points before you treat the procedure as ready.`,
   `Include what to do in an urgent situation and how to raise a concern. Do not write emergency or safeguarding instructions on your own: base them on qualified local advice and the local services people would actually contact, and have them ready before your first activity.`
  ],
  weak:`We will just follow best practice.`,
  strong:`“Before any item goes on sale, a trained person tests it, labels it and records the result; a founder signs off; any item that fails is tagged ‘do not sell’ and kept apart; the label is checked again before pricing.”`,
  why:`Each step has a role and a record, and the exception (a failed test) has a clear path.`,
  reflect:`Which task do you carry in your head that nobody else could repeat?`,
  exercise:`Draft one priority procedure for your launch and plan a walkthrough.`,
  fields:{
   procedure:{label:`Priority procedure`,hint:`Trigger | scope | roles (now and as you grow) | numbered steps | records | exceptions | review.`},
   test:{label:`Procedure test`,hint:`Who will walk through it (a co-founder, volunteer or friend), and what needs checking?`}
  },
  check:`Could the first person who joins you follow the sequence and recognise an exception?`
 },
 lifecycle:{
  learn:[
   `Policies only protect people if they are approved, known, understood, followed and kept up to date. Even with only a few policies, manage each one through a simple cycle: draft, consult the people affected, approve, share and train, collect acknowledgements, check it is followed, then review and update.`,
   `Start a policy register now, with the version, status, owner, approver, approval date, next review, who must acknowledge it and where the current copy lives. Archive old versions rather than deleting them, so you can show what applied at any time, as funders, regulators and insurers may later ask.`,
   `Review on a schedule (often every one to three years), and also after an incident, when the law changes, when you register or when your activities change. Record what changed and why, and tell people about significant changes. Link acknowledgements to onboarding, so the first people who join read what applies to them from the start.`
  ],
  weak:`Our policies are in someone’s email somewhere.`,
  strong:`“A register of five policies, each with an owner, version and next review; both founders approve them now, and the board will once it exists; every volunteer confirms the code of conduct, safeguarding and data protection when they join and after each major update.”`,
  why:`It keeps every policy owned, current and known by the people it applies to, and is ready to grow.`,
  reflect:`When will your first policy be due for review, and who will remember?`,
  exercise:`Set up your policy register and review schedule from your first policies.`,
  fields:{
   register:{label:`Policy register`,hint:`Policy | version | status | owner | approver (founders now, board later) | next review | who must acknowledge.`},
   communication:{label:`Communication and training`,hint:`How the first people who join will learn about and acknowledge policies.`}
  },
  check:`Is every policy owned, current and acknowledged by the people it applies to, from the first person who joins?`
 },
 'risk-assess':{
  learn:[
   `A risk is something uncertain that could affect what you are trying to build or harm people. An issue is something that has already happened (Module 5). Describe each risk as cause → event → consequence, so your response can target the cause or reduce the consequence.`,
   `Find risks systematically: from your objectives and Theory of Change assumptions, your planned activities, people, money, partners, legal map, data, reputation, safety and the outside context. Involve your co-founders, early volunteers and the people you will serve; those closest to the work often see risks that founders miss.`,
   `Score each risk for likelihood and impact on a simple scale, such as 1 to 5, and multiply them. Score it first before controls (inherent risk), then with the controls you have or will have in place at launch (residual risk). The scores support a conversation; they do not make a judgement right on their own.`
  ],
  weak:`Risk: something goes wrong.`,
  strong:`“A laptop holding participants’ records is stolen, exposing their data and their families’ trust; likelihood 3, impact 4 (inherent 12); with a password, encryption and first names only, likelihood 2, impact 3 (residual 6).”`,
  why:`It links a cause, a harm and the controls, and shows the difference the controls make.`,
  reflect:`Which risk to your new initiative would you rather not talk about?`,
  exercise:`Identify and assess the main risks to what you are starting, without personal case details.`,
  fields:{
   risks:{label:`Risk assessment`,hint:`Cause → event → consequence | category | likelihood | impact | inherent score | controls you have or plan | residual score.`}
  },
  check:`Is each risk described as cause, event and consequence, with inherent and residual scores?`,
  anatomy:{
   title:`A simple risk scoring grid`,
   intro:`Score likelihood and impact from 1 to 5, then multiply: 1–4 low, 5–9 medium, 10–14 high, 15–25 very high.`,
   cols:[`Score`,`Likelihood`,`Impact`],
   rows:[
    [`1`,`Rare: hard to imagine in the next few years`,`Minor: small delay or cost, easily fixed`],
    [`2`,`Unlikely: could happen, but not expected`,`Moderate: some disruption or cost; no lasting harm`],
    [`3`,`Possible: might happen in the next year`,`Serious: your launch or an objective slips, or an injury needing treatment`],
    [`4`,`Likely: will probably happen this year`,`Major: an activity stops, or early trust is badly damaged`],
    [`5`,`Almost certain: expected, or already starting`,`Severe: serious harm to a person, or the survival of what you are building at risk`]
   ]
  }
 },
 'risk-register':{
  learn:[
   `A risk register keeps your risks, scores, owners, actions, due dates and review dates in one place. Keep it short enough to use: a new initiative might start with ten to fifteen risks and add more as it grows, while a small established organisation might track fifteen to thirty.`,
   `Every risk needs one owner, the person best placed to manage it; in a founding team, share them out so one person does not hold them all. Choose a response: avoid (stop or change the activity), reduce (add controls), transfer (insurance or contracts) or accept (if it is within your risk appetite). Actions need owners and dates like any other task.`,
   `Set your risk appetite: how much risk you will accept in each area. Many organisations have a very low appetite for safeguarding, legal and financial integrity risks, and more room for trying new ideas, which is where a new initiative often needs to take risks. Then decide what is escalated: which scores go to both founders, which to an adviser and, later, to the board, and how fast.`
  ],
  weak:`One founder keeps a list of worries in their head.`,
  strong:`“A register of twelve risks, each with one owner, a response and a dated action; residual scores of 12 or more go to the founders’ monthly meeting, and any safety incident or concern about a participant goes to both founders the same day.”`,
  why:`It makes every risk someone’s job and sets clear rules for what is escalated and how fast.`,
  reflect:`Which of your risks has no realistic owner in a team your size?`,
  exercise:`Build your first risk register with owners, responses and escalation rules.`,
  fields:{
   register:{label:`Risk register`,hint:`Risk | owner (one person) | response (avoid, reduce, transfer, accept) | mitigation action | due | review date.`},
   appetite:{label:`Risk appetite and escalation`,hint:`Appetite by area and what is escalated to whom (founders, adviser, later the board), how fast.`}
  },
  check:`Does every significant risk have an owner, an action and an escalation route, even in a team of one or two?`,
  anatomy:{
   title:`One example risk register row`,
   intro:`A single row from a new initiative’s register, read from left to right.`,
   cols:[`Column`,`What it records`,`Example entry`],
   rows:[
    [`Risk`,`Cause → event → consequence`,`No equipment check before events → faulty equipment used → injury, claim`],
    [`Score`,`Inherent and residual`,`Inherent 15; residual 8`],
    [`Owner and response`,`One person; avoid, reduce, transfer or accept`,`The co-founder who runs events; reduce and transfer (public liability insurance)`],
    [`Action and due`,`What will lower the score, by when`,`Equipment checklist written and insurance in place, before the first event`],
    [`Review and escalation`,`When it is next checked; who hears about it`,`Monthly by the owner; both founders each quarter; any incident to the other founder within 24 hours`]
   ]
  }
 },
 'risk-monitor':{
  learn:[
   `Risks change, and in the early days they change quickly. Review the register regularly: high risks monthly, others quarterly, and the whole register with your co-founders and an adviser (later, the board) at least once or twice a year. Check whether actions were done, whether scores have moved and whether new risks have appeared.`,
   `Use early warning signs: indicators that a risk is growing, such as cash falling below your threshold, a pilot that attracts fewer people than planned, more complaints or a co-founder losing available time. Link each risk to the objective, partner or task it threatens, so it is discussed in the meeting where that work is managed.`,
   `When a risk happens, it becomes an issue: respond, then ask what the register missed. Over time, the register becomes a record of what you have learned while building.`
  ],
  weak:`We will look at the risks once a year, if we remember.`,
  strong:`“Cash and safety risks checked at every monthly founders’ meeting; the full register each year alongside the budget; each risk linked to the objective it threatens; cash below three months of costs triggers an immediate review.”`,
  why:`It keeps risk on the agenda where decisions are made and uses clear signs to act early.`,
  reflect:`What early warning sign would tell you that the biggest risk to your launch is growing?`,
  exercise:`Set your risk review routine and early warning indicators from launch.`,
  fields:{
   routine:{label:`Risk review routine`,hint:`Which risks, how often, by whom, reported to whom (founders, adviser, later the board).`},
   warnings:{label:`Early warning indicators`,hint:`Risk | warning sign | threshold | who watches it (you or a co-founder).`}
  },
  check:`Will you notice a growing risk before it becomes a crisis for something so new?`
 },
 'compliance-pack':{title:`Your Compliance & Risk Pack`}
});
