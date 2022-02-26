/*T2001*/
//using iife-immediately invoked function expression
(function() {
    document.getElementById('drop-menu').addEventListener('change',changeCity);
})();

var v1 = "o";
var arr = [];
let res1 = fetch("https://soliton.glitch.me/all-timezone-cities");
res1.then(res1 =>
    res1.json()).then(d => {
        arr.push(...d);
    })
function changeCity() {
    var ctname = [];
    for(let i=0;i<arr.length;i++) {
        ctname.push(arr[i].cityName);
    }
    var cty = document.getElementById("drop-menu").value;
    if(ctname.includes(cty)) {
        assignCity(cty);
    } else {
        alert("Choose city from drop-down");
    }
}
// today's date
dttoday = (po1) => {
    const month = ["Jan","Feb","March","April",
                   "May","June","July","Aug",
                   "Sep","Oct","Nov","Dec"];
    var dt = arr[po1].dateAndTime.split(", ")[0];
    var dtx  = dt.split("/");
    document.getElementById("current-date").innerHTML = dtx[1]+"-"+month[dtx[0]]+"-"+dtx[2];
}

function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
}
// current time
var tmnow;
tmtoday = (po1) => {
    var tm = arr[po1].dateAndTime.split(", ")[1];
    var tmx = tm.split(":");
    tmnow =tmx[0];
    document.getElementById("ct-1").innerHTML = addZero(tmx[0])+":"+addZero(tmx[1]);
    var tmx1 = tmx[2].split(" ");
    document.getElementById("ct-2").innerHTML = ":"+tmx1[0];
    ampm(tmx1[1]);                              
}
// change pic according to am or pm
ampm = (str) => {
    if( str=='PM') {
        document.getElementById("am-pm").src="pmState.png";
    }
    else if(str=='AM'){
        document.getElementById("am-pm").src="amState.svg";
    }
}
hourinfo1 = () => {
    var hr = parseInt(tmnow);
    for(let i=1;i<=5;i++) {
        var y =(hr+i)%12==0?12:(hr+i)%12;
        document.getElementById(`t${i}`).innerHTML=y+(y>=12?" AM":" PM");
    }
}
hourinfo2 = (t,p) => {
    var tarr = ["cloudyIcon.svg","rainyIconBlack.svg","windyIcon.svg",
                "snowflakeIcon.svg","sunnyIcon.svg"];
    if(t>30 && p<10) document.getElementById("im1").src="sunnyIcon.svg";
    else document.getElementById("im1").src="rainyIconBlack.svg";
    for(let i=2;i<=6;i++) {
        var rd = Math.floor(Math.random()*5);
        var cdn = document.getElementById(`im${i}`);
        cdn.src = tarr[rd];
    }

    for(let j=1;j<=6;j++) {
        var rd1 = Math.floor(Math.random()*8)+2;
        document.getElementById(`no${j}`).innerHTML=rd1;
    }
}
function assignCity(aCity) {
    for(let l = 0;l<arr.length;l++) {
        if(arr[l].cityName === aCity) {
            var po1 = l;break;
        }
    }
    document.getElementById("img1").src = `${aCity}.svg`;
    document.getElementById("temp-c").innerHTML = arr[po1].temperature;
    document.getElementById("humid").innerHTML = arr[po1].humidity;
    let tf = parseInt(arr[po1].temperature)*9/5+32;
    document.getElementById("temp-f").innerHTML = tf.toFixed(1)+" F";
    document.getElementById("precip").innerHTML = arr[po1].precipitation;
    dttoday(po1); 
    tmtoday(po1);
    hourinfo1();
    hourinfo2(arr[po1].temperature,arr[po1].precipitation);
}
/*-----------------------------T2002---------------------------------*/

var cards =[];
let res2 = fetch("https://soliton.glitch.me/all-timezone-cities");
res2.then(res2 =>
    res2.json()).then(d => {
        cards.push(...d);
    })
//to remove any existing card-s
function clearCards(dr) {
    if(dr==null || typeof(dr)==undefined) return;
    else {
        dr.remove(dr);
        clearCards(document.querySelector('#card-s'));
    }
}
function clearExistingCards(dr) {
    if(dr==null || typeof(dr)==undefined) return;
    else {
        dr.remove(dr);
        clearExistingCards(document.querySelector('.card-1'));
    }
}

