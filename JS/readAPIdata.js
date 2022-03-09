export let URL = "https://soliton.glitch.me/all-timezone-cities";
export async function getNextFiveHoursTemperature(displayCityObject) {
  //console.log("Now " +displayCityObject.getTemperatureInC());
  let nextFiveHoursObject;
  let cityName = displayCityObject.cityName;
  //console.log("before fetch" + displayCityObject.getTemperatureInC());
  await fetch("https://soliton.glitch.me?city=" + cityName)
    .then(async (response) => response.text())
    .then(async (data) => {
      let cityInfo = JSON.parse(data);
      let hours = { hours: "5" };
      let requestBody = {
        ...cityInfo,
        ...hours,
      };
      //console.log("1st " +displayCityObject.getTemperatureInC());
      await fetch("https://soliton.glitch.me/hourly-forecast", {
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(requestBody),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(async (responseData) => await responseData.text())
        .then(async (hourData) => {
          nextFiveHoursObject = await JSON.parse(hourData);
          //console.log("2nd " +displayCityObject.getTemperatureInC());
        });
    });
  let nextFiveHours = nextFiveHoursObject["temperature"];
  nextFiveHours.unshift(displayCityObject.getTemperatureInC());
  return nextFiveHours;
}
