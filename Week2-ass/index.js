const isArray = require('isarray')

const addArray = array => {
    sum = 0
    if(isArray(array)){
        for(let i=0; i<array.length; i++){
            sum += array[i]
        }
        return sum
    } else {
        return 'Pls input an array'
    }
    
}

console.log(addArray([4,5,5,5]))