// ---------------------------------------Dependency Imports--------------------------------------------------------//
import {getlivedata,postCityData} from "./getapidata.js";


(async()=>{
    //--------------------------------------------ShortCut Functions---------------------------------------//
    function cl(object){
        //console.log(object);
    }

    //--------------------------------------------Global Variables Declaration---------------------------------------//

        const noOFCitiesforSection3 = 12;
        const full_month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let weathericonname;
        let flexcard = document.getElementsByClassName("flex-card")[0];       
        let currentcity = {};
        let cityssortedbycontinents = {};
        let defaultSection1City = "kolkata";

        // -------------> Timer Related Variables 
        // Counter Variables
        let actualSecondSinceRestart = 0;
        let secondsCounter = 0;
        let minutesCounter = 0;
        let hoursCounter  = 0;
        const totalResetHours = 4;
        let secondsfirst = 60;
        let minutesFirst = 60;
        let hoursFirst = 0;
        //Counter Flags
        let secondsFlag = false;
        let minutesFlag = false;
        let hoursFlag = false;
        let totalResetFlag = false;
        let firstCountafterReset = false;


    //-----------------------------------Classes----------------------------------//
            //Base Class
            class City {
                // Fields
                name;
                cityName;
                time;
                timeZone;
                humidity;
                temperature;
                precipitation;

                constructor(name,cityName,time,timeZone,humidity,temperature,precipitation){
                    this.name = name;
                    this.cityName =cityName;
                    this.time = time;
                    this.timeZone = timeZone;
                    this.humidity = humidity;
                    this.temperature = temperature;
                    this.precipitation = precipitation;
                }

                getName(){
                    return this.name;
                }

                setName(name){
                    this.name = name;
                }

                //Methods
                getCityName(){
                    return this.cityName;
                }

                getTemperature(){
                    return this.temperature;
                }

                setTemperature(temperature){
                    this.temperature = temperature;
                }

                getTemperatureInt(){
                    return parseInt(this.temperature);
                }
                
                getTemperatureF(){
                    return ((parseInt(this.temperature) * 9 / 5) +  32).toLocaleString() + "F";
                }

                getHumidity(){
                    return this.humidity;
                }

                getHumidityInt(){
                    return parseInt(this.humidity);
                }

                getPrecipitation(){
                    return this.precipitation;
                }
                
                getPrecipitationInt(){
                    return parseInt(this.precipitation);
                }

                getContinent(){
                    return this.timeZone.split("/")[0];
                }

                getTimeInHHMM(){
                    return (this.time.split(" ")[1].split(":")[0] + ": " + this.time.split(", ")[1].split(":")[1]);
                }

                getTimeAsTimeStamp(){
                    return new Date(this.time);
                }

                getTimeInHH(){
                    return this.time.split(" ")[1].split(":")[0];
                }

                getTimeInHHMMSS(){
                    return (this.time.split(" ")[1].split(":")[0] + ": " + this.time.split(", ")[1].split(":")[1]+ ": " + this.time.split(", ")[1].split(":")[2].split(" ")[0]);
                }

                getAMORPM(){
                    let isPM = this.time.toLocaleLowerCase().includes("pm");
                    return (isPM ? "pm" : "am");
                }

                getTimeInHHMMAMPM(){
                    return (this.time.split(" ")[1].split(":")[0] + ": " + this.time.split(", ")[1].split(":")[1] + " " + this.time.split(" ")[2]);
                }

                getDate(){
                    let date = this.time.split(", ")[0];
                    let day = parseInt(date.split("/")[1]);
                    let year = parseInt(date.split("/")[2]);
                    let monthno = month[parseInt(date)-1];
                    return `${day}-${monthno}-${year}`;
                }
            }
            // Child Class for Additional fields and Methods
            class CitySection1 extends City {
                    constructor(name,time,timeZone,humidity,temperature,precipitation,nextNHrs,hourCount){
                        super(name,time,timeZone,humidity,temperature,precipitation);
                        this.nextNHrs = nextNHrs;
                        this.hourCount = hourCount;
                        }
                    
                    setBaseClassProperties(City){
                        super.name = City.name;
                        super.cityName =City.cityName;
                        super.time = City.time;
                        super.timeZone = City.timeZone;
                        super.humidity = City.humidity;
                        super.temperature = City.temperature;
                        super.precipitation = City.precipitation;
                    }

                    setnextNHrs(nextNHrs){
                        this.nextNHrs = nextNHrs;
                    }

                    setHourCount(hourCount){
                        this.hourCount = hourCount;
                    }

                    getnextNHrs(){
                        return this.nextNHrs;
                    }

                    getHourCount(){
                        return this.hourCount;
                    }

                    getNextFiveHoursStrings(){
                        let isPM = this.getTimeInHHMMAMPM().includes("PM");
                        let AMPM = this.getAMORPM();
                        //console.log(AMPM);
                        //console.log(isPM);
                        let hours = parseInt(this.getTimeInHH());
                        //console.log(hours);
                        let hoursArray = [];
                        for ( let i = 0; i < 5 ; i++)
                            {   let hourString = "";
                                hours = (hours+1) % 12 ;
                                if(hours === 0)
                                    { isPM = !isPM;
                                        AMPM = (isPM ? "PM" : "AM");  
                                        //console.log("12 "+ AMPM);
                                        hourString = "12 "+ AMPM;
                                    }
                                else{
                                        AMPM = (isPM ? "PM" : "AM");
                                        //console.log(hours + " " + AMPM);
                                        hourString = hours + " " + AMPM;
                                }
                                hoursArray.push(hourString);
                            }
                        return hoursArray;    
                    }
            }
        
        // ---------------------------------------DataSource Request Initialization-------------------------------------------------//
        async function getDatafromSource(){
            let response = await getlivedata();
            //console.log(response);
            return response;    
        }
        async function getNextNHoursTemperature(City, no){
            let response = await postCityData(City.getName(),no);
        }

        // Get Data from Sources

        let jsondataLive = {};
        let dataSize = 0;
        let cities = [];
        let cityNames = [];
        let cityNameswithfirstletterUpperCase = [];        
        let noOfHours = 5;
        let activeCity = new CitySection1();
        await refreshdatabase(); 
        await refreshdatabase(); // Refresh Database at Start

        let dropDown = document.getElementsByClassName('name')[0];
        dropDown.innerHTML = "";
        //dropDown.innerHTML = '<option value="Select">Select</option>';
        for (let i = 0; i <= cityNames.length ; i++){
            let newOption = new Option(cityNameswithfirstletterUpperCase[i],cityNames[i]);
            dropDown.add(newOption,undefined);
        }
        defaultSection1City = (cityNames.length !=0 ? cityNames[0] : "Select");

        dropDown.value = defaultSection1City;
        

        async function refreshdatabase(){
            jsondataLive = await getDatafromSource();
            //console.table(jsondataLive);
            dataSize = Object.keys(jsondataLive).length;
            cities = [];
            cityNames = [];
            for (let i = 0 ; i < dataSize; i++){
                let city = Object.keys(jsondataLive)[i];
                let citynamewithCaps = jsondataLive[city]["cityName"];
                let cityname = jsondataLive[city]["cityName"].toLocaleLowerCase();
                let object = new City(cityname,jsondataLive[city]["cityName"], jsondataLive[city]["dateAndTime"] , jsondataLive[city]["timeZone"], jsondataLive[city]["humidity"], jsondataLive[city]["temperature"],jsondataLive[city]["precipitation"] );
                cities.push(object);
                cityNames.push(cityname);
                cityNameswithfirstletterUpperCase.push(citynamewithCaps);
            }
            console.log("Data Refreshed");
        }
        activeCity = new CitySection1();
        activeCity.setBaseClassProperties(cities.find(obj => { return obj.getName() === defaultSection1City; })); 
        activeCity.setnextNHrs(await postCityData(activeCity.getCityName(),noOfHours));



        // ----------------------------------------------------Initialize-------------------------------------------------  //        
        //------Startup-Functions-----------//
        await citySelect();
        let sortedCities = sortforSection3(cities, true , true, noOFCitiesforSection3);
        updateSection3Cards(sortedCities);
        setconfiguredCities();

        // ----------------------------------------------------------------Event Listeners and Loops----------------------------------------------------------------  //

        //---------------------Event Listeners---------------------//

        //----------------Section - 1-----------------//
        document.getElementsByClassName('name')[0].addEventListener('change', async function(){
            await citySelect();
        });

        //----------------Section - 2-----------------//

        document.getElementsByClassName('left-arrow')[0].addEventListener('click',function(){
            scrolllefted();
        });

        document.getElementsByClassName('right-arrow')[0].addEventListener('click',function(){
            scrollrighted();
        });

        document.getElementsByClassName("custom-radio")[0].addEventListener('change',function(){
            setconfiguredCities();
        });

        document.getElementById("quantity").addEventListener('change',function(){
            setconfiguredCities();
        });

        window.addEventListener("resize", function() {
            enableordisableScrollers();
        } );

        //----------------Section - 3-----------------//

        document.getElementsByClassName('name-sort')[0].addEventListener('click',function(){
            sortByNames();            
        });

        document.getElementsByClassName('temperature-sort')[0].addEventListener('click',function(){
            sortByTemperature();  
        });


        //--------------------------------------Loops---------------------------------------//

            setInterval(mainLoop,1000);

 

        // -----------------------------------------------------------------------Declarations----------------------------------------------------------------------  //

        //--------------------------------------------------------Section 1----------------------------------------------------//
    
        //-----------------Top Level-------------------//

        
        async function citySelect() {
            var cityIdNode = document.getElementsByClassName('name')[0];
            var cityName = cityIdNode.options[cityIdNode.selectedIndex].text.toLocaleLowerCase();   
            if(cityName === "select")
            {   
                console.warn("No City Selected"); 
                //Add all actions here
                removeCityIcon();
                clearweatherdata();
                //To add Clear All Function #### Important Bug to be Fixe ####
            }
            else{
                //Add all actions here
                activeCity.setBaseClassProperties(cities.find(obj => { return obj.getName() === cityName; }));
                activeCity.setnextNHrs(await postCityData(activeCity.getCityName(),noOfHours));
                setCityIcon(activeCity);
                // setCityDate(activeCity);
                // setCityTime(activeCity);
                setCurrentWeather(activeCity);
                setTemperatureArray(activeCity);
            }
        }

        //----------------Low Level Functions------------------//

        function setCityIcon(city){
            document.getElementById("icon-image").style.display = "block";
            document.getElementById("icon-image").src = "../Assets/Icons for cities/"+city.getName()+".svg";
        }

        function setCityTime(city){
            let hoursandminutes = city.getTimeInHHMMSS();
            var img = document.createElement('img'); 
            img.src = "../Assets/General Images & Icons/"+city.getAMORPM()+"State.png";
            img.id = "ampm"; 
            document.getElementsByClassName("time")[0].innerHTML =  hoursandminutes;
            document.getElementsByClassName("time")[0].appendChild(img);
            document.getElementById("ampm").style.display = "inline";   
            document.getElementsByClassName("time")[0].style.visibility = 'visible';
        }

        function setCityDate(city){
          document.getElementsByClassName("date")[0].style.visibility = 'visible';  
          document.getElementsByClassName("date")[0].innerHTML =  city.getDate();
            
        }

        function setCurrentWeather(city){
            document.getElementsByClassName("tempC")[0].innerHTML = city.getTemperature();
            document.getElementsByClassName("currenthumidity")[0].innerHTML = city.getHumidity();
            document.getElementsByClassName("currentprecipitation")[0].innerHTML = city.getPrecipitation();
            document.getElementsByClassName("tempF")[0].innerHTML = city.getTemperatureF();
        }
        
        function setQuickIcon(tempinCString,gridIndex){
            let temperature = parseInt(tempinCString);
            //onsole.log(tempinCString);
            let iconname = "";
            if(temperature < 18){
                iconname = "rainyIcon.svg"
            }
            else if(temperature > 29){
                iconname = "sunnyIcon.svg";
            }
            else if(temperature >= 18 && temperature <= 22){
                iconname = "windyIcon.svg";
            }

            else if(temperature >=23 && temperature <=29){
                iconname = "cloudyIcon.svg";
            }

            //console.log(temperature);
            document.getElementsByClassName("quick-icon")[gridIndex].src = "../Assets/Weather Icons/"+iconname;

        }

        function setTemperatureArray(city){
            let currenttemperature = city.getTemperature();
            let nextFiveHrs = [];
            nextFiveHrs = city.getnextNHrs()["temperature"];
            //console.log(nextFiveHrs);
            for (let i = 0; i <= 5; i++) {
                if (i ==0){
                    //console.log("First Attempt");
                    document.getElementsByClassName("temparray")[0].innerHTML = currenttemperature;  
                    setQuickIcon(currenttemperature,0);
                }
                else{
                    let j = i-1;
                    if(nextFiveHrs[i] === undefined){
                        nextFiveHrs[i] = "Unknown"; 
                    }
                    document.getElementsByClassName("temparray")[i].innerHTML = nextFiveHrs[j];
                    setQuickIcon(nextFiveHrs[j],i);
                    //let currentTime = currentcity["dateAndTime"];
                    setNextFiveHrs(city);
                }
            }


        }

        function setQuickIcon(tempinCString,gridIndex){
            let temperature = parseInt(tempinCString);
            //console.log(tempinCString);
            let iconname = "";
            if(temperature < 18){
                iconname = "rainyIcon.svg"
            }
            else if(temperature > 29){
                iconname = "sunnyIcon.svg";
            }
            else if(temperature >= 18 && temperature <= 22){
                iconname = "windyIcon.svg";
            }

            else if(temperature >=23 && temperature <=29){
                iconname = "cloudyIcon.svg";
            }

            //console.log(temperature);
            document.getElementsByClassName("quick-icon")[gridIndex].style.visibility = "visible";
            document.getElementsByClassName("quick-icon")[gridIndex].src = "../Assets/Weather Icons/"+iconname;
            document.getElementsByClassName("quick-icon")[gridIndex].style.visibility = "visible";

        }

        function setNextFiveHrs(city){
                
            let hours = city.getNextFiveHoursStrings();
            cl(hours);
                for ( let i = 0; i < hours.length; i++){
                document.getElementsByClassName("timearray")[i].innerHTML = hours[i];   
                }
        }



        // Clear for improper Selection

        function removeCityIcon(){
            document.getElementById("icon-image").style.display = "none";
            document.getElementsByClassName("quick-icon")[0].style.display = "block";       
        }

        function clearweatherdata(){
            //To be Developed
            document.getElementsByClassName("tempC")[0].innerHTML = "--";
            document.getElementsByClassName("currenthumidity")[0].innerHTML = "--";
            document.getElementsByClassName("currentprecipitation")[0].innerHTML = "--";
            document.getElementsByClassName("tempF")[0].innerHTML = "--";
            for ( let i = 0; i < 5 ; i++)
            document.getElementsByClassName("timearray")[i].innerHTML = "--";   
            for (let i = 0; i < 6 ; i++){
                document.getElementsByClassName("quick-icon")[i].style.visibility = "hidden";
                 document.getElementsByClassName("temparray")[i].innerHTML = "--";              
            }
            document.getElementsByClassName("time")[0].style.visibility = 'hidden';
            document.getElementsByClassName("date")[0].style.visibility = 'hidden'; 
            
        }


        //--------------------------------------------------------------Section 2----------------------------------------------------------------//
        
        //-----------Top level Functions--------//

        function setconfiguredCities(){

            let weather = document.querySelector('input[name="weather-category"]:checked').value;
            let displayno = document.querySelector('input[name="quantity"]').value;
            let wathericonname = "";
            if(displayno < 3){
                displayno = 3;
                document.querySelector('input[name="quantity"]').value = 3;
            }else if(displayno > 10){
                displayno = 10;
                document.querySelector('input[name="quantity"]').value = 10;
            }
            let filteredcities = [];
            if(weather === "Sunny"){
                    filteredcities = filterSunnyCities();
                    weathericonname = "sunnyIcon";
                }
            else if(weather === "Snowy"){
                    filteredcities = filterSnowyCities();
                    weathericonname = "snowflakeIcon";
                }
            else if(weather === "Rainy"){
                    filteredcities = filterRainyCities();
                    weathericonname = "rainyIcon";
                }    
            else{
                    alert("Error");
                }
            let filteredCityNo = filteredcities.length;
            let requiredCardSize = Math.min(filteredCityNo,displayno);
            let finalizedcities = filteredcities.slice(0,requiredCardSize);
            removeAllCards();
            addCards(requiredCardSize);
            updateCards(finalizedcities,weathericonname);
            enableordisableScrollers();
        }

        //------- Scrolling Functions---------//

        function scrolllefted(){
            
            let scroller = document.getElementsByClassName("scroll-container")[0];
            scroller.scrollLeft -= 150 ;              
        }

        function scrollrighted(){
            let scroller = document.getElementsByClassName("scroll-container")[0];
            for ( let i = 0; i<=100 ; i++)
                scroller.scrollLeft += 150 ;
        }

        function enableordisableScrollers(){
            let visibility = 'hidden';
            if(document.body.querySelector(".scroll-container").scrollWidth > document.body.querySelector(".scroll-container").clientWidth){
                visibility = 'visible';                
            }
            else{
                visibility = 'hidden';
            }
                document.body.querySelectorAll(".scrollerarrow")[0].style.visibility = visibility;
                document.body.querySelectorAll(".scrollerarrow")[1].style.visibility = visibility;
        }

        //-------- Weather Functions Function-------//

        function filterSunnyCities(){
            let sunnyCities = cities.filter( function(city){
                return ( (city.getTemperatureInt() >= 29) && (city.getHumidityInt() < 50) && (city.getPrecipitationInt() >= 50)  );
            }
            );
            let sortedSunnyCities = sunnyCities.sort(function (city1,city2) {
                return  (city2.getTemperatureInt() - city1.getTemperatureInt()); 
            });
            //console.log(sortedSunnyCities);
            return sortedSunnyCities;
        } 

        function filterSnowyCities(){
            let snowyCities = cities.filter( function(city){
                return ( (city.getTemperatureInt() >= 20 && city.getTemperatureInt() <= 28 ) && (city.getHumidityInt() > 50) && (city.getPrecipitationInt() < 50));
            }
            );
            let sortedSnowyCities = snowyCities.sort(function (city1,city2) {
                return  (city2.getPrecipitationInt() - city1.getPrecipitationInt()); 
            });
            //console.log(sortedSunnyCities);
            return sortedSnowyCities;
        }

        function filterRainyCities(){
            //console.log(jsondata);
            let rainyCities = cities.filter( function(city){
                return ( (city.getTemperatureInt() < 20) && (city.getHumidityInt() >= 50));
            }
            );
            let sortedRainyCities = rainyCities.sort(function (city1,city2) {
                return  (city2.getHumidityInt() - city1.getHumidityInt()); 
            });
            //console.log(sortedSunnyCities);
            return sortedRainyCities;
        }

        //-----------Card Manipulation Functions--------//

        function getCurrentCardCount(){
            return document.getElementsByClassName("flex-card").length;
        }

        function addCards(quantity) {
            
            //document.appendChild(flexcardclone);
            //console.log(quantity);
            for(let i = 0;i < quantity; i++)
                {   //console.log(i);
                    let flexcardclone = flexcard.cloneNode(true);
                    let division = document.getElementsByClassName("flex-scroll")[0];
                    division.appendChild(flexcardclone);
                }
            let count = document.getElementsByClassName("flex-card").length;
            //console.log(count);
        }

        function removeAllCards(){
            while( document.getElementsByClassName("flex-card").length != 0 )
                {//console.log(i);
                //console.log(document.getElementsByClassName("flex-card").length);
                document.getElementsByClassName("flex-card")[document.getElementsByClassName("flex-card").length-1].remove();
                }   
        }

        function removeAllEmptyCards(){
            while( document.getElementsByClassName("flex-card-empty").length != 0 )
                {//console.log(i);
                //console.log(document.getElementsByClassName("flex-card").length);
                document.getElementsByClassName("flex-card-empty")[document.getElementsByClassName("flex-card-empty").length-1].remove();
                }   
        }


        function removeSelectedCards(quantity){
            //console.log(quantity);
            //console.log(document.getElementsByClassName("flex-card").length);
            if(document.getElementsByClassName("flex-card").length >= quantity)
            {
                for(let i = 0; i< quantity;i++)
                {//console.log(i);
                //console.log(document.getElementsByClassName("flex-card").length);
                document.getElementsByClassName("flex-card")[document.getElementsByClassName("flex-card").length-1].remove();
                }  
            } 
            else{
                alert("Input Quantity Out of Range!");
            }   
        }

        function updateCards(filteredcities,weathericonname){
            let flexcards = document.getElementsByClassName("flex-card");
            removeAllEmptyCards();
            if(flexcards.length !=0){
            for ( let i = 0; i < flexcards.length; i++)
                {              flexcards[i].querySelector(".cityname").innerHTML = filteredcities[i].getCityName();
                                flexcards[i].querySelector(".temperature").innerHTML = filteredcities[i].getTemperature();
                                flexcards[i].querySelector(".humiditycard").innerHTML = filteredcities[i].getHumidity();
                                flexcards[i].querySelector(".precipitationcard").innerHTML = filteredcities[i].getPrecipitation();
                                flexcards[i].querySelector(".card-date").innerHTML = filteredcities[i].getDate();
                                flexcards[i].querySelector(".card-time").innerHTML = filteredcities[i].getTimeInHHMMAMPM();
                                flexcards[i].querySelector(".weather-select").src = `../Assets/Weather Icons/${weathericonname}.svg`;
                                //console.log(flexcards[i].querySelector(".precipitationcard").innerHTML);
                                let cityname = filteredcities[i].getName();
                                //console.log(cityname);
                                flexcards[i].style.backgroundImage = `url("../Assets/Icons for cities/${cityname}.svg")`;
                }
            }
            else{
                let emptyCard = document.createElement("div");
                emptyCard.classList = "flex-card-empty";
                emptyCard.innerHTML = "No Cities to Display in this weather-category ! Refresh After Sometime";
                document.getElementsByClassName("flex-scroll")[0].appendChild(emptyCard);
            }           
        }

        //------------------------------------------------------------Section 3-------------------------------------------------------------------//

        function sortByNames(){
            let path = document.getElementById("small-icon-name").src;
            let downarrow = false;
            if (path.includes("Down")){
                downarrow = true;
                path = "../Assets/General Images & Icons/arrowUp.svg";
                document.getElementById("small-icon-name").src = path;
            }
            else if (path.includes("Up")){

                downarrow = false;
                path = "../Assets/General Images & Icons/arrowDown.svg";
                document.getElementById("small-icon-name").src = path;
            }
            else { console.log("Invalid Path!")}

            let temppath = document.getElementById("small-icon-temp").src;
            let downarrow2 = temppath.includes("Down");
            //console.log("Name Ascending >>>" + downarrow  + "Temperature Ascending >>>>" + downarrow2);
            //sortSection3(!downarrow,downarrow2);
            let sortedCities = sortforSection3(cities, downarrow , !downarrow2,noOFCitiesforSection3);
            updateSection3Cards(sortedCities);
        }
        
        function sortByTemperature(){
            let path = document.getElementById("small-icon-temp").src;
            let downarrow = false;
            if (path.includes("Down")){
                downarrow = true;
                path = "../Assets/General Images & Icons/arrowUp.svg";
                document.getElementById("small-icon-temp").src = path;
            }
            else if (path.includes("Up")){
                downarrow = false;
                path = "../Assets/General Images & Icons/arrowDown.svg";
                document.getElementById("small-icon-temp").src = path;
            }
            else { console.log("Invalid Path!")}

            let temppath = document.getElementById("small-icon-name").src;
            let downarrow2 = temppath.includes("Down");

            //console.log("Name Ascending >>>" + downarrow2  + "Temperature Ascending >>>>" + downarrow);
            //sortSection3(downarrow2,!downarrow);

            let sortedCities = sortforSection3(cities, !downarrow2 , downarrow,noOFCitiesforSection3);
            updateSection3Cards(sortedCities);
        }
       
        function sortforSection3(cities, isContinentAscending , isTemperatureAscending,cityCount){
            //Implemented Double Sort Function for Temperature in Continent Subset
            let sortedCitiesbyContinentAndTemperature = cities.sort( function (citya,cityb) {
                    //cl(citya.getContinent());
                    //cl(cityb.getContinent());
                    let continentCompare =(isContinentAscending ? citya.getContinent().localeCompare(cityb.getContinent()) : cityb.getContinent().localeCompare(citya.getContinent()));                 
                    //console.log(continentCompare);
                    if(continentCompare === 0){
                        let temperatureCompare = (isTemperatureAscending ? citya.getTemperatureInt()-cityb.getTemperatureInt() : cityb.getTemperatureInt()-citya.getTemperatureInt());
                        return temperatureCompare;    
                    }
                    else{
                        return continentCompare;
                    }
            }   );

            let citiesFinal   = sortedCitiesbyContinentAndTemperature.slice(0,cityCount);
            //console.log(citiesFinal);
            return citiesFinal;
        }

        function updateSection3Cards(citiesFinal){
            for (let i = 0 ; i < citiesFinal.length; i++){
                let city = citiesFinal[i];
                let container1 = document.getElementsByClassName("index-"+i)[0];
                let card = container1.getElementsByClassName("small-card")[0];
                card.getElementsByClassName("continent-name")[0].innerHTML = city.getContinent();
                card.getElementsByClassName("country-name")[0].innerHTML = `${city.getCityName()} ${city.getTimeInHHMMAMPM()}`;
                card.getElementsByClassName("temperature")[0].innerHTML = city.getTemperature();
                // card.getElementsByClassName("factor")[0].innerHTML = `${city.getHumidity()} `;
                var humidity = document.createElement('span');
                humidity.classList ="factor-humid";
                humidity.textContent = city.getHumidity();
                var img = document.createElement('img'); 
                img.src = "../Assets/Weather Icons/humidityIcon.svg";
                img.classList = "weather-icon-cards"; 
                card.getElementsByClassName("factor")[0].innerHTML = "";
                card.getElementsByClassName("factor")[0].appendChild(img);
                card.getElementsByClassName("factor")[0].appendChild(humidity);
            }



        }


        //-------------------------------------------------------Timer Related Functions---------------------------------------------------//
        async function mainLoop(){
            counterInSeconds();
            // Call all Functions that repeat every Second Below
            // console.log(secondsCounter);
            await updateSection1TimeAndDatePerSecond();
            updateAllDatesAndTimes();
            if(hoursFlag == true){
                //Call all Functions that repeat every Hour Below

            }


            if(minutesFlag == true){
                //Call all Functions that repeat every Minute Below
                
                //updateAllDatesAndTimes(); // To be moved for Every Minute
                minutesFlag = false;
            }    
            
            if(totalResetFlag == true){
            //Call all functions that repeat every 4 hour below
                location.reload();

            }
        }

        function counterInSeconds(){    
            actualSecondSinceRestart = actualSecondSinceRestart + 1;
             secondsCounter = secondsCounter + 1;
             secondsfirst = 60 - cities[0].getTimeAsTimeStamp().getSeconds() ;
            //  console.log(secondsfirst);
             let minuteCounter  = (firstCountafterReset ? (60- secondsfirst) : 60);
             if(secondsCounter >= minuteCounter){
                minutesCounter = minutesCounter + 1;
                secondsCounter = 0;
                firstCountafterReset = false;
                minutesFlag = true;
                if (minutesCounter >= 60){
                    hoursCounter = hoursCounter + 1;
                    minutesCounter = 0 ;
                    secondsCounter = 0;
                    minutesFlag = true;
                    hoursFlag = true;
                    if(actualSecondSinceRestart >= (4*3600) ){
                        totalReset();
                    }
                }
            }
         }

        function totalReset(){
            console.log("Total Reset");
            //location.reload();
        }
        
        async function updateSection1TimeAndDatePerSecond(){

        // Do it only when Select is not selected ########################################################
                let section1TimeStampRef = activeCity.getTimeAsTimeStamp();
                let section1TimeStampCurrent = activeCity.getTimeAsTimeStamp();
                section1TimeStampCurrent.setSeconds(section1TimeStampRef.getSeconds()+getTotalTimeLapsednSeconds() );
                let hourIn12Notation = section1TimeStampCurrent.getHours();
                let suffix = hourIn12Notation >= 12 ? "pm":"am";
                let hoursinAMPM = ((hourIn12Notation + 11) % 12 + 1);
                hoursFirst = document.getElementsByClassName("time")[0].innerHTML.split(":")[0];
                let modTime = `${hoursinAMPM}:${section1TimeStampCurrent.getMinutes()}:${section1TimeStampCurrent.getSeconds()}`;    
                //console.log(`${hoursinAMPM} : ${section1TimeStampCurrent.getMinutes()}: ${section1TimeStampCurrent.getSeconds()} ${suffix}`);
                let img = document.createElement('img'); 
                img.src = "../Assets/General Images & Icons/"+suffix+"State.png";
                img.id = "ampm"; 
                document.getElementsByClassName("time")[0].innerHTML =  modTime;
                document.getElementsByClassName("time")[0].appendChild(img);
                document.getElementById("ampm").style.display = "inline";   
                document.getElementsByClassName("time")[0].style.visibility = 'visible';
                let modDate = `${section1TimeStampCurrent.getDate()}-${month[section1TimeStampCurrent.getMonth()]}-${section1TimeStampCurrent.getFullYear()} `;
                document.getElementsByClassName("date")[0].innerHTML = modDate;
                if (hoursinAMPM > hoursFirst){
                    console.log("Hours Changed!");
                    let currentTime = `${hoursinAMPM}: ${suffix}`;
                    await refreshNextFiveHoursTemperature(currentTime);
                    

                } 
        }

        async function refreshNextFiveHoursTemperature(currentTime){
            activeCity.setnextNHrs(await postCityData(activeCity.getCityName(),noOfHours));
            activeCity.setTemperature(activeCity.getnextNHrs()["temperature"][0]);
            console.log(activeCity.getTemperature());
            setCurrentWeather(activeCity);
            setTemperatureArray(activeCity);
            setNextFiveHoursFromCurrentHour(currentTime);
        }

        function setNextFiveHoursFromCurrentHour(timeString){
            let isPM = timeString.includes("PM");
            let AMPM = (isPM ? "PM" : "AM");
            //console.log(AMPM);
            //console.log(isPM);
            let hours = parseInt(parseInt(timeString.split(":")[0]));
            //console.log(hours);
            let hoursArray = [];
            for ( let i = 0; i < 5 ; i++)
                {   let hourString = "";
                    hours = (hours+1) % 12 ;
                    if(hours === 0)
                        { isPM = !isPM;
                            AMPM = (isPM ? "PM" : "AM");  
                            //console.log("12 "+ AMPM);
                            hourString = "12 "+ AMPM;
                        }
                    else{
                            AMPM = (isPM ? "PM" : "AM");
                            //console.log(hours + " " + AMPM);
                            hourString = hours + " " + AMPM;
                    }
                    hoursArray.push(hourString);
                }
             console.log(hoursArray);  
             for ( let i = 0; i < hoursArray.length; i++){
                document.getElementsByClassName("timearray")[i].innerHTML = hoursArray[i];   
                }  

        }

        //Reusable for Time in Seconds
        function getTotalTimeLapsednSeconds(){   
            return secondsCounter + (minutesCounter * 60) + (hoursCounter * 3600);
        }

        function updateAllDatesAndTimes(){
            let section2Cities = document.getElementsByClassName("cityname");
            let cityiter = [];
            for(let i = 0; i < section2Cities.length ; i++){
                let citytemp = cities.filter(function (cityobj){
                    return (cityobj.getCityName().localeCompare(section2Cities[i].innerHTML) == 0);
                })[0];
                cityiter.push(citytemp);
              
            }
                //console.log(cityiter);
            
            for(let i = 0; i < cityiter.length ; i++) {
                let timeStamp = cityiter[i].getTimeAsTimeStamp();
                timeStamp.setSeconds(timeStamp.getSeconds() + getTotalTimeLapsednSeconds());
                //console.log(i);
                let hourIn12Notation = timeStamp.getHours();
                let suffix = hourIn12Notation >= 12 ? "pm":"am";
                let hoursinAMPM = ((hourIn12Notation + 11) % 12 + 1);
                let modTime = `${hoursinAMPM}:${timeStamp.getMinutes()} ${suffix.toLocaleUpperCase()}`; 
                let modDate = `${timeStamp.getDate()}-${month[timeStamp.getMonth()]}-${timeStamp.getFullYear()} `;
                document.getElementsByClassName("card-time")[i].innerHTML = modTime;
                document.getElementsByClassName("card-date")[i].innerHTML = modDate;
            }

            let section3Cities = document.getElementsByClassName("country-name");
            for(let i = 0; i < section3Cities.length ; i++){
                let section3CityObj = section3Cities[i];
                let nameOfCity = section3CityObj.innerHTML.split(" ")[0];
                let timeStamp = cities.filter(function (cityobj){
                    return (cityobj.getCityName().localeCompare(nameOfCity) == 0);
                })[0].getTimeAsTimeStamp();
                timeStamp.setSeconds(timeStamp.getSeconds() + getTotalTimeLapsednSeconds());
                let hourIn12Notation = timeStamp.getHours();
                let suffix = hourIn12Notation >= 12 ? "pm":"am";
                let hoursinAMPM = ((hourIn12Notation + 11) % 12 + 1);
                let modifiedTime = `${hoursinAMPM}:${timeStamp.getMinutes()} ${suffix.toLocaleUpperCase()}`; 
                let fullData = `${nameOfCity} ${modifiedTime}`;
                section3CityObj.innerHTML =   fullData;
            }
        }

}) ();  

//
