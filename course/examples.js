// The five fictional example organisations used across Course 1. Every lesson's gallery shows how each of them
// completes that lesson's exercise, so a learner can follow the one closest to their own organisation.
// Story and consistency notes: docs/example-organisations.md.
export const exampleOrgs=[
 {id:'idea',name:'Tide Line Youth Collective',label:'Community group · idea stage',place:'Indonesia'},
 {id:'ngo',name:'Imara Girls in Science',label:'Registered nonprofit · delivering',place:'Kenya'},
 {id:'social',name:'Pan del Barrio',label:'Social enterprise · company',place:'Peru'},
 {id:'coop',name:'Vanita Weavers Cooperative',label:'Cooperative · member-owned',place:'India'},
 {id:'hybrid',name:'Riverside Repair Hub',label:'Hybrid · charity with a trading company',place:'United Kingdom'},
 // Entrepreneurs track (Idea into Impact): founders with only an idea. Story: docs/idea-into-impact.md
 {id:'huerta',name:'Huerta Viva',label:'Social business idea',place:'Colombia'},
 {id:'mentors',name:'Next Step Mentors',label:'Volunteer project · solo founder',place:'Ghana'}
];
export const exampleOrg=id=>exampleOrgs.find(o=>o.id===id);
