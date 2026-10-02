import {pricing} from '../pricing-config.js';
import {softwareProducts} from '../products.js';
// A server-owned mapping for use AFTER verifying a successful provider event.
// This function alone creates no grants and does not establish payment or identity.
// Each of the five courses is its own course product; the full pathway grants all five.
export function packageContents(offerId){
  const course=c=>({productId:c.productId,kind:'course',access:c.access});
  const pathway=pricing.courses.map(course);
  const suite=pricing.suite.toolSlugs.map(slug=>softwareProducts.find(p=>p.slug===slug)).filter(Boolean).map(p=>({productId:p.id,kind:'software'}));
  const single=pricing.courses.find(c=>c.id===offerId);
  if(single)return [course(single)];
  if(offerId==='course')return pathway;
  if(offerId==='software')return suite;
  if(offerId==='bundle')return pricing.bundle.contents.flatMap(content=>content.productId===pricing.course.productId?pathway:content.productId===pricing.suite.productId?suite.map(item=>({...item,months:content.months})):[]);
  return [];
}
