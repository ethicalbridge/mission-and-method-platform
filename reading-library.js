const cards=[...document.querySelectorAll('.resource-card')];
const lessons=[...document.querySelectorAll('.library-lesson')];
const search=document.querySelector('#resource-search');
const filters=['module','type','level','tag','course'].map(name=>document.querySelector(`#${name}-filter`)).map(c=>c||{value:'',addEventListener(){},querySelector(){return null}});
const count=document.querySelector('#library-count');
const empty=document.querySelector('#library-empty');
const apply=()=>{
 const term=search.value.trim().toLowerCase();
 const [module,type,level,tag,course]=filters.map(control=>control.value.toLowerCase());
 let shown=0;
 cards.forEach(card=>{const visible=(!term||card.dataset.search.includes(term))&&(!module||card.dataset.module===module)&&(!course||card.dataset.course===course)&&(!type||card.dataset.type.toLowerCase()===type)&&(!level||card.dataset.level.toLowerCase()===level)&&(!tag||card.dataset.tags.toLowerCase().includes(tag));card.hidden=!visible;if(visible)shown++;});
 lessons.forEach(lesson=>lesson.hidden=![...lesson.querySelectorAll('.resource-card')].some(card=>!card.hidden));
 count.textContent=`Showing ${shown} of ${cards.length} resources`;empty.hidden=shown!==0;
};
search.addEventListener('input',apply);filters.forEach(control=>control.addEventListener('change',apply));
document.querySelector('#clear-filters').addEventListener('click',()=>{search.value='';filters.forEach(control=>control.value='');history.replaceState(null,'',location.pathname);apply();search.focus();});
const params=new URLSearchParams(location.search);const initial=params.get('module');if(initial&&filters[0].querySelector(`option[value="${CSS.escape(initial)}"]`)){filters[0].value=initial;apply();}
const initialCourse=params.get('course');if(initialCourse&&filters[4].querySelector(`option[value="${CSS.escape(initialCourse)}"]`)){filters[4].value=initialCourse;apply();}
// Choosing a course narrows the module list to that course's modules.
const courseControl=document.querySelector('#course-filter');if(courseControl)courseControl.addEventListener('change',()=>{[...filters[0].options].forEach(o=>{o.hidden=!!(courseControl.value&&o.value&&o.dataset.course!==courseControl.value);});if(filters[0].selectedOptions[0]?.hidden){filters[0].value='';apply();}});
