// Weather Dashboard

// Variables & Event Listeners
const weatherApiKey = 'fd4ad30d1c24c909806f019726e9f757';
const searchBox = document.querySelector('#search-box');
const searchHist = document.querySelector('#search-history');
const curWeather = document.querySelector('#current-weather');
const fiveDay = document.querySelector('#five-day-forecast');
let searchData = [];
let localHist = JSON.parse(localStorage.getItem('history')) || [];
let clickHist = [];
let forecastData = [];
let fiveDayDates = [];

const searchTxt = document.createElement('input');
const searchBtn = document.createElement('button');
const histList = document.createElement('ul');
const fiveDayGen = document.createElement('div');
searchTxt.setAttribute('type', 'text');
searchTxt.setAttribute('id', 'search-txt');
searchTxt.setAttribute('placeholder', 'Enter a city name');
searchBtn.setAttribute('type', 'button');
searchBtn.setAttribute('id', 'search-btn');
searchBtn.textContent = 'Search';
searchBtn.addEventListener('click', getCityLL);
histList.setAttribute('id', 'history-list');
searchBox.appendChild(searchTxt);
searchBox.appendChild(searchBtn);
histLGen();

// Functions
function histLGen() {
    localHist = JSON.parse(localStorage.getItem('history')) || [];
    searchHist.appendChild(histList);
    hList = document.querySelector('#history-list');
    localHist = localHist.reverse();
    if (localHist.length > 0) {
        for (let i = 0; i < 6 && i < localHist.length; i++) {
            const hI = document.createElement('li');
            histList.appendChild(hI);
            const hItem = document.createElement('button');
            hItem.textContent = `${localHist[i].name}`;
            histList.setAttribute('id', `hId${i}`);
            hItem.onclick = function() {
                getWeather(localHist[i].coord.lat, localHist[i].coord.lon);
            };
            hI.appendChild(hItem);
        };
    };
};
function getWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
    fetch(weatherUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                searchData = JSON.parse(localStorage.getItem('history')) || [];
                if (this.id !== `hId`) {
                    searchData.push(data);
                };
                localStorage.setItem('history', JSON.stringify(searchData));
                histList.innerHTML = '';
                histLGen();
                displayWeather();
            });
        } else {
            console.log('Error: getWeather(): ' + response.statusText);
        };
    });
    const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&appid=${weatherApiKey}`;
    fetch(fiveDayUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                forecastData = data;
            })
        }
    })
};
function getCityLL() {
    histList.innerHTML = '';
    hList = document.querySelector('#history-list');
    const searchTxt = document.querySelector('#search-txt');
    let aName = searchTxt.value.trim();
    const geoCodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${aName}&limit=5&appid=${weatherApiKey}`;
    fetch(geoCodeUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                clickHist = [];
                for (let i = 0; i < data.length; i++) {
                    clickHist.push(data[i]);
                    const hItem = document.createElement('li');
                    histList.appendChild(hItem);
                    const hBtn = document.createElement('button');
                    hBtn.textContent = `${data[i].name}, ${data[i].state}, ${data[i].country}`;
                    hBtn.setAttribute('id', `hId${i}`);
                    hBtn.onclick = function() {
                        getWeather(data[i].lat, data[i].lon);
                        histList.innerHTML = '';
                        histLGen();
                    }
                    hItem.appendChild(hBtn);
                    
                };
            });
        } else {
            console.log('Error: getAreaLL(): ' + response.statusText);
        };
    });
};
function displayWeather() {
    const curData = searchData.reverse();
    forecastData = forecastData;
    curWeather.innerHTML = '';
    fiveDay.innerHTML = '';
    curWeather.classList.add('card');
    curWeather.innerHTML = `
        <h1>Current Weather</h1>
        <h2>${curData[0].name}, ${curData[0].sys.country}</h2>
        <h3>Date: ${moment.unix(curData[0].dt).format('MM/DD/YYYY')}</h3>
        <li>Icon: <img src="http://openweathermap.org/img/w/${forecastData.list[date].weather[0].icon}.png"></li>
        <li>Humidity: ${curData[0].main.humidity}%</li>
        <li>Wind Speed: ${curData[0].wind.speed} mph</li>
        <li>Temperature: ${Math.round((curData[0].main.temp - 273.15) * 9/5 + 32)}°F</li>
        <li>Weather: ${curData[0].weather[0].description}</li>
        </ul>`;
    fiveDayGen.classList.add('card');
    fiveDay.innerHTML = `<h1>Five Day Forecast</h1>`;
    forecastData.list.forEach(function(date) {
        console.log(date.dt_txt.slice(0, 10));
        fiveDayDates.push(date.dt_txt.slice(0, 10));
        
        // if (!fiveDayDates || !fiveDayDates.includes(date.dt_txt.slice(0, 10))){
        //     const fiveDayGen = document.createElement('div');
        //     fiveDayGen.classList.add('card');
        //     fiveDayGen.innerHTML = `
        //     <h2>Date: ${moment.unix(forecastData.list[date].dt_txt).format('MM/DD/YYYY HH:MM:SS')}</h2>
        //     <ul>
        //         <li>Weather: ${forecastData.list[date].weather[0].description}</li>
        //         <li>Icon: <img src="http://openweathermap.org/img/w/${forecastData.list[date].weather[0].icon}.png"></li>
        //         <li>Temperature: ${Math.round((forecastData.list[date].main.temp - 273.15) * 9/5 + 32)}°F</li>
        //         <li>Humidity: ${forecastData.list[date].main.humidity}%</li>
        //         <li>Wind Speed: ${forecastData.list[date].wind.speed} mph</li>
        //         </ul>`;
        //     fiveDay.appendChild(fiveDayGen);
        // } else {
        //     return;
        // }
    })
};