import {module,lesson,review} from './kit.js';
// Idea into Impact (entrepreneurs track). Story bible: docs/idea-into-impact.md
export default module({
 id:102, no:2, slug:'idea-organise', phase:'Idea into Impact', track:'entrepreneurs',
 title:'Shape a first version', short:'Your solution and how change happens, a small pilot, your team and form',
 intro:'In this step you turn your problem and purpose into something you can try: a concrete offer, a small pilot and a team. It matters now because a small, honest first version costs little and teaches you more than any plan on paper.',
 output:'Solution and pilot', uses:[], workbook:{file:'Idea-into-Impact.xlsx',title:'Idea into Impact workbook'},
 lessons:[
  lesson({id:'solution',title:'Your solution and how change happens',stage:'Design',minutes:25,sheet:'Solution',tools:['theory-of-change'],
   learn:[
    'Your solution is what you will actually offer. Be concrete. Say what people get, how often and where. “Support for young people” is not yet a solution. “A planting day on the first Saturday of every month, at one site” is. A concrete offer is easier to test, to cost and to explain.',
    'Next, write how change happens. This is a very simple theory of change (a short chain that links what you do to the change you want). Use three lines. If we do this, then this happens for people, so that this bigger change follows. Each line should lead naturally to the next.',
    'Every chain rests on assumptions (things you believe but have not yet proved). Most are small. One or two are big: if they are wrong, the whole idea fails. Look back at what you heard in lesson 1.2. Ask yourself what must be true for people to take part and keep coming. Write that assumption down plainly.',
    'Keep the chain short and honest. Do not jump from one workshop to “ending hunger”. The purpose you wrote in lesson 1.3 is the “so that” at the end. In lesson 2.2 you will plan a pilot to test your biggest assumption. In lesson 3.1 you will choose measures for each step.'
   ],
   weak:'We will run an app, events and trainings that empower youth and transform the whole community.',
   strong:'Huerta Viva: “If women get an affordable kit and practical help once a month, then they grow vegetables at home on their patios, rooftops and balconies, so that they spend less on food, eat more vegetables, and some earn by selling what they grow.”',
   why:'It is three short steps that each lead to the next. It ends with a change Camila can see within months, not a slogan.',
   reflect:'Which step in your chain are you least sure about, and why have you not tested it yet?',
   exercise:'Describe what you will offer in plain words, then write your chain in three lines. Mark the one assumption that would sink the idea if it were wrong.',
   fields:[
    {key:'solution',label:'What you will offer',hint:'What people get, how often and where (e.g. a monthly workshop in the community hall plus a starter kit).'},
    {key:'chain',label:'How change happens',hint:'Three short lines: If we… / then… / so that… The “so that” should echo your purpose from lesson 1.3.'},
    {key:'assumption',label:'What must be true',hint:'The one or two things that must be true for this to work (e.g. parents let their children come every month).'}
   ],
   check:'Could someone who has never met you read your chain and see how each step leads to the next?',
   gallery:{title:'Three founders, same exercise',intro:'All three founders turn what they heard in their conversations into a concrete offer and a three-line chain.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      solution:'We will run a planting-and-monitoring day once a month at an agreed site on our coast. Trained youth team leaders will lead small groups of young people aged 12–17. They will plant the right mangrove species in the right places and check how earlier seedlings are doing. We will also run short sessions in the village school about why mangroves matter.',
      chain:'If we train young people to plant the right species in the right places and to monitor them,\nthen more seedlings survive and restored areas start to protect the coast,\nso that young people understand their coast and speak up for it in their villages.',
      assumption:'Parents let their children take part regularly. Several parents told us they worry about safety near the water, so this is the assumption we must test first. A second one: the shrimp pond owner keeps his word about a buffer strip and does not clear the site we plant.'
     },notice:'Notice that the biggest assumption comes straight from what parents said in lesson 1.2. Copy that: your conversations are the best place to find what must be true.'},
     {org:'huerta',profile:{
      solution:'I will sell a low-cost garden kit (containers, soil and seedlings) to women heads of household in Comuna 8, paid in small instalments. Each month there is one practical workshop in the neighbourhood. Women who grow more than they need can sell it at a shared Saturday market stall. Offices and schools pay full price for the same kit, and that margin pays for the workshops.',
      chain:'If women get an affordable kit and practical help once a month,\nthen they grow vegetables at home on their patios, rooftops and balconies,\nso that they spend less on food, eat more vegetables, and some earn by selling what they grow.',
      assumption:'Women keep their gardens going after the first month. Watering, pests and lack of time could all stop them. In my conversations, time was the biggest barrier, which is why I chose monthly, not weekly, workshops. I am also assuming that offices and schools will buy kits at full price.'
     },notice:'Notice how the offer explains who pays and how the workshops are funded, not only what women receive. Copy that if your idea needs to earn money.'},
     {org:'mentors',profile:{
      solution:'Every Saturday, trained university students mentor final-year junior high school pupils in Nima in small groups of four. Sessions happen in the school, in open classrooms. Part of each session is study help for the BECE (the national exam). The rest is guidance on choosing a senior high school programme, because pupils told us they wanted both.',
      chain:'If pupils meet a trained mentor every Saturday for study help and guidance,\nthen they prepare better for the BECE and make informed choices about their programme,\nso that more do well in the exam and enrol in a programme that suits them.',
      assumption:'University students keep coming every Saturday for a whole term. The students I spoke to were willing, but they need transport money, and exams and jobs compete for their time. I am also assuming parents trust the mentors enough to let their children come.'
     },notice:'Notice the chain stops at pupils enrolling in a programme that suits them, not at “changing their lives”. Copy that: end your chain where you can still see the result.'}
    ]}
  }),
  lesson({id:'pilot',title:'Start small: plan a pilot',stage:'Design',minutes:25,sheet:'Pilot',
   learn:[
    'A pilot is a small, time-limited test of your idea. It is not your whole project. It is a first version you can run with the time and money you have now. Its main job is to teach you something, above all whether the biggest assumption from lesson 2.1 is true.',
    'Keep it small. Fifteen or twenty people is plenty. Choose one place and one group. Set a fixed end date, such as three months or one school term. A clear end makes the pilot easier to agree with partners and families. It also makes it easier to stop.',
    'Decide what success looks like before you start. Choose two or three signs you can count or see, such as “15 of 20 gardens still producing at month four”. If you decide afterwards, you will be tempted to call anything a success. Also decide now what you will do if it fails. You might change one thing and try again, or you might stop.',
    'Then list what you need to run it. Think about time, people, a place, money and permissions. Some of these can be borrowed or given for free. In lesson 3.1 your success signs become your measures. In lessons 4.1 and 4.2 this list becomes your budget and your safety checks.'
   ],
   weak:'We will start with as many people as we can, in as many places as we can, and keep going until it works.',
   strong:'Next Step Mentors: “At least 5 of the 6 mentors attend at least 7 of the 8 Saturdays. At least 20 of the 24 pupils attend most sessions. Pupils and parents tell us the guidance helped them choose a programme.”',
   why:'The numbers are small, fixed and written down before the pilot starts, so nobody can argue the result away afterwards.',
   reflect:'If your pilot failed, would you honestly be willing to change your idea or stop?',
   exercise:'Describe a pilot you could start within the next three months with what you have now. Write your success signs before you plan anything else.',
   fields:[
    {key:'pilot',label:'Your pilot',hint:'What, for whom, how many people, where and how long (e.g. 6 workshops for 15 parents in one neighbourhood over 3 months).'},
    {key:'success',label:'What would tell you it works',hint:'2–3 signs you can count or see, decided before you start (e.g. 12 of 15 people come to every session).'},
    {key:'needs',label:'What you need to run it',hint:'Time, people, place, money, permissions — one per line (e.g. Place: a free room at the library).'}
   ],
   check:'Does your pilot have a fixed end date, and success signs you wrote down before starting?',
   gallery:{title:'Three founders, same exercise',intro:'Each founder plans a pilot small enough to run with what they have, with an end date and success signs fixed in advance.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      pilot:'Three planting days over three months, at one agreed site in one of our two villages. We will invite 15 young people aged 12–17, working in small groups with trained youth team leaders. Together we will plant 500 seedlings of the species Sari has chosen for that site. The pilot ends after three months, when we count how many seedlings are still alive.',
      success:'At least 12 of the 15 young people come to all three planting days. At least 60% of the 500 seedlings are still alive after three months. If attendance is low, we will talk to parents again before planning more days. If most seedlings die, we will change the site or the species before planting again.',
      needs:'Time: about two days a week each from Wayan and Sari, plus the four volunteers on planting days\nPeople: trained youth team leaders and at least two adults at every session\nPlace: one site agreed in writing with the village head\nMoney: seedlings, boots, gloves, boat hire, snacks, water and first aid\nPermissions: village heads’ written permission and parents’ consent forms'
     },notice:'Notice the pilot uses one site in one village, not both villages at once. Copy that: start where you are best known, and widen later.'},
     {org:'huerta',profile:{
      pilot:'20 garden kits for women heads of household in one sector of Comuna 8, over four months. Each woman gets a kit paid in small instalments, four monthly workshops in the neighbourhood and a place at two Saturday market stalls. Luz Marina will invite women she knows and trusts. The pilot ends at month four, when we decide whether to grow, change or stop.',
      success:'15 of the 20 gardens are still producing at month four. Women tell us they are spending less on vegetables each week. At least 5 women sell something at the stall. If fewer than 15 gardens survive, I will ask the women why before buying a single extra kit.',
      needs:'Time: about 15 hours a week from me, unpaid during the pilot\nPeople: Luz Marina to recruit women and help run workshops\nPlace: a free room for workshops, and a spot for the Saturday stall\nMoney: about US$1,000 from my savings for kits, materials, stall fees and transport\nPermissions: registration with the tax office (RUT) so I can sell kits'
     },notice:'Notice that “15 of 20” is decided before a single kit is delivered. Copy that habit: write your number down now, so you cannot move it later.'},
     {org:'mentors',profile:{
      pilot:'Eight Saturdays in one school term, at one school in Nima. Six trained university students mentor 24 final-year pupils in groups of four. Each session mixes BECE study help with guidance on choosing a senior high school programme. The pilot ends after the eighth Saturday, when we ask pupils, parents and mentors what helped and what did not.',
      success:'At least 5 of the 6 mentors attend at least 7 of the 8 Saturdays. At least 20 of the 24 pupils attend most sessions. Pupils and parents tell us the guidance helped them choose a programme. If mentors drop out, we will fix transport and support before we try another term.',
      needs:'Time: my evenings and Saturdays, about 6 hours a week\nPeople: Abena for study sessions, Yaw to recruit mentors, and six trained mentors\nPlace: two classrooms at the school on Saturdays\nMoney: mentors’ transport and snacks, printing past papers, police check fees\nPermissions: the head teacher’s agreement and parents’ written consent'
     },notice:'Notice the first success sign tests the biggest assumption from lesson 2.1: whether mentors keep coming. Copy that: make sure at least one sign tests your riskiest belief.'}
    ]}
  }),
  lesson({id:'team',title:'Your team and the form you need',stage:'Design',minutes:25,sheet:'Team and form',
   learn:[
    'Your team is everyone who will give regular time to the pilot. It might be just you and one friend. Write who does what, and how much time each person can really give. Be honest. Six hours a week is fine if you plan for six, not twenty.',
    'Then look for gaps. Who will keep the money records? Who will talk to parents or partners? A gap is not a failure. It tells you who to look for, or what to keep simple for now.',
    'Next, think about the form (the legal shape your project takes). In many places you do not need to register to run a small pilot. You can start as an informal group. Or an existing organisation can host you (sometimes called a fiscal host): it holds the money and lends you its bank account and policies. Later you might register a nonprofit, a company or a cooperative.',
    'Choose your form with three questions. Who will control it? Where will the money come from: sales, donations or grants? What will you have to report, and to whom? Rules differ by country, so check locally with a registry office, an adviser or a network of similar projects. In lesson 4.2 you will list what you must register, and in lesson 5.1 who will pay.'
   ],
   weak:'We will register an NGO first so we can get funding. Until then I will do everything myself.',
   strong:'Huerta Viva: “During the pilot I will sell kits as an individual, registered with the tax office (RUT). If the pilot works, I will register a company (S.A.S.) and look at BIC status, Colombia’s benefit company. A foundation is not the right fit, because most of our income will come from sales, not donations.”',
   why:'It chooses a form for now and a form for later, and the reason comes from where the money will come from.',
   reflect:'Are you planning around the time people can really give, or the time you wish they had?',
   exercise:'List everyone who will help and the time they can really give, then name the gaps. Write the form you will use for the pilot, and the questions you need to check locally.',
   fields:[
    {key:'team',label:'Who does what',hint:'One person per line: role, time they can give, what is missing (e.g. Ana: workshops, 4 hours a week).'},
    {key:'form',label:'The form for now and later',hint:'How you will run the pilot and what you might register later, and why (e.g. hosted by the parish now; maybe a cooperative later, because members will own it).'},
    {key:'questions',label:'What to check locally',hint:'Questions for a registry, an adviser or a network, one per line (e.g. Do I need a permit to sell at a market?).'}
   ],
   check:'Do you know whether you can run your pilot without registering, and who you will ask to confirm it?',
   gallery:{title:'Three founders, same exercise',intro:'Each founder names real hours and real gaps, picks a simple form for the pilot, and writes down what to check.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      team:'Wayan: schools, families and village heads. About two days a week, mainly weekends and school holidays.\nSari: species, sites and monitoring. About two days a week.\nFour volunteers: help on planting days and with school sessions.\nMissing: someone to look after the money and keep records.',
      form:'For now we will run as an informal group hosted by the village youth organisation (karang taruna), which families and village heads already know. That gives us a trusted home without registering anything yet. If the pilot works, we will decide between an association (perkumpulan) and a foundation (yayasan). We will take local advice first, because each one is run and controlled in a different way.',
      questions:'Does the karang taruna need to approve our activities in writing?\nCan the karang taruna hold the money we raise, and how will it record it?\nWhat is the difference between a perkumpulan and a yayasan for a youth-led group?\nDo we need permission to plant in this coastal zone, and from whom?'
     },notice:'Notice the form for now borrows trust from a group the villages already know. Copy that: a host can open doors faster than a registration.'},
     {org:'huerta',profile:{
      team:'Camila (me): growing, kits and sales. About 15 hours a week, alongside my part-time job.\nLuz Marina: recruiting women, building trust and finding a workshop venue. She is a community leader in Comuna 8.\nMissing: someone to keep the books.\nMissing: someone to sell kits to offices and schools.',
      form:'During the pilot I will sell kits as an individual, registered with the tax office (RUT). If the pilot works, I will register a company (S.A.S.) and look at BIC status, Colombia’s benefit company. A foundation is not the right fit, because most of our income will come from sales, not donations.',
      questions:'What do I need to sell kits as an individual with a RUT?\nDo I need to issue invoices, and what is the simplest way to do it?\nWhat does it cost, and how long does it take, to register an S.A.S. later?\nWhat would BIC status ask me to report each year?\nWho should I ask first: the DIAN, the chamber of commerce or an accountant?'
     },notice:'Notice that Camila picks her form by where the money will come from: sales, not donations. Copy that test before you choose a nonprofit by default.'},
     {org:'mentors',profile:{
      team:'Kwame (me): organiser and school relations. About 6 hours a week, evenings and Saturdays, because I work full-time at a bank.\nAbena: plans and leads the study sessions.\nYaw: recruits and supports the mentors.\nMissing: someone to handle the money and keep in touch with parents.',
      form:'We will start as an unregistered project hosted by the church youth programme. It already has a bank account and a safeguarding policy, which parents trust. Once we have run a full year, we plan to register as an NGO: first a company limited by guarantee, then registration with the Department of Social Welfare. The steps can change, so we will check the current ones locally.',
      questions:'Will the church hold our money in its account and show us the records?\nDoes the church safeguarding policy cover our mentors, or do we need our own?\nWhat are the current steps and fees to register a company limited by guarantee?\nWhat does the Department of Social Welfare ask NGOs to report?'
     },notice:'Notice the team list names real hours and a clear gap. Copy that honesty: a gap you have named is a gap you can fill.'}
    ]}
  })
 ]
});
