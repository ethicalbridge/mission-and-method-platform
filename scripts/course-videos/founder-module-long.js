// Longer module introduction videos (entrepreneurs). Rendered by lesson-template.html (kind=module).
(function(){
 const add=(id,lang,long)=>{(window.MODULE_VIDEOS[id]||={})[lang]={...(window.MODULE_VIDEOS[id]?.[lang]||{}),long};};

 // Module 00 · Start here
 add('100','en',{
  what:'This free module shows the whole path from idea to launch. You describe what you are building in plain facts and check where you stand today, so you can answer one question: where should I start?',
  why:{title:'Why start here',points:['Seeing the whole journey first shows how each decision builds on the one before.','Writing plain facts exposes gaps and open questions you might otherwise guess at.','An honest baseline lets you choose priorities instead of trying to fix everything.']},
  outcomes:{title:'What you will have',points:['A clear picture of the modules ahead and the order they follow.','A one-page Founding Profile of your idea, with open questions marked.','A baseline health check to compare against when you finish.']},
  tips:{title:'Getting the most from it',points:['Give it one focused sitting; it is short and sets up everything else.','Fill in the profile with your co-founder or a trusted early supporter.','Watch our example bakery: it grows with you from this module to the last.']}
 });
 add('100','es',{
  what:'Este módulo gratuito muestra el camino completo, de la idea al lanzamiento. Describes lo que estás creando con hechos claros y revisas dónde estás hoy, para responder una pregunta: ¿por dónde empiezo?',
  why:{title:'Por qué empezar aquí',points:['Ver todo el recorrido primero muestra cómo cada decisión se apoya en la anterior.','Escribir hechos claros revela vacíos y preguntas abiertas que, si no, adivinarías.','Un punto de partida honesto te permite elegir prioridades en vez de arreglarlo todo.']},
  outcomes:{title:'Lo que tendrás',points:['Una visión clara de los módulos que vienen y del orden que siguen.','Un perfil fundacional de una página, con las preguntas abiertas señaladas.','Un diagnóstico inicial para comparar cuando termines.']},
  tips:{title:'Para aprovecharlo al máximo',points:['Dedícale una sesión con calma; es breve y prepara todo lo demás.','Completa el perfil junto a quien cofunda contigo o a alguien de confianza.','Sigue a nuestra panadería de ejemplo: crece contigo desde este módulo hasta el último.']}
 });

 // Module 01 · Strategic foundations
 add('101','en',{
  what:'This module helps you make the connected decisions everything else rests on: why your idea should exist, who it is for, what you value, which form it takes, where you add unique value and what comes first.',
  why:{title:'Why it matters now',points:['Every later choice, from hiring to branding, depends on these decisions.','Deciding early is cheaper than changing direction after you have launched.','Clear priorities help you say no to good ideas that do not fit.']},
  outcomes:{title:'By the end you will have',points:['A purpose, vision and mission you can explain in one sentence each.','Values described as behaviour, and a first choice of legal form.','A clear position and a few strategic objectives, external and internal.']},
  tips:{title:'How to work through it',points:['Take it lesson by lesson over several sessions; these decisions deserve time.','Test your mission and positioning with a few people you hope to serve.','Compare each step with our example bakery’s purpose, mission and objectives.']}
 });
 add('101','es',{
  what:'Este módulo te ayuda a tomar las decisiones conectadas en las que se apoya todo: por qué debe existir tu idea, para quién es, qué valoras, qué forma tendrá, dónde aportas valor único y qué va primero.',
  why:{title:'Por qué importa ahora',points:['Cada decisión posterior, de contratar a crear tu marca, depende de estas.','Decidir pronto cuesta menos que cambiar de rumbo después de lanzar.','Unas prioridades claras te ayudan a decir no a buenas ideas que no encajan.']},
  outcomes:{title:'Al terminar tendrás',points:['Un propósito, una visión y una misión que puedes explicar en una frase cada uno.','Valores descritos como conductas y una primera elección de forma jurídica.','Un posicionamiento claro y pocos objetivos estratégicos, externos e internos.']},
  tips:{title:'Cómo avanzar',points:['Avanza lección por lección en varias sesiones; estas decisiones merecen tiempo.','Prueba tu misión y tu posicionamiento con algunas personas a las que quieres servir.','Compara cada paso con el propósito, la misión y los objetivos de nuestra panadería de ejemplo.']}
 });

 // Module 02 · Theory of Change
 add('102','en',{
  what:'This module turns your external objectives into a Theory of Change: a reasoned explanation of how your planned work could lead to lasting change, and which assumptions must hold. It answers: if we do this, why would that change follow?',
  why:{title:'Why test your logic first',points:['Before launch, almost every link between your work and change is an assumption.','Naming the critical assumptions shows what to test before you spend money.','Funders and partners trust ideas whose reasoning they can follow and question.']},
  outcomes:{title:'What you will learn to do',points:['Describe the problem and its causes, not just the missing solution.','Draw one pathway per external objective, from inputs to long-term impact.','List the assumptions to test with the people affected, before and after launch.']},
  tips:{title:'Practical tips',points:['Start from the impact and work backwards; then read it forwards to check.','Show a draft to people affected by the problem and ask what is missing.','See how our example bakery links paid traineeships to young people’s first jobs.']}
 });
 add('102','es',{
  what:'Este módulo convierte tus objetivos externos en una Teoría de Cambio: una explicación razonada de cómo tu trabajo previsto podría generar un cambio duradero y qué supuestos deben cumplirse. Responde: si hacemos esto, ¿por qué seguiría ese cambio?',
  why:{title:'Por qué probar tu lógica primero',points:['Antes de lanzar, casi cada vínculo entre tu trabajo y el cambio es un supuesto.','Nombrar los supuestos críticos muestra qué probar antes de gastar dinero.','Financiadores y aliados confían en ideas cuyo razonamiento pueden seguir y cuestionar.']},
  outcomes:{title:'Lo que podrás hacer',points:['Describir el problema y sus causas, no solo la falta de una solución.','Trazar una ruta por cada objetivo externo, de los insumos al impacto duradero.','Listar los supuestos que probarás con las personas afectadas, antes y después de lanzar.']},
  tips:{title:'Consejos prácticos',points:['Empieza por el impacto y trabaja hacia atrás; luego léelo hacia adelante para revisar.','Muestra un borrador a personas afectadas por el problema y pregunta qué falta.','Mira cómo nuestra panadería de ejemplo vincula la formación de aprendices con su primer empleo.']}
 });

 // Module 03 · Structure, governance and accountability
 add('103','en',{
  what:'This module helps you design the work before the job titles: which functions you need, who decides what, how governance stays separate from daily management and who you answer to. It answers: how will we organise, decide and stay accountable?',
  why:{title:'Why set this up early',points:['Structure is easy to shape while you are small and hard to change later.','Unclear roles between co-founders are a common source of early conflict.','Funders and partners want to see who decides and who holds you to account.']},
  outcomes:{title:'What you will have',points:['A map of the functions your strategy needs and a simple organisation chart.','Role cards, approval limits and a RACI that make responsibilities explicit.','A governance set-up and a meeting rhythm that keep you accountable.']},
  tips:{title:'Working through it',points:['Work through it with your co-founders; agreeing roles together is part of the value.','Include work you have not started yet, so the structure can grow.','Our example bakery shows how two co-founders and an advisory group share decisions.']}
 });
 add('103','es',{
  what:'Este módulo te ayuda a diseñar el trabajo antes que los cargos: qué funciones necesitas, quién decide qué, cómo se separa la gobernanza de la gestión diaria y ante quién respondes. Responde: ¿cómo nos organizaremos, decidiremos y rendiremos cuentas?',
  why:{title:'Por qué organizarlo pronto',points:['La estructura es fácil de definir mientras eres pequeño y difícil de cambiar después.','Los roles poco claros entre cofundadores son una causa frecuente de conflictos tempranos.','Financiadores y aliados quieren ver quién decide y quién te pide cuentas.']},
  outcomes:{title:'Lo que tendrás',points:['Un mapa de las funciones que tu estrategia necesita y un organigrama sencillo.','Fichas de rol, límites de aprobación y una matriz RACI que aclaran responsabilidades.','Una forma de gobernanza y un ritmo de reuniones que sostienen la rendición de cuentas.']},
  tips:{title:'Cómo avanzar',points:['Trabájalo con quienes cofundan contigo; acordar los roles juntos es parte del valor.','Incluye el trabajo que aún no empezaste, para que la estructura pueda crecer.','Nuestra panadería de ejemplo muestra cómo dos cofundadores y un grupo asesor comparten decisiones.']}
 });

 // Module 04 · People, culture and volunteering
 add('104','en',{
  what:'This module helps you plan the people your idea needs, from co-founders to volunteers, and how you will treat them: fair recruitment, clear terms, a good start, regular check-ins, fair pay, a healthy culture and planned exits.',
  why:{title:'Why people come first',points:['Your first people shape your culture more than any written statement of values.','Fair terms set before the first role prevent unfair gaps and disputes later.','Clear agreements between co-founders protect both the idea and the friendship.']},
  outcomes:{title:'By the end you will have',points:['A workforce plan matching skills and time to the work, including your own.','Fair recruitment steps, written terms and an onboarding plan for every new person.','Pay principles, a clear offer for volunteers and a plan for when people leave.']},
  tips:{title:'Practical tips',points:['Start with yourselves: write down what each co-founder brings and can commit.','Ask someone you might recruit what would make them want to join.','Follow how our example bakery plans its trainees, their mentor and its first hires.']}
 });
 add('104','es',{
  what:'Este módulo te ayuda a planificar las personas que tu idea necesita, de cofundadores a voluntariado, y cómo las tratarás: selección justa, condiciones claras, un buen inicio, conversaciones periódicas, pago justo, una cultura sana y salidas planificadas.',
  why:{title:'Por qué las personas van primero',points:['Tus primeras personas definen la cultura más que cualquier declaración de valores escrita.','Condiciones justas definidas antes del primer rol evitan brechas y conflictos después.','Acuerdos claros entre cofundadores protegen tanto la idea como la relación.']},
  outcomes:{title:'Al terminar tendrás',points:['Un plan de personal que ajusta habilidades y tiempo al trabajo, incluido el tuyo.','Pasos de selección justos, condiciones escritas y un plan de incorporación para cada persona.','Principios de remuneración, una propuesta clara para el voluntariado y un plan para las salidas.']},
  tips:{title:'Consejos prácticos',points:['Empieza por quienes fundan: anota lo que cada cofundador aporta y puede comprometer.','Pregunta a alguien que podrías sumar qué le haría querer unirse.','Sigue cómo nuestra panadería de ejemplo planifica a sus aprendices, su mentor y sus primeras contrataciones.']}
 });

 // Module 05 · Internal systems and operations
 add('105','en',{
  what:'This module helps you choose the minimum systems you need to start well: how work, money, people and information flow, which processes to write down, one planning calendar and simple tools. It answers: what must work reliably from the first day?',
  why:{title:'Why systems matter early',points:['Simple routines set now save you from chaos once orders and people arrive.','Some protections, such as handling data and money, cannot wait until later.','Written processes let more than one person do the work safely.']},
  outcomes:{title:'What you will have',points:['An operating map showing how your work, money, people and information connect.','A minimum set of systems, with clear triggers for adding the next.','Key processes written down, one planning calendar and a simple set of tools.']},
  tips:{title:'Keep it light',points:['Write the process before choosing any app; a phone and shared drive may be enough.','Decide where files live and how they are named before they pile up.','Use our example bakery’s routines for orders, stock and cash as a model.']}
 });
 add('105','es',{
  what:'Este módulo te ayuda a elegir los sistemas mínimos para empezar bien: cómo fluyen el trabajo, el dinero, las personas y la información, qué procesos escribir, un solo calendario de planificación y herramientas sencillas. Responde: ¿qué debe funcionar bien desde el primer día?',
  why:{title:'Por qué los sistemas importan pronto',points:['Rutinas simples definidas ahora te evitan el caos cuando lleguen pedidos y personas.','Algunas protecciones, como el manejo de datos y de dinero, no pueden esperar.','Los procesos escritos permiten que más de una persona haga el trabajo con seguridad.']},
  outcomes:{title:'Lo que tendrás',points:['Un mapa operativo que muestra cómo se conectan trabajo, dinero, personas e información.','Un conjunto mínimo de sistemas, con señales claras para sumar el siguiente.','Procesos clave por escrito, un solo calendario de planificación y herramientas sencillas.']},
  tips:{title:'Mantenlo simple',points:['Escribe el proceso antes de elegir una aplicación; un teléfono y una carpeta compartida pueden bastar.','Decide dónde se guardan los archivos y cómo se nombran antes de que se acumulen.','Usa como modelo las rutinas de pedidos, inventario y caja de nuestra panadería de ejemplo.']}
 });

 // Module 06 · MEAL
 add('106','en',{
  what:'This module helps you build evidence into your idea from the start: how you will track progress, test whether it makes a difference, listen to the people you serve and learn. It answers: how will we know it works, and for whom?',
  why:{title:'Why evidence from day one',points:['Without a baseline captured now, you cannot show change later.','Early evidence tells you what works before you spend money growing it.','Listening to the people you serve respects their dignity and improves the work.']},
  outcomes:{title:'What you will have',points:['A results framework with clear indicators, baselines and realistic targets.','An ethical data plan and simple ways for people to give feedback or complain.','A learning routine and reports suited to each audience.']},
  tips:{title:'Keep it usable',points:['Size it to what you can keep up; a few indicators beat many abandoned ones.','Use your Theory of Change pathways as the starting point for every indicator.','Our example bakery tracks trainees who finish, jobs found and weekly food waste.']}
 });
 add('106','es',{
  what:'Este módulo te ayuda a integrar la evidencia en tu idea desde el inicio: cómo seguirás el avance, probarás si marca una diferencia, escucharás a quienes atiendes y aprenderás. Responde: ¿cómo sabremos si funciona, y para quién?',
  why:{title:'Por qué evidencia desde el inicio',points:['Sin una línea de base registrada ahora, no podrás mostrar cambios después.','La evidencia temprana te dice qué funciona antes de invertir en crecer.','Escuchar a quienes atiendes respeta su dignidad y mejora el trabajo.']},
  outcomes:{title:'Lo que tendrás',points:['Un marco de resultados con indicadores claros, líneas de base y metas realistas.','Un plan de datos ético y formas sencillas de dar opiniones o presentar quejas.','Una rutina de aprendizaje e informes adaptados a cada público.']},
  tips:{title:'Que sea útil',points:['Ajústalo a lo que puedes sostener; pocos indicadores valen más que muchos abandonados.','Usa las rutas de tu Teoría de Cambio como punto de partida de cada indicador.','Nuestra panadería de ejemplo mide quiénes terminan, quiénes consiguen empleo y el desperdicio semanal.']}
 });

 // Module 07 · Brand, identity and image
 add('107','en',{
  what:'This module turns your mission, values and positioning into an identity people recognise and trust: a promise you can keep, a voice, a naming logic, visual basics, simple guidelines and signs of credibility. It answers: what should people expect from us?',
  why:{title:'Why brand matters when new',points:['With no track record yet, people judge you on how you present yourself.','A promise you can keep builds trust; one you cannot keep destroys it.','Simple rules set now keep things consistent once others create materials.']},
  outcomes:{title:'What you will have',points:['A brand platform with a promise that fits your current size.','A voice drawn from your values and a naming logic that can grow.','Visual basics, short guidelines and a plan to show trust signals.']},
  tips:{title:'Practical tips',points:['You can start before a finished logo; consistency matters more than polish.','Ask a few future customers or supporters which words they link with you.','Watch how our example bakery turns its values into a voice people recognise.']}
 });
 add('107','es',{
  what:'Este módulo convierte tu misión, valores y posicionamiento en una identidad reconocible y confiable: una promesa que puedes cumplir, una voz, una lógica de nombres, bases visuales, guías sencillas y señales de credibilidad. Responde: ¿qué debe esperar la gente de nosotros?',
  why:{title:'Por qué la marca importa ya',points:['Sin trayectoria todavía, la gente te juzga por cómo te presentas.','Una promesa que puedes cumplir genera confianza; una que no cumples la destruye.','Reglas simples definidas ahora mantienen la coherencia cuando otras personas creen materiales.']},
  outcomes:{title:'Lo que tendrás',points:['Una plataforma de marca con una promesa que se ajusta a tu tamaño actual.','Una voz basada en tus valores y una lógica de nombres que pueda crecer.','Bases visuales, un manual breve y un plan para mostrar señales de confianza.']},
  tips:{title:'Consejos prácticos',points:['Puedes empezar sin un logo terminado; la coherencia importa más que el acabado.','Pregunta a futuros clientes o simpatizantes qué palabras asocian contigo.','Mira cómo nuestra panadería de ejemplo convierte sus valores en una voz reconocible.']}
 });

 // Module 08 · Marketing and communications
 add('108','en',{
  what:'This module helps you plan how to reach the people your idea needs: priority audiences, clear and honest messages, ethical stories, channels you can sustain, a launch campaign and measures of what helps. It answers: who must hear from us, and why?',
  why:{title:'Why plan before you launch',points:['When nobody knows you yet, every message has to earn attention honestly.','A few well-chosen channels save scarce time for the work itself.','With little reputation to fall back on, one problem can define you.']},
  outcomes:{title:'What you will have',points:['Priority audiences, a core message and supporting messages with proof.','A small set of channels, a content calendar and a launch campaign.','Simple measures of action, plus crisis essentials ready before launch.']},
  tips:{title:'Practical tips',points:['Pick one social channel where your audiences already are, and do it well.','Start an email list now; people who asked to hear from you matter most.','See how our example bakery plans the launch of its market stall.']}
 });
 add('108','es',{
  what:'Este módulo te ayuda a planificar cómo llegar a las personas que tu idea necesita: públicos prioritarios, mensajes claros y honestos, historias éticas, canales sostenibles, una campaña de lanzamiento y medidas de lo que funciona. Responde: ¿quién debe saber de nosotros, y por qué?',
  why:{title:'Por qué planificar antes de lanzar',points:['Cuando nadie te conoce aún, cada mensaje debe ganarse la atención con honestidad.','Pocos canales bien elegidos ahorran tiempo escaso para el trabajo en sí.','Con poca reputación que te respalde, un solo problema puede definirte.']},
  outcomes:{title:'Lo que tendrás',points:['Públicos prioritarios, un mensaje central y mensajes de apoyo con pruebas.','Pocos canales, un calendario de contenidos y una campaña de lanzamiento.','Medidas simples de acción y lo esencial para crisis listo antes de lanzar.']},
  tips:{title:'Consejos prácticos',points:['Elige una red social donde ya esté tu público, y cuídala bien.','Empieza ya una lista de correo; quienes pidieron saber de ti son los más valiosos.','Mira cómo nuestra panadería de ejemplo planifica el lanzamiento de su puesto en el mercado.']}
 });

 // Module 09 · Financial management
 add('109','en',{
  what:'This module helps you set up money management from the start: clear finance roles, an organisational budget, a funds register, a cash forecast, controls before the first payment and simple reports. It answers: can we pay our way, and show it?',
  why:{title:'Why money needs structure early',points:['Cash, not profit on paper, pays the bills; a forecast shows gaps early.','Controls are easiest to set up before the first payment, not after a problem.','Clear records earn the trust of funders, customers and co-founders.']},
  outcomes:{title:'What you will have',points:['A first-year budget that includes founder pay and reserves.','A funds register, a monthly cash forecast and basic financial controls.','A reporting calendar and simple measures of financial health.']},
  tips:{title:'Practical tips',points:['Record every transaction from day one, however small.','Ask someone with accounting experience to review your budget and controls.','Use our example bakery’s year-one figures to check your own assumptions.']}
 });
 add('109','es',{
  what:'Este módulo te ayuda a organizar la gestión del dinero desde el inicio: funciones financieras claras, un presupuesto general, un registro de fondos, un flujo de caja, controles antes del primer pago e informes sencillos. Responde: ¿podemos sostenernos, y demostrarlo?',
  why:{title:'Por qué ordenar el dinero pronto',points:['Las cuentas se pagan con caja, no con ganancias en papel; el flujo anticipa faltantes.','Los controles son más fáciles antes del primer pago que después de un problema.','Registros claros generan la confianza de financiadores, clientes y cofundadores.']},
  outcomes:{title:'Lo que tendrás',points:['Un presupuesto del primer año que incluye la remuneración de fundadores y reservas.','Un registro de fondos, un flujo de caja mensual y controles financieros básicos.','Un calendario de informes y medidas simples de salud financiera.']},
  tips:{title:'Consejos prácticos',points:['Registra cada transacción desde el primer día, por pequeña que sea.','Pide a alguien con experiencia contable que revise tu presupuesto y tus controles.','Usa las cifras del primer año de nuestra panadería de ejemplo para revisar tus supuestos.']}
 });

 // Module 10 · Legal, compliance, policies and risk
 add('110','en',{
  what:'This module helps you build your legal and compliance framework before you launch: a map of your duties, the policies you need, contract checks, usable procedures, safe ways to raise concerns and a risk register. It answers: what could go wrong?',
  why:{title:'Why protect before you launch',points:['Safeguarding and data protection apply from your very first activity or sign-up.','A few policies people actually follow beat a pile of copied documents.','Contracts arrive before you are fully set up; checks protect you from surprises.']},
  outcomes:{title:'What you will have',points:['A legal map of the duties linked to your form, activities and location.','Core policies with usable procedures and a safe route to raise concerns.','A short risk register with owners, actions and early warning signs.']},
  tips:{title:'Practical tips',points:['Check local rules with someone with a legal background before registering.','Write procedures for what you do today, even if only you do it.','Our example bakery shows why safeguarding matters when some trainees are 17.']}
 });
 add('110','es',{
  what:'Este módulo te ayuda a construir tu marco legal y de cumplimiento antes de lanzar: un mapa de tus deberes, las políticas que necesitas, revisión de contratos, procedimientos útiles, canales seguros para alertar y un registro de riesgos. Responde: ¿qué podría salir mal?',
  why:{title:'Por qué protegerte antes de lanzar',points:['La salvaguarda y la protección de datos aplican desde la primera actividad o inscripción.','Pocas políticas que la gente cumple valen más que muchos documentos copiados.','Los contratos llegan antes de que estés listo; revisarlos te evita sorpresas.']},
  outcomes:{title:'Lo que tendrás',points:['Un mapa legal de los deberes ligados a tu forma, actividades y ubicación.','Políticas básicas con procedimientos útiles y un canal seguro para alertar.','Un registro de riesgos breve con responsables, acciones y señales de alerta.']},
  tips:{title:'Consejos prácticos',points:['Consulta las normas locales con alguien con formación jurídica antes de registrarte.','Escribe procedimientos para lo que haces hoy, aunque solo lo hagas tú.','Nuestra panadería de ejemplo muestra por qué la salvaguarda importa si hay aprendices de 17 años.']}
 });
})();
