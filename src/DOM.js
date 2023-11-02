// Search bar
export const input = document.getElementById ('search-bar')
export const searchBtn = document.getElementById ('search-btn' )

// Current day DOM elements
export const tempNow = document.getElementById ('temperature') 
export const feelsLike = document.getElementById ('fl-temp') 
export const humidity = document.getElementById ('humid-percent') 
export const chanceOfRain = document.getElementById('cor-percent') 
export const windSpeed = document.getElementById('w-speed') 
export const todayImage = document.getElementById('weather-icon') 
export const location = document.getElementById ('location') 
export const todayDate = document.getElementById('today-date') 
export const localTimeDom = document.querySelector('#local-time')

// API keys
export const myKey = config.Unseen_key;
export const weatherKey = config.weatherAPI_key

// Graph
export let ctx = document.getElementById('myChart');

// Toggle Celsius-Fahrenheit button
export const toggleUnits = document.querySelector('#toggle-units')

