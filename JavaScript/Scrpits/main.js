//Imports
import CityList from "./cityList.js"
import LiveWeather from "./LiveWeather.js"
import * as selCity from "./selectedCityWeather.js"
import * as topCity from "./topCityWeather.js"
import * as continent from "./continentWeather.js"


let cityList = new CityList();
//console.log(cityList);
let liveWeather = new LiveWeather(4,1,5);

function updateCityDetailsUI(json){
    return new Promise(function(resolve){
        let selCityObj;
        let selCityName;
        cityList.updateCityList(json)
        selCity.populateCities(cityList.cityNames);
        selCityName = document.querySelector("#citySelectionContainer .selection").value;
        selCityObj = cityList.getSelCity(selCityName);
        selCity.setSelCity(selCityObj);
        selCity.updateCityDetails();
        //liveWeather.getSelCityForecast(selCity.getSelCity(),updateSelCityForecast)

        //top city update
        topCity.setSelWeather(document.querySelector("#weatherSelection .btn"));
        topCity.setNumOfCities(document.querySelector("#weatherSelection #numOfCities").value);
        topCity.updateCityCards(cityList);

        //continent update
        continent.updateContinentCard(cityList);
        resolve(selCityObj);
    })
    
}

//event handlers
function updateCityMonitor(city){
    selCity.setSelCity(city);
    liveWeather.getSelCityForecast(selCity.getSelCity).then(json=>selCity.updateForecastUI(json)).then(()=>selCity.updateCityDetails());
    
}

function setSelectedWeatherType(btn){
    topCity.setSelWeather(btn);
    topCity.updateCityCards(cityList);  
}

function setNumofTopCities(numOfCities){
    topCity.setNumOfCities(numOfCities);
    topCity.updateCityCards(cityList);
}

function setSelContinentBtnState(){
    continent.switchContinentSortDir();
    continent.updateContinentCard(cityList);
}

function setSelTempBtnState(){
    continent.switchTempSortDir();
    continent.updateContinentCard(cityList);
}

//event listeners
document.querySelector("#citySelectionContainer .selection").addEventListener("change",(e)=>updateCityMonitor(cityList.getSelCity(e.currentTarget.value)))

document.querySelectorAll("#topCityWeather #weatherSelection .btn").forEach(element => {
    element.addEventListener("click",(e)=>setSelectedWeatherType(e.currentTarget))
})

document.querySelector("#topCityWeather #weatherSelection #numOfCities").addEventListener("change",(e)=>setNumofTopCities(e.currentTarget.value))

document.querySelector("#continentWeather .sorter.continent .btn").addEventListener("click",setSelContinentBtnState);

document.querySelector("#continentWeather .sorter.temp .btn").addEventListener("click",setSelTempBtnState);

//Main
// //#question: Should this be loaded on some window load event?

//updateCityDetailsUI(topCityWeatherJSON);
//liveWeather.getAllCityWeatherDetails().then(updateCityDetailsUI()).then(selCityName => liveWeather.getSelCityForecast(selCityName));
liveWeather.getAllCityWeatherDetails().then(json => updateCityDetailsUI(json)).then(() => liveWeather.getSelCityForecast(selCity.getSelCity)).then(json=>selCity.updateForecastUI(json)).then(()=>{
    liveWeather.launchAllCityMonitor(updateCityDetailsUI);
    liveWeather.launchForecastMonitor(selCity.getSelCity,selCity.updateForecastUI);
});
//liveWeather.launchAllCityMonitor(updateCityDetailsUI);



