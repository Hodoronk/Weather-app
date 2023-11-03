import * as dom from './DOM'
import { performSearch, unitChange } from './functions'
export const AUTH_TOKEN = process.env.AUTH_TOKEN
export const WEATHERAPI_KEY = process.env.WEATHERAPI_KEY


    performSearch(1)




dom.searchBtn.addEventListener('click', () => {
    performSearch(0)
})
dom.input.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        performSearch(0)
    }
})

dom.toggleUnits.addEventListener('click', unitChange)