export let URL = "./Assets/files/data.json";
export function getNextFiveHoursTemperature(displayCityObject){
  let nextFiveHours = displayCityObject.getNextFiveHoursTemp();
  nextFiveHours.push("11°C");
  nextFiveHours.unshift(displayCityObject.getTemperatureInC());
  return nextFiveHours;
}