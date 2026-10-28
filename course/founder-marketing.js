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
      "Legal review checklist"
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
  ]
 },
 "103.capabilities": {
  "templates": {
   "why": "When you contract out or share a function, these set out clearly who does what, so you stay accountable for the work.",
   "links": [
    {
     "href": "legal-templates-contracts-and-agreements.html",
     "label": "Contract and agreement templates",
     "items": [
      "Services agreement",
      "Independent contractor agreement",
      "Partnership memorandum"
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
      "Board interest declaration"
     ]
    },
    {
     "href": "legal-templates-policies.html",
     "label": "Policy templates",
     "items": [
      "Conflict of interest policy"
     ]
    }
   ]
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
      "Independent contractor agreement",
      "Services agreement",
      "Mutual confidentiality agreement"
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
      "Safeguarding policy",
      "Privacy notice",
      "Conflict of interest policy"
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
      "Safeguarding policy",
      "Privacy notice"
     ]
    },
    {
     "href": "legal-templates-consent-forms.html",
     "label": "Consent form templates",
     "items": [
      "Photo and story consent"
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
      "Records retention schedule"
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
      "Incident reporting procedure",
      "Complaints procedure"
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
      "Research participation consent",
      "Information sharing consent"
     ]
    },
    {
     "href": "legal-templates-policies.html",
     "label": "Policy templates",
     "items": [
      "Privacy notice"
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
      "Complaints procedure"
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
      "Privacy notice",
      "Safeguarding policy"
     ]
    },
    {
     "href": "legal-templates-procedures.html",
     "label": "Procedure templates",
     "items": [
      "Complaints procedure"
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
      "Photo and story consent"
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
      "Privacy notice"
     ]
    }
   ]
  },
  "support": {
   "title": "Support with your website",
   "body": "This lesson gives you the structure and the steps, and your website plan is saved as a PDF. I have experience in website development, as well as branding and design. If you would like support to build your brand and a website that presents it clearly, along with your documents and presentations, book a consultation and we can decide together how to work.",
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
      "Incident reporting procedure"
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
      "Conflict of interest policy"
     ]
    },
    {
     "href": "legal-templates-governance-and-compliance.html",
     "label": "Governance and compliance templates",
     "items": [
      "Board interest declaration"
     ]
    },
    {
     "href": "legal-templates-contracts-and-agreements.html",
     "label": "Contract and agreement templates",
     "items": [
      "Services agreement"
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
 "107.visual": {
  "support": {
   "title": "Want help building your brand?",
   "body": "This course gives you all the information you need to shape your visual identity, and everything you write here is saved as a PDF. I have experience in branding, design and website development. If you would like support to build your own brand, so that your documents, presentations and website are all presented in it, book a consultation. I can build it for you or with you.",
   "button": "Book a consultation"
  }
 },
 "107.brand-platform": {
  "support": {
   "title": "Bring your brand to life",
   "body": "You now have your brand platform, your voice and the first rules of your visual identity, and your work is ready to download as a PDF. Turning it into a finished brand is design work, and it is work I know well: I have experience in branding, design and website development. If you want your documents, presentations and website to carry your brand from the start, send me a consult request.",
   "button": "Send me a consult request"
  }
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
  ]
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
  ]
 },
 "110.whistleblowing": {
  "bridges": [
   {
    "to": "entrepreneurs-prove-show",
    "kind": "back",
    "text": "If you took Course 3 · Prove & Show, you designed a feedback and complaints mechanism for the people you serve. This lesson adds what sits behind it: an independent route for serious concerns such as abuse or fraud, and a record of every incident."
   }
  ]
 }
};
