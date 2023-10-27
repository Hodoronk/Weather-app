const { format, addDays } = require('date-fns');
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




    const getWeather = await fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${geoLat}&lon=${geoLon}&cnt=10&appid=` + myKey) ;
    const weatherResponse = await getWeather.json();
    console.log(weatherResponse)


    // Weather Related
    const tempC = weatherResponse.current.temp_c;
    const feelsLikeC = weatherResponse.current.feelslike_c;
    const cloudStatus = weatherResponse.current.cloud;
    const humidityApi = weatherResponse.current.humidity;
    const windSpeedKm = weatherResponse.current.wind_kph;


    // Text content modifications
    todayDate.textContent = getToday();
    tempNow.textContent = tempC + '°C';
    feelsLike.textContent = feelsLikeC + '°C' ;
    humidity.textContent = humidityApi + "%"; 
    chanceOfRain.textContent = forecastResponse.forecast.forecastday[0].day.daily_chance_of_rain + '%' ;
    windSpeed.textContent = windSpeedKm + 'km' ;





    // Forecast temperatures, day names and icons
    const dayElements = document.querySelectorAll ( '.day' ) ;
    let i = 1; 
    dayElements.forEach(dayElement => {
        const maxTemp = dayElement.querySelector('#max-temp') ;
        maxTemp.textContent = forecastResponse.forecast.forecastday[i].day.maxtemp_c + ` °c`;
        const minTemp = dayElement.querySelector('#min-temp') ;
        minTemp.textContent = forecastResponse.forecast.forecastday[i].day.mintemp_c + ` °c`;

        const forecastIcon = dayElement.querySelector('img') ;
        forecastImages(forecastIcon, i) ;

        const today = new Date();
        const dayOfWeek = dayElement.querySelector ('h2') ;
        const nextDay = addDays(today, i) ;
        dayOfWeek.textContent = format(nextDay, 'EEEE');
        i++
    })






    // Image modifications

    async function forecastImages(image, daynumber) {


    if (forecastResponse.forecast.forecastday[daynumber].day.daily_chance_of_rain >= 50){
        image.src = '/src/images/rain.png' ;
    } else if(cloudStatus == 0) {
        image.src = '/src/images/clear.png' ;
    } else if(forecastResponse.forecast.forecastday[daynumber].day.daily_chance_of_rain >= 50) {
        image.src = '/src/images/snow.png' ;
    } else if(cloudStatus >= 20) {
        image.src = '/src/images/clouds.png' ;
    }
}
forecastImages(todayImage, 0);
}



searchBtn.addEventListener('click' , () => {

    getWeatherData(input.value)
    location.textContent = input.value;


})


const getToday = () => {
    const today = new Date();
    const formattedDate = format(today , 'EEEE, d MMMM yyyy') ;
   return formattedDate;
}