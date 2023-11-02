import { getWeatherData, getToday, } from "./weatherAPI";
import { location, todayDate } from "./DOM";
import { kToCelsius, kToFahr, unitString } from "./functions";


const { format } = require('date-fns');


const onLoad = () => {

    const today = new Date();
    const formattedDate = format(today , 'EEEE, d MMMM yyyy') ;
    todayDate.textContent = formattedDate;
    location.textContent = 'Lupeni' ;
    getWeatherData('Lupeni', kToCelsius, unitString) ;


}
onLoad();

