// ---------------------------------------Dependency Imports--------------------------------------------------------//
import {getlivedata,postCityData} from "./getapidata.js";


(async()=>{
    //--------------------------------------------ShortCut Functions---------------------------------------//
    function cl(object){
        console.log(object);
    }

    //--------------------------------------------Global Variables Declaration---------------------------------------//

        
        const full_month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const response = await fetch('../Assets/files/data.json');
        const jsondata = await response.json();
        let keysno = (Object.keys(jsondata)).length;
        let allCityNames = Object.keys(jsondata);
        let weathericonname;
        let flexcard = document.getElementsByClassName("flex-card")[0];       
        //console.log(allCityNames);
        let currentcity = {};
        let cityssortedbycontinents = {};
        
        let defaultSection1City = "kolkata";
        
        //console.log(jsondata);

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


        let jsondataLive = await getDatafromSource();
        let dataSize = Object.keys(jsondataLive).length;
        let cities = [];
        let cityNames = [];
        for (let i = 0 ; i < dataSize; i++){
            let city = Object.keys(jsondataLive)[i];
            let cityname = jsondataLive[city]["cityName"].toLocaleLowerCase();
            let object = new City(cityname,jsondataLive[city]["cityName"], jsondataLive[city]["dateAndTime"] , jsondataLive[city]["timeZone"], jsondataLive[city]["humidity"], jsondataLive[city]["temperature"],jsondataLive[city]["precipitation"] );
            cities.push(object);
            cityNames.push(cityname);
        }
        //cl(cityNames);
        //cl(cities);
        
        let activeCity = new CitySection1();
        


        activeCity.setBaseClassProperties(cities.find(obj => { return obj.getName() === defaultSection1City; }));

        console.log(activeCity);

   
        // ----------------------------------------------------Initialize-------------------------------------------------  //
        //console.log("JS Exec Started!");
      
        //------Startup-Functions-----------//
        citySelect();
        sortSection3(true,true);
        setconfiguredCities();
        // ----------------------------------------------------------------Event Listeners and Loops----------------------------------------------------------------  //


        //----------------Section - 1-----------------//
        document.getElementsByClassName('name')[0].addEventListener('change', function(){
            citySelect();
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


        //----------------Section - 3-----------------//

        document.getElementsByClassName('name-sort')[0].addEventListener('click',function(){
            sortByNames();            
        });

        document.getElementsByClassName('temperature-sort')[0].addEventListener('click',function(){
            sortByTemperature();  
        });

        // -----------------------------------------------------------------------Declarations----------------------------------------------------------------------  //

        //----------------------------------Section 1--------------------------------------------//
    
        //----Top Level----//

        
        function citySelect() {
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
                currentcity = jsondata[cityName];
                activeCity.setBaseClassProperties(cities.find(obj => { return obj.getName() === cityName; }));
                //cl(activeCity);
                setCityIcon(activeCity);
                setCityDate(activeCity);
                setCityTime(activeCity);
                setCurrentWeather(activeCity);
                setTemperatureArray(currentcity);
            }
        }

        function setCityIcon(city){
            document.getElementById("icon-image").style.display = "block";
            document.getElementById("icon-image").src = "../Assets/Icons for cities/"+city.getName()+".svg";
        }

        function removeCityIcon(){
            document.getElementById("icon-image").style.display = "none";
            document.getElementsByClassName("quick-icon")[0].style.display = "block";

        
        }

        function setCityTime(city){
            let hoursandminutes = city.getTimeInHHMM();
            var img = document.createElement('img'); 
            img.src = "../Assets/General Images & Icons/"+city.getAMORPM()+"State.png";
            img.id = "ampm"; 
            document.getElementsByClassName("time")[0].innerHTML =  hoursandminutes;
            document.getElementsByClassName("time")[0].appendChild(img);
            document.getElementById("ampm").style.display = "inline";   
        }

        function setCityDate(city){
          document.getElementsByClassName("date")[0].innerHTML =  city.getDate();
            
        }

        function setCurrentWeather(city){
            document.getElementsByClassName("tempC")[0].innerHTML = city.getTemperature();
            document.getElementsByClassName("currenthumidity")[0].innerHTML = city.getHumidity();
            document.getElementsByClassName("currentprecipitation")[0].innerHTML = city.getPrecipitation();
            document.getElementsByClassName("tempF")[0].innerHTML = city.getTemperatureF();
        }
        
        function setTemperatureArray(currentcity){
            let currenttemperature = currentcity["temperature"];
            let nextFiveHrs = [];
            nextFiveHrs = currentcity["nextFiveHrs"];
            //console.log(nextFiveHrs);
            for (let i = 0; i <= 5; i++) {
                //console.log(i);
                if (i ==0){
                    //console.log("First Attempt");
                    document.getElementsByClassName("temparray")[0].innerHTML = currenttemperature;  
                    setQuickIcon(currenttemperature,0);
                }
                else{
                    //console.log(i);
                    //console.log(nextFiveHrs[i]);
                    let j = i-1;
                    if(nextFiveHrs[i] === undefined){
                        nextFiveHrs[i] = "2°C"; 
                    }
                    document.getElementsByClassName("temparray")[i].innerHTML = nextFiveHrs[j];
                    setQuickIcon(nextFiveHrs[j],i);
                    let currentTime = currentcity["dateAndTime"];
                    setNextFiveHrs(currentTime);

                }
            }


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

        function setNextFiveHrs(timeString){
            //console.log(timeString);
            let isPM = timeString.includes("PM");
            let AMPM = (isPM ? "PM" : "AM");
            //console.log(AMPM);
            //console.log(isPM);
            let hours = timeString.split(", ")[1].split(":")[0];
            //console.log(hours);
            hours = parseInt(hours);
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
                document.getElementsByClassName("timearray")[i].innerHTML = hourString;   
                }
        }

        function clearweatherdata(){
            //To be Developed



        }

        //----------------------------------Section 2--------------------------------------------//
        
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
            for ( let i = 0; i < flexcards.length; i++)
             {              flexcards[i].querySelector(".cityname").innerHTML = filteredcities[i].getCityName();
                            flexcards[i].querySelector(".temperature").innerHTML = filteredcities[i].getTemperature();
                            flexcards[i].querySelector(".humiditycard").innerHTML = filteredcities[i].getHumidity();
                            flexcards[i].querySelector(".precipitationcard").innerHTML = filteredcities[i].getPrecipitation();
                            flexcards[i].querySelector(".weather-select").src = `../Assets/Weather Icons/${weathericonname}.svg`;
                            //console.log(flexcards[i].querySelector(".precipitationcard").innerHTML);
                            let cityname = filteredcities[i].getName();
                            //console.log(cityname);
                            flexcards[i].style.backgroundImage = `url("../Assets/Icons for cities/${cityname}.svg")`;

                            

             }



            
        }

        //-----------------------------------------------Section 3-------------------------------------------------//

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
            sortSection3(!downarrow,downarrow2);
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
            sortSection3(downarrow2,!downarrow);
        }
       
        function sortSection3(isContinentAscending , isTemperatureAscending){
            let regions = new Set();
            let cities = [];
            for (let i = 0 ; i < keysno ; i++)
            {   let city = jsondata[Object.keys(jsondata)[i]];
                cities.push(Object.keys(jsondata)[i]);
                regions.add(city["timeZone"].split("/")[0]);
            }
            let sortedregions = Array.from(regions).sort();
            let sortedcities = [];
            for( let i = 0 ; i < sortedregions.length; i++){
                cities.forEach(city => {
                   if(jsondata[city]["timeZone"].includes(sortedregions[i])){
                       sortedcities.push(jsondata[city]["temperature"]+"@"+ city+ "@" + sortedregions[i]);  
                   }
                });
            }

            let first12cities =sortedcities.slice(0, 12);
            let last12cities =sortedcities.reverse().slice(0,12);
            let cities12nos = [];


            if(isContinentAscending)
                cities12nos = first12cities;
            else{
                cities12nos = last12cities;  
                sortedregions = sortedregions.reverse();  
            }

            //console.log(sortedregions);

            let city12nossorted = new Set();
            let cities12sorted = [];
            for( let i = 0 ; i < sortedregions.length; i++)   
                {   
                    let citysubset = new Set();
                    cities12nos.forEach(city => {
                        if(city.includes(sortedregions[i])){
                            citysubset.add(city);
                            }   
                        });
                    let citiesofsamecontinent = Array.from(citysubset).sort();
                    let array = [];
                    citiesofsamecontinent.forEach(city => {
                      let  cityobject = {"cityname":"",temperature:0};  
                      cityobject.temperature = parseInt(city.split("°")[0]); 
                      cityobject.cityname = city.split("@")[1];
                      array.push(cityobject);
                    });
                    
                    function compareTemperature(a, b) {

                        return a.temperature - b.temperature;
                    }
                 
                   array = array.sort(compareTemperature);
                    if(isTemperatureAscending === false){
                        array = array.reverse();
                    }
                    array.forEach(object => {
                        cities12sorted.push(object.cityname);
                    });
                    if(citiesofsamecontinent.length !=0 )
                    {   citiesofsamecontinent.forEach(city => {
                                                                city12nossorted.add(city);
                                                                });
                }
            }
            let finalarray = [];
            // Prepare Data from JSON object and convert into a simple object
            for (let itr =0; itr < cities12sorted.length ; itr++){
                let singlecard ={"cityname":"", "temperature": "", "humidity": "", "time": "" };
                let city = cities12sorted[itr];
                singlecard.temperature   = jsondata[city]["temperature"];
                singlecard.cityname   = jsondata[city]["cityName"];
                singlecard.humidity   = jsondata[city]["humidity"];
                singlecard.time = jsondata[city]["dateAndTime"].split(" ")[1].split(":")[0] + ": " + jsondata[city]["dateAndTime"].split(", ")[1].split(":")[1] + " " + jsondata[city]["dateAndTime"].split(" ")[2];
                singlecard.continent = jsondata[city]["timeZone"].split("/")[0];
                finalarray.push(singlecard);
            }

    
            //Update the HTML cards
            for (let i = 0 ; i < finalarray.length; i++){
                let container1 = document.getElementsByClassName("index-"+i)[0];
                let card = container1.getElementsByClassName("small-card")[0];
                card.getElementsByClassName("continent-name")[0].innerHTML = finalarray[i].continent;
                card.getElementsByClassName("country-name")[0].innerHTML = finalarray[i].cityname + " " + finalarray[i].time;
                card.getElementsByClassName("temperature")[0].innerHTML = finalarray[i].temperature;
                card.getElementsByClassName("factor")[0].innerHTML = finalarray[i].humidity + " ";
                var img = document.createElement('img'); 
                img.src = "../Assets/Weather Icons/humidityIcon.svg";
                img.class = "weather-icon"; 
                card.getElementsByClassName("factor")[0].appendChild(img);
            }
        }

}) ();  

