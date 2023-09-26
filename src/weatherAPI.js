const { format } = require('date-fns');



const body = document.querySelector('body') ;

// Search bar declarations
const input = document.getElementById ('search-bar') ; 
const searchBtn = document.getElementById ('search-btn' ) ;

// Today Weather declarations
const location = document.getElementById ('location') ;
const tempNow = document.getElementById ('temperature') ;
const feelsLike = document.getElementById ('fl-temp') ;
const humidity = document.getElementById ('humid-percent') ;
const chanceOfRain = document.getElementById('cor-percent') ;
const windSpeed = document.getElementById('w-speed') ;
const todayImage = document.getElementById('weather-icon') ;
const todayDate = document.getElementById('today-date') ;



export async function getWeatherData(location) {

    const getWeather = await fetch(`http://api.weatherapi.com/v1/current.json?key=dc888092a84f491faf694133232509&q=${location}&aqi=no` , {mode : "cors"}) ;
    const weatherResponse = await getWeather.json();
    console.log(weatherResponse);
    
    const getForecast = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=dc888092a84f491faf694133232509&q=${location}&aqi=no` , {mode: "cors"}) ;
    const forecastResponse = await getForecast.json() ;
    console.log(forecastResponse) ;


    // Location related 
    const localTime = weatherResponse.location.localtime;
    const region = weatherResponse.location.region;

    // Weather Related
    const tempC = weatherResponse.current.temp_c;
    const feelsLikeC = weatherResponse.current.feelslike_c;
    const tempF = weatherResponse.current.temp_f;
    const feelsLikeF = weatherResponse.current.feelslike_f;
    const cloudStatus = weatherResponse.current.cloud;
    const humidityApi = weatherResponse.current.humidity;
    const isDay = weatherResponse.current.is_day;
    const uvStatus = weatherResponse.current.uv;
    const windDirection = weatherResponse.current.wind_dir;
    const windSpeedKm = weatherResponse.current.wind_kph;
    const windSpeedMph = weatherResponse.current.wind_mph

    // Text content modifications
    todayDate.textContent = getToday();







    tempNow.textContent = tempC + '°C';
    feelsLike.textContent = feelsLikeC + '°C' ;
    humidity.textContent = humidityApi + "%"; 
    chanceOfRain.textContent = forecastResponse.forecast.forecastday[0].day.daily_chance_of_rain + '%' ;
    windSpeed.textContent = windSpeedKm + 'km' ;

    //Text content modifications for forecast

    // Image modifications
    if (forecastResponse.forecast.forecastday[0].day.daily_chance_of_rain >= 50){
        todayImage.src = '/src/images/rain.png' ;
    } else if(cloudStatus == 0) {
        todayImage.src = '/src/images/clear.png' ;
    } else if(forecastResponse.forecast.forecastday[0].day.daily_chance_of_rain >= 50) {
        todayImage.src = '/src/images/snow.png' ;
    } else if(cloudStatus >= 20) {
        todayImage.src = '/src/images/clouds.png' ;
    }


}



searchBtn.addEventListener('click' , () => {

    getWeatherData(input.value)
    location.textContent = input.value;


})


const getToday = () => {
    const today = new Date();
    const formattedDate = format(today , 'EEEE')


   return formattedDate;
}