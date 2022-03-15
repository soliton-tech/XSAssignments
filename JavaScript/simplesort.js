let array = [{"age": 15},{"age": 10},{"age": -10},{"age": -130}];


function compareTemperature(a, b) {
    //cl(a.temperature - b.temperature);
    return a.age - b.age;
}



console.log(array.sort(compareTemperature));