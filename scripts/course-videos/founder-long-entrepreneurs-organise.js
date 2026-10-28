// Longer lesson videos (entrepreneurs), Organise (modules 103–105): the `long` block adds scenes for what it is,
// its parts with examples, why it matters, how you will use it and what to avoid. Shape follows founder-long-pilot.js.
(function(){
 const add=(key,lang,long)=>{(window.LESSON_VIDEOS[key]||={})[lang]={...(window.LESSON_VIDEOS[key]?.[lang]||{}),long};};

 // ===== Module 103: Structure, Governance & Accountability =====

 add("103.capabilities","en",{
  what:"A function is a body of work your strategy needs, such as delivery, finance or communications. It is not a person: at the start, one founder may hold several functions.",
  parts:{title:"Three ways to resource it",items:[
   {label:"In-house",text:"You or a co-founder do the work yourselves, with your own time and skills.",example:"One founder of a repair café runs the sessions and recruits the volunteer fixers."},
   {label:"Shared with a partner",text:"A partner does part of the work alongside you, under an agreement.",example:"A library hosts the tutoring service and promotes it to local families."},
   {label:"Contracted out",text:"You pay someone for a defined task, but a founder still checks the work.",example:"A bookkeeper keeps the bakery's accounts; a founder reviews them every month."}]},
  why:{title:"Why start from functions",points:["You see all the work, including what nobody has started yet.","You spot where one founder carries too much, before a crisis.","You know what your first volunteers, hires or partners should take on."]},
  use:{title:"What they guide",points:["Your organigram: functions become your first roles and lines.","Your role cards: each function gets one accountable owner.","Your workforce plan and budget: what to fill first, and how."]},
  mistakes:{title:"What to avoid",points:["Starting from the people you know instead of the work needed.","Forgetting work not yet started, like registration or bookkeeping.","Thinking a contracted task no longer needs anyone inside to check it."]}
 });
 add("103.capabilities","es",{
  what:"Una función es un conjunto de trabajo que pide tu estrategia, como la entrega, las finanzas o la comunicación. No es una persona: al inicio, una persona fundadora puede asumir varias.",
  parts:{title:"Tres formas de cubrirla",items:[
   {label:"Interna",text:"Tú o tu cofundador hacen el trabajo, con su propio tiempo y habilidades.",example:"Una fundadora del café de reparaciones dirige las sesiones y recluta a los reparadores voluntarios."},
   {label:"Compartida con un aliado",text:"Un aliado hace parte del trabajo contigo, bajo un acuerdo.",example:"Una biblioteca acoge el servicio de tutorías y lo difunde entre las familias del barrio."},
   {label:"Contratada",text:"Pagas a alguien por una tarea definida, pero una persona fundadora revisa el trabajo.",example:"Un contador lleva las cuentas de la panadería; una fundadora las revisa cada mes."}]},
  why:{title:"Por qué empezar por funciones",points:["Ves todo el trabajo, incluso lo que nadie ha empezado aún.","Detectas si una persona fundadora carga demasiado, antes de una crisis.","Sabes qué deben asumir tu primer voluntariado, contrataciones o aliados."]},
  use:{title:"Qué guían",points:["Tu organigrama: las funciones se vuelven tus primeros roles.","Tus fichas de rol: cada función tiene un solo responsable.","Tu plan de personal y tu presupuesto: qué cubrir primero y cómo."]},
  mistakes:{title:"Qué evitar",points:["Partir de las personas que conoces y no del trabajo necesario.","Olvidar trabajo no iniciado, como el registro o la contabilidad.","Creer que una tarea contratada ya no necesita revisión interna."]}
 });

 add("103.structure","en",{
  what:"An organigram is a simple chart of roles and who reports to whom. It shows how the work is organised, not who approves spending or how decisions are made.",
  parts:{title:"Common shapes to start from",items:[
   {label:"Functional",text:"Roles grouped by expertise, such as delivery, finance and communications. Most new organisations start here.",example:"A bakery cooperative: one founder leads baking, the other leads sales and accounts."},
   {label:"Programme or product",text:"Roles grouped around each programme, product or service you offer.",example:"A youth club with one lead for sports and another for homework help."},
   {label:"Network or hub",text:"A small core of founders coordinating partners and volunteers around them.",example:"Two repair café founders coordinate ten volunteer fixers and a host venue."}]},
  why:{title:"Why draw it now",points:["Everyone can see who does what and who to ask.","You notice when one founder becomes the bottleneck for every decision.","Funders and partners see a real, honest picture of your team."]},
  use:{title:"What it guides",points:["Your governance, shown apart from management, even with the same founders.","Your role cards and delegation of authority, built on these lines.","Your growth: the chart for today and for two or three years ahead."]},
  mistakes:{title:"What to avoid",points:["Drawing ten empty boxes to look established.","Mixing governance and management in one set of lines.","Using personal details instead of role names, or changing shape by accident."]}
 });
 add("103.structure","es",{
  what:"Un organigrama es un gráfico simple de los roles y de quién reporta a quién. Muestra cómo se organiza el trabajo, no quién aprueba gastos ni cómo se decide.",
  parts:{title:"Formas comunes para empezar",items:[
   {label:"Funcional",text:"Roles agrupados por especialidad, como entrega, finanzas y comunicación. Así empiezan casi todas.",example:"Una cooperativa panadera: una fundadora dirige el horneado; la otra, ventas y cuentas."},
   {label:"Por programa o producto",text:"Roles agrupados en torno a cada programa, producto o servicio que ofreces.",example:"Un club juvenil con una persona a cargo de deportes y otra de apoyo escolar."},
   {label:"Red o núcleo",text:"Un pequeño núcleo fundador que coordina aliados y voluntariado a su alrededor.",example:"Dos fundadores de un café de reparaciones coordinan a diez reparadores voluntarios y un local."}]},
  why:{title:"Por qué dibujarlo ya",points:["Todos ven quién hace qué y a quién preguntar.","Notas cuando una persona fundadora se vuelve el cuello de botella.","Financiadores y aliados ven una imagen real y honesta de tu equipo."]},
  use:{title:"Qué guía",points:["Tu gobernanza, separada de la gestión, aunque sean las mismas personas.","Tus fichas de rol y tu matriz de delegación, basadas en estas líneas.","Tu crecimiento: el organigrama de hoy y el de dentro de dos o tres años."]},
  mistakes:{title:"Qué evitar",points:["Dibujar diez casillas vacías para aparentar.","Mezclar gobernanza y gestión en las mismas líneas.","Usar datos personales en vez de nombres de rol, o cambiar la forma sin querer."]}
 });

 add("103.governance","en",{
  what:"Governance is how an organisation is directed and held to account. Management is how it is run day to day. You have some governance from day one, even if it is only how the founders decide.",
  parts:{title:"Two jobs, often the same people",items:[
   {label:"Governance",text:"Asks: are we doing the right things, well and lawfully? Sets strategy, budget and key policies.",example:"The two tutoring founders meet quarterly to approve the budget and choose a legal form."},
   {label:"Management",text:"Asks: are we doing things right, day to day? Runs plans, schedules and delivery.",example:"The same founders set this week's tutoring timetable and book the room."},
   {label:"Advisory group",text:"Adds expertise and voice, but does not decide unless your documents give it that role.",example:"Three parents and a retired teacher advise the tutoring service twice a year."}]},
  examples:{title:"Who governs, by legal form",items:["Nonprofit or charity: a board of trustees or directors, legally responsible.","Company: directors appointed by shareholders, who keep certain key decisions.","Cooperative: its members, who usually elect a committee to oversee the work."]},
  why:{title:"Why it matters early",points:["Your founding document fixes the rules, so decide before you sign.","Clear roles stop founders confusing advice, oversight and daily decisions.","Funders and partners trust organisations that are held to account."]},
  use:{title:"What it guides",points:["Your choice of legal form and the founding document you adopt.","Your reserved matters and governance calendar, in the next lesson.","Who you invite first: advisers now, a fuller board as you grow."]},
  mistakes:{title:"What to avoid",points:["Signing founding documents before deciding how you want to be governed.","Treating an advisory group as if it carried legal responsibility.","Skipping local rules: ask someone with a legal background before registering."]}
 });
 add("103.governance","es",{
  what:"La gobernanza es cómo se dirige una organización y cómo rinde cuentas. La gestión es cómo funciona día a día. Tienes gobernanza desde el primer día, aunque solo sea cómo deciden quienes fundan.",
  parts:{title:"Dos tareas, a menudo mismas personas",items:[
   {label:"Gobernanza",text:"Pregunta: ¿hacemos lo correcto, bien y dentro de la ley? Fija estrategia, presupuesto y políticas clave.",example:"Las dos fundadoras de las tutorías se reúnen cada trimestre para aprobar el presupuesto y elegir forma jurídica."},
   {label:"Gestión",text:"Pregunta: ¿hacemos bien las cosas en el día a día? Lleva planes, horarios y entrega.",example:"Las mismas fundadoras fijan el horario de tutorías de esta semana y reservan el aula."},
   {label:"Grupo asesor",text:"Aporta experiencia y voz, pero no decide salvo que tus estatutos le den ese papel.",example:"Tres madres y un maestro jubilado asesoran el servicio de tutorías dos veces al año."}]},
  examples:{title:"Quién gobierna, según la forma",items:["Sin fines de lucro: un consejo directivo o de patronos, legalmente responsable.","Empresa: directores nombrados por los accionistas, que conservan ciertas decisiones clave.","Cooperativa: sus socios, que suelen elegir un comité para supervisar el trabajo."]},
  why:{title:"Por qué importa desde temprano",points:["Tus estatutos fijan las reglas: decide antes de firmarlos.","Roles claros evitan confundir consejo, supervisión y decisiones diarias.","Financiadores y aliados confían en quien rinde cuentas."]},
  use:{title:"Qué guía",points:["Tu elección de forma jurídica y los estatutos que adoptes.","Tus decisiones reservadas y tu calendario de gobernanza, en la próxima lección.","A quién invitas primero: asesores ahora, un consejo más amplio al crecer."]},
  mistakes:{title:"Qué evitar",points:["Firmar estatutos antes de decidir cómo quieres gobernarte.","Tratar a un grupo asesor como si tuviera responsabilidad legal.","Ignorar las normas locales: consulta a alguien con formación jurídica antes de registrarte."]}
 });

 add("103.board","en",{
  what:"The board, or the founders before one exists, sets direction and oversees. Management proposes plans and runs the work. Reserved matters are decisions only the governing body, or all co-founders together, can take.",
  parts:{title:"Three tools for clear oversight",items:[
   {label:"Reserved matters",text:"A written list of decisions that all co-founders, and later the board, must take together.",example:"At the repair café, any loan or new lease needs both founders' agreement."},
   {label:"Governance calendar",text:"Fixed dates in the year to review strategy, budget, accounts, risks and policies.",example:"The bakery founders review the accounts in March and set next year's budget in October."},
   {label:"Two hats, recorded",text:"A record of when a founder acts as manager and when as board member.",example:"Minutes note that the founder left the room while her own pay was discussed."}]},
  why:{title:"Why it matters",points:["It stops one founder deciding alone on things that affect everyone.","Oversight becomes routine, not a reaction to problems.","Someone can safely raise concerns about a founder's work."]},
  use:{title:"What it guides",points:["Your delegation of authority: what sits above every limit.","Your founders' agreement and, later, your board's terms of reference.","How others decide the founder's role and any pay."]},
  mistakes:{title:"What to avoid",points:["A board that manages daily work instead of overseeing it.","Founders taking decisions that now belong to the board.","Leaving the founder's own pay and role for the founder to decide."]}
 });
 add("103.board","es",{
  what:"El consejo, o quienes fundan antes de que exista, fija el rumbo y supervisa. La gestión propone planes y hace el trabajo. Las decisiones reservadas solo las toma el órgano de gobierno, o todo el equipo fundador junto.",
  parts:{title:"Tres herramientas de supervisión",items:[
   {label:"Decisiones reservadas",text:"Una lista escrita de decisiones que todo el equipo fundador, y luego el consejo, toma en conjunto.",example:"En el café de reparaciones, cualquier préstamo o alquiler nuevo requiere el acuerdo de ambos fundadores."},
   {label:"Calendario de gobernanza",text:"Fechas fijas en el año para revisar estrategia, presupuesto, cuentas, riesgos y políticas.",example:"Las fundadoras de la panadería revisan las cuentas en marzo y fijan el presupuesto en octubre."},
   {label:"Doble papel, registrado",text:"Un registro de cuándo una persona fundadora actúa como gestora y cuándo como consejera.",example:"El acta anota que la fundadora salió de la sala mientras se discutía su propio pago."}]},
  why:{title:"Por qué importa",points:["Evita que una persona fundadora decida sola lo que afecta a todos.","La supervisión se vuelve rutina, no una reacción a problemas.","Alguien puede plantear dudas sobre el trabajo de quien funda, con seguridad."]},
  use:{title:"Qué guía",points:["Tu matriz de delegación: lo que queda por encima de cada límite.","Tu acuerdo de fundadores y, luego, las reglas de tu consejo.","Cómo otras personas deciden el rol y el pago de quien funda."]},
  mistakes:{title:"Qué evitar",points:["Un consejo que gestiona el día a día en lugar de supervisar.","Fundadores que toman decisiones que ya corresponden al consejo.","Dejar que la persona fundadora decida su propio rol y pago."]}
 });

 add("103.roles","en",{
  what:"A role card describes what a person contributes, the results expected and what they can decide. A task list alone does not say what success looks like.",
  parts:{title:"What a role card holds",items:[
   {label:"Purpose and results",text:"Why the role exists and what success looks like by the end of the year.",example:"Bakery sales lead: three cafés buying bread every week by December."},
   {label:"Responsibilities",text:"The main areas of work the role owns, with one owner per area.",example:"The youth club's activities lead owns the session plan and the volunteer rota."},
   {label:"Decisions and limits",text:"What the role can decide alone, its spending limits and when to escalate.",example:"The tutoring coordinator buys materials within the monthly budget; anything more goes to both founders."},
   {label:"Links and support",text:"Who the role works with and the support it needs to succeed.",example:"The repair café's volunteer lead works with the host venue and has a monthly check-in."}]},
  why:{title:"Why they matter",points:["Co-founder roles are the first to blur; writing them down prevents friction.","People know what they can decide without asking every time.","One owner per area means nothing important falls between people."]},
  use:{title:"What they guide",points:["Your first job adverts and contracts in Module 4.","Your RACI and delegation of authority, later in this module.","Your check-ins: progress reviewed against each role's expected results."]},
  mistakes:{title:"What to avoid",points:["Writing only a task list, with no results or authority.","Shared ownership of an area, which usually means no ownership.","Forgetting role cards for founders, volunteers and board officers."]}
 });
 add("103.roles","es",{
  what:"Una ficha de rol describe lo que una persona aporta, los resultados esperados y lo que puede decidir. Una lista de tareas no dice cómo se ve el éxito.",
  parts:{title:"Qué contiene una ficha de rol",items:[
   {label:"Propósito y resultados",text:"Por qué existe el rol y cómo se ve el éxito al final del año.",example:"Ventas de la panadería: tres cafeterías comprando pan cada semana en diciembre."},
   {label:"Responsabilidades",text:"Las áreas de trabajo principales del rol, con un solo responsable por área.",example:"La responsable de actividades del club juvenil lleva el plan de sesiones y los turnos del voluntariado."},
   {label:"Decisiones y límites",text:"Qué decide sola, sus límites de gasto y cuándo escalar.",example:"La coordinadora de tutorías compra materiales dentro del presupuesto mensual; lo demás lo deciden ambos fundadores."},
   {label:"Relaciones y apoyo",text:"Con quién trabaja el rol y el apoyo que necesita para lograrlo.",example:"El responsable de voluntariado del café de reparaciones coordina con el local y tiene seguimiento mensual."}]},
  why:{title:"Por qué importan",points:["Los roles entre cofundadores se desdibujan primero; escribirlos evita fricciones.","Cada persona sabe qué puede decidir sin preguntar cada vez.","Un responsable por área evita que algo importante se pierda."]},
  use:{title:"Qué guían",points:["Tus primeros anuncios de empleo y contratos en el Módulo 4.","Tu RACI y tu matriz de delegación, más adelante en este módulo.","Tus seguimientos: el avance se revisa según los resultados de cada rol."]},
  mistakes:{title:"Qué evitar",points:["Escribir solo una lista de tareas, sin resultados ni autoridad.","Compartir la responsabilidad de un área, que suele ser no tenerla.","Olvidar fichas para fundadores, voluntariado y cargos del consejo."]}
 });

 add("103.delegation","en",{
  what:"A delegation of authority states who may approve what, up to which limit: spending, contracts, hiring, partnerships, public statements and access to personal data. The level rises with the risk.",
  parts:{title:"A ladder that rises with risk",items:[
   {label:"One founder",text:"Small purchases within the budget and daily delivery choices, with receipts kept.",example:"A repair café founder buys spare fuses and glue within the monthly budget."},
   {label:"All co-founders",text:"Larger purchases, first hires, contracts and partner agreements, with a second signatory.",example:"Both bakery founders sign the order for a new oven after getting two quotes."},
   {label:"Governing body",text:"Reserved matters: budget, strategy, major contracts, borrowing and key policies, recorded in minutes.",example:"Once registered, the youth club's board approves a loan for a new hall."},
   {label:"Members or shareholders",text:"Changing the founding document, electing the board and sharing any surplus.",example:"Cooperative members vote at the general meeting on how to share the year's surplus."}]},
  why:{title:"Why it matters",points:["It saves arguments before you open a bank account or sign contracts.","A second check protects you from mistakes, even if you are only two.","Partners and funders see that money and promises are controlled."]},
  use:{title:"What it guides",points:["Your finance procedures in Module 9, with the same thresholds.","Your bank mandate: who signs, and above which amount.","Your role cards: each role's spending limits and when to escalate."]},
  mistakes:{title:"What to avoid",points:["No cover for absence: name who approves when the usual approver is away.","Anyone approving a payment to themselves, or where they have an interest.","Delegating and walking away: whoever delegates still checks how authority is used."]}
 });
 add("103.delegation","es",{
  what:"Una matriz de delegación indica quién puede aprobar qué y hasta qué límite: gastos, contratos, contrataciones, alianzas, declaraciones públicas y acceso a datos personales. El nivel sube con el riesgo.",
  parts:{title:"Una escalera según el riesgo",items:[
   {label:"Una persona fundadora",text:"Compras pequeñas dentro del presupuesto y decisiones diarias de entrega, con recibos guardados.",example:"Una fundadora del café de reparaciones compra fusibles y pegamento dentro del presupuesto mensual."},
   {label:"Todo el equipo fundador",text:"Compras mayores, primeras contrataciones, contratos y acuerdos con aliados, con segunda firma.",example:"Ambos fundadores de la panadería firman la compra de un horno tras pedir dos cotizaciones."},
   {label:"Órgano de gobierno",text:"Decisiones reservadas: presupuesto, estrategia, grandes contratos, préstamos y políticas clave, en actas.",example:"Ya registrado, el consejo del club juvenil aprueba un préstamo para un nuevo salón."},
   {label:"Socios o accionistas",text:"Cambiar los estatutos, elegir el consejo y repartir cualquier excedente.",example:"Los socios de la cooperativa votan en asamblea cómo repartir el excedente del año."}]},
  why:{title:"Por qué importa",points:["Evita discusiones antes de abrir una cuenta o firmar contratos.","Una segunda revisión te protege de errores, aunque solo sean dos.","Aliados y financiadores ven que el dinero y los compromisos están controlados."]},
  use:{title:"Qué guía",points:["Tus procedimientos financieros del Módulo 9, con los mismos umbrales.","Tus firmas bancarias: quién firma y desde qué monto.","Tus fichas de rol: límites de gasto de cada rol y cuándo escalar."]},
  mistakes:{title:"Qué evitar",points:["No prever ausencias: define quién aprueba si falta la persona habitual.","Aprobar un pago a ti mismo, o algo en lo que tienes interés.","Delegar y desentenderse: quien delega sigue revisando cómo se usa la autoridad."]}
 });

 add("103.raci","en",{
  what:"RACI is a simple table that shows who does what in a process or decision. Each person in a row gets a letter for their kind of involvement.",
  parts:{title:"The four letters",items:[
   {label:"R · Responsible",text:"Does the work or prepares the decision. One or more people.",example:"At the youth club, a volunteer drafts the summer programme."},
   {label:"A · Accountable",text:"Owns the result and signs it off; can say no. Exactly one per row.",example:"The founder who leads activities approves the final summer programme."},
   {label:"C · Consulted",text:"Gives input before the work is finished; two-way. As few as possible.",example:"Two parents comment on the draft programme before it is fixed."},
   {label:"I · Informed",text:"Told about the outcome; one-way. Anyone who needs to know.",example:"The co-founder handling money hears the final dates to plan the budget."}]},
  why:{title:"Why it helps small teams",points:["Small teams assume rather than ask; a RACI makes it visible.","One Accountable per row ends arguments about who decides.","New people see at once how recurring work flows."]},
  use:{title:"Where you will use it",points:["Recurring work: the annual plan, funding bids or pitches, recruiting, complaints.","Your process owners and SOPs in Module 5.","Your meetings: check the table whenever a hand-off is unclear."]},
  mistakes:{title:"What to avoid",points:["Two Accountables in one row, which means nobody really owns it.","Too many Consulted, which slows every decision down.","Writing it once and never updating it when roles change."]}
 });
 add("103.raci","es",{
  what:"RACI es una tabla simple que muestra quién hace qué en un proceso o decisión. Cada persona de una fila recibe una letra según su tipo de participación.",
  parts:{title:"Las cuatro letras",items:[
   {label:"R · Responsable",text:"Hace el trabajo o prepara la decisión. Una o más personas.",example:"En el club juvenil, una voluntaria redacta el programa de verano."},
   {label:"A · Rinde cuentas",text:"Responde por el resultado y lo aprueba; puede decir no. Exactamente una por fila.",example:"La fundadora a cargo de actividades aprueba el programa de verano final."},
   {label:"C · Consultado",text:"Aporta antes de terminar el trabajo; en ambos sentidos. Las menos posibles.",example:"Dos familias opinan sobre el borrador del programa antes de cerrarlo."},
   {label:"I · Informado",text:"Recibe el resultado; en un solo sentido. Quien necesite saberlo.",example:"El cofundador que lleva el dinero recibe las fechas finales para planificar el presupuesto."}]},
  why:{title:"Por qué ayuda a equipos pequeños",points:["Los equipos pequeños suponen en vez de preguntar; el RACI lo hace visible.","Una sola A por fila acaba con las dudas sobre quién decide.","Quien llega ve de inmediato cómo fluye el trabajo recurrente."]},
  use:{title:"Dónde lo usarás",points:["Trabajo recurrente: plan anual, propuestas de fondos o ventas, selección, quejas.","Tus responsables de procesos y procedimientos en el Módulo 5.","Tus reuniones: revisa la tabla cuando un traspaso no esté claro."]},
  mistakes:{title:"Qué evitar",points:["Dos A en una fila: en realidad nadie responde.","Demasiadas C, que frenan cada decisión.","Escribirlo una vez y no actualizarlo cuando cambian los roles."]}
 });

 add("103.accountability","en",{
  what:"Accountability means being answerable for what you do and what results from it. In purpose-led work it runs in several directions, starting with the people you serve and your first supporters.",
  parts:{title:"Three directions",items:[
   {label:"Upward",text:"To a board, funders, investors and regulators: results, finance and risk.",example:"The tutoring service sends its first funder a short report on results and spending."},
   {label:"Sideways",text:"To partners and peers who share the work or rely on you.",example:"The repair café tells its host library each term how many items were fixed."},
   {label:"Downward",text:"To the people you serve: useful information, feedback and decisions explained.",example:"The youth club shares survey results with young people and says what will change."}]},
  why:{title:"Why it matters",points:["Trust grows when people see what you do with their time and money.","Habits built now are easier than adding them once you are busy.","Problems surface early when people can raise them without fear."]},
  use:{title:"What it guides",points:["Your reporting rhythm: what you report, to whom and how often.","Your feedback with communities, developed further in Module 6.","Your check-ins: clear expectations and fair consequences, among co-founders too."]},
  mistakes:{title:"What to avoid",points:["Reporting only upward and forgetting the people you serve.","Expectations between co-founders that are never said or reviewed.","Blaming people when things go wrong instead of learning."]}
 });
 add("103.accountability","es",{
  what:"Rendir cuentas es responder por lo que haces y por lo que resulta de ello. En el trabajo con propósito va en varias direcciones, empezando por quienes atiendes y tus primeros apoyos.",
  parts:{title:"Tres direcciones",items:[
   {label:"Hacia arriba",text:"Ante el consejo, financiadores, inversores y reguladores: resultados, finanzas y riesgos.",example:"Las tutorías envían a su primer financiador un breve informe de resultados y gastos."},
   {label:"A los lados",text:"Ante aliados y pares que comparten el trabajo o dependen de ti.",example:"El café de reparaciones cuenta cada trimestre a la biblioteca anfitriona cuántos objetos reparó."},
   {label:"Hacia abajo",text:"Ante quienes atiendes: información útil, escucha y decisiones explicadas.",example:"El club juvenil comparte los resultados de la encuesta con los jóvenes y dice qué cambiará."}]},
  why:{title:"Por qué importa",points:["La confianza crece cuando ven qué haces con su tiempo y su dinero.","Crear hábitos ahora es más fácil que sumarlos cuando estés ocupado.","Los problemas salen a tiempo si se pueden plantear sin miedo."]},
  use:{title:"Qué guía",points:["Tu ritmo de informes: qué informas, a quién y cada cuánto.","Tu escucha a las comunidades, que el Módulo 6 desarrolla más.","Tus seguimientos: expectativas claras y consecuencias justas, también entre cofundadores."]},
  mistakes:{title:"Qué evitar",points:["Informar solo hacia arriba y olvidar a quienes atiendes.","Expectativas entre cofundadores que nunca se dicen ni se revisan.","Culpar a las personas cuando algo falla, en lugar de aprender."]}
 });

 add("103.coordination","en",{
  what:"Coordination makes work move reliably between people. It rests on clear hand-offs, a regular operating rhythm and agreed channels for communication and decisions.",
  parts:{title:"Three building blocks",items:[
   {label:"Clear hand-offs",text:"A named recipient, an agreed output and a date. Sharing a file is not enough.",example:"The baker hands the sales founder a price list by Friday for the market stall."},
   {label:"Operating rhythm",text:"A weekly check-in, a monthly look at numbers, a quarterly review. Add more as you grow.",example:"The repair café founders meet every Monday for twenty minutes on priorities and blockers."},
   {label:"Agreed channels",text:"What goes in chat, what goes by email, where documents live and where decisions are recorded.",example:"The youth club keeps quick updates in chat and every decision in one shared log."}]},
  why:{title:"Why it matters",points:["Work falls through the gaps when nobody agreed who acts next.","Meetings stay short when updates are shared beforehand.","A decision log shows people who join later what was decided and why."]},
  use:{title:"What it guides",points:["Your planning calendar and weekly routines in Module 5.","Your action tracking: an owner and a date for each meeting action.","Your workload check: a route for flagging overload and clashing priorities."]},
  mistakes:{title:"What to avoid",points:["Assuming that sharing a document means someone will act on it.","Using meetings for routine updates instead of decisions.","Ignoring founder overload because there is no way to flag it."]}
 });
 add("103.coordination","es",{
  what:"La coordinación hace que el trabajo pase de una persona a otra de forma fiable. Se apoya en traspasos claros, un ritmo de trabajo regular y canales acordados para comunicar y decidir.",
  parts:{title:"Tres piezas básicas",items:[
   {label:"Traspasos claros",text:"Un destinatario, un resultado acordado y una fecha. Compartir un archivo no basta.",example:"El panadero entrega a la fundadora de ventas una lista de precios el viernes para el mercado."},
   {label:"Ritmo de trabajo",text:"Reunión semanal, mirada mensual a los números, revisión trimestral. Suma más al crecer.",example:"Los fundadores del café de reparaciones se reúnen cada lunes veinte minutos sobre prioridades y bloqueos."},
   {label:"Canales acordados",text:"Qué va por chat, qué por correo, dónde viven los documentos y dónde se registran decisiones.",example:"El club juvenil usa el chat para avisos rápidos y un solo registro para cada decisión."}]},
  why:{title:"Por qué importa",points:["El trabajo se pierde cuando nadie acordó quién actúa después.","Las reuniones son breves si las novedades se comparten antes.","Un registro de decisiones muestra a quien llega qué se decidió y por qué."]},
  use:{title:"Qué guía",points:["Tu calendario de planificación y tus rutinas semanales en el Módulo 5.","Tu seguimiento de acciones: responsable y fecha para cada acción.","Tu control de carga: una vía para avisar de sobrecarga o prioridades en conflicto."]},
  mistakes:{title:"Qué evitar",points:["Suponer que compartir un documento significa que alguien actuará.","Usar las reuniones para novedades rutinarias en vez de decisiones.","Ignorar la sobrecarga de quien funda por no tener cómo avisarla."]}
 });

 // ===== Module 104: People, Culture & Volunteers =====

 add("104.workforce","en",{
  what:"Workforce planning matches the people you will need to the work your strategy requires, over time: how much time each role needs, which skills, and from when. It starts with what you carry yourself.",
  parts:{title:"Who will do the work",items:[
   {label:"Employees",text:"Steady time for core, ongoing work. They need a contract, pay and management.",example:"The bakery hires its first part-time baker once weekly orders cover the wage."},
   {label:"Contractors",text:"Specialist skills for a defined task, often the first paid help.",example:"A freelance designer builds the tutoring service's booking page for a fixed fee."},
   {label:"Volunteers",text:"Time, local knowledge and trust. Not free: they need training, supervision and expenses.",example:"Retired electricians fix lamps at the repair café, with their expenses repaid."},
   {label:"Interns",text:"Fresh skills while they learn. They need a learning plan and supervision.",example:"A design student spends ten weeks making the youth club's posters, with a mentor."}]},
  why:{title:"Why plan it now",points:["You see how much you and your co-founders are really carrying.","You fill the roles that matter most first, when money allows.","You know who would cover if a founder suddenly could not work."]},
  use:{title:"What it guides",points:["Your recruitment, contracts and onboarding, next in this module.","Your budget: what income or milestone pays for each role.","Your partners: which roles could be shared rather than hired."]},
  mistakes:{title:"What to avoid",points:["Treating volunteers as free, with no recruiting, training or expenses.","Building the model on unpaid people doing core, ongoing work.","Mixing up employees and contractors without checking the rules where you are."]}
 });
 add("104.workforce","es",{
  what:"Planificar el personal es ajustar las personas que necesitarás al trabajo que pide tu estrategia a lo largo del tiempo: cuánto tiempo, qué habilidades y desde cuándo. Empieza por lo que cargas tú.",
  parts:{title:"Quién hará el trabajo",items:[
   {label:"Personal empleado",text:"Tiempo estable para trabajo central y continuo. Necesita contrato, salario y gestión.",example:"La panadería contrata a su primer panadero a medio tiempo cuando los pedidos cubren el salario."},
   {label:"Contratistas",text:"Habilidades especializadas para una tarea definida; a menudo, la primera ayuda pagada.",example:"Una diseñadora independiente crea la página de reservas de las tutorías por un precio fijo."},
   {label:"Voluntariado",text:"Tiempo, conocimiento local y confianza. No es gratis: requiere formación, supervisión y gastos.",example:"Electricistas jubilados reparan lámparas en el café de reparaciones, con sus gastos cubiertos."},
   {label:"Pasantes",text:"Habilidades nuevas mientras aprenden. Necesitan un plan de aprendizaje y supervisión.",example:"Un estudiante de diseño crea durante diez semanas los carteles del club juvenil, con una mentora."}]},
  why:{title:"Por qué planificarlo ya",points:["Ves cuánto cargan realmente tú y tus cofundadores.","Cubres primero los roles más importantes, cuando el dinero lo permita.","Sabes quién cubriría si una persona fundadora no pudiera trabajar."]},
  use:{title:"Qué guía",points:["Tu selección, contratos e incorporación, en las próximas lecciones.","Tu presupuesto: qué ingreso o meta paga cada rol.","Tus aliados: qué roles podrían compartirse en vez de contratarse."]},
  mistakes:{title:"Qué evitar",points:["Tratar al voluntariado como gratis, sin selección, formación ni gastos.","Basar el modelo en personas sin pago que hacen trabajo central y continuo.","Confundir empleo y contratación sin revisar las normas de tu país."]}
 });

 add("104.recruitment","en",{
  what:"Recruitment is how you find and choose the people who will join you. Fair selection means judging every candidate against the same criteria, agreed before you read any application.",
  parts:{title:"Four steps to fair selection",items:[
   {label:"A clear advert",text:"Purpose, main tasks, essential criteria, pay and how to apply, in plain language.",example:"The tutoring service drops the degree requirement: patience and good maths matter more."},
   {label:"A wide search",text:"Advertise where the people you want actually look, beyond friends and contacts.",example:"The youth club posts its role at the community centre and on local radio."},
   {label:"Fair assessment",text:"Same questions, a scoring guide, at least two people deciding and reasons noted.",example:"Two founders score each bakery candidate on a short practical bake, then compare notes."},
   {label:"Safer recruitment",text:"Identity checks, references and safeguarding questions when the role involves children or vulnerable adults.",example:"The youth club checks references for every session leader before their first evening."}]},
  why:{title:"Why it matters",points:["Your first role sets the standard for every one after it.","A wider search stops you building a team that only looks like you.","Written reasons protect you if a decision is questioned later."]},
  use:{title:"What it builds on",points:["Your role cards from Module 3 become the adverts.","Your contracts and onboarding, next in this module.","Your data protection rules: how you keep applicants' records."]},
  mistakes:{title:"What to avoid",points:["Asking only friends and contacts.","Requirements that exclude people without good reason, like unneeded degrees.","Skipping safeguarding checks because “we already know them”."]}
 });
 add("104.recruitment","es",{
  what:"La selección es cómo encuentras y eliges a quienes se unirán a ti. Ser justo significa evaluar cada candidatura con los mismos criterios, acordados antes de leer ninguna.",
  parts:{title:"Cuatro pasos de una selección justa",items:[
   {label:"Un anuncio claro",text:"Propósito, tareas, criterios esenciales, pago y cómo postular, en lenguaje sencillo.",example:"Las tutorías quitan el requisito de título: importan más la paciencia y las buenas matemáticas."},
   {label:"Una búsqueda amplia",text:"Publica donde de verdad buscan las personas que quieres, más allá de amistades y contactos.",example:"El club juvenil publica el puesto en el centro comunitario y en una radio local."},
   {label:"Evaluación justa",text:"Mismas preguntas, guía de puntuación, al menos dos personas decidiendo y razones anotadas.",example:"Dos fundadores puntúan a cada candidato de la panadería en una prueba práctica y comparan notas."},
   {label:"Selección segura",text:"Identidad, referencias y preguntas de protección si el rol implica menores o adultos vulnerables.",example:"El club juvenil revisa las referencias de cada monitor antes de su primera tarde."}]},
  why:{title:"Por qué importa",points:["Tu primer rol marca la pauta para todos los que vengan.","Una búsqueda amplia evita un equipo que solo se parece a ti.","Las razones escritas te protegen si alguien cuestiona una decisión."]},
  use:{title:"En qué se apoya",points:["Tus fichas de rol del Módulo 3 se convierten en anuncios.","Tus contratos e incorporación, en las próximas lecciones.","Tus reglas de protección de datos: cómo guardas las candidaturas."]},
  mistakes:{title:"Qué evitar",points:["Preguntar solo a amistades y contactos.","Requisitos que excluyen sin razón, como títulos innecesarios.","Saltarse las verificaciones de protección porque «ya la conocemos»."]}
 });

 add("104.contracts","en",{
  what:"Every working relationship needs written terms that suit its type, starting with the one between co-founders. The document sets out the role, time, pay or expenses, ownership of work and how it ends.",
  parts:{title:"Match the document to the relationship",items:[
   {label:"Co-founders",text:"A founders' agreement on roles, time, decisions, ownership of work and what happens if one leaves.",example:"The two bakery founders agree who keeps the recipes if one of them leaves."},
   {label:"Employees",text:"An employment contract or written statement that meets local minimum terms.",example:"The tutoring service's first coordinator signs a contract with probation and notice periods."},
   {label:"Contractors",text:"A services agreement with deliverables and fees, for someone truly independent.",example:"A web developer agrees to deliver the repair café's site in six weeks for a set fee."},
   {label:"Volunteers",text:"A volunteer agreement or role description, without language of obligation or pay.",example:"Youth club volunteers receive a role description and claim travel expenses only."}]},
  why:{title:"Why it matters",points:["Getting the type wrong from the start is a common legal risk.","Clear ownership means what you create belongs to the organisation.","A founders' agreement prevents painful disputes if someone leaves."]},
  use:{title:"What it guides",points:["Your onboarding: signed terms before the first day.","Your people records: signed copies kept securely, renewal dates tracked.","Your wider legal framework in Module 10."]},
  mistakes:{title:"What to avoid",points:["Using a template without checking it with someone with a legal background.","Volunteer agreements that accidentally create an employment relationship.","Never updating terms when a role changes."]}
 });
 add("104.contracts","es",{
  what:"Toda relación de trabajo necesita condiciones escritas según su tipo, empezando por la que existe entre cofundadores. El documento fija el rol, el tiempo, el pago o los gastos, la propiedad del trabajo y cómo termina.",
  parts:{title:"Cada relación, su documento",items:[
   {label:"Cofundadores",text:"Un acuerdo de fundadores sobre roles, tiempo, decisiones, propiedad del trabajo y qué pasa si alguien se va.",example:"Las dos fundadoras de la panadería acuerdan quién conserva las recetas si una se va."},
   {label:"Personal empleado",text:"Un contrato de trabajo o declaración escrita que cumpla los mínimos locales.",example:"El primer coordinador de las tutorías firma un contrato con periodo de prueba y preaviso."},
   {label:"Contratistas",text:"Un acuerdo de servicios con entregables y honorarios, para alguien realmente independiente.",example:"Un desarrollador web entrega el sitio del café de reparaciones en seis semanas por un precio fijo."},
   {label:"Voluntariado",text:"Un acuerdo de voluntariado o ficha de rol, sin lenguaje de obligación ni pago.",example:"El voluntariado del club juvenil recibe una ficha de rol y solo cobra gastos de transporte."}]},
  why:{title:"Por qué importa",points:["Equivocarse de tipo desde el inicio es un riesgo legal común.","Con la propiedad clara, lo que se crea pertenece a la organización.","Un acuerdo de fundadores evita conflictos dolorosos si alguien se va."]},
  use:{title:"Qué guía",points:["Tu incorporación: condiciones firmadas antes del primer día.","Tus registros: copias firmadas guardadas con seguridad y fechas de renovación.","Tu marco legal más amplio en el Módulo 10."]},
  mistakes:{title:"Qué evitar",points:["Usar una plantilla sin revisarla con alguien con formación jurídica.","Acuerdos de voluntariado que crean, sin querer, una relación laboral.","No actualizar las condiciones cuando cambia un rol."]}
 });

 add("104.onboarding","en",{
  what:"Onboarding helps a new person understand the mission, their role, the safeguards and the practical ways of working. Giving someone access to a folder is only a small part of it.",
  parts:{title:"Three stages of a good start",items:[
   {label:"First day",text:"A welcome, equipment and accounts, and meeting a buddy who will guide them.",example:"At the repair café, a founder shows the new volunteer the tools and the safety rules."},
   {label:"First week",text:"Essential training, core policies signed and an early, useful task.",example:"The new tutor shadows two sessions, then leads a short reading activity."},
   {label:"First month",text:"Check understanding, review progress and ask what was missing.",example:"After four weeks, the bakery's new baker suggests a clearer hygiene checklist."}]},
  why:{title:"Why it matters",points:["Your first people shape what joining means for everyone after them.","Checking understanding protects participants, not just paperwork.","Culture is set by everyday behaviour from the very first day."]},
  use:{title:"How you will use it",points:["One standard template, with steps added for each new role.","Your safeguarding and data protection essentials, explained in person.","Your check-ins: the first-month review becomes the first one."]},
  mistakes:{title:"What to avoid",points:["Sending documents and assuming they were read.","Waiting until someone joins to build the template.","No buddy, so the newcomer has nobody to ask."]}
 });
 add("104.onboarding","es",{
  what:"La incorporación ayuda a una persona nueva a entender la misión, su rol, las medidas de protección y las formas prácticas de trabajar. Darle acceso a una carpeta es solo una pequeña parte.",
  parts:{title:"Tres etapas de un buen inicio",items:[
   {label:"Primer día",text:"Bienvenida, equipo y cuentas, y conocer a una persona guía que la acompañe.",example:"En el café de reparaciones, una fundadora muestra al nuevo voluntario las herramientas y las normas de seguridad."},
   {label:"Primera semana",text:"Formación esencial, políticas clave firmadas y una primera tarea útil.",example:"La nueva tutora observa dos sesiones y luego dirige una breve actividad de lectura."},
   {label:"Primer mes",text:"Comprobar la comprensión, revisar el avance y preguntar qué faltó.",example:"Tras cuatro semanas, el nuevo panadero sugiere una lista de higiene más clara."}]},
  why:{title:"Por qué importa",points:["Tus primeras personas definen qué significa unirse para las siguientes.","Comprobar la comprensión protege a los participantes, no solo los papeles.","La cultura se fija con la conducta diaria desde el primer día."]},
  use:{title:"Cómo lo usarás",points:["Una plantilla estándar, con pasos para cada nuevo rol.","Tus esenciales de protección y de datos, explicados en persona.","Tus seguimientos: la revisión del primer mes es el primero."]},
  mistakes:{title:"Qué evitar",points:["Enviar documentos y suponer que se leyeron.","Esperar a que alguien llegue para crear la plantilla.","No asignar persona guía, y que nadie sepa a quién preguntar."]}
 });

 add("104.checkins","en",{
  what:"Check-ins are short, regular conversations about priorities, blockers and feedback. With a few objectives and development goals, they do more for performance than an annual appraisal, and they can start now, between co-founders.",
  parts:{title:"Three conversations, kept apart",items:[
   {label:"Check-in",text:"Priorities, blockers, feedback both ways and next steps. Short, weekly to monthly.",example:"The tutoring founders spend fifteen minutes every Friday on what worked and what is stuck."},
   {label:"Objectives and development",text:"Progress on a few objectives and one or two development goals, quarterly or twice a year.",example:"The youth club founder's goal this year: learn to manage a budget, with a mentor."},
   {label:"Wellbeing",text:"Workload, stress and support, with no judgement on performance. Whenever needed.",example:"After a hard month, the bakery founders talk about rest, not sales figures."}]},
  why:{title:"Why keep them apart",points:["Mixing these conversations makes people less open in all of them.","Problems surface early, while they are still small.","Each person sees how their work contributes to your objectives."]},
  use:{title:"What they connect to",points:["Your first annual plan: personal objectives link to it.","Your role cards: expected results become the objectives.","A written procedure for performance concerns, agreed before you need it."]},
  mistakes:{title:"What to avoid",points:["Relying on one annual appraisal and nothing else.","Mixing personal objectives with organisational KPIs and programme indicators.","Raising performance concerns late, in public or without support."]}
 });
 add("104.checkins","es",{
  what:"Los seguimientos son conversaciones breves y regulares sobre prioridades, bloqueos y feedback. Con pocos objetivos y metas de desarrollo, valen más que una evaluación anual, y pueden empezar ya entre cofundadores.",
  parts:{title:"Tres conversaciones, separadas",items:[
   {label:"Seguimiento",text:"Prioridades, bloqueos, feedback mutuo y próximos pasos. Breve, de semanal a mensual.",example:"Las fundadoras de las tutorías dedican quince minutos cada viernes a lo que funcionó y lo trabado."},
   {label:"Objetivos y desarrollo",text:"Avance en pocos objetivos y una o dos metas de desarrollo, cada trimestre o semestre.",example:"Meta del fundador del club juvenil este año: aprender a manejar un presupuesto, con una mentora."},
   {label:"Bienestar",text:"Carga de trabajo, estrés y apoyo, sin juzgar el desempeño. Cuando haga falta.",example:"Tras un mes difícil, los fundadores de la panadería hablan de descanso, no de ventas."}]},
  why:{title:"Por qué separarlas",points:["Mezclar estas conversaciones hace que la gente se abra menos en todas.","Los problemas salen pronto, cuando aún son pequeños.","Cada persona ve cómo su trabajo aporta a tus objetivos."]},
  use:{title:"Con qué se conectan",points:["Tu primer plan anual: los objetivos personales se vinculan a él.","Tus fichas de rol: los resultados esperados se vuelven objetivos.","Un procedimiento escrito para problemas de desempeño, acordado antes de necesitarlo."]},
  mistakes:{title:"Qué evitar",points:["Depender solo de una evaluación anual.","Mezclar objetivos personales con indicadores de la organización o de programas.","Plantear problemas de desempeño tarde, en público o sin apoyo."]}
 });

 add("104.pay","en",{
  what:"Pay principles are the rules for how everyone is paid, founders included. They are one of the clearest signs of your values, and far easier to set before the first salary than to fix later.",
  parts:{title:"What a fair pay system holds",items:[
   {label:"Pay principles",text:"How salaries are set, the gap allowed between highest and lowest, and how increases and founders' pay are decided.",example:"The cooperative commits to a living wage and a top salary no more than three times the lowest."},
   {label:"Pay bands",text:"Roles grouped into bands, each with a range, and how people move between them.",example:"The tutoring service sets two bands, tutors and coordinators, each with a clear range."},
   {label:"Careers and recognition",text:"Growth through responsibility or projects, plus specific thanks, celebrated milestones and benefits like flexible hours.",example:"A youth club volunteer who leads the summer camp is thanked publicly and given learning time."}]},
  why:{title:"Why set it early",points:["Fixing unfair gaps later is much harder than preventing them now.","Bands stop one-off negotiations creating gaps, including gender pay gaps.","People stay when they feel valued, even when pay is modest."]},
  use:{title:"What it guides",points:["Your budget: salary costs based on bands, not guesses.","Your recruitment adverts: open about pay from the first role.","Your founders' agreement: how others decide founders' pay."]},
  mistakes:{title:"What to avoid",points:["Setting each salary by one-off negotiation.","Promising pay or benefits you cannot yet afford.","Forgetting recognition because money is tight."]}
 });
 add("104.pay","es",{
  what:"Los principios de remuneración son las reglas con que pagas a todas las personas, incluidas las fundadoras. Son una señal clara de tus valores, y es mucho más fácil fijarlos antes del primer salario que corregirlos después.",
  parts:{title:"Qué contiene una remuneración justa",items:[
   {label:"Principios de pago",text:"Cómo se fijan salarios, la brecha permitida entre el más alto y el más bajo, aumentos y pago a fundadores.",example:"La cooperativa se compromete a un salario digno y a que el más alto no triplique el más bajo."},
   {label:"Bandas salariales",text:"Roles agrupados en bandas, cada una con un rango, y cómo se pasa de una a otra.",example:"Las tutorías fijan dos bandas, tutores y coordinación, cada una con un rango claro."},
   {label:"Carrera y reconocimiento",text:"Crecer con responsabilidad o proyectos, más agradecimientos concretos, logros celebrados y beneficios como horario flexible.",example:"Una voluntaria que dirige el campamento del club juvenil recibe agradecimiento público y tiempo para aprender."}]},
  why:{title:"Por qué fijarla temprano",points:["Corregir brechas injustas después cuesta mucho más que prevenirlas.","Las bandas evitan brechas por negociaciones aisladas, incluida la de género.","Las personas se quedan si se sienten valoradas, aunque el pago sea modesto."]},
  use:{title:"Qué guía",points:["Tu presupuesto: costos salariales basados en bandas, no en suposiciones.","Tus anuncios: transparencia salarial desde el primer rol.","Tu acuerdo de fundadores: otras personas deciden el pago de quien funda."]},
  mistakes:{title:"Qué evitar",points:["Fijar cada salario en una negociación aislada.","Prometer pagos o beneficios que aún no puedes costear.","Olvidar el reconocimiento porque el dinero escasea."]}
 });

 add("104.culture","en",{
  what:"Culture is what people actually do when no one is checking: how decisions are made, how mistakes are handled, how people disagree and whose voice counts. It forms in the first months, mostly from what founders do.",
  parts:{title:"Three parts to build on purpose",items:[
   {label:"Everyday habits",text:"How decisions, mistakes and disagreements are handled, linked to your values.",example:"At the repair café, every failed repair is discussed openly as a lesson, never blamed."},
   {label:"Wellbeing",text:"Reasonable workload limits, modelled by founders, and support when work is distressing.",example:"The youth club founders send no work messages after 8 pm, and keep to it."},
   {label:"Inclusion and voice",text:"Accessibility, language, meeting times, caring duties, and safety to speak up.",example:"The tutoring team moves meetings to school hours so parents of young children can join."}]},
  why:{title:"Why it matters",points:["Culture either supports your values or quietly contradicts them.","Founders are often the first to burn out in purpose-led work.","Speaking up safely is the basis for learning and for safeguarding."]},
  use:{title:"What it connects to",points:["Your values from Module 1, turned into daily practice.","Your check-ins and, as you grow, a short anonymous survey.","Your safeguarding approach: people raise concerns because they feel safe."]},
  mistakes:{title:"What to avoid",points:["Justifying long hours with the mission.","Stating values that the founders do not live.","Asking how people are, then not acting on what you hear."]}
 });
 add("104.culture","es",{
  what:"La cultura es lo que la gente hace de verdad cuando nadie mira: cómo se decide, cómo se manejan los errores, cómo se discrepa y qué voces cuentan. Se forma en los primeros meses, sobre todo por lo que hacen quienes fundan.",
  parts:{title:"Tres partes para construir a propósito",items:[
   {label:"Hábitos diarios",text:"Cómo se manejan decisiones, errores y desacuerdos, vinculados a tus valores.",example:"En el café de reparaciones, cada reparación fallida se comenta como aprendizaje, sin culpas."},
   {label:"Bienestar",text:"Límites razonables de carga, que quienes fundan cumplen, y apoyo cuando el trabajo es duro.",example:"Los fundadores del club juvenil no envían mensajes de trabajo después de las 8 de la noche."},
   {label:"Inclusión y voz",text:"Accesibilidad, idioma, horarios, tareas de cuidado y seguridad para hablar.",example:"Las tutorías pasan las reuniones al horario escolar para que puedan venir familias con niños pequeños."}]},
  why:{title:"Por qué importa",points:["La cultura apoya tus valores o los contradice en silencio.","Quienes fundan suelen ser los primeros en agotarse en el trabajo con propósito.","Hablar con seguridad es la base del aprendizaje y de la protección."]},
  use:{title:"Con qué se conecta",points:["Tus valores del Módulo 1, convertidos en práctica diaria.","Tus seguimientos y, al crecer, una breve encuesta anónima.","Tu enfoque de protección: la gente avisa porque se siente segura."]},
  mistakes:{title:"Qué evitar",points:["Justificar jornadas largas con la misión.","Proclamar valores que quienes fundan no viven.","Preguntar cómo está la gente y luego no actuar."]}
 });

 add("104.volunteers","en",{
  what:"Volunteers give their time, skills and local knowledge without pay. Volunteering works best as a two-way relationship: be clear about what you offer them as well as what you ask.",
  parts:{title:"Who contributes, and how",items:[
   {label:"Volunteer",text:"Takes a defined role. Needs checks, induction, supervision and expenses repaid.",example:"An event helper sets up tables and greets families at the youth club's open day."},
   {label:"Community adviser",text:"Shapes the design. Needs a real say and feedback on what changed.",example:"Five future participants help the repair café choose opening hours and which items to fix."},
   {label:"Feedback giver",text:"Answers a short ask. Needs consent and the results shared back.",example:"Parents answer a three-question survey about the tutoring service and then see the results."},
   {label:"Member",text:"Belongs to a cooperative. Has rights set by the rules, not a volunteer role.",example:"A baker who joins the bakery cooperative votes at the general meeting."}]},
  why:{title:"Why it matters",points:["Many new initiatives start with volunteers, so their experience shapes yours.","Clear roles and support keep volunteers safe and keep them coming back.","Repaid expenses mean volunteering is not only for those who can afford it."]},
  use:{title:"What it guides",points:["Your workforce plan: which work volunteers do, and which must be paid.","Your records and data protection: roles, checks and training logged.","Your recognition: thanks in ways volunteers actually value."]},
  mistakes:{title:"What to avoid",points:["Inviting people before the role and support are designed.","Volunteers quietly filling roles that should be paid as you grow.","Checks that do not match the risk of the role."]}
 });
 add("104.volunteers","es",{
  what:"El voluntariado da su tiempo, habilidades y conocimiento local sin pago. Funciona mejor como relación mutua: deja claro lo que ofreces, además de lo que pides.",
  parts:{title:"Quién aporta, y cómo",items:[
   {label:"Voluntariado",text:"Asume un rol definido. Necesita verificación, inducción, supervisión y gastos cubiertos.",example:"Un voluntario arma las mesas y recibe a las familias en la jornada abierta del club juvenil."},
   {label:"Asesoría comunitaria",text:"Da forma al diseño. Necesita voz real y saber qué cambió.",example:"Cinco futuros participantes ayudan al café de reparaciones a elegir horarios y qué objetos reparar."},
   {label:"Quien da su opinión",text:"Responde a un pedido breve. Necesita consentimiento y conocer los resultados.",example:"Las familias responden una encuesta de tres preguntas sobre las tutorías y luego ven los resultados."},
   {label:"Socio o socia",text:"Pertenece a una cooperativa. Tiene derechos fijados por las reglas, no un rol voluntario.",example:"Un panadero que se une a la cooperativa panadera vota en la asamblea general."}]},
  why:{title:"Por qué importa",points:["Muchas iniciativas empiezan con voluntariado: su experiencia moldea la tuya.","Roles claros y apoyo cuidan al voluntariado y hacen que vuelva.","Cubrir gastos evita que solo pueda ser voluntario quien puede pagarlo."]},
  use:{title:"Qué guía",points:["Tu plan de personal: qué hace el voluntariado y qué debe pagarse.","Tus registros y protección de datos: roles, verificaciones y formación anotados.","Tu reconocimiento: agradecer de formas que el voluntariado valore."]},
  mistakes:{title:"Qué evitar",points:["Invitar a gente antes de diseñar el rol y su apoyo.","Voluntariado que ocupa en silencio roles que deberían pagarse al crecer.","Verificaciones que no corresponden al riesgo del rol."]}
 });

 add("104.offboarding","en",{
  what:"Offboarding is how someone leaves well: handing over work and knowledge, returning equipment, losing access and a final conversation. Continuity means the work carries on when anyone, including a founder, is away or gone.",
  parts:{title:"Three tools for continuity",items:[
   {label:"Exit checklist",text:"Handover, equipment back, system and bank access removed, final pay or expenses, exit conversation.",example:"When a tutor leaves, the coordinator removes her from the booking system that same day."},
   {label:"Handover note",text:"Priorities, key contacts, where documents are, recurring deadlines and how passwords are held.",example:"The bakery founder's note lists suppliers, delivery days and when the licence renews."},
   {label:"Succession plan",text:"Who could step in for a critical role, for a while or for good, and what they need.",example:"If the repair café founder falls ill, the volunteer lead runs sessions using her note."}]},
  why:{title:"Why plan it early",points:["In a new initiative, most knowledge sits in the founders' heads.","A planned exit protects both the organisation and the person leaving.","Funders, partners and board members look for succession planning."]},
  use:{title:"How you will use it",points:["Holidays and sickness: the same handover note keeps work moving.","Your digital tools: a password manager, not a shared list.","Your learning: patterns from exit conversations improve how you work."]},
  mistakes:{title:"What to avoid",points:["Leaving system and bank access open after someone goes.","No handover note for your own role as founder.","Seeing succession planning as mistrust rather than maturity."]}
 });
 add("104.offboarding","es",{
  what:"La salida es cómo alguien se va bien: traspasa trabajo y conocimiento, devuelve equipos, pierde accesos y tiene una última conversación. La continuidad hace que el trabajo siga cuando alguien, incluso quien funda, no está.",
  parts:{title:"Tres herramientas de continuidad",items:[
   {label:"Lista de salida",text:"Traspaso, devolución de equipos, retiro de accesos a sistemas y banco, pago final y conversación de salida.",example:"Cuando una tutora se va, el coordinador la quita del sistema de reservas ese mismo día."},
   {label:"Nota de traspaso",text:"Prioridades, contactos clave, dónde están los documentos, plazos recurrentes y cómo se guardan las contraseñas.",example:"La nota de la fundadora de la panadería lista proveedores, días de entrega y cuándo vence la licencia."},
   {label:"Plan de sucesión",text:"Quién podría asumir un rol crítico, un tiempo o para siempre, y qué necesitaría.",example:"Si la fundadora del café de reparaciones enferma, el responsable de voluntariado dirige las sesiones con su nota."}]},
  why:{title:"Por qué planificarla temprano",points:["En una iniciativa nueva, casi todo el saber está en la cabeza de quienes fundan.","Una salida planificada protege a la organización y a quien se va.","Financiadores, aliados y consejeros buscan un plan de sucesión."]},
  use:{title:"Cómo lo usarás",points:["Vacaciones y enfermedad: la misma nota mantiene el trabajo en marcha.","Tus herramientas digitales: un gestor de contraseñas, no una lista compartida.","Tu aprendizaje: los patrones de las salidas mejoran tu forma de trabajar."]},
  mistakes:{title:"Qué evitar",points:["Dejar abiertos los accesos a sistemas y banco tras una salida.","No tener nota de traspaso para tu propio rol de fundador.","Ver la sucesión como desconfianza y no como madurez."]}
 });

 // ===== Module 105: Internal Systems & Operations =====

 add("105.systems","en",{
  what:"An internal system is a repeatable way of doing necessary work. It brings together people, steps, information, decisions and sometimes software. Your operating map shows your main systems, their owners and how information moves between them.",
  parts:{title:"How your systems connect",items:[
   {label:"Strategy and planning",text:"Objectives set the direction; a plan turns them into work and dates.",example:"The youth club's plan lists the term's sessions and who runs each one."},
   {label:"People and money",text:"People deliver the work; money pays for it and must be tracked.",example:"The bakery records every flour order and the hours each founder bakes."},
   {label:"Controls and data",text:"Policies and controls keep the work safe; data shows what happened.",example:"The repair café logs each repair and checks electrical safety before any lamp goes home."},
   {label:"Learning",text:"What you learn shapes the next plan, closing the loop.",example:"Tutoring attendance drops in exam weeks, so next term's plan pauses sessions then."}]},
  why:{title:"Why map it",points:["A weakness in one system shows up in another.","It shows where hand-offs are likely to fail, before they do.","It stops you buying apps before you know the process."]},
  use:{title:"What it guides",points:["This module: each system in turn, starting with what to set up first.","Your process owners, calendar and tools in the lessons ahead.","Later modules, such as your budget and policies, which go deeper."]},
  mistakes:{title:"What to avoid",points:["Choosing apps first, before the process and its owner are clear.","Making the map look good instead of making it useful.","Systems with no owner, so nobody notices when they fail."]}
 });
 add("105.systems","es",{
  what:"Un sistema interno es una forma repetible de hacer trabajo necesario. Reúne personas, pasos, información, decisiones y, a veces, software. Tu mapa operativo muestra tus sistemas principales, sus responsables y cómo circula la información.",
  parts:{title:"Cómo se conectan tus sistemas",items:[
   {label:"Estrategia y plan",text:"Los objetivos marcan el rumbo; el plan los convierte en trabajo y fechas.",example:"El plan del club juvenil lista las sesiones del trimestre y quién dirige cada una."},
   {label:"Personas y dinero",text:"Las personas hacen el trabajo; el dinero lo paga y hay que registrarlo.",example:"La panadería registra cada pedido de harina y las horas que hornea cada fundador."},
   {label:"Controles y datos",text:"Políticas y controles cuidan el trabajo; los datos muestran qué pasó.",example:"El café de reparaciones registra cada arreglo y revisa la seguridad eléctrica antes de devolver una lámpara."},
   {label:"Aprendizaje",text:"Lo que aprendes da forma al siguiente plan y cierra el ciclo.",example:"La asistencia a tutorías baja en semanas de exámenes, así que el próximo plan las pausa."}]},
  why:{title:"Por qué mapearlos",points:["Una debilidad en un sistema aparece en otro.","Muestra dónde es probable que fallen los traspasos, antes de que fallen.","Evita comprar apps antes de conocer el proceso."]},
  use:{title:"Qué guía",points:["Este módulo: cada sistema por turno, empezando por lo primero.","Tus responsables de procesos, calendario y herramientas en las próximas lecciones.","Módulos posteriores, como tu presupuesto y tus políticas, que profundizan."]},
  mistakes:{title:"Qué evitar",points:["Elegir apps primero, antes de aclarar el proceso y su responsable.","Dedicar tiempo a que el mapa se vea bonito en vez de útil.","Sistemas sin responsable, que fallan sin que nadie lo note."]}
 });

 add("105.minimum","en",{
  what:"Minimum viable systems are the fewest systems that keep your work safe and organised at your current stage. Each stage keeps what came before and adds only what its new risks require.",
  parts:{title:"What each stage adds",items:[
   {label:"Idea stage",text:"Group chat, shared folder, cash book with receipts, a decisions note and consent forms.",example:"Two founders testing a repair café keep receipts in one envelope and decisions in one note."},
   {label:"Early delivery",text:"Bank account in the organisation's name, two signatories, simple bookkeeping, agreements and a leave record.",example:"The tutoring service opens its own account once the first school pays an invoice."},
   {label:"Growing team",text:"Accounting software, approval limits, process owners, a planning calendar and restricted personnel files.",example:"With eight staff, the bakery adds approval limits and an owner for every process."}]},
  why:{title:"Why proportionate matters",points:["Too few systems put people and money at risk.","Too many waste scarce time on tools nobody maintains.","Written triggers turn each next step into a decision, not a crisis."]},
  use:{title:"How you will use it",points:["Your launch list: the minimum you need before or soon after launch.","Your triggers: registering, a bank account, the first employee or restricted funding.","Your budget and policies in later modules, added as triggers appear."]},
  mistakes:{title:"What to avoid",points:["Wanting everything perfect before you start.","Procedures nobody reads and records kept in two places.","Ignoring a trigger, such as first work with children, until something goes wrong."]}
 });
 add("105.minimum","es",{
  what:"Los sistemas mínimos viables son los menos posibles que mantienen tu trabajo seguro y ordenado en tu etapa actual. Cada etapa conserva lo anterior y suma solo lo que piden sus nuevos riesgos.",
  parts:{title:"Qué suma cada etapa",items:[
   {label:"Etapa de idea",text:"Chat de grupo, carpeta compartida, libro de caja con recibos, nota de decisiones y formularios de consentimiento.",example:"Dos fundadores que prueban un café de reparaciones guardan recibos en un sobre y decisiones en una nota."},
   {label:"Primeras actividades",text:"Cuenta a nombre de la organización, dos firmas, contabilidad simple, acuerdos y registro de permisos.",example:"Las tutorías abren su propia cuenta cuando la primera escuela paga una factura."},
   {label:"Equipo en crecimiento",text:"Software contable, límites de aprobación, responsables de procesos, calendario y archivos de personal restringidos.",example:"Con ocho personas, la panadería suma límites de aprobación y un responsable por proceso."}]},
  why:{title:"Por qué ser proporcional",points:["Muy pocos sistemas ponen en riesgo a personas y dinero.","Demasiados malgastan tiempo en herramientas que nadie mantiene.","Los detonantes escritos convierten cada paso en decisión, no en crisis."]},
  use:{title:"Cómo lo usarás",points:["Tu lista de lanzamiento: lo mínimo antes o poco después de lanzar.","Tus detonantes: registro, cuenta bancaria, primer empleado o fondos restringidos.","Tu presupuesto y tus políticas en módulos posteriores, según aparezcan detonantes."]},
  mistakes:{title:"Qué evitar",points:["Querer todo perfecto antes de empezar.","Procedimientos que nadie lee y registros duplicados.","Ignorar un detonante, como trabajar con menores, hasta que algo sale mal."]}
 });

 add("105.processes","en",{
  what:"A process is a sequence of steps that produces a result, such as registering a participant or paying a supplier. A standard operating procedure (SOP) writes it down so more than one person can do it well.",
  parts:{title:"The parts of a process map",items:[
   {label:"Trigger",text:"What starts the process, such as a request, a date or an order.",example:"A parent messages the tutoring service asking for a place for their son."},
   {label:"Steps and roles",text:"What happens, in order, and who does each step.",example:"One founder checks the age, explains sessions, collects consent and confirms the date."},
   {label:"Records",text:"What is written down, and where it is kept.",example:"A line in the participant list and a signed consent form in the folder."},
   {label:"Exceptions",text:"What happens when something goes wrong or does not fit.",example:"No consent yet: the child waits. Group full: offered next month's start."}]},
  why:{title:"Why write it down",points:["Work gets done the same way, safely, whoever does it.","Knowledge stops living in one founder's head.","You cut steps that add nothing and add checks where mistakes cost."]},
  use:{title:"What it guides",points:["Your process register: each process, its owner and review date.","Your RACI from Module 3: one owner per process.","Your onboarding: newcomers learn from SOPs, not guesswork."]},
  mistakes:{title:"What to avoid",points:["An SOP for everything, instead of what is frequent or risky.","Describing the ideal process rather than what really happens.","No owner, so the SOP quietly goes out of date."]}
 });
 add("105.processes","es",{
  what:"Un proceso es una serie de pasos que produce un resultado, como inscribir a un participante o pagar a un proveedor. Un procedimiento operativo estándar (POE) lo escribe para que más de una persona pueda hacerlo bien.",
  parts:{title:"Partes de un mapa de proceso",items:[
   {label:"Detonante",text:"Qué inicia el proceso, como una solicitud, una fecha o un pedido.",example:"Una madre escribe a las tutorías pidiendo un lugar para su hijo."},
   {label:"Pasos y roles",text:"Qué pasa, en orden, y quién hace cada paso.",example:"Una fundadora revisa la edad, explica las sesiones, recoge el consentimiento y confirma la fecha."},
   {label:"Registros",text:"Qué se anota y dónde se guarda.",example:"Una línea en la lista de participantes y un consentimiento firmado en la carpeta."},
   {label:"Excepciones",text:"Qué pasa cuando algo falla o no encaja.",example:"Sin consentimiento, el niño espera. Grupo lleno: se le ofrece el inicio del mes siguiente."}]},
  why:{title:"Por qué escribirlo",points:["El trabajo se hace igual y con seguridad, lo haga quien lo haga.","El conocimiento deja de vivir en la cabeza de un fundador.","Quitas pasos inútiles y sumas controles donde los errores cuestan."]},
  use:{title:"Qué guía",points:["Tu registro de procesos: cada proceso, su responsable y fecha de revisión.","Tu RACI del Módulo 3: un responsable por proceso.","Tu incorporación: quien llega aprende con los POE, no adivinando."]},
  mistakes:{title:"Qué evitar",points:["Un POE para todo, en vez de para lo frecuente o riesgoso.","Describir el proceso ideal y no lo que de verdad pasa.","Sin responsable, el POE queda desactualizado en silencio."]}
 });

 add("105.cycle","en",{
  what:"A planning and reporting calendar puts all your yearly cycles in one place: strategy review, annual plan and budget, quarterly reviews, monthly finance, meetings, reports, legal filings and policy reviews.",
  parts:{title:"Three layers on one calendar",items:[
   {label:"Fixed dates",text:"Financial year end, legal deadlines, founders' or board meetings and reports you already owe.",example:"The cooperative's annual general meeting in June and its deadline for filing accounts."},
   {label:"Internal reviews",text:"Plan, budget and reviews placed early enough to inform the fixed dates.",example:"The youth club drafts its plan in September, so the budget is ready for November."},
   {label:"Your own seasons",text:"School terms, harvests, festivals, rainy seasons, busy months and months when cash is tight.",example:"The bakery marks December as its busiest month and February as its tightest for cash."}]},
  why:{title:"Why one calendar",points:["It prevents clashes and last-minute rushes.","The budget follows the plan and arrives before the meeting that approves it.","You see tight months coming and prepare for them."]},
  use:{title:"What it connects",points:["Your strategy from Module 1 gives the calendar its objectives.","Your governance calendar and reporting rhythm from Module 3.","Your weekly and quarterly routines, which bring it to life."]},
  mistakes:{title:"What to avoid",points:["Planning forwards and missing fixed deadlines.","Leaving out your own seasons and cash-tight months.","Dropping unknown dates instead of marking them “to confirm when registered”."]}
 });
 add("105.cycle","es",{
  what:"Un calendario de planificación e informes reúne todos tus ciclos anuales: revisión de estrategia, plan y presupuesto anual, revisiones trimestrales, finanzas mensuales, reuniones, informes, trámites legales y revisión de políticas.",
  parts:{title:"Tres capas en un calendario",items:[
   {label:"Fechas fijas",text:"Cierre del año fiscal, plazos legales, reuniones de fundadores o del consejo e informes que ya debes.",example:"La asamblea anual de la cooperativa en junio y su plazo para presentar cuentas."},
   {label:"Revisiones internas",text:"Plan, presupuesto y revisiones con tiempo suficiente para preparar las fechas fijas.",example:"El club juvenil redacta su plan en septiembre para tener el presupuesto en noviembre."},
   {label:"Tus temporadas",text:"Periodos escolares, cosechas, fiestas, lluvias, meses de mucha venta y meses de poca liquidez.",example:"La panadería marca diciembre como su mes de más trabajo y febrero como el de menos liquidez."}]},
  why:{title:"Por qué un solo calendario",points:["Evita choques y prisas de último momento.","El presupuesto sigue al plan y llega antes de la reunión que lo aprueba.","Ves venir los meses difíciles y te preparas."]},
  use:{title:"Qué conecta",points:["Tu estrategia del Módulo 1 da al calendario sus objetivos.","Tu calendario de gobernanza y ritmo de informes del Módulo 3.","Tus rutinas semanales y trimestrales, que lo ponen en marcha."]},
  mistakes:{title:"Qué evitar",points:["Planificar hacia adelante y perder plazos fijos.","Olvidar tus temporadas y los meses de poca liquidez.","Omitir fechas inciertas en vez de marcarlas «por confirmar al registrarte»."]}
 });

 add("105.hr-overview","en",{
  what:"People systems cover the whole journey of everyone who works with you, paid or unpaid, from planning the team to leaving. Even with only founders, your founders' agreement is the first piece.",
  parts:{title:"What to decide now",items:[
   {label:"People records",text:"Where records are kept and who can see them, with tighter access than working files.",example:"The youth club keeps each volunteer's checks in a folder only two founders can open."},
   {label:"Leave and absence",text:"How holidays, sickness and other absence are recorded and covered.",example:"The bakery founders log holidays in one shared calendar, so someone always covers the ovens."},
   {label:"Pay and documents",text:"How pay will run once you have paid people, and what each person must read and sign.",example:"The tutoring service plans an external payroll service for when it hires its first coordinator."}]},
  why:{title:"Why set it up now",points:["Personal records need protecting from the very first volunteer.","Contracts and payroll are required with your first employee.","A simple version now is easier than fixing gaps later."]},
  use:{title:"What it connects to",points:["Module 4: how to design each part of the people journey.","Your information system: access levels for personal records.","Your joining and leaving checklists."]},
  mistakes:{title:"What to avoid",points:["Keeping personal records in ordinary shared folders or group chats.","Waiting for the first employee to think about payroll.","Not checking the rules where you are."]}
 });
 add("105.hr-overview","es",{
  what:"Los sistemas de personas cubren todo el recorrido de quienes trabajan contigo, con o sin pago, desde planificar el equipo hasta su salida. Aunque solo haya fundadores, tu acuerdo de fundadores es la primera pieza.",
  parts:{title:"Qué decidir ahora",items:[
   {label:"Registros de personas",text:"Dónde se guardan y quién los ve, con acceso más restringido que los archivos de trabajo.",example:"El club juvenil guarda las verificaciones de cada voluntario en una carpeta que solo abren dos fundadores."},
   {label:"Permisos y ausencias",text:"Cómo se registran y cubren vacaciones, enfermedad y otras ausencias.",example:"Los fundadores de la panadería anotan sus vacaciones en un calendario compartido para cubrir siempre los hornos."},
   {label:"Pago y documentos",text:"Cómo funcionará la nómina cuando haya personas pagadas, y qué debe leer y firmar cada una.",example:"Las tutorías planean un servicio externo de nómina para cuando contraten a su primer coordinador."}]},
  why:{title:"Por qué crearlos ya",points:["Los registros personales se protegen desde el primer voluntario.","Contratos y nómina son obligatorios con tu primer empleado.","Una versión simple ahora es más fácil que corregir vacíos después."]},
  use:{title:"Con qué se conectan",points:["El Módulo 4: cómo diseñar cada parte del recorrido de las personas.","Tu sistema de información: niveles de acceso a registros personales.","Tus listas de incorporación y de salida."]},
  mistakes:{title:"Qué evitar",points:["Guardar registros personales en carpetas comunes o chats de grupo.","Esperar al primer empleado para pensar en la nómina.","No revisar las normas de tu país."]}
 });

 add("105.finance-overview","en",{
  what:"Finance systems record and control money: budgeting, bookkeeping, banking, payments, purchasing, income and reporting. Internal controls are the checks that prevent mistakes, fraud and misuse.",
  parts:{title:"Basic controls from day one",items:[
   {label:"Separate money",text:"An account or cash box used only for the initiative, never for personal spending.",example:"The repair café's donations go in a locked box, counted by two people after each session."},
   {label:"Two people approve",text:"Two approvals above an agreed amount; a solo founder asks an adviser to check.",example:"The two bakery founders both sign any payment larger than the monthly flour bill."},
   {label:"Receipts and reconciliation",text:"A receipt for every transaction, and records matched to the bank each month.",example:"The tutoring founder photographs every receipt and matches them to the bank statement monthly."},
   {label:"Quotes for big purchases",text:"Two or three quotes above a set amount, noted on file.",example:"The youth club gets three quotes for minibus hire and files them with the decision."}]},
  why:{title:"Why controls matter",points:["Mixing personal and initiative money damages trust fast.","Errors found monthly are small; found yearly, they are big.","Funders and large customers expect controls and set stricter rules."]},
  use:{title:"What they connect to",points:["Your delegation of authority from Module 3: the same approval limits.","Module 9: budgeting, bookkeeping and finance procedures in depth.","Procurement: fair choice of suppliers and managed conflicts of interest."]},
  mistakes:{title:"What to avoid",points:["Paying initiative costs from a personal account.","One person approving and making payments alone.","Holding money before you register without checking the local rules."]}
 });
 add("105.finance-overview","es",{
  what:"Los sistemas financieros registran y controlan el dinero: presupuesto, contabilidad, banco, pagos, compras, ingresos e informes. Los controles internos son las revisiones que evitan errores, fraudes y malos usos.",
  parts:{title:"Controles básicos desde el primer día",items:[
   {label:"Dinero separado",text:"Una cuenta o caja usada solo para la iniciativa, nunca para gastos personales.",example:"Las donaciones del café de reparaciones van a una caja cerrada que dos personas cuentan tras cada sesión."},
   {label:"Dos personas aprueban",text:"Dos aprobaciones sobre un monto acordado; quien funda en solitario pide a un asesor que revise.",example:"Los dos fundadores de la panadería firman todo pago mayor que la factura mensual de harina."},
   {label:"Recibos y conciliación",text:"Un recibo por cada movimiento y registros cotejados con el banco cada mes.",example:"La fundadora de las tutorías fotografía cada recibo y lo coteja cada mes con el extracto bancario."},
   {label:"Cotizaciones",text:"Dos o tres cotizaciones por encima de un monto fijado, guardadas en el archivo.",example:"El club juvenil pide tres cotizaciones para alquilar un minibús y las archiva con la decisión."}]},
  why:{title:"Por qué importan los controles",points:["Mezclar dinero personal y de la iniciativa daña la confianza rápido.","Los errores hallados cada mes son pequeños; cada año, grandes.","Financiadores y grandes clientes esperan controles y ponen reglas más estrictas."]},
  use:{title:"Con qué se conectan",points:["Tu matriz de delegación del Módulo 3: los mismos límites de aprobación.","El Módulo 9: presupuesto, contabilidad y procedimientos financieros a fondo.","Compras: elección justa de proveedores y conflictos de interés gestionados."]},
  mistakes:{title:"Qué evitar",points:["Pagar gastos de la iniciativa desde una cuenta personal.","Que una sola persona apruebe y haga los pagos.","Manejar dinero antes de registrarte sin revisar las normas locales."]}
 });

 add("105.compliance-essentials","en",{
  what:"Compliance essentials are the few protections you need before your first activity, even before you register, if you will work with people, collect personal information, tell stories or handle money.",
  parts:{title:"The essentials to have ready",items:[
   {label:"Code of conduct",text:"Expected behaviour for founders, volunteers and anyone who joins.",example:"Repair café volunteers agree to treat visitors with respect and never pressure them to buy."},
   {label:"Safeguarding",text:"A focal person, a reporting route and basic rules when you work with children or adults at risk.",example:"The youth club names one founder as focal person and never leaves a child alone with one adult."},
   {label:"Data and consent",text:"What personal data you collect, why and where it is kept, and consent for photos and stories.",example:"The tutoring service asks parents before posting any photo of a session online."},
   {label:"Conflicts and safety",text:"Conflict of interest declarations, plus any safety rules or licences your activities need.",example:"The bakery registers for food hygiene, and founders declare any supplier who is family."}]},
  why:{title:"Why before day one",points:["Harm can happen at your very first activity.","People trust you with their children, their data and their stories.","A missing licence or permission can stop you trading."]},
  use:{title:"What they connect to",points:["Your onboarding: every newcomer learns these essentials.","Your information system: data kept and accessed safely.","Module 10: turning them into full policies where you need them."]},
  mistakes:{title:"What to avoid",points:["Waiting until you are registered to think about safeguarding.","Long documents nobody reads instead of short, practical essentials.","Assuming rules are the same everywhere: ask someone with a legal background."]}
 });
 add("105.compliance-essentials","es",{
  what:"El cumplimiento esencial son las pocas protecciones que necesitas antes de tu primera actividad, incluso antes de registrarte, si trabajarás con personas, recogerás datos personales, contarás historias o manejarás dinero.",
  parts:{title:"Lo esencial, listo antes",items:[
   {label:"Código de conducta",text:"La conducta esperada de fundadores, voluntariado y cualquiera que se una.",example:"El voluntariado del café de reparaciones se compromete a tratar con respeto y nunca presionar para comprar."},
   {label:"Protección",text:"Un punto focal, una vía de aviso y reglas básicas si trabajas con menores o adultos en riesgo.",example:"El club juvenil nombra a una fundadora como punto focal y nunca deja a un menor solo con un adulto."},
   {label:"Datos y consentimiento",text:"Qué datos recoges, por qué, dónde se guardan, y consentimiento para fotos e historias.",example:"Las tutorías piden permiso a las familias antes de publicar cualquier foto de una sesión."},
   {label:"Conflictos y seguridad",text:"Declaración de conflictos de interés y las normas de seguridad o licencias que pidan tus actividades.",example:"La panadería obtiene su registro sanitario y los fundadores declaran a cualquier proveedor que sea familiar."}]},
  why:{title:"Por qué antes del primer día",points:["El daño puede ocurrir en tu primera actividad.","Te confían a sus hijos, sus datos y sus historias.","Sin una licencia o permiso, pueden impedirte operar."]},
  use:{title:"Con qué se conecta",points:["Tu incorporación: cada persona nueva aprende lo esencial.","Tu sistema de información: datos guardados y consultados con seguridad.","El Módulo 10: convertirlo en políticas completas donde haga falta."]},
  mistakes:{title:"Qué evitar",points:["Esperar a registrarte para pensar en la protección.","Documentos largos que nadie lee en vez de esenciales breves y prácticos.","Suponer que las normas son iguales en todas partes: consulta a alguien con formación jurídica."]}
 });

 add("105.information","en",{
  what:"Information management decides where documents and data live, how they are named, who can see them and how long they are kept. It is far easier to set up well at the start than to tidy later.",
  parts:{title:"Four choices to make now",items:[
   {label:"Folder structure",text:"Stable categories that match how you think, such as one per objective, not one per person.",example:"The youth club has a folder for each objective, plus setting up and administration."},
   {label:"Naming rules",text:"Document type, topic, date or version, and one master copy of each important document.",example:"Bakery files are named like “Budget_2027_v2”, so everyone opens the latest version."},
   {label:"Access levels",text:"Open for working files, team only for budgets, restricted for personal data.",example:"Only the two tutoring founders can open the folder with children's contact details."},
   {label:"Retention and backup",text:"How long each record is kept, when it is deleted, and backups that can be restored.",example:"The repair café tests its backup every quarter by restoring one folder."}]},
  why:{title:"Why it matters",points:["Scattered files waste time and lose knowledge.","Poor access control creates data protection risks.","Knowledge outlives any one person, including the founders."]},
  use:{title:"What it guides",points:["Your people and finance systems: where restricted records live.","Your digital tools: where files are stored and who owns the account.","Your know-how: a “how we do things” page per area and a templates folder."]},
  mistakes:{title:"What to avoid",points:["One folder per person, which breaks when people leave.","Several “final” versions of the same document.","Backups never tested until the day you need them."]}
 });
 add("105.information","es",{
  what:"La gestión de la información decide dónde viven documentos y datos, cómo se nombran, quién los ve y cuánto tiempo se guardan. Es mucho más fácil hacerlo bien desde el inicio que ordenar después.",
  parts:{title:"Cuatro decisiones para hoy",items:[
   {label:"Estructura de carpetas",text:"Categorías estables que reflejen cómo piensas, como una por objetivo, no una por persona.",example:"El club juvenil tiene una carpeta por objetivo, más puesta en marcha y administración."},
   {label:"Reglas de nombres",text:"Tipo de documento, tema, fecha o versión, y una sola copia maestra de cada documento importante.",example:"Los archivos de la panadería se llaman «Presupuesto_2027_v2», así todos abren la última versión."},
   {label:"Niveles de acceso",text:"Abierto para archivos de trabajo, solo equipo para presupuestos, restringido para datos personales.",example:"Solo las dos fundadoras de las tutorías abren la carpeta con los contactos de los niños."},
   {label:"Conservación y copias",text:"Cuánto se guarda cada registro, cuándo se borra, y copias que se puedan restaurar.",example:"El café de reparaciones prueba su copia de seguridad cada trimestre restaurando una carpeta."}]},
  why:{title:"Por qué importa",points:["Los archivos dispersos hacen perder tiempo y conocimiento.","Un mal control de accesos crea riesgos de protección de datos.","El conocimiento sobrevive a cualquier persona, incluidas las fundadoras."]},
  use:{title:"Qué guía",points:["Tus sistemas de personas y finanzas: dónde viven los registros restringidos.","Tus herramientas digitales: dónde se guardan los archivos y de quién es la cuenta.","Tu saber hacer: una página «cómo trabajamos» por área y una carpeta de plantillas."]},
  mistakes:{title:"Qué evitar",points:["Una carpeta por persona, que se rompe cuando alguien se va.","Varias versiones «finales» del mismo documento.","Copias de seguridad que nadie prueba hasta el día que se necesitan."]}
 });

 add("105.stack","en",{
  what:"Your tech stack is the set of digital tools you use: email, files, messaging, accounting, contacts, planning, website and forms. For many new initiatives, a phone, a messaging app and a shared drive are enough.",
  parts:{title:"Four checks for every tool",items:[
   {label:"Process first",text:"Choose the tool after you know the process it will support.",example:"The tutoring service maps its booking steps before choosing a simple online form."},
   {label:"Fewer, connected",text:"Prefer a few tools that connect over many that do not.",example:"The bakery uses one shared calendar for orders instead of three separate apps."},
   {label:"Owner and account",text:"One named owner per tool, accounts in the initiative's name, and data you can export.",example:"The repair café's email uses a shared address, not one founder's personal account."},
   {label:"Security and privacy",text:"Two-step login, a password manager, and personal data kept only in suitable tools.",example:"The youth club keeps children's details in a secure form, never in the group chat."}]},
  why:{title:"Why fewer is better",points:["Each extra tool adds cost, training, logins and outdated information.","Accounts in one founder's name are lost if that founder leaves.","Data protection duties apply to every tool you choose."]},
  use:{title:"What it connects to",points:["Your operating map: the tool behind each system.","Your information system: where files and access levels live.","Your offboarding: removing access when someone leaves."]},
  mistakes:{title:"What to avoid",points:["Buying apps before you know the process.","Sharing passwords on a list instead of a password manager.","Ignoring the cost of switching later when choosing free tiers."]}
 });
 add("105.stack","es",{
  what:"Tus herramientas digitales son el conjunto que usas: correo, archivos, mensajería, contabilidad, contactos, planificación, sitio web y formularios. A muchas iniciativas nuevas les basta un teléfono, una app de mensajería y una carpeta compartida.",
  parts:{title:"Cuatro revisiones por herramienta",items:[
   {label:"Primero el proceso",text:"Elige la herramienta cuando ya conoces el proceso que apoyará.",example:"Las tutorías mapean sus pasos de reserva antes de elegir un formulario en línea sencillo."},
   {label:"Pocas y conectadas",text:"Prefiere pocas herramientas que se conecten a muchas que no.",example:"La panadería usa un solo calendario compartido para pedidos en vez de tres apps."},
   {label:"Responsable y cuenta",text:"Un responsable por herramienta, cuentas a nombre de la iniciativa y datos exportables.",example:"El correo del café de reparaciones usa una dirección compartida, no la cuenta personal de un fundador."},
   {label:"Seguridad y privacidad",text:"Verificación en dos pasos, gestor de contraseñas y datos personales solo en herramientas adecuadas.",example:"El club juvenil guarda los datos de los niños en un formulario seguro, nunca en el chat."}]},
  why:{title:"Por qué menos es mejor",points:["Cada herramienta extra suma costo, formación, contraseñas e información desactualizada.","Las cuentas a nombre de un fundador se pierden si se va.","La protección de datos aplica a cada herramienta que eliges."]},
  use:{title:"Con qué se conecta",points:["Tu mapa operativo: la herramienta detrás de cada sistema.","Tu sistema de información: dónde viven archivos y niveles de acceso.","Tus salidas: retirar accesos cuando alguien se va."]},
  mistakes:{title:"Qué evitar",points:["Comprar apps antes de conocer el proceso.","Compartir contraseñas en una lista en vez de un gestor.","Ignorar el costo de cambiar más tarde al elegir versiones gratuitas."]}
 });

 add("105.issues","en",{
  what:"An issue is something that has already happened and needs a response: a complaint, a missed deadline, a broken tool. A risk is something that might happen. Tracking issues, actions and decisions in one place makes patterns visible.",
  parts:{title:"Three things to track",items:[
   {label:"Issues",text:"What happened, who is affected, how serious it is, who owns the response, when resolved.",example:"The bakery's oven breaks before a big order; the log names who calls the repairer."},
   {label:"Actions",text:"Every action from a meeting has one owner and a due date.",example:"Repair café meeting: “Ask the library about Saturday space”, owner volunteer lead, due Friday."},
   {label:"Decisions",text:"Each decision recorded with its reason, so people who join later understand it.",example:"The youth club logs why it chose Tuesday evenings: the hall is free and buses run."}]},
  why:{title:"Why track them",points:["Patterns appear: the same problem three times is a system problem.","Nothing fades away without being closed on purpose.","An honest record helps you learn as you grow."]},
  use:{title:"What it connects to",points:["Your risk list in Module 10: note when a risk has happened.","Your weekly or monthly routine: review and close open items.","Your decision log from Module 3, kept in the same place."]},
  mistakes:{title:"What to avoid",points:["Keeping issues in people's heads or scattered chats.","Actions with no owner or no date.","Putting safeguarding details in the shared log instead of their confidential route."]}
 });
 add("105.issues","es",{
  what:"Un problema es algo que ya pasó y necesita respuesta: una queja, un plazo incumplido, una herramienta rota. Un riesgo es algo que podría pasar. Registrar problemas, acciones y decisiones en un solo lugar muestra los patrones.",
  parts:{title:"Tres cosas que registrar",items:[
   {label:"Problemas",text:"Qué pasó, a quién afecta, su gravedad, quién responde y cuándo se resolvió.",example:"El horno de la panadería se avería antes de un gran pedido; el registro indica quién llama al técnico."},
   {label:"Acciones",text:"Cada acción de una reunión tiene un responsable y una fecha límite.",example:"Reunión del café de reparaciones: «Pedir espacio a la biblioteca los sábados», responsable de voluntariado, viernes."},
   {label:"Decisiones",text:"Cada decisión anotada con su motivo, para que quien llegue después la entienda.",example:"El club juvenil anota por qué eligió los martes: el salón está libre y hay autobuses."}]},
  why:{title:"Por qué registrarlos",points:["Aparecen patrones: el mismo problema tres veces es un fallo del sistema.","Nada se desvanece sin cerrarse a propósito.","Un registro honesto te ayuda a aprender al crecer."]},
  use:{title:"Con qué se conecta",points:["Tu lista de riesgos del Módulo 10: anota cuándo un riesgo ocurrió.","Tu rutina semanal o mensual: revisar y cerrar pendientes.","Tu registro de decisiones del Módulo 3, en el mismo lugar."]},
  mistakes:{title:"Qué evitar",points:["Guardar los problemas en la cabeza o en chats dispersos.","Acciones sin responsable o sin fecha.","Poner detalles de protección en el registro común en vez de su vía confidencial."]}
 });
})();
