import format from "date-fns/format";
const myKey = config.Unseen_key;



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
