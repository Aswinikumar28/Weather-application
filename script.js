const api = {
    key: "a694a02b974f56ede88998abfd422bc0",

    base: "https://api.openweathermap.org/data/2.5/"
}


const far = document.getElementById("btn")
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
let temperature

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    const city = document.querySelector('.location .city');
    if (weather.message == "city not found") {
        city.innerText = "City Not Found"
    }
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();

    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    temperature = Math.round(weather.main.temp)
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}

const temp = document.querySelector('.current .temp');
console.log(temp);


//this is for changing temp to farenhite
temp.addEventListener("click", change)
let flag = 0;

function change() {
    console.log(flag);
    if (flag == 0) {
        let farenhite = (temperature) * 1.8 + 32
        temp.innerHTML = `${Math.round(farenhite)}<span>°F</span>`;
        flag = 1
    } else {
        temp.innerHTML = `${Math.round(temperature)}<span>°c</span>`;
        flag = 0
    }
}
