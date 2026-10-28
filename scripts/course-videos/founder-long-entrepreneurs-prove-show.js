// Longer lesson videos (entrepreneurs), Prove & Show (modules 106–108): the `long` block adds scenes for what it is,
// its parts with examples, why it matters, how you will use it and what to avoid. Shape follows founder-long-pilot.js.
(function(){
 const add=(key,lang,long)=>{(window.LESSON_VIDEOS[key]||={})[lang]={...(window.LESSON_VIDEOS[key]?.[lang]||{}),long};};

 // ── Module 6: MEAL ─────────────────────────────────────────────────────────
 add('106.system','en',{
  what:"MEAL stands for Monitoring, Evaluation, Accountability and Learning. It is a light system that tells you whether you are doing what you said, whether it makes a difference and what to change.",
  parts:{title:"Four parts, four questions",items:[
   {label:"Monitoring",text:"Tracks, regularly, what you are doing and what is changing.",example:"A sheet filled in at every repair session: who came and what was fixed."},
   {label:"Evaluation",text:"Asks whether it made a difference, for whom and why.",example:"A short end-of-pilot review: are families still repairing things at home?"},
   {label:"Accountability",text:"The people you serve can shape the work and raise concerns safely.",example:"A feedback card at each session, plus a trusted outsider for sensitive concerns."},
   {label:"Learning",text:"Turns what you found into decisions for the next round.",example:"After the pilot, three decisions: new times, more tools, a second venue."}]},
  why:{title:"Why start it now",points:["You have evidence from day one instead of reconstructing it later.","You find out early whether your idea works, before you grow.","Funders, customers and members trust results they can see."]},
  use:{title:"What it builds",points:["One chain: Theory of Change, results, indicators, data, learning, decisions.","Each lesson in this module adds one link to that chain.","Your reports, proof points and communications draw on it later."]},
  mistakes:{title:"What to avoid",points:["Collecting data you will never use for a decision.","Fifty indicators nobody reviews instead of three to five good ones.","Waiting for tablets or databases: paper sheets and photos are enough."]}
 });
 add('106.system','es',{
  what:"MEAL significa Monitoreo, Evaluación, Rendición de cuentas y Aprendizaje. Es un sistema ligero que te dice si haces lo que dijiste, si marca una diferencia y qué cambiar.",
  parts:{title:"Cuatro partes, cuatro preguntas",items:[
   {label:"Monitoreo",text:"Sigue con regularidad lo que haces y lo que está cambiando.",example:"Una hoja que se llena en cada sesión de reparación: quién vino y qué se arregló."},
   {label:"Evaluación",text:"Pregunta si hubo una diferencia, para quién y por qué.",example:"Una breve revisión al final del piloto: ¿las familias siguen reparando en casa?"},
   {label:"Rendición de cuentas",text:"Las personas a las que sirves orientan el trabajo y plantean inquietudes con seguridad.",example:"Una tarjeta de opinión en cada sesión y una persona externa de confianza."},
   {label:"Aprendizaje",text:"Convierte lo que encontraste en decisiones para la siguiente ronda.",example:"Tras el piloto, tres decisiones: nuevos horarios, más herramientas, otro local."}]},
  why:{title:"Por qué empezar ahora",points:["Tienes evidencia desde el primer día, sin reconstruirla después.","Sabes pronto si tu idea funciona, antes de crecer.","Financiadores, clientes y miembros confían en resultados visibles."]},
  use:{title:"Qué construye",points:["Una cadena: Teoría de Cambio, resultados, indicadores, datos, aprendizaje, decisiones.","Cada lección de este módulo suma un eslabón a esa cadena.","Tus informes, pruebas y comunicaciones se apoyarán en ella."]},
  mistakes:{title:"Qué evitar",points:["Recoger datos que nunca usarás para decidir.","Cincuenta indicadores que nadie revisa en vez de tres a cinco buenos.","Esperar tabletas o bases de datos: bastan hojas en papel y fotos."]}
 });

 add('106.results-framework','en',{
  what:"A results framework turns your Theory of Change into a table. For each external objective it lists the outcomes and outputs you expect, how you will know, and what must hold true.",
  parts:{title:"What goes in the table",items:[
   {label:"Results chain",text:"Impact, outcomes and outputs, copied from your pathway for the first year.",example:"Output 1.1.1: ten repair sessions run. Outcome 1.1: families repair at home."},
   {label:"Evidence",text:"How you will know each result happened, with data you can actually get.",example:"Session sheets for the output; a short follow-up call for the outcome."},
   {label:"Assumptions",text:"What must hold true for one level to lead to the next.",example:"Families can find affordable spare parts nearby."},
   {label:"Codes",text:"The labels from your strategy that link results to plans and budgets.",example:"ESO1, Outcome 1.1, Output 1.1.1, used the same way everywhere."}]},
  why:{title:"Why it matters",points:["Funders often ask for a logframe in your first application.","It shows whether your plan adds up before you spend money.","It keeps your pilot focused on results you can monitor."]},
  use:{title:"What it feeds",points:["Your indicators: at least one for each result in the table.","Your plans and budget, linked through the same codes.","Your monitoring and reports: planned versus actual, result by result."]},
  mistakes:{title:"What to avoid",points:["Copying every box of your diagram, not only what you can monitor.","Claiming you will measure impact in your first year.","Skipping the logic check, upwards and across to real evidence."]}
 });
 add('106.results-framework','es',{
  what:"Un marco de resultados convierte tu Teoría de Cambio en una tabla. Para cada objetivo externo enumera los resultados y productos esperados, cómo lo sabrás y qué debe cumplirse.",
  parts:{title:"Qué va en la tabla",items:[
   {label:"Cadena de resultados",text:"Impacto, resultados y productos, copiados de tu camino para el primer año.",example:"Producto 1.1.1: diez sesiones de reparación. Resultado 1.1: las familias reparan en casa."},
   {label:"Evidencia",text:"Cómo sabrás que ocurrió cada resultado, con datos que de verdad puedes obtener.",example:"Hojas de sesión para el producto; una llamada de seguimiento para el resultado."},
   {label:"Supuestos",text:"Lo que debe cumplirse para que un nivel lleve al siguiente.",example:"Las familias encuentran repuestos asequibles cerca."},
   {label:"Códigos",text:"Las etiquetas de tu estrategia que vinculan resultados con planes y presupuestos.",example:"OEE1, Resultado 1.1, Producto 1.1.1, usados igual en todas partes."}]},
  why:{title:"Por qué importa",points:["Los financiadores suelen pedir un marco lógico en la primera solicitud.","Muestra si tu plan cuadra antes de gastar dinero.","Mantiene tu piloto centrado en resultados que puedes monitorear."]},
  use:{title:"Qué alimenta",points:["Tus indicadores: al menos uno por cada resultado de la tabla.","Tus planes y tu presupuesto, vinculados por los mismos códigos.","Tu monitoreo e informes: lo planificado frente a lo real."]},
  mistakes:{title:"Qué evitar",points:["Copiar cada casilla del diagrama, no solo lo que puedes monitorear.","Afirmar que medirás el impacto en tu primer año.","Saltarte la prueba de lógica, hacia arriba y con evidencia real."]}
 });

 add('106.indicators','en',{
  what:"An indicator is a specific sign you track to show whether a result is happening. It is defined so clearly that you, a co-founder or the first person who joins would all measure it the same way.",
  parts:{title:"What every indicator records",items:[
   {label:"Definition",text:"The sign you track, with who counts as a success and out of whom.",example:"% of tutoring pupils who pass their maths exam, out of all who finished."},
   {label:"Source and method",text:"Where the data comes from and how you collect it.",example:"The results slip a parent shows at the final session."},
   {label:"Frequency",text:"How often you collect it.",example:"Once a term, two weeks after exams."},
   {label:"Owner",text:"Who collects it and answers for it.",example:"The founder, until a second tutor joins."}]},
  why:{title:"Why it matters",points:["It turns a vague hope into something you can check.","Everyone measures the same way, so numbers compare over time.","Breaking data down shows unequal results from your first group."]},
  use:{title:"What it guides",points:["Your baselines and targets, set in the next lesson.","Your data collection plan: each indicator needs a source and method.","Your monitoring dashboard: planned versus actual for each indicator."]},
  mistakes:{title:"What to avoid",points:["Counting activities, like sessions run, as outcomes.","Percentages without a clear numerator and denominator.","Counting the same person twice, or data you cannot collect ethically."]}
 });
 add('106.indicators','es',{
  what:"Un indicador es una señal concreta que sigues para mostrar si un resultado ocurre. Se define con tanta claridad que tú, tu cofundador o la primera persona que se sume lo medirían igual.",
  parts:{title:"Qué registra cada indicador",items:[
   {label:"Definición",text:"La señal que sigues, con quién cuenta como éxito y sobre cuántos.",example:"% de alumnos de tutoría que aprueban matemáticas, sobre todos los que terminaron."},
   {label:"Fuente y método",text:"De dónde vienen los datos y cómo los recoges.",example:"La boleta de notas que un padre muestra en la última sesión."},
   {label:"Frecuencia",text:"Cada cuánto lo recoges.",example:"Una vez por trimestre, dos semanas después de los exámenes."},
   {label:"Responsable",text:"Quién lo recoge y responde por él.",example:"La fundadora, hasta que se sume un segundo tutor."}]},
  why:{title:"Por qué importa",points:["Convierte una esperanza vaga en algo que puedes verificar.","Todos miden igual, así las cifras se comparan en el tiempo.","Desagregar los datos muestra desigualdades desde tu primer grupo."]},
  use:{title:"Qué orienta",points:["Tus líneas de base y metas, en la próxima lección.","Tu plan de recolección: cada indicador necesita fuente y método.","Tu tablero de monitoreo: lo planificado frente a lo real."]},
  mistakes:{title:"Qué evitar",points:["Contar actividades, como sesiones dadas, como resultados.","Porcentajes sin numerador y denominador claros.","Contar dos veces a la misma persona, o datos que no puedes recoger con ética."]}
 });

 add('106.baselines','en',{
  what:"A baseline is the value of an indicator before your work starts. A target is the value you aim to reach by a given date. Together they let you show change and judge progress.",
  parts:{title:"Two numbers and the steps between",items:[
   {label:"Baseline",text:"Where things stand at the start, or your plan to find out.",example:"Asked at sign-up: 2 of 12 youth club members have done volunteer work."},
   {label:"Target",text:"Where you aim to be, and by when.",example:"Provisional: 8 of 12 members volunteering by the end of the first year."},
   {label:"Milestones",text:"Quarterly steps towards an annual target, where that helps you manage.",example:"Three volunteering by March, five by June, eight by December."}]},
  why:{title:"Why they matter",points:["Without a baseline you cannot show change.","Without a target you cannot judge whether progress is enough.","When you start something new, now is the best moment to capture it."]},
  use:{title:"How you will use them",points:["Your monitoring: actual results compared with targets each period.","Your evaluation: the baseline is the point you measure change from.","Your reports and claims: honest figures with their starting point."]},
  mistakes:{title:"What to avoid",points:["Inventing a baseline: write “to be established by [date]” instead.","Reading too much into a percentage from six people.","Changing targets quietly instead of openly, with a reason."]}
 });
 add('106.baselines','es',{
  what:"Una línea de base es el valor de un indicador antes de empezar tu trabajo. Una meta es el valor que quieres alcanzar en una fecha. Juntas muestran el cambio y el avance.",
  parts:{title:"Dos cifras y los pasos intermedios",items:[
   {label:"Línea de base",text:"Dónde están las cosas al inicio, o tu plan para averiguarlo.",example:"Preguntado al inscribirse: 2 de 12 miembros del club juvenil han hecho voluntariado."},
   {label:"Meta",text:"Adónde quieres llegar, y para cuándo.",example:"Provisional: 8 de 12 miembros haciendo voluntariado al final del primer año."},
   {label:"Hitos",text:"Pasos trimestrales hacia una meta anual, cuando eso te ayuda a gestionar.",example:"Tres en voluntariado en marzo, cinco en junio, ocho en diciembre."}]},
  why:{title:"Por qué importan",points:["Sin línea de base no puedes mostrar cambio.","Sin meta no puedes juzgar si el avance es suficiente.","Al crear algo nuevo, ahora es el mejor momento para registrarla."]},
  use:{title:"Cómo las usarás",points:["Tu monitoreo: resultados reales frente a metas en cada periodo.","Tu evaluación: la línea de base es el punto desde el que mides.","Tus informes: cifras honestas con su punto de partida."]},
  mistakes:{title:"Qué evitar",points:["Inventar una línea de base: escribe “por establecer antes de [fecha]”.","Sacar conclusiones de un porcentaje de seis personas.","Cambiar metas en silencio en lugar de abiertamente y con razones."]}
 });

 add('106.data-collection','en',{
  what:"Data collection is how you gather the evidence for each indicator: the method, the tools and the routine. It must be simple enough to keep up, ethical from the first day and reliable enough to trust.",
  parts:{title:"Three things to get right",items:[
   {label:"Simple methods",text:"The simplest method that gives credible evidence: registers, surveys, interviews, observation, sales records.",example:"A paper attendance sheet at the bakery training, filled in every morning."},
   {label:"Ethics",text:"Explain why, ask for consent, collect only what you need and keep it confidential.",example:"Trainees sign a short consent note; their details stay in a locked folder."},
   {label:"Quality",text:"Valid, reliable, timely, precise and unchanged, protected by simple routine checks.",example:"Each month the founder checks five sheets against the sign-up list."}]},
  why:{title:"Why it matters",points:["Your evidence is only as good as the data behind it.","People trust you with their information; losing that trust is costly.","A routine you can keep up beats a perfect plan you abandon."]},
  use:{title:"What it supports",points:["Every indicator on your reference sheet gets a method and a tool.","Your MEAL plan sets who collects, when, and how it is checked.","Your monitoring and evaluation depend on this data being right."]},
  mistakes:{title:"What to avoid",points:["An app nobody opens instead of a sheet that gets filled in.","Collecting extra personal data, or ignoring the data rules where you work.","Skipping a test of your tools with a few real users first."]}
 });
 add('106.data-collection','es',{
  what:"La recolección de datos es cómo reúnes la evidencia de cada indicador: el método, las herramientas y la rutina. Debe ser simple de mantener, ética desde el primer día y confiable.",
  parts:{title:"Tres cosas que cuidar",items:[
   {label:"Métodos simples",text:"El método más simple con evidencia creíble: registros, encuestas, entrevistas, observación, ventas.",example:"Una hoja de asistencia en papel en la formación de panadería, cada mañana."},
   {label:"Ética",text:"Explica para qué, pide consentimiento, recoge solo lo necesario y guarda confidencialidad.",example:"Cada aprendiz firma un breve consentimiento; sus datos van en una carpeta con llave."},
   {label:"Calidad",text:"Válidos, confiables, oportunos, precisos e inalterados, con controles sencillos de rutina.",example:"Cada mes la fundadora compara cinco hojas con la lista de inscripción."}]},
  why:{title:"Por qué importa",points:["Tu evidencia vale lo que valen los datos detrás.","Las personas te confían su información; perder esa confianza cuesta caro.","Una rutina que puedes mantener vale más que un plan perfecto abandonado."]},
  use:{title:"Qué sostiene",points:["Cada indicador de tu ficha recibe un método y una herramienta.","Tu plan MEAL fija quién recoge, cuándo y cómo se revisa.","Tu monitoreo y tu evaluación dependen de que estos datos sean correctos."]},
  mistakes:{title:"Qué evitar",points:["Una app que nadie abre en vez de una hoja que sí se llena.","Recoger datos personales de más, o ignorar las normas donde trabajas.","No probar antes tus herramientas con algunas personas reales."]}
 });

 add('106.meal-plan','en',{
  what:"A MEAL plan brings everything together: results, indicators, data collection, roles, timing, reviews, evaluation, feedback and reporting. It is the short operating manual for your evidence, with a budget to make it real.",
  parts:{title:"What the plan sets out",items:[
   {label:"Roles",text:"Who collects, checks, analyses, reviews and reports, even if it is one person.",example:"The founder collects and reviews; a co-founder checks the entries monthly."},
   {label:"Calendar",text:"When data is collected, reviewed, evaluated and reported over the year.",example:"Sheets weekly, a review each quarter, an end-of-pilot review in June."},
   {label:"Budget",text:"What MEAL costs in money and time: printing, transport, translation, compensation, reviews.",example:"Printing, bus fares for follow-up visits and four hours a month of founder time."}]},
  why:{title:"Why it matters",points:["Hidden MEAL work piles up on top of everything else a founder does.","Many funders accept a MEAL budget line if you include it.","Written roles make it easy to hand over as you grow."]},
  use:{title:"Where it shows up",points:["Your first proposals: MEAL appears as a costed part of the work.","Your budget: MEAL becomes a line, not an afterthought.","Handing over: the first people who join read it and know their part."]},
  mistakes:{title:"What to avoid",points:["A plan so long that nobody reads it.","Leaving out your own time because it is unpaid.","Adding MEAL costs after the budget is already agreed."]}
 });
 add('106.meal-plan','es',{
  what:"Un plan MEAL lo reúne todo: resultados, indicadores, recolección, roles, tiempos, revisiones, evaluación, retroalimentación e informes. Es el manual breve de tu evidencia, con un presupuesto que lo hace real.",
  parts:{title:"Qué fija el plan",items:[
   {label:"Roles",text:"Quién recoge, revisa, analiza, evalúa e informa, aunque sea una sola persona.",example:"La fundadora recoge y revisa; un cofundador verifica los registros cada mes."},
   {label:"Calendario",text:"Cuándo se recogen, revisan, evalúan e informan los datos durante el año.",example:"Hojas semanales, una revisión trimestral, una revisión final del piloto en junio."},
   {label:"Presupuesto",text:"Lo que cuesta el MEAL en dinero y tiempo: impresión, transporte, traducción, compensación, revisiones.",example:"Impresión, pasajes para visitas de seguimiento y cuatro horas al mes de la fundadora."}]},
  why:{title:"Por qué importa",points:["El trabajo MEAL oculto se suma a todo lo demás que haces.","Muchos financiadores aceptan una línea de MEAL si la incluyes.","Los roles escritos facilitan traspasar tareas al crecer."]},
  use:{title:"Dónde aparece",points:["Tus primeras propuestas: el MEAL como parte del trabajo, con costo.","Tu presupuesto: el MEAL es una línea, no un añadido.","El traspaso: quienes se sumen lo leen y saben su parte."]},
  mistakes:{title:"Qué evitar",points:["Un plan tan largo que nadie lo lee.","Dejar fuera tu propio tiempo porque no se paga.","Añadir los costos de MEAL cuando el presupuesto ya está acordado."]}
 });

 add('106.monitoring','en',{
  what:"Monitoring compares what you planned with what is actually happening. For each indicator and period you record the planned value, the actual value and the gap, then ask why.",
  parts:{title:"Record, explain, then act",items:[
   {label:"Record the gap",text:"Planned value, actual value and the difference, for each indicator and period.",example:"Planned 20 repair café visitors in May; actual 12; a gap of 8."},
   {label:"Ask why first",text:"Check the data, the assumptions, the context and whether the target was realistic.",example:"Visits fell because the local market moved to Saturdays."},
   {label:"Show the status",text:"Green on track, amber at risk, red off track, with one line of comment.",example:"Amber: sessions move to Saturday mornings from June."}]},
  why:{title:"Why it matters",points:["Gaps show up early, while they are still cheap to fix.","Explaining before reacting stops you fixing the wrong problem.","A simple dashboard keeps co-founders and partners on the same page."]},
  use:{title:"What it feeds",points:["Your learning reviews: the dashboard is the starting point.","Your evaluation: monitoring data is its raw material.","Your reports: planned versus actual is what funders often ask for."]},
  mistakes:{title:"What to avoid",points:["Reacting to one number instead of the trend.","Blaming people before checking the data.","A dashboard with too many indicators to read in a minute."]}
 });
 add('106.monitoring','es',{
  what:"El monitoreo compara lo planificado con lo que realmente ocurre. Para cada indicador y periodo registras el valor planificado, el real y la brecha, y luego preguntas por qué.",
  parts:{title:"Registra, explica y actúa",items:[
   {label:"Registra la brecha",text:"Valor planificado, valor real y la diferencia, por indicador y periodo.",example:"Planificadas 20 visitas al café de reparación en mayo; reales 12; brecha de 8."},
   {label:"Pregunta por qué",text:"Revisa los datos, los supuestos, el contexto y si la meta era realista.",example:"Las visitas bajaron porque el mercado local pasó a los sábados."},
   {label:"Muestra el estado",text:"Verde en camino, ámbar en riesgo, rojo fuera de rumbo, con un comentario.",example:"Ámbar: las sesiones pasan a los sábados por la mañana desde junio."}]},
  why:{title:"Por qué importa",points:["Las brechas aparecen pronto, cuando aún es barato corregirlas.","Explicar antes de reaccionar evita resolver el problema equivocado.","Un tablero simple alinea a cofundadores y aliados."]},
  use:{title:"Qué alimenta",points:["Tus revisiones de aprendizaje: el tablero es el punto de partida.","Tu evaluación: los datos de monitoreo son su materia prima.","Tus informes: lo planificado frente a lo real, que piden los financiadores."]},
  mistakes:{title:"Qué evitar",points:["Reaccionar a una cifra en vez de a la tendencia.","Culpar a personas antes de revisar los datos.","Un tablero con demasiados indicadores para leer en un minuto."]}
 });

 add('106.evaluation','en',{
  what:"Evaluation asks deeper questions than monitoring: did the work achieve its outcomes, for whom, why, at what cost and with what unintended effects? For something new: is it needed, and does it work?",
  parts:{title:"Types for different purposes",items:[
   {label:"Formative",text:"Improves the work during delivery; it suits a pilot.",example:"Mid-pilot chats with tutoring families to adjust session times."},
   {label:"Process",text:"Looks at how delivery works in practice.",example:"Checking whether tutors follow the session plan and pupils keep attending."},
   {label:"Summative",text:"Judges results at the end of a period.",example:"End-of-year review: did pupils’ maths grades improve?"},
   {label:"Impact",text:"Estimates the difference made compared with what would otherwise have happened; usually comes later.",example:"Years on, comparing pupils with similar pupils who did not join."}]},
  why:{title:"Why it matters",points:["It tells you whether to continue, change, scale up or stop.","It finds unintended effects that monitoring can miss.","It gives funders and partners a credible story of your contribution."]},
  use:{title:"What it guides",points:["Your end-of-pilot review, run by you at first.","Your bigger decisions: register, grow, change course or stop.","Your reports: findings, and how you responded to each one."]},
  mistakes:{title:"What to avoid",points:["Covering all six criteria instead of your real questions.","Promising rigorous impact evaluation you cannot yet afford.","Finishing an evaluation with no plan to use its findings."]}
 });
 add('106.evaluation','es',{
  what:"La evaluación hace preguntas más profundas que el monitoreo: ¿se lograron los resultados, para quién, por qué, a qué costo y con qué efectos no previstos? Para algo nuevo: ¿hace falta y funciona?",
  parts:{title:"Tipos según el propósito",items:[
   {label:"Formativa",text:"Mejora el trabajo durante la ejecución; encaja con un piloto.",example:"Charlas a mitad del piloto con familias de la tutoría para ajustar horarios."},
   {label:"De proceso",text:"Observa cómo funciona la ejecución en la práctica.",example:"Ver si los tutores siguen el plan de sesión y si los alumnos siguen asistiendo."},
   {label:"Sumativa",text:"Juzga los resultados al final de un periodo.",example:"Revisión de fin de año: ¿mejoraron las notas de matemáticas?"},
   {label:"De impacto",text:"Estima la diferencia frente a lo que habría pasado sin ti; suele llegar más tarde.",example:"Años después, comparar alumnos con otros similares que no participaron."}]},
  why:{title:"Por qué importa",points:["Te dice si seguir, cambiar, ampliar o parar.","Detecta efectos no previstos que el monitoreo puede pasar por alto.","Da a financiadores y aliados una historia creíble de tu contribución."]},
  use:{title:"Qué orienta",points:["Tu revisión de fin de piloto, hecha por ti al principio.","Tus grandes decisiones: registrarte, crecer, cambiar de rumbo o parar.","Tus informes: los hallazgos y cómo respondiste a cada uno."]},
  mistakes:{title:"Qué evitar",points:["Cubrir los seis criterios en vez de tus preguntas reales.","Prometer una evaluación de impacto rigurosa que aún no puedes pagar.","Terminar una evaluación sin plan para usar sus hallazgos."]}
 });

 add('106.accountability','en',{
  what:"Accountability means the people you serve understand what you do, help shape decisions that affect them, and can give feedback or complain, knowing it will be handled fairly.",
  parts:{title:"Channels for different people",items:[
   {label:"Face to face",text:"Suits people who prefer talking or read less, though some will not criticise you.",example:"Chatting with parents at pick-up after each youth club session."},
   {label:"Anonymous box",text:"Suits shy or worried participants; you report back to everyone.",example:"A box by the club door; answers posted on the notice board monthly."},
   {label:"Phone or messaging",text:"Suits parents and people at a distance; needs someone who answers on time.",example:"A club number checked every evening, with replies within two days."},
   {label:"Trusted outside person",text:"For sensitive concerns, including safeguarding; known, trusted and briefed.",example:"A retired teacher who agreed to receive concerns about the club."}]},
  why:{title:"Why it matters",points:["It respects people’s dignity and their right to a say.","The people you serve notice problems before you do.","It is far easier to build in now than once habits are set."]},
  use:{title:"Where it leads",points:["Your feedback log, reviewed regularly for patterns.","Your safeguarding procedures, in place before your first activity.","Your learning reviews and reports: what changed because of feedback."]},
  mistakes:{title:"What to avoid",points:["Relying on one channel that suits only some people.","No route outside the founding team for sensitive concerns.","Not closing the loop: people never hear what changed."]}
 });
 add('106.accountability','es',{
  what:"Rendir cuentas significa que las personas a las que sirves entienden lo que haces, influyen en las decisiones que las afectan y pueden opinar o quejarse, sabiendo que se atenderá con justicia.",
  parts:{title:"Canales para distintas personas",items:[
   {label:"Cara a cara",text:"Sirve a quien prefiere hablar o lee poco, aunque algunos no te criticarán.",example:"Conversar con madres y padres a la salida de cada sesión del club juvenil."},
   {label:"Buzón anónimo",text:"Sirve a participantes tímidos o preocupados; respondes a todo el grupo.",example:"Un buzón en la puerta del club; respuestas en el tablero cada mes."},
   {label:"Teléfono o mensajes",text:"Sirve a familias y personas lejanas; requiere alguien que responda a tiempo.",example:"Un número del club revisado cada noche, con respuesta en dos días."},
   {label:"Persona externa de confianza",text:"Para inquietudes delicadas, incluida la protección; conocida, confiable e informada.",example:"Una maestra jubilada que aceptó recibir inquietudes sobre el club."}]},
  why:{title:"Por qué importa",points:["Respeta la dignidad de las personas y su derecho a opinar.","Las personas a las que sirves ven los problemas antes que tú.","Es mucho más fácil incorporarla ahora que con hábitos ya creados."]},
  use:{title:"Adónde lleva",points:["Tu registro de opiniones, revisado con frecuencia para ver patrones.","Tus procedimientos de protección, listos antes de tu primera actividad.","Tus revisiones e informes: qué cambió gracias a las opiniones."]},
  mistakes:{title:"Qué evitar",points:["Depender de un solo canal que sirve solo a algunos.","No tener una vía fuera del equipo fundador para temas delicados.","No cerrar el ciclo: nadie se entera de qué cambió."]}
 });

 add('106.learning','en',{
  what:"Learning is the step that turns evidence into better decisions. Adaptive management means openly changing activities, targets or even your Theory of Change because of what you found.",
  parts:{title:"Simple learning formats",items:[
   {label:"After-action review",text:"What was planned, what happened, why, and what we will do differently.",example:"After the first repair café: too few tools, so borrow from the library next time."},
   {label:"Quarterly session",text:"Time set aside to read data and feedback and ask “so what?” and “now what?”",example:"Co-founders meet each quarter for two hours with the dashboard and feedback log."},
   {label:"Lessons log",text:"Each decision recorded with an owner and a date, then checked.",example:"Move to Saturdays, owner Ana, by 1 June: checked at the next review."}]},
  why:{title:"Why it matters",points:["It is how you find out what works before you grow.","Early on, changing course is expected, not a failure.","Decisions that are written down actually get carried out."]},
  use:{title:"What it changes",points:["Your monitoring and evaluation findings become decisions here.","Your Theory of Change and targets, revised openly when evidence says so.","Your reports: what you changed and why builds credibility."]},
  mistakes:{title:"What to avoid",points:["Collecting data but never making time to discuss it.","Hiding disappointing findings instead of using them.","Changing course without those who need to agree, such as co-founders or funders."]}
 });
 add('106.learning','es',{
  what:"El aprendizaje es el paso que convierte la evidencia en mejores decisiones. La gestión adaptativa es cambiar abiertamente actividades, metas o incluso tu Teoría de Cambio por lo que encontraste.",
  parts:{title:"Formatos simples de aprendizaje",items:[
   {label:"Revisión tras la acción",text:"Qué se planificó, qué pasó, por qué y qué haremos distinto.",example:"Tras el primer café de reparación: faltaron herramientas; la próxima vez, pedirlas a la biblioteca."},
   {label:"Sesión trimestral",text:"Tiempo reservado para leer datos y opiniones y preguntar “¿y qué?” y “¿y ahora qué?”",example:"Los cofundadores se reúnen cada trimestre dos horas con el tablero y las opiniones."},
   {label:"Registro de lecciones",text:"Cada decisión anotada con responsable y fecha, y luego verificada.",example:"Pasar a los sábados, responsable Ana, antes del 1 de junio: se revisa en la siguiente reunión."}]},
  why:{title:"Por qué importa",points:["Así descubres qué funciona antes de crecer.","Al inicio, cambiar de rumbo es lo esperado, no un fracaso.","Las decisiones escritas sí se cumplen."]},
  use:{title:"Qué cambia",points:["Los hallazgos de monitoreo y evaluación se vuelven decisiones aquí.","Tu Teoría de Cambio y tus metas, revisadas abiertamente según la evidencia.","Tus informes: contar qué cambiaste y por qué genera credibilidad."]},
  mistakes:{title:"Qué evitar",points:["Recoger datos pero nunca reservar tiempo para discutirlos.","Esconder hallazgos decepcionantes en vez de usarlos.","Cambiar de rumbo sin quienes deben aceptar, como cofundadores o financiadores."]}
 });

 add('106.reporting','en',{
  what:"Reporting shares your evidence with the people who need it, in a form each can use. Different audiences need different reports, but every one of them needs honesty.",
  parts:{title:"Different audiences, different reports",items:[
   {label:"Co-founders and advisers",text:"A short dashboard and the main risks.",example:"One page each quarter: five indicators, traffic lights and two risks."},
   {label:"Funders",text:"Agreed formats and deadlines.",example:"The six-month report a local grant asked for, in its own template."},
   {label:"Customers and members",text:"What their support or purchases achieved.",example:"A cooperative’s yearly note: what members’ fees paid for and what changed."},
   {label:"Participants and public",text:"Accessible feedback and honest, simple stories backed by evidence.",example:"A poster at the club in two languages: what we learned and changed."}]},
  why:{title:"Why it matters",points:["A new initiative builds credibility when its claims match its data.","Reporting what did not work shows that you learn.","Reusing one set of data saves time for every audience."]},
  use:{title:"Where it goes next",points:["Your MEAL calendar: each report has a date and an owner.","Your communications: evidence becomes messages and stories.","The fuller reports funders, members or customers will ask for later."]},
  mistakes:{title:"What to avoid",points:["Presenting outputs as if they were outcomes.","Claiming you caused a change you only contributed to.","Recreating the data from scratch for every report."]}
 });
 add('106.reporting','es',{
  what:"Informar es compartir tu evidencia con quienes la necesitan, en una forma que cada uno pueda usar. Cada audiencia necesita un informe distinto, pero todas necesitan honestidad.",
  parts:{title:"Distintas audiencias, distintos informes",items:[
   {label:"Cofundadores y asesores",text:"Un tablero breve y los riesgos principales.",example:"Una página por trimestre: cinco indicadores, semáforos y dos riesgos."},
   {label:"Financiadores",text:"Formatos y plazos acordados.",example:"El informe semestral que pidió una beca local, en su propia plantilla."},
   {label:"Clientes y miembros",text:"Lo que lograron su apoyo o sus compras.",example:"La nota anual de una cooperativa: qué pagaron las cuotas y qué cambió."},
   {label:"Participantes y público",text:"Información accesible e historias honestas y simples, con evidencia.",example:"Un cartel en el club en dos idiomas: qué aprendimos y qué cambiamos."}]},
  why:{title:"Por qué importa",points:["Algo nuevo gana credibilidad cuando lo que afirma coincide con sus datos.","Informar lo que no funcionó muestra que aprendes.","Reutilizar los mismos datos ahorra tiempo con cada audiencia."]},
  use:{title:"Adónde va después",points:["Tu calendario MEAL: cada informe con fecha y responsable.","Tus comunicaciones: la evidencia se vuelve mensajes e historias.","Los informes completos que te pedirán financiadores, miembros o clientes."]},
  mistakes:{title:"Qué evitar",points:["Presentar productos como si fueran resultados.","Afirmar que causaste un cambio al que solo contribuiste.","Rehacer los datos desde cero para cada informe."]}
 });

 // ── Module 7: Brand, Identity & Image ─────────────────────────────────────
 add('107.definitions','en',{
  what:"Your brand is what people expect from you and associate with you. Identity, image, communications and marketing are related words, but each does a different job, and knowing which is which saves effort.",
  parts:{title:"Different words, different jobs",items:[
   {label:"Brand",text:"What people expect from you and associate with you: what you stand for and promise.",example:"A repair café known for friendly, practical help to fix things first."},
   {label:"Identity",text:"How you deliberately express the brand: name, voice and visual style.",example:"A short name, the line “Fix first”, two colours and plain words."},
   {label:"Image",text:"What people actually think of you today, which may be very little at the start.",example:"Early visitors call it “the friendly pop-up”; most people have not heard of it."},
   {label:"Communications and marketing",text:"Sharing information and stories; planned efforts to get a specific action.",example:"A neighbourhood chat group, plus a campaign to find three volunteer electricians."}]},
  why:{title:"Why it matters",points:["Without a clear brand, every message starts from zero.","The first people you serve need to know they will be safe.","Early customers, funders and partners look for credibility and values."]},
  use:{title:"What it guides",points:["Your brand promise and platform, in the next lesson.","Your voice, visual identity and guidelines, later in this module.","Your marketing and communications, built on top of the brand."]},
  mistakes:{title:"What to avoid",points:["Thinking a logo is a brand.","Leaving brand for later, as something only companies need.","Describing the brand you want while ignoring what early reactions say."]}
 });
 add('107.definitions','es',{
  what:"Tu marca es lo que la gente espera de ti y asocia contigo. Identidad, imagen, comunicación y marketing son palabras cercanas, pero cada una cumple una función distinta, y distinguirlas ahorra esfuerzo.",
  parts:{title:"Distintas palabras, distintas funciones",items:[
   {label:"Marca",text:"Lo que la gente espera de ti y asocia contigo: lo que defiendes y prometes.",example:"Un café de reparación conocido por ayudar con amabilidad a arreglar primero."},
   {label:"Identidad",text:"Cómo expresas la marca a propósito: nombre, voz y estilo visual.",example:"Un nombre corto, la frase “Primero, repara”, dos colores y palabras sencillas."},
   {label:"Imagen",text:"Lo que la gente piensa de ti hoy, que al inicio puede ser muy poco.",example:"Los primeros visitantes lo llaman “el puesto amable”; casi nadie lo conoce aún."},
   {label:"Comunicación y marketing",text:"Compartir información e historias; esfuerzos planificados para lograr una acción.",example:"Un chat del barrio y una campaña para encontrar tres electricistas voluntarios."}]},
  why:{title:"Por qué importa",points:["Sin una marca clara, cada mensaje empieza desde cero.","Las primeras personas a las que sirves necesitan saber que estarán seguras.","Primeros clientes, financiadores y aliados buscan credibilidad y valores."]},
  use:{title:"Qué orienta",points:["Tu promesa y plataforma de marca, en la próxima lección.","Tu voz, identidad visual y manual, más adelante en este módulo.","Tu marketing y tu comunicación, construidos sobre la marca."]},
  mistakes:{title:"Qué evitar",points:["Creer que un logo es una marca.","Dejar la marca para después, como algo solo de empresas.","Describir la marca que quieres e ignorar lo que dicen las primeras reacciones."]}
 });

 add('107.strategy','en',{
  what:"Your brand promise is the experience you commit to deliver every time, from your very first activity or sale. A brand platform writes down that promise with the purpose, audiences, personality and messages behind it.",
  parts:{title:"The brand platform",items:[
   {label:"Purpose and promise",text:"Why you exist and the experience people can count on.",example:"A bakery training young people: “Real skills, in a real kitchen, from day one.”"},
   {label:"Audiences and personality",text:"Who the brand speaks to and how it behaves, shaped by your values.",example:"Trainees, local cafés as buyers and small funders; warm, practical and honest."},
   {label:"Key messages",text:"The few things you always say, adapted to each audience.",example:"For cafés: fresh bread each morning, baked by trainees you could hire."},
   {label:"Proof points",text:"Evidence for the promise, or what you will measure and when.",example:"First trainee results expected after the six-month pilot."}]},
  why:{title:"Why it matters",points:["A promise people recognise sets you apart from the start.","A kept promise builds trust when you have no track record.","A broken promise damages trust faster than having none."]},
  use:{title:"What it guides",points:["Your voice, identity and guidelines, which express this platform.","Your messaging framework, which takes its core message from it.","Your MEAL data, which becomes your proof points over time."]},
  mistakes:{title:"What to avoid",points:["Promising more than you can deliver at your current size.","Saying the same words to every audience instead of keeping one promise.","Inventing proof points: list the claims you will not make."]}
 });
 add('107.strategy','es',{
  what:"Tu promesa de marca es la experiencia que te comprometes a dar siempre, desde tu primera actividad o venta. Una plataforma de marca la escribe junto con el propósito, las audiencias, la personalidad y los mensajes.",
  parts:{title:"La plataforma de marca",items:[
   {label:"Propósito y promesa",text:"Por qué existes y la experiencia con la que la gente puede contar.",example:"Una panadería que forma jóvenes: “Oficio real, en una cocina real, desde el primer día.”"},
   {label:"Audiencias y personalidad",text:"A quién habla la marca y cómo se comporta, según tus valores.",example:"Aprendices, cafés como compradores y pequeños financiadores; cálida, práctica y honesta."},
   {label:"Mensajes clave",text:"Las pocas cosas que siempre dices, adaptadas a cada audiencia.",example:"Para cafés: pan fresco cada mañana, hecho por aprendices que podrías contratar."},
   {label:"Pruebas",text:"Evidencia de la promesa, o qué medirás y cuándo.",example:"Primeros resultados de aprendices al terminar el piloto de seis meses."}]},
  why:{title:"Por qué importa",points:["Una promesa reconocible te distingue desde el inicio.","Una promesa cumplida genera confianza sin trayectoria previa.","Una promesa rota daña la confianza más que no tener ninguna."]},
  use:{title:"Qué orienta",points:["Tu voz, identidad y manual, que expresan esta plataforma.","Tu marco de mensajes, que toma de ella su mensaje central.","Tus datos MEAL, que con el tiempo serán tus pruebas."]},
  mistakes:{title:"Qué evitar",points:["Prometer más de lo que puedes cumplir con tu tamaño actual.","Decir lo mismo a todas las audiencias en vez de mantener una promesa.","Inventar pruebas: enumera las afirmaciones que no harás."]}
 });

 add('107.voice','en',{
  what:"Brand personality describes your initiative as if it were a person. Voice is how that personality sounds in words, and it stays the same; tone changes with the situation.",
  parts:{title:"Personality, voice and tone",items:[
   {label:"Personality",text:"Three or four traits, drawn from your values, that audiences would recognise.",example:"A youth club that is youthful, encouraging and practical."},
   {label:"Voice",text:"How the traits sound, each written as “this, not that”.",example:"“Encouraging, not patronising”: we celebrate effort, never “even you can do it”."},
   {label:"Tone",text:"Shifts with the situation while the voice stays the same.",example:"Serious when answering a complaint; joyful when sharing the first club trip."},
   {label:"Word list",text:"Words you use, words you avoid and how you describe people.",example:"Say “young people”, not “at-risk kids”; say “members”, not “beneficiaries”."}]},
  why:{title:"Why it matters",points:["Anyone who writes for you can sound like you.","Your voice stops living only in the founders’ heads.","Respectful words protect the dignity of the people you serve."]},
  use:{title:"Where you will use it",points:["Your guidelines, so volunteers and partners write in your voice.","Your messages, posts and newsletters.","Your stories, told without pity or stereotypes."]},
  mistakes:{title:"What to avoid",points:["Choosing traits your audiences would not recognise.","Language that reduces people to their problems or shows them as helpless.","Never testing the voice on a real message."]}
 });
 add('107.voice','es',{
  what:"La personalidad de marca describe tu iniciativa como si fuera una persona. La voz es cómo suena esa personalidad en palabras, y se mantiene; el tono cambia según la situación.",
  parts:{title:"Personalidad, voz y tono",items:[
   {label:"Personalidad",text:"Tres o cuatro rasgos, tomados de tus valores, que tus audiencias reconocerían.",example:"Un club juvenil joven, alentador y práctico."},
   {label:"Voz",text:"Cómo suenan los rasgos, cada uno escrito como “esto, no aquello”.",example:"“Alentadores, no condescendientes”: celebramos el esfuerzo, nunca “hasta tú puedes”."},
   {label:"Tono",text:"Cambia con la situación mientras la voz se mantiene.",example:"Serio al responder una queja; alegre al contar la primera salida del club."},
   {label:"Lista de palabras",text:"Palabras que usas, palabras que evitas y cómo describes a las personas.",example:"Di “jóvenes”, no “chicos en riesgo”; di “miembros”, no “beneficiarios”."}]},
  why:{title:"Por qué importa",points:["Cualquiera que escriba por ti puede sonar como tú.","Tu voz deja de vivir solo en la cabeza de quienes fundan.","Las palabras respetuosas protegen la dignidad de quienes sirves."]},
  use:{title:"Dónde la usarás",points:["Tu manual, para que voluntarios y aliados escriban con tu voz.","Tus mensajes, publicaciones y boletines.","Tus historias, contadas sin lástima ni estereotipos."]},
  mistakes:{title:"Qué evitar",points:["Elegir rasgos que tus audiencias no reconocerían.","Un lenguaje que reduce a las personas a sus problemas o las muestra indefensas.","No probar nunca la voz en un mensaje real."]}
 });

 add('107.architecture','en',{
  what:"Brand architecture is how the names of your organisation, programmes, products and related entities relate to each other. Deciding the logic now, while it is cheap to change, stops people losing track of you.",
  parts:{title:"Three models to choose from",items:[
   {label:"Branded house",text:"Everything uses the master name plus a plain descriptor.",example:"“[Name] Tutoring” and “[Name] Holiday Clubs”: one name, one promise for families."},
   {label:"Endorsed brands",text:"Each offer has its own name, linked with “part of” or “by”.",example:"A café run by trainees, shown as “[Café name], part of [Name]”."},
   {label:"House of brands",text:"Each offer has its own name with no visible link.",example:"A trading arm selling to businesses, kept apart from a youth programme."}]},
  why:{title:"Why it matters",points:["One clear logic stops audiences getting confused as you grow.","Changing names later costs money, materials and recognition.","A future hybrid needs an early choice: one family or distinct brands."]},
  use:{title:"What it guides",points:["How you name every new programme, product or campaign.","Your visual identity: one system or several.","Your registration and web addresses, checked before you commit."]},
  mistakes:{title:"What to avoid",points:["Adopting a name before checking spelling, languages, web address and social handles.","Ignoring trademarks: check with someone with a legal background before registering.","Mixing models by accident instead of by choice."]}
 });
 add('107.architecture','es',{
  what:"La arquitectura de marca es cómo se relacionan los nombres de tu organización, programas, productos y entidades vinculadas. Decidir la lógica ahora, cuando cambiarla es barato, evita que la gente te pierda de vista.",
  parts:{title:"Tres modelos para elegir",items:[
   {label:"Marca única",text:"Todo usa el nombre principal más un descriptor sencillo.",example:"“[Nombre] Tutorías” y “[Nombre] Clubes de Vacaciones”: un nombre, una promesa."},
   {label:"Marcas respaldadas",text:"Cada oferta tiene su nombre, unido con “parte de” o “por”.",example:"Un café atendido por aprendices: “[Nombre del café], parte de [Nombre]”."},
   {label:"Casa de marcas",text:"Cada oferta tiene su propio nombre, sin vínculo visible.",example:"Un brazo comercial que vende a empresas, separado de un programa juvenil."}]},
  why:{title:"Por qué importa",points:["Una lógica clara evita confusiones mientras creces.","Cambiar nombres después cuesta dinero, materiales y reconocimiento.","Un futuro modelo híbrido exige elegir pronto: una familia o marcas distintas."]},
  use:{title:"Qué orienta",points:["Cómo nombras cada nuevo programa, producto o campaña.","Tu identidad visual: un sistema o varios.","Tu registro y tus dominios web, verificados antes de comprometerte."]},
  mistakes:{title:"Qué evitar",points:["Adoptar un nombre sin revisar ortografía, idiomas, dominio y redes.","Ignorar las marcas registradas: consulta a alguien con formación jurídica antes.","Mezclar modelos por accidente y no por decisión."]}
 });

 add('107.visual','en',{
  what:"Visual identity is the set of visual elements that makes you recognisable: logo, colours, typefaces, imagery and layout. The system matters more than any single element, and you can start it before the logo is finished.",
  parts:{title:"The core elements",items:[
   {label:"Logo",text:"A main version, a small version, and light and dark versions, with spacing rules.",example:"Until the logo is ready, the tutoring service uses a clean wordmark."},
   {label:"Colour",text:"Two or three main colours and a few supporting ones, with screen and print codes.",example:"Deep green and warm yellow, with dark grey for text."},
   {label:"Type",text:"One or two typefaces that anyone who joins can use, free or licensed.",example:"One free typeface for both headings and body text."},
   {label:"Imagery",text:"Honest, respectful images of real people, taken with informed consent.",example:"Photos of pupils at work, with parents’ written consent, faces only where agreed."}]},
  why:{title:"Why it matters",points:["People recognise you faster when everything looks like one family.","Accessibility built in now is cheaper than fixing it later.","Respectful images protect people and your credibility."]},
  use:{title:"Where it goes",points:["Your brand guidelines and templates, in the next lesson.","Your website, social profiles, posters and proposals.","Your co-branding with partners and funders."]},
  mistakes:{title:"What to avoid",points:["Paying an expensive agency before you know your audiences.","Low contrast, small text or information shown by colour alone.","Stereotyped images, or photos of children without consent and safeguards."]}
 });
 add('107.visual','es',{
  what:"La identidad visual es el conjunto de elementos que te hace reconocible: logo, colores, tipografías, imágenes y diseño. El sistema importa más que cada elemento, y puedes empezarlo antes de tener el logo.",
  parts:{title:"Los elementos básicos",items:[
   {label:"Logo",text:"Una versión principal, una pequeña y versiones clara y oscura, con reglas de espacio.",example:"Mientras no hay logo, el servicio de tutorías usa un logotipo de texto limpio."},
   {label:"Color",text:"Dos o tres colores principales y algunos de apoyo, con códigos para pantalla e impresión.",example:"Verde profundo y amarillo cálido, con gris oscuro para el texto."},
   {label:"Tipografía",text:"Una o dos tipografías que cualquiera que se sume pueda usar, gratuitas o con licencia.",example:"Una tipografía gratuita para títulos y texto."},
   {label:"Imágenes",text:"Imágenes honestas y respetuosas de personas reales, con consentimiento informado.",example:"Fotos de alumnos trabajando, con permiso escrito de sus familias y caras solo si lo aceptan."}]},
  why:{title:"Por qué importa",points:["Te reconocen antes cuando todo parece de la misma familia.","La accesibilidad incluida ahora cuesta menos que corregirla después.","Las imágenes respetuosas protegen a las personas y tu credibilidad."]},
  use:{title:"Dónde se aplica",points:["Tu manual de marca y tus plantillas, en la próxima lección.","Tu sitio web, perfiles sociales, carteles y propuestas.","Tu marca compartida con aliados y financiadores."]},
  mistakes:{title:"Qué evitar",points:["Pagar una agencia cara antes de conocer a tus audiencias.","Poco contraste, letra pequeña o información solo por color.","Imágenes con estereotipos, o fotos de niños sin consentimiento ni protección."]}
 });

 add('107.guidelines','en',{
  what:"Brand guidelines bring your brand platform, voice and visual identity together in one place, with practical rules and examples, so others can apply the brand without you checking every item.",
  parts:{title:"What a short guide holds",items:[
   {label:"The essentials",text:"Promise, voice and visual rules on one to four pages.",example:"A two-page guide for the repair café’s volunteers."},
   {label:"Do’s and don’ts",text:"Pictures of right and wrong use, and where the logo goes.",example:"Logo top left on posters; never stretched, never on a busy photo."},
   {label:"Templates",text:"Ready-made files for the things you produce most.",example:"A poster, a social post and a letterhead, ready to fill in."},
   {label:"Co-branding rules",text:"Whose logo leads, required acknowledgements and when approval is needed.",example:"With the library as partner: their logo beside ours, approval needed for press."}]},
  why:{title:"Why it matters",points:["Co-founders, volunteers and designers can work without waiting for you.","The brand no longer lives only in your head.","Partners and funders know the rules before they ask."]},
  use:{title:"Where you will use them",points:["Every poster, post, proposal and letter you produce.","Briefing designers, volunteers and the first people who join.","Your brand governance: one owner and one version date."]},
  mistakes:{title:"What to avoid",points:["A long manual nobody opens.","Waiting for the first partner to ask about co-branding.","Files scattered across phones and laptops instead of one shared place."]}
 });
 add('107.guidelines','es',{
  what:"El manual de marca reúne tu plataforma, tu voz y tu identidad visual en un solo lugar, con reglas prácticas y ejemplos, para que otros apliquen la marca sin que revises cada pieza.",
  parts:{title:"Qué contiene un manual breve",items:[
   {label:"Lo esencial",text:"Promesa, voz y reglas visuales en una a cuatro páginas.",example:"Una guía de dos páginas para los voluntarios del café de reparación."},
   {label:"Sí y no",text:"Imágenes del uso correcto e incorrecto, y dónde va el logo.",example:"Logo arriba a la izquierda en carteles; nunca estirado ni sobre una foto recargada."},
   {label:"Plantillas",text:"Archivos listos para lo que más produces.",example:"Un cartel, una publicación y una hoja membretada, listos para llenar."},
   {label:"Reglas de marca compartida",text:"Qué logo va primero, menciones obligatorias y cuándo se necesita aprobación.",example:"Con la biblioteca como aliada: su logo junto al nuestro y aprobación para prensa."}]},
  why:{title:"Por qué importa",points:["Cofundadores, voluntarios y diseñadores trabajan sin esperarte.","La marca deja de vivir solo en tu cabeza.","Aliados y financiadores conocen las reglas antes de preguntar."]},
  use:{title:"Dónde lo usarás",points:["En cada cartel, publicación, propuesta y carta que produzcas.","Para orientar a diseñadores, voluntarios y primeras personas que se sumen.","En tu gobernanza de marca: una responsable y una fecha de versión."]},
  mistakes:{title:"Qué evitar",points:["Un manual largo que nadie abre.","Esperar a que el primer aliado pregunte por la marca compartida.","Archivos dispersos en teléfonos y computadoras, sin un lugar común."]}
 });

 add('107.credibility','en',{
  what:"Trust signals are the visible signs that you are legitimate, accountable and effective. People look for them before they take part, buy or support you, and with no track record yet they matter even more.",
  parts:{title:"From claim to signal",items:[
   {label:"Who you are",text:"Legal status, or an honest note that you are registering, and named founders.",example:"“Registering as a cooperative”, with the three founders named on the website."},
   {label:"Published policies",text:"Safeguarding, privacy and complaints policies, easy to find.",example:"A one-page safeguarding summary and a named contact for the youth club."},
   {label:"Evidence",text:"Results with their method and date, or what you will measure.",example:"“First results due in July: pupils’ grades before and after tutoring.”"},
   {label:"Permissions",text:"Partners, testimonials and endorsements shown only with written permission.",example:"The school’s name appears only after its head teacher agreed in writing."}]},
  why:{title:"Why it matters",points:["People check you before they take part, buy, join or support.","Those who carry the most risk look hardest at the signals.","One misleading claim can undo credibility before you have built it."]},
  use:{title:"Where they appear",points:["Your website, social profiles, proposals and printed materials.","Your plan to close the gaps that matter most to key audiences.","Your safeguarding and complaints policies, made visible."]},
  mistakes:{title:"What to avoid",points:["Overstating a partnership, endorsement, status or result.","Hiding who the founders are or how decisions are made.","Vague claims like “huge impact” with no evidence."]}
 });
 add('107.credibility','es',{
  what:"Las señales de confianza son las pruebas visibles de que eres legítimo, responsable y eficaz. La gente las busca antes de participar, comprar o apoyarte, y sin trayectoria importan aún más.",
  parts:{title:"De la afirmación a la señal",items:[
   {label:"Quiénes son",text:"Estatus legal, o una nota honesta de que te estás registrando, y fundadores con nombre.",example:"“En registro como cooperativa”, con las tres personas fundadoras nombradas en la web."},
   {label:"Políticas publicadas",text:"Políticas de protección, privacidad y quejas, fáciles de encontrar.",example:"Un resumen de protección de una página y un contacto con nombre en el club juvenil."},
   {label:"Evidencia",text:"Resultados con su método y fecha, o qué medirás.",example:"“Primeros resultados en julio: notas de los alumnos antes y después de la tutoría.”"},
   {label:"Permisos",text:"Aliados, testimonios y respaldos mostrados solo con permiso escrito.",example:"El nombre de la escuela aparece solo tras el acuerdo escrito de su directora."}]},
  why:{title:"Por qué importa",points:["La gente te revisa antes de participar, comprar, sumarse o apoyar.","Quienes corren más riesgo miran las señales con más atención.","Una afirmación engañosa puede deshacer tu credibilidad antes de construirla."]},
  use:{title:"Dónde aparecen",points:["Tu sitio web, perfiles sociales, propuestas y materiales impresos.","Tu plan para cerrar las brechas que más importan a tus audiencias clave.","Tus políticas de protección y quejas, a la vista."]},
  mistakes:{title:"Qué evitar",points:["Exagerar una alianza, un respaldo, un estatus o un resultado.","Ocultar quién funda o cómo se toman las decisiones.","Afirmaciones vagas como “enorme impacto” sin evidencia."]}
 });

 add('107.consistency','en',{
  what:"Brand governance is the light process that keeps your brand consistent without slowing everyone down. When you are one or two people, it can be a few simple rules, set now.",
  parts:{title:"Simple rules to set now",items:[
   {label:"Brand owner",text:"One named person answers for the brand, even if it is you.",example:"The founder of the tutoring service owns the brand and its files."},
   {label:"Approval levels",text:"What anyone can produce, what needs a second look and what needs approval.",example:"Volunteers use templates freely; co-branding and press statements need the founder."},
   {label:"Asset library",text:"One shared place for current files; old versions retired at once.",example:"One shared folder; last year’s flyer deleted the day the new one arrived."},
   {label:"Annual review",text:"Once a year, check recognition, trust, fit with strategy and consistency.",example:"After the first year, ask ten parents what they think of the service."}]},
  why:{title:"Why it matters",points:["Brands wear down through many small inconsistencies.","Rules set now are in place before others produce materials.","Strategies and audiences change often in the early years."]},
  use:{title:"What it keeps on track",points:["Your guidelines and templates, kept current.","Materials made by volunteers and partners.","Your yearly reviews, alongside your MEAL routine."]},
  mistakes:{title:"What to avoid",points:["Old logos and homemade flyers left in circulation.","Requiring approval for everything, which slows everyone down.","Never reviewing the brand once it is launched."]}
 });
 add('107.consistency','es',{
  what:"La gobernanza de marca es el proceso ligero que mantiene tu marca coherente sin frenar a nadie. Cuando son una o dos personas, bastan unas pocas reglas simples, fijadas ahora.",
  parts:{title:"Reglas simples para fijar ya",items:[
   {label:"Responsable de marca",text:"Una persona con nombre responde por la marca, aunque seas tú.",example:"La fundadora del servicio de tutorías gestiona la marca y sus archivos."},
   {label:"Niveles de aprobación",text:"Qué puede producir cualquiera, qué necesita revisión y qué requiere aprobación.",example:"Los voluntarios usan plantillas libremente; marca compartida y prensa pasan por la fundadora."},
   {label:"Biblioteca de archivos",text:"Un solo lugar común para los archivos vigentes; las versiones viejas se retiran.",example:"Una carpeta compartida; el volante del año pasado se borró al llegar el nuevo."},
   {label:"Revisión anual",text:"Una vez al año, revisa reconocimiento, confianza, encaje con la estrategia y coherencia.",example:"Tras el primer año, preguntar a diez familias qué piensan del servicio."}]},
  why:{title:"Por qué importa",points:["Las marcas se desgastan con muchas pequeñas incoherencias.","Las reglas fijadas ahora existen antes de que otros produzcan materiales.","Estrategias y audiencias cambian a menudo en los primeros años."]},
  use:{title:"Qué mantiene en orden",points:["Tu manual y tus plantillas, siempre al día.","Los materiales que hacen voluntarios y aliados.","Tus revisiones anuales, junto a tu rutina MEAL."]},
  mistakes:{title:"Qué evitar",points:["Logos viejos y volantes caseros que siguen circulando.","Exigir aprobación para todo, lo que frena a todos.","No revisar nunca la marca una vez lanzada."]}
 });

 // ── Module 8: Marketing & Communications ──────────────────────────────────
 add('108.strategy','en',{
  what:"A communications strategy explains how communication will help you reach your strategic objectives: what people need to know, feel or do, who matters most, what you say, where, with what resources and how you will know.",
  parts:{title:"From objective to measure",items:[
   {label:"Objective",text:"What people need to know, feel or do, linked to a strategic objective.",example:"Get 15 families to sign up for the first term of tutoring."},
   {label:"Audience and message",text:"Who matters most, and what you will say to them.",example:"Parents of pupils aged 10–14: affordable help, five minutes from school."},
   {label:"Channels and resources",text:"Where you will say it, with the hours, skills and money you really have.",example:"The school newsletter and a parents’ chat group; four hours a week."},
   {label:"Measure",text:"How you will know it worked: an action you can count.",example:"Sign-up forms returned by the end of August."}]},
  why:{title:"Why it matters",points:["It stops scarce time going on noise.","It focuses on the people whose yes you need to start.","It ties communication to what your work must achieve."]},
  use:{title:"What it guides",points:["Your audiences, messages and channels, in the lessons that follow.","Your campaigns and editorial calendar.","Your measurement: each objective gets an outcome measure."]},
  mistakes:{title:"What to avoid",points:["Starting from channels instead of objectives.","Objectives with no audience and no action you can count.","Planning more than the hours you really have."]}
 });
 add('108.strategy','es',{
  what:"Una estrategia de comunicación explica cómo la comunicación te ayudará a lograr tus objetivos estratégicos: qué debe saber, sentir o hacer la gente, quién importa más, qué dices, dónde, con qué recursos y cómo lo sabrás.",
  parts:{title:"Del objetivo a la medida",items:[
   {label:"Objetivo",text:"Qué debe saber, sentir o hacer la gente, vinculado a un objetivo estratégico.",example:"Lograr que 15 familias inscriban a sus hijos en el primer trimestre de tutorías."},
   {label:"Audiencia y mensaje",text:"Quién importa más y qué le dirás.",example:"Familias con hijos de 10 a 14 años: ayuda asequible, a cinco minutos de la escuela."},
   {label:"Canales y recursos",text:"Dónde lo dirás, con las horas, habilidades y dinero que de verdad tienes.",example:"El boletín escolar y un chat de familias; cuatro horas por semana."},
   {label:"Medida",text:"Cómo sabrás que funcionó: una acción que puedes contar.",example:"Formularios de inscripción entregados antes de fin de agosto."}]},
  why:{title:"Por qué importa",points:["Evita que tu poco tiempo se pierda en ruido.","Se centra en las personas cuyo sí necesitas para empezar.","Ata la comunicación a lo que tu trabajo debe lograr."]},
  use:{title:"Qué orienta",points:["Tus audiencias, mensajes y canales, en las próximas lecciones.","Tus campañas y tu calendario editorial.","Tu medición: cada objetivo con una medida de resultado."]},
  mistakes:{title:"Qué evitar",points:["Empezar por los canales en vez de por los objetivos.","Objetivos sin audiencia ni acción que puedas contar.","Planificar más horas de las que realmente tienes."]}
 });

 add('108.audiences','en',{
  what:"Audiences are the groups of people you need to reach. Segmenting means splitting a broad audience where needs differ, so the little time you have goes to the people your launch depends on.",
  parts:{title:"From broad to specific",items:[
   {label:"Broad audiences",text:"Grouped from your stakeholder map by what they need and what you need from them.",example:"For a repair café: residents, volunteers, partners and small funders."},
   {label:"Segments",text:"Splits within an audience where needs differ, each given a priority.",example:"Early adopters who love trying things; cautious residents who want proof first."},
   {label:"Persona",text:"A short portrait of a typical member of a segment, drawn from real conversations.",example:"María, 64, mends her own clothes, distrusts apps and hears news at the market."}]},
  why:{title:"Why it matters",points:["Different people need different messages before they act.","Priorities stop you spreading your time too thin.","Personas from real conversations replace guesses and stereotypes."]},
  use:{title:"What it guides",points:["Your messaging framework: a version for each priority audience.","Your channel choices: where each segment already spends time.","Your campaigns: one audience, one action."]},
  mistakes:{title:"What to avoid",points:["Writing for “everyone”.","Building personas from stereotypes or your own guesses.","Not noting how many people you actually spoke to."]}
 });
 add('108.audiences','es',{
  what:"Las audiencias son los grupos de personas que necesitas alcanzar. Segmentar es dividir una audiencia amplia donde las necesidades difieren, para dar tu poco tiempo a quienes sostienen tu lanzamiento.",
  parts:{title:"De lo amplio a lo concreto",items:[
   {label:"Audiencias amplias",text:"Agrupadas desde tu mapa de actores según lo que necesitan y lo que necesitas de ellas.",example:"Para un café de reparación: vecinos, voluntarios, aliados y pequeños financiadores."},
   {label:"Segmentos",text:"Divisiones dentro de una audiencia donde las necesidades difieren, cada una con prioridad.",example:"Quienes adoran probar cosas nuevas; vecinos cautelosos que primero quieren pruebas."},
   {label:"Perfil",text:"Un retrato breve de alguien típico de un segmento, basado en conversaciones reales.",example:"María, 64 años, arregla su ropa, desconfía de las apps y se entera de todo en el mercado."}]},
  why:{title:"Por qué importa",points:["Personas distintas necesitan mensajes distintos para actuar.","Las prioridades evitan que repartas demasiado tu tiempo.","Los perfiles basados en conversaciones reales reemplazan suposiciones y estereotipos."]},
  use:{title:"Qué orienta",points:["Tu marco de mensajes: una versión por audiencia prioritaria.","Tus canales: dónde pasa ya su tiempo cada segmento.","Tus campañas: una audiencia, una acción."]},
  mistakes:{title:"Qué evitar",points:["Escribir para “todo el mundo”.","Crear perfiles a partir de estereotipos o de tus suposiciones.","No anotar con cuántas personas hablaste de verdad."]}
 });

 add('108.messaging','en',{
  what:"A messaging framework keeps everyone saying the same essential things in ways that fit each audience. It has a core message, about three supporting messages with proof points, and audience versions.",
  parts:{title:"A message house",items:[
   {label:"Core message",text:"What you do and why it matters, in one or two sentences.",example:"Free Saturday coding clubs where young people aged 12–16 build real apps."},
   {label:"Supporting messages",text:"About three reasons to believe or act.",example:"They make real things; volunteers show real careers; trained adults keep it safe."},
   {label:"Proof points",text:"Evidence under each message, or what you will measure and when.",example:"Session plan tested with ten young people; confidence measured from the first term."},
   {label:"Audience versions",text:"The same core, adapted for each priority audience.",example:"Parents: “A free, supervised club where your child builds an app.”"}]},
  why:{title:"Why it matters",points:["You and anyone who joins describe the work the same way.","Proof points make a new initiative credible.","Tested messages make people act, not only understand."]},
  use:{title:"Where you will use it",points:["Your website, social posts and newsletters.","Your proposals, applications and press kit.","Your campaigns and calls to action."]},
  mistakes:{title:"What to avoid",points:["Claiming outcomes you have not seen yet.","Figures you cannot source, or never update.","Printing messages before testing them with real people."]}
 });
 add('108.messaging','es',{
  what:"Un marco de mensajes hace que todos digan lo esencial de la misma forma, adaptado a cada audiencia. Tiene un mensaje central, unos tres mensajes de apoyo con pruebas y versiones por audiencia.",
  parts:{title:"Una casa de mensajes",items:[
   {label:"Mensaje central",text:"Qué haces y por qué importa, en una o dos frases.",example:"Clubes gratuitos de programación los sábados donde jóvenes de 12 a 16 crean apps reales."},
   {label:"Mensajes de apoyo",text:"Unas tres razones para creer o actuar.",example:"Crean cosas reales; voluntarios muestran oficios reales; adultos formados los cuidan."},
   {label:"Pruebas",text:"Evidencia bajo cada mensaje, o qué medirás y cuándo.",example:"Plan de sesión probado con diez jóvenes; confianza medida desde el primer trimestre."},
   {label:"Versiones por audiencia",text:"El mismo centro, adaptado a cada audiencia prioritaria.",example:"Familias: “Un club gratuito y supervisado donde tu hijo crea una app.”"}]},
  why:{title:"Por qué importa",points:["Tú y quienes se sumen describen el trabajo igual.","Las pruebas dan credibilidad a algo nuevo.","Los mensajes probados hacen actuar, no solo entender."]},
  use:{title:"Dónde lo usarás",points:["Tu sitio web, publicaciones y boletines.","Tus propuestas, solicitudes y kit de prensa.","Tus campañas y llamados a la acción."]},
  mistakes:{title:"Qué evitar",points:["Afirmar resultados que aún no has visto.","Cifras sin fuente, o que nunca actualizas.","Imprimir mensajes antes de probarlos con personas reales."]}
 });

 add('108.storytelling','en',{
  what:"Stories help people understand change in a way numbers alone cannot. Ethical storytelling puts the dignity, safety and agency of the people in the story first, before the needs of your launch.",
  parts:{title:"Three rules for ethical stories",items:[
   {label:"Informed consent",text:"People know where it will be used, for how long, and that they can withdraw.",example:"A trainee baker agrees to a photo on the website for one year."},
   {label:"Their own words",text:"People tell their story themselves where possible and see the final version.",example:"A youth club member reads and approves her quote before it is posted."},
   {label:"Protect from harm",text:"Change or remove identifying details, and do not publish when the risk outweighs the benefit.",example:"A participant’s street and school are left out of the story."}]},
  examples:{title:"Stories you can tell before launch",items:["The problem, told truthfully and without pity.","Why you started, and what you saw that others missed.","The first people who tried what you are building."]},
  why:{title:"Why it matters",points:["Stories make change real for funders, supporters and customers.","Rules set before your first post are easier than fixing habits.","Breaking someone’s trust can harm them and end yours."]},
  use:{title:"Where it applies",points:["Your website, newsletters, campaigns and press work.","Your consent log, checked before anything is published.","Your proof points, alongside the numbers from your MEAL data."]},
  mistakes:{title:"What to avoid",points:["Images and words that show people as helpless.","Publishing details that could identify someone at risk.","Losing track of consent: keep a log from the first story."]}
 });
 add('108.storytelling','es',{
  what:"Las historias ayudan a entender el cambio como los números solos no pueden. Contar historias con ética pone primero la dignidad, la seguridad y la voz de sus protagonistas, antes que tu lanzamiento.",
  parts:{title:"Tres reglas para historias éticas",items:[
   {label:"Consentimiento informado",text:"Las personas saben dónde se usará, por cuánto tiempo y que pueden retirarlo.",example:"Una aprendiz de panadería acepta una foto en la web durante un año."},
   {label:"Sus propias palabras",text:"Las personas cuentan su historia cuando es posible y ven la versión final.",example:"Una miembro del club juvenil lee y aprueba su cita antes de publicarla."},
   {label:"Proteger del daño",text:"Cambia o quita datos que identifiquen, y no publiques si el riesgo supera el beneficio.",example:"La calle y la escuela de un participante quedan fuera de la historia."}]},
  examples:{title:"Historias para contar antes de lanzar",items:["El problema, contado con verdad y sin lástima.","Por qué empezaste y qué viste que otros no vieron.","Las primeras personas que probaron lo que construyes."]},
  why:{title:"Por qué importa",points:["Las historias hacen real el cambio para financiadores, apoyos y clientes.","Las reglas fijadas antes de publicar son más fáciles que corregir hábitos.","Romper la confianza de alguien puede dañarle y acabar con la tuya."]},
  use:{title:"Dónde se aplica",points:["Tu sitio web, boletines, campañas y trabajo con prensa.","Tu registro de consentimiento, revisado antes de publicar.","Tus pruebas, junto a las cifras de tus datos MEAL."]},
  mistakes:{title:"Qué evitar",points:["Imágenes y palabras que muestran a las personas indefensas.","Publicar datos que podrían identificar a alguien en riesgo.","Perder el control del consentimiento: llévalo desde la primera historia."]}
 });

 add('108.website','en',{
  what:"Your website is often where people check whether you are real, relevant and trustworthy. Discoverability means people can find it when they search. At the start, one good page can be enough.",
  parts:{title:"What a first site needs",items:[
   {label:"Who and what",text:"Who you are, what you are building, for whom and the difference you aim for.",example:"A repair café’s home page: “Free repair help, every second Saturday.”"},
   {label:"Clear actions",text:"Pages organised around what visitors need to do.",example:"Buttons to book a repair, volunteer or support the café."},
   {label:"Trust signals",text:"Founders, your legal status or registration, and how you handle data.",example:"An “About” section naming the founders, plus a short privacy note."},
   {label:"Discoverability",text:"Your audiences’ words, clear page titles, directory listings and partner links.",example:"A free map listing and a link from the library’s events page."}]},
  why:{title:"Why it matters",points:["People check you online before they trust you.","For something new, that first check matters even more.","A clear page turns curiosity into a sign-up."]},
  use:{title:"What it connects to",points:["Your campaigns and posts send people here to act.","Your trust signals and policies live here.","Your measurement: forms and tracked links show what works."]},
  mistakes:{title:"What to avoid",points:["Pages built around your structure, not visitors’ tasks.","A site that is slow or hard to read on a phone.","Search tricks instead of useful, accurate content."]}
 });
 add('108.website','es',{
  what:"Tu sitio web suele ser donde la gente comprueba si eres real, relevante y confiable. Ser visible significa que te encuentran cuando buscan. Al inicio, puede bastar una buena página.",
  parts:{title:"Qué necesita un primer sitio",items:[
   {label:"Quién y qué",text:"Quién eres, qué construyes, para quién y qué diferencia buscas.",example:"Inicio de un café de reparación: “Ayuda gratis para reparar, un sábado sí y otro no.”"},
   {label:"Acciones claras",text:"Páginas organizadas según lo que el visitante necesita hacer.",example:"Botones para reservar una reparación, ser voluntario o apoyar el café."},
   {label:"Señales de confianza",text:"Fundadores, tu estatus legal o registro, y cómo tratas los datos.",example:"Una sección “Quiénes somos” con las personas fundadoras y una nota de privacidad."},
   {label:"Visibilidad",text:"Las palabras de tus audiencias, títulos claros, directorios y enlaces de aliados.",example:"Un perfil gratuito en mapas y un enlace desde la agenda de la biblioteca."}]},
  why:{title:"Por qué importa",points:["La gente te revisa en línea antes de confiar.","Para algo nuevo, esa primera revisión importa aún más.","Una página clara convierte la curiosidad en inscripción."]},
  use:{title:"Con qué se conecta",points:["Tus campañas y publicaciones traen aquí a la gente para actuar.","Aquí viven tus señales de confianza y tus políticas.","Tu medición: formularios y enlaces rastreados muestran qué funciona."]},
  mistakes:{title:"Qué evitar",points:["Páginas organizadas según tu estructura, no según el visitante.","Un sitio lento o difícil de leer en el teléfono.","Trucos de búsqueda en vez de contenido útil y exacto."]}
 });

 add('108.social','en',{
  what:"Social media lets you reach your priority audiences where they already spend time. Choose the channel your audience uses, not the one you like best, give it a clear purpose and set rules from day one.",
  parts:{title:"Choosing and running a channel",items:[
   {label:"Fit the audience",text:"Go where priority audiences already are, thinking about language and data costs.",example:"A broadcast list in parents’ own language for the tutoring service."},
   {label:"Give it a purpose",text:"Community, news, recruiting, support, advocacy or customer service.",example:"The bakery’s social account exists to find café buyers."},
   {label:"Mix the content",text:"Stories, practical information, behind the scenes, calls to action and replies.",example:"Monday: opening times; Wednesday: a trainee at work; Friday: order now."},
   {label:"Rules from day one",text:"Who posts, what needs approval, how you moderate, and shared access to logins.",example:"Account opened with the bakery’s email; a co-founder can also reach the password."}]},
  why:{title:"Why it matters",points:["One channel done well beats five done badly.","Safety rules protect participants, their images and their data.","Shared logins mean you never lose an account with one person."]},
  use:{title:"What it connects to",points:["Your content calendar, which fills each channel.","Your campaigns, which use it to drive one action.","Your social media policy, which grows from these rules."]},
  mistakes:{title:"What to avoid",points:["Opening accounts on every platform at once.","A personal email, or one person holding all the logins.","Posting images of participants without consent."]}
 });
 add('108.social','es',{
  what:"Las redes sociales te permiten llegar a tus audiencias prioritarias donde ya pasan su tiempo. Elige el canal que usa tu audiencia, no el que más te gusta, dale un propósito y fija reglas desde el primer día.",
  parts:{title:"Elegir y llevar un canal",items:[
   {label:"Ajústalo a la audiencia",text:"Ve donde ya están tus audiencias, pensando en idioma y costo de datos.",example:"Una lista de difusión en el idioma de las familias para el servicio de tutorías."},
   {label:"Dale un propósito",text:"Comunidad, noticias, reclutar, apoyos, incidencia o atención al cliente.",example:"La cuenta de la panadería existe para encontrar cafés compradores."},
   {label:"Mezcla contenidos",text:"Historias, información práctica, detrás de escena, llamados a la acción y respuestas.",example:"Lunes: horarios; miércoles: una aprendiz trabajando; viernes: haz tu pedido."},
   {label:"Reglas desde el inicio",text:"Quién publica, qué se aprueba, cómo moderas y acceso compartido a las claves.",example:"Cuenta abierta con el correo de la panadería; un cofundador también accede a la clave."}]},
  why:{title:"Por qué importa",points:["Un canal bien llevado vale más que cinco mal llevados.","Las reglas protegen a participantes, sus imágenes y sus datos.","Con claves compartidas nunca pierdes una cuenta por una persona."]},
  use:{title:"Con qué se conecta",points:["Tu calendario de contenidos, que llena cada canal.","Tus campañas, que lo usan para lograr una acción.","Tu política de redes sociales, que nace de estas reglas."]},
  mistakes:{title:"Qué evitar",points:["Abrir cuentas en todas las plataformas a la vez.","Un correo personal, o una sola persona con todas las claves.","Publicar imágenes de participantes sin consentimiento."]}
 });

 add('108.email','en',{
  what:"Email lets you own the relationship with people who chose to hear from you. A newsletter keeps them informed; a journey is a planned sequence of messages triggered by an action, such as signing up.",
  parts:{title:"Three building blocks",items:[
   {label:"A consented list",text:"Contacts collected with clear consent, starting from your first conversations.",example:"Fifty neighbours who signed up at the repair café’s stall."},
   {label:"Newsletter",text:"Regular updates that keep people informed.",example:"A monthly note: what we fixed, the next dates and one volunteer story."},
   {label:"Welcome journey",text:"Three emails after sign-up: thanks, the difference you aim for, how to get involved.",example:"Day 1, thank you; day 4, why repair matters; day 10, how to volunteer."}]},
  why:{title:"Why it matters",points:["Fifty people who asked to hear from you beat thousands borrowed.","A welcome journey builds relationships far better than silence.","You do not depend on a platform changing its rules."]},
  use:{title:"Where you will use it",points:["Your launch: a list ready before you open.","Your campaigns and calls for support.","Your measurement: replies, sign-ups and repeat support."]},
  mistakes:{title:"What to avoid",points:["Adding people without consent, or making unsubscribing hard.","Vague subject lines that hide what is inside.","Measuring only opens instead of actions."]}
 });
 add('108.email','es',{
  what:"El correo te permite ser dueño de la relación con quienes eligieron saber de ti. Un boletín les informa; un recorrido es una serie planificada de mensajes que se activa con una acción, como inscribirse.",
  parts:{title:"Tres piezas básicas",items:[
   {label:"Una lista con consentimiento",text:"Contactos reunidos con consentimiento claro, desde tus primeras conversaciones.",example:"Cincuenta vecinos que se apuntaron en el puesto del café de reparación."},
   {label:"Boletín",text:"Novedades regulares que mantienen informada a la gente.",example:"Una nota mensual: qué reparamos, próximas fechas y la historia de un voluntario."},
   {label:"Recorrido de bienvenida",text:"Tres correos tras inscribirse: gracias, la diferencia que buscas y cómo sumarse.",example:"Día 1, gracias; día 4, por qué reparar importa; día 10, cómo ser voluntario."}]},
  why:{title:"Por qué importa",points:["Cincuenta personas que pidieron saber de ti valen más que miles prestadas.","Una bienvenida crea relaciones mucho mejor que el silencio.","No dependes de que una plataforma cambie sus reglas."]},
  use:{title:"Dónde lo usarás",points:["Tu lanzamiento: una lista lista antes de abrir.","Tus campañas y pedidos de apoyo.","Tu medición: respuestas, inscripciones y apoyo repetido."]},
  mistakes:{title:"Qué evitar",points:["Agregar personas sin consentimiento o dificultar la baja.","Asuntos vagos que esconden el contenido.","Medir solo aperturas en vez de acciones."]}
 });

 add('108.content','en',{
  what:"A content strategy decides what you will publish, for whom, why and how often. An editorial calendar plans that content a few weeks ahead, so you are ready for key moments like your launch.",
  parts:{title:"Pillars, calendar and reuse",items:[
   {label:"Content pillars",text:"Three to five recurring themes linked to your objectives and messages.",example:"A youth club: why we started, behind the scenes, members’ projects, join us."},
   {label:"Editorial calendar",text:"Date, channel, pillar, message, format and owner, planned a few weeks ahead.",example:"Week 1, Tuesday: a members’ project photo on the club’s channel, posted by Leo."},
   {label:"Batching and reuse",text:"Make content in batches and adapt one piece across several channels.",example:"One launch-day video becomes a post, a newsletter item and a poster."}]},
  why:{title:"Why it matters",points:["Planning ahead prepares you for your launch and key moments.","Pillars keep content tied to your objectives.","Batching saves a founder’s scarce time."]},
  use:{title:"What it plans for",points:["Your launch, first sessions, seasons and deadlines.","Your social media, newsletter and website.","Your reviews: adjust the mix as you learn what works."]},
  mistakes:{title:"What to avoid",points:["Planning more than the time you really have.","Starting every piece from zero.","Leaving no room for news you cannot plan."]}
 });
 add('108.content','es',{
  what:"Una estrategia de contenidos decide qué publicarás, para quién, por qué y con qué frecuencia. Un calendario editorial lo planifica con semanas de anticipación, para llegar listo a momentos clave como tu lanzamiento.",
  parts:{title:"Pilares, calendario y reutilización",items:[
   {label:"Pilares de contenido",text:"De tres a cinco temas recurrentes vinculados a tus objetivos y mensajes.",example:"Un club juvenil: por qué empezamos, detrás de escena, proyectos de miembros, súmate."},
   {label:"Calendario editorial",text:"Fecha, canal, pilar, mensaje, formato y responsable, con semanas de anticipación.",example:"Semana 1, martes: foto de un proyecto en el canal del club, publicada por Leo."},
   {label:"Tandas y reutilización",text:"Crea por tandas y adapta una pieza a varios canales.",example:"Un video del lanzamiento se vuelve publicación, nota del boletín y cartel."}]},
  why:{title:"Por qué importa",points:["Planificar te prepara para el lanzamiento y los momentos clave.","Los pilares atan el contenido a tus objetivos.","Trabajar por tandas ahorra el poco tiempo que tienes."]},
  use:{title:"Para qué planifica",points:["Tu lanzamiento, primeras sesiones, temporadas y plazos.","Tus redes sociales, boletín y sitio web.","Tus revisiones: ajusta la mezcla según lo que funciona."]},
  mistakes:{title:"Qué evitar",points:["Planificar más de lo que tu tiempo permite.","Empezar cada pieza desde cero.","No dejar espacio para noticias imprevistas."]}
 });

 add('108.campaigns','en',{
  what:"A campaign is a time-bound, coordinated push to get one result from one audience, with one clear call to action. For something new, the first campaign is often the launch itself.",
  parts:{title:"The campaign brief",items:[
   {label:"Goal and audience",text:"One result you can measure, from one audience.",example:"Twenty households pre-order bread from the trainee bakery in March."},
   {label:"Insight and message",text:"What the audience cares about, and what you will say.",example:"They want fresh bread nearby: “Fresh each morning, baked by local trainees.”"},
   {label:"Call to action",text:"One specific, easy step: book, sign up, pre-order, join or apply.",example:"Pre-order by message before Friday."},
   {label:"Plan and risks",text:"Channels, timeline, budget, owner, risks and approvals.",example:"Four weeks of flyers and a chat group, led by the founder, small print budget."}]},
  why:{title:"Why it matters",points:["A focused push gets results that scattered posts do not.","Your launch is the first real test of your messages.","A brief helps everyone involved pull in one direction."]},
  use:{title:"Where you will use it",points:["Your launch: first participants, customers, members or volunteers.","Your measurement: the result compared with the goal.","Your next campaign, improved by what you learned."]},
  mistakes:{title:"What to avoid",points:["Several calls to action in one campaign.","Advocacy claims without evidence, or ignoring the rules on political activity.","No review afterwards of what to keep and what to change."]}
 });
 add('108.campaigns','es',{
  what:"Una campaña es un esfuerzo coordinado y con plazo para lograr un resultado de una audiencia, con un llamado a la acción claro. Para algo nuevo, la primera campaña suele ser el propio lanzamiento.",
  parts:{title:"El plan de campaña",items:[
   {label:"Meta y audiencia",text:"Un resultado medible, de una sola audiencia.",example:"Veinte hogares encargan pan a la panadería de aprendices en marzo."},
   {label:"Clave y mensaje",text:"Lo que le importa a la audiencia y lo que dirás.",example:"Quieren pan fresco cerca: “Recién horneado cada mañana por aprendices del barrio.”"},
   {label:"Llamado a la acción",text:"Un paso concreto y fácil: reservar, inscribirse, encargar, sumarse o postular.",example:"Encarga por mensaje antes del viernes."},
   {label:"Plan y riesgos",text:"Canales, plazos, presupuesto, responsable, riesgos y aprobaciones.",example:"Cuatro semanas de volantes y un chat, a cargo de la fundadora, poco gasto de impresión."}]},
  why:{title:"Por qué importa",points:["Un esfuerzo enfocado logra lo que publicaciones sueltas no logran.","Tu lanzamiento es la primera prueba real de tus mensajes.","Un plan ayuda a que todos tiren en la misma dirección."]},
  use:{title:"Dónde lo usarás",points:["Tu lanzamiento: primeros participantes, clientes, miembros o voluntarios.","Tu medición: el resultado frente a la meta.","Tu siguiente campaña, mejorada con lo aprendido."]},
  mistakes:{title:"Qué evitar",points:["Varios llamados a la acción en una sola campaña.","Incidencia sin evidencia, o ignorar las normas sobre actividad política.","No revisar después qué mantener y qué cambiar."]}
 });

 add('108.community','en',{
  what:"A community is a group of people who feel connected to your cause and to each other, not only to you. Building one early, among your first supporters, widens your reach and tests your ideas.",
  parts:{title:"Ways to build it",items:[
   {label:"Reasons to connect",text:"Events, peer groups, online spaces and shared projects.",example:"A monthly fix-along evening for the repair café’s regulars."},
   {label:"Roles and recognition",text:"Give people roles, a say and credit, so they co-create with you.",example:"Regulars run the sewing table and choose the next workshop."},
   {label:"Safe spaces",text:"Clear guidelines, respectful moderation and protected personal data.",example:"Group rules pinned in the chat, two moderators and phone numbers kept hidden."}]},
  why:{title:"Why it matters",points:["Your first members tell you what you would not otherwise learn.","A community spreads the word further than you can alone.","Co-creators stay longer than an audience does."]},
  use:{title:"What it feeds",points:["Testing new ideas before you launch them.","Finding volunteers and supporters among members.","Your measurement: participation and contribution."]},
  mistakes:{title:"What to avoid",points:["Broadcasting more than listening.","Opening spaces you do not have time to look after.","Counting followers instead of participation."]}
 });
 add('108.community','es',{
  what:"Una comunidad es un grupo de personas que se sienten unidas a tu causa y entre sí, no solo a ti. Construirla pronto, con tus primeros apoyos, amplía tu alcance y pone a prueba tus ideas.",
  parts:{title:"Cómo construirla",items:[
   {label:"Motivos para conectar",text:"Eventos, grupos de pares, espacios en línea y proyectos compartidos.",example:"Una tarde mensual de “reparemos juntos” para los habituales del café."},
   {label:"Roles y reconocimiento",text:"Da roles, voz y crédito, para que creen contigo.",example:"Los habituales llevan la mesa de costura y eligen el próximo taller."},
   {label:"Espacios seguros",text:"Normas claras, moderación respetuosa y datos personales protegidos.",example:"Normas fijadas en el chat, dos moderadores y números de teléfono ocultos."}]},
  why:{title:"Por qué importa",points:["Tus primeros miembros te cuentan lo que no sabrías de otro modo.","Una comunidad corre la voz más lejos que tú solo.","Quienes crean contigo se quedan más que una audiencia."]},
  use:{title:"Qué alimenta",points:["Probar ideas nuevas antes de lanzarlas.","Encontrar voluntarios y apoyos entre los miembros.","Tu medición: participación y aportes."]},
  mistakes:{title:"Qué evitar",points:["Difundir más de lo que escuchas.","Abrir espacios que no tienes tiempo de cuidar.","Contar seguidores en vez de participación."]}
 });

 add('108.media','en',{
  what:"Media relations means building relationships with journalists so they cover your work. Coverage builds credibility and reaches people you could not reach alone, which matters when nobody knows you yet.",
  parts:{title:"Getting ready for the media",items:[
   {label:"A newsworthy angle",text:"Timely, local, human stories with evidence and people willing to speak.",example:"Local radio covers the youth club’s launch and its first community project."},
   {label:"Press kit",text:"Short and long descriptions, facts, founder biographies, consented photos, logos and contacts.",example:"Two pages and a photo folder, ready to send in a minute."},
   {label:"Spokespeople",text:"Agreed people who speak, with key messages prepared.",example:"Only the two founders speak; members appear only with consent and support."}]},
  why:{title:"Why it matters",points:["Coverage builds credibility when you have no track record.","Local outlets often reach your audiences better than national ones.","Preparation protects participants and keeps your messages clear."]},
  use:{title:"When you will use it",points:["Your launch and your first results.","Alongside your messaging framework and proof points.","Your crisis plan: who speaks if something goes wrong."]},
  mistakes:{title:"What to avoid",points:["Mass mailing journalists instead of building a few relationships.","Putting a participant in front of the media without consent and support.","Promising results you have not yet achieved."]}
 });
 add('108.media','es',{
  what:"Las relaciones con medios consisten en cultivar vínculos con periodistas para que cubran tu trabajo. La cobertura da credibilidad y llega a gente que no alcanzarías solo, algo clave cuando nadie te conoce.",
  parts:{title:"Prepararte para los medios",items:[
   {label:"Un ángulo noticioso",text:"Historias actuales, locales y humanas, con evidencia y personas dispuestas a hablar.",example:"La radio local cubre el lanzamiento del club juvenil y su primer proyecto comunitario."},
   {label:"Kit de prensa",text:"Descripción breve y larga, datos, biografías, fotos con consentimiento, logos y contactos.",example:"Dos páginas y una carpeta de fotos, listas para enviar en un minuto."},
   {label:"Voceros",text:"Personas acordadas que hablan, con mensajes clave preparados.",example:"Solo hablan los dos fundadores; los miembros aparecen solo con consentimiento y apoyo."}]},
  why:{title:"Por qué importa",points:["La cobertura da credibilidad cuando no tienes trayectoria.","Los medios locales suelen llegar mejor a tus audiencias que los nacionales.","Prepararte protege a participantes y mantiene claros tus mensajes."]},
  use:{title:"Cuándo lo usarás",points:["Tu lanzamiento y tus primeros resultados.","Junto a tu marco de mensajes y tus pruebas.","Tu plan de crisis: quién habla si algo sale mal."]},
  mistakes:{title:"Qué evitar",points:["Enviar correos masivos a periodistas en vez de cultivar pocas relaciones.","Exponer a un participante ante los medios sin consentimiento ni apoyo.","Prometer resultados que aún no has logrado."]}
 });

 add('108.reputation','en',{
  what:"Reputation is the result of everything you do, not only what you say. Crisis communication is how you respond when something goes wrong; a social media policy sets the rules before it does.",
  parts:{title:"Prepare before a crisis",items:[
   {label:"Likely scenarios",text:"The problems most likely to hit you, and who leads the response.",example:"For a tutoring service: a data breach or a complaint about a tutor."},
   {label:"Holding statements",text:"Short, truthful drafts ready to adapt and send quickly.",example:"“We know about the issue, pupils are safe, and we will update you by Friday.”"},
   {label:"Who to tell",text:"Co-founders, advisers, funders, regulators, partners and any insurer, with current contacts.",example:"A one-page contact list, kept both on paper and online."},
   {label:"Social media policy",text:"Rules for official accounts and guidance for anyone who mentions you.",example:"No photos of pupils without consent, even on volunteers’ own accounts."}]},
  why:{title:"Why it matters",points:["Something new has little reputation to fall back on.","One problem can shape how people see you for a long time.","Preparation lets you act quickly and truthfully under pressure."]},
  use:{title:"What it connects to",points:["Your safeguarding and complaints procedures.","Briefing the first people who join, and volunteers.","Your media relations: who speaks in a crisis."]},
  mistakes:{title:"What to avoid",points:["Speculating, or hiding the truth.","Putting your reputation before people’s safety.","Going silent instead of giving regular updates."]}
 });
 add('108.reputation','es',{
  what:"La reputación es el resultado de todo lo que haces, no solo de lo que dices. La comunicación de crisis es cómo respondes cuando algo sale mal; una política de redes fija las reglas antes.",
  parts:{title:"Prepárate antes de una crisis",items:[
   {label:"Escenarios probables",text:"Los problemas que más podrían afectarte, y quién lidera la respuesta.",example:"Para un servicio de tutorías: una filtración de datos o una queja sobre un tutor."},
   {label:"Declaraciones iniciales",text:"Borradores breves y veraces, listos para adaptar y enviar rápido.",example:"“Sabemos del problema, los alumnos están a salvo y daremos novedades el viernes.”"},
   {label:"A quién avisar",text:"Cofundadores, asesores, financiadores, reguladores, aliados y aseguradora, con contactos al día.",example:"Una lista de contactos de una página, en papel y en línea."},
   {label:"Política de redes",text:"Reglas para cuentas oficiales y pautas para quien te mencione.",example:"Ninguna foto de alumnos sin consentimiento, ni en las cuentas personales de voluntarios."}]},
  why:{title:"Por qué importa",points:["Algo nuevo tiene poca reputación que lo respalde.","Un solo problema puede marcar cómo te ven por mucho tiempo.","Prepararte te permite actuar rápido y con verdad bajo presión."]},
  use:{title:"Con qué se conecta",points:["Tus procedimientos de protección y quejas.","La orientación de las primeras personas que se sumen y de voluntarios.","Tus relaciones con medios: quién habla en una crisis."]},
  mistakes:{title:"Qué evitar",points:["Especular u ocultar la verdad.","Poner tu reputación por delante de la seguridad de las personas.","Callar en vez de dar novedades regulares."]}
 });

 add('108.measurement','en',{
  what:"Measuring communications means checking whether people took the action you needed, not only how many saw your message. You measure at three levels: outputs, engagement and outcomes.",
  parts:{title:"Three levels of measurement",items:[
   {label:"Outputs and reach",text:"What you produced, and who saw it.",example:"200 flyers handed out at two schools; eight posts in the first month."},
   {label:"Engagement",text:"How people interacted with it.",example:"About 40 enquiries and 60 clicks on the sign-up link."},
   {label:"Outcomes",text:"Whether people took the action you needed.",example:"12 young people signed up with parent consent, against a target of 15."}]},
  why:{title:"Why it matters",points:["Reach and likes are tempting but rarely the goal.","Outcome measures show which efforts deserve your time.","Testing one change at a time shows what really works."]},
  use:{title:"What it guides",points:["Each communication objective, with one or two outcome measures.","Your MEAL routine, with monthly or quarterly reviews.","Your next campaign and your content mix."]},
  mistakes:{title:"What to avoid",points:["Counting likes as success.","Launching without tracked links or “How did you hear about us?”","Changing many things at once, so you cannot tell what worked."]}
 });
 add('108.measurement','es',{
  what:"Medir la comunicación es comprobar si la gente hizo lo que necesitabas, no solo cuántos vieron tu mensaje. Se mide en tres niveles: productos, interacción y resultados.",
  parts:{title:"Tres niveles de medición",items:[
   {label:"Productos y alcance",text:"Lo que produjiste y quién lo vio.",example:"200 volantes repartidos en dos escuelas; ocho publicaciones el primer mes."},
   {label:"Interacción",text:"Cómo interactuó la gente.",example:"Unas 40 consultas y 60 clics en el enlace de inscripción."},
   {label:"Resultados",text:"Si la gente hizo lo que necesitabas.",example:"12 jóvenes inscritos con permiso de sus familias, frente a una meta de 15."}]},
  why:{title:"Por qué importa",points:["El alcance y los “me gusta” tientan, pero rara vez son la meta.","Las medidas de resultado muestran qué esfuerzos merecen tu tiempo.","Probar un cambio a la vez muestra qué funciona de verdad."]},
  use:{title:"Qué orienta",points:["Cada objetivo de comunicación, con una o dos medidas de resultado.","Tu rutina MEAL, con revisiones mensuales o trimestrales.","Tu próxima campaña y tu mezcla de contenidos."]},
  mistakes:{title:"Qué evitar",points:["Contar los “me gusta” como éxito.","Lanzar sin enlaces rastreados ni “¿Cómo supiste de nosotros?”","Cambiar muchas cosas a la vez, sin saber qué funcionó."]}
 });
})();
