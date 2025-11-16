
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js').catch(()=>{});
}

document.addEventListener('DOMContentLoaded', ()=>{
  const splash = document.getElementById('splash');
  const pages = document.querySelectorAll('.md-page');
  const navs = document.querySelectorAll('.md-nav');
  const fab = document.getElementById('fab');
  const toast = document.getElementById('toast');
  const themeToggle = document.getElementById('themeToggle');
  const main = document.getElementById('main');

  // Splash
  setTimeout(()=>{ splash.style.display='none'; }, 800);

  function showPage(id){
    pages.forEach(p=> p.classList.toggle('active', p.id===id));
    navs.forEach(n=> n.classList.toggle('active', n.dataset.target===id));
    main.scrollTop = 0;
  }

  navs.forEach(n=> n.addEventListener('click', ()=> showPage(n.dataset.target)));

  // internal links
  document.querySelectorAll('.scroll-link').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const href = a.getAttribute('href').replace('#','');
      showPage('home');
      setTimeout(()=>{ const el=document.getElementById(href); if(el) el.scrollIntoView({behavior:'smooth', block:'start'}); }, 200);
    });
  });

  // theme toggle
  function setTheme(dark){
    document.body.classList.toggle('md-dark', dark);
    localStorage.setItem('md-dark', dark ? '1' : '0');
  }
  setTheme(localStorage.getItem('md-dark') === '1');
  themeToggle.addEventListener('click', ()=> setTheme(!(localStorage.getItem('md-dark') === '1')));

  // fab click
  fab.addEventListener('click', ()=> showToast('سلام! چگونه کمک کنم؟'));

  function showToast(text, time=2500){
    toast.textContent = text; toast.style.display='block'; toast.style.opacity='1';
    setTimeout(()=>{ toast.style.opacity='0'; setTimeout(()=> toast.style.display='none',300); }, time);
  }

  // contact form
  const form = document.getElementById('contactForm');
  form && form.addEventListener('submit', e=>{
    e.preventDefault();
    const fd = new FormData(form);
    if(!fd.get('name')||!fd.get('email')||!fd.get('message')){ showToast('لطفا همه فیلدها را پر کنید.'); return; }
    showToast('پیام با موفقیت ارسال شد (نسخه دمو).');
    form.reset();
  });
});
