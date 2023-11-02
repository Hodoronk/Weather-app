import { getToday, imageChange } from './functions'
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement } from 'chart.js';
Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement);
import * as dom from './DOM'

export async function getWeatherData(location, unit, unitString) {

    // API call to get the latitude and logitude of searched location
    const getGeo = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=` + dom.myKey)
    const geoResponse = await getGeo.json()
    const geoLat = geoResponse[0].lat
    const geoLon = geoResponse[0].lon

    // API call with the latitude and longitude
    const getWeather = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${dom.myKey}&lat=${geoLat}&lon=${geoLon}`) ;
    const weatherResponse = await getWeather.json();


    // API call to weatherAPI for chance of rain + isDay
    const wApi = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${dom.weatherKey}&q=${location}&days=1&aqi=no&alerts=no`)
    const wApiResponse = await wApi.json();

    
    
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

    // Getting local hour
    const localHour = localTime.substring(localTime.length - 5)


    // Current day content modifications
    dom.todayDate.textContent = getToday();
    dom.tempNow.textContent = unit( weatherResponse.list[0].main.temp) + unitString
    dom.feelsLike.textContent = unit(weatherResponse.list[0].main.feels_like) + unitString
    dom.humidity.textContent = weatherResponse.list[0].main.humidity + "%"; 
    dom.chanceOfRain.textContent = wApiResponse.forecast.forecastday[0].day.daily_chance_of_rain  + "%"
    dom.windSpeed.textContent = windSpeedKm.toFixed(1) + ' km' ;
    dom.localTimeDom.textContent = `Local time is : ${localHour}`
    imageChange(todayCode, dom.todayImage, isDay)



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


    const convForecastTemps = []
    forecastTemps.forEach(temp => {
        convForecastTemps.push(unit(temp))
    })

    
    new Chart(dom.ctx, {
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

