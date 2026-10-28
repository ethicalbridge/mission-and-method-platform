import base from './m02-theory-of-change.js';
import {adapt} from './adapt.js';
// Entrepreneurs' version of m02: same lessons, fields, workbook and tools; wording for people building something new.
const m=adapt(base,{
 title:'Theory of Change',
 short:'From the problem you want to solve to long-term impact, with the assumptions that connect them',
 intro:'In this module you explain how the work you are planning could lead to the change you want to see. You first look at a whole Theory of Change, then build your own one step at a time, the way the work will happen: the problem, the inputs, the activities, the outputs, the outcomes and the long-term impact. Finally, you test the assumptions that connect the steps and read the whole pathway back to check every link. Before you launch, it is a reasoned hypothesis to test with the people affected, not proof that your idea works.',
 output:'Theory of Change',
 promo:{
  headline:'See your whole pathway on one living map before you launch',
  pitch:'The Theory of Change Builder draws every pathway from inputs to impact, keeps assumptions and evidence beside each link, and saves review snapshots so you can show how your thinking changed as your idea took shape. Import this module’s Pathways sheet to start.'
 }
},{
 understanding:{
  learn:[
   "A Theory of Change makes your reasoning explicit: if we do this work, why should a particular change follow? It sets out, step by step, how what you plan to do is expected to lead to the change you want to see, and the assumptions that connect each step to the next. Writing it before you launch lets you test your idea on paper, when changing it still costs little. Social enterprises and startups sometimes call the same thing an impact thesis or impact logic.",
   "Every Theory of Change follows the same chain. It starts with the problem you want to solve. To tackle it, you will need resources (inputs), which you use to carry out your work (activities). Your activities deliver products and services you can count (outputs), which lead to changes for the people you work with (outcomes). Over time, and together with others, those changes contribute to a wider, lasting change (long-term impact). Here is what the whole chain looks like for our bakery.",
   "Notice the label on each step. You control your inputs, activities and outputs: they depend mainly on you. You can influence outcomes, because they happen in the people you work with directly, but they also depend on those people and on their circumstances. You can only contribute to the long-term impact, which many other people, organisations and conditions shape. That is why your claims should become more modest as you move down the chain, especially while your idea is still untested.",
   "The arrows alone do not explain a Theory of Change; the short “because” lines do. Write one for each important link, and check your reasoning against what future participants or customers tell you and what others working on the same issue have already learned. Build one pathway for each external strategic objective (ESO) you set in Module 1. Internal objectives do not need their own pathway; they appear as inputs and conditions, such as the team, money and skills you still have to build.",
   "In the lessons that follow, we build your own Theory of Change one step at a time, in the same order as the example: the problem you are trying to solve (2.2), then your inputs (2.3), activities (2.4), outputs (2.5), outcomes (2.6) and long-term impact (2.7). You fill in one table as you go, a column per lesson, so each step builds on the one before and you can always see the whole chain. Finally, you add the assumptions that hold the links together (2.8), the table’s last column, and your Theory of Change is complete. Expect it to change once you start, and revisit it whenever evidence contradicts it."
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
  anatomy:null,
  // The whole pathway at once, so learners see where they are heading before 2.2–2.7 build it step by step.
  tocExample:{
   after:1,
   title:'A whole Theory of Change: our bakery, ESO2',
   intro:'This is a complete, simple Theory of Change for our bakery’s second external objective (ESO2): young people who left school early gain baking skills and a first paid job. Read it from top to bottom. Each step leads to the next, and the short lines between them say why we expect it to.',
   steps:[
    {label:'The problem',sphere:'What we want to change',text:'Young people in our neighbourhood who left school early struggle to find a first job: employers ask for experience and certificates they cannot get, and unpaid courses do not pay the rent.'},
    {label:'Inputs',sphere:'Control',text:'Two founders’ time, a rented slot in a shared kitchen, a Saturday market stall, ingredients, trainee pay and a US$6,000 youth-fund grant.',because:'so we put in what a real bakery and a paid traineeship need'},
    {label:'Activities',sphere:'Control',because:'so the team can put these resources to work every week',text:'Recruit trainees with the youth centre, bake and sell together every week, give each trainee a mentor and prepare them for the food-hygiene certificate.'},
    {label:'Outputs',sphere:'Control',because:'which delivers something we can count',text:'In year 1: four six-month paid traineeships, each with a mentor and a food-hygiene course; 300 loaves a week at the stall.'},
    {label:'Outcomes',sphere:'Influence',text:'Trainees gain baking skills and the habits of a working day and earn the certificate; 3 of 4 finish and 2 find a job within three months.',because:'because real work, a wage and a mentor build skills and confidence'},
    {label:'Long-term impact',sphere:'Contribute',text:'More young people in our neighbourhood who left school early have stable, decent work.',because:'because they now have the experience employers ask for'}
   ],
   assumptions:['Trainees can stay for six months on the wage we pay.','Local cafés and food businesses trust a bakery traineeship as real experience.','Sales at the stall and to the cafés keep the kitchen running.'],
   summary:'If young people who left school early bake in a real bakery for six months and earn a food-hygiene certificate, and local food businesses trust that experience, then more of them will get a first paid job, because experience is what employers ask for and what they could not get before.'
  }
 },
 problem:{
  connects:{after:0,step:'problem',why:'Everything else in your Theory of Change answers this problem. If it is vague or wrong, you could deliver every activity well and still change nothing that matters.',from:"Your purpose, your context analysis and the external objective (ESO) you set in Module 1. They say what you care about; this step says precisely what is wrong and why it persists.",to:"Your inputs and activities. The causes you name here decide what you will need and what you will do. For our bakery, “no work experience” is a cause, so the answer is real paid work in a bakery, not another classroom course."},
  learn:[
   "Your Theory of Change starts with the problem, because every later step is an answer to it. Describe the current situation, who experiences it and what keeps it in place. Separate symptoms from causes, and keep the problem separate from the solution you have in mind. Many founders start with a solution they love. “There is no service like ours” or “not enough workshops” may be what you notice, but it is rarely the underlying problem.",
   "A problem tree keeps this practical. Write the core problem on the trunk, its causes as roots and its consequences as branches. Keep asking “why does this happen?” until you reach causes that a small, new initiative could realistically influence. Those causes are what your activities will later need to tackle.",
   "Build the tree with the people affected, not for them, even before you have anything to offer. Talk to them, ask what they see as the main barriers and what strengths already exist, and note whose view is missing. Do not collect personal stories or sensitive data without a good reason and safeguards.",
   "Choose a scope you can influence with the time and resources you will have at the start. Mark uncertain causes as hypotheses and note what evidence could prove you wrong. This is where your Theory of Change table starts: write the problem in its first column, one row for each cause you choose to tackle. In the next lesson you work out the resources you will need for each."
  ],
  weak:'There is no training bakery like the one we want to start.',
  strong:'“Young people in our neighbourhood who left school early struggle to find a first job, because employers ask for experience and certificates they cannot get, and unpaid courses do not pay the rent.”',
  why:'It describes the barrier and its causes without naming the initiative the founders plan to start as the answer.',
  reflect:'Which cause is supported by evidence, and which is still a guess you need to check?',
  exercise:'Start your Theory of Change table. In the Problem column, write the problem you want to work on, one row for each cause you will tackle: who is affected, what barrier they face and why it persists. The other columns stay locked for now; you will fill them in, one at a time, in the next lessons.',
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
  connects:{after:0,step:'impact',why:'Impact is the reason the whole pathway exists. It keeps your early decisions pointed at the change that matters and links your daily work back to your vision.',from:"Your outcomes, added up over years and together with the work of others: trainees who gain skills and a first job contribute to more young people in stable work.",to:"Back to the problem. Read your pathway from impact down to the problem: does this impact really answer the problem you defined in 2.2? Then test each link in the next lesson, on assumptions."},
  learn:[
   "The last step in the chain is the long-term impact: the lasting change in people’s lives or in environmental conditions that your outcomes, added up over time, contribute to. It may take years, often longer than your first plans cover, and it depends on many actors beyond your founding team.",
   "Start from your vision and from the external strategic objective (ESO) this pathway serves. Name whose lives or which conditions should improve, and make the statement narrow enough to guide your early decisions without claiming the whole future as yours. Several rows of your Theory of Change table will usually share the same impact.",
   "Be honest about what you will be able to show. An improvement you observe does not by itself prove your work caused it. For almost every new initiative, contribution rather than attribution is the honest claim, so name who else plays a part. Funders, investors and partners tend to trust founders who say this plainly.",
   "With this column filled in, each row of your table reads as a full chain. Read it from left to right, from the problem to the impact, and then back from the impact to the problem: does the chain still hold? The next lesson adds the last column, the assumptions behind each link."
  ],
  weak:'Our idea will eliminate poverty.',
  strong:'“ESO2: contribute, over ten years or more, to more young people in our neighbourhood who left school early having stable, decent work.”',
  why:'It names the people and the condition, links to the vision and claims contribution rather than sole credit.',
  reflect:'What wider change would still matter after a participant leaves your programme or a customer stops using your service?',
  exercise:'For each row, write the long-term impact it contributes to. Several rows can share the same impact. Keep in mind the other actors who also shape it, so your claim stays honest.',
  check:'Does each row now read as a chain from activity to impact, and does your impact acknowledge the limits of what a new initiative can control?',
  fields:{
   impact:{label:'Long-term impact',hint:'Use your vision and objective as a starting point; name the population and the condition you want to see.'},
   actors:{label:'Other influences',hint:'Which organisations, policies, markets or wider conditions already shape this change? For example: the youth centre, local employers, public job schemes, the cost of living.'}
  }
 },
 outcomes:{
  connects:{after:0,step:'outcomes',why:'Outcomes are the change you are really after for the people you work with. They show whether your idea works, not just whether you were busy.',from:"Your outputs. Once trainees finish a traineeship with a mentor and a certificate (outputs), they can gain skills and confidence (outcomes). Each link needs a “because” that explains it.",to:"The long-term impact. Outcomes add up over time: trainees who find a first job and keep it are the start of the wider change in your neighbourhood."},
  learn:[
   "Outputs only matter if they lead to change. Outcomes are the changes your work helps bring about in people, relationships, institutions or conditions: a new skill, a different choice, a changed rule. They sit between what you deliver and the long-term impact. A count of trainees enrolled is an output; a trainee who can now run the morning bake without help is showing an outcome.",
   "Work forwards from each output in your Theory of Change table. What changes first for the people you work with once they use what you deliver? What does that early change make possible next? Write the sequence in the outcome column, from short-term to longer-term change, such as “bake to standard → earn the certificate → find a job”. Keep a few strong links rather than every possibility; a small new team can only follow a few.",
   "For each outcome, note the evidence that would show it is happening, such as an observed skill, a job offer or a new local rule. Think now about what a small team could realistically collect from the first day. You do not need indicators yet; you will turn these signals into indicators, baselines and targets in Module 6.",
   "Look for effects you did not intend, including unequal ones. Who might be left out, take on extra work or be affected differently? Naming these before you launch lets you design them out rather than fix them later."
  ],
  weak:'Four trainees will attend.',
  strong:'“Trainees gain baking skills and the habits of a working day, then earn a food-hygiene certificate, then at least 2 of 4 find a job within three months of finishing.”',
  why:'It describes changes in the trainees, in a sequence, rather than counting who turned up.',
  reflect:'Whose behaviour or circumstances would need to change first?',
  exercise:'Your pathway so far is already in the table. For each output, write the change you expect it to lead to for the people you work with, from the first change to the later ones, and the evidence that would show it.',
  check:'Are your outcomes changes in people, rather than more activities or outputs?',
  fields:{
   outcomes:{label:'Expected outcome sequence',hint:'Short-term → medium-term → long-term change (e.g. trainees bake to standard → earn the certificate → find a job) | evidence a small team could collect (a weekly skills checklist; job offers at three months).'},
   unintended:{label:'Possible unintended effects',hint:'Who might be excluded, burdened or affected differently once you start? For example: young people who cannot reach an early shift, or who care for a child.'}
  }
 },
 outputs:{
  connects:{after:0,step:'outputs',why:'Outputs show that what you planned was actually delivered, to the right people and at the right quality. Without them, you cannot tell whether a missing result came from a weak idea or from work that never happened.',from:"Your activities. Outputs are what they deliver: running six-month paid traineeships delivers four completed traineeships and four food-hygiene courses.",to:"Your outcomes. Outputs are the bridge to change: four traineeships only matter if the trainees gain skills and find work, which is the next step."},
  learn:[
   "Next, for each activity, ask what it will deliver. Outputs are the immediate products and services your activities produce: loaves baked and sold, traineeships completed, certificates gained, wholesale orders delivered. They are mostly within your control, and they show whether delivery happened, not whether anyone’s life improved.",
   "Describe quality and reach as well as quantity. Ten sessions the intended people cannot reach are not the same as ten accessible, relevant ones. For each output, say who it is for and how you will check it was good enough. Set first-year numbers you can realistically deliver, and raise them as you grow.",
   "Keep outputs apart from outcomes, or a busy launch gets reported as an effective one. A simple test: you can usually count an output on the day it happens; an outcome takes weeks, months or years to show. In your Theory of Change table, write the outputs for each row; if an activity delivers nothing you can count, look at it again."
  ],
  weak:'We will raise awareness in the community.',
  strong:'“In our first year: four six-month paid traineeships for young people referred by the youth centre, each with a mentor and a food-hygiene course; 300 loaves a week at the Saturday stall, every batch checked against our recipe and hygiene log.”',
  why:'It gives a deliverable, a quantity, the intended reach and a quality check that can all be verified.',
  reflect:'What evidence would show that you delivered the service you promised?',
  exercise:'Your problem, inputs and activities are already in the table. For each activity, write the output it will deliver in your first year: what, how many, for whom and how you will check the quality.',
  check:'Can you count each output, and verify it without assuming it caused an outcome?',
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
  connects:{after:0,step:'activities',why:'Activities turn your resources into action, and they are where you will spend most of your days. Each one should tackle a cause of the problem you defined.',from:"Your inputs and the problem. The kitchen slot and the trainee pay make the training shifts possible; the lack of experience is what those shifts answer.",to:"Your outputs. Each activity should deliver something you can count: recruiting with the youth centre leads to four traineeships, and baking together leads to 300 loaves a week."},
  learn:[
   "With your inputs in view, you can plan what you will actually do with them. Activities are the actions you, your co-founders and any partners will take. Start each one with a verb and give enough detail to estimate the work and assign it: agree referrals with the youth centre, book kitchen time, recruit trainees, run training shifts, follow up.",
   "Each activity should tackle one of the causes you identified in 2.2 and use inputs you listed in 2.3. If an activity answers no cause, ask whether you need it; if it needs inputs you do not have, add them to your gaps. Then add the work that is easy to forget when you are starting: preparation, permissions, registration steps, coordination, safeguarding and follow-up.",
   "Ask whether each activity is feasible and acceptable where you plan to work. A sound plan can still fail if the timing, language, cost of taking part or local custom keeps people away. Check with the people involved, ideally through a small trial, before you fix dates.",
   "In your Theory of Change table, write the activities for each row: what you will do with those inputs to tackle that cause, and who will do it. In the next lessons you add what each activity delivers, the change it leads to and the long-term impact it contributes to."
  ],
  weak:'Do community engagement.',
  strong:'“Recruit four trainees for the first six-month cohort with the youth centre, agree start dates and sign paid traineeship contracts before the first shift.”',
  why:'The action is specific enough to assign, schedule and link to an output: traineeship places filled.',
  reflect:'What preparation is easy to overlook before your first activity?',
  exercise:'Your problem and inputs are already in the table. For each row, write the main activities you plan to tackle that cause with those inputs, and who will be responsible for them.',
  check:'Does every activity answer a cause of the problem, and does each one have someone responsible?',
  fields:{
   activities:{label:'Planned activities and outputs',hint:'Action (e.g. agree referrals with the youth centre) | output supported (e.g. 4 traineeships filled) | partner or who will be responsible (founder, partner, future hire).'}
  }
 },
 inputs:{
  connects:{after:0,step:'inputs',why:'Before you plan the work, you need to know what you have to work with. Inputs show whether your idea is realistic with the people, money and space you will have at the start.',from:"The problem. The causes you chose decide which resources matter. Our bakery’s problem is a lack of experience, so the key inputs are a real kitchen, a market stall and pay for the trainees.",to:"Your activities. Every input should be used by at least one activity, and every activity needs inputs behind it. An activity with no inputs is a wish, not a plan."},
  anatomy:{
   after:0,
   title:'Kinds of inputs',
   intro:'Go through each kind and ask: do our activities need this, do we have it, and if not, how will we get it? The examples are our bakery’s inputs for the pilot.',
   cols:['Kind of input','What it covers','Example: our bakery'],
   rows:[
    ['People (human resources)','Founders, staff, trainees, volunteers, mentors: who will do the work, and for how many hours','Two co-founders, about 30 hours a week each; four paid trainees; one volunteer mentor per trainee'],
    ['Skills and knowledge','What the team knows how to do, and what you will need to learn or bring in','Ten years of baking; six years of youth work; no bookkeeping skills yet'],
    ['Money','Your own savings, sales income, grants, loans or investment','US$4,000 of savings, a US$6,000 youth-fund grant, sales at the stall and to the cafés'],
    ['Space and premises','Where the work happens: an office, a kitchen, a workshop, a stall, a room you borrow','A rented slot in a shared kitchen, a pitch at the Saturday market'],
    ['Equipment and materials','Tools, machines, supplies and anything you use up','Mixer, trays, scales, a market gazebo; flour, butter, packaging'],
    ['IT and technology','Devices, software, a website, payment and booking systems','A laptop, a card reader for the stall, a simple order spreadsheet, a social media account'],
    ['Transport and logistics','How people, goods and materials get where they need to be','A borrowed van on Saturdays; bike deliveries to the two cafés'],
    ['Partners and relationships','Organisations and people whose support you rely on','The youth centre refers trainees; the cafés and the canteen buy wholesale'],
    ['Permissions and legal','Registrations, licences, insurance, certificates, contracts','Food business registration, public liability insurance, hygiene certificates'],
    ['Information and data','What you need to know, and the records you will keep','Local job data from the youth centre, allergen information, a hygiene log']
   ]
  },
  learn:[
   "Once you know the problem and its causes, the next question is what you will need to tackle them. Inputs are the resources your activities need: people and their skills, money, space, equipment and materials, IT and technology, transport, partners, permissions and information. Your own time, your co-founders’ time, volunteer time and members’ labour are inputs even when no one is paid for them. The table below shows the kinds of inputs most new initiatives need; not every kind will apply to you, but checking each one helps you spot what you would otherwise forget.",
   "Separate what you already have from what you still need to secure, and note limits such as time, permissions or rules. At the start most inputs are gaps, and that is normal. Your internal strategic objectives (ISO1, ISO2 and so on) often describe how you will build the inputs that are missing.",
   "Be honest about what your resources allow. If one founder holds several specialist roles, you may need a smaller first scope or extra support. In the next lesson you will plan the activities these inputs make possible, and in Module 9 you will cost them properly; here, aim for a clear list and honest gaps."
  ],
  weak:'We need to raise money.',
  strong:'“A rented slot in a shared kitchen, a pitch at the Saturday market, flour and ingredients, the baker’s time to mentor and pay for four trainees. Trainee pay is the main gap: the US$6,000 youth-fund grant covers part of it.”',
  why:'It names the resources, links them to activities and shows what funding would actually pay for.',
  reflect:'Which missing resource could stop you starting at all?',
  exercise:'Your problem is already in the table. For each row, write the inputs you will need to tackle that cause, and mark which ones you already have and which are still gaps.',
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
  exercise:'Your whole pathway is now in the table, from the problem to the long-term impact. In the last column, write for each row the assumption that must hold for it to work, the evidence you have so far and how you will test it.',
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

// 2.1 is reading only: it explains what a Theory of Change is; the pathway itself is built in 2.2–2.8.
const understanding=m.lessons.find(l=>l.id==='understanding');
Object.assign(understanding,{weak:'',strong:'',why:'',reflect:'',exercise:'',check:'',fields:[]});
// Built forwards, the way founders think about it: problem → inputs → activities → outputs → outcomes → long-term impact.
const order=['understanding','problem','inputs','activities','outputs','outcomes','impact','assumptions','use','pathway'];
m.lessons.sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
// The organisation course's “Test, write and use” lesson is left out here: the table built in 2.2–2.8 is the Theory of Change.
m.lessons=m.lessons.filter(l=>l.id!=='use');
m.merged={...(m.merged||{}),use:'pathway'}; // its old address leads to the recap
// One pathway table for the whole Theory of Change, built a column at a time: 2.2 starts it with the problem (one row
// per cause you will tackle), and 2.3–2.8 each unlock one more column. It is saved once, with 2.2 (store), so every
// lesson shows the same rows: earlier columns as written, this lesson's column to fill in, later columns locked.
// The examples (our bakery, one per row) show as greyed text in the empty boxes and disappear as people type.
const ex=(...rows)=>rows.map(r=>`e.g. ${r}`);
const PATHWAY_COLUMNS=[
 {label:'Problem',placeholders:ex('employers ask for experience that young people who left school early do not have','they have no food-hygiene certificate or other proof of their skills','unpaid courses do not pay the rent, so many drop out')},
 {label:'Inputs',placeholders:ex('a shared-kitchen slot, a market stall, the baker’s time to train','a hygiene-course provider, about US$60 per trainee for the exam','trainee pay, part covered by the US$6,000 youth-fund grant')},
 {label:'Activities',placeholders:ex('run six-month traineeships baking for the Saturday stall (the baker)','prepare each trainee for the hygiene certificate (the youth-work co-founder)','pay trainees a wage and agree shifts that fit their lives (both co-founders)')},
 {label:'Outputs',placeholders:ex('4 traineeships in year 1; 300 loaves a week at the stall','4 trainees sit the hygiene exam','4 paid traineeship contracts signed')},
 {label:'Outcomes',placeholders:ex('trainees bake to standard and learn the habits of a working day','at least 3 of 4 earn the certificate','trainees stay the six months → 2 of 4 find a job within three months')},
 {label:'Long-term impact',placeholders:ex('more young people in our neighbourhood who left school early have stable, decent work','the same as row 1','the same as row 1')},
 {label:'Assumptions',placeholders:ex('local cafés trust a bakery traineeship as real experience; test: ask the two cafés we supply','trainees can pass the exam after six months; evidence: the provider’s pass rate','trainees can stay six months on our wage; test: ask ten young people before launch')}
];
const STAGES=['problem','inputs','activities','outputs','outcomes','impact','assumptions'];
const UNLOCKS=STAGES.map(id=>`2.${m.lessons.findIndex(x=>x.id===id)+1}`);
STAGES.forEach((id,j)=>{
 const l=m.lessons.find(x=>x.id===id);
 l.fields=[{key:'pathway',label:'Your Theory of Change',type:'table',columns:PATHWAY_COLUMNS,rows:3,store:'problem',edit:[j],unlocks:UNLOCKS,full:j===STAGES.length-1,
  hint:j===0?'One row for each cause of the problem you will tackle. The grey text is our bakery’s example: type over it with your own. Add rows as you need; the greyed columns unlock in the next lessons, one at a time.':'Fill in the highlighted column for each row. The grey text is our bakery’s example: type over it with your own. Earlier columns show what you wrote; to change one, go back to its lesson.'}];
});
export default m;
