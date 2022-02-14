const text = [
  {
    cityName: "Nome",
    dateAndTime: "2/12/2022, 1:11:52 AM",
    timeZone: "America/Nome",
    temperature: "7°C",
    humidity: "85%",
    precipitation: "14%",
  },
  {
    cityName: "NewYork",
    dateAndTime: "2/12/2022, 5:11:52 AM",
    timeZone: "America/New_york",
    temperature: "5°C",
    humidity: "89%",
    precipitation: "10%",
  },
  {
    cityName: "Jamaica",
    dateAndTime: "2/12/2022, 5:11:52 AM",
    timeZone: "America/Jamaica",
    temperature: "26°C",
    humidity: "45%",
    precipitation: "52%",
  },
  {
    cityName: "LosAngeles",
    dateAndTime: "2/12/2022, 2:11:52 AM",
    timeZone: "America/Los_Angeles",
    temperature: "23°C",
    humidity: "52%",
    precipitation: "46%",
  },
  {
    cityName: "Winnipeg",
    dateAndTime: "2/12/2022, 4:11:52 AM",
    timeZone: "America/Winnipeg",
    temperature: "21°C",
    humidity: "56%",
    precipitation: "42%",
  },
  {
    cityName: "Juba",
    dateAndTime: "2/12/2022, 1:11:52 PM",
    timeZone: "Africa/Juba",
    temperature: "33°C",
    humidity: "31%",
    precipitation: "66%",
  },
  {
    cityName: "Maseru",
    dateAndTime: "2/12/2022, 12:11:52 PM",
    timeZone: "Africa/Maseru",
    temperature: "18°C",
    humidity: "62%",
    precipitation: "36%",
  },
  {
    cityName: "London",
    dateAndTime: "2/12/2022, 10:11:52 AM",
    timeZone: "Europe/London",
    temperature: "-2°C",
    humidity: "100%",
    precipitation: "0%",
  },
  {
    cityName: "Vienna",
    dateAndTime: "2/12/2022, 11:11:52 AM",
    timeZone: "Europe/Vienna",
    temperature: "12°C",
    humidity: "75%",
    precipitation: "24%",
  },
  {
    cityName: "Moscow",
    dateAndTime: "2/12/2022, 1:11:52 PM",
    timeZone: "Europe/Moscow",
    temperature: "18°C",
    humidity: "62%",
    precipitation: "36%",
  },
  {
    cityName: "Dublin",
    dateAndTime: "2/12/2022, 10:11:52 AM",
    timeZone: "Europe/Dublin",
    temperature: "43°C",
    humidity: "10%",
    precipitation: "86%",
  },
  {
    cityName: "Karachi",
    dateAndTime: "2/12/2022, 3:11:52 PM",
    timeZone: "Asia/Karachi",
    temperature: "27°C",
    humidity: "43%",
    precipitation: "54%",
  },
  {
    cityName: "Kolkata",
    dateAndTime: "2/12/2022, 3:41:52 PM",
    timeZone: "Asia/Kolkata",
    temperature: "33°C",
    humidity: "31%",
    precipitation: "66%",
  },
  {
    cityName: "Yangon",
    dateAndTime: "2/12/2022, 4:41:52 PM",
    timeZone: "Asia/Yangon",
    temperature: "30°C",
    humidity: "37%",
    precipitation: "60%",
  },
  {
    cityName: "BangKok",
    dateAndTime: "2/12/2022, 5:11:52 PM",
    timeZone: "Asia/BangKok",
    temperature: "29°C",
    humidity: "39%",
    precipitation: "58%",
  },
  {
    cityName: "Seoul",
    dateAndTime: "2/12/2022, 7:11:52 PM",
    timeZone: "Asia/Seoul",
    temperature: "13°C",
    humidity: "72%",
    precipitation: "26%",
  },
  {
    cityName: "Anadyr",
    dateAndTime: "2/12/2022, 10:11:52 PM",
    timeZone: "Asia/Anadyr",
    temperature: "0°C",
    humidity: "100%",
    precipitation: "0%",
  },
  {
    cityName: "BrokenHill",
    dateAndTime: "2/12/2022, 8:41:52 PM",
    timeZone: "Australia/Broken_Hill",
    temperature: "10°C",
    humidity: "79%",
    precipitation: "20%",
  },
  {
    cityName: "Perth",
    dateAndTime: "2/12/2022, 6:11:52 PM",
    timeZone: "Australia/Perth",
    temperature: "21°C",
    humidity: "56%",
    precipitation: "42%",
  },
  {
    cityName: "Auckland",
    dateAndTime: "2/12/2022, 11:11:52 PM",
    timeZone: "Pacific/Auckland",
    temperature: "11°C",
    humidity: "77%",
    precipitation: "22%",
  },
  {
    cityName: "Vostok",
    dateAndTime: "2/12/2022, 4:11:52 PM",
    timeZone: "Antarctica/Vostok",
    temperature: "-66°C",
    humidity: "100%",
    precipitation: "0%",
  },
  {
    cityName: "Troll",
    dateAndTime: "2/12/2022, 10:11:52 AM",
    timeZone: "Antarctica/Troll",
    temperature: "-59°C",
    humidity: "100%",
    precipitation: "0%",
  },
];

