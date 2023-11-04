import {add, format} from "date-fns";
import * as dom from "./DOM"
import { getWeatherData } from "./weatherAPI";
import { updateUI } from "./UI";

export const getToday = () => {
    const today = new Date();
    const formattedDate = format(today , 'EEEE, d MMMM yyyy') ;
   return formattedDate;
}
const assignWeekDays = () => {
    const today = new Date()
    const days = [];
    let j = 0;
    for (let i = 1; i <= 5; i++) {
        const nextDay = add(today, { days: i });
        const formattedDate = format(nextDay, 'EEEE');
        days.push(formattedDate);
      }
      dom.weekdays.forEach(day => {
        day.textContent = days[j]
        j++
      })
      
}
export const assignDays = () => {
    assignWeekDays()
    dom.todayDate.textContent = getToday()
}

    // Kelvin conversion functions
export const kToCelsius = (temp) => {
    let result =  temp - 273.15
    result = result.toFixed(1);
    let string = result + '°C'
    return string
}

export const kToFahr = (temp) => {
    let result = 9/5 * (temp - 273.15) + 32
    result = result.toFixed(1)
    let string = result + '°F'
    return string
}

export let unit = kToCelsius
export const unitChange = () => {
    if(unit === kToCelsius) {
        unit = kToFahr
        dom.toggleUnits.textContent = 'Fahrenheit'
        updateUI(globalWData, unit)
        

    }else {
        unit = kToCelsius
        dom.toggleUnits.textContent = 'Celsius'
        updateUI(globalWData, unit)

    }
}



let globalWData;
export const performSearch = (init) => {
    if(init === 1){
        getWeatherData('New York')
        .then((weatherData) => {
            globalWData = weatherData;
            updateUI(globalWData, unit)
            assignDays()
        })
    }else{

        getWeatherData(dom.input.value)
        .then((weatherData) => {
            globalWData = weatherData;
            updateUI(globalWData, unit)
            assignDays()
        })
    }

    dom.input.value = ''
}



 





    
    






