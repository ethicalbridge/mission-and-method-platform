// Writes data.js for the video templates from course-data.js (titles, outputs, counts, hours).
// Includes the entrepreneurs' courses (ids entrepreneurs-*; module ids 100+, shown as their number `no`).
import {writeFileSync} from 'node:fs';
import {phases,founderPhases,courseModules,freeModules} from '../../course-data.js';
const data={};
for(const p of [...phases,...founderPhases]){const ms=courseModules(p);const ls=ms.flatMap(m=>m.lessons);
 data[p.id]={number:p.number,name:p.name,title:p.title,track:p.track,lessons:ls.length,hours:Math.round(ls.reduce((n,l)=>n+l.minutes,0)/60),
  modules:ms.map(m=>({id:m.id,no:m.no??m.id,title:m.title,output:m.output,free:freeModules.includes(m.id),lessons:m.lessons.map((l,i)=>({key:`${m.id}.${l.id}`,number:`${m.no??m.id}.${i+1}`,title:l.title,review:!!l.review}))}))};}
writeFileSync(new URL('./data.js',import.meta.url),'window.COURSE_DATA='+JSON.stringify(data,null,1)+';\n');
console.log('wrote data.js');
