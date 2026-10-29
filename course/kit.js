// Shared builders for course content. Teaching content is original; examples are fictional and illustrative.
// Every lesson ("section") carries three learning assets: information (learn), an Excel sheet and a video slot.
// video: null shows a "video coming soon" slot; set it to a YouTube/Vimeo/MP4 URL once recorded.
export const STAGES=['Understand','Design','Implement','Manage','Review'];
export const field=(key,label,hint)=>({key,label,hint});
export const lesson=o=>({minutes:20,tools:[],video:null,stage:'Design',...o});
// Every module review (and entrepreneurs' recap, copied from it) ends with the same three synthesis prompts.
// The answers save with the review lesson and appear in Your Organisation; they are optional.
export const SYNTHESIS=[
 {key:'_disagree',label:'Where do your answers disagree?',hint:'Read this module’s answers side by side. Where does one answer pull against another, or against what colleagues, partners or the people you serve have told you?'},
 {key:'_assumption',label:'What is still an assumption?',hint:'What you believe but have not yet checked, and how and when you could test it.'},
 {key:'_share',label:'Who will you share this with, and by when?',hint:'Name the people (a co-founder, colleagues, your board, an adviser or partner) and a date.'}
];
export const review=(id,title,o={})=>({id,title,review:true,minutes:15,tools:[],video:null,stage:'Review',synthesis:SYNTHESIS,...o});
export const module=o=>({uses:[],video:null,...o});
