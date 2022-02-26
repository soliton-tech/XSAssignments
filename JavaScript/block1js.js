
function change(data,i){
    let {temperature}=data[i];
    let {humidity}=data[i];
    let {precipitation}=data[i];
    let f=parseInt(temperature,10);
        document.getElementById('deg').innerHTML=temperature;
        document.getElementById('hum').innerHTML=humidity;
        document.getElementById('pre').innerHTML=precipitation;
        document.getElementById('fah').innerHTML=Math.round((f*1.8)+32)+" F";       
       hrTemp(f);
}
function td(offset){ 
    let d=new Date();
    let utc=d.getTime()+(d.getTimezoneOffset()*60000);
    let t=new Date(utc+(3600000*offset));
    var hr = t.getHours();
    var min = t.getMinutes();
    var sec = t.getSeconds();
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;
    var timeOfDay = (hr < 12) ? "<img src=\"../assets/background/amState.svg\" width=\"70px\" height=\"60px\">" : "<br>"+"PM";
    nextHours(hr,timeOfDay);
    hr = (hr > 12) ? hr - 12 :hr;
    hr = (hr == 0) ? 12 :hr;
    hr = (hr < 10 ? "0" : "") + hr;
    var dd = t.getDate();
    var yyyy = t.getFullYear();
    const months=["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
    const mm=months[t.getMonth()];
    if (dd < 10) {
        dd = '0' + dd
    }
    var today = dd + '-' + mm + '-' + yyyy ;    
    time=document.getElementById('time'); 
    time.innerHTML=hr+':'+min+':'+"<small>"+sec+"</small>"+"<br>"+timeOfDay;
    document.getElementById('date').innerHTML=today;
    timeOfDay=(timeOfDay!= "PM")?"AM":timeOfDay;
     let block=[hr,min,sec,today,timeOfDay]; 
     return block;
}

function nextHours(hr,timeOfDay){
  timeOfDay=(++hr>=12)?"PM":"AM";
  let hour=(hr>12)?hr-12:hr;
   document.getElementById('t1').innerHTML=(hour)+"&nbsp"+timeOfDay;
   timeOfDay=((++hr)>=12)?"PM":"AM";
   hour=(hr>12)?hr-12:hr;
   document.getElementById('t2').innerHTML=(hour)+"&nbsp"+timeOfDay;
   timeOfDay=((++hr)>=12)?"PM":"AM";
   hour=(hr>12)?hr-12:hr;
   document.getElementById('t3').innerHTML=(hour)+"&nbsp"+timeOfDay;
   timeOfDay=((++hr)>=12)?"PM":"AM";
   hour=(hr>12)?hr-12:hr;
   document.getElementById('t4').innerHTML=(hour)+"&nbsp"+timeOfDay;
   timeOfDay=((++hr)>=12)?"PM":"AM";
   hour=(hr>12)?hr-12:hr;
   document.getElementById('t5').innerHTML=(hour)+"&nbsp"+timeOfDay;
}

function hrTemp(temp){
   function icon(temp){
   if(temp>=23 && temp<=29){
       return "../assets/background/cloudyIcon.svg";
   }
   else if(temp>=18 && temp<=22){
       return "../assets/background/windyIcon.svg";
   }
   else if(temp>29){
       return "../assets/background/sunnyIconBlack.svg";
   }
   else{
       return "../assets/background/rainyIcon.svg";
   }
   }
document.getElementById('now').innerHTML=Math.round(temp);
document.getElementById('img1').src=icon(temp);
document.getElementById('now+1').innerHTML=Math.round(temp+1);
document.getElementById('img2').src=icon(temp+1);
document.getElementById('now+2').innerHTML=Math.round(temp+3);
document.getElementById('img3').src=icon(temp+3);
document.getElementById('now+3').innerHTML=Math.round(temp-10);
document.getElementById('img4').src=icon(temp+5);
document.getElementById('now+4').innerHTML=Math.round(temp+6);
document.getElementById('img5').src=icon(temp+6);
document.getElementById('now+5').innerHTML=Math.round(temp+9);
document.getElementById('img6').src=icon(temp+9);
}
displayWeather();
function displayWeather(){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://soliton.glitch.me/all-timezone-cities", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error))
        .then((data)=>climate(data));

function climate(data){
    let img=document.getElementById('hai');
    let cities=document.getElementById('cities');
    setInterval(() => {
        
   
    switch(cities.value){
        
        case "yangon":
            img.src="../assets/cities/yangon.svg";
            change(data,13);
            td('6.30');
            break;
        case "Vienna":
                img.src="../assets/cities/vienna.svg";
                change(data,8);
                td('6.30');
                break;
        case "Anadyr":
            img.src="../assets/cities/anadyr.svg";
            change(data,16);
            td('3');
            break;
        case "Moscow":
            img.src="../assets/cities/moscow.svg";
            change(data,9);
           td('3');
            break;
        case "Juba":
            img.src="../assets/cities/juba.svg"
            change(data,5);
            td('4');
            break;
        case "Bangkok":
            img.src="../assets/cities/bangkok.svg"
            change(data,14);
            td('7');
            break;
        case "Perth":
            img.src="../assets/cities/perth.svg"
            change(data,18);
            td('8');
            break;
        case "Vostok":
            img.src="../assets/cities/vostok.svg"
            change(data,20);
            break;
         case "Brokenhill":
            img.src="../assets/cities/brokenhill.svg"
            change(data,17);
           td('3');
            break;
         case "Karachi":
            img.src="../assets/cities/karachi.svg"
            change(data,11);
           td('5');
            break;
        case "New York":
            change(data,1);
            img.src="../assets/cities/newyork.svg"
            td('-5');
            break;
        case "Seoul":
            img.src="../assets/cities/seoul.svg"
            change(data,15);
            td('9');
            break;
        case "Winnipeg":
            img.src="../assets/cities/winnipeg.svg"
            change(data,4);
            td('-6');
            break;
        case "Dublin":
            img.src="../assets/cities/dublin.svg"
            change(data,10);
            td('-8');
            break;
        case "Losangeles":
            img.src="../assets/cities/losangeles.svg"
            change(data,3);
            td('-8');
            break;
        case "Nome":
             img.src="../assets/cities/nome.svg"; 
            change(data,0);
             td('1');
             break;
        case "Troll":
            img.src="../assets/cities/troll.svg"
            change(data,21);
            td('1');
            break;
        case "Auckland":
            img.src="../assets/cities/auckland.svg"
            change(data,19);
            td('13');
            break;
        case "Jamaica":
            img.src="../assets/cities/jamaica.svg"
            change(data,2);
            td('-5');
            break;
        case "Maseru":
            img.src="../assets/cities/maseru.svg"
            change(data,6);
            td('2');
            break;
        case "London":
            img.src="../assets/cities/london.svg"
            change(data,7);
            td('0');
            break;
        case "Kolkata":
            img.src="../assets/cities/kolkata.svg"
            change(data,12);
            td(5.30);
            break;
           }
           
} , 1000);
}}
