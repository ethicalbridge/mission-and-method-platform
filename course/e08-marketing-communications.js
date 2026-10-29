import base from './m08-marketing-communications.js?v=c8bd65a76';
import {adapt} from './adapt.js?v=c8bd65a76';
// Entrepreneurs' version of m08: same lessons, fields, workbook and tools; wording for people building something new.
export default adapt(base,{
 title:'Marketing & Communications',
 short:'Strategy, audiences, messaging, ethical storytelling, channels, launch campaigns, community, reputation and measurement',
 intro:'Plan how you will communicate what you are building and reach the people your idea needs from the start: the people you want to serve, communities, first customers or members, supporters, funders, partners, volunteers and the public. Build a communications strategy on your brand and your early evidence, choose channels you can sustain, tell stories ethically from the very first post and measure what actually helps.',
 output:'Communications Plan',
 promo:{
  headline:'Plan your launch and content in one calendar',
  pitch:'Marketing & Social Planner groups posts into campaigns, including your launch, schedules them on a shared calendar, tags each one with the objective it advances and the persona it targets, and records results. Customer Persona Builder keeps each audience’s goals, barriers, messages and channels in one profile, so you write for real people from day one.'
 }
},{
 strategy:{
  learn:[
   'A communications strategy explains how communication will help you reach your strategic objectives. When you are starting out, it also stops you spending scarce time on noise. It answers six questions: what you need people to know, feel or do; which audiences matter most; what you will say; through which channels; with what resources; and how you will know it worked.',
   'Start from your objectives, not from channels. In the early stage, the first communication objectives are usually about the people whose yes you need before you can start: your first participants, customers or members, a partner who opens doors, a funder or supporter who backs a pilot. Write two to four communication objectives, each linked to a strategic objective and naming an audience and an action you can count.',
   'Be honest about resources: how many hours you and any co-founders can give, which skills you have, what you can spend and who decides what goes out. Keep the strategy short, revisit it when you launch and then each year. The rest of this module puts it into practice.'
  ],
  weak:'Get our name out there on social media.',
  strong:'CO1 (supports ESO1): by the end of our first three months, 150 regulars buy from the stall at least twice a month.\nCO2 (supports ISO2): one more café or canteen agrees to a 15-minute tasting meeting about buying wholesale.\nCO3 (supports ESO2): the youth centre refers eight young people to apply for our four traineeships.',
  why:'Each objective names an audience, an action you can count and the strategic objective it serves, so even before launch you can tell whether it worked.',
  reflect:'Which strategic objective depends most on the right people hearing about you early?',
  exercise:'Write your first communication objectives and the strategic objectives they support.',
  fields:{
   objectives:{label:'First communication objectives',hint:'Objective (e.g. 150 regulars at the stall) | supports which strategic objective (e.g. ESO1) | audience (e.g. market shoppers) | desired action (e.g. buy twice a month) | how you will count it.'},
   resources:{label:'Your resources and limits',hint:'Hours you and any co-founders can give, skills, budget (even if it is zero) and who decides what goes out.'}
  },
  check:'Is every communication objective linked to a strategic objective and an action a real audience can take?'
 },
 audiences:{
  learn:[
   'Communication starts with what an audience needs to understand or do. Begin with your stakeholder map from Module 1 and group the people you will need by what they need and what you need from them: the people you want to serve and their communities, early customers or members, supporters, funders, partners, volunteers, future team members, media and decision-makers.',
   'Within a broad audience, segment further where needs differ. Early adopters who like to try something new are different from people who wait until it is proven; a partner who refers people needs something different from one who lends you space. Give each segment a priority, so the little time you have goes to the people your launch depends on.',
   'A persona is a short portrait of a typical member of a segment: goals, barriers, motivations, trusted sources, preferred channels and the messages that work. Before you launch, base it on real conversations with people you hope to reach, not on stereotypes or your own guesses, and note how many people you spoke to. It helps you, and anyone who joins later, write for a real person.'
  ],
  weak:'Our audience is everyone who likes good bread.',
  strong:'Persona from eight conversations at the market: a parent working shifts, buying for a family of four. Goal: good bread that lasts two days, at a fair price. Barriers: does not know us yet; supermarket bread is cheaper. Trusted source: other regulars and stallholders she knows. Channels: the stall itself, the neighbourhood WhatsApp group. Message: “Baked this morning, fairly priced, and every loaf helps a young baker learn the trade.”',
  why:'It is specific, based on real conversations before launch, and it points straight to a channel and a message.',
  reflect:'Which audience do you know least about, yet will depend on most?',
  exercise:'Define your priority audience segments and write one persona from real conversations.',
  fields:{
   segments:{label:'Priority audience segments',hint:'Segment (e.g. market regulars, cafés) | what they need | what you need from them | priority.'},
   persona:{label:'One persona',hint:'Goals, barriers, motivations, trusted sources, channels and messages that resonate or should be avoided. Note how many people you spoke to.'}
  },
  check:'Is your persona based on conversations and evidence rather than your own assumptions?',
  anatomy:{
   title:'One audience, different segments',
   intro:'Split a broad audience where needs differ. Our bakery’s audiences, split.',
   cols:['Broad audience','Segments','What changes'],
   rows:[
    ['Market shoppers','Regulars and passers-by','Regulars want their usual loaf kept aside; passers-by need to know we are new, what is fresh and what it costs.'],
    ['Funders and supporters','The local youth fund and individual supporters','The fund wants a clear plan and how we will measure it; supporters want to see first results and feel part of the start.'],
    ['Wholesale customers','The two cafés and the office canteen','Cafés want quality and delivery before they open; the canteen wants volume, a fixed price and an invoice.'],
    ['Partners','The youth centre that refers trainees and the shared kitchen that hosts us','The youth centre needs a simple referral route; the kitchen needs clear slots, cleaning rules and who is responsible for what.'],
    ['Young people','Those already referred and those who have never heard of us','The first need dates and what the traineeship involves; the second need to know it exists, that it is paid and that it is for them.']
   ]
  }
 },
 messaging:{
  learn:[
   'A messaging framework keeps everyone saying the same essential things in ways that fit each audience. It has a core message (one or two sentences on what you do and why it matters), about three supporting messages with proof points, and versions for each priority audience. Writing it before you launch means you, any co-founders and the first people who join describe the work in the same way.',
   'Proof points are evidence: early results from a test or pilot, what people told you in your conversations, research on the problem, the founding team’s experience or the backing of a credible partner. They make messages credible. Before you have results, say what you will measure and when, rather than claiming outcomes you have not seen. Use only figures you can source, and update them when new data arrives.',
   'Test messages with real people from each audience before you print or publish. Do they understand them? Do they want to act? Keep a short version for social media and conversation, and a longer one for proposals, applications and your website.'
  ],
  weak:'We are going to change lives in our neighbourhood.',
  strong:'Core: “We bake good bread at a fair price and give young people who left school early a paid traineeship in a real bakery.”\nFor market shoppers: “Baked this morning, fairly priced, and every loaf helps a young baker learn the trade.”\nProof: 40 market shoppers asked, 3 in 4 said they would buy weekly; our baker has ten years’ experience; the youth centre has referred our first four trainees.',
  why:'It is plain, it answers what shoppers actually care about (fresh bread, a fair price), and every claim rests on evidence the founders gathered themselves.',
  reflect:'Could you, or a co-founder, explain what you are building in one sentence a stranger would understand?',
  exercise:'Write your core message, supporting messages, proof points (including what you will prove and when) and one audience version.',
  fields:{
   core:{label:'Core message',hint:'One or two sentences on what you are building and why it matters.'},
   supporting:{label:'Supporting messages and proof points',hint:'Message (e.g. baked this morning) | proof point, or what you will measure and when | source.'},
   versions:{label:'Audience versions',hint:'Audience (e.g. cafés) | adapted message | call to action.'}
  },
  check:'Is each supporting message backed by a proof point you can share now, or an honest promise of when you will have one?',
  anatomy:{
   title:'A message house',
   intro:'The core message is the roof; supporting messages are the pillars; proof points are the foundation. Example: our bakery, before the stall opens.',
   cols:['Part','What it does','Example for a new initiative'],
   rows:[
    ['Core message (roof)','Says what you do and why, in one or two sentences','We bake good bread at a fair price and give young people who left school early a paid traineeship in a real bakery.'],
    ['Supporting message 1','Gives one reason to believe or act','Bread baked that morning, with simple ingredients.'],
    ['Supporting message 2','Gives a second reason','Fair prices for local families.'],
    ['Supporting message 3','Gives a third reason','Every loaf helps a young person learn a trade and find a first job.'],
    ['Proof points (foundation)','Evidence under each pillar, or what you will measure and when','Our baker’s ten years’ experience; 40 shoppers asked, 3 in 4 would buy weekly; trainees’ skills and jobs to be measured from the pilot.'],
    ['Audience version','The same core, adapted','Cafés: “Fresh bread delivered before you open, at a fair wholesale price, baked by young people learning the trade.”']
   ]
  }
 },
 storytelling:{
  learn:[
   'Stories help people understand change in a way numbers alone cannot. A good story has a person or community at its centre, a situation, a change and what made the change possible. Before you launch you may not have stories of change yet: you can tell the story of the problem, of why you started and of the first people who tried what you are building, as long as it is told truthfully and respects the people in it.',
   'Ethical storytelling puts the dignity, safety and agency of the people in the story first. Get informed consent that explains where the story will be used, for how long, and that people can withdraw. Let people tell their story in their own words where possible, and show them the final version. Avoid images and words that show people as helpless or reduce them to their hardship. Setting these rules before your first photo or post is far easier than fixing habits later.',
   'Take extra care with children, people at risk, and anything about violence, health, immigration status or details that could identify someone and expose them to harm. Change or remove details when needed, and do not publish when the risk outweighs the benefit. You, not the person in the story, should carry the cost of saying less, even when a powerful story would help your launch.',
   'Keep a consent log from the very first story or image, recording the consent given, permitted uses and an expiry or review date. A simple spreadsheet is enough. Check it before anything is published, and hand it on to whoever takes over communications as you grow.'
  ],
  weak:'Share a sad photo of a trainee and the story of why she left school, to get attention for our launch.',
  strong:'A 19-year-old trainee chose what to share about her first month in the bakery, in her own words, and approved the final post. Her first name is used and her hands are shown shaping dough, not her face, at her request; nothing is said about why she left school. Consent is recorded for social media and our page for one year.',
  why:'The trainee decided what was told and how she appears, her past stays private, and the consent sets clear limits on use and time, from the very first post.',
  reflect:'Would the person in your story be proud of how they are shown, including in your founding story?',
  exercise:'Write your ethical storytelling rules before you publish anything, and set up your consent log.',
  fields:{
   rules:{label:'Your storytelling rules',hint:'How you will obtain consent, involve storytellers, protect identity and decide not to publish.'},
   log:{label:'Consent log fields',hint:'Story or image (e.g. a trainee’s first month) | person or group | consent date | permitted uses | expiry | withdrawal route.'}
  },
  check:'Would every story you plan to publish be acceptable to the person it is about?'
 },
 website:{
  learn:[
   'Your website is often where people check whether you are real, relevant and trustworthy, and for something new that check matters even more. It should say who you are, what you are building and for whom, the difference you aim to make, how to get involved, sign up or use your services and how to contact you, with the trust signals from Module 7: who the founders are, your legal status or that you are registering, and how you handle people’s data.',
   'Organise pages around what visitors need to do: join the pilot, sign up for news, partner, support you, volunteer, buy or book. Write plainly, make it fast and readable on a phone, and keep key information current. At the start you may need only one good page, or a profile on a platform your audiences already use, until you have more to say.',
   'Discoverability means people can find you when they search. Use the words your audiences use, give each page a clear title and description, create free profiles on relevant directories and maps once you have an address, and ask credible partners to link to you. Avoid tricks: useful, accurate content lasts.',
   'Decide who keeps each page right, even if that is only you, and review the site at least twice a year and whenever something important changes.'
  ],
  weak:'A beautiful homepage with our logo and a slideshow of bread, finished before we know what we will sell.',
  strong:'One page for launch: what we bake, and where and when to find the stall (Saturdays at the market); “Order for Saturday” and “Buy wholesale” with a contact form; “Traineeships”, explaining how the youth centre refers young people; the co-founders’ names and photos; allergen information; “registration in progress”; a privacy note and a contact email. One co-founder owns it and checks it every month.',
  why:'Every section matches something an early visitor came to do, it is honest about the stage you are at, and someone is responsible for keeping it right.',
  reflect:'What are the three things your first visitors will come to your site to do?',
  exercise:'Plan your first website structure and discoverability actions.',
  fields:{
   pages:{label:'Site structure',hint:'Page or section (e.g. Buy wholesale) | audience (e.g. cafés) | task (e.g. ask for a price list) | key content | owner.'},
   discover:{label:'Discoverability actions',hint:'Search terms your audiences use (for example “fresh bread near the market”), directories, map listings, profiles and partner links to pursue.'}
  },
  check:'Can each priority audience complete its main task within two clicks?'
 },
 social:{
  learn:[
   'Choose social channels where your priority audiences already spend time and where you can keep up a steady presence. When you are starting out, one channel done well beats five done badly, and you can add more as you grow. Think about language, data costs and whether people can contact you privately.',
   'Give each channel a purpose: building a first community, sharing news of your progress, recruiting participants or team members, raising support, advocacy or customer service. Plan a mix of content: stories, practical information, behind the scenes of building something new, calls to action and replies to your community.',
   'Set rules for safety and conduct from day one: who can post, what needs approval, how you respond to criticism, how you moderate abuse and how you protect personal data and images. Open accounts with an organisational email, not a personal one, and keep logins in a password manager that a co-founder or a trusted second person can reach, never with one person alone.'
  ],
  weak:'Open an account on every platform before launch.',
  strong:'Instagram for neighbours and market shoppers (what is on the stall this Saturday, behind the scenes in the kitchen, trainee photos only with consent; two posts a week; the baker co-founder owns it) and a WhatsApp broadcast list for regulars and café orders. No other platforms until the first year’s review.',
  why:'Each channel has one audience, one purpose and one owner, and the founders say no to channels they cannot sustain.',
  reflect:'Where do the people you want to reach already look for trusted information?',
  exercise:'Choose your first channels and define how each will be used and managed.',
  fields:{
   channels:{label:'Channel plan',hint:'Channel (e.g. Instagram) | audience (e.g. market shoppers) | purpose | content types | frequency | owner.'},
   rules:{label:'Safety and conduct rules',hint:'Who has access, approvals, moderation and how you respond to criticism.'}
  },
  check:'Is there a clear reason and an owner for every channel you chose?',
  anatomy:{
   title:'Channel choice by audience',
   intro:'Pick the channel your audience already uses, not the one you like best. Fits for our bakery’s audiences.',
   cols:['Audience','Channel that fits','Why'],
   rows:[
    ['Neighbours near the market','Notice boards, the chalkboard at the stall','Trusted, free and seen by everyone, including people without smartphones.'],
    ['Regulars you will message often','WhatsApp broadcast list','Private, low data, already used daily, and contact details stay hidden.'],
    ['Cafés and the office canteen','WhatsApp Business and a visit with samples','Orders are quick; trust is built face to face, over a tasting.'],
    ['Younger shoppers and food lovers','Instagram','Where they already discover local food and decide where to shop.'],
    ['Young people who might apply','The youth centre’s staff and its own channels','They trust the youth centre more than a bakery they have never heard of.']
   ]
  }
 },
 email:{
  learn:[
   'Email works well because you own the relationship and people have chosen to hear from you. Start your list from your first conversations: collect contacts with clear consent, explain what people will receive and make unsubscribing easy, following data protection rules where you are. Fifty people who asked to hear from you are worth more than a borrowed list of thousands.',
   'A newsletter keeps people informed. A journey is a planned sequence triggered by an action: signing up for news, joining a pilot, a first order, donation or membership, or offering to volunteer. A simple three-email welcome (thank you and what to expect; the difference you aim to make; how to get more involved) builds relationships far better than silence, and is easy to set up before launch.',
   'Segment your list where needs differ, write subject lines that say what is inside, and measure what matters: replies, sign-ups and repeat support, not only opens. In some places a messaging app does this job better than email; the same rules on consent apply.'
  ],
  weak:'We will add everyone in our phone contacts to a mailing list.',
  strong:'A short update every two months to about 60 regulars who signed up at the stall (what is new, a trainee’s progress with consent, the next market dates; two minutes to read; one co-founder writes it); a three-email welcome for every café or canteen that starts buying wholesale; consent recorded at sign-up.',
  why:'It is regular, built on consent, and sized to a list the founders can actually serve.',
  reflect:'What will happen in the week after someone first says yes to you?',
  exercise:'Design your first newsletter and one welcome journey.',
  fields:{
   newsletter:{label:'Newsletter or update plan',hint:'Audience, frequency, typical content and owner.'},
   journey:{label:'Welcome journey',hint:'Trigger (e.g. a café places its first order) | email 1 | email 2 | email 3 | desired action.'}
  },
  check:'Does each email have consent, a clear purpose and an easy way out?'
 },
 content:{
  learn:[
   'A content strategy decides what you will publish, for whom, why and how often. Choose three to five content pillars: recurring themes linked to your objectives and messages, such as why you are starting, the problem in plain words, behind the scenes of building, early results and stories, partner spotlights and calls to action.',
   'An editorial calendar plans content a few weeks ahead: date, channel, pillar, message, format and owner. It lets you prepare for key moments such as your launch, first sessions, seasons, events and application deadlines, and reuse one piece across several channels.',
   'Plan for the time you really have alongside everything else a founder does. Make content in batches, adapt instead of starting from zero, and leave room for news you cannot plan. Check what works and adjust the mix as you learn.'
  ],
  weak:'We will post when we find the time.',
  strong:'Four pillars (fresh this Saturday, inside the kitchen, our trainees’ progress, order and get involved); two posts a week planned a month ahead and prepared in one afternoon; the story of a trainee’s first food-hygiene certificate reused as a post, an item in the update email and an example in the report to the youth fund.',
  why:'The pillars follow the messages, the rhythm fits a founder’s time, and one piece of content works in three places.',
  reflect:'Which piece of content could you reuse in three different places?',
  exercise:'Define your content pillars and draft the first month of your calendar.',
  fields:{
   pillars:{label:'Content pillars',hint:'Pillar (e.g. inside the kitchen) | objective it supports (e.g. ESO1) | audience | example topics.'},
   calendar:{label:'First month of content',hint:'Date | channel | pillar | message | format | owner.'}
  },
  check:'Is your calendar realistic for the time you actually have?'
 },
 campaigns:{
  learn:[
   'A campaign is a time-bound, coordinated push to get one result from one audience. For a new initiative, the first campaign is often the launch itself: recruit the first participants, find the first customers or members, recruit volunteers, raise start-up support or change a local decision. It combines a message, channels, content, partners and one clear call to action over a set period.',
   'Write a campaign brief: goal and measure, audience, insight, key message, call to action, channels, timeline, budget, owner, risks and approvals. The call to action should be one specific, easy step: book a call, sign up, pre-order, join, apply.',
   'Advocacy and awareness campaigns need extra care. Base claims on evidence, check the rules on political activity for the form you are choosing and your country (they differ; confirm locally and ask someone with a legal background if unsure), and think about the risks to participants and partners.',
   'After each campaign, compare the result with the goal and write down what to keep and change next time. Your launch campaign is the first real test of your messages.'
  ],
  weak:'Raise awareness about our new bakery.',
  strong:'Six weeks before the stall opens, to win 100 regulars. Message: “Fresh bread every Saturday, baked by young people learning the trade.” Call to action: join our WhatsApp list for a free loaf on opening day. Channels: neighbourhood notice boards, the market’s own page, the youth centre, Instagram. Success: 100 people on the list before the first Saturday.',
  why:'It has one audience, one measurable goal, one easy action and an end date.',
  reflect:'What single action do you most need people to take before or at your launch?',
  exercise:'Write a campaign brief for your launch or your first priority campaign.',
  fields:{
   brief:{label:'Campaign brief',hint:'Goal and measure (e.g. 100 regulars on our list) | audience (e.g. neighbours near the market) | insight | message | call to action | channels | timeline | budget | owner.'},
   risks:{label:'Risks and approvals',hint:'Claims to verify, legal limits, safeguarding and who signs off.'}
  },
  check:'Does the campaign ask for one clear, measurable action?'
 },
 community:{
  learn:[
   'A community is a group of people who feel connected to your cause and to each other, not only to you or your organisation. Building one early, among your first participants, supporters, volunteers, customers, members or peers, can widen your reach, test your ideas and tell you things you would not otherwise learn.',
   'Build community by giving people reasons to connect: events, peer groups, online spaces, shared projects, chances to shape what you are building and to lead. Give people roles and recognition, and listen more than you broadcast. The first people who join can become co-creators, not just an audience.',
   'Set clear guidelines and moderate respectfully and safely. Protect personal data, and do not open spaces you cannot look after with the time you have. Measure engagement by participation and contribution, not follower numbers.'
  ],
  weak:'Our community is our follower count.',
  strong:'A WhatsApp group of our first 30 regulars (by invitation; each person chooses to join); twice a year they come to a tasting evening in the shared kitchen, vote on a new loaf and meet the trainees; two regulars help run each tasting and welcome newcomers.',
  why:'Regulars connect with each other and with the trainees, take real roles and help shape what is baked, and joining is their choice.',
  reflect:'What could your community do for each other without you in the middle?',
  exercise:'Design one community you will build from the start and how people will take part.',
  fields:{
   community:{label:'Community design',hint:'Who (e.g. stall regulars) | purpose | ways to connect (e.g. a tasting evening) | roles people can take | guidelines | owner.'}
  },
  check:'Does your community give members roles and a voice, not just updates?'
 },
 media:{
  learn:[
   'Media coverage can build credibility and reach people you could not reach alone, which matters when nobody knows you yet. Journalists look for timely, local, human stories with credible evidence and people willing to speak; a launch, a first result or an unusual idea can be newsworthy. Local radio, newspapers and sector newsletters are often more useful than national outlets.',
   'Prepare a simple press kit: a short and a long description of what you are building, key facts and figures, founders’ biographies, approved photos with consent, logo files and contact details. Two pages are enough at the start. Keep it current and easy to send.',
   'Build relationships with a few relevant journalists rather than mass mailing. Agree who may speak to the media, prepare key messages and protect participants: never put someone in front of the media without informed consent and support. Do not let the excitement of early coverage lead you to promise results you have not yet achieved.'
  ],
  weak:'Send our launch press release to every newspaper.',
  strong:'A two-page press kit ready a month before the stall opens; five contacts at the local newspaper, a community radio station, a city food blog and a youth-work newsletter; both co-founders agreed as spokespeople; trainees interviewed only if they choose to, with a co-founder present, and never about why they left school.',
  why:'It is targeted, ready before the launch, and protects trainees who may not want attention.',
  reflect:'What is your most newsworthy story in your first year, and who would care?',
  exercise:'Prepare your press kit checklist and your first media list.',
  fields:{
   kit:{label:'Press kit checklist',hint:'Item (e.g. photos with consent) | status | owner.'},
   media:{label:'Media list and spokespeople',hint:'Outlet or journalist (e.g. local newspaper) | topic interest (e.g. local food, jobs for young people) | contact route | agreed spokespeople.'}
  },
  check:'Are participants protected and spokespeople agreed before any media contact?'
 },
 reputation:{
  learn:[
   'Reputation is the result of everything you do, not only what you say. Something new has little reputation to fall back on, so one problem can shape how people see you for a long time: a safeguarding incident, a data breach, a misleading claim, a money problem or a storm on social media.',
   'Prepare before a crisis, even as a team of one or two. List likely scenarios, decide who leads, draft holding statements, know who must be told (co-founders, any board or advisers, funders, regulators, partners, your insurer if you have one) and keep contact lists current. In a crisis, put people’s safety first, act quickly, tell the truth, do not speculate and give regular updates.',
   'A social media policy sets rules for official accounts and guidance for anyone who mentions your initiative on their own accounts, including founders, the first team members and volunteers: confidentiality, respect, no images of participants without consent, and how to raise concerns. Write a short version now and add to it as people join.'
  ],
  weak:'We are too small to need a crisis plan.',
  strong:'Three scenarios planned before the stall opens, including a customer’s allergic reaction and a trainee hurt in the kitchen. One co-founder leads, the other handles contact with the trainee’s family and the youth centre; a holding statement is drafted; the shared kitchen, the market organiser and our insurer are told within 24 hours; the product is withdrawn or work paused until the cause is known.',
  why:'Roles, words and first actions are decided before anything goes wrong, so the founders can act within the first hour.',
  reflect:'What headline about your new initiative would you most fear, and what would you do in the first hour?',
  exercise:'Draft your crisis communication essentials and social media rules before you launch.',
  fields:{
   scenarios:{label:'Crisis scenarios and response',hint:'Scenario (e.g. a customer’s allergic reaction) | lead | who to inform (e.g. the market organiser, our insurer) | holding statement | first actions.'},
   policy:{label:'Social media rules',hint:'Rules for official accounts and for founders, team members and volunteers who mention your initiative on their own accounts.'}
  },
  check:'Would you and any co-founders know who leads and what to say in the first hour of a crisis?'
 },
 measurement:{
  learn:[
   'Measure communications at three levels: outputs (what you produced and how many people it reached), engagement (how people interacted) and outcomes (whether people took the action you needed). Reach and likes are easy to count, and tempting when you are starting out, but they are rarely the goal.',
   'Link each communication objective to one or two outcome measures, such as sign-ups, enquiries, pre-orders, referrals, applications, pledges of support or attendance, plus a few engagement measures. Set this up before launch: use tracked links, simple forms and the question “How did you hear about us?” from the very first sign-up.',
   'Review monthly in your first months, then monthly or quarterly as part of your MEAL routine from Module 6. Keep what works, stop what does not and test one change at a time.'
  ],
  weak:'Our launch post had 10,000 impressions.',
  strong:'Objective: 100 regulars on our WhatsApp list before the first Saturday.\nOutcome: people on the list (target 100, actual 72).\nSupporting measures: 140 free-loaf vouchers handed out; 41 sign-ups came from notice boards and the market’s page, 19 from Instagram, 12 through the youth centre.\nDecision: for the shop launch, put up notices two weeks earlier.',
  why:'It counts the action that mattered, shows where it came from and ends in a decision.',
  reflect:'Which number are you tempted to report that would not change any decision?',
  exercise:'Define the measures for each communication objective and your review routine, before you launch.',
  fields:{
   metrics:{label:'Communications metrics',hint:'Objective (e.g. 100 regulars on our list) | outcome measure (e.g. people on the list) | engagement measures | target | source.'},
   review:{label:'Review routine',hint:'When, who and what decisions you will take.'}
  },
  check:'Does every objective have at least one outcome measure, not only reach?',
  anatomy:{
   title:'Three levels of measurement',
   intro:'Only the third level tells you whether communication worked.',
   cols:['Level','Question','Example'],
   rows:[
    ['Outputs and reach','What did we produce, and who saw it?','Launch: 300 flyers on neighbourhood notice boards and at the market; 8 posts in the first month.'],
    ['Engagement','How did people interact?','About 90 messages and questions; 60 clicks on the sign-up link.'],
    ['Outcomes','Did people take the action we needed?','72 people joined the regulars’ list, against a target of 100, and 45 of them bought in the first month.']
   ]
  }
 },
 'comms-plan':{title:'Your Communications Plan'}
});
