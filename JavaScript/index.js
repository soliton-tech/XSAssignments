/*T2001*/
var arr = []; //T2006 - fetch from api
let res1 = fetch("https://soliton.glitch.me/all-timezone-cities");
res1.then(res1 =>
        res1.json())
    .then(d => {
        arr.push(...d);
    })
    .catch(e => {
        console.log("Error in fetch API: " + e);
        console.log("Loading from static data");
        fetch("/XSAssignments/assets/staticdata.json")
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            arr.push(...jsondata);
        });
    });
//using iife-immediately invoked function expression
(function() {
    document.getElementById('drop-menu').addEventListener('change',changeCity);
})();

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

function details(po1) { //base class
    this.month = ["Jan","Feb","March","April",
                   "May","June","July","Aug",
                   "Sep","Oct","Nov","Dec"];
    this.tarr = ["cloudyIcon.svg","rainyIconBlack.svg","windyIcon.svg",
                   "snowflakeIcon.svg","sunnyIcon.svg"];
    var [dt,tm] = arr[po1].dateAndTime.split(", ");
    var dtx  = dt.split("/");
    this.m = dtx[0];
    this.d = dtx[1];
    this.y = dtx[2];
    var tmx = tm.split(":");
    var tmx1 = tmx[2].split(" ");
    this.hrs = tmx[0];
    this.min = tmx[1];
    this.sec = tmx1[0];
    this.str = tmx1[1];
    this.temp = arr[po1].temperature;
    this.hum = arr[po1].humidity;
    this.prec = arr[po1].precipitation;
    this.cityName = arr[po1].cityName;
    this.addZero = (i) => {
        if (i < 10) {i = "0" + i}
        return i;
    }
};
details.prototype.dttoday = function() { // today's date
    document.getElementById("current-date").innerHTML = this.addZero(this.d)+"-"+this.month[this.m-1]+"-"+this.y;
};
details.prototype.tmtoday = function() { //current time
    document.getElementById("ct-1").innerHTML = this.addZero(this.hrs)+":"+this.min;
    document.getElementById("ct-2").innerHTML = ":"+this.addZero(this.sec);
};
details.prototype.ampm = function() {
    if( this.str=='PM') document.getElementById("am-pm").src="/XSAssignments/assets/pmState.png";
    else if(this.str=='AM') document.getElementById("am-pm").src="/XSAssignments/assets/amState.svg";
};
details.prototype.hourinfo1 = function() {
    var hr = Number(this.hrs);
    for(let i=1;i<=5;i++) {
        var y =(hr+i)%12==0?12:(hr+i)%12;
        document.getElementById(`t${i}`).innerHTML=y+(y<12?" AM":" PM");
    }
};
details.prototype.hourinfo2 = function() {
    if(parseInt(this.temp.split("°")[0])>=29) document.getElementById("im1").src="/XSAssignments/assets/sunnyIcon.svg";
    else document.getElementById("im1").src="/XSAssignments/assets/rainyIconBlack.svg";
    for(let i=2;i<=6;i++) { // random selection of temperature icons
        var rd = Math.floor(Math.random()*5);
        document.getElementById(`im${i}`).src = `/XSAssignments/assets/${this.tarr[rd]}`;
    }
    for(let j=1;j<=6;j++) { // random number below the icon
        var rd1 = Math.floor(Math.random()*8)+2;
        document.getElementById(`no${j}`).innerHTML=rd1;
    }
};
details.prototype.setValues = function() {
    document.getElementById("img1").src = `/XSAssignments/assets/${this.cityName}.svg`;
    document.getElementById("temp-c").innerHTML = this.temp;
    document.getElementById("humid").innerHTML = this.hum;
    let tf = parseInt(this.temp)*9/5+32;
    document.getElementById("temp-f").innerHTML = tf.toFixed(1)+" F";
    document.getElementById("precip").innerHTML = this.prec;
};
function assignCity(aCity) {
    var po1 = arr.findIndex(e => e.cityName==aCity);
    let d1 = new details(po1);
    d1.setValues();
    d1.dttoday(); 
    d1.tmtoday();
    d1.ampm();
    d1.hourinfo1();
    d1.hourinfo2();
}
/*-----------------------------T2002---------------------------------*/

