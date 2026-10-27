// Course 1 video texts written by hand: Spanish lesson titles, module introductions and module reviews.
// Lesson video texts (idea, points, example, create) live in lesson-videos.js, one entry per lesson.
window.TITLES_ES = {
  '0.journey': 'Cómo funciona este curso', '0.profile': 'El perfil de tu organización', '0.health-check': 'Diagnóstico inicial de tu organización', '0.start-pack': 'Tu punto de partida',
  '1.purpose': 'Propósito', '1.context': 'Análisis del contexto y del entorno', '1.stakeholders': 'Mapa de actores', '1.vision': 'Visión', '1.mission': 'Misión',
  '1.values': 'Valores en la práctica', '1.form': 'Forma jurídica e identidad', '1.positioning': 'Posicionamiento y ventaja comparativa',
  '1.objectives': 'Objetivos estratégicos: externos e internos', '1.foundation': 'Tu base estratégica',
  '2.understanding': 'Entender la Teoría de Cambio', '2.problem': 'Definir el problema', '2.impact': 'Impacto a largo plazo', '2.outcomes': 'Resultados',
  '2.outputs': 'Productos', '2.activities': 'Actividades', '2.inputs': 'Insumos', '2.assumptions': 'Supuestos, riesgos y evidencia',
  '2.use': 'Prueba, redacta y usa tu Teoría de Cambio', '2.pathway': 'Tu Teoría de Cambio'
};

// Module introduction videos
window.MODULE_VIDEOS = {
  0: {
    en: { idea: 'See the whole journey, describe your organisation and record an honest starting point.', create: 'Your Organisation Profile and a baseline health check.', note: 'This module is free.' },
    es: { idea: 'Mira el recorrido completo, describe tu organización y registra un punto de partida honesto.', create: 'El perfil de tu organización y un diagnóstico inicial.', note: 'Este módulo es gratis.' }
  },
  1: {
    en: { idea: 'Make the connected decisions everything else depends on: why you exist, for whom, and what you will prioritise.', create: 'Your Strategic Foundation: purpose, vision, mission, values, form, positioning and objectives.' },
    es: { idea: 'Toma las decisiones conectadas de las que depende todo lo demás: por qué existes, para quién y qué vas a priorizar.', create: 'Tu base estratégica: propósito, visión, misión, valores, forma, posicionamiento y objetivos.' }
  },
  2: {
    en: { idea: 'Explain how your work could lead to change: work back from the future you want, then test each link.', create: 'Your Theory of Change: one pathway per external objective, with its assumptions.' },
    es: { idea: 'Explica cómo tu trabajo podría generar cambio: parte del futuro que buscas y prueba cada conexión.', create: 'Tu Teoría de Cambio: un camino por cada objetivo externo, con sus supuestos.' }
  }
};

// Module review lessons (0.4, 1.10, 2.10): same layout as a lesson video, without an organisation example.
window.REVIEW_VIDEOS = {
  '0.start-pack': {
    en: { idea: 'Before you move on, read your profile and health check together.', points: ['Check every answer is true today, not hoped for.', 'Keep open questions visible; they are your next steps.', 'You will repeat the health check in Module 13.'], create: 'You check your starting point and download it.' },
    es: { idea: 'Antes de seguir, lee juntos tu perfil y tu diagnóstico.', points: ['Comprueba que cada respuesta sea cierta hoy, no un deseo.', 'Mantén visibles las preguntas abiertas: son tus próximos pasos.', 'Repetirás el diagnóstico en el Módulo 13.'], create: 'Revisas tu punto de partida y lo descargas.' }
  },
  '1.foundation': {
    en: { idea: 'Your Strategic Foundation is one connected set of decisions. Read it as a whole.', points: ['Check purpose, vision and mission tell one story.', 'Make sure every objective fits your mission and values.', 'Share it with someone who will challenge it.'], create: 'You review and download your Strategic Foundation.' },
    es: { idea: 'Tu base estratégica es un conjunto de decisiones conectadas. Léela completa.', points: ['Comprueba que propósito, visión y misión cuenten una sola historia.', 'Asegúrate de que cada objetivo encaje con tu misión y tus valores.', 'Compártela con alguien que la cuestione.'], create: 'Revisas y descargas tu base estratégica.' }
  },
  '2.pathway': {
    en: { idea: 'Read your pathway forwards, from inputs to impact, and test every link.', points: ['Each step should make the next one more likely.', 'Mark the assumptions you have not yet tested.', 'Date it: this is version one, not the final word.'], create: 'You review and download your Theory of Change.' },
    es: { idea: 'Lee tu camino hacia adelante, de los insumos al impacto, y prueba cada conexión.', points: ['Cada paso debería hacer más probable el siguiente.', 'Marca los supuestos que aún no has probado.', 'Ponle fecha: es la versión uno, no la palabra final.'], create: 'Revisas y descargas tu Teoría de Cambio.' }
  }
};
