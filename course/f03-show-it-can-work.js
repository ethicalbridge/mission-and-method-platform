import {module,lesson,review} from './kit.js';
// Idea into Impact (entrepreneurs track). Story bible: docs/idea-into-impact.md
export default module({
 id:103, no:3, slug:'idea-prove-show', phase:'Idea into Impact', track:'entrepreneurs',
 title:'Show it can work', short:'How you will know it works, who else is out there and why you, and your one-minute pitch',
 intro:'In this step you decide how you will measure your pilot, where your idea fits among the people who already help, and how to explain it all in one minute. You need these now, before you ask anyone for money, time or permission.',
 output:'Measures and pitch', uses:[], workbook:{file:'Idea-into-Impact.xlsx',title:'Idea into Impact workbook'},
 lessons:[
  lesson({id:'measures',title:'How you will know it works',stage:'Design',minutes:20,sheet:'Measures',
   learn:[
    'Before your pilot starts, decide how you will know if it works. Otherwise you will finish with a feeling, not an answer. A measure (something you count or ask about) turns “it went well” into something you can check.',
    'There are two kinds of measure. Outputs count what you do: sessions held, kits delivered, seedlings planted. Outcomes show what changes for people: they keep coming, they save money, they learn something. Outputs are easy to count. Outcomes matter more, so include at least one.',
    'Keep it small. Three measures are enough for a pilot. For each one, write the number that would make you happy, and write it before you start. Then decide how and when you will collect it. A sign-in sheet, a short question after a session or a count at month three is often enough. Choose methods you can keep up alongside your job or studies.',
    'Be honest about what you cannot claim yet. A three-month pilot cannot prove that flooding fell or that families are out of poverty. Say what you counted and what people told you. Partners trust honest small numbers more than big promises. Your measures build on the signs of success you chose in lesson 2.2, and they become the proof in your pitch in lesson 3.3.'
   ],
   weak:'We will measure our impact on the community and show that lives have changed.',
   strong:'Huerta Viva: “Gardens still producing at month 1, 2 and 4: we look at each garden. Happy if 15 of the 20 are still producing at month 4.”',
   why:'It names one thing you can see, when you will look, and the number that counts as success, all decided before the pilot starts.',
   reflect:'Which of your measures would you be tempted to make look better than it is, and how will you stop yourself?',
   exercise:'Write three measures for your pilot, with at least one outcome. For each, write the number that would make you happy, then how and when you will collect it.',
   fields:[
    {key:'measures',label:'Three things you will measure',hint:'One per line: what you count or ask, and what number would make you happy (e.g. Young people at each session: happy if 12 of 15 come every time).'},
    {key:'collect',label:'How and when you will collect it',hint:'Who collects it, with what (a sign-in sheet, three short questions, a count), and when (e.g. each session, month 3).'},
    {key:'claim',label:'What you will not claim yet',hint:'The big changes your pilot is too small or too short to prove, and how you will word your results instead (e.g. “people told us”, “early signs”).'}
   ],
   check:'Did you write down the number that would make you happy before your pilot starts?',
   gallery:{title:'Three founders, same exercise',intro:'Each founder picks three measures they can really collect, and names the claim they will not make yet.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      measures:'Young people at each planting day: we count names on a sign-in sheet. Happy if at least 12 of the 15 come to all three days.\nSeedlings planted, and how many are alive at the end of the pilot (month 3) and again at month 6. Happy if at least 60% are alive at month 3.\nYoung people who can explain why mangroves matter: a short quiz on the first and last day. Happy if most score higher at the end.',
      collect:'Sari keeps the sign-in sheet at every planting day. At the end of month 3 and again at month 6, Sari and the youth team leaders count the living seedlings in marked plots at the site. The quiz is five questions and takes ten minutes, at the start of the first day and the end of the third. We write all results in one notebook the same week.',
      claim:'We will not claim that flooding or erosion has gone down. That would take years, and many other things affect it. After the pilot we will only say how many young people came, how many seedlings survived and what young people learned. We will call these early signs, not proof.'},
      notice:'Notice the mix: one output (seedlings planted) and two outcomes (seedlings surviving, young people learning). Copy the way each measure has its own number for “happy”.'},
     {org:'huerta',profile:{
      measures:'Gardens still producing at month 1, 2 and 4: we look at each garden. Happy if 15 of the 20 are still producing at month 4.\nMoney women say they saved each week on vegetables. Happy if most women report a saving.\nWomen who sold surplus, and how much. Happy if at least 5 women sell something.',
      collect:'Luz Marina and I visit every garden at month 1, 2 and 4 and note whether it is producing. At each monthly workshop, we ask each woman two short questions: what did you harvest, and about how much did you save on vegetables this week? At the Saturday stall I write down who sold and how much they earned.',
      claim:'We will not claim that food security has improved. Twenty women over four months cannot show that. The savings are what women tell us, not receipts, so we will write “women say they saved”. We will also report the gardens that stopped, not only the ones that did well.'},
      notice:'Notice that Camila collects most answers at workshops women already attend, so nobody needs extra time. Copy that: collect where people already are.'},
     {org:'mentors',profile:{
      measures:'Pupils at each Saturday session. Happy if 20 of the 24 pupils attend most sessions.\nMentors at each Saturday session. Happy if 5 of the 6 mentors come to at least 7 of the 8 Saturdays.\nPupils who submit their senior high school choices on time. Happy if every pupil in the pilot does.',
      collect:'Abena takes a register of pupils and mentors at the start of every Saturday. The head teacher tells us which pupils submitted their school choices by the deadline. After the last Saturday, pupils and parents fill in a short paper form: did the guidance help you choose? I add everything to one sheet each Sunday evening.',
      claim:'We will not claim that we improved BECE results. We will compare our group’s results with the school’s previous year, but many things affect them: teachers, families, the exam itself. We will report the numbers carefully, with what pupils and parents told us, and never say we caused them.'},
      notice:'Notice that Kwame measures his mentors as well as his pupils, because his biggest assumption is that mentors keep coming. Copy that: measure your riskiest assumption.'}
    ]}
  }),
  lesson({id:'others',title:'Who else is out there, and why you',stage:'Understand',minutes:20,sheet:'Others',
   learn:[
    'Your idea is probably not the first answer to this problem. People already cope somehow. They pay for something, ask a relative, use a public service or go without. Start by writing down what people do today. You heard much of this in your conversations in lesson 1.2.',
    'Then look for others who already help. They might be public programmes, charities, churches, businesses or other groups. Never say “nobody does this”. A funder or partner will usually know someone who does, and you will lose their trust. If truly nobody helps, ask why. It may be very hard, or people may not want it.',
    'Now find your difference. It could be who you reach, where you work, how often, the price, or the trust you already have. Ask yourself: why would people choose us over what they do today? Be specific. “We care more” is not a difference.',
    'Many of these others are not competitors. They can be partners (people or groups who work with you towards the same aim). A school can lend a room. A public programme can give seeds. A business can give money or equipment. Your difference and your partners go straight into your one-minute pitch in the next lesson.'
   ],
   weak:'Nobody else is doing this. Our idea is completely new, so we have no competition.',
   strong:'Huerta Viva: “Our kit costs little and women can pay in small instalments. They get practical help every month, not only on the first day, and a shared stall to sell what they do not eat.”',
   why:'It names exactly what is different from the free seeds, the expensive shop kits and the food parcels women already know, in words a woman in Comuna 8 would understand.',
   reflect:'If you were one of the people you want to help, would you really choose your idea over what you do today? Why?',
   exercise:'List what people do today and who else helps, one per line. Then write why people would choose you, and name two or three groups you could work with.',
   fields:[
    {key:'others',label:'What people do today and who else helps',hint:'One per line: what people do now, and each programme, group or business that already helps, with what it does well or badly (e.g. Private tutors: good, but too expensive for most families).'},
    {key:'different',label:'Why you',hint:'What you do differently (who, where, how often, price, trust) and why people would choose you over what they do today.'},
    {key:'partners',label:'Who could help you',hint:'One per line: a person or group, and what they could give (e.g. a room, materials, introductions, advice, money).'}
   ],
   check:'Could you name at least two others who already help, without saying anything unfair about them?',
   gallery:{title:'Three founders, same exercise',intro:'Each founder lists what already exists, finds a real difference and turns some of the others into partners.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      others:'The provincial environment office runs planting events now and then, mostly for tourists.\nA local dive operator organises beach clean-ups.\nOutside groups have planted mangroves here before, but the seedlings died: wrong species, wrong place.\nMost young people see the coast change every day but have no way to learn about it or act.',
      different:'We are youth-led and local. Young people from the two villages plant on their own coast every month, not once for a photo. Sari chooses species and sites with the tides in mind, and we go back to count which seedlings survive. Families already know Wayan from school. Young people told us they want to monitor and measure, so we give them that job.',
      partners:'The school: sessions in class and help to reach families.\nThe local nursery: the right seedlings and advice on species.\nThe dive operator: they already care about the coast and could fund boots and gloves or join a planting day.\nThe village youth organisation (karang taruna), which hosts our group.'},
      notice:'Notice that Wayan and Sari learn from the failed plantings instead of hiding them. Copy that: what went wrong for others can explain why you are different.'},
     {org:'huerta',profile:{
      others:'The city’s urban agriculture programme gives free seeds and training now and then, but not regularly.\nGarden shops sell garden kits, but they are too expensive for most women here.\nNGOs run food-parcel programmes, which help for a while but do not last.\nMost women buy all their vegetables, and their patios, rooftops and balconies stay empty.',
      different:'Our kit costs little and women can pay in small instalments. They get practical help every month, not only on the first day, and a shared stall to sell what they do not eat. Luz Marina and I live in the neighbourhood, so women can stop us in the street with a question. We do not promise big incomes, because women told us they distrust projects that do.',
      partners:'The city urban agriculture programme: seeds and training we can add to our workshops.\nA community kitchen: a place to meet women and maybe a buyer for surplus vegetables.\nA school: a buyer of full-price kits.\nThe Junta de Acción Comunal: a free room for workshops.'},
      notice:'Notice that the city programme appears twice: as something that already exists and as a partner. Copy that: the group you thought was a rival may be your best ally.'},
     {org:'mentors',profile:{
      others:'Paid private tutoring, which most families in Nima cannot afford.\nA few NGOs run mentoring, but in other districts, not in Nima.\nChurches run Sunday youth groups, but these are not about the BECE or school choice.\nMany pupils choose their senior high school programme alone, without guidance.',
      different:'Our mentors are near-peers: university students from the same community, only a few years older than the pupils. Sessions are on Saturdays in the pupils’ own school, in small groups of four. We help with choosing a programme as well as the exam, because pupils told us they wanted both. It is free for families.',
      partners:'The school: classrooms on Saturdays and the head teacher’s support.\nThe church youth programme: our host, with a bank account and a safeguarding policy.\nA university student association: help to find and recruit mentors.\nA local business: transport money and snacks for mentors, and maybe help with a certificate for mentors.'},
      notice:'Notice that Kwame does not criticise private tutors; he simply says most families cannot afford them. Copy that fair, factual tone about others.'}
    ]}
  }),
  lesson({id:'pitch',title:'Your one-minute pitch',stage:'Design',minutes:25,sheet:'Pitch',
   learn:[
    'A pitch is a short spoken explanation of your idea that ends with a request. You will use it everywhere: at a village meeting, with a head teacher, a shop owner or a funder. One minute is about 120 words. That is short, so every sentence must earn its place.',
    'Use five parts, in this order. First, the problem: who has it and where. Second, what you do about it. Third, why you: what makes you the right person or team. Fourth, your proof so far: what you learned from your conversations. Fifth, your ask: one clear request.',
    'The ask is the part most beginners forget. Ask for something specific: an amount, a room, a permission or an introduction. Say by when you need it. A vague “please support us” is easy to agree with and easy to forget. Do not promise results you cannot show yet.',
    'Change your pitch for each listener. A parent cares about safety. A business owner cares about the neighbourhood and their good name. Practise aloud and time yourself. Say it to a friend until it sounds like you talking, not reading. Your pitch and your ask will help you find your first money in lesson 5.1.'
   ],
   weak:'Hello, we are a passionate team who want to empower youth and change Africa. We have many great ideas and we need support. Please help us in any way you can.',
   strong:'Next Step Mentors: “GH₵ 1,800 (about US$150) for mentors’ transport, snacks and printing for one term, from the church youth programme and one local business, agreed before our first Saturday.”',
   why:'The listener knows exactly what is asked, what it pays for and by when, so they can say yes or no today.',
   reflect:'If someone heard your pitch once, what is the one thing you want them to remember?',
   exercise:'Write your pitch in about 120 words using the five parts, then write your ask separately. Say the pitch aloud, time it, and cut until it fits in one minute.',
   fields:[
    {key:'pitch',label:'Your pitch',hint:'About 120 words: the problem, what you do, why you, what you have learned so far, and your ask. Write it as you would say it.'},
    {key:'ask',label:'Your ask',hint:'What exactly you ask for, from whom, and by when (e.g. a room on Saturdays from the head teacher, agreed in writing before the first session).'}
   ],
   check:'Have you said your pitch aloud, to a real person, in one minute or less?',
   gallery:{title:'Three founders, same exercise',intro:'Each founder uses the same five parts, but speaks to a different listener with a different ask.',prompt:'Which founder is closest to you?',
    items:[
     {org:'idea',profile:{
      pitch:'In our two villages in North Bali, mangroves have been cleared for shrimp ponds and building. Flooding and erosion are getting worse. Young people grow up beside this coast but have few chances to protect it. We run monthly planting-and-monitoring days led by young people, plus school sessions. I am a teacher here and Sari is a marine biologist from the area, so we know the families and the right species. We spoke to 11 young people, 6 parents and 2 village heads. Young people want to measure, not just plant, and a pond owner is open to a buffer strip. Our three-month pilot costs about US$700. We put in US$100 and need US$600 for seedlings, boots, gloves and a boat. Would you fund part of it?',
      ask:'US$600 for seedlings, boots, gloves and the boat to our site for the pilot. We will ask the local dive operator for most of it and two village businesses for the rest, before our first planting day. We will also ask the head teacher for the school’s permission to run two sessions a month, before the start of the pilot.'},
      notice:'Notice that Wayan speaks to the dive operator about the coast their business depends on. Copy how the proof is short and real: who they spoke to and one surprise.'},
     {org:'huerta',profile:{
      pitch:'In Comuna 8, many women who head their households spend a large share of their income on food. Fresh vegetables are often too expensive. Yet many have a patio, rooftop or balcony that stays empty. Huerta Viva sells low-cost garden kits that women pay in small instalments, with a practical workshop every month and a shared Saturday stall to sell surplus. I am an agronomist, and Luz Marina is a community leader here. We spoke to 18 women: most want to save on food first, and they can come once a month, not every week. Kits sold to schools at full price pay for the women’s kits. Would your school pre-order kits for its classrooms?',
      ask:'Pre-orders of 30 kits at full price from two schools and one office, confirmed before I buy the women’s kits in the first month. These orders pay for 20 lower-cost kits for women. Also a free room for the monthly workshops from the Junta de Acción Comunal, agreed before the first workshop.'},
      notice:'Notice that Camila’s listener here is a school, so she explains how a school’s purchase helps women. Copy that: tell each listener what their part does.'},
     {org:'mentors',profile:{
      pitch:'In Nima, final-year junior high school pupils face the BECE and must choose a senior high school programme, often with nobody to guide them. Some choose without advice and some drop out. Next Step Mentors brings trained university students to the school every Saturday, in groups of four, for study help and guidance on the choice. I grew up in Nima and now work at a bank. We spoke to 2 head teachers, 9 pupils and 7 parents. Pupils want help choosing as much as exam help. Parents asked who the mentors are, so every mentor is trained and signs a code of conduct. Will the church help with mentors’ transport and snacks for one term?',
      ask:'GH₵ 1,800 (about US$150) for mentors’ transport, snacks and printing for one term, from the church youth programme and one local business, agreed before our first Saturday. And the head teacher’s permission, in writing, to use two classrooms on Saturdays for the term.'},
      notice:'Notice that Kwame answers the parents’ worry inside the pitch, before anyone asks. Copy that: use the doubts you heard in your conversations to make your pitch stronger.'}
    ]}
  })
 ]
});
