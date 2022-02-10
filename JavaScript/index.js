/*T2001*/
//using iife-immediately invoked function expression
(function() {
    document.getElementById('drop-menu').addEventListener('change',changeCity);
})();
function changeCity() {
    var cty = document.getElementById("drop-menu").value;
    if (cty=='newdelhi') {
        newdelhi();
    }
    if(cty=='kolkata') {
        kolkata();
    }
}
var v1 = "o";
const dt = new Date(); 
// today's date
dttoday = () => {
    const month = ["Jan","Feb","March","April",
                   "May","June","July","Aug",
                   "Sep","Oct","Nov","Dec"];
    document.getElementById("current-date").innerHTML = dt.getDate()+"-"+
                                                        month[dt.getMonth()]
                                                        +"-"+dt.getFullYear();
}

function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
}
// current time
tmtoday = () => {
    document.getElementById("ct-1").innerHTML = addZero(dt.getHours()%12)+":"+
                                                addZero(dt.getMinutes())+":";
    document.getElementById("ct-2").innerHTML = addZero(dt.getSeconds())+"  ";                                            
}
// change pic according to am or pm
ampm = () => {
    const hrs = dt.getHours();
    if( hrs>=12 ) {
        document.getElementById("am-pm").src="pmState.png";
    }
    else {
        document.getElementById("am-pm").src="amState.svg";
    }
}
newdelhi = () => {
    document.getElementById("img1").src="yangon.svg";
    document.getElementById("temp-c").innerHTML="15"+v1.sup()+"C";
    document.getElementById("humid").innerHTML="33%";
    document.getElementById("temp-f").innerHTML="59 F";
    document.getElementById("precip").innerHTML = "29%";
    dttoday(); 
    tmtoday();
    ampm();
    hourinfo();
}
kolkata = () => {
    document.getElementById("img1").src="kolkata.svg";
    document.getElementById("temp-c").innerHTML="25"+v1.sup()+"C";
    document.getElementById("humid").innerHTML="26%";
    document.getElementById("temp-f").innerHTML="78 F";
    document.getElementById("precip").innerHTML = "0%";
    dttoday();
    tmtoday();
    ampm();
}

hourinfo = () => {
    var hr = dt.getHours();
    for(let i=1;i<=5;i++) {
        document.getElementById(`t${i}`).innerHTML=(hr+i>12?hr+i-12:hr+i)+(hr<=12?" AM":" PM");
    }
}

/*T2002*/

// city0, temp1, humid2, precip3, windy4, img5
const cards=[["Delhi",25,56,0,55,"yangon.svg"], 
             ["Chennai",32,25,56,45,"maseru.svg"],
             ["Kolkata",19,51,90,8,"kolkata.svg"],
             ["Mumbai",11,64,88,12,"seoul.svg"],
             ["Coimbatore",30,54,50,33,"karachi.svg"],
             ["Goa",33,15,66,3,"jamaica.svg"]];

//onclick of sun icon
document.getElementById("sunnycity").addEventListener('click',sunnyCity);

//condition for sunny cities
function sunnyCity() { 
    for(let p=0;p<cards.length;p++)
    {
        if(cards[p][1]>29 && cards[p][2]<50 && cards[p][3]>=50) {
            setSunnyCity(p);
        } 
    }
}

//setting values for each card
function setSunnyCity(pos) {
    const divContainer = document.getElementById("card-carousel");
    const div1 = document.createElement('div');
    div1.id = ('card-s');
    divContainer.append(div1);
    for (let j = 0; j < 4; j++) 
    {
        if (j == 0) {
            const div2 = document.createElement('div');
            div2.id = 'ct-city';
            div2.innerHTML = cards[pos][0];
            div1.append(div2); //adds to main div1
        }
        else if (j == 1) {
            const div3 = document.createElement('div');
            div3.id = 'ct-temp';
            div3.setAttribute("style","padding-left: 60px;");

            const div31 = document.createElement('img');
            div31.src="sunnyIcon.svg";
            div31.setAttribute("style","width: 20px;");
            div3.append(div31);

            const div32 = document.createElement('span');
            div32.innerHTML=cards[pos][1]+v1.sup()+"C";
            div3.append(div32);

            div1.append(div3); //adds to main div1
        }
        else if(j==2) {
            const div4 = document.createElement('div');
            div4.id = 'ct-values';

            const div411 = document.createElement('img');
            div411.src="humidityIcon.svg";
            div4.append(div411);
            const div412 = document.createElement('span');
            div412.innerHTML = cards[pos][2]+"%<br>";
            div4.append(div412);

            const div421 = document.createElement('img');
            div421.src="windyIcon.svg";
            div4.append(div421);
            const div422 = document.createElement('span');
            div422.innerHTML = cards[pos][4]+"km/hr<br>";
            div4.append(div422);

            const div431 = document.createElement('img');
            div431.src="precipitationIcon.svg";
            div4.append(div431);
            const div432 = document.createElement('span');
            div432.innerHTML = cards[pos][3]+"%<br>";
            div4.append(div432);

            div1.append(div4); //adds to main div1
        }
        else if(j==3) {
            const div5 = document.createElement('div');
            div5.id='ct-pic';

            const div51 = document.createElement('img');
            div51.src=`${cards[pos][5]}`;
            div51.setAttribute("style","width: 130px;")
            div5.append(div51)
            
            div1.append(div5); //adds to main div1
        }
    }
}
