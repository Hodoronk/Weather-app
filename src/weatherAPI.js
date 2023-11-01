import { kToCelsius, kToFahr, getToday, imageChange, nightImage } from './functions'
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';

const body = document.querySelector('body') ;

// My API key
const myKey = config.Unseen_key;
const weatherKey = config.weatherAPI_key



// Search bar declarations
const input = document.getElementById ('search-bar') ; 
const searchBtn = document.getElementById ('search-btn' ) ;

// Today Weather declarations
export const location = document.getElementById ('location') ;
export const todayDate = document.getElementById('today-date') ;
const tempNow = document.getElementById ('temperature') ;
const feelsLike = document.getElementById ('fl-temp') ;
const humidity = document.getElementById ('humid-percent') ;
const chanceOfRain = document.getElementById('cor-percent') ;
const windSpeed = document.getElementById('w-speed') ;
const todayImage = document.getElementById('weather-icon') ;
const toggleUnits = document.querySelector('#toggle-units')





export async function getWeatherData(location) {

    // API call to get the latitude and logitude of searched location
    const getGeo = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=` + myKey)
    const geoResponse = await getGeo.json()
    const geoLat = geoResponse[0].lat
    const geoLon = geoResponse[0].lon





    // API call with the latitude and longitude
    const getWeather = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${myKey}&lat=${geoLat}&lon=${geoLon}`) ;
    const weatherResponse = await getWeather.json();
    console.log(weatherResponse)

    // API call to weatherAPI for chance of rain + isDay
    const wApi = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${location}&days=1&aqi=no&alerts=no`)
    const wApiResponse = await wApi.json();
    console.log(wApiResponse)
    
    
    // Get day arrays with all temperatures recorded on that specific day
    const forecastTemps = []
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

    // Current day content modifications
    todayDate.textContent = getToday();
    tempNow.textContent = kToCelsius( weatherResponse.list[0].main.temp) + "°c"
    feelsLike.textContent = kToCelsius (weatherResponse.list[0].main.feels_like) + ' °c' ;
    humidity.textContent = weatherResponse.list[0].main.humidity + "%"; 
    chanceOfRain.textContent = wApiResponse.forecast.forecastday[0].day.daily_chance_of_rain  + "%"
    windSpeed.textContent = windSpeedKm.toFixed(1) + ' km' ;
    imageChange(todayCode, todayImage, isDay)



    // Forecast day names
    const dayElements = document.querySelectorAll ( '.day' ) ;
    let i = 1
    dayElements.forEach(dayElement => {
        isDay = 1 //changed isDay so that forecast icons are always the day ones
        const today = new Date();
        const nextDay = addDays(today, i) ;
        const dayOfWeek = dayElement.querySelector ('h2') ;
        dayOfWeek.textContent = format(nextDay, 'EEEE');
        const maxTemp = dayElement.querySelector('#max-temp')
        const minTemp = dayElement.querySelector('#min-temp')
        maxTemp.textContent = kToCelsius(Math.max(...dayTemps[i-1])) + ' °c'
        minTemp.textContent = kToCelsius(Math.min(...dayTemps[i-1])) + ' °c'
        const weatherImage = dayElement.querySelector('img');
        const dayCode = weatherResponse.list[i].weather[0].id;
        imageChange(dayCode, weatherImage, isDay)
        i++
    })


    // Image modifications


}



searchBtn.addEventListener('click' , () => {

    getWeatherData(input.value)
    location.textContent = input.value;

})













