import base from './m01-strategic-foundations.js?v=c1687a22e';
import {adapt} from './adapt.js?v=c1687a22e';
// Entrepreneurs' version of m01: same lessons, fields, workbook and tools; wording for people building something new.
const m=adapt(base,{
 title:'Strategic Foundations',
 short:'Purpose, context, stakeholders, vision, mission, values, form, positioning and objectives for what you are building',
 intro:'Make the connected decisions everything you build will depend on: why your initiative should exist, the context it will enter, who matters, the future you want, the work you will do, how you will behave, what kind of organisation to create, where you can add unique value and what you will prioritise first. Plan them for one to five years ahead. If your idea is very new, plan for a shorter time, or plan for five years with a one-year pilot and review everything after that first year. This foundation will guide all your work, so come back to it and review it often.',
 output:'Strategic Foundation',
 promo:{
  headline:'Turn your first objectives into a living strategy',
  pitch:'Strategic Objectives keeps your external and internal objectives side by side, with actions, owners, progress and review decisions. Import this module’s workbook and your objectives become a plan you and your co-founders can update every quarter as you build.'
 }
},{
 purpose:{
  learn:[
   'Purpose explains why what you are building needs to exist. Start with a specific unmet need and the people or environment affected by it. A personal motivation often starts the journey, and that is fine, but a new organisation needs a reason that matters beyond its founders if others are to join it, fund it or buy from it.',
   'Separate the need from your preferred solution. Founders often fall in love with an idea before they have checked the problem. “We need a training bakery” names a solution; “young people in our neighbourhood who left school early cannot find a first job” names a problem. A placement scheme with bakeries that already exist might meet that need better.',
   'Before you build anything, talk with the people affected, including those who may disagree with your idea or see no need for it. Record what you have heard, what evidence you have and what is still an assumption. Module 2 looks at causes in depth; here you only need a clear, honest description of the need.',
   'A useful purpose statement names the change that motivates you without promising more than you can influence. It should still make sense if your first idea changes, which it probably will, and it helps you decide whether a new opportunity belongs in what you are building.'
  ],
  weak:'We want to start something that makes a difference.',
  strong:'“We exist so that young people who left school early can build skills and a working life, and our neighbourhood has good bread at a fair price.”',
  why:'It names who is affected and the change they need, but leaves room to test different ways of getting there before you commit to one.',
  reflect:'Whose description of the problem have you heard so far? Who have you not yet asked?',
  exercise:'Write the need before drafting your purpose. Name one evidence gap and a realistic way to investigate it in the next few weeks, before you invest more time or money.',
  fields:{
   need:{label:'The need we want to address',hint:'Who experiences the problem, where, and what happens as a result?'},
   evidence:{label:'Evidence and open questions',hint:'Keep three lists apart, so a guess never passes for a fact.',type:'parts',parts:[
    {label:'What we know',placeholder:'Facts you have seen or heard from the people affected, e.g. young people at the youth centre say employers ask for experience they cannot get.'},
    {label:'What we assume',placeholder:'What you believe but have not checked yet, e.g. neighbours will choose our bread over the supermarket’s.'},
    {label:'What we need to learn',placeholder:'The questions to answer next, and how you will find out, e.g. would the two cafés buy wholesale? Ask them before we bake.'}]},
   purpose:{label:'Our purpose',hint:'We exist so that…'}
  },
  check:'Could someone understand why your initiative should exist without knowing your planned activities?'
 },
 context:{
  learn:[
   'Before you build anything, look at the world your idea will enter. Who has the problem, how do they solve it today, and what is changing around them? Prices, rules, technology, local habits and the weather can all open a door for your idea or close one. Context analysis turns these into a short, honest picture you can act on.',
   'Map who is already active: businesses selling something similar, public services, nonprofits, informal groups and the “do nothing” option people use today. Note what each offers, to whom, at what price or cost, and how well. Competitors and alternatives are good news: they prove the need exists. Your job is to find the gap they leave, the people they miss or a way to work with them, which can sometimes mean joining an existing effort instead of starting your own.',
   'Use two simple frameworks as prompts, not forms. A PESTLE scan looks at six outside factors: political, economic, social, technological, legal and environmental. A SWOT analysis sets your strengths and weaknesses (inside: your skills, money, time and network) against the opportunities and threats around you (outside). Write each point as a specific observation with a source, even if the source is your own conversations with future customers or users, and say what it means for your idea.',
   'Revisit your context before each big step, such as registering, launching, setting prices or accepting your first funding or investment. A new competitor, a law, a price change or a crisis can change the picture. The decisions in the rest of this module, from your purpose to your objectives, rest on it.'
  ],
  weak:'There is a big market and nobody is doing this well.',
  strong:'Economic: rents near the market rose about 20% this year (two landlords we spoke to), so our first space must be shared or mobile. Who is active: two cafés sell coffee but neither offers training jobs for young people; the youth centre runs courses but has no work placements, so it could refer trainees to us.',
  why:'Each point names a specific change or actor, its source and what it means for the idea, so it can shape a real decision: where to start, what to charge and who to partner with.',
  reflect:'Which business or group already serving these people could become your partner, your supplier or your first customer, and which would see you as competition?',
  exercise:'Scan the six outside factors, list the main businesses and groups already active, and finish with a SWOT analysis of your idea.',
  fields:{
   trends:{label:'Context scan (PESTLE)',hint:'One line per factor: what you observed, where it comes from and what it means for your idea. Leave a line empty only if nothing relevant applies.',type:'table',
    columns:[{label:'Factor'},{label:'What you observed',placeholder:'e.g. rents near the market rose this year'},{label:'Source',placeholder:'e.g. two landlords'},{label:'What it means for your idea',placeholder:'e.g. start in a shared space'}],
    rowLabels:['Political','Economic','Social','Technological','Legal','Environmental']},
   actors:{label:'Who is already active',hint:'Competitors, alternatives and possible partners: one per line.',type:'table',rows:5,
    columns:[{label:'Business, group or service',placeholder:'e.g. Corner café'},{label:'What they offer',placeholder:'e.g. coffee and snacks'},{label:'For whom',placeholder:'e.g. office workers'},{label:'Gap, overlap or partnership',placeholder:'e.g. no training jobs: possible partner'}]},
   swot:{label:'SWOT analysis',hint:'Two or three specific points in each box. Strengths and weaknesses are inside (your skills, money, time, network); opportunities and threats are outside.',type:'parts',layout:'swot',
    parts:[{label:'Strengths',placeholder:'e.g. ten years as a baker; a trusted name in the neighbourhood'},{label:'Weaknesses',placeholder:'e.g. no savings for equipment; only weekends free'},{label:'Opportunities',placeholder:'e.g. the market reopens in March with new stalls'},{label:'Threats',placeholder:'e.g. rising flour prices; a chain opening nearby'}]}
  },
  check:'Is each observation specific, sourced and connected to what it means for your idea?'
 },
 stakeholders:{
  learn:[
   'Stakeholders are the people and organisations who will affect, or be affected by, what you build: the people you want to serve, communities, your co-founders and the first volunteers or staff who join, customers, members or funders, partners, regulators, local authorities, and anyone who could support or block what you do.',
   'Separate four roles that are often confused: who benefits, who pays, who decides and who influences. In a nonprofit the person who benefits rarely pays. In a social business the paying customer may be an employer or a public body rather than the end user. In a cooperative the members may hold several roles at once. Naming these roles before you launch stops you designing for the wrong person.',
   'An influence–interest grid helps you decide how to engage each group, even before you launch. Involve closely those with high interest and high influence, consult those with high influence and low interest, keep informed those with high interest and low influence, and monitor the rest. Pay particular attention to people with high interest but little power: they are the easiest to overlook when you are busy getting started.',
   'You will come back to this map in your Theory of Change, when you ask whose behaviour has to change for your outcomes to happen, and again as you grow and new groups appear.'
  ],
  weak:'Stakeholders: the community, funders and the government.',
  strong:'Trainees: benefit; high interest, low influence. A monthly conversation with the founders.\nMarket shoppers: pay; their choices decide whether we survive. Ask for feedback at the stall every week.\nCafés and canteen: pay wholesale and decide on orders. Agree terms before we launch.\nYouth centre: refers trainees and influences who applies. Meet every month.\nYouth fund: pays a US$6,000 grant and decides on renewal. A short report each quarter.',
  why:'It separates who benefits (trainees) from who pays and decides (shoppers, cafés, the youth fund), and says how each group will be engaged from the start, which makes the map usable.',
  reflect:'Who will be affected by what you build but has the least say in it?',
  exercise:'Build a stakeholder map for your idea and decide how you will engage each priority group before and after you launch.',
  fields:{
   map:{label:'Stakeholder map',hint:'Stakeholder (e.g. trainees) | role (benefits / pays / decides / influences) | interest (e.g. high) | influence (e.g. low) | how we will engage (a monthly conversation with the founders).'},
   overlooked:{label:'Who could be overlooked',hint:'Which group has high interest but little influence, and how will you include them from the start?'}
  },
  check:'Have you separated who will benefit, who will pay, who decides and who influences?',
  anatomy:{
   title:'Four roles, four questions',
   intro:'One group can hold more than one role. The examples are for our bakery.',
   cols:['Role','Ask','Example'],
   rows:[
    ['Benefits','Whose life or environment should change?','Young people who left school early, trained in paid traineeships; families who buy good bread at a fair price.'],
    ['Pays','Whose money will keep the work going?','Market shoppers and neighbours; two cafés and an office canteen that buy wholesale; the local youth fund.'],
    ['Decides','Who can say yes or no to what you do?','The market manager who allocates stall pitches; the shared kitchen that rents us a slot; the food-safety inspector.'],
    ['Influences','Who shapes results without a formal decision?','The youth centre that refers trainees; neighbours who recommend us; other bakers at the market.'],
    ['Several at once','Does any group hold more than one role?','A trainee who lives nearby benefits from the traineeship and may also buy our bread.']
   ]
  }
 },
 vision:{
  learn:[
   'A vision describes the future you want to help create. It is about conditions outside the organisation you are building: what will be different for people, communities or the environment if things go well?',
   'Vision sits between purpose and mission. Purpose says why you exist, vision says what future you are working towards, and mission says what you will do, starting now, to help get there.',
   'A vision is not a list of services, a revenue target, a picture of how big your organisation will become or a claim that you alone will change society. Many organisations and communities contribute to the same future. Be ambitious, and honest about your part, especially when you are just starting.',
   'Start with the people or place you want to serve, imagine an important barrier removed and describe the result in everyday words. Then read it to someone affected by the issue and ask what they picture. If their answer is vague, replace abstract words with a concrete condition, and keep the sentence short enough to remember and repeat when you explain your idea.'
  ],
  weak:'We want to help communities.',
  strong:'“A neighbourhood where every young person has a way into good work, and good food is affordable.”',
  why:'It names a place, the people and the conditions that would be different, without mentioning the stall, the shop or the traineeships the founders plan to run.',
  reflect:'If what you are building succeeded, what would people be able to do that they cannot do now?',
  exercise:'Describe the future first, then reduce it to one memorable sentence. Test that sentence with someone affected by the issue before you put it on a website or a registration form.',
  fields:{
   future:{label:'What would change?',hint:'Describe conditions for people or the environment, rather than how big your organisation will grow.'},
   vision:{label:'Our vision',hint:'A future where…'},
   visionTest:{label:'Feedback to seek',hint:'Who among the people affected and your early supporters will check whether this future reflects their priorities?'}
  },
  check:'Does your vision describe a desired future rather than the services you plan to offer?',
  anatomy:{
   title:'Purpose, vision and mission',
   intro:'Three statements that answer different questions, shown for our bakery at the pilot stage.',
   cols:['Statement','The question it answers','Example'],
   rows:[
    ['Purpose','Why do we exist?','So that young people who left school early can build skills and a working life, and our neighbourhood has good bread at a fair price.'],
    ['Vision','What future are we working towards?','A neighbourhood where every young person has a way into good work, and good food is affordable.'],
    ['Mission','What will we do, for whom and how?','We bake and sell good bread, and train young people who left school early, through paid traineeships in a real bakery, starting with one market stall.']
   ]
  }
 },
 mission:{
  learn:[
   'A mission says what your organisation will do, for whom and how. It turns your purpose into a practical scope that your co-founders, the first people who join, partners, customers and supporters can use. Vision is the future you want; mission is the work you will do towards it.',
   'A useful starting structure is: “We help [people] achieve [change] through [approach].” Adapt it so it sounds natural. Name your main approach without listing every activity you have in mind, and include a place when it really limits your scope. Starting narrow is a strength, not a weakness.',
   'Common mistakes are trying to serve everyone, claiming to solve the whole problem and using jargon that hides the actual work. Do not describe a planned capability as a fact. At the start most of your approach is untested, so say what is a proposal and how you will test it.',
   'Use the mission as a decision filter from day one. Our bakery, for example, might decide not to open a café even when it could make money, because serving tables would leave less time for training. A clear mission makes choices like this easy to explain to co-founders, funders and customers.'
  ],
  weak:'We will provide innovative solutions for everyone in need.',
  strong:'“We bake and sell good bread, and train young people who left school early, through paid traineeships in a real bakery, starting with one market stall.”',
  why:'It names who benefits, the change and the approach, so a reader can tell at once which projects fit and which do not.',
  reflect:'Which attractive opportunity, offer or grant would fall outside your mission?',
  exercise:'Draft one sentence. Underline who you will serve, what will change and your approach. If one is missing, revise the sentence.',
  fields:{
   people:{label:'Who we will serve',hint:'Be specific about the people, organisations or ecosystems you will start with, e.g. young people aged 17–24 who left school early, referred by the youth centre, and neighbours who shop at the market.'},
   approach:{label:'Our main approach',hint:'What will you actually do, and what is still a proposal to test?'},
   mission:{label:'Our mission',hint:'We help… through…'},
   boundaries:{label:'What we will not take on',hint:'Name one boundary that keeps your work focused while you start, e.g. we will not open a café or cater events in year 1.'}
  },
  check:'Could a new co-founder, volunteer or partner explain your work after reading this once?',
  anatomy:{
   title:'The parts of a mission sentence',
   intro:'Check your draft for each part, shown here for our bakery.',
   cols:['Part','Question','Example'],
   rows:[
    ['Who you serve','Who exactly benefits?','Young people aged 17–24 who left school early; neighbours who buy bread'],
    ['Where','Does a place limit your scope?','One neighbourhood, starting with a stall at the weekly market'],
    ['The change','What will be different for them?','Baking skills and a first paid job; good bread at a fair price'],
    ['Your approach','How will you mainly do it?','Six-month paid traineeships in a real bakery, with a mentor and a food-hygiene certificate']
   ]
  }
 },
 values:{
  learn:[
   'Values are the principles that guide what you do when decisions are hard. A single word such as integrity or inclusion is only a starting point. Describe what people will actually do, and how you would notice whether it happens.',
   'Choose a small set you can practise consistently; three to five is a useful range. Agree them with your co-founders and, where you can, with the first people who will be expected to live by them. Do not adopt a value just because other organisations display it.',
   'For each value, explain in one sentence what it means for you, how it will show in what you do and what you will avoid. Respect for trainees might mean paying them for training hours as well as shifts, and setting shift times they can actually reach. That takes time and money, not only welcoming words, so it belongs in your first budget too.',
   'Values can pull against each other. Openness does not mean publishing private information about trainees. Agree now how you will handle trade-offs and who can raise a concern safely, before your first hard decision arrives. Values set early shape the culture of everything you build, and they will come back when you write your code of conduct.'
  ],
  weak:'Our values will be excellence, integrity and impact.',
  strong:'Respect: we listen to trainees before we decide, and treat them as colleagues, not cases.\nHonesty: we say what goes into our bread, and we never promise a trainee a job we cannot offer.\nOpenness: trainees, partners and our funder can see how money is raised and spent.\nLearning: we test recipes and training ideas early, admit mistakes and change course when the evidence asks us to.',
  why:'Each value is a short word followed by what it means for you in practice, so anyone joining you understands what to expect and can tell whether you live by it.',
  reflect:'What principle would you protect even if it cost time, revenue or a funding offer?',
  exercise:'Choose three to five values. For each one, explain in a sentence what it means for you, how it will show in what you do and what you will avoid. Then test them against one difficult decision you can foresee in your first year.',
  fields:{
   values:{label:'Our values in practice',hint:'One per line: value (e.g. respect) | what it means for us (e.g. we listen to trainees before we decide) | how it shows in practice (e.g. a monthly trainee meeting) | what we avoid (setting shift times without asking trainees).'},
   tradeoff:{label:'A difficult decision we can foresee',hint:'Which values could conflict as you start, and how would you decide?'}
  },
  check:'Could someone joining you observe whether you are practising each value?'
 },
 form:{
  learn:[
   'Your organisational form is the legal and economic vehicle for your mission, and choosing it is one of the first big decisions you will make. The main families are informal groups, nonprofits (associations, charities, nonprofit companies), foundations, companies with a social purpose, cooperatives owned by their members, and hybrids that combine a nonprofit with a trading company.',
   'Each form answers four questions differently: who controls it, what happens to any surplus, how it can raise money and what it must report. Names and rules differ by country, so treat the table below as a general guide and check the rules where you are.',
   'Choose the form that fits how your work will be resourced and governed, not the one that sounds most credible. If most income will come from sales, a company or social business may fit. If you will rely on grants and donations, a nonprofit may fit. If the people you serve will own and run it together, a cooperative may fit. Many groups start informally, test the idea and formalise later.',
   'Confirm your options with qualified local advice, such as someone with a legal background or an accountant who knows your sector, before you register. Changing form later is usually possible but costs time and money. Later modules cover governance and registration for the form you choose.'
  ],
  weak:'We will register as a nonprofit because funders like nonprofits.',
  strong:'Most of our income will come from selling bread, so a company fits. We are considering a legal status that locks in our social purpose, and may add a partner nonprofit later for training grants. We will check both with someone with a legal background before we register.',
  why:'It reasons from where the money will come from and how the purpose will be protected, and names what still needs advice.',
  reflect:'Where will most of your resources come from in three years, and would your intended form allow that?',
  exercise:'Use the table above to pick two or three forms that could suit you, including staying informal for now. Note why each could fit and what worries you, then choose your current preference and list what you still need to check before you register.',
  fields:{
   options:{label:'Options you are considering',hint:'Form (e.g. informal group, nonprofit, company, cooperative) | why it could fit you (e.g. most income will come from selling bread) | what worries you about it (profits could be paid out unless our rules lock in the purpose). Two or three options are enough, and staying informal for now counts as one.'},
   choice:{label:'Current preference and reasons',hint:'Which form fits best for your start, and what would make you change it later?'},
   advice:{label:'Questions to ask before you register',hint:'What do you still need to check with someone who knows the rules where you are? For example: can a company with a social purpose still receive a grant from the local youth fund?'}
  },
  check:'Does your preference follow from how the work will be resourced and governed, rather than from what sounds most credible?',
  anatomy:{
   intro:'A general picture to help you compare options before you register: names, rules and tax treatment differ by country, so check the rules where you are.',
   rows:[
    ['Informal group','Founders and members agree among themselves; no separate legal entity, so members may be personally liable','Founders’ own money and small donations; grants and bank accounts are harder'],
    ['Nonprofit (association, charity, nonprofit company)','Members or a board; surplus stays in the organisation, never paid to owners','Grants, donations, fees for services, some sales'],
    ['Foundation','A board manages assets for a set purpose; often no members; surplus stays in','A founding gift or endowment, grants, donations'],
    ['Company with a social purpose','Shareholders; profits can be paid out unless bylaws or a special status limit it','Sales, loans, investment; rarely charitable grants'],
    ['Cooperative','Members, usually one member one vote; surplus can be shared among members','Member shares, sales, loans; some public schemes'],
    ['Hybrid (nonprofit plus trading company)','The nonprofit owns the company; company profits pass to the nonprofit','Grants and donations to the nonprofit; sales through the company']
   ]
  }
 },
 positioning:{
  learn:[
   'Positioning is the specific place your initiative will take in its landscape: the need you focus on, the people you serve, your approach and why you are well placed to do it. It answers one question: why you, rather than someone else, or no one?',
   'Your comparative advantage might be trust in a community, specialist skills, lived experience, lower costs, a distinctive method, relationships or access to a channel others cannot reach. At the start it often lies in the founders themselves. Be honest. “Passion” and “innovation” only count if you can show what they produce, and some advantages will still need to be proven.',
   'Positioning is also about choices. Decide what you will not do, which groups you will not prioritise for now and what you will refer to others. Saying no protects quality when your time and money are limited, and makes partnership easier, because others can see where you fit.',
   'This is strategic positioning: where you will add value that others do not. How you express that position in words and images comes later, in Module 7.'
  ],
  weak:'We will be unique because we care more than anyone else.',
  strong:'The only bakery in our neighbourhood that trains young people while they work: one of us has ten years of baking experience and the other six years with young people at the youth centre. We sell bread and cakes, but we will not open a café.',
  why:'It names an advantage others can check, a clear focus and the work it turns down from the start.',
  reflect:'If you never started, what would be missing that no one else provides?',
  exercise:'Write your positioning statement and list the choices it implies. Mark any advantage you still need to prove.',
  fields:{
   advantage:{label:'Our comparative advantage',hint:'What do you and your co-founders bring that others do not, and what evidence shows it?'},
   position:{label:'Positioning statement',hint:'For [people] who [need], we will [approach], unlike [alternatives], because [advantage].'},
   choices:{label:'What we will not do',hint:'Work, groups or opportunities you will decline or refer while you start, e.g. no café, no catering, no trainees under 17.'}
  },
  check:'Is your advantage something you can show, or clearly marked as something still to prove?'
 },
 objectives:{
  learn:[
   'Strategic objectives are the few most important results you will work towards over your first planning period, anywhere from one to five years. If your idea is very new, choose a shorter period, or plan for five years and treat the first year as a pilot you review before going further. They turn your mission into priorities. Activities describe the work you do; objectives describe the result that work should produce.',
   'Separate two kinds. External strategic objectives (ESO) describe the change you want for the people, communities, customers or environment you will serve. Internal strategic objectives (ISO) describe the capabilities you need to build to deliver that change: governance, people, systems, finance, brand and partnerships. For a new initiative these often include registering, finding first funding or customers and building a small team. Keeping them apart stops setting-up work crowding out your mission, and stops capacity being forgotten.',
   'Keep the set small: two to four external and three to five internal objectives is a manageable start, and fewer is fine if you are alone or with one co-founder. Give each a code, such as ESO1 or ISO1, so plans, budgets, indicators and risks can refer to it. For each, describe in plain words what success looks like at the end of the period and name one owner, even if every owner is a founder. Do not invent numbers you cannot yet support; indicators come in Module 6.',
   'Check each objective against your time, money and assumptions, and write down what you will postpone to make room. An objective without resources is a wish, and many new initiatives struggle because they try to do too much too soon.'
  ],
  weak:'Raise awareness and grow quickly.',
  strong:'ESO1: Position ourselves as the neighbourhood’s trusted bakery for fresh, affordable bread.\nESO2: Young people who left school early gain baking skills and a first paid job.\nESO3: Local families buy good bread at a fair price, and less food is wasted.\nISO1: Governance and legal: the business is registered and the founders agree how decisions are made.\nISO2: Financial sustainability: sales cover our core costs within 18 months.\nISO3: People and skills: a small trained team and a safe, structured training programme.\nISO4: Systems and visibility: simple systems for orders, money and stock, and a brand people recognise.',
  why:'It separates the change for customers and young people from what the founders must build to deliver it, and each can later carry indicators, a budget and risks.',
  reflect:'Which internal capability, if you do not build it early, would most limit your external objectives?',
  exercise:'Draft your external and internal objectives with codes, a picture of success and an owner. Record what you will postpone until you have the people and money to do it well.',
  fields:{
   objectives:{label:'Objectives portfolio',hint:'One per line: code (ESO1 / ISO1) | objective (e.g. young people who left school early gain baking skills and a first paid job) | what success looks like at the end of the period (e.g. 3 of 4 trainees finish; 2 find a job within three months) | owner (a founder is fine).'},
   priorities:{label:'Choices and capacity',hint:'What will you postpone so these first objectives have enough time and resources? For example: a shop of our own waits until year 2.'}
  },
  check:'Have you separated external results from the internal capabilities you need to build, with a code and an owner for each?',
  anatomy:{
   title:'External and internal objectives',
   intro:'Two kinds of objective, kept apart so that each gets attention while you build.',
   cols:['','External (ESO)','Internal (ISO)'],
   rows:[
    ['Describes','The change for the people, community or environment you will serve','The capabilities you need to build to deliver that change'],
    ['Typical areas','Skills, income, behaviour, living or environmental conditions','Registration, governance, first team, systems, finance, brand, partnerships'],
    ['Where it goes next','Gets its own Theory of Change pathway in Module 2','Appears as inputs and conditions in those pathways']
   ]
  }
 },
 foundation:{title:'Your Strategic Foundation'}
});

