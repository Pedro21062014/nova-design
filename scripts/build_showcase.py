#!/usr/bin/env python3
"""
Nova Vitral - showcase site builder.

Generates examples-sites/: one hub page plus five page pairs.
  nova-0N-*.html     built with the Nova Vitral design system (spec compliant)
  generic-0N-*.html  the same brief built with the anti-patterns of spec 9.5 on purpose

Every file is fully self-contained (inline CSS and JS, no external requests) so the pages render
correctly in sandboxed previews and offline.

Usage:
    python3 scripts/build_showcase.py
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "examples-sites"

BRAND = "Meridian"

# ----------------------------------------------------------------------------- shared Nova CSS
NOVA_CSS = """
:root{
  --bg:#06070c; --bg-soft:#0a0c14; --bg-elev:#0e1120;
  --fg:#f5f7ff; --fg-muted:#a8b0c8; --fg-subtle:#6b7490;
  --glass:rgba(255,255,255,.055); --glass-strong:rgba(255,255,255,.09); --glass-dim:rgba(255,255,255,.03);
  --hair:rgba(255,255,255,.10); --hair-strong:rgba(255,255,255,.18); --hair-soft:rgba(255,255,255,.06);
  --accent:#7c8cff; --accent-2:#62e9d6; --warn:#f5b544; --danger:#ff6b81;
  --aurora-1:rgba(124,140,255,.26); --aurora-2:rgba(98,233,214,.18); --aurora-3:rgba(122,162,255,.18);
  --grad-primary:linear-gradient(135deg,#8a97ff 0%,#6a78f0 100%);
  --r-sm:10px; --r:16px; --r-lg:24px; --r-xl:32px;
  --ease:cubic-bezier(.16,1,.3,1);
  --shadow-2:0 12px 32px -12px rgba(0,0,0,.55);
  --shadow-3:0 32px 80px -24px rgba(0,0,0,.7);
  --nav-h:64px;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{
  margin:0; background:var(--bg); color:var(--fg);
  font:400 16px/1.65 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  letter-spacing:-0.005em; text-rendering:optimizeLegibility;
}
h1,h2,h3,h4,p,ul,ol,figure,blockquote,dl,dd{margin:0}
ul,ol{padding:0;list-style:none}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
img,svg{display:block;max-width:100%}
:focus-visible{outline:2px solid var(--accent); outline-offset:2px; border-radius:6px}

.aurora{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none}
.aurora i{position:absolute;display:block;border-radius:50%;filter:blur(120px)}
.aurora i:nth-child(1){top:-22%;left:-12%;width:70vmax;height:70vmax;background:radial-gradient(circle at 30% 30%,var(--aurora-1),transparent 62%)}
.aurora i:nth-child(2){top:6%;right:-16%;width:56vmax;height:56vmax;background:radial-gradient(circle at 60% 40%,var(--aurora-3),transparent 60%)}
.aurora i:nth-child(3){bottom:-26%;left:20%;width:60vmax;height:60vmax;background:radial-gradient(circle at 50% 50%,var(--aurora-2),transparent 58%)}
.grain{position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.035;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")}

.wrap{width:100%;max-width:1200px;margin:0 auto;padding:0 20px}
.wide{max-width:1400px}
.vitral{position:relative;background:var(--glass);border-radius:var(--r-lg);
  -webkit-backdrop-filter:blur(18px) saturate(140%);backdrop-filter:blur(18px) saturate(140%);
  box-shadow:var(--shadow-2),inset 0 1px 0 rgba(255,255,255,.10);isolation:isolate}
.vitral::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;
  background:linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,.04));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.vitral-strong{position:relative;background:var(--glass-strong);border-radius:var(--r-lg);
  -webkit-backdrop-filter:blur(32px) saturate(150%);backdrop-filter:blur(32px) saturate(150%);
  box-shadow:var(--shadow-3),inset 0 1px 0 rgba(255,255,255,.10);isolation:isolate}
.vitral-strong::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;
  background:linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,.04));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.inset{border:1px solid var(--hair-soft);background:var(--glass-dim);border-radius:var(--r)}
.grad-text{background:linear-gradient(180deg,rgba(255,255,255,.98),rgba(255,255,255,.6));
  -webkit-background-clip:text;background-clip:text;color:transparent}

.pill{display:inline-flex;align-items:center;gap:8px;height:30px;padding:0 12px;border-radius:999px;
  border:1px solid var(--hair);background:var(--glass);font-size:12px;color:var(--fg-muted)}
.pill .dot{width:6px;height:6px;border-radius:50%;background:var(--accent-2)}
.chip{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 9px;border-radius:999px;
  border:1px solid var(--hair);background:var(--glass);font-size:11px;letter-spacing:.06em;
  text-transform:uppercase;color:var(--fg-muted)}
.chip.live{border-color:rgba(98,233,214,.3);background:rgba(98,233,214,.12);color:var(--accent-2)}
.chip.warn{border-color:rgba(245,181,68,.3);background:rgba(245,181,68,.12);color:var(--warn)}
.chip.danger{border-color:rgba(255,107,129,.3);background:rgba(255,107,129,.12);color:var(--danger)}

.btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:8px;
  height:40px;padding:0 20px;border:0;border-radius:var(--r);font-size:14px;font-weight:500;cursor:pointer;
  transition:transform .14s var(--ease),background-color .14s var(--ease),box-shadow .14s var(--ease),border-color .14s var(--ease)}
.btn:active{transform:scale(.98)}
.btn-primary{background-image:var(--grad-primary);color:#fff;box-shadow:var(--shadow-2)}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 12px 40px -12px rgba(124,140,255,.45)}
.btn-glass{background:var(--glass);border:1px solid var(--hair);color:var(--fg);
  -webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.btn-glass:hover{background:var(--glass-strong);border-color:var(--hair-strong)}
.btn-ghost{background:transparent;color:var(--fg-muted)}
.btn-ghost:hover{background:var(--glass);color:var(--fg)}
.btn-sm{height:32px;padding:0 14px;font-size:13px;border-radius:var(--r-sm)}
.btn-lg{height:48px;padding:0 26px;font-size:15px}
.btn[disabled]{opacity:.45;pointer-events:none}

.overline{font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--fg-subtle)}
.lead{font-size:clamp(17px,1.6vw,19px);line-height:1.6;color:var(--fg-muted)}
.muted{color:var(--fg-muted)}
.subtle{color:var(--fg-subtle)}
.small{font-size:13px}
.tiny{font-size:11px}
.mono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}

nav.top{position:sticky;top:0;z-index:50;height:var(--nav-h);
  border-bottom:1px solid var(--hair);background:color-mix(in srgb,var(--bg) 74%,transparent);
  -webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}
nav.top .wrap{display:flex;height:100%;align-items:center;justify-content:space-between;gap:16px}
.brand{display:flex;align-items:center;gap:9px;font-size:14px;font-weight:600}
.brand .mark{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;
  border:1px solid var(--hair);background:var(--glass)}
.navlinks{display:none;gap:2px}
@media(min-width:840px){.navlinks{display:flex}}
.navlinks a{padding:8px 12px;border-radius:var(--r-sm);font-size:14px;color:var(--fg-muted);transition:color .14s var(--ease)}
.navlinks a:hover{color:var(--fg)}
.navlinks a[aria-current=page]{color:var(--fg)}

section{padding:96px 0}
section.tight{padding:56px 0}
@media(max-width:768px){section{padding:64px 0}}
.sec-head{max-width:62ch}
.sec-head h2{margin-top:12px;font-size:clamp(28px,3.5vw,40px);font-weight:600;letter-spacing:-.025em;line-height:1.12}
.sec-head p{margin-top:14px;font-size:17px;color:var(--fg-muted)}
.grid{display:grid;gap:16px}
.g2{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}
.g3{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.g4{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.between{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.card{padding:24px}
.card h3{font-size:18px;font-weight:600;letter-spacing:-.015em}
.card p{margin-top:8px;font-size:14px;color:var(--fg-muted)}
.stat .label{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--fg-subtle)}
.stat .value{margin-top:12px;font-size:clamp(28px,3vw,36px);font-weight:600;letter-spacing:-.03em;
  font-variant-numeric:tabular-nums}
.stat .delta{margin-top:8px;font-size:13px;color:var(--accent-2);font-variant-numeric:tabular-nums}
.divider{height:1px;background:var(--hair-soft);border:0;margin:0}
table{width:100%;border-collapse:collapse;font-size:14px}
thead th{position:sticky;top:var(--nav-h);z-index:5;background:color-mix(in srgb,var(--bg-soft) 88%,transparent);
  -webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);text-align:left;padding:12px 16px;
  font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--fg-subtle)}
tbody td{padding:14px 16px;border-top:1px solid var(--hair-soft);color:var(--fg-muted)}
tbody tr:hover td{background:var(--glass-dim)}
td.num{text-align:right;font-variant-numeric:tabular-nums;color:var(--fg)}
.seg{display:inline-flex;gap:4px;padding:4px;border-radius:999px}
.seg button{height:30px;padding:0 14px;border:0;border-radius:999px;background:transparent;color:var(--fg-subtle);font-size:13px;font-weight:500;cursor:pointer;transition:background-color .14s var(--ease),color .14s var(--ease)}
.seg button:hover{color:var(--fg-muted)}
.seg button[aria-selected=true]{background:var(--glass-strong);color:var(--fg)}
.split{display:grid;gap:16px;grid-template-columns:minmax(0,2fr) minmax(0,1fr)}
.docs-grid{display:grid;gap:32px;grid-template-columns:260px minmax(0,1fr) 220px;padding-top:40px}
@media(max-width:1140px){.docs-grid{grid-template-columns:240px minmax(0,1fr)}.docs-grid aside:last-child{display:none}}
@media(max-width:880px){.split{grid-template-columns:1fr}.docs-grid{grid-template-columns:1fr}.docs-grid aside:first-child{display:none}}
.bar{height:4px;border-radius:999px;background:var(--glass-dim);overflow:hidden}
.bar > i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,var(--accent),var(--accent-2))}
details{border-bottom:1px solid var(--hair-soft)}
details summary{display:flex;align-items:center;justify-content:space-between;gap:16px;cursor:pointer;
  padding:20px 4px;font-size:16px;font-weight:500;list-style:none}
details summary::-webkit-details-marker{display:none}
details summary::after{content:"+";color:var(--fg-subtle)}
details[open] summary::after{content:"\\2212"}
details .body{padding:0 4px 20px;font-size:14px;color:var(--fg-muted);max-width:68ch}
footer{border-top:1px solid var(--hair);padding:56px 0 40px;margin-top:24px}
.side{display:grid;gap:4px}
.side a{display:flex;align-items:center;gap:10px;height:36px;padding:0 12px;border-radius:var(--r-sm);
  font-size:14px;color:var(--fg-muted)}
