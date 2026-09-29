const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const inr=n=>"₹"+Math.round(n).toLocaleString("en-IN"),by=id=>BIKES.find(b=>b.id==id);
const wa=t=>`https://wa.me/91${SITE.phone}?text=${encodeURIComponent(t)}`;
const img=b=>`images/bikes/${b.id}.jpg`;
const desc=b=>`${b.name} is powered by a ${b.engine} engine producing ${b.power}, with a ${b.tank} fuel tank. ${b.highlight}.`;
const tile=(b,extra="")=>`<a class="tile" href="bike.html?id=${b.id}" aria-label="View ${b.name}"><img src="${img(b)}" alt="${b.name}" width="960" height="640" loading="lazy" draggable="false">${b.group=="new"?'<span class="badge">New</span>':b.group=="premium"?'<span class="badge dk">Premium</span>':""}</a>`;
const pills=b=>[b.engine,b.tank+" tank",b.mileage].filter(Boolean).map(x=>`<span>${x}</span>`).join("");
const priceBox=b=>`<div class="price">${inr(b.price)}<small>Ex-showroom, Pallu</small></div>`;
const dcard=b=>`<article class="dcard">${tile(b)}<div class="b"><span class="tag">${b.type}${b.group=="new"?" · New launch":""}</span><h3>${b.name}</h3><span class="mut" style="font-size:14px">${b.highlight}</span>${priceBox(b)}<div class="cta"><a class="btn red sm" href="bike.html?id=${b.id}">View details</a></div></div></article>`;
const deckHtml=(list,cls="")=>`<div class="deck ${cls}" tabindex="0" aria-label="Swipe through bikes"><div class="deck-track">${list.map(dcard).join("")}</div><div class="deck-ctl"><button class="arrow deck-prev" aria-label="Previous">←</button><div class="deck-dots"></div><button class="arrow deck-next" aria-label="Next">→</button></div></div>`;
document.addEventListener("DOMContentLoaded",()=>{
 const bg=$("#bg");if(bg)bg.onclick=()=>$("#links").classList.toggle("open");
 $$("[data-wa]").forEach(a=>{a.href=wa(a.dataset.wa);a.target="_blank";a.rel="noopener"});
 // inject decks / lists by data-attributes
 $$("[data-deck]").forEach(el=>{const k=el.dataset.deck;const l=k=="new"?BIKES.filter(b=>b.group=="new"):k=="featured"?BIKES.filter(b=>b.featured):k=="premium"?BIKES.filter(b=>b.group=="premium"):BIKES.filter(b=>b.type==k);el.innerHTML=deckHtml(l,el.dataset.cls||"");});

 // reveal on scroll
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});$$(".reveal").forEach(e=>io.observe(e));
 // open-now
 const on=$("#on");if(on){const p=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",weekday:"short",hour:"numeric",hour12:false}).formatToParts(new Date()),wd=p.find(x=>x.type=="weekday").value,h=+p.find(x=>x.type=="hour").value,r=wd=="Sun"?SITE.hours.sun:SITE.hours.week,o=h>=r[0]&&h<r[1];on.textContent=o?"Open now":"Closed now";on.className="open-now "+(o?"y":"n")}
 pages[document.body.dataset.page]?.();
 // decks created after render need the deck script
 if(!window.__deckLoaded&&$$(".deck").length){const s=document.createElement("script");s.src="js/deck.js";document.body.append(s);window.__deckLoaded=1}
});
const pages={
collection(){let type="All",grp="All",cmp=[];const chips=[["All","All"],["Motorcycle","Motorcycles"],["Scooter","Scooters"],["new","New launches"],["premium","Premium"]];
 const cs=$("#chips");cs.innerHTML=chips.map(c=>`<button class="chip" aria-pressed="${c[0]=="All"}" data-c="${c[0]}">${c[1]}</button>`).join("");
 const eng=[...new Set(BIKES.map(b=>b.engine))].sort((a,b)=>parseFloat(a)-parseFloat(b));$("#eng").innerHTML='<option value="">All engines</option>'+eng.map(e=>`<option>${e}</option>`).join("");
 const q0=new URLSearchParams(location.search).get("type");if(q0){type=q0;[...cs.children].forEach(c=>c.setAttribute("aria-pressed",c.dataset.c==q0))}
 cs.onclick=e=>{const c=e.target.dataset.c;if(!c)return;type=c;[...cs.children].forEach(x=>x.setAttribute("aria-pressed",x.dataset.c==c));draw()};["#q","#eng","#sort"].forEach(s=>$(s).oninput=draw);
 function draw(){const q=$("#q").value.toLowerCase().trim(),e=$("#eng").value,s=$("#sort").value;let l=BIKES.filter(b=>(type=="All"||b.type==type||b.group==type)&&(!e||b.engine==e)&&b.name.toLowerCase().includes(q));
  if(s)l=[...l].sort((a,b)=>s=="lo"?a.price-b.price:b.price-a.price);$("#count").textContent=`${l.length} of ${BIKES.length} models`;
  $("#grid").innerHTML=l.length?l.map(b=>`<article class="card">${tile(b)}<div class="b"><span class="tag">${b.type}</span><h3>${b.name}</h3><div class="pills">${pills(b)}</div>${priceBox(b)}<div class="row"><a class="btn red sm" href="bike.html?id=${b.id}">View details</a><label><input type="checkbox" data-c="${b.id}" ${cmp.includes(b.id)?"checked":""}> Compare</label></div></div></article>`).join(""):'<div class="empty">No model matches. Clear the search or ask us on WhatsApp.</div>'}
 $("#grid").onchange=e=>{const id=e.target.dataset.c;if(!id)return;if(e.target.checked){if(cmp.length>=3){e.target.checked=false;alert("You can compare up to 3 bikes.");return}cmp.push(id)}else cmp=cmp.filter(x=>x!=id);$("#cbar").style.display=cmp.length?"flex":"none";$("#cn").textContent=cmp.length+" selected"};
 $("#cgo").onclick=()=>{if(cmp.length<2){alert("Pick at least 2 bikes to compare.");return}const l=cmp.map(by),rows=[["Type","type"],["Price (ex-showroom, Pallu)","price"],["Engine","engine"],["Max power","power"],["Fuel tank","tank"],["Mileage","mileage"],["Key feature","highlight"]];
  $("#cm").innerHTML=`<div class="mh"><b style="font:800 1.5rem 'Barlow Condensed'">Compare</b><button class="btn sm" id="cx">Close</button></div><div class="w" style="padding:24px 20px 60px"><div class="tw"><table><tr><td></td>${l.map(b=>`<th>${b.name}</th>`).join("")}</tr>${rows.map(r=>`<tr><td class="mut">${r[0]}</td>${l.map(b=>`<td>${r[1]=="price"?inr(b.price):b[r[1]]||"—"}</td>`).join("")}</tr>`).join("")}<tr><td></td>${l.map(b=>`<td><a class="btn red sm" href="bike.html?id=${b.id}">Details</a></td>`).join("")}</tr></table></div></div>`;$("#cm").classList.add("on");$("#cx").onclick=()=>$("#cm").classList.remove("on")};
 draw()},
bike(){const b=by(new URLSearchParams(location.search).get("id"));const box=$("#bike");
 if(!b){box.innerHTML='<div class="empty"><h2>Bike not found</h2><p><a class="btn red" href="collection.html">Browse all bikes</a></p></div>';return}
 document.title=`${b.name} — ${SITE.name}`;
 const rows=[["Type",b.type],["Engine displacement",b.engine],["Max power",b.power],["Fuel tank",b.tank],b.mileage&&["Mileage",b.mileage],["Key feature",b.highlight],["Ex-showroom price, Pallu",inr(b.price)]].filter(Boolean);
 box.innerHTML=`<p class="crumb"><a href="collection.html">All bikes</a> / ${b.name}</p><div class="dg"><div>${tile(b).replace('href="bike.html?id='+b.id+'"','href="#" onclick="return false"')}<p class="lead">${desc(b)}</p></div><div><span class="tag">${b.type}${b.group=="new"?" · New launch":b.group=="premium"?" · Premium showcase":""}</span><h1 style="font-size:clamp(2.6rem,6vw,4rem);margin:6px 0 10px">${b.name}</h1>${priceBox(b).replace('1.7rem','2.6rem')}<table style="margin:18px 0">${rows.map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join("")}</table>
 <div class="cta"><a class="btn red" href="contact.html?bike=${b.id}#enquire">Book a test ride</a><a class="btn wa" data-wa="Hi, I want the on-road price of the ${b.name}." >Ask price on WhatsApp</a><a class="btn" href="tel:${SITE.phone}">Call</a></div>
 <p class="note">Ex-showroom price for Pallu. On-road price adds registration, insurance and other charges.</p></div></div>`;
 $$("[data-wa]").forEach(a=>{a.href=wa(a.dataset.wa);a.target="_blank"});
 const rel=BIKES.filter(x=>x.type==b.type&&x.id!=b.id);$("#related").innerHTML=deckHtml(rel.sort((x,y)=>Math.abs(x.price-b.price)-Math.abs(y.price-b.price)).slice(0,8))},
offers(){const sel=$("#eb");sel.innerHTML=BIKES.map(b=>`<option value="${b.id}">${b.name} — ${inr(b.price)}</option>`).join("");const f=()=>{const p=by(sel.value).price,d=+$("#dp").value,n=+$("#tn").value,r=+$("#rt").value/1200,L=p*(1-d/100);$("#dpv").textContent=d+"% ("+inr(p*d/100)+")";$("#tnv").textContent=n+" months";$("#rtv").textContent=$("#rt").value+"%";$("#emiv").textContent=inr(L*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1))};["#eb","#dp","#tn","#rt"].forEach(s=>$(s).oninput=f);f()},
contact(){const sel=$("#fb");sel.innerHTML='<option value="">Not sure yet</option>'+BIKES.map(b=>`<option value="${b.id}">${b.name}</option>`).join("");const q=new URLSearchParams(location.search).get("bike");if(q)sel.value=q;
 $("#send").onclick=()=>{const n=$("#fn").value.trim(),p=$("#fp").value.trim(),b=sel.selectedOptions[0].text,m=$("#fm").value.trim();window.open(wa(`Hi, ${n?"I'm "+n+". ":""}I would like to ${$("#fr").value}${sel.value?" for the "+b:" for a Hero bike"}.${p?" My number: "+p+".":""}${m?" "+m:""}`),"_blank")};
 const st=$("#stabs");SERVICES.forEach((s,i)=>{const b=document.createElement("button");b.role="tab";b.textContent=s[0];b.onclick=()=>sv(i);st.append(b)});function sv(i){[...st.children].forEach((b,j)=>b.setAttribute("aria-selected",i==j));const s=SERVICES[i];$("#spanel").innerHTML=`<h3 style="font-size:2rem">${s[0]}</h3><ul>${s[1].map(x=>`<li>${x}</li>`).join("")}</ul><p style="margin:18px 0 0"><a class="btn red" href="tel:${SITE.phone}">Call to book a service</a></p>`}sv(0);
 $("#acc").innerHTML=WARRANTY.map((w,i)=>`<details ${i?"":"open"}><summary>${w[0]}</summary><p>${w[1]}</p></details>`).join("");$("#faqs").innerHTML=FAQ.map(w=>`<details><summary>${w[0]}</summary><p>${w[1]}</p></details>`).join("")},
exclusive(){const b=BIKES.find(x=>x.exclusive);$("#exname").textContent=b.name;$("#exprice").textContent=inr(b.price);$("#eximg").src=img(b);$("#exstats").innerHTML=[[b.engine,"Engine displacement"],[b.power,"Max power"],[b.tank,"Fuel tank"],[inr(b.price),"Ex-showroom, Pallu"]].map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join("");$("#exhl").textContent=b.highlight;$$("[data-exwa]").forEach(a=>{a.href=wa("Hi, I want to book a test ride for the "+b.name+".");a.target="_blank"});$("#exdet").href="bike.html?id="+b.id}
};
