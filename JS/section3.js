import * as html from "./htmlElements.js";
import * as common from "./common.js";

let GlobalObject = {
    isContinentAscending: true,
    isTemperatureAscending: true,
}

export function callSortByTemperture(cityData,setDisplayCityObjectCallBack) {
let element = document.querySelector(".temperature-arrow");
if (GlobalObject.isTemperatureAscending) {
    element.src = "Assets/General Images & Icons/arrowDown.svg";
    GlobalObject.isTemperatureAscending = false;
} else {
    element.src = "Assets/General Images & Icons/arrowUp.svg";
    GlobalObject.isTemperatureAscending = true;
}
updateContinentCities(cityData,setDisplayCityObjectCallBack);
}
export function callSortByRegion(cityData,setDisplayCityObjectCallBack) {
let element = document.querySelector(".continent-arrow");
if (GlobalObject.isContinentAscending) {
    element.src = "Assets/General Images & Icons/arrowDown.svg";
    GlobalObject.isContinentAscending = false;
} else {
    element.src = "Assets/General Images & Icons/arrowUp.svg";
    GlobalObject.isContinentAscending = true;
}
updateContinentCities(cityData,setDisplayCityObjectCallBack);
}
export function createContinentCitites() {
    let city_grid_container = document.querySelector(".city-card-container");
    for (let i = 0; i < 12 ; i++) {
        city_grid_container.appendChild(createContinentContiner(i + 1));
    }
}
export function updateContinentCities(cityData,setDisplayCityObjectCallBack) {
    let cityByRegionSorted = sortByRegion(cityData,GlobalObject.isContinentAscending);
    let index = 1;
    for (const [key, value] of cityByRegionSorted.entries()) {
        let displayCityObject = setDisplayCityObjectCallBack(value);
        let city_container = document.querySelector(".city-card" + index);
        city_container.querySelector(".city-card-continent-name").innerHTML = displayCityObject.getRegion();
        city_container.querySelector(".city-card-city-name").innerHTML = displayCityObject.cityName + ", ";
        city_container.querySelector(".city-card-city-time").innerHTML = displayCityObject.getTimeWithOutSeconds();
        city_container.querySelector(".city-card-city-temperature").innerHTML = displayCityObject.getTemperatureInCWithDegree();
        city_container.querySelector(".city-card-humidity").innerHTML = displayCityObject.getHumidity();
        index++;
    }
}
function createContinentContiner(number) {
    let city_container = html.createDivElement("city-card city-card"+ number);
    
    let city_details_grid = html.createDivElement("grid grid-two-col city-card-grid");
    city_container.appendChild(city_details_grid);
    
    let divElement = html.createDivElement("");
    city_details_grid.appendChild(divElement);
    
    let continent = html.createParagraphElement("city-card-continent-name","Asia");
    divElement.appendChild(continent);
    
    let flexDiv = html.createDivElement("flex");
    divElement.appendChild(flexDiv);
    
    let city = html.createParagraphElement("city-card-city-name","Delhi,");
    flexDiv.appendChild(city);
    
    let time = html.createParagraphElement("city-card-city-time","10:10AM");
    flexDiv.appendChild(time);
    
    let divElement2 = html.createDivElement("");
    city_details_grid.appendChild(divElement2);
    
    let flexEnd = html.createDivElement("flex justify-flex-end");;
    divElement2.appendChild(flexEnd);
    
    let temp = html.createParagraphElement("city-card-city-temperature","38°C");
    flexEnd.appendChild(temp);
    
    let flexEnd2 = html.createDivElement("flex justify-flex-end");
    divElement2.appendChild(flexEnd2);
    
    let humidityImg = html.createImageElement("Assets/Weather Icons/humidityIcon.svg","",["city-card-humidity-img"]);
    flexEnd2.appendChild(humidityImg);
    
    let humidity = html.createParagraphElement("city-card-humidity","53%");
    flexEnd2.appendChild(humidity);
    
    return city_container;
}
function sortByRegion(cityData,isAscending) {
    let arr = Array.from(cityData, ([key, value]) => [key, value])
      .sort((a, b) => {
        /*a-> an object to be compared with
      b-> an object to be compared
      
      a or b -> [Key,Value]
  
    */
        return isAscending
          ? a[1]["timeZone"]
              .split("/")[0]
              .localeCompare(b[1]["timeZone"].split("/")[0]) ||
              sortTemperature(a, b)
          : b[1]["timeZone"]
              .split("/")[0]
              .localeCompare(a[1]["timeZone"].split("/")[0]) ||
              sortTemperature(a, b);
      })
      .splice(0, 12);
    let map = common.convertArrayOfArrayToMap(arr);
    return map;
} 
function sortTemperature(a, b) {
if (parseInt(a[1]["temperature"]) > parseInt(b[1]["temperature"]))
    return GlobalObject.isTemperatureAscending ? 1 : -1;
if (parseInt(a[1]["temperature"]) < parseInt(b[1]["temperature"]))
    return GlobalObject.isTemperatureAscending ? -1 : 1;
return 0;
}