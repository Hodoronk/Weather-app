import * as dom from './DOM'
import { performSearch, unitChange } from './functions'



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