//carousel function
function slideCards() {
    let btn1 = document.getElementById("slider-btn-left");
    let btn2 = document.getElementById("slider-btn-right");
    let cd1 = document.getElementsByClassName('cardp');
    var l = 0;
    let mob_view = window.matchMedia('(max-width: 1200px)');
    let retx = () => {
        if(mob_view.matches) return 470;
        else return 215;
    }
    btn1.onclick = () => {
        l--;
        for(var i of cd1) {
            if(l==0) i.style.left = retx()+"px";
            if(l==1) i.style.left = "-540px";
            if(l<2) l=0;
        }
    }
    btn2.onclick = () => {
        l++;
        for(var i of cd1) {
            if(l==0) i.style.left = "105px";
            if(l==1) i.style.left = "-740px";
            if(l>1) l=1;
        }
    }
}

//onclick of sun icon
document.getElementById("sunnycity").addEventListener('click',gotoSunnyCity);

function gotoSunnyCity() {
    clearCards(document.querySelector('#card-s'));
    var ncty = document.getElementById("no-city").value;
    if(ncty>=1 && ncty<=10) {
        clearExistingCards(document.querySelector('.card-1'));
        sunnyCity();
    }
    else {
        alert("Select number of cities to be displayed");
    }
}
//condition for sunny cities
function sunnyCity() { 
    let count=0;
    var choice=1;
    var ncty = document.getElementById("no-city").value;
    for(let pn=0;pn<cards.length;pn++)
    {
        if(count<ncty) {
            var t = parseInt(cards[pn].temperature.split("°")[0]);
            var h = parseInt(cards[pn].humidity.split("%")[0]);
            var p = parseInt(cards[pn].precipitation.split("%")[0]);
            if(t>29 && h<50 && p>=50) {
                setCity(pn,choice);
                count++;
            }
        } 
    }
}

// for snow-cold climate
document.getElementById("snowcity").addEventListener('click',gotoSnowCity);

function gotoSnowCity() {
    clearCards(document.querySelector('#card-s')); //clear out card-s
    var ncty = document.getElementById("no-city").value;
    if(ncty>=1 && ncty<=10) {
        clearExistingCards(document.querySelector('.card-1'));
        snowCity();
    }
    else {
        alert("Select number of cities to be displayed");
    }
}

//condition for snow cities
function snowCity() {
    let count=0;
    var choice=2;
    var ncty = document.getElementById("no-city").value;
    for(let pn=0;pn<cards.length;pn++)
    {
        if(count<ncty) {
            let t = parseInt(cards[pn].temperature.split("°")[0]);
            let h = parseInt(cards[pn].humidity.split("%")[0]);
            let p = parseInt(cards[pn].precipitation.split("%")[0]);
            if(t>=20 && t<=28 && h>50 && p<50) {
                setCity(pn,choice);
                count++;
            }
        } 
    }
}

//rainy city
document.getElementById("raincity").addEventListener('click',gotoRainCity);

function gotoRainCity() {
    clearCards(document.querySelector('#card-s')); //clear out card-s
    var ncty = document.getElementById("no-city").value;
    if(ncty>=1 && ncty<=10) {
        clearExistingCards(document.querySelector('.card-1'));
        rainCity();
    }
    else {
        alert("Select number of cities to be displayed");
    }
}

//condition for rain cities
function rainCity() {
    slideCards();
    let count=0;
    var choice=3;
    var ncty = document.getElementById("no-city").value;
    for(let pn=0;pn<cards.length;pn++)
    {
        if(count<ncty) {
            let t = parseInt(cards[pn].temperature.split("°")[0]);
            let h = parseInt(cards[pn].humidity.split("%")[0]);
            let p = parseInt(cards[pn].precipitation.split("%")[0]);
            if(t<20 && h>=50) {
                setCity(pn,choice);
                count++;
            }
        } 
    }
}
//setting values for each card
function setCity(pos,ch) {
    const divContainer = document.getElementById("card-carousel");
    const div1 = document.createElement('div');
    div1.id = ('card-s');
    div1.className='cardp';
    divContainer.append(div1);
    for (let j = 0; j < 4; j++) 
    {
        if (j == 0) {
            const div2 = document.createElement('div');
            div2.id = 'ct-city';
            div2.innerHTML = cards[pos].cityName;
            div1.append(div2); //adds to main div1
        }
        else if (j == 1) {
            const div3 = document.createElement('div');
            div3.id = 'ct-temp';
            div3.setAttribute("style","padding-left: 60px;");

            const div31 = document.createElement('img');
            if(ch==1) div31.src="sunnyIcon.svg";
            else if(ch==2) div31.src="snowflakeIcon.svg";
            else if(ch==3) div31.src="rainyIconBlack.svg";
            div31.setAttribute("style","width: 20px;vertical-align: bottom;");
            div3.append(div31);

            const div32 = document.createElement('span');
            div32.innerHTML=cards[pos].temperature;
            div32.setAttribute("style","padding-left:10px");
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
            div412.innerHTML = " "+cards[pos].humidity+"<br>";
            div4.append(div412);

            const div421 = document.createElement('img');
            div421.src="windyIcon.svg";
            div4.append(div421);
            const div422 = document.createElement('span');
            div422.innerHTML =  " "+Math.floor(Math.random()*121)+"km/hr<br>";
            div4.append(div422);

            const div431 = document.createElement('img');
            div431.src="precipitationIcon.svg";
            div4.append(div431);
            const div432 = document.createElement('span');
            div432.innerHTML =  " "+cards[pos].precipitation+"<br>";
            div4.append(div432);

            div1.append(div4); //adds to main div1
        }
        else if(j==3) {
            const div5 = document.createElement('div');
            div5.id='ct-pic';

            const div51 = document.createElement('img');
            div51.src=`${cards[pos].cityName}.svg`;
            div51.setAttribute("style","width: 130px;overflow:hidden");
            div5.append(div51)
            
            div1.append(div5); //adds to main div1
        }
    }
}

