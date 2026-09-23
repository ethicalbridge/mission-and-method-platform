import {invitationToolSlugs} from './products.js';

export const TOOL_ACCESS_STORAGE_KEY='mm.tool-access.v1';
export const invitationCodeIsValid=code=>String(code||'').trim()==='1234';
export const hasToolAccess=(storage=globalThis.localStorage)=>{
 try{return storage?.getItem(TOOL_ACCESS_STORAGE_KEY)==='granted';}catch{return false;}
};
export const grantToolAccess=(code,storage=globalThis.localStorage)=>{
 if(!invitationCodeIsValid(code))return false;
 try{storage?.setItem(TOOL_ACCESS_STORAGE_KEY,'granted');return true;}catch{return false;}
};
export const needsToolAccess=slug=>invitationToolSlugs.includes(slug);
