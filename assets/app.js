// Weather Dashboard with 5 day forecast using OpenWeather API
// By: Ryan Hanzel

// Objects
const cityData = {
    city: "",
    lat: "31.06",
    lon: "98.18",
    temp: "",
    humidity: "",
    windSpeed: "",
    uvIndex: "",
    icon: "",
    date: "",
    forecast: []
};

// Global Variables
const apiKey = "fd4ad30d1c24c909806f019726e9f757";
const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${cityData.lat}&lon=${cityData.lon}&appid=${apiKey}`;
const apiSearchUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityData.city}&limit=5&appid=${apiKey}`;


// Event listeners

// Functions
