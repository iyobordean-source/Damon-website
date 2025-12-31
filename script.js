// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('prefers-theme');
if(savedTheme){
  if(savedTheme==='dark') body.classList.add('dark');
  themeToggle.setAttribute('aria-pressed', body.classList.contains('dark'));
  themeToggle.textContent = body.classList.contains('dark')?'☀️':'🌙';
}
themeToggle.addEventListener('click',()=>{
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeToggle.setAttribute('aria-pressed',isDark);
  themeToggle.textContent = isDark?'☀️':'🌙';
  localStorage.setItem('prefers-theme',isDark?'dark':'light');
});

// Loader
const loader = document.getElementById('loader');
window.addEventListener('load',()=>{
  setTimeout(()=>{
    loader.style.opacity='0';
    loader.style.pointerEvents='none';
    setTimeout(()=>loader.remove(),500);
  },650);
});

// Scroll to top
const toTop = document.getElementById('toTop');
window.addEventListener('scroll',()=>{
  toTop.style.display = window.scrollY>420?'flex':'none';
});
toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click',()=>{navMenu.classList.toggle('show');});

// Contact form handler
function handleContact(e){
  e.preventDefault();
  const f=e.target;
  const name=encodeURIComponent(f.name.value);
  const email=encodeURIComponent(f.email.value);
  const message=encodeURIComponent(f.message.value);
  const method=document.getElementById('sendMethod').value;

  if(method==='email'){
    const mailtoLink=`mailto:iyobordean@gmail.com?subject=Message from ${name}&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    window.location.href=mailtoLink;
  } else if(method==='whatsapp'){
    const waLink=`https://wa.me/2347043400958?text=Hi, my name is ${name}. ${message}`;
    window.open(waLink,'_blank');
  }
  f.reset();
}
