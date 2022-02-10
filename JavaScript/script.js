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
const url = {
  Newdelhi: "/assets/kolkata.svg",
  NewYork: "/assets/newyork.svg",
  Jamaica: "/assets/jamaica.svg",
  Moscow: "/assets/moscow.svg",
};

function selectdata() {
  var selectvalue = document.getElementById("name").value;
  for (let i = 0; i < text.length; i++)
    if (selectvalue === text[i].cityName) {
      document.getElementById("dynamic").src = url[`${text[i].cityName}`];
      text[i]["dateAndTime"] = new Date(text[i]["dateAndTime"]).toString();
      console.log(text[i]["dateAndTime"]);
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
      const first = parseInt(text[i]["dateAndTime"].slice(16, 18));
      document.getElementById("first").innerHTML = first + 1 + ` AM`;
      const second = parseInt(text[i]["dateAndTime"].slice(16, 18));
      document.getElementById("second").innerHTML = first + 2 + ` AM`;
      const third = parseInt(text[i]["dateAndTime"].slice(16, 18));
      document.getElementById("third").innerHTML = first + 3 + ` AM`;
      const fourth = parseInt(text[i]["dateAndTime"].slice(16, 18));
      document.getElementById("fourth").innerHTML = first + 4 + ` AM`;
      const fifth = parseInt(text[i]["dateAndTime"].slice(16, 18));
      document.getElementById("fifth").innerHTML = first + 5 + ` AM`;
      let faren = text[i]["temperature"].slice(0, -2) * 1.8 + 32;
      document.getElementById("far").innerHTML = `<b>${faren.toFixed(2)}</b>`;
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
let mid = document.querySelector(".mid");
(function () {
  for (let i = 0; i < text.length; i++) {
    input(i);
  }
})();
function create() {
  var inputdata = document.getElementById("drop").value;
  while (mid.hasChildNodes()) {
    mid.removeChild(mid.lastChild);
  }
  if (inputdata >= text.length) {
    inputdata = text.length;
  }
  for (let i = 0; i < inputdata; i++) {
    // console.log(i);
    input(i);
  }
}
function tempicon(i) {
  if (
    text[i].temperature.slice(0, -2) > 29 &&
    text[i].precipitation.slice(0, -1) >= 50 &&
    text[i].humidity.slice(0, -1) < 50
  ) {
    return "/assets/sunnyIcon.svg";
  } else if (
    text[i].temperature.slice(0, -2) > 20 &&
    text[i].temperature.slice(0, -2) < 28 &&
    text[i].precipitation.slice(0, -1) < 50 &&
    text[i].humidity.slice(0, -1) > 50
  ) {
    return "/assets/snowflakeIcon.svg";
  } else if (
    text[i].temperature.slice(0, -2) < 20 &&
    text[i].humidity.slice(0, -1) >= 50
  ) {
    return "/assets/rainyIcon.svg";
  } else {
    return "/assets/sunnyIcon.svg";
  }
}

function input(i) {
  let box = document.createElement("div");
  mid.appendChild(box);
  box.classList.add("box");
  let boxtop = document.createElement("div");
  box.appendChild(boxtop);
  boxtop.classList.add("box-top");
  let particular = document.createElement("div");
  boxtop.appendChild(particular);
  particular.classList.add("particular");
  let colo = document.createElement("div");
  particular.appendChild(colo);
  colo.classList.add("colo");
  colo.innerHTML = text[i].cityName;
  let t = document.createElement("div");
  particular.appendChild(t);
  let tim = new Date(text[i]["dateAndTime"]);
  t.innerHTML =
    tim.toString().slice(16, 21) + tim.toLocaleString().slice(18, 21);
  let d = document.createElement("div");
  particular.appendChild(d);
  d.innerHTML =
    tim.toString().slice(8, 10) +
    tim.toString().slice(3, 8) +
    tim.toString().slice(10, 15);
  let hum = document.createElement("div");
  particular.appendChild(hum);
  hum.classList.add("hum");
  let i1 = document.createElement("div");
  hum.appendChild(i1);
  i1.innerHTML = '<img src="/assets/humidityIcon.svg"/>';
  let i2 = document.createElement("div");
  hum.appendChild(i2);
  i2.innerHTML = text[i]["humidity"];
  let hum1 = document.createElement("div");
  particular.appendChild(hum1);
  hum1.classList.add("hum");
  let i3 = document.createElement("div");
  hum1.appendChild(i3);
  i3.innerHTML = '<img src="/assets/precipitationIcon.svg"/>';
  let i4 = document.createElement("div");
  i4.innerHTML = text[i]["precipitation"];
  hum1.appendChild(i4);
  let boxtemp = document.createElement("div");
  boxtop.appendChild(boxtemp);
  boxtemp.classList.add("box-temp");
  let i5 = document.createElement("div");
  boxtemp.appendChild(i5);
  i5.innerHTML = `<img src="${tempicon(i)}" alt="sunny" />`;
  let i6 = document.createElement("div");
  boxtemp.appendChild(i6);
  let boximg = document.createElement("div");
  box.appendChild(boximg);
  boximg.classList.add("box-img");
  boximg.innerHTML = `<img src="${url[text[i].cityName]}"/>`;
}
