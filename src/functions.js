import format from "date-fns/format";
import * as dom from './DOM'
import { getWeatherData } from "./weatherAPI";

export const getToday = () => {
    const today = new Date();
    const formattedDate = format(today , 'EEEE, d MMMM yyyy') ;
   return formattedDate;
}

    // Kelvin conversion functions
export const kToCelsius = (temp) => {
    let result =  temp - 273.15
    return result = result.toFixed(1);
}

export const kToFahr = (temp) => {
    let result = 9/5 * (temp - 273.15) + 32
    return result = result.toFixed(1)
}

// Weather icon changes for forecast + current day
export function imageChange(code, image, isDay) {
    if(isDay === 1) {

        if(code > 199 && code < 233) {
            image.src = "https://openweathermap.org/img/wn/11d@2x.png"
        } else if(code > 299 && code < 321) {
            image.src = "https://openweathermap.org/img/wn/09d@2x.png"
        } else if(code > 499 && code < 532) {
            image.src = "https://openweathermap.org/img/wn/10d@2x.png"
        } else if(code > 599 && code < 623) {
            image.src = "https://openweathermap.org/img/wn/13d@2x.png"
        } else if(code > 700 && code < 782) {
            image.src = "https://openweathermap.org/img/wn/01d@2x.png"
        } else if(code === 800) {
            image.src = "https://openweathermap.org/img/wn/10d@2x.png"
        } else if(code > 800 && code < 805) {
            image.src = "https://openweathermap.org/img/wn/02d@2x.png"
        }
    }else{

        if(code > 199 && code < 233) {
            image.src = "https://openweathermap.org/img/wn/11n@2x.png"
        } else if(code > 299 && code < 321) {
            image.src = "https://openweathermap.org/img/wn/09n@2x.png"
        } else if(code > 499 && code < 532) {
            image.src = "https://openweathermap.org/img/wn/10n@2x.png"
        } else if(code > 599 && code < 623) {
            image.src = "https://openweathermap.org/img/wn/13n@2x.png"
        } else if(code > 700 && code < 782) {
            image.src = "https://openweathermap.org/img/wn/01n@2x.png"
        } else if(code === 800) {
            image.src = "https://openweathermap.org/img/wn/10n@2x.png"
        } else if(code > 800 && code < 805) {
            image.src = "https://openweathermap.org/img/wn/02n@2x.png"
        }

    }
}

export function performSearch(){
    console.log('unitType:', unitType)
    if(unitType === kToCelsius) {
        getWeatherData(input.value, kToCelsius, unitString)
        dom.location.textContent = input.value;
        dom.input.value = ''
    }else{
        getWeatherData(input.value, kToFahr, unitString)
        dom.location.textContent = input.value;
        dom.input.value = ''
    }
}


// Toggle units event listener
let unitType = kToCelsius;
export let unitString = '°c'
dom.toggleUnits.addEventListener('click', () => {
    let thisLocation = dom.location.textContent
    if(unitType === kToCelsius){
        unitType = kToFahr
        unitString = '°F'
        dom.toggleUnits.textContent = 'Fahrenheit'
    }else {
        unitType = kToCelsius
        unitString = '°c'
        dom.toggleUnits.textContent = 'Celsius'
    }
    getWeatherData(thisLocation, unitType, unitString)
})

dom.searchBtn.addEventListener('click' , performSearch)
dom.input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch()
    }
})



