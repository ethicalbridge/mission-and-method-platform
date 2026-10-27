import {module,lesson,review} from './kit.js';
// Idea into Impact (entrepreneurs track). Story bible: docs/idea-into-impact.md
export default module({
 id:105, no:5, slug:'idea-sustain-run', phase:'Idea into Impact', track:'entrepreneurs',
 title:'Fund it and plan 90 days', short:'Where your first money comes from, your first 90 days, and your Launch Plan',
 intro:'Decide where your first money will come from, and turn your pilot into a 90-day plan with owners, dates and a real decision at the end. This is the step that moves your idea from paper into action, and it brings all your work together in one Launch Plan.',
 output:'Your Launch Plan', uses:[], workbook:{file:'Idea-into-Impact.xlsx',title:'Idea into Impact workbook'},
 promo:{lesson:'launch-plan',tools:['strategic-objectives','theory-of-change','gantt'],headline:'Keep your Launch Plan alive in the Impact Tools',
  pitch:'The Impact Tools turn your Launch Plan into records you update as you learn: your goals become objectives, your “If we…, then…, so that…” chain becomes a pathway, and your 90 days become a timeline. When your project grows into an organisation, the same records carry into the organisation courses, so nothing you write here is lost.'},
 lessons:[
  lesson({id:'money',title:'Where your first money comes from',stage:'Design',minutes:25,sheet:'First money',
   learn:[
    'Every project needs some money, even a small one. Before you ask anyone, decide who will pay, and for what. There are five usual sources. Users or customers pay for something they get. Supporters and donors give because they care. Grants are money from a fund for a stated purpose. Partners can give in kind (things or help instead of cash), such as a room or tools. And you may use some of your own savings.',
    'Your first money is usually small and local. It comes from people who know you or can see the problem, such as a local shop or a church. Large grants rarely fund an idea that has not been tested. A pilot that works is what makes bigger money possible later.',
    'Ask for a specific amount for a specific thing. “Can you give US$200 for boots and gloves for 15 young people?” works better than “Can you support us?”. Use the costs from your budget in lesson 4.1 and the ask from your pitch in lesson 3.3. Give every source a next step and a date.',
    'Some money costs more than it gives. A sponsor may want photos of children, or events that do not fit your purpose. Say no to money that pulls you away from the purpose you wrote in lesson 1.3. Be careful with loans: borrow only when your pilot has shown the idea works and you know how you will repay. Your three sources become the money section of your Launch Plan in lesson 5.3.'
   ],
   weak:'We will apply for big international grants and maybe get funding from the UN or a large foundation.',
   strong:'Tide Line Youth Collective: “Our own money: US$100 from Wayan and Sari, confirmed — we start a separate record for it this week. Dive operator: US$400 for 500 seedlings and boots — Sari meets the owner with our pitch by 15 November. Two village shops: US$100 each for the boat, gloves, snacks and water — Wayan visits both after the village meeting, by 21 November.”',
   why:'Each source has an amount, a purpose, a person who acts and a date. The amounts add up to the pilot budget, and they are small and local enough to be realistic.',
   reflect:'If nobody gave you money this month, which part of your pilot could you still run with what you already have?',
   exercise:'Write who pays for what, now and later. Then list your first three sources with an amount, a next step and a date, and name the money you will not take.',
   fields:[
    {key:'model',label:'Who will pay, and why',hint:'Who pays for what now, during the pilot, and who you hope will pay later (e.g. Now: local shops pay for tools; later: a small grant and sales to schools).'},
    {key:'first',label:'Your first three sources',hint:'One per line: source, amount, next step and date (e.g. Village shop: US$100 for gloves — visit with our pitch by 30 November).'},
    {key:'refuse',label:'Money you will not take',hint:'Name the kind of money and why it would pull you off your purpose (e.g. no sponsor who wants photos of children).'}
   ],
   check:'Does every one of your first three sources have an amount, a person who will ask, and a date?',
   gallery:{title:'Three founders, same exercise',intro:'Each founder starts with small, local money that matches the pilot budget from lesson 4.1.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      model:'Now: the young people and their families never pay. They should not pay to protect their own coast. During the pilot, local businesses that gain from a healthy coast pay for seedlings and tools: the dive operator and two village shops. We add US$100 of our own. Later: if the pilot works, we will apply for a small grant from the regency environment fund. The nursery and the school may also help in kind.',
      first:'Our own money: US$100 from Wayan and Sari, confirmed — we start a separate record for it this week.\nDive operator: US$400 for 500 seedlings and boots — Sari meets the owner with our pitch by 15 November.\nTwo village shops: US$100 each for the boat, gloves, snacks and water — Wayan visits both after the village meeting, by 21 November.',
      refuse:'Money that requires tourist “plant-a-tree” photo events. Past plantings by outsiders failed because people planted the wrong species in the wrong place, for one day and a photo. Our purpose is that young people protect and restore their own coast. If a sponsor wants tourists and cameras, the young people become a background, and the seedlings may die.'
     },notice:'Notice that the people they help never pay, so the money comes from businesses that gain from the coast. Copy how each source is matched to a specific item in the budget.'},
     {org:'huerta',profile:{
      model:'Women in Comuna 8 pay a low price for their garden kit, below what it costs, in small instalments. Schools and offices pay full price for the same kits, and the extra they pay covers the women’s lower price and the monthly workshops. Women who grow more than they need can sell it at our shared Saturday stall. Now: my savings fill the gap during the pilot. Later: I want sales to schools and offices to cover most costs, with a city or chamber of commerce entrepreneurship fund to help us grow.',
      first:'My savings: up to US$1,000 of my US$1,500, confirmed — I move it into a separate account by 15 January.\nSchools and an office: pre-orders of 30 kits at full price — Luz Marina and I visit the first school in the first week of February, all orders agreed by 28 February.\nWomen’s instalments: about US$200 over the pilot — we agree the instalment plan with each woman at workshop 1 in March.',
      refuse:'A loan, before the pilot proves that women keep their gardens going. If the gardens stop after the first month, I would have a debt and nothing to repay it with. I will also not take money from anyone who wants us to promise women an income. Several women told me they do not trust “projects” that promise income, and I want to keep their trust.'
     },notice:'Notice that a social business can earn from sales from day one, and that full-price sales pay for the help women get. Copy the cap on her own savings: she decides in advance how much she can afford to lose.'},
     {org:'mentors',profile:{
      model:'Nobody pays to be mentored. Most families in Nima cannot afford private tutoring, and that is why we exist. Mentors give their time for free, and the school gives two classrooms in kind. Our costs are small: mostly mentors’ transport and snacks. Now: I pay part myself and ask the church and a local business for the rest. Later: after a full year, a small grant from a youth or education fund could help us reach more schools.',
      first:'Me: GH₵ 600, confirmed — I pay it into the church youth programme’s account, with a simple record, by 30 November.\nThe church: GH₵ 1,200 for mentors’ transport — the youth leader presents our pitch to the church committee by 30 November.\nA local business in Nima: GH₵ 600 for snacks and printing — I visit with our one-page pitch by 15 December.',
      refuse:'Money that requires branding on pupils’ uniforms, or photos of the children. The pupils are 14 and 15. Their parents already worry about who the mentors are. A sponsor’s logo on children, or their faces in an advert, would break that trust and our safeguarding rules. We can thank sponsors by name in a letter to parents instead.'
     },notice:'Notice that a volunteer project with no income can still name who pays: the founder, the church and one business. Copy how the “no” comes with a respectful alternative the sponsor can accept.'}
    ]}
  }),
  lesson({id:'plan',title:'Your first 90 days',stage:'Implement',minutes:25,sheet:'90-day plan',tools:['gantt'],
   learn:[
    'A 90-day plan turns your idea into dates. Ninety days, about three months, is long enough to run a small pilot, or to start a longer one and see early results. It is short enough to see the end from the start. You planned your pilot in lesson 2.2. Now you decide what happens, month by month, to make it real.',
    'Start with three goals. A goal says what will be true on day 90, for example “12 young people have come to all three planting days”. Three goals are enough. If you write ten, you will do none of them well. Take your goals from your pilot and success signs in lesson 2.2 and your money in lesson 5.1.',
    'Then write the steps for each month. Each step has an owner (the one person who makes sure it happens) and a date. Put first the steps that others depend on. Permissions, consent forms and money usually come in month 1. Be honest about time: if you can give six hours a week, plan for six. A Gantt chart (a simple timeline with one bar per step) shows if too much lands in one week.',
    'Finally, book your day-90 review now. Choose who will sit with you, such as a partner or some of the people you help. Look at your success signs and make a real decision: continue, change or stop. Stopping a pilot that does not work is a useful result, not a failure. Your goals, steps and review become the last part of your Launch Plan in lesson 5.3.'
   ],
   weak:'In the next three months we will launch the project, find funding, build a website and grow our community. Then we will see how it goes.',
   strong:'Next Step Mentors: “Saturday 3 April, at the school, with the head teacher, the church youth leader and Abena. We look at mentor attendance, pupil attendance, school choices submitted on time, and what pupils, parents and mentors said. The decision: continue next term at the same school, change (fewer pupils per mentor, a different time), or stop. BECE results come later, and we will report them carefully, not as proof that we caused them.”',
   why:'It has a date, a place and the right people in the room. It names exactly what will be looked at, and it ends in a real choice, including stopping.',
   reflect:'Looking at your hours each week, which step in your plan is most likely to slip, and what will you drop if it does?',
   exercise:'Write three goals for day 90. Then list your steps month by month, each with one owner and a date, and book your day-90 review in your calendar now.',
   fields:[
    {key:'goals',label:'Three goals for the next 90 days',hint:'One per line: what will be true on day 90, with a number where you can (e.g. 15 women have a garden kit and 12 are still growing).'},
    {key:'steps',label:'Steps, owners and dates',hint:'One per line, month by month: step, owner, date (e.g. Month 1: signed site agreement — Wayan — by 15 November).'},
    {key:'review',label:'Your day-90 review',hint:'When, where and with whom; what you will look at; and the decision you will make: continue, change or stop.'}
   ],
   check:'Is your day-90 review already in your calendar, with the people who will join you?',
   gallery:{title:'Three founders, same exercise',intro:'Each founder turns the pilot from lesson 2.2 into three goals, monthly steps with owners, and a review that ends in a decision.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      goals:'Run three planting-and-monitoring days at one agreed site, with at least 12 of 15 young people at all three.\nPlant 500 seedlings of the right species, with at least 60% still alive at the count at the end of January. A second count follows at month 6.\nRaise US$600, keep every receipt, and have a signed consent form for every young person.',
      steps:'Month 1 (November): written site agreement with the village head and the pond owner — Wayan — by 15 November.\nMonth 1: consent forms signed by 15 families — Wayan — by 21 November.\nMonth 1: safety and planting training for the four volunteers; seedlings ordered — Sari — by 25 November.\nMonth 1: planting day 1 on Saturday 28 November — Sari leads, Wayan is the safeguarding person.\nMonth 2 (December): planting day 2 on Saturday 19 December, at the start of the school holidays — Sari and Wayan.\nMonth 3 (January): planting day 3 on Saturday 9 January; survival count — Sari — by 30 January.',
      review:'Early February, at the village hall, with both village heads, the four volunteers and three of the young people. We look at attendance at each day, seedlings alive, the quiz results and how the money was spent. The decision: continue at the same site, change to a better site, or stop. The flooding question waits: we will not claim it for years.'
     },notice:'Notice that Wayan’s steps fall on weekends and school holidays, which is when he is free. Copy how the first weeks are all permissions, consent and training: nothing is planted until it is safe.'},
     {org:'huerta',profile:{
      goals:'20 women in one sector of Comuna 8 have a garden kit, and at least 15 gardens are producing at the month-1 visit in April.\n30 kits sold at full price to 2 schools and 1 office, so that the women’s kits are covered.\nWorkshops 1 and 2 and the first Saturday stall have run, and we know roughly what women save on vegetables each week.',
      steps:'Month 1 (February): recruit 20 women — Luz Marina — by 20 February.\nMonth 1: buy kit materials from a registered nursery; book the Junta room — Camila — by 28 February.\nMonth 2 (March): deliver 20 kits and run workshop 1 — Camila — by 13 March.\nMonth 2: deliver the school and office orders — Camila — by 31 March.\nMonth 3 (April): workshop 2, the first Saturday stall and the month-1 garden visits — Camila and Luz Marina — by 24 April.\nEvery week: WhatsApp reminders to the women who agreed to them — Luz Marina.\nAfter day 90: workshops 3 and 4 in May and June, the second stall in June, and the month-4 count in early July.',
      review:'In the first week of May, in the Junta room, with Luz Marina and five women from the pilot. We look at how many gardens are producing, what women say they save, who sold something, and how much of my US$1,000 is spent. The decision now: carry on to month 4, change something (the crops, the workshop day), or stop early. The bigger decision, to grow to a second sector, change the kit or stop, comes after the month-4 count in early July.'
     },notice:'Notice that Luz Marina owns recruitment and reminders, because trust in the neighbourhood is her strength. Copy how each person owns the steps that match what they do best.'},
     {org:'mentors',profile:{
      goals:'8 Saturday sessions run at the school, with 6 trained mentors, and at least 5 mentors attend 7 or more.\nAt least 20 of 24 pupils attend most sessions, and all 24 submit their senior high school choices on time.\nWe raise GH₵ 1,800 and have written consent from every parent before the first Saturday.',
      steps:'Before January: recruit 6 mentors; code of conduct signed; police checks started — Yaw — by 19 December.\nMonth 1 (January): written agreement with the head teacher for two classrooms — Kwame — by 8 January.\nMonth 1: mentor training and parents’ consent forms — Abena and Kwame — by 20 January.\nMonths 1–2: first 6 Saturdays, 23 January to 27 February — Abena leads sessions, Kwame organises.\nMonth 3 (March): last 2 Saturdays, 13 and 20 March (no session on 6 March, Independence Day); feedback from pupils, parents and mentors — Abena — by 27 March.',
      review:'Saturday 3 April, at the school, with the head teacher, the church youth leader and Abena. We look at mentor attendance, pupil attendance, school choices submitted on time, and what pupils, parents and mentors said. The decision: continue next term at the same school, change (fewer pupils per mentor, a different time), or stop. BECE results come later, and we will report them carefully, not as proof that we caused them.'
     },notice:'Notice that Kwame shares the work so he stays within his six hours a week. Copy how the review says what will be decided and what cannot be claimed yet.'}
    ]}
  }),
  review('launch-plan','Your Launch Plan',{minutes:20})
 ]
});
