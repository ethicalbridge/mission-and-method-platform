import {pricing} from '../pricing-config.js';
import {softwareProducts} from '../products.js';
// A server-owned mapping for use AFTER verifying a successful provider event.
// This function alone creates no grants and does not establish payment or identity.
export function packageContents(offerId){
  const course={productId:pricing.course.productId,kind:'course',access:pricing.course.access};
  const suite=pricing.suite.toolSlugs.map(slug=>softwareProducts.find(p=>p.slug===slug)).filter(Boolean).map(p=>({productId:p.id,kind:'software'}));
  if(offerId==='course')return [course];
  if(offerId==='software')return suite;
  if(offerId==='bundle')return pricing.bundle.contents.flatMap(content=>content.productId===pricing.course.productId?[course]:content.productId===pricing.suite.productId?suite.map(item=>({...item,months:content.months})):[]);
  return [];
}
