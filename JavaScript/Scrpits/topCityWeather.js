import * as utility from "./utility.js"

//const
const BUTTON_PARAM_MAPPING = {sunny:"tempC",cold:"precipitation",rainy:"humidity"}

//Variables
let cityCards = document.querySelector("#topCityWeather #cityCards");
let cityCard = document.querySelector("#topCityWeather .cityCard");
let numOfCities;
let selWeatherBtn;
let selWeather;
let weatherSelBtns = document.querySelectorAll("#weatherSelection .btn")

//support functions
function displayCityCards(cities,parameterToSort){
    //remove all existing card nodes
    utility.removeChild(cityCards);
    let cityOrdered = cities.slice().sort(utility.compareNumProp(parameterToSort));
    let citySubSet = cityOrdered.slice(0,numOfCities)
    citySubSet.forEach((city) => {
        let newcityCard = cityCard.cloneNode(true);
        cityCards.appendChild(newcityCard);
        newcityCard.querySelector("#topCityWeather .cityName").innerText = city.name;
        newcityCard.querySelector("#topCityWeather .temperature .icon").src = "../Assets/HTML & CSS/Weather Icons/"+city.categoryIcon;
        let cityPath = `url("../Assets/HTML & CSS/Icons for cities/${city.name.replace(/\s+/g, '').toLowerCase()}.svg")`;
        newcityCard.querySelector("#topCityWeather .secondary").style.backgroundImage = cityPath;
        newcityCard.querySelector("#topCityWeather .time .text").innerText = city.time+" "+city.AMPM;
        newcityCard.querySelector("#topCityWeather .date .text").innerText = city.date;
        newcityCard.querySelector("#topCityWeather .temperature .text").innerText = city.tempC+"°C";
        newcityCard.querySelector("#topCityWeather .humidity .text").innerText = city.humidity+"%";
        newcityCard.querySelector("#topCityWeather .precipitation .text").innerText = city.precipitation+"%";
        
        
    });
}

function makeSelBtnActive(){
    weatherSelBtns.forEach(element => element.classList.remove("selectedbtn"));
    //console.log(selWeatherBtn);
    selWeatherBtn.classList.add("selectedbtn");
}

//main

export function setNumOfCities(num){
    numOfCities = num;
}

export function setSelWeather(btn){
    selWeatherBtn = btn;
    selWeather = selWeatherBtn.id;
    makeSelBtnActive();
}

export function updateCityCards(cityList){
    let selCities = cityList.getCitiesOfCategory(selWeather);
    //console.log(selCities);
    displayCityCards(selCities,BUTTON_PARAM_MAPPING[selWeather]);
}


