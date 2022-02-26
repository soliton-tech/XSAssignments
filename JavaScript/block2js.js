let a2=document.querySelector(".a2");
let s=0;
let valofSb=document.getElementById("sb");
window.onload=(async function(){
    let response=await fetch("https://soliton.glitch.me/all-timezone-cities");
    if(response.ok){
        a=await response.json();
    }
    else{alert("data not fetched");}
    climateBlock(a,x="all");
})();
let sun =document.getElementById("sun");
sun.addEventListener("click",function underscore(){
sun.style.borderBottom="blue solid 4px";s=1;
sun.style.borderRadius="50px"
snow.style.borderBottom="";
rain.style.borderBottom="";
sunfun();
});
let snow =document.getElementById("snow");
snow.addEventListener("click",function underscore(){
snow.style.borderBottom="blue solid 4px";s=2;
snow.style.borderRadius="50px"
sun.style.borderBottom="";
rain.style.borderBottom="";
snowfun();
});
let rain =document.getElementById("rain");
rain.addEventListener("click",function underscore(){
rain.style.borderBottom="rgb(7, 23, 255) solid 4px";s=3;
rain.style.borderRadius="50px";
snow.style.borderBottom="";
sun.style.borderBottom="";
rainfun();
});
function sb(){
     if (s==1){
        sunfun();
    }else if(s==2){
        snowfun();
    }else{
        rainfun();
    }
}
function sunfun(){
    let d=[];
    d=a.filter((tem)=>{
       return parseInt(tem.temperature,10) > 29});
    d=d.filter((hum)=>{
        return parseInt(hum.humidity,10)<50
    });
    d=d.filter((pre)=>{
        return parseInt(pre.precipitation,10)>=50
    });
    d.sort(function(g,h){
        return parseInt(h.temperature,10) - parseInt(g.temperature,10)});        
        let x="../assets/background/sunnyIcon.svg"
        climateBlock(d,x); 
}
function snowfun(){
    let d=[];
    d=a.filter((tem)=>{
       return (parseInt(tem.temperature,10) < 29)&&(parseInt(tem.temperature,10) >21)});
    d=d.filter((hum)=>{
        return parseInt(hum.humidity,10)>50
    });
    d=d.filter((pre)=>{
        return parseInt(pre.precipitation,10)<50
    });
    d=d.sort(function(h,g){
        return parseInt(h.precipitation,10) - parseInt(g.precipitation,10)});
        
        let x="../assets/background/snowflakeIcon.svg"
        climateBlock(d,x); 
}
function rainfun(){
    let d=[];
    d=a.filter((tem)=>{
       return parseInt(tem.temperature,10) <20});
    d=d.filter((hum)=>{
        return parseInt(hum.humidity,10)>=50
    });
    d.sort(function(g,h){
        return parseInt(g.humidity,10) - parseInt(h.humidity,10)});      
        let x="../assets/background/rainyIcon.svg"
        climateBlock(d,x); 
    }
function climateBlock(d,x){
    if(d==0){d=a;
    console.log(d);} 
    a2.innerHTML="";let i;
    for( i=0;i<valofSb.value && i<d.length;i++){
    let a2b=document.createElement("div");
    a2.appendChild(a2b);
    a2b.classList.add("a2b");
    let a2b1=document.createElement("div");
    a2b.appendChild(a2b1);
    a2b1.classList.add("a2b1");
    let a2b2=document.createElement("div");
    a2b.appendChild(a2b2);
    a2b2.classList.add("a2b2");
    let cn=d[i].cityName;let hum=d[i].humidity;let pre=d[i].precipitation;
    setInterval(()=>{let t=td3(cn);
    a2b1.innerHTML=cn+",<br>"+t+",<br>"+"<img src=\"../assets/background/humidityIcon.svg\"alt=\"loading\">&nbsp;&nbsp;"+hum+"<br><img src=\"../assets/background/precipitationIcon.svg\"alt=\"loading\">&nbsp;&nbsp;"+pre;},1000);
     let img=document.createElement("img");
     if(x=="all"){
         if(parseInt(d[i]["temperature"],10)>29){
             img.src="../assets/background/sunnyIcon.svg";img.alt="loading";}
         else if((parseInt(d[i].temperature,10) < 29)&&(parseInt(d[i].temperature,10) >21)){
             img.src="../assets/background/snowflakeIcon.svg";img.alt="loading";
         }else {
             img.src="../assets/background/rainyIcon.svg";img.alt="loading";}
     }
     else{
     img.src=x;img.alt="loading"}
     a2b2.appendChild(img);
    a2b2.innerHTML+="&emsp;"+d[i]["temperature"];
    }
    const right=document.querySelector('.arrow-right');
    const left=document.querySelector('.arrow-left');
    if(i>5){  
        right.setAttribute('id','arrow-right');  
         right.addEventListener('click',()=>{
        a2.scrollLeft+=277;
        });
        left.setAttribute('id','arrow-left');  
        left.addEventListener('click',()=>{
        a2.scrollLeft-=250;
        });
    }
    else{ right.removeAttribute('id','arrow-right');  
        left.removeAttribute('id','arrow-left');  
    }
}
function td3(city){
    const offset1={
        'Yangon':6.30,'Vienna':6.30,'Anadyr':3,'Moscow':3,'Juba':2,'BangKok':7,'Perth':8,'BrokenHill':3,'Karachi':5,'NewYork':-5,'Seoul':9,'Winnipeg':-6,'Dublin':-8,'LosAngeles':-8,'Nome':1,'Troll':1,'Auckland':13,'Jamaica':-5,'Maseru':2,'London':0,'Kolkata':0
    }
    let offset=offset1[city];
    let d=new Date();
    let utc=d.getTime()+(d.getTimezoneOffset()*60000);
    let t=new Date(utc+(3600000*offset));
       return t.toLocaleTimeString();
}
