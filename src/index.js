import { getWeatherData, getToday, todayDate, location} from "./weatherAPI";
const { format } = require('date-fns');


const onLoad = () => {

    const today = new Date();
    const formattedDate = format(today , 'EEEE, d MMMM yyyy') ;
    todayDate.textContent = formattedDate;
    location.textContent = 'Lupeni' ;
    getWeatherData('Lupeni') ;


}
onLoad();