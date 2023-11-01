import { kToCelsius, kToFahr, getToday } from './functions'
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';

const body = document.querySelector('body') ;

// My API key
const myKey = config.Unseen_key;



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


    // API info
    const tempC = kToCelsius(weatherResponse.list[0].main.temp)
    const feelsLikeC = kToCelsius (weatherResponse.list[0].main.feels_like)
    const cloudStatus = weatherResponse.list[0].weather[0].description
    const humidityApi = weatherResponse.list[0].main.humidity
    const windSpeedKm = weatherResponse.list[0].wind.speed
    // const rainChance = 

    // Current day content modifications
    todayDate.textContent = getToday();
    tempNow.textContent = tempC + '°c';
    feelsLike.textContent = feelsLikeC + ' °c' ;
    humidity.textContent = humidityApi + "%"; 
    chanceOfRain.textContent = console.log('not yet')
    windSpeed.textContent = windSpeedKm + ' km' ;


    // Forecast day names
    const dayElements = document.querySelectorAll ( '.day' ) ;
    let i = 1
    dayElements.forEach(dayElement => {
        const today = new Date();
        const dayOfWeek = dayElement.querySelector ('h2') ;
        const nextDay = addDays(today, i) ;
        dayOfWeek.textContent = format(nextDay, 'EEEE');
        console.log(dayOfWeek)
        console.log(Math.max(...dayTemps[i-1]))
        console.log(Math.min(...dayTemps[i-1]))
        const maxTemp = dayElement.querySelector('#max-temp')
        const minTemp = dayElement.querySelector('#min-temp')
        
        maxTemp.textContent = kToCelsius(Math.max(...dayTemps[i-1])) + ' °c'
        minTemp.textContent = kToCelsius(Math.min(...dayTemps[i-1])) + ' °c'








        i++
    })






    // Image modifications

//     async function forecastImages(image, daynumber) {


//     if (forecastResponse.forecast.forecastday[daynumber].day.daily_chance_of_rain >= 50){
//         image.src = '/src/images/rain.png' ;
//     } else if(cloudStatus == 0) {
//         image.src = '/src/images/clear.png' ;
//     } else if(forecastResponse.forecast.forecastday[daynumber].day.daily_chance_of_rain >= 50) {
//         image.src = '/src/images/snow.png' ;
//     } else if(cloudStatus >= 20) {
//         image.src = '/src/images/clouds.png' ;
//     }
// }
// forecastImages(todayImage, 0);
}



searchBtn.addEventListener('click' , () => {


    getWeatherData(input.value)
    location.textContent = input.value;


})









