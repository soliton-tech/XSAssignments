

(async function () {
        async function getlivedata() {
        const response = await fetch('https://soliton.glitch.me/all-timezone-cities');
        const jsondatalive = await response.json();
        console.log(jsondatalive);
        return jsondatalive;
    }

    await getlivedata();



})();