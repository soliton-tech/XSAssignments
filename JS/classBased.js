class CityTemplate{
    constructor(city) {
      this.cityName = city.cityName;
      this.dateAndTime = new Date(city.dateAndTime);
      this.timeZone = city.timeZone;
      this.temperature = city.temperature;
      this.humidity = city.humidity;
      this.precipitation = city.precipitation;
      this.nextFiveHours = city.nextFiveHrs;
    }
  }
  
class DisplayCity extends CityTemplate{
getCityImagePath() {
    return "/Assets/Icons for cities/" + this.cityName.toLowerCase() + ".svg";
}
getTemperatureInC() {
    return parseInt(this.temperature) + " C";
}
getTemperatureInCWithDegree() {
    return parseInt(this.temperature) + "°C";
}
getTemperatureInF() {
    return ((parseInt(this.temperature) * 9) / 5 + 32).toFixed(0) + " F";
}
getHumidity() {
    return this.humidity;
}
getPrecipitation() {
    return this.precipitation;
}
getDate() {
    const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
    ];
    const arr = this.dateAndTime.toLocaleString().split(",");
    const dateArr = arr[0].split("/");
    return [dateArr[1], months[dateArr[0] - 1], dateArr[2]].join("-");
}
getTimeString() {
    const arr = this.dateAndTime.toLocaleString().split(",");
    return arr[1].trim().split(" ")[0];
}
getTimeWithSeconds() {
    const timeArr = this.getTimeString().split(":");
    const hours = timeArr[0];
    const minutes = timeArr[1];
    const seconds = timeArr[2];
    return hours + ":" + minutes + ":" + seconds;
}
getTimeWithOutSeconds() {
    const timeArr = this.getTimeString.call(this).split(":");
    const hours = timeArr[0];
    const minutes = timeArr[1];
    const seconds = timeArr[2];
    return hours + ":" + minutes + " " + this.get12HourClock();
}
get12HourClockImagePath() {
    return this.get12HourClock() === "PM"
    ? "/Assets/General Images & Icons/pmState.svg"
    : "/Assets/General Images & Icons/amState.svg";
}
get12HourClock() {
    const arr = this.dateAndTime.toLocaleString().split(",");
    const timeArr = arr[1].trim().split(" ");
    return timeArr[1];
}
getCurentHour() {
    return parseInt(this.getTimeString().split(":")[0]);
}
getNextFiveHoursTemp() {
    return this.nextFiveHours;
}
getRegion(){
    return this.timeZone.split("/")[0];
}
}

export let displayCityObject;

export function setDisplayCityObject(currentCity){
    displayCityObject = currentCity;
}

export function createCityObject(obj){
    return new DisplayCity(obj);
}