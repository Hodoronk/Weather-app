import * as dom from './DOM'
import { unit } from './functions'



export const updateUI = (globalWData, unit) => {
    dom.localTimeDom.textContent = `Local Time: ${globalWData.localTime}`
    dom.location.textContent = globalWData.currentLocation
    dom.tempNow.textContent = unit(globalWData.nowTemp)
    dom.feelsLike.textContent = unit(globalWData.feelsLike)
    dom.humidity.textContent = globalWData.humidity + '%'
    dom.chanceOfRain.textContent = globalWData.chanceOfRain + '%'
    dom.windSpeed.textContent = globalWData.windSpeed + 'kmh'
    const maxTemps = chunkArray(globalWData.lastReading, globalWData.maxForecast, 8, 1);
    const minTemps = chunkArray(globalWData.lastReading, globalWData.minForecast, 8, 0);
    const codeArray = getCodes(globalWData.lastReading, globalWData.weatherCodes, 8)
    imageChange(dom.todayImage, globalWData.todayCode, globalWData.isDay)
    console.log(globalWData.isDay)
    forecastUI(maxTemps, minTemps)
    updateImages(codeArray, 1)

}   





const forecastUI = (max, min) => {
    let i = 0;
    let j = 0;
    dom.maxTemps.forEach(day => {
        day.textContent = unit(max[i])
        i++
    })
    dom.minTemps.forEach(day => {
        day.textContent = unit(min[j])
        j++
    })

}

const updateImages = (arr, isDay) => {
    let i = 0;
dom.forecastImages.forEach(image => {
    imageChange(image, arr[i], isDay)
    i++
})

}
const imageChange = (image, code, isDay) => {

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
    } else if(isDay === 0) {
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

function chunkArray(reading, arr, chunkSize, maxmin) {
    const chunks = []
    const maxArr = []
    const minArr = []
    for (let i = reading; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    if(maxmin === 1){
        for(const arr of chunks){
            maxArr.push(Math.max(...arr))
        }
        return maxArr;
    }else if (maxmin === 0){
        for(const arr of chunks){
            minArr.push(Math.min(...arr))
        }
        return minArr
    }
}


function getCodes(reading, arr, chunkSize) { //8
    const chunks = []
    const codesArr = []
    let code;
    for (let i = reading; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
        for(const arr of chunks){
            codesArr.push(arr[4])
        }
        return codesArr;


}



