// Longer lesson videos (entrepreneurs), Protect (modules 109–110): the `long` block adds scenes for what it is,
// its parts with examples, why it matters, how you will use it and what to avoid.
(function(){
 const add=(key,lang,long)=>{(window.LESSON_VIDEOS[key]||={})[lang]={...(window.LESSON_VIDEOS[key]?.[lang]||{}),long};};

 // 9.1 Finance roles and the finance cycle
 add('109.roles','en',{
  what:'Financial management is how you plan, record, check and report your money. It has three layers, and it works best when you decide who does each part before money starts to move.',
  parts:{title:'Three layers of finance',items:[
   {label:'Bookkeeping',text:'Recording every transaction accurately, from the very first payment you make.',example:'Our bakery logs each flour order and each day’s stall takings, with a receipt.'},
   {label:'Accounting',text:'Turning those records into reports that follow rules, such as annual accounts and tax returns.',example:'Once registered, an accountant prepares the bakery’s annual accounts from its records.'},
   {label:'Management finance',text:'Using the numbers to plan and decide: budgets, forecasts, pricing and cost control.',example:'The founders check what each loaf costs before setting the stall’s prices.'}]},
  why:{title:'Why roles come first',points:['Separating doing, recording and overseeing is a control, even for two people.','Habits set before the first payment are far easier than fixing them later.','An accountant early shows how your legal form affects tax and accounts.']},
  use:{title:'What it shapes',points:['Your finance cycle: plan, record, control, report and review.','Your calendar from Module 5: year end, accounts and tax dates.','Every lesson in this module: budgets, cash, controls and reports.']},
  mistakes:{title:'What to avoid',points:['One person doing, recording and checking everything, with nobody else looking.','Waiting until after registration to talk to an accountant.','Assuming rules from another country apply to you.']}
 });
 add('109.roles','es',{
  what:'La gestión financiera es cómo planificas, registras, controlas e informas sobre tu dinero. Tiene tres niveles y funciona mejor si decides quién hace cada parte antes de que el dinero empiece a moverse.',
  parts:{title:'Tres niveles de las finanzas',items:[
   {label:'Teneduría de libros',text:'Registrar cada transacción con precisión, desde el primer pago que haces.',example:'Nuestra panadería anota cada pedido de harina y lo vendido cada día en el puesto, con su recibo.'},
   {label:'Contabilidad',text:'Convertir esos registros en informes que siguen normas, como las cuentas anuales y las declaraciones de impuestos.',example:'Una vez registrada, un contador prepara las cuentas anuales de la panadería con sus registros.'},
   {label:'Finanzas de gestión',text:'Usar las cifras para planificar y decidir: presupuestos, proyecciones, precios y control de costos.',example:'Los fundadores revisan cuánto cuesta cada pan antes de fijar los precios del puesto.'}]},
  why:{title:'Por qué los roles van primero',points:['Separar hacer, registrar y supervisar es un control, aunque sean solo dos.','Los hábitos creados antes del primer pago cuestan mucho menos que corregirlos.','Un contador desde temprano muestra cómo tu forma legal afecta impuestos y cuentas.']},
  use:{title:'Qué define',points:['Tu ciclo financiero: planificar, registrar, controlar, informar y revisar.','Tu calendario del Módulo 5: cierre del año, cuentas e impuestos.','Cada lección de este módulo: presupuestos, caja, controles e informes.']},
  mistakes:{title:'Qué evitar',points:['Que una sola persona haga, registre y revise todo sin que nadie más mire.','Esperar a después del registro para hablar con un contador.','Suponer que las normas de otro país se aplican a ti.']}
 });

 // 9.2 The organisational budget
 add('109.core-budget','en',{
  what:'An organisational budget estimates all your income and spending for the year ahead. It is a plan for the whole initiative, not just the part a funder or first customer will pay for.',
  parts:{title:'Three parts of the budget',items:[
   {label:'Expenditure',text:'Every cost: services, people, premises, equipment, insurance, fees and a contribution to reserves.',example:'Our bakery lists kitchen rent, ingredients, trainee pay, the stall and equipment: about US$48,000.'},
   {label:'Income, by certainty',text:'Each source marked confirmed, likely or possible, so you see how solid your plan is.',example:'Own savings of US$4,000 confirmed, about US$38,000 of sales likely, the US$6,000 youth fund pending.'},
   {label:'Contingency and cuts',text:'A buffer for higher costs, and a plan for what you cut if income does not arrive.',example:'If the youth fund says no, the bakery takes two trainees, not four, and keeps the stall.'}]},
  why:{title:'Why it matters now',points:['You have no past spending, so written assumptions are your only guide.','It shows the full cost of your plan, not just one funded part.','It lets you compare your plan with reality every month.']},
  use:{title:'What it guides',points:['Your project budgets, which must add up to this one.','Your cash flow forecast and your monthly budget versus actual.','Your prices and funding asks, based on real costs.']},
  mistakes:{title:'What to avoid',points:['Guessing costs instead of getting quotes and real prices.','Planning spending against possible income with no plan to cut.','Leaving out founder pay, insurance, fees or a contingency line.']}
 });
 add('109.core-budget','es',{
  what:'El presupuesto de la organización estima todos tus ingresos y gastos del año que viene. Es un plan para toda la iniciativa, no solo para la parte que pagará un financiador o tu primer cliente.',
  parts:{title:'Tres partes del presupuesto',items:[
   {label:'Gastos',text:'Cada costo: servicios, personas, local, equipos, seguros, honorarios y un aporte a reservas.',example:'Nuestra panadería anota alquiler de cocina, ingredientes, pago a aprendices, puesto y equipos: unos US$48 000.'},
   {label:'Ingresos según certeza',text:'Cada fuente marcada como confirmada, probable o posible, para ver qué tan sólido es tu plan.',example:'Ahorros propios de US$4000 confirmados, unos US$38 000 de ventas probables y US$6000 del fondo juvenil pendientes.'},
   {label:'Imprevistos y recortes',text:'Un margen para costos más altos y un plan de qué recortar si no llega un ingreso.',example:'Si el fondo juvenil dice que no, la panadería toma dos aprendices, no cuatro, y mantiene el puesto.'}]},
  why:{title:'Por qué importa ahora',points:['No tienes gastos pasados: tus supuestos escritos son tu única guía.','Muestra el costo completo de tu plan, no solo de una parte financiada.','Te permite comparar el plan con la realidad cada mes.']},
  use:{title:'Qué guía',points:['Tus presupuestos de proyecto, que deben sumar este.','Tu flujo de caja y tu comparación mensual de presupuesto y real.','Tus precios y tus solicitudes de fondos, basados en costos reales.']},
  mistakes:{title:'Qué evitar',points:['Adivinar costos en vez de pedir cotizaciones y precios reales.','Planificar gastos con ingresos posibles sin un plan de recorte.','Olvidar el pago a fundadores, seguros, honorarios o los imprevistos.']}
 });

 // 9.3 Project budgets, cost allocation and full cost recovery
 add('109.programme-budget','en',{
  what:'A project budget shows the cost of one piece of work, such as a pilot or a first product line. It includes its direct costs and a fair share of the shared costs that make it possible.',
  parts:{title:'Two costs, one fair price',items:[
   {label:'Direct costs',text:'Costs that exist only because this project runs, itemised as quantity × unit cost.',example:'The traineeship pilot: trainee pay, mentor time, hygiene certificates and aprons for four trainees.'},
   {label:'Shared costs',text:'Costs that keep the whole initiative running, shared out on a written basis such as time.',example:'Kitchen rent, insurance and phone, shared by time: training uses 30% of kitchen hours.'},
   {label:'Full cost recovery',text:'Each paid or funded project covers its fair share, so nothing else quietly fills the gap.',example:'The traineeship budget includes 30% of shared costs, not just trainee pay and certificates.'}]},
  why:{title:'Why the full cost matters',points:['Low overheads do not mean efficiency; often nobody pays for support.','Without shared costs, founders’ unpaid time quietly subsidises the project.','A real shared-cost rate makes your prices and funding asks honest.']},
  use:{title:'Where you will use it',points:['Your prices for products or services, from the first sale.','Your funding asks, within any limits a funder sets.','Your organisational budget: project budgets add up to it, with nothing counted twice.']},
  mistakes:{title:'What to avoid',points:['Budgeting only direct costs because funders or customers see only those.','Changing the cost-sharing method from one project to the next.','Using different cost headings in each project budget.']}
 });
 add('109.programme-budget','es',{
  what:'El presupuesto de proyecto muestra el costo de un trabajo concreto, como un piloto o una primera línea de productos. Incluye sus costos directos y una parte justa de los costos compartidos que lo hacen posible.',
  parts:{title:'Dos costos, un precio justo',items:[
   {label:'Costos directos',text:'Costos que existen solo porque el proyecto se realiza, detallados como cantidad × costo unitario.',example:'El piloto de prácticas: pago a aprendices, mentoría, certificados de higiene y delantales para cuatro aprendices.'},
   {label:'Costos compartidos',text:'Costos que sostienen toda la iniciativa, repartidos con un criterio escrito, como el tiempo.',example:'Alquiler de cocina, seguro y teléfono repartidos por tiempo: la formación usa el 30% de las horas de cocina.'},
   {label:'Costo completo',text:'Cada proyecto pagado o financiado cubre su parte justa, para que nada más tape el hueco.',example:'El presupuesto de las prácticas incluye el 30% de los costos compartidos, no solo pagos y certificados.'}]},
  why:{title:'Por qué importa el costo completo',points:['Gastos generales bajos no son eficiencia: a menudo nadie paga el apoyo.','Sin costos compartidos, el tiempo no pagado de los fundadores subsidia el proyecto.','Una tasa real de costos compartidos hace honestos tus precios y solicitudes.']},
  use:{title:'Dónde lo usarás',points:['Tus precios de productos o servicios, desde la primera venta.','Tus solicitudes de fondos, dentro de los límites del financiador.','Tu presupuesto de la organización: los proyectos lo suman sin contar nada dos veces.']},
  mistakes:{title:'Qué evitar',points:['Presupuestar solo costos directos porque es lo único que ven los demás.','Cambiar el criterio de reparto de un proyecto a otro.','Usar rubros distintos en cada presupuesto de proyecto.']}
 });

 // 9.4 Restricted and unrestricted funds
 add('109.restricted','en',{
  what:'Some money can be used only for a purpose a funder set; other money you can use for anything within your mission. The kind of money decides who can change how it is spent.',
  parts:{title:'Four kinds of money',items:[
   {label:'Restricted',text:'Only for the purpose the funder or donor set; changes need their written agreement.',example:'The US$6,000 youth-fund grant may only pay for trainee wages and mentoring.'},
   {label:'Unrestricted',text:'Your initiative decides how to use it, within its mission.',example:'Stall and café sales, plus the founders’ own US$4,000 of savings.'},
   {label:'Designated',text:'Unrestricted money the founders set aside for a purpose; they can change that decision themselves.',example:'Our bakery sets money aside each month towards its own shop in year two.'},
   {label:'Deferred',text:'Money received in advance, earned only when you deliver the work or goods.',example:'The office canteen pays a month of bread upfront, delivered over four weeks.'}]},
  why:{title:'Why the kind matters',points:['Using restricted money elsewhere, even for weeks, can break the agreement or the law.','Flexible money is what covers your core costs and risks.','Funders trust initiatives that can show where their money went.']},
  use:{title:'What it feeds into',points:['Your funds register: one code per restricted fund, with its balance.','Your bookkeeping and funder reports, recording spending against each code.','Your cash flow and reserves, which rely on flexible money.']},
  mistakes:{title:'What to avoid',points:['Reading the grant conditions after accepting the money, not before.','Treating pre-orders or advance fees as money already earned.','Relying almost entirely on restricted money, with little flexible income.']}
 });
 add('109.restricted','es',{
  what:'Parte del dinero solo puede usarse para el fin que fijó un financiador; otra parte puedes usarla para cualquier cosa dentro de tu misión. El tipo de dinero decide quién puede cambiar su uso.',
  parts:{title:'Cuatro tipos de dinero',items:[
   {label:'Restringido',text:'Solo para el fin que fijó el financiador o donante; cambiarlo requiere su acuerdo por escrito.',example:'La subvención de US$6000 del fondo juvenil solo puede pagar salarios de aprendices y mentoría.'},
   {label:'No restringido',text:'Tu iniciativa decide cómo usarlo, dentro de su misión.',example:'Las ventas del puesto y a cafeterías, más los US$4000 de ahorros de los fundadores.'},
   {label:'Designado',text:'Dinero no restringido que los fundadores apartan para un fin; ellos mismos pueden cambiar esa decisión.',example:'Nuestra panadería aparta dinero cada mes para su propia tienda del segundo año.'},
   {label:'Diferido',text:'Dinero recibido por adelantado, que se gana solo al entregar el trabajo o los productos.',example:'El comedor de oficina paga por adelantado un mes de pan, entregado en cuatro semanas.'}]},
  why:{title:'Por qué importa el tipo',points:['Usar dinero restringido para otra cosa, aun por semanas, puede romper el acuerdo o la ley.','El dinero flexible es el que cubre tus costos básicos y riesgos.','Los financiadores confían en quien muestra a dónde fue su dinero.']},
  use:{title:'A qué alimenta',points:['Tu registro de fondos: un código por fondo restringido, con su saldo.','Tu contabilidad e informes, con cada gasto asignado a su código.','Tu flujo de caja y tus reservas, que dependen del dinero flexible.']},
  mistakes:{title:'Qué evitar',points:['Leer las condiciones de la subvención después de aceptar el dinero.','Tratar preventas o cuotas adelantadas como dinero ya ganado.','Depender casi solo de dinero restringido, con poco ingreso flexible.']}
 });

 // 9.5 Cash flow, forecasting and runway
 add('109.cashflow','en',{
  what:'A cash flow forecast shows, month by month, the cash you expect to receive and pay out, and what is left. Runway is how many months you could keep going if no new income arrived.',
  parts:{title:'How the lines connect',items:[
   {label:'Opening balance',text:'Cash in the bank at the start of the month.',example:'Our bakery starts January with US$4,000 of the founders’ savings in its account.'},
   {label:'Receipts and payments',text:'Money actually arriving and leaving, not money invoiced or promised.',example:'In: US$3,200 from stall and café sales, US$500 from the youth fund. Out: US$4,000 for rent, flour and pay.'},
   {label:'Closing balance',text:'What is left at the end of the month; it becomes next month’s opening balance.',example:'US$4,000 + US$3,700 − US$4,000 leaves US$3,700 to start February.'},
   {label:'Runway',text:'Closing balance divided by your average monthly payments.',example:'US$3,700 ÷ US$4,000 a month gives just under one month of runway.'}]},
  why:{title:'Why cash comes first',points:['A surplus on paper does not pay bills; cash does.','Start-up costs come first and income later, so gaps are likely.','It shows a shortfall months ahead, while you can still act.']},
  use:{title:'How you will use it',points:['Monthly: replace estimates with actual figures and check your runway.','Scenarios: test late sales, late payments or a failed funding bid.','Triggers: a minimum runway that sets off actions agreed in advance.']},
  mistakes:{title:'What to avoid',points:['Counting invoices as cash before the money actually arrives.','Building the forecast once and never updating it.','Waiting for a crisis to decide what you would delay or cut.']}
 });
 add('109.cashflow','es',{
  what:'El flujo de caja proyectado muestra, mes a mes, el dinero que esperas recibir y pagar, y lo que queda. El margen son los meses que podrías seguir si no llegara ningún ingreso nuevo.',
  parts:{title:'Cómo se conectan las líneas',items:[
   {label:'Saldo inicial',text:'El dinero en el banco al comienzo del mes.',example:'Nuestra panadería empieza enero con US$4000 de ahorros de los fundadores en su cuenta.'},
   {label:'Cobros y pagos',text:'El dinero que de verdad entra y sale, no lo facturado ni lo prometido.',example:'Entran US$3200 de ventas y US$500 del fondo juvenil. Salen US$4000 en alquiler, harina y pagos.'},
   {label:'Saldo final',text:'Lo que queda al cierre del mes; pasa a ser el saldo inicial del siguiente.',example:'US$4000 + US$3700 − US$4000 deja US$3700 para empezar febrero.'},
   {label:'Margen',text:'El saldo final dividido entre tus pagos mensuales promedio.',example:'US$3700 ÷ US$4000 al mes da poco menos de un mes de margen.'}]},
  why:{title:'Por qué la caja va primero',points:['Un superávit en papel no paga cuentas; el dinero en caja sí.','Los costos de arranque llegan antes que los ingresos: habrá huecos.','Muestra un faltante con meses de anticipación, cuando aún puedes actuar.']},
  use:{title:'Cómo lo usarás',points:['Cada mes: cambia estimaciones por cifras reales y revisa tu margen.','Escenarios: prueba ventas tardías, pagos atrasados o una solicitud rechazada.','Alertas: un margen mínimo que activa acciones acordadas de antemano.']},
  mistakes:{title:'Qué evitar',points:['Contar facturas como caja antes de que llegue el dinero.','Hacer la proyección una vez y no actualizarla nunca.','Esperar a la crisis para decidir qué retrasar o recortar.']}
 });

 // 9.6 Financial controls, approvals and procurement
 add('109.controls','en',{
  what:'Financial controls are the checks that prevent errors and misuse and make your records trustworthy. They are far easier to set up before your first payment than to add later.',
  parts:{title:'Four control principles',items:[
   {label:'Approvals',text:'Spending is approved within agreed limits, using your delegation of authority from Module 3.',example:'Either founder approves up to US$200; above that, both must agree.'},
   {label:'Evidence',text:'Every transaction has a receipt, invoice or contract behind it.',example:'The bakery photographs each flour and stall receipt and files it the same day.'},
   {label:'Separation of duties',text:'Requesting, approving, paying and checking go to different people wherever possible.',example:'One founder pays suppliers; the other checks the bank statement each month.'},
   {label:'Independent review',text:'Someone outside day-to-day work checks the numbers, especially when duties cannot be separated.',example:'The accountant on the advisory group reviews the bank reconciliations every quarter.'}]},
  why:{title:'Why controls protect you',points:['They protect your money, and the founders, from errors and suspicion.','Funders and banks look for them before trusting you with money.','Good habits now are much easier than changing them later.']},
  use:{title:'Where they apply',points:['Your bank account: separate from day one and reconciled every month.','Your procurement thresholds: when you need quotes and how you choose suppliers.','Your conflict of interest declarations, for example buying from a relative.']},
  mistakes:{title:'What to avoid',points:['Mixing personal and initiative money in one bank account.','Pretending duties are separate when one person does everything.','Copying another country’s rules as if they were your legal duties.']}
 });
 add('109.controls','es',{
  what:'Los controles financieros son las verificaciones que evitan errores y malos usos y hacen confiables tus registros. Es mucho más fácil crearlos antes del primer pago que agregarlos después.',
  parts:{title:'Cuatro principios de control',items:[
   {label:'Aprobaciones',text:'Los gastos se aprueban dentro de límites acordados, según tu delegación de autoridad del Módulo 3.',example:'Cualquier fundador aprueba hasta US$200; por encima de eso, deben acordarlo ambos.'},
   {label:'Respaldo',text:'Cada transacción tiene detrás un recibo, una factura o un contrato.',example:'La panadería fotografía cada recibo de harina y del puesto y lo archiva el mismo día.'},
   {label:'Separación de funciones',text:'Pedir, aprobar, pagar y revisar quedan en manos distintas siempre que se pueda.',example:'Un fundador paga a proveedores; la otra revisa el estado de cuenta cada mes.'},
   {label:'Revisión independiente',text:'Alguien ajeno al día a día revisa las cifras, sobre todo si no puedes separar funciones.',example:'La contadora del grupo asesor revisa las conciliaciones bancarias cada trimestre.'}]},
  why:{title:'Por qué te protegen',points:['Protegen tu dinero, y a los fundadores, de errores y sospechas.','Bancos y financiadores los buscan antes de confiarte dinero.','Crear buenos hábitos ahora es mucho más fácil que cambiarlos después.']},
  use:{title:'Dónde se aplican',points:['Tu cuenta bancaria: propia desde el primer día y conciliada cada mes.','Tus umbrales de compra: cuándo pedir cotizaciones y cómo elegir proveedores.','Tus declaraciones de conflicto de interés, como comprarle a un familiar.']},
  mistakes:{title:'Qué evitar',points:['Mezclar dinero personal y de la iniciativa en una sola cuenta.','Fingir que hay separación de funciones cuando una persona hace todo.','Copiar las normas de otro país como si fueran tus obligaciones.']}
 });

 // 9.7 Management accounts and budget versus actual
 add('109.management-accounts','en',{
  what:'Management accounts are short internal reports, monthly or quarterly, that compare actual income and spending with your budget. They exist to help you decide, so on time and simple beats perfect.',
  parts:{title:'From numbers to decisions',items:[
   {label:'Budget versus actual',text:'For each line, the budget to date, the actual to date and the difference (the variance).',example:'Ingredients budget US$1,200, actual US$1,450: a variance of US$250 over budget.'},
   {label:'Variance explained',text:'One sentence for each big difference: timing, price or volume.',example:'Volume: the stall sold 360 loaves a week, not 300, because demand was higher.'},
   {label:'Decision',text:'Accept the variance, correct it or change the forecast.',example:'The founders accept the extra baking and raise the ingredients forecast.'},
   {label:'Year-end forecast',text:'Where you will end up, and whether that is acceptable.',example:'At this rate the year ends US$400 short, so the founders delay buying a second mixer.'}]},
  why:{title:'Why the monthly check matters',points:['Your first budget is mostly assumptions; this shows quickly which were wrong.','It turns numbers into decisions while there is still time to act.','The routine builds the habit funders and a future board expect.']},
  use:{title:'What they feed',points:['Your monthly finance check, even between two co-founders.','Your cash flow forecast and next year’s budget.','Your reports to funders and, later, to a board.']},
  mistakes:{title:'What to avoid',points:['Waiting for perfect figures, so the report arrives too late to help.','Listing variances without explaining them or deciding anything.','Asking only “where are we now?” and never “where will we end up?”']}
 });
 add('109.management-accounts','es',{
  what:'Los informes de gestión son informes internos breves, mensuales o trimestrales, que comparan ingresos y gastos reales con tu presupuesto. Sirven para decidir: mejor a tiempo y simples que perfectos.',
  parts:{title:'De las cifras a las decisiones',items:[
   {label:'Presupuesto frente a real',text:'En cada línea, el presupuesto a la fecha, lo real a la fecha y la diferencia.',example:'Presupuesto de ingredientes US$1200, real US$1450: una diferencia de US$250 sobre lo previsto.'},
   {label:'Diferencia explicada',text:'Una frase por cada diferencia grande: momento, precio o volumen.',example:'Volumen: el puesto vendió 360 panes por semana, no 300, porque hubo más demanda.'},
   {label:'Decisión',text:'Aceptar la diferencia, corregirla o cambiar la proyección.',example:'Los fundadores aceptan el horneado extra y suben la proyección de ingredientes.'},
   {label:'Proyección al cierre',text:'Dónde terminarás el año y si eso es aceptable.',example:'A este ritmo el año cierra con US$400 de faltante, así que postergan una segunda amasadora.'}]},
  why:{title:'Por qué importa cada mes',points:['Tu primer presupuesto es casi todo supuestos; esto muestra rápido cuáles fallaron.','Convierte cifras en decisiones cuando aún hay tiempo de actuar.','La rutina crea el hábito que esperan financiadores y una futura junta.']},
  use:{title:'A qué alimentan',points:['Tu revisión financiera mensual, aunque sea entre dos cofundadores.','Tu flujo de caja y el presupuesto del año siguiente.','Tus informes a financiadores y, más adelante, a una junta.']},
  mistakes:{title:'Qué evitar',points:['Esperar cifras perfectas, y que el informe llegue tarde para ayudar.','Listar diferencias sin explicarlas ni decidir nada.','Preguntar solo “¿dónde estamos?” y nunca “¿dónde terminaremos?”']}
 });

 // 9.8 Financial reporting: board, funders and statutory
 add('109.reporting','en',{
  what:'Financial reporting means giving each audience the financial information it needs, in its format and by its deadline. Founders, funders, regulators and investors need different reports, all drawn from the same accounts.',
  parts:{title:'Who needs what',items:[
   {label:'Founders, later a board',text:'Regular management accounts, the cash position and the main financial risks.',example:'Two co-founders review a one-page report on the first Monday of each month.'},
   {label:'Funders',text:'Reports in their own format, showing how their money was used.',example:'A six-month report to the local youth fund: trainee spending against the agreed budget.'},
   {label:'Regulators and tax',text:'Statutory accounts and returns by fixed deadlines, once you are registered.',example:'Once registered, the bakery’s annual accounts and tax return, due on dates set by law.'},
   {label:'Members and investors',text:'Their own reports, as your legal form or your agreements require.',example:'The two founders, as shareholders, receive the annual accounts before deciding how to reinvest profit.'}]},
  why:{title:'Why reporting builds trust',points:['Missing a statutory deadline can bring fines or harm your registration.','The same numbers everywhere build trust with funders and partners.','Evidence filed from day one makes every report faster to prove.']},
  use:{title:'What you will build',points:['A reporting calendar: each deadline, its owner and where the figures come from.','A filing system: receipts, timesheets and contracts by fund and period.','A simple public summary, to be open about your money from the start.']},
  mistakes:{title:'What to avoid',points:['Starting the calendar only after a deadline is missed.','Giving funders figures that do not match your accounts.','Leaving the accounts to the accountant without understanding or approving them.']}
 });
 add('109.reporting','es',{
  what:'Informar sobre tus finanzas es dar a cada público la información que necesita, en su formato y a tiempo. Fundadores, financiadores, autoridades e inversionistas piden informes distintos, todos de las mismas cuentas.',
  parts:{title:'Quién necesita qué',items:[
   {label:'Fundadores, luego junta',text:'Informes de gestión regulares, la situación de caja y los principales riesgos financieros.',example:'Dos cofundadores revisan un informe de una página el primer lunes de cada mes.'},
   {label:'Financiadores',text:'Informes en su propio formato que muestran cómo se usó su dinero.',example:'Un informe semestral al fondo juvenil local: el gasto en aprendices frente al presupuesto acordado.'},
   {label:'Autoridades e impuestos',text:'Cuentas legales y declaraciones en plazos fijos, una vez que te registras.',example:'Ya registrada, las cuentas anuales y la declaración de impuestos de la panadería, en fechas fijadas por ley.'},
   {label:'Socios e inversionistas',text:'Sus propios informes, según lo exijan tu forma legal o tus acuerdos.',example:'Los dos fundadores, como accionistas, reciben las cuentas anuales antes de decidir cómo reinvertir la ganancia.'}]},
  why:{title:'Por qué genera confianza',points:['Incumplir un plazo legal puede traer multas o afectar tu registro.','Las mismas cifras en todas partes generan confianza.','Archivar respaldos desde el primer día agiliza cada informe.']},
  use:{title:'Qué construirás',points:['Un calendario de informes: cada plazo, su responsable y de dónde salen las cifras.','Un archivo: recibos, hojas de horas y contratos por fondo y período.','Un resumen público sencillo, para ser transparente desde el inicio.']},
  mistakes:{title:'Qué evitar',points:['Crear el calendario solo después de incumplir un plazo.','Dar a financiadores cifras que no coinciden con tus cuentas.','Dejar las cuentas al contador sin entenderlas ni aprobarlas.']}
 });

 // 9.9 Audit, examination and financial governance
 add('109.audit','en',{
  what:'Financial governance is how you oversee money: approving the budget, reviewing the accounts and setting reserves. Depending on your form, size and country, independent people may also need to check your accounts.',
  parts:{title:'Who checks your accounts',items:[
   {label:'Founder review',text:'The founders now, and a board later, read, question and approve the accounts.',example:'Both founders go through the annual accounts line by line before signing them.'},
   {label:'Independent examination',text:'A qualified independent person reviews the books and accounts; lighter than an audit.',example:'Even if not required, the bakery asks an outside accountant to examine its first-year accounts.'},
   {label:'Statutory audit',text:'An auditor tests the records and gives a formal opinion; usually later, as you grow.',example:'Once income passes the national threshold, the bakery appoints an auditor.'},
   {label:'Funder audit',text:'A check of how one grant was spent, set out in the grant agreement.',example:'The local youth fund asks to audit how its US$6,000 grant was spent.'}]},
  why:{title:'Why oversight matters early',points:['Audit thresholds bring costs and deadlines you need to plan for.','Independent eyes on the numbers protect the founders as well as the money.','A reserves target is your first defence against shocks.']},
  use:{title:'What you will set',points:['Who approves the budget, reviews the accounts and approves major commitments.','Which audit or examination will apply, and when, confirmed for your country.','A reserves policy: a target, the reason for it and a first step.']},
  mistakes:{title:'What to avoid',points:['Assuming no checks apply because you are small or new.','Founders reviewing only their own work, with no independent look.','Setting no reserves target because you have no reserves yet.']}
 });
 add('109.audit','es',{
  what:'El gobierno financiero es cómo supervisas el dinero: aprobar el presupuesto, revisar las cuentas y fijar reservas. Según tu forma, tamaño y país, personas independientes también pueden tener que revisar tus cuentas.',
  parts:{title:'Quién revisa tus cuentas',items:[
   {label:'Revisión de fundadores',text:'Los fundadores ahora, y una junta después, leen, cuestionan y aprueban las cuentas.',example:'Ambos fundadores revisan las cuentas anuales línea por línea antes de firmarlas.'},
   {label:'Revisión independiente',text:'Una persona independiente calificada revisa libros y cuentas; es más ligera que una auditoría.',example:'Aunque no esté obligada, la panadería pide a un contador externo examinar sus cuentas del primer año.'},
   {label:'Auditoría legal',text:'Un auditor prueba los registros y emite una opinión formal; suele llegar al crecer.',example:'Cuando sus ingresos superen el umbral nacional, la panadería nombrará un auditor.'},
   {label:'Auditoría del financiador',text:'Una revisión de cómo se gastó una subvención, fijada en el convenio.',example:'El fondo juvenil local pide auditar cómo se gastó su subvención de US$6000.'}]},
  why:{title:'Por qué supervisar desde temprano',points:['Los umbrales de auditoría traen costos y plazos que debes planificar.','Una mirada independiente protege a los fundadores y al dinero.','Una meta de reservas es tu primera defensa ante imprevistos.']},
  use:{title:'Qué fijarás',points:['Quién aprueba el presupuesto, revisa las cuentas y aprueba grandes compromisos.','Qué auditoría o revisión te tocará y cuándo, confirmado para tu país.','Una política de reservas: una meta, su motivo y un primer paso.']},
  mistakes:{title:'Qué evitar',points:['Suponer que no hay revisiones porque eres pequeño o nuevo.','Que los fundadores revisen solo su propio trabajo, sin mirada externa.','No fijar meta de reservas porque aún no tienes reservas.']}
 });

 // 9.10 Financial health and sustainability
 add('109.sustainability','en',{
  what:'Financial sustainability means being able to fund your mission over time, cope with shocks and invest in the future. You judge it by financial health, not by how fast your income grows.',
  parts:{title:'Four health measures',items:[
   {label:'Reserves and runway',text:'Months of unrestricted reserves, and months you could run without new income.',example:'Our bakery holds one month of reserves and aims for three within two years.'},
   {label:'Dependency',text:'The share of your income that comes from your largest single source.',example:'The youth fund is US$6,000 of US$48,000; no single café buyer exceeds 20% of sales.'},
   {label:'Flexible income',text:'The share of unrestricted income you can use for core costs.',example:'Stall and café sales give the bakery about 80% flexible income in year one.'},
   {label:'Full cost recovery',text:'Whether your projects cover their fair share of shared costs.',example:'Sales cover about 80% of full cost in year one; the target is 100% within 18 months.'}]},
  why:{title:'Why health beats size',points:['A big first grant or contract can hide a fragile model.','Weak starting values are normal; the trend is what matters.','They warn you before dependency or low reserves become a crisis.']},
  use:{title:'How you will use them',points:['In your annual review, to see whether your funding mix works.','To choose the income mix that suits the form you are building.','To set targets for reserves, dependency and flexible income.']},
  mistakes:{title:'What to avoid',points:['Celebrating income growth while reserves and runway shrink.','Tracking so many measures that none of them gets used.','Setting no targets because your starting values look weak.']}
 });
 add('109.sustainability','es',{
  what:'La sostenibilidad financiera es poder financiar tu misión en el tiempo, resistir imprevistos e invertir en el futuro. Se mide por tu salud financiera, no por lo rápido que crecen tus ingresos.',
  parts:{title:'Cuatro indicadores de salud',items:[
   {label:'Reservas y margen',text:'Meses de reservas no restringidas y meses que podrías operar sin ingresos nuevos.',example:'Nuestra panadería tiene un mes de reservas y busca tener tres en dos años.'},
   {label:'Dependencia',text:'La parte de tus ingresos que viene de tu mayor fuente única.',example:'El fondo juvenil aporta US$6000 de US$48 000; ningún cliente mayorista supera el 20% de las ventas.'},
   {label:'Ingreso flexible',text:'La parte de ingresos no restringidos que puedes usar en costos básicos.',example:'Las ventas del puesto y a cafeterías dan a la panadería cerca del 80% de ingreso flexible.'},
   {label:'Costo completo',text:'Si tus proyectos cubren su parte justa de los costos compartidos.',example:'Las ventas cubren cerca del 80% del costo completo el primer año; la meta es 100% en 18 meses.'}]},
  why:{title:'Salud antes que tamaño',points:['Una gran primera subvención o contrato puede ocultar un modelo frágil.','Empezar con valores débiles es normal; importa la tendencia.','Te alertan antes de que la dependencia o las reservas bajas sean una crisis.']},
  use:{title:'Cómo los usarás',points:['En tu revisión anual, para ver si tu mezcla de ingresos funciona.','Para elegir la mezcla de ingresos que conviene a tu forma legal.','Para fijar metas de reservas, dependencia e ingreso flexible.']},
  mistakes:{title:'Qué evitar',points:['Celebrar que crecen los ingresos mientras bajan reservas y margen.','Seguir tantos indicadores que no se usa ninguno.','No fijar metas porque los valores iniciales se ven débiles.']}
 });

 // 10.1 Your legal and regulatory map
 add('110.legal-map','en',{
  what:'A legal map lists the legal duties you will carry: where each comes from, who oversees it, when it applies and who is responsible. It helps you ask the right questions before you launch.',
  parts:{title:'Four sources of duties',items:[
   {label:'Your legal form',text:'Association, foundation, charity, company or cooperative: each brings its own registration and governance rules.',example:'Registering as a company with a social purpose brings annual accounts and filing deadlines.'},
   {label:'Your activities',text:'Working with children, employing people, handling data, selling food or raising money.',example:'The bakery needs food hygiene registration before its first market stall.'},
   {label:'Your countries',text:'Each country and region where you work has its own rules.',example:'Our bakery works in one country, so it maps national rules and the city’s market rules.'},
   {label:'Funders and partners',text:'Grant and contract conditions can be legally binding.',example:'The local youth fund requires insurance and a safeguarding policy before the first trainee starts.'}]},
  why:{title:'Why map it now',points:['Some duties start before you register; others the day you first hire or sell.','Knowing your questions saves time with someone who has a legal background.','Funders and partners expect you to know your obligations.']},
  use:{title:'What it feeds',points:['Your policy needs assessment and policy register in this module.','Your contracts checklist and your risk register.','Your calendar: every deadline and frequency, each with an owner.']},
  mistakes:{title:'What to avoid',points:['Asking legal questions after launch instead of before.','Treating unconfirmed items as settled: mark what has been checked.','Mapping only one country when you plan to work in several.']}
 });
 add('110.legal-map','es',{
  what:'El mapa legal lista las obligaciones legales que tendrás: de dónde viene cada una, quién la supervisa, cuándo aplica y quién responde. Te ayuda a hacer las preguntas correctas antes de lanzar.',
  parts:{title:'Cuatro fuentes de obligaciones',items:[
   {label:'Tu forma legal',text:'Asociación, fundación, organización benéfica, empresa o cooperativa: cada una trae sus normas de registro y gobierno.',example:'Registrarse como empresa con propósito social trae cuentas anuales y plazos de presentación.'},
   {label:'Tus actividades',text:'Trabajar con menores, contratar personas, manejar datos, vender alimentos o recaudar fondos.',example:'La panadería necesita su registro sanitario antes de su primer puesto en el mercado.'},
   {label:'Tus países',text:'Cada país y región donde trabajas tiene sus propias normas.',example:'Nuestra panadería opera en un solo país: mapea las normas nacionales y las del mercado municipal.'},
   {label:'Financiadores y aliados',text:'Las condiciones de subvenciones y contratos pueden ser legalmente vinculantes.',example:'El fondo juvenil local exige seguro y política de salvaguarda antes de que empiece el primer aprendiz.'}]},
  why:{title:'Por qué mapearlo ya',points:['Algunas obligaciones empiezan antes del registro; otras al contratar o vender.','Saber tus preguntas ahorra tiempo con alguien con formación legal.','Financiadores y aliados esperan que conozcas tus obligaciones.']},
  use:{title:'A qué alimenta',points:['Tu evaluación de políticas y tu registro de políticas en este módulo.','Tu lista de revisión de contratos y tu registro de riesgos.','Tu calendario: cada plazo y frecuencia, con su responsable.']},
  mistakes:{title:'Qué evitar',points:['Hacer preguntas legales después de lanzar, no antes.','Dar por resuelto lo que no se confirmó: marca lo verificado.','Mapear un solo país cuando piensas trabajar en varios.']}
 });

 // 10.2 Working out which policies you actually need
 add('110.policy-needs','en',{
  what:'A policy states a principle or rule; a procedure explains how people apply it. A new initiative needs fewer policies than you might think, chosen from what you will actually do.',
  parts:{title:'Three priority groups',items:[
   {label:'Before you start',text:'A legal duty or a high risk from your very first activity.',example:'Safeguarding, food hygiene and consent forms before the first trainee starts, since some are 17.'},
   {label:'Required soon',text:'Triggered by registration, the first hire, growth or a new activity.',example:'Full HR policies before the bakery hires its first baker for the year-two shop.'},
   {label:'Good practice',text:'Useful, but not yet required by law or by your main risks.',example:'A food-waste policy for the bakery, planned for its second year.'}]},
  why:{title:'Why fewer is better',points:['Copied policies that nobody follows create risks of their own.','Focusing on the essentials saves your limited time.','Funders and partners can see you know what matters.']},
  use:{title:'What it shapes',points:['Your policy register: owner, approval route and review date for each.','The core, safeguarding, data and HR policies in this module.','Where you need qualified local advice before you launch.']},
  mistakes:{title:'What to avoid',points:['Copying a thick folder of policies from another organisation.','Writing policies without procedures that show how to apply them.','Forgetting what funders and customers will require by contract.']}
 });
 add('110.policy-needs','es',{
  what:'Una política fija un principio o una regla; un procedimiento explica cómo aplicarla. Una iniciativa nueva necesita menos políticas de lo que crees, elegidas según lo que harás de verdad.',
  parts:{title:'Tres grupos de prioridad',items:[
   {label:'Antes de empezar',text:'Una obligación legal o un riesgo alto desde tu primera actividad.',example:'Salvaguarda, higiene alimentaria y formularios de consentimiento antes del primer aprendiz, porque algunos tienen 17.'},
   {label:'Pronto',text:'Se activan con el registro, la primera contratación, el crecimiento o una actividad nueva.',example:'Políticas de personal completas antes de contratar al primer panadero para la tienda del segundo año.'},
   {label:'Buena práctica',text:'Útiles, pero aún no exigidas por la ley ni por tus riesgos principales.',example:'Una política de desperdicio de alimentos para la panadería, prevista para su segundo año.'}]},
  why:{title:'Por qué menos es mejor',points:['Las políticas copiadas que nadie cumple crean sus propios riesgos.','Centrarte en lo esencial ahorra tu tiempo limitado.','Financiadores y aliados ven que sabes qué importa.']},
  use:{title:'Qué define',points:['Tu registro de políticas: responsable, aprobación y fecha de revisión.','Las políticas básicas, de salvaguarda, datos y laborales de este módulo.','Dónde necesitas asesoría local calificada antes de lanzar.']},
  mistakes:{title:'Qué evitar',points:['Copiar una carpeta gruesa de políticas de otra organización.','Escribir políticas sin procedimientos que muestren cómo aplicarlas.','Olvidar lo que exigirán por contrato financiadores y clientes.']}
 });

 // 10.3 Contracts and agreements
 add('110.contracts','en',{
  what:'A contract is an agreement that creates legal obligations. You will sign some before you are fully set up, so check each one before you sign and keep track of what you have promised.',
  parts:{title:'Check before you sign',items:[
   {label:'Parties and signing',text:'Who the parties are and who may sign; before you register, it may bind you personally.',example:'A founder signs the shared-kitchen agreement in her own name before the bakery is registered.'},
   {label:'Obligations and payment',text:'What each side must do and by when, plus the payment and reporting terms.',example:'The supplier delivers flour weekly; the bakery pays within 30 days.'},
   {label:'Ownership and liability',text:'Who owns materials and data, confidentiality, liability, insurance and indemnities.',example:'The bakery keeps ownership of its training materials when the youth centre uses them.'},
   {label:'Ending and law',text:'How the contract ends, and which country’s law applies.',example:'The youth centre or the bakery can end the referral agreement with three months’ notice.'}]},
  why:{title:'Why check every one',points:['A signature can make you personally liable before you register.','Unclear terms cause disputes with partners you need.','A register stops you missing dates and obligations.']},
  use:{title:'What you will keep',points:['A contracts register from the first agreement, with key dates and obligations.','Signed copies stored where all the founders can find them.','A pre-signature checklist for every new agreement.']},
  mistakes:{title:'What to avoid',points:['Signing a template without reading or adapting it.','Leaving unclear whether a memorandum of understanding is binding.','Skipping review by someone with a legal background for large, long or unusual contracts.']}
 });
 add('110.contracts','es',{
  what:'Un contrato es un acuerdo que crea obligaciones legales. Firmarás algunos antes de estar del todo constituido, así que revisa cada uno antes de firmar y lleva control de lo que prometiste.',
  parts:{title:'Revisa antes de firmar',items:[
   {label:'Partes y firma',text:'Quiénes son las partes y quién puede firmar; antes del registro, puede obligarte a ti.',example:'Una fundadora firma el acuerdo de la cocina compartida a su nombre antes de registrar la panadería.'},
   {label:'Obligaciones y pagos',text:'Qué debe hacer cada parte y para cuándo, más los términos de pago e informes.',example:'El proveedor entrega harina cada semana; la panadería paga a 30 días.'},
   {label:'Propiedad y responsabilidad',text:'Quién es dueño de materiales y datos, confidencialidad, responsabilidad, seguros e indemnizaciones.',example:'La panadería conserva la propiedad de sus materiales de formación cuando el centro juvenil los usa.'},
   {label:'Fin y ley aplicable',text:'Cómo termina el contrato y qué ley de qué país se aplica.',example:'El centro juvenil o la panadería pueden terminar el acuerdo de derivación con tres meses de aviso.'}]},
  why:{title:'Por qué revisar cada uno',points:['Una firma puede hacerte responsable personal antes del registro.','Los términos poco claros causan disputas con aliados que necesitas.','Un registro evita que se te pasen fechas y obligaciones.']},
  use:{title:'Qué llevarás',points:['Un registro de contratos desde el primer acuerdo, con fechas y obligaciones clave.','Copias firmadas guardadas donde todos los fundadores las encuentren.','Una lista de revisión previa a la firma para cada acuerdo nuevo.']},
  mistakes:{title:'Qué evitar',points:['Firmar una plantilla sin leerla ni adaptarla.','No aclarar si un memorando de entendimiento es vinculante.','Saltarte la revisión de alguien con formación legal en contratos grandes, largos o inusuales.']}
 });

 // 10.4 Core policies: conduct, conflicts and anti-fraud
 add('110.core-policies','en',{
  what:'Core policies are the small set most organisations need: conduct, conflicts of interest, anti-fraud and anti-harassment. They are easiest to write before habits form, and they apply from your first volunteer.',
  parts:{title:'The core set',items:[
   {label:'Code of conduct',text:'The behaviour expected of everyone: respect, boundaries, care with resources and reporting concerns.',example:'Nobody takes unsold bread home without logging it on the waste sheet.'},
   {label:'Conflicts of interest',text:'People declare personal interests that could sway a decision, and each conflict is recorded.',example:'A founder declares her cousin supplies flour and stays out of choosing the supplier.'},
   {label:'Anti-fraud and bribery',text:'Fraud, bribes and payments to speed things up are never accepted.',example:'The bakery refuses to pay an unofficial fee to speed up its market-stall permit.'},
   {label:'Anti-harassment',text:'Protects people from harassment and bullying, and gives them a route for complaints.',example:'A trainee can report unwanted comments to a named person she trusts at the youth centre.'}]},
  why:{title:'Why write them early',points:['Friends and family often help at the start, so conflicts are common.','Clear rules protect people before problems arise.','Funders and partners often require them by contract.']},
  use:{title:'How you put them in place',points:['Share each one with everyone who joins and ask them to confirm reading it.','Keep a register of declared interests and gifts.','List each in your policy register with an owner and review date.']},
  mistakes:{title:'What to avoid',points:['Long, legal-sounding policies that nobody reads.','Waiting until a problem happens to write the rules.','Forgetting to say how to report a concern and what happens next.']}
 });
 add('110.core-policies','es',{
  what:'Las políticas básicas son el pequeño conjunto que casi toda organización necesita: conducta, conflictos de interés, antifraude y antiacoso. Es más fácil escribirlas antes de que se formen hábitos, y aplican desde el primer voluntario.',
  parts:{title:'El conjunto básico',items:[
   {label:'Código de conducta',text:'La conducta esperada de todos: respeto, límites, cuidado de los recursos y reporte de inquietudes.',example:'Nadie se lleva pan sin vender sin anotarlo en la hoja de desperdicio.'},
   {label:'Conflictos de interés',text:'Las personas declaran intereses que podrían influir en una decisión, y cada conflicto se registra.',example:'Una fundadora declara que su primo provee la harina y no participa en elegir al proveedor.'},
   {label:'Antifraude y soborno',text:'El fraude, los sobornos y los pagos para agilizar trámites nunca se aceptan.',example:'La panadería se niega a pagar una cuota extraoficial para agilizar el permiso del puesto.'},
   {label:'Antiacoso',text:'Protege a las personas del acoso y el hostigamiento y les da una vía de queja.',example:'Una aprendiz puede reportar comentarios no deseados a una persona de confianza del centro juvenil.'}]},
  why:{title:'Por qué escribirlas temprano',points:['Al inicio ayudan amigos y familia, así que los conflictos son comunes.','Las reglas claras protegen a las personas antes de que surjan problemas.','Financiadores y aliados suelen exigirlas por contrato.']},
  use:{title:'Cómo ponerlas en marcha',points:['Compártelas con cada persona que se une y pide que confirme su lectura.','Lleva un registro de intereses declarados y regalos.','Anota cada una en tu registro de políticas con responsable y fecha de revisión.']},
  mistakes:{title:'Qué evitar',points:['Políticas largas y legalistas que nadie lee.','Esperar a que haya un problema para escribir las reglas.','Olvidar decir cómo reportar una inquietud y qué pasa después.']}
 });

 // 10.5 Safeguarding
 add('110.safeguarding','en',{
  what:'Safeguarding means protecting people, especially children and adults at risk, from harm caused by your team, partners, programmes or operations. It applies from your very first activity, including pilots and online work.',
  parts:{title:'Safe practice in three moments',items:[
   {label:'Before',text:'Vetting, training, consent and a risk check for each activity.',example:'Consent from a parent or carer for 17-year-olds, and a kitchen safety check before the pilot.'},
   {label:'During',text:'Two adults present, clear roles and a named focal person on site.',example:'Two adults are always present with trainees in the kitchen, and one founder is focal person.'},
   {label:'If a concern arises',text:'Listen, do not investigate, tell the lead the same day and refer as the procedure says.',example:'A mentor tells the focal founder, who follows the referral route agreed before launch.'}]},
  why:{title:'Why it comes first',points:['Harm to someone you serve is the most serious risk you face.','Even a team of two can cause harm, or miss it.','Families and partners trust you only if you protect people from day one.']},
  use:{title:'What your framework includes',points:['A policy, code of conduct, a lead, a deputy and someone outside the founders.','Safer recruitment, training and safe activity design, including online rules.','A way to report, record, refer and support, checked locally every year.']},
  mistakes:{title:'What to avoid',points:['Waiting until after pilots or trial sessions to set it up.','Writing procedures without qualified local advice and referral contacts.','Recording confidential case details in this workspace.']}
 });
 add('110.safeguarding','es',{
  what:'La salvaguarda es proteger a las personas, sobre todo a menores y adultos en riesgo, del daño que puedan causar tu equipo, aliados, programas u operaciones. Aplica desde tu primera actividad, incluidos pilotos y trabajo en línea.',
  parts:{title:'Práctica segura en tres momentos',items:[
   {label:'Antes',text:'Verificación de antecedentes, capacitación, consentimiento y revisión de riesgos de cada actividad.',example:'Consentimiento de madre, padre o tutor para quienes tienen 17, y revisión de seguridad de la cocina antes del piloto.'},
   {label:'Durante',text:'Dos adultos presentes, funciones claras y una persona de referencia designada en el lugar.',example:'Siempre hay dos adultos con los aprendices en la cocina, y un fundador es el punto focal.'},
   {label:'Ante una inquietud',text:'Escucha, no investigues, avisa al responsable el mismo día y deriva según el procedimiento.',example:'Un mentor avisa al fundador focal, que sigue la vía de derivación acordada antes de empezar.'}]},
  why:{title:'Por qué va primero',points:['Dañar a alguien a quien sirves es el riesgo más grave que enfrentas.','Incluso un equipo de dos puede causar daño o no verlo.','Familias y aliados confían en ti solo si proteges desde el primer día.']},
  use:{title:'Qué incluye tu marco',points:['Política, código de conducta, responsable, suplente y alguien ajeno a los fundadores.','Selección segura, capacitación y actividades seguras, con normas en línea.','Una forma de reportar, registrar, derivar y apoyar, revisada localmente cada año.']},
  mistakes:{title:'Qué evitar',points:['Esperar a después de los pilotos o sesiones de prueba para crearlo.','Escribir procedimientos sin asesoría local calificada ni contactos de derivación.','Registrar detalles confidenciales de casos en este espacio de trabajo.']}
 });

 // 10.6 Data protection and privacy
 add('110.data-protection','en',{
  what:'Data protection means handling personal information lawfully, fairly and securely. Laws differ by country, but most share the same principles, and they apply from your very first sign-up.',
  parts:{title:'Principles most laws share',items:[
   {label:'Clear purpose',text:'Collect personal information for a clear and lawful reason, and only what you need.',example:'The bakery asks trainees for an emergency contact, not their school records.'},
   {label:'Accurate and secure',text:'Keep data correct, protected and visible only to people who need it.',example:'Trainee forms go into a password-protected folder, not onto a shared phone.'},
   {label:'Limited time',text:'Hold data only as long as necessary, then delete it.',example:'The bakery deletes trainee contact details one year after the traineeship ends.'},
   {label:'Openness and rights',text:'Tell people what you do with their data, and respect their rights to see, correct or delete it.',example:'A privacy notice on the trainee sign-up form explains how to see or delete their data.'}]},
  why:{title:'Why build it in now',points:['It is far easier to build in now than to fix later.','Data about children, health or ethnicity needs extra care from the start.','A breach can damage trust you have only just begun to build.']},
  use:{title:'What you will build',points:['A data inventory: what you hold, why, where, who sees it and for how long.','A privacy notice, consent where needed, a retention schedule and a breach plan.','Data-sharing agreements with partners, and training for everyone handling data.']},
  mistakes:{title:'What to avoid',points:['Collecting extra data “just in case”.','Keeping contact lists on personal phones or open shared folders.','Not checking local duties, such as registering with an authority.']}
 });
 add('110.data-protection','es',{
  what:'Proteger datos es manejar la información personal de forma legal, justa y segura. Las leyes cambian según el país, pero casi todas comparten principios, y aplican desde el primer registro de una persona.',
  parts:{title:'Principios que comparten casi todas',items:[
   {label:'Fin claro',text:'Recoge información personal por un motivo claro y legal, y solo la necesaria.',example:'La panadería pide a los aprendices un contacto de emergencia, no su historial escolar.'},
   {label:'Exactos y seguros',text:'Mantén los datos correctos, protegidos y visibles solo para quien los necesita.',example:'Los formularios de aprendices van a una carpeta con contraseña, no a un teléfono compartido.'},
   {label:'Tiempo limitado',text:'Guarda los datos solo el tiempo necesario y luego bórralos.',example:'La panadería borra los contactos de un aprendiz un año después de terminar sus prácticas.'},
   {label:'Transparencia y derechos',text:'Explica qué haces con los datos y respeta el derecho a verlos, corregirlos o borrarlos.',example:'Un aviso de privacidad en el formulario de inscripción explica cómo ver o borrar sus datos.'}]},
  why:{title:'Por qué integrarla ya',points:['Es mucho más fácil integrarla ahora que corregirla después.','Los datos de menores, salud u origen étnico requieren más cuidado desde el inicio.','Una filtración puede dañar la confianza que apenas empiezas a construir.']},
  use:{title:'Qué construirás',points:['Un inventario de datos: qué tienes, para qué, dónde, quién lo ve y por cuánto tiempo.','Aviso de privacidad, consentimiento si aplica, plazos de conservación y plan ante filtraciones.','Acuerdos para compartir datos con aliados y capacitación para quien los maneja.']},
  mistakes:{title:'Qué evitar',points:['Recoger datos de más “por si acaso”.','Guardar listas de contactos en teléfonos personales o carpetas abiertas.','No revisar obligaciones locales, como registrarte ante una autoridad.']}
 });

 // 10.7 Whistleblowing, complaints and incident reporting
 add('110.whistleblowing','en',{
  what:'Reporting routes give people safe ways to raise concerns about wrongdoing, make complaints and report what happened. In a small founding team, a route to someone outside the founders matters even more.',
  parts:{title:'Three kinds of report',items:[
   {label:'Whistleblowing',text:'Suspected wrongdoing inside: fraud, abuse or cover-ups. It goes to someone independent of those involved.',example:'A mentor suspects a founder misused the youth-fund grant and tells the accountant adviser.'},
   {label:'Complaint',text:'Someone unhappy with your service, product or behaviour. It goes to a named person, with a route beyond.',example:'A customer complains about a late cake order; the other founder can review the answer.'},
   {label:'Incident',text:'Something that happened: an accident, a data breach or a safeguarding concern. It goes to its owner.',example:'A trainee burns a hand on a tray, and the shift lead records it the same day.'}]},
  why:{title:'Why safe routes matter',points:['People must be able to report the founders without fear.','Patterns in complaints show you what to improve.','Some incidents must reach regulators, funders or insurers within set times.']},
  use:{title:'What you will set up',points:['Visible, simple routes from your first activity.','Timescales for answering, and a route to someone independent.','A list of external reporting duties, confirmed with qualified advice.']},
  mistakes:{title:'What to avoid',points:['Every route leading back to the same one or two founders.','Punishing or ignoring people who raise concerns honestly.','Hiding the routes where participants and volunteers cannot find them.']}
 });
 add('110.whistleblowing','es',{
  what:'Las vías de reporte dan a las personas formas seguras de denunciar irregularidades, presentar quejas y reportar lo ocurrido. En un equipo fundador pequeño, una vía hacia alguien ajeno a los fundadores importa aún más.',
  parts:{title:'Tres tipos de reporte',items:[
   {label:'Denuncia',text:'Sospecha de irregularidades internas: fraude, abuso u ocultamiento. Va a alguien independiente de los implicados.',example:'Un mentor sospecha que un fundador usó mal la subvención del fondo juvenil y avisa a la contadora asesora.'},
   {label:'Queja',text:'Alguien inconforme con tu servicio, producto o trato. Va a una persona designada, con otra instancia.',example:'Una clienta se queja por un pastel tardío; el otro fundador puede revisar la respuesta.'},
   {label:'Incidente',text:'Algo que ocurrió: un accidente, una filtración de datos o una inquietud de salvaguarda. Va a su responsable.',example:'Un aprendiz se quema la mano con una bandeja y la encargada del turno lo registra ese día.'}]},
  why:{title:'Por qué importan vías seguras',points:['Las personas deben poder reportar a los fundadores sin miedo.','Los patrones en las quejas muestran qué mejorar.','Algunos incidentes deben llegar a autoridades, financiadores o aseguradoras en plazos fijos.']},
  use:{title:'Qué crearás',points:['Vías visibles y sencillas desde tu primera actividad.','Plazos de respuesta y una vía hacia alguien independiente.','Una lista de obligaciones de reporte externo, confirmada con asesoría calificada.']},
  mistakes:{title:'Qué evitar',points:['Que todas las vías terminen en los mismos uno o dos fundadores.','Castigar o ignorar a quien plantea inquietudes de buena fe.','Esconder las vías donde participantes y voluntarios no las encuentran.']}
 });

 // 10.8 HR and workplace policies
 add('110.hr-policies','en',{
  what:'HR and workplace policies set out how you treat the people who work with you, paid or unpaid. You need some as soon as anyone helps, and employment law will require more once you employ people.',
  parts:{title:'Two groups, kept apart',items:[
   {label:'Volunteers',text:'A lighter but real framework: role descriptions, expenses, supervision, conduct and how concerns are handled.',example:'Friends helping at the Saturday stall get a role description and an expenses form.'},
   {label:'Employees',text:'Policies the law requires: recruitment, pay, hours, leave, grievance, discipline, health and safety.',example:'Before the four paid trainees start: contracts, hours, leave and kitchen safety rules.'}]},
  why:{title:'Why it matters early',points:['Volunteer documents that look like employment can create legal duties.','Clear rules protect both the people and the initiative.','Policies ready before the first person joins mean no improvising later.']},
  use:{title:'Where it fits',points:['Your people plans from Module 4: recruitment, onboarding, pay and culture.','Your policy register: an owner, a review date and a trigger for each.','Checks by a qualified local employment adviser.']},
  mistakes:{title:'What to avoid',points:['Assuming friends who help need no framework at all.','Paying volunteers small amounts without checking where employment begins.','Using templates without adapting them to local law.']}
 });
 add('110.hr-policies','es',{
  what:'Las políticas laborales fijan cómo tratas a las personas que trabajan contigo, con o sin pago. Necesitas algunas en cuanto alguien te ayuda, y la ley laboral exigirá más cuando contrates personal.',
  parts:{title:'Dos grupos, siempre separados',items:[
   {label:'Voluntariado',text:'Un marco más ligero pero real: funciones, gastos, supervisión, conducta y manejo de inquietudes.',example:'Los amigos que ayudan en el puesto de los sábados reciben una descripción de funciones y un formulario de gastos.'},
   {label:'Personal contratado',text:'Políticas que exige la ley: selección, pago, horario, licencias, quejas, disciplina, salud y seguridad.',example:'Antes de que empiecen los cuatro aprendices pagados: contratos, horario, licencias y normas de seguridad en cocina.'}]},
  why:{title:'Por qué importa temprano',points:['Documentos de voluntariado que parecen empleo pueden crear obligaciones legales.','Las reglas claras protegen a las personas y a la iniciativa.','Tener políticas antes de que llegue alguien evita improvisar.']},
  use:{title:'Dónde encaja',points:['Tus planes de personas del Módulo 4: selección, incorporación, pago y cultura.','Tu registro de políticas: responsable, fecha de revisión y detonante.','Revisiones de un asesor laboral local calificado.']},
  mistakes:{title:'Qué evitar',points:['Suponer que los amigos que ayudan no necesitan ningún marco.','Pagar pequeños montos a voluntarios sin revisar dónde empieza el empleo.','Usar plantillas sin adaptarlas a la ley local.']}
 });

 // 10.9 Writing usable procedures
 add('110.procedures','en',{
  what:'A procedure helps someone carry out a real task the same way every time. Every important policy needs at least one procedure showing how to apply it, even if only you do the task today.',
  parts:{title:'Four parts of a procedure',items:[
   {label:'Trigger and owner',text:'What starts the task, and who is responsible for it.',example:'When the youth centre refers a new trainee, the founder who leads trainee support starts onboarding.'},
   {label:'Steps',text:'The actions in order, written in plain language.',example:'Send the code of conduct, collect the signed form, book a first shift with a mentor.'},
   {label:'Records',text:'What is written down or kept as evidence.',example:'The signed form is filed in the trainee folder within a week.'},
   {label:'Exceptions',text:'What to do when things do not go as planned.',example:'If a trainee is 17, consent from a parent or carer comes before the first shift.'}]},
  why:{title:'Why write it down now',points:['Others will take over your tasks as you grow.','The same steps every time mean fewer mistakes and fairer treatment.','Funders and insurers may ask how you actually apply your policies.']},
  use:{title:'How you will test it',points:['Ask someone who did not write it to walk through it.','Note where they pause, guess or need permission, and fix those points.','Add urgent and safeguarding steps based on local advice and services.']},
  mistakes:{title:'What to avoid',points:['Keeping procedures in your head because you do the task yourself.','Treating a procedure as ready without testing it.','Writing emergency instructions without qualified local advice.']}
 });
 add('110.procedures','es',{
  what:'Un procedimiento ayuda a alguien a hacer una tarea real siempre de la misma forma. Cada política importante necesita al menos un procedimiento que muestre cómo aplicarla, aunque hoy solo tú hagas la tarea.',
  parts:{title:'Cuatro partes de un procedimiento',items:[
   {label:'Detonante y responsable',text:'Qué inicia la tarea y quién responde por ella.',example:'Cuando el centro juvenil deriva a un aprendiz nuevo, el fundador de apoyo a aprendices inicia la incorporación.'},
   {label:'Pasos',text:'Las acciones en orden, en lenguaje sencillo.',example:'Enviar el código de conducta, recoger el formulario firmado y agendar un primer turno con un mentor.'},
   {label:'Registros',text:'Lo que se anota o se guarda como respaldo.',example:'El formulario firmado se archiva en la carpeta de aprendices en una semana.'},
   {label:'Excepciones',text:'Qué hacer cuando algo no sale como estaba previsto.',example:'Si un aprendiz tiene 17 años, el consentimiento de madre, padre o tutor va antes del primer turno.'}]},
  why:{title:'Por qué escribirlo ya',points:['Otras personas asumirán tus tareas a medida que crezcas.','Los mismos pasos cada vez significan menos errores y un trato más justo.','Financiadores y aseguradoras pueden preguntar cómo aplicas tus políticas.']},
  use:{title:'Cómo lo probarás',points:['Pide a alguien que no lo escribió que lo recorra paso a paso.','Anota dónde duda, adivina o pide permiso, y corrige esos puntos.','Suma pasos de urgencia y salvaguarda basados en asesoría y servicios locales.']},
  mistakes:{title:'Qué evitar',points:['Guardar los procedimientos en tu cabeza porque haces tú la tarea.','Dar un procedimiento por listo sin probarlo.','Escribir instrucciones de emergencia sin asesoría local calificada.']}
 });

 // 10.10 Policy management and review
 add('110.lifecycle','en',{
  what:'Policy management is the simple cycle that keeps each policy approved, known, followed and up to date. Without it, even good policies stop protecting people.',
  parts:{title:'The policy cycle',items:[
   {label:'Draft and consult',text:'Write the policy, then ask the people it affects what is unclear or missing.',example:'The founders draft a trainee policy and ask two trainees what is unclear.'},
   {label:'Approve and share',text:'Approve it, share it, train people and collect acknowledgements.',example:'Each new trainee confirms reading the code of conduct during onboarding.'},
   {label:'Check and review',text:'Check it is followed, then review on schedule and after any big change.',example:'The bakery reviews safeguarding every year, and again after its first concern.'}]},
  why:{title:'Why the cycle matters',points:['Funders, regulators and insurers may ask what applied at a given time.','Out-of-date policies can mislead people when it matters most.','Acknowledgements show that people actually know the rules.']},
  use:{title:'What your register records',points:['Version, status, owner, approver, approval date and next review.','Who must acknowledge each policy, and where the current copy lives.','What changed and why at each review, with old versions archived.']},
  mistakes:{title:'What to avoid',points:['Deleting old versions instead of archiving them.','Reviewing only on schedule, not after incidents, law changes or registration.','Changing a policy without telling the people it affects.']}
 });
 add('110.lifecycle','es',{
  what:'Gestionar políticas es seguir un ciclo sencillo que mantiene cada política aprobada, conocida, cumplida y al día. Sin él, hasta las buenas políticas dejan de proteger a las personas.',
  parts:{title:'El ciclo de una política',items:[
   {label:'Redactar y consultar',text:'Escribe la política y pregunta a quienes afecta qué no está claro o qué falta.',example:'Los fundadores redactan una política para aprendices y preguntan a dos aprendices qué no está claro.'},
   {label:'Aprobar y compartir',text:'Apruébala, compártela, capacita y recoge las confirmaciones de lectura.',example:'Cada aprendiz nuevo confirma haber leído el código de conducta durante su incorporación.'},
   {label:'Verificar y revisar',text:'Verifica que se cumpla y revísala según el calendario y tras cada cambio grande.',example:'La panadería revisa la salvaguarda cada año, y otra vez tras su primera inquietud.'}]},
  why:{title:'Por qué importa el ciclo',points:['Financiadores, autoridades y aseguradoras pueden preguntar qué regía en cierta fecha.','Las políticas desactualizadas confunden justo cuando más importa.','Las confirmaciones muestran que la gente conoce las reglas.']},
  use:{title:'Qué anota tu registro',points:['Versión, estado, responsable, quién aprueba, fecha de aprobación y próxima revisión.','Quién debe confirmar cada política y dónde está la copia vigente.','Qué cambió y por qué en cada revisión, con versiones viejas archivadas.']},
  mistakes:{title:'Qué evitar',points:['Borrar versiones antiguas en vez de archivarlas.','Revisar solo por calendario, no tras incidentes, cambios de ley o el registro.','Cambiar una política sin avisar a quienes afecta.']}
 });

 // 10.11 Identifying and assessing risk
 add('110.risk-assess','en',{
  what:'A risk is something uncertain that could affect what you are building or harm people; an issue has already happened. Assessing a risk means describing it clearly and scoring how likely and how serious it is.',
  parts:{title:'Describe, then score',items:[
   {label:'Cause, event, consequence',text:'A clear chain, so your response can target the cause or reduce the harm.',example:'No equipment check → faulty oven used in the shared kitchen → burn injury and a claim.'},
   {label:'Likelihood × impact',text:'Score each from 1 to 5 and multiply: 15 or more is very high.',example:'Likely (4) × major (4) = 16, a very high risk.'},
   {label:'Inherent and residual',text:'Score first without controls, then with the controls you will have in place at launch.',example:'Inherent 16; with a checklist and training, residual 6.'}]},
  why:{title:'Why assess before launch',points:['Facing risks before launch costs far less than reacting after.','People closest to the work see risks that founders miss.','Scores support a conversation about priorities; they do not decide alone.']},
  use:{title:'Where to look for risks',points:['Your objectives and your Theory of Change assumptions.','Your activities, people, money, partners, data and legal map.','Your reputation, safety and the outside context.']},
  mistakes:{title:'What to avoid',points:['Vague risks like “funding”, with no cause or consequence.','Scoring alone instead of with co-founders and the people you serve.','Treating the score as the final judgement.']}
 });
 add('110.risk-assess','es',{
  what:'Un riesgo es algo incierto que podría afectar lo que construyes o dañar a personas; un problema ya ocurrió. Evaluar un riesgo es describirlo con claridad y puntuar qué tan probable y grave es.',
  parts:{title:'Describe y luego puntúa',items:[
   {label:'Causa, evento, consecuencia',text:'Una cadena clara, para que tu respuesta ataque la causa o reduzca el daño.',example:'Sin revisión de equipos → horno dañado en la cocina compartida → quemadura y reclamo.'},
   {label:'Probabilidad × impacto',text:'Puntúa cada uno de 1 a 5 y multiplica: 15 o más es muy alto.',example:'Probable (4) × mayor (4) = 16, un riesgo muy alto.'},
   {label:'Inherente y residual',text:'Puntúa primero sin controles y luego con los controles que tendrás al lanzar.',example:'Inherente 16; con lista de revisión y capacitación, residual 6.'}]},
  why:{title:'Por qué evaluar antes de lanzar',points:['Enfrentar riesgos antes de lanzar cuesta mucho menos que reaccionar después.','Quienes están cerca del trabajo ven riesgos que los fundadores no.','Los puntajes guían la conversación; no deciden solos.']},
  use:{title:'Dónde buscar riesgos',points:['Tus objetivos y los supuestos de tu Teoría de Cambio.','Tus actividades, personas, dinero, aliados, datos y mapa legal.','Tu reputación, la seguridad y el contexto externo.']},
  mistakes:{title:'Qué evitar',points:['Riesgos vagos como “financiamiento”, sin causa ni consecuencia.','Puntuar a solas en vez de con cofundadores y las personas que atiendes.','Tomar el puntaje como juicio final.']}
 });

 // 10.12 Risk registers, ownership, mitigation and escalation
 add('110.risk-register','en',{
  what:'A risk register keeps your risks, scores, owners, actions and review dates in one place. A new initiative might start with ten to fifteen risks and add more as it grows.',
  parts:{title:'Four ways to respond',items:[
   {label:'Avoid',text:'Stop or change the activity, so the risk no longer exists.',example:'The bakery drops night baking for trainees and keeps all training to daytime.'},
   {label:'Reduce',text:'Add controls that lower the likelihood or the impact.',example:'A safety checklist completed before every shift in the shared kitchen.'},
   {label:'Transfer',text:'Pass some of the impact to others through insurance or contracts.',example:'Public liability insurance covers claims if a customer is hurt at the stall.'},
   {label:'Accept',text:'Live with the risk, if it is within your risk appetite.',example:'The bakery accepts that a new recipe may not sell.'}]},
  why:{title:'Why owners and limits matter',points:['One owner per risk means someone actually acts on it.','Risk appetite shows where you can try new ideas and where you cannot.','Clear escalation means serious risks reach the right people fast.']},
  use:{title:'What you will set',points:['An owner for each risk, shared out across the founding team.','Your risk appetite: very low for safeguarding, legal and financial integrity.','Escalation rules: which scores go to both founders, an adviser and later a board.']},
  mistakes:{title:'What to avoid',points:['A register so long that nobody uses it.','One founder owning every risk.','Actions with no owner or due date.']}
 });
 add('110.risk-register','es',{
  what:'El registro de riesgos reúne en un solo lugar tus riesgos, puntajes, responsables, acciones y fechas de revisión. Una iniciativa nueva puede empezar con diez a quince riesgos y sumar más al crecer.',
  parts:{title:'Cuatro formas de responder',items:[
   {label:'Evitar',text:'Detén o cambia la actividad para que el riesgo deje de existir.',example:'La panadería descarta el horneado nocturno para aprendices y forma solo de día.'},
   {label:'Reducir',text:'Agrega controles que bajen la probabilidad o el impacto.',example:'Una lista de seguridad completada antes de cada turno en la cocina compartida.'},
   {label:'Transferir',text:'Pasa parte del impacto a otros mediante seguros o contratos.',example:'Un seguro de responsabilidad civil cubre reclamos si un cliente se lesiona en el puesto.'},
   {label:'Aceptar',text:'Convive con el riesgo, si está dentro de tu tolerancia.',example:'La panadería acepta que una receta nueva quizá no se venda.'}]},
  why:{title:'Por qué importan responsables y límites',points:['Un responsable por riesgo asegura que alguien actúe.','La tolerancia al riesgo muestra dónde puedes probar ideas y dónde no.','Un escalamiento claro lleva los riesgos graves a quien corresponde, rápido.']},
  use:{title:'Qué fijarás',points:['Un responsable por riesgo, repartidos en el equipo fundador.','Tu tolerancia: muy baja en salvaguarda, temas legales e integridad financiera.','Escalamiento: qué puntajes van a ambos fundadores, a un asesor y luego a una junta.']},
  mistakes:{title:'Qué evitar',points:['Un registro tan largo que nadie lo usa.','Un solo fundador a cargo de todos los riesgos.','Acciones sin responsable ni fecha.']}
 });

 // 10.13 Monitoring and reviewing risk
 add('110.risk-monitor','en',{
  what:'Monitoring risk means checking regularly whether your risks are growing, shrinking or new. In the early days risks change quickly, so reviews need to be frequent and linked to your work.',
  parts:{title:'Three monitoring habits',items:[
   {label:'Regular review',text:'High risks monthly, others quarterly, and the whole register once or twice a year.',example:'Each month the two founders spend ten minutes on their four high risks.'},
   {label:'Early warning signs',text:'Indicators that a risk is growing, watched before it happens.',example:'Cash below two months of runway, or fewer than four referrals for the next intake.'},
   {label:'Learning from issues',text:'When a risk happens, respond, then ask what the register missed.',example:'After a café paid late, the bakery adds a new risk about wholesale payment terms.'}]},
  why:{title:'Why keep watching',points:['Early risks change fast; an old register gives false comfort.','Warning signs give you time to act before harm is done.','Each review turns experience into learning while you build.']},
  use:{title:'Where it connects',points:['The meeting where each objective, partner or task is managed.','Your cash flow triggers and your management accounts.','Your issue log from Module 5, when a risk becomes real.']},
  mistakes:{title:'What to avoid',points:['Writing the register once and never looking at it again.','Discussing risks apart from the work they threaten.','Responding to an issue without updating the register.']}
 });
 add('110.risk-monitor','es',{
  what:'Dar seguimiento a los riesgos es revisar con regularidad si crecen, bajan o aparecen nuevos. Al inicio cambian rápido, así que las revisiones deben ser frecuentes y estar ligadas a tu trabajo.',
  parts:{title:'Tres hábitos de seguimiento',items:[
   {label:'Revisión regular',text:'Riesgos altos cada mes, los demás cada trimestre y todo el registro una o dos veces al año.',example:'Cada mes los dos fundadores dedican diez minutos a sus cuatro riesgos altos.'},
   {label:'Señales de alerta',text:'Indicadores de que un riesgo crece, vigilados antes de que ocurra.',example:'Caja por debajo de dos meses de margen, o menos de cuatro derivaciones para el próximo grupo.'},
   {label:'Aprender de los problemas',text:'Cuando un riesgo ocurre, responde y luego pregunta qué faltó en el registro.',example:'Tras un pago atrasado de una cafetería, la panadería agrega un riesgo sobre plazos de pago mayoristas.'}]},
  why:{title:'Por qué seguir mirando',points:['Al inicio los riesgos cambian rápido; un registro viejo da falsa calma.','Las señales de alerta te dan tiempo de actuar antes del daño.','Cada revisión convierte la experiencia en aprendizaje.']},
  use:{title:'Dónde se conecta',points:['La reunión donde se gestiona cada objetivo, aliado o tarea.','Tus alertas de flujo de caja y tus informes de gestión.','Tu registro de problemas del Módulo 5, cuando un riesgo se vuelve real.']},
  mistakes:{title:'Qué evitar',points:['Escribir el registro una vez y no volver a mirarlo.','Hablar de riesgos aparte del trabajo que amenazan.','Responder a un problema sin actualizar el registro.']}
 });
})();
