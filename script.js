/* ===================================
   TRK Gift League V3
   Part 1-A
===================================*/
const bgMusic = new Audio("stadium.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.5;

const goalSound = new Audio("goal.mp3");
const giftSound = new Audio("gift.mp3");
const winnerSound = new Audio("winner.mp3");

// Game Settings

let gameStarted = false;
let gamePaused = false;
let selectedCountry = -1;

// TikTok Gifts

const giftValues = {

Rose:1,

Heart:5,

Perfume:30,

Galaxy:50,

Lion:100

};

// Countries

const countries=[

{flag:"🇵🇰",name:"Pakistan",score:0},
{flag:"🇸🇦",name:"Saudi Arabia",score:0},
{flag:"🇦🇫",name:"Afghanistan",score:0},
{flag:"🇶🇦",name:"Qatar",score:0},

{flag:"🇦🇪",name:"UAE",score:0},

{flag:"🇰🇼",name:"Kuwait",score:0},

{flag:"🇧🇭",name:"Bahrain",score:0},

{flag:"🇴🇲",name:"Oman",score:0},

{flag:"🇯🇴",name:"Jordan",score:0},

{flag:"🇪🇬",name:"Egypt",score:0},

{flag:"🇹🇷",name:"Turkey",score:0},

{flag:"🇮🇳",name:"India",score:0},

{flag:"🇨🇳",name:"China",score:0},

{flag:"🇯🇵",name:"Japan",score:0},

{flag:"🇰🇷",name:"Korea",score:0},

{flag:"🇺🇸",name:"USA",score:0},

{flag:"🇬🇧",name:"United Kingdom",score:0},

{flag:"🇫🇷",name:"France",score:0},

{flag:"🇩🇪",name:"Germany",score:0},

{flag:"🇮🇹",name:"Italy",score:0},

{flag:"🇧🇷",name:"Brazil",score:0}

];

// Viewer Country Data
let viewerCountries = {};

// Current Viewer
let currentViewer = "";

// Stadium

const stadium=document.getElementById("stadium");

// Player Position

let playerPosition=[];

let players=[];

let roads=[];

let balls=[];

let goals=[];

/* ===================================
   TRK Gift League V3
   Part 1-B
===================================*/

// Create Stadium

countries.forEach((country,index)=>{

playerPosition[index]=0;

const lane=document.createElement("div");

lane.className="lane";

lane.innerHTML=`

<div class="flagIcon">
${country.flag}
</div>

<div class="road">

<img src="road.png">

</div>

<div class="player" id="player${index}">

<div class="crown" id="crown${index}">
👑
</div>

<img
class="playerImg"
src="player1.png">

</div>

<div class="ball" id="ball${index}">

<img src="football.png">

</div>

<div class="goal" id="goal${index}">

<img src="goal.png">

</div>

`;

stadium.appendChild(lane);

});

// Save Elements

players=document.querySelectorAll(".player");

balls=document.querySelectorAll(".ball");

goals=document.querySelectorAll(".goal");

roads=document.querySelectorAll(".road");

// Initial Position

players.forEach((player,i)=>{

player.style.left="42px";

balls[i].style.left="58px";

});
/* ===================================
   TRK Gift League V3
   Part 2-A
===================================*/

// Road Speed

let roadSpeed=2;

const roadSlider=document.getElementById("roadSpeed");

if(roadSlider){

roadSlider.oninput=function(){

roadSpeed=this.value;

roads.forEach((road)=>{

road.firstElementChild.style.animationDuration=

roadSpeed+"s";

});

};

}

// Player Move

function movePlayer(index){

let move = (countries[index].score / 5000) * 520;

if(move > 520){
    move = 520;
}

playerPosition[index]=move;

players[index].style.left=(42+move)+"px";

balls[index].style.left=(58+move)+"px";

}

// Add Gift

function addGift(index,points){

if(gamePaused) return;

showGiftBeam(index);

setTimeout(()=>{

giftSound.currentTime=0;

giftSound.play();

countries[index].score+=points;

movePlayer(index);

updateTop3();

updateCrowns();

checkWinner(index);

},500);

}
/* ===================================
   TRK Gift League V3
   Part 2-B
===================================*/

// Update Top 3

function updateTop3(){

let sorted=[...countries].sort((a,b)=>b.score-a.score);

document.getElementById("firstFlag").innerHTML=
"🥇 "+sorted[0].flag;

document.getElementById("firstScore").innerHTML=
sorted[0].score;

document.getElementById("secondFlag").innerHTML=
"🥈 "+sorted[1].flag;

document.getElementById("secondScore").innerHTML=
sorted[1].score;

document.getElementById("thirdFlag").innerHTML=
"🥉 "+sorted[2].flag;

document.getElementById("thirdScore").innerHTML=
sorted[2].score;

}

// Crown

function updateCrowns(){

document.querySelectorAll(".crown").forEach(c=>{

c.style.display="none";

});

let leader=0;

for(let i=1;i<countries.length;i++){

if(countries[i].score>countries[leader].score){

leader=i;

}

}

document.getElementById("crown"+leader).style.display="block";

}

// Goal + Winner

function checkWinner(index){

if(countries[index].score>=5000){

players[index].style.left="562px";

balls[index].style.left="578px";

goalSound.currentTime=0;

goalSound.play();

goals[index].classList.add("glow");

setTimeout(()=>{

goals[index].classList.remove("glow");

},800);

winner(index);

}

}

// Winner Screen

function winner(index){

winnerSound.play();

document.getElementById("winnerScreen").style.display="flex";

document.getElementById("winnerFlag").innerHTML=
countries[index].flag;

document.getElementById("winnerName").innerHTML=
countries[index].name;

}
function showGiftBeam(index){

const orb = document.getElementById("giftOrb");
const player = players[index];
const rect = player.getBoundingClientRect();

orb.style.display = "block";

// Player کی صحیح Screen Position
orb.style.left = "20px";
orb.style.top = (rect.top + rect.height/2 - 11) + "px";

setTimeout(()=>{

    orb.style.left = (rect.left + rect.width/2 - 11) + "px";
    orb.style.top = (rect.top + rect.height/2 - 11) + "px";

},20);

setTimeout(()=>{

    player.classList.add("playerFlash");

    setTimeout(()=>{
        player.classList.remove("playerFlash");
    },300);

    orb.style.display="none";

},500);

}
/* ===================================
   TRK Gift League V3
   Part 3-A
===================================*/

// Gift Alert

function showGiftAlert(country,gift){

const alert=document.getElementById("giftAlert");

alert.innerHTML=
`🎁 ${country} received ${gift}`;

alert.style.display="block";

setTimeout(()=>{

alert.style.display="none";

},2000);

}

// TikTok LIVE Comments

const demoComments=[

"Ali : Go Pakistan 🇵🇰",

"Sara : Lion x1 🦁",

"Ahmed : Rose x10 🌹",

"TRK : Heart x5 ❤️",

"King : Galaxy x1 🪐",

"Zain : Go Saudi 🇸🇦",

"Usman : Perfume 🌸",

"Noor : Amazing 🔥"

];

function addComment(){

const box=document.getElementById("commentBox");

const div=document.createElement("div");

div.className="comment";

div.innerHTML=
demoComments[Math.floor(Math.random()*demoComments.length)];

box.prepend(div);

if(box.children.length>6){

box.removeChild(box.lastChild);

}

}

// ہر 3 سیکنڈ بعد ایک Comment

setInterval(()=>{

if(gameStarted && !gamePaused){

addComment();

}

},3000);

// Demo Gift ہر 5 سیکنڈ

setInterval(()=>{

if(gameStarted && !gamePaused){

let country=Math.floor(Math.random()*countries.length);

let gifts=[1,5,30,50,100];

let value=gifts[Math.floor(Math.random()*gifts.length)];

addGift(country,value);

showGiftAlert(countries[country].name,value+" Points");

}

},5000);
/* ===================================
   TRK Gift League V3
   Part 3-B
=================================== */

// Start Game

document.getElementById("startGame").onclick=function(){

gameStarted=true;

document.getElementById("mainMenu").style.display="none";

bgMusic.play();

};



// Pause
document.getElementById("pauseBtn").onclick = function () {
    gamePaused = !gamePaused;
    this.innerHTML = gamePaused ? "▶" : "⏸";
};

// Settings

document.getElementById("settingsBtn").onclick=function(){

document.getElementById("settingsMenu").style.display="flex";

};

document.getElementById("closeSettings").onclick=function(){

document.getElementById("settingsMenu").style.display="none";

};

// Country Menu

document.getElementById("countryBtn").onclick=function(){

document.getElementById("countryMenu").style.display="flex";

};

document.getElementById("closeCountry").onclick=function(){

document.getElementById("countryMenu").style.display="none";

};

// Splash Screen

setTimeout(()=>{

document.getElementById("splashScreen").style.display="none";

document.getElementById("mainMenu").style.display="flex";

},2500);
/* ===================================
   TRK Gift League V3
   Part 4-A
=================================== */

// Create Country List

const countryList=document.getElementById("countryList");

if(countryList){

countries.forEach((country,index)=>{

const btn=document.createElement("button");

btn.className="menuBtn";

btn.innerHTML=country.flag+" "+country.name;

btn.onclick=function(){

selectedCountry=index;

document.querySelectorAll("#countryList .menuBtn").forEach(b=>{

b.classList.remove("countrySelected");

});

btn.classList.add("countrySelected");

};

countryList.appendChild(btn);

});

}

// Leaderboard

document.getElementById("leaderboardBtn").onclick=function(){

let text="🏆 TOP COUNTRIES\n\n";

let sorted=[...countries].sort((a,b)=>b.score-a.score);

sorted.forEach((c,i)=>{

text+=(i+1)+". "+c.flag+" "+c.name+" - "+c.score+"\n";

});

alert(text);

};

// How To Play

const howBtn=document.getElementById("howBtn");

if(howBtn){

howBtn.onclick=function(){

alert(

"🎮 HOW TO PLAY\n\n"+

"🌹 Rose = +1\n"+

"❤️ Heart = +5\n"+

"🌸 Perfume = +20\n"+

"🪐 Galaxy = +50\n"+

"🦁 Lion = +100\n\n"+
"🏆 پہلے 5000 پوائنٹس حاصل کرنے والا ملک جیت جائے گا۔"
);

};

}

// TikTok Connect

const connectBtn=document.getElementById("connectBtn");

if(connectBtn){

connectBtn.onclick=function(){

alert(

"📺 TikTok LIVE Connect\n\n"+

"یہ فیچر بعد میں TikTok LIVE API کے ساتھ جوڑا جائے گا۔"

);

};

}
/* ===================================
   TRK Gift League V3
   Part 4-B FINAL
=================================== */

// Winner Celebration

function celebrateWinner(){

// Confetti

for(let i=0;i<80;i++){

const c=document.createElement("div");

c.className="confetti";

c.style.left=Math.random()*100+"vw";

c.style.background=
["red","yellow","blue","green","orange","pink"][Math.floor(Math.random()*6)];

c.style.animationDelay=(Math.random()*2)+"s";

document.body.appendChild(c);

setTimeout(()=>{

c.remove();

},4500);

}

// Fireworks

for(let i=0;i<15;i++){

const f=document.createElement("div");

f.className="firework";

f.style.left=Math.random()*100+"vw";

f.style.top=Math.random()*60+"vh";

document.body.appendChild(f);

setTimeout(()=>{

f.remove();

},900);

}

}

// Winner

function winner(index){

winnerSound.currentTime=0;

winnerSound.play();

celebrateWinner();

document.getElementById("winnerScreen").style.display="flex";

document.getElementById("winnerFlag").innerHTML=countries[index].flag;

document.getElementById("winnerName").innerHTML=countries[index].name;

document.getElementById("winnerText").innerHTML="🏆 Champion";

}

// Road Speed

roads.forEach((road)=>{

road.firstElementChild.style.animation="roadMove 2s linear infinite";

});

// First Update

updateTop3();

updateCrowns();

console.log("✅ TRK Gift League V3 Ready");
/* ===================================
   TRK Gift League V3
   Part 5-A
=================================== */

// TikTok Gift List

const tiktokGifts={

Rose:{points:1,emoji:"🌹"},

Heart:{points:5,emoji:"❤️"},

Perfume:{points:30,emoji:"🌸"},

Galaxy:{points:50,emoji:"🪐"},

Lion:{points:100,emoji:"🦁"}

};

// Gift History

let giftHistory=[];

// Top Gifters

let topGifters={};

// Receive Gift

function receiveGift(countryIndex,giftName,gifter){

if(!tiktokGifts[giftName]) return;

const gift=tiktokGifts[giftName];

// Add Score

addGift(countryIndex,gift.points);

// Gift Alert

showGiftAlert(

countries[countryIndex].name,

gift.emoji+" "+giftName

);

// Save History

giftHistory.unshift({

country:countries[countryIndex].name,

gift:giftName,

gifter:gifter,

points:gift.points

});

// Only Keep 30 Gifts

if(giftHistory.length>30){

giftHistory.pop();

}

// Top Gifter

if(!topGifters[gifter]){

topGifters[gifter]=0;

}

topGifters[gifter]+=gift.points;

}
/* ===================================
   TRK Gift League V3
   Part 5-B
=================================== */

// Show Gift History

function showGiftHistory(){

let text="🎁 GIFT HISTORY\n\n";

giftHistory.forEach((g,i)=>{

text+=`${i+1}. ${g.gifter}
→ ${g.country}
${g.gift} (+${g.points})\n\n`;

});

if(giftHistory.length===0){

text="No Gifts Yet";

}

alert(text);

}

// Show Top Gifters

function showTopGifters(){

let arr=[];

for(let name in topGifters){

arr.push({

name:name,

score:topGifters[name]

});

}

arr.sort((a,b)=>b.score-a.score);

let text="🏆 TOP GIFTERS\n\n";

arr.forEach((g,i)=>{

text+=`${i+1}. ${g.name}
(${g.score} Points)\n`;

});

if(arr.length===0){

text="No Gifters Yet";

}

alert(text);

}

// Demo Gifts

const demoGifters=[

"Ali",

"Ahmed",

"TRK",

"King",

"Sara",

"Noor",

"Usman",

"Fahad"

];

const demoGiftNames=[

"Rose",

"Heart",

"Perfume",

"Galaxy",

"Lion"

];

setInterval(()=>{

if(!gameStarted) return;

if(gamePaused) return;

const country=

Math.floor(Math.random()*countries.length);

const gift=

demoGiftNames[

Math.floor(Math.random()*demoGiftNames.length)

];

const gifter=

demoGifters[

Math.floor(Math.random()*demoGifters.length)

];

receiveGift(

country,

gift,

gifter

);

},7000);
/* ===================================
   TRK Gift League V3
   Part 6-A
=================================== */

// Save Game

function saveGame(){

localStorage.setItem(

"TRK_COUNTRIES",

JSON.stringify(countries)

);

localStorage.setItem(

"TRK_GIFTERS",

JSON.stringify(topGifters)

);

}

// Load Game

function loadGame(){

let data=localStorage.getItem("TRK_COUNTRIES");

if(data){

let old=JSON.parse(data);

old.forEach((c,i)=>{

countries[i].score=c.score;

movePlayer(i);

});

}

let g=localStorage.getItem("TRK_GIFTERS");

if(g){

topGifters=JSON.parse(g);

}

updateTop3();

updateCrowns();

}

// Auto Save

setInterval(()=>{

if(gameStarted && !gamePaused){

saveGame();

}

},5000);

// Game Over

function gameOver(index){

winner(index);

saveGame();

}

// Replace Winner Check

function checkWinner(index){

if(countries[index].score>=5000){

countries[index].score=5000;

movePlayer(index);

goalSound.currentTime=0;

goalSound.play();

goals[index].classList.add("glow");

setTimeout(()=>{

goals[index].classList.remove("glow");

},800);

gameOver(index);

}

}

// Load Saved Data

loadGame();
/* ===================================
   TRK Gift League V3
   Part 6-B FINAL
=================================== */

console.log("🚀 TRK Gift League V3 Loaded");

// Version

const GAME_VERSION="TRK Gift League V3.0";

// TikTok LIVE Ready

const TikTokLIVE={

connected:false,

username:"",

connect:function(username){

this.connected=true;

this.username=username;

console.log("TikTok Connected:",username);

},

disconnect:function(){

this.connected=false;

this.username="";

console.log("TikTok Disconnected");

}

};

// TikTok Gift Event

function onTikTokGift(countryIndex,giftName,gifter){

receiveGift(countryIndex,giftName,gifter);

}

// TikTok Comment Event

function onTikTokComment(user,message){

const box=document.getElementById("commentBox");

if(!box) return;

const div=document.createElement("div");

div.className="comment";

div.innerHTML=`💬 ${user}: ${message}`;

box.prepend(div);

while(box.children.length>8){

box.removeChild(box.lastChild);

}

}

// Reset Game

function resetGame(){

countries.forEach((c,i)=>{

c.score=0;

playerPosition[i]=0;

movePlayer(i);

});

giftHistory=[];

topGifters={};

updateTop3();

updateCrowns();

document.getElementById("winnerScreen").style.display="none";

}

// Buttons

const playAgainBtn=document.getElementById("playAgain");

if(playAgainBtn){

playAgainBtn.onclick=function(){

resetGame();

};

}

const backMenuBtn=document.getElementById("backMenu");

if(backMenuBtn){

backMenuBtn.onclick=function(){

document.getElementById("winnerScreen").style.display="none";

document.getElementById("mainMenu").style.display="flex";

gameStarted=false;

};

}
const restartBtn = document.getElementById("restartBtn");

if (restartBtn) {
    restartBtn.onclick = function () {
        resetGame();
    };
}
// Ready

console.log("✅ Game Ready For TikTok LIVE");
console.log("✅ Play Store Ready");
console.log("✅ App Store Ready");
console.log("🏆 "+GAME_VERSION);

// =======================
// MUSIC SETTINGS
// =======================

const musicToggle = document.getElementById("musicToggle");

if(musicToggle){

musicToggle.onchange = function(){

if(this.checked){

bgMusic.play();

}else{

bgMusic.pause();

}

};

}
// =======================
// VOLUME SLIDER
// =======================

const volumeSlider = document.getElementById("volumeSlider");

if(volumeSlider){

volumeSlider.oninput = function(){

bgMusic.volume = this.value / 100;

goalSound.volume = this.value / 100;
giftSound.volume = this.value / 100;
winnerSound.volume = this.value / 100;
};

}

document.getElementById("exitBtn").onclick = function(){

if(confirm("Are you sure you want to exit?")){

window.close();

}

};
document.getElementById("gameSettingsBtn").onclick = function(){

document.getElementById("settingsMenu").style.display = "flex";

};