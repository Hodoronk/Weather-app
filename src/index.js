import { getWeatherData, getToday, todayDate, location, unitString} from "./weatherAPI";
import { kToCelsius, kToFahr } from "./functions";
const { format } = require('date-fns');


const onLoad = () => {

    const today = new Date();
    const formattedDate = format(today , 'EEEE, d MMMM yyyy') ;
    todayDate.textContent = formattedDate;
    location.textContent = 'Lupeni' ;
    getWeatherData('Lupeni', kToCelsius, unitString) ;


}
onLoad();