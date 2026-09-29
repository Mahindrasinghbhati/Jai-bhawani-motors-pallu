/* ==========================================================================
   EDIT HERE — the single source of truth for every bike, price and contact detail.
   Prices are ex-showroom, Pallu, exactly as given in all_bike.pdf.
   group: "new" (newly launched), "premium" (premium showcase), "normal".
   featured: true  -> appears on featured.html and the home page "Key bikes" strip.
   exclusive: true -> gets the bespoke page exclusive.html.
   Image files live in images/bikes/<id>.jpg (all 960x640).
   ========================================================================== */
const SITE={name:"Jai Bhawani Motors",owner:"Mahender Singh Bhati",phone:"9672000078",phoneShow:"96720 00078",
 email:"mahindersinghbhati@gmail.com",address:"Near Jaat Dharmshala, Mistri Market, Pallu, Rajasthan",
 mapQuery:"Pallu Hanumangarh Rajasthan Mistri Market",hours:{week:[9,19],sun:[10,16]},
 hoursText:["Mon – Sat 9:00 AM – 7:00 PM","Sunday 10:00 AM – 4:00 PM"]};
const BIKES=[
/* ---- Newly launched ---- */
{id:"destini-110",name:"Destini 110",type:"Scooter",group:"new",featured:true,engine:"110.9 cc",power:"6.02 kW @ 7250 rpm",tank:"5.3 L",mileage:"56.2 kmpl",highlight:"Best-in-class 56.2 kmpl mileage",price:75527},
{id:"xoom-125",name:"Xoom 125",type:"Scooter",group:"new",featured:true,engine:"124.6 cc",power:"9.8 BHP @ 7250 rpm",tank:"5 L",highlight:"Digital speedometer with turn-by-turn navigation",price:89052},
{id:"super-splendor-xtec-2",name:"Super Splendor Xtec 2.0",type:"Motorcycle",group:"new",featured:true,engine:"124.7 cc",power:"10.7 BHP @ 7500 rpm",tank:"12 L",highlight:"i3S technology",price:85500},
{id:"xoom-160",name:"Xoom 160",type:"Scooter",group:"new",featured:true,engine:"156 cc",power:"14.6 BHP @ 8000 rpm",tank:"7 L",highlight:"i3S technology",price:146759},
{id:"passion-plus",name:"Passion+",type:"Motorcycle",group:"new",engine:"97.2 cc",power:"5.9 kW @ 8000 rpm",tank:"11 L",highlight:"i3S technology",price:80791},
{id:"splendor-plus-flex",name:"Splendor+ Flex",type:"Motorcycle",group:"new",engine:"97.2 cc",power:"6.3 kW (with E85) @ 8000 rpm",tank:"9.8 L",highlight:"i3S technology",price:83073},
{id:"hf-deluxe-flex",name:"HF Deluxe Flex",type:"Motorcycle",group:"new",engine:"97.2 cc",power:"6.3 kW (with E85) @ 8000 rpm",tank:"9.6 L",highlight:"i3S technology",price:68923},
/* ---- Premium showcase ---- */
{id:"xtreme-160r-4v",name:"Xtreme 160R 4V",type:"Motorcycle",group:"premium",exclusive:true,engine:"163.2 cc",power:"16.9 Ps @ 8500 rpm",tank:"12 L",highlight:"First in segment: new Panic Brake Alert",price:134428},
{id:"xtreme-160r",name:"Xtreme 160R",type:"Motorcycle",group:"premium",engine:"163.2 cc",power:"15 Ps @ 8500 rpm",tank:"12 L",highlight:"First in segment: Drag Timer",price:112456},
{id:"xpulse-200-4v",name:"Xpulse 200 4V",type:"Motorcycle",group:"premium",engine:"199.6 cc",power:"18.9 BHP @ 8500 rpm",tank:"13 L",highlight:"Adjustable front and rear suspension",price:148353},
/* ---- Regular models ---- */
{id:"xoom-110",name:"Xoom 110",type:"Scooter",group:"normal",engine:"110.9 cc",power:"8.05 BHP @ 7250 rpm",tank:"5.2 L",highlight:"i3S technology",price:77498},
{id:"splendor-plus",name:"Splendor+",type:"Motorcycle",group:"normal",engine:"97.2 cc",power:"5.9 kW @ 8000 rpm",tank:"9.8 L",highlight:"i3S technology",price:77904},
{id:"hf-deluxe",name:"HF Deluxe",type:"Motorcycle",group:"normal",engine:"97.2 cc",power:"5.9 kW @ 8000 rpm",tank:"9.6 L",highlight:"i3S technology",price:59999},
{id:"splendor-plus-xtec-2",name:"Splendor+ Xtec 2.0",type:"Motorcycle",group:"normal",engine:"97.2 cc",power:"5.9 kW @ 8000 rpm",tank:"9.8 L",highlight:"i3S technology",price:84094},
{id:"glamour-x",name:"Glamour X",type:"Motorcycle",group:"normal",engine:"124.7 cc",power:"8.5 kW @ 8250 rpm",tank:"10 L",highlight:"Advanced Electronic Ride Assist (AERA) tech",price:90488},
{id:"xtreme-125r",name:"Xtreme 125R",type:"Motorcycle",group:"normal",engine:"124.7 cc",power:"11.4 BHP @ 8250 rpm",tank:"10 L",highlight:"0–60 km/h in 5.7 seconds, fastest in the segment",price:92627},
{id:"destini-prime",name:"Destini Prime",type:"Scooter",group:"normal",engine:"124.6 cc",power:"9 BHP @ 7000 rpm",tank:"5 L",highlight:"i3S technology",price:77859},
{id:"super-splendor-xtec",name:"Super Splendor Xtec",type:"Motorcycle",group:"normal",engine:"124.7 cc",power:"10.7 BHP @ 7500 rpm",tank:"12 L",highlight:"i3S technology",price:83884},
{id:"hf-100",name:"HF 100",type:"Motorcycle",group:"normal",engine:"97.2 cc",power:"5.9 kW @ 8000 rpm",tank:"9.1 L",highlight:"xSESN FI technology",price:57662},
{id:"new-destini-125",name:"New Destini 125",type:"Scooter",group:"normal",engine:"124.6 cc",power:"9 BHP @ 7000 rpm",tank:"5.3 L",highlight:"Auto-cancel winkers",price:82340},
{id:"splendor-plus-xtec",name:"Splendor+ Xtec",type:"Motorcycle",group:"normal",engine:"97.2 cc",power:"5.9 kW @ 8000 rpm",tank:"9.8 L",highlight:"i3S technology",price:81663},
{id:"pleasure-plus-xtec",name:"Pleasure+ Xtec",type:"Scooter",group:"normal",engine:"110.9 cc",power:"8 BHP @ 7000 rpm",tank:"4.8 L",highlight:"i3S technology",price:71674},
{id:"glamour",name:"Glamour",type:"Motorcycle",group:"normal",engine:"124.7 cc",power:"7.75 kW @ 7500 rpm",tank:"10 L",mileage:"65 kmpl",highlight:"65 kmpl mileage",price:84360}];
/* Copy shown on the site. Offer wording on the banners comes from heromotocorp.com. */
const OFFERS=[["Pre-book for ₹1,500","The token secures your bike. It is deducted from the final bill, or fully refunded if you change your mind."],["Ready or in 7 days","Common models are ready now. Custom colours and premium trims take about 7 days from our regional Hero depot."],["Rural EMI plans","Low-interest credit for farming families with schedules that follow seasonal income. Standard local documents are accepted."],["Festive delivery","Hero's festive campaign: pre-book now to get delivery during Navratri. Ask us for this week's live offers."]];
const SERVICES=[["Periodic maintenance",["Engine oil and filter change","Spark plug calibration","Air filter service","Multi-point safety check","Throttle and brake adjustment"]],["Engine & transmission",["Carburetor cleaning and tuning","Valve clearance and timing","Clutch plate replacement","Gear mechanism servicing","Engine top-overhaul"]],["Brakes & suspension",["Brake shoe and disc pad fitting","Brake fluid flush and bleed","Fork seal overhaul","Shock absorber servicing","Caliper cleaning"]],["Electrical",["Battery testing and replacement","Starter motor repair","Wiring harness testing","Digital console fix","Lights and indicator repair"]],["Genuine spares",["OEM parts at the counter","Official gaskets and seals","Throttle and brake cables","Filters, bulbs and consumables","Fitted on the spot"]],["Wheels & chain",["Chain cleaning and lubrication","Slack adjustment","Wheel bearing replacement","Tyre pressure and balancing","Rim and spoke tightening"]]];
const WARRANTY=[["5 years / 70,000 km","Full cover, whichever limit is reached first. Factory-backed on every new Hero."],["Service every 90 days","Regular servicing at an authorised Hero dealer keeps your warranty valid."],["Genuine parts only","The warranty holds only with official Hero MotoCorp parts fitted at an authorised centre like ours."],["Factory defects covered","Damage from accidents, modifications or misuse is excluded under Hero's policy."]];
const FAQ=[["Do I need an appointment for a test ride?","No. Walk in any day except major holidays, or send a request from this site."],["Is the listed price what I pay?","Listed prices are ex-showroom for Pallu. On-road price adds registration, insurance and other charges, so ask us for the exact figure."],["How long does delivery take?","Common models are ready now. Custom colours and premium trims take about 7 days."],["Can I buy on EMI?","Yes. We offer rural EMI plans with flexible schedules. Ask us about documents."],["Where is the showroom?","Near Jaat Dharmshala, Mistri Market, Pallu, Rajasthan."]];
