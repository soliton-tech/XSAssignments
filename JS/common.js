export function getWeatherIcon(temperature) {
  if (temperature > 29) return "sunnyIcon";
  if (temperature >= 23) return "cloudyIcon";
  if (temperature >= 18) return "windyIcon";
  if (temperature < 18) return "rainyIconBlack";
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function convertArrayOfArrayToMap(arr) {
  let map = new Map();
  arr.forEach((value) => map.set(value[0], value[1]));
  return map;
}
