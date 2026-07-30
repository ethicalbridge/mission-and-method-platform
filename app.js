document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('.nav-links').classList.toggle('open'));
function message(form,text){const el=form.querySelector('.form-message');el.textContent=text;form.reset()}
document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();message(e.currentTarget,'Thank you — your message has been saved for follow-up.')});
document.querySelector('#subscribe-form')?.addEventListener('submit',e=>{e.preventDefault();const email=new FormData(e.currentTarget).get('email');localStorage.setItem('builderSystemMember',email);message(e.currentTarget,'You are on the list. We will send your access details to '+email+'.')});
document.querySelectorAll('[data-subscribe]').forEach(b=>b.addEventListener('click',()=>location.href='subscribe.html'));
