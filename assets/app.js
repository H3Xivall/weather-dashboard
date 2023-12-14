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
            });
        } else {
            console.log('Error: getWeather(): ' + response.statusText);
        };
    });
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