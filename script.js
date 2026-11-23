const $ = id => document.getElementById(id);
const defaults = {
  settings:{address:"",port:"19132",discord:""},
  leaderboard:[
    {name:"PlayerOne",stat:"Playtime",value:"42 hrs"},
    {name:"BuilderNova",stat:"Builds",value:"18"},
    {name:"MinerKai",stat:"Blocks mined",value:"2,450"}
  ],
  events:[
    {date:"COMING SOON",title:"Community Launch",description:"Our first big community gathering. Details will be announced soon.",tag:"Community"},
    {date:"WEEKLY",title:"Build Showcase",description:"Share your latest creation and get featured on our community page.",tag:"Creative"},
    {date:"TBA",title:"Adventure Day",description:"Team up with other players for a server-wide adventure.",tag:"Adventure"}
  ],
  news:[
    {date:"WELCOME",title:"Welcome to SAPHYRAEN SMP",description:"This is the official home of our Bedrock community. Stay tuned for server updates and events."},
    {date:"ANNOUNCEMENT",title:"Website is now open",description:"Check this page for community news, staff information, and upcoming activities."}
  ],
  team:[
    {name:"Server Owner",role:"OWNER",description:"Leads the community and manages the server."},
    {name:"Administrator",role:"ADMIN",description:"Helps maintain a fair and friendly server."},
    {name:"Moderator",role:"MODERATOR",description:"Supports players and keeps the community welcoming."}
  ]
};
let data;
try { data = JSON.parse(localStorage.getItem("saphyraenData")) || structuredClone(defaults); } catch { data = structuredClone(defaults); }
function save(){localStorage.setItem("saphyraenData",JSON.stringify(data));$("saveMessage").textContent="Saved in this browser ✓";}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function render(){
  $("leaderboardRows").innerHTML=data.leaderboard.map((p,i)=>`<div class="player-row"><span class="rank">#${i+1}</span><span class="player-name">${esc(p.name)}</span><span class="player-stat">${esc(p.stat)}</span><span class="player-value">${esc(p.value)}</span></div>`).join("")||'<p class="admin-hint" style="padding:18px">No leaderboard entries yet.</p>';
  $("eventGrid").innerHTML=data.events.map(e=>`<article class="event-card"><div class="event-date">${esc(e.date)}</div><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p><span class="tag">${esc(e.tag)}</span></article>`).join("");
  $("newsGrid").innerHTML=data.news.map(n=>`<article class="news-card"><div class="news-date">${esc(n.date)}</div><h3>${esc(n.title)}</h3><p>${esc(n.description)}</p></article>`).join("");
  $("teamGrid").innerHTML=data.team.map(t=>`<article class="team-card"><div class="avatar">${esc((t.name||"?").slice(0,1).toUpperCase())}</div><h3>${esc(t.name)}</h3><div class="team-role">${esc(t.role)}</div><p>${esc(t.description)}</p></article>`).join("");
  const invite=data.settings.discord||"#";
  ["discordTop","discordHero","discordBottom"].forEach(id=>$(id).href=invite);
  $("discordTop").style.opacity=invite==="#"?".55":"1";
}
function renderEditors(){
  $("leaderboardEditor").innerHTML=data.leaderboard.map((p,i)=>editorRow(i,[p.name,p.stat,p.value],"lb")).join("");
  $("eventEditor").innerHTML=data.events.map((e,i)=>editorRow(i,[e.date,e.title,e.tag],"ev",e.description)).join("");
  $("newsEditor").innerHTML=data.news.map((n,i)=>editorRow(i,[n.date,n.title],"nw",n.description)).join("");
  $("teamEditor").innerHTML=data.team.map((t,i)=>editorRow(i,[t.name,t.role],"tm",t.description)).join("");
}
function editorRow(i,vals,type,desc=""){
 return `<div class="editor-item" data-type="${type}" data-index="${i}">${vals.map((v,j)=>`<input data-field="${j}" aria-label="Field ${j+1}" value="${esc(v)}" placeholder="${type==="lb"?["Player","Stat","Value"][j]:type==="ev"?["Date","Event title","Category"][j]:type==="nw"?["Label","Announcement title"][j]:["Name","Role"][j]}">`).join("")}${desc!==""?`<input data-field="desc" value="${esc(desc)}" placeholder="Description">`:""}<button class="remove" type="button">×</button></div>`;
}
function readEditor(id,fields,hasDesc){
 return [...$(id).querySelectorAll(".editor-item")].map(row=>{
  const obj={};fields.forEach((f,i)=>obj[f]=row.querySelector(`[data-field="${i}"]`)?.value.trim()||"");
  if(hasDesc)obj.description=row.querySelector('[data-field="desc"]')?.value.trim()||"";
  return obj;
 });
}
function setupEditorRemoval(){document.querySelectorAll(".editor-item .remove").forEach(b=>b.onclick=()=>b.closest(".editor-item").remove());}
function openAdmin(){$("adminModal").classList.add("open");$("adminModal").setAttribute("aria-hidden","false");$("cfgAddress").value=data.settings.address;$("cfgPort").value=data.settings.port;$("cfgDiscord").value=data.settings.discord;renderEditors();setupEditorRemoval();}
function closeAdmin(){$("adminModal").classList.remove("open");$("adminModal").setAttribute("aria-hidden","true");}
$("adminOpen").onclick=openAdmin;$("adminClose").onclick=closeAdmin;$("adminModal").addEventListener("click",e=>{if(e.target===$("adminModal"))closeAdmin();});
document.querySelectorAll(".tab").forEach(tab=>tab.onclick=()=>{document.querySelectorAll(".tab,.tab-panel").forEach(x=>x.classList.remove("active"));tab.classList.add("active");$("tab-"+tab.dataset.tab).classList.add("active");});
$("saveGeneral").onclick=()=>{data.settings={address:$("cfgAddress").value.trim(),port:$("cfgPort").value.trim()||"19132",discord:$("cfgDiscord").value.trim()};save();render();checkStatus();};
$("saveLeaderboard").onclick=()=>{data.leaderboard=readEditor("leaderboardEditor",["name","stat","value"],false);save();render();};
$("saveEvents").onclick=()=>{data.events=readEditor("eventEditor",["date","title","tag"],true);save();render();};
$("saveNews").onclick=()=>{data.news=readEditor("newsEditor",["date","title"],true);save();render();};
$("saveTeam").onclick=()=>{data.team=readEditor("teamEditor",["name","role"],true);save();render();};
function addRow(container,type,vals,desc=""){const wrap=$(container);const div=document.createElement("div");div.outerHTML=editorRow(wrap.querySelectorAll(".editor-item").length,vals,type,desc);wrap.insertAdjacentHTML("beforeend",editorRow(wrap.querySelectorAll(".editor-item").length,vals,type,desc));setupEditorRemoval();}
$("addPlayer").onclick=()=>addRow("leaderboardEditor","lb",["","",""]);
$("addEvent").onclick=()=>addRow("eventEditor","ev",["","",""],"");
$("addNews").onclick=()=>addRow("newsEditor","nw",["",""],"");
$("addStaff").onclick=()=>addRow("teamEditor","tm",["",""],"");
$("resetDemo").onclick=()=>{if(confirm("Reset all website content to the original demo data?")){data=structuredClone(defaults);save();render();openAdmin();}};
async function checkStatus(){
 const address=data.settings.address,port=data.settings.port||"19132";
 if(!address){$("serverState").textContent="Not configured yet";$("serverAddress").textContent="Add your Bedrock IP in Admin Dashboard";$("playerCount").textContent="—";$("statusLight").className="status-light";return;}
 $("serverState").textContent="Checking…";$("serverAddress").textContent=`${address}:${port}`;
 try{
  const response=await fetch(`https://api.mcsrvstat.us/bedrock/3/${encodeURIComponent(address)}:${encodeURIComponent(port)}`);
  if(!response.ok)throw new Error("Status service unavailable");
  const result=await response.json();
  if(result.online){$("serverState").textContent="Online";$("statusLight").className="status-light online";$("playerCount").textContent=result.players?.online??"0";$("serverVersion").textContent=result.version||"Bedrock";}
  else{$("serverState").textContent="Offline";$("statusLight").className="status-light offline";$("playerCount").textContent="0";}
  $("statusNote").textContent="Status last checked just now. Public status services may occasionally be delayed or unavailable.";
 }catch(e){$("serverState").textContent="Status unavailable";$("statusLight").className="status-light";$("playerCount").textContent="—";$("statusNote").textContent="Could not reach the public status service. Check the IP/port or try again later.";}
}
$("refreshStatus").onclick=checkStatus;
$("menuToggle").onclick=()=>$("nav").classList.toggle("open");
$("nav").querySelectorAll("a").forEach(a=>a.onclick=()=>$("nav").classList.remove("open"));
$("year").textContent=new Date().getFullYear();
render();checkStatus();