//-------------- T2003 ------------------

var intl = [];
let res = fetch("https://soliton.glitch.me/all-timezone-cities");
res.then(res =>
    res.json()).then(d => {
        intl.push(...d);
    })

function clearExistingContCards() { //onclick of sorting, the existing cards vanish
    var dx = document.querySelector(".T1003-2");
    dx.remove(dx);
}

document.getElementById("sort-cont").addEventListener('click',sortCont);

function sortCont() {
    clearExistingContCards();
    function compareStrings(a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    } 
    intl.sort(function(a, b) {
        return compareStrings(a.timeZone, b.timeZone);
    })
    for(let i=0;i<intl.length;i++) {
        createCards(i);
    }
}

document.getElementById("sort-temp").addEventListener('click',sortTemp);

function clearContCards(dr) {
    if(dr==null || typeof(dr)==undefined) return;
    else {
        dr.remove(dr);
        clearContCards(document.querySelector('#Cont-divisions'));
    }
}

function sortTemp() {
    clearContCards(document.querySelector('#Cont-divisions'));

    const mySet = new Set();
    for(let i=0;i<intl.length;i++) {
        var str = intl[i].timeZone;
        var str1 = str.split("/")[0];
        mySet.add(str1);
    }
    var continentList = [...mySet];
    continentList.sort();
    var newArr =[];
    var k=0;
    for(let j=0;j<continentList.length;j++) {
        var res = intl.filter(p => p.timeZone.split("/")[0]==continentList[j])
        res.sort(function sortByTemp(a,b) {
            if(a.temperature === b.temperature) return 0;
            else return (a.temperature < b.temperature) ? -1:1;
        });
        newArr.push(...res);
    }
    intl=newArr.slice();
    for(let i=0;i<intl.length;i++) {
        createCards(i);
    }
}


function createCards(pt) {
    const ContCards = document.getElementById('continent-cards');
    const dmain = document.createElement('div');
    dmain.id = 'Cont-divisions';
    ContCards.append(dmain);
    
    const d1 = document.createElement('div'); // continent
    d1.setAttribute("style","color: rgba(228, 225, 91, 0.884)");
    var str = intl[pt].timeZone;
    var str1 = str.split("/")[0];
    d1.innerHTML=str1;
    dmain.append(d1);

    const d2 = document.createElement('div'); //temperature
    d2.setAttribute("style","padding-left:123px;font-size: x-large;");
    d2.innerHTML=intl[pt].temperature;
    dmain.append(d2)
    
    const d3 = document.createElement('div'); //city and time
    d3.setAttribute("style","color: rgba(255, 255, 255, 0.651)");
    const d31 = document.createElement('span'); //city
    var strx = intl[pt].timeZone;
    var strx1 = strx.split("/")[1];
    d31.innerHTML=strx1+", ";
    d3.append(d31);
    const d32 = document.createElement('span'); //time
   d32.innerHTML=new Date()
               .toLocaleTimeString("en-US",{timeZone:intl[pt].timeZone,
                                            hourCycle:'h12',
                                            timeStyle:'short'});
    d3.append(d32);
    dmain.append(d3)

    const d4 = document.createElement('div'); //humidity
    d4.setAttribute("style","padding-left:125px");
    const d41 = document.createElement('img');
    d41.src="humidityIcon.svg";
    d4.append(d41);
    const d42 = document.createElement('span');
    d42.innerHTML=intl[pt].humidity;
    d4.append(d42);

    dmain.append(d4);
}
