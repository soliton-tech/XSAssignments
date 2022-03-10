import * as utility from "./utility.js"

//variables
let continentCardAscending=true;
let continentTempAscending=false;
let continentCards = document.querySelector("#continentWeather .cityCards");
let continentCard = document.querySelector("#continentWeather .cityCard");
let iconElement = document.querySelector("#continentWeather .sorter.continent .icon");


//main function
// export function getContinentCardRef(){
//     continentCards = document.querySelector("#continentWeather .cityCards");
//     console.log(continentCards);
//     continentCard = document.querySelector("#continentWeather .cityCard");
// }

export function switchContinentSortDir(){
    continentCardAscending = iconElement.classList.contains("down")
    iconElement.classList.toggle("up");
    iconElement.classList.toggle("down");
}

export function switchTempSortDir(){
    let iconElement = document.querySelector("#continentWeather .sorter.temp .icon");
    continentTempAscending = iconElement.classList.contains("down")
    iconElement.classList.toggle("up");
    iconElement.classList.toggle("down");
}

export function updateContinentCard(cityList){
    utility.removeChild(continentCards)
    let sortedContinent = continentCardAscending?cityList.continentNames.slice().sort():cityList.continentNames.slice().sort().reverse();
    sortedContinent.forEach(continent=>{
        let sortedCities = cityList.getCitiesOfContinent(continent).sort(utility.compareNumProp("tempC",continentTempAscending));
        sortedCities.forEach(city=>{
            let newCard = continentCard.cloneNode(true);
            newCard.querySelector(".continentName").innerText = continent;
            newCard.querySelector(".cityDetail .city").innerText = city.name+",";
            newCard.querySelector(".cityDetail .time").innerText = city.time+" "+city.AMPM;
            newCard.querySelector(".temperature").innerText = city.tempC+"°C";
            newCard.querySelector(".humidity .text").innerText = city.humidity+"%";
            continentCards.appendChild(newCard);
        })
    })

}

