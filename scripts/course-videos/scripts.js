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

// Spanish versions (tú, Latin American neutral; course names stay in English as on the site).
window.COURSE_VIDEOS_ES = {
  clarify: {
    subtitle: 'Propósito, estrategia y Teoría de Cambio',
    question: '¿Por qué existes y qué cambio quieres ver?',
    problem: 'Con demasiada frecuencia, las buenas ideas se estancan porque la dirección nunca se puso por escrito.',
    promise: 'Este curso te da una forma clara de definirla, una decisión a la vez.',
    modules: {
      0: 'Mira el recorrido completo y registra un punto de partida honesto.',
      1: 'Propósito, visión, misión, valores, posicionamiento y objetivos.',
      2: 'Mapea cómo tu trabajo lleva del problema a un impacto duradero.'
    },
    endLine: 'Una dirección que tu equipo, tu junta directiva y tus financiadores pueden leer.',
    start: 'Empieza con el Módulo 00. Es gratis.'
  },
  organise: {
    subtitle: 'Estructura, personas y sistemas',
    question: '¿Quién hace qué y cómo vas a funcionar?',
    problem: 'Con demasiada frecuencia, todos hacen un poco de todo y nadie sabe bien quién decide.',
    promise: 'Este curso te da una forma clara de diseñar el trabajo antes que los cargos.',
    modules: {
      3: 'Roles, poder de decisión y a quién rinde cuentas cada persona.',
      4: 'Encuentra, apoya y retén a las personas que hacen el trabajo.',
      5: 'Los sistemas mínimos que necesita tu etapa y cómo encajan.'
    },
    endLine: 'Un equipo de dos necesita esta claridad tanto como uno de doscientos.',
    start: 'Empieza con el Módulo 03.'
  },
  'prove-show': {
    subtitle: 'MEAL, marca y comunicación',
    question: '¿Cómo vas a mostrar lo que cambia y quién eres?',
    problem: 'Con demasiada frecuencia, el buen trabajo pasa desapercibido porque faltan la evidencia y la historia.',
    promise: 'Este curso te da una forma clara de medir con honestidad y hablar con una sola voz.',
    modules: {
      6: 'Convierte tu Teoría de Cambio en evidencia que puedes usar.',
      7: 'Una identidad que la gente reconoce y en la que confía.',
      8: 'Llega a las audiencias que tu misión necesita y cuenta historias con ética.'
    },
    endLine: 'Decisiones basadas en evidencia y una historia en la que la gente confía.',
    start: 'Empieza con el Módulo 06.'
  },
  protect: {
    subtitle: 'Finanzas, legal, cumplimiento y riesgos',
    question: '¿Cómo vas a proteger tu dinero, a tu gente y tu misión?',
    problem: 'Con demasiada frecuencia, las políticas se copian, se archivan y se olvidan hasta que algo sale mal.',
    promise: 'Este curso te da una forma clara de gestionar el dinero y los riesgos para ganarte la confianza de los demás.',
    modules: {
      9: 'Presupuestos, flujo de caja, controles e informes.',
      10: 'Las obligaciones, políticas y riesgos que se aplican a ti.'
    },
    note: 'Las obligaciones legales dependen de tu país. Haz revisar los documentos clave por un asesor local calificado.',
    endLine: 'Controles que la gente sigue y políticas que siguen vivas.',
    start: 'Empieza con el Módulo 09.'
  },
  'sustain-run': {
    subtitle: 'Financiamiento, alianzas y plan operativo',
    question: '¿Cómo vas a financiar el trabajo, crear buenas alianzas y gestionar un solo plan?',
    problem: 'Con demasiada frecuencia, los planes viven en documentos y nunca se vuelven práctica diaria.',
    promise: 'Este curso te da una forma clara de convertir tu estrategia en un plan que realmente ejecutas.',
    modules: {
      11: 'El modelo de ingresos que encaja con tu tipo de organización.',
      12: 'Alianzas justas con roles claros, desde la primera reunión hasta la salida.',
      13: 'Un plan operativo con KPIs, un cronograma y un ritmo de revisión.'
    },
    endLine: 'El último paso del Planning System: un plan que tu equipo puede ejecutar.',
    start: 'Empieza con el Módulo 11.'
  }
};
window.MODULES_ES = {
  0: ['Empieza aquí: el recorrido de tu organización', 'Perfil de la organización + diagnóstico inicial'],
  1: ['Fundamentos estratégicos', 'Base estratégica'],
  2: ['Teoría de Cambio', 'Teoría de Cambio'],
  3: ['Estructura, gobernanza y rendición de cuentas', 'Paquete de estructura y rendición de cuentas'],
  4: ['Personas, cultura y voluntariado', 'Plan de personas'],
  5: ['Sistemas internos y operaciones', 'Mapa de sistemas internos'],
  6: ['MEAL: monitoreo, evaluación, rendición de cuentas y aprendizaje', 'Marco MEAL'],
  7: ['Marca, identidad e imagen', 'Plataforma de marca + guía de estilo'],
  8: ['Marketing y comunicación', 'Plan de comunicación'],
  9: ['Gestión financiera', 'Paquete de gestión financiera'],
  10: ['Legal, cumplimiento, políticas y riesgos', 'Paquete de cumplimiento y riesgos'],
  11: ['Fundraising, ingresos y modelos de negocio sostenibles', 'Estrategia de recursos sostenibles'],
  12: ['Alianzas y construcción de ecosistema', 'Estrategia de alianzas'],
  13: ['De la estrategia a la acción: planificar, ejecutar y revisar', 'Plan operativo de la organización']
};
