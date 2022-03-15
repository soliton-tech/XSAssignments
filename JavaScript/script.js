(async()=>{
    //--------------------------------------------ShortCut Functions---------------------------------------//
    function cl(object){
        //console.log(object);
    }

    //--------------------------------------------Global Variables Declaration---------------------------------------//

        const full_month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        
        const response = await fetch('../Assets/files/data.json');
        const jsondata = await response.json();

        let keysno = (Object.keys(jsondata)).length;
        let allCityNames = Object.keys(jsondata);
        let weathericonname;
        let currentcity = {};
        let cityssortedbycontinents = {};
        let flexcard = document.getElementsByClassName("flex-card")[0];

        
        // ----------------------------------------------------Initialize-------------------------------------------------  //
        //console.log("JS Exec Started!");
      
        //------Startup-Functions-----------//
        citySelect();
        sortSection3(true,true);
        setconfiguredCities();
        // ----------------------------------------------------Event Listeners and Loops-------------------------------------------------  //

        document.getElementsByClassName('name')[0].addEventListener('change', function(){
            citySelect();
        });

        document.getElementsByClassName('name-sort')[0].addEventListener('click',function(){
            sortByNames();            
        });

        document.getElementsByClassName('temperature-sort')[0].addEventListener('click',function(){
            sortByTemperature();  
        });

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


        // ----------------------------------------------------Declarations-------------------------------------------------  //

        //-------------------------Section - 1---------------------------//

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
            }
            else{
                //Add all actions here
                //console.log(cityName);
                //console.log(jsondata[cityName]);
                currentcity = jsondata[cityName];
                //console.log(currentcity["timeZone"]);
                setCityIcon(cityName);
                setCityDate(currentcity);
                setCityTime(currentcity);
                setCurrentWeather(currentcity);
                setTemperatureArray(currentcity);

            }
        }

        //----Top Level----//

        function setCityIcon(cityName){
            document.getElementById("icon-image").style.display = "block";
            document.getElementById("icon-image").src = "../Assets/Icons for cities/"+cityName+".svg";
        }

        function removeCityIcon(){
            document.getElementById("icon-image").style.display = "none";
            document.getElementsByClassName("quick-icon")[0].style.display = "block";

        
        }

        function setCityTime(currentcity){
            let timeString = currentcity["dateAndTime"];
            let hoursandminutes = timeString.split(", ")[1].split(":")[0] + ":" + timeString.split(", ")[1].split(":")[1] + " " ;
            //console.log(hoursandminutes);
            let isPM = timeString.toLocaleLowerCase().includes("pm");
            let AMPM = (isPM ? "pm" : "am");

            //var ampm = ((today.getHours()/12) < 1 ? "am" : "pm");
            //console.log(ampm);
            var img = document.createElement('img'); 
            img.src = "../Assets/General Images & Icons/"+AMPM+"State.png";
            img.id = "ampm"; 
            document.getElementsByClassName("time")[0].innerHTML =  hoursandminutes;
            document.getElementsByClassName("time")[0].appendChild(img);
            document.getElementById("ampm").style.display = "inline";   
        }

        function setCityDate(currentcity){
            let timeString = currentcity["dateAndTime"];
            //console.log(timeString);
            let date = timeString.split(", ")[0];
            //console.log(date);
            let day = parseInt(date.split("/")[1]);
            let year = parseInt(date.split("/")[2]);
            let monthno = month[parseInt(date)-1];
            //console.log(monthno); 
          document.getElementsByClassName("date")[0].innerHTML =  day+"-"+monthno+"-"+year;
            
        }

        function setCurrentWeather(currentcity){
            let currenttemperature = currentcity["temperature"];
            let currenthumidity = currentcity["humidity"];
            let currentprecipitation = currentcity["precipitation"];
            let currenttemperatureF = ((parseInt(currenttemperature) * 9 / 5) +  32).toLocaleString() + "F";
            //console.log(currenthumidity + " " + currenttemperature + " " + currenttemperatureF + " " + currentprecipitation);
            document.getElementsByClassName("tempC")[0].innerHTML = currenttemperature;
            document.getElementsByClassName("currenthumidity")[0].innerHTML = currenthumidity;
            document.getElementsByClassName("currentprecipitation")[0].innerHTML = currentprecipitation;
            document.getElementsByClassName("tempF")[0].innerHTML = currenttemperatureF;
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
            //console.log(requiredCardSize);
            let finalizedcities = filteredcities.slice(0,requiredCardSize);
            //console.log(finalizedcities);        
            
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
            //console.log(jsondata);
            let sunnyCities = allCityNames.filter( function(city){
                return ( (parseInt(jsondata[city]["temperature"]) >= 29) && (parseInt(jsondata[city]["humidity"]) < 50) && (parseInt(jsondata[city]["precipitation"]) >= 50)  );
            }
            );
            let sortedSunnyCities = sunnyCities.sort(function (city1,city2) {
                return  (parseInt(jsondata[city2]["temperature"]) - parseInt(jsondata[city1]["temperature"])); 
            });
            //console.log(sortedSunnyCities);
            return sortedSunnyCities;
        } 

        function filterSnowyCities(){
            //console.log(jsondata);
            let snowyCities = allCityNames.filter( function(city){
                return ( (parseInt(jsondata[city]["temperature"]) >= 20 && parseInt(jsondata[city]["temperature"]) <= 28 ) && (parseInt(jsondata[city]["humidity"]) > 50) && (parseInt(jsondata[city]["precipitation"]) < 50)  );
            }
            );
            let sortedSnowyCities = snowyCities.sort(function (city1,city2) {
                return  (parseInt(jsondata[city2]["precipitation"]) - parseInt(jsondata[city1]["precipitation"])); 
            });
            //console.log(sortedSunnyCities);
            return sortedSnowyCities;
        }

        function filterRainyCities(){
            //console.log(jsondata);
            let rainyCities = allCityNames.filter( function(city){
                return ( (parseInt(jsondata[city]["temperature"]) < 20) && (parseInt(jsondata[city]["humidity"]) >= 50));
            }
            );
            let sortedRainyCities = rainyCities.sort(function (city1,city2) {
                return  (parseInt(jsondata[city2]["humidity"]) - parseInt(jsondata[city1]["humidity"])); 
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

        function updateCards(cities,weathericonname){
            let flexcards = document.getElementsByClassName("flex-card");
            for ( let i = 0; i < flexcards.length; i++)
             {              flexcards[i].querySelector(".cityname").innerHTML = jsondata[cities[i]]["cityName"];
                            flexcards[i].querySelector(".temperature").innerHTML = jsondata[cities[i]]["temperature"];
                            flexcards[i].querySelector(".humiditycard").innerHTML = jsondata[cities[i]]["humidity"];
                            flexcards[i].querySelector(".precipitationcard").innerHTML = jsondata[cities[i]]["precipitation"];
                            flexcards[i].querySelector(".weather-select").src = `../Assets/Weather Icons/${weathericonname}.svg`;
                            //console.log(flexcards[i].querySelector(".precipitationcard").innerHTML);
                            let cityname = cities[i];
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

