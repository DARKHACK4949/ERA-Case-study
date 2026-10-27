/**
 * Everything this page does at runtime: live token reads, the brand and mode
 * switch, the ratio counters and the one-shot entrance.
 *
 * Plain JS on purpose. It walks the DOM that the server component rendered
 * rather than owning any of it, so React never re-renders the page.
 *
 * Returns a cleanup function, because React runs effects twice in development
 * and a second observer or scroll listener would double the work.
 */
export default function init() {
  const cleanups = [];

  var root=document.documentElement, body=document.body;
    /* Exact chain, read off the generated stylesheet:
       light  --sem-primary-bg -> --brand-primary-roles-action      -> --colors-<ramp>-<step>
       dark   --sem-primary-bg -> --brand-primary-dark-roles-action -> --colors-<ramp>-dark-<step>
       Brand 2's action role sits on step 600, Brands 1 and 3 on 700. */
    var RAMP={'brand-1':'iris','brand-2':'cyan','brand-3':'jade'};
    var STEP={'brand-1':'700','brand-2':'600','brand-3':'700'};
    var FACE={'brand-1':'IBM Plex Sans','brand-2':'Geist','brand-3':'Source Sans 3'};

    function read(el,name){ return getComputedStyle(el).getPropertyValue(name).trim(); }

    var reduce=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches);

    /* The ratios are the argument of this page, so on a brand or mode change they
       count to the new value instead of snapping. One rAF per element, cancelled
       if another change lands first. */
    function countTo(el,to,suffix){
      if(el.__raf){ cancelAnimationFrame(el.__raf); el.__raf=0; }
      var from=parseFloat(el.textContent);
      if(reduce||!isFinite(from)||Math.abs(from-to)<0.01){ el.textContent=to.toFixed(2)+suffix; return; }
      var t0=performance.now(), dur=420;
      el.__raf=requestAnimationFrame(function step(t){
        var k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,3);
        el.textContent=(from+(to-from)*e).toFixed(2)+suffix;
        el.__raf = k<1 ? requestAnimationFrame(step) : 0;
      });
    }

    function lum(c){
      var m=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((c||'').trim()), r,g,b;
      if(m){ var h=m[1]; if(h.length===3) h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
        r=parseInt(h.slice(0,2),16); g=parseInt(h.slice(2,4),16); b=parseInt(h.slice(4,6),16);
      } else { var n=(c||'').match(/[\d.]+/g); if(!n||n.length<3) return null; r=+n[0]; g=+n[1]; b=+n[2]; }
      var f=function(v){ v/=255; return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4); };
      return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);
    }
    function ratio(a,b){
      var la=lum(a), lb=lum(b);
      if(la===null||lb===null) return null;
      return (Math.max(la,lb)+0.05)/(Math.min(la,lb)+0.05);
    }

    function paintChain(){
      var brand=root.getAttribute('data-brand'); if(!RAMP[brand]) brand='brand-1';
      var dark=root.getAttribute('data-theme')==='dark';
      var roleName='--brand-primary'+(dark?'-dark':'')+'-roles-action';
      var primName='--colors-'+RAMP[brand]+(dark?'-dark':'')+'-'+STEP[brand];

      var rc=document.querySelector('[data-role]');
      if(rc){ rc.textContent=roleName; rc.closest('.chain__row').querySelector('.val').setAttribute('data-token',roleName); }
      var pc=document.querySelector('[data-primitive]');
      if(pc){ pc.textContent=primName; pc.closest('.chain__row').querySelector('.val').setAttribute('data-token',primName); }

      document.querySelectorAll('.val').forEach(function(el){
        var v=read(root,el.getAttribute('data-token'));
        var sw=el.querySelector('i'), tx=el.querySelector('em');
        if(sw) sw.style.background=v;
        if(tx) tx.textContent=v||'not set';
      });

      var ramp=document.querySelector('[data-ramp]');
      if(ramp) ramp.textContent=RAMP[brand].charAt(0).toUpperCase()+RAMP[brand].slice(1);
      var face=document.querySelector('[data-face]'); if(face) face.textContent=FACE[brand];
      var rad=document.querySelector('[data-radius]'); if(rad) rad.textContent=read(root,'--brand-radius-roles-buttons-button-md');
      var onfill=document.querySelector('[data-onfill]');
      if(onfill){
        var fg=read(root,'--sem-primary-fg-on-bg');
        var L=lum(fg);
        onfill.textContent=(L!==null&&L>0.5?'White':'Near black')+(fg?' · '+fg:'');
      }
    }

    function paintRamp(){
      var dark=root.getAttribute('data-theme')==='dark';
      var surface=read(root,'--sem-bg-surface');
      document.querySelectorAll('.ramp__row').forEach(function(row){
        var step=row.getAttribute('data-step');
        var token='--brand-neutral'+(dark?'-dark':'')+'-'+step;
        var c=read(root,token);
        var sample=row.querySelector('.sample');
        sample.style.color=c;
        row.querySelector('.tok').textContent=token;
        var r=ratio(c,surface);
        var out=row.querySelector('.ratio'), v=row.querySelector('.verdict');
        if(r===null){ out.textContent=''; v.textContent=''; return; }
        countTo(out,r,':1');
        var pass=r>=4.5;
        v.textContent=pass?'Body text':'Borders only';
        v.setAttribute('data-pass',pass?'yes':'no');
      });
    }

    function paintFills(){
      var mode=root.getAttribute('data-theme');
      document.querySelectorAll('.fill').forEach(function(card){
        card.setAttribute('data-theme',mode); /* nested scope needs the mode re-declared on it */
        var bg=read(card,'--sem-primary-bg');
        var correct=read(card,'--sem-primary-fg-on-bg');
        var best=-1, bestEl=null;
        card.querySelectorAll('.fill__try').forEach(function(t){
          t.parentNode.style.background=bg;
          var fg=read(root,t.getAttribute('data-fg'));
          t.style.color=fg;
          var r=ratio(fg,bg);
          if(r) countTo(t.querySelector('b'),r,':1'); else t.querySelector('b').textContent='';
          t.removeAttribute('data-win');
          if(r&&r>best){ best=r; bestEl=t; }
        });
        if(bestEl) bestEl.setAttribute('data-win','yes');
        var L=lum(correct);
        var foot=card.querySelector('.fill__foot b');
        if(foot) foot.textContent=(L!==null&&L>0.5?'White':'Near black');
      });
    }

    function paint(){ paintChain(); paintRamp(); paintFills(); }

    document.querySelectorAll('.sw').forEach(function(b){
      b.addEventListener('pointerdown',function(){ /* respond on press, not release */
        root.setAttribute('data-brand',b.dataset.b);
        document.querySelectorAll('.sw').forEach(function(o){ o.setAttribute('aria-pressed',String(o===b)); });
        try{localStorage.setItem('era-cs-brand',b.dataset.b);}catch(e){}
        paint();
      });
    });

    var mode=document.getElementById('mode');
    function setMode(m){
      root.setAttribute('data-theme',m);
      mode.textContent=(m==='dark'?'Light':'Dark');
      try{localStorage.setItem('era-cs-mode',m);}catch(e){}
      paint();
    }
    mode.addEventListener('click',function(){ setMode(root.getAttribute('data-theme')==='dark'?'light':'dark'); });

    try{
      var sb=localStorage.getItem('era-cs-brand');
      if(sb&&RAMP[sb]){
        root.setAttribute('data-brand',sb);
        document.querySelectorAll('.sw').forEach(function(o){ o.setAttribute('aria-pressed',String(o.dataset.b===sb)); });
      }
      var sm=localStorage.getItem('era-cs-mode');
      if(sm==='dark'||sm==='light') setMode(sm);
    }catch(e){}

    var ticking=false;
    function onScroll(){
      if(ticking) return; ticking=true;
      requestAnimationFrame(function(){ body.setAttribute('data-scrolled',String(window.scrollY>8)); ticking=false; });
    }
    window.addEventListener('scroll',onScroll,{passive:true});
    cleanups.push(function(){ window.removeEventListener('scroll',onScroll); });

    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(paint);
    paint();

    /* ---------- entrance, one shot ---------- */
    var SEL='.hero .eyebrow,.hero h1,.hero .lede,.hero .meta,'
          + 'section > .eyebrow,section > h2,section > .body,section > h3,'
          + '.trio figure,.duo figure,.gallery figure,figure.wide,'
          + '.chain,.stats,.ramp__row,.fill,.mode,.bug,.spec,.links,.open';
    var items=[].slice.call(document.querySelectorAll(SEL));

    if(reduce||!('IntersectionObserver' in window)){
      items.forEach(function(el){ el.classList.add('in'); });
    } else {
      /* stagger within a group, so siblings arrive in sequence rather than together */
      var seen=new Map();
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(!e.isIntersecting) return;
          var el=e.target, parent=el.parentNode;
          var i=seen.get(parent)||0; seen.set(parent,i+1);
          el.style.transitionDelay=Math.min(i,4)*70+'ms';
          el.style.willChange='opacity,transform';
          el.classList.add('in');
          el.addEventListener('transitionend',function once(){
            el.style.willChange='';            /* stop paying for the layer */
            el.style.transitionDelay='';
            el.removeEventListener('transitionend',once);
          });
          io.unobserve(el);
        });
      },{rootMargin:'0px 0px -8% 0px',threshold:0.01});
      items.forEach(function(el){ io.observe(el); });
      cleanups.push(function(){ io.disconnect(); });
    }

  return function cleanup() {
    cleanups.forEach(function (fn) { try { fn(); } catch (e) {} });
  };
}
