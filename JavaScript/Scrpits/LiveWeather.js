import * as utility from "./utility.js"

//This file contains HTTP requests to get weather conditions

//run a thread 4hrs once which will get data all city data and update
//run another thread which will get current city forecast 
export default function LiveWeather(allWeatherWaitHrs,forecastWaitHrs,forecastNumHrs){
    this.allWeatherWaitMs = utility.hrsToMs(allWeatherWaitHrs);
    //this.allWeatherWaitMs = 5000;
    this.forecastWaitMs = utility.hrsToMs(forecastWaitHrs);
    //this.forecastWaitMs = 1000;
    this.forecastNumHrs = forecastNumHrs
}


LiveWeather.prototype.launchAllCityMonitor = async function(UIUpdateFunc){
    setInterval(()=>this.getAllCityWeatherDetails().then(json=>{
        console.log("timeout")
        UIUpdateFunc(json)
    }),this.allWeatherWaitMs);
}

LiveWeather.prototype.cityWeather


LiveWeather.prototype.launchForecastMonitor = async function(getSelCityFunc,UIUpdateFunc){
    setInterval(()=>this.getSelCityForecast(getSelCityFunc).then(json=>{
        //console.log("timeoutForecast",getSelCityFunc())
        UIUpdateFunc(json)
    }),this.forecastWaitMs);
}


LiveWeather.prototype.getAllCityWeatherDetails = async function(){
    let json =  await sendHttpRequest("GET","https://soliton.glitch.me/all-timezone-cities");
    //console.log(json);
    return json;
}

LiveWeather.prototype.getSelCityForecast = async function(getSelCityFunc){
    let selCity = getSelCityFunc();
    let time = utility.strigfyTime(selCity.dateAndTime,":");
    let date = `${selCity.dateAndTime.getMonth()}/${selCity.dateAndTime.getDate()}/${selCity.dateAndTime.getFullYear()}`;
    let city_Date_Time_Name = `${date},${time} ${utility.isAM(selCity.dateAndTime.getHours())?"AM":"PM"},${selCity.name}`
    //console.log(city_Date_Time_Name);
    let raw = JSON.stringify({
        "city_Date_Time_Name": city_Date_Time_Name,
        //"city_Date_Time_Name": "7/19/2021, 3:48:49 AM, Nome",
        "hours": 5
      });
    let json =  await sendHttpRequest("POST","https://soliton.glitch.me/hourly-forecast",raw);
    //console.log(json)
    return json;
    //UIUpdateFunc(JSON.stringify(json));
    //setTimeout(this.launchForecastMonitor,this.forecastWaitMs,selCity,UIUpdateFunc)
}

async function sendHttpRequest(command,url,data){
    let response = await fetch(url,{
        method:command,
        headers:(data?{'Content-Type':'application/json'}:{}),
        body:data
    });

    //let response = await fetch(url);

    if (response.ok){
        let json = await response.json();
        //console.log(json)
        return(json)
    }else{
        throw new Error(`Error ${response.status} in communication to the url ${url}`)
    }
}