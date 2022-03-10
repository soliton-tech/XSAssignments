import * as utility from "./utility.js"

//constants
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const SUNNY={text:"sunny",icon:"sunnyIcon.svg"};
const COLD ={text:"cold",icon:"snowflakeIcon.svg"};
const RAINY ={text:"rainy",icon:"rainyIcon.svg"};
const WEATHER_ICONS_BASE_PATH = "../Assets/HTML & CSS/Weather Icons/"

const CITY_CATEGORIZATION_CONDITIONS=[{
        category:SUNNY,
        tempC:{start:30},
        humidity:{stop:49},
        percipitation:{start:50},
        sortParm:"temperature",
        ascending:true
    },{
        category:COLD,
        tempC:{start:20,stop:28},
        humidity:{start:50},
        percipitation:{stop:49},
        sortParm:"precipitation",
        ascending:true
    },{
        category:RAINY,
        tempC:{stop:19},
        humidity:{start:50},
        percipitation:{},
        sortParm:"humidity",
        ascending:true
}]

//Main
export default function City(name,dateAndTime,timeZone,temperature,humidity,precipitation){
        this.name = name;
        this.dateAndTime = new Date(dateAndTime);
        this.timeZone = timeZone;
        this.tempC = Math.round(parseFloat(utility.removeUnits(temperature))*10)/10;
        this.humidity = Math.round(parseFloat(utility.removeUnits(humidity))*10)/10;
        this.precipitation = Math.round(parseFloat(utility.removeUnits(precipitation))*10)/10;
        this.tempF = Math.round((parseInt(temperature)*(9/5)+32)*10)/10;
        this.date = `${this.dateAndTime.getDate()}-${MONTHS[this.dateAndTime.getMonth()]}-${this.dateAndTime.getFullYear()}`;
        // this.time = `${utility.hrsIn12(this.dateAndTime.getHours()).toString().padStart(2,0)}:${this.dateAndTime.getMinutes().toString().padStart(2,0)}:${this.dateAndTime.getSeconds().toString().padStart(2,0)}`;
        this.time = utility.strigfyTime(this.dateAndTime,":");
        this.isAM = utility.isAM(this.dateAndTime.getHours());
        this.AMPM = this.AM?"AM":"PM";
        this.continent = timeZone.substr(0,timeZone.indexOf("/"));
        let {text,icon} = categorizeCity(this.tempC,this.humidity,this.precipitation);
        this.category = text;
        this.categoryIcon = icon;
        this.forecast = []; 
}

function categorizeCity(temp,humidity,precipitation){
    let selectedCond = CITY_CATEGORIZATION_CONDITIONS.find(item=>{
        //checking temperature
        let tempInLimits = utility.checkLimits(temp,item.tempC);
        let humidityInLimits = utility.checkLimits(humidity,item.humidity);
        let precipitationInLimits = utility.checkLimits(precipitation,item.percipitation)
        return tempInLimits && humidityInLimits && precipitationInLimits
    })
    if (selectedCond !== undefined)
    {
        return selectedCond.category;
    }
    else
    {
        return CITY_CATEGORIZATION_CONDITIONS[0].category;
    }
}

City.prototype.updateForecast = function(forecast){
    let ctTime = this.dateAndTime.getHours();
    let ctTempC = this.tempC;
    //get forecast hrs
    let forecastHrs = forecast.hours.map((item)=>{
        //console.log("forecast:" + item + " " + item.replace(/[^0-9]/g,''));
        return parseInt(utility.removeUnits(item))+ctTime;
    });
    forecastHrs.unshift("Now")
    //console.log(forecastHrs);
    //get forecast temp
    let forecastTemp = forecast.temperature.map((item)=>{
        return parseFloat(utility.removeUnits(item));
    });
    forecastTemp.unshift(ctTempC)
    //console.log(forecastTemp);
    //get icon for the temperature
    let forecastIcons = forecastTemp.map(item=>utility.getTempIcon(item));
    //combine
    this.forecast = forecastHrs.map((item,index)=>{
        return {time:item,temp:forecastTemp[index],icon:WEATHER_ICONS_BASE_PATH+forecastIcons[index]}
    })
}

// Object.defineProperties(City.prototype,{
//     date:{ get:function(){
//         return `${this.dateAndTime.getDate()}-${MONTHS[this.dateAndTime.getMonth()]}-${this.dateAndTime.getFullYear()}`
//         }
//     },
//     isAM: {get:function(){
//         return (utility.isAM(this.dateAndTime.getHours()))
//     }
//     },
//     time: {get:function(){
//         return `${utility.timeInAMPM(this.dateAndTime.getHours()).toString().padStart(2,0)}:${this.dateAndTime.getMinutes().toString().padStart(2,0)}:${this.dateAndTime.getSeconds().toString().padStart(2,0)}`
//         }
//     },
//     tempF: {get: function(){
//         return (parseInt(selectedCityDetails.temperature)*(9/5)+32).toPrecision(3)+" F";
//     }}
//     })