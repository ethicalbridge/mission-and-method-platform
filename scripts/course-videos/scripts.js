// Scripts for the five course introduction videos.
// Copy follows the Brand Manual voice: plain British English, second person, no hype.
// Module numbers, titles, outputs, lesson counts and hours are filled in from course-data.js by render.py.
window.COURSE_VIDEOS = {
  clarify: {
    question: 'Why do you exist, and what change do you want to see?',
    problem: 'Too often, good ideas stall because the direction was never written down.',
    promise: 'This course gives you a clear way to set it, one decision at a time.',
    modules: {
      0: 'See the whole journey and record an honest starting point.',
      1: 'Purpose, vision, mission, values, positioning and objectives.',
      2: 'Map how your work leads from the problem to lasting impact.'
    },
    endLine: 'A direction your team, board and funders can read.',
    start: 'Start with Module 00. It is free.'
  },
  organise: {
    question: 'Who does what, and how will you run?',
    problem: 'Too often, everyone does a bit of everything and no one is sure who decides.',
    promise: 'This course gives you a clear way to design the work before the job titles.',
    modules: {
      3: 'Roles, decision rights and who answers to whom.',
      4: 'Find, support and keep the people who do the work.',
      5: 'The minimum systems your stage needs, and how they fit.'
    },
    endLine: 'A team of two needs this clarity as much as a team of two hundred.',
    start: 'Start with Module 03.'
  },
  'prove-show': {
    question: 'How will you show what changes, and who you are?',
    problem: 'Too often, good work goes unseen because the evidence and the story are missing.',
    promise: 'This course gives you a clear way to measure honestly and speak with one voice.',
    modules: {
      6: 'Turn your Theory of Change into evidence you can use.',
      7: 'An identity people recognise and trust.',
      8: 'Reach the audiences your mission needs, and tell stories ethically.'
    },
    moduleTitles: { 6: 'MEAL: Monitoring, Evaluation, Accountability & Learning' },
    endLine: 'Decisions backed by evidence, and a story people trust.',
    start: 'Start with Module 06.'
  },
  protect: {
    question: 'How will you protect your money, your people and your mission?',
    problem: 'Too often, policies are copied, filed and forgotten until something goes wrong.',
    promise: 'This course gives you a clear way to manage money and risk well enough to earn trust.',
    modules: {
      9: 'Budgets, cash flow, controls and reporting.',
      10: 'The duties, policies and risks that apply to you.'
    },
    note: 'Legal duties depend on your country. Have key documents reviewed by a qualified local adviser.',
    endLine: 'Controls people follow, and policies that stay alive.',
    start: 'Start with Module 09.'
  },
  'sustain-run': {
    question: 'How will you fund the work, partner well and run one plan?',
    problem: 'Too often, plans live in documents and never become daily practice.',
    promise: 'This course gives you a clear way to turn your strategy into a plan you run.',
    modules: {
      11: 'The income model that fits your kind of organisation.',
      12: 'Fair partnerships with clear roles, from the first meeting to exit.',
      13: 'One operating plan, with KPIs, a timeline and a review rhythm.'
    },
    endLine: 'The last step of the Planning System: one plan your team can run.',
    start: 'Start with Module 11.'
  }
};
