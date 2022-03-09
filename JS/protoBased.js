export function CityTemplate(city) {
    this.cityName = city.cityName;
    this.dateAndTime = new Date(city.dateAndTime);
    this.timeZone = city.timeZone;
    this.temperature = city.temperature;
    this.humidity = city.humidity;
    this.precipitation = city.precipitation;
    this.nextFiveHours = city.nextFiveHrs;
  }

export let displayCityObject = {
    getCityImagePath: function () {
      return "/Assets/Icons for cities/" + this.cityName.toLowerCase() + ".svg";
    },
    getTemperatureInC: function () {
      return parseInt(this.temperature) + " C";
    },
    getTemperatureInCWithDegree: function () {
      return parseInt(this.temperature) + "°C";
    },
    getTemperatureInF: function () {
      return ((parseInt(this.temperature) * 9) / 5 + 32).toFixed(0) + " F";
    },
    getHumidity: function () {
      return this.humidity;
    },
    getPrecipitation: function () {
      return this.precipitation;
    },
    setProto: function (cityname) {
      this.__proto__ = cityname;
    },
    getDate: function () {
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
    },
    getTimeString: function () {
      const arr = this.dateAndTime.toLocaleString().split(",");
      return arr[1].trim().split(" ")[0];
    },
    getTimeWithSeconds: function () {
      const timeArr = this.getTimeString().split(":");
      const hours = timeArr[0];
      const minutes = timeArr[1];
      const seconds = timeArr[2];
      return hours + ":" + minutes + ":" + seconds;
    },
    getTimeWithOutSeconds: function () {
      const timeArr = this.getTimeString().split(":");
      const hours = timeArr[0];
      const minutes = timeArr[1];
      const seconds = timeArr[2];
      return hours + ":" + minutes + " " + this.get12HourClock();
    },
    get12HourClockImagePath: function () {
      return this.get12HourClock() === "PM"
        ? "/Assets/General Images & Icons/pmState.svg"
        : "/Assets/General Images & Icons/amState.svg";
    },
    get12HourClock: function () {
      const arr = this.dateAndTime.toLocaleString().split(",");
      const timeArr = arr[1].trim().split(" ");
      return timeArr[1];
    },
    getCurentHour: function () {
      return parseInt(this.getTimeString().split(":")[0]);
    },
    getNextFiveHoursTemp: function () {
      return this.nextFiveHours;
    },
    getRegion : function(){
      return this.timeZone.split("/")[0];
    }
  };

export function setDisplayCityObject(currentCity){
    displayCityObject.setProto(currentCity);
}

export function createCityObject(obj){
    return new CityTemplate(obj);
}