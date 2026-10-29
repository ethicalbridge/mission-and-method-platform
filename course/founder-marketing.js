// Entrepreneurs' courses: course-end messages, brand support offers, legal templates and references between
// courses, written with the marketing review (Oct 2026). Applied by course/adapt.js and learning.js.
//   courseComplete[courseId] = {heading, body, button}: shown when a learner finishes that course.
//   lessons['<module id>.<lesson id>'] = {templates:{links:[{href,label,note,tag}]}, support:{title, body, button}, bridges:[{to, kind, text}]}
export const courseComplete={
 "entrepreneurs-clarify": {
  "heading": "You have finished Clarify",
  "body": "Well done. You now have a clear purpose, vision and mission, a picture of your context and stakeholders, values you can live by, a preferred organisational form, your first objectives and a Theory of Change ready to test. If you have doubts, or want to go deeper into any of it, send me a consult request and we can work on it together.",
  "button": "Send me a consult request"
 },
 "entrepreneurs-organise": {
  "heading": "Organise is complete",
  "body": "Well done. You now know who decides, who does the work and how it will run: your structure and governance, role cards and decision rights, a people plan and the minimum systems you need to start well. If something still feels unclear, or you want help putting it into practice, send me a consult request and we can work through it together.",
  "button": "Request a consultation"
 },
 "entrepreneurs-prove-show": {
  "heading": "Well done, Prove & Show is complete",
  "body": "You now have a MEAL plan that will show what is working, a brand people can recognise and trust, and a communications plan to reach the people your idea needs. If you have questions, or want to go deeper into your evidence, your brand or your communications, send me a consult request and we can work on it together.",
  "button": "Send a consult request"
 },
 "entrepreneurs-protect": {
  "heading": "Congratulations, you have finished Protect!",
  "body": "You now have a first budget and cash flow forecast, financial controls, a legal map, the policies and procedures you need to start safely and a risk register with clear owners. If you have doubts, or want to go deeper into any part of it, send me a consult request and we can work on it together.",
  "button": "Send me a consult request"
 }
};
export const lessons={
 "101.form": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-governance-and-compliance.html#governing-document-guide",
     "label": "Governing Document Guide and Model Constitution",
     "note": "Explains the main legal forms and what a founding document must cover, with a model constitution you can compare against the options you are weighing.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-governance-and-compliance.html#legal-review-checklist",
     "label": "Legal Review Checklist",
     "note": "Turns your list of things to check before you register into clear questions for someone with a legal background.",
     "tag": "Free",
     "items": []
    },
    {
     "href": "legal-templates-contracts-and-agreements.html#co-founder-agreement",
     "label": "Co-founder Agreement",
     "note": "If more than one person is founding, this settles roles, decisions and ownership or governance seats before you register.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    }
   ]
  },
  "bridges": [
   {
    "to": "entrepreneurs-organise",
    "kind": "ahead",
    "text": "The form you lean towards here decides who will govern you. In Course 2 · Organise you will design that governance: an advisory group like the bakery's, a board later on, and the decisions co-founders must always take together."
   }
  ],
  "support": {
   "title": "Choosing your legal form?",
   "body": "I have a legal background and help founders compare the options for their idea. Together we can prepare the right questions for local legal advice.",
   "button": "Book a consultation"
  }
 },
 "103.capabilities": {
  "templates": {
   "why": "When you contract out or share a function, these set out clearly who does what, so you stay accountable for the work.",
   "links": [
    {
     "href": "legal-templates-contracts-and-agreements.html#services-agreement",
     "label": "Services Agreement",
     "items": []
    },
    {
     "href": "legal-templates-contracts-and-agreements.html#independent-contractor-agreement",
     "label": "Independent Contractor Agreement",
     "items": []
    },
    {
     "href": "legal-templates-contracts-and-agreements.html#partnership-memorandum-of-understanding",
     "label": "Partnership Memorandum of Understanding",
     "items": []
    }
   ]
  },
  "bridges": [
   {
    "to": "entrepreneurs-clarify",
    "kind": "back",
    "text": "If you took Course 1 · Clarify, your objectives and Theory of Change table are the list to work from: each activity points to a capability you will need. If not, start from the three or four results you most want in your first year."
   }
  ]
 },
 "103.governance": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-governance-and-compliance.html#governing-document-guide",
     "label": "Governing Document Guide and Model Constitution",
     "note": "Helps with your founding document checks: what your governing document must say about your governing body, members and decisions.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-governance-and-compliance.html#governing-body-terms-of-reference",
     "label": "Governing Body Terms of Reference",
     "note": "Sets out what your board, committee or advisory group decides, who sits on it and how it meets.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#conflict-of-interest-policy",
     "label": "Conflict of Interest Policy",
     "note": "Gives founders, advisers and a future board a simple way to declare and manage conflicts of interest.",
     "tag": "Free",
     "items": []
    }
   ]
  },
  "support": {
   "title": "Setting up your governance?",
   "body": "I help small founding teams decide who decides what, from an advisory group to a future board. We can design yours together.",
   "button": "Book a consultation"
  }
 },
 "104.contracts": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-contracts-and-agreements.html#employment-contract",
     "label": "Employment Contract",
     "note": "A starting point for written terms with anyone you will employ: job, pay, hours, leave and how it ends.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-contracts-and-agreements.html#volunteer-agreement",
     "label": "Volunteer Agreement",
     "note": "Records what you offer volunteers and what you ask of them, without creating an employment relationship by accident.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    },
    {
     "href": "legal-templates-contracts-and-agreements.html#independent-contractor-agreement",
     "label": "Independent Contractor Agreement",
     "note": "For freelancers and consultants: the work, fees, deadlines and who owns what they produce.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  },
  "support": {
   "title": "Not sure which terms each person needs?",
   "body": "I can help you work out who should be an employee, a contractor or a volunteer, and adapt the agreements to your work. We will also note what to check with a lawyer where you operate.",
   "button": "Talk it through with me"
  }
 },
 "104.onboarding": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#code-of-conduct",
     "label": "Code of Conduct",
     "note": "The first document a new person reads and signs: the behaviour expected of everyone who works with you.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#safeguarding-policy-and-procedure",
     "label": "Safeguarding Policy and Procedure",
     "note": "Make sure every new person knows how you keep people safe and how to report a concern from day one.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#conflict-of-interest-policy",
     "label": "Conflict of Interest Policy",
     "note": "A short policy new people sign off in their first week, so interests are declared early.",
     "tag": "Free",
     "items": []
    }
   ]
  }
 },
 "105.compliance-essentials": {
  "templates": {
   "why": "Ready-made starting points for the essentials this lesson lists, so you can put them in place before your first activity.",
   "links": [
    {
     "href": "legal-templates-policies.html#safeguarding-policy-and-procedure",
     "label": "Safeguarding Policy and Procedure",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#privacy-notice",
     "label": "Privacy Notice",
     "items": []
    },
    {
     "href": "legal-templates-consent-forms.html#photo-and-story-consent-form",
     "label": "Photo and Story Consent Form",
     "items": []
    }
   ]
  },
  "bridges": [
   {
    "to": "entrepreneurs-protect",
    "kind": "ahead",
    "text": "These essentials are deliberately short. In Course 4 · Protect you will turn the ones you need into full policies and procedures, such as safeguarding for 17-year-old trainees and data protection for their records, from templates you adapt to local law."
   }
  ]
 },
 "105.information": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-governance-and-compliance.html#records-retention-schedule",
     "label": "Records Retention Schedule",
     "note": "Helps you decide how long each type of record is kept and when it is deleted or archived.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#data-protection-policy",
     "label": "Data Protection Policy",
     "note": "Sets the rules your access levels and retention choices must follow when files hold personal information.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    }
   ]
  }
 },
 "105.issues": {
  "templates": {
   "why": "Gives your issue log clear routes for the two issues you will meet first: incidents and complaints.",
   "links": [
    {
     "href": "legal-templates-policies.html#incident-reporting-procedure",
     "label": "Incident Reporting Procedure",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#complaints-and-feedback-procedure",
     "label": "Complaints and Feedback Procedure",
     "items": []
    }
   ]
  }
 },
 "106.data-collection": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-consent-forms.html#research-participation-consent-form",
     "label": "Research Participation Consent Form",
     "note": "Helps you explain why you collect data and ask for informed consent before your pilot begins.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#privacy-notice",
     "label": "Privacy Notice",
     "note": "Tells participants what you collect, why, who sees it and how long you keep it.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    },
    {
     "href": "legal-templates-governance-and-compliance.html#data-protection-impact-assessment",
     "label": "Data Protection Impact Assessment",
     "note": "Use it before your pilot starts to spot and reduce privacy risks in your data collection plan.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "106.accountability": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#complaints-and-feedback-procedure",
     "label": "Complaints and Feedback Procedure",
     "note": "A ready structure for handling complaints fairly, with timescales and a route to someone independent.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    },
    {
     "href": "legal-templates-governance-and-compliance.html#independent-contact-role-note",
     "label": "Independent Contact Role Note",
     "note": "Sets up the trusted, independent person who receives concerns about the founder, which matters most when the team is small.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "107.credibility": {
  "templates": {
   "why": "Published policies are trust signals; these help you close that gap before you launch.",
   "links": [
    {
     "href": "legal-templates-policies.html#privacy-notice",
     "label": "Privacy Notice",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#safeguarding-policy-and-procedure",
     "label": "Safeguarding Policy and Procedure",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#complaints-and-feedback-procedure",
     "label": "Complaints and Feedback Procedure",
     "items": []
    }
   ]
  }
 },
 "108.storytelling": {
  "templates": {
   "why": "Records informed consent for every story and image, and feeds straight into your consent log.",
   "links": [
    {
     "href": "legal-templates-consent-forms.html#photo-and-story-consent-form",
     "label": "Photo and Story Consent Form",
     "items": []
    }
   ]
  }
 },
 "108.website": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#privacy-notice",
     "label": "Privacy Notice",
     "note": "Tells visitors how you handle their data, from the first sign-up form.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#cookie-policy",
     "label": "Cookie Policy",
     "note": "Explains the cookies your site uses, such as analytics, and how visitors can refuse them.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-contracts-and-agreements.html#website-terms-of-use",
     "label": "Website Terms of Use",
     "note": "The terms that apply when people use your site, with optional sections for online donations or sales.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  },
  "support": {
   "title": "Support with your website",
   "body": "I build websites, brands and designs for purpose-led organisations. If you want a site that presents your brand clearly, along with your documents and presentations, we can decide together how to work.",
   "button": "Book a consultation"
  }
 },
 "108.reputation": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#social-media-and-communications-policy",
     "label": "Social Media and Communications Policy",
     "note": "Gives you the social media rules this exercise asks for, including how to respond when something goes wrong online.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-governance-and-compliance.html#business-continuity-and-crisis-plan",
     "label": "Business Continuity and Crisis Plan",
     "note": "Who decides, who speaks and what keeps running when a crisis hits.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#incident-reporting-procedure",
     "label": "Incident Reporting Procedure",
     "note": "When a safeguarding incident or data breach happens, a clear reporting route is the first step of your crisis response.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  },
  "bridges": [
   {
    "to": "entrepreneurs-protect",
    "kind": "ahead",
    "text": "In Course 4 · Protect you will build a risk register. The crisis scenarios you list here, such as an allergen mistake or a data breach, belong in it, each with an owner, early warning signs and controls that make it less likely."
   }
  ]
 },
 "109.controls": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#financial-controls-policy",
     "label": "Financial Controls Policy",
     "note": "Puts your control map into rules: who approves, who pays, who checks and what is recorded.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#procurement-policy",
     "label": "Procurement Policy",
     "note": "Gives you procurement thresholds to adapt: how many quotes, and who approves at each level.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#conflict-of-interest-policy",
     "label": "Conflict of Interest Policy",
     "note": "Declare conflicts when you choose suppliers, such as a relative who could supply you.",
     "tag": "Free",
     "items": []
    }
   ]
  },
  "bridges": [
   {
    "to": "entrepreneurs-organise",
    "kind": "back",
    "text": "Course 2 · Organise is where you draft your delegation of authority, and its limits become the approval rules here. If you have not written one yet, begin with a single line: who may approve a payment, up to how much, and who checks it."
   }
  ]
 },
 "102.inputs": {
  "bridges": [
   {
    "to": "entrepreneurs-protect",
    "kind": "ahead",
    "text": "In Course 4 · Protect you will cost this list properly. Each input becomes a line in your first-year budget and cash flow forecast, so gaps such as kitchen rent or trainee pay become numbers you can plan for."
   }
  ]
 },
 "102.outcomes": {
  "bridges": [
   {
    "to": "entrepreneurs-prove-show",
    "kind": "ahead",
    "text": "The evidence you note for each outcome is the seed of your indicators. In Course 3 · Prove & Show you will turn signals like 'can run the morning bake without help' into indicators with baselines and targets you track from the pilot."
   }
  ]
 },
 "103.delegation": {
  "bridges": [
   {
    "to": "entrepreneurs-protect",
    "kind": "ahead",
    "text": "In Course 4 · Protect you will use these same limits in your financial controls: who approves a payment, who signs as second signatory and who checks the bank statements each month, so the matrix you draft here keeps money safe."
   }
  ],
  "templates": {
   "links": [
    {
     "href": "legal-templates-governance-and-compliance.html#delegation-of-authority-matrix",
     "label": "Delegation of Authority Matrix",
     "note": "A ready table for exactly this exercise: who can approve which decisions, and up to what amount.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#financial-controls-policy",
     "label": "Financial Controls Policy",
     "note": "Shows how your spending limits become approval rules for payments, so the matrix and your finance rules match.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    }
   ]
  }
 },
 "104.culture": {
  "bridges": [
   {
    "to": "entrepreneurs-clarify",
    "kind": "back",
    "text": "Course 1 · Clarify asks you to describe each value as behaviour, not a word. If you did, use those descriptions as your test here: if respect means paying trainees for training hours, check that your rotas and pay really do it."
   }
  ],
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#equality-diversity-and-inclusion-policy",
     "label": "Equality, Diversity and Inclusion Policy",
     "note": "Puts your inclusion measures in writing, so they show in how you recruit, pay and treat people.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#anti-harassment-intimidation-and-bullying-policy-and-procedure",
     "label": "Anti-Harassment, Intimidation and Bullying Policy and Procedure",
     "note": "Gives everyone a safe route to raise harassment or bullying, including concerns about a founder.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "106.results-framework": {
  "bridges": [
   {
    "to": "entrepreneurs-clarify",
    "kind": "back",
    "text": "If you took Course 1 · Clarify, your Theory of Change table is your starting point: copy across the outputs and outcomes you can monitor in your pilot, keeping their codes. If you did not, Course 1 builds that pathway step by step."
   }
  ]
 },
 "106.meal-plan": {
  "bridges": [
   {
    "to": "entrepreneurs-protect",
    "kind": "ahead",
    "text": "In Course 4 · Protect you will give MEAL its own line in your first-year budget, so the time spent counting loaves, following up trainees and running reviews is paid for and visible, not squeezed in around everything else."
   }
  ],
  "support": {
   "title": "A MEAL plan your team can keep up",
   "body": "I help founders build monitoring and evaluation that a small team can actually run. If you want help with your indicators and plan, send me a consult request.",
   "button": "Book a consultation"
  }
 },
 "107.consistency": {
  "bridges": [
   {
    "to": "entrepreneurs-organise",
    "kind": "back",
    "text": "If you took Course 2 · Organise, add brand decisions to your delegation of authority and RACI: who approves a new name, a partner's logo or a trainee's story. If not, one line naming the brand owner and what they approve is enough to start."
   }
  ],
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#social-media-and-communications-policy",
     "label": "Social Media and Communications Policy",
     "note": "Records who may post, approve and speak for you, so your brand rules have an owner.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "109.core-budget": {
  "bridges": [
   {
    "to": "entrepreneurs-clarify",
    "kind": "back",
    "text": "If you took Course 1 · Clarify, the inputs in your Theory of Change are your first list of costs, and your objective codes let you set the budget out by objective. If not, list the resources your first year needs before you cost them."
   }
  ],
  "support": {
   "title": "Want help with your first budget?",
   "body": "I work with founders on budgets, cash flow and simple financial controls they can manage. If you want to build yours together, send me a consult request.",
   "button": "Book a consultation"
  }
 },
 "110.whistleblowing": {
  "bridges": [
   {
    "to": "entrepreneurs-prove-show",
    "kind": "back",
    "text": "If you took Course 3 · Prove & Show, you designed a feedback and complaints mechanism for the people you serve. This lesson adds what sits behind it: an independent route for serious concerns such as abuse or fraud, and a record of every incident."
   }
  ]
 },
 "101.objectives": {
  "support": {
   "title": "Want a second pair of eyes on your strategy?",
   "body": "I help founders turn their purpose, vision and objectives into a strategy they can act on. If you want to shape yours together, send me a consult request.",
   "button": "Book a consultation"
  }
 },
 "102.assumptions": {
  "support": {
   "title": "Check your Theory of Change with me",
   "body": "I work with founders on the logic of their Theory of Change, its assumptions and how to test them before launch. If you want help with yours, I am happy to look at it with you.",
   "button": "Book a consultation"
  }
 },
 "105.stack": {
  "support": {
   "title": "Help choosing and setting up your tools",
   "body": "I also build the everyday systems small teams need: shared folders, forms, simple databases and websites. If you want yours set up, let me know.",
   "button": "Book a consultation"
  },
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#it-and-information-security-policy",
     "label": "IT and Information Security Policy",
     "note": "Turns the risks in your tool inventory into practical rules: passwords, two-step sign-in, devices and backups.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-governance-and-compliance.html#data-protection-impact-assessment",
     "label": "Data Protection Impact Assessment",
     "note": "A short form to check privacy risks before you adopt a new tool that will hold personal information.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "107.visual": {
  "support": {
   "title": "Want help building your brand?",
   "body": "This course gives you what you need, and your work as PDFs. If you want your brand built so your documents, presentations and website all carry it, I can do it for you or with you.",
   "button": "Book a consultation"
  }
 },
 "110.policy-needs": {
  "support": {
   "title": "Help adapting your policies",
   "body": "I have a legal background and help founders work out which policies they need and adapt the templates to their work. Final documents should still be reviewed by a qualified lawyer where you operate.",
   "button": "Book a consultation"
  }
 },
 "101.stakeholders": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-contracts-and-agreements.html#partnership-memorandum-of-understanding",
     "label": "Partnership Memorandum of Understanding",
     "note": "When a stakeholder becomes a partner, such as an organisation that refers people to you, this records who does what before you start working together.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "101.values": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#code-of-conduct",
     "label": "Code of Conduct",
     "note": "Turns the behaviours you describe for each value into the standards everyone who works with you agrees to follow.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    }
   ]
  }
 },
 "103.board": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-governance-and-compliance.html#board-member-role-description",
     "label": "Board Member Role Description",
     "note": "Spells out what you will expect of each board or advisory group member, so you can recruit them and agree reserved matters with them.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-governance-and-compliance.html#board-meeting-agenda-and-minutes",
     "label": "Board Meeting Agenda and Minutes",
     "note": "A ready agenda and minutes format for the meetings in your governance calendar, with a log of decisions.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-governance-and-compliance.html#board-interest-declaration",
     "label": "Board Interest Declaration",
     "note": "The form each board member completes when they join and every year, so conflicts are known before decisions are made.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "103.roles": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-contracts-and-agreements.html#co-founder-agreement",
     "label": "Co-founder Agreement",
     "note": "Puts the founders’ role cards into a written agreement: who leads what, how you decide together and what happens if someone steps back.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    }
   ]
  }
 },
 "104.recruitment": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#safer-recruitment-procedure",
     "label": "Safer Recruitment Procedure",
     "note": "Gives you the safer recruitment steps the exercise asks for: references, identity and background checks where the law allows.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#equality-diversity-and-inclusion-policy",
     "label": "Equality, Diversity and Inclusion Policy",
     "note": "Helps you set fair selection criteria and remove barriers before you advertise your first role.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "104.checkins": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#disciplinary-and-grievance-procedure",
     "label": "Disciplinary and Grievance Procedure",
     "note": "Gives you a fair, step-by-step route for the performance and conduct concerns you plan for here, and for concerns staff raise.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "104.volunteers": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-contracts-and-agreements.html#volunteer-agreement",
     "label": "Volunteer Agreement",
     "note": "Includes a volunteer role description and agreement, ready for the role you design in this exercise.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#safer-recruitment-procedure",
     "label": "Safer Recruitment Procedure",
     "note": "Checks to add to your volunteer journey when volunteers will work with children or adults at risk.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "105.finance-overview": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#financial-controls-policy",
     "label": "Financial Controls Policy",
     "note": "Sets out the controls this lesson describes: approvals, two signatories, bank checks and records.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#finance-procedures",
     "label": "Finance Procedures",
     "note": "A step-by-step finance manual you can cut down to the few routines you need at the start.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "106.evaluation": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-consent-forms.html#research-participation-consent-form",
     "label": "Research Participation Consent Form",
     "note": "For the interviews, surveys and focus groups in your evaluation plan.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-contracts-and-agreements.html#independent-contractor-agreement",
     "label": "Independent Contractor Agreement",
     "note": "If an outside evaluator does the work, this sets out the scope, fees, deadlines and who owns the findings.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "108.social": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#social-media-and-communications-policy",
     "label": "Social Media and Communications Policy",
     "note": "Covers the safety and conduct rules this exercise asks for: who posts, how you moderate and what you never share.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "108.email": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-consent-forms.html#fundraising-and-communications-consent-form",
     "label": "Fundraising and Communications Consent Form",
     "note": "A sign-up form that lets supporters choose how you may contact them, which your welcome journey depends on.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#privacy-notice",
     "label": "Privacy Notice",
     "note": "Link to it from every sign-up form and newsletter footer.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    }
   ]
  }
 },
 "109.restricted": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-governance-and-compliance.html#grant-acceptance-checklist",
     "label": "Grant Acceptance Checklist",
     "note": "Check the conditions before you sign, so you only accept money you can spend and report on as agreed.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-contracts-and-agreements.html#gift-and-donation-agreement",
     "label": "Gift and Donation Agreement",
     "note": "Records what a donor’s gift is for and any restriction on it, so your funds register is accurate from the start.",
     "tag": "$9 or in a pack",
     "items": []
    },
    {
     "href": "legal-templates-policies.html#gift-acceptance-policy",
     "label": "Gift Acceptance Policy",
     "note": "Helps you decide which gifts and donations you will accept and which you will turn down.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  },
  "support": {
   "title": "Funding with conditions attached?",
   "body": "I can go through your first grant or donation terms with you, set up a simple funds register and check you can deliver what you promise before you sign.",
   "button": "Book a consultation"
  }
 },
 "109.audit": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-policies.html#reserves-policy",
     "label": "Reserves Policy",
     "note": "A model for the first reserves policy this exercise asks you to write: why you hold reserves, how much and who decides.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 },
 "110.risk-register": {
  "templates": {
   "links": [
    {
     "href": "legal-templates-governance-and-compliance.html#risk-register",
     "label": "Risk Register",
     "note": "A ready register to adapt: score each risk, name an owner and record controls and early warning signs.",
     "tag": "In Start-up Legal Essentials",
     "items": []
    },
    {
     "href": "legal-templates-governance-and-compliance.html#business-continuity-and-crisis-plan",
     "label": "Business Continuity and Crisis Plan",
     "note": "For your highest risks: how you keep the most important work going if one of them happens.",
     "tag": "$9 or in a pack",
     "items": []
    }
   ]
  }
 }
};
