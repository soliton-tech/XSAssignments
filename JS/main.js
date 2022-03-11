/* Import Statements */
import * as sect1 from "./section1.js";
import * as sect2 from "./section2.js";
import * as sect3 from "./section3.js";
//import { URL, getNextFiveHoursTemperature } from "./readFileData.js";
import { URL, getNextFiveHoursTemperature } from "./readAPIData.js";
//import { displayCityObject, setDisplayCityObject, createCityObject} from "./protoBased.js";
import {
  displayCityObject,
  setDisplayCityObject,
  createCityObject,
} from "./classBased.js";
import * as date from "./dateScript.js";

/* Global */
let GlobalObject = {
  cityData: new Map(),
};
(function () {
  initializeWeatherApp();
})();

/* Initialize */
function initializeWeatherApp() {
  fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      GlobalObject.data = JSON.parse(data);
      for (let i in GlobalObject.data) {
        GlobalObject.cityData.set(
          GlobalObject.data[i]["cityName"].toLowerCase(),
          createCityObject(GlobalObject.data[i])
        );
      }
      sect1.createNextFiveHoursSection();
      sect1.updateFirstCity(
        GlobalObject.cityData,
        getNextFiveHoursTemperature,
        setDisplayCityObjectCallBack
      );
      date.startOrResetTimer(updateTimeAndDate, sect1.currentCityObject);
      sect2.updateCityCards(
        GlobalObject.cityData,
        setDisplayCityObjectCallBack
      );
      sect3.createContinentCitites();
      sect3.updateContinentCities(
        GlobalObject.cityData,
        setDisplayCityObjectCallBack
      );
      sect2.hideScrollBar();
    });
}

/* Callbacks */
function setDisplayCityObjectCallBack(city) {
  setDisplayCityObject(city);
  return displayCityObject;
}
function updateTimeAndDate(functionBooleanArray) {
  if (functionBooleanArray[3]) {
    location.reload();
  } else {
    if (functionBooleanArray[0]) sect1.updateDateTime();
    if (functionBooleanArray[1]) {
      GlobalObject.cityData.forEach((value, key) => {
        value.dateAndTime = date.incrementMinute(value.dateAndTime);
      });
      sect2.updateCityCards(
        GlobalObject.cityData,
        setDisplayCityObjectCallBack
      );
      sect3.updateContinentCities(
        GlobalObject.cityData,
        setDisplayCityObjectCallBack
      );
    }
    if (functionBooleanArray[2]) {
      sect1.setNextFiveHoursTemp(getNextFiveHoursTemperature);
    }
  }
}

/* Event Handlers */
/* General */
window.addEventListener("resize", respectWindowResize);

/* Section 1 */
window.changeDisplayCity = function () {
  let city = document.querySelector(".city-selector");
  let cityname = city.selectedOptions[0].value;
  let currentCity = GlobalObject.cityData.get(cityname);
  sect1.updateSection1(
    currentCity,
    getNextFiveHoursTemperature,
    setDisplayCityObjectCallBack
  );
  date.updateCity(sect1.currentCityObject);
};

/* Section 2 */
function updateTopCity(filterName, filterValue) {
  sect2.updateWeatherHighlighter(filterName);
  sect2.setWeatherFilter(filterValue);
  sect2.updateCityCards(GlobalObject.cityData, setDisplayCityObjectCallBack);
  sect2.hideScrollBar();
}
function respectWindowResize() {
  sect2.hideScrollBar();
}
document.querySelector(".sunny").addEventListener("click", () => {
  updateTopCity("sunny", 1);
});
document.querySelector(".cold").addEventListener("click", () => {
  updateTopCity("cold", 2);
});
document.querySelector(".rainy").addEventListener("click", () => {
  updateTopCity("rainy", 3);
});
document.querySelector(".number-of-city").addEventListener("keyup", () => {
  sect2.enforceMinMax();
});
document.querySelector(".number-of-city").addEventListener("change", () => {
  sect2.updateCityCards(GlobalObject.cityData, setDisplayCityObjectCallBack);
  sect2.hideScrollBar();
});
document.querySelector(".left-scroller").addEventListener("click", () => {
  let element = document.querySelector(".top-city-scroller");
  let value = element.scrollLeft;
  element.scroll({
    left: value - 410,
    behavior: "smooth",
  });
});
document.querySelector(".right-scroller").addEventListener("click", () => {
  let element = document.querySelector(".top-city-scroller");
  let value = element.scrollLeft;
  element.scroll({
    left: value + 410,
    behavior: "smooth",
  });
});

/* Section 3 */
document.querySelector(".continent-arrow").addEventListener("click", () => {
  sect3.callSortByRegion(GlobalObject.cityData, setDisplayCityObjectCallBack);
});
document.querySelector(".temperature-arrow").addEventListener("click", () => {
  sect3.callSortByTemperture(
    GlobalObject.cityData,
    setDisplayCityObjectCallBack
  );
});