// Purpose, vision and mission are taught together in lesson 1.1: people starting out often mix them up, and seeing
// the three side by side, answering different questions, makes the difference clear. Their exercises stay the same.
const [purpose,vision,mission]=['purpose','vision','mission'].map(id=>m.lessons.find(l=>l.id===id));
Object.assign(purpose,{
 title:'Purpose, vision and mission',minutes:45,
 learn:[
  'Purpose, vision and mission are three short statements that answer three different questions. Purpose: why should this exist? Vision: what future are we working towards? Mission: what will we do, for whom and how? People starting out often mix them up, so this lesson builds all three together, in that order.',
  'Purpose explains why what you are building needs to exist. Start with a specific unmet need and the people or environment affected by it, not with your favourite solution. “We need a training bakery” names a solution; “young people in our neighbourhood who left school early cannot find a first job” names a problem. A personal motivation often starts the journey, but others will only join, fund or buy if the reason matters beyond you. Talk with the people affected first, and keep what you know apart from what you assume.',
  'Vision describes the future you want to help create: what will be different for people, communities or the environment if things go well. It is not a list of services, a revenue target or a picture of how big you will grow. Many people and organisations contribute to the same future, so be ambitious and honest about your part. Read it to someone affected by the issue and ask what they picture; if their answer is vague, make it more concrete.',
  'Mission says what you will actually do, for whom and how. A useful structure is: “We help [people] achieve [change] through [approach].” Name your main approach without listing every activity, and include a place when it limits your scope. Starting narrow is a strength. At the start much of your approach is untested, so say what is still a proposal.',
  'Use the three together as a filter from day one. Purpose stays steady even if your first idea changes; vision keeps you pointed at the same future; mission tells you which opportunities fit now and which to turn down, even when they bring money. Write the need first, then the purpose, then the future, then the work.',
  'Think ahead, but not forever. Your foundation should look one to five years ahead. If what you are building is very new, a shorter horizon is fine, or plan for five years with a one-year pilot and review after that year. Because this foundation will guide all your work, from your plans to your budget, treat it as a living document: come back to it at least once a year and whenever something important changes, such as a pilot ending, a new partner or a change in the rules.'
 ],
 anatomy:{...vision.anatomy,after:0,intro:'Three statements, three questions, shown for our bakery at the pilot stage.'},
 weak:'We want to make a difference, help communities and offer innovative solutions for everyone.',
 strong:'Purpose: “We exist so that young people who left school early can build skills and a working life, and our neighbourhood has good bread at a fair price.”\nVision: “A neighbourhood where every young person has a way into good work, and good food is affordable.”\nMission: “We bake and sell good bread, and train young people who left school early, through paid traineeships in a real bakery, starting with one market stall.”',
 why:'Each statement answers its own question: why the bakery exists, the future it works towards and the work it will do now. Together they tell a reader which opportunities fit (a wholesale order from a café) and which do not (opening a café of its own).',
 reflect:'If what you are building succeeded, what would people be able to do that they cannot do now, and which attractive opportunity would fall outside your mission?',
 exercise:'Work in order: describe the need and your evidence, write your purpose, describe the future and your vision, then write your mission and one boundary. Test the vision and mission with someone affected before you put them on a website or a registration form.',
 check:'Does each statement answer its own question: why you exist, the future you want and the work you will do?',
 fields:[
  ...purpose.fields.map((f,i)=>i===0?{...f,section:'Purpose · why should this exist?'}:f),
  ...vision.fields.map((f,i)=>i===0?{...f,section:'Vision · what future are we working towards?'}:f),
  ...mission.fields.map((f,i)=>i===0?{...f,section:'Mission · what will we do, for whom and how?'}:f)
 ]
});
m.lessons=m.lessons.filter(l=>l!==vision&&l!==mission);
m.merged={vision:'purpose',mission:'purpose'}; // old addresses of 1.4 Vision and 1.5 Mission lead to 1.1
export default m;
