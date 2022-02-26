let a4=document.querySelector(".a4");
let c=0;let d=0;
    let continent =document.getElementById("continentSort");
    let temper =document.getElementById("temSort");
   window.onload=function(){ continentSort(c,d);};
    continent.addEventListener('click', function(){console.log(c,d);
        if(c==0){c=1;}
        else{c=0;}
        continentSort(c,d);});
    temper.addEventListener('click', function(){console.log(c,d);
        if(d==0){d=1;}
        else{d=0;}
        continentSort (c,d)});
   
   function continentSort(c,d){
   var requestOptions = {
    method: 'GET'};
    fetch("https://soliton.glitch.me/all-timezone-cities", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))
    .then((data)=>so(data));
    
        function so(data){
        let a=[{}];
        for(let i=0;i<22;i++){
        let {temperature,humidity,timeZone,dateAndTime,cityName}=data[i];
        a[i]=[{tem:parseInt(temperature,10),hum:parseInt(humidity),timeZone:timeZone,dt:dateAndTime,nam:cityName}];
        }   
        if(c==0 && d==0){continent.setAttribute('src','../assets/background/arrowDown.svg');
        temper.setAttribute('src','../assets/background/arrowDown.svg');
        
        }
        else if(c==1 && d==0){ continent.setAttribute('src','../assets/background/arrowUp.svg');
        temper.setAttribute('src','../assets/background/arrowDown.svg');
        a.sort(function(g,h){
            let x=g[0].timeZone;
            let y=h[0].timeZone;
            if(x<y){
                return -1;
            }
            else{
                return 1;
            }
        });}
        else if(c==0 && d==1){
        continent.setAttribute('src','../assets/background/arrowDown.svg');
        temper.setAttribute('src','../assets/background/arrowUp.svg'); 
        a.sort(function(g,h){
            return h[0].tem - g[0].tem;
        });}
        else {
            continent.setAttribute('src','../assets/background/arrowUp.svg');
            temper.setAttribute('src','../assets/background/arrowUp.svg');
            a.sort(function(g,h){
                let p=g[0].timeZone.split('/');
                let q=h[0].timeZone.split('/');
            if(p[0]<q[0]){
                return -1;
            }
            else if(p[0]>q[0]) {
                return 1;
            }
                return h[0].tem - g[0].tem;
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
    let x=a[i][0].timeZone;
    let y=x.split('/');
    setInterval(()=>{
    let t=td3(a[i][0].nam);
    a4b1.innerHTML=`<span style='color:rgb(23, 7, 253);font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;'>${y[0]}</span><br>${y[1]} ${t}`;  },1000);
    let a4b2=document.createElement("div");
    a4b.appendChild(a4b2);
    a4b2.classList.add('a4b2');
    a4b2.innerHTML=a[i][0].tem+" °C"+"<br>"+"<img src=\"../assets/background/humidityIcon.svg\"alt=\"loading\" width=\"15px\">&nbsp;"+a[i][0].hum+" %";
    }
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