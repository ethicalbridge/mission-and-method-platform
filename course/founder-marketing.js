// Entrepreneurs' courses: course-end messages, brand support offers, legal templates and references between
// courses, written with the marketing review (Oct 2026). Applied by course/adapt.js and learning.js.
//   courseComplete[courseId] = {heading, body, button}: shown when a learner finishes that course.
//   lessons['<module id>.<lesson id>'] = {templates:{links:[…]}, support:{title, body, button}, bridges:[{to, kind, text}]}
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
   "why": "Turns your list of things to check before you register into clear questions for someone with a legal background.",
   "links": [
    {
     "href": "legal-templates-governance-and-compliance.html",
     "label": "Governance and compliance templates",
     "items": [
      "Legal Review Checklist"
     ]
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
   "body": "Julieta has a legal background and helps founders compare the options for their idea and prepare the right questions for local legal advice. Book a consultation to work through it together.",
   "button": "Book a consultation"
  }
 },
 "103.capabilities": {
  "templates": {
   "why": "When you contract out or share a function, these set out clearly who does what, so you stay accountable for the work.",
   "links": [
    {
     "href": "legal-templates-contracts-and-agreements.html",
     "label": "Contract and agreement templates",
     "items": [
      "Services Agreement",
      "Independent Contractor Agreement",
      "Partnership Memorandum of Understanding"
     ]
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
   "why": "Good governance needs managed conflicts of interest; these give your founders, advisers and future board a simple way to declare and record them.",
   "links": [
    {
     "href": "legal-templates-governance-and-compliance.html",
     "label": "Governance and compliance templates",
     "items": [
      "Board Interest Declaration"
     ]
    },
    {
     "href": "legal-templates-policies.html",
     "label": "Policy templates",
     "items": [
      "Conflict of Interest Policy"
     ]
    }
   ]
  },
  "support": {
   "title": "Setting up your governance?",
   "body": "Julieta helps small founding teams decide who decides what, from an advisory group to a future board. Book a consultation to design yours together.",
   "button": "Book a consultation"
  }
 },
 "104.contracts": {
  "templates": {
   "why": "A starting point for written terms with contractors and anyone who sees confidential information; adapt them and have them reviewed by a qualified lawyer.",
   "links": [
    {
     "href": "legal-templates-contracts-and-agreements.html",
     "label": "Contract and agreement templates",
     "items": [
      "Independent Contractor Agreement",
      "Services Agreement",
      "Mutual Confidentiality Agreement"
     ]
    }
   ]
  }
 },
 "104.onboarding": {
  "templates": {
   "why": "The core policies a new person reads and signs off in their first week, ready to adapt before your first person joins.",
   "links": [
    {
     "href": "legal-templates-policies.html",
     "label": "Policy templates",
     "items": [
      "Safeguarding Policy and Procedure",
      "Privacy Notice",
      "Conflict of Interest Policy"
     ]
    }
   ]
  }
 },
 "105.compliance-essentials": {
  "templates": {
   "why": "Ready-made starting points for the essentials this lesson lists, so you can put them in place before your first activity.",
   "links": [
    {
     "href": "legal-templates-policies.html",
     "label": "Policy templates",
     "items": [
      "Safeguarding Policy and Procedure",
      "Privacy Notice"
     ]
    },
    {
     "href": "legal-templates-consent-forms.html",
     "label": "Consent form templates",
     "items": [
      "Photo and Story Consent Form"
     ]
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
   "why": "Helps you decide how long each type of record is kept and when it is deleted or archived.",
   "links": [
    {
     "href": "legal-templates-governance-and-compliance.html",
     "label": "Governance and compliance templates",
     "items": [
      "Records Retention Schedule"
     ]
    }
   ]
  }
 },
 "105.issues": {
  "templates": {
   "why": "Gives your issue log clear routes for the two issues you will meet first: incidents and complaints.",
   "links": [
    {
     "href": "legal-templates-procedures.html",
     "label": "Procedure templates",
     "items": [
      "Incident Reporting Procedure",
      "Complaints and Feedback Procedure"
     ]
    }
   ]
  }
 },
 "106.data-collection": {
  "templates": {
   "why": "Helps you explain why you collect data and ask for informed consent before your pilot begins.",
   "links": [
    {
     "href": "legal-templates-consent-forms.html",
     "label": "Consent form templates",
     "items": [
      "Research Participation Consent Form",
      "Information Sharing Consent Form"
     ]
    },
    {
     "href": "legal-templates-policies.html",
     "label": "Policy templates",
     "items": [
      "Privacy Notice"
     ]
    }
   ]
  }
 },
 "106.accountability": {
  "templates": {
   "why": "A ready structure for handling complaints fairly, with timescales and a route to someone independent.",
   "links": [
    {
     "href": "legal-templates-procedures.html",
     "label": "Procedure templates",
     "items": [
      "Complaints and Feedback Procedure"
     ]
    }
   ]
  }
 },
 "107.credibility": {
  "templates": {
   "why": "Published policies are trust signals; these help you close that gap before you launch.",
   "links": [
    {
     "href": "legal-templates-policies.html",
     "label": "Policy templates",
     "items": [
      "Privacy Notice",
      "Safeguarding Policy and Procedure"
     ]
    },
    {
     "href": "legal-templates-procedures.html",
     "label": "Procedure templates",
     "items": [
      "Complaints and Feedback Procedure"
     ]
    }
   ]
  }
 },
 "108.storytelling": {
  "templates": {
   "why": "Records informed consent for every story and image, and feeds straight into your consent log.",
   "links": [
    {
     "href": "legal-templates-consent-forms.html",
     "label": "Consent form templates",
     "items": [
      "Photo and Story Consent Form"
     ]
    }
   ]
  }
 },
 "108.website": {
  "templates": {
   "why": "Tells visitors how you handle their data, one of the trust signals your website needs from the first sign-up form.",
   "links": [
    {
     "href": "legal-templates-policies.html",
     "label": "Policy templates",
     "items": [
      "Privacy Notice"
     ]
    }
   ]
  },
  "support": {
   "title": "Support with your website",
   "body": "Julieta has experience in website development, as well as branding and design. If you want a website that presents your brand clearly, along with your documents and presentations, book a consultation and decide together how to work.",
   "button": "Book a consultation"
  }
 },
 "108.reputation": {
  "templates": {
   "why": "When a safeguarding incident or data breach happens, a clear reporting route is the first step of your crisis response.",
   "links": [
    {
     "href": "legal-templates-procedures.html",
     "label": "Procedure templates",
     "items": [
      "Incident Reporting Procedure"
     ]
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
   "why": "Supports fair procurement: declare conflicts when you choose suppliers, and put agreed terms in writing.",
   "links": [
    {
     "href": "legal-templates-policies.html",
     "label": "Policy templates",
     "items": [
      "Conflict of Interest Policy"
     ]
    },
    {
     "href": "legal-templates-governance-and-compliance.html",
     "label": "Governance and compliance templates",
     "items": [
      "Board Interest Declaration"
     ]
    },
    {
     "href": "legal-templates-contracts-and-agreements.html",
     "label": "Contract and agreement templates",
     "items": [
      "Services Agreement"
     ]
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
  ]
 },
 "104.culture": {
  "bridges": [
   {
    "to": "entrepreneurs-clarify",
    "kind": "back",
    "text": "Course 1 · Clarify asks you to describe each value as behaviour, not a word. If you did, use those descriptions as your test here: if respect means paying trainees for training hours, check that your rotas and pay really do it."
   }
  ]
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
   "body": "Julieta helps founders build monitoring and evaluation that a small team can actually run. If you want help with your indicators and plan, book a consultation.",
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
  ]
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
   "body": "Julieta works with founders on budgets, cash flow and simple financial controls they can manage. If you want to build yours together, book a consultation.",
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
   "body": "Julieta helps founders turn their purpose, vision and objectives into a strategy they can act on. If you want to shape yours together, book a consultation.",
   "button": "Book a consultation"
  }
 },
 "102.assumptions": {
  "support": {
   "title": "Check your Theory of Change with Julieta",
   "body": "Julieta works with founders on their Theory of Change: the logic, the assumptions and how to test them before launch. If you want help with yours, book a consultation.",
   "button": "Book a consultation"
  }
 },
 "105.stack": {
  "support": {
   "title": "Help choosing and setting up your tools",
   "body": "Julieta also builds the everyday systems small teams need: shared folders, forms, simple databases and websites. If you want yours set up, book a consultation.",
   "button": "Book a consultation"
  }
 },
 "107.visual": {
  "support": {
   "title": "Want help building your brand?",
   "body": "This course gives you all the information you need, and your work as PDFs. Julieta has experience in branding, design and website development: if you want your own brand built, so your documents, presentations and website all carry it, she can do it for you or with you.",
   "button": "Book a consultation"
  }
 },
 "110.policy-needs": {
  "support": {
   "title": "Help adapting your policies",
   "body": "Julieta has a legal background and helps founders work out which policies they need and adapt the templates to their work. Final documents should still be reviewed by a qualified lawyer where you operate.",
   "button": "Book a consultation"
  }
 }
};
