import {module,lesson,review} from './kit.js';
// Idea into Impact (entrepreneurs track). Story bible: docs/idea-into-impact.md
export default module({
 id:101, no:1, slug:'idea-clarify', phase:'Idea into Impact', track:'entrepreneurs',
 title:'Clarify your idea', short:'The problem and who has it, talking to people before you build, and your purpose in one sentence',
 intro:'Decide what problem you are solving, for whom, and why your project should exist. Getting this clear before you build saves time and money, and every later step of your Launch Plan builds on it.',
 output:'Problem and purpose', uses:[], workbook:{file:'Idea-into-Impact.xlsx',title:'Idea into Impact workbook'},
 lessons:[
  lesson({id:'problem',title:'The problem and who has it',stage:'Understand',minutes:20,sheet:'Problem',
   learn:[
    'Most new projects start with a solution: an app, a training course, a centre. Start one step earlier. Describe the problem first: who has it, where, and what happens because of it. “Young people have nothing to do” is vague. “Girls in two villages leave school at 14 because the nearest secondary school is 12 km away” is a problem you can work with.',
    'Keep the problem separate from your solution. “There is no app for farmers” is a solution in disguise. The real problem might be that farmers cannot get fair prices. When you name the real problem, you stay open to better answers. A phone line, a trusted neighbour or a weekly meeting might work better than an app.',
    'Be exact about the people. Who has the problem? Who is most affected? Sometimes the person who decides or pays is someone else. Parents decide for their children. Schools buy for pupils. Write all of them down, because each of them can say yes or no to your idea.',
    'Finally, be honest about what you know. Some things you have seen yourself or heard many times. Others are guesses. Mark each one Known or Guess. Guesses are not a weakness: they are your list of things to check. In lesson 1.2 you will test them by talking to people, and in lesson 1.3 your problem becomes your purpose.'
   ],
   weak:'Young people in Africa have no opportunities, and our app will change that.',
   strong:'Huerta Viva: “In the hillside neighbourhoods of Comuna 8 in Medellín, many women who head their households spend a large share of their income on food. Their families eat few fresh vegetables.”',
   why:'It names who has the problem, exactly where, and what happens because of it, without mentioning the solution yet.',
   reflect:'Is this a problem the people affected would name themselves, or one you see from the outside?',
   exercise:'Describe the problem before you think about your solution. Then list the people involved, and mark each thing you believe as Known or Guess.',
   fields:[
    {key:'need',label:'The problem',hint:'Who has it, where, and what happens because of it. Describe the problem, not your solution (e.g. “Pupils in Nima choose a school programme with no advice, and some drop out”).'},
    {key:'people',label:'The people you want to help',hint:'Who exactly; who is most affected; who decides or pays, if that is someone else (e.g. parents decide for their children).'},
    {key:'evidence',label:'What you know and what you are guessing',hint:'One per line. Start each with Known: or Guess: (e.g. “Guess: parents will let their children join”).'}
   ],
   check:'Could someone who has never met you explain the problem, and who has it, after reading what you wrote?',
   gallery:{title:'Three founders, same exercise',intro:'Each founder describes the problem before the solution, names everyone involved, and separates what they know from what they guess.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      need:'Along the coast of our two villages in North Bali, mangroves have been cleared for shrimp ponds and building. Erosion and flooding are getting worse. Young people aged 12–17 grow up right beside this coast, but they have few chances to learn about it or do anything to protect it. Outsiders have planted mangroves here before, but they chose the wrong species and the wrong places, and the plantings failed.',
      people:'Young people aged 12–17 in our two villages, especially those whose families live closest to the shore and feel the flooding first. Their parents decide whether they can take part, so parents matter as much as the young people. The two village heads decide where anyone can plant. Shrimp pond owners also use this coast, and one of them could stop us or help us.',
      evidence:'Known: we can see the cleared areas from the road.\nKnown: village heads and families say the flooding is getting worse.\nKnown: past plantings by outsiders failed.\nGuess: young people want to take part regularly.\nGuess: parents will let them.\nGuess: there are sites where the right species can survive.\nGuess: pond owners will not object.'
     },notice:'Notice that Wayan and Sari list parents, village heads and a pond owner as well as the young people. Copy this: write down the people who can say no, not only the people you want to help.'},
     {org:'huerta',profile:{
      need:'In the hillside neighbourhoods of Comuna 8 in Medellín, many women who head their households spend a large share of their income on food. Their families eat few fresh vegetables. They have few ways to earn money without leaving home. Yet many of them have a small patio, rooftop or balcony that nobody uses.',
      people:'Women heads of household in one sector of Comuna 8. The most affected are women with young children and no regular income. Who pays is not only them: I plan to sell kits to the women at a low price in small instalments, and at full price to offices and schools. Community kitchen leaders and the Junta de Acción Comunal (neighbourhood council) decide who hears about us, so they matter too.',
      evidence:'Known: I see empty patios and rooftops on every street in our sector.\nKnown: Luz Marina says many women struggle to buy vegetables.\nKnown: vegetables grow well in small containers; it is my job as an agronomist.\nGuess: women want to grow food at home.\nGuess: they will pay small instalments for a kit.\nGuess: offices and schools will buy kits at full price.\nGuess: women want to sell what they grow.'
     },notice:'Notice the last guess: in lesson 1.2 Camila learns that most women want to save money first, not sell. Copy her honesty: writing a belief as a guess makes it easy to change later.'},
     {org:'mentors',profile:{
      need:'In Nima, Accra, pupils in their final year of junior high school (about 14–15) have few people to help them prepare for the BECE, the national exam. They also get little help choosing a senior high school programme. Many choose without guidance, some end up in a programme that does not suit them, and some drop out of education.',
      people:'Final-year junior high school pupils in Nima, aged about 14–15. The most affected are pupils whose families cannot pay for private tutoring. Parents decide whether their children can join, so I must earn their trust. Head teachers decide whether we can use the school. University students would be the mentors, so they are part of the picture too.',
      evidence:'Known: I grew up in Nima, and most of my classmates chose a programme with almost no advice.\nKnown: private tutoring is too expensive for most families here.\nGuess: pupils want help from mentors close to their own age.\nGuess: parents will trust young volunteers.\nGuess: university students will give up their Saturdays.\nGuess: a school will let us use its classrooms.'
     },notice:'Notice that Kwame counts his own experience as known, but only for his own year. Copy how he turns everything he is hoping for into a guess he can test.'}
    ]}
  }),
  lesson({id:'talk',title:'Talk to people before you build',stage:'Understand',minutes:30,sheet:'Conversations',
   learn:[
    'Before you build anything, talk to the people you want to help. These are problem interviews: short conversations about their life, not about your idea. If you describe your idea, most people will be polite and say it sounds great. That tells you nothing.',
    'Ask about what people did in the past, not what they might do. “Would you come to a workshop?” invites a kind yes. “What did you do the last time this happened?” gets a real answer. Use open questions (questions that cannot be answered with yes or no). Listen for what people already do about the problem, and what they already spend in money and time.',
    'Aim for 5 to 10 conversations. Include people who might disagree, and people who decide for others, such as parents or a local leader. Take notes during or straight after each talk, using their own words. Then look for what you heard again and again.',
    'Treat people with respect. Say who you are and why you are asking. Ask before you take notes, and keep names private. With children, talk only with a parent or teacher present. Do not promise anything: you do not know yet what you will build. What you hear will sharpen the problem you wrote in lesson 1.1 and shape your purpose in lesson 1.3.'
   ],
   weak:'I showed my idea to ten friends and they all loved it, so people definitely need it.',
   strong:'Next Step Mentors: “How did you choose your senior high school programme, or how are you choosing it now? Who helps you prepare for the BECE at the moment?”',
   why:'Both questions ask about what pupils actually do, not whether they like Kwame’s idea, so the answers show the real need.',
   reflect:'Are you ready to hear that your idea is not what people need?',
   exercise:'Write five open questions about people’s lives. Then have 5–10 conversations, including someone who might disagree, and record what you heard and what you will change.',
   fields:[
    {key:'questions',label:'Your questions',hint:'Five open questions, one per line, about their life and what they did last time, not about your idea (e.g. “Tell me about the last time…”).'},
    {key:'heard',label:'Who you spoke to and what you heard',hint:'How many people and what kinds (e.g. 7 parents, 9 pupils). Then the 3–5 things you heard most, one per line.'},
    {key:'changed',label:'What surprised you and what you will change',hint:'What you did not expect, and what you will change in your problem, your people or your idea (e.g. “Monthly, not weekly, because time is short”).'}
   ],
   check:'Have you spoken to at least five people, including someone who might disagree, without pitching your idea?',
   gallery:{title:'Three founders, same exercise',intro:'Each founder asked about real life and past behaviour, listened, and changed something because of what they heard.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      questions:'Tell me about the last time the sea flooded near your home. What happened?\nWhat do you do on the coast now, after school or at weekends?\nWho has tried to plant mangroves here before, and what happened?\nWhat do you learn about the coast at school?\nWhat would worry you if your child spent a Saturday on the coast with a group?',
      heard:'We spoke to 21 people: 2 village heads, 11 young people, 6 parents, 1 shrimp pond owner and the owner of a local nursery.\nWhat we heard most:\nFlooding is worse than when the parents were young.\nEarlier plantings died because the seedlings were the wrong kind, in the wrong place.\nYoung people want to measure and check, not only plant.\nParents worry about safety near the water.',
      changed:'The biggest surprise was that young people wanted to monitor and measure, not just plant. So our idea is now planting-and-monitoring days, with young people as team leaders. Parents’ worries about safety mean we will plan supervision and life jackets before we ask anyone to join. The pond owner was open to a buffer strip of mangroves if it does not cost him land. We will ask him to show us where.'
     },notice:'Notice that Wayan and Sari changed the idea itself because of what young people said. Copy this: write down one thing you will do differently, not only what you heard.'},
     {org:'huerta',profile:{
      questions:'What did you buy for food last week, and where?\nHow do you decide which vegetables to buy?\nTell me about a time you grew something at home. What happened?\nWhen in the week do you have a few free hours?\nWhat projects have come to this neighbourhood before, and what happened with them?',
      heard:'I spoke to 22 people: 18 women in Comuna 8, 2 community kitchen leaders, 1 market stall holder and 1 member of the Junta de Acción Comunal (neighbourhood council).\nWhat I heard most:\nVegetables are expensive, so families buy fewer of them.\nMost women want to save money on food first; only some want to sell.\nTime is the biggest barrier: once a month is possible, every week is not.\nSeveral women do not trust projects that promise income.',
      changed:'I was surprised that saving money mattered more than selling. I had planned the project around income. Now the kit and the workshops focus first on growing food for the family, and selling surplus is an option for women who want it. I will run one workshop a month, not one a week. And I will not promise income in anything I say or write.'
     },notice:'Notice that Camila moved selling from the centre of her idea to an option. Copy her last line: what you hear can change what you promise, not only what you do.'},
     {org:'mentors',profile:{
      questions:'How did you choose your senior high school programme, or how are you choosing it now?\nWho helps you prepare for the BECE at the moment?\nWhat happened to older brothers, sisters or friends after junior high school?\nWhat do you usually do on Saturdays?\nWhat would you need to know about a mentor before you let your child meet one?',
      heard:'I spoke to 25 people: 2 head teachers, 9 pupils, 7 parents, 1 church youth leader and 6 university students.\nWhat I heard most:\nPupils want help choosing a programme as much as help with the exam.\nParents want to know who the mentors are before they agree.\nUniversity students are willing, but they need transport money to get to Nima.\nThe head teachers would welcome help if it is well organised.',
      changed:'I thought pupils mainly needed exam help. Now choosing a programme is half of what we will do. Parents’ questions mean mentors will be trained, sign a code of conduct and meet parents first. I had planned to spend nothing, but mentors will need transport money, so I will have to find a small amount.'
     },notice:'Notice that Kwame asked parents what would make them trust a mentor. Copy this: include the people who decide for others, and ask what they would need to say yes.'}
    ]}
  }),
  lesson({id:'purpose',title:'Your purpose in one sentence',stage:'Design',minutes:20,sheet:'Purpose',
   learn:[
    'Your purpose is the reason your project exists. It names the change you want to see for people or a place, not your activity. Start with “We exist so that…”. For example: “We exist so that older people in our town are not alone.” It should still be true if your activities change.',
    'Your mission is what you will do to get there. Use a simple pattern: We help [who] [achieve what change] through [how]. The mission is more specific than the purpose. It names the people, the place and the main activity. Call it a first draft. It will probably change after your pilot (a small, time-limited test), which you plan in module 2.',
    'Keep both short and plain. Avoid big words like “empower” or “transform” unless you say what they mean. Do not promise what you cannot influence. “End poverty” is not yours to promise. “Earn from what they grow” may be.',
    'Then test your sentences. Read them to two people you spoke to in lesson 1.2. Do they recognise their problem in your words? Could your purpose help you say no to a tempting activity that does not fit? Your purpose and mission open your Launch Plan, and you will use them again in your one-minute pitch in module 3.'
   ],
   weak:'We empower communities to transform lives sustainably through innovative solutions.',
   strong:'Tide Line Youth Collective: “We exist so that young people in coastal villages can protect and restore the coast they depend on.”',
   why:'It names who, and the change for them and for a place, but no activity. It would stay true if planting days became something else.',
   reflect:'Would the people you spoke to recognise themselves in these words?',
   exercise:'Write your purpose starting “We exist so that…”, then a first-draft mission using the pattern. Read both aloud to someone you spoke to in lesson 1.2 and note their reaction.',
   fields:[
    {key:'purpose',label:'Our purpose',hint:'One sentence starting “We exist so that…”. Name the change for people or a place, not your activity.'},
    {key:'mission',label:'What we will do (first draft)',hint:'We help [who] [achieve what change] through [how]. One or two sentences (e.g. “We help pupils in Nima … through Saturday mentoring”).'}
   ],
   check:'Would your purpose still be true if your activities changed after the pilot?',
   gallery:{title:'Three founders, same exercise',intro:'Each founder writes a purpose with no activity in it, then a first-draft mission that names who, what change and how.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      purpose:'We exist so that young people in coastal villages can protect and restore the coast they depend on.\n\nWe wrote “protect and restore”, not “plant mangroves”, because planting is only one way to get there. We put young people first because they told us they want to act, not only watch.',
      mission:'We help young people in two North Bali villages restore mangroves and learn about their coast through monthly planting days and school sessions.\n\nThis is a first draft. After the pilot we may add more about monitoring, because the young people asked to measure what they plant.'
     },notice:'Notice the purpose names no activity, while the mission names who, where and how. Copy that split: the purpose stays, and the mission can change after your pilot.'},
     {org:'huerta',profile:{
      purpose:'We exist so that women in Medellín’s hillside neighbourhoods can feed their families well and earn from what they grow.\n\nFeeding the family comes first because that is what the women told me matters most. The word “can” matters too: we open a door, but we do not promise income.',
      mission:'We help women heads of household in Comuna 8 grow vegetables at home through low-cost garden kits, monthly workshops and a shared Saturday market stall.\n\nEach part answers something I heard: low-cost kits because money is tight, monthly workshops because time is short, and the stall for the women who want to sell.'
     },notice:'Notice that each part of Camila’s mission links back to her conversations. Copy this: for every “how” in your mission, you should be able to say who asked for it.'},
     {org:'mentors',profile:{
      purpose:'We exist so that young people in Nima can finish school and choose their next step with confidence.\n\n“Finish school” covers the drop-out problem. “Choose their next step” covers what pupils told me they wanted most. I did not write “pass the BECE”, because results depend on much more than us.',
      mission:'We help final-year junior high school pupils in Nima prepare for the BECE and choose their senior high school programme, through weekly Saturday mentoring by trained university students.\n\n“Trained” is there for parents: they asked who the mentors are. It also reminds me that training comes before the first Saturday.'
     },notice:'Notice that “trained” in Kwame’s mission is a promise to parents. Copy this: let one or two words show the people you spoke to that you listened.'}
    ]}
  })
 ]
});
