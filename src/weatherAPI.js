const AUTH_TOKEN = process.env.AUTH_TOKEN;
const WEATHERAPI_KEY = process.env.WEATHERAPI_KEY;

export async function getWeatherData(location) {


    // API call to get the latitude and logitude of searched location
    const getGeo = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${AUTH_TOKEN}`)
    const geoResponse = await getGeo.json()
    const geoLat = geoResponse[0].lat
    const geoLon = geoResponse[0].lon

  


    // API call with the latitude and longitude
    const getWeather = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${AUTH_TOKEN}&lat=${geoLat}&lon=${geoLon}`) ;
    const weatherResponse = await getWeather.json();


    // API call to weatherAPI for chance of rain + isDay
    const wApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_KEY}&q=${location}&days=1&aqi=no&alerts=no`)
    const wApiResponse = await wApi.json();



    const minForecast = []
    const maxForecast = []
    const weatherCodes = []


    const reading = chopTime(weatherResponse.list[0].dt_txt, 11)
    const localTime = chopTime(wApiResponse.location.localtime, 11)
    const currentLocation = wApiResponse.location.name
    const nowTemp = weatherResponse.list[0].main.temp
    const feelsLike = weatherResponse.list[0].main.feels_like
    const humidity = weatherResponse.list[0].main.humidity
    const isDay = wApiResponse.current.is_day
    const chanceOfRain = wApiResponse.forecast.forecastday[0].day.daily_chance_of_rain
    const windSpeed= wApiResponse.current.wind_kph;
    const todayCode = weatherResponse.list[0].weather[0].id



    for(let i = 0; i < weatherResponse.list.length; i++){
      maxForecast.push(weatherResponse.list[i].main.temp_max)
      minForecast.push(weatherResponse.list[i].main.temp_min)
      weatherCodes.push(weatherResponse.list[i].weather[0].id)
    }
 


    const lastReading = readingMap[reading]  
    const weatherData = {
      lastReading,
      localTime,
      currentLocation,
      nowTemp,
      feelsLike,
      humidity,
      isDay,
      chanceOfRain,
      windSpeed,
      maxForecast,
      minForecast,
      weatherCodes,
      todayCode
    }



return weatherData

}



// function to get hour:minutes only from the API
const chopTime = (response) =>{
  let timeString = response
  const time = timeString.slice(11)
  return time

}

const readingMap = {
  "00:00:00": 8,
  "03:00:00": 7,
  "06:00:00": 6,
  "09:00:00": 5,
  "12:00:00": 4,
  "15:00:00": 3,
  "18:00:00": 2,
  "21:00:00": 1
}