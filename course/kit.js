// Shared builders for course content. Teaching content is original; examples are fictional and illustrative.
// Every lesson ("section") carries three learning assets: information (learn), an Excel sheet and a video slot.
// video: null shows a "video coming soon" slot; set it to a YouTube/Vimeo/MP4 URL once recorded.
export const STAGES=['Understand','Design','Implement','Manage','Review'];
export const field=(key,label,hint)=>({key,label,hint});
export const lesson=o=>({minutes:20,tools:[],video:null,stage:'Design',...o});
export const review=(id,title,o={})=>({id,title,review:true,minutes:15,tools:[],video:null,stage:'Review',...o});
export const module=o=>({uses:[],video:null,...o});