class CityWeather {
    cards;
    constructor() {
        this.cards = arr;
    }
    clearExistingCards(dr) {
        if(dr==null || typeof(dr)==undefined) return;
        else {
            dr.remove(dr);
            this.clearExistingCards(document.querySelector('.card-1'));
        }
    }
    clearCards(dr) {
        if(dr==null || typeof(dr)==undefined) return;
        else {
            dr.remove(dr);
            this.clearCards(document.querySelector('#card-s'));
        }
    }
    getTemp(pn) {
        return parseInt(this.cards[pn].temperature.split("°")[0]);
    }
    getHumidity(pn) {
        return parseInt(this.cards[pn].humidity.split("%")[0]);
    }
    getPrecip(pn) {
        return parseInt(this.cards[pn].precipitation.split("%")[0]);
    }
    alignCards(count) {
        if(count>5) document.querySelector('#card-carousel').setAttribute("style","justify-content:left");
        else document.getElementById("card-carousel").setAttribute("style","justify-content:space-evenly");
    }
    setSliders(num) {
        let mob_view1 = window.matchMedia('(max-width: 1325px)');
        let mob_view2 = window.matchMedia('(max-width: 1000px)');
        if(num>5 || (mob_view1.matches && num>=4) || (mob_view2.matches && num>=3)) {
            document.getElementById("slider-btn-left").style.visibility = "visible";
            document.getElementById("slider-btn-right").style.visibility = "visible";
        }
        else {
            document.getElementById("slider-btn-left").style.visibility = "hidden";
            document.getElementById("slider-btn-right").style.visibility = "hidden";
        }
    }
    setCity(pos,ch) {
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
                div2.innerHTML = this.cards[pos].cityName;
                div1.append(div2); //adds to main div1
            }
            else if (j == 1) {
                const div3 = document.createElement('div');
                div3.id = 'ct-temp';
                div3.setAttribute("style","padding-left: 60px;");
    
                const div31 = document.createElement('img');
                if(ch==1) div31.src="/XSAssignments/assets/sunnyIcon.svg";
                else if(ch==2) div31.src="/XSAssignments/assets/snowflakeIcon.svg";
                else if(ch==3) div31.src="/XSAssignments/assets/rainyIconBlack.svg";
                div31.setAttribute("style","width: 20px;vertical-align: bottom;");
                div3.append(div31);
    
                const div32 = document.createElement('span');
                div32.innerHTML=this.getTemp(pos)+"°C";
                div32.setAttribute("style","padding-left:10px");
                div3.append(div32);
    
                div1.append(div3); //adds to main div1
            }
            else if(j==2) {
                const div4 = document.createElement('div');
                div4.id = 'ct-values';
    
                const div411 = document.createElement('img');
                div411.src="/XSAssignments/assets/humidityIcon.svg";
                div4.append(div411);
                const div412 = document.createElement('span');
                div412.innerHTML = " "+this.getHumidity(pos)+"%";
                div4.append(div412);
    
                const div421 = document.createElement('img');
                div421.src="/XSAssignments/assets/windyIcon.svg";
                div4.append(div421);
                const div422 = document.createElement('span');
                div422.innerHTML =  " "+Math.floor(Math.random()*121)+" km/hr";
                div4.append(div422);
    
                const div431 = document.createElement('img');
                div431.src="/XSAssignments/assets/precipitationIcon.svg";
                div4.append(div431);
                const div432 = document.createElement('span');
                div432.innerHTML =  " "+this.getPrecip(pos)+"%";
                div4.append(div432);
    
                div1.append(div4); //adds to main div1
            }
            else if(j==3) {
                const div5 = document.createElement('div');
                div5.id='ct-pic';
    
                const div51 = document.createElement('img');
                div51.src=`/XSAssignments/assets/${this.cards[pos].cityName}.svg`;
                div51.setAttribute("style","width: 130px;overflow:hidden");
                div5.append(div51)
                
                div1.append(div5); //adds to main div1
            }
        }
    }
}
class Sun extends CityWeather {
    #count;
    #choice;
    ncty=this.cards.length;
    constructor() {
        super();
        this.#count=0;
        this.#choice=1;
        document.getElementById("sunnycity").style.borderBottom = "#088F8F solid 2px";
        document.getElementById("snowcity").style.borderBottom = "#000000 solid 2px";
        document.getElementById("raincity").style.borderBottom = "#000000 solid 2px";
    }
    sunnyCity() {
        for(let pn=0;pn<this.cards.length;pn++) {
            if(this.#count<this.ncty) {
                if(this.getTemp(pn)>29 && this.getHumidity(pn)<50 && this.getPrecip(pn)>=50) {
                    this.setCity(pn,this.#choice);
                    this.#count++;
                }
                this.alignCards(this.#count);
                this.setSliders(this.#count);
            } 
        }
    }
}
class Snow extends CityWeather {
    #count;
    #choice;
    ncty=this.cards.length;
    constructor() {
        super();
        this.#count=0;
        this.#choice=2;
        document.getElementById("sunnycity").style.borderBottom="#000000 solid 2px";
        document.getElementById("snowcity").style.borderBottom="#088F8F solid 2px";
        document.getElementById("raincity").style.borderBottom="#000000 solid 2px";
    }
    snowCity() {
        for(let pn=0;pn<this.cards.length;pn++) {
            if(this.#count<this.ncty) {
                if(this.getTemp(pn)>=20 && this.getTemp(pn)<=28 && 
                   this.getHumidity(pn)>50 && this.getPrecip(pn)<50) {
                    this.setCity(pn,this.#choice);
                    this.#count++;
                }
                this.alignCards(this.#count);
                this.setSliders(this.#count);
            } 
        }
    }
}
class Rain extends CityWeather {
    #count;
    #choice;
    ncty=this.cards.length;
    constructor() {
        super();
        this.#count=0;
        this.#choice=3;
        document.getElementById("sunnycity").style.borderBottom="#000000 solid 2px";
        document.getElementById("snowcity").style.borderBottom="#000000 solid 2px";
        document.getElementById("raincity").style.borderBottom="#088F8F solid 2px";
    }
    rainCity() {
        for(let pn=0;pn<this.cards.length;pn++) {
            if(this.#count<this.ncty) {
                if(this.getTemp(pn)<20 && this.getHumidity(pn)>=50) {
                    this.setCity(pn,this.#choice);
                    this.#count++;
                }
                this.alignCards(this.#count);
                this.setSliders(this.#count);
            }
        }
    }
}

document.getElementById("sunnycity").addEventListener('click',() =>{
    let temp = new Sun();
    temp.clearExistingCards(document.querySelector('.card-1'));
    temp.clearCards(document.querySelector('#card-s'));
    temp.sunnyCity();
    document.getElementById("no-city").addEventListener('change',() =>{
        let sunObj = new Sun();
        sunObj.clearCards(document.querySelector('#card-s'));
        var ncty = document.getElementById("no-city").value;
        sunObj.ncty = ncty;
        if(ncty>=1 && ncty<=10) {
            sunObj.clearExistingCards(document.querySelector('.card-1'));
            sunObj.sunnyCity();
        }
        else {
            alert("Enter number between 1 and 10");
        }
    });
});
document.getElementById("snowcity").addEventListener('click',() => {
    let temp = new Snow();
    temp.clearExistingCards(document.querySelector('.card-1'));
    temp.clearCards(document.querySelector('#card-s'));
    temp.snowCity();
    document.getElementById("no-city").addEventListener('change',()=> {
        let snowObj = new Snow();
        snowObj.clearCards(document.querySelector('#card-s'));
        var ncty = document.getElementById("no-city").value;
        snowObj.ncty = ncty;
        if(ncty>=1 && ncty<=10) {
            snowObj.clearExistingCards(document.querySelector('.card-1'));
            snowObj.snowCity();
        }
        else  {
            alert("Enter number between 1 and 10");
        }
    });
});
document.getElementById("raincity").addEventListener('click',() => {
    let temp = new Rain();
    temp.clearExistingCards(document.querySelector('.card-1'));
    temp.clearCards(document.querySelector('#card-s'));
    temp.rainCity();
    document.getElementById("no-city").addEventListener('change',()=> {
        let rainObj = new Rain();
        rainObj.clearCards(document.querySelector('#card-s'));
        var ncty = document.getElementById("no-city").value;
        rainObj.ncty = ncty;
        if(ncty>=1 && ncty<=10) {
            rainObj.clearExistingCards(document.querySelector('.card-1'));
            rainObj.rainCity();
        }
        else  {
            alert("Enter number between 1 and 10");
        }
    });
});
let val = 0;
const qp = document.querySelector("#card-carousel");
document.getElementById("slider-btn-right").addEventListener('click',moveRight);
function moveRight() {
    if(val < qp.childElementCount*215) {
        val=val+220;
    }
    qp.scroll({
        left: val,
        behavior: "smooth",
    });
}
document.getElementById("slider-btn-left").addEventListener('click',moveLeft);
function moveLeft() {
    if(val > 0) {
        val=val-220;
    }
    qp.scroll({
        left: val,
        behavior:"smooth",
    });
}
/*-------------------------- T2003 -----------------------------*/
class SortContinents {
    flag;
    intl;
    constructor() {
        this.flag=0;
        this.intl=arr;
    }
    clearExistingContCards() { //onclick of sorting, the existing cards vanish
        var dx = document.querySelector(".T1003-2");
        dx.remove(dx);
    }
    clearContCards(dr) {
        if(dr==null || typeof(dr)==undefined) return;
        else {
            dr.remove(dr);
            this.clearContCards(document.querySelector('#Cont-divisions'));
        }
    }
    getContinentName(pt) {
        return this.intl[pt].timeZone.split("/")[0];
    }
    getTemperature(pt) {
        return this.intl[pt].temperature;
    }
    getCityName(pt) {
        return this.intl[pt].timeZone.split("/")[1];
    }
    getTime(pt) {
        var x = new Date().toLocaleTimeString("en-US",
                                     {timeZone:this.intl[pt].timeZone,
                                     hourCycle:'h12',
                                     timeStyle:'short'});
        return x;
    }
    createCards(pt) {
        const ContCards = document.getElementById('continent-cards');
        const dmain = document.createElement('div');
        dmain.id = 'Cont-divisions';
        ContCards.append(dmain);
        
        const d1 = document.createElement('div'); // continent
        d1.setAttribute("style","color: rgba(228, 225, 91, 0.884)");
        d1.innerHTML = this.getContinentName(pt);
        dmain.append(d1);
    
        const d2 = document.createElement('div'); //temperature
        d2.setAttribute("style","text-align-last: end;font-size: x-large;");
        d2.innerHTML=this.getTemperature(pt);
        dmain.append(d2)
        
        const d3 = document.createElement('div'); //city and time
        d3.setAttribute("style","color: rgba(255, 255, 255, 0.651);");
        const d31 = document.createElement('span'); //city
        d31.innerHTML = this.getCityName(pt)+", ";
        d3.append(d31);
        const d32 = document.createElement('span'); //time
        d32.innerHTML=this.getTime(pt)
        d3.append(d32);
        dmain.append(d3)
    
        const d4 = document.createElement('div'); //humidity
        d4.setAttribute("style","text-align-last: end;");
        const d41 = document.createElement('img');
        d41.src="/XSAssignments/assets/humidityIcon.svg";
        d4.append(d41);
        const d42 = document.createElement('span');
        d42.innerHTML=this.intl[pt].humidity;
        d4.append(d42);
    
        dmain.append(d4);
    }

}
class sortByName extends SortContinents {
    constructor() {
        super();
        document.getElementById("sort-cont").style.borderBottom="#30D5C8 solid 2px";
        document.getElementById("sort-temp").style.borderBottom="#000000 solid 2px";
    }
    sortCont() {
        if(p.flag==0) {
            p.flag=1;
            this.clearExistingContCards();
        }
        else if(p.flag==1 || p.flag==2) {
            this.clearContCards(document.querySelector('#Cont-divisions'));
        }
        function compareStrings(a, b) {
            a = a.toLowerCase();
            b = b.toLowerCase();
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        } 
        this.intl.sort(function(a, b) {
            return compareStrings(a.timeZone, b.timeZone);
        })
        for(let i=0;i<this.intl.length;i++) {
            this.createCards(i);
        }
    }
}
class sortByTemp extends SortContinents {
    constructor() {
        super();
        document.getElementById("sort-cont").style.borderBottom="#000000 solid 2px";
        document.getElementById("sort-temp").style.borderBottom="#30D5C8 solid 2px";
    }
    sortTemp() {
        if(p.flag==0) p.flag=1;
        else if(p.flag==1) p.flag=2;
        if(document.querySelector(".T1003-2")!=null) this.clearExistingContCards();
        this.clearContCards(document.querySelector('#Cont-divisions'));
        const mySet = new Set();
        for(let i=0;i<this.intl.length;i++) {
            var str = this.intl[i].timeZone.split("/")[0];
            mySet.add(str);
        }
        var continentList = [...mySet];
        continentList.sort();
        var newArr =[];
        for(let j=0;j<continentList.length;j++) {
            var res = this.intl.filter(p => p.timeZone.split("/")[0]==continentList[j])
            res.sort(function sortByTemp(a,b) {
                if(Number(a.temperature.split("°")[0]) === Number(b.temperature.split("°")[0])) return 0;
                else return (Number(a.temperature.split("°")[0]) < Number(b.temperature.split("°")[0])) ? -1:1;
            });
        newArr.push(...res);
        }
        this.intl=newArr.slice();
        for(let i=0;i<this.intl.length;i++) {
            this.createCards(i);
        }
    }
}
let p = new SortContinents();
document.getElementById("sort-cont").addEventListener('click',()=>{
    let p1 = new sortByName();
    p1.sortCont();
});
document.getElementById("sort-temp").addEventListener('click',()=>{
    let p2 = new sortByTemp();
    p2.sortTemp();
});
