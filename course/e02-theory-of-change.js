import base from './m02-theory-of-change.js';
import {adapt} from './adapt.js';
// Entrepreneurs' version of m02: same lessons, fields, workbook and tools; wording for people building something new.
export default adapt(base,{
 title:'Theory of Change',
 short:'From the problem you want to solve to long-term impact, with the assumptions that connect them',
 intro:'Explain how the work you are planning could contribute to change. Work backwards from the future you seek, then check the pathway forwards. Build one pathway for each external objective. Before you launch, your map is a reasoned hypothesis to test with the people affected, not proof that your idea works.',
 output:'Theory of Change',
 promo:{
  headline:'See your whole pathway on one living map before you launch',
  pitch:'The Theory of Change Builder draws every pathway from inputs to impact, keeps assumptions and evidence beside each link, and saves review snapshots so you can show how your thinking changed as your idea took shape. Import this module’s Pathways sheet to start.'
 }
},{
 understanding:{
  learn:[
   'A Theory of Change makes your reasoning explicit: if we do this work, why might a particular change follow? It covers the context, the people involved, the sequence of changes and the assumptions that connect them. Writing it before you launch lets you test your idea on paper first. Social enterprises and startups sometimes call the same thing an impact thesis or impact logic.',
   'A pathway runs from inputs to activities, outputs, outcomes and impact. A diagram helps people see it, but arrows alone do not explain it. Add a short sentence on each important connection, and test your reasoning against what future participants or customers tell you and what others working on the issue have already learned.',
   'Separate three spheres. You will control your activities and outputs. You will influence the changes in the people and institutions you work with directly. You can only contribute to the wider impact, which many actors shape. Make your claims more modest as you move outwards, especially while your idea is still untested.',
   'Build one pathway for each external strategic objective (ESO) you set in Module 1. Internal objectives do not need their own pathway; they appear as inputs and conditions, such as the team, money and skills you still have to build. Expect your theory to change once you start, and revisit it when evidence contradicts it.'
  ],
  weak:'Our training will create jobs.',
  strong:'“ESO2: if young people who left school early bake in a real bakery for six months and earn a food-hygiene certificate, and local food businesses trust that experience, then more of them will get a first paid job, because experience is what employers ask for and what they could not get before.”',
  why:'It names the condition between training and a job: local food businesses have to trust and hire the young people the bakery trains. That is something you can check before you launch, by asking the cafés and the canteen that already buy from you.',
  reflect:'What has to happen outside your own initiative for your idea to work?',
  exercise:'Write a short “if… then… because…” explanation of the change you hope to bring about for your first external objective.',
  check:'Have you explained the connection rather than only drawing an arrow, and marked what is still a guess?',
  fields:{
   logic:{label:'Our founding change argument',hint:'Include the objective code, the people you want to reach, the change and why you expect it. A first draft is fine; you will test it.'}
  },
  anatomy:{
   title:'The parts of a pathway',
   intro:'Each part sits in a sphere; your claims get more modest as you move down the table. The example is our bakery’s training pathway during the pilot.',
   cols:['Part','Sphere and meaning','Example: our bakery, ESO2'],
   rows:[
    ['Inputs','Control: the resources you will put in','Two founders’ time, a rented slot in a shared kitchen, a market stall, trainee pay, a US$6,000 youth-fund grant'],
    ['Activities','Control: what you will do','Recruit trainees with the youth centre, bake and sell together, give each trainee a mentor, prepare them for the hygiene certificate'],
    ['Outputs','Control: what you will deliver, counted','4 six-month paid traineeships in year 1, 4 food-hygiene certificate courses'],
    ['Outcomes','Influence: changes in the people you work with','Trainees gain baking skills and work habits; 3 of 4 finish and 2 find a job within three months'],
    ['Impact','Interest: wider change many actors shape','More young people in the neighbourhood who left school early in stable, decent work']
   ]
  }
 },
 problem:{
  learn:[
   'Describe the current situation, who experiences it and what keeps it in place. Separate symptoms from causes, and keep the problem separate from the solution you have in mind. Many founders start with a solution they love. “There is no service like ours” or “not enough workshops” may be what you notice, but it is rarely the underlying problem.',
   'A problem tree keeps this practical. Write the core problem on the trunk, its causes as roots and its consequences as branches. Keep asking “why does this happen?” until you reach causes that a small, new initiative could realistically influence.',
   'Build the tree with the people affected, not for them, even before you have anything to offer. Talk to them, ask what they see as the main barriers and what strengths already exist, and note whose view is missing. Do not collect personal stories or sensitive data without a good reason and safeguards.',
   'Choose a scope you can influence with the time and resources you will have at the start. Mark uncertain causes as hypotheses and note what evidence could prove you wrong. Your context analysis in Module 1 shows what else is happening; this lesson explains why the problem persists and whether your idea addresses a real cause.'
  ],
  weak:'There is no training bakery like the one we want to start.',
  strong:'“Young people in our neighbourhood who left school early struggle to find a first job, because employers ask for experience and certificates they cannot get, and unpaid courses do not pay the rent.”',
  why:'It describes the barrier and its causes without naming the initiative the founders plan to start as the answer.',
  reflect:'Which cause is supported by evidence, and which is still a guess you need to check?',
  exercise:'Write the problem you want to work on, its scope, likely causes and one question to investigate before you launch.',
  check:'Is the problem separate from the solution you hope to offer?',
  fields:{
   problem:{label:'Problem and scope',hint:'Who, where, what barrier and what consequence? Describe it without mentioning your idea.'},
   causes:{label:'Causes and evidence',hint:'List what you know, what the people affected have told you and what is still uncertain.'}
  },
  anatomy:{
   title:'A problem tree in three parts',
   intro:'Start with the trunk, then dig down to causes and up to consequences. The example is the problem behind our bakery’s training.',
   cols:['Part','Question to ask','Example: our bakery'],
   rows:[
    ['Trunk: core problem','What is the problem, for whom and where?','Young people who left school early in our neighbourhood cannot find a first paid job'],
    ['Roots: causes','Why does this happen? Ask again for each answer.','No work experience, no recognised certificate, employers wary of the risk, unpaid courses they cannot afford, low confidence'],
    ['Branches: consequences','What happens because of it?','Long spells without work, low income, insecure jobs, young people leaving the neighbourhood']
   ]
  }
 },
 impact:{
  learn:[
   'Impact is the longer-term change in people’s lives or in environmental conditions that the work you are starting aims to contribute to. It may take years, often longer than your first plans cover, and it depends on many actors beyond your founding team.',
   'Start from your vision and from the external strategic objective (ESO) this pathway serves. Name whose lives or which conditions should improve, and make the statement narrow enough to guide your early decisions without claiming the whole future as yours.',
   'Be honest about what you will be able to show. An improvement you observe does not by itself prove your work caused it. For almost every new initiative, contribution rather than attribution is the honest claim, so name who else plays a part. Funders, investors and partners tend to trust founders who say this plainly.'
  ],
  weak:'Our idea will eliminate poverty.',
  strong:'“ESO2: contribute, over ten years or more, to more young people in our neighbourhood who left school early having stable, decent work.”',
  why:'It names the people and the condition, links to the vision and claims contribution rather than sole credit.',
  reflect:'What wider change would still matter after a participant leaves your programme or a customer stops using your service?',
  exercise:'Draft your impact statement and identify the other actors who already influence it.',
  check:'Does the statement acknowledge the limits of what a new initiative can control?',
  fields:{
   impact:{label:'Long-term impact',hint:'Use your vision and objective as a starting point; name the population and the condition you want to see.'},
   actors:{label:'Other influences',hint:'Which organisations, policies, markets or wider conditions already shape this change? For example: the youth centre, local employers, public job schemes, the cost of living.'}
  }
 },
 outcomes:{
  learn:[
   'Outcomes are the changes your work will help bring about in people, relationships, institutions or conditions: a new skill, a different choice, a changed rule. They sit between what you deliver and the long-term impact. A count of trainees enrolled is an output; a trainee who can now run the morning bake without help is showing an outcome.',
   'Work backwards from your impact. What has to change just before it becomes more likely? What earlier change makes that possible? Arrange the answers as short-term, medium-term and long-term outcomes. Keep a few strong links rather than filling a diagram with every possibility; a small new team can only follow a few.',
   'For each outcome, note the evidence that would show it is happening, such as an observed skill, a job offer or a new local rule. Think now about what a small team could realistically collect from the first day. You do not need indicators yet; you will turn these signals into indicators, baselines and targets in Module 6.',
   'Look for effects you did not intend, including unequal ones. Who might be left out, take on extra work or be affected differently? Naming these before you launch lets you design them out rather than fix them later.'
  ],
  weak:'Four trainees will attend.',
  strong:'“Trainees gain baking skills and the habits of a working day, then earn a food-hygiene certificate, then at least 2 of 4 find a job within three months of finishing.”',
  why:'It describes changes in the trainees, in a sequence, rather than counting who turned up.',
  reflect:'Whose behaviour or circumstances would need to change first?',
  exercise:'List the early and later outcomes you expect, with the kind of evidence that would show each one.',
  check:'Are your outcomes changes rather than a list of planned activities?',
  fields:{
   outcomes:{label:'Expected outcome sequence',hint:'Short-term → medium-term → long-term change (e.g. trainees bake to standard → earn the certificate → find a job) | evidence a small team could collect (a weekly skills checklist; job offers at three months).'},
   unintended:{label:'Possible unintended effects',hint:'Who might be excluded, burdened or affected differently once you start? For example: young people who cannot reach an early shift, or who care for a child.'}
  }
 },
 outputs:{
  learn:[
   'Outputs are the immediate products and services your activities will deliver: loaves baked and sold, traineeships completed, certificates gained, wholesale orders delivered. They will be mostly within your control, and they show whether delivery happened, not whether anyone’s life improved.',
   'Describe quality and reach as well as quantity. Ten sessions the intended people cannot reach are not the same as ten accessible, relevant ones. For each output, say who it is for and how you will check it was good enough. Set first-year numbers you can realistically deliver, and raise them as you grow.',
   'Use outputs to manage delivery, and keep them apart from outcomes, or a busy launch gets reported as an effective one. A simple test: you can usually count an output on the day it happens; an outcome takes weeks, months or years to show.'
  ],
  weak:'We will raise awareness in the community.',
  strong:'“In our first year: four six-month paid traineeships for young people referred by the youth centre, each with a mentor and a food-hygiene course; 300 loaves a week at the Saturday stall, every batch checked against our recipe and hygiene log.”',
  why:'It gives a deliverable, a quantity, the intended reach and a quality check that can all be verified.',
  reflect:'What evidence would show that you delivered the service you promised?',
  exercise:'List the outputs your outcomes will need in your first year, including quality and reach.',
  check:'Can you verify each output without assuming it caused an outcome?',
  fields:{
   outputs:{label:'Planned outputs',hint:'Product or service (e.g. paid traineeships) | first-year quantity (e.g. 4) | intended reach (e.g. young people who left school early, referred by the youth centre) | quality check (each trainee has a mentor and a hygiene course).'}
  },
  anatomy:{
   title:'Output or outcome?',
   intro:'The same pathway, one step apart. Both examples come from our bakery’s pilot.',
   cols:['Question','Output','Outcome'],
   rows:[
    ['What is it?','Something you deliver','A change in people, institutions or conditions'],
    ['Who controls it?','Mostly you and your founding team','You contribute; other people and the context matter too'],
    ['When can you see it?','On the day of delivery','Weeks, months or years later'],
    ['Example: our training (ESO2)','4 six-month paid traineeships','Trainees find a first paid job'],
    ['Example: our bread (ESO3)','300 loaves a week at the market stall','Local families buy good bread at a fair price']
   ]
  }
 },
 activities:{
  learn:[
   'Activities are the actions you, your co-founders and any partners will take to produce your outputs. Start each one with a verb and give enough detail to estimate the work and assign it: agree referrals with the youth centre, book kitchen time, recruit trainees, run training shifts, follow up.',
   'Check every activity against an output. If an activity supports no output, either add the missing output or drop the activity. Then add the work that is easy to forget when you are starting: preparation, permissions, registration steps, coordination, safeguarding and follow-up.',
   'Ask whether each activity is feasible and acceptable where you plan to work. A sound plan can still fail if the timing, language, cost of taking part or local custom keeps people away. Check with the people involved, ideally through a small trial, before you fix dates.'
  ],
  weak:'Do community engagement.',
  strong:'“Recruit four trainees for the first six-month cohort with the youth centre, agree start dates and sign paid traineeship contracts before the first shift.”',
  why:'The action is specific enough to assign, schedule and link to an output: traineeship places filled.',
  reflect:'What preparation is easy to overlook before your first activity?',
  exercise:'List the main activities you plan and the output each supports.',
  check:'Does every activity have a clear purpose in the pathway?',
  fields:{
   activities:{label:'Planned activities and outputs',hint:'Action (e.g. agree referrals with the youth centre) | output supported (e.g. 4 traineeships filled) | partner or who will be responsible (founder, partner, future hire).'}
  }
 },
 inputs:{
  learn:[
   'Inputs are the resources your activities need: people’s time and skills, money, equipment, space, information, relationships and permissions. Your own time, your co-founders’ time, volunteer time and members’ labour are inputs even when no one is paid for them.',
   'Separate what you already have from what you still need to secure, and note limits such as time, permissions or rules. At the start most inputs are gaps, and that is normal. Your internal strategic objectives (ISO1, ISO2 and so on) often describe how you will build the inputs that are missing.',
   'Match resources to activities. If one founder holds several specialist roles, you may need a smaller first scope or extra support. You will cost these inputs properly in Module 9; here, aim for a clear list and honest gaps.'
  ],
  weak:'We need to raise money.',
  strong:'“A rented slot in a shared kitchen, a pitch at the Saturday market, flour and ingredients, the baker’s time to mentor and pay for four trainees. Trainee pay is the main gap: the US$6,000 youth-fund grant covers part of it.”',
  why:'It names the resources, links them to activities and shows what funding would actually pay for.',
  reflect:'Which missing resource could stop you starting at all?',
  exercise:'List the main inputs you will need, what you already have and the gaps.',
  check:'Have you included your own time, other people’s time and access needs as well as money?',
  fields:{
   inputs:{label:'Founding resource plan',hint:'Resource (e.g. kitchen slot) | activity supported (e.g. training shifts) | available now (e.g. two days a week) | gap (e.g. a third day) | how to secure it (ask the shared kitchen for a weekday rate).'}
  }
 },
 assumptions:{
  learn:[
   'An assumption is something that must be true for one step in your pathway to lead to the next. At each link, ask: “what has to be true for this to happen?” Before you launch, almost every link rests on assumptions. Collect them here, alongside what you already know about each one.',
   'Make each assumption specific enough to check. “The bakery succeeds” cannot be tested; “the two cafés will buy wholesale every week” can. Prioritise the ones that are both important and uncertain. Check them cheaply before you commit money: ask future participants, look at existing records or run a small pilot. Decide in advance what you will do if one turns out to be false.',
   'Keep external risks separate from your response to them. You cannot control a rise in flour prices or the rent for a shared kitchen, but you can plan around them. Note the risks that sit on your pathway now; Module 10 shows how to carry them into a risk register.'
  ],
  weak:'Participants will benefit.',
  strong:'“Trainees can stay for six months on the wage we plan to pay. Test it before launch by asking ten young people what they would need to stay, then ask the first cohort again at months two and four.”',
  why:'It names an uncertain condition on one link, and low-cost ways to find out early whether it holds.',
  reflect:'Which assumption would most change your plan if it were false?',
  exercise:'Write your critical assumptions, the evidence you have so far and how you will test them before and after you launch.',
  check:'Have you identified evidence that could challenge the idea you are most attached to?',
  fields:{
   assumptions:{label:'Assumptions and tests',hint:'Connection (e.g. activities → outputs) | assumption (e.g. trainees can reach a 6am shift) | current evidence (e.g. none yet) | test (e.g. ask the first four trainees) | decision if false (move the first shift to 8am).'}
  },
  anatomy:{
   title:'Where assumptions sit',
   intro:'Every arrow in your pathway carries at least one assumption. The examples come from our bakery’s training pathway.',
   cols:['Link','Question to ask','Example'],
   rows:[
    ['Inputs → activities','Will the resources really be there when needed?','The shared kitchen will keep our slot at the same rent for the whole year.'],
    ['Activities → outputs','Can people take part as planned?','Young people referred by the youth centre can reach a 6am shift.'],
    ['Outputs → short-term outcomes','Does what we deliver lead to change?','Six months of real shifts are enough to learn the core skills.'],
    ['Short-term → longer-term outcomes','Does the early change carry on?','Skills and a certificate will turn into job offers.'],
    ['Outcomes → impact','Do wider conditions allow the change to last?','Local food businesses will keep hiring the young people we train.']
   ]
  }
 },
 use:{
  learn:[
   'A Theory of Change is useful when people can read it, question it and use it to decide. For each pathway, write a one-page narrative in plain language: the problem, the change you want, the main steps, the key assumptions and the evidence behind them. It will also help you explain your idea to co-founders, partners and early funders or customers.',
   'Test it with people who know the issue: future participants or customers, people already working on the problem, possible partners and at least one sceptic. Ask where the logic is weakest. Record what you changed as a result, and give the document a version number and a date. A first draft before launch is honestly version 0.1.',
   'Then use it. Your Theory of Change feeds your indicators in Module 6, the way you present your idea to funders, customers and partners, and your first-year priorities. Review it after your pilot or first year, then at least once a year, and sooner if a failed assumption, new evidence or a big change in context tells you something is wrong.'
  ],
  weak:'Our Theory of Change diagram is finished.',
  strong:'“Version 0.2, March: after testing with eight young people at the youth centre, two café owners and the local youth fund, we added a fortnightly mentor check-in for each trainee as an output. Next review after the first six-month cohort.”',
  why:'It shows who tested the pathway, what changed because of their feedback and when it will be reviewed.',
  reflect:'Who is best placed to tell you your pathway is wrong before you launch?',
  exercise:'Plan how you will test your Theory of Change before you launch, then write the version and review plan.',
  check:'Could someone outside your founding team follow your logic from the narrative alone?',
  fields:{
   testing:{label:'Testing plan',hint:'Who will review the pathway (future participants or customers, partners, a sceptic), how, and by when?'},
   narrative:{label:'One-page narrative',hint:'Problem, intended change, main steps, key assumptions and evidence, in plain language anyone could follow.'},
   review:{label:'Version and review',hint:'Version (0.1 before launch), date, next review (for example after your pilot) and what would trigger an earlier review.'}
  }
 },
 pathway:{title:'Your Theory of Change'}
});
