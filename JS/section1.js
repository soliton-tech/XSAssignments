import * as common from "./common.js";
import * as html from "./htmlElements.js";

export let currentCityObject;
export function updateListOfCity(cityData){
  const selectBox = document.querySelector(".city-selector");
  cityData.forEach((value,key) => {
    let newOption = new Option(
      value.cityName,
      key
    );
    selectBox.add(newOption, undefined);
  });
}
export function updateFirstCity(cityData,getNextFiveHoursTemperature,setDisplayCityObjectCallBack){
  updateListOfCity(cityData);
  const [firstCity] = cityData.keys();
  let currentCity = cityData.get(firstCity);
  updateSection1(currentCity,getNextFiveHoursTemperature,setDisplayCityObjectCallBack);
}
export function updateSection1(city,getNextFiveHoursTemperature,setDisplayCityObjectCallBack) {
  let displayCityObject = setDisplayCityObjectCallBack(city);
  setCurrentCityObject(displayCityObject);
  updateDisplayCity();
  updateWeather();
  updateDateTime();
  setNextFiveHoursTemp(getNextFiveHoursTemperature);
}
export function createNextFiveHoursSection() {
  for (let i = 0; i < 6; i++) {
    createNextHour(i+1);
    if (i !== 5) createHourSplitter();
  }
}
export function updateDateTime(){
  document.querySelector(".selected-city-date").innerHTML = currentCityObject.getDate.call(currentCityObject);
  document.querySelector(".selected-city-time").innerHTML = currentCityObject.getTimeWithSeconds.call(currentCityObject);
  document.querySelector(".selected-city-time-12hr").src = currentCityObject.get12HourClockImagePath.call(currentCityObject);
}
export async function setNextFiveHoursTemp(getNextFiveHoursTemperature) {
  let nexthour = currentCityObject.getCurentHour();
  let nextampm = currentCityObject.get12HourClock();
  let nextFiveHours = await getNextFiveHoursTemperature(currentCityObject);
  let nextHoursContainer = document.querySelector(".next-hours");
  for (var i = 1; i <= 6; i++) {
    let hourContainer = nextHoursContainer.querySelector(".hour-container" + i.toString());
    if (i === 1) {
      hourContainer.querySelector(".hour").innerHTML = "NOW";
    } else {
      let nextArray = getNextTime(nexthour, nextampm);
      nexthour = nextArray[0];
      nextampm = nextArray[1];
      hourContainer.querySelector(".hour").innerHTML = "" + nexthour + " "+nextampm;
    }
    hourContainer.querySelector(".temp").innerHTML = parseInt(nextFiveHours[i - 1]);
    hourContainer.querySelector(".weather-icon").src =
      "Assets/Weather Icons/" +
      common.getWeatherIcon(parseInt(nextFiveHours[i - 1])) +
      ".svg";
  }
}
function updateDisplayCity() {
  document.getElementsByClassName("display-city-image")[0].src = currentCityObject.getCityImagePath();
}
function updateWeather(){
  document.querySelector(".tempC").innerHTML = currentCityObject.getTemperatureInC();
  document.querySelector(".tempF").innerHTML = currentCityObject.getTemperatureInF();
  document.querySelector(".humidity").innerHTML = currentCityObject.getHumidity();
  document.querySelector(".precipitation").innerHTML = currentCityObject.getPrecipitation();
}
function getNextTime(hours, ampm) {
  let arr = [];
  let time = hours === 12 ? 1 : hours + 1;
  arr.push(time);
  let ampmstate = hours === 11 ? (ampm === "AM" ? "PM" : "AM") : ampm;
  arr.push(ampmstate);
  return arr;
}
function createNextHour(index) {
  let gridElement = document.querySelector(".next-hours");

  let hourElement = html.createDivElement(
    "hour-container" + index + " grid grid-four-rows center-text-align"
  );
  gridElement.appendChild(hourElement);

  let hour = html.createParagraphElement("hour margin-top-bottom", "NOW");
  hourElement.appendChild(hour);

  let splitter = html.createParagraphElement(
    "bold hour margin-top-bottom",
    "|"
  );
  hourElement.appendChild(splitter);

  let imgDiv = html.createDivElement("margin-auto margin-top-bottom");
  hourElement.appendChild(imgDiv);

  let img = html.createImageElement(
    "Assets/Weather Icons/cloudyIcon.svg","",["weather-icon"]);
  imgDiv.appendChild(img);

  let temp = html.createParagraphElement("temp margin-top-bottom", "6");
  hourElement.appendChild(temp);
}
function createHourSplitter() {
  let gridElement = document.querySelector(".next-hours");
  let grid = html.createDivElement("grid");
  gridElement.appendChild(grid);

  let p = html.createParagraphElement(
    "bold margin-top-bottom grid-row-2 opacity-75 hide",
    "|"
  );
  grid.appendChild(p);
}
function setCurrentCityObject(displayCityObject){
  currentCityObject = structuredClone(displayCityObject);
  //copying the inheritance object
  currentCityObject.__proto__ = displayCityObject.__proto__;
}

