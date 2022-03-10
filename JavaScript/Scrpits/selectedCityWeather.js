//Imports
import * as utility from "./utility.js"

//get DOM Elements
let citySelection = document.querySelector("#citySelectionContainer .selection");
let cityIcon = document.querySelector("#cityIcon");
let cityTempC = document.querySelector("#tempC .values");
let cityTempF = document.querySelector("#tempF .values");
let cityHumidity = document.querySelector("#humidity .values");
let cityPrecipitation = document.querySelector("#precipitation .values");
let cityTime = document.querySelector("#cityDetailsGrid .time");
let cityDate = document.querySelector("#cityDetailsGrid .date");
let AMPM = document.querySelector("#cityDetailsGrid .AMPM");
let forecastUI = document.querySelectorAll("#forecast .hrForecast");
let selCity;

//functions
export function populateCities(cities){
    let selCityName = citySelection.value;
    utility.removeChild(citySelection)
    cities.forEach(element => {
        let option = document.createElement("option");
        option.textContent = element;
        option.value = element;
        if(element === selCityName) {
            option.setAttribute("selected","")
        }
        citySelection.appendChild(option);
    });
    
};

export function setSelCity(city){
    selCity = city;
}

export function getSelCity(){
    return selCity;
}

export function updateCityDetails(){
    cityIcon.src = "../Assets/HTML & CSS/Icons for cities/"+selCity.name.replace(/\s+/g, '').toLowerCase()+".svg"
    cityTempC.innerText = selCity.tempC+" °C";
    cityTempF.innerText = selCity.tempF+" F";
    cityHumidity.innerText = selCity.humidity+" %";
    cityPrecipitation.innerText = selCity.precipitation+" %";
    cityDate.innerText = selCity.date;
    cityTime.innerHTML = selCity.time;
    AMPM.src = selCity.isAM?"../Assets/HTML & CSS/General Images & Icons/amState.svg":"../Assets/HTML & CSS/General Images & Icons/pmState.svg"
}

export function updateForecastUI(forecastJSON){
    //console.log(city);
    return new Promise(function(resolve){
    selCity.updateForecast(forecastJSON);
    forecastUI.forEach((item,index)=>{
        if(!index){
            item.querySelector(".forecastTime").innerText = selCity.forecast[index].time;
        } else {
            item.querySelector(".forecastTime").innerText = selCity.forecast[index].time+" "+selCity.AMPM;
        }
        item.querySelector(".forecastTemperature").innerText = `${selCity.forecast[index].temp} °C`;
        //console.log(WEATHER_ICONS_BASE_PATH + forecastIcons[index])
        item.querySelector(".forecastWeatherIcon img").src = selCity.forecast[index].icon;
    })
    resolve();
    })
}

//internal functions
function getSelCityName(){
    return document.querySelector("#citySelectionContainer .selection").value
}