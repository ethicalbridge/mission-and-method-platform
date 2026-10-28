// Longer lesson videos (entrepreneurs), Clarify (modules 100–102): the `long` block adds scenes for what it is,
// its parts with examples, why it matters, how you will use it and what to avoid. 101.objectives is in the pilot.
(function(){
 const add=(key,lang,long)=>{(window.LESSON_VIDEOS[key]||={})[lang]={...(window.LESSON_VIDEOS[key]?.[lang]||{}),long};};

 // 0.1 How this course works
 add('100.journey','en',{
  what:'This course is a path through the decisions a founder makes, in the order they are usually needed. Each step builds on the one before, so you lay foundations instead of repairing them later.',
  parts:{title:'Four courses, one order',items:[
   {label:'Clarify',text:'Why should this exist, and what change will you pursue? Modules 00 to 02.',example:'Our bakery writes its purpose and the change it wants before choosing a legal form.'},
   {label:'Organise',text:'Who will decide, who will do the work and how it will run day to day. Modules 03 to 05.',example:'The two co-founders agree who approves spending and how new trainees are welcomed.'},
   {label:'Prove & Show',text:'How you will know it works, and how you will show it. Modules 06 to 08.',example:'Our bakery picks three signs of progress, a name and a simple logo.'},
   {label:'Protect',text:'How you will stay solvent, legal and safe from the start. Modules 09 and 10.',example:'Our bakery drafts a first-year budget and a safeguarding policy before the first trainee starts.'}]},
  why:{title:'Why the order matters',points:['Most early questions depend on what you are for and who you serve.','Deciding in order saves rebuilding your registration, budget or brand later.','You can see what to do now and what can wait.']},
  use:{title:'How each lesson works',points:['A short video, a written explanation and an exercise.','Your answers save into your founding pack as you go.','Download each module as a PDF to share with a co-founder or adviser.']},
  mistakes:{title:'What to avoid',points:['Jumping to registration or money before knowing what you are for.','Trying to finish everything in one sitting.','Treating a first draft as final: mark what is uncertain and come back.']}
 });
 add('100.journey','es',{
  what:'Este curso es un recorrido por las decisiones que toma quien emprende, en el orden en que suele necesitarlas. Cada paso se apoya en el anterior: construyes bases en lugar de repararlas después.',
  parts:{title:'Cuatro cursos, un orden',items:[
   {label:'Clarify',text:'¿Por qué debería existir y qué cambio buscarás? Módulos 00 a 02.',example:'Nuestra panadería escribe su propósito y el cambio que busca antes de elegir forma jurídica.'},
   {label:'Organise',text:'Quién decidirá, quién hará el trabajo y cómo funcionará el día a día. Módulos 03 a 05.',example:'Los dos cofundadores acuerdan quién aprueba gastos y cómo se recibe a cada aprendiz nuevo.'},
   {label:'Prove & Show',text:'Cómo sabrás que funciona y cómo lo mostrarás. Módulos 06 a 08.',example:'Nuestra panadería elige tres señales de avance, un nombre y un logo sencillo.'},
   {label:'Protect',text:'Cómo seguirás solvente, legal y seguro desde el inicio. Módulos 09 y 10.',example:'Nuestra panadería prepara un presupuesto del primer año y una política de protección antes del primer aprendiz.'}]},
  why:{title:'Por qué importa el orden',points:['Casi todas las primeras preguntas dependen de para qué existes y a quién sirves.','Decidir en orden evita rehacer después tu registro, presupuesto o marca.','Ves qué hacer ahora y qué puede esperar.']},
  use:{title:'Cómo funciona cada lección',points:['Un video corto, una explicación escrita y un ejercicio.','Tus respuestas se guardan en tu paquete fundacional.','Descarga cada módulo en PDF para compartirlo con un cofundador o asesor.']},
  mistakes:{title:'Qué evitar',points:['Saltar al registro o al dinero sin saber para qué existes.','Querer terminarlo todo de una sola vez.','Tomar un primer borrador como final: marca lo incierto y vuelve.']}
 });

 // 0.2 Your founding profile
 add('100.profile','en',{
  what:'A founding profile is one page of plain facts about what you are building. It is not a pitch: it is the page people read first to decide whether, and how, they can work with you.',
  parts:{title:'What goes on the page',items:[
   {label:'Name and sentence',text:'Your registered or working name, and what you will do, for whom and where.',example:'“We will bake and sell bread, and train young people who left school early, in one neighbourhood.”'},
   {label:'Form and stage',text:'The legal form you intend, how far along you are and who is involved so far.',example:'A company with a social purpose, not yet registered; pilot stage; two co-founders, four trainees planned.'},
   {label:'Activities and places',text:'What you plan to do, with whom and where. Flag children, personal data or public money.',example:'A Saturday market stall and a shared kitchen; trainees aged 17 to 24, so we hold young people’s data.'},
   {label:'Still to decide',text:'Open decisions, written as questions rather than guesses.',example:'Should we register now, or stay informal for the first three months of the pilot?'}]},
  why:{title:'Why it matters',points:['You will give these facts in applications, forms and first conversations.','Your legal form shapes control, surplus, fundraising and who regulates you.','Your stage decides how much formality you need now.']},
  use:{title:'Where you will reuse it',points:['Funding applications, bank accounts and registration forms.','The About page of your first website.','Your choice of legal form and, later, registration and legal duties.']},
  mistakes:{title:'What to avoid',points:['Writing a pitch or a mission statement instead of plain facts.','Guessing answers you have not decided yet.','Registering only because a template, a friend or a funder suggests it.']}
 });
 add('100.profile','es',{
  what:'Un perfil fundacional es una página de datos claros sobre lo que estás creando. No es una presentación de venta: es lo primero que otros leen para decidir si pueden trabajar contigo, y cómo.',
  parts:{title:'Qué va en la página',items:[
   {label:'Nombre y frase',text:'Tu nombre registrado o provisional, y qué harás, para quién y dónde.',example:'“Haremos y venderemos pan, y formaremos a jóvenes que dejaron la escuela, en un barrio.”'},
   {label:'Forma y etapa',text:'La forma jurídica prevista, cuánto has avanzado y quién participa hasta ahora.',example:'Una empresa con propósito social, aún sin registrar; etapa piloto; dos cofundadores y cuatro aprendices previstos.'},
   {label:'Actividades y lugares',text:'Qué harás, con quién y dónde. Señala si hay menores, datos personales o dinero del público.',example:'Puesto de mercado los sábados y cocina compartida; aprendices de 17 a 24 años: guardaremos datos de jóvenes.'},
   {label:'Por decidir',text:'Las decisiones abiertas, escritas como preguntas y no como suposiciones.',example:'¿Nos registramos ahora o seguimos informales los tres primeros meses del piloto?'}]},
  why:{title:'Por qué importa',points:['Darás estos datos en solicitudes, formularios y primeras conversaciones.','Tu forma jurídica define control, excedentes, financiamiento y quién te regula.','Tu etapa define cuánta formalidad necesitas ahora.']},
  use:{title:'Dónde lo reutilizarás',points:['Solicitudes de financiamiento, cuentas bancarias y formularios de registro.','La página «Quiénes somos» de tu primer sitio web.','La elección de tu forma jurídica y, más adelante, el registro y tus obligaciones legales.']},
  mistakes:{title:'Qué evitar',points:['Escribir una presentación de venta o una misión en lugar de datos claros.','Adivinar respuestas que aún no has decidido.','Registrarte solo porque lo sugiere una plantilla, un amigo o un financiador.']}
 });

 // 0.3 Baseline health check
 add('100.health-check','en',{
  what:'A health check is a short self-assessment of how developed each foundation of your initiative is today. It is not a test and there is no passing score: it makes your starting point visible.',
  parts:{title:'The ratings, shown for finance',items:[
   {label:'Not started',text:'Nothing exists yet.',example:'No budget; one founder pays for flour personally and keeps receipts in a drawer.'},
   {label:'Informal',text:'It happens, but it lives in one person’s head or habits.',example:'One founder tracks the stall’s takings in a personal notebook that nobody else can read.'},
   {label:'Documented',text:'It is written down, though perhaps rarely opened.',example:'A first-year budget of about US$48,000 and a one-page note on who can spend what.'},
   {label:'Practised, then reviewed',text:'People actually use it; then you check whether it works and improve it.',example:'Both co-founders approve larger payments, and lowered the limit after a near miss.'}]},
  why:{title:'Why it matters',points:['Most areas start not started or informal, and that is expected.','Seeing the gaps helps you choose your priorities.','At the end, you compare and see what you have built.']},
  use:{title:'How you will use it',points:['Pick three priorities for this course from your weakest areas.','Share it with a co-founder or mentor and discuss differences.','Repeat it after Module 10 and compare with today.']},
  mistakes:{title:'What to avoid',points:['Generous ratings with no evidence behind them.','Writing documents that nobody practises.','Rating alone when a second view would show blind spots.']}
 });
 add('100.health-check','es',{
  what:'Un diagnóstico es una autoevaluación breve de qué tan desarrollada está hoy cada base de tu iniciativa. No es un examen ni hay nota mínima: hace visible tu punto de partida.',
  parts:{title:'Las calificaciones, en finanzas',items:[
   {label:'No iniciado',text:'Todavía no existe nada.',example:'No hay presupuesto; una fundadora paga la harina de su bolsillo y guarda recibos en un cajón.'},
   {label:'Informal',text:'Ocurre, pero vive en la cabeza o los hábitos de una persona.',example:'Un fundador anota lo que vende el puesto en una libreta personal que nadie más entiende.'},
   {label:'Documentado',text:'Está por escrito, aunque quizá casi nunca se abre.',example:'Un presupuesto del primer año de unos US$48 000 y una nota de una página sobre quién puede gastar qué.'},
   {label:'Practicado y revisado',text:'La gente lo usa; luego compruebas si funciona y lo mejoras.',example:'Ambos cofundadores aprueban los pagos grandes y bajaron el límite tras un susto.'}]},
  why:{title:'Por qué importa',points:['Casi todas las áreas empiezan sin iniciar o informales, y es normal.','Ver los vacíos te ayuda a elegir prioridades.','Al final, comparas y ves lo que construiste.']},
  use:{title:'Cómo lo usarás',points:['Elige tres prioridades para este curso entre tus áreas más débiles.','Compártelo con un cofundador o mentor y conversen las diferencias.','Repítelo al terminar el Módulo 10 y compara con hoy.']},
  mistakes:{title:'Qué evitar',points:['Calificaciones generosas sin evidencia que las respalde.','Escribir documentos que nadie practica.','Calificar a solas cuando otra mirada mostraría puntos ciegos.']}
 });

 // 1.1 Purpose, vision and mission
 add('101.purpose','en',{
  what:'Three short statements that answer three different questions. Purpose: why should this exist? Vision: what future are we working towards? Mission: what will we do, for whom and how?',
  parts:{title:'Three statements, in order',items:[
   {label:'Purpose',text:'Why it needs to exist: a specific unmet need, not your favourite solution.',example:'So that young people who left school early can build skills and a working life.'},
   {label:'Vision',text:'The future you want to help create, not your services or how big you will grow.',example:'A neighbourhood where every young person has a way into good work, and good food is affordable.'},
   {label:'Mission',text:'What you will do, for whom and how: “We help [people] achieve [change] through [approach].”',example:'We bake and sell good bread, and train young people through paid traineeships, starting with one stall.'}]},
  why:{title:'Why they matter',points:['Purpose stays steady even if your first idea changes.','Others join, fund or buy only if the reason matters beyond you.','A clear mission tells you which opportunities to turn down.']},
  use:{title:'What they guide',points:['Your strategic objectives, which turn the mission into priorities.','Your Theory of Change, which starts from your vision.','Your profile, website and registration form, which reuse the same words.']},
  mistakes:{title:'What to avoid',points:['Starting from a solution (“we need an app”) instead of a need.','A vision that lists services, revenue or growth targets.','Publishing before testing the words with someone affected.']}
 });
 add('101.purpose','es',{
  what:'Tres frases breves que responden tres preguntas distintas. Propósito: ¿por qué debería existir? Visión: ¿hacia qué futuro trabajamos? Misión: ¿qué haremos, para quién y cómo?',
  parts:{title:'Tres frases, en orden',items:[
   {label:'Propósito',text:'Por qué debe existir: una necesidad concreta no atendida, no tu solución favorita.',example:'Que los jóvenes que dejaron la escuela puedan desarrollar habilidades y una vida laboral.'},
   {label:'Visión',text:'El futuro que quieres ayudar a crear, no tus servicios ni cuánto crecerás.',example:'Un barrio donde cada joven tenga un camino hacia un buen trabajo y la buena comida sea asequible.'},
   {label:'Misión',text:'Qué harás, para quién y cómo: «Ayudamos a [personas] a lograr [cambio] mediante [enfoque]».',example:'Hacemos y vendemos buen pan, y formamos a jóvenes con prácticas pagadas, empezando con un puesto de mercado.'}]},
  why:{title:'Por qué importan',points:['El propósito se mantiene aunque cambie tu primera idea.','Otros se suman, financian o compran solo si la razón va más allá de ti.','Una misión clara te dice qué oportunidades rechazar.']},
  use:{title:'Qué guían',points:['Tus objetivos estratégicos, que convierten la misión en prioridades.','Tu Teoría de Cambio, que parte de tu visión.','Tu perfil, tu sitio web y tu registro, que usan las mismas palabras.']},
  mistakes:{title:'Qué evitar',points:['Partir de una solución («necesitamos una app») y no de una necesidad.','Una visión que enumera servicios, ingresos o metas de crecimiento.','Publicar sin probar las frases con alguien afectado.']}
 });

 // 1.2 Context and landscape analysis
 add('101.context','en',{
  what:'Context analysis is a short, honest picture of the world your idea will enter: who has the problem, how they solve it today and what is changing around them.',
  parts:{title:'Three ways to look',items:[
   {label:'Who is already active',text:'Businesses, public services, nonprofits, informal groups and the “do nothing” option people use today.',example:'Our bakery finds two other bakeries, a supermarket, a job club and young people getting no help.'},
   {label:'PESTLE scan',text:'Six outside factors: political, economic, social, technological, legal and environmental.',example:'Economic: rising prices mean neighbours look harder for good bread at a fair price.'},
   {label:'SWOT analysis',text:'Your strengths and weaknesses inside, set against the opportunities and threats outside.',example:'Strength: a co-founder with ten years of baking. Threat: the shared kitchen may raise its rent.'}]},
  why:{title:'Why it matters',points:['Competitors and alternatives prove the need exists.','You find the gap others leave, or an effort worth joining.','Prices, rules and habits can open a door or close one.']},
  use:{title:'What it informs',points:['Your purpose, positioning and objectives in this module.','The assumptions and risks in your Theory of Change.','A fresh look before registering, launching, pricing or first funding.']},
  mistakes:{title:'What to avoid',points:['Points with no source, not even your own conversations.','Listing factors without saying what they mean for your idea.','Ignoring the option of joining an existing effort.']}
 });
 add('101.context','es',{
  what:'El análisis del contexto es una imagen breve y honesta del mundo al que entra tu idea: quién tiene el problema, cómo lo resuelve hoy y qué está cambiando a su alrededor.',
  parts:{title:'Tres formas de mirar',items:[
   {label:'Quién ya actúa',text:'Empresas, servicios públicos, organizaciones sin fines de lucro, grupos informales y la opción de «no hacer nada».',example:'Nuestra panadería encuentra otras dos panaderías, un supermercado, un club de empleo y jóvenes sin ningún apoyo.'},
   {label:'Análisis PESTLE',text:'Seis factores externos: político, económico, social, tecnológico, legal y ambiental.',example:'Económico: con precios en alza, los vecinos buscan más pan bueno a precio justo.'},
   {label:'Análisis FODA',text:'Tus fortalezas y debilidades internas, frente a las oportunidades y amenazas externas.',example:'Fortaleza: una cofundadora con diez años de oficio. Amenaza: la cocina compartida podría subir el alquiler.'}]},
  why:{title:'Por qué importa',points:['Competidores y alternativas prueban que la necesidad existe.','Encuentras el vacío que otros dejan, o un esfuerzo al que sumarte.','Precios, normas y hábitos pueden abrir o cerrar una puerta.']},
  use:{title:'Qué alimenta',points:['Tu propósito, tu posicionamiento y tus objetivos en este módulo.','Los supuestos y riesgos de tu Teoría de Cambio.','Una nueva mirada antes de registrarte, lanzar, fijar precios o recibir fondos.']},
  mistakes:{title:'Qué evitar',points:['Puntos sin fuente, ni siquiera tus propias conversaciones.','Enumerar factores sin decir qué significan para tu idea.','Ignorar la opción de sumarte a un esfuerzo que ya existe.']}
 });

 // 1.3 Stakeholder mapping
 add('101.stakeholders','en',{
  what:'Stakeholders are the people and organisations who will affect, or be affected by, what you build: the people you serve, customers, funders, partners, authorities and anyone who could support or block you.',
  parts:{title:'Four roles, often confused',items:[
   {label:'Benefits',text:'Whose life or environment should change?',example:'Young people aged 17 to 24 who left school early and want a first job.'},
   {label:'Pays',text:'Whose money will keep the work going?',example:'Neighbours and cafés who buy the bread, and a local youth fund.'},
   {label:'Decides',text:'Who can say yes or no to what you do?',example:'The shared kitchen’s manager, who rents us a slot, and the market organisers.'},
   {label:'Influences',text:'Who shapes results without a formal decision?',example:'The youth centre that refers trainees, and the other stallholders at the market.'}]},
  why:{title:'Why it matters',points:['You avoid designing for the wrong person.','The person who benefits is often not the one who pays.','People with little power are the easiest to overlook.']},
  use:{title:'How you will use it',points:['An influence–interest grid: involve, consult, inform or monitor each group.','Your Theory of Change: whose behaviour must change for your outcomes.','Updates as you grow and new groups appear.']},
  mistakes:{title:'What to avoid',points:['Assuming the user and the payer are the same person.','Forgetting those who could block you, like a landlord or an authority.','Leaving out people with high interest but little power.']}
 });
 add('101.stakeholders','es',{
  what:'Los actores son las personas y organizaciones que influirán en lo que creas o se verán afectadas: a quienes sirves, clientes, financiadores, aliados, autoridades y quien pueda apoyarte o bloquearte.',
  parts:{title:'Cuatro roles que se confunden',items:[
   {label:'Se beneficia',text:'¿La vida o el entorno de quién debería cambiar?',example:'Jóvenes de 17 a 24 años que dejaron la escuela y buscan un primer empleo.'},
   {label:'Paga',text:'¿El dinero de quién sostendrá el trabajo?',example:'Vecinos y cafeterías que compran el pan, y un fondo juvenil local.'},
   {label:'Decide',text:'¿Quién puede decir sí o no a lo que haces?',example:'La administradora de la cocina compartida, que nos alquila un turno, y quienes organizan el mercado.'},
   {label:'Influye',text:'¿Quién incide en los resultados sin una decisión formal?',example:'El centro juvenil que deriva a los aprendices y los demás puestos del mercado.'}]},
  why:{title:'Por qué importa',points:['Evitas diseñar para la persona equivocada.','Quien se beneficia muchas veces no es quien paga.','Quienes tienen poco poder son los más fáciles de olvidar.']},
  use:{title:'Cómo lo usarás',points:['Una matriz de influencia e interés: involucrar, consultar, informar o vigilar.','Tu Teoría de Cambio: qué conductas deben cambiar para tus resultados.','Actualizaciones a medida que creces y aparecen nuevos grupos.']},
  mistakes:{title:'Qué evitar',points:['Suponer que quien usa y quien paga son la misma persona.','Olvidar a quien puede bloquearte, como un propietario o una autoridad.','Dejar fuera a quienes tienen mucho interés y poco poder.']}
 });

 // 1.4 Values in practice
 add('101.values','en',{
  what:'Values are the principles that guide what you do when decisions are hard. A single word is only a start: describe what people will actually do, and how you would notice it.',
  parts:{title:'Each value in three lines',items:[
   {label:'What it means',text:'One sentence on what the value means for you.',example:'Respect: every trainee is treated as a colleague, whatever their school record.'},
   {label:'How it shows',text:'What you will actually do, and what it costs in time and money.',example:'We budget for mentor time and pay trainees from their very first shift.'},
   {label:'What you avoid',text:'The behaviour the value rules out, even under pressure.',example:'We never use trainees as unpaid help to cover a busy Saturday.'}]},
  why:{title:'Why they matter',points:['They guide you when there is no rule to follow.','Values set early shape the culture of everything you build.','Agreeing them now prevents conflict at your first hard decision.']},
  use:{title:'What they guide',points:['How you handle difficult decisions you can foresee this year.','Your first budget, because practising values costs time and money.','Your code of conduct, later in the course.']},
  mistakes:{title:'What to avoid',points:['Adopting values only because other organisations display them.','Too many: keep three to five you can practise.','Ignoring trade-offs, such as openness against participants’ privacy.']}
 });
 add('101.values','es',{
  what:'Los valores son los principios que guían lo que haces cuando las decisiones son difíciles. Una palabra sola es solo el inicio: describe qué hará la gente y cómo lo notarías.',
  parts:{title:'Cada valor en tres líneas',items:[
   {label:'Qué significa',text:'Una frase sobre lo que ese valor significa para ti.',example:'Respeto: cada aprendiz es tratado como colega, sin importar su historial escolar.'},
   {label:'Cómo se nota',text:'Qué harás en la práctica y cuánto cuesta en tiempo y dinero.',example:'Presupuestamos tiempo de mentoría y pagamos a los aprendices desde su primer turno.'},
   {label:'Qué evitas',text:'La conducta que ese valor descarta, incluso bajo presión.',example:'Nunca usamos a los aprendices como ayuda sin pago para cubrir un sábado con mucha venta.'}]},
  why:{title:'Por qué importan',points:['Te guían cuando no hay una regla que seguir.','Los valores tempranos moldean la cultura de todo lo que construyes.','Acordarlos ahora evita conflictos en tu primera decisión difícil.']},
  use:{title:'Qué guían',points:['Cómo enfrentas decisiones difíciles que ya puedes prever este año.','Tu primer presupuesto, porque practicar valores cuesta tiempo y dinero.','Tu código de conducta, más adelante en el curso.']},
  mistakes:{title:'Qué evitar',points:['Adoptar valores solo porque otras organizaciones los muestran.','Demasiados: quédate con tres a cinco que puedas practicar.','Ignorar tensiones, como apertura frente a la privacidad de participantes.']}
 });

 // 1.5 Organisational form and identity
 add('101.form','en',{
  what:'Your organisational form is the legal and economic vehicle for your mission. It decides who controls it, what happens to any surplus, how it can raise money and what it must report.',
  parts:{title:'The main families of form',items:[
   {label:'Informal group',text:'No separate legal entity; members agree among themselves and may be personally liable.',example:'Our bakery stays informal for the first three months of the pilot to test the idea.'},
   {label:'Nonprofit or foundation',text:'Members or a board control it; any surplus stays in, never paid to owners.',example:'As a nonprofit, our bakery could seek more grants, but no profits could go to owners.'},
   {label:'Social purpose company',text:'Shareholders own it; profits can be paid out unless its rules limit this.',example:'Our likely choice: the bakery funds itself through sales and reinvests its profits.'},
   {label:'Cooperative or hybrid',text:'Members own a cooperative, one vote each; a hybrid pairs a nonprofit with a trading company.',example:'As a cooperative, the bakers and trainees could own the bakery, one vote each.'}]},
  why:{title:'Why it matters',points:['It decides who governs, what happens to surplus and who regulates you.','It shapes how you can raise money: grants, sales, loans or investment.','Changing form later is possible but costs time and money.']},
  use:{title:'What it guides',points:['How you set up governance and accountability in the Organise course.','How you manage money and raise funds.','Registration and your legal duties in Module 10.']},
  mistakes:{title:'What to avoid',points:['Choosing the form that sounds most credible, not the one that fits.','Registering before testing the idea, when informal would do for now.','Skipping local advice from someone with a legal background or an accountant.']}
 });
 add('101.form','es',{
  what:'Tu forma organizativa es el vehículo legal y económico de tu misión. Define quién la controla, qué pasa con los excedentes, cómo puede obtener dinero y qué debe informar.',
  parts:{title:'Las principales familias',items:[
   {label:'Grupo informal',text:'Sin entidad legal propia; los miembros acuerdan entre sí y pueden responder personalmente.',example:'Nuestra panadería sigue informal los tres primeros meses del piloto para probar la idea.'},
   {label:'Asociación o fundación',text:'La controlan socios o una junta; los excedentes se quedan dentro, nunca van a dueños.',example:'Como asociación, nuestra panadería podría buscar más fondos, pero sin repartir ganancias a dueños.'},
   {label:'Empresa con propósito social',text:'Pertenece a accionistas; puede repartir ganancias salvo que sus reglas lo limiten.',example:'Nuestra opción probable: la panadería se financia con ventas y reinvierte sus ganancias.'},
   {label:'Cooperativa o híbrido',text:'Una cooperativa es de sus socios, un voto cada uno; un híbrido une una entidad sin fines de lucro y una empresa.',example:'Como cooperativa, panaderos y aprendices podrían ser dueños de la panadería, un voto cada uno.'}]},
  why:{title:'Por qué importa',points:['Define quién gobierna, qué pasa con los excedentes y quién te regula.','Define cómo obtienes dinero: fondos, ventas, préstamos o inversión.','Cambiar de forma después es posible, pero cuesta tiempo y dinero.']},
  use:{title:'Qué guía',points:['Cómo organizas tu gobernanza y rendición de cuentas en el curso Organise.','Cómo gestionas el dinero y consigues fondos.','El registro y tus obligaciones legales en el Módulo 10.']},
  mistakes:{title:'Qué evitar',points:['Elegir la forma que suena más creíble, no la que encaja.','Registrarte antes de probar la idea, cuando lo informal basta por ahora.','No pedir consejo local a alguien con formación legal o a un contador.']}
 });

 // 1.6 Positioning and comparative advantage
 add('101.positioning','en',{
  what:'Positioning is the specific place your initiative will take in its landscape: the need, the people, your approach and why you are well placed. It answers one question: why you, rather than someone else, or no one?',
  parts:{title:'Three parts of a position',items:[
   {label:'Your focus',text:'The need you focus on, the people you serve and your approach.',example:'Paid baking traineeships for young people in one neighbourhood who left school early.'},
   {label:'Your advantage',text:'Why you are well placed: trust, skills, lived experience, lower costs or access.',example:'One co-founder has ten years of baking; the other, six years working with young people.'},
   {label:'Your choices',text:'What you will not do, who you will not prioritise yet and what you refer to others.',example:'No café tables for now; young people needing other support go to the youth centre.'}]},
  why:{title:'Why it matters',points:['Saying no protects quality when time and money are limited.','Partners can see where you fit and how to work with you.','Funders and customers want to know why you, not someone else.']},
  use:{title:'What it guides',points:['Your strategic objectives: where to put effort first.','Your brand and messages, later in the course.','Turning down opportunities that pull you away from your gap.']},
  mistakes:{title:'What to avoid',points:['Claiming “passion” or “innovation” without showing what they produce.','Trying to serve everyone at once.','Presenting advantages you still need to prove as facts.']}
 });
 add('101.positioning','es',{
  what:'El posicionamiento es el lugar concreto que ocupará tu iniciativa: la necesidad, las personas, tu enfoque y por qué estás bien ubicado. Responde una pregunta: ¿por qué tú, y no otra persona, o nadie?',
  parts:{title:'Tres partes de una posición',items:[
   {label:'Tu foco',text:'La necesidad en la que te enfocas, a quién sirves y tu enfoque.',example:'Prácticas pagadas de panadería para jóvenes de un barrio que dejaron la escuela.'},
   {label:'Tu ventaja',text:'Por qué estás bien ubicado: confianza, habilidades, experiencia vivida, costos bajos o acceso.',example:'Una cofundadora tiene diez años de oficio; su socio, seis años trabajando con jóvenes.'},
   {label:'Tus decisiones',text:'Qué no harás, a quién no priorizarás aún y qué derivarás a otros.',example:'Sin mesas de cafetería por ahora; a los jóvenes que necesitan otro apoyo los derivamos al centro juvenil.'}]},
  why:{title:'Por qué importa',points:['Decir no protege la calidad cuando el tiempo y el dinero son limitados.','Los aliados ven dónde encajas y cómo trabajar contigo.','Financiadores y clientes quieren saber por qué tú y no otro.']},
  use:{title:'Qué guía',points:['Tus objetivos estratégicos: dónde poner esfuerzo primero.','Tu marca y tus mensajes, más adelante en el curso.','Rechazar oportunidades que te alejan de tu espacio.']},
  mistakes:{title:'Qué evitar',points:['Hablar de «pasión» o «innovación» sin mostrar lo que producen.','Querer servir a todo el mundo a la vez.','Presentar como hechos ventajas que aún debes probar.']}
 });

 // 2.1 Understanding Theory of Change
 add('102.understanding','en',{
  what:'A Theory of Change makes your reasoning explicit: if we do this work, why might a particular change follow? It sets out the steps from your work to the change, and the assumptions that connect them.',
  parts:{title:'Three spheres, one pathway',items:[
   {label:'Control',text:'Inputs, activities and outputs: what you put in, what you do and what you deliver.',example:'Two founders’ time and a shared-kitchen slot; a weekly stall and four trainees in year one.'},
   {label:'Influence',text:'Outcomes: changes in the people and institutions you work with directly.',example:'Trainees gain baking skills and confidence; neighbours buy good local bread.'},
   {label:'Contribute',text:'Impact: wider change that many actors shape, so your claims get more modest.',example:'More young people in the neighbourhood in good, lasting work.'}]},
  why:{title:'Why it matters',points:['You test your idea on paper before you spend money.','It shows partners and funders why your work should lead to change.','Modest claims build trust while your idea is untested.']},
  use:{title:'How you will use it',points:['One pathway for each external strategic objective.','Internal objectives appear as inputs and conditions.','Your indicators and reviews, later in the course.']},
  mistakes:{title:'What to avoid',points:['A diagram of arrows with no explanation of each link.','Claiming the wider impact as yours alone.','Treating it as fixed instead of revising it when evidence disagrees.']}
 });
 add('102.understanding','es',{
  what:'Una Teoría de Cambio hace explícito tu razonamiento: si hacemos este trabajo, ¿por qué podría darse cierto cambio? Muestra los pasos del trabajo al cambio y los supuestos que los conectan.',
  parts:{title:'Tres esferas, una ruta',items:[
   {label:'Control',text:'Insumos, actividades y productos: lo que aportas, lo que haces y lo que entregas.',example:'El tiempo de dos fundadores y un turno en una cocina compartida; un puesto semanal y cuatro aprendices.'},
   {label:'Influencia',text:'Resultados: cambios en las personas e instituciones con las que trabajas directamente.',example:'Los aprendices ganan oficio y confianza; los vecinos compran buen pan local.'},
   {label:'Contribución',text:'Impacto: un cambio amplio que moldean muchos actores, así que tus afirmaciones son más modestas.',example:'Más jóvenes del barrio con un trabajo bueno y estable.'}]},
  why:{title:'Por qué importa',points:['Pruebas tu idea en papel antes de gastar dinero.','Muestra a aliados y financiadores por qué tu trabajo llevaría al cambio.','Las afirmaciones modestas generan confianza mientras tu idea no está probada.']},
  use:{title:'Cómo la usarás',points:['Una ruta por cada objetivo estratégico externo.','Los objetivos internos aparecen como insumos y condiciones.','Tus indicadores y revisiones, más adelante en el curso.']},
  mistakes:{title:'Qué evitar',points:['Un diagrama de flechas sin explicar cada conexión.','Atribuirte solo a ti el impacto amplio.','Tratarla como fija en lugar de revisarla cuando la evidencia la contradice.']}
 });

 // 2.2 Defining the problem
 add('102.problem','en',{
  what:'Defining the problem means describing the current situation, who experiences it and what keeps it in place, kept separate from the solution you have in mind.',
  parts:{title:'A problem tree in three parts',items:[
   {label:'Trunk: core problem',text:'What is the problem, for whom and where?',example:'Young people in our neighbourhood who left school early cannot find a first job.'},
   {label:'Roots: causes',text:'Why does this happen? Ask again for each answer.',example:'No qualifications, no work experience, few contacts, low confidence and employers’ doubts.'},
   {label:'Branches: consequences',text:'What happens because of it?',example:'Long spells without work, low income and young people losing hope of local jobs.'}]},
  why:{title:'Why it matters',points:['It checks whether your idea addresses a real cause.','It stops you starting from a solution you love.','It shows which causes a small, new initiative can influence.']},
  use:{title:'What it guides',points:['Your outcomes: changes that tackle the causes you chose.','Your assumptions: uncertain causes become hypotheses to test.','Your scope: what you will and will not take on at the start.']},
  mistakes:{title:'What to avoid',points:['Naming the missing solution (“no service like ours”) as the problem.','Building the tree for the people affected, not with them.','Collecting personal stories or sensitive data without reason and safeguards.']}
 });
 add('102.problem','es',{
  what:'Definir el problema es describir la situación actual, quién la vive y qué la mantiene, siempre separado de la solución que tienes en mente.',
  parts:{title:'Árbol de problemas: tres partes',items:[
   {label:'Tronco: problema central',text:'¿Cuál es el problema, para quién y dónde?',example:'Los jóvenes de nuestro barrio que dejaron la escuela no encuentran un primer empleo.'},
   {label:'Raíces: causas',text:'¿Por qué ocurre? Vuelve a preguntar por cada respuesta.',example:'Sin títulos, sin experiencia laboral, pocos contactos, poca confianza y dudas de los empleadores.'},
   {label:'Ramas: consecuencias',text:'¿Qué pasa por causa de esto?',example:'Largos periodos sin trabajo, bajos ingresos y jóvenes que pierden la esperanza de un empleo local.'}]},
  why:{title:'Por qué importa',points:['Comprueba si tu idea ataca una causa real.','Evita que partas de una solución que te encanta.','Muestra qué causas puede influir una iniciativa pequeña y nueva.']},
  use:{title:'Qué guía',points:['Tus resultados: cambios que atacan las causas elegidas.','Tus supuestos: las causas inciertas se vuelven hipótesis que probar.','Tu alcance: qué asumirás y qué no al empezar.']},
  mistakes:{title:'Qué evitar',points:['Llamar problema a la solución que falta («no hay un servicio como el nuestro»).','Construir el árbol para las personas afectadas, no con ellas.','Recoger historias personales o datos sensibles sin motivo ni resguardos.']}
 });

 // 2.3 Long-term impact
 add('102.impact','en',{
  what:'Impact is the longer-term change in people’s lives or environmental conditions that your work aims to contribute to. It may take years, and it depends on many actors beyond your founding team.',
  parts:{title:'A useful impact statement',items:[
   {label:'Whose lives change',text:'Name whose lives, or which conditions, should improve.',example:'Young people in our neighbourhood who left school early build skills and a working life.'},
   {label:'Narrow enough',text:'Specific enough to guide early decisions, without claiming the whole future as yours.',example:'First jobs for young people in our neighbourhood, rather than “ending youth unemployment”.'},
   {label:'Others involved',text:'The other actors who already influence the same change.',example:'The youth centre, local employers, the public job service and evening classes.'}]},
  why:{title:'Why it matters',points:['It links your everyday work to your vision.','It keeps early decisions pointed at the same change.','Funders and partners trust founders who name others’ part.']},
  use:{title:'How you will use it',points:['As the top of each Theory of Change pathway.','To work backwards to the outcomes that lead to it.','To explain your idea honestly to partners and funders.']},
  mistakes:{title:'What to avoid',points:['Claiming an improvement proves your work caused it.','A statement so broad it guides no decision.','Forgetting the others who shape the same change.']}
 });
 add('102.impact','es',{
  what:'El impacto es el cambio de largo plazo en la vida de las personas o en el entorno al que tu trabajo busca contribuir. Puede tardar años y depende de muchos actores además de tu equipo fundador.',
  parts:{title:'Una declaración de impacto útil',items:[
   {label:'Qué vidas cambian',text:'Nombra qué vidas, o qué condiciones, deberían mejorar.',example:'Los jóvenes de nuestro barrio que dejaron la escuela desarrollan habilidades y una vida laboral.'},
   {label:'Bien acotada',text:'Lo bastante concreta para guiar decisiones tempranas, sin adueñarte de todo el futuro.',example:'Primeros empleos para jóvenes de nuestro barrio, no «acabar con el desempleo juvenil».'},
   {label:'Otros actores',text:'Quienes ya influyen en ese mismo cambio.',example:'El centro juvenil, los empleadores locales, el servicio público de empleo y las clases nocturnas.'}]},
  why:{title:'Por qué importa',points:['Conecta tu trabajo diario con tu visión.','Mantiene tus primeras decisiones apuntando al mismo cambio.','Financiadores y aliados confían en quien reconoce el aporte de otros.']},
  use:{title:'Cómo la usarás',points:['Como la cima de cada ruta de tu Teoría de Cambio.','Para trabajar hacia atrás hasta los resultados que llevan a él.','Para explicar tu idea con honestidad a aliados y financiadores.']},
  mistakes:{title:'Qué evitar',points:['Afirmar que una mejora prueba que tu trabajo la causó.','Una declaración tan amplia que no guía ninguna decisión.','Olvidar a los demás que moldean el mismo cambio.']}
 });

 // 2.4 Outcomes
 add('102.outcomes','en',{
  what:'Outcomes are the changes your work helps bring about in people, relationships, institutions or conditions: a new skill, a different choice, a changed rule. They sit between what you deliver and long-term impact.',
  parts:{title:'Short, medium and longer term',items:[
   {label:'Short-term',text:'Early changes in knowledge, skills or confidence.',example:'Trainees can bake three basic breads on their own and hold a food-hygiene certificate.'},
   {label:'Medium-term',text:'Changes in choices, behaviour or practice that follow.',example:'Trainees finish the six months and apply for jobs in kitchens and bakeries.'},
   {label:'Longer-term',text:'Lasting changes that make the impact more likely.',example:'Former trainees are still in work a year after finishing.'}]},
  why:{title:'Why they matter',points:['They show whether lives change, not just whether you delivered.','Working backwards from impact shows which changes matter most.','Naming side effects early lets you design them out.']},
  use:{title:'What they guide',points:['The outputs and activities you need to reach them.','Your indicators, baselines and targets in Module 6.','Your first reviews: is the change actually happening?']},
  mistakes:{title:'What to avoid',points:['Counting attendance as an outcome.','Filling a diagram with every possible link.','Ignoring unintended effects, such as who is left out.']}
 });
 add('102.outcomes','es',{
  what:'Los resultados son los cambios que tu trabajo ayuda a generar en personas, relaciones, instituciones o condiciones: una habilidad, otra decisión, una norma distinta. Están entre lo que entregas y el impacto.',
  parts:{title:'Corto, mediano y largo plazo',items:[
   {label:'Corto plazo',text:'Primeros cambios en conocimientos, habilidades o confianza.',example:'Los aprendices hornean solos tres panes básicos y tienen un certificado de higiene alimentaria.'},
   {label:'Mediano plazo',text:'Cambios posteriores en decisiones, conductas o prácticas.',example:'Los aprendices terminan los seis meses y postulan a empleos en cocinas y panaderías.'},
   {label:'Largo plazo',text:'Cambios duraderos que hacen más probable el impacto.',example:'Quienes fueron aprendices siguen trabajando un año después de terminar.'}]},
  why:{title:'Por qué importan',points:['Muestran si cambian vidas, no solo si entregaste algo.','Trabajar hacia atrás desde el impacto muestra qué cambios importan.','Nombrar efectos no deseados a tiempo te permite evitarlos.']},
  use:{title:'Qué guían',points:['Los productos y actividades que necesitas para lograrlos.','Tus indicadores, líneas de base y metas en el Módulo 6.','Tus primeras revisiones: ¿está ocurriendo el cambio?']},
  mistakes:{title:'Qué evitar',points:['Contar la asistencia como un resultado.','Llenar un diagrama con todas las conexiones posibles.','Ignorar efectos no deseados, como quién queda fuera.']}
 });

 // 2.5 Outputs
 add('102.outputs','en',{
  what:'Outputs are the immediate products and services your activities deliver: loaves baked, training shifts held, orders delivered. They show whether delivery happened, not whether anyone’s life improved.',
  parts:{title:'One step apart',items:[
   {label:'Output',text:'Something you deliver, mostly in your control, that you can count on the day.',example:'Four six-month traineeships in year one, and about 300 loaves a week at the stall.'},
   {label:'Outcome',text:'A change in people or conditions, shaped by others too, seen weeks or years later.',example:'Trainees find, and keep, a first job.'},
   {label:'Quality and reach',text:'Who the output is for, whether they can reach it and whether it is good enough.',example:'Shifts start after the first bus arrives, and trainees rate the mentoring as useful.'}]},
  why:{title:'Why they matter',points:['They help you manage delivery week by week.','Quality and reach matter as much as quantity.','Keeping them apart from outcomes stops busy looking like effective.']},
  use:{title:'How you will use them',points:['Linking every activity to the output it supports.','Setting first-year numbers you can deliver, and raising them as you grow.','Reporting delivery honestly to partners and funders.']},
  mistakes:{title:'What to avoid',points:['Reporting a busy launch as an effective one.','Counting sessions the intended people cannot reach.','Setting first-year numbers you cannot realistically deliver.']}
 });
 add('102.outputs','es',{
  what:'Los productos son los bienes y servicios inmediatos que entregan tus actividades: panes horneados, turnos de formación realizados, pedidos entregados. Muestran que hubo entrega, no que la vida de alguien mejoró.',
  parts:{title:'A un paso de distancia',items:[
   {label:'Producto',text:'Algo que entregas, casi todo bajo tu control, y que puedes contar el mismo día.',example:'Cuatro prácticas de seis meses el primer año y unos 300 panes por semana en el puesto.'},
   {label:'Resultado',text:'Un cambio en personas o condiciones, en el que influyen otros, visible semanas o años después.',example:'Los aprendices consiguen y mantienen un primer empleo.'},
   {label:'Calidad y alcance',text:'Para quién es, si puede llegar y si es lo bastante bueno.',example:'Los turnos empiezan cuando llega el primer bus, y los aprendices valoran útil la mentoría.'}]},
  why:{title:'Por qué importan',points:['Te ayudan a gestionar la entrega semana a semana.','La calidad y el alcance importan tanto como la cantidad.','Separarlos de los resultados evita confundir estar ocupado con ser eficaz.']},
  use:{title:'Cómo los usarás',points:['Vinculando cada actividad con el producto que apoya.','Fijando cifras del primer año que puedas cumplir y subiéndolas al crecer.','Informando la entrega con honestidad a aliados y financiadores.']},
  mistakes:{title:'Qué evitar',points:['Presentar un lanzamiento ajetreado como uno eficaz.','Contar sesiones a las que no puede llegar el público previsto.','Fijar cifras del primer año que no puedes cumplir.']}
 });

 // 2.6 Activities
 add('102.activities','en',{
  what:'Activities are the actions you, your co-founders and any partners will take to produce your outputs. Each one starts with a verb and is detailed enough to estimate the work and assign it.',
  parts:{title:'Three checks for each activity',items:[
   {label:'Starts with a verb',text:'Clear enough to estimate the work and give it to someone.',example:'Agree a referral route with the youth centre by March and train two mentors.'},
   {label:'Linked to an output',text:'Every activity supports an output; if not, add the output or drop the activity.',example:'“Visit local cafés” supports “two cafés and one canteen buying bread every week”.'},
   {label:'Feasible and acceptable',text:'Timing, language, cost and local custom let people take part.',example:'A trial shift shows trainees cannot arrive by 5 am, so shifts start at 7.'}]},
  examples:{title:'Work that is easy to forget',items:['Preparation: booking the shared kitchen and agreeing who holds the key.','Food-hygiene registration and the market-stall permit before the first Saturday.','Safeguarding, mentoring and a check-in with each trainee after every shift.']},
  why:{title:'Why they matter',points:['Clear activities let you plan and share out the work.','Linking them to outputs cuts work that leads nowhere.','Checking feasibility early prevents a launch nobody can attend.']},
  use:{title:'What they guide',points:['Your inputs: the resources each activity needs.','Your first plan and budget, in the Protect course.','Roles for co-founders and tasks for volunteers.']},
  mistakes:{title:'What to avoid',points:['Activities that support no output.','Forgetting preparation, permissions, safeguarding and follow-up.','Fixing dates before checking with the people involved.']}
 });
 add('102.activities','es',{
  what:'Las actividades son las acciones que tú, tus cofundadores y tus aliados harán para generar tus productos. Cada una empieza con un verbo y tiene detalle suficiente para estimarla y asignarla.',
  parts:{title:'Tres pruebas para cada actividad',items:[
   {label:'Empieza con un verbo',text:'Lo bastante clara para estimar el trabajo y asignarla a alguien.',example:'Acordar con el centro juvenil una vía de derivación antes de marzo y formar a dos mentores.'},
   {label:'Ligada a un producto',text:'Cada actividad apoya un producto; si no, agrega el producto o elimina la actividad.',example:'«Visitar cafeterías del barrio» apoya «dos cafeterías y un comedor que compran pan cada semana».'},
   {label:'Viable y aceptable',text:'El horario, el idioma, el costo y las costumbres permiten participar.',example:'Un turno de prueba muestra que los aprendices no llegan a las 5, así que empiezan a las 7.'}]},
  examples:{title:'Trabajo que se olvida fácilmente',items:['Preparación: reservar la cocina compartida y acordar quién tiene la llave.','Registro sanitario y permiso del puesto de mercado antes del primer sábado.','Protección, mentoría y una conversación con cada aprendiz después de cada turno.']},
  why:{title:'Por qué importan',points:['Actividades claras te permiten planificar y repartir el trabajo.','Ligarlas a productos elimina trabajo que no lleva a nada.','Revisar su viabilidad evita un lanzamiento al que nadie puede ir.']},
  use:{title:'Qué guían',points:['Tus insumos: los recursos que necesita cada actividad.','Tu primer plan y tu presupuesto, en el curso Protect.','Los roles de los cofundadores y las tareas de los voluntarios.']},
  mistakes:{title:'Qué evitar',points:['Actividades que no apoyan ningún producto.','Olvidar preparación, permisos, protección y seguimiento.','Fijar fechas antes de consultar a las personas involucradas.']}
 });

 // 2.7 Inputs
 add('102.inputs','en',{
  what:'Inputs are the resources your activities need: people’s time and skills, money, equipment, space, information, relationships and permissions. Unpaid time, including your own, counts too.',
  parts:{title:'Have, need and limits',items:[
   {label:'What you have',text:'Resources already in hand, including your own and volunteers’ time.',example:'Two founders’ time, ten years of baking skill and a friend’s van on Saturdays.'},
   {label:'What you still need',text:'Gaps you must still secure; at the start, most inputs are gaps.',example:'A shared-kitchen slot, insurance and four trainees still to recruit.'},
   {label:'Limits',text:'Constraints such as time, permissions or rules on how a resource can be used.',example:'The kitchen is free only in the mornings, and the youth fund cannot pay for equipment.'}]},
  why:{title:'Why they matter',points:['Honest gaps show what you must build before you launch.','Unpaid time is real; leaving it out hides the true cost.','Matching resources to activities shows whether your scope is realistic.']},
  use:{title:'What they guide',points:['Your internal objectives: how you will build the missing inputs.','Your budget, where you will cost them properly in Module 9.','A smaller first scope if one founder holds too many roles.']},
  mistakes:{title:'What to avoid',points:['Leaving out unpaid time from founders, volunteers or members.','Mixing what you have with what you hope to get.','Planning activities nobody has the time or skills to run.']}
 });
 add('102.inputs','es',{
  what:'Los insumos son los recursos que tus actividades necesitan: tiempo y habilidades, dinero, equipos, espacio, información, relaciones y permisos. El tiempo no pagado, incluido el tuyo, también cuenta.',
  parts:{title:'Lo que tienes, falta y limita',items:[
   {label:'Lo que tienes',text:'Recursos ya disponibles, incluido tu tiempo y el de los voluntarios.',example:'El tiempo de dos fundadores, diez años de oficio panadero y la camioneta de un amigo los sábados.'},
   {label:'Lo que falta',text:'Vacíos que aún debes cubrir; al inicio, casi todos los insumos lo son.',example:'Un turno en una cocina compartida, un seguro y cuatro aprendices por reclutar.'},
   {label:'Límites',text:'Restricciones de tiempo, permisos o reglas sobre cómo usar un recurso.',example:'La cocina solo está libre por las mañanas y el fondo juvenil no cubre equipos.'}]},
  why:{title:'Por qué importan',points:['Los vacíos honestos muestran qué debes construir antes de lanzar.','El tiempo no pagado es real; omitirlo oculta el costo verdadero.','Ajustar recursos y actividades muestra si tu alcance es realista.']},
  use:{title:'Qué guían',points:['Tus objetivos internos: cómo conseguirás los insumos que faltan.','Tu presupuesto, donde los costearás bien en el Módulo 9.','Un primer alcance menor si un fundador cubre demasiados roles.']},
  mistakes:{title:'Qué evitar',points:['Omitir el tiempo no pagado de fundadores, voluntarios o socios.','Mezclar lo que tienes con lo que esperas conseguir.','Planificar actividades que nadie tiene tiempo o habilidad para hacer.']}
 });

 // 2.8 Assumptions, risks and evidence
 add('102.assumptions','en',{
  what:'An assumption is something that must be true for one step in your pathway to lead to the next. Before you launch, almost every link rests on assumptions.',
  parts:{title:'Where assumptions sit',items:[
   {label:'Inputs to activities',text:'Will the resources really be there when needed?',example:'The youth centre will keep referring young people for the whole first year.'},
   {label:'Activities to outputs',text:'Can people take part as planned?',example:'Trainees can reach the kitchen by 7 am on public transport.'},
   {label:'Outputs to outcomes',text:'Does what we deliver lead to change?',example:'Trainees who finish will feel confident enough to apply for jobs.'},
   {label:'Outcomes to impact',text:'Do wider conditions allow the change to last?',example:'Local employers will hire young people who complete the bakery’s traineeship.'}]},
  why:{title:'Why they matter',points:['Untested assumptions are where good plans quietly fail.','Testing cheaply first saves money you cannot afford to lose.','Deciding your response early turns a failed assumption into a lesson.']},
  use:{title:'How you will test them',points:['Start with the ones that are both important and uncertain.','Test cheaply: ask future participants, check records, run a small pilot.','Carry external risks into your risk register in Module 10.']},
  mistakes:{title:'What to avoid',points:['Vague assumptions, like “the project succeeds”, that cannot be checked.','Committing money before testing the riskiest links.','Mixing risks you cannot control with your response to them.']}
 });
 add('102.assumptions','es',{
  what:'Un supuesto es algo que debe ser cierto para que un paso de tu ruta lleve al siguiente. Antes de lanzar, casi cada vínculo descansa en supuestos.',
  parts:{title:'Dónde están los supuestos',items:[
   {label:'Insumos a actividades',text:'¿Estarán los recursos cuando se necesiten?',example:'El centro juvenil seguirá derivando jóvenes durante todo el primer año.'},
   {label:'Actividades a productos',text:'¿Puede la gente participar como se planeó?',example:'Los aprendices pueden llegar a la cocina a las 7 en transporte público.'},
   {label:'Productos a resultados',text:'¿Lo que entregamos lleva a un cambio?',example:'Quienes terminen tendrán confianza suficiente para postular a empleos.'},
   {label:'Resultados a impacto',text:'¿Permiten las condiciones que el cambio dure?',example:'Los empleadores locales contratarán a jóvenes que terminen las prácticas de la panadería.'}]},
  why:{title:'Por qué importan',points:['Los supuestos no probados son donde fallan en silencio los buenos planes.','Probar barato primero protege dinero que no puedes perder.','Decidir tu respuesta a tiempo convierte un supuesto fallido en aprendizaje.']},
  use:{title:'Cómo los pondrás a prueba',points:['Empieza por los que son importantes e inciertos a la vez.','Prueba barato: pregunta a participantes, revisa registros, haz un piloto.','Lleva los riesgos externos a tu registro de riesgos en el Módulo 10.']},
  mistakes:{title:'Qué evitar',points:['Supuestos vagos, como «el proyecto funciona», que no se pueden comprobar.','Comprometer dinero antes de probar los vínculos más riesgosos.','Mezclar riesgos que no controlas con tu respuesta a ellos.']}
 });

 // 2.9 Test, write and use your Theory of Change
 add('102.use','en',{
  what:'Your Theory of Change is useful when people can read it, question it and use it to decide. For each pathway, you write a one-page narrative in plain language, test it and keep it up to date.',
  parts:{title:'Write, test, review',items:[
   {label:'Write it',text:'One page: the problem, the change, the main steps, key assumptions and their evidence.',example:'Our bakery explains in five short paragraphs how paid traineeships lead to first jobs.'},
   {label:'Test it',text:'Ask future participants, people in the field, partners and one sceptic where it is weakest.',example:'A youth-centre manager doubts six months is enough, so the founders add follow-up calls.'},
   {label:'Version and review',text:'Give it a version number and a date; review after your pilot, then yearly.',example:'Version 0.1, March: a draft before the pilot, to review once the first trainees finish.'}]},
  why:{title:'Why it matters',points:['Plain words help co-founders, partners and funders follow your idea.','A sceptic finds weak links before reality does.','Versions show how your thinking improved with evidence.']},
  use:{title:'What it feeds',points:['Your indicators and learning in Module 6.','How you present your idea to funders, customers and partners.','Your first-year priorities and what you postpone.']},
  mistakes:{title:'What to avoid',points:['A diagram nobody outside the team can read.','Testing only with friends who already agree with you.','Never reviewing it, even after an assumption fails.']}
 });
 add('102.use','es',{
  what:'Tu Teoría de Cambio es útil cuando otros pueden leerla, cuestionarla y usarla para decidir. Para cada ruta escribes un relato de una página en lenguaje simple, lo pruebas y lo mantienes al día.',
  parts:{title:'Escribir, probar, revisar',items:[
   {label:'Escríbela',text:'Una página: el problema, el cambio, los pasos, los supuestos clave y su evidencia.',example:'Nuestra panadería explica en cinco párrafos breves cómo las prácticas pagadas llevan a un primer empleo.'},
   {label:'Pruébala',text:'Pregunta a participantes, gente del sector, aliados y un escéptico dónde es más débil.',example:'Una directora del centro juvenil duda de que seis meses basten; los fundadores suman llamadas de seguimiento.'},
   {label:'Versión y revisión',text:'Dale número de versión y fecha; revísala tras tu piloto y luego cada año.',example:'Versión 0.1, marzo: un borrador previo al piloto, a revisar cuando terminen los primeros aprendices.'}]},
  why:{title:'Por qué importa',points:['Las palabras simples ayudan a cofundadores, aliados y financiadores a seguir tu idea.','Un escéptico encuentra los puntos débiles antes que la realidad.','Las versiones muestran cómo mejoró tu razonamiento con evidencia.']},
  use:{title:'Qué alimenta',points:['Tus indicadores y tu aprendizaje en el Módulo 6.','Cómo presentas tu idea a financiadores, clientes y aliados.','Tus prioridades del primer año y lo que postergas.']},
  mistakes:{title:'Qué evitar',points:['Un diagrama que nadie fuera del equipo puede leer.','Probarla solo con amigos que ya están de acuerdo.','No revisarla nunca, ni siquiera cuando falla un supuesto.']}
 });
})();
