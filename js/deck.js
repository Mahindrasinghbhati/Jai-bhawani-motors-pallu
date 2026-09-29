/* Swipeable depth-card deck: native touch swipe + scroll-snap, mouse drag, arrows, dots, keyboard. */
(function(){
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
function Deck(root){
 const track=root.querySelector(".deck-track"),cards=[...track.children],dots=root.querySelector(".deck-dots"),prev=root.querySelector(".deck-prev"),next=root.querySelector(".deck-next");
 let raf=0,drag=null,moved=false,active=0;
 if(dots)dots.innerHTML=cards.map((_,i)=>`<button aria-label="Card ${i+1}"></button>`).join("");
 function go(i,smooth=true){i=Math.max(0,Math.min(cards.length-1,i));const c=cards[i];track.scrollTo({left:c.offsetLeft+c.offsetWidth/2-track.clientWidth/2,behavior:smooth&&!reduce?"smooth":"auto"})}
 function update(){raf=0;const mid=track.scrollLeft+track.clientWidth/2;let best=0,bd=1e9;
  cards.forEach((c,i)=>{const d=(c.offsetLeft+c.offsetWidth/2-mid)/c.offsetWidth,a=Math.min(Math.abs(d),2);if(Math.abs(d)<bd){bd=Math.abs(d);best=i}
   c.style.transform=reduce?"":`perspective(1100px) translateZ(${-a*70}px) rotateY(${-d*14}deg) scale(${1-a*.07})`;c.style.opacity=reduce?1:1-Math.min(a,1.6)*.28;c.style.zIndex=10-Math.round(a);c.classList.toggle("on",i==best)});
  active=best;if(dots)[...dots.children].forEach((b,i)=>b.classList.toggle("on",i==best))}
 const req=()=>{if(!raf)raf=requestAnimationFrame(update)};
 track.addEventListener("scroll",req,{passive:true});addEventListener("resize",req);
 if(dots)dots.onclick=e=>{const i=[...dots.children].indexOf(e.target);if(i>=0)go(i)};
 if(prev)prev.onclick=()=>go(active-1);if(next)next.onclick=()=>go(active+1);
 root.addEventListener("keydown",e=>{if(e.key=="ArrowRight")go(active+1);if(e.key=="ArrowLeft")go(active-1)});
 track.addEventListener("pointerdown",e=>{if(e.pointerType!="mouse"||e.button)return;drag={x:e.clientX,s:track.scrollLeft};moved=false;track.classList.add("drag")});
 addEventListener("pointermove",e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>5)moved=true;track.scrollLeft=drag.s-dx});
 addEventListener("pointerup",()=>{if(!drag)return;drag=null;track.classList.remove("drag");go(active)});
 track.addEventListener("click",e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
 track.addEventListener("dragstart",e=>e.preventDefault());
 cards.forEach((c,i)=>c.addEventListener("focusin",()=>go(i)));
 const start=+root.dataset.start||0;requestAnimationFrame(()=>{go(start,false);update()});
}
document.querySelectorAll(".deck").forEach(Deck);
})();
