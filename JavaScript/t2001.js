(async function () {

    const response = await fetch('../assets/HTML & CSS/files/data.json');
    const weather_data = await response.json();
    const noOfCities = (Object.keys(weather_data)).length;
    const cityNames = Object.keys(weather_data);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const city_icons_src = "../assets/HTML & CSS/Icons for cities/";
    const weather_icons_src = '../assets/HTML & CSS/Weather Icons/';
    const general_images_src = '../assets/HTML & CSS/General Images & Icons/';

    /-------------------------------------------------------------------------- Reusables -----------------------------------------------------------------------------------------------------/

    function getDate(selected_city) {
        var date = weather_data[selected_city]['dateAndTime'].split(', ')[0];
        var day = date.split('/')[1];
        var month = date.split('/')[0];
        month = months[month - 1];
        var year = date.split('/')[2];
        var formatted_date = day + '-' + month + '-' + year;
        return formatted_date;
    }

    function getTimeInHHMMSS(selected_city) {
        var time = weather_data[selected_city]['dateAndTime'].split(', ')[1];
        const hh = time.split(':')[0];
        const mm = time.split(':')[1];
        const ss = time.split(':')[2].split(' ')[0];
        time = hh + ':' + mm + ':' + ss;
        return time;
    }

    function getTimeInHHMM_withAMPM(selected_city) {
        var time = weather_data[selected_city]['dateAndTime'].split(', ')[1];
        const hh = time.split(':')[0];
        const mm = time.split(':')[1];
        const ampm = time.split(':')[2].split(' ')[1];
        time = hh + ':' + mm + ' ' + ampm;
        return time;
    }

    function getContinentName(selected_city) {
        return weather_data[selected_city]['timeZone'].split('/')[0];
    }

    function getCityName(selected_city) {
        return weather_data[selected_city]['cityName'];
    }

    function getTemperature(selected_city) {
        return weather_data[selected_city]['temperature'];
    }

    function getHumidity(selected_city) {
        return weather_data[selected_city]['humidity'];
    }

    function getPrecipitation(selected_city) {
        return weather_data[selected_city]['precipitation'];
    }

    populateCitiesList();
    window.addEventListener("resize", displayScrollButtons);

    /-------------------------------------------------------------------------- Top Section ---------------------------------------------------------------------------------------------------/

    document.getElementById('City').addEventListener("change", checkForValidSelection);
    
    function populateCitiesList(){
       var select = document.getElementById("City");
       for (let i = 0; i < noOfCities; i++) {
           var option = document.createElement("option");
           option.value = cityNames[i];
           option.innerHTML = cityNames[i];
           select.appendChild(option);
       }
    }

    function checkForValidSelection() {
        var selected_city = document.getElementById('City').value.toLowerCase();
        if (!cityNames.includes(selected_city)) {
            selected_city = 'NIL';
            alert('Please select a valid option!')
        }
        setCityIcon(selected_city);
        setCityDateAndTime(selected_city);
        setCityTemperature(selected_city);
        setCityHumidity(selected_city);
        setCityPrecipitation(selected_city);
        setCityWeather(selected_city);
    }

    function setCityIcon(selected_city) {
        if (selected_city != 'NIL') {
            document.getElementsByClassName('city-icon')[0].src = city_icons_src + selected_city + ".svg";
        }
        document.getElementsByClassName('city-icon')[0].style.visibility = (selected_city == 'NIL' ? 'hidden' : 'visible');
    }

    function setCityDateAndTime(selected_city) {
        if (selected_city != 'NIL') {
            var date = weather_data[selected_city]['dateAndTime'].split(', ')[0];
            var time = weather_data[selected_city]['dateAndTime'].split(', ')[1];

            var day = date.split('/')[1];
            var month = date.split('/')[0];
            month = months[month - 1];
            var year = date.split('/')[2];
            var formatted_date = day + '-' + month + '-' + year;

            var hh = time.split(':')[0];
            var mm = time.split(':')[1];
            var ss = ':' + time.split(':')[2].split(' ')[0];
            var ampm = time.split(':')[2].split(' ')[1];

            document.getElementsByClassName('ampmstate')[0].src = (ampm == 'AM' ? general_images_src + 'amState.png' : general_images_src + 'pmState.png');
        }
        document.getElementsByTagName('time')[0].textContent = (selected_city == 'NIL' ? 'NIL' : hh + ':' + mm);
        document.getElementsByClassName('seconds')[0].textContent = (selected_city == 'NIL' ? '' : ss);
        document.getElementsByClassName('ampmstate')[0].style.visibility = (selected_city == 'NIL' ? 'hidden' : 'visible');
        document.getElementsByClassName('date')[0].textContent = (selected_city == 'NIL' ? 'NIL' : formatted_date);
    }

    function setCityTemperature(selected_city) {
        const temperature_in_celsius = document.getElementsByClassName('temperature-in-celsius')[0];
        const temperature_in_farenheit = document.getElementsByClassName('temperature-in-farenheit')[0];
        if (selected_city != 'NIL') {
            var current_temperature = weather_data[selected_city]['temperature'];
            current_temperature = current_temperature.substr(0, current_temperature.indexOf('°'));
            var current_temperature_in_celsius = current_temperature + " C";
            var current_temperature_in_farenheit = Math.round(current_temperature * 9 / 5 + 32) + " F";
        }
        temperature_in_celsius.innerHTML = (selected_city == 'NIL' ? 'NIL' : current_temperature_in_celsius);
        temperature_in_farenheit.innerHTML = (selected_city == 'NIL' ? 'NIL' : current_temperature_in_farenheit);
    }

    function setCityHumidity(selected_city) {
        const humidity = document.getElementsByClassName('humidity-value')[0];
        const percentage = document.getElementsByClassName('percentage')[0];
        if (selected_city != 'NIL') {
            var current_humidity = weather_data[selected_city]['humidity'];
            current_humidity = current_humidity.substr(0, current_humidity.indexOf('%'));
        }
        humidity.firstChild.nodeValue = (selected_city == 'NIL' ? 'NIL' : current_humidity);
        percentage.textContent = (selected_city == 'NIL' ? '' : '%');
    }

    function setCityPrecipitation(selected_city) {
        const precipitation = document.getElementsByClassName('precipitation-value')[0];
        const percentage = document.getElementsByClassName('percentage')[1];
        if (selected_city != 'NIL') {
            var current_precipitation = weather_data[selected_city]['precipitation'];
            current_precipitation = current_precipitation.substr(0, current_precipitation.indexOf('%'));
        }
        precipitation.firstChild.nodeValue = (selected_city == 'NIL' ? 'NIL' : current_precipitation);
        percentage.textContent = (selected_city == 'NIL' ? '' : '%');
    }

    function setCityWeather(selected_city) {
        if (selected_city != 'NIL') {
            const current_temperature = weather_data[selected_city]['temperature'];
            const next_five_hrs_temperature = weather_data[selected_city]['nextFiveHrs'];
            if (next_five_hrs_temperature[4] == undefined) {
                next_five_hrs_temperature[4] = '10°C';
            }
            var weather_forecast = [current_temperature, ...next_five_hrs_temperature]
            for (const [i, temperature] of weather_forecast.entries()) {
                weather_forecast[i] = temperature.substr(0, temperature.indexOf('°'));
            }
        }
        updateHourlyWeatherCondition(selected_city, weather_forecast);
    }

    function updateHourlyWeatherCondition(selected_city, weather_forecast) {
        const hourly_time = document.getElementsByClassName('hourly-time');
        const hourly_weather_icon = document.getElementsByClassName('hourly-weather-icon');
        const hourly_temperature = document.getElementsByClassName('hourly-temperature');
        if (selected_city != 'NIL') {
            var time = weather_data[selected_city]['dateAndTime'].split(', ')[1];
            var hh = Number(time.split(':')[0]);
            var ampm = time.split(':')[2].split(' ')[1];
        }
        updateHourlyTime(selected_city, hourly_time, hh, ampm);
        updateHourlyWeatherIcon(selected_city, hourly_weather_icon, weather_icons_src, weather_forecast);
        updateHourlyTemperature(selected_city, hourly_temperature, weather_forecast);
    }

    function updateHourlyTime(selected_city, hourly_time, current_hour, current_ampm) {
        hourly_time[0].textContent = (selected_city == 'NIL' ? 'NIL' : 'NOW');
        for (let i = 1; i < hourly_time.length; i++) {
            current_hour = (current_hour == 12 ? 1 : current_hour + 1);
            if (current_hour == 12) {
                current_ampm = (current_ampm == 'AM' ? 'PM' : 'AM');
            }
            hourly_time[i].textContent = (selected_city == 'NIL' ? 'NIL' : current_hour + current_ampm);
        }
    }

    function updateHourlyTemperature(selected_city, hourly_temperature, weather_forecast) {
        for (let i = 0; i < hourly_temperature.length; i++) {
            hourly_temperature[i].textContent = (selected_city == 'NIL' ? 'NIL' : weather_forecast[i]);
        }
    }

    function updateHourlyWeatherIcon(selected_city, hourly_weather_icon, weather_icons_src, weather_forecast) {
        var src = '';
        for (let i = 0; i < hourly_weather_icon.length; i++) {
            hourly_weather_icon[i].style.visibility = (selected_city == 'NIL' ? 'hidden' : 'visible');
            if (selected_city != 'NIL') {
                switch (true) {
                    case (weather_forecast[i] > 22 && weather_forecast[i] < 30): {
                        src = 'cloudyIcon.svg';
                        break;
                    }

                    case (weather_forecast[i] < 18): {
                        src = 'rainyIcon.svg';
                        break;
                    }

                    case (weather_forecast[i] > 17 && weather_forecast[i] < 23): {
                        src = 'windyIcon.svg';
                        break;
                    }

                    case (weather_forecast[i] > 29): {
                        src = 'sunnyIcon.svg';
                        break;
                    }
                }
                hourly_weather_icon[i].src = weather_icons_src + src;
            }
        }
    }

    /-------------------------------------------------------------------------- Middle Section ------------------------------------------------------------------------------------------------/

    var city_card_container = document.getElementsByClassName('city-card-container')[0];
    var city_cards = document.getElementsByClassName('city-card');
    var city_card = city_cards[1];
    const left_scroll_button = document.getElementsByClassName('left-scroll-button')[0];
    const right_scroll_button = document.getElementsByClassName('right-scroll-button')[0];
    const weather_preferences = document.getElementsByName('weather-preferences');

    updateCityCard(); // Initial update of City Cards for default wether preference
   
    for (let i = 0; i < weather_preferences.length; i++) {
        weather_preferences[i].addEventListener("change", updateCityCard);
    }

    document.getElementsByClassName('city-display-count')[0].addEventListener("focus", function(){ this.oldValue = this.value});
    document.getElementsByClassName('city-display-count')[0].addEventListener("change", function(){ validateDisplayCountValue(this, this.value, this.min, this.max)});
    left_scroll_button.addEventListener("click", scrollLeft);
    right_scroll_button.addEventListener("click", scrollRight);

    function filterSunnyCities(cities) {
        return parseInt(weather_data[cities]['temperature']) > 29 && parseInt(weather_data[cities]['humidity']) < 50 && parseInt(weather_data[cities]['precipitation']) >= 50;
    }

    function filterColdCities(cities) {
        return parseInt(weather_data[cities]['temperature']) > 19 && parseInt(weather_data[cities]['temperature']) < 29 && parseInt(weather_data[cities]['humidity']) > 50
            && parseInt(weather_data[cities]['precipitation']) < 50;
    }

    function filterRainyCities(cities) {
        return parseInt(weather_data[cities]['temperature']) < 20 && parseInt(weather_data[cities]['humidity']) >= 50;
    }

    function sortSunnyCitiesByTemperature(a, b) {
        return parseInt(weather_data[b]['temperature']) - parseInt(weather_data[a]['temperature']);
    }

    function sortColdCitiesByPreciptation(a, b) {
        return parseInt(weather_data[b]['precipitation']) - parseInt(weather_data[a]['precipitation']);
    }

    function sortRainyCitiesByHumidity(a, b) {
        return parseInt(weather_data[b]['humidity']) - parseInt(weather_data[a]['humidity']);
    }

    function getFilteredCities(weather_preference, cityNames) {
        if (weather_preference == 'sunny') {
            return cityNames.filter(filterSunnyCities).sort(sortSunnyCitiesByTemperature);
        }
        else if (weather_preference == 'cloudy') {
            return cityNames.filter(filterColdCities).sort(sortColdCitiesByPreciptation);
        } else {
            return cityNames.filter(filterRainyCities).sort(sortRainyCitiesByHumidity);
        }
    }

    function removeNCityCards(count, city_cards) {
        for (let i = 0; i < count && city_cards.length != 0; i++) {
            city_cards[city_cards.length - 1].remove();
        }
    }

    function removeAllCityCards(city_cards) {
        while (city_cards.length != 0) {
            city_cards[city_cards.length - 1].remove();
        }
    }

    function createNCityCards(count) {
        for (let i = 0; i < count; i++) {
            city_card_container.appendChild(city_card.cloneNode(true));
        }
    }

    function updateCityCardDetails(city_cards, filtered_cities, weather_preference) {
        for (let i = 0; i < filtered_cities.length; i++) {
            city_cards[i].getElementsByClassName('city-name')[0].textContent = getCityName(filtered_cities[i]);
            city_cards[i].getElementsByClassName('weather-icon')[0].src = weather_icons_src + weather_preference + 'Icon.svg';
            city_cards[i].getElementsByClassName('temperature-in-celsius')[0].textContent = getTemperature(filtered_cities[i]);
            city_cards[i].getElementsByClassName('city-time')[0].textContent = getTimeInHHMM_withAMPM(filtered_cities[i]);
            city_cards[i].getElementsByClassName('city-date')[0].textContent = getDate(filtered_cities[i]);
            city_cards[i].getElementsByClassName('city-humidity')[0].textContent = getHumidity(filtered_cities[i]);
            city_cards[i].getElementsByClassName('city-precipitation')[0].textContent = getPrecipitation(filtered_cities[i]);
            city_cards[i].style.backgroundImage = "url('" + city_icons_src + filtered_cities[i] + ".svg')";
        }
    }

    function updateCityCard(){
        const weather_preference = document.querySelector('input[name="weather-preferences"]:checked').value;
        var city_display_count = document.getElementsByClassName('city-display-count')[0].value;
        var filtered_cities = getFilteredCities(weather_preference, cityNames);
        city_display_count = Math.min(city_display_count, filtered_cities.length);
        filtered_cities = filtered_cities.slice(0, city_display_count);
        removeAllCityCards(city_cards);
        createNCityCards(city_display_count);
        updateCityCardDetails(city_cards, filtered_cities, weather_preference);
        displayScrollButtons();
    }

    function validateDisplayCountValue(obj, value, min, max) {
        if(parseInt(value) < min || isNaN(parseInt(value))){
            obj.value = min; 
        }
        else if(parseInt(value) > max) {
            obj.value = max; 
        }
        else{
            obj.value = value;
        }
        
        if (obj.oldValue != obj.value) {
            updateCityCard();
        }
        // console.log(obj.oldValue, obj.value);
        // if(value < min){
        //     obj.value = min;
        //     // console.log('1');
        // }
        // else if(value > max) {
        //     obj.value = max;
        //     // console.log('2');
        // }
        // else{
        //     obj.value = value;
        //     // console.log('3');
        // }
        
    }

    function displayScrollButtons(){
        left_scroll_button.style.visibility = (city_card_container.scrollWidth > city_card_container.clientWidth ? 'visible' : 'hidden');
        right_scroll_button.style.visibility = (city_card_container.scrollWidth > city_card_container.clientWidth ? 'visible' : 'hidden');
    }

    function scrollLeft(){
        city_card_container.scrollLeft -= 170;
    }

    function scrollRight(){
        city_card_container.scrollLeft += 170;
    }  

    /-------------------------------------------------------------------------- Bottom Section -------------------------------------------------------------------------------------------------/

    document.getElementsByClassName('continent-sort-button')[0].addEventListener("click", function () { sortContinentCard('continent') });
    document.getElementsByClassName('temperature-sort-button')[0].addEventListener("click", function () { sortContinentCard('temperature') });

    function sortContinentCard(sorting_parameter) {
        const arrowUp_src = general_images_src + 'arrowUp.svg';
        const arrowDown_src = general_images_src + 'arrowDown.svg';
        var continent_sort_arrow = document.getElementsByClassName('continent-sort')[0];
        var temperature_sort_arrow = document.getElementsByClassName('temperature-sort')[0];
        if (sorting_parameter == 'continent') {
            continent_sort_arrow.src = (continent_sort_arrow.getAttribute('src').trim() == arrowUp_src ? arrowDown_src : arrowUp_src);
        } else {
            temperature_sort_arrow.src = (temperature_sort_arrow.getAttribute('src').trim() == arrowUp_src ? arrowDown_src : arrowUp_src);
        }
        var continentSortAsc = (continent_sort_arrow.getAttribute('src').trim() == arrowUp_src ? true : false);
        var temperatureSortAsc = (temperature_sort_arrow.getAttribute('src').trim() == arrowUp_src ? true : false);

        const cities = [...cityNames];
        var sorted_cityNames = sortByContinentAndTemperature(cities, continentSortAsc, temperatureSortAsc);
        updateContinentCard(sorted_cityNames);
    }

    function sortByContinentAndTemperature(cities, continentSortAsc, temperatureSortAsc) {
        cities.sort((a, b) => {
            let first_continent = weather_data[a]['timeZone'].split('/')[0].toLowerCase();
            let second_continent = weather_data[b]['timeZone'].split('/')[0].toLowerCase();;
            let first_temperature = weather_data[a]['temperature'];
            let second_temperature = weather_data[b]['temperature'];
            let temp;
            switch (true) {
                case (continentSortAsc == false && temperatureSortAsc == false): {
                    temp = first_continent;
                    first_continent = second_continent;
                    second_continent = temp;

                    temp = first_temperature;
                    first_temperature = second_temperature;
                    second_temperature = temp;
                    break;
                }

                case (continentSortAsc == false && temperatureSortAsc == true): {
                    temp = first_continent;
                    first_continent = second_continent;
                    second_continent = temp;
                    break;
                }

                case (continentSortAsc == true && temperatureSortAsc == false): {
                    temp = first_temperature;
                    first_temperature = second_temperature;
                    second_temperature = temp;
                    break;
                }

                default:
                    break;
            }
            return first_continent.localeCompare(second_continent) || parseInt(first_temperature) - parseInt(second_temperature);
        });
        return cities;
    }

    function updateContinentCard(sorted_cityNames) {
        const noOfContinentCards = document.getElementsByClassName('continent-card').length;
        const continent_containers = document.getElementsByClassName('continent-card-container');
        var continents = [];
        var temperature_values = [];
        var city_times = [];
        var humidity_values = [];
        for (let i = 0, k = 0; i < noOfContinentCards; k++) {
            for (let j = 0; j < continent_containers.length; i++, j++) {
                continents[i] = continent_containers[j].getElementsByClassName('continent')[k];
                temperature_values[i] = continent_containers[j].getElementsByClassName('temperature')[k];
                city_times[i] = continent_containers[j].getElementsByClassName('city_time')[k];
                humidity_values[i] = continent_containers[j].getElementsByClassName('humidity-percentage')[k];
            }
        }


        for (let i = 0; i < continents.length; i++) {
            continents[i].textContent = getContinentName(sorted_cityNames[i]);
            temperature_values[i].textContent = getTemperature(sorted_cityNames[i]);
            city_times[i].textContent = getCityName(sorted_cityNames[i]) + ', ' + getTimeInHHMM_withAMPM(sorted_cityNames[i]);
            humidity_values[i].textContent = getHumidity(sorted_cityNames[i]);
        }
    }

})();

    /-------------------------------------------------------------------------- References-------------------------------------------------------------------------------------------------/

    // document.getElementById('City').addEventListener("focus", function(){this.size = 5; } );
    // document.getElementById('City').addEventListener("blur", function(){this.size = 1; } );
    // document.getElementById('City').addEventListener("change", function(){
    //     this.size = 1;
    //     this.blur();
    //     checkForValidSelection();
    // } );

    // const continents = [];
    // const nome = weather_data['nome'];
    // for (let index = 0; index < noOfCities; index++) {
    //     continents[index] = weather_data[cityNames[index]]['timeZone'].split('/')[0];
    // }
    // cityNames.sort((a, b) => {
    //     return weather_data[a]['timeZone'].split('/')[0].toLowerCase().localeCompare(weather_data[b]['timeZone'].split('/')[0].toLowerCase()) ||
    //         parseInt(weather_data[b]['temperature']) - parseInt(weather_data[a]['temperature']);
    // });
    // console.log(continents, continents.length);
    // console.log(weather_data['nome']['dateAndTime'].split(', ')[1]);
    // console.log(document.getElementsByClassName('hourly-weather-icon')[0].src);

    // console.log(cityNames);
    // function test(cityName) {
    //     cityName.sort((a, b) => {
    //         let w = weather_data[a]['timeZone'].split('/')[0].toLowerCase();
    //         let x = weather_data[b]['timeZone'].split('/')[0].toLowerCase();;
    //         let y = weather_data[a]['temperature'];
    //         let z = weather_data[b]['temperature'];

    //         return w.localeCompare(x) || parseInt(z) - parseInt(y);
    //         // return weather_data[a]['timeZone'].split('/')[0].toLowerCase().localeCompare(weather_data[b]['timeZone'].split('/')[0].toLowerCase()) ||
    //         //     parseInt(weather_data[a]['temperature']) - parseInt(weather_data[b]['temperature']);});
    //     });
    //     console.log(cityName);
    //     return cityName;
    // }

    // var ct = [...cityNames];
    // console.log(test(ct));
    // console.log(cityNames);


        // var sunnyCities = cityNames.filter(filterSunnyCities);
    // var coldCities = cityNames.filter(filterColdCities);
    // var rainyCities = cityNames.filter(filterRainyCities);
    // sunnyCities.sort(sortSunnyCitiesByTemperature);
    // coldCities.sort(sortColdCitiesByPreciptation);
    // rainyCities.sort(sortRainyCitiesByHumidity);
    // console.log(sunnyCities);
    // console.log(cityNames);
    // console.log(cityNames.filter(filterSunnyCities).sort(sortSunnyCitiesByTemperature).slice(0,Math.min(3,4)));

    // console.log(city_cards[1].getElementsByClassName('city-name')[0]);

    // console.log(city_cards[1].getElementsByClassName('weather-icon')[0]);
    // city_cards[1].getElementsByClassName('weather-icon')[0].src = weather_icons_src + 'cloudy' + 'Icon.svg';

    // city_cards[1].getElementsByClassName('city-name')[0].textContent = 'pass';
    // city_cards[2].getElementsByClassName('temperature-in-celsius')[0].textContent = getTemperature('newyork');
    // city_cards[0].getElementsByClassName('city-time')[0].textContent = getTimeInHHMM_withAMPM('nome');
    // city_cards[2].getElementsByClassName('city-date')[0].textContent = getDate('vienna');
    // city_cards[1].getElementsByClassName('city-humidity')[0].textContent = getHumidity('newyork');
    // city_cards[2].getElementsByClassName('city-precipitation')[0].textContent = getPrecipitation('nome');

    // var a = city_icons_src + 'nome.svg';
    // var b = 'vienna';
    // // city_cards[1].style.backgroundImage = 'url("'+city_icons_src+b+'.svg")';
    // city_cards[1].style.backgroundImage = "url('"+city_icons_src+b+".svg')";

    // var city_card_container = document.getElementsByClassName('city-card-container')[0];
    // var city_card = document.getElementsByClassName('city-card')[1];
    // var city_card2 = document.getElementsByClassName('city-card')[0];
    // document.getElementsByClassName('city-card')[1].remove();
    // document.getElementsByClassName('city-card')[1].remove();
    // document.getElementsByClassName('city-card')[0].remove();
    // city_card_container.appendChild(city_card);
    // city_card_container.appendChild(city_card.cloneNode(true));
    // city_card_container.appendChild(city_card);
    // city_card_container.appendChild(city_card.cloneNode(true));
    // city_card_container.appendChild(city_card.cloneNode());
    // city_card_container.appendChild(city_card.cloneNode());
    // city_card_container.appendChild(city_card);
    // city_card_container.appendChild(city_card);


    // console.log(sunnyCities);
    // console.log(coldCities);
    // console.log(rainyCities);

    // console.log(sunnyCities.sort(sortSunnyCitiesByTemperature));
    // console.log(coldCities.sort(sortColdCitiesByPreciptation));
    // console.log(rainyCities.sort(sortRainyCitiesByHumidity));

    // if (document.getElementById('sunny').checked) {
    //     console.log("sunny");
    //   }
    // else if(document.getElementById('cloudy').checked){
    //     console.log("cloudy");
    // }
    // else{
    //     console.log("rainy");
    // }

    
    // function removeAllCityCards(city_cards){
    //     // let noOfCityCards = city_cards.length;
    //     // for (let i = 0; i < noOfCityCards; i++) {
    //     //     city_cards[city_cards.length - 1].remove();
    //     // }
    // }

    // var weather_preference = document.querySelector('input[name="weather-preferences"]:checked').value;
    // var city_display_count = document.getElementsByClassName('city-display-count')[0].value;
    // console.log(city_display_count);

    // if (document.querySelector('input[name="weather-preferences"]')) {
    //     document.querySelectorAll('input[name="weather-preferences"]').forEach((elem) => {
    //       elem.addEventListener("change", function(event) {
    //         var item = event.target.value;
    //         console.log(item);
    //       });
    //     });
    //   }

    // if (document.querySelector('input[name="weather-preferences"]')) {
    //     document.querySelectorAll('input[name="weather-preferences"]').forEach((elem) => {
    //       elem.addEventListener("change", function(event) {
    //         updateCityCard();
    //       });
    //     });
    //   }

    // document.getElementsByClassName('city-display-count')[0].addEventListener("keyup", function(){ minmax(this, this.value, this.min, this.max)});
    // console.log(city_card_container.scrollWidth > city_card_container.clientWidth);