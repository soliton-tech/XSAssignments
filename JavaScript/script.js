let text;

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
const offset = {
  Nome: "-9",
  NewYork: "-5",
  Jamaica: "-5",
  Moscow: "+3",
  LosAngeles: "-8",
  Winnipeg: "-6",
  Juba: "+2",
  Maseru: "+2",
  London: "0",
  Vienna: "+1",
  Dublin: "0",
  Karachi: "+5",
  Kolkata: "+5.3",
  Yangon: "+6.3",
  BangKok: "+7",
  Seoul: "+9",
  Anadyr: "+12",
  BrokenHill: "+10.3",
  Perth: "+8",
  Auckland: "+13",
  Vostok: "+10",
  Troll: "0",
};
function datetime(offset) {
  var b = new Date();
  var utc = b.getTime() + b.getTimezoneOffset() * 60000;
  var newdate = new Date(utc + 3600000 * offset);
  return newdate;
}

function criteria(t) {
  if (t >= 23 && t <= 29) {
    return "/assets/cloudyIcon.svg";
  } else if (t < 18) {
    return "/assets/rainyIconBlack.svg";
  } else if (t >= 18 && t <= 22) {
    return "/assets/windyIcon.svg";
  } else if (t > 29) {
    return "/assets/sunnyIcon.svg";
  } else {
    return "";
  }
}
var selectvalue;
function selectdata() {
  setInterval(function () {
    selectvalue = document.getElementById("name").value;
    for (let i = 0; i < text.length; i++)
      if (selectvalue === text[i].cityName) {
        document.getElementById("dynamic").src = url[`${text[i].cityName}`];
        let dt = datetime(offset[`${text[i].cityName}`]);
        let hour = dt.getHours();
        let ampm = "AM";
        if (hour > 12) {
          hour = hour - 12;
          ampm = "PM";
        } else if (hour == 0) {
          hour = 12;
        }
        Number.prototype.pad = function (digit) {
          for (var n = this.toString(); n.length < digit; n = 0 + n);
          return n;
        };
        if (ampm === "AM") {
          document.querySelector(
            "#ampm"
          ).innerHTML = `<img  src="/assets/amState.svg" alt="AM" />`;
        } else {
          document.querySelector("#ampm").innerHTML = " &nbsp;<big> PM </big>";
        }

        document.getElementById("time").innerHTML =
          `<big>${hour.pad(2)}</big>` +
          `<big>:</big>` +
          `<big>${dt.getMinutes().pad(2)}</big>` +
          `<big>:</big>` +
          `<small>${dt.getSeconds().pad(2)}</small>`;

        document.getElementById("date").innerHTML =
          dt.toString().slice(8, 10) +
          "-" +
          dt.toString().slice(4, 7) +
          "-" +
          dt.toString().slice(11, 15);
        document.getElementById(
          "cel"
        ).innerHTML = `<b>${text[i]["temperature"]}</b>`;
        let t = text[i]["temperature"].slice(0, -2);
        document.querySelector(".nowimg").src = criteria(t);
        document.querySelector(".firstimg").src = criteria(parseInt(t) + 1);
        document.querySelector(".secondimg").src = criteria(parseInt(t) + 2);
        document.querySelector(".thirdimg").src = criteria(parseInt(t) + 3);
        document.querySelector(".fourthimg").src = criteria(parseInt(t) + 4);
        document.querySelector(".fifthimg").src = criteria(parseInt(t) + 5);
        document.querySelector(".nowt").innerHTML = t;
        document.querySelector(".firstt").innerHTML = parseInt(t) + 1;
        document.querySelector(".secondt").innerHTML = parseInt(t) + 2;
        document.querySelector(".thirdt").innerHTML = parseInt(t) + 3;
        document.querySelector(".fourtht").innerHTML = parseInt(t) + 4;
        document.querySelector(".fiftht").innerHTML = parseInt(t) + 5;

        const first = parseInt(hour.pad(2));
        first >= 12
          ? (document.querySelector("#first").innerHTML =
              first - 12 + 1 + "&nbsp;PM")
          : (document.getElementById("first").innerHTML =
              first + 1 + "&nbsp;" + ampm);
        first >= 11
          ? (document.querySelector("#second").innerHTML =
              first - 12 + 2 + "&nbsp;PM")
          : (document.getElementById("second").innerHTML =
              first + 2 + "&nbsp;" + ampm);
        first >= 10
          ? (document.querySelector("#third").innerHTML =
              first - 12 + 3 + "&nbsp;PM")
          : (document.getElementById("third").innerHTML =
              first + 3 + "&nbsp;" + ampm);
        first >= 9
          ? (document.querySelector("#fourth").innerHTML =
              first - 12 + 4 + "&nbsp;PM")
          : (document.getElementById("fourth").innerHTML =
              first + 4 + "&nbsp;" + ampm);
        first >= 8
          ? (document.querySelector("#fifth").innerHTML =
              first - 12 + 5 + "&nbsp;PM")
          : (document.getElementById("fifth").innerHTML =
              first + 5 + "&nbsp;" + ampm);
        let faren = text[i]["temperature"].slice(0, -2) * 1.8 + 32;
        document.getElementById("far").innerHTML = `<b>${faren.toFixed(2)}</b>`;
        document.getElementById(
          "hum"
        ).innerHTML = `<b>${text[i]["humidity"]}</b>`;
        document.getElementById(
          "per"
        ).innerHTML = `<b>${text[i]["precipitation"]}</b>`;
      }
  }, 1000);
}

