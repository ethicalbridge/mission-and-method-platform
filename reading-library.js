const cards=[...document.querySelectorAll('.resource-card')];
const lessons=[...document.querySelectorAll('.library-lesson')];
const search=document.querySelector('#resource-search');
const filters=['module','type','level','tag'].map(name=>document.querySelector(`#${name}-filter`));
const count=document.querySelector('#library-count');
const empty=document.querySelector('#library-empty');
const apply=()=>{
 const term=search.value.trim().toLowerCase();
 const [module,type,level,tag]=filters.map(control=>control.value.toLowerCase());
 let shown=0;
 cards.forEach(card=>{const visible=(!term||card.dataset.search.includes(term))&&(!module||card.dataset.module===module)&&(!type||card.dataset.type.toLowerCase()===type)&&(!level||card.dataset.level.toLowerCase()===level)&&(!tag||card.dataset.tags.toLowerCase().includes(tag));card.hidden=!visible;if(visible)shown++;});
 lessons.forEach(lesson=>lesson.hidden=![...lesson.querySelectorAll('.resource-card')].some(card=>!card.hidden));
 count.textContent=`Showing ${shown} of ${cards.length} resources`;empty.hidden=shown!==0;
};
search.addEventListener('input',apply);filters.forEach(control=>control.addEventListener('change',apply));
document.querySelector('#clear-filters').addEventListener('click',()=>{search.value='';filters.forEach(control=>control.value='');history.replaceState(null,'',location.pathname);apply();search.focus();});
const initial=new URLSearchParams(location.search).get('module');if(initial&&filters[0].querySelector(`option[value="${CSS.escape(initial)}"]`)){filters[0].value=initial;apply();}
