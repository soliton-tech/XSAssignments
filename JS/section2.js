import * as common from "./common.js";
import * as html from "./htmlElements.js";

let GlobalObject ={
    numberOfCityExist: 0,
    currentWeatherFilter: 1,
    currentWeatherFilterMap : new Map([
        [1, "sunnyIcon.svg"],
        [2, "snowflakeIcon.svg"],
        [3, "rainyIcon.svg"],
      ])
}
export function updateCityCards(cityData,setDisplayCityObjectCallBack) {
    let filteredData = filterWeatherCities(cityData);
    let numberOfCity = document.querySelector(".number-of-city").value;
    GlobalObject.numberOfCityExist = Math.min(numberOfCity, filteredData.size);
    createOrDeleteCityCards();
    let index = 0;
    for (const [key, value] of filteredData.entries()) {
      let displayCityObject =  setDisplayCityObjectCallBack(value);
      let top_city = document.querySelector(".top-city-card"+(index+1));
      top_city.querySelector(".top-city-name").innerHTML = displayCityObject.cityName;
      top_city.querySelector(".top-city-time").innerHTML = displayCityObject.getTimeWithOutSeconds();
      top_city.querySelector(".top-city-date").innerHTML = displayCityObject.getDate();
      top_city.querySelector(".top-city-humidity").innerHTML = displayCityObject.getHumidity();
      top_city.querySelector(".top-city-precip").innerHTML = displayCityObject.getPrecipitation();
      top_city.querySelector(".top-city-temp-img").src = "Assets/Weather Icons/"+GlobalObject.currentWeatherFilterMap.get(GlobalObject.currentWeatherFilter);
      top_city.querySelector(".top-city-temp").innerHTML = displayCityObject.getTemperatureInCWithDegree();
      top_city.querySelector(".top-city-img").src = displayCityObject.getCityImagePath();
      index++;
      if (index >= GlobalObject.numberOfCityExist) break;
    }

}
export function updateWeatherHighlighter(className) {
    if (GlobalObject.currentWeatherFilter === 1)
      document
        .querySelector(".sunny")
        .querySelector(".weather-highlighter")
        .remove();
    if (GlobalObject.currentWeatherFilter === 2)
      document
        .querySelector(".cold")
        .querySelector(".weather-highlighter")
        .remove();
    if (GlobalObject.currentWeatherFilter === 3)
      document
        .querySelector(".rainy")
        .querySelector(".weather-highlighter")
        .remove();
    let highlighter = document.createElement("hr");
    highlighter.classList.add("weather-highlighter");
    document.querySelector("."+className).appendChild(highlighter);
}
export function setWeatherFilter(value){
    GlobalObject.currentWeatherFilter = value;
}
export function enforceMinMax() {
    let el = document.querySelector(".number-of-city");
    if (el.value != "") {
      if (parseInt(el.value) < parseInt(el.min)) {
        el.value = el.min;
      }
      if (parseInt(el.value) > parseInt(el.max)) {
        el.value = el.max;
      }
    }
}
export function hideScrollBar(){
  let scroller = document.querySelector(".top-city-scroller");
  let status = getScrollerStatus(scroller);
  document.querySelector(".left-scroller").querySelector(".prev").style.visibility = status;
  document.querySelector(".right-scroller").querySelector(".next").style.visibility = status;
}

function createOrDeleteCityCards(){
  let scroller = document.querySelector(".top-city-scroller");
  let index = scroller.childElementCount;
  if(index < GlobalObject.numberOfCityExist){
    for (let i = index;i<GlobalObject.numberOfCityExist;i++) {
      let city_card = createCityCard(i+1);
      scroller.appendChild(city_card);
    }
  }
  else{
    for(let i = index;i>GlobalObject.numberOfCityExist;i--){
      scroller.querySelector(".top-city-card"+(i)).remove();
    }
  }
  
}
function createCityCard(cityNumber) {
  let city = html.createDivElement("top-city-card" + cityNumber);

  let top_city = html.createDivElement("top-city-card");
  city.appendChild(top_city);

  let top_city_grid = html.createDivElement("grid grid-two-col top-city-grid");
  top_city.appendChild(top_city_grid);

  let divElement = html.createDivElement("");
  top_city_grid.appendChild(divElement);

  let city_name = html.createParagraphElement("top-city-text top-city-name","London");
  divElement.appendChild(city_name);

  let city_time = html.createParagraphElement("top-city-text top-city-time","10:00 AM");
  divElement.appendChild(city_time);

  let city_date = html.createParagraphElement("top-city-text top-city-date","3-Mar-2022");
  divElement.appendChild(city_date);

  let flexClass = html.createDivElement("flex");
  divElement.appendChild(flexClass);

  let humidity_img = html.createImageElement("Assets/Weather Icons/humidityIcon.svg","H",["top-city-text","top-city-hum-img"]);
  flexClass.appendChild(humidity_img);

  let humidity = html.createParagraphElement("top-city-text top-city-humidity","27%");
  flexClass.appendChild(humidity);

  let flexClass2 = html.createDivElement("flex");
  divElement.appendChild(flexClass2);

  let prec_img = html.createImageElement("Assets/Weather Icons/precipitationIcon.svg","P",["top-city-text","top-city-prec-img"]);
  flexClass2.appendChild(prec_img);

  let precipitation = html.createParagraphElement("top-city-text top-city-precip","70%");
  flexClass2.appendChild(precipitation);

  let divElement2 = html.createDivElement("");
  top_city_grid.appendChild(divElement2);

  let flexClass3 = html.createDivElement("flex");
  divElement2.appendChild(flexClass3);

  let weather_img = html.createImageElement("Assets/Weather Icons/" + "sunnyIcon.svg","top-city-temp-img",["top-city-temp-img"]);
  flexClass3.appendChild(weather_img);

  let weather = html.createParagraphElement("top-city-temp","35°C");
  flexClass3.appendChild(weather);

  let divElement3 = html.createDivElement("");
  divElement2.appendChild(divElement3);

  let top_city_img = html.createImageElement("Assets/Icons for cities/london.svg","",["top-city-img"]);
  divElement3.appendChild(top_city_img);

  return city;
}
function filterWeatherCities(cityData) {
  if (GlobalObject.currentWeatherFilter === 1) {
    let arr = Array.from(cityData, ([key, value]) => [key, value]).filter(
      ([key, value]) =>
        parseInt(value["temperature"]) >= 29 &&
        parseInt(value["humidity"]) < 50 &&
        parseInt(value["precipitation"]) >= 50
    );
    let map = common.convertArrayOfArrayToMap(arr);
    return map;
  }

  if (GlobalObject.currentWeatherFilter === 2) {
    let arr = Array.from(cityData, ([key, value]) => [key, value]).filter(
      ([key, value]) =>
        parseInt(value["temperature"]) >= 20 &&
        parseInt(value["humidity"]) > 50 &&
        parseInt(value["precipitation"]) < 50
    );
    let map = common.convertArrayOfArrayToMap(arr);
    return map;
  }

  //rainy
  let arr = Array.from(cityData, ([key, value]) => [key, value]).filter(
    ([key, value]) =>
      parseInt(value["temperature"]) < 20 && parseInt(value["humidity"]) >= 50
  );
  let map = common.convertArrayOfArrayToMap(arr);
  return map;
}
function getScrollerStatus(scroller){
  
  if((scroller.scrollWidth-scroller.clientWidth)>0){
    return "visible";
  }
  return "hidden";
}