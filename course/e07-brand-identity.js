import base from './m07-brand-identity.js?v=c1687a22e';
import {adapt} from './adapt.js?v=c1687a22e';
// Entrepreneurs' version of m07: same lessons, fields, workbook and tools; wording for people building something new.
export default adapt(base,{
 title:'Brand, Identity & Image',
 short:'Brand strategy, promise, voice, architecture, visual identity, guidelines and credibility for a new initiative',
 intro:'Translate your mission, values and positioning into an identity people recognise and trust from the very start. Brand is what people will expect from you and how they will recognise you; building it before you launch saves costly changes later, and it is the foundation that Module 8 uses to communicate and reach your first audiences.',
 output:'Brand Platform + Guidelines',
 promo:{
  headline:'Keep your brand consistent from your first message',
  pitch:'Marketing & Social Planner keeps key messages, campaigns and posts in one calendar from your launch, tagged to the objectives they advance and the audiences they target. Customer Persona Builder keeps the tone and messages that work for each audience close at hand as you find your first participants, customers and supporters.'
 }
},{
 definitions:{
  learn:[
   'Brand, identity, image, communications and marketing are often used as if they meant the same thing, but they do different jobs. Your brand is what people will expect from you and associate with you: what you stand for and what you promise. Your identity is how you deliberately express that brand: name, voice and visual style. Your image, or reputation, is what people actually think of you today, and at the start that may be very little.',
   'Communications is how you share information and stories with your audiences. Marketing is the planned effort to reach specific audiences and lead them to act: try a service, buy, join, support, volunteer, partner or apply. Both work better on top of a clear brand; without one, every message starts from zero, and a new initiative cannot afford to start from zero every time.',
   'Brand is not only for companies, and it is not something to leave until later. The first people you serve need to know they will be safe, early customers or funders need to see you are credible and partners need to know what you stand for. A brand is built more by consistent experience than by a logo, so start with what the few people who already know your idea say about it, and the evidence behind it.'
  ],
  weak:'Our brand will be our logo and a sign for the stall, once we have them.',
  strong:'“Our brand is the expectation that our bread is fresh, honest and fairly priced, and that the young people baking it are learning a real trade. Our identity will express it through a simple name, two colours and photos of real bakes. Our communications decide what we tell market shoppers, the cafés we supply and the local youth fund.”',
  why:'It separates what people should expect (brand) from how it will look (identity) and what is said to whom (communications), before any money is spent on design.',
  reflect:'When you describe your idea, what do people say back to you, and what do they seem to expect?',
  exercise:'Describe how your brand, identity, image and communications will differ for the initiative you are building.',
  fields:{
   current:{label:'Current image (early reactions)',hint:'What the people who already know your idea say about it, and where that comes from: conversations, pilots, early posts.'},
   desired:{label:'Desired brand',hint:'The expectations and associations you want people to hold from the very start, for example “fresh bread at a fair price, baked by young people learning a trade”.'}
  },
  check:'Have you distinguished what people should expect from you from how you will communicate?',
  anatomy:{
   title:'Five words, five jobs',
   intro:'How the terms differ, with our neighbourhood bakery as the example.',
   cols:['Term','What it is','Our bakery'],
   rows:[
    ['Brand','What people expect from you and associate with you','Fresh, fairly priced bread, baked by young people learning a trade'],
    ['Identity','How you choose to express the brand','A short name, the line “Good bread, real jobs”, two colours, plain words'],
    ['Image','What people actually think, today','Market shoppers: “the stall with the young bakers”; most of the neighbourhood has not heard of us yet'],
    ['Communications','Sharing information and stories with audiences','A chalkboard at the stall, one social account, a message list for regulars'],
    ['Marketing','Planned effort to get a specific action','A first campaign to win one more café as a wholesale customer']
   ]
  }
 },
 strategy:{
  learn:[
   'Brand strategy turns the positioning you chose in Module 1 into a promise people can recognise. Your brand promise is the experience you commit to deliver every time, from your very first activity or sale. A good visual identity helps people recognise you, but the promise only works if your experience matches it, so make a promise you can keep at your current size.',
   'Write a short brand platform: purpose, promise, audiences, personality, key messages and proof points. Proof points are evidence that supports the promise, often drawn from the MEAL data you plan in Module 6. When you are just starting, some proof points will not exist yet: write down what you will measure and when the first evidence will arrive. Your values show how the brand behaves.',
   'Consistency does not mean saying the same words to every audience. Keep the promise stable and explain why it matters in language each audience understands. A promise you cannot keep damages trust faster than having no promise at all, and a new initiative has no track record to fall back on, so also list the claims you will not make.'
  ],
  weak:'We will be the best bakery in town and change young lives.',
  strong:'“Everything on our stall is baked that morning, at a price local families can afford, by our baker and trainees learning a real trade. Proof, from our first Saturday: the baking time on every label, prices on the board, and each trainee’s skills checklist signed by their mentor.”',
  why:'The promise describes an experience the two co-founders can deliver from the first Saturday and check in their own simple records.',
  reflect:'What do you want people to trust you to do consistently, from the first day?',
  exercise:'Write the brand platform for what you are building.',
  fields:{
   brand:{label:'Brand platform',hint:'Purpose | promise (e.g. baked that morning, at a fair price) | audiences (e.g. market shoppers, cafés, the youth centre) | personality | key messages | proof points (and, for those not yet available, when they will be).'},
   storyRules:{label:'Promises we will not make',hint:'Claims you will avoid because you cannot yet evidence or deliver them, for example “every trainee gets a job”.'}
  },
  check:'Does the promise describe only what you can reasonably deliver and evidence at your current stage?'
 },
 voice:{
  learn:[
   'Brand personality describes your initiative as if it were a person: practical, warm and direct, for example, or calm, careful and expert. Choose three or four traits that come from your values and that your future audiences would recognise. At the start the personality often sounds like the founders; write it down so it can be shared with the people who join.',
   'Voice is how that personality sounds in words, and it stays the same. Tone changes with the situation: more serious when answering a complaint, more joyful when sharing a first milestone, simpler when writing for the people you serve. Describe each trait as “this, not that”, such as “confident, not boastful”.',
   'Write a short word list: words you use, words you avoid and how you describe the people you serve. Avoid language that reduces people to their problems or shows them as helpless. Then test your voice by rewriting a real message you have already sent, or one you are about to send.'
  ],
  weak:'Our tone will be professional.',
  strong:'“Proud, not boastful. Warm, not sentimental. Straight-talking, not harsh. We say ‘trainees’ and ‘young bakers’, never ‘at-risk youth’ or ‘drop-outs’; we write the way we talk to customers across the stall.”',
  why:'It is specific and contrastive, and its word choices protect the dignity of the people you serve, as the values require, from the very first post.',
  reflect:'How would your initiative speak to someone having the worst day of their life?',
  exercise:'Define the personality, voice and word list for what you are building.',
  fields:{
   traits:{label:'Personality traits',hint:'Three or four traits drawn from your values, each with a “this, not that” description.'},
   words:{label:'Word list',hint:'Words we use (e.g. trainees, young bakers) | words we avoid (e.g. at-risk youth, drop-outs) | how we describe the people we will serve.'},
   tones:{label:'Tone by situation',hint:'Situation you expect to face (e.g. a customer complaint, a trainee’s first certificate) | how the tone adapts.'}
  },
  check:'Would you and the next person who writes for you sound like the same organisation?',
  anatomy:{
   title:'We are / we are not',
   intro:'Five traits for our bakery, each written as a pair so anyone who writes for you knows where the line is.',
   cols:['Trait','We are','We are not'],
   rows:[
    ['Warm','Friendly, like a chat across the stall','Sentimental: no pity stories about our trainees'],
    ['Proud','Proud of the bread and of the trainees who bake it','Boastful: no “best bakery in the city”'],
    ['Straight-talking','Plain words, honest prices, clear allergen information','Curt or defensive when a customer complains'],
    ['Encouraging','We celebrate trainees’ effort and progress','Patronising: no “even they can do it”'],
    ['Practical','Clear opening times and what is in each loaf','Preachy: no lectures about food waste']
   ]
  }
 },
 architecture:{
  learn:[
   'Brand architecture is how the names of your organisation, programmes, products, services and related entities relate to each other. You may have only one name today, but as you grow you may add programmes, a trading arm, partnerships and campaigns. Deciding the logic now, while it is cheap to change, stops people losing track of who you are and what belongs to you.',
   'There are three main models: a branded house, a house of brands and endorsed brands. If you expect to become a hybrid, such as a nonprofit with a trading company or a business with a partner nonprofit, decide early whether the two should look like one family or stay distinct. Many organisations mix models, but each choice should be deliberate. For most new initiatives, one name with plain descriptors is the simplest start.',
   'Before you adopt a name, and certainly before you register it, print it or pay for a logo, check that it is easy to say and spell, works in the languages you use and means nothing unfortunate in them, is free as a web address and on social platforms, and does not clash with someone else’s trademark or a registered organisation name. Trademark and registration rules differ by country; check the rules where you are and ask someone with a legal background before registering.'
  ],
  weak:'We will name each new project whatever we like at the time.',
  strong:'“One master name for everything we run, plus a plain descriptor: [Name] Bakery for the stall and, from year 2, the shop; [Name] Traineeships for the training. If we later set up a separate nonprofit to run the traineeships and receive grants, it will be endorsed: ‘[Name] Training, part of [Name] Bakery’, so funders and customers see the link while it stays a separate legal entity.”',
  why:'It shows how each name, present and planned, relates to the master brand, and keeps any future legal separation visible.',
  reflect:'Would a newcomer understand how your projects, products and any future entities will relate?',
  exercise:'Map your brand architecture, including what you plan to add, and decide your model.',
  fields:{
   map:{label:'Brand map (now and planned)',hint:'Entity, programme or product, now or planned (e.g. market stall, traineeships, shop in year 2) | name or working name | relationship to master brand | audience.'},
   model:{label:'Chosen model and rules',hint:'Branded house, house of brands, endorsed or hybrid, the naming rules that follow and the checks you will make before registering a name.'}
  },
  check:'Is the relationship between every name, current and planned, and the master brand clear and intentional?',
  anatomy:{
   title:'Three architecture models',
   intro:'The main options, and when each tends to fit as you grow.',
   cols:['Model','How it works','Fits when'],
   rows:[
    ['Branded house','Everything uses the master name plus a descriptor: “[Name] Bakery”, “[Name] Traineeships”','Your offers share one audience and one promise; the usual start for a new initiative'],
    ['Endorsed brands','Each offer has its own name with “part of” or “by”: “[Name] Training, part of [Name] Bakery”','An offer needs its own identity or becomes a separate entity, but the link builds trust'],
    ['House of brands','Each offer has its own name with no visible link','Audiences or risks are so different that a link would confuse or harm']
   ]
  }
 },
 visual:{
  learn:[
   'Visual identity is the set of visual elements that makes you recognisable: logo and its versions, colours, typefaces, imagery style, icons and layout. The system matters more than any single element, and you can start the system before you have a finished logo.',
   'Logo: a main version, a simple version for small sizes, and versions for light and dark backgrounds, with rules on clear space and minimum size. Colour: two or three main colours and a few supporting ones, with codes for screen and print. Type: one or two typefaces that you and anyone who joins can use, free or licensed. If the logo is not ready, a clean wordmark in your chosen typeface and colours is enough to begin.',
   'Accessibility is part of good design, and it is easier to build in from the start than to fix later. Check the contrast between text and background, never show information by colour alone and keep text large enough to read. Images must be honest and respectful: real people with informed consent, no stereotypes, nothing that strips dignity, and extra safeguards for children and people at risk.',
   'You do not need an expensive agency to start. A simple system used everywhere beats a sophisticated one used inconsistently, and you can refine it once you know your audiences better.'
  ],
  weak:'We will pick colours and fonts each time we make something.',
  strong:'“A wordmark plus a simple wheat-ear icon; dark brown #4A2C1A for text and warm yellow #F2B33D for large shapes only, never for small text; Atkinson Hyperlegible, a free typeface, for everything from price labels to the stall banner; photos of real trainees at work, with recorded consent and extra care for those aged 17.”',
  why:'It is defined, contrast-checked and ethical from day one, so either co-founder, a trainee or a designer can apply it the same way.',
  reflect:'Will your imagery show the people you serve as they would want to be seen?',
  exercise:'Define the first elements of your visual identity.',
  fields:{
   elements:{label:'Visual elements',hint:'Logo versions (or a wordmark for now) | colours with codes (e.g. dark brown #4A2C1A) | typefaces | icon and layout style.'},
   imagery:{label:'Imagery principles',hint:'What your images will show, how you will obtain consent and what you will not show.'},
   access:{label:'Accessibility checks',hint:'Contrast, sizes and other checks you will apply from the start.'}
  },
  check:'Will your identity be accessible and respectful as well as recognisable?'
 },
 guidelines:{
  learn:[
   'Brand guidelines, sometimes called a brand manual or style guide, bring your brand platform, voice and tone and visual identity together in one place, with practical rules and examples. They let co-founders, the first people who join, volunteers, partners and designers apply the brand without you checking every item. Writing them early also stops the brand living only in your head.',
   'Keep them usable. A short guide of one to four pages with the essentials is often more effective than a long manual, especially at the start. Include do’s and don’ts with pictures, where the logo goes on common documents (covers, letters, footers, social posts) and a few ready-made templates for the things you produce most.',
   'Add rules for co-branding with partners, sponsors and funders before the first one asks: whose logo leads, which acknowledgements are required and when approval is needed. Keep the guidelines and all files in one shared place, with a named owner and a version date, even if the owner is you.'
  ],
  weak:'Ask me if something looks right.',
  strong:'“A two-page guide (promise, voice, logo, colours, type, photos and consent); templates for the stall price board, social posts, the wholesale price list and trainee certificates; co-branding rules for the youth fund and the cafés we supply; all in one shared folder owned by one co-founder.”',
  why:'Others can apply the brand correctly without waiting for the founder to check every item.',
  reflect:'Who outside your founding team will use your logo first, and what will they need?',
  exercise:'Outline your first brand guidelines and list the templates you need.',
  fields:{
   outline:{label:'Guidelines outline',hint:'Sections and what each contains, kept to what you need now.'},
   templates:{label:'Templates and assets',hint:'Template or asset (e.g. stall price board, wholesale price list) | where it will be stored | owner.'},
   cobranding:{label:'Co-branding rules',hint:'How you will present partners, sponsors and funders alongside your brand, for example the local youth fund on trainee certificates.'}
  },
  check:'Could a new partner or volunteer apply your brand correctly using only your guidelines?'
 },
 credibility:{
  learn:[
   'For purpose-led organisations, brand and credibility cannot be separated, and for a new one credibility is often the biggest gap. Before people take part, buy, join, support, partner or apply to work with you, they look for signs that you are legitimate, accountable and effective. You have no track record yet, so the signals you can show matter even more.',
   'Trust signals include your registration and legal status (or an honest note that you are registering), named founders and how decisions are made, published policies (safeguarding, privacy, complaints), open finances, evidence of results, testimonials and endorsements used with permission, easy contact details, and a match between what you say and what people experience.',
   'List the trust signals you can show now across your website, social profiles, proposals and printed materials, then plan the gaps that matter most to your key audiences, starting with those who carry the most risk. Never overstate a partnership, endorsement, status or result: one misleading claim can undo credibility before you have had the chance to build it.'
  ],
  weak:'Our page will say we are trusted by many local businesses.',
  strong:'“Our page says we are trading informally while we register as a company with a social purpose, names both co-founders, links a one-page safeguarding summary with a named contact (some trainees are 17), lists the allergens in every product, and names the cafés we supply and the youth centre only with their written agreement.”',
  why:'Every signal can be checked by a careful customer, café owner, youth-centre manager or funder, and nothing claims more than is true today.',
  reflect:'What would a careful funder, customer, partner or first team member look for before trusting you?',
  exercise:'Audit the trust signals you can show now and plan the gaps to close.',
  fields:{
   audit:{label:'Trust signals audit',hint:'Signal (e.g. safeguarding summary) | where it appears or will appear (e.g. our page, the stall) | status today | gap.'},
   actions:{label:'Actions',hint:'Gap to close | owner | date or milestone (for example, once registered).'}
  },
  check:'Is every claim you make about yourself verifiable today?',
  anatomy:{
   title:'From claim to signal',
   intro:'Turn statements people must take on trust into signals they can check, even at the start.',
   cols:['Unsupported claim','Verifiable signal','What our bakery can show'],
   rows:[
    ['“A trusted local business”','Registration number, address, named founders or board','Legal status, or “registering as a company with a social purpose”, with both co-founders named'],
    ['“Safe for young trainees”','Published safeguarding policy and named focal person','A one-page summary, a named contact at the youth centre, no 17-year-old working alone with one adult'],
    ['“Huge impact”','Results with method and date','What we will measure, then first figures with their date, such as “3 of 4 pilot trainees finished”'],
    ['“Supplying the best cafés”','Customer names shown with written permission','Only the cafés and canteen that have agreed in writing, named'],
    ['“Fair pay for trainees”','Pay record anyone can ask about','The trainee pay rate in every traineeship agreement, paid on time']
   ]
  }
 },
 consistency:{
  learn:[
   'Brands wear down through small inconsistencies: an old logo on a form, a volunteer’s homemade flyer, a post in a different tone. Brand governance is the light process that keeps things consistent without slowing everyone down. When you are one or two people it can be a few simple rules; set them now so they are in place when others start producing materials.',
   'Name a brand owner, even if it is you. Decide what anyone can produce with templates, what needs a second look and what needs approval: usually new names, co-branding with partners, sensitive stories and statements to the press. Keep one asset library from the start and retire old versions as soon as you replace them.',
   'Review your brand at least once a year, starting after your first year of activity. Do your audiences recognise and trust it? Does it still reflect your strategy? Is it applied consistently? Update guidelines and templates when your strategy or audiences change, which is likely in the early years.'
  ],
  weak:'Everyone will make their own materials.',
  strong:'“Posts, price boards and posters made from templates need no approval; anything with a photo of a trainee is checked by the co-founder responsible for safeguarding; new product names, co-branding with the youth fund or the cafés, and anything said to the press are agreed by both co-founders.”',
  why:'Review matches the risk, so everyday work moves quickly and only sensitive items wait for approval.',
  reflect:'Where is your brand most likely to be applied inconsistently as others start helping?',
  exercise:'Set up a simple brand governance routine for what you are building.',
  fields:{
   rules:{label:'Review and approval rules',hint:'Type of material (e.g. stall price board, photo of a trainee) | can produce with templates | needs review | needs approval | by whom (the founders now, the team or board later).'},
   review:{label:'Annual brand review',hint:'When (starting after your first year), who and what evidence you will use.'}
  },
  check:'Is approval reserved for materials where the risk justifies it?'
 },
 'brand-platform':{title:'Your Brand Platform and Guidelines'}
});
