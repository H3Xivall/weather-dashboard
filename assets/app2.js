// Weather Dashboard with 5 day forecast using OpenWeather API
// By: Ryan Hanzel

// Objects
const cityData = {
    city: '',
    state: '',
    lat: '',
    lon: '',
    temp: '',
    humidity: '',
    windSpeed: '',
    uvIndex: '',
    icon: '',
    date: '',
    forecast: []
};

// Global Variables
const apiKey = 'fd4ad30d1c24c909806f019726e9f757';
const apiSearchUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityData.city}&limit=5&appid=${apiKey}`;
const searchBox = document.querySelector('#search-box');
const searchHistory = document.querySelector('#search-history');
const curWeather = document.querySelector('#current-weather');
const fiveDay = document.querySelector('#five-day-forecast');
let searchData = [];



// Event listeners
document.addEventListener('DOMContentLoaded', renderEl('all'));

// Functions
function renderEl(ele) {
    if (ele === 'search' || ele === 'all') {
        // Render Search Box and Button
        const searchEl = document.createElement('input');
        const searchBtn = document.createElement('button');
        searchEl.setAttribute('type', 'text');
        searchEl.setAttribute('id', 'search-data');
        searchEl.setAttribute('placeholder', 'Enter City');
        searchBtn.setAttribute('type', 'button');
        searchBtn.setAttribute('id', 'search-btn');
        searchBtn.textContent = 'Search';
        searchBtn.addEventListener('click', getWeather);
        searchBox.appendChild(searchEl);
        searchBox.appendChild(searchBtn);
    } else if (ele === 'history' || ele === 'all') {
        // Render Search History
        for (let i = 0; i < 5; i++) {
            const sHist = localStorage.getItem('search-history');
            const sHistEl = document.createElement('button');
            sHistEl.setAttribute('type', 'button');
            sHistEl.setAttribute('id', `sHist-${i}`);
            sHistEl.textContent = sHist[i];
            sHistEl.addEventListener('click', getWeather);
            searchHistory.appendChild(sHistEl);
        };
    } else if (ele === 'current' || ele === 'all') {
        // Render Current Weather

    } else if (ele === 'forecast' || ele === 'all') {
        // Render 5 Day Forecast
    }
};
function getWeather() {
    if (this.id === 'search-btn') {
        if (!document.getElementById('search-data').value) {
            alert('Please enter a city name');
        } else {
            let city = document.getElementById('search-data').value;
            getData(city);
            
        };
    }  else if (this.id === 'search-history') {
        let city = this.value;
        getData(city);
    } else {
        console.log('Error: getWeather()');
    };
};
function getData(i) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${i}&limit=5&appid=${apiKey}`).then(function (response) {
        if (response.ok) {
            data = response.json();
            return data;
        } else {
            console.log('Error: ' + response.statusText);
        };
    }).then(function (data) {
        console.log(data);
        searchData = data;
    });
};
function searchResults() {};