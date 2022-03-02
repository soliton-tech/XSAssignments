// API for accessing all city data
export async function getlivedata() {
    const response = await fetch('https://soliton.glitch.me/all-timezone-cities');
    const jsondatalive = await response.json();
    //console.log(jsondatalive);
    return jsondatalive;
}

export async function postCityData(cityName, noOfHours = 5){     
    const citydatetime = await getCityDateAndTime(cityName);
    let city_Date_Time_Name = citydatetime["city_Date_Time_Name"];
    let jsonbodyforrequest = {city_Date_Time_Name,"hours":noOfHours};  
    let response =await postData(jsonbodyforrequest);
    //console.log(response); 
    return response;
}

// Low Level Functions
async function postData(data = {}) {
    // Default options are marked with *
    const url = 'https://soliton.glitch.me/hourly-forecast';
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

async function getCityDateAndTime(cityName){     
    const citydateresponse = await fetch(`https://soliton.glitch.me?city=${cityName}`);
    const citydatetime = await citydateresponse.json();
    return citydatetime;
}

// Example Functions  -------------> Uncomment to test the functionality
// getlivedata();
// postCityData("Kolkata");
// postCityData("Kolkata",2);