.side a:hover{background:var(--glass);color:var(--fg)}
.side a[aria-current=page]{background:var(--glass-strong);color:var(--fg);position:relative}
.side a[aria-current=page]::before{content:"";position:absolute;left:0;width:2px;height:16px;border-radius:2px;background:var(--accent)}
.app{display:grid;grid-template-columns:264px minmax(0,1fr);min-height:100vh}
@media(max-width:900px){.app{grid-template-columns:1fr}.app aside{display:none}}
.app aside{border-right:1px solid var(--hair);padding:16px 12px;
  background:color-mix(in srgb,var(--bg-soft) 70%,transparent)}
.topbar{display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px;
  padding:0 24px;border-bottom:1px solid var(--hair);position:sticky;top:0;z-index:40;
  background:color-mix(in srgb,var(--bg) 78%,transparent);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}
.content{padding:28px 24px 80px}
.avatar{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;font-size:12px;font-weight:500;
  color:#fff;background:linear-gradient(135deg,hsl(222 42% 54%),hsl(222 46% 40%))}
.msg-user{margin-left:auto;max-width:68%;padding:14px 16px;border-radius:var(--r-lg) var(--r-lg) var(--r-sm) var(--r-lg);
  border:1px solid var(--hair);background:var(--glass-strong);font-size:15px}
.msg-ai{max-width:72ch;font-size:15.5px;line-height:1.7}
.msg-ai p + p{margin-top:14px}
.msg-ai ul{margin-top:14px;display:grid;gap:8px}
.msg-ai li{display:flex;gap:10px;color:var(--fg-muted)}
.msg-ai li::before{content:"";margin-top:9px;width:5px;height:5px;border-radius:50%;background:var(--accent);flex:0 0 auto}
.composer{position:sticky;bottom:16px;padding:12px;border-radius:var(--r-lg)}
.composer textarea{width:100%;min-height:52px;resize:none;border:0;background:transparent;outline:none;
  font-size:15.5px;line-height:1.6}
.composer .toolbar{display:flex;align-items:center;gap:8px;margin-top:6px}
.send{display:grid;place-items:center;width:32px;height:32px;border:0;border-radius:50%;cursor:pointer;
  background-image:var(--grad-primary);color:#fff}
.code{border:1px solid var(--hair);border-radius:var(--r);background:color-mix(in srgb,var(--bg-elev) 80%,transparent);overflow:hidden}
.code header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;
  border-bottom:1px solid var(--hair-soft);font-size:12px;color:var(--fg-subtle)}
.code pre{margin:0;padding:16px 18px;overflow:auto;font-family:ui-monospace,Menlo,monospace;font-size:13px;line-height:1.7;color:var(--fg-muted)}
.callout{display:flex;gap:14px;padding:16px;border-radius:var(--r);border:1px solid var(--hair-soft);
  background:var(--glass-dim);border-left:2px solid var(--accent)}
.callout p{font-size:14px;color:var(--fg-muted)}
.toc a{display:block;padding:6px 0 6px 14px;font-size:13px;color:var(--fg-subtle);border-left:1px solid var(--hair)}
.toc a.active{color:var(--fg);border-left-color:var(--accent);border-left-width:2px}
.banner{display:flex;align-items:center;justify-content:center;gap:10px;padding:8px 16px;font-size:12px;
  color:var(--fg-muted);background:var(--bg-soft);border-bottom:1px solid var(--hair-soft)}
.banner a{color:var(--accent);text-decoration:underline;text-underline-offset:3px}
.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:80;display:flex;align-items:center;
  gap:10px;padding:10px 14px;border-radius:999px;font-size:13px;background:var(--glass-strong);
  border:1px solid var(--hair);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}

[data-reveal]{opacity:0;transform:translateY(16px);
  transition:opacity .76s var(--ease),transform .76s var(--ease);transition-delay:var(--d,0ms)}
