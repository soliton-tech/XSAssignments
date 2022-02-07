const url = {
  Newdelhi: "http://127.0.0.1:5500/Images/kolkata.svg",
  NewYork: "http://127.0.0.1:5500/Images/newyork.svg",
  Jamaica: "http://127.0.0.1:5500/Images/jamaica.svg",
  Moscow: "http://127.0.0.1:5500/Images/moscow.svg",
};

const text = [
  {
    cityName: "Newdelhi",
    dateAndTime: "3/24/2020, 3:07:13 AM",
    timeZone: "America/Nome",
    temperature: "-13°C",
    humidity: "100%",
    precipitation: "0%",
  },
  {
    cityName: "NewYork",
    dateAndTime: "3/24/2020, 7:07:13 AM",
    timeZone: "America/New_york",
    temperature: "7°C",
    humidity: "85%",
    precipitation: "14%",
  },
  {
    cityName: "Jamaica",
    dateAndTime: "3/24/2020, 6:07:13 AM",
    timeZone: "America/Jamaica",
    temperature: "22°C",
    humidity: "54%",
    precipitation: "44%",
  },
  {
    cityName: "Moscow",
    dateAndTime: "5/28/2020, 7:07:13 AM",
    timeZone: "Moscow",
    temperature: "44°C",
    humidity: "25%",
    precipitation: "42%",
  },
];
function selectdata() {
  var selectvalue = document.getElementById("name").value;
  for (let i = 0; i < text.length; i++)
    if (selectvalue === text[i].cityName) {
      document.getElementById("dynamic").src = url[`${text[i].cityName}`];
      text[i]["dateAndTime"] = new Date(text[i]["dateAndTime"]).toString();

      document.getElementById("time").innerHTML = `<big>${text[i][
        "dateAndTime"
      ].slice(16, 21)}</big><small>${text[i]["dateAndTime"].slice(
        21,
        24
      )}</small>`;
      text[i]["dateAndTime"] = new Date(text[i]["dateAndTime"]).toString();

      document.getElementById("date").innerHTML =
        text[i]["dateAndTime"].slice(8, 10) +
        "-" +
        text[i]["dateAndTime"].slice(4, 7) +
        "-" +
        text[i]["dateAndTime"].slice(10, 15);
      document.getElementById(
        "cel"
      ).innerHTML = `<b>${text[i]["temperature"]}</b>`;
      if (
        text[i]["temperature"].slice(0, 1) === "-" &&
        text[i]["temperature"].slice(1, -2) > 10
      ) {
        let faren = text[i]["temperature"].slice(0, 3) * 1.8 + 32;
        document.getElementById("far").innerHTML = `<b>${faren.toFixed(2)}</b>`;
      } else if (
        text[i]["temperature"].slice(0, 1) === "-" &&
        text[i]["temperature"].slice(1, -2) < 10
      ) {
        let faren = text[i]["temperature"].slice(0, 2) * 1.8 + 32;
        document.getElementById("far").innerHTML = `<b>${faren.toFixed(2)}</b>`;
      } else {
        let faren = text[i]["temperature"].slice(0, -2) * 1.8 + 32;
        document.getElementById("far").innerHTML = `<b>${faren.toFixed(2)}</b>`;
      }
      document.getElementById(
        "hum"
      ).innerHTML = `<b>${text[i]["humidity"]}</b>`;
      document.getElementById(
        "per"
      ).innerHTML = `<b>${text[i]["precipitation"]}</b>`;
    }
}

var dine = document.getElementById("dine");
dine.addEventListener("click", () => {
  dine.style.borderBottom = "#00b9fb solid 2px";
  dine1.style.borderBottom = "#00b9fb solid 0px";
  dine2.style.borderBottom = "#00b9fb solid 0px";
});
var dine1 = document.getElementById("dine1");
dine1.addEventListener("click", () => {
  dine1.style.borderBottom = "#00b9fb solid 2px";
  dine.style.borderBottom = "#00b9fb solid 0px";
  dine2.style.borderBottom = "#00b9fb solid 0px";
});
var dine2 = document.getElementById("dine2");
dine2.addEventListener("click", () => {
  dine2.style.borderBottom = "#00b9fb solid 2px";
  dine1.style.borderBottom = "#00b9fb solid 0px";
  dine.style.borderBottom = "#00b9fb solid 0px";
});
function input() {
  var input = document.getElementById("drop").value;
  console.log(input);
}