const url = {
  Nome: "/assets/nome.svg",
  NewYork: "/assets/newyork.svg",
  Jamaica: "/assets/jamaica.svg",
  Moscow: "/assets/moscow.svg",
  LosAngeles: "/assets/losangeles.svg",
  Winnipeg: "/assets/winnipeg.svg",
  Juba: "/assets/juba.svg",
  Maseru: "/assets/maseru.svg",
  London: "/assets/london.svg",
  Vienna: "/assets/vienna.svg",
  Dublin: "/assets/dublin.svg",
  Karachi: "/assets/karachi.svg",
  Kolkata: "/assets/kolkata.svg",
  Yangon: "/assets/yangon.svg",
  BangKok: "/assets/bangkok.svg",
  Seoul: "/assets/seoul.svg",
  Anadyr: "/assets/anadyr.svg",
  BrokenHill: "/assets/brokenhill.svg",
  Perth: "/assets/perth.svg",
  Auckland: "/assets/auckland.svg",
  Vostok: "/assets/vostok.svg",
  Troll: "/assets/troll.svg",
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
let gridend = document.querySelector(".grid-end");
(function () {
  for (let i = 0; i < text.length; i++) {
    input(i);
    glance(i);
  }
})();
let remove = [];
function create() {
  var inputdata = document.getElementById("drop").value;
  while (mid.childNodes.length > inputdata) {
    remove.push(mid.removeChild(mid.lastChild));
  }
  console.dir(remove);
  let q = 1;
  while (mid.childNodes.length < inputdata) {
    mid.appendChild(remove.at(-q));
    q++;
  }
  if (inputdata >= text.length) {
    inputdata = text.length;
  }
  // for (let i = 0; i < inputdata; i++) {
  //   // console.log(i);
  //   input(i);
  // }
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
  console.log(tim.getMinutes());
  if (tim.getHours() < 10) {
    t.innerHTML =
      `0` +
      tim.getHours() +
      ":" +
      tim.getMinutes() +
      " " +
      tim.toLocaleString().slice(19, 22);
  } else {
    t.innerHTML =
      tim.getHours() +
      ":" +
      tim.getMinutes() +
      " " +
      tim.toLocaleString().slice(19, 22);
  }

  let d = document.createElement("div");
  particular.appendChild(d);
  d.innerHTML =
    tim.toString().slice(8, 10) +
    tim.toString().slice(3, 8) +
    tim.toString().slice(11, 15);
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
  i6.innerHTML = `<big><strong>${text[i].temperature}</strong></big>`;
  let boximg = document.createElement("div");
  box.appendChild(boximg);
  boximg.classList.add("box-img");
  boximg.innerHTML = `<img src="${url[text[i].cityName]}"/>`;
}
function sunny() {
  let a = [];
  for (let i = 0; i < text.length; i++) {
    a.push(text[i].temperature.slice(0, -2));
  }
  a.sort((a, b) => a - b);
  a.reverse();
  while (mid.hasChildNodes()) {
    mid.removeChild(mid.lastChild);
  }
  for (let i = 0; i < text.length; i++)
    for (let j = 0; j < text.length; j++) {
      if (text[j].temperature.slice(0, -2) === a[i]) {
        if (a[i] === a[i - 1]) {
        } else {
          input(j);
        }
      }
    }
}
function snow() {
  let a = [];
  for (let i = 0; i < text.length; i++) {
    a.push(text[i].precipitation.slice(0, -1));
  }
  a.sort((a, b) => a - b);
  a.reverse();
  while (mid.hasChildNodes()) {
    mid.removeChild(mid.lastChild);
  }
  for (let i = 0; i < text.length; i++)
    for (let j = 0; j < text.length; j++) {
      if (text[j].precipitation.slice(0, -1) === a[i]) {
        if (a[i] === a[i - 1]) {
        } else {
          input(j);
        }
      }
    }
}
function rain() {
  let a = [];
  for (let i = 0; i < text.length; i++) {
    a.push(text[i].humidity.slice(0, -1));
  }
  a.sort((a, b) => a - b);
  a.reverse();
  while (mid.hasChildNodes()) {
    mid.removeChild(mid.lastChild);
  }
  for (let i = 0; i < text.length; i++)
    for (let j = 0; j < text.length; j++) {
      if (text[j].humidity.slice(0, -1) === a[i]) {
        if (a[i] === a[i - 1]) {
        } else {
          input(j);
        }
      }
    }
}

function glance(i) {
  let rec = document.createElement("div");
  gridend.appendChild(rec);
  rec.classList.add("rec");
  let upper = document.createElement("div");
  rec.appendChild(upper);
  upper.classList.add("upper");
  let colo = document.createElement("div");
  upper.appendChild(colo);
  colo.classList.add("colo");
  colo.innerHTML = text[i].cityName;
  let t = document.createElement("div");
  upper.appendChild(t);
  t.innerHTML = `<big><b>${text[i].temperature}</b></big>`;
  let lower = document.createElement("div");
  rec.appendChild(lower);
  lower.classList.add("lower");
  let name = document.createElement("div");
  lower.appendChild(name);
  let tim = new Date(text[i].dateAndTime);
  if (tim.getHours() < 10) {
    name.innerHTML =
      `0` +
      tim.getHours() +
      ":" +
      tim.getMinutes() +
      " " +
      tim.toLocaleString().slice(19, 22);
  } else {
    name.innerHTML =
      tim.getHours() +
      ":" +
      tim.getMinutes() +
      " " +
      tim.toLocaleString().slice(19, 22);
  }

  let drop = document.createElement("div");
  lower.appendChild(drop);
  drop.classList.add("drop");
  let img = document.createElement("div");
  drop.appendChild(img);
  img.innerHTML = `<img src="/assets/humidityIcon.svg">`;
  let temp = document.createElement("div");
  drop.appendChild(temp);
  temp.innerHTML = text[i].humidity;
}
let g = 1;
function continentsort() {
  if (g % 2 !== 0) {
    document.getElementById("continentsort").src = "/assets/arrowUp.svg";
    while (gridend.hasChildNodes()) {
      gridend.removeChild(gridend.lastChild);
    }
    let arr = [];
    for (let i = 0; i < text.length; i++) {
      arr.push(text[i].cityName);
    }
    arr.sort();
    console.log(arr);
    for (let i = 0; i < text.length; i++) {
      for (let j = 0; j < text.length; j++) {
        if (text[j].cityName === arr[i]) {
          glance(j);
        }
      }
    }
    g++;
  } else {
    document.getElementById("continentsort").src = "/assets/arrowDown.svg";
    while (gridend.hasChildNodes()) {
      gridend.removeChild(gridend.lastChild);
    }
    let arr = [];
    for (let i = 0; i < text.length; i++) {
      arr.push(text[i].cityName);
    }
    arr.sort();
    arr.reverse();
    console.log(arr);
    for (let i = 0; i < text.length; i++) {
      for (let j = 0; j < text.length; j++) {
        if (text[j].cityName === arr[i]) {
          glance(j);
        }
      }
    }
    g++;
  }
}
let h = 1;
function temperaturesort() {
  if (h % 2 !== 0) {
    document.getElementById("temperaturesort").src = "/assets/arrowDown.svg";
    while (gridend.hasChildNodes()) {
      gridend.removeChild(gridend.lastChild);
    }
    let arr = [];
    for (let i = 0; i < text.length; i++) {
      arr.push(text[i].temperature.slice(0, -2));
    }
    arr.sort((a, b) => a - b);
    console.log(arr);
    for (let i = 0; i < text.length; i++) {
      for (let j = 0; j < text.length; j++) {
        if (text[j].temperature.slice(0, -2) === arr[i]) {
          if (arr[i] === arr[i - 1]) {
          } else {
            glance(j);
          }
        }
      }
    }
    h++;
  } else {
    document.getElementById("temperaturesort").src = "/assets/arrowDown.svg";
    while (gridend.hasChildNodes()) {
      gridend.removeChild(gridend.lastChild);
    }
    let arr = [];
    for (let i = 0; i < text.length; i++) {
      arr.push(text[i].temperature.slice(0, -2));
    }
    arr.sort((a, b) => a - b);
    arr.reverse();
    console.log(arr);
    for (let i = 0; i < text.length; i++) {
      for (let j = 0; j < text.length; j++) {
        if (text[j].temperature.slice(0, -2) === arr[i]) {
          if (arr[i] === arr[i - 1]) {
          } else {
            glance(j);
          }
        }
      }
    }
    h++;
  }
}