[data-reveal].in{opacity:1;transform:none}
@media(max-width:600px){.banner{flex-direction:column;text-align:center}}
@media(prefers-reduced-motion:reduce){
  *{animation:none!important;transition:none!important}
  [data-reveal]{opacity:1!important;transform:none!important}
}
"""

NOVA_JS = """
<script>
(function(){
  var els=document.querySelectorAll('[data-reveal]');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{rootMargin:'0px 0px -12% 0px',threshold:.25});
  els.forEach(function(e,i){ if(!e.style.getPropertyValue('--d')) e.style.setProperty('--d',Math.min(i*60,360)+'ms'); io.observe(e); });

  document.querySelectorAll('[data-count]').forEach(function(el){
    var target=parseFloat(el.getAttribute('data-count')),suffix=el.getAttribute('data-suffix')||'',dec=parseInt(el.getAttribute('data-dec')||'0',10);
    var io2=new IntersectionObserver(function(en){
      en.forEach(function(e){ if(!e.isIntersecting) return; io2.unobserve(e.target);
        if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=target.toLocaleString(undefined,{minimumFractionDigits:dec,maximumFractionDigits:dec})+suffix;return;}
        var t0=performance.now();
        (function tick(t){var p=Math.min((t-t0)/1200,1);var v=target*(1-Math.pow(1-p,3));
          el.textContent=v.toLocaleString(undefined,{minimumFractionDigits:dec,maximumFractionDigits:dec})+suffix;
          if(p<1) requestAnimationFrame(tick);})(t0);
      });
    },{threshold:.5});
    io2.observe(el);
  });

  document.querySelectorAll('[data-toast]').forEach(function(b){
    b.addEventListener('click',function(){
      var t=document.createElement('div');t.className='toast';t.setAttribute('role','status');
      t.textContent='Link copied';document.body.appendChild(t);
      setTimeout(function(){t.remove();},1600);
    });
  });

  var toggle=document.querySelector('[data-toggle="billing"]');
  if(toggle){ toggle.addEventListener('click',function(e){
      var btn=e.target.closest('button'); if(!btn) return;
      var annual=btn.dataset.mode==='annual';
      toggle.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-selected',String(b===btn))});
      document.querySelectorAll('[data-monthly]').forEach(function(el){
        el.textContent = annual ? el.dataset.annual : el.dataset.monthly;
      });
      document.querySelectorAll('[data-period]').forEach(function(el){
        el.textContent = annual ? 'per month, billed yearly' : 'billed monthly';
      });
  });}
})();
</script>
"""

# ----------------------------------------------------------------------------- shared generic CSS
GENERIC_CSS = """
*{box-sizing:border-box}
body{margin:0;font:400 17px/1.5 Verdana,Geneva,sans-serif;color:#fff;text-align:center;
  background:linear-gradient(135deg,#7b2ff7 0%,#4f46e5 45%,#06b6d4 100%);background-attachment:fixed}
h1,h2,h3,ul,ol,p{margin:0}
ul,ol{padding:0;list-style:none}
a{color:#ffe600;text-decoration:underline}
.wrap{max-width:1000px;margin:0 auto;padding:14px}
.badbar{background:#ff0055;color:#fff;padding:10px 14px;font-size:13px;text-align:center;
  position:sticky;top:0;z-index:99;box-shadow:0 8px 24px rgba(0,0,0,.5)}
.badbar b{text-transform:uppercase}
.hero{padding:56px 12px 40px}
.hero h1{font-size:56px;line-height:1.05;text-shadow:0 4px 24px rgba(0,0,0,.6);
  background:linear-gradient(90deg,#ffe600,#ff00e0,#00fff0);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero p{margin-top:18px;font-size:18px;color:#ffd9ff}
.btn{display:inline-block;margin:22px 6px 0;padding:16px 30px;border:0;border-radius:999px;cursor:pointer;
  font-size:17px;font-weight:700;color:#fff;background:linear-gradient(90deg,#ff0055,#ff9d00);
  box-shadow:0 0 26px rgba(255,0,85,.9),0 10px 30px rgba(0,0,0,.5);transition:all .35s ease}
.btn:hover{transform:scale(1.08) rotate(-1.2deg)}
.btn.secondary{background:linear-gradient(90deg,#00fff0,#7b2ff7);box-shadow:0 0 26px rgba(0,255,240,.8)}
.btn[disabled]{filter:grayscale(.6);opacity:.75}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:22px;margin-top:28px}
.card{padding:26px 18px;border-radius:26px;background:rgba(255,255,255,.20);border:3px solid rgba(255,255,255,.55);
  box-shadow:0 18px 40px rgba(0,0,0,.45),inset 0 0 40px rgba(255,255,255,.25);animation:pop 1.2s ease both}
.card h3{font-size:22px;margin-bottom:10px}
.card p{font-size:15px;color:#f3e8ff}
.emoji{font-size:44px;animation:spinbadge 2s linear infinite}
@keyframes spinbadge{50%{transform:scale(1.25) rotate(12deg)}}
@keyframes pop{from{opacity:0;transform:translateX(-80px) scale(.9)}to{opacity:1;transform:none}}
.pulse{display:inline-block;width:12px;height:12px;border-radius:50%;background:#39ff14;
  animation:pulse .9s infinite alternate;box-shadow:0 0 14px #39ff14}
@keyframes pulse{to{transform:scale(1.8);opacity:.4}}
.marquee{overflow:hidden;white-space:nowrap;margin-top:22px;font-size:15px;color:#ffe600;animation:slide 6s linear infinite}
@keyframes slide{from{transform:translateX(20%)}to{transform:translateX(-60%)}}
.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;margin-top:28px}
table{width:100%;border-collapse:separate;border-spacing:0 8px;margin-top:24px;font-size:15px}
th{background:#7b2ff7;padding:14px;color:#ffe600;font-size:13px;text-transform:uppercase}
td{background:rgba(255,255,255,.16);padding:14px;border-top:2px solid rgba(255,255,255,.4)}
td.yes{color:#39ff14;font-weight:700}td.no{color:#ff2d55;font-weight:700}
.price{font-size:44px;color:#ffe600;text-shadow:0 3px 12px rgba(0,0,0,.6)}
.strike{text-decoration:line-through;color:#ffb3d9;font-size:18px}
.section{padding:44px 12px}
.section h2{font-size:34px;color:#fff;text-shadow:0 3px 14px rgba(0,0,0,.55);margin-bottom:8px}
.small{font-size:13px;color:#ffe0ff}
.tiny{font-size:11px;color:#ffd9ff}
.stars{font-size:22px;color:#ffe600;letter-spacing:2px}
.quote{background:rgba(255,255,255,.18);border-radius:22px;padding:20px;margin-top:20px;font-style:italic}
footer{padding:34px 12px 60px;font-size:13px;color:#ffe0ff}
.badge-float{position:fixed;bottom:14px;left:14px;z-index:98;background:#ff0055;color:#fff;border-radius:999px;
  padding:12px 18px;font-size:13px;font-weight:700;box-shadow:0 10px 30px rgba(0,0,0,.55);animation:pulse 1.1s infinite alternate}
.spinner{display:inline-block;width:16px;height:16px;border:3px solid rgba(255,255,255,.35);
  border-top-color:#ffe600;border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
input[type=text],input[type=email],select{padding:12px;border-radius:12px;border:3px solid #ff9d00;
  background:rgba(255,255,255,.9);color:#3b0764;width:70%;margin:6px 0;font-size:15px}
.chartbox{height:190px;border-radius:20px;background:linear-gradient(180deg,rgba(255,255,255,.3),rgba(255,255,255,.1));
  border:3px dashed rgba(255,255,255,.6);display:flex;align-items:center;justify-content:center;
  font-size:14px;color:#ffe600;margin-top:18px}
.pie{width:170px;height:170px;border-radius:50%;margin:14px auto;
  background:conic-gradient(#ff0055 0 22%,#ff9d00 0 41%,#ffe600 0 58%,#00fff0 0 74%,#7b2ff7 0 89%,#39ff14 0 100%);
  box-shadow:0 14px 34px rgba(0,0,0,.5)}
.bubble{border-radius:22px;padding:14px 16px;margin:10px auto;max-width:640px;text-align:left;font-size:15px}
.bubble.user{background:linear-gradient(90deg,#00fff0,#7b2ff7);color:#fff;transform:skewX(-3deg)}
.bubble.ai{background:rgba(255,255,255,.22);border:3px solid rgba(255,255,255,.5)}
.tree a{display:block;padding:8px;color:#ffe600}
.side-col{text-align:left}
@media(prefers-reduced-motion:reduce){*{animation:none!important}}
"""

# ----------------------------------------------------------------------------- shell templates
def nova_shell(title, description, body, counterpart, page_no, script=NOVA_JS):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} - Nova Vitral showcase</title>
<meta name="description" content="{description}">
<style>{NOVA_CSS}</style>
</head>
<body>
<div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
<div class="grain" aria-hidden="true"></div>
<div class="banner">Built with the Nova Vitral design system (spec 1.2.1 color discipline, neutral first).
  <a href="{counterpart}">See the same brief built with anti-patterns</a>
  <a href="index.html">All 10 pages</a></div>
{body}
{script}
</body>
</html>
"""

def generic_shell(title, description, body, counterpart):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} - anti-pattern demo</title>
<meta name="description" content="{description}">
<style>{GENERIC_CSS}</style>
</head>
<body>
<div class="badbar"><b>Anti-pattern demo</b> - generated on purpose with spec 9.5 violations
  &middot; <a href="{counterpart}">See the Nova Vitral version of this page</a>
  &middot; <a href="index.html">All 10 pages</a></div>
<div class="badge-float">LIMITED TIME!!</div>
{body}
</body>
</html>
"""

# ----------------------------------------------------------------------------- shared Nova chrome
NOVA_NAV = """
<nav class="top">
  <div class="wrap">
    <a class="brand" href="index.html"><span class="mark" aria-hidden="true">M</span> Meridian</a>
    <div class="navlinks">
      <a href="nova-01-landing.html">Product</a>
      <a href="nova-02-pricing.html">Pricing</a>
      <a href="nova-03-dashboard.html">Dashboard</a>
      <a href="nova-04-chat.html">Assistant</a>
      <a href="nova-05-docs.html">Docs</a>
    </div>
    <div class="row" style="gap:8px">
      <button class="btn btn-ghost btn-sm">Sign in</button>
      <button class="btn btn-primary btn-sm">Start free</button>
    </div>
  </div>
</nav>
"""

NOVA_FOOTER = """
<footer>
  <div class="wrap between" style="text-align:left">
    <div>
      <a class="brand" href="index.html"><span class="mark" aria-hidden="true">M</span> Meridian</a>
      <p class="small subtle" style="margin-top:10px;max-width:34ch">Revenue analytics for subscription
        teams. Every page in this showcase is self-contained and offline.</p>
      <p class="pill" style="margin-top:14px"><span class="dot"></span> All systems operational</p>
    </div>
    <div class="grid g3" style="gap:32px">
      <div><p class="overline">Product</p>
        <div class="side" style="margin-top:10px"><a href="nova-01-landing.html">Overview</a>
        <a href="nova-03-dashboard.html">Dashboard</a><a href="nova-04-chat.html">Assistant</a>
        <a href="nova-05-docs.html">Documentation</a></div></div>
      <div><p class="overline">Company</p>
        <div class="side" style="margin-top:10px"><a href="#">About</a><a href="#">Careers</a>
        <a href="#">Changelog</a><a href="#">Status</a></div></div>
      <div><p class="overline">Legal</p>
        <div class="side" style="margin-top:10px"><a href="#">Privacy</a><a href="#">Terms</a>
        <a href="#">Security</a><a href="#">DPA</a></div></div>
    </div>
  </div>
  <div class="wrap between" style="margin-top:40px;padding-top:24px;border-top:1px solid var(--hair-soft)">
    <p class="tiny subtle">2026 Meridian Labs. Demonstration content for the Nova Vitral showcase.</p>
    <p class="tiny subtle">Theme: dark</p>
  </div>
</footer>
"""

# ----------------------------------------------------------------------------- pages
NOVA_LANDING = NOVA_NAV + """
<main>
  <section class="tight" style="padding-top:80px">
    <div class="wrap" style="text-align:center">
      <p class="pill" data-reveal><span class="dot"></span> v3.1 shipped: leak detection for annual plans</p>
      <h1 class="grad-text" data-reveal style="--d:80ms;margin:24px auto 0;max-width:18ch;font-size:clamp(40px,7vw,72px);
        font-weight:600;line-height:.98;letter-spacing:-.04em">See exactly where recurring revenue leaks</h1>
      <p class="lead" data-reveal style="--d:180ms;margin:22px auto 0;max-width:46ch">Meridian connects to your
        billing stack and shows churn, expansion and downgrade drivers per cohort, per plan, per seat.</p>
      <div class="row" data-reveal style="--d:280ms;justify-content:center;margin-top:30px">
        <button class="btn btn-primary btn-lg">Start free trial</button>
        <button class="btn btn-glass btn-lg">Book a walkthrough</button>
      </div>
      <div class="row" data-reveal style="--d:380ms;justify-content:center;margin-top:26px;gap:24px">
        <span class="small muted">1,840 revenue teams</span>
        <span class="small muted">SOC 2 Type II</span>
        <span class="small muted">No credit card required</span>
      </div>
      <div class="vitral" data-reveal style="--d:460ms;margin:56px auto 0;max-width:1000px;padding:8px">
        <svg viewBox="0 0 800 320" role="img" aria-label="Net revenue retention trending from 101 to 118 percent"
             style="width:100%;height:auto;border-radius:16px;background:#0e1120">
          <defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7c8cff" stop-opacity=".22"/>
            <stop offset="100%" stop-color="#7c8cff" stop-opacity="0"/></linearGradient></defs>
          <g stroke="rgba(255,255,255,.06)"><line x1="40" y1="80" x2="760" y2="80"/><line x1="40" y1="160" x2="760" y2="160"/>
            <line x1="40" y1="240" x2="760" y2="240"/></g>
          <path d="M40 250 L150 236 L260 240 L370 210 L480 178 L590 150 L700 120 L760 104 L760 300 L40 300 Z" fill="url(#fill)"/>
          <path d="M40 250 L150 236 L260 240 L370 210 L480 178 L590 150 L700 120 L760 104" fill="none" stroke="#7c8cff" stroke-width="2"/>
          <g fill="#6b7490" font-size="12" font-family="ui-sans-serif,system-ui"><text x="40" y="318">Jan</text>
            <text x="220" y="318">Mar</text><text x="400" y="318">May</text><text x="580" y="318">Jul</text>
            <text x="720" y="318">Sep</text><text x="40" y="70">120%</text><text x="40" y="150">110%</text>
            <text x="40" y="230">100%</text></g>
          <circle cx="760" cy="104" r="4" fill="#62e9d6"/>
        </svg>
      </div>
    </div>
  </section>

  <section class="tight">
    <div class="wrap row" data-reveal style="justify-content:center;gap:40px;opacity:.55">
      <span class="small">NORTHWIND</span><span class="small">AURORA LABS</span><span class="small">KIPTO</span>
      <span class="small">LATICINIOS BEN</span><span class="small">PS CAM</span>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="sec-head" data-reveal>
        <p class="overline">What you get</p>
        <h2>Revenue truth, without a data team</h2>
        <p>Four systems that answer the questions finance and product keep asking each other.</p>
      </div>
      <div class="grid g3" style="margin-top:40px">
        <div class="vitral card" data-reveal><p class="overline">Cohorts</p><h3 style="margin-top:12px">Leak detection</h3>
          <p>Flags the exact cohorts, plans and seats where revenue stops compounding, with the driver
             attached to each alert.</p>
          <div class="inset" style="margin-top:18px;padding:14px">
            <p class="tiny subtle">Jan cohort, Pro plan</p>
            <div class="bar" style="margin-top:10px"><i style="width:38%"></i></div>
            <p class="tiny subtle" style="margin-top:8px">38% of seats downgraded at renewal</p>
          </div></div>
        <div class="vitral card" data-reveal><p class="overline">Billing</p><h3 style="margin-top:12px">Ledger sync</h3>
          <p>Two-way sync with Stripe and Chargebee. Invoice changes land in the report within
             ninety seconds, with an audit trail per line item.</p></div>
        <div class="vitral card" data-reveal><p class="overline">Forecast</p><h3 style="margin-top:12px">Scenario planning</h3>
          <p>Model a price change, a seat minimum or a new annual discount and see the twelve month
             impact on net revenue retention.</p></div>
        <div class="vitral card" data-reveal><p class="overline">Alerts</p><h3 style="margin-top:12px">Owner routing</h3>
          <p>Every alert lands in Slack with a named owner and a due date, not in a dashboard nobody
             opens on a Friday.</p></div>
      </div>
    </div>
  </section>

  <section class="tight">
    <div class="wrap grid g4">
      <div class="vitral card stat" data-reveal><p class="label">Net revenue retention</p>
        <p class="value" data-count="118" data-suffix="%">0%</p><p class="delta">+9 pts since onboarding</p></div>
      <div class="vitral card stat" data-reveal><p class="label">Reports per week</p>
        <p class="value" data-count="4210">0</p><p class="delta">auto-generated, no analyst time</p></div>
      <div class="vitral card stat" data-reveal><p class="label">Median sync latency</p>
        <p class="value" data-count="1.4" data-dec="1" data-suffix="s">0s</p><p class="delta">p95 at 3.1s</p></div>
      <div class="vitral card stat" data-reveal><p class="label">Leaks caught this quarter</p>
        <p class="value" data-count="312">0</p><p class="delta">$1.9M annualized</p></div>
    </div>
  </section>

  <section>
    <div class="wrap grid g2" style="align-items:center;gap:40px">
      <div data-reveal>
        <p class="overline">How teams use it</p>
        <h2 style="margin-top:12px;font-size:clamp(26px,3vw,36px);font-weight:600;letter-spacing:-.025em">
          One weekly ritual instead of five conflicting spreadsheets</h2>
        <p class="muted" style="margin-top:14px;max-width:52ch">Meridian replaces the recurring revenue
          meeting with a single review: what leaked, who owns the fix, and what the pipeline did since
          last week.</p>
        <div class="row" style="margin-top:22px">
          <button class="btn btn-glass">Read the playbook</button>
          <span class="small subtle">8 minute read</span>
        </div>
      </div>
      <div class="vitral card" data-reveal>
        <div class="between"><h3>Weekly review</h3><span class="chip">Week 37</span></div>
        <div class="grid" style="margin-top:18px;gap:10px">
          <div class="inset between" style="padding:12px"><span class="small">Enterprise downgrades</span>
            <span class="chip danger">3 accounts</span></div>
          <div class="inset between" style="padding:12px"><span class="small">Seat expansion</span>
            <span class="chip live">+184 seats</span></div>
          <div class="inset between" style="padding:12px"><span class="small">Dunning recovery</span>
            <span class="chip warn">2 overdue</span></div>
          <div class="inset between" style="padding:12px"><span class="small">Owner assigned</span>
            <span class="chip">Rafael L.</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="tight">
    <div class="wrap grid g3">
      <figure class="vitral card" data-reveal style="text-align:left">
        <blockquote class="muted">We replaced four weeks of finance review with one dashboard. The leak
          detection paid for the contract in the first month.</blockquote>
        <figcaption class="row" style="margin-top:18px">
          <span class="avatar">AS</span>
          <span><span class="small">Ana Silva</span><br><span class="tiny subtle">Head of Revenue Ops, Northwind</span></span>
        </figcaption>
      </figure>
      <figure class="vitral card" data-reveal style="text-align:left">
        <blockquote class="muted">Cohort retention used to be a quarterly guess. Now it is a Monday
          morning number everyone trusts, because the ledger sync is verifiable.</blockquote>
        <figcaption class="row" style="margin-top:18px">
          <span class="avatar">RL</span>
          <span><span class="small">Rafael Lima</span><br><span class="tiny subtle">CFO, Aurora Labs</span></span>
        </figcaption>
      </figure>
      <figure class="vitral card" data-reveal style="text-align:left">
        <blockquote class="muted">The alerts route to owners with a due date. Our downtime on
          renewals dropped to almost nothing.</blockquote>
        <figcaption class="row" style="margin-top:18px">
          <span class="avatar">MC</span>
          <span><span class="small">Marina Costa</span><br><span class="tiny subtle">RevOps Lead, Kipto</span></span>
        </figcaption>
      </figure>
    </div>
  </section>

  <section class="tight">
    <div class="wrap" style="max-width:800px">
      <h2 data-reveal style="font-size:clamp(26px,3vw,34px);font-weight:600;letter-spacing:-.025em;text-align:center">
        Common questions</h2>
      <div class="vitral" style="margin-top:28px;padding:8px 24px">
        <details open><summary>How long does the initial sync take?</summary>
          <div class="body">Historical data lands in under two hours for most accounts. Live ledger
            updates follow within ninety seconds of the invoice event.</div></details>
        <details><summary>Do you replace our BI tool?</summary>
          <div class="body">No. Meridian owns recurring revenue reporting; it exports clean tables to
            your warehouse for everything else.</div></details>
        <details><summary>What happens if a field is misread?</summary>
          <div class="body">Every metric is traceable to the source line item. You can open the
            reconciliation for any number and fix the mapping once.</div></details>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="vitral" data-reveal style="padding:56px 32px;text-align:center;position:relative;overflow:hidden">
        <h2 class="grad-text" style="font-size:clamp(28px,4vw,42px);font-weight:600;letter-spacing:-.03em;max-width:22ch;margin:0 auto">
          Find your first leak this week</h2>
        <p class="lead" style="margin:16px auto 0;max-width:44ch">Free for 14 days on your real data.
          No credit card, cancel in one click.</p>
        <div class="row" style="justify-content:center;margin-top:26px">
          <button class="btn btn-primary btn-lg">Start free trial</button>
          <button class="btn btn-glass btn-lg">Talk to sales</button>
        </div>
        <p class="tiny subtle" style="margin-top:14px">Median setup time: 32 minutes</p>
      </div>
    </div>
  </section>
</main>
""" + NOVA_FOOTER


NOVA_PRICING = NOVA_NAV + """
<main>
  <section class="tight" style="padding-top:72px">
    <div class="wrap" style="text-align:center;max-width:760px">
      <p class="overline" data-reveal>Pricing</p>
      <h1 class="grad-text" data-reveal style="--d:60ms;margin-top:14px;font-size:clamp(34px,5vw,52px);
        font-weight:600;letter-spacing:-.035em">Plans that scale with the revenue you protect</h1>
      <p class="lead" data-reveal style="--d:140ms;margin:18px auto 0;max-width:48ch">All plans include
        the full analytics engine, unlimited seats for viewers and CSV export.</p>
      <div class="row" data-reveal style="--d:220ms;justify-content:center;margin-top:26px">
        <div class="vitral seg" data-toggle="billing" role="tablist" aria-label="Billing period">
          <button role="tab" aria-selected="true" data-mode="monthly">Monthly</button>
          <button role="tab" aria-selected="false" data-mode="annual">Annual, save 20%</button>
        </div>
      </div>
    </div>
  </section>

  <section class="tight" style="padding-top:8px">
    <div class="wrap grid g3" style="align-items:start">
      <div class="vitral card" data-reveal>
        <h3>Starter</h3>
        <p>For teams under $1M ARR validating their first retention model.</p>
        <p style="margin-top:22px"><span style="font-size:40px;font-weight:600;letter-spacing:-.03em;font-variant-numeric:tabular-nums"
          data-monthly="$149" data-annual="$119">$149</span>
          <span class="small subtle">/mo</span></p>
        <p class="tiny subtle" data-period>billed monthly</p>
        <button class="btn btn-glass" style="width:100%;margin-top:20px">Start free trial</button>
        <ul class="grid" style="margin-top:24px;gap:10px;font-size:14px;color:var(--fg-muted)">
          <li>Up to 5,000 subscriptions</li><li>Cohort and leak reports</li>
          <li>Stripe sync</li><li>Email support, 1 business day</li>
        </ul>
      </div>

      <div class="vitral card" data-reveal
        style="background:color-mix(in srgb,var(--accent) 8%,var(--glass));border:1px solid rgba(124,140,255,.3);position:relative">
        <span class="chip" style="position:absolute;top:-11px;left:24px;background:var(--bg)">Most popular</span>
        <h3>Growth</h3>
        <p>For revenue teams running a weekly review on live billing data.</p>
        <p style="margin-top:22px"><span style="font-size:40px;font-weight:600;letter-spacing:-.03em;font-variant-numeric:tabular-nums"
          data-monthly="$449" data-annual="$359">$449</span>
          <span class="small subtle">/mo</span></p>
        <p class="tiny subtle" data-period>billed monthly</p>
        <button class="btn btn-primary" style="width:100%;margin-top:20px">Start free trial</button>
        <ul class="grid" style="margin-top:24px;gap:10px;font-size:14px;color:var(--fg-muted)">
          <li>Unlimited subscriptions</li><li>Ledger sync and audit trail</li>
          <li>Scenario forecasting</li><li>Slack routing with owners</li>
          <li>Warehouse export</li><li>Priority support, 4 hours</li>
        </ul>
      </div>

      <div class="vitral card" data-reveal>
        <h3>Enterprise</h3>
        <p>For finance and platform teams with custom contracts and residency rules.</p>
        <p style="margin-top:22px"><span style="font-size:40px;font-weight:600;letter-spacing:-.03em">Custom</span></p>
        <p class="tiny subtle">annual agreement, volume based</p>
        <button class="btn btn-glass" style="width:100%;margin-top:20px">Talk to sales</button>
        <ul class="grid" style="margin-top:24px;gap:10px;font-size:14px;color:var(--fg-muted)">
          <li>SSO and SCIM</li><li>EU or US data residency</li>
          <li>Custom metrics and SLAs</li><li>Named solutions engineer</li>
          <li>Security review support</li></ul>
      </div>
    </div>
    <div class="wrap"><p class="tiny subtle" style="text-align:center;margin-top:18px">
      Prices in USD, excluding taxes. Cancel any time; downgrades apply at the next renewal.</p></div>
  </section>

  <section>
    <div class="wrap">
      <div class="sec-head" data-reveal><p class="overline">Compare</p>
        <h2>What changes between plans</h2></div>
      <div class="vitral" data-reveal style="margin-top:28px;padding:0;overflow:hidden">
        <table>
          <thead><tr><th>Capability</th><th>Starter</th><th>Growth</th><th>Enterprise</th></tr></thead>
          <tbody>
            <tr><td>Subscriptions tracked</td><td class="num">5,000</td><td class="num">Unlimited</td><td class="num">Unlimited</td></tr>
            <tr><td>Ledger sync</td><td class="num">Stripe</td><td class="num">Stripe, Chargebee, Recurly</td><td class="num">Custom</td></tr>
            <tr><td>Scenario forecasting</td><td class="num">-</td><td class="num">Included</td><td class="num">Included</td></tr>
            <tr><td>Warehouse export</td><td class="num">-</td><td class="num">Included</td><td class="num">Included</td></tr>
            <tr><td>SSO and SCIM</td><td class="num">-</td><td class="num">-</td><td class="num">Included</td></tr>
            <tr><td>Data residency</td><td class="num">US</td><td class="num">US, EU</td><td class="num">US, EU, custom</td></tr>
            <tr><td>Support response</td><td class="num">1 business day</td><td class="num">4 hours</td><td class="num">1 hour, named engineer</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="tight">
    <div class="wrap grid g2">
      <div class="vitral card" data-reveal><h3>Migration assistance</h3>
        <p>One-time engagement to move historical cohorts and reconciliation rules from your current
          tooling. Available on Growth and Enterprise.</p>
        <p class="small" style="margin-top:16px;color:var(--accent)">From $2,400, fixed scope</p></div>
      <div class="vitral card" data-reveal><h3>Extra environments</h3>
        <p>Sandbox workspace with production-shaped data for testing mappings and forecasts before
          they reach the board.</p>
        <p class="small" style="margin-top:16px;color:var(--accent)">$120 per month, per environment</p></div>
    </div>
  </section>

  <section class="tight">
    <div class="wrap" style="max-width:800px">
      <h2 data-reveal style="font-size:clamp(24px,3vw,32px);font-weight:600;letter-spacing:-.025em;text-align:center">Billing questions</h2>
      <div class="vitral" style="margin-top:24px;padding:8px 24px">
        <details open><summary>How is usage measured?</summary><div class="body">By active subscriptions
          in the billing system at the end of each month. Trials and comped seats are excluded.</div></details>
        <details><summary>Can we switch plans mid-cycle?</summary><div class="body">Yes. Upgrades are
          prorated immediately; downgrades apply at the next renewal so you keep the higher limits
          until the period ends.</div></details>
        <details><summary>Do you offer nonprofit or startup pricing?</summary><div class="body">Fifty
          percent off for verified nonprofits and for companies under $500K raised, for the first
          twelve months.</div></details>
        <details><summary>What are the payment options?</summary><div class="body">Card or invoice.
          Annual agreements over $10,000 can be paid by transfer with net 30 terms.</div></details>
      </div>
    </div>
  </section>
</main>
""" + NOVA_FOOTER


NOVA_DASHBOARD = """
<div class="app">
  <aside>
    <div class="brand" style="padding:8px 12px 18px"><span class="mark" aria-hidden="true">M</span> Meridian</div>
    <nav class="side" aria-label="Workspace">
      <a href="#" aria-current="page">Overview</a>
      <a href="#">Cohorts</a>
      <a href="#">Leaks</a>
      <a href="#">Forecast</a>
      <a href="#">Ledger sync</a>
      <a href="#">Alerts</a>
    </nav>
    <hr class="divider" style="margin:18px 0">
    <p class="overline" style="padding:0 12px">Workspace</p>
    <nav class="side" style="margin-top:8px" aria-label="Settings">
      <a href="#">Members</a><a href="#">Billing</a><a href="#">Audit log</a><a href="#">API keys</a>
    </nav>
    <div class="inset" style="margin:20px 12px 0;padding:14px">
      <p class="tiny subtle">Context usage</p>
      <div class="bar" style="margin-top:10px"><i style="width:72%"></i></div>
      <p class="tiny subtle" style="margin-top:8px">18 of 25 seats active</p>
    </div>
  </aside>

  <div>
    <div class="topbar">
      <div class="row" style="gap:14px">
        <span class="small subtle">Workspace / Overview</span>
      </div>
      <div class="row" style="gap:8px">
        <span class="chip">Last 30 days</span>
        <button class="btn btn-glass btn-sm" data-toast>Copy link</button>
        <span class="avatar">AS</span>
      </div>
    </div>

    <div class="content">
      <div class="between" data-reveal>
        <div><h1 style="font-size:26px;font-weight:600;letter-spacing:-.025em">Recurring revenue overview</h1>
          <p class="small subtle" style="margin-top:6px">Updated 12 seconds ago, from live ledger events</p></div>
        <div class="row" style="gap:8px">
          <button class="btn btn-glass btn-sm">Refresh</button>
          <button class="btn btn-primary btn-sm">Export report</button>
        </div>
      </div>

      <div class="grid g4" style="margin-top:24px">
        <div class="vitral card stat" data-reveal><p class="label">Net revenue retention</p>
          <p class="value" data-count="118" data-suffix="%">0%</p><p class="delta">+9 pts vs last quarter</p></div>
        <div class="vitral card stat" data-reveal><p class="label">Gross churn</p>
          <p class="value" data-count="2.4" data-dec="1" data-suffix="%">0%</p>
          <p class="delta" style="color:var(--accent-2)">-0.6 pts vs last quarter</p></div>
        <div class="vitral card stat" data-reveal><p class="label">Expansion MRR</p>
          <p class="value" data-count="48200" data-suffix="">0</p><p class="delta">$48.2k this month</p></div>
        <div class="vitral card stat" data-reveal><p class="label">Leaks open</p>
          <p class="value" data-count="312">0</p><p class="delta" style="color:var(--warn)">41 past due</p></div>
      </div>

      <div class="split" style="margin-top:16px">
        <div class="vitral card" data-reveal>
          <div class="between"><h3>Recurring revenue</h3>
            <span class="row" style="gap:14px">
              <span class="tiny subtle"><span style="color:var(--accent)">-</span> Net</span>
              <span class="tiny subtle"><span style="color:var(--accent-2)">-</span> Expansion</span></span></div>
          <svg viewBox="0 0 720 260" role="img" aria-label="Net revenue and expansion trending upward over 12 months"
               style="width:100%;height:auto;margin-top:18px">
            <defs><linearGradient id="fill2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#7c8cff" stop-opacity=".2"/>
              <stop offset="100%" stop-color="#7c8cff" stop-opacity="0"/></linearGradient></defs>
            <g stroke="rgba(255,255,255,.06)"><line x1="0" y1="60" x2="720" y2="60"/>
              <line x1="0" y1="120" x2="720" y2="120"/><line x1="0" y1="180" x2="720" y2="180"/></g>
            <path d="M0 210 L80 196 L160 200 L240 172 L320 150 L400 128 L480 108 L560 92 L640 74 L720 60 L720 240 L0 240 Z" fill="url(#fill2)"/>
            <path d="M0 210 L80 196 L160 200 L240 172 L320 150 L400 128 L480 108 L560 92 L640 74 L720 60" fill="none" stroke="#7c8cff" stroke-width="2"/>
            <path d="M0 232 L80 226 L160 220 L240 212 L320 200 L400 190 L480 178 L560 168 L640 156 L720 148" fill="none" stroke="#62e9d6" stroke-width="2"/>
            <g fill="#6b7490" font-size="11" font-family="ui-sans-serif,system-ui">
              <text x="0" y="256">Oct</text><text x="180" y="256">Dec</text><text x="360" y="256">Feb</text>
              <text x="540" y="256">May</text><text x="690" y="256">Sep</text></g>
          </svg>
        </div>

        <div class="vitral card" data-reveal>
          <h3>Leak drivers</h3>
          <ul class="grid" style="margin-top:18px;gap:14px">
            <li><div class="between small muted"><span>Seat downgrades</span><span>$612k</span></div>
              <div class="bar" style="margin-top:8px"><i style="width:82%"></i></div></li>
            <li><div class="between small muted"><span>Plan mismatch</span><span>$318k</span></div>
              <div class="bar" style="margin-top:8px"><i style="width:46%"></i></div></li>
            <li><div class="between small muted"><span>Failed dunning</span><span>$214k</span></div>
              <div class="bar" style="margin-top:8px"><i style="width:31%"></i></div></li>
            <li><div class="between small muted"><span>Annual discount drift</span><span>$96k</span></div>
              <div class="bar" style="margin-top:8px"><i style="width:14%"></i></div></li>
          </ul>
        </div>
      </div>

      <div class="vitral card" data-reveal style="margin-top:16px;padding:0;overflow:hidden">
        <div class="between" style="padding:18px 20px 0"><h3>Accounts at renewal risk</h3>
          <span class="small subtle">6 of 42 accounts</span></div>
        <div style="overflow-x:auto;margin-top:10px">
          <table>
            <thead><tr><th>Account</th><th>Plan</th><th>Renewal</th><th>Risk</th><th style="text-align:right">ARR</th></tr></thead>
            <tbody>
              <tr><td>Northwind</td><td>Enterprise</td><td>12 Oct</td><td><span class="chip danger">High</span></td><td class="num">$248,000</td></tr>
              <tr><td>Aurora Labs</td><td>Growth</td><td>19 Oct</td><td><span class="chip warn">Medium</span></td><td class="num">$96,400</td></tr>
              <tr><td>Kipto</td><td>Growth</td><td>02 Nov</td><td><span class="chip warn">Medium</span></td><td class="num">$71,200</td></tr>
              <tr><td>Laticinios Ben</td><td>Starter</td><td>08 Nov</td><td><span class="chip">Low</span></td><td class="num">$18,900</td></tr>
              <tr><td>PS Cam</td><td>Growth</td><td>15 Nov</td><td><span class="chip danger">High</span></td><td class="num">$64,800</td></tr>
              <tr><td>Navebox</td><td>Enterprise</td><td>28 Nov</td><td><span class="chip">Low</span></td><td class="num">$182,000</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="grid g2" style="margin-top:16px">
        <div class="vitral card" data-reveal>
          <h3>Recent activity</h3>
          <ul class="grid" style="margin-top:16px;gap:0">
            <li class="between" style="padding:12px 0;border-bottom:1px solid var(--hair-soft)">
              <span class="small muted">Ana flagged 3 Enterprise downgrades</span><span class="tiny subtle">4 min ago</span></li>
            <li class="between" style="padding:12px 0;border-bottom:1px solid var(--hair-soft)">
              <span class="small muted">Ledger sync completed for September</span><span class="tiny subtle">26 min ago</span></li>
            <li class="between" style="padding:12px 0;border-bottom:1px solid var(--hair-soft)">
              <span class="small muted">Forecast scenario saved: seat minimum 10</span><span class="tiny subtle">2 h ago</span></li>
            <li class="between" style="padding:12px 0">
              <span class="small muted">Rafael cleared 12 dunning alerts</span><span class="tiny subtle">Yesterday</span></li>
          </ul>
        </div>
        <div class="vitral card" data-reveal style="display:flex;flex-direction:column;justify-content:center;
          align-items:center;text-align:center;min-height:240px">
          <div class="inset" style="display:grid;place-items:center;width:56px;height:56px;border-radius:16px">
            <span aria-hidden="true" style="font-size:20px;color:var(--fg-subtle)">+</span></div>
          <h3 style="margin-top:18px">No forecast saved yet</h3>
          <p style="max-width:40ch;margin:8px auto 0">Build a scenario for the next two quarters and
            Meridian tracks the variance against actuals.</p>
          <button class="btn btn-glass btn-sm" style="margin-top:18px">Create first scenario</button>
        </div>
      </div>
    </div>
  </div>
</div>
"""


NOVA_CHAT = """
<div class="app" style="grid-template-columns:264px minmax(0,1fr)">
  <aside>
    <div class="brand" style="padding:8px 12px 18px"><span class="mark" aria-hidden="true">M</span> Assistant</div>
    <button class="btn btn-glass btn-sm" style="width:100%">New chat</button>
    <nav class="side" style="margin-top:18px" aria-label="Conversations">
      <a href="#" aria-current="page">Churn drivers in Q3</a>
      <a href="#">Annual plan leak report</a>
      <a href="#">Dunning recovery model</a>
      <a href="#">Board deck numbers</a>
    </nav>
    <hr class="divider" style="margin:18px 0">
    <p class="overline" style="padding:0 12px">Pinned</p>
    <nav class="side" style="margin-top:8px"><a href="#">Metric definitions</a><a href="#">Owner routing rules</a></nav>
  </aside>

  <main>
    <div class="topbar">
      <div><p class="small">Churn drivers in Q3</p><p class="tiny subtle">gpt-frontier, 128k context</p></div>
      <div class="row" style="gap:8px">
        <span class="chip live">Live</span><button class="btn btn-glass btn-sm">Share</button><span class="avatar">AS</span>
      </div>
    </div>

    <div style="padding:24px 24px 0;max-width:860px;margin:0 auto">
      <div class="between" style="margin:8px 0 20px">
        <hr class="divider" style="flex:1"><span class="chip">Today</span><hr class="divider" style="flex:1"></div>

      <div class="msg-user" data-reveal>Which cohorts drove the Q3 churn, and what should we fix first?</div>

      <div style="margin-top:24px" data-reveal>
        <div class="vitral" style="padding:0;overflow:hidden">
          <div class="between" style="padding:10px 14px">
            <span class="row" style="gap:8px"><span class="small muted">Reasoning</span>
              <span class="chip">Thought for 8s</span></span>
            <span class="tiny subtle">excluded from copy and export</span>
          </div>
          <div style="border-top:1px solid var(--hair-soft);padding:14px;font-size:13.5px;line-height:1.65;color:var(--fg-muted)">
            Compare cohort retention by plan and seat count, isolate the accounts whose contract
            changed, then check whether the change was a downgrade, a non-renewal or a failed payment.
            Rank by ARR at risk, not by count.
          </div>
        </div>

        <div class="vitral" style="margin-top:10px;padding:0;overflow:hidden;border-left:2px solid var(--accent-2)">
          <div class="between" style="padding:12px 14px">
            <span class="row" style="gap:10px"><span class="mono small">ledger.query</span>
              <span class="chip live">done</span></span>
            <span class="tiny subtle">1.2s, 4,210 rows</span>
          </div>
          <div style="border-top:1px solid var(--hair-soft);padding:12px 14px" class="tiny subtle mono">
            window: 2026-07-01..2026-09-30 &middot; group_by: cohort, plan, seats &middot; metric: arr_delta
          </div>
        </div>

        <div class="msg-ai" style="margin-top:18px">
          <p>Three cohorts explain 78 percent of the Q3 churn, and only one of them is a pricing
            problem.</p>
          <ul>
            <li><strong style="color:var(--fg)">Enterprise, signed before seat minimums (Jan-Feb 2025)</strong>:
              9 accounts downgraded at renewal, $612k ARR at risk. They were sold unlimited seats and
              are now billed per seat.</li>
            <li><strong style="color:var(--fg)">Growth, annual with a legacy 25 percent discount</strong>:
              14 accounts did not renew, $318k. Most cited the price after the discount lapsed.</li>
            <li><strong style="color:var(--fg)">Starter, card failures</strong>: 41 accounts, $214k.
              Recovery is mostly a dunning problem, not a churn problem.</li>
          </ul>
          <p>Fix order: dunning first, because it is the cheapest and recovers in under two weeks.
            Then the legacy discount cohort, where a documented migration path keeps most of the ARR.
            The seat minimum cohort is a contract change and needs legal plus finance.</p>
          <p class="small subtle" style="margin-top:14px">Sources: 4</p>
        </div>

        <div class="grid g2" style="margin-top:18px">
          <div class="inset" style="padding:14px"><p class="tiny subtle">Dunning recovery, projected</p>
            <p style="margin-top:8px;font-size:22px;font-weight:600;font-variant-numeric:tabular-nums">$168k</p>
            <p class="tiny subtle" style="margin-top:6px">of $214k within 14 days</p></div>
          <div class="inset" style="padding:14px"><p class="tiny subtle">Legacy discount cohort</p>
            <p style="margin-top:8px;font-size:22px;font-weight:600;font-variant-numeric:tabular-nums">$241k</p>
            <p class="tiny subtle" style="margin-top:6px">retained with a 12 month migration path</p></div>
        </div>

        <div class="row" style="margin-top:16px;gap:8px">
          <button class="btn btn-glass btn-sm" data-toast>Copy</button>
          <button class="btn btn-glass btn-sm">Regenerate</button>
          <button class="btn btn-glass btn-sm">Create follow-up task</button>
          <span class="tiny subtle">1 of 2 versions</span>
        </div>

        <div class="row" style="margin-top:18px;gap:8px">
          <span class="tiny subtle">Follow-ups</span>
          <button class="btn btn-ghost btn-sm">Draft the dunning sequence</button>
          <button class="btn btn-ghost btn-sm">Model the discount migration</button>
        </div>
      </div>
    </div>

    <div style="max-width:860px;margin:0 auto;padding:24px">
      <div class="vitral-strong composer">
        <textarea rows="2" aria-label="Message" placeholder="Ask anything about your revenue data"></textarea>
        <div class="toolbar">
          <button class="btn btn-ghost btn-sm">Attach</button>
          <span class="chip">gpt-frontier</span>
          <button class="btn btn-ghost btn-sm">Tools</button>
          <span style="flex:1"></span>
          <span class="tiny subtle">Enter to send, Shift+Enter for a new line</span>
          <button class="send" aria-label="Send message" data-toast>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  </main>
</div>
"""


NOVA_DOCS = NOVA_NAV + """
<div class="wrap wide docs-grid">
  <aside>
    <input type="text" placeholder="Filter pages" aria-label="Filter documentation pages"
      style="width:100%;height:36px;padding:0 12px;border-radius:10px;border:1px solid var(--hair);
             background:var(--glass-dim);outline:none;font-size:13px;margin-bottom:16px">
    <p class="overline">Getting started</p>
    <nav class="side" aria-label="Documentation">
      <a href="#" aria-current="page">Install the CLI</a>
      <a href="#">Connect billing</a>
      <a href="#">First report</a>
      <a href="#">Invite your team</a>
    </nav>
    <p class="overline" style="margin-top:20px">Metrics</p>
    <nav class="side" aria-label="Metrics">
      <a href="#">Net revenue retention</a><a href="#">Cohort definition</a><a href="#">Leak scoring</a>
    </nav>
    <p class="overline" style="margin-top:20px">API</p>
    <nav class="side" aria-label="API">
      <a href="#">Authentication</a><a href="#">Ledger endpoints</a><a href="#">Webhooks</a><a href="#">Rate limits</a>
    </nav>
  </aside>

  <article style="min-width:0">
    <p class="small subtle">Getting started / Install</p>
    <h1 class="grad-text" style="margin-top:12px;font-size:clamp(30px,4vw,42px);font-weight:600;letter-spacing:-.03em">
      Install the CLI</h1>
    <p class="lead" style="margin-top:14px;max-width:68ch">The Meridian CLI links a local project to a
      workspace, pulls metric definitions and pushes mapping changes without leaving the terminal.</p>

    <div class="row" style="margin-top:16px;gap:8px">
      <span class="chip">v3.1</span><span class="chip live">Stable</span><span class="chip">Node 20+</span>
    </div>

    <div class="callout" style="margin-top:26px">
      <p><strong style="color:var(--fg)">Heads up.</strong> The CLI only writes mapping files. It never
        modifies billing data or sends events to your customers.</p>
    </div>

    <h2 style="margin-top:36px;font-size:22px;font-weight:600;letter-spacing:-.02em">1. Install</h2>
    <div class="code" style="margin-top:14px">
      <header><span class="mono">terminal</span><span>npm</span></header>
      <pre><code>npm install -g meridian-cli
meridian login --workspace northwind
meridian pull --metrics</code></pre>
    </div>

    <h2 style="margin-top:36px;font-size:22px;font-weight:600;letter-spacing:-.02em">2. Connect a workspace</h2>
    <p class="muted" style="margin-top:12px;max-width:68ch">Authentication opens a browser session and
      stores a scoped token in your OS keychain. Tokens are workspace-bound and expire after 90 days
      unless rotated.</p>
    <div class="code" style="margin-top:14px">
      <header><span class="mono">meridian.yml</span><span>yaml</span></header>
      <pre><code>workspace: northwind
default_range: last_30_days
metrics:
  - net_revenue_retention
  - gross_churn
  - expansion_mrr
export:
  warehouse: snowflake
  schema: analytics_meridian</code></pre>
    </div>

    <h2 style="margin-top:36px;font-size:22px;font-weight:600;letter-spacing:-.02em">3. Verify the sync</h2>
    <table class="vitral" style="margin-top:14px;border-collapse:separate;border-spacing:0">
      <thead><tr><th>Command</th><th>What it returns</th><th style="text-align:right">Typical runtime</th></tr></thead>
      <tbody>
        <tr><td class="mono small">meridian status</td><td>Workspace, token expiry, last sync</td><td class="num">0.4s</td></tr>
        <tr><td class="mono small">meridian check</td><td>Mapping differences before pushing</td><td class="num">1.1s</td></tr>
        <tr><td class="mono small">meridian push</td><td>Applies mapping changes with an audit entry</td><td class="num">2.3s</td></tr>
      </tbody>
    </table>

    <div class="callout" style="margin-top:26px;border-left-color:var(--warn)">
      <p><strong style="color:var(--fg)">Common mistake.</strong> Running <span class="mono">push</span>
        against production without <span class="mono">check</span> first. Mappings are versioned, so a
        bad change is reversible, but it will re-run the affected reports.</p>
    </div>

    <div class="grid g2" style="margin-top:36px">
      <a class="vitral card" href="#"><p class="overline">Previous</p><h3 style="margin-top:10px">Connect billing</h3>
        <p>OAuth scopes, sandbox keys and the first ledger sync.</p></a>
      <a class="vitral card" href="#" style="text-align:right"><p class="overline">Next</p>
        <h3 style="margin-top:10px">First report</h3><p>Build a cohort view and save it as a weekly ritual.</p></a>
    </div>

    <div class="between" style="margin-top:32px;padding-top:24px;border-top:1px solid var(--hair-soft)">
      <p class="small subtle">Was this page helpful?</p>
      <div class="row" style="gap:8px">
        <button class="btn btn-glass btn-sm">Yes</button><button class="btn btn-glass btn-sm">No</button>
        <span class="tiny subtle">Updated 4 Mar 2026</span>
      </div>
    </div>
  </article>

  <aside>
    <p class="overline">On this page</p>
    <nav class="toc" style="margin-top:12px" aria-label="On this page">
      <a href="#install" class="active">1. Install</a>
      <a href="#connect">2. Connect a workspace</a>
      <a href="#verify">3. Verify the sync</a>
      <a href="#mistakes">Common mistakes</a>
    </nav>
    <div class="inset" style="margin-top:24px;padding:14px">
      <p class="tiny subtle">Need a hand?</p>
      <p class="small" style="margin-top:6px"><a href="#" style="color:var(--accent)">Ask in Discord</a></p>
    </div>
  </aside>
</div>
"""


# ----------------------------------------------------------------------------- generic (bad) pages
GENERIC_LANDING = """
<div class="hero">
  <p class="pulse"></p>
  <p class="tiny">&#9889; NEW FEATURE JUST DROPPED &#9889; <span class="pulse"></span> <span class="pulse"></span></p>
  <h1>REVOLUTIONIZE YOUR REVENUE WITH AI!!!</h1>
  <p>&#128640; The #1 AMAZING platform for data-driven subscription GROWTH &#128200;</p>
  <p style="margin-top:10px">&#127775;&#127775;&#127775;&#127775;&#127775; Rated 5 stars by everyone!!!</p>
  <button class="btn">CLICK HERE NOW &#128073;</button>
  <button class="btn secondary">Start Free Trial!!!</button>
  <p class="small" style="margin-top:12px">No credit card required!!! (just kidding, we need one)</p>
  <div class="marquee">&#128293; LIMITED OFFER &#128293; 90% OFF &#128293; HURRY UP &#128293; ONLY 3 SPOTS LEFT &#128293;</div>
</div>

<div class="wrap">
  <div class="cards">
    <div class="card"><p class="emoji">&#128640;</p><h3>Feature One</h3><p>Lorem ipsum dolor sit amet,
      consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.</p></div>
    <div class="card" style="animation-delay:.3s"><p class="emoji">&#128176;</p><h3>Feature Two</h3>
      <p>Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.</p></div>
    <div class="card" style="animation-delay:.6s"><p class="emoji">&#9889;</p><h3>Feature Three</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p></div>
  </div>

  <div class="section">
    <h2>Why Choose Us???</h2>
    <div class="cards">
      <div class="card" style="animation-delay:.2s"><p class="emoji">&#128200;</p><h3>10x FASTER</h3>
        <p>Blazingly fast, magical experience powered by AI.</p></div>
      <div class="card" style="animation-delay:.5s"><p class="emoji">&#129302;</p><h3>AI POWERED</h3>
        <p>Machine learning blockchain synergy in the cloud.</p></div>
      <div class="card" style="animation-delay:.8s"><p class="emoji">&#128274;</p><h3>SUPER SECURE</h3>
        <p>Military grade bank level encryption, 100% safe.</p></div>
    </div>
  </div>

  <div class="section">
    <h2>Trusted By Thousands!!!</h2>
    <p class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
    <div class="chartbox" style="height:120px">[STOCK PHOTO OF HAPPY TEAM HERE]</div>
    <div class="quote">"This platform changed our lives completely. Best decision ever made!!!"
      <br>&#8212; John Doe, CEO at Company</div>
    <div class="quote" style="animation-delay:.4s">"I literally cannot work without it. 1000% recommend!!!"
      <br>&#8212; Jane Smith, Founder at Startup</div>
  </div>

  <div class="section">
    <h2>Get Started TODAY</h2>
    <p>Join 1,000,000+ users already growing!!!</p>
    <input type="email" placeholder="Enter your email here"><br>
    <button class="btn">SUBMIT &#128640;</button>
    <p class="tiny" style="margin-top:12px">We will send you 47 emails per day. Unsubscribe never works.</p>
  </div>
</div>
<footer>&#169; 2026 COMPANY. All rights reserved. | <a href="#">Privacy</a> | <a href="#">Terms</a></footer>
"""

GENERIC_PRICING = """
<div class="hero">
  <p class="tiny">&#128176; CHEAPEST PRICES ON THE INTERNET &#128176;</p>
  <h1>PICK YOUR PLAN!!!</h1>
  <p>All plans come with EVERYTHING and MORE &#127881;</p>
</div>

<div class="wrap">
  <div class="cards">
    <div class="card"><h3>&#128293; BASIC</h3>
      <p class="strike">$999</p><p class="price">$19.99</p>
      <p class="small">per month, forever, plus hidden fees</p>
      <button class="btn" style="background:linear-gradient(90deg,#39ff14,#00fff0);color:#3b0764">
        CLICK HERE</button>
      <p class="small" style="margin-top:14px">&#10004; Some features &#10004; Limited support
        &#10008; Everything else</p></div>
    <div class="card" style="animation-delay:.3s;transform:scale(1.06)">
      <h3>&#11088; PRO (BEST VALUE!!!)</h3>
      <p class="strike">$4,999</p><p class="price">$49.99</p>
      <p class="small">per user per month per feature</p>
      <button class="btn">BUY NOW!!!</button>
      <p class="small" style="margin-top:14px">&#10004; More features &#10004; Faster AI</p></div>
    <div class="card" style="animation-delay:.6s"><h3>&#128142; ENTERPRISE</h3>
      <p class="price">CALL US</p>
      <p class="small">price available upon request</p>
      <button class="btn secondary">CONTACT SALES</button>
      <p class="small" style="margin-top:14px">&#10004; Everything &#10004; A dedicated human</p></div>
  </div>

  <div class="section">
    <h2>Compare Plans</h2>
    <table>
      <tr><th>Feature</th><th>Basic</th><th>Pro</th><th>Enterprise</th></tr>
      <tr><td>Analytics</td><td class="yes">YES</td><td class="yes">YES</td><td class="yes">YES</td></tr>
      <tr><td>AI Magic</td><td class="no">NO</td><td class="yes">YES</td><td class="yes">YES</td></tr>
      <tr><td>Support</td><td class="no">EMAIL ONLY</td><td class="no">MAYBE</td><td class="yes">24/7</td></tr>
      <tr><td>Syncs with your billing</td><td class="no">NO</td><td class="no">NO</td><td class="no">ASK US</td></tr>
      <tr><td>Number of users</td><td>1</td><td>2</td><td>Unlimited*</td></tr>
    </table>
    <p class="tiny" style="margin-top:10px">*Unlimited subject to a 3 user cap.</p>
  </div>

  <div class="section">
    <h2>Frequently Asked Questions</h2>
    <p style="margin-top:12px">Q: Is it worth it?<br>A: Absolutely yes!!!</p>
    <p style="margin-top:12px">Q: Can I cancel?<br>A: Please do not.</p>
    <button class="btn" disabled>SAVE 90% NOW (SOLD OUT)</button>
  </div>
</div>
<footer>Prices subject to change without notice. &#169; 2026</footer>
"""

GENERIC_DASHBOARD = """
<div class="wrap" style="max-width:1200px">
  <div class="section" style="padding-top:26px">
    <h2>&#128202; MY AMAZING DASHBOARD</h2>
    <p class="small">Real-time AI insights powered by blockchain &#128640; <span class="pulse"></span></p>
  </div>

  <div class="cards">
    <div class="card"><p class="tiny">REVENUE</p><p class="price">$1,234,567</p>
      <p class="small" style="color:#39ff14">&#9650; +999% AMAZING!!!</p></div>
    <div class="card" style="animation-delay:.3s"><p class="tiny">USERS</p><p class="price">42</p>
      <p class="small" style="color:#39ff14">&#9650; UP</p></div>
    <div class="card" style="animation-delay:.6s"><p class="tiny">CHURN</p><p class="price">0.0001%</p>
      <p class="small" style="color:#ff2d55">&#9660; NO CONTEXT</p></div>
    <div class="card" style="animation-delay:.9s"><p class="tiny">VIBES</p><p class="price">100</p>
      <p class="small">&#128293; IMMEASURABLE &#128293;</p></div>
  </div>

  <div class="section">
    <h2>Analytics Chart</h2>
    <div class="chartbox">[CHART GOES HERE - DATA PENDING SINCE 2024]</div>
  </div>

  <div class="grid2">
    <div class="card"><h3>Distribution</h3><div class="pie"></div>
      <p class="small">Six slices, no labels, no legend, colors chosen by a random number generator.</p></div>
    <div class="card" style="animation-delay:.3s"><h3>AI INSIGHTS &#129302;</h3>
      <p class="small"><span class="spinner"></span> Thinking...</p>
      <p class="small" style="margin-top:12px">Watch as we simulate progress forever without ever
        finishing, and never show you a stop button.</p></div>
  </div>

  <div class="section">
    <h2>Recent Data</h2>
    <table>
      <tr><th>Account</th><th>MRR</th><th>Status</th><th>Action</th></tr>
      <tr><td>Account One</td><td>$12,000</td><td class="yes">GOOD</td>
        <td><button class="btn" style="padding:8px 16px;font-size:13px">DELETE</button></td></tr>
      <tr><td>Account Two</td><td>$9,000</td><td class="no">BAD</td>
        <td><button class="btn" style="padding:8px 16px;font-size:13px">DELETE</button></td></tr>
      <tr><td>Account Three</td><td>$4,000</td><td class="no">IDK</td>
        <td><button class="btn" style="padding:8px 16px;font-size:13px">DELETE</button></td></tr>
    </table>
    <p class="tiny" style="margin-top:10px">No pagination, no filters, no empty state, no confirmation
      dialog on delete.</p>
  </div>
</div>
<footer>Dashboard demo. Every number is fabricated decoration.</footer>
"""

GENERIC_CHAT = """
<div class="wrap" style="max-width:820px">
  <div class="section" style="padding-top:26px">
    <h2>&#129302; AI CHAT BOT 9000</h2>
    <p class="small">Powered by ARTIFICIAL INTELLIGENCE &#10024; <span class="pulse"></span>
      <span class="pulse"></span> <span class="pulse"></span></p>
  </div>

  <div class="bubble user">hi</div>
  <div class="bubble ai">Hello! I am an advanced AI assistant. How may I help you today?</div>
  <div class="bubble user">which cohorts drove Q3 churn?</div>
  <div class="bubble ai"><span class="spinner"></span> Thinking...</div>
  <div class="bubble ai" style="animation-delay:.4s">
    <p>Great question! &#127881; According to my analysis:</p>
    <p style="margin-top:10px">&#8226; Lorem ipsum dolor sit amet<br>&#8226; Consectetur adipiscing elit<br>
      &#8226; Some accounts did something</p>
    <p style="margin-top:10px">I hope this helps!!! Let me know if you want more details &#128512;</p>
  </div>
  <div class="bubble user">can you be more specific?</div>
  <div class="bubble ai"><span class="spinner"></span> Thinking... (this has been spinning for 4 minutes)</div>

  <div class="card" style="max-width:680px;margin:26px auto 0">
    <p class="small">Tools used: <span class="small">[hidden]</span></p>
    <p class="small" style="margin-top:8px">Reasoning: <span class="small">[not available, trust me]</span></p>
    <p class="small" style="margin-top:8px">Citations: <span class="small">[none, but very confident]</span></p>
  </div>

  <div class="card" style="max-width:680px;margin:18px auto 0">
    <input type="text" placeholder="Type your message...">
    <button class="btn" style="margin-top:10px">SEND &#128640;</button>
    <p class="tiny" style="margin-top:10px">No stop button. No streaming. No history. Reloading loses
      everything. Drafts are not saved.</p>
  </div>

  <div class="section">
    <h2>Other Chats</h2>
    <p class="small"><a href="#">Chat 1</a> &middot; <a href="#">Chat 2</a> &middot;
      <a href="#">Untitled conversation that never got a name</a></p>
  </div>
</div>
<footer>This chat interface cannot be stopped once it starts generating.</footer>
"""

GENERIC_DOCS = """
<div class="wrap" style="max-width:1080px;text-align:left">
  <div class="section">
    <h1 style="font-size:40px;text-align:center;text-shadow:0 4px 20px rgba(0,0,0,.6)">DOCUMENTATION</h1>
    <p class="small" style="text-align:center;margin-top:8px">Welcome to the docs!!! Everything you
      need to know about EVERYTHING &#128218;</p>

    <div class="cards" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
      <div class="card"><h3>Getting Started</h3><p class="small">Click here to begin your journey today</p></div>
      <div class="card"><h3>Advanced</h3><p class="small">Click here for advanced things</p></div>
      <div class="card"><h3>API Reference</h3><p class="small">Click here for the API (undocumented)</p></div>
      <div class="card"><h3>FAQ</h3><p class="small">Click here for questions, no answers included</p></div>
    </div>

    <h2 style="margin-top:40px">Installation</h2>
    <p class="small" style="margin-top:10px">To install the thing, first make sure you have installed
      the other things. You will need Node, and also Python, and Docker, and probably a database. Then
      run the installer. If it fails, try turning it off and on again. There is no error handling
      documentation because errors should not happen. For more information about this topic please see
      the other page which we have not written yet, or contact support during business hours in a
      timezone you are not in.</p>
    <p class="small" style="margin-top:10px">Run the following command in your terminal and hope for
      the best:</p>
    <p class="card" style="margin-top:10px;text-align:left;font-family:monospace">
      install-our-thing --yes --please --everything</p>
    <p class="small" style="margin-top:10px">Warning: do not run this in production. Actually we are
      not sure. Ask around.</p>

    <h2 style="margin-top:36px">Metrics</h2>
    <p class="small" style="margin-top:10px">Our metrics are calculated using proprietary industry
      leading AI-powered algorithms that nobody can explain. Net revenue retention is computed
      somewhere between the billing system and the dashboard. Values may differ from your previous
      tool, and from each other, depending on the day.</p>

    <h2 style="margin-top:36px">Troubleshooting</h2>
    <p class="small" style="margin-top:10px">If something breaks, refresh the page. If that does not
      work, clear your cache. If that does not work, it is probably your network. If that does not
      work, we cannot reproduce it.</p>

    <p class="tiny" style="margin-top:36px;text-align:center">
      No search, no table of contents, no version, no last-updated date, no next or previous links,
      no code copy button, no syntax highlighting.</p>
  </div>
</div>
<footer>Docs last updated: unknown.</footer>
"""

PAGES = [
    ("01", "landing", "Landing page",
     "Marketing page: hero, features, metrics, testimonials, FAQ, CTA.",
     NOVA_LANDING, GENERIC_LANDING),
    ("02", "pricing", "Pricing page",
     "Three plans, billing toggle, comparison table, billing FAQ.",
     NOVA_PRICING, GENERIC_PRICING),
    ("03", "dashboard", "Dashboard",
     "App shell, KPI tiles, revenue chart, risk table, activity and empty state.",
     NOVA_DASHBOARD, GENERIC_DASHBOARD),
    ("04", "chat", "AI chat scene",
     "Conversation rail, thread, reasoning, tool call, answer and composer.",
     NOVA_CHAT, GENERIC_CHAT),
    ("05", "docs", "Documentation",
     "Docs layout: page tree, article, code blocks, callouts, on-this-page rail.",
     NOVA_DOCS, GENERIC_DOCS),
]

# ----------------------------------------------------------------------------- hub page
def hub() -> str:
    cards = []
    for num, slug, title, desc, _, _ in PAGES:
        cards.append(f"""
      <div class="vitral card" data-reveal>
        <div class="between">
          <h3>{title}</h3>
          <span class="row" style="gap:6px">
            <a class="btn btn-primary btn-sm" href="nova-{num}-{slug}.html">Nova</a>
            <a class="btn btn-glass btn-sm" href="generic-{num}-{slug}.html">Anti-pattern</a>
          </span>
        </div>
        <p>{desc}</p>
        <p class="tiny subtle" style="margin-top:14px">Same brief, same content structure, two systems.
          Open both side by side.</p>
      </div>""")

    checklist = [
        "One accent per viewport, and it marks the primary action",
        "Neutral ground carries at least 90 percent of the pixels",
        "Glass sits over an aurora, so the blur is visible",
        "Accordions use grid-template-rows, not animated height",
        "Charts use four accent-series, horizontal grid only, no legend clutter",
        "Empty, loading and error states exist for every data surface",
        "Every table has a sticky header and tabular numbers",
        "Every interactive element has hover, focus-visible and active states",
        "Copy is specific and honest, with no invented attribution",
        "The grayscale test passes: hierarchy survives without color",
    ]
    check_html = "".join(
        f'<li style="display:flex;gap:10px;font-size:14px;color:var(--fg-muted)">'
        f'<span style="color:var(--accent)">-</span>{c}</li>' for c in checklist
    )
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Nova Vitral showcase - 5 pages with the design system, 5 without</title>
<meta name="description" content="A before and after comparison: the same five page briefs built with the Nova Vitral design system and with the anti-patterns the specification forbids.">
<style>{NOVA_CSS}</style>
</head>
<body>
<div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
<div class="grain" aria-hidden="true"></div>
<div class="banner">Showcase for the Nova Vitral specification.
  <a href="../design.md">Read the spec</a> &middot; <a href="../examples/00-index.md">100 examples</a></div>

<main>
  <section class="tight" style="padding-top:72px">
    <div class="wrap" style="text-align:center;max-width:760px">
      <p class="overline" data-reveal>Showcase</p>
      <h1 class="grad-text" data-reveal style="--d:60ms;margin-top:16px;font-size:clamp(34px,5.5vw,56px);
        font-weight:600;letter-spacing:-.04em;line-height:1.02">Five pages with the design system. Five without.</h1>
      <p class="lead" data-reveal style="--d:140ms;margin:20px auto 0;max-width:52ch">Same product, same
        content, same five briefs. The left column is built to the specification; the right column
        breaks it on purpose, item by item, so the difference is measurable instead of a matter of taste.</p>
    </div>
  </section>

  <section class="tight" style="padding-top:0">
    <div class="wrap grid g2" style="max-width:1080px">{''.join(cards)}</div>
  </section>

  <section class="tight">
    <div class="wrap grid g2" style="max-width:1080px;align-items:start">
      <div class="vitral card" data-reveal>
        <p class="overline">What the Nova column does</p>
        <h3 style="margin-top:12px">Rules that produce the calm</h3>
        <ul class="grid" style="margin-top:16px;gap:8px">{check_html}</ul>
      </div>
      <div class="vitral card" data-reveal>
        <p class="overline">What the anti-pattern column does</p>
        <h3 style="margin-top:12px">Debt that makes it look machine-generated</h3>
        <ul class="grid" style="margin-top:16px;gap:8px;font-size:14px;color:var(--fg-muted)">
          <li>- Purple-to-blue gradient on every surface and button</li>
          <li>- Neon accents, glow, and gradient text on everything</li>
          <li>- Emoji used as icons, three pulsing badges at once</li>
          <li>- Every element flies in from the left over 1.2s</li>
          <li>- Glass-looking cards over a flat background, so they read as gray mud</li>
          <li>- Cards scaling to 1.06 on hover, breaking the layout feel</li>
          <li>- Lorem ipsum, "Feature One", "John Doe, CEO"</li>
          <li>- Spinners instead of streaming, no stop control</li>
          <li>- Pie chart with six unlabeled slices, no empty states</li>
          <li>- No focus states, no reduced-motion path, no states at all</li>
        </ul>
        <p class="tiny subtle" style="margin-top:16px">Each page lists the exact spec 9.5 items it
          violates, so the comparison doubles as a checklist.</p>
      </div>
    </div>
  </section>

  <section class="tight">
    <div class="wrap" style="max-width:1080px">
      <div class="vitral card" data-reveal>
        <h3>How to use this in a prompt</h3>
        <p class="small muted" style="margin-top:12px">Point your agent at the specification, not at these
          pages, and ask for the discipline explicitly:</p>
        <div class="code" style="margin-top:16px">
          <header><span class="mono">prompt</span><span>copy</span></header>
          <pre><code>Read https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md
sections 0.4, 1.2.1, 2, 6.2, 6.12, 9.5.

Build a pricing page for &lt;product&gt;. Follow blueprint 5.4.

Color discipline is mandatory: neutral ground first, one accent per viewport,
no purple, violet, neon or multi-hue gradients, primary buttons use the
single-hue --grad-primary, and the grayscale test must pass before you answer.</code></pre>
        </div>
      </div>
    </div>
  </section>
</main>
{ NOVA_FOOTER }
{ NOVA_JS }
</body>
</html>
"""


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    (OUT / "index.html").write_text(hub(), encoding="utf-8")
    for num, slug, title, desc, nova_body, generic_body in PAGES:
        nova_path = f"nova-{num}-{slug}.html"
        generic_path = f"generic-{num}-{slug}.html"
        (OUT / nova_path).write_text(
            nova_shell(f"{title} (Nova Vitral)", desc, nova_body, generic_path, num), encoding="utf-8"
        )
        (OUT / generic_path).write_text(
            generic_shell(f"{title} (anti-patterns)", desc, generic_body, nova_path), encoding="utf-8"
        )

    total = len(list(OUT.glob("*.html")))
    print(f"Wrote {total} pages to {OUT.relative_to(ROOT)}/ (1 hub + 5 Nova + 5 anti-pattern).")
    for p in sorted(OUT.glob("*.html")):
        print(f"  {p.name:28} {p.stat().st_size // 1024:>4} KB")


if __name__ == "__main__":
    main()
