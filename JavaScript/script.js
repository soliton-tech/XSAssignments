//Global Variables Declaration
const full_month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ----------------------------------------------------Initialize-------------------------------------------------  //

console.log("JS Exec Started!".toLocaleLowerCase());

//------Startup-Functions-----------//
selectCityName();



// ----------------------------------------------------Event Listeners and Loops-------------------------------------------------  //







// ----------------------------------------------------Declarations-------------------------------------------------  //

//----------------------Global Variables---------------------------//


//-------------------------Section - 1---------------------------//

//----Select----//

function selectCityName() {
    var cityIdNode = document.getElementsByClassName('name')[0];
    var cityName = cityIdNode.options[cityIdNode.selectedIndex].text;   
    if(cityName === "Select")
    {   
        console.warn("No City Selected"); 
        //Add all actions here
        removeCityIcon();
    }
    else{
        //Add all actions here
        setCityIcon(cityName.toLocaleLowerCase());
        setCityDate(cityName);
        setCityTime(cityName);

    }
 }

 function setCityIcon(cityName){
    document.getElementById("icon-image").style.display = "block";
    document.getElementById("icon-image").src = "../Assets/Icons for cities/"+cityName+".svg";
 }

 function removeCityIcon(){
    document.getElementById("icon-image").style.display = "none";
 
 }

function setCityTime(cityName){
    var today = new Date;
    var ampm = ((today.getHours()/12) < 1 ? "pm" : "am");
    console.log(ampm);
    var img = document.createElement('img'); 
    img.src = "../Assets/General Images & Icons/amState.svg";
    img.id = "ampm"; 
	document.getElementsByClassName("time")[0].innerHTML =  (today.getHours()%12) + ":" + today.getMinutes() + " ";
    document.getElementsByClassName("time")[0].appendChild(img);
    if (ampm =="pm")
        {
            document.getElementById("ampm").style.display = "none";
        }
    else
        {
            document.getElementById("ampm").style.display = "inline";
        }    
}

function setCityDate(cityDate){
    var today = new Date;
    document.getElementsByClassName("date")[0].innerHTML =  today.getDate() + "-" + month[today.getMonth()] + "-" + today.getFullYear();
    console.log(today.getDate() + "-" + month[today.getMonth()] + "-" + today.getFullYear());
}


 