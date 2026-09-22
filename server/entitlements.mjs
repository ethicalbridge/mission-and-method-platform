// Server-side policy kernel. Feed it grants from the trusted billing database,
// NEVER grants or identity claimed by a browser. This is not an auth service.
export function hasAccess({subject,product,grants,now=Date.now()}){
 if(!subject?.id||!product?.id||!Array.isArray(grants)||!Number.isFinite(now))return false;
 return grants.some(g=>{
  if(!g||typeof g!=='object')return false;
  if(g.userId!==subject.id||g.productId!==product.id)return false;
  if(product.kind==='course')return g.kind==='course'&&g.status==='purchased'&&!g.revokedAt;
  if(product.kind==='software')return g.kind==='software'&&g.status==='active'&&['monthly','annual'].includes(g.billing)&&Number.isFinite(Date.parse(g.startsAt))&&Date.parse(g.startsAt)<=now&&Number.isFinite(Date.parse(g.expiresAt))&&Date.parse(g.expiresAt)>now&&!g.revokedAt;
  return false;
 });
}
export function resourceAllowed({subject,resource,grants,now}){return Boolean(resource?.objectKey&&resource?.version&&resource?.status==='available'&&hasAccess({subject,product:{id:resource.courseId,kind:'course'},grants,now}));}
