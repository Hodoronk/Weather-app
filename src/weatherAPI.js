
export async function getWeatherData(location) {

    const getApi = await fetch(`http://api.weatherapi.com/v1/current.json?key=dc888092a84f491faf694133232509&q=${location}&aqi=no` , {mode : "cors"}) ;
    const response = await getApi.json();
    
    // Location related 
    const localTime = response.location.localtime;
    const region = response.location.region;

    // Weather Related
    const tempC = response.current.temp_c;
    const feelsLikeC = response.current.feelslike_c;
    const tempF = response.current.temp_f;
    const feelsLikeF = response.current.feelslike_f;
    const cloudStatus = response.current.cloud;
    const humidity = response.current.humidity;
    const isDay = response.current.is_day;
    const uvStatus = response.current.uv;
    const windDirection = response.current.wind_dir;
    const windSpeedKm = response.current.wind_kph;
    const windSpeedMph = response.current.wind_mph

    console.log(`
    Location: ${location} ;
    Region: ${region} ;
    Local Time: ${localTime} ;

    Temperature in Celsius: ${tempC} ;
    Feels like: ${feelsLikeC} ;

    Temperature in Fahrenheit: ${tempF} ;
    Feels like: ${feelsLikeF} ;

    How cloudy it is on a scale from 1 to 100 : ${cloudStatus} ;
    Humidity: ${humidity} ;
    Is it day? ${isDay} ;
    UV status: ${uvStatus} ;
    Wind Direction: ${windDirection} ;
    Wind Speed in km/h: ${windSpeedKm} ;
    Wind Speed in mp/h: ${windSpeedMph} ;
    `)
}

