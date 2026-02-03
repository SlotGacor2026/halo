let page=1, perPage=20;

function initSlots(){ renderPage(1); }

function renderPage(p){
  page=p;
  const grid=document.getElementById('gameGrid');
  grid.innerHTML='';
  const start=(p-1)*perPage;
  GAMES.slice(start,start+perPage).forEach(g=>{
    const d=document.createElement('div');
    d.className='game-card gold';
    d.innerHTML=`
      <img data-src="../assets/thumbnails/${g.img}"
           src="../assets/thumbnails/placeholder.png"
           class="lazy">
      <b>${g.name}</b>
      <small>${g.provider}</small>
      <button onclick="spin()">SPIN</button>`;
    grid.appendChild(d);
  });
  lazyLoad();
  renderPagination();
}

function renderPagination(){
  const p=document.getElementById('pagination');
  p.innerHTML='';
  const total=Math.ceil(GAMES.length/perPage);
  for(let i=1;i<=total;i++){
    const b=document.createElement('button');
    b.textContent=i;
    b.onclick=()=>renderPage(i);
    if(i===page) b.className='active';
    p.appendChild(b);
  }
}

function lazyLoad(){
  const imgs=document.querySelectorAll('.lazy');
  const obs=new IntersectionObserver(e=>{
    e.forEach(x=>{
      if(x.isIntersecting){
        x.target.src=x.target.dataset.src;
        obs.unobserve(x.target);
      }
    });
  });
  imgs.forEach(i=>obs.observe(i));
  }
