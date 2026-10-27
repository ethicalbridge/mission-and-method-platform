import {module,lesson,review} from './kit.js';
// Reviewed October 2026: plain explanation, optional table (anatomy), and a gallery showing how the five example
// organisations (course/examples.js; story in docs/course-1-examples.md) complete each exercise.
export default module({
 ...{"uses":[1],"video":null,"id":2,"slug":"theory-of-change","phase":"Clarify","title":"Theory of Change","short":"From the problem to long-term impact, with the assumptions that connect them","intro":"Explain how your work could contribute to change. Work backwards from the future you seek, then check the pathway forwards. Build one pathway for each external objective. Your map is a reasoned hypothesis to test with the people affected, not proof that an intervention works.","output":"Theory of Change","workbook":{"file":"Module-02-Theory-of-Change.xlsx","title":"Theory of Change workbook"},"promo":{"lesson":"pathway","tools":["theory-of-change"],"headline":"See your whole pathway on one living map","pitch":"The Theory of Change Builder draws every pathway from inputs to impact, keeps assumptions and evidence beside each link, and saves review snapshots so you can show how your thinking changed. Import this module’s Pathways sheet to start."}},
 lessons:[
 lesson({
  "minutes": 20,
  "tools": [
   "theory-of-change"
  ],
  "video": null,
  "stage": "Understand",
  "id": "understanding",
  "title": "Understanding Theory of Change",
  "sheet": "ToC narrative",
  "learn": [
   "A Theory of Change makes your reasoning explicit: if we do this work, why might a particular change follow? It covers the context, the people involved, the sequence of changes and the assumptions that connect them. Social enterprises and startups sometimes call the same thing an impact thesis or impact logic.",
   "A pathway runs from inputs to activities, outputs, outcomes and impact. A diagram helps people see it, but arrows alone do not explain it. Add a short sentence on each important connection, and test your reasoning against what participants tell you and what others have already learned.",
   "Separate three spheres. You control your activities and outputs. You influence the changes in the people and institutions you work with directly. You can only contribute to the wider impact, which many actors shape. Make your claims more modest as you move outwards.",
   "Build one pathway for each external strategic objective (ESO). Internal objectives do not need their own pathway; they appear as inputs and conditions. Revisit your theory when evidence contradicts it."
  ],
  "weak": "Training creates jobs.",
  "strong": "Pan del Barrio (ESO1): if trainees gain baking skills and a recognised certificate, and employers trust that certificate, then more graduates will get formal jobs in food businesses.",
  "why": "It names the condition between training and a job: employers have to trust and hire certified graduates.",
  "reflect": "What has to happen outside your organisation for your idea to work?",
  "exercise": "Write a short “if… then… because…” explanation of your proposed change for your first external objective.",
  "fields": [
   {
    "key": "logic",
    "label": "Our initial change argument",
    "hint": "Include the objective code, the people involved, the change and why you expect it."
   }
  ],
  "check": "Have you explained the connection rather than only drawing an arrow?",
  "anatomy": {
   "title": "The parts of a pathway",
   "intro": "Each part sits in a sphere; your claims get more modest as you move down the table.",
   "cols": [
    "Part",
    "Sphere and meaning",
    "Example: Riverside Repair Hub, ESO1"
   ],
   "rows": [
    [
     "Inputs",
     "Control: the resources you put in",
     "40 volunteers, 5 staff, workshop space, tools, insurance"
    ],
    [
     "Activities",
     "Control: what you do",
     "Run repair cafés, train volunteers, lend tools"
    ],
    [
     "Outputs",
     "Control: what you deliver, counted",
     "48 repair cafés a year (about 2,000 items), 300 tool loans"
    ],
    [
     "Outcomes",
     "Influence: changes in the people you work with",
     "Residents learn simple repairs and repair before buying new"
    ],
    [
     "Impact",
     "Interest: wider change many actors shape",
     "Less waste and lower household costs in Leeds"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example change arguments",
   "intro": "Each organisation’s first “if… then… because…” argument for its ESO1.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "logic": "ESO1. If young people from our two villages learn to plant the right mangrove species in the right tidal zone, and village heads agree restoration sites, then youth teams can run monthly planting and monitoring and more seedlings will survive, because past plantings here failed on species and site, not effort. This depends on parents letting their children take part and pond owners leaving restored areas alone."
     },
     "notice": "Notice the “because”: it rests on why past plantings failed, which points straight at the activities that matter most."
    },
    {
     "org": "ngo",
     "profile": {
      "logic": "ESO1. If girls aged 10 to 14 do hands-on science every week and meet women from Kisumu who work in science, then their confidence and practical skills grow and more choose science subjects at secondary, because little practical teaching, low confidence and few role models are key reasons they drop science. This holds only if head teachers keep giving club time and families can afford secondary science."
     },
     "notice": "Notice how the argument ends with its conditions: head teachers’ time and family costs are outside Imara’s control, and it says so."
    },
    {
     "org": "social",
     "profile": {
      "logic": "ESO1. If young people who left school early complete a paid six-month apprenticeship in a real bakery and earn a recognised certificate, then they will get formal job offers in food businesses within three months, because they gain skills, a work history and proof that employers trust. The wage lets them stay for six months; the argument depends on our employer partners hiring certified graduates."
     },
     "notice": "Notice the step between training and work: the certificate only helps if employers trust it, so employer partners are part of the logic."
    },
    {
     "org": "coop",
     "profile": {
      "logic": "ESO1. If our member weavers buy yarn together, meet shared quality standards and sell direct to shops and online buyers, then they keep more of the price and are paid on time, so their income from weaving rises, because middlemen margins and expensive yarn bought alone are the main drains on income. This assumes online buyers will pay more for authentic handloom."
     },
     "notice": "Notice the plain chain: buying, quality, selling, income. Each link can be checked, and the price premium is named as an assumption."
    },
    {
     "org": "hybrid",
     "profile": {
      "logic": "ESO1. If residents bring broken items to free repair cafés and fix them alongside skilled volunteers, and can borrow tools, then they learn simple repairs and start repairing before buying new, because lack of skills and tools and the cost of professional repair push them to discard. This relies on residents trusting volunteer repairs and repaired items lasting."
     },
     "notice": "Notice the word “alongside”: residents fix items with volunteers, which is why the argument expects them to learn and repair again."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "theory-of-change"
  ],
  "video": null,
  "stage": "Understand",
  "id": "problem",
  "title": "Defining the problem",
  "sheet": "Problem analysis",
  "learn": [
   "Describe the current situation, who experiences it and what keeps it in place. Separate symptoms from causes, and keep the problem separate from your solution. “Not enough workshops” may be what you notice, but it is rarely the underlying problem.",
   "A problem tree keeps this practical. Write the core problem on the trunk, its causes as roots and its consequences as branches. Keep asking “why does this happen?” until you reach causes you could realistically influence.",
   "Build the tree with the people affected, not for them. Ask what they see as the main barriers and what strengths already exist, and note whose view is missing. Do not collect personal stories or sensitive data without a good reason and safeguards.",
   "Choose a scope you can influence. Mark uncertain causes as hypotheses and note what evidence could prove you wrong. Your context analysis in Module 1 shows what else is happening; this lesson explains why the problem persists."
  ],
  "weak": "There are not enough training sessions.",
  "strong": "Vanita Weavers Cooperative Society: handloom weavers in our district earn little and irregularly because middlemen take most of the price, yarn bought alone is expensive and power-loom copies undercut them.",
  "why": "It describes the barrier and its causes without naming the cooperative’s own activities as the answer.",
  "reflect": "Which cause is supported by evidence, and which is currently a guess?",
  "exercise": "Write the problem, scope, likely causes and one question to investigate.",
  "fields": [
   {
    "key": "problem",
    "label": "Problem and scope",
    "hint": "Who, where, what barrier and what consequence?"
   },
   {
    "key": "causes",
    "label": "Causes and evidence",
    "hint": "List known evidence, local perspectives and uncertainties."
   }
  ],
  "check": "Is the problem separate from the solution you hope to deliver?",
  "anatomy": {
   "title": "A problem tree in three parts",
   "intro": "Start with the trunk, then dig down to causes and up to consequences.",
   "cols": [
    "Part",
    "Question to ask",
    "Example: Imara Girls in Science"
   ],
   "rows": [
    [
     "Trunk: core problem",
     "What is the problem, for whom and where?",
     "Girls in Kisumu public schools drop science subjects in secondary school"
    ],
    [
     "Roots: causes",
     "Why does this happen? Ask again for each answer.",
     "Little practical teaching, low confidence, few role models, family expectations, cost"
    ],
    [
     "Branches: consequences",
     "What happens because of it?",
     "Few young women from Kisumu in science study and careers"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example problem statements",
   "intro": "How each organisation describes the problem behind its ESO1, its causes and what it still needs to check.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "problem": "Mangroves along the coast of our two North Bali villages have been cleared for shrimp ponds and building. Erosion and flooding are getting worse, putting homes and livelihoods at risk, and young people aged 12 to 17 have few chances to learn about or act on their own coast.",
      "causes": "Clearance for shrimp ponds and building (we can see it; village heads confirm).\nNo organised replanting.\nPast plantings failed: wrong species or site (local accounts; records not yet checked).\nLow awareness among families (a guess, to test by asking parents and young people).\nTo investigate: will pond owners accept restoration next to their ponds?"
     },
     "notice": "Notice how each cause is tagged with its source, and the guess about awareness is clearly marked as one to test."
    },
    {
     "org": "ngo",
     "profile": {
      "problem": "Girls aged 10 to 14 in public schools in two Kisumu sub-counties get little hands-on science, fall behind in maths and science and rarely meet women in science careers. Many drop science subjects in secondary school, which closes off science study and careers.",
      "causes": "Few labs and large classes, so little practical teaching (our school visits; teachers’ reports).\nLow confidence in science (our club confidence tracking).\nFew women in science they can meet (girls’ advisory group).\nFamily expectations about girls’ futures (heard in parent sessions; not measured).\nCost of secondary science (uncertain).\nTo investigate: at what point do girls actually drop science?"
     },
     "notice": "Notice the problem names no clubs or camps. It describes what happens to girls, so the solution stays open to challenge."
    },
    {
     "org": "social",
     "profile": {
      "problem": "Young people aged 18 to 24 in San Juan de Lurigancho who left school early end up in informal jobs that pay little, teach few skills and offer no contract or protection.",
      "causes": "No qualifications (recruitment interviews; municipal youth programme).\nNo work history to show employers.\nEmployers distrust early school leavers (what our employer partners tell us).\nThey need to earn while they learn, so unpaid courses are out of reach.\nTo investigate: why do some young people leave training before six months?"
     },
     "notice": "Notice the cause “need to earn while learning”: it explains why the apprenticeship is paid, without the problem naming the apprenticeship."
    },
    {
     "org": "coop",
     "profile": {
      "problem": "Handloom weavers in our district, mostly women, earn little and irregularly from their craft. Demand for traditional handloom is falling among young buyers, and young people from weaving families are leaving weaving for other work.",
      "causes": "Middlemen take most of the price (members’ sales records from before joining).\nYarn bought alone is expensive, and prices are rising.\nUneven quality limits who will buy.\nWeak access to markets beyond local traders.\nPower-loom copies undercut prices.\nTo investigate: is it income alone that keeps young people away, or also how weaving is seen?"
     },
     "notice": "Notice the question to investigate: it challenges the cooperative’s own assumption that income alone keeps young people away."
    },
    {
     "org": "hybrid",
     "profile": {
      "problem": "Households in Leeds, especially low-income ones, throw away items that could be repaired, wasting money and resources, while repair skills and affordable repair are disappearing.",
      "causes": "Lack of skills and tools (what repair café visitors tell us).\nProfessional repair costs more than many can pay.\nCheap new goods are more convenient.\nLow awareness that repair is an option (a guess, to test with a short survey).\nTo investigate: what stops low-income households from coming to repair cafés?"
     },
     "notice": "Notice the scope: Leeds households, with low-income ones named, which keeps the problem small enough to work on."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "theory-of-change"
  ],
  "video": null,
  "stage": "Design",
  "id": "impact",
  "title": "Long-term impact",
  "sheet": "Pathways",
  "learn": [
   "Impact is the longer-term change in people’s lives or in environmental conditions that your work aims to contribute to. It may take years, and it depends on many actors beyond your team.",
   "Start from your vision and from the external strategic objective (ESO) this pathway serves. Name whose lives or which conditions should improve, and make the statement narrow enough to guide decisions without claiming the whole future as yours.",
   "Be honest about what you can show. An improvement you observe does not by itself prove your work caused it. For most organisations, contribution rather than attribution is the honest claim, so name who else plays a part."
  ],
  "weak": "Our programme eliminates poverty.",
  "strong": "Imara Girls in Science (ESO1): contribute, over ten years or more, to more young women from Kisumu studying science and working in science-related careers.",
  "why": "It names the people and the condition, links to the vision and claims contribution rather than sole credit.",
  "reflect": "What wider change matters even after a participant leaves your programme or a customer stops using your service?",
  "exercise": "Draft your impact statement and identify other actors influencing it.",
  "fields": [
   {
    "key": "impact",
    "label": "Long-term impact",
    "hint": "Use your vision and objective as a starting point; specify the population and desired condition."
   },
   {
    "key": "actors",
    "label": "Other influences",
    "hint": "Which partners, policies or wider conditions matter?"
   }
  ],
  "check": "Does the statement acknowledge the limits of your control?",
  "gallery": {
   "title": "Five example impact statements",
   "intro": "Each organisation’s long-term impact for its ESO1 pathway, and the other forces that shape it.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "impact": "Over ten years or more, contribute to healthier, more resilient mangrove coasts in our two North Bali villages, with less erosion and flooding and safer village livelihoods, cared for by the young people who live beside them.",
      "actors": "Village heads and village rules on land use; shrimp pond owners; the provincial environment office’s planting events; tourism growth and building on the coast; storms, tides and the rainy season; parents and the school."
     },
     "notice": "Notice the timescale and the word “contribute”: restored coasts take ten years or more and depend on village rules, not only on planting."
    },
    {
     "org": "ngo",
     "profile": {
      "impact": "Over ten years or more, contribute to more young women from Kisumu studying science and working in science-related careers.",
      "actors": "Head teachers and teachers; the county education office; the national competency-based curriculum; family expectations and income; the cost of secondary school; universities and employers; other STEM programmes."
     },
     "notice": "Notice how close the impact is to Imara’s vision, but narrower: it names a population and a change someone could later look for."
    },
    {
     "org": "social",
     "profile": {
      "impact": "Contribute to more young people in San Juan de Lurigancho who left school early holding stable, formal jobs with fair pay and room to progress.",
      "actors": "Food businesses and their hiring practices; the municipal youth employment programme; Lima’s high level of informal work; the certificate body; families; the wider economy and flour prices, which also affect our own bakery."
     },
     "notice": "Notice the honesty in the list of influences: informality and flour prices affect both the young people and the bakery’s own survival."
    },
    {
     "org": "coop",
     "profile": {
      "impact": "Contribute to secure livelihoods for handloom weavers in our district and a living handloom craft that young people choose to join.",
      "actors": "Government handloom schemes and the state cooperative department; online craft marketplaces; power-loom producers; yarn prices; buyers’ taste for handloom; other jobs open to young people; the monsoon."
     },
     "notice": "Notice that the impact covers two things members care about: a secure income and a craft that young people want to join."
    },
    {
     "org": "hybrid",
     "profile": {
      "impact": "Contribute to less household waste and lower household costs in Leeds, with repair and reuse a normal, affordable choice, especially for low-income households.",
      "actors": "Leeds City Council’s waste team and targets; right-to-repair rules; retailers of cheap new goods; cost-of-living pressures; local commercial repairers; rents for our workshop space."
     },
     "notice": "Notice how many actors shape household waste: council targets, retailers and repairers all play a part, so Riverside claims contribution only."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "theory-of-change"
  ],
  "video": null,
  "stage": "Design",
  "id": "outcomes",
  "title": "Outcomes",
  "sheet": "Pathways",
  "learn": [
   "Outcomes are the changes your work helps bring about in people, relationships, institutions or conditions: a new skill, a different choice, a changed rule. They sit between what you deliver and the long-term impact. An attendance count is an output; a girl who can now run an experiment on her own is showing an outcome.",
   "Work backwards from your impact. What has to change just before it becomes more likely? What earlier change makes that possible? Arrange the answers as short-term, medium-term and long-term outcomes. Keep a few strong links rather than filling a diagram with every possibility.",
   "For each outcome, note the evidence that would show it is happening, such as an observed skill, a subject choice or a new village rule. You do not need indicators yet; you will turn these signals into indicators, baselines and targets in Module 6.",
   "Look for effects you did not intend, including unequal ones. Who might be left out, take on extra work or be affected differently? Naming these early lets you adjust before they cause harm."
  ],
  "weak": "100 participants attend.",
  "strong": "Imara Girls in Science: girls in partner schools gain confidence and practical skills in science, and then more of them choose science subjects at secondary school.",
  "why": "It describes changes in the girls, in a sequence, rather than counting who turned up.",
  "reflect": "Whose behaviour or circumstances need to change first?",
  "exercise": "List early and later outcomes, with the kind of evidence that would show each one.",
  "fields": [
   {
    "key": "outcomes",
    "label": "Outcome sequence",
    "hint": "Short-term → medium-term → long-term change | evidence that would show it."
   },
   {
    "key": "unintended",
    "label": "Possible unintended effects",
    "hint": "Who might be excluded, burdened or affected differently?"
   }
  ],
  "check": "Are your outcomes changes rather than a list of completed activities?",
  "gallery": {
   "title": "Five example outcome sequences",
   "intro": "Each organisation sets out the changes behind its first external objective (ESO1), with the evidence that would show each one.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "outcomes": "Short term: young people gain planting and monitoring skills | team leaders choose the right species and tidal zone and run a planting day without the co-founders\nShort term: village heads agree restoration sites | a written site agreement in each village\nMedium term: youth teams run monthly planting and monitoring; seedling survival improves | planting days led by youth leaders; survival counts twice a year\nLong term: restored mangrove areas grow and village rules protect them | mapped mangrove area over several years; a village decision protecting the sites",
      "unintended": "Planting days could clash with school or family work, so the same few confident young people take part and others are left out. Families may let boys but not girls go by boat to the far site; we need to ask. If pond owners clear restored areas, the youth team could be caught in a conflict."
     },
     "notice": "Notice how the first outcomes are about skills and permission, not trees. Copy the habit of naming evidence a small team can actually collect, such as survival counts."
    },
    {
     "org": "ngo",
     "profile": {
      "outcomes": "Short term: girls' confidence and practical science skills improve | confidence survey at the start and end of the year; coordinators observe girls running experiments\nShort term: parents support girls' science | parents at termly sessions say they will back science choices\nMedium term: girls choose science subjects at secondary school | subject choices of club leavers, collected with schools\nMedium term: partner teachers use hands-on methods | classroom observation; teachers' own reports\nLong term: more girls complete secondary science and enter science-related study | follow-up of a small sample of former club members",
      "unintended": "Girls who cannot stay after school, often because of chores or distance, miss out, so clubs may serve girls already more likely to succeed. Boys and some teachers may resent a girls-only club. Raising hopes of science study could add pressure where families cannot afford secondary science."
     },
     "notice": "See how the outcomes include the adults around the girls: parents and teachers. Copy the honest note that following girls beyond school only works for a small sample."
    },
    {
     "org": "social",
     "profile": {
      "outcomes": "Short term: trainees gain baking and work skills and become reliable | master baker's skills checklist; punctuality and attendance records\nMedium term: trainees earn the certificate and get formal job offers within three months | certificate results; written offers from employer partners\nLong term: graduates keep and progress in formal jobs | follow-up calls at 3 and 12 months: contract, role and pay",
      "unintended": "Trainees who drop out may feel they have failed a second time. Young people with caring duties or long journeys may struggle with early shifts, so we could end up choosing the easiest to place. Employer partners might treat graduates as cheap labour; we check contracts and pay at follow-up."
     },
     "notice": "Notice that each outcome uses evidence the bakery already keeps or can easily collect. Copy the worry about choosing only the easiest trainees: it keeps selection honest."
    },
    {
     "org": "coop",
     "profile": {
      "outcomes": "Short term: members buy yarn at lower cost | price per kilo compared with what members paid buying alone\nShort term: quality improves | share of pieces passing the quality check first time\nMedium term: more sales go direct at better prices, and payments arrive on time | share of revenue from shops and online; days from delivery to payment\nLong term: members earn a higher, steadier income from weaving, and young people see weaving as viable | yearly member income survey; apprentices who join and stay",
      "unintended": "Stricter quality checks could push out older or less experienced weavers whose pieces fail more often. Designs that sell well online could favour a few weavers and cause tension. Extra orders could add to the workload of women already carrying most household duties."
     },
     "notice": "Look at how one outcome joins price and payment timing, because both shape income. Copy the use of records the cooperative already holds, such as quality checks and payment dates."
    },
    {
     "org": "hybrid",
     "profile": {
      "outcomes": "Short term: residents get items fixed and learn simple repairs | repair café log: item, fixed or not, and whether the owner helped\nMedium term: residents repair, or borrow tools, before buying new | survey three months after a visit; repeat tool loans\nLong term: household waste falls and a repair culture grows in Leeds | kilograms diverted from landfill; council waste figures, which many other factors affect",
      "unintended": "Repair cafés may mostly attract confident, retired or better-off residents rather than low-income households. Busy cafés could take work from small local repairers. A poor electrical repair could put someone at risk."
     },
     "notice": "Look at the long-term evidence: it admits that council waste figures reflect many factors. Copy the habit of recording whether the owner helped, which shows learning, not just fixing."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "theory-of-change"
  ],
  "video": null,
  "stage": "Design",
  "id": "outputs",
  "title": "Outputs",
  "sheet": "Pathways",
  "learn": [
   "Outputs are the immediate products and services your activities deliver: sessions held, kits handed out, apprenticeships completed, items repaired. They are mostly within your control, and they show whether delivery happened, not whether anyone's life improved.",
   "Describe quality and reach as well as quantity. Ten sessions the intended people cannot reach are not the same as ten accessible, relevant ones. For each output, say who it is for and how you will check it was good enough.",
   "Use outputs to manage delivery, and keep them apart from outcomes, or a busy programme gets reported as an effective one. A simple test: you can usually count an output on the day it happens; an outcome takes weeks, months or years to show."
  ],
  "weak": "Awareness raised in the community.",
  "strong": "Riverside Repair Hub: 48 repair cafés a year, about 2,000 items brought in, free and open to all residents, every electrical repair safety-tested before it goes home.",
  "why": "It gives a deliverable, a quantity, the intended reach and a quality check that can all be verified.",
  "reflect": "What evidence would show that you delivered the service you promised?",
  "exercise": "List the outputs needed for your outcomes, including quality and reach.",
  "fields": [
   {
    "key": "outputs",
    "label": "Outputs",
    "hint": "Product or service | quantity | intended reach | quality check."
   }
  ],
  "check": "Can you verify each output without assuming it caused an outcome?",
  "anatomy": {
   "title": "Output or outcome?",
   "intro": "The same pathway, one step apart.",
   "cols": [
    "Question",
    "Output",
    "Outcome"
   ],
   "rows": [
    [
     "What is it?",
     "Something you deliver",
     "A change in people, institutions or conditions"
    ],
    [
     "Who controls it?",
     "Mostly your team",
     "You contribute; other people and the context matter too"
    ],
    [
     "When can you see it?",
     "On the day of delivery",
     "Weeks, months or years later"
    ],
    [
     "Example: Imara Girls in Science",
     "14 weekly clubs of 30 girls",
     "Girls choose science subjects at secondary school"
    ],
    [
     "Example: Riverside Repair Hub",
     "48 repair cafés, about 2,000 items",
     "Residents repair before buying new"
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example output lists",
   "intro": "Each organisation lists the outputs its first external objective (ESO1) needs, with quantity, reach and a quality check.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "outputs": "Planting days | 10 a year | 15–25 young people aged 12–17 from both villages | right species for the tidal zone; parental consent on file; trained adult present\nSchool sessions | 2 a month | students at the one interested school, to start | session plan agreed with the teacher; short feedback from students\nSurvival monitoring | twice a year | every planted plot | same plots counted each time; results shared with the youth team\nSite agreements | 1 per village | village heads and land users | written, signed and mapped"
     },
     "notice": "Notice that the quality checks include safeguarding: consent and a trained adult. Copy the honesty of starting school sessions with the one school that is interested."
    },
    {
     "org": "ngo",
     "profile": {
      "outputs": "Weekly science clubs | 14 clubs, 30 girls each | girls aged 10–14 in partner public schools in two sub-counties | attendance register; coordinator observes one session a term\nHoliday science camp | 1 a year, 120 girls | club members, with transport for girls from distant schools | safeguarding plan signed off; girls' feedback forms\nTrained mentors | 25 | local women working in science, matched to clubs | training completed; background checks done\nParent sessions | 1 per school per term | parents and guardians of club members | attendance and questions recorded\nClub kits | 1 per school | all 14 partner schools | checked and restocked each term"
     },
     "notice": "See how the reach column names exactly who each output is for. Copy the mix of quality checks: observation, girls' feedback and safeguarding sign-off."
    },
    {
     "org": "social",
     "profile": {
      "outputs": "Paid apprenticeship places | 12 a year, in two cohorts of 6 | young people aged 18–24 who left school early, referred with the municipality | signed contract; wages paid on time; weekly mentoring logged\nCertificate assessment | every trainee who completes six months | all completing trainees | assessed by the external certificate body\nJob-matching | 8 employer partners; at least one interview per graduate | all graduates | interviews and offers recorded; Diego checks contract terms"
     },
     "notice": "Notice that a paid contract and on-time wages are written as quality checks. Copy this: if a standard matters to your values, make it checkable at output level."
    },
    {
     "org": "coop",
     "profile": {
      "outputs": "Bulk yarn purchases | 1 a month | all members who place orders | price per kilo compared with the market; yarn checked on arrival\nQuality checks | every piece | all members' work | written standard; reason recorded when a piece fails\nDesign collections | 2 a year | members who join the design workshops | a test order from a shop before full production\nOnline shop listings | every new design | online buyers | photo, weaver's name and fair price on each listing\nMember payments | within 15 days of sale | all members | payment dates recorded in the open books"
     },
     "notice": "Look at payment within 15 days: an output that also carries a value, fair and on-time payment. Copy the idea of tying each output to a record members can see."
    },
    {
     "org": "hybrid",
     "profile": {
      "outputs": "Repair cafés | 48 a year, about 2,000 items | Leeds residents, publicised in low-income areas | electrical items PAT-tested; every item logged\nTool loans | 300 a year | residents without tools of their own | tools checked on return; borrowers shown safe use\nSchool workshops | 30 a year | pupils in partner schools | teacher feedback form\nItems diverted from landfill | kilograms, recorded at each café and for shop stock | reported to trustees and the council | weighed the same way every time\nRefurbished goods sold | monthly shop sales | shop customers on a budget | safety-tested; returns recorded"
     },
     "notice": "Notice the reach column: “publicised in low-income areas” turns ESO1’s focus into a delivery choice. Copy how weight is recorded the same way each time so the figure can be trusted."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "theory-of-change"
  ],
  "video": null,
  "stage": "Design",
  "id": "activities",
  "title": "Activities",
  "sheet": "Pathways",
  "learn": [
   "Activities are the actions your team and partners take to produce your outputs. Start each one with a verb and give enough detail to estimate the work and assign it: recruit mentors, agree sites, train team leaders, run sessions, follow up.",
   "Check every activity against an output. If an activity supports no output, either add the missing output or drop the activity. Then add the work that is easy to forget: preparation, permissions, coordination, safeguarding and follow-up.",
   "Ask whether each activity is feasible and acceptable where you work. A sound plan can still fail if the timing, language, cost of taking part or local custom keeps people away. Check with the people involved before you fix dates."
  ],
  "weak": "Do community engagement.",
  "strong": "Pan del Barrio: recruit six trainees per cohort with the municipality's youth programme, agree start dates, and sign paid contracts before the first shift.",
  "why": "The action is specific enough to assign, schedule and link to an output: apprenticeship places filled.",
  "reflect": "What preparation is easy to overlook?",
  "exercise": "List the main activities and the output each supports.",
  "fields": [
   {
    "key": "activities",
    "label": "Activities and outputs",
    "hint": "Action | output supported | partner or responsible role."
   }
  ],
  "check": "Does every activity have a clear purpose in the pathway?",
  "gallery": {
   "title": "Five example activity lists",
   "intro": "Each organisation lists the main activities for its first external objective (ESO1), the output each supports and who is responsible.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "activities": "Agree restoration sites with village heads and land users | site agreements | Wayan, with village heads\nCollect parental consent; complete safeguarding training | planting days; school sessions | Wayan; all volunteers\nSource seedlings and check the species for each tidal zone | planting days | Sari, with the local nursery\nTrain youth team leaders in planting, monitoring and safety | planting days; survival monitoring | Sari\nRun planting days, timed around tides and school | planting days | youth team leaders, with volunteers\nCount seedling survival | survival monitoring | Sari and the youth team\nPlan and run school sessions | school sessions | Wayan, with the partner teacher"
     },
     "notice": "Notice that consent and safeguarding come before any planting. Copy the habit of writing the easily forgotten preparation as activities in their own right."
    },
    {
     "org": "ngo",
     "profile": {
      "activities": "Agree club time and rooms with head teachers each year | weekly clubs | programme manager\nRecruit, check and train mentors through universities | trained mentors | programme manager\nTrain and support club coordinators | weekly clubs | programme manager\nRun weekly clubs | weekly clubs | 3 club coordinators, with mentors\nPlan the holiday camp, transport and safeguarding | holiday camp | programme manager; local business sponsors\nHold termly parent sessions | parent sessions | club coordinators\nCheck and restock kits | club kits | coordinators; finance officer\nTrack attendance and confidence | evidence for all outputs | programme manager\nRun teacher workshops | no ESO1 output yet: add one or move to ESO2 | director"
     },
     "notice": "Look at the last line: teacher workshops support no ESO1 output yet. Copy this check; it exposes work that needs either an output or a different pathway."
    },
    {
     "org": "social",
     "profile": {
      "activities": "Recruit trainees with the municipality's youth programme | apprenticeship places | Diego; municipality\nSign contracts and pay trainee wages on time | apprenticeship places | Lucía\nTrain trainees on the job, shift by shift | apprenticeship places | master baker\nHold weekly mentoring | apprenticeship places | Diego\nPrepare trainees for the certificate | certificate assessment | master baker; certificate body\nBuild and keep employer partnerships | job-matching | Lucía\nFollow up graduates at 3 and 12 months | evidence for outcomes | Diego"
     },
     "notice": "Notice that follow-up supports outcome evidence, not an output, and says so. Copy how training happens inside the business, so most activities are also normal bakery work."
    },
    {
     "org": "coop",
     "profile": {
      "activities": "Pool members' yarn orders each month | bulk yarn purchases | manager (Meera); accounts clerk\nCheck every piece against the written standard | quality checks | quality officer\nRun design workshops with members | design collections | designer\nPhotograph and list new designs online | online listings | designer, with Meera\nAgree terms with retail shops | direct sales to shops: output to add | Meera; committee\nPay members within 15 days | member payments | accounts clerk; committee approves\nRun the apprentice scheme | belongs to ESO2, so planned in that pathway | committee"
     },
     "notice": "See how the apprentice scheme is moved to the ESO2 pathway instead of crowding this one. Copy that sorting: each activity belongs to the objective it actually serves."
    },
    {
     "org": "hybrid",
     "profile": {
      "activities": "Promote repair cafés through community centres in low-income areas | repair cafés (reach) | volunteer coordinator\nTrain volunteers; PAT-test electrical repairs | repair cafés (safety) | workshop lead (Priya)\nRun weekly repair cafés | repair cafés | Priya, with volunteers\nRun the tool library | tool loans | volunteer coordinator\nDeliver school workshops | school workshops | schools officer\nWeigh and log items | items diverted from landfill | volunteers at each café; director (Tom) reports\nRefurbish donated goods; run the shop | refurbished goods sold | Priya; shop manager (trading company)"
     },
     "notice": "Notice the first activity: promotion in low-income areas is how the hub reaches the households ESO1 names. Copy the note that the shop sits in the trading company."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "theory-of-change"
  ],
  "video": null,
  "stage": "Design",
  "id": "inputs",
  "title": "Inputs",
  "sheet": "Pathways",
  "learn": [
   "Inputs are the resources your activities need: people's time and skills, money, equipment, space, information, relationships and permissions. Volunteer time and members' labour are inputs even when no one is paid for them.",
   "Separate what you already have from what you still need to secure, and note limits such as time, permissions or rules. Your internal strategic objectives (ISO1, ISO2 and so on) often describe how you will build the inputs that are missing.",
   "Match resources to activities. If one person or one volunteer holds several specialist roles, you may need a smaller scope or extra support. You will cost these inputs properly in Module 9; here, aim for a clear list and honest gaps."
  ],
  "weak": "We need funding.",
  "strong": "Vanita Weavers: working capital to buy a month's yarn in bulk, the designer's time for two collections a year and online shop fees. Working capital is the main gap.",
  "why": "It names the resources, links them to activities and shows what funding would actually pay for.",
  "reflect": "Which missing resource could stop delivery?",
  "exercise": "List the main inputs, availability and gaps.",
  "fields": [
   {
    "key": "inputs",
    "label": "Resource plan",
    "hint": "Resource | activity supported | available now | gap | how to secure it."
   }
  ],
  "check": "Have you included people’s time and access needs as well as money?",
  "gallery": {
   "title": "Five example resource plans",
   "intro": "Each organisation lists the inputs for its first external objective (ESO1), what it has now and what it still needs.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "inputs": "Co-founders' time | all activities | 2 days a week each | none, but no cover if one is ill | keep the plan to two villages\nVolunteers | planting days; monitoring | 4 | more adults for larger groups | recruit through the school\nSeedlings | planting days | none | about US$1,500 a year | small local donors; ask dive operators (ISO3)\nBoots, tools, a boat for one site | planting days | some tools | boots; boat | borrow a fisher's boat\nSafeguarding training | all work with young people | none | training for everyone | find a local course (ISO2)\nVillage heads' permission | site agreements | verbal support | written agreements | meetings in both villages"
     },
     "notice": "Notice that permission and safeguarding training are listed as inputs, not only money. Copy the link to internal objectives: each gap points to ISO2 or ISO3."
    },
    {
     "org": "ngo",
     "profile": {
      "inputs": "Volunteer mentors | clubs; camp | 25 | some may not stay a year | better training and support (ISO2)\nClub kits | weekly clubs | in all 14 schools | about US$6,000 a year to restock | local business sponsors\nSchool rooms and club time | weekly clubs | agreed this year | depends on each head teacher | yearly agreement with each school\nTransport | camp; mentors' visits | partly funded | distant schools | next grant\n6 staff, paid from grants | all activities | two foundation grants | over-reliance on two funders | diversify income (ISO1)\nData tool | tracking | spreadsheets | a simple shared tool | ISO3"
     },
     "notice": "See how a resource can be available but fragile, like club time that depends on head teachers. Copy the habit of naming that dependency, not only the gap."
    },
    {
     "org": "social",
     "profile": {
      "inputs": "Bakery and equipment | on-the-job training | yes | none for 12 trainees a year | maintain from sales\nMaster baker's time | training; certificate preparation | yes, alongside production | tight at peak hours | train in quieter shifts\nTrainee wages | apprenticeship | paid from sales | wages strain cash near break-even | grants or employer fees (ISO2)\nMentor (Diego) | weekly mentoring; follow-up | yes, part of his week | no cover | train a second mentor later\nEmployer partners | job-matching | 8 | not every partner hires each cohort | Lucía keeps in touch; adds partners\nCertificate body | assessment | recognised body identified | assessment fee per trainee | include in training budget"
     },
     "notice": "Notice that trainee wages are both an input and the main cost pressure. Copy the honest note about the master baker: time spent training competes with production."
    },
    {
     "org": "coop",
     "profile": {
      "inputs": "Members' labour and looms | weaving for every order | 140 members | none | member commitment to quality standards\nWorking capital for yarn | monthly bulk purchases | enough for part of a month | a full month's yarn | cooperative bank loan or handloom scheme\nStaff (manager, quality officer, accounts clerk) | quality checks; payments | yes | none | paid from sales margin\nDesigner | design collections; listings | yes | none | keep\nOnline shop fees and photography | online listings | fees paid; photos by staff | better photos | short training for one member\nCommittee time | rules; approving payments | 9 elected members | meetings run long | clear agendas"
     },
     "notice": "Look at the working capital line: a gap with two named ways to fill it. Copy how members' labour and committee time are counted as resources, not taken for granted."
    },
    {
     "org": "hybrid",
     "profile": {
      "inputs": "Volunteers | repair cafés; tool library | 40 | more with electrical skills | recruit retired engineers and trades\nWorkshop space | repair cafés; refurbishing | yes | rising rent | talk to the landlord early; look at council space\nTools and PAT testing equipment | repair cafés; tool library | yes | replacing worn tools | tool donations\nInsurance | all activities | in place | must cover electrical repairs | review yearly\nDonated goods | refurbishing; shop | steady supply | none | local businesses and residents\n5 staff and running costs | all charity activities | council and grant funding; shop profits | shop profits to cover 30% of costs | ISO1"
     },
     "notice": "Notice how shop profits appear as an input to the charity's work, which is why the trading company matters. Copy the early warning on rent before it becomes a crisis."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "theory-of-change"
  ],
  "video": null,
  "stage": "Manage",
  "id": "assumptions",
  "title": "Assumptions, risks and evidence",
  "sheet": "Pathways",
  "learn": [
   "An assumption is something that must be true for one step in your pathway to lead to the next. At each link, ask: “what has to be true for this to happen?” Collect the answers here, alongside what you already know about each one.",
   "Make each assumption specific enough to check. “The programme succeeds” cannot be tested; “head teachers keep giving club time” can. Prioritise the ones that are both important and uncertain. Check them cheaply: ask participants, look at existing records or run a small pilot. Decide in advance what you will do if one turns out to be false.",
   "Keep external risks separate from your response to them. You cannot control the monsoon or a rise in flour prices, but you can plan around them. Note the risks that sit on your pathway now; Module 10 shows how to carry them into a risk register."
  ],
  "weak": "Participants will benefit.",
  "strong": "Pan del Barrio: trainees can stay for six months on the wage we pay. Test it by asking each cohort at months two and four what nearly made them leave.",
  "why": "It names an uncertain condition on one link, and a low-cost way to find out early whether it holds.",
  "reflect": "Which assumption would most change your plan if it were false?",
  "exercise": "Write your critical assumptions, current evidence and how you will test them.",
  "fields": [
   {
    "key": "assumptions",
    "label": "Assumptions and tests",
    "hint": "Connection | assumption | current evidence | test | decision if false."
   }
  ],
  "check": "Have you identified evidence that could challenge your preferred approach?",
  "anatomy": {
   "title": "Where assumptions sit",
   "intro": "Every arrow in your pathway carries at least one assumption.",
   "cols": [
    "Link",
    "Question to ask",
    "Example"
   ],
   "rows": [
    [
     "Inputs → activities",
     "Will the resources really be there when needed?",
     "Imara: mentors stay for a full year."
    ],
    [
     "Activities → outputs",
     "Can people take part as planned?",
     "Tide Line: parents let their children join planting days."
    ],
    [
     "Outputs → short-term outcomes",
     "Does what we deliver lead to change?",
     "Riverside: residents trust volunteer repairs."
    ],
    [
     "Short-term → longer-term outcomes",
     "Does the early change carry on?",
     "Imara: confidence turns into science subject choices."
    ],
    [
     "Outcomes → impact",
     "Do wider conditions allow the change to last?",
     "Pan del Barrio: employers keep hiring certified graduates."
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example assumption tables",
   "intro": "Each organisation tests the assumptions behind its first external objective (ESO1) and decides in advance what it will do if one fails.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "assumptions": "Activities → outputs | parents let children take part | some parents interested; untested | consent meetings before the first planting day | move planting into school hours\nOutputs → short-term outcomes | seedlings survive at the chosen sites | past plantings failed with the wrong species | small trial plot, counted after three months | change species or tidal zone before scaling up\nShort-term → medium-term outcomes | young people stay engaged beyond the first months | none yet | track attendance over six months | give youth leaders more say in planning\nMedium-term → long-term outcomes | pond owners do not clear restored areas | owners not yet asked | meet owners before agreeing sites | choose undisputed sites"
     },
     "notice": "Notice that the trial plot tests survival before ten planting days are committed. Copy the habit of testing the riskiest link while the stakes are still small."
    },
    {
     "org": "ngo",
     "profile": {
      "assumptions": "Inputs → activities | head teachers keep giving club time | 14 schools agreed this year | yearly agreement signed before term starts | replace the school or move to lunchtime clubs\nInputs → activities | mentors stay for a year | most stay; turnover not tracked | track retention each term | shorter terms; recruit more from universities\nShort-term → medium-term outcomes | confidence turns into science subject choices | girls and teachers say so; no data yet | follow up one group of club leavers | add subject-choice guidance for girls and parents\nMedium-term → long-term outcomes | families can afford secondary science | the biggest uncertainty | ask parents at termly sessions | look for bursary partners; be honest in reporting"
     },
     "notice": "See how “no data yet” is written plainly next to the assumption that matters most. Copy the honesty: a gap in evidence is a reason to test, not to hide."
    },
    {
     "org": "social",
     "profile": {
      "assumptions": "Activities → outputs | trainees can stay six months on the wage paid | early leavers mention money; reasons not recorded | ask each cohort at months two and four | add a travel allowance or flexible shifts\nInputs → activities | bakery sales cover most costs | near break-even; flour prices rising | monthly accounts review | grants or employer fees for training (ISO2)\nOutputs → medium-term outcomes | employers hire certified graduates | eight partners agreed; hires vary | track offers per cohort | add partners or adjust training\nOutputs → medium-term outcomes | the certificate is recognised | recognised body; value to employers untested | ask partners if it changes their decision | drop it if employers do not value it"
     },
     "notice": "Notice the test for the wage: asking trainees at months two and four costs almost nothing. Copy the timing; you hear about problems before trainees leave."
    },
    {
     "org": "coop",
     "profile": {
      "assumptions": "Outputs → short-term outcomes | members commit to quality standards | most do; some older weavers resist | track pass rates by member | peer support before any penalty\nShort-term → medium-term outcomes | online buyers pay a premium for authentic handloom | online sales growing; premium untested | test two price points on one collection | focus on shops if the premium does not hold\nInputs → activities | working capital is available for bulk yarn | only part of a month covered | apply to the cooperative bank and handloom scheme | buy smaller batches meanwhile\nInputs → activities | the committee agrees fair rules | no rule yet on new funding | discuss at the next general meeting | members vote before accepting any dye-unit grant"
     },
     "notice": "Look at the last line: the decision if false is a members’ vote. Copy the way each response fits the organisation’s values; here, members decide."
    },
    {
     "org": "hybrid",
     "profile": {
      "assumptions": "Outputs → short-term outcomes | residents trust volunteer repairs | regular visitors return; few complaints | short exit question at each café | publicise safety testing; pair new volunteers with experienced ones\nInputs → activities | there are enough skilled volunteers | 40 volunteers; few with electrical skills | track sessions short of an electrical volunteer | reduce electrical slots; recruit retired engineers\nShort-term → medium-term outcomes | repaired items last | not known | follow up a sample of items after three months | change which repairs are offered\nMedium-term → long-term outcomes | people repair rather than buy new | some repeat visits | survey three months after a visit | add skills sessions, not only fixes"
     },
     "notice": "Notice the “not known” in the evidence column: whether repaired items last is a real gap. Copy how each test uses something the hub already does, such as a café exit question."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "theory-of-change"
  ],
  "video": null,
  "stage": "Review",
  "id": "use",
  "title": "Test, write and use your Theory of Change",
  "sheet": "ToC narrative",
  "learn": [
   "A Theory of Change is useful when people can read it, question it and use it to decide. For each pathway, write a one-page narrative in plain language: the problem, the change you want, the main steps, the key assumptions and the evidence behind them.",
   "Test it with people who know the issue: participants or customers, frontline staff, partners and at least one sceptic. Ask where the logic is weakest. Record what you changed as a result, and give the document a version number and a date.",
   "Then use it. Your Theory of Change feeds your indicators in Module 6, your case for support and your annual priorities. Review it at least once a year, and sooner if an evaluation, a failed assumption or a big change in context tells you something is wrong."
  ],
  "weak": "Our Theory of Change diagram is finished and approved.",
  "strong": "Imara Girls in Science, version 1.1, March: after testing with the girls' advisory group, two head teachers and a funder, we added termly parent sessions as an output. Next review after this year's subject choices.",
  "why": "It shows who tested the pathway, what changed because of their feedback and when it will be reviewed.",
  "reflect": "Who is best placed to tell you your pathway is wrong?",
  "exercise": "Plan how you will test your Theory of Change, then write the version and review plan.",
  "fields": [
   {
    "key": "testing",
    "label": "Testing plan",
    "hint": "Who will review the pathway, how, and by when?"
   },
   {
    "key": "narrative",
    "label": "One-page narrative",
    "hint": "Problem, intended change, main steps, key assumptions and evidence, in plain language."
   },
   {
    "key": "review",
    "label": "Version and review",
    "hint": "Version, date, next review and what would trigger an earlier review."
   }
  ],
  "check": "Could someone outside your team follow your logic from the narrative alone?",
  "gallery": {
   "title": "Five example plans to test and use a Theory of Change",
   "intro": "Each organisation plans how to test its ESO1 pathway, writes a short narrative and sets a review point.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "testing": "Before the first rainy-season planting: walk through the pathway with six young people from both villages, both village heads and the school principal. Ask Sari's former lecturer, a mangrove specialist, to challenge the species and site choices. Wayan collects comments by the end of October.",
      "narrative": "Mangroves along our two villages' coast have been cleared for shrimp ponds and building, and erosion and flooding are getting worse. Past plantings failed because the wrong species were planted in the wrong places, and young people have had few chances to act. We will agree sites with village heads, train youth team leaders, run ten planting days a year and count seedling survival twice a year. We expect young people to gain skills, then lead regular planting, with most seedlings surviving (we will set a target after the first monitoring round). This depends on parents' consent, the right species for each site and pond owners leaving restored areas alone. We will test survival on a small trial plot first.",
      "review": "Version 0.1, October 2026, draft before testing. Next review: April 2027, after the first rainy season's survival count. Earlier review if the trial plot fails or a village head withdraws support."
     },
     "notice": "Notice that an idea-stage version is honestly numbered 0.1. Copy the outside challenger: someone with expertise the team does not have."
    },
    {
     "org": "ngo",
     "profile": {
      "testing": "In February: the girls' advisory group reviews a simple drawing of the pathway; two head teachers and three mentors comment in a one-hour meeting; one foundation funder and the county education office are asked where the logic is weakest. Achieng records every change and the reason.",
      "narrative": "Girls in Kisumu public schools get little hands-on science, have few women in science to look up to, and many drop science subjects in secondary school. We run weekly clubs in 14 schools, a holiday camp, mentoring by local women scientists and termly parent sessions. We expect girls' confidence and practical skills to improve, parents to back their choices, and more girls to choose science subjects at secondary school. Over time, this should contribute to more young women from Kisumu in science study and careers. It depends on head teachers giving club time, mentors staying and families affording secondary science, which is our least certain link.",
      "review": "Version 1.1, March 2027: added termly parent sessions after testing. Next review: February 2028, after this year's subject-choice data. Earlier review if a funder leaves or the curriculum changes how subjects are chosen."
     },
     "notice": "See how the girls themselves review the pathway, through a drawing they can discuss. Copy the habit of writing down each change and why it was made."
    },
    {
     "org": "social",
     "profile": {
      "testing": "Over six weeks: Diego interviews four current trainees and three graduates; Lucía asks three employer partners whether the certificate changes their hiring; the municipality's youth programme reviews the recruitment steps. A business adviser checks whether the pathway is affordable at current sales.",
      "narrative": "In our district, young people who left school early struggle to find formal, safe work: they lack qualifications and work history, and employers distrust them. We offer twelve paid six-month bakery apprenticeships a year, with weekly mentoring, a recognised certificate and job-matching with eight employers. We expect trainees to gain skills and reliability, earn the certificate and receive formal job offers within three months, then keep and progress in those jobs. This depends on employers hiring certified graduates, trainees managing six months on the wage we pay and bakery sales covering most costs. We follow up every graduate at 3 and 12 months.",
      "review": "Version 1.0, November 2026. Next review: after the second cohort finishes, about mid-2027. Earlier review if fewer than half of a cohort receive job offers, or flour prices push the bakery below break-even."
     },
     "notice": "Notice the test of affordability by a business adviser: in a social enterprise the pathway must also pay. Copy the review trigger, a clear threshold rather than a vague feeling."
    },
    {
     "org": "coop",
     "profile": {
      "testing": "At the next general meeting: Meera presents the pathway in Malayalam with a picture of each step; members discuss in small groups; the committee records objections. A retail shop buyer and an online marketplace contact comment on the sales assumptions.",
      "narrative": "Our member weavers earn too little, and too irregularly, because middlemen take most of the price, yarn bought alone is expensive, quality is uneven and power-loom copies compete. Together we buy yarn in bulk, check every piece, create two design collections a year and sell direct to shops and online, paying members within 15 days. We expect lower yarn costs and better quality first, then more direct sales at fairer prices, and in time a higher, steadier income and young people seeing weaving as a living. This depends on members keeping quality standards, buyers paying more for authentic handloom and enough working capital for yarn.",
      "review": "Version 2.0, January 2027, approved by the general meeting. Next review: the annual general meeting. Earlier review if a large grant, such as the dye unit, is offered, or yarn prices rise sharply."
     },
     "notice": "Look at who approves the version: the general meeting, because members decide. Copy the choice of language and pictures so every member can take part."
    },
    {
     "org": "hybrid",
     "profile": {
      "testing": "Before the trustees' meeting in May: Priya runs a workshop with eight volunteers; the volunteer coordinator asks ten repair café visitors from low-income areas; the council waste team and one local repairer comment. Tom brings a summary of changes to the trustees.",
      "narrative": "In Leeds, households throw away items that could be repaired, wasting money and resources. Repair skills and affordable repair are disappearing, which hits low-income households hardest. We run free weekly repair cafés, a tool library, school workshops and a shop selling refurbished goods whose profits support the charity. We expect residents to get items fixed and learn simple repairs, then to repair or borrow tools before buying new. Over time, this should contribute to less household waste and lower costs. It depends on residents trusting volunteer repairs, enough skilled volunteers, repaired items lasting, and the cafés reaching low-income households, not only confident regulars.",
      "review": "Version 1.2, May 2027, approved by trustees. Next review: May 2028, with the annual report. Earlier review if a safety incident occurs, the workshop lease changes or the council changes its waste priorities."
     },
     "notice": "Notice the local repairer among the reviewers: someone who could lose business. Copy that idea; the people who might be harmed often see the weakest link."
    }
   ]
  }
 }),
 review("pathway","Your Theory of Change")
 ]
});
