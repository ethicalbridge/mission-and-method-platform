import base from './m10-legal-compliance-risk.js?v=deeplink1';
import {adapt} from './adapt.js?v=deeplink1';
// Entrepreneurs' version of m10: same lessons, fields, workbook and tools; wording for people building something new.
const m=adapt(base,{
 title:`Legal, Compliance, Policies & Risk`,
 short:`Your legal map, the policies you will actually need, procedures, policy lifecycle and risk management from the start`,
 intro:`Get your legal and compliance foundations right before you launch. The first lessons explain the legal duties that will apply to you, which policies and procedures a new initiative actually needs, and what each one is for, with examples from our bakery. They have no exercises: each one points you to templates you can adapt. The last lessons help you identify your risks and build a risk register with clear owners and escalation from the start. Legal duties depend on where you operate, so adapt every template to your local laws and have it reviewed by a qualified lawyer before you use it.`,
 output:`Risk register, and a clear view of the policies you need`,
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
  strong:`“Before the first market day: register the kitchen and stall with the food authority; register for tax before the first sale; a basic food-hygiene certificate for everyone who handles food; written traineeship agreements and pay that meet employment law, with extra rules for trainees aged 17; data protection for trainees’ records; public liability and product insurance for the stall. Our accountant has confirmed the tax steps; when to register as a company with a social purpose is still an open question for someone with a legal background.”`,
  why:`It names each duty before it applies, who oversees it and who owns it, and is honest about what still needs advice.`,
  reflect:`Which obligation would you be least prepared to show you are meeting on the day you launch?`,
  exercise:`Build your legal and regulatory map for what you are about to start.`,
  fields:{
   map:{label:`Legal map`,hint:`Area (e.g. food hygiene) | obligation (e.g. register the kitchen and stall) | authority (e.g. the local food authority) | when it starts and how often (e.g. before the first sale; inspections) | owner (you or a co-founder) | confirmed by an adviser?`},
   open:{label:`Open legal questions`,hint:`Questions to resolve with qualified advice before you register or launch, and by when, e.g. may trainees aged 17 work early-morning shifts?`}
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
  strong:`“Trainees, some aged 17, start in the first month and we sell food every Saturday, so safeguarding, a code of conduct, food hygiene and allergen labelling, kitchen safety and the traineeship agreement come first. A finance policy follows registration. A full staff handbook waits for the shop in year 2.”`,
  why:`The priority follows the activity and the harm it could cause, not the length of a template or the size you hope to reach.`,
  reflect:`Which gap could cause the greatest harm on your first day of activity?`,
  exercise:`Run a policy needs assessment and build a prioritised policy register for your launch and first year.`,
  fields:{
   factors:{label:`Needs assessment`,hint:`Factor (form, planned activities, geography, size, funding and customers, risk) | what it requires (for example trainees aged 17 need safeguarding before they start).`},
   policies:{label:`Policy register`,hint:`Policy (e.g. food hygiene and allergens) | reason needed (e.g. we sell food every Saturday) | priority (before launch, soon, good practice) | owner (e.g. the baker co-founder) | approval | review date | advice needed.`}
  },
  check:`Does your priority order follow legal duty and risk, not document length or what larger organisations have?`,
  anatomy:{
   title:`Policy needs by activity`,
   intro:`Start from what you plan to do. Each activity points to the policies it usually needs, and to when they must be ready. The bakery does all five in its first month.`,
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
  weak:`We signed the kitchen agreement the landlord sent us.`,
  strong:`“Every agreement goes in one register (the shared-kitchen rental, the youth fund’s grant, the wholesale terms with the two cafés and the canteen, each trainee’s agreement) with parties, whose name it is in, value, key dates, who signed and a link to the signed copy. Both co-founders approve anything over US$1,000, and the kitchen agreement, which makes us liable for damage to shared equipment, was checked by someone with a legal background first.”`,
  why:`It tracks every obligation and date from the first agreement, and matches the level of review to the risk.`,
  reflect:`Which obligation in an agreement you have signed, or are about to sign, could you fail without realising?`,
  exercise:`Set up your contracts register and pre-signature checklist before you sign your next agreement.`,
  fields:{
   register:{label:`Contracts register`,hint:`Agreement (e.g. shared-kitchen rental) | parties (and whose name it is in) | value (e.g. US$800 a month) | key obligations (e.g. kitchen clean by 2 pm) | key dates (e.g. notice period, renewal) | signatory | review needed?`},
   checklist:{label:`Pre-signature checklist`,hint:`Questions you and your co-founders check before anyone signs, e.g. whose name is it in, what must we deliver, who pays if shared equipment breaks?`}
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
  strong:`“Each co-founder, mentor and adviser declares family and business links when they join and every year; if someone’s relative supplies our flour or rents us kitchen time, that person leaves the discussion and does not decide on the order; gifts from suppliers or customers worth more than US$25 are declared at the next founders’ meeting.”`,
  why:`It turns a principle into a record, a rule for decisions and a clear line on gifts.`,
  reflect:`Which conflict of interest exists in your founding team or close circle today, declared or not?`,
  exercise:`Outline your core policies and how each will be put into practice from the start.`,
  fields:{
   policies:{label:`Core policies`,hint:`Policy (e.g. conflicts of interest) | applies to (founders, volunteers, future staff and board) | main rules (e.g. declare relatives who supply us) | reporting route | owner | review date.`},
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
  weak:`We all care about our trainees, so we do not need a safeguarding policy yet.`,
  strong:`“Before the first trainee starts: a lead (the co-founder from the youth centre) and a deputy (the baker), both trained; every mentor checked and trained before supervising trainees; a trainee aged 17 never works an early shift alone with one adult; concerns about a founder go to the youth-centre manager who will join our advisory group; the reporting route on the kitchen noticeboard; local referral contacts confirmed with the youth centre, then rechecked each year.”`,
  why:`It names roles, routes and checks before any trainee starts, including a route around the founders, and ties them to local services that are verified, not assumed.`,
  reflect:`If a child or adult told your first volunteer about abuse, what would that volunteer do?`,
  exercise:`Outline your safeguarding framework before your first activity (without case details).`,
  fields:{
   scope:{label:`Who could be at risk and how`,hint:`People, planned activities and channels where harm could occur, e.g. trainees aged 17 on early shifts, photos of trainees on social media.`},
   framework:{label:`Framework elements`,hint:`Lead and deputy, route for concerns about founders, policy, recruitment, training, safe design, reporting, response and referral, support.`},
   local:{label:`Local requirements to confirm`,hint:`Laws, authorities and referral pathways to verify with local expertise before you start, e.g. working-hours rules for under-18s, who to call about a trainee at risk.`}
  },
  check:`Could anyone report a concern safely, including one about a founder, and would it reach a trained person quickly?`,
  anatomy:{
   title:`Safe practice in three moments`,
   intro:`Safeguarding works before, during and after an activity. Each moment needs its own habits, from the very first session.`,
   cols:[`Moment`,`What good practice looks like`,`In the bakery`],
   rows:[
    [`Before`,`Vetting, training, consent, a risk check for the activity`,`Mentors checked, a kitchen safety check and, where the law requires it, a parent’s consent for trainees aged 17, before the first shift of the pilot`],
    [`During`,`Two adults present, clear roles, a named focal person on site`,`Even if only the two founders are on shift, both stay present when a trainee under 18 works, and one is named as focal person`],
    [`If a concern arises`,`Listen, do not investigate, tell the focal person the same day, refer as the procedure says`,`A mentor tells the lead, who follows the referral route confirmed with the youth centre before launch`]
   ]
  }
 },
 'data-protection':{
  learn:[
   `Data protection laws differ by country, but many share the same principles, and they apply from the first sign-up: collect personal information for a clear and lawful purpose, keep only what you need, keep it accurate and secure, hold it only as long as necessary, be open about what you do with it, and respect people’s rights to see, correct or delete it.`,
   `Start with a data inventory, even if you hold very little yet: what personal data you hold or plan to collect (participants, supporters, customers, members, volunteers, future staff), why, on what lawful basis, where it is stored, who can see it, who you share it with and how long you keep it. Data about children, health, ethnicity or similar sensitive matters needs extra care.`,
   `Then put in place a privacy notice, consent where that is your basis, access controls, secure tools, a retention schedule, a way to handle requests from people about their data, data-sharing agreements with partners and a plan for a data breach. This is far easier to build in now than to fix later. Train everyone who handles personal data, and confirm local duties, such as registering with an authority, with qualified advice.`
  ],
  weak:`We will keep trainees’ and customers’ details in one shared spreadsheet and sort it out later.`,
  strong:`“Trainee records hold only name, date of birth, contact and emergency contact, pay details and certificate dates, in a folder only the two founders can open; the youth centre’s referral notes stay with the youth centre; cake-order lists keep a name and phone number and are deleted after three months; photos of trainees are used only with their yearly written consent.”`,
  why:`It knows what data it will hold, limits who sees it and decides when each record goes, before the first record exists.`,
  reflect:`What sensitive information could you decide never to collect?`,
  exercise:`Build your data inventory for what you hold or plan to collect, and list your privacy actions.`,
  fields:{
   inventory:{label:`Data inventory`,hint:`Data set, now or planned (e.g. trainee records) | whose data (e.g. trainees aged 17–24) | purpose (e.g. pay and certificates) | lawful basis (e.g. the traineeship agreement) | where stored | access (e.g. both founders) | shared with (e.g. the youth centre, with consent) | retention (for example as long as pay and tax rules require).`},
   privacy:{label:`Information and safeguarding actions`,hint:`Minimum data needed (e.g. no school records) | access | retention decision | specialist review needed before you start collecting.`}
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
  strong:`“Concerns about a founder go to the youth-centre manager who will join our advisory group; complaints from customers and trainees are acknowledged within three working days and answered within twenty; one incident form covers burns and cuts, allergen mistakes, data breaches and safeguarding; serious incidents are reported to the food authority, the youth fund and our insurer as their rules require.”`,
  why:`It offers a route around the founders, sets timescales and lists outside reporting duties.`,
  reflect:`What if the concern is about you or your co-founder?`,
  exercise:`Design your reporting channels and timescales before you launch.`,
  fields:{
   channels:{label:`Reporting channels`,hint:`Type (whistleblowing, complaint, incident) | how to report (e.g. incident form on the kitchen noticeboard) | who receives (e.g. the baker co-founder) | independent route (outside the founders) | timescale (for example the same day).`},
   external:{label:`External reporting duties`,hint:`What must be reported to whom, and how quickly, once you start operating.`}
  },
  check:`Is there a safe route when the concern involves a founder or the most senior person?`,
  anatomy:{
   title:`Three kinds of report`,
   intro:`They often share a form, but each has a different purpose and needs a different person to receive it, even in a very small team.`,
   cols:[`Type`,`What it covers`,`Who should receive it`],
   rows:[
    [`Whistleblowing`,`Suspected wrongdoing inside the organisation: takings going missing, a mentor mistreating a trainee, a cover-up`,`Someone independent of the people involved: a trusted adviser now, the chair once you have a board`],
    [`Complaint`,`Someone unhappy with your product, service or behaviour: a mislabelled loaf, a café’s late delivery`,`A named person, with a route to the other founder or an independent adviser`],
    [`Incident`,`Something that happened: a burn in the kitchen, a lost order list, a safeguarding concern`,`The owner for that area, the same day for serious cases`]
   ]
  }
 },
 'hr-policies':{
  learn:[
   `As soon as you engage anyone, even one volunteer or a first paid helper, you need some workplace policies, and employment law in your country will require some of them once you employ people. Typical ones cover equal opportunities, recruitment, pay, hours and leave, sickness and absence, grievance and disciplinary procedures, health and safety, remote work, expenses, use of equipment and travel.`,
   `Volunteers, including friends who help in the early days, need a lighter but real framework: role descriptions, expenses, supervision, conduct and how concerns are handled. Keep volunteer documents clear that volunteering is not employment, and confirm locally how that line is drawn, especially if you pay expenses or small amounts.`,
   `Module 4 already designed much of this: recruitment, onboarding, check-ins, pay, culture and offboarding. Here, decide which policies must be in place before the first person joins and which can wait until your first hire, have each one checked by a qualified local employment adviser and list it in your policy register with an owner and a review date. Use templates as starting points only.`
  ],
  weak:`We will copy a big bakery chain’s staff handbook when we open the shop.`,
  strong:`“Before the first trainee: a two-page traineeship agreement (pay, hours, six-month term, mentor, hygiene certificate), a kitchen health and safety note and working-hours rules for trainees aged 17; a short staff handbook of five policies (contracts, hours, sickness, grievance and discipline, anti-harassment) drafted before the shop opens; all checked by a local employment adviser.”`,
  why:`It is proportionate to a team that is just forming, checked against local law and ready before it is needed.`,
  reflect:`Which situation with a volunteer or a first hire would you not know how to handle fairly?`,
  exercise:`List the HR and workplace policies you will need, what triggers each one, and their status.`,
  fields:{
   policies:{label:`HR and workplace policies`,hint:`Policy (e.g. traineeship agreement) | applies to (e.g. trainees, first hires, volunteers) | legally required? | needed by (now or first hire) | status | owner | review date.`}
  },
  check:`Have the workplace policies you will legally need been checked for your country before you take anyone on?`
 },
 procedures:{
  learn:[
   `A procedure helps someone carry out a real task the same way every time. This matters even if only you do the task today, because others will take it over as you grow. Define what starts it, who is responsible, the steps, the records kept and the exceptions. Every important policy needs at least one procedure that shows how to apply it.`,
   `Use plain language and test it with someone who did not write it, such as a co-founder, a volunteer or a friend. Ask them where they would pause, guess or need permission. Fix those points before you treat the procedure as ready.`,
   `Include what to do in an urgent situation and how to raise a concern. Do not write emergency or safeguarding instructions on your own: base them on qualified local advice and the local services people would actually contact, and have them ready before your first activity.`
  ],
  weak:`We will just follow good hygiene practice.`,
  strong:`“Before any batch goes on the stall: the person who baked it checks it against the recipe card, labels it with ingredients, allergens and bake date, and records it on the batch sheet; a co-founder signs off; any batch that fails is tagged ‘not for sale’ and kept apart; labels are checked again before pricing.”`,
  why:`Each step has a role and a record, and the exception (a failed batch) has a clear path.`,
  reflect:`Which task do you carry in your head that nobody else could repeat?`,
  exercise:`Draft one priority procedure for your launch and plan a walkthrough.`,
  fields:{
   procedure:{label:`Priority procedure`,hint:`Trigger (e.g. a batch is ready for the stall) | scope | roles (now and as you grow) | numbered steps | records (e.g. batch sheet) | exceptions (e.g. a missing allergen label) | review.`},
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
  strong:`“A register of six policies (safeguarding, food hygiene and allergens, code of conduct, conflicts of interest, data protection, traineeship rules), each with an owner, version and next review; both founders approve them now, and the advisory group will review them once it exists; every trainee and mentor confirms the code of conduct, safeguarding, hygiene and data rules on their first day and after each major update.”`,
  why:`It keeps every policy owned, current and known by the people it applies to, and is ready to grow.`,
  reflect:`When will your first policy be due for review, and who will remember?`,
  exercise:`Set up your policy register and review schedule from your first policies.`,
  fields:{
   register:{label:`Policy register`,hint:`Policy (e.g. food hygiene and allergens) | version (e.g. 1.0) | status | owner | approver (founders now, board later) | next review | who must acknowledge (for example every trainee and mentor).`},
   communication:{label:`Communication and training`,hint:`How the first people who join will learn about and acknowledge policies, e.g. a first-day induction for each trainee with a signed checklist.`}
  },
  check:`Is every policy owned, current and acknowledged by the people it applies to, from the first person who joins?`
 },
 'risk-assess':{
  learn:[
   `A risk is something uncertain that could affect what you are trying to build or harm people. An issue is something that has already happened (Module 5). Describe each risk as cause → event → consequence, so your response can target the cause or reduce the consequence.`,
   `Find risks systematically: from your objectives and Theory of Change assumptions, your planned activities, people, money, partners, legal map, data, reputation, safety and the outside context. Involve your co-founders, early volunteers and the people you will serve; those closest to the work often see risks that founders miss.`,
   `Score each risk for likelihood and impact on a simple scale, such as 1 to 5, and multiply them. Score it first before controls (inherent risk), then with the controls you have or will have in place at launch (residual risk). The scores support a conversation; they do not make a judgement right on their own.`
  ],
  weak:`Risk: food safety.`,
  strong:`“A batch is mislabelled in the rush before market → a customer with a nut allergy eats it → serious harm, a claim and lost trust; likelihood 3, impact 5 (inherent 15); with a second person checking every allergen label and nuts stored and baked apart, likelihood 1, impact 5 (residual 5).”`,
  why:`It links a cause, a harm and the controls, and shows the difference the controls make.`,
  reflect:`Which risk to your new initiative would you rather not talk about?`,
  exercise:`Identify and assess the main risks to what you are starting, without personal case details.`,
  fields:{
   risks:{label:`Risk assessment`,hint:`Cause → event → consequence (e.g. cafés pay late → cash runs short → trainee pay delayed) | category (e.g. financial) | likelihood | impact | inherent score | controls you have or plan (e.g. weekly invoicing) | residual score.`}
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
  strong:`“A register of twelve risks, each with one owner (food safety and money with the baker, safeguarding and trainees with the co-founder from the youth centre), a response and a dated action; residual scores of 12 or more go to the founders’ monthly meeting, and any kitchen injury or concern about a trainee goes to both founders the same day.”`,
  why:`It makes every risk someone’s job and sets clear rules for what is escalated and how fast.`,
  reflect:`Which of your risks has no realistic owner in a team your size?`,
  exercise:`Build your first risk register with owners, responses and escalation rules.`,
  fields:{
   register:{label:`Risk register`,hint:`Risk (e.g. a mixer guard fails during a shift) | owner (one person) | response (avoid, reduce, transfer, accept) | mitigation action (e.g. daily equipment check) | due | review date.`},
   appetite:{label:`Risk appetite and escalation`,hint:`Appetite by area and what is escalated to whom (founders, adviser, later the board), how fast.`}
  },
  check:`Does every significant risk have an owner, an action and an escalation route, even in a team of one or two?`,
  anatomy:{
   title:`One example risk register row`,
   intro:`A single row from the bakery’s register, read from left to right.`,
   cols:[`Column`,`What it records`,`Example entry`],
   rows:[
    [`Risk`,`Cause → event → consequence`,`No daily check of the shared kitchen’s mixer → a guard fails during a trainee’s shift → injury, claim`],
    [`Score`,`Inherent and residual`,`Inherent 15; residual 8`],
    [`Owner and response`,`One person; avoid, reduce, transfer or accept`,`The baker co-founder; reduce and transfer (employer’s and public liability insurance)`],
    [`Action and due`,`What will lower the score, by when`,`Daily equipment checklist in use and insurance in place, before the first trainee’s shift`],
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
  strong:`“Cash, food safety and trainee risks checked at every monthly founders’ meeting; the full register each December alongside the budget; each risk linked to the objective it threatens (late payments to ISO2, trainees leaving early to ESO2); cash below US$2,000 or stall sales under 250 loaves a week for a month triggers an immediate review.”`,
  why:`It keeps risk on the agenda where decisions are made and uses clear signs to act early.`,
  reflect:`What early warning sign would tell you that the biggest risk to your launch is growing?`,
  exercise:`Set your risk review routine and early warning indicators from launch.`,
  fields:{
   routine:{label:`Risk review routine`,hint:`Which risks, how often, by whom, reported to whom (founders, adviser, later the board).`},
   warnings:{label:`Early warning indicators`,hint:`Risk | warning sign (e.g. loaves sold at the stall) | threshold (e.g. under 250 a week for a month) | who watches it (you or a co-founder).`}
  },
  check:`Will you notice a growing risk before it becomes a crisis for something so new?`
 },
 'compliance-pack':{title:`Your Compliance & Risk Pack`}
});

// Legal and policy lessons (10.1–10.9) are reading only: what each duty, policy or procedure is, with examples, and
// the templates to adapt. Risk lessons (10.10–10.12) keep their exercises. HR and workplace policies is left out.
const T={all:'legal-templates.html',policies:'legal-templates-policies.html',procedures:'legal-templates-policies.html',contracts:'legal-templates-contracts-and-agreements.html',consent:'legal-templates-consent-forms.html',governance:'legal-templates-governance-and-compliance.html'};
// Each template links to its own card on its category page; the anchor is its slug in assets/legal-templates/catalog.json.
Object.assign(T,{
 'Code of Conduct':`${T.policies}#code-of-conduct`,'Safeguarding Policy and Procedure':`${T.policies}#safeguarding-policy-and-procedure`,'Anti-Harassment, Intimidation and Bullying Policy and Procedure':`${T.policies}#anti-harassment-intimidation-and-bullying-policy-and-procedure`,'Whistleblowing Policy and Procedure':`${T.policies}#whistleblowing-policy-and-procedure`,'Conflict of Interest Policy':`${T.policies}#conflict-of-interest-policy`,'Fraud, Bribery and Corruption Policy and Procedure':`${T.policies}#fraud-bribery-and-corruption-policy-and-procedure`,'Data Protection Policy':`${T.policies}#data-protection-policy`,'Privacy Notice':`${T.policies}#privacy-notice`,
 'Incident Reporting Procedure':`${T.procedures}#incident-reporting-procedure`,'Complaints and Feedback Procedure':`${T.procedures}#complaints-and-feedback-procedure`,'Data Rights Request Procedure':`${T.procedures}#data-rights-request-procedure`,'Data Breach Response Procedure':`${T.procedures}#data-breach-response-procedure`,
 'Co-founder Agreement':`${T.contracts}#co-founder-agreement`,'Employment Contract':`${T.contracts}#employment-contract`,'Volunteer Agreement':`${T.contracts}#volunteer-agreement`,'Independent Contractor Agreement':`${T.contracts}#independent-contractor-agreement`,'Services Agreement':`${T.contracts}#services-agreement`,'Mutual Confidentiality Agreement':`${T.contracts}#mutual-confidentiality-agreement`,'Partnership Memorandum of Understanding':`${T.contracts}#partnership-memorandum-of-understanding`,'Sub-grant Agreement':`${T.contracts}#sub-grant-agreement`,'Data Sharing Agreement':`${T.contracts}#data-sharing-agreement`,
 'Photo and Story Consent Form':`${T.consent}#photo-and-story-consent-form`,'Information Sharing Consent Form':`${T.consent}#information-sharing-consent-form`,'Research Participation Consent Form':`${T.consent}#research-participation-consent-form`,
 'Legal Review Checklist':`${T.governance}#legal-review-checklist`,'Records Retention Schedule':`${T.governance}#records-retention-schedule`,'Board Interest Declaration':`${T.governance}#board-interest-declaration`,'Data Protection Impact Assessment':`${T.governance}#data-protection-impact-assessment`});
const NAMES={all:'All legal templates',policies:'Policy and procedure templates',procedures:'Policy and procedure templates',contracts:'Contract and agreement templates',consent:'Consent form templates',governance:'Governance and compliance templates'};
// A group with templates gives one link per template, named by its title; a group without (e.g. 'all') links to the page.
const tpl=(...groups)=>({links:groups.flatMap(([k,items])=>items?.length?items.map(i=>({href:T[i]||T[k],label:i,items:[]})):[{href:T[k],label:NAMES[k],items:[]}])});
const READING={
 'legal-map':{templates:tpl(['governance',['Legal Review Checklist','Records Retention Schedule']],['all']),
  anatomy:{after:1,title:'Areas on your legal map',intro:'Most new initiatives meet the same areas. Not all of them will apply to you, and the rules in each depend on where you operate.',cols:['Area','What it usually covers','In the bakery'],rows:[
   ['Registration and governance','Registering your legal form, founding documents, yearly filings, who may sign for you','Informal for the three-month pilot, then registering as a company with a social purpose'],
   ['Tax','Registering for tax, sales tax or VAT, keeping records, filing returns','Registered for tax before the first sale; the accountant files the returns'],
   ['Employment','Contracts, minimum pay, working hours, rules for young workers, social security','Paid traineeship agreements, with extra limits on hours for trainees aged 17'],
   ['Health, safety and product rules','Safe premises and equipment, licences, labelling','Food business registration, hygiene certificates, allergen labels, kitchen safety checks'],
   ['Data protection','How you collect, store, share and delete personal information','Trainees’ records and cake-order lists'],
   ['Safeguarding','Protecting the children and adults at risk you work with','Trainees aged 17 and the mentors who supervise them'],
   ['Fundraising, consumer and advertising rules','Grant conditions, donations, selling to the public, honest claims','The youth-fund grant conditions; no “homemade” claim on bought-in products'],
   ['Insurance','Cover the law or your contracts require','Public liability and product insurance for the stall']]}},
 'policy-needs':{templates:tpl(['policies',['Privacy Notice','Safeguarding Policy and Procedure','Conflict of Interest Policy']],['procedures',['Incident Reporting Procedure','Complaints and Feedback Procedure','Data Rights Request Procedure']],['all'])},
 contracts:{templates:tpl(['contracts',['Co-founder Agreement','Employment Contract','Volunteer Agreement','Independent Contractor Agreement','Services Agreement','Mutual Confidentiality Agreement','Partnership Memorandum of Understanding','Sub-grant Agreement','Data Sharing Agreement']]),
  anatomy:{after:0,title:'Agreements a new initiative often signs',intro:'You may sign several of these before you are fully set up. Each one settles different questions.',cols:['Agreement','What it settles','In the bakery'],rows:[
   ['Co-founder agreement','Who owns what, who does what, how you decide, what happens if a founder leaves','Shares, roles and a leaving clause for the two co-founders'],
   ['Lease or rental','Use of a space, cost, length, who pays for damage','The shared-kitchen slot and the market pitch'],
   ['Supplier and customer contracts','What is delivered, prices, payment, quality, how it ends','Wholesale terms with the two cafés and the canteen; the flour supplier'],
   ['Grant agreement','What the money is for, reporting, what happens if plans change','The US$6,000 youth-fund grant'],
   ['Partnership agreement or memorandum of understanding','Who does what together, and whether it is legally binding','Referrals from the youth centre'],
   ['Employment, traineeship and volunteer agreements','Role, pay, hours, conduct, how it ends','Each trainee’s six-month agreement; the volunteer mentors'],
   ['Data-sharing agreement','What personal data is shared, why and how it is protected','Referral information from the youth centre']]}},
 'core-policies':{templates:tpl(['policies',['Code of Conduct','Conflict of Interest Policy','Fraud, Bribery and Corruption Policy and Procedure','Anti-Harassment, Intimidation and Bullying Policy and Procedure']],['governance',['Board Interest Declaration']]),
  anatomy:{after:1,title:'The core set',intro:'Four short policies cover most of what a new team needs. Write them before habits form.',cols:['Policy','What it says','In the bakery'],rows:[
   ['Code of conduct','The behaviour expected of everyone involved','Respect in the kitchen, care with trainees, report any concern'],
   ['Conflict of interest','Declare personal interests and step out of decisions they could sway','A co-founder’s cousin supplies flour, so the other co-founder decides on the order'],
   ['Anti-fraud, bribery and corruption','Fraud, bribes and improper gifts are never accepted; how money is controlled; how to report','Two people count the stall’s takings; no extra “fee” to speed up a licence'],
   ['Anti-harassment and bullying','Everyone is protected, with a safe route for complaints','A trainee can go to the youth-centre manager, not only to the founders']]}},
 safeguarding:{templates:tpl(['policies',['Safeguarding Policy and Procedure','Code of Conduct','Whistleblowing Policy and Procedure']],['consent',['Photo and Story Consent Form']],['procedures',['Incident Reporting Procedure']])},
 'data-protection':{templates:tpl(['policies',['Data Protection Policy','Privacy Notice']],['procedures',['Data Rights Request Procedure','Data Breach Response Procedure']],['consent',['Information Sharing Consent Form','Research Participation Consent Form']],['governance',['Records Retention Schedule','Data Protection Impact Assessment']]),
  anatomy:{after:0,title:'The principles in practice',intro:'The wording differs from country to country, but these principles appear in most data protection laws.',cols:['Principle','What it means','In the bakery'],rows:[
   ['A clear, lawful purpose','Know why you collect each piece of information, and on what legal basis','Trainee records, to run the traineeship and pay wages'],
   ['Only what you need','Do not collect information “just in case”','No copies of school reports; only a name and phone number for cake orders'],
   ['Accurate and secure','Keep it up to date, protected and seen only by those who need it','A folder only the two co-founders can open'],
   ['No longer than needed','Delete it when its purpose ends','Cake-order lists deleted after three months'],
   ['Open with people','Tell people what you do with their information','A short privacy notice at the stall and in the traineeship pack'],
   ['People’s rights','Let people see, correct or delete their information','A trainee can ask for a copy of their record']]}},
 whistleblowing:{templates:tpl(['procedures',['Incident Reporting Procedure','Complaints and Feedback Procedure']])},
 procedures:{templates:tpl(['procedures',['Incident Reporting Procedure','Complaints and Feedback Procedure','Data Rights Request Procedure']]),
  anatomy:{after:0,title:'Parts of a usable procedure',intro:'The same five parts work for almost any task. The example is how the bakery labels a batch.',cols:['Part','What it says','In the bakery: labelling a batch'],rows:[
   ['What starts it','The moment the procedure applies','A batch comes out of the oven'],
   ['Who','Who does it, and who checks','The person who baked it; a co-founder signs off'],
   ['Steps','The actions, in order','Check against the recipe card, label ingredients, allergens and bake date, record it on the batch sheet'],
   ['Records','What is written down, and where','The batch sheet in the kitchen folder'],
   ['Exceptions','What to do when something goes wrong','A batch that fails is tagged “not for sale” and kept apart']]}},
 lifecycle:{templates:tpl(['governance',['Legal Review Checklist','Records Retention Schedule']],['all']),
  anatomy:{after:0,title:'The policy cycle',intro:'Each policy goes round the same cycle, however few you have.',cols:['Stage','What happens','In the bakery'],rows:[
   ['Draft','Write it, starting from a template adapted to your local laws','The safeguarding policy, from a template, checked against local rules'],
   ['Consult','Ask the people it affects','The youth centre and two trainees read it first'],
   ['Approve','The right person or body signs it off','Both co-founders now; the advisory group later'],
   ['Share and train','Everyone who must follow it reads and understands it','Trainees and mentors on their first day'],
   ['Check','See whether it is followed in practice','A look at the batch sheets and incident forms each month'],
   ['Review','Update it on schedule, or after a change or an incident','Every year, or after any incident']]}}
};
for(const [id,x] of Object.entries(READING)){
 const l=m.lessons.find(y=>y.id===id);
 Object.assign(l,{reflect:'',exercise:'',check:'',fields:[],templates:x.templates});
 if(x.anatomy)l.anatomy=x.anatomy;
}
m.lessons=m.lessons.filter(l=>l.id!=='hr-policies');
m.merged={'hr-policies':'core-policies'}; // its old address leads to the core policies
export default m;
