let dateObject = {
    seconds : 0,
    totalSeconds : 0,
    timer : null
}
let cityObject = {
    currentCity : null
}
export function startOrResetTimer(updateTimeAndDate,currentCityObject){
    if(dateObject.timer !=null)
        clearTimeout(dateObject.timer);
    dateObject.seconds = 0;
    updateCity(currentCityObject);
    dateObject.timer = setInterval(incrementTime,1000,updateTimeAndDate);
}
export function updateCity(currentCityObject){
    cityObject.currentCity = currentCityObject;
    setDateInCityObject();
}
export function incrementMinute(date){
    date.setSeconds((date.getSeconds() + 60));
    return date;
}
function setDateInCityObject(){
    cityObject.currentCity.dateAndTime.setSeconds(cityObject.currentCity.dateAndTime.getSeconds() + dateObject.seconds);
}
function incrementTime(updateTimeAndDate){
    let functionBooleanArray = [true,false,false,false];
    dateObject.seconds+=1;
    dateObject.totalSeconds+=1;
    cityObject.currentCity.dateAndTime.setSeconds(cityObject.currentCity.dateAndTime.getSeconds() + 1);
    if(cityObject.currentCity.dateAndTime.getSeconds() == 0){
        functionBooleanArray[1] = true;
        dateObject.seconds = 0;
        if(cityObject.currentCity.dateAndTime.getMinutes() == 0){
            functionBooleanArray[2] = true;
        }
    }
    //Update Website once in 4 hours
    if(dateObject.totalSeconds === 14400){
        functionBooleanArray[3] = true;
        reset();
    }
    updateTimeAndDate(functionBooleanArray);
}
function reset(){
    dateObject.seconds = 0;
    dateObject.totalSeconds = 0;
}