// function removeselection() {
//   dine.style.borderBottom = "#00b9fb solid 0px";
//   dine1.style.borderBottom = "#00b9fb solid 0px";
//   dine2.style.borderBottom = "#00b9fb solid 0px";
// }

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

async function first() {
  let response = await fetch("https://soliton.glitch.me/all-timezone-cities");
  if (response.ok) {
    text = await response.json();
  } else {
    alert("HTTP-Error: " + response.status);
  }
  for (let i = 0; i < text.length; i++) {
    input(i);
    glance(i);
  }
}

let gx = 0;
let remove = [];
function create() {
  var inputdata = document.getElementById("drop").value;
  while (mid.childNodes.length > inputdata) {
    remove.push(mid.removeChild(mid.lastChild));
    gx = 2;
  }
  let q = 1;
  if (gx == 2) {
    while (mid.childNodes.length < inputdata) {
      mid.appendChild(remove.at(-q));
      q++;
    }
  }
  if (inputdata >= text.length) {
    inputdata = text.length;
  }
  button();
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
function button() {
  let a;
  let b;
  b = document.querySelector(".mid").offsetWidth;
  a = mid.childElementCount * 268;
  // console.log(a, b);
  if (a > b) {
    document.querySelector(".button").style.display = "flex";
  } else {
    document.querySelector(".button").style.display = "none";
  }
  lef = [];
}
let lef = [];

function right() {
  mid.scrollLeft += 270;
}

function left() {
  mid.scrollLeft -= 270;
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
  let dt = datetime(offset[`${text[i].cityName}`]);
  let hour = dt.getHours();
  let ampm = "AM";
  if (hour > 12) {
    hour = hour - 12;
    ampm = "PM";
  } else if (hour == 0) {
    hour = 12;
  }
  Number.prototype.pad = function (digit) {
    for (var n = this.toString(); n.length < digit; n = 0 + n);
    return n;
  };
  t.innerHTML =
    hour.pad(2) +
    `:` +
    dt.getMinutes().pad(2) +
    `&nbsp;
    ${ampm}`;
  let d = document.createElement("div");
  particular.appendChild(d);
  d.innerHTML =
    dt.toString().slice(8, 10) +
    "&nbsp;" +
    dt.toString().slice(4, 7) +
    "&nbsp;" +
    dt.toString().slice(11, 15);
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
  button();
}
let c = [];
function sunny() {
  while (mid.hasChildNodes()) {
    mid.removeChild(mid.lastChild);
  }

  let d = [];
  for (let i = 0; i < text.length; i++) {
    c[i] = i;
  }
  d = c.filter((j) => text[j]["temperature"].slice(0, -2) > 29);
  d = d.filter((j) => text[j]["humidity"].slice(0, -1) < 50);
  d = d.filter((j) => text[j]["precipitation"].slice(0, -1) >= 50);
  d = d.sort(
    (a, b) =>
      text[a]["temperature"].slice(0, -2) - text[b]["temperature"].slice(0, -2)
  );
  d.reverse();
  console.log(d);
  if (d.length < 10 && d.length > 3) {
    for (let i = 0; i < d.length; i++) {
      input(d[i]);
    }
  } else if (d.length > 10) {
    for (let i = 0; i < 10; i++) {
      input(d[i]);
    }
  } else {
    for (let i = 0; i < d.length; i++) {
      input(d[i]);
    }
  }
  remove = [];
  gx = 0;
  // setInterval(sunny, 3000);
}

function snow() {
  while (mid.hasChildNodes()) {
    mid.removeChild(mid.lastChild);
  }
  let d = [];
  for (let i = 0; i < text.length; i++) {
    c[i] = i;
  }
  d = c.filter(
    (j) =>
      text[j]["temperature"].slice(0, -2) > 20 &&
      text[j]["temperature"].slice(0, -2) < 28
  );
  d = d.filter((j) => text[j]["humidity"].slice(0, -1) > 50);
  d = d.filter((j) => text[j]["precipitation"].slice(0, -1) < 50);
  d = d.sort(
    (a, b) =>
      text[a]["precipitation"].slice(0, -1) -
      text[b]["precipitation"].slice(0, -1)
  );
  d.reverse();
  console.log(d);
  if (d.length < 10 && d.length > 3) {
    for (let i = 0; i < d.length; i++) {
      input(d[i]);
    }
  } else if (d.length > 10) {
    for (let i = 0; i < 10; i++) {
      input(d[i]);
    }
  } else {
    for (let i = 0; i < d.length; i++) {
      input(d[i]);
    }
  }
  remove = [];
  gx = 0;
  // setInterval(snow, 3000);
}
function rain() {
  while (mid.hasChildNodes()) {
    mid.removeChild(mid.lastChild);
  }
  let d = [];
  for (let i = 0; i < text.length; i++) {
    c[i] = i;
  }
  d = c.filter((j) => text[j]["temperature"].slice(0, -2) < 20);
  d = d.filter((j) => text[j]["humidity"].slice(0, -1) >= 50);
  d = d.sort(
    (a, b) =>
      text[a]["humidity"].slice(0, -1) - text[b]["humidity"].slice(0, -1)
  );
  d.reverse();
  console.log(d);
  if (d.length < 10 && d.length > 3) {
    for (let i = 0; i < d.length; i++) {
      input(d[i]);
    }
  } else if (d.length > 10) {
    for (let i = 0; i < 10; i++) {
      input(d[i]);
    }
  } else {
    for (let i = 0; i < d.length; i++) {
      input(d[i]);
    }
  }
  remove = [];
  // setInterval(rain, 3000);
  gx = 0;
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
  colo.innerHTML = text[i].timeZone.slice(0, text[i].timeZone.indexOf("/"));
  let t = document.createElement("div");
  upper.appendChild(t);
  t.innerHTML = `<big><b>${text[i].temperature}</b></big>`;
  let lower = document.createElement("div");
  rec.appendChild(lower);
  lower.classList.add("lower");
  let name = document.createElement("div");
  lower.appendChild(name);
  name.classList.add("name");
  let dt = datetime(offset[`${text[i].cityName}`]);
  let hour = dt.getHours();
  let ampm = "AM";
  if (hour > 12) {
    hour = hour - 12;
    ampm = "PM";
  } else if (hour == 0) {
    hour = 12;
  }
  Number.prototype.pad = function (digit) {
    for (var n = this.toString(); n.length < digit; n = 0 + n);
    return n;
  };
  name.innerHTML =
    text[i].cityName +
    `&nbsp;${hour.pad(2)}` +
    `:` +
    dt.getMinutes().pad(2) +
    `&nbsp;
      ${ampm}`;

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
let h = 1;
function continentsort() {
  let f = [];
  if (h % 2 !== 0) {
    document.getElementById("continentsort").src = "/assets/arrowUp.svg";
    while (gridend.hasChildNodes()) {
      gridend.removeChild(gridend.lastChild);
    }
    let arr = [];
    for (let i = 0; i < text.length; i++) {
      arr.push(text[i].timeZone.slice(0, text[i].timeZone.indexOf("/")));
    }
    arr.sort();
    arr.reverse();
    console.log(arr);
    for (let i = 0; i < text.length; i++) {
      for (let j = 0; j < text.length; j++) {
        if (
          text[j].timeZone.slice(0, text[j].timeZone.indexOf("/")) === arr[i]
        ) {
          if (arr[i] === arr[i - 1]) {
          } else {
            glance(j);
          }
        }
      }
    }
    h++;
  } else {
    document.getElementById("continentsort").src = "/assets/arrowDown.svg";
    while (gridend.hasChildNodes()) {
      gridend.removeChild(gridend.lastChild);
    }
    let arr = [];
    for (let i = 0; i < text.length; i++) {
      arr.push(text[i].timeZone.slice(0, text[i].timeZone.indexOf("/")));
    }
    arr.sort();
    // arr.reverse();
    console.log(arr);
    for (let i = 0; i < text.length; i++) {
      for (let j = 0; j < text.length; j++) {
        if (
          text[j].timeZone.slice(0, text[j].timeZone.indexOf("/")) === arr[i]
        ) {
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
let g = 1;
function temperaturesort() {
  let f = [];
  if (g % 2 !== 0) {
    if (h % 2 === 0) {
      let f = [];
      document.getElementById("temperaturesort").src = "/assets/arrowUp.svg";
      while (gridend.hasChildNodes()) {
        gridend.removeChild(gridend.lastChild);
      }
      for (let i = 0; i < text.length; i++) {
        c[i] = i;
        f[i] = text[i].timeZone.slice(0, text[i].timeZone.indexOf("/"));
      }
      let duplicate = [...new Set(f)];
      let sort = [...duplicate.sort()];
      sort.reverse();
      let d = [];
      for (let h = 0; h < sort.length; h++) {
        d = c
          .filter(
            (i) =>
              text[i].timeZone.slice(0, text[i].timeZone.indexOf("/")) ===
              sort[h]
          )
          .sort(
            (a, b) =>
              text[a]["temperature"].slice(0, -2) -
              text[b]["temperature"].slice(0, -2)
          );
        d = d.reverse();
        for (let k = 0; k < d.length; k++) {
          glance(d[k]);
        }
      }
      g++;
    } else {
      let f = [];
      document.getElementById("temperaturesort").src = "/assets/arrowDown.svg";
      while (gridend.hasChildNodes()) {
        gridend.removeChild(gridend.lastChild);
      }
      for (let i = 0; i < text.length; i++) {
        c[i] = i;
        f[i] = text[i].timeZone.slice(0, text[i].timeZone.indexOf("/"));
      }
      let duplicate = [...new Set(f)];
      let sort = [...duplicate.sort()];
      // sort.reverse();
      let d = [];
      for (let h = 0; h < sort.length; h++) {
        d = c
          .filter(
            (i) =>
              text[i].timeZone.slice(0, text[i].timeZone.indexOf("/")) ===
              sort[h]
          )
          .sort(
            (a, b) =>
              text[a]["temperature"].slice(0, -2) -
              text[b]["temperature"].slice(0, -2)
          );
        d = d.reverse();
        for (let k = 0; k < d.length; k++) {
          glance(d[k]);
        }
      }
      g++;
    }
  } else {
    if (h % 2 === 0) {
      let f = [];
      document.getElementById("temperaturesort").src = "/assets/arrowDown.svg";
      while (gridend.hasChildNodes()) {
        gridend.removeChild(gridend.lastChild);
      }
      for (let i = 0; i < text.length; i++) {
        c[i] = i;
        f[i] = text[i].timeZone.slice(0, text[i].timeZone.indexOf("/"));
      }
      let duplicate = [...new Set(f)];
      let sort = [...duplicate.sort()];
      sort.reverse();
      let d = [];
      for (let h = 0; h < sort.length; h++) {
        d = c
          .filter(
            (i) =>
              text[i].timeZone.slice(0, text[i].timeZone.indexOf("/")) ===
              sort[h]
          )
          .sort(
            (a, b) =>
              text[a]["temperature"].slice(0, -2) -
              text[b]["temperature"].slice(0, -2)
          );
        // d = d.reverse();
        for (let k = 0; k < d.length; k++) {
          glance(d[k]);
        }
      }
      g++;
    } else {
      let f = [];
      document.getElementById("temperaturesort").src = "/assets/arrowUp.svg";
      while (gridend.hasChildNodes()) {
        gridend.removeChild(gridend.lastChild);
      }
      for (let i = 0; i < text.length; i++) {
        c[i] = i;
        f[i] = text[i].timeZone.slice(0, text[i].timeZone.indexOf("/"));
      }
      let duplicate = [...new Set(f)];
      let sort = [...duplicate.sort()];
      // sort.reverse();
      let d = [];
      for (let h = 0; h < sort.length; h++) {
        d = c
          .filter(
            (i) =>
              text[i].timeZone.slice(0, text[i].timeZone.indexOf("/")) ===
              sort[h]
          )
          .sort(
            (a, b) =>
              text[a]["temperature"].slice(0, -2) -
              text[b]["temperature"].slice(0, -2)
          );
        // d = d.reverse();
        for (let k = 0; k < d.length; k++) {
          glance(d[k]);
        }
      }
      g++;
    }
  }
}
