import {module,lesson,review} from './kit.js';
// Idea into Impact (entrepreneurs track). Story bible: docs/idea-into-impact.md
export default module({
 id:104, no:4, slug:'idea-protect', phase:'Idea into Impact', track:'entrepreneurs',
 title:'Start safely', short:'Your first budget, staying safe and legal, and what could stop you',
 intro:'In this step you prepare to start without putting people, money or yourself at unnecessary risk. You write a budget for the pilot, set simple safety and legal rules, and name what could stop you, before your first activity begins.',
 output:'Budget, safety and risks', uses:[], workbook:{file:'Idea-into-Impact.xlsx',title:'Idea into Impact workbook'},
 lessons:[
  lesson({id:'budget',title:'Your first budget',stage:'Design',minutes:30,sheet:'Budget',
   learn:[
    'A budget is a list of what your pilot will cost and where the money will come from. Make it for the pilot only, not for the next five years. You planned the pilot in lesson 2.2. The list of what you need to run it is your starting point.',
    'Write every cost on its own line, with an amount. Include things people give you for free, such as a room, a volunteer’s time or borrowed tools. Note what they would cost if you had to pay. This shows the real size of your project and reminds you who to thank.',
    'Then split your income into two kinds. Confirmed money is already in your hand or promised in writing. Hoped money is money you have asked for, or will ask for, but do not have yet. Never spend hoped money. Plan a smaller version of the pilot that you could run with less.',
    'From the first day, keep the project’s money separate from your own. A separate account is best, but a separate envelope and notebook is a start. Keep every receipt and write down every payment. In lesson 5.1 you will use this budget to decide who to ask for money, and how much.'
   ],
   weak:'We need about $5,000 to start. We will apply for some grants and see what we get.',
   strong:'Huerta Viva: “20 garden kits at cost: US$700 … Workshop materials: US$120. Stall fees and transport: US$100. Contingency: US$80. Total: about US$1,000. Not paid but counted: my time, about 15 hours a week.”',
   why:'Every cost has an amount, the pilot is small and time-limited, and free help such as the founder’s time is visible instead of hidden.',
   reflect:'If none of your hoped money arrives, would you still be willing and able to run a smaller pilot?',
   exercise:'Take the list of needs you wrote in lesson 2.2 and give each one an amount. Then split your income into confirmed and hoped, and describe the smaller pilot you would run if the money does not come.',
   fields:[
    {key:'costs',label:'What the pilot will cost',hint:'One item per line with an amount, and a total at the end. Include things given for free and say who gives them (e.g. “Room for workshops: free from the neighbourhood council, would cost US$20 a month”).'},
    {key:'income',label:'Where the money will come from',hint:'Start each line with Confirmed: or Hoped: and give the amount and the source (e.g. “Confirmed: US$100 of our own money”; “Hoped: US$300 from a local shop, asking in May”).'},
    {key:'smaller',label:'If the money does not come',hint:'The smaller version you would run: fewer people, fewer days or a cheaper place, and what it would cost. Say what you would not start without.'}
   ],
   check:'Do you know exactly which part of your income is confirmed, and which part you are only hoping for?',
   gallery:{title:'Three founders, same exercise',intro:'Each founder budgets only for the pilot, counts free help, and plans a smaller version in case the money does not come.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      costs:'Seedlings: US$250 (500 seedlings at about US$0.50 each).\nBoots, gloves and tools: US$200.\nBoat hire to reach one site: US$90.\nSnacks and water for three planting days: US$60.\nFirst-aid kit and training: US$50.\nTotal: about US$650 for three months.\nGiven free: our own time (about two days a week each), the time of four volunteers, and the support of the village youth organisation (karang taruna) that hosts us.',
      income:'Confirmed: US$100 of our own money (Wayan and Sari).\nHoped: US$600 from the local dive operator and two village shops. We will ask them using our one-minute pitch.\nIf nobody says yes, we are US$550 short of the full pilot.',
      smaller:'We would plant 250 seedlings instead of 500, on a site the young people can reach on foot. That saves the boat hire and half the seedlings, so the pilot costs about US$435. Even this is more than our own US$100, so we would not start until at least one business has said yes. We would not cut the first-aid kit, the training or the boots.'
     },notice:'Notice that the free help is written down, even though no money changes hands. Copy how the smaller version names what will never be cut: the safety items.'},
     {org:'huerta',profile:{
      costs:'20 garden kits at cost: US$700 (about US$35 each for containers, soil and seedlings).\nWorkshop materials for four monthly workshops: US$120.\nStall fees and transport for two Saturday markets: US$100.\nContingency for losses and surprises: US$80.\nTotal: about US$1,000 for four months.\nNot paid but counted: my time, about 15 hours a week, unpaid during the pilot. Luz Marina’s time. A room for workshops, which we have asked the Junta to lend us free.',
      income:'Confirmed: up to US$1,000 of my savings. I have about US$1,500 but will not use more than US$1,000.\nConfirmed but slow: about US$200 from the women’s small instalments for their kits, paid over four months.\nHoped: pre-orders of 30 kits at full price from two schools and one office. If they come, I use less of my savings.',
      smaller:'I would give out 10 kits instead of 20, in the same sector, with the same four workshops. The kits would cost US$350 instead of US$700, so the pilot costs about US$650, which my savings cover. With 10 gardens I learn from fewer women, so I would be more careful about what the results mean.'
     },notice:'Notice that Camila puts a ceiling on her own savings and counts slow money as slow. Copy the habit of writing down your unpaid time, so you see the real cost.'},
     {org:'mentors',profile:{
      costs:'Mentor transport: GH₵ 1,440 (6 mentors × 8 Saturdays × GH₵ 30).\nSnacks and water: GH₵ 480.\nPrinting past papers and guides: GH₵ 300.\nMentor training and police check fees: GH₵ 180.\nTotal: about GH₵ 2,400 (about US$200) for one term.\nGiven free: two classrooms on Saturdays, if the head teacher agrees; the mentors’ time; my time, about 6 hours a week; the church youth programme’s bank account to hold the money.',
      income:'Confirmed: GH₵ 600 of my own money.\nHoped: GH₵ 1,800 from the church youth programme and one local business. I will ask both in person, with the budget on one page.\nAll money goes through the church’s bank account. I keep every receipt and share a simple record with the church each month.',
      smaller:'I would run the pilot with 4 mentors and 16 pupils instead of 6 and 24, still in groups of 4. Transport falls from GH₵ 1,440 to GH₵ 960. Even this smaller version needs more than my own GH₵ 600, so I will not start until the church or the business confirms. I will not cut the police check fees or the mentor training.'
     },notice:'Notice the cost line that shows its working (6 × 8 × GH₵ 30), so anyone can check it. Copy the decision to run money through a host’s bank account instead of a personal one.'}
    ]}
  }),
  lesson({id:'safe',title:'Stay safe and legal from day one',stage:'Implement',minutes:25,sheet:'Safe and legal',
   learn:[
    'You do not need to be registered to have duties. From your first activity, you are responsible for the people who take part. You are also responsible for their information and for any money you hold. Doing this well from day one builds trust with families and partners.',
    'If you work with children or adults at risk, protecting them comes first. This is called safeguarding. Get written consent from parents or carers. Make sure two adults are always present, and no adult is ever alone with a child. Name one person who deals with concerns. Tell everyone how to raise a worry, and take every worry seriously.',
    'Treat personal information with care. Collect only what you need, ask permission, and keep it safely. Photos and stories need consent too, and people can say no and still take part. Keep project money separate, record every payment and keep the receipts.',
    'Then check the basic legal points. You may need permission to use a place, or a permit for an activity. If you sell, you may need to register for tax. Some activities need insurance. Rules differ by country and town, so check the rules where you live. Ask a local office, the tax office, a host organisation or similar projects. These checks become the first steps of your 90-day plan in lesson 5.2.'
   ],
   weak:'We are just a group of friends helping out, so we do not need rules yet. Everyone knows and trusts us.',
   strong:'Next Step Mentors: “Parents sign a written consent form before their child joins. Sessions happen only in the school, in open classrooms. No mentor is ever alone with one pupil. Every mentor signs a code of conduct.”',
   why:'It turns “keeping children safe” into rules that anyone can follow and check, and it names a real person to go to with a worry.',
   reflect:'If a parent asked you tomorrow how you keep their child and their information safe, what would you honestly say?',
   exercise:'List what you must check or register before the pilot starts. Then write the rules you will follow to keep people and their information safe, and name who you will ask for advice.',
   fields:[
    {key:'duties',label:'What you must check or register',hint:'One per line: permissions, permits, tax registration if you sell, insurance (e.g. “Written permission from the school to use two classrooms”).'},
    {key:'protect',label:'How you will keep people and their information safe',hint:'One per line: consent, two adults, a named person for concerns, how you store names and phone numbers, photos, money (e.g. “Two adults at every session”).'},
    {key:'help',label:'Who you will ask',hint:'People or offices that can advise you, and what you will ask each one (e.g. “The tax office: do I need to register to sell?”).'}
   ],
   check:'Could you show a parent or partner, in writing, how you keep people and their information safe?',
   gallery:{title:'Three founders, same exercise',intro:'None of the three is registered yet, but each one writes down their duties, their safety rules and who to ask.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      duties:'Written permission from both village heads for each planting site.\nCheck the local rules on planting in coastal zones before the first planting day.\nA consent form signed by a parent for each of the 15 young people.\nA written agreement with the pond owner for the buffer strip.\nAsk whether we need insurance for the boat trip to the site.',
      protect:'Two adults always present, and no adult ever alone with a child.\nLife jackets for everyone near or on the water.\nWayan is our named safeguarding person, and every family has his phone number to raise a concern.\nPhotos only with the consent of the young person and a parent.\nConsent forms and phone numbers kept in one folder by Wayan, not shared.',
      help:'The two village heads, about sites and permissions.\nThe village youth organisation (karang taruna), which hosts us and knows local rules.\nThe school, about consent forms and keeping young people safe.\nThe environment office, about the rules for planting in coastal zones.'
     },notice:'Notice that the safety rules fit the real activity: water means life jackets. Copy the named person with a phone number, so families know exactly who to call.'},
     {org:'huerta',profile:{
      duties:'Register with the tax office (DIAN) for my RUT before I sell any kit.\nAsk how to give simple sales invoices to schools and offices.\nBuy seedlings only from a registered nursery.\nCheck whether the Saturday stall needs a permit.\nBook workshops in a safe public venue.',
      protect:'Women’s names and phone numbers stay on my phone, only with their permission, and are never shared.\nPhotos only with consent; a woman can say no and still take part.\nWorkshops in a safe public venue, such as the Junta’s room, not in a private home.\nKit money kept apart from my own savings, with a receipt for every payment.',
      help:'DIAN, about the RUT and invoices.\nAn accountant who works with small businesses, about invoicing and simple records.\nThe Junta de Acción Comunal, about the venue and whether the stall needs a permit.\nThe city’s urban agriculture programme, about registered nurseries.\nLater, the chamber of commerce, about registering a company if the pilot works.'
     },notice:'Notice that Camila registers for tax before she sells, even as an individual. Copy the simple data rule: collect only names and phone numbers, with permission, and share them with no one.'},
     {org:'mentors',profile:{
      duties:'A written agreement with the head teacher to use two classrooms on Saturdays.\nParents’ written consent for every pupil.\nA police check for each mentor where possible, and a signed code of conduct.\nConfirm that the church’s safeguarding policy covers our sessions.\nLater, before registering as an NGO, check the current steps locally.',
      protect:'Sessions only in the school, in open classrooms.\nNo mentor is ever alone with one pupil.\nThe church youth leader is our named safeguarding person, and pupils and parents know how to report a concern.\nPupils’ details kept on paper by the school, not on mentors’ phones.\nNo photos of pupils without consent.',
      help:'The church youth leader, about safeguarding and the church’s policy.\nThe head teacher, about school rules, consent forms and pupils’ records.\nThe local police station, about how mentors can get a police check.\nThe Department of Social Welfare, later, about the current steps to register as an NGO.'
     },notice:'Notice that Kwame borrows rules that already exist: the church’s safeguarding policy and the school’s records. Copy that: a host organisation can give you tested rules from day one.'}
    ]}
  }),
  lesson({id:'risks',title:'What could stop you',stage:'Design',minutes:20,sheet:'Risks',tools:['issue-risk-management'],
   learn:[
    'A risk is something that could stop your pilot or harm someone. You cannot remove every risk, and you do not need a long list. Focus on the four or five things most likely to go wrong. Start with the biggest assumption you named in lesson 2.1.',
    'For each risk, ask two questions. How likely is it: low, medium or high? How serious would it be if it happened? Then decide one thing you will do now to make it less likely or less harmful. For example, if parents may say no, meet them before you start.',
    'Some risks are already covered. Your safety rules from lesson 4.2 reduce harm to people. Your smaller pilot from lesson 4.1 protects you if money does not come. You can point to them instead of writing them twice.',
    'Do not forget yourself. Founders often risk too much money, time or health. Decide now how much money you can afford to lose. Decide how many hours a week you can give, beside your job, studies or family. Write what would make you pause. These limits are part of a good plan, not a weakness. Your top risks shape the checks in your 90-day plan in lesson 5.2.'
   ],
   weak:'There are no big risks. If problems come, we will work harder and solve them together.',
   strong:'Huerta Viva: “Women drop out after the first month. Likely and serious, because this is our biggest assumption. We hold workshops monthly, not weekly, and send WhatsApp reminders.”',
   why:'It rates the risk honestly, links it to the biggest assumption, and names a concrete action taken before anything goes wrong.',
   reflect:'What is the one thing you are most afraid could go wrong, and have you written it down?',
   exercise:'List the four or five things most likely to stop or harm your pilot, rate each one, and write what you will do now. Then write your personal limits.',
   fields:[
    {key:'risks',label:'Your top risks',hint:'One per line: what could happen, how likely (low, medium, high), how serious, and what you will do now (e.g. “Volunteers stop coming. Medium, serious. A WhatsApp group and a thank-you at each session.”).'},
    {key:'limits',label:'Your personal limits',hint:'How much money you can afford to lose, how many hours a week you can give, and what would make you pause (e.g. “No more than US$200 of my own money; 5 hours a week; I pause if my studies suffer”).'}
   ],
   check:'Have you written down how much money and time you can afford to give, and what would make you pause?',
   gallery:{title:'Three founders, same exercise',intro:'Each founder keeps to four risks, starts with the biggest assumption, and sets clear personal limits.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      risks:'Parents say no to their children taking part. Medium likelihood, very serious. We talk at a village meeting first and answer safety worries.\nSeedlings die. Medium likelihood, serious. We use the right species in the right places, and Sari checks the tides before each planting day.\nThe pond owner clears the site. Low likelihood, very serious. We get a written agreement for the buffer strip.\nWe burn out. Medium likelihood, serious. We cap our time at two days a week each.',
      limits:'Money: the US$100 we have put in, and no more of our own.\nTime: about two days a week each. Wayan mainly gives weekends and school holidays, because his teaching comes first.\nWe pause if a young person is hurt, if the village heads withdraw permission, or if either of us cannot keep to two days a week.'
     },notice:'Notice that the first risk is the biggest assumption from lesson 2.1: parents letting their children take part. Copy how each risk ends with an action, not a worry.'},
     {org:'huerta',profile:{
      risks:'Women drop out after the first month. High likelihood, very serious, because this is our biggest assumption. Monthly workshops, not weekly, and WhatsApp reminders.\nPests or heavy rains destroy gardens. Medium likelihood, serious. Hardy crops, and timing the start around the rainy season.\nSchools and offices do not buy kits. Medium likelihood, serious. Start with the smaller 10-kit pilot.\nI lose my savings. Low likelihood, serious for my family. A cap of US$1,000.',
      limits:'Money: no more than US$1,000 of my US$1,500 savings. The rest stays for my family.\nTime: about 15 hours a week, beside my part-time job at the seed company.\nI pause and rethink if I reach the US$1,000 cap, or if the project starts to put my job at risk.'
     },notice:'Notice that Camila’s money limit is a number, not a feeling. Copy the link between a risk and an earlier decision: the smaller pilot from lesson 4.1.'},
     {org:'mentors',profile:{
      risks:'Mentors stop coming. High likelihood, very serious, because this is our biggest assumption. Transport money, a WhatsApp group, and a certificate for mentors who finish the term.\nThe head teacher changes his or her mind. Low likelihood, very serious. A written agreement before we start.\nA safeguarding incident. Low likelihood, very serious. Our rules from lesson 4.2 and the church’s policy.\nI take on too much. Medium likelihood, serious. A cap of 6 hours a week, and Abena runs one Saturday a month.',
      limits:'Money: my GH₵ 600 for this term, and no more.\nTime: about 6 hours a week, on evenings and Saturdays, beside my full-time job at the bank.\nI pause at once if there is a safeguarding concern, until the church youth leader has dealt with it. I also pause if I cannot keep to 6 hours a week without it hurting my work.'
     },notice:'Notice that a rare risk still makes the list because it would be so serious. Copy the rule to pause at once on a safeguarding concern, decided before anything happens.'}
    ]}
  })
 ]
});
