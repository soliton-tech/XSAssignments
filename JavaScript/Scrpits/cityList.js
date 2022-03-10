import City from "./city.js"
import * as utility from "./utility.js"

export default function CityList(){
    this.cities = [];
    this.cityNames = [];
    this.continentNames = [];
};

CityList.prototype.updateCityList = function(topCityWeatherJSON){
    this.cities = createCities(topCityWeatherJSON);
    this.cityNames = getCityNameList(this.cities);
    this.continentNames = getContientNameList(this.cities);
}


CityList.prototype.getSelCity = function(cityName){
    return this.cities.find(element => element.name == cityName);
}

CityList.prototype.getCitiesOfContinent = function(continentName){
    return this.cities.filter(city => city.continent == continentName)
}

CityList.prototype.getCitiesOfCategory = function(category){
    return this.cities.filter(city => city.category == category)
}

function createCities(topCityWeatherJSON){
    return topCityWeatherJSON.map(element => {
        return new City(element.cityName,element.dateAndTime,element.timeZone,element.temperature,element.humidity,element.precipitation);
    }).sort(utility.compareStringProp("name"))
}

function getCityNameList(cities){
    return cities.map(city => city.name);
}

function getContientNameList(cities){
    let continents = cities.map(city => city.continent);
    return [...new Set(continents)];
}