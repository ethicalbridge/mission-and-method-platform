import {module,lesson,review} from './kit.js?v=c8bd65a76';
// Reviewed October 2026: plain explanation, optional table (anatomy), and a gallery showing how the five example
// organisations (course/examples.js; story in docs/example-organisations.md) complete each exercise.
export default module({
 ...{"uses":[1,2,3,10,11],"video":null,"id":12,"slug":"partnerships","phase":"Sustain & Run","title":"Partnerships & Ecosystem Building","short":"Identify, assess, design, formalise, manage, evaluate and renew or exit partnerships","intro":"No purpose-led organisation achieves its mission alone. Learn to identify the partners and ecosystem actors that matter, assess fit and risk, design fair partnerships with clear roles and governance, formalise them, manage the relationship, measure its value and decide when to renew, scale or exit.","output":"Partnership Strategy","workbook":{"file":"Module-12-Partnerships-Ecosystem.xlsx","title":"Partnerships & Ecosystem Building workbook"},"promo":{"lesson":"managing","tools":["ethical-bridge-crm","meetings-actions-decisions","issue-risk-management"],"headline":"Keep every partnership’s commitments and next conversations visible","pitch":"The relationship CRM keeps partners, funders and other contacts with their context, agreed actions and next conversations in one place. Meetings, Actions & Decisions records joint decisions and follow-ups, and Issue & Risk Management keeps partnership risks owned and reviewed."}},
 lessons:[
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Understand",
  "id": "types",
  "title": "Why partner: types of partnership",
  "sheet": "Partnership types",
  "learn": [
   "Partnerships let you achieve together what you could not achieve alone: reach, expertise, legitimacy, resources, influence or lower costs. They also take time, need compromise and carry risk. Partner for a clear reason linked to one of your objectives, not because it is expected.",
   "Common types are implementing partners (who deliver activities, often with money passing between you), strategic partners (who share long-term goals), community partners (local groups and leaders), corporate partners, institutional partners (public bodies, universities), technical partners (expertise, tools or certification) and networks, coalitions and alliances.",
   "Relationships also vary in depth: transactional (a defined exchange, such as buying a service), cooperative (sharing information), coordinated (aligning activities) and collaborative (shared goals, resources and decisions). Deeper is not always better. A deep partnership costs more time and trust, so choose the depth that fits the purpose."
  ],
  "weak": "Partner with as many organisations as possible.",
  "strong": "Riverside Repair Hub: Leeds City Council’s waste team as an institutional partner (a contract, coordinated) for waste targets; two housing associations as community partners to reach low-income tenants; the national repair network (membership, cooperative) for safety guidance and a shared voice.",
  "why": "Each relationship is tied to an objective and has a depth that fits it.",
  "reflect": "Which of your objectives could not be achieved without a partner?",
  "exercise": "List the partnership types your strategy needs and why.",
  "fields": [
   {
    "key": "needs",
    "label": "Partnership needs",
    "hint": "Objective | what we lack | type of partner | depth of relationship needed."
   }
  ],
  "check": "Does each potential partnership serve a clear strategic purpose?",
  "anatomy": {
   "title": "Partnership types at a glance",
   "intro": "Most organisations need only a few of these. The examples come from the five organisations.",
   "cols": [
    "Type",
    "What they bring",
    "Example"
   ],
   "rows": [
    [
     "Implementing",
     "Deliver activities with or for you, often with money passing between you",
     "Imara’s 14 public schools host the clubs and give club time and a link teacher."
    ],
    [
     "Strategic",
     "Long-term goals you work on together",
     "Pan del Barrio and its employers, changing how young people are recruited."
    ],
    [
     "Community",
     "Local trust, access and knowledge",
     "The two village heads who agree Tide Line’s restoration sites."
    ],
    [
     "Corporate",
     "Money, goods, skills or jobs",
     "Tide Line’s two dive operators; local businesses donating items to Riverside."
    ],
    [
     "Institutional and technical",
     "Public mandate, data, expertise, certification",
     "Vanita’s state cooperative department and design school; Pan del Barrio’s certification body."
    ],
    [
     "Networks and coalitions",
     "Learning, standards and a shared voice",
     "Riverside’s membership of a national repair network."
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example partnership needs",
   "intro": "How each organisation linked its objectives to the partners it needs and how deep each relationship should be.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "needs": "ESO1 restoration | permission to plant on village coast | community: the two village heads | coordinated, with a written site agreement\nESO1 restoration | local species and healthy seedlings | corporate: a local mangrove nursery | transactional, plus advice on species\nESO2 youth voice | regular time with young people | institutional: the junior secondary school (SMP) | coordinated\nISO3 local funding | money and boat time | corporate: two dive operators | transactional sponsorship, no tourist planting days\nESO1 restoration | technical advice and data | institutional: provincial environment office | cooperative, light for now"
     },
     "notice": "Notice the first need is permission, not money. For a group with no land and no registration, community partners decide whether the work can happen at all."
    },
    {
     "org": "ngo",
     "profile": {
      "needs": "ESO1 girls’ skills | rooms, club time, access to girls | implementing: 14 public schools | collaborative, yearly agreement\nESO2 schools sustain science | approval and teachers’ time for workshops | institutional: county education office | coordinated\nESO1 role models | women in science as mentors | institutional: two universities | coordinated, a steady flow of mentors\nESO1 practical skills | labs and equipment for the camp | technical: a science centre | transactional, discounted hire\nISO1 diversify income | camp sponsorship | corporate: local businesses | transactional, renewed yearly"
     },
     "notice": "See how the schools are treated as implementing partners, not venues. Copy the habit of naming the depth each partner needs, from yearly sponsorship to close collaboration."
    },
    {
     "org": "social",
     "profile": {
      "needs": "ESO1 formal jobs | employers who hire graduates | strategic: 8 food employers | collaborative with the two that pay training fees; coordinated with six\nESO1 recruitment | referrals of young people who left school early | institutional: municipal youth employment programme | coordinated; possible grant later\nESO1 certificate | recognised, independent assessment | technical: the bakers’ certification body | transactional\nISO1 break-even | steady flour at a fair price | corporate: flour supplier | transactional, price agreed quarterly"
     },
     "notice": "Copy the split within one group of partners: two employers in a deeper relationship, six lighter. The same partner type does not need the same depth."
    },
    {
     "org": "coop",
     "profile": {
      "needs": "ESO1 income | buyers who order in volume | corporate: two retail chains | transactional, moving to coordinated season planning\nESO1 income | designs younger buyers want | technical: a design school | coordinated, student placements\nISO3 dye unit | grant and technical approval | institutional: state cooperative department | cooperative; members must keep control\nISO1 online sales | buyers outside Kerala | network: a handloom export fair | transactional\nESO1 lower costs | yarn at bulk prices | corporate: yarn supplier | transactional"
     },
     "notice": "Notice the state cooperative department appears as a partner and as the regulator. Where one body plays both roles, write down which role a conversation is about."
    },
    {
     "org": "hybrid",
     "profile": {
      "needs": "ESO1 low-income households | access to tenants and community rooms | community: two housing associations | coordinated\nESO1 less waste | contract, waste data, policy voice | institutional: Leeds City Council waste team | contract; coordinated\nESO2 young people | pupils and teaching time | institutional: 12 schools | coordinated, termly bookings\nISO1 shop profits | donated stock | corporate: local businesses | transactional\nISO3 volunteer safety | safety guidance, peer learning, voice on right to repair | network: a national repair network | cooperative membership"
     },
     "notice": "See how one partner, the national network, serves a safety objective, not only advocacy. Look for partners who can help your internal objectives too."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "strategy",
  "title": "Partnership strategy and value proposition",
  "sheet": "Partnership strategy",
  "learn": [
   "A partnership strategy sets out why and how you partner: which objectives partnerships serve, your priority partner types, your principles (for example fairness, transparency and accountability on both sides), how you decide to enter a partnership and how you manage it. For a small organisation, one page is enough.",
   "A value proposition explains what you bring and what each side gains. Partners contribute different things: money, expertise, access to communities, credibility, data, premises or policy influence. Value must flow both ways, or the partnership will not last.",
   "Write a short proposition for each priority partner type: shared purpose, what each side contributes, the benefit to each and the boundaries you will keep. It becomes the basis of your first conversations, and it helps you say no to offers that do not fit."
  ],
  "weak": "We need partners to help us.",
  "strong": "Pan del Barrio, for employers: we offer certified, reliable bakers and follow-up for twelve months; employers offer formal jobs and feedback on skills; both gain lower recruitment costs and staff who stay.",
  "why": "It names what each side gives and gets, so an employer can see its own benefit straight away.",
  "reflect": "Why would a strong partner choose you over someone else?",
  "exercise": "Write your partnership principles and a value proposition for one priority partner type.",
  "fields": [
   {
    "key": "principles",
    "label": "Partnership principles",
    "hint": "How you will partner and what you will not compromise on."
   },
   {
    "key": "proposition",
    "label": "Value proposition",
    "hint": "Partner type | shared purpose | what we bring | what they bring | benefit to each | boundaries."
   }
  ],
  "check": "Would a potential partner see clear value for themselves?",
  "gallery": {
   "title": "Five example partnership principles and propositions",
   "intro": "How each organisation wrote the rules it partners by and its offer to one priority partner type.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "principles": "Young people lead what happens on the coast; sponsors do not direct the work. We respect village custom (adat) and ask village heads before anything else. We report survival rates honestly, including failures. No tourist planting days and no photos of children without parental consent. Both co-founders agree any partnership involving money or children.",
      "proposition": "Dive operators | healthy coasts and reefs near their dive sites | youth-led restoration, honest survival data twice a year, thanks on our notice board and Instagram | sponsorship and boat time at low season | they show guests real local care for the coast; we get cash and transport | no guests at planting days, no staff alone with children, no say over sites"
     },
     "notice": "Notice the boundaries are as specific as the offer. Copy the habit of writing what a sponsor will not get before the first conversation."
    },
    {
     "org": "ngo",
     "profile": {
      "principles": "Girls first: safeguarding and girls’ voices come before any partner’s wishes. We work with schools, not around them: head teachers agree plans and see the data about their girls. We credit partners publicly and report what did not work. We do not let a partner use girls’ images or data for marketing.",
      "proposition": "Universities | more young women in science study and careers | trained, supported mentoring roles and a safe, structured programme | 15–20 women students and staff as mentors each year | students gain experience and outreach credit; girls meet real role models | mentors vetted and trained by us; no recruitment of girls for university events without parents’ consent"
     },
     "notice": "See how the proposition shows what the university gains, outreach and student experience, not only what Imara needs. A partner should recognise its own interest in your words."
    },
    {
     "org": "social",
     "profile": {
      "principles": "Real jobs: we only place graduates in formal, paid jobs with a contract and health insurance. Quality first: employers hire because our bakers are good, not out of charity. Trainees’ stories are shared only with their consent. Fees from employers never buy the right to choose trainees or skip the certificate.",
      "proposition": "Food employers | more young people in stable formal work | certified bakers, screening, and follow-up for 12 months | formal jobs, feedback on skills, training fees from those who can pay | lower recruitment costs and better retention for them; jobs and income for us | no unpaid trial periods; no placement where contracts or safety are not in order"
     },
     "notice": "Copy the line on fees. When partners pay you, say clearly what their money does not buy."
    },
    {
     "org": "coop",
     "profile": {
      "principles": "Members decide: no partnership may give an outsider control over prices, membership or the surplus. Fair rates: we will not accept orders below our fair piece rate. Authentic only: no power-loom products. Weavers are named only with consent. Any partnership above US$5,000 a year goes to the committee.",
      "proposition": "Retail chains | keep handloom in demand with city buyers | authentic, traceable saris with weavers’ names and two collections a year | regular volume orders and shelf space | they get a trusted, distinctive product; members get steady orders | payment within 30 days; no exclusive rights beyond one named collection for one season"
     },
     "notice": "Notice the committee threshold. Member-owned organisations should say which partnerships the elected body must approve."
    },
    {
     "org": "hybrid",
     "profile": {
      "principles": "Fix first: we do not promote buying new, even for sponsors. We do not compete with local paid repairers. We share data only in a form that protects people (aggregated, with consent). Trustees approve any partnership that brings money with conditions. We credit volunteers alongside partners.",
      "proposition": "Housing associations | lower household costs and less waste for tenants | monthly pop-up repair cafés run by trained volunteers, electrical safety checks | community rooms, promotion to tenants, a known contact | tenants save money and meet neighbours; we reach the households we most want to serve | no tenant data passed to us without consent; we do not do repairs that are the landlord’s duty"
     },
     "notice": "See the last boundary: the volunteers will not fix what the landlord should. Copy the habit of protecting the people you serve from cost shifting."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "ethical-bridge-crm"
  ],
  "video": null,
  "stage": "Implement",
  "id": "mapping",
  "title": "Ecosystem and partnership mapping",
  "sheet": "Partner map",
  "learn": [
   "An ecosystem map shows the actors around your issue and how they relate: who works with whom, who holds money, influence or access, and where the gaps and overlaps are. Start from your context and stakeholder analysis in Module 1 rather than a blank page.",
   "For each potential partner, note what they do, their priorities, your current relationship, their strategic value to you and how well they fit (shared values, practical capacity, timing). Then prioritise a few with high value and good fit. Familiar names are not automatically the right ones.",
   "Look beyond the obvious: groups led by the people you serve, organisations in other sectors, universities, public services, and peers who compete with you today but could be allies tomorrow. Note who holds power over your work even if they will never be a partner, such as a landowner or regulator."
  ],
  "weak": "Our partners are whoever contacts us.",
  "strong": "Imara Girls in Science mapped 16 actors in four groups (schools and education office, universities and science bodies, funders and businesses, other girls’ and STEM groups); five scored high on value and fit; two prioritised this term: the county education office and the science centre.",
  "why": "It is systematic, includes actors beyond current partners and ends with a short list for action.",
  "reflect": "Which actor in your ecosystem is most influential but least connected to you?",
  "exercise": "Map your ecosystem and prioritise potential partners.",
  "fields": [
   {
    "key": "map",
    "label": "Ecosystem map",
    "hint": "Actor | type | what they do | relationship with us | strategic value | fit | priority."
   }
  ],
  "check": "Have you prioritised partners by strategic value and fit, not familiarity?",
  "gallery": {
   "title": "Five example ecosystem maps",
   "intro": "How each organisation listed the actors around its work and decided where to focus first.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "map": "Village heads (2) | community | decide land use | supportive | very high | good | 1: site agreements\nJunior secondary school | school | pupils 12–15 | principal keen | high | good | 1\nMangrove nursery | business | seedlings | bought samples | high | good | 2\nTwo dive operators | business | dive tourism | one offered support | medium | fair: want guests to plant | 2\nProvincial environment office | public body | planting events, permits | none | medium | unknown | 3\nShrimp pond owners | landowners | ponds on old mangrove | tension | high influence | not a partner | via village heads"
     },
     "notice": "Notice the pond owners are on the map even though they will not be partners. Copy the habit of mapping who can block you, not only who can help."
    },
    {
     "org": "ngo",
     "profile": {
      "map": "14 public schools | schools | host clubs | yearly agreements | very high | good | keep\nCounty education office | public body | supervises schools | termly | very high | good | 1: teacher workshops\nTwo universities | higher education | mentors | established | high | good | keep\nScience centre | education charity | labs | hired once | high | good | 1: camp\nFoundations A and B | funders | grants | 50% and 25% of income | high | A ends next year | manage dependence\nWomen engineers’ association | professional body | careers | none | medium | good | 2\nNairobi STEM NGO | peer | STEM clubs | met once | medium | unknown | 3: learning"
     },
     "notice": "See how the main funder is rated high value but flagged for dependence. A map can show where a strong relationship is also a risk."
    },
    {
     "org": "social",
     "profile": {
      "map": "Municipal youth programme | public body | job schemes | sends referrals | high | fair: slow | 1: training grant\n8 food employers | business | hire graduates | 2 pay fees | very high | good | 1: two more paying\nCertification body | technical | assesses bakers | exams | high | good | keep\nFlour supplier | business | flour | 3 years | medium | good | keep\nDistrict youth NGO | peer | life skills | Diego’s ex-colleagues | medium | good | 2: shared referrals\nBakers’ trade association | network | represents bakeries | none | medium | unknown | 3"
     },
     "notice": "Copy the way each priority comes with a next step, such as moving two more employers to paying fees. A ranked map should lead straight into actions."
    },
    {
     "org": "coop",
     "profile": {
      "map": "State cooperative department | regulator, funder | audit, schemes | annual audit | very high | fair: unclear grant terms | 1: dye unit\nDesign school | education | placements | 2 a year | high | good | 1: co-designed collection\nTwo retail chains | buyers | city shops | about 60% of shop sales | high | fair: pay late | 2: payment terms\nOnline marketplace | platform | online sales | listing | high | fair: fees rising | 2\nYarn supplier | business | yarn | monthly | high | good | keep\nExport fair | network | foreign buyers | yearly stall | medium | good | 3\nOther weaver cooperatives | peers | similar work | little | medium | unknown | 2: buy yarn together?"
     },
     "notice": "Notice the peer cooperatives, competitors today, appear as possible allies for buying yarn together. Look for peers who share your costs, not only your market."
    },
    {
     "org": "hybrid",
     "profile": {
      "map": "Leeds City Council waste team | funder, policy | waste targets | £30,000 contract | very high | good | keep: renewal talks\n12 schools | education | workshops | termly | high | good | keep\nTwo housing associations | landlords | low-income tenants | pilot with one | very high | good | 1: second association\nLocal businesses | donors | stock | 15 regular | medium | good | keep\nNational repair network | network | standards, advocacy | member | medium | good | keep\nIndependent repair shops | peers | paid repairs | some referrals | medium | good | 2: referral agreement\nFood banks | community | households under pressure | none | high | good | 2"
     },
     "notice": "See how paid repair shops are mapped as allies through referrals. Clear boundaries, here no paid repairs, can turn possible competitors into partners."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "selection",
  "title": "Partner selection and due diligence",
  "sheet": "Due diligence",
  "learn": [
   "Before committing, check that a partner is a good fit and a safe one. Make due diligence proportionate to the depth and risk: light for a shared event, thorough when money, personal data or children and vulnerable adults are involved.",
   "Typical areas are legal registration and governance; financial health and controls; track record and capacity; safeguarding, data protection and anti-fraud policies and how they work in practice; reputation and conflicts of interest; and values alignment. For funders and companies, also check where their money comes from and any reputational concerns.",
   "Due diligence runs both ways: good partners will check you too, so have your own documents ready. Use it to find where you can strengthen each other, not only as a pass or fail test. Record what you found, what you decided and any conditions."
  ],
  "weak": "They seem nice and well known.",
  "strong": "Imara Girls in Science, before mentors from a new university join clubs: the university’s student vetting process, a named staff contact, our own reference checks and safeguarding training for every mentor; condition: no mentor works with girls until both are complete.",
  "why": "The checks match the risk, which is adults working with children, and end in a clear condition.",
  "reflect": "What would you need to know before trusting a partner with your participants?",
  "exercise": "Define your due diligence checks by partnership type and apply them to one prospect.",
  "fields": [
   {
    "key": "checks",
    "label": "Due diligence checks",
    "hint": "Partnership type | area | what we check | evidence."
   },
   {
    "key": "result",
    "label": "Assessment of one partner",
    "hint": "Findings | risks | decision | conditions."
   }
  ],
  "check": "Are your checks proportionate to the money, data and people involved?",
  "gallery": {
   "title": "Five example due diligence checks",
   "intro": "How each organisation scaled its checks to the risk and applied them to one real prospect.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "checks": "Sponsor (dive operator) | reputation | any harm to reefs or local conflict | ask village heads and fishers\nSponsor | conditions | what they expect in return | written note of the deal\nAny partner near children | safeguarding | who will be present, photo rules | agreement to our two-adult and consent rules\nSeedling supplier | quality | species and survival record | visit the nursery; ask past buyers",
      "result": "Dive operator A. Findings: well regarded; no reef complaints; wants guests to join planting days and photos for its website. Risks: tourist planting conflicts with our positioning; photos of children. Decision: yes to sponsorship. Conditions: no guests at youth planting days; photos only of the site, never of children; thanks on our notice board, not a logo on T-shirts."
     },
     "notice": "Notice the checks are light and practical, asking villagers and visiting the nursery. A small group can do real due diligence without forms."
    },
    {
     "org": "ngo",
     "profile": {
      "checks": "School | safeguarding | head teacher’s commitment, a named teacher contact, safe room | signed school agreement\nMentor source (university) | safeguarding | vetting of students and staff | written process; our references\nScience centre (camp) | safety | supervision, first aid, insurance | policy copies; site visit\nCorporate sponsor | reputation, source of money | conflicts with girls’ wellbeing (e.g. sugary drinks, betting) | public information; board view if unclear\nAny partner receiving girls’ data | data protection | what, why, how stored | data-sharing note",
      "result": "Science centre, for a deeper camp partnership. Findings: registered charity, accounts up to date, good safety record, no safeguarding policy covering visiting groups. Risks: staff alone with girls. Decision: proceed. Conditions: centre adopts a visiting-groups safeguarding note before the camp; our coordinators stay with girls at all times."
     },
     "notice": "See how a gap led to a condition, not a refusal. Copy the idea that due diligence can strengthen a partner rather than rule them out."
    },
    {
     "org": "social",
     "profile": {
      "checks": "Employer hiring graduates | legal | registered, gives formal contracts and health insurance | sample contract; tax ID\nEmployer | safety | kitchen safety, hours | site visit by Diego\nEmployer | reputation | how former staff describe it | two conversations\nMunicipal programme | funding conditions | reporting, eligibility rules, payment timing | written terms\nCertification body | recognition | accepted by employers | ask three employers",
      "result": "New employer: a hotel kitchen. Findings: registered, formal contracts, good safety; long shifts for juniors (12 hours on weekends). Risks: graduates burn out and leave, harming retention. Decision: accept for one graduate first. Conditions: shifts within legal limits, a named supervisor, review at three months."
     },
     "notice": "Copy the trial step: one graduate first, then review. When doubts remain, a smaller first commitment is a fair middle way."
    },
    {
     "org": "coop",
     "profile": {
      "checks": "Retail buyer | financial health | payment record | ask other cooperatives; trade references\nRetail buyer | contract terms | exclusivity, returns, payment days | draft terms before samples\nGrant or scheme | control | conditions on governance, seats, veto | written scheme rules; committee review\nDesign school | intellectual property | who owns designs made with students | written agreement\nOnline platform | fees, data | commission, who owns buyer data | platform terms",
      "result": "Second retail chain. Findings: large, reputable, pays in 75–90 days, wants sale-or-return on new designs. Risks: working capital squeezed before festival season; unsold stock returned. Decision: continue, renegotiate. Conditions: payment within 45 days; sale-or-return only on 20% of an order; committee approves the terms."
     },
     "notice": "Notice the risk is to members’ cash, not reputation. Due diligence on a powerful buyer should look at payment terms as closely as values."
    },
    {
     "org": "hybrid",
     "profile": {
      "checks": "Business donating goods | product safety | condition of electricals, recalls | test on receipt (PAT)\nSchool | safeguarding | DBS checks, teacher present | school agreement\nHousing association | data | consent for tenant contact | data-sharing agreement\nCorporate sponsor | values and reputation | fits ‘Fix first’; no promotion of buying new | public record; trustee view\nCouncil contract | conditions | targets, reporting, termination | contract review by treasurer",
      "result": "Electronics retailer offering £10,000 sponsorship. Findings: reputable; wants its logo on repair café posters and a ‘trade-in for new’ stall. Risks: contradicts ‘Fix first’; possible complaints from volunteers. Decision: decline the stall, offer an alternative. Conditions: sponsor tool library repairs only; logo on a thank-you page, not posters. Trustees approved."
     },
     "notice": "See how values alignment is checked in practice: what the sponsor wants to do, not only who they are. A good offer can still have the wrong conditions."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "alignment",
  "title": "Alignment, power dynamics and equitable partnerships",
  "sheet": "Alignment check",
  "learn": [
   "Partnerships work when objectives and values are aligned enough and the differences are named. Discuss openly what each side wants to achieve, what success looks like, which values are non-negotiable and where priorities differ. Differences are normal; hidden ones cause trouble later.",
   "Power is rarely equal. Whoever controls money, information, relationships or visibility usually holds more of it. Unequal power can lead one partner to set the agenda, take the credit or pass risk to the other. Name where power sits and design for fairness: shared decisions, open budgets, fair cost sharing, joint credit and accountability both ways.",
   "Be honest about your own power too. A small organisation can be the stronger partner towards a school, a community group or the people it serves. Localisation means shifting power and resources towards local organisations and communities: funding them fairly, respecting their leadership and supporting their capacity on their terms."
  ],
  "weak": "We decide, they implement.",
  "strong": "Riverside Repair Hub and Leeds City Council: the council holds the money and sets targets; Riverside holds the volunteers, the repair data and residents’ trust. They agreed joint targets, a named council contact, data in aggregated form only, and a review in which Riverside can propose changes.",
  "why": "It admits who is stronger, shows what the smaller partner holds and sets out how power is shared.",
  "reflect": "In your partnerships, who holds the money, who takes the risk and who gets the credit?",
  "exercise": "Assess alignment and power in one partnership and decide how to make it fairer.",
  "fields": [
   {
    "key": "alignment",
    "label": "Alignment check",
    "hint": "Objectives, values and priorities: where aligned, where different."
   },
   {
    "key": "power",
    "label": "Power and equity",
    "hint": "Where power sits (money, information, visibility, decisions) and how you will share it."
   }
  ],
  "check": "Have you designed for fairness in decisions, money and credit?",
  "anatomy": {
   "title": "Where power sits in a partnership",
   "intro": "Ask these questions for each partnership, about yourself as well as your partner.",
   "cols": [
    "Source",
    "Ask",
    "Ways to share it"
   ],
   "rows": [
    [
     "Money",
     "Who pays, and who can stop paying?",
     "Open budgets, fair cost and overhead sharing, agreed payment dates"
    ],
    [
     "Information",
     "Who holds the data and knows the plans first?",
     "Shared reports, data returned to the partner, early warning of changes"
    ],
    [
     "Relationships and access",
     "Who is trusted by the people served?",
     "Joint introductions; respect the partner’s lead with its community"
    ],
    [
     "Visibility and credit",
     "Whose name appears on results?",
     "Joint branding, shared authorship, naming each partner’s contribution"
    ],
    [
     "Decisions",
     "Who sets priorities and can change the plan?",
     "Joint steering group, decision rules agreed in writing, a right to propose changes"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example alignment and power checks",
   "intro": "How each organisation looked honestly at one partnership, including where it holds the power itself.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "alignment": "Dive operators. Aligned: healthy coast and reefs; local young people involved. Different: they want guests at planting days and quick photos; we measure survival over 12 months and keep tourism out of youth sessions. Non-negotiable for us: children’s safety and consent; youth leadership.",
      "power": "They hold money (40% of our hoped-for income), boats and a large Instagram audience. We hold village trust, access to sites and the young people. Risk: we bend our rules to keep the money. Sharing it: a written one-page deal; we choose sites with village heads; they get survival data, not control; if they leave, we cut boat days, not safety."
     },
     "notice": "Notice the plan for losing the sponsor. Saying in advance what you would cut keeps a funding partner from quietly setting your rules."
    },
    {
     "org": "ngo",
     "profile": {
      "alignment": "14 public schools. Aligned: better science results; girls stay in school. Different: head teachers want exam scores; we focus on confidence and practical skills. Some teachers see clubs as extra work. Non-negotiable: safeguarding; girls’ voices in club plans.",
      "power": "Here we are the stronger partner: we bring money (kits), mentors and visibility (our annual report). Schools hold access and the final say on club time; teachers have little say. Fairer: each school sees and keeps its own girls’ results; a teacher joins each club plan; schools are named in reports; kits stay with the school."
     },
     "notice": "See how Imara admits it holds more power than the schools. Copy the habit of checking your own power, not only the funder’s."
    },
    {
     "org": "social",
     "profile": {
      "alignment": "Municipal youth employment programme. Aligned: formal jobs for young people. Different: the programme counts places filled quickly; we care about completion and retention at 12 months. It wants to refer under-18s; we only take 18–24. Non-negotiable: paid contracts; our trainee selection.",
      "power": "The municipality holds the money we hope for, the referral flow and the rules; it can change programmes after elections. We hold the training, the employer links and the results. Fairer: a written referral agreement; joint selection with our final say; retention data shared both ways; the grant, if it comes, never above a quarter of training costs."
     },
     "notice": "Copy the cap on the grant. Limiting how much you depend on a powerful partner is a simple way to keep your voice in the relationship."
    },
    {
     "org": "coop",
     "profile": {
      "alignment": "State cooperative department, dye-unit scheme. Aligned: weavers’ livelihoods; a living handloom tradition. Different: the department wants targets and a quick start; members want to choose the site and the dyes. Non-negotiable: members decide, and open books.",
      "power": "The department holds the grant, the audit and the registration rules: it is both funder and regulator. We hold 140 members, skills and a record of clean audits. Risk: a grant condition gives officials a seat or veto. Fairer: the general body approves conditions; all papers in Malayalam; ask peer cooperatives how such grants worked."
     },
     "notice": "Notice the dual role: the same body funds and audits. When a partner also regulates you, decide where you will negotiate and where you simply comply."
    },
    {
     "org": "hybrid",
     "profile": {
      "alignment": "Leeds City Council waste team. Aligned: less waste, lower household costs. Different: the council counts tonnes diverted; we also value skills, confidence and neighbours meeting. Its priorities shift with budgets. Non-negotiable: we do not do paid commercial repairs or promote buying new.",
      "power": "The council holds the £30,000 contract (one sixth of charity income), the targets and its name on our reports. We hold 40 volunteers, the repair data and residents’ trust. Fairer: targets agreed jointly each year; we keep ownership of our data and share it aggregated; both logos; a mid-year review where we can propose changes."
     },
     "notice": "See how the smaller partner lists what it holds. Naming your own sources of power makes it easier to negotiate fairly with a large funder."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "design",
  "title": "Designing the partnership: roles, governance and resources",
  "sheet": "Partnership design",
  "learn": [
   "Design the partnership before signing anything: shared objectives and results, each side’s roles (a RACI from Module 3 helps), the resources each contributes, how decisions are made, communication routines, reporting, data sharing, branding and how disagreements are handled.",
   "For delivery partnerships, agree the workplan, budget, MEAL approach and safeguarding responsibilities together. For strategic partnerships, agree the shared goals and how you will review progress. Keep the design proportionate: a one-page note for a light partnership, more detail when money or vulnerable people are involved.",
   "Agree how you will learn together: when you will review, what you will measure and how either side can raise a concern. Write the design in words both partners would use, and check that each would describe roles and decisions the same way."
  ],
  "weak": "We will figure out the details as we go.",
  "strong": "Vanita Weavers and the design school: one co-designed collection a year; the school selects and supervises students, Vanita’s designer leads briefs, the committee approves the final range; weavers paid at full piece rate for samples; joint review after each collection; both names on the collection.",
  "why": "It makes roles, decisions, money and credit explicit before students and weavers start work.",
  "reflect": "What is the most likely source of misunderstanding with this partner?",
  "exercise": "Design one partnership’s roles, governance and routines.",
  "fields": [
   {
    "key": "design",
    "label": "Partnership design",
    "hint": "Shared objectives | roles (RACI) | resources | decision-making | communication | reporting | data sharing | branding."
   }
  ],
  "check": "Would both partners describe roles and decisions the same way?",
  "gallery": {
   "title": "Five example partnership designs",
   "intro": "How each organisation set out roles, resources and routines for one partnership before work began.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "design": "Shared objectives: 10 planting days a year; two-thirds of seedlings surviving at 12 months.\nRoles: village heads approve sites (A); Sari plans planting and monitoring (R); Wayan links with the school (R); youth team leaders run teams from year two.\nResources: village heads give land access and announce days; we bring seedlings, tools, volunteers.\nDecisions: site changes only with village head approval.\nCommunication: visit each head before every planting day.\nReporting: survival results at the village meeting twice a year.\nData: no names of children shared.\nBranding: village name first on any sign."
     },
     "notice": "Notice that a light partnership still gets a written design, one line per part. Even informal agreements with community leaders benefit from clear roles."
    },
    {
     "org": "ngo",
     "profile": {
      "design": "Shared objectives (with each school): girls attend weekly; teachers use hands-on methods; girls keep science subjects.\nRoles (RACI): Imara coordinator runs clubs (R); head teacher accountable for room and time (A); link teacher consulted on content (C); parents informed termly (I).\nResources: Imara: kits, mentors, training; school: room, time, link teacher.\nDecisions: club timetable agreed each term.\nCommunication: monthly check-in with link teacher.\nReporting: end-of-term results to each school.\nData: girls’ data stays with Imara; schools see their own results.\nBranding: school and Imara names on certificates."
     },
     "notice": "See how the RACI names one accountable person in each school. Copy this: where two organisations share delivery, say who answers for what."
    },
    {
     "org": "social",
     "profile": {
      "design": "Shared objectives (with two fee-paying employers): 4 graduates hired each year; 75% still employed at 12 months.\nRoles: Pan del Barrio trains and certifies (R); employer interviews and hires (A for hiring); Diego follows up at 3 and 12 months.\nResources: employer pays US$7,500 a year in training fees and gives a work visit per cohort.\nDecisions: employers advise on skills; we decide curriculum and selection.\nCommunication: call with HR every two months.\nReporting: short report per cohort.\nData: retention shared with graduates’ consent.\nBranding: partner listed on our site; trainees’ stories only with consent."
     },
     "notice": "Copy the line that separates advice from decision: employers shape skills, Pan del Barrio keeps control of curriculum and selection."
    },
    {
     "org": "coop",
     "profile": {
      "design": "Shared objectives: one co-designed collection a year that sells to younger city buyers.\nRoles: design school selects and supervises 2 students (R); Vanita’s designer writes the brief (R); committee approves the range (A); weavers consulted on feasibility (C).\nResources: school: students, studio time; Vanita: yarn, looms, weavers paid full piece rate for samples.\nDecisions: committee final say on what is produced.\nCommunication: fortnightly call; one workshop in the village.\nReporting: sales after one season.\nData: none personal.\nBranding: both names; weavers’ names on pieces (with consent); designs owned by Vanita, students credited."
     },
     "notice": "Notice that weavers are paid in full for samples. When designing roles, check that the people doing the work are not carrying the cost of the experiment."
    },
    {
     "org": "hybrid",
     "profile": {
      "design": "Shared objectives (with a housing association): 10 pop-up repair cafés a year; 60% of visitors from its tenants.\nRoles: Priya leads repairs and safety (R); volunteer coordinator staffs events (R); association’s community officer books rooms and promotes (R); Tom accountable for Riverside (A).\nResources: association: rooms, promotion, £2,000 a year; Riverside: volunteers, tools, insurance.\nDecisions: joint planning meeting twice a year.\nCommunication: monthly email; shared calendar.\nReporting: items fixed and visitor numbers quarterly.\nData: postcodes only, with consent.\nBranding: both logos."
     },
     "notice": "See the target about who comes, not just how many. Shared objectives should say whether the partnership reaches the people it was formed for."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "formalising",
  "title": "Formalising: MoUs and partnership agreements",
  "sheet": "Agreement checklist",
  "learn": [
   "Put the partnership in writing in proportion to its depth and risk. A memorandum of understanding (MoU) records shared intentions and is often not legally binding. A partnership agreement, contract or sub-grant agreement creates legal obligations, especially when money passes between organisations. Whether a document is binding depends on its wording and on local law, so say clearly which you intend.",
   "Typical contents are: parties and purpose; objectives and scope; roles; governance and decisions; money and reporting; compliance (safeguarding, data protection, anti-fraud, code of conduct); intellectual property and branding; confidentiality; risk and liability; how disputes are handled; and duration, review, renewal and ending.",
   "If you pass on funds from a funder, pass down the funder’s conditions to the partner. Use templates as a starting point, check significant agreements with a legal adviser, and keep every signed document in your contracts register (Module 10). Rules differ by country; confirm locally."
  ],
  "weak": "A handshake is enough between friends.",
  "strong": "Pan del Barrio: a short non-binding MoU with the municipal youth programme for referrals; a binding agreement with each fee-paying employer covering fees, payment dates, data and ending; any municipal grant to come under a separate agreement reviewed by a lawyer.",
  "why": "It matches the document to the relationship and keeps money under a binding agreement.",
  "reflect": "Which of your current partnerships has the least clear written basis?",
  "exercise": "Draft the outline of a partnership agreement or MoU.",
  "fields": [
   {
    "key": "type",
    "label": "Instrument and binding status",
    "hint": "MoU or agreement, binding or not, and why."
   },
   {
    "key": "contents",
    "label": "Agreement outline",
    "hint": "Section | key points agreed | still to negotiate."
   }
  ],
  "check": "Is it clear whether your document creates legal obligations?",
  "anatomy": {
   "title": "MoU or agreement?",
   "intro": "A rough guide. The title of a document matters less than what it says; take advice on anything significant.",
   "cols": [
    "",
    "MoU",
    "Partnership agreement or contract"
   ],
   "rows": [
    [
     "Purpose",
     "Records shared intentions and ways of working",
     "Sets out obligations each side must meet"
    ],
    [
     "Usually binding?",
     "Usually not, if it says so clearly",
     "Yes, enforceable by law"
    ],
    [
     "Good for",
     "Networks, referrals, shared events, early-stage partnerships",
     "Money passing between you, services, data sharing, work with children"
    ],
    [
     "Typical length",
     "One to three pages",
     "Longer, with schedules for budget, reporting and policies"
    ],
    [
     "Watch for",
     "Clauses that sound binding, such as payment or exclusivity",
     "Funder conditions to pass down; liability, ending and dispute terms"
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example agreement outlines",
   "intro": "How each organisation chose the right document for one partnership and drafted its main sections.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "type": "A simple site agreement (letter of agreement) with each village head, not binding. We are not registered, so we cannot sign a binding contract yet; the letter records permission and shared rules. Once registered, ask the notary whether the association should sign a fuller agreement.",
      "contents": "Parties and purpose | village, co-founders; restore mangroves at agreed sites | agreed\nSites | two sites per village, mapped | agreed\nRoles | village heads announce days, resolve disputes with pond owners; we plant and monitor | agreed\nChildren’s safety | parental consent, two adults present | agreed\nReporting | survival results at the village meeting | agreed\nDuration | three years, reviewed yearly | still to negotiate: what happens if a site is sold"
     },
     "notice": "Notice the honest limit: an unregistered group says why its document cannot be binding yet and what to ask once it is registered."
    },
    {
     "org": "ngo",
     "profile": {
      "type": "A school partnership agreement with each school, signed by the head teacher and Imara’s director. Not a funding contract, but it covers children’s safety and data, so we want it clear and taken seriously. Our lawyer checked the template; whether it is binding under Kenyan law is to confirm.",
      "contents": "Purpose and scope | weekly club for up to 40 girls, one camp place per club member | agreed\nRoles | Imara runs clubs; school gives room, time and a link teacher | agreed\nSafeguarding | both policies apply; who reports concerns, to whom | agreed\nData | Imara holds girls’ data; school sees its results; parental consent | agreed\nKits | stay with the school if the partnership ends | agreed\nReview and ending | yearly; three months’ notice | still to negotiate: notice when a head teacher changes"
     },
     "notice": "See the clause on kits if the partnership ends. Agreeing ownership of shared assets at the start avoids a hard conversation at the end."
    },
    {
     "org": "social",
     "profile": {
      "type": "A binding agreement with each fee-paying employer, because money moves and graduates’ jobs depend on it. A non-binding MoU with the municipal youth programme for referrals. If the training-place grant comes, a separate agreement reviewed by a lawyer, passing down the municipality’s reporting rules.",
      "contents": "Parties and purpose | Pan del Barrio, employer; hire certified graduates | agreed\nFees and payment | US$7,500 a year in two instalments | agreed\nHiring | interview all certified graduates; formal contracts | agreed\nData | retention data shared with graduates’ consent | agreed\nBranding | employer named on our site | agreed\nEnding | 60 days’ notice | still to negotiate: whether fees are refunded if no graduate is hired"
     },
     "notice": "Copy the open item about refunds. Writing down what is still to negotiate stops it being quietly forgotten until there is a dispute."
    },
    {
     "org": "coop",
     "profile": {
      "type": "A written supply agreement with each retail chain, binding, because unpaid invoices hurt members. A non-binding MoU with the design school, plus a short signed note on who owns designs. The committee approves both; the supply agreement is checked by an adviser.",
      "contents": "Parties and purpose | Vanita, retail chain; supply of handloom saris | agreed\nOrders and quality | minimum order, quality standard, handloom mark | agreed\nPayment | within 45 days; interest on late payment | still to negotiate\nReturns | sale-or-return on up to 20% of new designs | still to negotiate\nBranding | weavers’ names on tags (with consent) | agreed\nDisputes and ending | meeting first, then mediation; 90 days’ notice | agreed"
     },
     "notice": "Notice that payment terms are still under negotiation and called so. For a small supplier facing a large buyer, the payment clause is often the heart of the agreement."
    },
    {
     "org": "hybrid",
     "profile": {
      "type": "The council relationship is a binding contract for services (£30,000 a year), already in our contracts register. With housing associations, a short non-binding MoU plus a binding data-sharing agreement, because tenant data is involved. The trustees’ treasurer reviews contracts; a solicitor checks the council renewal.",
      "contents": "Parties and purpose | Riverside, housing association; pop-up repair cafés for tenants | agreed\nRoles | association books rooms, promotes; Riverside runs repairs safely | agreed\nMoney | £2,000 a year towards costs | agreed\nSafety and insurance | Riverside’s insurance; PAT testing | agreed\nData | separate data-sharing agreement; postcodes only, with consent | agreed\nBranding | both logos | agreed\nReview and ending | yearly; 3 months’ notice | still to negotiate: liability for items damaged at pop-ups"
     },
     "notice": "See how one partnership uses two documents: a light MoU and a binding data agreement. The level of formality can differ within one relationship."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "ethical-bridge-crm",
   "meetings-actions-decisions"
  ],
  "video": null,
  "stage": "Manage",
  "id": "managing",
  "title": "Managing the relationship",
  "sheet": "Relationship plan",
  "learn": [
   "Partnerships are kept alive by relationships between people. Name a relationship owner on each side, agree a rhythm of contact and keep a shared record of commitments, decisions and next steps. When an owner leaves, hand the relationship over in person where you can.",
   "Build trust on purpose: share information early, including bad news; deliver what you promise; credit the partner’s contribution in public; and ask how you are doing as a partner. Plan joint learning and, where useful, support each other’s capacity in both directions.",
   "Manage the whole portfolio. A small organisation cannot maintain many deep partnerships. Review regularly which relationships need more time, which can be lighter and which should end, and match the effort to the value each one brings."
  ],
  "weak": "We meet partners when something goes wrong.",
  "strong": "Imara Girls in Science: each school has a named club coordinator and a link teacher; monthly check-in; a shared one-page action log per school; termly results meeting with the head teacher; a yearly survey asking schools how Imara performs as a partner.",
  "why": "It makes contact routine, records commitments and asks for feedback on Imara itself.",
  "reflect": "When did you last ask a partner how you are doing as a partner?",
  "exercise": "Write a relationship plan for your most important partnership.",
  "fields": [
   {
    "key": "plan",
    "label": "Relationship plan",
    "hint": "Partner | owners on both sides | rhythm | shared records | learning | feedback."
   },
   {
    "key": "portfolio",
    "label": "Portfolio decisions",
    "hint": "Which partnerships need more, less or ending."
   }
  ],
  "check": "Does each important partnership have owners, a rhythm and a shared record of commitments?",
  "gallery": {
   "title": "Five example relationship plans",
   "intro": "How each organisation planned its most important partnership and decided where to put less effort.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "plan": "Village heads (two villages) | Wayan, with Ibu Made for respect and continuity; each village head | visit before each planting day and after each monitoring round | site agreement letters and a notebook of what was agreed, photographed to the shared Drive | invite village heads to one monitoring day a year | ask at each visit: any complaints from families or pond owners?",
      "portfolio": "More: village heads and the school, because without them nothing happens. Lighter: the provincial environment office, until we are registered; one email a term. Keep simple: the nursery, as a supplier. Watch: dive operators, valuable but time-consuming; Sari limits it to one meeting a quarter."
     },
     "notice": "Notice how Ibu Made is added to the village relationship. Pairing a co-founder with a respected elder protects the relationship if one person steps back."
    },
    {
     "org": "ngo",
     "profile": {
      "plan": "14 schools | club coordinator and Brian; head teacher and a link teacher | monthly check-in, termly results meeting | one-page action log per school on the shared drive | yearly teacher workshop with the county education office | yearly survey to head teachers and link teachers on Imara as a partner",
      "portfolio": "More: county education office (teacher workshops, ESO2) and the science centre (camp). Same: universities, schools. Lighter: two local businesses that give small amounts but ask for frequent visibility; move them to one thank-you event a year. End: a mentoring app pilot that took staff time and reached few girls."
     },
     "notice": "See the decision to end the app pilot. Copy the habit of naming at least one relationship that should end or shrink, so time goes where it matters."
    },
    {
     "org": "social",
     "profile": {
      "plan": "8 employers | Diego; each employer’s HR or kitchen manager | call every two months; visit each new graduate’s workplace in the first month | shared spreadsheet of graduates, start dates and follow-ups | yearly breakfast where employers taste new products and give feedback on skills | two questions at each 12-month follow-up: what should we teach better? what should we do differently as a partner?",
      "portfolio": "More: the two fee-paying employers and two that could start paying. Same: the certification body. Lighter: three employers who hired no one in the last year; one call a year. Hold: the municipal programme, until its grant rules are clear."
     },
     "notice": "Copy the tasting breakfast. A routine that matches the partner’s interest, here good bread, keeps the relationship warm without extra meetings."
    },
    {
     "org": "coop",
     "profile": {
      "plan": "Two retail chains | Meera and the committee president Sreeja; each chain’s buyer | monthly sales call; meeting before festival season | order and payment log shared with the committee | buyers visit one village a year to meet weavers | ask buyers each season what sold and why; members asked at the AGM how buyers treat them",
      "portfolio": "More: the design school, for younger designs. Same: retail chains, but renegotiate payment terms. Lighter: the export fair, every second year. New: talk to two other weaver cooperatives about buying yarn together."
     },
     "notice": "Notice members are asked how buyers treat them. In a member-owned organisation, partnership feedback should include the people who do the work."
    },
    {
     "org": "hybrid",
     "profile": {
      "plan": "Leeds City Council waste team | Tom; the council’s waste reduction officer | monthly call; mid-year and year-end reviews | shared action log and quarterly data report | invite the officer to one repair café a year | ask at the year-end review: what does the council need from us next year?",
      "portfolio": "More: housing associations, our best route to low-income households. Same: schools, council. Lighter: local business donors; one thank-you newsletter a quarter instead of visits. Review: the national repair network, worth it for safety guidance; less time on its working groups."
     },
     "notice": "See the question about what the council needs next year. With a powerful funder, asking early lets you shape renewal rather than react to it."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "issue-risk-management"
  ],
  "video": null,
  "stage": "Manage",
  "id": "risk",
  "title": "Partnership risk and conflict resolution",
  "sheet": "Partnership risks",
  "learn": [
   "Partnerships carry their own risks: a partner fails to deliver, misuses funds, harms participants, damages your reputation, becomes dependent on you or leaves suddenly. You also carry risks for them. Use the risk method from Module 10 to rate these risks, give each an owner and add them to your main register.",
   "Disagreement is normal. Agree in advance how it will be handled: raise issues early between the relationship owners, then escalate to leaders or a steering group, use a neutral facilitator if needed, and only as a last resort follow the dispute clause in your agreement. Put timescales on each step.",
   "Separate performance issues from integrity issues. Late reports or weak delivery need support and clear expectations. Fraud, safeguarding concerns or serious data breaches follow your reporting and investigation procedures straight away and may mean suspending the partnership."
  ],
  "weak": "If there is a problem we will end the partnership.",
  "strong": "Vanita Weavers: late payment by a retail chain is in the main risk register, owned by Meera, with a 45-day limit and a stop on new orders after 60 days; disputes go from Meera to the president, then to mediation; any concern about a buyer’s misuse of weavers’ names goes to the committee at once.",
  "why": "It names an owner, sets clear triggers and separates a commercial dispute from a breach of trust.",
  "reflect": "What disagreement with a partner have you been avoiding?",
  "exercise": "Identify partnership risks and agree a conflict resolution path.",
  "fields": [
   {
    "key": "risks",
    "label": "Partnership risks",
    "hint": "Risk | partner | likelihood | impact | owner | mitigation."
   },
   {
    "key": "conflict",
    "label": "Conflict resolution path",
    "hint": "Steps, who is involved and timescales."
   }
  ],
  "check": "Would both partners know what to do when they disagree?",
  "gallery": {
   "title": "Five example partnership risks and conflict paths",
   "intro": "How each organisation rated the risks in its partnerships and agreed what happens when partners disagree.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "risks": "Village head changes and new head withdraws permission | village heads | medium | high | Wayan | written site letters; involve village council, not only the head\nDive operator wants tourist planting or photos of children | dive operators | medium | medium | Sari | written one-page deal; we can refuse money\nPond owners clear restored area | via village heads | medium | high | Wayan | site agreements known to village council; raise early\nNursery supplies wrong species | nursery | low | high | Sari | check species at delivery",
      "conflict": "1. Co-founder speaks with the person concerned within a week. 2. If unresolved, both co-founders meet them, with Ibu Made. 3. For land disputes, ask the village head to mediate using village custom (adat). 4. Any concern about a child’s safety: Sari acts the same day and informs parents; partnership activity paused until resolved."
     },
     "notice": "Notice step three uses village custom to mediate. Copy the idea of using a conflict process your partners already trust."
    },
    {
     "org": "ngo",
     "profile": {
      "risks": "New head teacher cuts club time | schools | medium | high | Brian | school agreement; meet every new head within a month\nMentor harms a girl | universities | low | very high | Achieng (safeguarding lead) | vetting, training, never alone with a girl\nFoundation A ends and no replacement | Foundation A | high | very high | Achieng and treasurer | diversification plan; no new fixed costs on A’s money\nScience centre cancels camp dates | science centre | low | medium | programme manager | booking deposit; backup venue at a school",
      "conflict": "Performance issues: coordinator and link teacher talk within two weeks; then Brian and the head teacher; then Achieng and the county education office if needed. Each step within a month. Safeguarding or fraud: follow our reporting procedure immediately; inform the board chair; suspend the activity while it is looked into."
     },
     "notice": "See how the biggest risk is with a funder, not a delivery partner. Copy this: partnership risks include the partners who pay you."
    },
    {
     "org": "social",
     "profile": {
      "risks": "Employer treats graduates badly (hours, safety) | employers | medium | high | Diego | site visits; graduates can call Diego\nMunicipal programme changes after elections | municipality | medium | medium | Lucía | no fixed costs on municipal money; grant capped\nCertification body raises fees or delays exams | certification body | low | medium | Lucía | book exams early; budget increase\nOne wholesale client is 40% of wholesale | office client | high | medium | salesperson | find two new clients this year",
      "conflict": "1. Diego talks to the employer’s manager within a week. 2. If unresolved, Lucía and the employer’s owner meet. 3. Advisory group gives an independent view. 4. Last resort: end placements under the agreement’s notice clause. A graduate’s safety or rights at risk: Diego acts the same day and helps the graduate leave if needed."
     },
     "notice": "Notice the graduate can call Diego directly. In placement partnerships, give the people placed a route to raise problems themselves."
    },
    {
     "org": "coop",
     "profile": {
      "risks": "Retail chain pays late | retail chains | high | high | Meera | 45-day term; stop new orders at 60 days\nDye-unit grant conditions weaken member control | cooperative department | medium | high | president Sreeja | general body approves conditions\nDesign school uses designs elsewhere | design school | low | medium | designer | signed note on design ownership\nYarn supplier delays before festival season | yarn supplier | medium | high | Meera | order early; second supplier",
      "conflict": "1. Meera raises it with the partner’s contact within a week. 2. President and secretary meet the partner within a month. 3. Committee decides next steps; for big partners, the general body is informed. 4. Mediation under the agreement. Misuse of weavers’ names or fake handloom claims: committee acts at once and may pause sales."
     },
     "notice": "Copy the step that informs members about disputes with big partners. In a cooperative, members should not hear about a lost buyer from someone else."
    },
    {
     "org": "hybrid",
     "profile": {
      "risks": "Council cuts or ends contract | Leeds City Council | medium | high | Tom | renewal talks a year ahead; no new posts on council money\nUnsafe donated electricals sold | business donors | low | very high | Priya | PAT test on receipt; reject if in doubt\nHousing association shares tenant data without consent | housing associations | low | high | volunteer coordinator | data-sharing agreement; postcodes only\nNational network takes positions we disagree with | repair network | low | low | Tom | speak up within the network",
      "conflict": "1. Relationship owners talk within two weeks. 2. Tom and the partner’s manager meet. 3. Chair Helen informed; joint meeting with a neutral facilitator if needed. 4. Dispute clause in the agreement. Safety incident, safeguarding or data breach: follow our procedure that day; report to trustees; pause the activity."
     },
     "notice": "See how the council’s power is managed through timing: talks a year before renewal. With a large funder, the main mitigation is not depending on surprises."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Review",
  "id": "monitoring",
  "title": "Partnership monitoring, health checks and KPIs",
  "sheet": "Health check",
  "learn": [
   "Measure two things: whether the partnership delivers the results it was formed for (using your shared results and a few partnership KPIs), and whether the relationship itself is healthy: trust, communication, fairness, value to each side and shared decisions.",
   "A health check is a short structured conversation or survey, once or twice a year, where both partners rate the relationship on agreed dimensions and discuss what to improve. Use the same questions each time so you can see trends, and agree two or three actions at the end.",
   "Partnership KPIs might include results achieved together, commitments met on time, partner satisfaction and extra resources or reach the partnership brings. Measure value from both sides, not only your own. A partner who stays quiet is not the same as a satisfied one."
  ],
  "weak": "The partnership is going well because no one has complained.",
  "strong": "Pan del Barrio with its eight employers: a yearly health check on five dimensions rated by both sides; KPIs: graduates hired, 75% retained at 12 months, 90% of follow-up visits on time, employer satisfaction at least 4 out of 5; two actions agreed after each check.",
  "why": "It measures both results and the relationship, and both sides give their view.",
  "reflect": "How would your partner rate your organisation as a partner?",
  "exercise": "Design your partnership health check and KPIs.",
  "fields": [
   {
    "key": "health",
    "label": "Health check dimensions",
    "hint": "Dimension | question | rating scale."
   },
   {
    "key": "kpis",
    "label": "Partnership KPIs",
    "hint": "KPI | target | how measured | frequency."
   }
  ],
  "check": "Do you measure the relationship as well as the results, from both sides?",
  "anatomy": {
   "title": "Partnership health check: six dimensions",
   "intro": "Both partners rate each dimension, for example from 1 (poor) to 5 (strong), then discuss the gaps.",
   "cols": [
    "Dimension",
    "Question to ask",
    "Warning sign"
   ],
   "rows": [
    [
     "Trust",
     "Do we share problems and bad news early?",
     "Surprises; issues heard from third parties"
    ],
    [
     "Communication",
     "Is contact regular, clear and in a language both use well?",
     "Missed meetings; one side always chasing"
    ],
    [
     "Fairness",
     "Are money, risk and credit shared fairly?",
     "One side carries the costs or gets the credit"
    ],
    [
     "Value to each side",
     "Is each partner getting what it needs?",
     "Only one partner can name a benefit"
    ],
    [
     "Shared decisions",
     "Are decisions made together, as agreed?",
     "Plans changed without consultation"
    ],
    [
     "Delivery",
     "Do both sides keep their commitments on time?",
     "Repeated delays; actions carried over"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example health checks and KPIs",
   "intro": "How each organisation planned to check the health of a partnership and measure what it delivers.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "health": "Respect | Do we follow village custom and ask before acting? | 1–3 (no / partly / yes)\nCommunication | Do village heads hear from us before each planting day? | 1–3\nFairness | Do families feel the work benefits the village, not just us? | 1–3\nValue | Is the restoration helping with erosion or fishing? | 1–3\nYoung people’s voice | Do the young people say they are listened to? | 1–3",
      "kpis": "Planting days held with village heads’ agreement | 10 a year | our records | twice a year\nSeedling survival at 12 months | at least two-thirds | monitoring sheets | twice a year\nPlanned visits to village heads made | all | notebook | twice a year\nPartners rating us 3 on respect | both village heads | conversation | yearly"
     },
     "notice": "Notice the simple three-point scale and a conversation instead of a survey. A health check for village leaders should fit how they prefer to talk."
    },
    {
     "org": "ngo",
     "profile": {
      "health": "Trust | We raise problems with each other early | 1–5\nCommunication | Monthly check-ins happen and are useful | 1–5\nFairness | Club time and costs are shared fairly | 1–5\nValue to the school | The club helps our girls and teachers | 1–5\nShared decisions | Club plans are agreed with us | 1–5\nDelivery | Both sides keep commitments | 1–5",
      "kpis": "Girls attending at least 75% of sessions | 80% | tablet attendance | termly\nSchools rating overall partnership 4 or more | 12 of 14 | head teacher survey | yearly\nTeachers using hands-on methods after workshops | 2 per school | link teacher report | yearly\nCommitments in the action log met on time | 90% | action log | termly"
     },
     "notice": "See how the school rates the value to itself, not to Imara. Copy this question; it is the one partners most often leave out."
    },
    {
     "org": "social",
     "profile": {
      "health": "Trust | They tell us when a graduate is struggling | 1–5\nCommunication | Contact every two months is enough | 1–5\nFairness | Fees and effort are fair for what each side gets | 1–5\nValue | Graduates meet our skill needs | 1–5\nShared decisions | We are consulted on skills, not curriculum control | 1–5",
      "kpis": "Graduates hired by partner employers | 9 of 12 a year | trainee spreadsheet | each cohort\nRetention at 12 months | 75% | follow-up calls | yearly\nFollow-up visits on time | 90% | Diego’s log | each cohort\nEmployer satisfaction | at least 4 of 5 | yearly health check | yearly\nTraining fees received | US$15,000 | accounts | yearly"
     },
     "notice": "Copy the fairness question about fees. When partners pay, ask them directly whether they think the deal is fair."
    },
    {
     "org": "coop",
     "profile": {
      "health": "Trust | Problems with orders are raised early | 1–5\nCommunication | Order and sales information is shared clearly | 1–5\nFairness | Prices, payment days and returns are fair | 1–5\nValue | Both sides gain from the relationship | 1–5\nRespect for weavers | Buyers present weavers’ work with care and credit | 1–5",
      "kpis": "Average payment days | 45 or fewer | accounts | monthly\nQuality rejection rate on chain orders | under 5% | quality register | quarterly\nOrders from each chain | at or above last year | sales records | each season\nMembers satisfied with buyer relationships | majority at AGM | AGM show of hands | yearly"
     },
     "notice": "Notice payment days measured monthly. Pick the KPI that shows whether the power gap is narrowing, here how long members wait for money."
    },
    {
     "org": "hybrid",
     "profile": {
      "health": "Trust | Problems and changes are shared early | 1–5\nCommunication | Contact is regular and useful | 1–5\nFairness | Targets, data and credit are shared fairly | 1–5\nValue | Each side can name what it gains | 1–5\nShared decisions | Targets and changes are agreed together | 1–5\nDelivery | Both sides keep commitments | 1–5",
      "kpis": "Items repaired at council-funded cafés | 1,500 a year | repair log | quarterly\nKg diverted from landfill | agreed yearly with the council | repair log | quarterly\nVisitors from priority postcodes | 40% | postcode (with consent) | quarterly\nCouncil satisfaction | at least 4 of 5 | yearly health check | yearly\nRiverside’s rating of the council as a partner | at least 4 of 5 | same check | yearly"
     },
     "notice": "See the last KPI: Riverside also rates the council. Measuring both directions makes a power imbalance visible to both sides."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Review",
  "id": "renewal",
  "title": "Renewal, scaling or exit",
  "sheet": "Renewal and exit",
  "learn": [
   "Every partnership should be renewed, changed or ended on purpose, not by drift. At agreed review points, decide whether to renew as it is, deepen, scale to new places, reduce or exit. Base the decision on results, relationship health, strategic fit and the resources it takes.",
   "Plan responsible exits from the start: what happens to participants, assets, data, staff, intellectual property and shared commitments; how you tell people; and how you protect the people you serve from disruption. A good exit keeps trust and reputation, and often leaves the door open for later.",
   "Before scaling, check what made the partnership work and whether those conditions exist elsewhere: a committed person, local trust, a particular funder. Capture what you learned and update your partnership strategy."
  ],
  "weak": "Partnerships continue until funding runs out.",
  "strong": "Riverside Repair Hub: each partnership reviewed yearly against four criteria; the housing association pilot is being extended to a second association after strong first-year results; every agreement includes an exit plan covering volunteer handover, return or deletion of tenant data and a joint message to residents.",
  "why": "It decides on evidence and plans endings before they are needed.",
  "reflect": "Which partnership continues mainly out of habit?",
  "exercise": "Write your renewal criteria and an exit plan template.",
  "fields": [
   {
    "key": "criteria",
    "label": "Renewal criteria",
    "hint": "What evidence leads to renew, scale, reduce or exit."
   },
   {
    "key": "exit",
    "label": "Exit plan",
    "hint": "Participants, assets, data, staff, IP, commitments and communication."
   }
  ],
  "check": "Could you end a partnership without harming the people you serve?",
  "gallery": {
   "title": "Five example renewal criteria and exit plans",
   "intro": "How each organisation decided when to renew, grow or end a partnership, and how to leave without harming the people it serves.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "criteria": "Renew: survival at least two-thirds and village heads still supportive. Scale to a third village: two good years, a village head who asks us, and enough youth leaders. Reduce: dive operator sponsorship if it keeps pushing for tourist planting. Exit: if a site cannot be protected from clearing, or if partners ignore our children’s safety rules.",
      "exit": "Participants: tell young people and parents in person; offer places at the other village’s site. Assets: tools stay with the youth team; seedlings already planted belong to the village. Data: monitoring sheets shared with village heads; children’s contact details deleted. Staff: none. Commitments: finish the planting season. Communication: village meeting, then notice board."
     },
     "notice": "Notice the planted mangroves belong to the village. Copy the habit of saying who owns what was created together before anyone asks."
    },
    {
     "org": "ngo",
     "profile": {
      "criteria": "Renew a school: attendance at least 75%, head teacher rates partnership 4 or more, club time protected. Deepen: link teacher ready to co-lead, so the school can sustain clubs (ESO2). Reduce: club time cut twice in a year. Exit: safeguarding concerns not addressed, or no club time for a term despite escalation.",
      "exit": "Participants: girls finish the term; invited to the holiday camp; parents told by letter and at a meeting. Assets: kits stay with the school; teacher keeps training materials. Data: school keeps its results; girls’ personal data held by Imara under our retention rule. Staff: coordinator moves to another school. IP: club guides shared under an open licence. Communication: joint letter from head teacher and Imara."
     },
     "notice": "See how deepening means handing over to teachers. For Imara, success is a school that no longer needs it, so renewal criteria include the school’s capacity."
    },
    {
     "org": "social",
     "profile": {
      "criteria": "Renew an employer: hired at least one graduate a year, retention at 12 months, no safety or contract concerns. Deepen: hired three or more and willing to pay fees. Scale to a new district: only after the municipal agreement is in place and retention stays at 75%. Exit: an employer breaks contract or safety rules.",
      "exit": "Participants: graduates already working there are offered support to stay or move; no new placements. Assets: none shared. Data: delete the employer’s copies of trainee records where the agreement allows. Staff: none affected. Commitments: honour fees paid for the current cohort. Communication: Diego tells graduates first, then the employer in writing."
     },
     "notice": "Copy the order of communication: graduates first, then the employer. In an exit, tell the people most affected before anyone else."
    },
    {
     "org": "coop",
     "profile": {
      "criteria": "Renew a buyer: payments within 45 days, quality rejections under 5%, prices at or above our fair piece rate. Deepen: buyer agrees seasonal orders planned with members. Reduce: payments late two seasons running. Exit: requests for power-loom products or prices below fair rates; misuse of weavers’ names.",
      "exit": "Participants: members told at a committee meeting and in WhatsApp groups; orders already woven sold through the online shop and exhibitions. Assets: unsold stock returned to the cooperative. Data: weavers’ names and photos removed from the buyer’s materials. IP: designs remain Vanita’s. Commitments: complete orders already accepted. Communication: committee decision recorded; general body informed at the AGM."
     },
     "notice": "Notice the plan for stock already woven. When a buyer leaves, the risk falls on the producers, so the exit plan protects their work first."
    },
    {
     "org": "hybrid",
     "profile": {
      "criteria": "Renew: shared targets met, both sides rate the relationship 4 or more, still serves ESO1. Scale: reach of low-income households at least 40% and a partner willing to share costs. Reduce: costs more volunteer time than it gives in reach. Exit: data or safety breaches, or a partner asking us to compete with paid repairers.",
      "exit": "Participants: residents told at the last two pop-ups and pointed to our main repair café and tool library. Assets: tools return to Riverside; room keys returned. Data: tenant postcodes deleted or returned under the data-sharing agreement. Staff: volunteers redeployed. Commitments: complete the agreed events. Communication: joint message to residents; council informed if it affects targets."
     },
     "notice": "See how residents are directed to another service. A responsible exit tells people where they can still get help."
    }
   ]
  }
 }),
 review("partnership-strategy","Your Partnership Strategy")
 ]
});
