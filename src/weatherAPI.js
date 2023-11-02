import { kToCelsius, kToFahr, getToday, imageChange, nightImage } from './functions'
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import { Chart } from "chart.js/auto";

// API keys
const myKey = config.Unseen_key;
const weatherKey = config.weatherAPI_key





// Graph DOM
let ctx = document.getElementById('myChart');

// Search bar DOM
const input = document.getElementById ('search-bar')
const searchBtn = document.getElementById ('search-btn' )

// Current day DOM
export const location = document.getElementById ('location') 
export const todayDate = document.getElementById('today-date') 
const tempNow = document.getElementById ('temperature') 
const feelsLike = document.getElementById ('fl-temp') 
const humidity = document.getElementById ('humid-percent') 
const chanceOfRain = document.getElementById('cor-percent') 
const windSpeed = document.getElementById('w-speed') 
const todayImage = document.getElementById('weather-icon') 
const localTimeDom = document.querySelector('#local-time')


// Fahrenheit - Celsius switch button
let unitType = kToCelsius;
export let unitString = '°c'

const toggleUnits = document.querySelector('#toggle-units')
toggleUnits.addEventListener('click', () => {
    let thisLocation = location.textContent
    if(unitType === kToCelsius){
        unitType = kToFahr
        unitString = '°F'
        toggleUnits.textContent = 'Fahrenheit'

    }else {
        unitType = kToCelsius
        unitString = '°c'
        toggleUnits.textContent = 'Celsius'
    }
    getWeatherData(thisLocation, unitType, unitString)
})





// Weather API function
export async function getWeatherData(location, unit, unitString) {

    // API call to get the latitude and logitude of searched location
    const getGeo = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=` + myKey)
    const geoResponse = await getGeo.json()
    const geoLat = geoResponse[0].lat
    const geoLon = geoResponse[0].lon



    // API call with the latitude and longitude
    const getWeather = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${myKey}&lat=${geoLat}&lon=${geoLon}`) ;
    const weatherResponse = await getWeather.json();


    // API call to weatherAPI for chance of rain + isDay
    const wApi = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${location}&days=1&aqi=no&alerts=no`)
    const wApiResponse = await wApi.json();


    // Getting local hour
    const localHour = localTime.substring(localTime.length - 5)
    
    
    // Get day arrays with all temperatures recorded on that specific day
    const forecastTemps = []
    const forecastDays = []
    let dateString = weatherResponse.list[0].dt_txt
    let hourString = dateString.substring(dateString.length - 8)

    const hourStringToJ = {
        "00:00:00": 8,
        "03:00:00": 7,
        "06:00:00": 6,
        "09:00:00": 5,
        "12:00:00": 4,
        "15:00:00": 3,
        "18:00:00": 2,
        "21:00:00": 1
      }
      let j = hourStringToJ[hourString];

    for(j; j < weatherResponse.list.length; j++) {
        forecastTemps.push(weatherResponse.list[j].main.temp)
        forecastDays.push(weatherResponse.list[j].dt_txt)
    }
    const chunkSize = 8
    const dayTemps = []
    for (let i = 0; i < forecastTemps.length; i += chunkSize) {
        const chunk = forecastTemps.slice(i, i + chunkSize)
        dayTemps.push(chunk)
    }

    // fetched
    let isDay = wApiResponse.current.is_day;
    const windSpeedKm = weatherResponse.list[0].wind.speed
    const todayCode = weatherResponse.list[0].weather[0].id
    const localTime = wApiResponse.location.localtime




    // Current day textContent modifications
    todayDate.textContent = getToday();
    tempNow.textContent = unit( weatherResponse.list[0].main.temp) + unitString
    feelsLike.textContent = unit(weatherResponse.list[0].main.feels_like) + unitString
    humidity.textContent = weatherResponse.list[0].main.humidity + "%"; 
    chanceOfRain.textContent = wApiResponse.forecast.forecastday[0].day.daily_chance_of_rain  + "%"
    windSpeed.textContent = windSpeedKm.toFixed(1) + ' km' ;
    localTimeDom.textContent = `Local time is : ${localHour}`
    imageChange(todayCode, todayImage, isDay)



    // Forecast day names, max/min temperatures
    const dayElements = document.querySelectorAll ( '.day' ) ;
    let i = 1
    dayElements.forEach(dayElement => {
        isDay = 1 
        const today = new Date();
        const nextDay = addDays(today, i) ;
        const dayOfWeek = dayElement.querySelector ('h2') ;
        const maxTemp = dayElement.querySelector('#max-temp')
        const minTemp = dayElement.querySelector('#min-temp')
        const weatherImage = dayElement.querySelector('img');
        const dayCode = weatherResponse.list[i].weather[0].id;

        dayOfWeek.textContent = format(nextDay, 'EEEE');
        maxTemp.textContent = unit(Math.max(...dayTemps[i-1])) + ' °c'
        minTemp.textContent = unit(Math.min(...dayTemps[i-1])) + ' °c'

        imageChange(dayCode, weatherImage, isDay)
        i++
    })


    // Converting graph units (not yet functional)
    const convForecastTemps = []
    forecastTemps.forEach(temp => {
        convForecastTemps.push(unit(temp))
    })
    console.log(convForecastTemps)


    // Second page forecast graph (works with Celsius only atm)
    new Chart(ctx, {
  type: 'line',
  data: {
    labels: forecastDays,
    backgroundColor: 'white',
    datasets: [{
      label: '°c',
      data: convForecastTemps,
      backgroundColor: 'green',
      borderWidth: 5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
})

}


// Search functionality
function performSearch(){
    console.log('unitType:', unitType)
    if(unitType === kToCelsius) {
        getWeatherData(input.value, kToCelsius, unitString)
        location.textContent = input.value;
        input.value = ''
    }else{
        getWeatherData(input.value, kToFahr, unitString)
        location.textContent = input.value;
        input.value = ''
    }
}


searchBtn.addEventListener('click' , performSearch)
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch()
    }
})

