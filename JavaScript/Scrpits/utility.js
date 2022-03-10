//Variable
const WEATHER_ICONS = [{
        TempC:{stop:18},
        icon:"rainyIcon.svg"
    },
    {
        TempC:{start:19,stop:22},
        icon:"windyIcon.svg"
    },
    {
        TempC:{start:23,stop:29},
        icon:"cloudyIcon.svg"
    },
    {
        TempC:{start:30},
        icon:"sunnyIcon.svg"
}]


//Functions
export function isAM(hrs){
    return hrs<=12;
}


export function hrsIn12(hrs){
    return isAM(hrs)?hrs:hrs-12;
}

export function strigfyTime(dateTime,delimiter){
    return `${hrsIn12(dateTime.getHours()).toString().padStart(2,0)}${delimiter}${dateTime.getMinutes().toString().padStart(2,0)}${delimiter}${dateTime.getSeconds().toString().padStart(2,0)}`
}


export function removeUnits(value){
    return parseInt(value.replace(/[^0-9\.\+\-]+/g,""));
}

export function getTempIcon(temperature){
    let tempRange = WEATHER_ICONS.find(item => {
        return checkLimits(temperature,item.TempC)
    }
    )
    if(tempRange !== undefined)
    {
        //console.log(tempRange)
        return tempRange.icon;
    }
    else
    {
        //#TODO-An error should be thrown here
        return WEATHER_ICONS[0].icon;
    }

}

export function checkLimits (value, limit){
    if (!limit.hasOwnProperty("start")) limit.start = Number.NEGATIVE_INFINITY;
    if (!limit.hasOwnProperty("stop")) limit.stop = Number.POSITIVE_INFINITY;
    return (value >= limit.start && value <= limit.stop)
}

export function compareNumProp(prop,ascending=true) {
    if (ascending){
        return function(a, b) {
            return a[prop] - b[prop];
        }
    }
    else
    {
        return function(a, b) {
            return b[prop]- a[prop];
        }
    }
}

export function compareStringProp(prop,ascending=true) {
    if (ascending){
        return function(a, b) {
            let aValue = a[prop].toLowerCase();
            let bValue = b[prop].toLowerCase();
            return aValue==bValue?0:(aValue < bValue? -1 : 1);
        }
    }
    else
    {
        return function(a, b) {
            let aValue = a[prop].toLowerCase();
            let bValue = b[prop].toLowerCase();
            return aValue==bValue?0:(aValue < bValue? 1 : -1);
        }
    }
}

export function removeChild(node){
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
}

export function hrsToMs(hrs){
    return (hrs*24*60*60*1000);
}