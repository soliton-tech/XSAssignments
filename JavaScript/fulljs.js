
class complete{
        
   async getTime(){
        
        let response=await fetch("https://soliton.glitch.me/all-timezone-cities");
        if(response.ok){
            this.a=await response.json();
        }
        else{
            alert("data not fetched");
        }       
       this.continentSort(e=0,f=0);
       this.climateBlock(this.a,this.x="all");
    }
    continentSort(e,f){  
        let o=[];
        if(e==0 && f==0){
            continent.setAttribute('src','../assets/background/arrowDown.svg');
            temper.setAttribute('src','../assets/background/arrowDown.svg');
            o=this.a.sort(function(){return Math.random()-0.5});
        }
        else if(e==1 && f==0){ 
            continent.setAttribute('src','../assets/background/arrowUp.svg');
            temper.setAttribute('src','../assets/background/arrowDown.svg');
            o=this.a.sort(function(g,h){
                let x=g.timeZone;
                let y=h.timeZone;
                if(x<y){
                    return -1;
                }
                else{
                    return 1;
                }
            });
        }
        else if(e==0 && f==1){
            continent.setAttribute('src','../assets/background/arrowDown.svg');
            temper.setAttribute('src','../assets/background/arrowUp.svg'); 
            o=this.a.sort(function(g,h){
                return parseInt(h.temperature,10) - parseInt(g.temperature,10);
                });
        }
         else {
            continent.setAttribute('src','../assets/background/arrowUp.svg');
            temper.setAttribute('src','../assets/background/arrowUp.svg');
            o= this.a.sort(function(g,h){
            let p=g.timeZone.split('/');
            let q=h.timeZone.split('/');
            if(p[0]<q[0]){
                return -1;
             }
            else if(p[0]>q[0]) {
                return 1;
            }
            return parseInt(h.temperature,10) - parseInt(g.temperature,10);
            });
        }                
        a4.innerHTML="";
        for(let i=0;i<16;i++){
            let a4b=document.createElement("div");
            a4.appendChild(a4b);
            a4b.classList.add('a4b');
            let a4b1=document.createElement("div");
            a4b.appendChild(a4b1);
            a4b1.classList.add('a4b1');
            let x=o[i].timeZone;
            let y=x.split('/');
            setInterval(()=>{
            let t=this.td3(o[i].cityName);
            a4b1.innerHTML=`<span style='color:rgb(23, 7, 253);font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;'>${y[0]}</span><br>${y[1]} ${t}`;  },1000);
            let a4b2=document.createElement("div");
            a4b.appendChild(a4b2);
            a4b2.classList.add('a4b2');
            a4b2.innerHTML=o[i].temperature+"<br>"+"<img src=\"../assets/background/humidityIcon.svg\"alt=\"loading\" width=\"15px\">&nbsp;"+o[i].humidity;                
        }
    }
    td3(city){
        const offset1={
            'Yangon':6.30,'Vienna':6.30,'Anadyr':3,'Moscow':3,'Juba':2,'BangKok':7,'Perth':8,'BrokenHill':3,'Karachi':5,'NewYork':-5,'Seoul':9,'Winnipeg':-6,'Dublin':-8,'LosAngeles':-8,'Nome':1,'Troll':1,'Auckland':13,'Jamaica':-5,'Maseru':2,'London':0,'Kolkata':0
        }
        let offset=offset1[city];
        let d=new Date();
        let utc=d.getTime()+(d.getTimezoneOffset()*60000);
        let t=new Date(utc+(3600000*offset));
        return t.toLocaleTimeString();
    }
    sb(){
        if (s==1){
        this.sunfun();
        }
        else if(s==2){
        this.snowfun();
        }
        else if(s==3){
        this.rainfun();
        }
        else{
        this.climateBlock(this.a,'all');
        }
    }
    sunfun(){
        let d=[];
        d=this.a.filter((tem)=>{
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
            this.climateBlock(d,x); 
    }
    snowfun(){
        let d=[];
        d=this.a.filter((tem)=>{
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
           this.climateBlock(d,x); 
    }
    rainfun(){
        let d=[];
        d=this.a.filter((tem)=>{
           return parseInt(tem.temperature,10) <20});
        d=d.filter((hum)=>{
            return parseInt(hum.humidity,10)>=50
        });
        d.sort(function(g,h){
            return parseInt(g.humidity,10) - parseInt(h.humidity,10)});      
            let x="../assets/background/rainyIcon.svg"
            this.climateBlock(d,x); 
    }
    climateBlock(d,x){
        a2.innerHTML="";let i;
        let valofSb=document.getElementById("sb");
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
            setInterval(()=>{let t=this.td3(cn);
            a2b1.innerHTML=cn+",<br>"+t+",<br>"+"<img src=\"../assets/background/humidityIcon.svg\"alt=\"loading\">&nbsp;&nbsp;"+hum+"<br><img src=\"../assets/background/precipitationIcon.svg\"alt=\"loading\">&nbsp;&nbsp;"+pre;},1000);
             let img=document.createElement("img");
             if(x=="all"){
                if(parseInt(d[i]["temperature"],10)>29){
                     img.src="../assets/background/sunnyIcon.svg";img.alt="loading";
                }
                 else if((parseInt(d[i].temperature,10) < 29)&&(parseInt(d[i].temperature,10) >21)){
                     img.src="../assets/background/snowflakeIcon.svg";img.alt="loading";
                }else{
                     img.src="../assets/background/rainyIcon.svg";img.alt="loading";}
            }
            else{
                img.src=x;img.alt="loading"
            }
            a2b2.appendChild(img);
            a2b2.innerHTML+="&emsp;"+d[i]["temperature"];
        }
        if(valofSb.value!=i){
            alert("only few cities are there");
            valofSb.value=i;
        }        
        const right=document.querySelector('.arrow-right');
        const left=document.querySelector('.arrow-left');
        if(i>5){  
            right.setAttribute('id','arrow-right');  
            right.addEventListener('click',()=>{
            a2.scrollLeft+=277;});
            left.setAttribute('id','arrow-left');  
            left.addEventListener('click',()=>{
            a2.scrollLeft-=250;});
        }
        else{ right.removeAttribute('id','arrow-right');  
            left.removeAttribute('id','arrow-left');  
        }
    }
        
}
        
let m=new complete();
m.getTime();
let a4=document.querySelector(".a4");
let e=0;let f=0;
let continent =document.getElementById("continentSort");
let temper =document.getElementById("temSort");
continent.addEventListener('click', function(){
    if(e==0){e=1;}
    else{e=0;}
    m.continentSort(e,f);});
temper.addEventListener('click', function(){
    if(f==0){f=1;}
    else{f=0;}
    m.continentSort (e,f)});
let s=0;
let a2=document.querySelector(".a2");
let sun =document.getElementById("sun");
sun.addEventListener("click",function underscore(){
    sun.style.borderBottom="blue solid 4px";s=1;
    sun.style.borderRadius="50px"
    snow.style.borderBottom="";
    rain.style.borderBottom="";
    m.sunfun();});
let snow =document.getElementById("snow");
snow.addEventListener("click",function underscore(){
    snow.style.borderBottom="blue solid 4px";s=2;
    snow.style.borderRadius="50px"
    sun.style.borderBottom="";
    rain.style.borderBottom="";
    m.snowfun();});
let rain =document.getElementById("rain");
    rain.addEventListener("click",function underscore(){
    rain.style.borderBottom="rgb(7, 23, 255) solid 4px";s=3;
    rain.style.borderRadius="50px";
    snow.style.borderBottom="";
    sun.style.borderBottom="";
    m.rainfun();});