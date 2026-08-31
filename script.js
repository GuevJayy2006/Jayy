const pages = [...document.querySelectorAll(".page")];
const navItems = [...document.querySelectorAll(".nav-item")];
const goButtons = [...document.querySelectorAll("[data-go]")];
const brand = document.querySelector(".brand");
let pageTransitionTimer;
const intro = document.getElementById("intro");

if(intro){
  const loaderPercent = intro.querySelector(".loader-percent");
  const loaderStatus = intro.querySelector(".loader-status");
  const loaderProgress = intro.querySelector(".loader-progress i");
  const loadingStarted = Date.now();
  const loadingDuration = 3900;

  const updateLoader = () => {
    const progress = Math.min(100, Math.max(1, Math.floor(((Date.now() - loadingStarted) / loadingDuration) * 100)));
    if(loaderPercent) loaderPercent.textContent = progress + "%";
    if(loaderProgress) loaderProgress.style.width = progress + "%";
    if(progress < 100){
      requestAnimationFrame(updateLoader);
    }else if(loaderStatus){
      loaderStatus.textContent = "Loading Complete";
      intro.classList.add("loading-complete");
    }
  };

  updateLoader();
}

setTimeout(() => {
  if(intro){
    intro.classList.add("is-hidden");
    setTimeout(() => intro.remove(), 900);
  }
}, 5200);

function showPage(id, updateHash = true){
  const target = document.getElementById(id) || document.getElementById("home");
  const current = pages.find(page => page.classList.contains("active"));
  if(current === target) return;

  clearTimeout(pageTransitionTimer);
  if(current){
    current.classList.remove("active");
    current.classList.add("page-exit");
  }
  navItems.forEach(item => item.classList.toggle("active", item.dataset.page === target.id));
  if(updateHash) history.replaceState(null, "", "#" + target.id);

  pageTransitionTimer = setTimeout(() => {
    pages.forEach(page => page.classList.remove("active", "page-exit"));
    target.classList.add("active");
    target.scrollTop = 0;
  }, current ? 280 : 0);
}

navItems.forEach(item => item.addEventListener("click", () => showPage(item.dataset.page)));
goButtons.forEach(btn => btn.addEventListener("click", () => showPage(btn.dataset.go)));
brand.addEventListener("click", e => { e.preventDefault(); showPage("home"); });

window.addEventListener("load", () => {
  const id = location.hash.replace("#","");
  if(id && document.getElementById(id)) showPage(id, false);
});

window.addEventListener("keydown", e => {
  if(["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) return;
  const index = pages.findIndex(p => p.classList.contains("active"));
  if(e.key === "ArrowRight") showPage(pages[(index+1)%pages.length].id);
  if(e.key === "ArrowLeft") showPage(pages[(index-1+pages.length)%pages.length].id);
});

const particles = document.getElementById("particles");
if(particles){
  for(let i=0;i<42;i++){
    const p=document.createElement("i");
    p.className="particle";
    p.style.left=Math.random()*100+"%";
    p.style.animationDuration=(7+Math.random()*12)+"s";
    p.style.animationDelay=(-Math.random()*15)+"s";
    p.style.opacity=(.15+Math.random()*.65);
    particles.appendChild(p);
  }
}

const glow=document.getElementById("cursorGlow");
window.addEventListener("pointermove", e=>{
  glow.style.left=e.clientX+"px";
  glow.style.top=e.clientY+"px";
});

document.querySelectorAll("a[href^='mailto:'],a[href^='tel:'],a[href^='https://'],a[href^='viber:']").forEach(a=>{
  a.addEventListener("click", ()=> {
    a.style.textShadow="0 0 20px #f03";
    setTimeout(()=>a.style.textShadow="",400);
  });
});
