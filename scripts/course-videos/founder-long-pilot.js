// Longer lesson videos (entrepreneurs): the `long` block adds scenes for what it is, its parts with examples,
// why it matters, how you will use it and what to avoid. Pilot: 1.7 Strategic objectives.
(function(){
 const add=(key,lang,long)=>{(window.LESSON_VIDEOS[key]||={})[lang]={...(window.LESSON_VIDEOS[key]?.[lang]||{}),long};};
 add('101.objectives','en',{
  what:'Strategic objectives are the few most important results you will work towards in your first years. They turn your mission into priorities: not the work you do, but what that work should achieve.',
  parts:{title:'Two kinds, kept apart',items:[
   {label:'External (ESO)',text:'The change you want for the people, community or environment you serve.',example:'ESO1: Position ourselves as the neighbourhood’s trusted bakery for fresh, affordable bread.'},
   {label:'Internal (ISO)',text:'What you must build inside to deliver that change: registration, team, money, systems, partners.',example:'ISO2: Sales cover our core costs within 18 months.'}]},
  why:{title:'Why they matter',points:['They decide where your limited time and money go first.','They give you a clear way to say no to good ideas that do not fit.','Funders, partners and co-founders can see what you are aiming for.']},
  use:{title:'What they guide',points:['Your Theory of Change: one pathway for each external objective.','Your plans and budget: every activity and cost points to an objective code.','Your indicators and reviews: you check progress against each objective.']},
  mistakes:{title:'What to avoid',points:['Too many: keep two to four external and three to five internal.','Writing activities ("run workshops") instead of results.','Inventing numbers you cannot support yet, or leaving an objective without an owner.']}
 });
 add('101.objectives','es',{
  what:'Los objetivos estratégicos son los pocos resultados más importantes que buscarás en tus primeros años. Convierten tu misión en prioridades: no el trabajo que haces, sino lo que ese trabajo debe lograr.',
  parts:{title:'Dos tipos, siempre separados',items:[
   {label:'Externos (OEE)',text:'El cambio que quieres para las personas, la comunidad o el entorno al que sirves.',example:'OEE1: Posicionarnos como la panadería de confianza del barrio, con pan fresco y accesible.'},
   {label:'Internos (OEI)',text:'Lo que debes construir por dentro para lograr ese cambio: registro, equipo, dinero, sistemas, aliados.',example:'OEI2: Las ventas cubren nuestros costos básicos en 18 meses.'}]},
  why:{title:'Por qué importan',points:['Deciden a dónde va primero tu tiempo y tu dinero, que son limitados.','Te dan una forma clara de decir no a buenas ideas que no encajan.','Financiadores, aliados y cofundadores ven hacia dónde apuntas.']},
  use:{title:'Qué guían',points:['Tu Teoría de Cambio: un camino para cada objetivo externo.','Tus planes y tu presupuesto: cada actividad y cada gasto apunta a un código.','Tus indicadores y revisiones: mides el avance de cada objetivo.']},
  mistakes:{title:'Qué evitar',points:['Demasiados: de dos a cuatro externos y de tres a cinco internos.','Escribir actividades ("hacer talleres") en lugar de resultados.','Inventar cifras que aún no puedes sostener, o dejar un objetivo sin responsable.']}
 });
})();
