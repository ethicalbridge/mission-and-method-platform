import {module,lesson,review} from './kit.js?v=deeplink2';
// Reviewed October 2026: plain explanation, optional table (anatomy), and a gallery showing how the five example
// organisations (course/examples.js; story in docs/example-organisations.md) complete each exercise.
export default module({
 ...{"uses":[0],"video":null,"id":1,"slug":"strategic-foundation","phase":"Clarify","title":"Strategic Foundations","short":"Purpose, context, stakeholders, vision, mission, values, form, positioning and objectives","intro":"Make the connected decisions every other module depends on: why you exist, the context you work in, who matters, the future you want, the work you do, how you behave, what kind of organisation you are, where you add unique value and what you will prioritise.","output":"Strategic Foundation","workbook":{"file":"Module-01-Strategic-Foundations.xlsx","title":"Strategic Foundations workbook"},"promo":{"lesson":"objectives","tools":["strategic-objectives"],"headline":"Turn your objectives into a living strategy","pitch":"Strategic Objectives keeps your external and internal objectives side by side, with actions, owners, progress and review decisions. Import this module’s workbook and your objectives become a plan your team can update every quarter."}},
 lessons:[
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Understand",
  "id": "purpose",
  "title": "Purpose",
  "sheet": "Purpose",
  "learn": [
   "Purpose explains why your organisation needs to exist. Start with a specific unmet need and the people or environment affected by it. A personal motivation can start the journey, but an organisation needs a reason that matters beyond its founders.",
   "Separate the need from your preferred solution. “We need an app” names a solution; “rural families cannot find reliable information about local services” names a problem. A phone line or a trusted community worker might meet that need better.",
   "Talk with the people affected, including those who may disagree with your idea. Record what you have heard, what evidence you have and what is still an assumption. Module 2 looks at causes in depth; here you only need a clear, honest description of the need.",
   "A useful purpose statement names the change that motivates you without promising more than you can influence. It should still make sense if your activities change, and it helps you decide whether a new project belongs in your work."
  ],
  "weak": "We exist to make a difference.",
  "strong": "Imara Girls in Science: “We exist so that girls in Kisumu can choose science, and the futures it opens, with confidence.”",
  "why": "It names who is affected and the change they need, but leaves room to test different ways of getting there.",
  "reflect": "Whose description of the problem have you heard? Who has not yet been included?",
  "exercise": "Write the need before drafting your purpose. Name one evidence gap and a realistic way to investigate it.",
  "fields": [
   {
    "key": "need",
    "label": "The need we address",
    "hint": "Who experiences the problem, where, and what happens as a result?"
   },
   {
    "key": "evidence",
    "label": "Evidence and open questions",
    "hint": "Separate what you know from what you still need to learn."
   },
   {
    "key": "purpose",
    "label": "Our purpose",
    "hint": "We exist so that…"
   }
  ],
  "check": "Could someone understand why you exist without knowing your planned activities?",
  "gallery": {
   "title": "Five example purpose statements",
   "intro": "Each organisation describes the need first, separates evidence from open questions, and only then writes its purpose.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "need": "Mangroves along the coast of our two villages in North Bali have been cleared for shrimp ponds and building, and erosion and flooding are getting worse. Young people aged 12–17 grow up beside this coast but have few chances to learn about it or act on it.",
      "evidence": "Known: villagers and village heads describe more flooding; we can see the cleared areas; past plantings failed. Not known: how many young people would take part regularly, and which sites and species give seedlings the best chance. Next step: ask families at two village meetings and visit a local nursery.",
      "purpose": "We exist so that young people in coastal villages can protect and restore the coast they depend on."
     },
     "notice": "Notice that the need names both the environment and the young people. Copy how each open question comes with a concrete next step to answer it."
    },
    {
     "org": "ngo",
     "profile": {
      "need": "Girls aged 10–14 in Kisumu public schools get little hands-on science because labs are few and classes are large. They fall behind in maths and science, rarely meet women in science careers, and many drop science subjects in secondary school.",
      "evidence": "Known: our attendance records; head teachers confirm labs are scarce; many girls tell us the club was their first experiment. Not known: how many club members keep science subjects in secondary school. Next step: follow one group of girls through their first year of secondary school.",
      "purpose": "We exist so that girls in Kisumu can choose science, and the futures it opens, with confidence."
     },
     "notice": "Notice the purpose says “choose science”, not “become scientists”: it promises only what the organisation can influence. Copy that restraint."
    },
    {
     "org": "social",
     "profile": {
      "need": "Young people aged 18–24 in San Juan de Lurigancho who left school early struggle to find formal, safe work. Informal jobs pay little, teach few skills and give no work history that employers trust.",
      "evidence": "Known: high youth informality in Lima; Diego’s years as a youth worker; what our trainees tell us about the jobs they had before. Not known: whether certified graduates still have formal work a year later. Next step: contact every graduate at 3 and 12 months.",
      "purpose": "We exist so that young people who left school early can build a skilled, formal working life."
     },
     "notice": "Notice that bread does not appear in the purpose. Copy how the purpose would stay true even if the business changed what it sells."
    },
    {
     "org": "coop",
     "profile": {
      "need": "Handloom weavers in our district, mostly women, earn little because middlemen take most of the price. Yarn costs keep rising, power-loom copies undercut handloom, and young people from weaving families are choosing other work.",
      "evidence": "Known: eleven years of members’ sales and payment records; the gap between what middlemen paid and what shops charge. Not known: how much more online buyers will pay for authentic handloom, and what would make young people stay. Next step: test prices on two collections and talk with members’ children.",
      "purpose": "We exist so that handloom weavers in our district earn a fair living from their craft."
     },
     "notice": "Notice how the cooperative uses records it already holds as evidence. Copy that before you plan new research: you may know more than you think."
    },
    {
     "org": "hybrid",
     "profile": {
      "need": "Households in Leeds throw away items that could be repaired, wasting money and resources. Repair skills and affordable repair are disappearing, which hits low-income households hardest. Many people who come to us also say they feel isolated.",
      "evidence": "Known: what people bring to our repair cafés and how many items we fix; council waste data. Not known: whether people repair again instead of buying new, and how many visitors are on low incomes. Next step: a short survey at repair cafés, repeated three months later.",
      "purpose": "We exist so that people in Leeds can repair, reuse and share instead of throwing away."
     },
     "notice": "Notice that “share” keeps the tool library inside the purpose. Copy the test: check that each of your activities fits inside the statement you wrote."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Understand",
  "id": "context",
  "title": "Context and landscape analysis",
  "sheet": "Context analysis",
  "learn": [
   "Context analysis looks outward at the conditions you will work in, and at the trends changing them: social, economic, political, legal, technological and environmental. It helps you see opportunities and constraints before you commit to a strategy.",
   "Map who is already active: public services, community groups, nonprofits, businesses, funders and networks. Note what they do, for whom and how well. A crowded field is not a reason to stop, but it is a reason to collaborate, specialise or choose a different gap.",
   "Use simple frameworks as prompts, not forms to fill. A PESTLE scan (political, economic, social, technological, legal, environmental) and a SWOT (strengths, weaknesses, opportunities, threats) are enough for most small organisations. Write each point as a specific observation with a source, and say what it means for you.",
   "Revisit your context at least once a year, and whenever something important changes, such as a new law, a funding shift or a crisis. The decisions in the rest of this module rest on it."
  ],
  "weak": "There is a lot of need and not much support.",
  "strong": "Imara Girls in Science: the new competency-based curriculum asks schools for practical science, but most of our partner schools have no lab (our school visits). Other STEM programmes work mainly in Nairobi, not Kisumu.",
  "why": "It names a real policy change, a specific gap with its source and the other actors, so each point can shape a decision.",
  "reflect": "Which actor already working on this issue could become a partner, and which could see you as competition?",
  "exercise": "Complete a short context scan and a list of the main actors in your landscape.",
  "fields": [
   {
    "key": "trends",
    "label": "Context scan",
    "hint": "One per line: factor (political, economic, social, technological, legal, environmental) | observation | source | implication for us."
   },
   {
    "key": "actors",
    "label": "Who is already active",
    "hint": "Organisation or service | what they do | for whom | gap or overlap with our idea."
   },
   {
    "key": "swot",
    "label": "Strengths, weaknesses, opportunities, threats",
    "hint": "Two or three specific points under each heading."
   }
  ],
  "check": "Is each observation specific, sourced and connected to an implication for your organisation?",
  "gallery": {
   "title": "Five example context scans",
   "intro": "Each organisation records specific, sourced observations, maps who else is active and sums up a short SWOT.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "trends": "Environmental | Mangroves cleared for shrimp ponds and building; flooding worse | Our coastal walks; village heads | Restore only where village heads agree to protect the land\nEnvironmental | Rainy season Nov–Mar; survival depends on species and tidal zone | Local nursery; past failed plantings | Plant in season, with the right species, and monitor survival\nEconomic | Shrimp ponds and tourism bring income | Village meetings | Pond owners may resist; avoid working ponds\nSocial | Village custom (adat) and village heads decide on land use | Village heads | Agree every site with them first\nPolitical | Provincial environment office runs occasional planting events | Office staff | A possible partner, not a competitor",
      "actors": "Provincial environment office | occasional planting events | general public | one-off events; possible partner\nLocal school | environmental lessons | pupils | interested in our sessions; little practical work on the coast\nDive operators | reef clean-ups | tourists | not youth or mangroves; possible funders\nLocal nursery | grows mangrove seedlings | sells to anyone | our supplier; can advise on species",
      "swot": "Strengths: co-founders from the area and trusted; Sari’s marine biology training.\nWeaknesses: not registered; no safeguarding policy; very small budget.\nOpportunities: supportive village heads; an interested school; dive operators as funders.\nThreats: pond owners clearing restored areas; seedlings dying at the wrong sites; tourism pressure."
     },
     "notice": "Notice that a group with no budget can build a scan from what it sees and hears locally. Copy how every observation ends in a practical implication."
    },
    {
     "org": "ngo",
     "profile": {
      "trends": "Political | Competency-based curriculum stresses practical learning | Curriculum guidance; head teachers | Our clubs match what schools must now deliver; offer teacher workshops\nSocial | Few labs and large classes in public schools | Our school visits | Bring kits to schools rather than relying on labs\nEconomic | Our funding comes mainly from two foundations | Our accounts | Diversify income so no funder exceeds 40%\nTechnological | More families have mobile phones | Parent sessions | Try SMS reminders to parents, within safeguarding rules\nSocial | Some families cannot afford secondary science costs | Parents; teachers | A risk to our results; track it",
      "actors": "County education office | oversees public schools | all pupils | supportive; could help spread hands-on methods\nOther STEM nonprofits | science and coding programmes | mixed groups, mostly in Nairobi | little overlap in Kisumu; possible partners\nUniversities | science degrees | students | a source of women mentors\nTutoring centres | exam coaching | families who can pay | different aim; we do not tutor",
      "swot": "Strengths: clubs running since 2019 in 14 schools; local women scientists as mentors; head teachers’ trust.\nWeaknesses: two funders give most income; little data beyond attendance.\nOpportunities: curriculum reform; supportive county office; local businesses sponsoring the camp.\nThreats: a funder leaving; schools cutting club time; secondary science costs for families."
     },
     "notice": "Notice how a national policy change becomes a local opportunity. Copy the way each trend leads to a specific decision rather than a general worry."
    },
    {
     "org": "social",
     "profile": {
      "trends": "Social | Most young people in Lima work informally | National statistics; trainees’ stories | Paid, contracted training is what makes us different\nEconomic | Flour prices rising | Supplier invoices | Margins shrink; review prices and waste\nEconomic | Offices and cafés want artisan bread | Our three office clients; new enquiries | Grow wholesale to help cover training\nLegal | Benefit company (BIC) law available | Our accountant | Could lock in our purpose; decide this year\nPolitical | Municipal youth employment programme | Municipality staff | Referral partner; possible funder",
      "actors": "Municipal youth programme | training and referrals | young people in the district | refers trainees to us\nSupermarkets | cheap bread | all households | we compete on quality, not price\nTraining institutes | baking courses | people who can pay fees | unpaid study; our trainees need to earn\nFood businesses | hire bakers | experienced adults | our employer partners hire graduates",
      "swot": "Strengths: customers return for quality; paid apprenticeship with a recognised certificate; Lucía’s pastry skills.\nWeaknesses: near break-even, no cash reserve; training paid from bread sales.\nOpportunities: office demand; BIC status; municipal referrals and funding.\nThreats: flour prices; supermarket competition; losing an office client."
     },
     "notice": "Notice how existing courses are named honestly as alternatives. Copy the explanation of why your people cannot use what already exists."
    },
    {
     "org": "coop",
     "profile": {
      "trends": "Economic | Middlemen take most of the price | Members’ sales records | Selling direct is our main lever\nTechnological | Online craft marketplaces growing | Our online shop sales | Grow direct online sales towards 40% of revenue\nLegal | Power-loom copies sold as handloom | Shops; online listings | Weaver names on every piece prove authenticity\nPolitical | Government handloom schemes | State cooperative department | Possible dye-unit grant; check the effect on control\nSocial | Young people prefer other work | Members’ families | Apprenticeships must offer a real income\nEnvironmental | Monsoon disrupts dyeing | Production records | A shared dye unit could protect output",
      "actors": "Middlemen traders | buy from weavers, sell to shops | individual weavers | the system we offer an alternative to\nOther handloom cooperatives | similar products | weavers elsewhere | none in our district sells online direct; possible partners\nOnline marketplaces | sell many makers’ crafts | urban and overseas buyers | our channel, but they also host copies\nState cooperative department | regulates and audits | all cooperatives | approves big changes; link to schemes",
      "swot": "Strengths: 140 members; eleven years of trust; open books; traceable weaver names.\nWeaknesses: little marketing; tight working capital; few young members.\nOpportunities: online marketplaces; handloom schemes; buyers seeking authentic craft.\nThreats: power-loom copies; rising yarn prices; young people leaving weaving."
     },
     "notice": "Notice that the actor list includes other cooperatives as possible partners, not only competitors. Copy the last column: say what each actor means for you."
    },
    {
     "org": "hybrid",
     "profile": {
      "trends": "Political | Council waste reduction targets | Leeds City Council waste strategy | Our diversion data supports council funding\nLegal | Right-to-repair rules | Government guidance | More spare parts; more public interest in repair\nEconomic | Cost-of-living pressures | Repair café conversations | More demand for free repair and cheap refurbished goods\nEconomic | Rising rents | Local property agents | Workshop and shop costs may rise\nSocial | Retired engineers keen to volunteer | Volunteer applications | Our main source of skills\nLegal | Electrical safety and insurance rules | Our insurer | Train every volunteer who repairs electrical items",
      "actors": "Commercial repairers | paid repairs | anyone who can pay | we refer paid work to them and do not compete\nCharity shops | sell donated goods | low-income shoppers | overlap with our shop; ours sells tested, refurbished items\nCouncil waste team | waste reduction | all residents | funder and partner\nCommunity centres | host local groups | residents | possible venues for pop-up repair cafés",
      "swot": "Strengths: skilled volunteers; the city’s only combined repair café, tool library and shop; trading income.\nWeaknesses: shop profits below target; trading figures unclear to trustees; safety training depends on one person.\nOpportunities: council targets; right to repair; cost-of-living demand.\nThreats: rising rent; cheap new goods; a safety incident."
     },
     "notice": "Notice that it decides how to relate to each actor, including who it will not compete with. Copy that: a list of actors is only useful once you know your stance."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Understand",
  "id": "stakeholders",
  "title": "Stakeholder mapping",
  "sheet": "Stakeholder map",
  "learn": [
   "Stakeholders are the people and organisations who affect, or are affected by, your work: the people you serve, communities, staff and volunteers, funders or customers, partners, regulators, local authorities, and anyone who could support or block what you do.",
   "Separate four roles that are often confused: who benefits, who pays, who decides and who influences. In a nonprofit the person who benefits rarely pays. In a social enterprise the paying customer may be an employer or a public body rather than the end user. Naming these roles early stops you designing for the wrong person.",
   "An influence–interest grid helps you decide how to engage each group. Involve closely those with high interest and high influence, consult those with high influence and low interest, keep informed those with high interest and low influence, and monitor the rest. Pay particular attention to people with high interest but little power: they are the easiest to overlook.",
   "You will come back to this map in your Theory of Change, when you ask whose behaviour has to change for your outcomes to happen."
  ],
  "weak": "Stakeholders: the community, donors and the government.",
  "strong": "Pan del Barrio: trainees (benefit, high interest, low influence: monthly meeting with Diego); office clients (pay, decide on contracts: consult each quarter); municipal youth programme (refers trainees, possible funder: consult each cohort).",
  "why": "It separates who benefits from who pays and decides, and says how each group will be engaged, which makes the map usable.",
  "reflect": "Who is affected by your work but has the least say in it?",
  "exercise": "Build a stakeholder map and decide how you will engage each priority group.",
  "fields": [
   {
    "key": "map",
    "label": "Stakeholder map",
    "hint": "Stakeholder | role (benefits / pays / decides / influences) | interest | influence | how we engage."
   },
   {
    "key": "overlooked",
    "label": "Who could be overlooked",
    "hint": "Which group has high interest but little influence, and how will you include them?"
   }
  ],
  "check": "Have you separated who benefits, who pays, who decides and who influences?",
  "anatomy": {
   "title": "Four roles, four questions",
   "intro": "One group can hold more than one role. The examples come from the five organisations.",
   "cols": [
    "Role",
    "Ask",
    "Example"
   ],
   "rows": [
    [
     "Benefits",
     "Whose life or environment should change?",
     "Pan del Barrio’s trainees; the girls in Imara’s clubs."
    ],
    [
     "Pays",
     "Whose money keeps the work going?",
     "Pan del Barrio’s office clients; Imara’s two foundation funders."
    ],
    [
     "Decides",
     "Who can say yes or no to what you do?",
     "The village heads who agree Tide Line’s restoration sites; Imara’s head teachers."
    ],
    [
     "Influences",
     "Who shapes results without a formal decision?",
     "Shrimp pond owners near Tide Line’s sites; Leeds City Council’s waste team."
    ],
    [
     "Several at once",
     "Does any group hold more than one role?",
     "Vanita’s member weavers benefit, own the cooperative and elect its committee."
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example stakeholder maps",
   "intro": "Each organisation separates who benefits, pays, decides and influences, and names the group most easily overlooked.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "map": "Young people aged 12–17 | benefit | high | low | youth team leaders help plan planting days\nParents | decide (consent) | high | high | involve: meet before the first planting day; consent forms\nVillage heads | decide on land use | medium | high | consult before choosing any site\nSchool principal | decides on school sessions | medium | medium | consult each term\nShrimp pond owners | influence (possible opposition) | high | high | involve early; avoid working ponds\nProvincial environment office | influences | low | medium | invite to planting days\nLocal donors and dive operators | pay (possible) | low | low | monitor; report survival rates",
      "overlooked": "The young people themselves. They care most about the coast but have no voice in village decisions. Our youth team will plan the planting days, and we will ask village heads to let two youth leaders report at the village meeting each season."
     },
     "notice": "Notice that parents appear as people who decide, because young people need their consent. Copy the habit of asking who can say no, not only who benefits."
    },
    {
     "org": "ngo",
     "profile": {
      "map": "Girls aged 10–14 | benefit | high | low | girls’ advisory group meets each term\nParents and guardians | decide (consent, subject choice) | high | medium | termly parent sessions\nHead teachers | decide on access | medium | high | consult each term; written agreement\nCounty education office | influences | medium | high | consult termly\nTwo foundation funders | pay, decide on grants | medium | high | report quarterly; invite to annual review\nVolunteer mentors | deliver | high | medium | involve: training and feedback each term\nLocal businesses | pay (camp) | low | low | thank and report after the camp",
      "overlooked": "Girls who stop coming to the clubs. Our advisory group hears from girls who attend, not from those who leave, often because of chores or distance. With a parent’s consent, coordinators will speak with two leavers per club each term and share what they hear."
     },
     "notice": "Notice the overlooked group is inside the programme: girls who left. Copy the idea that people you already serve can still go unheard."
    },
    {
     "org": "social",
     "profile": {
      "map": "Trainees aged 18–24 | benefit | high | low | monthly meeting with Diego\nOffice clients | pay, decide on contracts | medium | high | consult each quarter on quality and orders\nCafé and bread customers | pay | low | medium | monitor sales and comments\nFood-sector employers | decide on hiring graduates | high | high | involve in shaping the certificate assessment\nMunicipal youth programme | refers trainees, possible funder | medium | high | consult each cohort\nTrainees’ families | influence | high | medium | invite to the certificate day\nFlour supplier | influences costs | low | medium | monitor; review prices twice a year",
      "overlooked": "Trainees who leave before the six months end. They know best whether the wage and hours are workable, but they leave without being asked. Diego will hold a short exit conversation with everyone who leaves early."
     },
     "notice": "Notice how clearly the trainees who benefit are separated from the clients who pay. Copy that separation if your income comes from someone other than the people you serve."
    },
    {
     "org": "coop",
     "profile": {
      "map": "Member weavers | benefit, own and govern | high | high | general meeting; elect the committee\nElected committee | decides | high | high | monthly meeting; approves budgets and rules\nRetail shops | pay | medium | medium | visit twice a year; show new collections\nOnline buyers | pay | low | medium | weaver stories on listings; monitor reviews\nState cooperative department | regulates, audits | low | high | consult; annual audit and returns\nGovernment handloom schemes | possible funder | low | high | consult before applying\nYoung people in weaving families | future members | medium | low | keep informed: apprentice open day",
      "overlooked": "Members who weave at home around care duties. On paper they have a vote; in practice they miss meetings. Meera will visit them before each general meeting to collect their questions, and the committee will hold one meeting a year at a time more of them can attend."
     },
     "notice": "Notice that members benefit, own and govern at once. Copy the check on whether formal power, such as a vote, is real power in practice."
    },
    {
     "org": "hybrid",
     "profile": {
      "map": "Repair café visitors | benefit | high | low | feedback cards at every café\nVolunteers | deliver | high | medium | involve: termly volunteer meeting\nTrustees | decide, accountable | high | high | quarterly board meeting with clear trading reports\nLeeds City Council waste team | pays, influences | medium | high | consult; share diversion data quarterly\nGrant funders | pay | medium | high | report as agreed\nSchools | decide on workshops | medium | medium | consult each term\nShop customers | pay | medium | low | monitor sales and reviews",
      "overlooked": "Low-income households who never come to a repair café. They have the most to gain, but many do not know we exist or cannot get to us. We will run a quarterly pop-up repair café at a community centre and ask people there what would help."
     },
     "notice": "Notice that the people it most wants to reach are not yet visitors. Copy the plan to go where they already are instead of waiting for them to arrive."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "vision",
  "title": "Vision",
  "sheet": "Vision",
  "learn": [
   "A vision describes the future you want to help create. It is about conditions outside your organisation: what will be different for people, communities or the environment if things go well?",
   "Vision sits between purpose and mission. Purpose says why you exist, vision says what future you are working towards, and mission says what you do now to help get there.",
   "A vision is not a list of services, a revenue target or a claim that you alone will change society. Many organisations and communities contribute to the same future. Be ambitious, and honest about your part.",
   "Start with the people or place you serve, imagine an important barrier removed and describe the result in everyday words. Then read it to someone affected by the issue and ask what they picture. If their answer is vague, replace abstract words with a concrete condition, and keep the sentence short enough to remember."
  ],
  "weak": "We want to help communities.",
  "strong": "Imara Girls in Science: “A Kisumu where girls who love science have the skills, support and role models to follow it.”",
  "why": "It names a place, the people and the conditions that would be different, without mentioning Imara’s own clubs or camps.",
  "reflect": "If your activities succeeded, what would people be able to do that they cannot do now?",
  "exercise": "Describe the future first, then reduce it to one memorable sentence. Test that sentence with someone affected by the issue.",
  "fields": [
   {
    "key": "future",
    "label": "What would change?",
    "hint": "Describe conditions for people or the environment, rather than your organisation’s growth."
   },
   {
    "key": "vision",
    "label": "Our vision",
    "hint": "A future where…"
   },
   {
    "key": "visionTest",
    "label": "Feedback to seek",
    "hint": "Who will check whether this future reflects their priorities?"
   }
  ],
  "check": "Does your vision describe a desired future rather than your current services?",
  "anatomy": {
   "title": "Purpose, vision and mission",
   "intro": "Three statements that answer different questions, shown for Riverside Repair Hub.",
   "cols": [
    "Statement",
    "The question it answers",
    "Riverside Repair Hub"
   ],
   "rows": [
    [
     "Purpose",
     "Why do we exist?",
     "So that people in Leeds can repair, reuse and share instead of throwing away."
    ],
    [
     "Vision",
     "What future are we working towards?",
     "A Leeds where repairing and sharing are normal, affordable and open to everyone."
    ],
    [
     "Mission",
     "What do we do now, for whom and how?",
     "Repair cafés, school workshops, a tool library and a refurbished goods shop for Leeds residents."
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example visions",
   "intro": "How each organisation described the future first, then reduced it to one sentence and planned who would test it.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "future": "Mangroves grow back along the coast of both villages and protect homes and ponds from erosion and flooding. Young people know their coast, care for it and are listened to when the village decides how land is used. Restored areas are protected by village rules, not only by our planting days.",
      "vision": "Healthy mangrove coasts cared for by the young people who live beside them.",
      "visionTest": "Young people at our first planting day and the school group; parents; the village heads of both villages. We also want to hear from a shrimp pond owner, who may see this future differently."
     },
     "notice": "Notice that the future includes something the group cannot control alone (village rules), which keeps the vision honest about its part."
    },
    {
     "org": "ngo",
     "profile": {
      "future": "Girls in Kisumu public schools do hands-on science, believe they are good at it and keep science subjects in secondary school. Parents and teachers back girls who want to follow science. Girls can name local women who work in science, and more of them go on to study it.",
      "vision": "A Kisumu where girls who love science have the skills, support and role models to follow it.",
      "visionTest": "Our girls’ advisory group first, then parents at the termly sessions, two head teachers and the county education office. We will ask the girls whether “follow science” matches what they hope for."
     },
     "notice": "Copy how the sentence keeps three concrete conditions (skills, support, role models) taken straight from the longer description of the future."
    },
    {
     "org": "social",
     "profile": {
      "future": "Young people in San Juan de Lurigancho who left school early can still gain a recognised skill, a formal contract and a safe workplace. Employers judge them on what they can do, not on a missing school certificate. Informal, low-paid work is no longer the only option.",
      "vision": "Neighbourhoods where leaving school early does not close the door to good work.",
      "visionTest": "Current trainees and two graduates, three employer partners and the municipality youth employment team. We will ask employers whether “good work” means the same to them as to the young people."
     },
     "notice": "See how a business can hold a vision about its neighbourhood, not about sales or the bakery’s growth."
    },
    {
     "org": "coop",
     "profile": {
      "future": "Handloom weavers in our district earn a fair, steady living and are paid on time. Buyers value real handloom over power-loom copies. Young people from weaving families see weaving as a good choice and learn it, so the craft carries on.",
      "vision": "A living handloom tradition in our district that pays weavers fairly and attracts young people.",
      "visionTest": "The elected committee first, then all members at the general body meeting. We will also ask young people from weaving families, who are not members yet, and two shops that sell our saris."
     },
     "notice": "Notice who tests it: in a member-owned organisation the members themselves approve the vision, and future members are asked too."
    },
    {
     "org": "hybrid",
     "profile": {
      "future": "People across Leeds, including low-income households, can get things fixed cheaply or learn to fix them, borrow tools instead of buying them and find good second-hand goods. Throwing away something repairable feels unusual. Less goes to landfill and households spend less.",
      "vision": "A Leeds where repairing and sharing are normal, affordable and open to everyone.",
      "visionTest": "Repair café visitors (a short question at the welcome table), volunteers, two partner schools and the council waste team. We especially want views from people on low incomes who have not used us yet."
     },
     "notice": "Copy the plan to hear from people who are not using the service yet, not only from those already happy with it."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "mission",
  "title": "Mission",
  "sheet": "Mission",
  "learn": [
   "A mission says what your organisation does now, for whom and how. It turns your purpose into a practical scope that staff, partners, customers and supporters can use. Vision is the future you want; mission is the work you do towards it.",
   "A useful starting structure is: “We help [people] achieve [change] through [approach].” Adapt it so it sounds natural. Name your main approach without listing every activity, and include a place when it really limits your scope.",
   "Common mistakes are trying to serve everyone, claiming to solve the whole problem and using jargon that hides the actual work. Do not describe a planned capability as a fact. If your approach is untested, say it is a proposal and how you will test it.",
   "Use the mission as a decision filter. Riverside Repair Hub, one of the examples below, does not sell new goods even when it could make money, because that would work against repair and reuse. A clear mission makes choices like this easy to explain."
  ],
  "weak": "We provide innovative solutions for everyone in need.",
  "strong": "Riverside Repair Hub: “We help Leeds residents keep things in use and learn repair skills through free repair cafés, school workshops, a tool library and a shop selling refurbished goods.”",
  "why": "It names who benefits, the change and the approach, so a reader can tell at once which projects fit and which do not.",
  "reflect": "Which attractive opportunity would fall outside your mission?",
  "exercise": "Draft one sentence. Underline who you serve, what changes and your approach. If one is missing, revise the sentence.",
  "fields": [
   {
    "key": "people",
    "label": "Who we serve",
    "hint": "Be specific about the people, organisations or ecosystems."
   },
   {
    "key": "approach",
    "label": "Our main approach",
    "hint": "What do you actually do, or propose to test?"
   },
   {
    "key": "mission",
    "label": "Our mission",
    "hint": "We help… through…"
   },
   {
    "key": "boundaries",
    "label": "What we will not take on",
    "hint": "Name one boundary that keeps your work focused."
   }
  ],
  "check": "Can a new team member explain your work after reading this once?",
  "anatomy": {
   "title": "The parts of a mission sentence",
   "intro": "Check your draft for each part, shown here for Imara Girls in Science.",
   "cols": [
    "Part",
    "Question",
    "Imara Girls in Science"
   ],
   "rows": [
    [
     "Who you serve",
     "Who exactly benefits?",
     "Girls aged 10 to 14"
    ],
    [
     "Where",
     "Does a place limit your scope?",
     "Public schools in Kisumu"
    ],
    [
     "The change",
     "What will be different for them?",
     "Science confidence and skills"
    ],
    [
     "Your approach",
     "How do you mainly do it?",
     "Weekly hands-on clubs, holiday camps and mentoring by women in science"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example mission statements",
   "intro": "How each organisation named who it serves, its main approach, its mission and one boundary.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "people": "Young people aged 12 to 17 in two coastal villages in North Bali, and through them the mangrove coast the villages depend on.",
      "approach": "Monthly planting days and survival monitoring led by youth team leaders, plus school sessions. Still to test: which species and sites survive best. We will start small and count survival before planting more.",
      "mission": "We help young people in two North Bali villages restore mangroves and learn about their coast through monthly planting days and school sessions.",
      "boundaries": "We will not run tourist “plant-a-tree” experiences for now, even if they could bring in money."
     },
     "notice": "Notice how an untested approach is labelled as something to test, with a plan to check survival before growing."
    },
    {
     "org": "ngo",
     "profile": {
      "people": "Girls aged 10 to 14 in 14 public schools across two sub-counties of Kisumu County. Parents and teachers matter too, but girls come first.",
      "approach": "Weekly hands-on science clubs in schools, a holiday science camp and mentoring by local women working in science.",
      "mission": "We help girls aged 10 to 14 in Kisumu public schools build science confidence and skills through weekly hands-on clubs, holiday camps and mentoring by women in science.",
      "boundaries": "No general tutoring or exam coaching, even when schools ask for it before exams."
     },
     "notice": "Copy the precise age range and setting: it tells partners exactly who is in scope and who is not."
    },
    {
     "org": "social",
     "profile": {
      "people": "Young people aged 18 to 24 in San Juan de Lurigancho, Lima, who left school early and are in informal work or none.",
      "approach": "A paid six-month apprenticeship inside our bakery and café, leading to a recognised baking certificate and job-matching with employer partners. Bread sales pay for most of it.",
      "mission": "We train and employ young people aged 18 to 24 who left school early, through a paid six-month bakery apprenticeship and a business that sells good bread.",
      "boundaries": "No trainees under 18 and no unpaid internships, even if they would cut our costs."
     },
     "notice": "See how the business itself is part of the approach: selling good bread is named in the mission, not hidden."
    },
    {
     "org": "coop",
     "profile": {
      "people": "Our 140 member weavers, most of them women, in our district of Kerala.",
      "approach": "Buying yarn together, quality checks and design workshops, and selling direct to shops and through an online shop instead of through middlemen.",
      "mission": "We help our member weavers earn more and more reliably by buying yarn together, improving quality and design, and selling direct to shops and online buyers.",
      "boundaries": "We will not sell power-loom products or accept orders below a fair piece rate, even large ones."
     },
     "notice": "Notice the change is stated as something members can check: earning more, and more reliably."
    },
    {
     "org": "hybrid",
     "profile": {
      "people": "Leeds residents, especially low-income households, and young people in our partner schools.",
      "approach": "Free weekly repair cafés run by skilled volunteers, school repair workshops, a tool library, and a shop selling refurbished goods whose profits fund the charity.",
      "mission": "We help Leeds residents keep things in use and learn repair skills through free repair cafés, school workshops, a tool library and a shop selling refurbished goods.",
      "boundaries": "We will not sell new goods or do paid commercial repairs that compete with local repairers."
     },
     "notice": "Copy a boundary that protects relationships: avoiding competition with local repairers keeps them as allies."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "values",
  "title": "Values in practice",
  "sheet": "Values",
  "learn": [
   "Values are the principles that guide what you do when decisions are hard. A single word such as integrity or inclusion is only a starting point. Describe what people actually do, and how you would notice whether it happens.",
   "Choose a small set you can practise consistently; three to five is a useful range. Involve the people who are expected to live by them, and do not adopt a value just because other organisations display it.",
   "For each value, write a behaviour, something you avoid and a way to check. Inclusion might mean budgeting for accessible participation and checking who is missing from a consultation. That takes time and money, not only welcoming words.",
   "Values can pull against each other. Openness does not mean publishing private information about participants. Agree how you will handle trade-offs and who can raise a concern safely. Your values will come back when you write your code of conduct."
  ],
  "weak": "Our values are excellence, integrity and impact.",
  "strong": "Vanita Weavers Cooperative Society, “Open books”: any member can see the accounts; we keep no side deals or unrecorded cash; the accounts are read out and questions answered at every general body meeting.",
  "why": "It turns a word into a behaviour members can see and a check they can make themselves.",
  "reflect": "What principle would you protect even if it cost time or revenue?",
  "exercise": "Create three to five entries using: value → behaviour → boundary → evidence. Include one difficult decision to test them against.",
  "fields": [
   {
    "key": "values",
    "label": "Our values in practice",
    "hint": "One per line: value | behaviour | what we avoid | how we check."
   },
   {
    "key": "tradeoff",
    "label": "A difficult decision",
    "hint": "Which values could conflict, and how would you decide?"
   }
  ],
  "check": "Could another person observe whether you are practising each value?",
  "gallery": {
   "title": "Five examples of values in practice",
   "intro": "How each organisation turned its values into behaviours, limits and checks, and tested them against a hard decision.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "values": "Led by young people | Youth team leaders choose planting dates and help pick sites with village heads | Adults deciding alone, or using young people only for photos | Meeting notes record who made each decision\nRespect for village custom (adat) and leaders | We ask village heads before any planting and respect local ceremonies and rest days | Planting on land without permission | Every site has a written agreement with the village head\nHonest about results | We report how many seedlings survive, not only how many we planted | Presenting planting numbers as success | Survival count twice a year, shared with village heads and donors",
      "tradeoff": "Led by young people and respect for village custom could clash if young people want a site the village heads have not agreed. For now the heads decide, and we help the young people present their case at the next village meeting."
     },
     "notice": "Notice that three values are enough at idea stage, and each check is something two co-founders can actually do."
    },
    {
     "org": "ngo",
     "profile": {
      "values": "Girls first | Every mentor is safeguarding-checked; the girls’ advisory group reviews club plans | Any activity that puts girls at risk | Mentor checks before starting; advisory group notes\nLearn by doing | Every session includes a hands-on experiment | Clubs becoming exam drills | Two observed sessions per school each term\nPartnership with schools and parents | Club times agreed with head teachers; termly parent sessions | Changing plans without the head teacher | Termly meeting log; parent attendance\nAccountable | We report results honestly, including what did not work | Leaving weak results out | A “what did not work” section in the annual report",
      "tradeoff": "Accountable and partnership could clash if a school’s results are poor because clubs were often cancelled. We will share the figures with the head teacher first and agree changes, then report them to funders without naming the school publicly."
     },
     "notice": "Copy how “Girls first” is backed by two concrete practices, safeguarding checks and the girls’ advisory group, rather than a slogan."
    },
    {
     "org": "social",
     "profile": {
      "values": "Real jobs, real pay | Every trainee has a contract and is paid from day one | Unpaid trials | Monthly payroll check\nQuality bread, every day | Fixed recipes and a tasting before opening | Selling yesterday’s bread as fresh | Daily quality checklist; complaints log\nSecond chances with clear expectations | Clear rules from week one; a warning and a conversation before any dismissal | Dropping a trainee without explanation | Diego’s weekly mentoring notes\nPay our way | Bread is priced to cover costs; cash tracked weekly | Using grants to cover bakery losses | Weekly cash report; monthly break-even review",
      "tradeoff": "Second chances and quality could clash when a trainee keeps making mistakes during a big office order. We move them to a supervised task for that order and agree an improvement plan with Diego. If problems continue, we follow the warning process."
     },
     "notice": "See how a commercial value (pay our way) sits alongside social ones, each with its own check."
    },
    {
     "org": "coop",
     "profile": {
      "values": "Members decide | Decisions on prices, new funding and products go to the committee or general body | Staff setting policy alone | Minutes shared with members\nFair and on-time payment | Weavers are paid within 15 days of a piece being accepted | Delaying payments to cover cash shortages | Monthly payment report to the committee\nQuality we are proud of | Every piece checked before sale, with feedback to the weaver | Selling flawed pieces as first quality | Quality log; shop returns\nOpen books | Any member can see the accounts; they are read out at the general body meeting | Unrecorded cash or side deals | Yearly state audit; members’ questions answered",
      "tradeoff": "On-time payment and quality could clash when a large order includes pieces below standard. We pay on time for every piece that passes the check and support weavers to redo the rest. Only the committee can approve exceptions."
     },
     "notice": "Notice how the checks use records members already receive, so anyone can see whether a value is being kept."
    },
    {
     "org": "hybrid",
     "profile": {
      "values": "Fix first | We try to repair before recycling or replacing | Advising people to buy new when repair is possible | Repair log: share of items fixed\nEveryone can learn | Volunteers explain each step and invite visitors to try | Fixing items while owners just wait | Visitor question: “Did you learn something?”\nWelcoming and safe | Electrical items are PAT tested before they leave; step-free access | Handing back untested electrical items | Testing records; incident log reviewed by trustees\nEvery pound to the mission | Trading company profits go to the charity each year | Shop profits spent outside the mission | Accounts show the transfer; trustees review it",
      "tradeoff": "Fix first and safety could clash when someone brings an old heater we could repair but cannot make safe. Safety wins: we explain why and suggest a safe recycling route."
     },
     "notice": "Copy the clear rule for the trade-off: when two values conflict, say in advance which one wins and why."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "form",
  "title": "Organisational form and identity",
  "sheet": "Organisational form",
  "learn": [
   "Your organisational form is the legal and economic vehicle for your mission. The main families are informal groups, nonprofits (associations, charities, nonprofit companies), foundations, companies with a social purpose, cooperatives owned by their members, and hybrids that combine a nonprofit with a trading company.",
   "Each form answers four questions differently: who controls it, what happens to any surplus, how it can raise money and what it must report. Names and rules differ by country, so treat the table below as a general guide.",
   "Choose the form that fits how your work will be resourced and governed, not the one that sounds most credible. If most income will come from sales, a company or social enterprise may fit. If you rely on grants and donations, a nonprofit may fit. Many groups start informally and formalise later.",
   "Confirm your options with qualified local advice before you register or change form. Later modules cover governance and registration for the form you choose."
  ],
  "weak": "We will register as an NGO because funders like NGOs.",
  "strong": "Pan del Barrio S.A.C.: most of our income comes from selling bread, so a company fits. We are considering BIC status to lock in our social purpose, and may add a partner nonprofit later for training grants. We will check both with a local lawyer.",
  "why": "It reasons from where the money comes from and how the purpose will be protected, and names what still needs advice.",
  "reflect": "Where will most of your resources come from in three years, and does your intended form allow that?",
  "exercise": "Compare the forms you are considering against control, surplus, funding and reporting, then state your current preference.",
  "fields": [
   {
    "key": "options",
    "label": "Forms considered",
    "hint": "Form | who controls | what happens to surplus | funding it allows | reporting duties."
   },
   {
    "key": "choice",
    "label": "Current preference and reasons",
    "hint": "Which form fits best now, and what would make you change it?"
   },
   {
    "key": "advice",
    "label": "Questions for qualified advice",
    "hint": "What must you confirm locally before registering or changing form?"
   }
  ],
  "check": "Does your preference follow from how the work will be resourced and governed?",
  "anatomy": {
   "title": "The main organisational forms",
   "intro": "A general picture only: names, rules and tax treatment differ by country.",
   "cols": [
    "Form",
    "Control and surplus",
    "Typical funding"
   ],
   "rows": [
    [
     "Informal group",
     "Members agree among themselves; no separate legal entity, so members may be personally liable",
     "Members’ own money and small donations; grants and bank accounts are harder"
    ],
    [
     "Nonprofit (association, charity, nonprofit company)",
     "Members or a board; surplus stays in the organisation, never paid to owners",
     "Grants, donations, fees for services, some sales"
    ],
    [
     "Foundation",
     "A board manages assets for a set purpose; often no members; surplus stays in",
     "A founding gift or endowment, grants, donations"
    ],
    [
     "Company with a social purpose",
     "Shareholders; profits can be paid out unless bylaws or a special status limit it",
     "Sales, loans, investment; rarely charitable grants"
    ],
    [
     "Cooperative",
     "Members, usually one member one vote; surplus can be shared among members",
     "Member shares, sales, loans; some public schemes"
    ],
    [
     "Hybrid (nonprofit plus trading company)",
     "The nonprofit owns the company; company profits pass to the nonprofit",
     "Grants and donations to the nonprofit; sales through the company"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example form choices",
   "intro": "How each organisation compared its options and stated a current preference, with the questions it still needs to check locally.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "options": "Association (perkumpulan) | members, through a general meeting that elects the board | stays in the organisation, not shared out | member fees, donations, small grants | to confirm: yearly report to members and registration duties\nFoundation (yayasan) | a founders’ body appoints the board; no members | stays in the foundation | donations, grants, holding assets or land agreements | to confirm: yearly report, more if donations grow\nStay informal for now | the two co-founders, by agreement with volunteers | none expected | small local donations only; hard to open a bank account | nothing formal; we report to donors and village heads ourselves",
      "choice": "Association, because young people and volunteers should have a real voice as members. We would reconsider a foundation if advice shows an association cannot hold land agreements or larger donations well. Until we register, we keep simple records and report openly.",
      "advice": "Can people under 18 be members, or only adults? Can an association sign site agreements with village heads? What are the yearly reporting duties and costs of each form? Which safeguarding and data rules apply to our work with children?"
     },
     "notice": "Notice that “to confirm” appears in the table itself: an honest comparison at idea stage still has gaps, and says so."
    },
    {
     "org": "ngo",
     "profile": {
      "options": "Registered nonprofit (current) | a board of 7; the director reports to it | reinvested in the programme, never paid to individuals | foundation grants, donations, business sponsorship | annual returns and audited accounts to the regulator; reports to funders\nNonprofit plus a trading arm for paid STEM kits | the nonprofit would own the trading company | company profits passed to the nonprofit | kit sales to schools and parents, alongside grants | separate company accounts and tax returns; more board time",
      "choice": "Stay a registered nonprofit for now. Most income is grants and donations, and demand for paid kits is not proven. We would revisit a trading arm if schools show steady demand and the board can oversee a second entity.",
      "advice": "Can we sell a small number of kits inside the nonprofit without a separate company? What tax would apply to kit sales? What would a trading company cost to set up and run each year?"
     },
     "notice": "Copy the condition for changing course: the trading arm comes back on the table only when demand is proven."
    },
    {
     "org": "social",
     "profile": {
      "options": "S.A.C. company (current) | shareholders (the founders) and the manager | can be paid to shareholders; the social purpose is in our bylaws | sales, bank loans, investors | company books and tax returns\nS.A.C. with BIC status | the same shareholders, with the social purpose formally protected | can still be shared, but the purpose must be pursued alongside profit | as now; may reassure clients and investors | a yearly report on social and environmental results (to confirm)\nPartner nonprofit for training | its own members and board | stays in the nonprofit | grants and donations for training places | separate accounts and tax filings; reports to funders",
      "choice": "Stay an S.A.C., because most income comes from bread sales. We lean towards BIC status to lock in the purpose. A partner nonprofit only makes sense if training grants become a large share of costs.",
      "advice": "What does BIC status require each year, and what does it cost? Can a partner nonprofit fund training inside a company without a conflict of interest? How would trainee wages be treated under a grant?"
     },
     "notice": "See how one organisation can keep its form and still add layers, a legal status or a partner entity, as needs change."
    },
    {
     "org": "coop",
     "profile": {
      "options": "Cooperative society (current) | members, one member one vote; they elect a committee of nine | shared with members as a bonus after reserves | member shares, sales, loans, some government handloom schemes | yearly audit by the state cooperative department; general body meeting\nCooperative taking a government scheme grant for the dye unit | members, but the grant may add conditions or oversight | as now, but the grant may limit how dye-unit income is used | grant plus our own contribution | extra reports and inspections for the grant",
      "choice": "Stay a cooperative society: it matches “Members decide”, and members expect to share the surplus. We will accept a dye-unit grant only if members keep control of prices and decisions.",
      "advice": "Would a scheme grant give government officials a say in our committee or prices? Can grant-funded equipment be used for non-members’ yarn? How would grant income affect the members’ bonus?"
     },
     "notice": "Notice how the second option is the same form with new money: the real question is whether funding changes who controls it."
    },
    {
     "org": "hybrid",
     "profile": {
      "options": "Charity (CIO) for the community work | volunteer trustees | stays in the charity for its purposes | grants, donations, council funding | annual report and accounts to the Charity Commission\nTrading company owned by the charity, for the shop | the charity, as sole shareholder, appoints the directors | profits passed to the charity each year | shop sales | accounts to Companies House and a company tax return\nShop run inside the charity | trustees | stays in the charity | shop sales mixed with grants | one set of accounts, but trading risk sits with the charity",
      "choice": "Keep both entities. The charity holds grants and the community work; the trading company keeps shop risk and tax separate and passes its profits to the charity. We would review this if running two entities cost more than it protects.",
      "advice": "Is the yearly transfer of profits from the company to the charity set up correctly? How should staff time shared between the two be charged? Do we need separate insurance for electrical items sold in the shop?"
     },
     "notice": "Copy the reason for two entities: separating trading risk from charitable assets, not making the structure look bigger."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "positioning",
  "title": "Positioning and comparative advantage",
  "sheet": "Positioning",
  "learn": [
   "Positioning is the specific place your organisation takes in its landscape: the need you focus on, the people you serve, your approach and why you are well placed to do it. It answers one question: why you, rather than someone else, or no one?",
   "Your comparative advantage might be trust in a community, specialist skills, lived experience, lower costs, a distinctive method, relationships or access to a channel others cannot reach. Be honest. “Passion” and “innovation” only count if you can show what they produce.",
   "Positioning is also about choices. Decide what you will not do, which groups you will not prioritise for now and what you will refer to others. Saying no protects quality and makes partnership easier, because others can see where you fit.",
   "This is strategic positioning: where you add value that others do not. How you express that position in words and images comes later, in Module 7."
  ],
  "weak": "We are unique because we care more than other organisations.",
  "strong": "Imara Girls in Science: the only girls-only, club-based science programme in Kisumu public schools, with mentors who are local women scientists. We do not run general tutoring or exam coaching.",
  "why": "It names an advantage others can check, a clear focus and the work it turns down.",
  "reflect": "If your organisation closed tomorrow, what would be lost that no one else provides?",
  "exercise": "Write your positioning statement and list the choices it implies.",
  "fields": [
   {
    "key": "advantage",
    "label": "Our comparative advantage",
    "hint": "What do you bring that others do not, and what evidence shows it?"
   },
   {
    "key": "position",
    "label": "Positioning statement",
    "hint": "For [people] who [need], we [approach], unlike [alternatives], because [advantage]."
   },
   {
    "key": "choices",
    "label": "What we will not do",
    "hint": "Work, groups or opportunities you will decline or refer for now."
   }
  ],
  "check": "Is your advantage something you can show, rather than an aspiration?",
  "gallery": {
   "title": "Five example positioning statements",
   "intro": "How each organisation names its advantage, its place and the work it turns down.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "advantage": "Wayan and Sari grew up in these villages, families know them and the village heads support the idea. Sari’s marine biology training helps us choose the right species and tidal zone. No one runs youth-led restoration here; the provincial office holds occasional one-off planting events. Still to show: that our seedlings survive.",
      "position": "For young people in two North Bali villages who want to protect their eroding coast, we run youth-led mangrove planting, monitoring and school sessions, unlike occasional one-off planting events, because we are from these villages and we return to the same sites to check survival.",
      "choices": "No tourist “plant-a-tree” experiences for now.\nNo new villages until we know our survival rates.\nNo planting on land without a village head’s agreement."
     },
     "notice": "Notice the honest gap: the advantage is real (local trust, the right species), but survival rates are still to be shown, and the statement says so."
    },
    {
     "org": "ngo",
     "profile": {
      "advantage": "The only girls-only, club-based science programme in Kisumu public schools. Our 25 volunteer mentors are local women working in science. We have run weekly clubs since 2019 and head teachers in 14 schools trust us. Other STEM organisations mostly work in Nairobi.",
      "position": "For girls aged 10 to 14 in Kisumu public schools who get little hands-on science, we run weekly science clubs, holiday camps and mentoring, unlike tutoring or one-off STEM events, because our mentors are local women scientists who show girls a science future close to home.",
      "choices": "No general tutoring or exam coaching.\nNo mixed or boys’ clubs for now; we share club materials with schools that ask.\nNo paid STEM kits business for now.\nNo new sub-counties until partner schools can sustain clubs (ESO2)."
     },
     "notice": "Notice the comparison with what already exists: other STEM groups mostly work in Nairobi, so the gap in Kisumu is specific and checkable."
    },
    {
     "org": "social",
     "profile": {
      "advantage": "The only bakery in San Juan de Lurigancho that combines a paid apprenticeship with a recognised baking certificate. Our bread sells on quality: three offices buy it wholesale. Lucía is a trained pastry chef; Diego has years of experience as a youth worker.",
      "position": "For young people aged 18 to 24 who left school early, we offer a paid six-month bakery apprenticeship with a recognised certificate, unlike unpaid internships or short courses, because trainees learn inside a real business that competes on quality, not pity.",
      "choices": "No trainees under 18.\nNo unpaid internships.\nNo selling on sympathy: customers buy because the bread is good.\nYoung people not yet ready for a six-month contract are referred to the municipal youth programme."
     },
     "notice": "Notice how the advantage is built into the business: good bread lets Pan del Barrio compete on product, and the choices protect trainees."
    },
    {
     "org": "coop",
     "profile": {
      "advantage": "The only member-owned weavers’ group in our district selling online direct. 140 members have woven together for 11 years, every piece carries the name of the weaver who made it, and buying yarn together costs less than buying alone.",
      "position": "For handloom weavers in our district who lose most of the price to middlemen, we offer shared yarn buying, quality support and direct sales to shops and online buyers, unlike traders, because the weavers own and govern the cooperative and buyers can trace each piece to its maker.",
      "choices": "No power-loom products, even when buyers ask.\nNo orders below a fair piece rate.\nNo funding that weakens members’ control (to check before accepting a dye-unit grant)."
     },
     "notice": "Notice that the advantage comes from ownership: weavers govern the cooperative, and traceable names make that visible to buyers."
    },
    {
     "org": "hybrid",
     "profile": {
      "advantage": "The only combined repair café, tool library and refurbished goods shop in Leeds. 40 volunteers, many with trade skills (several are retired engineers), electrical safety testing in place, and a shop whose profits fund the charity.",
      "position": "For Leeds residents, especially low-income households, who throw away things that could be fixed, we offer free repair cafés, a tool library, school workshops and refurbished goods, unlike cheap new goods or paid repair, because skilled volunteers fix items with people, not just for them.",
      "choices": "No new goods in the shop.\nNo paid commercial repairs that compete with local repairers; we refer bigger jobs to them.\nNo electrical items returned or sold without a safety test."
     },
     "notice": "Notice the referral boundary: by refusing paid commercial repairs, Riverside protects local repairers and makes partnership with them easier."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "strategic-objectives"
  ],
  "video": null,
  "stage": "Design",
  "id": "objectives",
  "title": "Strategic objectives: external and internal",
  "sheet": [
   "External objectives",
   "Internal objectives"
  ],
  "learn": [
   "Strategic objectives are the few most important results you will work towards over a planning period, often three to five years. They turn your mission into priorities. Activities describe the work you do; objectives describe the result that work should produce.",
   "Separate two kinds. External strategic objectives (ESO) describe the change you want for the people, communities, customers or environment you serve. Internal strategic objectives (ISO) describe the capabilities you need to deliver that change: governance, people, systems, finance, brand and partnerships. Keeping them apart stops internal work crowding out your mission, and stops capacity being forgotten.",
   "Keep the set small: two to four external and three to five internal objectives is a manageable start. Give each a code, such as ESO1 or ISO1, so plans, budgets, indicators and risks can refer to it. For each, describe in plain words what success looks like at the end of the period and name one owner. Do not invent numbers you cannot yet support; indicators come in Module 6.",
   "Check each objective against your time, money and assumptions, and write down what you will postpone to make room. An objective without resources is a wish."
  ],
  "weak": "Raise awareness and grow quickly.",
  "strong": "Riverside Repair Hub. ESO1: More Leeds residents, especially low-income households, repair and reuse items instead of discarding them. ISO3: Volunteers trained and working safely, including electrical safety.",
  "why": "It separates the change for residents from the internal capability that makes it safe to deliver, and each can later carry indicators, a budget and risks.",
  "reflect": "Which internal capability, if missing, would most limit your external objectives?",
  "exercise": "Draft your external and internal objectives with codes, a picture of success and an owner. Record what you will postpone.",
  "fields": [
   {
    "key": "objectives",
    "label": "Objectives portfolio",
    "hint": "One per line: code (ESO1 / ISO1) | objective | what success looks like at the end of the period | owner."
   },
   {
    "key": "priorities",
    "label": "Choices and capacity",
    "hint": "What will you postpone so these objectives have enough resources?"
   }
  ],
  "check": "Have you separated external results from internal capabilities, with a code and an owner for each?",
  "anatomy": {
   "title": "External and internal objectives",
   "intro": "Two kinds of objective, kept apart so that each gets attention.",
   "cols": [
    "",
    "External (ESO)",
    "Internal (ISO)"
   ],
   "rows": [
    [
     "Describes",
     "The change for the people, community or environment you serve",
     "The capabilities your organisation needs to deliver that change"
    ],
    [
     "Typical areas",
     "Skills, income, behaviour, living or environmental conditions",
     "Governance, people, systems, finance, brand, partnerships"
    ],
    [
     "Example (Imara Girls in Science)",
     "ESO1 Girls gain science confidence and skills and keep science subjects",
     "ISO1 No single funder provides more than 40% of income"
    ],
    [
     "Where it goes next",
     "Gets its own Theory of Change pathway in Module 2",
     "Appears as inputs and conditions in those pathways"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example objectives portfolios",
   "intro": "Each organisation’s external and internal objectives for its planning period, with what it will postpone.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "objectives": "ESO1 | Young people in the two villages lead regular restoration of degraded mangrove areas | Youth teams plant and monitor monthly; most seedlings survive (target set after the first monitoring round) | Sari\nESO2 | Young people understand and speak up for their coast in village decisions | Young people present their findings at village meetings | Wayan\nISO1 | Register a legal entity with a small board | Entity registered after local legal advice | Wayan\nISO2 | Safe, trained volunteer team | All volunteers trained in safeguarding; parental consent in place | Sari\nISO3 | A small, reliable local funding base | Local donors and dive operators cover yearly costs | Wayan",
      "priorities": "We postpone a third village, tourist planting events and a website until we know survival rates and the entity is registered. With two days a week each, we run ESO2 through the school sessions we already plan, not as a separate programme."
     },
     "notice": "Notice the owners: with no staff, the two co-founders share every objective, which is a good reason to keep the list short."
    },
    {
     "org": "ngo",
     "profile": {
      "objectives": "ESO1 | Girls in partner schools gain confidence and practical skills in science and keep science subjects into secondary school | Most girls we follow choose science subjects at secondary | Programme manager\nESO2 | Partner schools sustain hands-on science for girls with trained teachers | Teachers run practical science without our coordinators | Achieng\nISO1 | Diversify income so no funder exceeds 40% | Neither foundation above 40% of income | Achieng and board\nISO2 | Strengthen safeguarding and volunteer mentor training | Every mentor trained and checked before meeting girls | Programme manager\nISO3 | Simple results data system | All 14 clubs report in one tool, used termly | Finance officer",
      "priorities": "We postpone the paid STEM kits idea, any new sub-counties and a second holiday camp. The time this frees goes to teacher workshops (ESO2) and fundraising (ISO1)."
     },
     "notice": "Notice ISO1: the 40% limit on any one funder gives a clear, checkable picture of success without inventing results figures."
    },
    {
     "org": "social",
     "profile": {
      "objectives": "ESO1 | Trainees complete the apprenticeship and move into formal jobs in food businesses within three months | Most of each cohort certified and in formal jobs within three months | Diego\nESO2 | Graduates keep stable formal work a year later | 12-month follow-up shows most still in formal work | Diego\nISO1 | Reach break-even and a 3-month cash reserve | Costs covered; three months’ costs in the bank | Lucía\nISO2 | Training costs funded without raising bread prices | Wages and mentoring paid by grants or employer fees | Diego\nISO3 | Decide on BIC status | Decision taken with legal advice | Lucía and Diego",
      "priorities": "We postpone a second shop, new product lines and a partner nonprofit for training grants (we revisit it under ISO2). We keep two cohorts of six trainees a year until the cash reserve is in place."
     },
     "notice": "Notice how ISO1 and ISO2 protect ESO1: the training only lasts if the bakery breaks even without raising bread prices."
    },
    {
     "org": "coop",
     "profile": {
      "objectives": "ESO1 | Member weavers’ average income from weaving rises and is paid on time | Average income higher than at the start; all payments within 15 days | Meera\nESO2 | Young people join as apprentice weavers and stay | Apprentices complete training and become members | Elected committee\nISO1 | Grow direct online sales to 40% of revenue | Online sales reach 40% of annual sales | Meera and designer\nISO2 | Keep democratic control with any new funding | Members approve every funding agreement | Elected committee\nISO3 | Build a shared dye unit | Dye unit working, with a monsoon plan | Meera and quality officer",
      "priorities": "We postpone a shop of our own, export markets and products beyond saris and fabric. The dye unit goes ahead only if its funding keeps members in control (ISO2)."
     },
     "notice": "Notice ISO2: a cooperative can make democratic control an objective, so new funding for the dye unit cannot quietly weaken it."
    },
    {
     "org": "hybrid",
     "profile": {
      "objectives": "ESO1 | More residents, especially low-income households, repair and reuse items instead of discarding them | More return visits and tool loans, including from low-income areas | Priya\nESO2 | Young people gain basic repair skills and confidence | Pupils do simple repairs safely and feel confident | Schools officer\nISO1 | Shop profits cover at least 30% of charity costs | Trading profits cover 30% of charity costs | Shop manager\nISO2 | Clear reporting between trading company and charity for trustees | One quarterly report covering both | Tom\nISO3 | Volunteer safety and training (electrical safety) | Every repairer trained; every electrical item tested | Volunteer coordinator",
      "priorities": "We postpone a second repair café site, paid repair services and a collection van. School workshops stay at 30 a year until the shop meets ISO1."
     },
     "notice": "Notice the postponed list: saying no to a second site gives the volunteer and shop objectives the capacity they need."
    }
   ]
  }
 }),
 review("foundation","Your Strategic Foundation")
 ]
});
